import Layout from "../components/Layout";
import LawnAdvisorTool from "../components/LawnAdvisorTool";
import Link from "next/link";
import { PRODUCTS, PRICE_LABEL } from "../data/products";

const CURRENT_MONTH = new Date().getMonth();
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH_NAME = new Date().toLocaleString("en-US", { month: "long" });

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
      title={`${CURRENT_MONTH_NAME} ${CURRENT_YEAR} Lawn Care by Address: Hyperlocal Plans for Your Property`}
      description="Enter your full address and get a lawn care plan tailored to your exact property: USDA zone, soil type, local grass species, microclimate, and live weather conditions."
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
            description: "AI-powered personalized lawn care plans by street address",
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
              🌿 {CURRENT_MONTH} {CURRENT_YEAR} · AI-Powered · Free
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
            Your{" "}
            <span style={{
              background: "linear-gradient(90deg, var(--green-bright), var(--green-light), var(--green-bright))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>perfect lawn</span>
            {" "}starts with your address.
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: "clamp(14px, 2vw, 18px)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.7, opacity: 0.9 }}>
            Get a lawn care plan built for your specific property. We analyze your exact address: hardiness zone, soil type, neighborhood microclimate, local pest pressure, and what's happening with the weather at your location right now.
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
                Top picks for {CURRENT_MONTH_NAME}
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
              Science-backed. Hyperlocal. Instantly useful.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: "📍", title: "Your Exact Location", desc: "We analyze your exact street address: USDA zone, Koppen climate class, neighborhood soil type, and local microclimate factors like proximity to water or tree canopy." },
              { icon: "🌾", title: "Your Grass Species", desc: "Kentucky Bluegrass thrives differently than Fine Fescue or Tall Fescue. We tailor every recommendation to what's actually growing in your yard." },
              { icon: "🌦️", title: "Live Weather Data", desc: "Current conditions and recent precipitation affect everything from when to fertilize to whether your lawn needs water today." },
              { icon: "📅", title: "12-Month Calendar", desc: "A full-year care calendar mapped to your property's specific frost dates and local conditions, not a regional average." },
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
            Guides for every Michigan city and climate zone
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
                  with AI-powered, hyperlocal recommendations grounded in turfgrass science.
                </p>
              </div>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: 20, fontSize: 13 }}>
                About Chris Izworski →
              </Link>
            </div>
            <div className="card" style={{ background: "var(--green-pale)", border: "none" }}>
              <div className="section-label">Methodology</div>
              {[
                "USDA Hardiness Zone mapping by exact address",
                "NRCS Web Soil Survey for soil type",
                "NWS current conditions via web search",
                "MSU Extension turfgrass research",
                "Frost date data from NOAA climatology",
                "Amazon Associates product vetting",
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
