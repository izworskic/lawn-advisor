import { lookupPostal, hasStateConflict, resolveReference } from "../../lib/postal-geography.cjs";
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

function buildPrompt(location, verified) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  // If we have verified data, anchor the prompt with it so the model cannot hallucinate zone/soil/grass
  const verifiedBlock = `
REGIONAL CITY REFERENCE ESTIMATES (not measurements or verified property facts):
- Typical hardiness zone: Zone ${verified.zone}
- Average last spring frost: ${verified.avgLastFrost}
- Average first fall frost: ${verified.avgFirstFrost}
- Common regional grass types: ${verified.grassType}
- Typical soil: ${verified.soilType}
- Location: ${verified.city}, ${verified.state}
- Regional challenges: ${verified.challenges}

Use web search for dated regional weather and reliable local Extension guidance. Treat all weather, climate and grass type as regional context. Never infer shade, drainage, elevation, water proximity, soil condition or actual species at a property. Recommend checking actual conditions first. Do not give definitive product or pesticide application instructions without label and local guidance.
`;

  return `You are a turfgrass agronomy guide providing conditional regional lawn planning guidance.
Today is ${today}.
Postal locality: ${location}
${verifiedBlock}
Then output a single JSON object. Output only the JSON, no introduction or explanation before or after.

{
  "address": "${location}",
  "location": "${verified ? `${verified.city}, ${verified.state}` : "Use a location supported by evidence or say unverified"}",
  "zone": "${verified ? `Zone ${verified.zone}` : "Zone 6a"}",
  "climate": "Humid Continental",
  "grassType": "${verified ? verified.grassType : "Kentucky Bluegrass / Fine Fescue mix"}",
  "season": "spring",
  "soilTemp": "Not measured at this property",
  "soilType": "${verified ? verified.soilType : "Loam"}",
  "currentCondition": "Regional seasonal context only; actual lawn condition is unknown.",
  "propertyNotes": "Regional context and what the visitor needs to verify on site. Do not invent property-specific facts.",
  "insight": "Conditional regional guidance based on the city estimates, not actual grass or soil measurements.",
  "urgentTask": "A conditional regional planning priority; confirm local conditions before action.",
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
    "Regional planning tip, subject to actual site conditions.",
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
  if (cleanAddress.length < 5 || cleanAddress.length > 250) {
    return res.status(400).json({ error: "Enter a five-digit US ZIP code or an address ending in one." });
  }

  const zip = extractZip(cleanAddress);
  if (zip === "00000") {
    return res.status(400).json({ error: "Address must include a 5-digit ZIP code for accurate results." });
  }

  const postal = lookupPostal(zip);
  if (!postal) return res.status(503).json({ error: "ZIP locality is not in the current postal reference. Check the ZIP or consult your local Extension office." });
  if (hasStateConflict(cleanAddress, postal)) return res.status(400).json({ error: "The supplied state conflicts with this ZIP. Check the ZIP and state." });
  const { reference: verified, scope } = resolveReference(postal, _zipMap);
  const locality = `${postal.city}, ${postal.state} ${zip}`;
  const geoNotice = scope === "zip-reference" ? "Existing city reference for this ZIP." : scope === "city-reference" ? "Existing same-city reference; not specific to this ZIP." : "Postal locality only; no detailed agronomic city reference.";
  const notice = evidenceNotice + " " + geoNotice;
  if (!verified) {
    const plan = fallbackPlan(postal, new Date());
    return res.status(200).json({ plan: { ...plan, location: locality, evidenceNotice: notice + " Showing general checks only; local climate and growing conditions are not established." }, degraded: true, geography: scope });
  }

  // Cache regional ZIP context only; never send a street address to the model.
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const cacheKey = `lawn:zip:v4:${zip}:w${week}`;
  const degraded = (reason, status = null) => {
    // Fixed enumerated reason/status only: no credentials, addresses, prompts or provider bodies.
    console.warn(JSON.stringify({ event: "lawn-plan-provider-fallback", reason, status }));
    const plan = fallbackPlan(verified, new Date());
    return res.status(200).json({ plan: { ...plan, location: locality, evidenceNotice: plan.evidenceNotice + " " + geoNotice }, degraded: true, geography: scope });
  };

  try {
    const cached = await redis.get(cacheKey);
    if (validPlan(cached) && cached.evidenceNotice === notice && cached.location === locality) return res.status(200).json({ plan: cached, cached: true, geography: scope });
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
        messages: [{ role: "user", content: buildPrompt(locality, verified) }],
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
      cleanPlan.location = locality;
      cleanPlan.grassType = verified.grassType;
      cleanPlan.soilType = verified.soilType;
    }

    // Regional context, not measured property condition or a lawn health grade.
    cleanPlan.evidenceNotice = notice;
    cleanPlan.currentCondition = "Current condition at your property is not measured.";
    cleanPlan.propertyNotes = "Check your grass species, soil, drainage, shade and actual weather before following regional advice.";
    delete cleanPlan.address;
    cleanPlan.soilTemp = "Not measured at this property";
    cleanPlan.grade = null;
    delete cleanPlan.shareSlug;
    delete cleanPlan.shareUrl;

    // Do not automatically publish a street-address plan to a public URL.
    try { await redis.set(cacheKey, cleanPlan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan: cleanPlan, geography: scope });
  } catch (e) {
    return degraded(e?.name === "TimeoutError" || e?.name === "AbortError" ? "provider-timeout" : "provider-transport-error");
  }
}
