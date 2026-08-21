import { useEffect } from "react";
import { track } from "@vercel/analytics";

const LINKS = [
  {
    id: "planting-calendar",
    label: "Michigan planting calendar",
    href: "https://chrisizworski.com/zone-6a-planting-calendar/",
    note: "Vegetable, herb, and flower timing by Michigan frost station."
  },
  {
    id: "frost-dates",
    label: "Michigan frost dates",
    href: "https://chrisizworski.com/michigan-frost-dates/",
    note: "City-level spring and fall frost timing for the growing season."
  },
  {
    id: "phenology",
    label: "Michigan Phenology",
    href: "https://phenology.chrisizworski.com/",
    note: "Growing-degree days and seasonal natural signals around Michigan."
  }
];

export default function ToolNetworkLinks() {
  useEffect(() => {
    track("Network Amplification Exposure", {
      source: "perfect-lawn",
      surface: "michigan-growing-season"
    });
  }, []);

  return (
    <section aria-labelledby="tool-network-heading" style={{ padding: "40px 24px", background: "#f8fdf5", borderTop: "1px solid var(--border)" }}>
      <div className="container-narrow">
        <div className="section-label">Michigan growing season</div>
        <h2 id="tool-network-heading" style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--green-dark)", margin: "8px 0 8px" }}>
          Check the season around your lawn
        </h2>
        <p style={{ margin: "0 0 18px", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
          Use the wider Michigan tools when frost timing, planting windows, or seasonal development affects what you do outside next.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
          {LINKS.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => track("Contextual Tool Handoff", {
                source: "perfect-lawn",
                destination: link.id,
                surface: "michigan-growing-season"
              })}
              style={{ display: "block", padding: "14px 16px", background: "#fff", border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none" }}
            >
              <strong style={{ display: "block", color: "var(--green-dark)", fontSize: 14, marginBottom: 4 }}>{link.label} →</strong>
              <span style={{ display: "block", color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.5 }}>{link.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
