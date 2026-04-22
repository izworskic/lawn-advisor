import Layout from "../../components/Layout";
import Link from "next/link";

export default function GuideIndex() {
  return (
    <Layout
      title="Lawn Care Guides by State & City"
      description="Browse hyperlocal lawn care guides by state and city. Find your USDA zone, grass type, and personalized monthly schedules."
      canonical="https://lawn.chrisizworski.com/lawn-guide"
    >
      <div className="hero-dark" style={{ padding: "56px 24px" }}>
        <div className="container-narrow">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "var(--green-pale)", marginBottom: 12 }}>
            Lawn Care Guides by Region
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
            Hyperlocal lawn care schedules for every climate, grass type, and hardiness zone. 
            Built on turfgrass science, not generic national advice.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "48px 24px" }}>
        <div className="section-label">Available Guides</div>
        <div style={{ marginTop: 16 }}>
          <Link href="/lawn-guide/michigan" className="city-card" style={{ display: "block", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--green-dark)", marginBottom: 6 }}>
                  🌲 Michigan
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {28}+ cities · Zones 5a–6b · Cool-season grasses
                </div>
              </div>
              <span style={{ color: "var(--green-bright)", fontSize: 24 }}>→</span>
            </div>
          </Link>
          <div className="card" style={{ opacity: 0.5, marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-muted)" }}>🌾 Ohio: Coming Soon</div>
          </div>
          <div className="card" style={{ opacity: 0.5 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-muted)" }}>🌿 Wisconsin: Coming Soon</div>
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>Your state not listed? The ZIP tool works anywhere in the U.S.</p>
          <Link href="/" className="btn btn-primary">Use the ZIP Code Tool →</Link>
        </div>
      </div>
    </Layout>
  );
}
