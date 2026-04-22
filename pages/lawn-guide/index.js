import Layout from "../../components/Layout";
import Link from "next/link";
import { US_CITIES } from "../../data/us-cities";
import { MICHIGAN_CITIES } from "../../data/michigan-cities";

// Count cities per state from national DB
const stateCounts = {};
for (const city of US_CITIES) {
  stateCounts[city.state] = (stateCounts[city.state] || 0) + 1;
}
// Michigan has more detailed entries
stateCounts["MI"] = MICHIGAN_CITIES.length + (stateCounts["MI"] || 0);

const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DC:"Washington D.C.",DE:"Delaware",FL:"Florida",
  GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",
  KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",
  MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",
  OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
  VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
};

const GRASS_ZONES = [
  { label:"Cool-Season North", states:["ME","NH","VT","MA","RI","CT","NY","NJ","PA","DE","OH","IN","IL","WI","MN","IA","ND","SD","NE","MI","WA","OR","ID","MT","WY","CO","AK"], color:"#4a7c59", icon:"❄️" },
  { label:"Transition Zone", states:["MD","DC","VA","WV","KY","TN","MO","KS","OK","NC","NV","UT"], color:"#c17f24", icon:"🔄" },
  { label:"Warm-Season South", states:["SC","GA","FL","AL","MS","LA","TX","AR","AZ","NM"], color:"#c14a4a", icon:"☀️" },
  { label:"Pacific and Mountain West", states:["CA","HI"], color:"#4a90d9", icon:"🌊" },
];

export default function GuideIndex() {
  return (
    <Layout
      title="Lawn Care Guides by State and City: All 50 States"
      description="Browse hyperlocal lawn care guides by state and city. Find your USDA zone, grass type, and personalized monthly schedules. Covering all 50 states."
      canonical="https://lawn.chrisizworski.com/lawn-guide"
    >
      <div className="hero-dark" style={{ padding: "56px 24px" }}>
        <div className="container-narrow">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "var(--green-pale)", marginBottom: 12 }}>
            Lawn Care Guides: All 50 States
          </h1>
          <p style={{ color: "var(--green-light)", fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
            Verified zone, grass type, soil, and challenge data for {Object.values(stateCounts).reduce((a,b)=>a+b,0)}+ cities across every U.S. climate.
            From Zone 4 in Alaska to Zone 12 in Hawaii.
          </p>
          <div style={{ display:"flex", gap:16, marginTop:20, flexWrap:"wrap" }}>
            {GRASS_ZONES.map(z => (
              <div key={z.label} style={{ background:"rgba(122,182,72,0.12)", borderRadius:10, padding:"10px 16px", border:"1px solid rgba(122,182,72,0.2)" }}>
                <div style={{ color:"var(--green-bright)", fontSize:11, fontWeight:700, letterSpacing:1 }}>{z.icon} {z.label}</div>
                <div style={{ color:"var(--green-light)", fontSize:11, opacity:0.7 }}>{z.states.length} states</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "48px 24px 80px" }}>
        <div className="container">
          {GRASS_ZONES.map(zone => (
            <div key={zone.label} style={{ marginBottom: 48 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,3vw,24px)", color:"var(--green-dark)" }}>
                  {zone.icon} {zone.label}
                </h2>
                <span style={{ background:zone.color+"18", color:zone.color, borderRadius:99, fontSize:11, fontWeight:700, padding:"2px 10px" }}>
                  {zone.states.length} states
                </span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:10 }}>
                {zone.states.filter(s => STATE_NAMES[s]).map(stateAbbr => {
                  const isMI = stateAbbr === "MI";
                  const count = stateCounts[stateAbbr] || 0;
                  return (
                    <div key={stateAbbr} style={{ position:"relative" }}>
                      {isMI ? (
                        <Link href="/lawn-guide/michigan"
                          style={{
                            display:"block", padding:"14px 16px",
                            background:"var(--green-pale)", borderRadius:12,
                            border:"2px solid var(--green-bright)",
                            textDecoration:"none", transition:"all 0.15s",
                          }}>
                          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:14, color:"var(--green-dark)" }}>
                            {STATE_NAMES[stateAbbr]}
                          </div>
                          <div style={{ fontSize:11, color:"var(--green-primary)", marginTop:3 }}>
                            {count} cities · Full guides
                          </div>
                        </Link>
                      ) : (
                        <div style={{
                          display:"block", padding:"14px 16px",
                          background:"#fff", borderRadius:12,
                          border:"1px solid var(--border)",
                        }}>
                          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:14, color:"var(--green-dark)" }}>
                            {STATE_NAMES[stateAbbr]}
                          </div>
                          <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:3 }}>
                            {count > 0 ? `${count} ZIPs verified` : "ZIP tool available"}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 40, textAlign:"center" }}>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:16 }}>
              Enter any U.S. address for a personalized plan. Our database anchors your zone and grass type, then live weather data fills in the rest.
            </p>
            <Link href="/" className="btn btn-primary">Get My Address Plan →</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
