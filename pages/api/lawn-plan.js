import { createHash } from "node:crypto";
import { ToolState } from '../../lib/tool-state.cjs';
import { MICHIGAN_CITIES } from "../../data/michigan-cities";
import { US_CITIES, buildZipMap } from "../../data/us-cities";
import { fallbackPlan, validPlan, evidenceNotice } from "../../lib/lawn-plan-evidence.cjs";

// Combined ZIP lookup: Michigan data first (more detailed), then national
const _zipMap = buildZipMap();
// Override with more-detailed Michigan entries
for (const city of MICHIGAN_CITIES) {
  _zipMap[city.zip] = {
    zip: city.zip,
    city: city.name,
    state: "MI",
    county: city.county,
    zone: city.zone,
    grassType: city.grassType,
    soilType: city.soilType,
    challenges: city.challenges,
    avgLastFrost: city.avgLastFrost,
    avgFirstFrost: city.avgFirstFrost,
  };
}

const redis = new ToolState();

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
  const m = String(address).match(/\b(\d{5})(?:-\d{4})?(?:\s*,?\s+(?:USA|US|U\.S\.A\.?|U\.S\.?|United States(?: of America)?))?\s*$/i);
  return m ? m[1] : "00000";
}

// Strip citation tags and stray HTML from AI-generated text.
// The web_search tool wraps claims in <cite index="...">...</cite> and sometimes
// similar markers. We want plain prose only.
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
REGIONAL REFERENCE DATA: These are existing ZIP-level city estimates, not measurements of this property. Do NOT invent property measurements or represent these estimates as verified parcel data:
- USDA Hardiness Zone: Zone ${verified.zone} (confirmed Zone ${verified.zone}, do not change this)
- Average last spring frost: ${verified.avgLastFrost}
- Average first fall frost: ${verified.avgFirstFrost}
- Dominant grass type for this location: ${verified.grassType}
- Soil type: ${verified.soilType}
- Location: ${verified.city}, ${verified.state}${verified.county ? ` (${verified.county} County)` : ""}
- Known local challenges: ${verified.challenges}

Use web search for dated regional weather and reliable local guidance. Do not infer the actual grass species, soil, drainage, shade, or microclimate of an individual property. If a measurement is unavailable, say so.
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
  "location": "${verified ? `${verified.city}, ${verified.state}` : "Use a location supported by evidence or say unverified"}",
  "zone": "${verified ? `Zone ${verified.zone}` : "Zone 6a"}",
  "climate": "Humid Continental",
  "grassType": "${verified ? verified.grassType : "Kentucky Bluegrass / Fine Fescue mix"}",
  "season": "spring",
  "soilTemp": "Not measured at this property",
  "soilType": "${verified ? verified.soilType : "Loam"}",
  "currentCondition": "One sentence: what is happening with lawns at this specific address right now.",
  "propertyNotes": "Regional context and what the visitor needs to verify on site. Do not invent property-specific facts.",
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
- zone in output must match the regional reference if available. Do not claim an unmeasured property condition is known. Distinguish forecasts, regional estimates and actual measurements. Do not apply fertilizer to dormant turf, frozen or saturated ground; follow local extension and label guidance.
- DO NOT include any citation tags, footnote markers, or reference numbers in any string values. No <cite>, no [1], no source markers. Plain prose only.
- Output only the JSON object`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { address } = req.body || {};
  const cleanAddress = typeof address === "string" ? address.trim() : "";
  if (cleanAddress.length < 10 || cleanAddress.length > 250) {
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
  const addressKey = createHash("sha256").update(cleanAddress.toLowerCase()).digest("hex");
  const cacheKey = `lawn:addr:v3:${addressKey}:w${week}`;
  const degraded = (reason, status = null) => {
    // Fixed enumerated reason/status only: no credentials, addresses, prompts or provider bodies.
    console.warn(JSON.stringify({ event: "lawn-plan-provider-fallback", reason, status }));
    const plan = fallbackPlan(verified, new Date());
    return plan ? res.status(200).json({ plan, degraded: true }) : res.status(503).json({ error: "Local planning data is unavailable for this ZIP. Try again or consult your local Extension office." });
  };

  try {
    const cached = await redis.get(cacheKey);
    if (validPlan(cached) && cached.evidenceNotice === evidenceNotice) return res.status(200).json({ plan: cached, cached: true });
  } catch {}

  if (!process.env.ANTHROPIC_API_KEY) return degraded("missing-credential");
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      signal: AbortSignal.timeout(25000),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        thinking: { type: "between_tools" },
        output_config: { effort: "low" },
        max_tokens: 3000,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
        messages: [{ role: "user", content: buildPrompt(cleanAddress, verified) }],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const reason = status === 401 ? "authentication" : status === 402 ? "billing" : status === 403 ? "permission" : status === 404 ? "model-or-endpoint-unavailable" : status === 429 ? "rate-or-spend-limit" : status === 400 ? "invalid-request" : status >= 500 ? "provider-server-error" : "provider-http-error";
      return degraded(reason, status);
    }
    const data = await response.json().catch(() => null);
    if (!data || data.error) return degraded("invalid-provider-response");
    if (data.stop_reason && data.stop_reason !== "end_turn") return degraded("incomplete-model-response");
    if (data.content?.some(b => b.type === "web_search_tool_result" && b.content?.type === "web_search_tool_result_error")) return degraded("web-search-unavailable");

    const fullText = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    const plan = extractJSON(fullText);
    if (!validPlan(plan)) return degraded("invalid-plan-shape");

    // Strip citation tags and numeric references from every string field
    const cleanPlan = stripCitations(plan);

    // Enforce verified facts on the output: last line of defense against hallucination
    if (verified) {
      cleanPlan.zone = `Zone ${verified.zone}`;
      cleanPlan.location = `${verified.city}, ${verified.state}`;
      cleanPlan.grassType = verified.grassType;
      cleanPlan.soilType = verified.soilType;
    }

    // Regional context, not measured property condition or a lawn health grade.
    cleanPlan.evidenceNotice = evidenceNotice;
    cleanPlan.soilTemp = "Not measured at this property";
    cleanPlan.grade = null;
    delete cleanPlan.shareSlug;
    delete cleanPlan.shareUrl;

    // Do not automatically publish a street-address plan to a public URL.
    try { await redis.set(cacheKey, cleanPlan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan: cleanPlan });
  } catch (e) {
    return degraded(e?.name === "TimeoutError" || e?.name === "AbortError" ? "provider-timeout" : "provider-transport-error");
  }
}
