import { useState, useRef, useEffect } from "react";
import MonthCalendar from "./MonthCalendar";

const TASK_ICONS = { fertilize:"🌿", mow:"🌱", water:"💧", overseed:"🌾", aerate:"⛏️", weed:"🍃", winterize:"❄️" };
const TASK_COLORS = { fertilize:"#4a7c59", mow:"#7ab648", water:"#4a90d9", overseed:"#c17f24", aerate:"#8b5e3c", weed:"#c14a4a", winterize:"#6b7fa3" };

function LoadingDots() {
  return (
    <span style={{ display:"inline-flex", gap:4, alignItems:"center" }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ width:7, height:7, borderRadius:"50%", background:"var(--green-bright)", display:"inline-block", animation:`pulse 1.2s ease ${i*0.2}s infinite` }} />
      ))}
    </span>
  );
}

function TaskCard({ task }) {
  const color = TASK_COLORS[task.category] || "var(--green-bright)";
  const icon = TASK_ICONS[task.category] || "✓";
  return (
    <div className="task-card" style={{ borderLeftColor: color }}>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        <span style={{ fontSize:22, marginTop:2 }}>{icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, color:"var(--green-dark)", marginBottom:4 }}>{task.title}</div>
          <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>{task.detail}</div>
          {task.product && (
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(task.product)}&tag=michigantrout-20`}
              target="_blank" rel="noopener noreferrer"
              className="amz-link"
            >
              🛒 {task.product} →
            </a>
          )}
        </div>
        <span style={{
          background: color + "22", color, borderRadius:99,
          fontSize:11, fontWeight:700, padding:"2px 10px", whiteSpace:"nowrap",
          fontFamily:"var(--font-body)",
        }}>{task.timing}</span>
      </div>
    </div>
  );
}

function SeasonBadge({ season }) {
  const map = {
    spring: ["🌸","#d4edbc","#2d6a2d"],
    summer: ["☀️","#fef3c7","#7a5c00"],
    fall: ["🍂","#fed7aa","#7a3c00"],
    winter: ["❄️","#dbeafe","#1e40af"],
  };
  const [icon, bg, color] = map[season] || map.spring;
  return (
    <span style={{ background:bg, color, borderRadius:99, padding:"3px 14px", fontSize:13, fontWeight:700, fontFamily:"var(--font-display)", display:"inline-flex", alignItems:"center", gap:5 }}>
      {icon} {season.charAt(0).toUpperCase()+season.slice(1)}
    </span>
  );
}

function parsePlan(text) {
  try {
    const m = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*\})/);
    if (m) return JSON.parse(m[1]);
  } catch {}
  return null;
}

// Prompt is now built server-side in pages/api/lawn-plan.js

export default function LawnAdvisorTool({ defaultZip = "" }) {
  const [zip, setZip] = useState(defaultZip);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [phase, setPhase] = useState("idle");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current && phase === "idle") inputRef.current.focus();
  }, [phase]);

  const fetchPlan = async () => {
    if (!zip || zip.length < 5) return;
    setLoading(true);
    setError(null);
    setPhase("loading");
    setPlan(null);

    try {
      const res = await fetch("/api/lawn-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.plan) {
        setPlan(data.plan);
        setPhase("result");
      } else {
        throw new Error("No plan returned. Try again.");
      }
    } catch (e) {
      setError(e.message || "Something went wrong.");
      setPhase("idle");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setPlan(null); setZip(""); setPhase("idle"); setError(null); };

  return (
    <div>
      {phase !== "result" && (
        <div style={{ textAlign:"center", padding:"20px 0 32px" }}>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:16 }}>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g,""))}
              onKeyDown={e => e.key === "Enter" && fetchPlan()}
              placeholder="Enter ZIP"
              style={{
                fontSize:28,
                fontFamily:"var(--font-display)",
                fontWeight:700,
                letterSpacing:6,
                padding:"12px 24px",
                borderRadius:10,
                border:"2px solid var(--green-bright)",
                background:"#fff",
                color:"var(--green-dark)",
                width:200,
                textAlign:"center",
              }}
            />
            <button
              onClick={fetchPlan}
              disabled={loading || zip.length < 5}
              className="btn btn-primary"
              style={{ opacity: zip.length === 5 ? 1 : 0.5, minWidth:160 }}
            >
              {loading ? <LoadingDots /> : "Build My Plan →"}
            </button>
          </div>
          {loading && (
            <p style={{ color:"var(--green-primary)", fontSize:14, fontStyle:"italic", marginTop:12 }}>
              Analyzing your climate zone, grass type &amp; current conditions...
            </p>
          )}
          {error && (
            <div style={{ marginTop:12, color:"#c14a4a", fontSize:14, background:"#fff5f5", borderRadius:8, padding:"10px 20px", display:"inline-block" }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      )}

      {phase === "result" && plan && (
        <div className="fade-up" style={{ maxWidth:720, margin:"0 auto" }}>

          {/* Location bar */}
          <div className="card" style={{ background:"linear-gradient(135deg,#f0f9e8,#e8f5d0)", marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:900, color:"var(--green-dark)" }}>
                  📍 {plan.location}
                </div>
                <div style={{ fontSize:13, color:"var(--green-primary)", marginTop:6, display:"flex", gap:16, flexWrap:"wrap" }}>
                  <span>🌡️ {plan.zone}</span>
                  <span>🌾 {plan.grassType}</span>
                  <span>🌡️ Soil: {plan.soilTemp}</span>
                </div>
              </div>
              <SeasonBadge season={plan.season || "spring"} />
            </div>
            {plan.urgentTask && (
              <div style={{ marginTop:14, background:"rgba(122,182,72,0.1)", border:"1px solid rgba(122,182,72,0.3)", borderRadius:10, padding:"12px 16px", display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:18 }}>⚡</span>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--green-primary)", marginBottom:2 }}>Do This Now</div>
                  <div style={{ fontWeight:600, fontSize:14, color:"var(--green-dark)" }}>{plan.urgentTask}</div>
                </div>
              </div>
            )}
          </div>

          {/* Expert insight */}
          {plan.insight && (
            <div className="card" style={{ marginBottom:16, borderLeft:"4px solid var(--green-bright)" }}>
              <div className="section-label">Expert Insight for {plan.location}</div>
              <p style={{ fontStyle:"italic", color:"var(--text-muted)", fontSize:14, lineHeight:1.8, margin:0 }}>{plan.insight}</p>
            </div>
          )}

          {/* Calendar */}
          {plan.calendar && plan.calendar.length > 0 && (
            <div className="card" style={{ marginBottom:16 }}>
              <div className="section-label">Annual Care Calendar</div>
              <MonthCalendar calendar={plan.calendar} />
            </div>
          )}

          {/* Tasks */}
          {plan.tasks && plan.tasks.length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div className="section-label" style={{ marginBottom:10 }}>Your Next 60 Days</div>
              {plan.tasks.map((t, i) => <TaskCard key={i} task={t} />)}
            </div>
          )}

          {/* Tips */}
          {plan.tips && plan.tips.length > 0 && (
            <div className="card" style={{ marginBottom:24, background:"#f0f9e8" }}>
              <div className="section-label">Pro Tips for {plan.location}</div>
              {plan.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                  <span style={{ color:"var(--green-bright)", fontWeight:900, fontSize:14 }}>✓</span>
                  <span style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign:"center", marginTop:16 }}>
            <div style={{ fontSize:12, color:"var(--text-muted)", fontStyle:"italic", marginBottom:12 }}>
              Research by <a href="https://chrisizworski.com">Chris Izworski</a> · Turfgrass science + MSU Extension + USDA zone data
            </div>
            <button onClick={reset} className="btn btn-outline" style={{ fontSize:13 }}>← Try Another ZIP</button>
          </div>
        </div>
      )}
    </div>
  );
}
