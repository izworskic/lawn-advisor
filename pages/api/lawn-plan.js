import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Robust JSON extraction: handles fences, fragmented blocks, deeply nested objects.
// The key fix: use firstBrace..lastBrace (greedy) instead of lazy regex which stops at first }.
function extractJSON(text) {
  // Strategy 1: ```json ... ``` fences
  const fenceMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (fenceMatch) {
    try { return JSON.parse(fenceMatch[1].trim()); } catch {}
  }

  // Strategy 2: any ``` ... ``` block
  const anyFence = text.match(/```\s*([\s\S]*?)\s*```/);
  if (anyFence) {
    try { return JSON.parse(anyFence[1].trim()); } catch {}
  }

  // Strategy 3: first { to last } — greedy, correctly handles all nested objects
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try { return JSON.parse(text.slice(firstBrace, lastBrace + 1)); } catch {}
  }

  // Strategy 4: entire text as JSON
  try { return JSON.parse(text.trim()); } catch {}

  return null;
}

function buildPrompt(zip) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return `You are an expert turfgrass agronomist. Today is ${today}.

Use web search to look up: (1) the USDA hardiness zone for ZIP ${zip}, (2) the city and state for this ZIP, (3) current weather conditions there, (4) dominant grass types for that region.

Then output a single JSON object. No introduction, no explanation, no text before or after — only the JSON object.

{
  "location": "Bay City, MI",
  "zone": "Zone 6a",
  "climate": "Humid Continental",
  "grassType": "Kentucky Bluegrass / Fine Fescue mix",
  "season": "spring",
  "soilTemp": "52 degrees F, warming",
  "currentCondition": "One sentence about lawn conditions right now in this location.",
  "insight": "One expert paragraph: local soil challenges, pest pressure, climate nuances, and what separates great lawns from average ones here.",
  "urgentTask": "The single most important lawn task for ZIP ${zip} right now, one sentence.",
  "tasks": [
    {
      "category": "fertilize",
      "title": "Apply Pre-Emergent Fertilizer",
      "detail": "Use a slow-release 24-0-10 formula at 4 lbs per 1000 sq ft when soil hits 55 degrees F.",
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
    "Hyperlocal tip specific to this ZIP.",
    "Tip two.",
    "Tip three."
  ]
}

Rules:
- tasks: 5 to 8 items for the next 60 days
- calendar: full 12-month cycle, month is 0-indexed (0 = January)
- season must be one of: spring, summer, fall, winter
- category must be one of: fertilize, mow, water, overseed, aerate, weed, winterize
- product must be a real Amazon-searchable product name
- Output only the JSON object with no surrounding text`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { zip } = req.body;
  const cleanZip = String(zip || "").replace(/\D/g, "");
  if (cleanZip.length !== 5) return res.status(400).json({ error: "Invalid ZIP code" });

  // Weekly cache so plans stay current with the season
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const cacheKey = `lawn:plan:${cleanZip}:w${week}`;

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
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
        messages: [{ role: "user", content: buildPrompt(cleanZip) }],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    // Join all text-type content blocks — web search returns multiple fragmented blocks
    const fullText = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    const plan = extractJSON(fullText);

    if (!plan) {
      return res.status(500).json({ error: "Could not build a plan for that ZIP. Please try again." });
    }

    try { await redis.set(cacheKey, plan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Request failed. Please try again." });
  }
}
