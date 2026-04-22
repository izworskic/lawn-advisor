import { MICHIGAN_CITIES } from "../data/michigan-cities";

export default function SitemapXML(req, res) {}

export async function getServerSideProps({ res }) {
  const base = "https://lawn.chrisizworski.com";
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: base, priority: "1.0", freq: "daily" },
    { url: `${base}/lawn-guide`, priority: "0.9", freq: "weekly" },
    { url: `${base}/lawn-guide/michigan`, priority: "0.9", freq: "weekly" },
    { url: `${base}/about`, priority: "0.7", freq: "monthly" },
  ];

  const cityPages = MICHIGAN_CITIES.map(c => ({
    url: `${base}/lawn-guide/michigan/${c.slug}`,
    priority: "0.8",
    freq: "weekly",
  }));

  const all = [...staticPages, ...cityPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(p => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.write(xml);
  res.end();

  return { props: {} };
}
