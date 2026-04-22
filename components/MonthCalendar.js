const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const TASK_ICONS = {
  fertilize: "🌿",
  mow: "🌱",
  water: "💧",
  overseed: "🌾",
  aerate: "⛏️",
  weed: "🍃",
  winterize: "❄️",
};
const TASK_COLORS = {
  fertilize: "#4a7c59",
  mow: "#7ab648",
  water: "#4a90d9",
  overseed: "#c17f24",
  aerate: "#8b5e3c",
  weed: "#c14a4a",
  winterize: "#6b7fa3",
};

export default function MonthCalendar({ calendar = [] }) {
  const currentMonth = new Date().getMonth();

  const byMonth = {};
  for (let m = 0; m < 12; m++) byMonth[m] = [];
  calendar.forEach(t => {
    const m = t.month;
    if (m >= 0 && m <= 11) byMonth[m].push(t);
  });

  return (
    <div>
      <div className="month-grid">
        {MONTHS.map((m, i) => {
          const tasks = byMonth[i];
          const active = tasks.length > 0;
          const isCurrent = i === currentMonth;
          return (
            <div key={i}>
              <div
                className="month-cell"
                style={{
                  background: isCurrent
                    ? "var(--green-bright)"
                    : active
                    ? "var(--green-pale)"
                    : "#f0f4ec",
                  border: isCurrent
                    ? "2px solid var(--green-primary)"
                    : "2px solid transparent",
                  boxShadow: isCurrent ? "0 2px 12px rgba(122,182,72,0.35)" : "none",
                }}
              >
                {tasks.slice(0, 2).map((t, j) => (
                  <span key={j} style={{ fontSize: 11 }} title={t.task}>
                    {TASK_ICONS[t.task] || "✓"}
                  </span>
                ))}
                {tasks.length === 0 && (
                  <span style={{ opacity: 0.15, fontSize: 10 }}>–</span>
                )}
              </div>
              <div
                className="month-label"
                style={{
                  fontWeight: isCurrent ? 800 : 400,
                  color: isCurrent ? "var(--green-primary)" : undefined,
                }}
              >
                {m}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
        {Object.entries(TASK_ICONS).map(([k, v]) => (
          <span
            key={k}
            style={{
              fontSize: 11,
              color: TASK_COLORS[k] || "#666",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-body)",
            }}
          >
            {v} {k}
          </span>
        ))}
      </div>
    </div>
  );
}
