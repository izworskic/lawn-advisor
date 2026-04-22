import Link from "next/link";
import Head from "next/head";

const CURRENT_YEAR = new Date().getFullYear();

export default function Layout({ children, title, description, canonical }) {
  const pageTitle = title ? `${title} | Perfect Lawn Advisor` : "Perfect Lawn Advisor: Hyperlocal Lawn Care by ZIP Code";
  const pageDesc = description || "Get a personalized lawn care plan based on your exact ZIP code, USDA hardiness zone, grass type, and current weather conditions. Michigan and beyond.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical || "https://lawn.chrisizworski.com"} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical || "https://lawn.chrisizworski.com"} />
        <meta property="og:image" content="https://lawn.chrisizworski.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Perfect Lawn Advisor",
              url: "https://lawn.chrisizworski.com",
              author: {
                "@type": "Person",
                name: "Chris Izworski",
                url: "https://chrisizworski.com",
              },
              description: pageDesc,
            }),
          }}
        />

        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8222782620788075"
          crossOrigin="anonymous"
        />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo">
          🌿 Perfect Lawn Advisor
        </Link>
        <ul className="nav-links">
          <li><Link href="/">ZIP Tool</Link></li>
          <li><Link href="/lawn-guide">City Guides</Link></li>
          <li><Link href="/lawn-guide/michigan">Michigan</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🌿 Perfect Lawn Advisor</h3>
            <p>
              Hyperlocal lawn care guidance powered by AI, local climate data, and turfgrass science.
              Research and methodology by{" "}
              <a href="https://chrisizworski.com" style={{ color: "var(--green-bright)" }}>
                Chris Izworski
              </a>
              , Bay City outdoorsman and gardener behind{" "}
              <a href="https://freighterviewfarms.com" style={{ color: "var(--green-bright)" }}>Freighter View Farms</a>
              , a garden blog on the shores of Saginaw Bay.
              Cross-referenced with MSU Extension, USDA zone data, and NRCS soil surveys.
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://chrisizworski.com" style={{ fontSize: 12, color: "var(--green-bright)" }}>chrisizworski.com</a>
              <a href="https://freighterviewfarms.com" style={{ fontSize: 12, color: "rgba(197,232,160,0.6)" }}>Freighter View Farms</a>
              <a href="https://trout.chrisizworski.com" style={{ fontSize: 12, color: "rgba(197,232,160,0.6)" }}>Michigan Trout Report</a>
            </div>
          </div>
          <div>
            <h4>Michigan Zones</h4>
            <ul>
              <li><Link href="/lawn-guide/michigan">All Michigan Cities</Link></li>
              <li><Link href="/lawn-guide/michigan#zone-6b">Zone 6b: South</Link></li>
              <li><Link href="/lawn-guide/michigan#zone-6a">Zone 6a: Central</Link></li>
              <li><Link href="/lawn-guide/michigan#zone-5b">Zone 5b: North</Link></li>
              <li><Link href="/lawn-guide/michigan#zone-5a">Zone 5a: UP</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">ZIP Code Tool</Link></li>
              <li><Link href="/lawn-guide">City Guides</Link></li>
              <li><Link href="/about">About Chris Izworski</Link></li>
              <li><a href="https://chrisizworski.com/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {CURRENT_YEAR} Perfect Lawn Advisor · Chris Izworski · Bay City, Michigan</span>
          <span>Amazon links support this free resource · <a href="/privacy" style={{ color: "inherit" }}>Privacy</a></span>
        </div>
      </footer>
    </>
  );
}
