import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Greedy extraction: first { to last } handles all nested objects correctly
function extractJSON(text) {
  const fenceMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (fenceMatch) {
    try { return JSON.parse(fenceMatch[1].trim()); } catch {}
  }
  const anyFence = text.match(/```\s*([\s\S]*?)\s*```/);
  if (anyFence) {
    try { return JSON.parse(anyFence[1].trim()); } catch {}
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last > first) {
    try { return JSON.parse(text.slice(first, last + 1)); } catch {}
  }
  try { return JSON.parse(text.trim()); } catch {}
  return null;
}

function extractZip(address) {
  const m = String(address).match(/\b(\d{5})\b/);
  return m ? m[1] : "00000";
}

function buildPrompt(address) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return `You are an expert turfgrass agronomist providing a hyperlocal lawn care plan for a specific property address.

Today is ${today}.
Property address: ${address}

Use web search to research:
1. USDA hardiness zone and Koppen climate class for this exact location
2. Current weather conditions and recent rainfall at this address
3. Typical soil type for this neighborhood (check NRCS Web Soil Survey if possible)
4. Dominant grass species used in this area
5. Any locally relevant factors: proximity to water, elevation, urban heat, lake effect, etc.

Think about what makes THIS specific address unique for lawn care:
- Street-level microclimates (shading from nearby buildings or trees based on the street name/orientation)
- Urban vs. suburban vs. rural character of the neighborhood
- Whether it is near a lake, river, or large body of water
- Any regional pest or disease pressures common to this exact municipality

Then output a single JSON object. Output only the JSON, no introduction or explanation.

{
  "address": "${address}",
  "location": "Bay City, MI",
  "zone": "Zone 6a",
  "climate": "Humid Continental",
  "grassType": "Kentucky Bluegrass / Fine Fescue mix",
  "season": "spring",
  "soilTemp": "52 degrees F, warming",
  "soilType": "Clay loam (typical for this neighborhood)",
  "currentCondition": "One sentence: what is happening with lawns in this specific location right now.",
  "propertyNotes": "One sentence about what makes this specific address notable for lawn care (proximity to water, soil type, neighborhood character, microclimate, etc.)",
  "insight": "Two to three sentences of expert analysis specific to this address: local soil challenges, regional pest pressure, microclimate effects, and what separates great lawns from average ones at this exact location.",
  "urgentTask": "The single most important lawn task for this specific address and today's date, in one sentence.",
  "tasks": [
    {
      "category": "fertilize",
      "title": "Apply Pre-Emergent Fertilizer",
      "detail": "Detailed instructions specific to this location. Include product rate, soil temp trigger, and local timing notes.",
      "timing": "This week",
      "product": "Scotts Turf Builder Halts Crabgrass Preventer",
      "month": 3
    }
  ],
  "calendar": [
    { "month": 2, "task": "fertilize", "intensity": 2 },
    { "month": 3, "task": "mow", "intensity": 3 }
  ],
  "tips": [
    "Tip specific to this address and neighborhood.",
    "Tip two referencing local conditions.",
    "Tip three."
  ]
}

Rules:
- tasks: 5 to 8 items covering the next 60 days, specific to this address
- calendar: full 12-month cycle, month is 0-indexed (0 = January)
- season must be one of: spring, summer, fall, winter
- category must be one of: fertilize, mow, water, overseed, aerate, weed, winterize
- product must be a real Amazon-searchable product name
- Output only the JSON object`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { address } = req.body;
  if (!address || String(address).trim().length < 10) {
    return res.status(400).json({ error: "Please enter a full street address including ZIP code." });
  }

  const cleanAddress = String(address).trim();
  const zip = extractZip(cleanAddress);

  if (zip === "00000") {
    return res.status(400).json({ error: "Address must include a 5-digit ZIP code for accurate results." });
  }

  // Cache by normalized address + week
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const addressKey = cleanAddress.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
  const cacheKey = `lawn:addr:${addressKey}:w${week}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.status(200).json({ plan: cached, cached: true });
  } catch {}

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 4 }],
        messages: [{ role: "user", content: buildPrompt(cleanAddress) }],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const fullText = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    const plan = extractJSON(fullText);
    if (!plan) {
      return res.status(500).json({ error: "Could not build a plan for that address. Please try again." });
    }

    try { await redis.set(cacheKey, plan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Request failed. Please try again." });
  }
}
