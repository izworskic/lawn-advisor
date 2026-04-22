import { useState, useRef, useEffect } from "react";
import MonthCalendar from "./MonthCalendar";

const TASK_ICONS = { fertilize:"🌿", mow:"🌱", water:"💧", overseed:"🌾", aerate:"⛏️", weed:"🍃", winterize:"❄️" };
const TASK_COLORS = { fertilize:"#4a7c59", mow:"#7ab648", water:"#4a90d9", overseed:"#c17f24", aerate:"#8b5e3c", weed:"#c14a4a", winterize:"#6b7fa3" };

// Address must contain a 5-digit ZIP somewhere
function hasZip(address) {
  return /\b\d{5}\b/.test(address);
}

function isReadyToSubmit(address) {
  const trimmed = address.trim();
  // Need at least a street number + something + ZIP
  return trimmed.length >= 10 && hasZip(trimmed);
}

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
    fall:   ["🍂","#fed7aa","#7a3c00"],
    winter: ["❄️","#dbeafe","#1e40af"],
  };
  const [icon, bg, color] = map[season] || map.spring;
  return (
    <span style={{ background:bg, color, borderRadius:99, padding:"3px 14px", fontSize:13, fontWeight:700, fontFamily:"var(--font-display)", display:"inline-flex", alignItems:"center", gap:5 }}>
      {icon} {season.charAt(0).toUpperCase()+season.slice(1)}
    </span>
  );
}

export default function LawnAdvisorTool({ defaultAddress = "" }) {
  const [address, setAddress] = useState(defaultAddress);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [phase, setPhase] = useState("idle");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current && phase === "idle") inputRef.current.focus();
  }, [phase]);

  const ready = isReadyToSubmit(address);

  const fetchPlan = async () => {
    if (!ready) return;
    setLoading(true);
    setError(null);
    setPhase("loading");
    setPlan(null);

    try {
      const res = await fetch("/api/lawn-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.plan) {
        setPlan(data.plan);
        setPhase("result");
        // Redirect to shareable plan URL so users can share/bookmark
        if (data.plan.shareSlug && typeof window !== "undefined") {
          window.history.pushState({}, "", `/plan/${data.plan.shareSlug}`);
        }
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

  const reset = () => { setPlan(null); setAddress(""); setPhase("idle"); setError(null); };

  // ZIP presence hint
  const showZipHint = address.trim().length > 8 && !hasZip(address);

  return (
    <div>
      {phase !== "result" && (
        <div style={{ padding:"20px 0 32px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:560, margin:"0 auto" }}>
            {/* Address input */}
            <div style={{ position:"relative" }}>
              <input
                ref={inputRef}
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                onKeyDown={e => e.key === "Enter" && ready && fetchPlan()}
                placeholder="123 Oak Street, Bay City, MI 48706"
                style={{
                  width:"100%",
                  fontSize:16,
                  fontFamily:"var(--font-body)",
                  padding:"16px 20px",
                  borderRadius:12,
                  border: showZipHint
                    ? "2px solid #c17f24"
                    : ready
                    ? "2px solid var(--green-bright)"
                    : "2px solid #ccc",
                  background:"#fff",
                  color:"var(--green-dark)",
                  boxShadow: ready ? "0 0 0 4px rgba(122,182,72,0.12)" : "none",
                  transition:"all 0.2s",
                  outline:"none",
                }}
              />
              {/* Live validation badge */}
              {address.trim().length > 5 && (
                <div style={{
                  position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                  fontSize:18,
                }}>
                  {ready ? "✅" : ""}
                </div>
              )}
            </div>

            {/* ZIP hint */}
            {showZipHint && (
              <div style={{ fontSize:12, color:"#c17f24", paddingLeft:4, display:"flex", alignItems:"center", gap:6 }}>
                <span>⚠️</span> Include your 5-digit ZIP code for the most accurate plan
              </div>
            )}

            {/* Example format helper */}
            {address.trim().length === 0 && (
              <div style={{ fontSize:12, color:"var(--text-muted)", paddingLeft:4, opacity:0.7, textAlign:"center" }}>
                Enter your full street address including ZIP for a plan tailored to your exact property
              </div>
            )}

            <button
              onClick={fetchPlan}
              disabled={loading || !ready}
              className="btn btn-primary"
              style={{ opacity: ready ? 1 : 0.45, fontSize:16, padding:"14px 24px", justifyContent:"center" }}
            >
              {loading ? <LoadingDots /> : "Build My Lawn Plan →"}
            </button>
          </div>

          {loading && (
            <div style={{ textAlign:"center", marginTop:20 }}>
              <p style={{ color:"var(--green-primary)", fontSize:14, fontStyle:"italic" }}>
                Analyzing your specific address: soil type, microclimate, grass type &amp; live conditions...
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:20, fontSize:22, marginTop:10 }}>
                {["📍","🌡️","🌧️","🌱"].map((e,i) => (
                  <span key={i} style={{ animation:`pulse 1.5s ease ${i*0.3}s infinite` }}>{e}</span>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginTop:12, color:"#c14a4a", fontSize:14, background:"#fff5f5", borderRadius:8, padding:"10px 20px", textAlign:"center" }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      )}

      {phase === "result" && plan && (
        <div className="fade-up" style={{ maxWidth:720, margin:"0 auto" }}>

          {/* Location header */}
          <div className="card" style={{ background:"linear-gradient(135deg,#f0f9e8,#e8f5d0)", marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--green-primary)", marginBottom:4 }}>
                  Your Address Plan
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:900, color:"var(--green-dark)" }}>
                  📍 {plan.address || plan.location}
                </div>
                <div style={{ fontSize:13, color:"var(--green-primary)", marginTop:6, display:"flex", gap:16, flexWrap:"wrap" }}>
                  <span>🌡️ {plan.zone}</span>
                  <span>🌾 {plan.grassType}</span>
                  {plan.soilTemp && <span>🌱 Soil: {plan.soilTemp}</span>}
                </div>
              </div>
              <SeasonBadge season={plan.season || "spring"} />
            </div>

            {/* Property-specific notes */}
            {plan.propertyNotes && (
              <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(122,182,72,0.08)", borderRadius:8, fontSize:13, color:"var(--green-dark)", fontStyle:"italic" }}>
                🏡 {plan.propertyNotes}
              </div>
            )}

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
              <div className="section-label">Expert Analysis for This Property</div>
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
              <div className="section-label">Address-Specific Tips</div>
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
            <button onClick={reset} className="btn btn-outline" style={{ fontSize:13 }}>← Analyze a Different Address</button>
          </div>
        </div>
      )}
    </div>
  );
}
