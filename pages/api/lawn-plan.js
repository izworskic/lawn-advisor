import { Redis } from "@upstash/redis";
import { MICHIGAN_CITIES } from "../../data/michigan-cities";
import { US_CITIES, buildZipMap } from "../../data/us-cities";
import { computeGrade, makePlanSlug } from "../../lib/grade";

// Combined ZIP lookup: Michigan data first (more detailed), then national
const _zipMap = buildZipMap();
// Override with more-detailed Michigan entries
for (const city of MICHIGAN_CITIES) {
  _zipMap[city.zip] = {
    zip: city.zip,
    city: city.name,
    state: "MI",
    zone: city.zone,
    grassType: city.grassType,
    soilType: city.soilType,
    challenges: city.challenges,
    avgLastFrost: city.avgLastFrost,
    avgFirstFrost: city.avgFirstFrost,
  };
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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

// Strip citation tags and stray HTML from AI-generated text.
// The web_search tool wraps claims in <cite index="...">...</cite> and sometimes
// similar markers — we want the plain prose only.
function stripCitations(value) {
  if (typeof value === "string") {
    return value
      .replace(/<\/?cite[^>]*>/gi, "")           // <cite index="..."> and </cite>
      .replace(/<\/?antml:cite[^>]*>/gi, "")     //  variants
      .replace(/<\/?source[^>]*>/gi, "")         // <source> tags
      .replace(/\[\d+(?:,\s*\d+)*\]/g, "")       // [1], [1,2,3] numeric citations
      .replace(/\s+\.(\s|$)/g, ".$1")            // fix " ." left after tag removal
      .replace(/\s+,/g, ",")                     // fix " ," artifacts
      .replace(/\s{2,}/g, " ")                   // collapse double spaces
      .trim();
  }
  if (Array.isArray(value)) return value.map(stripCitations);
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) out[k] = stripCitations(value[k]);
    return out;
  }
  return value;
}

// Look up verified city data from our combined ZIP map
function lookupCity(zip) {
  return _zipMap[zip] || null;
}

function buildPrompt(address, verified) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  // If we have verified data, anchor the prompt with it so the model cannot hallucinate zone/soil/grass
  const verifiedBlock = verified ? `
VERIFIED FACTS: These are authoritative values from USDA and NRCS databases. Do NOT contradict or override them with web search results:
- USDA Hardiness Zone: Zone ${verified.zone} (confirmed Zone ${verified.zone}, do not change this)
- Average last spring frost: ${verified.avgLastFrost}
- Average first fall frost: ${verified.avgFirstFrost}
- Dominant grass type for this location: ${verified.grassType}
- Soil type: ${verified.soilType}
- County: ${verified.county} County, Michigan
- Known local challenges: ${verified.challenges}

Use web search ONLY for: current weather conditions, recent rainfall, and any hyperlocal property-specific details. All zone and grass type information above is already verified and correct.
` : `
Use web search to research:
1. USDA hardiness zone and Koppen climate class for this exact location
2. Current weather conditions and recent rainfall at this address
3. Typical soil type for this neighborhood
4. Dominant grass species used in this area
5. Any locally relevant factors: proximity to water, elevation, urban heat, lake effect, etc.
`;

  return `You are an expert turfgrass agronomist providing a hyperlocal lawn care plan for a specific property address.

Today is ${today}.
Property address: ${address}
${verifiedBlock}
Think about what makes THIS specific address unique for lawn care:
- Street-level microclimates (shade from nearby buildings or trees, slope and aspect)
- Urban vs. suburban vs. rural character of the neighborhood
- Whether it is near a lake, river, or large body of water
- Regional pest and disease pressures specific to this municipality

Then output a single JSON object. Output only the JSON, no introduction or explanation before or after.

{
  "address": "${address}",
  "location": "West Branch, MI",
  "zone": "${verified ? `Zone ${verified.zone}` : "Zone 6a"}",
  "climate": "Humid Continental",
  "grassType": "${verified ? verified.grassType : "Kentucky Bluegrass / Fine Fescue mix"}",
  "season": "spring",
  "soilTemp": "50 degrees F, warming",
  "soilType": "${verified ? verified.soilType : "Loam"}",
  "currentCondition": "One sentence: what is happening with lawns at this specific address right now.",
  "propertyNotes": "One sentence about what makes this specific address notable for lawn care: proximity to water, soil, microclimate, neighborhood character, etc.",
  "insight": "Two to three sentences of expert analysis grounded in the VERIFIED FACTS above. Reference the correct zone (Zone ${verified ? verified.zone : "6a"}), the correct grass type, and the specific local challenges for this address. Do not contradict the verified zone or grass data.",
  "urgentTask": "The single most important lawn task for this address and today's date, one sentence.",
  "tasks": [
    {
      "category": "fertilize",
      "title": "Apply Pre-Emergent Fertilizer",
      "detail": "Detailed instructions for this zone and grass type. Include rate, soil temp trigger, and local timing.",
      "timing": "This week",
      "product": "Scotts Turf Builder Halts Crabgrass Preventer",
      "month": 3
    }
  ],
  "calendar": [
    { "month": 2, "task": "fertilize", "intensity": 2 }
  ],
  "tips": [
    "Tip specific to this address, zone, and local conditions.",
    "Tip two.",
    "Tip three."
  ]
}

Rules:
- tasks: 5 to 8 items for the next 60 days, matched to Zone ${verified ? verified.zone : "the correct zone"}
- calendar: full 12-month cycle, month is 0-indexed (0 = January), matched to this zone's growing season
- season must be one of: spring, summer, fall, winter
- category must be one of: fertilize, mow, water, overseed, aerate, weed, winterize
- product must be a real Amazon-searchable product name
- zone in output must match the VERIFIED FACTS above exactly
- DO NOT include any citation tags, footnote markers, or reference numbers in any string values. No <cite>, no [1], no source markers. Plain prose only.
- Output only the JSON object`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { address } = req.body;
  const cleanAddress = String(address || "").trim();
  if (cleanAddress.length < 10) {
    return res.status(400).json({ error: "Please enter a full street address including ZIP code." });
  }

  const zip = extractZip(cleanAddress);
  if (zip === "00000") {
    return res.status(400).json({ error: "Address must include a 5-digit ZIP code for accurate results." });
  }

  // Look up verified city data: prevents AI from hallucinating zone/soil/grass info
  const verified = lookupCity(zip);

  // Cache by normalized address + week
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const addressKey = cleanAddress.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
  const cacheKey = `lawn:addr:v2:${addressKey}:w${week}`;

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
        messages: [{ role: "user", content: buildPrompt(cleanAddress, verified) }],
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

    // Strip citation tags and numeric references from every string field
    const cleanPlan = stripCitations(plan);

    // Enforce verified facts on the output: last line of defense against hallucination
    if (verified) {
      cleanPlan.zone = `Zone ${verified.zone}`;
      cleanPlan.grassType = cleanPlan.grassType || verified.grassType;
      cleanPlan.soilType = cleanPlan.soilType || verified.soilType;
    }

    // Compute shareable lawn grade
    cleanPlan.grade = computeGrade(cleanPlan);

    // Save a shareable version to Redis with a short slug
    const slug = makePlanSlug();
    try {
      await redis.set(`lawn:share:v2:${slug}`, cleanPlan, { ex: 60 * 60 * 24 * 30 });
    } catch {}
    cleanPlan.shareSlug = slug;
    cleanPlan.shareUrl = `https://lawn.chrisizworski.com/plan/${slug}`;

    try { await redis.set(cacheKey, cleanPlan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan: cleanPlan });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Request failed. Please try again." });
  }
}
