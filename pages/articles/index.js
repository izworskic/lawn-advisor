import Layout from "../../components/Layout";
import Link from "next/link";
import { ARTICLES, CATEGORIES } from "../../data/articles";

export default function ArticlesIndex() {
  return (
    <Layout
      title="Lawn Care Articles: Expert Guides by USDA Zone"
      description="In-depth guides on fertilization timing, overseeding, pre-emergent control, and zone-specific lawn care. Research-backed, written by Chris Izworski."
      canonical="https://lawn.chrisizworski.com/articles"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            url: "https://lawn.chrisizworski.com/articles",
            name: "Perfect Lawn Advisor Articles",
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            blogPost: ARTICLES.map(a => ({
              "@type": "BlogPosting",
              headline: a.title,
              url: `https://lawn.chrisizworski.com/articles/${a.slug}`,
              datePublished: a.publishDate,
              author: { "@type": "Person", name: "Chris Izworski" },
            })),
          }),
        }}
      />

      <div className="hero-dark" style={{ padding: "56px 24px" }}>
        <div className="container-narrow">
          <div className="breadcrumb" style={{ color: "rgba(197,232,160,0.6)" }}>
            <Link href="/" style={{ color: "var(--green-bright)" }}>Perfect Lawn Advisor</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Articles</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "var(--green-pale)", margin: "16px 0 12px" }}>
            Lawn Care Articles
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
            Research-backed lawn care guides. No clickbait, no generic advice. Just what actually works, 
            grounded in turfgrass science and USDA zone data.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gap: 20 }}>
          {ARTICLES.map(article => {
            const cat = CATEGORIES.find(c => c.id === article.category);
            return (
              <Link href={`/articles/${article.slug}`} key={article.slug}
                style={{
                  display: "block", background: "#fff", borderRadius: 16,
                  padding: "24px 28px", textDecoration: "none", color: "inherit",
                  border: "1px solid var(--border)", transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  {cat && <span style={{ fontSize: 10, fontWeight: 700, color: cat.color, background: cat.color+"18", padding: "2px 10px", borderRadius: 99, letterSpacing: 1 }}>{cat.label}</span>}
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{article.readingTime}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· Published {article.publishDate}</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--green-dark)", marginBottom: 8, lineHeight: 1.3 }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                  {article.description}
                </p>
                <div style={{ marginTop: 12, fontSize: 12, color: "var(--green-primary)", fontWeight: 600 }}>
                  Read article →
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: 48, textAlign: "center", padding: 32, background: "var(--green-pale)", borderRadius: 16 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--green-dark)", marginBottom: 10 }}>
            Ready for a plan built for your address?
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
            Enter your address and get fertilization dates, overseeding timing, and pre-emergent windows specific to your property.
          </p>
          <Link href="/" className="btn btn-primary">Get My Address Plan →</Link>
        </div>
      </div>
    </Layout>
  );
}
