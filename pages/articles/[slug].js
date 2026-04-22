import Layout from "../../components/Layout";
import Link from "next/link";
import { ARTICLES, CATEGORIES, getArticleBySlug } from "../../data/articles";

// Simple markdown-to-JSX renderer for article content
function renderMarkdown(md) {
  const lines = md.trim().split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--green-dark)", marginTop: 32, marginBottom: 12 }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--green-dark)", marginTop: 24, marginBottom: 10 }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ marginBottom: 16, paddingLeft: 24 }}>
          {items.map((item, j) => <li key={j} style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />)}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip empty
    } else {
      elements.push(
        <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-muted)", marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
      );
    }
    i++;
  }
  return elements;
}

function renderInline(text) {
  // Bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--green-dark)">$1</strong>');
  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: var(--green-primary); font-weight: 600">$1</a>');
  return text;
}

export default function ArticlePage({ article, related }) {
  if (!article) return null;

  const cat = CATEGORIES.find(c => c.id === article.category);
  const canonical = `https://lawn.chrisizworski.com/articles/${article.slug}`;

  return (
    <Layout
      title={article.title}
      description={article.description}
      canonical={canonical}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            keywords: article.keywords?.join(", "),
            author: {
              "@type": "Person",
              name: "Chris Izworski",
              url: "https://chrisizworski.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Perfect Lawn Advisor",
              url: "https://lawn.chrisizworski.com",
            },
            datePublished: article.publishDate,
            dateModified: article.publishDate,
            mainEntityOfPage: canonical,
          }),
        }}
      />

      <div className="hero-dark" style={{ padding: "48px 24px" }}>
        <div className="container-narrow">
          <div className="breadcrumb" style={{ color: "rgba(197,232,160,0.6)" }}>
            <Link href="/" style={{ color: "var(--green-bright)" }}>Perfect Lawn</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/articles" style={{ color: "var(--green-bright)" }}>Articles</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{article.category}</span>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12, marginBottom: 12, flexWrap: "wrap" }}>
            {cat && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: cat.color, padding: "3px 12px", borderRadius: 99 }}>{cat.label}</span>}
            <span style={{ fontSize: 12, color: "var(--green-light)", opacity: 0.8 }}>{article.readingTime}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, color: "var(--green-pale)", lineHeight: 1.15, marginBottom: 12 }}>
            {article.title}
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.6, opacity: 0.9, maxWidth: 640 }}>
            {article.description}
          </p>
          <div style={{ marginTop: 20, fontSize: 13, color: "var(--green-light)", opacity: 0.7, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span>By <a href="https://chrisizworski.com" style={{ color: "var(--green-bright)" }}>Chris Izworski</a></span>
            <span>·</span>
            <time dateTime={article.publishDate}>{new Date(article.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "40px 24px 60px", maxWidth: 720 }}>
        <article>
          {renderMarkdown(article.content)}
        </article>

        {/* AdSense mid-article */}
        <div style={{ margin: "40px 0", textAlign: "center" }}>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8222782620788075"
            data-ad-slot="7654321890"
            data-ad-format="auto"
            data-full-width-responsive="true" />
        </div>

        {/* Author bio */}
        <div style={{ marginTop: 48, padding: 24, background: "var(--green-pale)", borderRadius: 16 }}>
          <div className="section-label">About the Author</div>
          <div style={{ marginTop: 10, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--green-dark)" }}>Chris Izworski</strong> is a Bay City, Michigan outdoorsman and gardener. He writes about turfgrass, native plants, and Great Lakes gardening at{" "}
            <a href="https://chrisizworski.com">chrisizworski.com</a> and{" "}
            <a href="https://freighterviewfarms.com">Freighter View Farms</a>.
            All articles are researched against USDA, NRCS, MSU Extension, and NOAA sources.
          </div>
        </div>

        {/* Related articles */}
        {related?.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div className="section-label">Related Articles</div>
            <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
              {related.map(r => (
                <Link href={`/articles/${r.slug}`} key={r.slug}
                  style={{ display: "block", background: "#fff", borderRadius: 12, padding: 16, border: "1px solid var(--border)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--green-dark)" }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{r.readingTime}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 40, padding: 32, background: "linear-gradient(135deg, var(--green-deep), var(--green-mid))", color: "#fff", borderRadius: 16, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 10, color: "var(--green-pale)" }}>
            Want this advice calibrated to your address?
          </h2>
          <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 20, color: "var(--green-light)" }}>
            Get a personalized plan with specific dates, products, and tasks for your exact location.
          </p>
          <Link href="/" className="btn btn-primary">Get My Plan →</Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: ARTICLES.map(a => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { notFound: true };
  const related = ARTICLES.filter(a => a.slug !== params.slug).slice(0, 3);
  return { props: { article, related } };
}
