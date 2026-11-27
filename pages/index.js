import Layout from "../components/Layout";
import LawnAdvisorTool from "../components/LawnAdvisorTool";
import Link from "next/link";
import { PRODUCTS, PRICE_LABEL } from "../data/products";

const CURRENT_MONTH = new Date().getMonth();

const SEASON_MAP = {
  0:"winter",1:"winter",2:"spring",3:"spring",4:"spring",
  5:"summer",6:"summer",7:"summer",8:"fall",9:"fall",10:"fall",11:"winter"
};
const CURRENT_SEASON = SEASON_MAP[CURRENT_MONTH];
// Top 4 products for current season on homepage strip
const NOW_PRODUCTS = PRODUCTS.filter(p => p.season.includes(CURRENT_SEASON)).slice(0, 4);

export default function HomePage() {
  return (
    <Layout
      title="Personalized Lawn Care Plan by Address"
      description="Enter a US ZIP code for regional lawn planning guidance, typical grass and soil context where available, and conditional seasonal tasks."
      canonical="https://lawn.chrisizworski.com"
    >
      {/* Schema: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Perfect Lawn Advisor",
            applicationCategory: "LifestyleApplication",
            url: "https://lawn.chrisizworski.com",
            description: "AI-assisted regional lawn planning by ZIP code",
            author: {
              "@type": "Person",
              "@id": "https://chrisizworski.com/#person",
              name: "Chris Izworski",
              url: "https://chrisizworski.com/",
              sameAs: [
                "https://chrisizworski.com",
                "https://trout.chrisizworski.com",
                "https://troutdaily.chrisizworski.com",
                "https://birding.chrisizworski.com",
                "https://birdingdaily.chrisizworski.com",
                "https://gazette.chrisizworski.com",
                "https://lawn.chrisizworski.com",
                "https://freighterviewfarms.com",
                "https://www.wikidata.org/wiki/Q138283432",
              ],
            },
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {/* Schema: FAQPage for rich snippet eligibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How is Perfect Lawn Advisor different from other lawn care apps?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The ZIP identifies a postal locality and the tool uses an existing city reference when available. Grass, soil, drainage and weather at your property are not measured. Confirm local conditions before acting.",
                },
              },
              {
                "@type": "Question",
                name: "Is Perfect Lawn Advisor free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The address tool, city guides, articles, and personalized plans are all free. The site is supported by Amazon affiliate links on recommended products.",
                },
              },
              {
                "@type": "Question",
                name: "How often should I update my lawn plan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Plans refresh weekly to account for changing weather and seasonal shifts. For best results, generate a new plan at the start of each season.",
                },
              },
              {
                "@type": "Question",
                name: "What USDA zones does Perfect Lawn Advisor cover?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The postal directory contains 42,049 ZIP records in its source snapshot. Detailed regional lawn references cover selected cities only; other recognized ZIPs get general checks without invented local estimates.",
                },
              },
              {
                "@type": "Question",
                name: "Can I share my lawn plan with others?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "New plans are not automatically published or assigned a lawn health grade. No street address is sent to the AI provider.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <div className="hero-dark" style={{ position: "relative" }}>
        {/* Decorative grass */}
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", bottom: 0,
            left: `${5 + i * 14}%`,
            width: 3 + (i % 3),
            height: 50 + (i * 17) % 90,
            background: "linear-gradient(to top, rgba(122,182,72,0.5), transparent)",
            borderRadius: "50% 50% 0 0",
            transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 2)}deg)`,
            transformOrigin: "bottom center",
            pointerEvents: "none",
          }} />
        ))}

        <div className="container-narrow" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ marginBottom: 12 }}>
            <span className="tag" style={{ background: "rgba(122,182,72,0.15)", color: "var(--green-bright)", fontSize: 11, letterSpacing: 2 }}>
              🌿 ZIP-Based · AI-Assisted · Free
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            color: "var(--green-pale)",
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: -1,
          }}>
            <span style={{
              display: "block",
              fontFamily: "var(--font-sans, system-ui)",
              fontSize: "clamp(11px, 1.4vw, 13px)",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--green-light)",
              marginBottom: 12,
              opacity: 0.85,
            }}>By Chris Izworski</span>
            Your{" "}
            <span style={{
              background: "linear-gradient(90deg, var(--green-bright), var(--green-light), var(--green-bright))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>perfect lawn</span>
            {" "}starts with your ZIP code.
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: "clamp(14px, 2vw, 18px)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.7, opacity: 0.9 }}>
            Find regional lawn guidance using your ZIP code. Where a city reference is available, explore typical climate, grasses and seasonal care. Your actual lawn, soil and microclimate need to be checked on site.
          </p>

          {/* Address Tool embedded in hero */}
          <LawnAdvisorTool />
        </div>
      </div>

      {/* Seasonal product strip */}
      <section style={{ padding: "32px 24px 0", background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="section-label">Buy Now</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--green-dark)", fontWeight: 700 }}>
                Seasonal lawn care picks
              </div>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ fontSize: 12, padding: "8px 18px" }}>
              Full Product Shop →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, paddingBottom: 28 }}>
            {NOW_PRODUCTS.map(p => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", padding: "14px 16px",
                  background: "var(--green-pale)", borderRadius: 12,
                  border: "1px solid var(--border)", textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-bright)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--green-dark)", marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--green-primary)", marginBottom: 6 }}>{p.tagline}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{PRICE_LABEL[p.priceRange]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#ff9900" }}>Shop Amazon →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>How It Works</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,38px)", color: "var(--green-dark)", marginTop: 8 }}>
              Regional guidance for real lawn conditions.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: "📍", title: "Your Postal Locality", desc: "Your ZIP identifies a postal locality, not a parcel or measured conditions. Regional estimates are shown only where a city reference is available." },
              { icon: "🌾", title: "Typical Regional Grasses", desc: "Kentucky bluegrass, fine fescue and tall fescue respond differently to care. Identify your own grass before choosing a treatment." },
              { icon: "🌦️", title: "Regional Weather Context", desc: "Regional weather can inform planning. Check current conditions, soil moisture and local restrictions before acting." },
              { icon: "📅", title: "12-Month Calendar", desc: "A regional calendar when a city reference is available. Actual seasonal timing and frost dates can differ." },
            ].map((f, i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--green-dark)", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense unit */}
      <div style={{ textAlign: "center", padding: "8px 24px", background: "#f8fdf5" }}>
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8222782620788075"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true" />
      </div>

      {/* Michigan city guides promo */}
      <section style={{ padding: "64px 24px", background: "var(--green-pale)" }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>Michigan Lawn Care Guides</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,36px)", color: "var(--green-dark)", margin: "10px 0 16px" }}>
            Guides for Michigan cities and climate zones
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
            From Zone 5a in the Upper Peninsula to Zone 6b in the southwest, Michigan spans multiple 
            grass-growing climates. Find pre-built guides for your city.
          </p>
          <Link href="/lawn-guide/michigan" className="btn btn-primary" style={{ fontSize: 15 }}>
            Browse Michigan City Guides →
          </Link>
        </div>
      </section>

      {/* Authority / About */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div className="container-narrow">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div className="section-label">About This Resource</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--green-dark)", margin: "10px 0 16px" }}>
                Built by a Michigan outdoorsman who takes his lawn seriously
              </h2>
              <div className="prose">
                <p>
                  <a href="https://chrisizworski.com">Chris Izworski</a> is a Bay City, Michigan-based outdoorsman, 
                  gardener, and writer behind{" "}
                  <a href="https://freighterviewfarms.com">Freighter View Farms</a>. He built this tool 
                  because the existing lawn care resources, including MSU Extension PDFs, generic fertilizer bags, and national apps, which ignored the reality of Michigan's diverse climate zones.
                </p>
                <p>
                  Zone 6a Bay City lawns behave nothing like Zone 5a Marquette lawns. This tool bridges that gap 
                  with AI-assisted regional recommendations grounded in turfgrass science.
                </p>
              </div>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: 20, fontSize: 13 }}>
                About Chris Izworski →
              </Link>
            </div>
            <div className="card" style={{ background: "var(--green-pale)", border: "none" }}>
              <div className="section-label">Methodology</div>
              {[
                "Regional hardiness zone estimates where available",
                "Typical city soil references; confirm with a soil test",
                "Regional weather context when available",
                "MSU Extension turfgrass research",
                "Regional frost-date estimates",
                "Optional product links; check the label before use",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                  <span style={{ color: "var(--green-bright)", fontWeight: 900 }}>✓</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
