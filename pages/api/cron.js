import { MICHIGAN_CITIES } from "../../data/michigan-cities";

const INDEXNOW_KEY = "f8a3b2c1d4e5f6a7b8c9d0e1f2a3b4c5";
const BASE = "https://lawn.chrisizworski.com";

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const urls = [
    `${BASE}/`,
    `${BASE}/lawn-guide`,
    `${BASE}/lawn-guide/michigan`,
    ...MICHIGAN_CITIES.map(c => `${BASE}/lawn-guide/michigan/${c.slug}`),
  ];

  try {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "lawn.chrisizworski.com",
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 100),
      }),
    });
    return res.status(200).json({ ok: true, status: r.status, urls: urls.length });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
