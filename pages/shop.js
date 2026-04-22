import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, PRICE_LABEL } from "../data/products";

const CURRENT_MONTH = new Date().getMonth();
const SEASON_MAP = {
  0: "winter", 1: "winter", 2: "spring", 3: "spring", 4: "spring",
  5: "summer", 6: "summer", 7: "summer", 8: "fall", 9: "fall",
  10: "fall",  11: "winter",
};
const CURRENT_SEASON = SEASON_MAP[CURRENT_MONTH];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#e8a020", fontSize: 13, letterSpacing: -1 }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: "var(--text-muted)", fontSize: 11, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function ProductCard({ product, highlight }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: highlight
          ? "2px solid var(--green-bright)"
          : "1px solid var(--border)",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        boxShadow: highlight
          ? "0 4px 20px rgba(122,182,72,0.15)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = highlight
          ? "0 4px 20px rgba(122,182,72,0.15)"
          : "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      {/* Season badge */}
      {product.season.includes(CURRENT_SEASON) && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "var(--green-bright)", color: "#fff",
          fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
          textTransform: "uppercase", borderRadius: 99, padding: "2px 9px",
        }}>
          Buy Now
        </div>
      )}

      <div>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 16, color: "var(--green-dark)", lineHeight: 1.3,
          marginBottom: 4, paddingRight: product.season.includes(CURRENT_SEASON) ? 60 : 0,
        }}>
          {product.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--green-primary)", fontWeight: 600 }}>
          {product.tagline}
        </div>
      </div>

      <StarRating rating={product.rating} />

      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: 0, flex: 1 }}>
        {product.why}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{
          fontSize: 12, color: "var(--text-muted)",
          background: "#f5f5f0", borderRadius: 6, padding: "2px 8px",
        }}>
          {PRICE_LABEL[product.priceRange]}
        </span>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#ff9900", color: "#fff",
            fontWeight: 700, fontSize: 13,
            padding: "8px 16px", borderRadius: 8,
            textDecoration: "none",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#e68a00"}
          onMouseLeave={e => e.currentTarget.style.background = "#ff9900"}
        >
          <svg width="14" height="14" viewBox="0 0 48 48" fill="white">
            <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 28l-8-8 2.83-2.83L22 26.34l9.17-9.17L34 20l-12 12z"/>
          </svg>
          Shop Amazon
        </a>
      </div>

      {/* Seasons row */}
      <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
        {["spring","summer","fall","winter"].map(s => (
          <span key={s} style={{
            fontSize: 10, padding: "1px 7px", borderRadius: 99,
            background: product.season.includes(s) ? "var(--green-pale)" : "#f0f0ec",
            color: product.season.includes(s) ? "var(--green-primary)" : "#bbb",
            fontWeight: product.season.includes(s) ? 700 : 400,
            textTransform: "capitalize",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSeason, setActiveSeason] = useState("now");

  const filtered = PRODUCTS.filter(p => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const seasonMatch = activeSeason === "all" || p.season.includes(
      activeSeason === "now" ? CURRENT_SEASON : activeSeason
    );
    return catMatch && seasonMatch;
  });

  const nowCount = PRODUCTS.filter(p => p.season.includes(CURRENT_SEASON)).length;

  return (
    <Layout
      title="Lawn Care Products: Michigan Picks and Amazon Recommendations"
      description="Curated lawn care products for Michigan cool-season lawns. Fertilizers, pre-emergents, grass seed, aerators, and more. All vetted for Zone 5a through 6b."
      canonical="https://lawn.chrisizworski.com/shop"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Lawn Care Products: Michigan Picks",
            url: "https://lawn.chrisizworski.com/shop",
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            description: "Curated lawn care products for Michigan cool-season lawns.",
          }),
        }}
      />

      {/* Hero */}
      <div className="hero-dark" style={{ padding: "52px 24px" }}>
        <div className="container-narrow">
          <div className="breadcrumb" style={{ color: "rgba(197,232,160,0.6)" }}>
            <Link href="/" style={{ color: "var(--green-bright)" }}>Perfect Lawn Advisor</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Shop</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,48px)",
            fontWeight: 900, color: "var(--green-pale)", lineHeight: 1.15, margin: "16px 0 12px",
          }}>
            Lawn Care Products<br />
            <span style={{ color: "var(--green-bright)" }}>Vetted for Michigan Lawns</span>
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.7, maxWidth: 560, opacity: 0.9 }}>
            Every product here is something I would actually use on a Michigan cool-season lawn.
            No generic national lists. These picks are matched to Zones 5a through 6b,
            clay-loam soils, and the real pest and disease pressures in this region.
          </p>
          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(197,232,160,0.5)", fontStyle: "italic" }}>
            Amazon affiliate links support this free resource. Prices and availability vary.
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 24px 80px" }}>
        <div className="container">

          {/* Season + Category filters */}
          <div style={{ marginBottom: 36, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Season filter */}
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>Filter by Season</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { key: "now", label: `Buy Now (${nowCount} products)`, icon: "⚡" },
                  { key: "all", label: "All Seasons", icon: "📅" },
                  { key: "spring", label: "Spring", icon: "🌸" },
                  { key: "summer", label: "Summer", icon: "☀️" },
                  { key: "fall",   label: "Fall",   icon: "🍂" },
                  { key: "winter", label: "Winter", icon: "❄️" },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setActiveSeason(s.key)}
                    style={{
                      padding: "8px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600,
                      cursor: "pointer", border: "2px solid",
                      borderColor: activeSeason === s.key ? "var(--green-bright)" : "var(--border)",
                      background: activeSeason === s.key ? "var(--green-bright)" : "#fff",
                      color: activeSeason === s.key ? "#fff" : "var(--text-muted)",
                      transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: 5,
                    }}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>Filter by Category</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveCategory("all")}
                  style={{
                    padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", border: "2px solid",
                    borderColor: activeCategory === "all" ? "var(--green-primary)" : "var(--border)",
                    background: activeCategory === "all" ? "var(--green-pale)" : "#fff",
                    color: activeCategory === "all" ? "var(--green-primary)" : "var(--text-muted)",
                    transition: "all 0.15s",
                  }}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", border: "2px solid",
                      borderColor: activeCategory === cat.id ? "var(--green-primary)" : "var(--border)",
                      background: activeCategory === cat.id ? "var(--green-pale)" : "#fff",
                      color: activeCategory === cat.id ? "var(--green-primary)" : "var(--text-muted)",
                      transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div style={{ marginBottom: 20, fontSize: 13, color: "var(--text-muted)" }}>
            Showing {filtered.length} of {PRODUCTS.length} products
          </div>

          {/* Product grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                highlight={p.season.includes(CURRENT_SEASON)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>No products match that filter.</div>
              <button onClick={() => { setActiveCategory("all"); setActiveSeason("all"); }}
                className="btn btn-outline" style={{ marginTop: 16, fontSize: 13 }}>
                Clear Filters
              </button>
            </div>
          )}

          {/* AdSense */}
          <div style={{ margin: "48px 0 0", textAlign: "center" }}>
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8222782620788075"
              data-ad-slot="5432109876"
              data-ad-format="auto"
              data-full-width-responsive="true" />
          </div>

          {/* Disclaimer + CTA */}
          <div style={{
            marginTop: 48, padding: "32px", background: "var(--green-pale)",
            borderRadius: 16, textAlign: "center",
          }}>
            <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>
              Get Your Personalized Plan
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: 24,
              color: "var(--green-dark)", margin: "10px 0 12px",
            }}>
              Not sure what your lawn needs?
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
              Enter your address and our AI advisor will tell you exactly which products to buy,
              when to apply them, and in what order based on your specific location and current conditions.
            </p>
            <Link href="/" className="btn btn-primary">Get My Address Plan →</Link>
          </div>

          {/* Affiliate disclosure */}
          <div style={{ marginTop: 40, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 640, margin: "40px auto 0", textAlign: "center" }}>
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases.
            Product links on this page use my affiliate tag (michigantrout-20). This does not affect the price you pay
            and helps support free lawn care content on this site. Products are selected based on my own research
            and experience with Michigan cool-season lawns. By <a href="https://chrisizworski.com">Chris Izworski</a>, Bay City, Michigan.
          </div>
        </div>
      </div>
    </Layout>
  );
}
