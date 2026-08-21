import { useEffect } from "react";
import { useRouter } from "next/router";

const LINKS = [
  {
    id: "planting-calendar",
    label: "Michigan planting calendar",
    detail: "Plan vegetables, herbs, and flowers from Michigan frost-station data.",
    href: "https://chrisizworski.com/zone-6a-planting-calendar/",
  },
  {
    id: "frost-dates",
    label: "Michigan frost dates",
    detail: "Check spring and fall frost timing before yard and garden work.",
    href: "https://chrisizworski.com/michigan-frost-dates/",
  },
  {
    id: "phenology",
    label: "Michigan phenology",
    detail: "Follow the broader natural-season signals around Saginaw Bay and northern Michigan.",
    href: "https://phenology.chrisizworski.com/",
  },
];

function emit(name, data) {
  if (typeof window === "undefined") return;
  try {
    window.va = window.va || function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
    window.va("event", { name, data });
  } catch (_error) {}
}

export default function ToolNetworkLinks() {
  const router = useRouter();
  const path = router.pathname || "/";
  const visible = path === "/" || path.startsWith("/plan");

  useEffect(() => {
    if (!visible) return;
    emit("Network Amplification Exposure", {
      source: "perfect-lawn",
      surface: "lawn-network",
      destinations: LINKS.map((link) => link.id).join(","),
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <section className="toolNetwork" aria-label="More Michigan planning tools">
      <div className="toolNetworkInner">
        <p className="toolNetworkEyebrow">Keep planning</p>
        <h2>More for your Michigan yard and garden</h2>
        <div className="toolNetworkGrid">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() =>
                emit("Contextual Tool Handoff", {
                  source: "perfect-lawn",
                  destination: link.id,
                  surface: "lawn-network",
                })
              }
            >
              <strong>{link.label}</strong>
              <span>{link.detail}</span>
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        .toolNetwork {
          padding: 24px 20px 34px;
          background: #f6f8f1;
          border-top: 1px solid #dfe7d4;
        }
        .toolNetworkInner {
          max-width: 980px;
          margin: 0 auto;
        }
        .toolNetworkEyebrow {
          margin: 0 0 4px;
          font: 700 11px/1.2 system-ui, sans-serif;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #6c7c55;
        }
        h2 {
          margin: 0 0 12px;
          font: 700 clamp(18px, 2.4vw, 24px)/1.2 system-ui, sans-serif;
          color: #26351f;
        }
        .toolNetworkGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 10px;
        }
        a {
          display: block;
          padding: 13px 14px;
          border: 1px solid #d8e0cd;
          border-radius: 10px;
          background: #fff;
          color: #26351f;
          text-decoration: none;
        }
        a:hover,
        a:focus-visible {
          border-color: #657b4a;
        }
        a:focus-visible {
          outline: 2px solid #315e28;
          outline-offset: 2px;
        }
        strong,
        span {
          display: block;
        }
        strong {
          margin-bottom: 3px;
          font: 700 14px/1.3 system-ui, sans-serif;
        }
        span {
          color: #63705a;
          font: 400 12px/1.4 system-ui, sans-serif;
        }
      `}</style>
    </section>
  );
}
