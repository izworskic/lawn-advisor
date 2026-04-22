import Layout from "../../../components/Layout";
import MonthCalendar from "../../../components/MonthCalendar";
import LawnAdvisorTool from "../../../components/LawnAdvisorTool";
import Link from "next/link";
import { MICHIGAN_CITIES, ZONE_CALENDARS, ZONE_TASKS, getCityBySlug } from "../../../data/michigan-cities";

const MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CURRENT_MONTH = new Date().getMonth();
const CURRENT_YEAR = new Date().getFullYear();

function buildFAQ(city) {
  return [
    {
      q: `When should I fertilize my lawn in ${city.name}, Michigan?`,
      a: `In ${city.name} (Zone ${city.zone}), the first fertilizer application of the year should go down when soil temperatures consistently reach 50°F, typically around ${city.zone === "6b" ? "late March to early April" : city.zone === "6a" ? "early to mid-April" : "late April to early May"}. A second application in early June, a third in late July (optional), and a critical winterizer in ${city.zone.startsWith("5") ? "late September" : "October"} rounds out the year. Always use slow-release formulas to avoid burning ${city.grassType.split("/")[0].trim()}.`,
    },
    {
      q: `What type of grass grows best in ${city.name}?`,
      a: `${city.name} is firmly in cool-season grass territory. ${city.grassType} performs best here. ${city.grassType.includes("Kentucky Bluegrass") ? "Kentucky Bluegrass spreads aggressively via rhizomes and self-repairs well, but needs more water and fertilizer than fescues." : ""} ${city.grassType.includes("Fine Fescue") ? "Fine Fescue excels in shaded areas and requires less fertilizer, ideal for the tree-heavy lots common in this area." : ""} For high-traffic zones, add 20% Perennial Ryegrass to your seed blend.`,
    },
    {
      q: `When is the best time to overseed a lawn in ${city.name}?`,
      a: `Late summer: specifically ${city.zone === "6b" ? "September 1-15" : city.zone === "6a" ? "September 1-20" : "August 20 to September 10"}: this is the ideal overseeding window in ${city.name}. Soil temperatures are still above 60°F for quick germination, air temps are cooling (reducing competition from crabgrass), and fall rains typically reduce the need for irrigation. Always aerate before overseeding for maximum seed-to-soil contact.`,
    },
    {
      q: `How do I deal with crabgrass in ${city.name}?`,
      a: `Crabgrass germinates when soil temps hit 55°F for several consecutive days. In ${city.name} this typically falls ${city.zone === "6b" ? "in mid to late March" : "in early to mid-April"}. Apply a pre-emergent herbicide containing dithiopyr or prodiamine before this window. A split application (half rate now, half rate 6 weeks later) provides season-long control. Never apply pre-emergent in the same year you overseed. It will kill your grass seed too.`,
    },
    {
      q: `How often should I water my lawn in ${city.name} in summer?`,
      a: `${city.name} lawns need about 1 to 1.5 inches of water per week during summer. Water deeply 2-3 times per week rather than shallowly every day. Deep watering encourages deep root growth. Water between 5-10 AM to reduce evaporation and minimize fungal disease risk. During heat spells above 90°F, ${city.grassType.split("/")[0].trim()} may enter temporary dormancy. Resist the urge to over-water dormant grass.`,
    },
  ];
}

function buildIntro(city) {
  const zoneDesc = {
    "6b": `Zone 6b gives ${city.name} one of Michigan's longer growing seasons, with last frost typically around ${city.avgLastFrost} and first fall frost around ${city.avgFirstFrost}.`,
    "6a": `Zone 6a defines the Central Michigan lawn-care window: last frost around ${city.avgLastFrost}, first fall frost around ${city.avgFirstFrost}. Cool-season grasses thrive but the season demands attention.`,
    "5b": `Zone 5b puts ${city.name} in Michigan's transitional northern climate: last frost around ${city.avgLastFrost}, first fall frost around ${city.avgFirstFrost}. Every week of the growing season matters.`,
    "5a": `Zone 5a is Michigan's most demanding lawn environment. ${city.name}'s last frost runs around ${city.avgLastFrost} and first fall frost around ${city.avgFirstFrost}, leaving roughly 120-140 days to work with.`,
  };

  return `${city.name}, Michigan sits in USDA Hardiness Zone ${city.zone}, and that single designation shapes everything about how you care for your lawn here. ${zoneDesc[city.zone] || ""} The dominant grass types are ${city.grassType}, both cool-season varieties that go semi-dormant in extreme summer heat and depend on proper fall preparation to survive Michigan winters.

Lawn care in ${city.name} isn't one-size-fits-all. Your soil, specifically ${city.soilType}, affects drainage, compaction resistance, and fertilizer uptake. Local challenges include ${city.challenges}. This guide addresses all of those factors with month-by-month guidance built for ${city.county} County conditions.`;
}

export default function CityPage({ city, calendar, tasks, faq, intro, nearbySlug, nearbyName }) {
  const currentYear = new Date().getFullYear();

  if (!city) return <div>City not found</div>;

  const currentSeason = (() => {
    const m = CURRENT_MONTH;
    if (m <= 1 || m === 11) return "winter";
    if (m <= 4) return "spring";
    if (m <= 7) return "summer";
    return "fall";
  })();

  const seasonTask = tasks[currentSeason];

  return (
    <Layout
      title={`${city.name} Lawn Care Guide ${currentYear}: Zone ${city.zone} Schedule`}
      description={`Complete lawn care schedule for ${city.name}, Michigan (Zone ${city.zone}). When to fertilize, overseed, aerate and mow ${city.grassType} in ${city.county} County.`}
      canonical={`https://lawn.chrisizworski.com/lawn-guide/michigan/${city.slug}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${city.name} Lawn Care Guide ${currentYear}`,
            description: `Lawn care schedule and expert guidance for ${city.name}, Michigan: Zone ${city.zone}.`,
            author: { "@type": "Person", name: "Chris Izworski", url: "https://chrisizworski.com" },
            publisher: { "@type": "Organization", name: "Perfect Lawn Advisor", url: "https://lawn.chrisizworski.com" },
            dateModified: new Date().toISOString().split("T")[0],
            mainEntityOfPage: `https://lawn.chrisizworski.com/lawn-guide/michigan/${city.slug}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <div className="hero-dark" style={{ padding: "48px 24px" }}>
        <div className="container-narrow">
          <div className="breadcrumb" style={{ color: "rgba(197,232,160,0.6)" }}>
            <Link href="/" style={{ color: "var(--green-bright)" }}>Perfect Lawn</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/lawn-guide/michigan" style={{ color: "var(--green-bright)" }}>Michigan</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{city.name}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4.5vw,48px)", fontWeight: 900, color: "var(--green-pale)", lineHeight: 1.15, margin: "16px 0 12px" }}>
            {city.name} Lawn Care Guide<br />
            <span style={{ color: "var(--green-bright)" }}>{currentYear}</span>
          </h1>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            <span className="tag tag-zone">🌡️ Zone {city.zone}</span>
            <span className="tag" style={{ background: "rgba(122,182,72,0.15)", color: "var(--green-bright)" }}>🌾 {city.grassType.split("/")[0].trim()}</span>
            <span className="tag" style={{ background: "rgba(255,255,255,0.1)", color: "var(--green-light)" }}>📍 {city.county} County</span>
          </div>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.7, maxWidth: 580, opacity: 0.9 }}>
            A complete month-by-month lawn care calendar for {city.name}, Michigan: built around Zone {city.zone} frost dates, your soil type, and the real challenges of {city.grassType} in {city.county} County.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "48px 24px" }}>

        {/* Key stats */}
        <div className="stat-grid" style={{ marginBottom: 40 }}>
          {[
            { label: "Hardiness Zone", value: `Zone ${city.zone}` },
            { label: "Last Spring Frost", value: city.avgLastFrost },
            { label: "First Fall Frost", value: city.avgFirstFrost },
            { label: "Primary Grass", value: city.grassType.split("/")[0].trim() },
            { label: "Soil Type", value: city.soilType },
          ].map((s, i) => (
            <div key={i} className="stat-block">
              <div className="stat-value" style={{ fontSize: 16 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Intro content */}
        <div className="prose" style={{ marginBottom: 40 }}>
          <h2>Lawn Care in {city.name}, Michigan: {currentYear} Overview</h2>
          {intro.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Annual Calendar */}
        <div className="card" style={{ marginBottom: 32 }}>
          <div className="section-label">Annual Lawn Care Calendar: {city.name}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--green-dark)", margin: "8px 0 16px" }}>
            Month-by-month schedule for Zone {city.zone}
          </h2>
          <MonthCalendar calendar={calendar} />
        </div>

        {/* Current season task spotlight */}
        {seasonTask && (
          <div className="card" style={{ marginBottom: 32, background: "var(--green-pale)", border: "none" }}>
            <div className="section-label">Right Now in {MONTHS_FULL[CURRENT_MONTH]}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--green-dark)", margin: "8px 0 10px" }}>
              ⚡ {seasonTask.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 }}>{seasonTask.detail}</p>
            {seasonTask.product && (
              <a
                href={`https://www.amazon.com/s?k=${encodeURIComponent(seasonTask.product)}&tag=michigantrout-20`}
                target="_blank" rel="noopener noreferrer"
                className="amz-link"
              >
                🛒 Shop: {seasonTask.product} →
              </a>
            )}
          </div>
        )}

        {/* AdSense */}
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8222782620788075"
            data-ad-slot="9876543210"
            data-ad-format="auto"
            data-full-width-responsive="true" />
        </div>

        {/* All season tasks */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--green-dark)", marginBottom: 20 }}>
            Season-by-Season Guide for {city.name}
          </h2>
          {Object.entries(tasks).map(([season, task]) => (
            <div key={season} style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--green-dark)", marginBottom: 8, textTransform: "capitalize" }}>
                {season === "spring" ? "🌸" : season === "summer" ? "☀️" : season === "fall" ? "🍂" : "❄️"} {season} Tasks
              </h3>
              <div className="task-card">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--green-dark)", marginBottom: 6 }}>{task.title}</div>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, margin: "0 0 8px" }}>{task.detail}</p>
                {task.product && (
                  <a href={`https://www.amazon.com/s?k=${encodeURIComponent(task.product)}&tag=michigantrout-20`} target="_blank" rel="noopener noreferrer" className="amz-link">
                    🛒 {task.product} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Local challenges */}
        <div className="card" style={{ marginBottom: 40, borderLeft: "4px solid var(--soil)" }}>
          <div className="section-label">Local Lawn Challenges</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--green-dark)", margin: "8px 0 12px" }}>
            What makes {city.name} lawns different
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>
            {city.challenges}. These are the issues that catch {city.name} homeowners off guard. 
            Understanding your local conditions is the difference between a lawn that just survives and one that thrives.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--green-dark)", marginBottom: 8 }}>
            Frequently Asked Questions: {city.name} Lawn Care
          </h2>
          {faq.map((item, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q">{item.q}</div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>

        {/* AI tool CTA */}
        <div className="card" style={{ background: "linear-gradient(135deg, var(--green-deep), var(--green-dark))", border: "none", marginBottom: 40 }}>
          <div style={{ color: "var(--green-light)", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Free Tool</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--green-pale)", marginBottom: 12 }}>
            Want a fully personalized plan for your exact yard?
          </h3>
          <p style={{ fontSize: 14, color: "rgba(197,232,160,0.8)", lineHeight: 1.7, marginBottom: 20 }}>
            This page covers {city.name} broadly. Our AI tool factors in current weather, your specific address, 
            and today's conditions for a recommendation that's right for <em>this week</em>.
          </p>
          <LawnAdvisorTool defaultZip={city.zip} />
        </div>

        {/* Internal links */}
        <div>
          <div className="section-label">Explore More Michigan Cities</div>
          <div className="city-grid" style={{ marginTop: 12 }}>
            {MICHIGAN_CITIES.filter(c => c.zone === city.zone && c.slug !== city.slug).slice(0, 6).map(c => (
              <Link href={`/lawn-guide/michigan/${c.slug}`} key={c.slug} className="city-card">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--green-dark)", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Zone {c.zone} · {c.county} Co.</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link href="/lawn-guide/michigan" className="btn btn-outline" style={{ fontSize: 13 }}>
              View All Michigan Cities →
            </Link>
          </div>
        </div>

        {/* Author credit */}
        <div style={{ marginTop: 48, padding: "24px", background: "var(--green-pale)", borderRadius: 16 }}>
          <div className="section-label">About This Guide</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8, margin: "8px 0" }}>
            This {city.name} lawn care guide was researched and written by{" "}
            <a href="https://chrisizworski.com">Chris Izworski</a>, a Bay City, Michigan gardener and outdoorsman 
            who runs <a href="https://freighterviewfarms.com">Freighter View Farms</a>. Content is cross-referenced 
            with MSU Extension turfgrass research, USDA NRCS soil data, and NOAA climatology. 
            Affiliate product links use the Amazon Associates program (tag: michigantrout-20).
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: MICHIGAN_CITIES.map(c => ({ params: { city: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) return { notFound: true };

  const calendar = ZONE_CALENDARS[city.zone] || ZONE_CALENDARS["6a"];
  const tasks = ZONE_TASKS[city.zone] || ZONE_TASKS["6a"];
  const faq = buildFAQ(city);
  const intro = buildIntro(city);

  // Find a nearby city for internal linking
  const nearby = MICHIGAN_CITIES.find(c => c.zone === city.zone && c.slug !== city.slug);

  return {
    props: {
      city,
      calendar,
      tasks,
      faq,
      intro,
      nearbySlug: nearby?.slug || null,
      nearbyName: nearby?.name || null,
    },
  };
}
