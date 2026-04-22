import { Redis } from "@upstash/redis";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import MonthCalendar from "../../components/MonthCalendar";

const TASK_ICONS = { fertilize:"🌿", mow:"🌱", water:"💧", overseed:"🌾", aerate:"⛏️", weed:"🍃", winterize:"❄️" };
const TASK_COLORS = { fertilize:"#4a7c59", mow:"#7ab648", water:"#4a90d9", overseed:"#c17f24", aerate:"#8b5e3c", weed:"#c14a4a", winterize:"#6b7fa3" };

export default function SharedPlan({ plan, slug, notFound }) {
  if (notFound) {
    return (
      <Layout title="Plan Not Found">
        <div className="container-narrow" style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 12 }}>That lawn plan isn't available.</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
            It may have expired (30-day share window) or the link is incorrect. Get a fresh plan for your address.
          </p>
          <Link href="/" className="btn btn-primary">Get My Plan →</Link>
        </div>
      </Layout>
    );
  }

  const grade = plan.grade || {};
  const title = `${grade.grade || "Lawn"} Grade for ${plan.location || "this address"}: ${plan.zone} Plan`;
  const description = plan.urgentTask
    ? `${plan.urgentTask} Personalized lawn care plan for ${plan.location}.`
    : `Personalized lawn care plan for ${plan.location} with ${plan.tasks?.length || 0} action items.`;
  const canonical = `https://lawn.chrisizworski.com/plan/${slug}`;
  const ogImage = `https://lawn.chrisizworski.com/api/og?slug=${slug}`;

  return (
    <Layout title={title} description={description} canonical={canonical}>
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            datePublished: new Date().toISOString().split("T")[0],
            mainEntityOfPage: canonical,
          }),
        }}
      />

      <div className="container-narrow" style={{ padding: "32px 20px 60px" }}>

        {grade.score && (
          <div style={{
            background: `linear-gradient(135deg, ${grade.color} 0%, #1a4a1a 100%)`,
            borderRadius: 20, padding: "32px 28px", marginBottom: 24,
            color: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.85, fontWeight: 700 }}>Lawn Grade</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 12vw, 88px)", fontWeight: 900, lineHeight: 1, marginTop: 4 }}>
                  {grade.grade}
                </div>
                <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2 }}>{grade.score} / 100</div>
              </div>
              <div style={{ flex: 1, minWidth: 200, paddingLeft: 12 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📍 {plan.location}</div>
                <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <span>🌡️ {plan.zone}</span>
                  <span>🌾 {(plan.grassType || "").split("/")[0].trim()}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 12, opacity: 0.9 }}>
                  {(grade.reasons || []).slice(0, 3).map((r, i) => <li key={i} style={{ marginBottom: 3 }}>✓ {r}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        <ShareButtons title={title} url={canonical} />

        {plan.urgentTask && (
          <div className="card" style={{ borderLeft: "5px solid var(--green-bright)", marginTop: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green-primary)", marginBottom: 6 }}>⚡ Do This Now</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--green-dark)" }}>{plan.urgentTask}</div>
          </div>
        )}

        {plan.propertyNotes && (
          <div className="card" style={{ marginTop: 16, background: "#f0f9e8" }}>
            <div className="section-label">About This Property</div>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8, margin: "6px 0 0" }}>🏡 {plan.propertyNotes}</p>
          </div>
        )}

        {plan.insight && (
          <div className="card" style={{ marginTop: 16 }}>
            <div className="section-label">Expert Analysis</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", margin: "6px 0 0", fontStyle: "italic" }}>{plan.insight}</p>
          </div>
        )}

        {plan.calendar?.length > 0 && (
          <div className="card" style={{ marginTop: 16 }}>
            <div className="section-label">Annual Care Calendar</div>
            <MonthCalendar calendar={plan.calendar} />
          </div>
        )}

        {plan.tasks?.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Your Next 60 Days</div>
            {plan.tasks.map((t, i) => {
              const color = TASK_COLORS[t.category] || "var(--green-bright)";
              const icon = TASK_ICONS[t.category] || "✓";
              return (
                <div key={i} className="task-card" style={{ borderLeftColor: color }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22, marginTop: 2 }}>{icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--green-dark)", marginBottom: 4 }}>{t.title}</div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{t.detail}</div>
                      {t.product && (
                        <a href={`https://www.amazon.com/s?k=${encodeURIComponent(t.product)}&tag=michigantrout-20`} target="_blank" rel="noopener noreferrer" className="amz-link">
                          🛒 {t.product} →
                        </a>
                      )}
                    </div>
                    <span style={{ background: color + "22", color, borderRadius: 99, fontSize: 11, fontWeight: 700, padding: "2px 10px", whiteSpace: "nowrap" }}>{t.timing}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {plan.tips?.length > 0 && (
          <div className="card" style={{ marginTop: 16, background: "#f0f9e8" }}>
            <div className="section-label">Pro Tips</div>
            {plan.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "var(--green-bright)", fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        <div className="card" style={{ marginTop: 24, background: "linear-gradient(135deg, var(--green-deep), var(--green-mid))", color: "#fff", border: "none" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green-bright)", marginBottom: 8 }}>Save Your Plan</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 12 }}>Add these tasks to your calendar</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`/api/plan-ical?slug=${slug}`} className="btn" style={{ background: "#fff", color: "var(--green-dark)", padding: "10px 20px", fontSize: 13 }}>📅 Download iCal (.ics)</a>
            <Link href="/" className="btn btn-outline" style={{ borderColor: "#fff", color: "#fff", padding: "10px 20px", fontSize: 13 }}>🏡 New Address Plan</Link>
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", textAlign: "center" }}>
          Generated for {plan.location} by <a href="https://chrisizworski.com">Chris Izworski</a> · <a href="/">Get your own plan</a>
        </div>
      </div>
    </Layout>
  );
}

function ShareButtons({ title, url }) {
  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title, text: "Check out my lawn care plan:", url }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(url); alert("Link copied!"); } catch {}
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); alert("Link copied!"); } catch {}
  };
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out my personalized lawn care plan: ${url}`)}`;

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <button onClick={share} style={{ background: "var(--green-bright)", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>📤 Share</button>
      <button onClick={copy} style={{ background: "#fff", color: "var(--green-dark)", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>🔗 Copy Link</button>
      <a href={twUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#000", color: "#fff", padding: "8px 14px", borderRadius: 99, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏</a>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#1877f2", color: "#fff", padding: "8px 14px", borderRadius: 99, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>f</a>
      <a href={emailUrl} style={{ background: "#eee", color: "#333", padding: "8px 14px", borderRadius: 99, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>✉</a>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  try {
    const plan = await redis.get(`lawn:share:${params.slug}`);
    if (!plan) return { props: { notFound: true, slug: params.slug } };
    return { props: { plan, slug: params.slug } };
  } catch {
    return { props: { notFound: true, slug: params.slug } };
  }
}
