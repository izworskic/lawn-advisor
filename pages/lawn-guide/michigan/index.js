import Layout from "../../../components/Layout";
import Link from "next/link";
import { MICHIGAN_CITIES } from "../../../data/michigan-cities";

const ZONES = ["6b", "6a", "5b", "5a"];
const ZONE_LABELS = {
  "6b": { label: "Zone 6b: Southern Lower Peninsula", color: "#4a7c59", desc: "Warmest Michigan zone. Longest growing season. Kentcky Bluegrass and Tall Fescue thrive here. Spring pre-emergent timing is critical." },
  "6a": { label: "Zone 6a: Central & Northern Lower Peninsula", color: "#7ab648", desc: "The heart of Michigan lawn country. Cool-season grasses excel. First frost comes in October. Bay City, Traverse City, Midland, and the AuSable corridor." },
  "5b": { label: "Zone 5b: Far North Lower & Eastern UP", color: "#2d6a2d", desc: "Short growing season, 140-150 days. Fine Fescue dominates. Snow mold prevention is essential. Overseed windows are narrow. Don't miss September." },
  "5a": { label: "Zone 5a: Upper Peninsula", color: "#0f2a0f", desc: "Michigan's most demanding lawn zone. 120-day seasons in some areas. Fine Fescue and Creeping Red Fescue. Expect to fight voles, snow mold, and iron-poor sandy soils." },
};

export default function MichiganPage() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout
      title={`Michigan Lawn Care Guide ${currentYear}: All Zones & Cities`}
      description={`Complete Michigan lawn care guides for every city and USDA hardiness zone. Zone 5a through 6b. Personalized schedules for Kentucky Bluegrass, Fine Fescue, and more.`}
      canonical="https://lawn.chrisizworski.com/lawn-guide/michigan"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Michigan Lawn Care Guide ${currentYear}`,
            url: "https://lawn.chrisizworski.com/lawn-guide/michigan",
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            about: { "@type": "Thing", name: "Lawn Care in Michigan" },
          }),
        }}
      />

      {/* Hero */}
      <div className="hero-dark" style={{ padding: "56px 24px" }}>
        <div className="container-narrow">
          <div className="breadcrumb" style={{ color: "rgba(197,232,160,0.6)", marginBottom: 16 }}>
            <Link href="/" style={{ color: "var(--green-bright)" }}>Perfect Lawn Advisor</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Michigan Lawn Guide</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, color: "var(--green-pale)", lineHeight: 1.15, marginBottom: 16 }}>
            Michigan Lawn Care Guide {currentYear}
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 16, lineHeight: 1.7, maxWidth: 600, opacity: 0.9 }}>
            Michigan spans four USDA hardiness zones and multiple grass-growing climates. 
            From UP tundra to southwest lakeside warmth, every region requires a different approach.
            Find your city below or use our{" "}
            <Link href="/" style={{ color: "var(--green-bright)" }}>ZIP code tool</Link>{" "}
            for a fully personalized plan.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(122,182,72,0.15)", borderRadius: 10, padding: "10px 20px", border: "1px solid rgba(122,182,72,0.3)" }}>
              <div style={{ color: "var(--green-bright)", fontWeight: 900, fontSize: 22, fontFamily: "var(--font-display)" }}>{MICHIGAN_CITIES.length}</div>
              <div style={{ color: "var(--green-light)", fontSize: 12 }}>Michigan cities covered</div>
            </div>
            <div style={{ background: "rgba(122,182,72,0.15)", borderRadius: 10, padding: "10px 20px", border: "1px solid rgba(122,182,72,0.3)" }}>
              <div style={{ color: "var(--green-bright)", fontWeight: 900, fontSize: 22, fontFamily: "var(--font-display)" }}>4</div>
              <div style={{ color: "var(--green-light)", fontSize: 12 }}>USDA hardiness zones</div>
            </div>
            <div style={{ background: "rgba(122,182,72,0.15)", borderRadius: 10, padding: "10px 20px", border: "1px solid rgba(122,182,72,0.3)" }}>
              <div style={{ color: "var(--green-bright)", fontWeight: 900, fontSize: 22, fontFamily: "var(--font-display)" }}>Free</div>
              <div style={{ color: "var(--green-light)", fontSize: 12 }}>AI-powered ZIP tool</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone sections */}
      <div style={{ padding: "56px 24px" }}>
        <div className="container">
          {ZONES.map(zone => {
            const cities = MICHIGAN_CITIES.filter(c => c.zone === zone);
            const z = ZONE_LABELS[zone];
            return (
              <div key={zone} id={`zone-${zone.replace(".", "")}`} style={{ marginBottom: 56 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", color: "var(--green-dark)" }}>
                        {z.label}
                      </h2>
                      <span className="tag tag-zone" style={{ background: z.color + "18", color: z.color }}>
                        Zone {zone}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 680 }}>{z.desc}</p>
                  </div>
                </div>

                <div className="city-grid">
                  {cities.map(city => (
                    <Link href={`/lawn-guide/michigan/${city.slug}`} key={city.slug} className="city-card">
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--green-dark)", marginBottom: 6 }}>
                        {city.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>{city.county} County</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span className="tag" style={{ fontSize: 10 }}>Zone {city.zone}</span>
                        <span className="tag" style={{ fontSize: 10, background: "#e8f5d0" }}>{city.grassType.split("/")[0].trim()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--green-pale)", padding: "48px 24px", textAlign: "center" }}>
        <div className="container-narrow">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--green-dark)", marginBottom: 12 }}>
            Don't see your city? Use the ZIP tool.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 24 }}>
            The AI advisor works for any U.S. ZIP code, Michigan or beyond.
          </p>
          <Link href="/" className="btn btn-primary">Get My Personalized Plan →</Link>
        </div>
      </div>
    </Layout>
  );
}
