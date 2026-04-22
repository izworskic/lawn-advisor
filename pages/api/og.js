import { ImageResponse } from "next/og";
import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  let plan = null;
  if (slug) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      plan = await redis.get(`lawn:share:v2:${slug}`) || await redis.get(`lawn:share:${slug}`);
    } catch {}
  }

  const grade = plan?.grade || {};
  const location = plan?.location || "Your Property";
  const zone = plan?.zone || "";
  const grass = (plan?.grassType || "").split("/")[0].trim();
  const gradeColor = grade.color || "#4a7c59";
  const gradeLetter = grade.grade || "A";
  const gradeScore = grade.score || "";
  const urgentTask = plan?.urgentTask || "Personalized lawn care by address";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${gradeColor} 0%, #0f2a0f 100%)`,
          color: "white",
          padding: "60px 70px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.8, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
          🌿 Perfect Lawn Advisor
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 60, marginTop: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 26, opacity: 0.85, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
              Lawn Grade
            </div>
            <div style={{ fontSize: 280, fontWeight: 900, lineHeight: 1, marginTop: -10 }}>
              {gradeLetter}
            </div>
            {gradeScore && <div style={{ fontSize: 28, opacity: 0.7 }}>{gradeScore} / 100</div>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
              📍 {location}
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 26, opacity: 0.9, marginBottom: 24, flexWrap: "wrap" }}>
              {zone && <span>🌡️ {zone}</span>}
              {grass && <span>🌾 {grass}</span>}
            </div>
            <div style={{ fontSize: 24, opacity: 0.85, lineHeight: 1.4, fontStyle: "italic" }}>
              {urgentTask.length > 120 ? urgentTask.slice(0, 120) + "..." : urgentTask}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", fontSize: 20, opacity: 0.7 }}>
          <div>lawn.chrisizworski.com</div>
          <div>by Chris Izworski</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
