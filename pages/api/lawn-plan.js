import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function parsePlan(text) {
  try {
    const m = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*?\})/s);
    if (m) return JSON.parse(m[1]);
  } catch {}
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { zip, prompt } = req.body;
  if (!zip || zip.length !== 5) return res.status(400).json({ error: "Invalid ZIP" });

  // Cache by ZIP + week (so plans refresh weekly)
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const cacheKey = `lawn:plan:${zip}:w${week}`;

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
        max_tokens: 2048,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const fullText = (data.content || [])
      .map(b => b.type === "text" ? b.text : "")
      .join("\n");

    const plan = parsePlan(fullText);
    if (!plan) return res.status(500).json({ error: "Could not parse plan. Please try again." });

    // Cache for 7 days
    try { await redis.set(cacheKey, plan, { ex: 60 * 60 * 24 * 7 }); } catch {}

    return res.status(200).json({ plan });
  } catch (e) {
    return res.status(500).json({ error: e.message || "AI request failed" });
  }
}
