// Michigan cities: USDA hardiness zone, dominant grass, key challenges
// Used for static path generation and city page content

export const MICHIGAN_CITIES = [
  // Zone 6a: Central/Northern Lower Peninsula
  { slug: "bay-city", name: "Bay City", zip: "48706", zone: "6a", county: "Bay", lat: 43.59, lng: -83.89, grassType: "Kentucky Bluegrass / Fine Fescue", challenges: "Heavy clay soil, late spring frosts, Saginaw Bay salt air near waterfront properties", soilType: "Clay loam", avgFirstFrost: "Oct 12", avgLastFrost: "May 3" },
  { slug: "saginaw", name: "Saginaw", zip: "48601", zone: "6a", county: "Saginaw", lat: 43.42, lng: -83.95, grassType: "Kentucky Bluegrass / Perennial Ryegrass", challenges: "Compacted urban soils, flooding risk in low areas, heavy crabgrass pressure", soilType: "Silt loam", avgFirstFrost: "Oct 10", avgLastFrost: "May 5" },
  { slug: "midland", name: "Midland", zip: "48640", zone: "6a", county: "Midland", lat: 43.61, lng: -84.23, grassType: "Kentucky Bluegrass / Fine Fescue", challenges: "Sandy-loam transition soils, chinch bug pressure in summer, dry spells", soilType: "Sandy loam", avgFirstFrost: "Oct 8", avgLastFrost: "May 7" },
  { slug: "traverse-city", name: "Traverse City", zip: "49684", zone: "6a", county: "Grand Traverse", lat: 44.76, lng: -85.62, grassType: "Fine Fescue / Kentucky Bluegrass blend", challenges: "Lake effect precipitation variability, tourism-driven compaction, deer browse on new seedings", soilType: "Sandy loam to loam", avgFirstFrost: "Oct 18", avgLastFrost: "May 10" },
  { slug: "mount-pleasant", name: "Mount Pleasant", zip: "48858", zone: "6a", county: "Isabella", lat: 43.60, lng: -84.77, grassType: "Kentucky Bluegrass / Tall Fescue", challenges: "Mixed soil types across the city, high student-rental traffic compaction, black cutworm in August", soilType: "Loam", avgFirstFrost: "Oct 5", avgLastFrost: "May 8" },
  { slug: "big-rapids", name: "Big Rapids", zip: "49307", zone: "6a", county: "Mecosta", lat: 43.70, lng: -85.48, grassType: "Kentucky Bluegrass / Fine Fescue", challenges: "Sandy soils dry quickly, iron deficiency chlorosis common, low organic matter", soilType: "Sandy loam", avgFirstFrost: "Oct 3", avgLastFrost: "May 10" },
  { slug: "cadillac", name: "Cadillac", zip: "49601", zone: "6a", county: "Wexford", lat: 44.25, lng: -85.40, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Shorter growing season, soil acidification from conifer leaf drop, vole damage under snow", soilType: "Sandy loam", avgFirstFrost: "Sep 28", avgLastFrost: "May 18" },
  { slug: "west-branch", name: "West Branch", zip: "48661", zone: "6a", county: "Ogemaw", lat: 44.27, lng: -84.24, grassType: "Fine Fescue blend", challenges: "Sandy soils with low water retention, white grub pressure, short season limits reseeding windows", soilType: "Sandy", avgFirstFrost: "Sep 25", avgLastFrost: "May 20" },
  { slug: "gaylord", name: "Gaylord", zip: "49735", zone: "5b", county: "Otsego", lat: 45.02, lng: -84.67, grassType: "Fine Fescue / Creeping Red Fescue", challenges: "Elevation (1,348 ft) creates micro-cold, thin soils over glacial till, snow mold in spring", soilType: "Loamy sand", avgFirstFrost: "Sep 18", avgLastFrost: "May 28" },
  { slug: "petoskey", name: "Petoskey", zip: "49770", zone: "6a", county: "Emmet", lat: 45.37, lng: -84.95, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Lake Michigan moderating but short season, alkaline soils from limestone bedrock, heavy tourist traffic", soilType: "Silty clay loam over limestone", avgFirstFrost: "Oct 8", avgLastFrost: "May 15" },
  { slug: "cheboygan", name: "Cheboygan", zip: "49721", zone: "5b", county: "Cheboygan", lat: 45.65, lng: -84.47, grassType: "Fine Fescue blend", challenges: "Cold lake air from Lake Huron, short season, snow mold after heavy winters, thin sandy soils", soilType: "Sandy loam", avgFirstFrost: "Sep 22", avgLastFrost: "May 25" },
  { slug: "alpena", name: "Alpena", zip: "49707", zone: "5b", county: "Alpena", lat: 45.06, lng: -83.43, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Lake Huron moderation but cool summers, highly alkaline bedrock soils, late spring green-up", soilType: "Silty loam over limestone", avgFirstFrost: "Sep 30", avgLastFrost: "May 22" },

  // Zone 6b: Southern Lower Peninsula
  { slug: "grand-rapids", name: "Grand Rapids", zip: "49501", zone: "6b", county: "Kent", lat: 42.96, lng: -85.66, grassType: "Kentucky Bluegrass / Perennial Ryegrass", challenges: "Urban heat island, high summer humidity, dollar spot and brown patch fungus pressure", soilType: "Sandy loam to loam", avgFirstFrost: "Oct 20", avgLastFrost: "Apr 28" },
  { slug: "lansing", name: "Lansing", zip: "48933", zone: "6b", county: "Ingham", lat: 42.73, lng: -84.55, grassType: "Kentucky Bluegrass / Tall Fescue blend", challenges: "State capital compaction, clay-heavy soils in older neighborhoods, heavy crabgrass in July", soilType: "Clay loam", avgFirstFrost: "Oct 18", avgLastFrost: "Apr 30" },
  { slug: "ann-arbor", name: "Ann Arbor", zip: "48104", zone: "6b", county: "Washtenaw", lat: 42.28, lng: -83.74, grassType: "Kentucky Bluegrass / Fine Fescue", challenges: "Shade pressure from mature canopy trees, dog spot damage, mole activity in loamy soils", soilType: "Loam to clay loam", avgFirstFrost: "Oct 22", avgLastFrost: "Apr 26" },
  { slug: "kalamazoo", name: "Kalamazoo", zip: "49001", zone: "6b", county: "Kalamazoo", lat: 42.29, lng: -85.58, grassType: "Kentucky Bluegrass / Tall Fescue", challenges: "Lake Michigan snow shadow reduces summer drought risk, red thread fungus, sandy glacial outwash", soilType: "Sandy loam", avgFirstFrost: "Oct 25", avgLastFrost: "Apr 25" },
  { slug: "flint", name: "Flint", zip: "48501", zone: "6b", county: "Genesee", lat: 43.01, lng: -83.69, grassType: "Kentucky Bluegrass / Perennial Ryegrass", challenges: "Compacted urban soils, heavy clay, high traffic from revitalization projects, crabgrass pressure", soilType: "Heavy clay", avgFirstFrost: "Oct 12", avgLastFrost: "May 2" },
  { slug: "muskegon", name: "Muskegon", zip: "49440", zone: "6b", county: "Muskegon", lat: 43.23, lng: -86.24, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Lake Michigan lake-effect creates high humidity, dollar spot pressure, windburn on exposed lawns", soilType: "Sandy loam", avgFirstFrost: "Oct 28", avgLastFrost: "Apr 22" },
  { slug: "holland", name: "Holland", zip: "49423", zone: "6b", county: "Ottawa", lat: 42.79, lng: -86.10, grassType: "Kentucky Bluegrass / Perennial Ryegrass", challenges: "Sandy lake-effect soils dry quickly, tulip festival traffic compaction, red thread in cool wet springs", soilType: "Sandy loam", avgFirstFrost: "Oct 26", avgLastFrost: "Apr 24" },
  { slug: "jackson", name: "Jackson", zip: "49201", zone: "6b", county: "Jackson", lat: 42.24, lng: -84.40, grassType: "Kentucky Bluegrass / Tall Fescue", challenges: "Heavy clay in river bottoms, localized flooding, white grub outbreaks August", soilType: "Clay loam", avgFirstFrost: "Oct 15", avgLastFrost: "May 1" },
  { slug: "battle-creek", name: "Battle Creek", zip: "49017", zone: "6b", county: "Calhoun", lat: 42.32, lng: -85.18, grassType: "Kentucky Bluegrass / Tall Fescue blend", challenges: "Variable soil types across city, summer dry spells on sandy areas, crabgrass in thin lawns", soilType: "Loam to sandy loam", avgFirstFrost: "Oct 20", avgLastFrost: "Apr 28" },
  { slug: "bay-harbor", name: "Bay Harbor", zip: "49770", zone: "6a", county: "Emmet", lat: 45.33, lng: -85.00, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Golf-influenced expectations, alkaline soils, deer browse, short season", soilType: "Silty clay loam", avgFirstFrost: "Oct 5", avgLastFrost: "May 18" },
  { slug: "ludington", name: "Ludington", zip: "49431", zone: "6b", county: "Mason", lat: 43.95, lng: -86.45, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Lake Michigan proximity means cool summers but high humidity, sandy dune soils, salt spray", soilType: "Sandy", avgFirstFrost: "Oct 22", avgLastFrost: "Apr 30" },
  { slug: "manistee", name: "Manistee", zip: "49660", zone: "6a", county: "Manistee", lat: 44.24, lng: -86.32, grassType: "Fine Fescue blend", challenges: "Sandy soils, lake humidity, short season, tourism-season foot traffic", soilType: "Sandy loam", avgFirstFrost: "Oct 15", avgLastFrost: "May 12" },
  { slug: "owosso", name: "Owosso", zip: "48867", zone: "6b", county: "Shiawassee", lat: 42.99, lng: -84.17, grassType: "Kentucky Bluegrass / Perennial Ryegrass", challenges: "Saginaw River watershed clay soils, spring flooding, sod webworm in July", soilType: "Silt clay loam", avgFirstFrost: "Oct 10", avgLastFrost: "May 3" },
  { slug: "houghton-lake", name: "Houghton Lake", zip: "48629", zone: "6a", county: "Roscommon", lat: 44.32, lng: -84.77, grassType: "Fine Fescue blend", challenges: "Sandy soils with very low nutrient retention, cabin/cottage lawns left unmanaged, vole damage", soilType: "Sandy", avgFirstFrost: "Sep 28", avgLastFrost: "May 18" },

  // Zone 5a/5b: Upper Peninsula
  { slug: "marquette", name: "Marquette", zip: "49855", zone: "5a", county: "Marquette", lat: 46.54, lng: -87.39, grassType: "Fine Fescue / Creeping Bentgrass", challenges: "Lake Superior cold moderation but brutal winters, short 130-day season, snow mold, acidic soils", soilType: "Loamy sand", avgFirstFrost: "Sep 18", avgLastFrost: "Jun 2" },
  { slug: "iron-mountain", name: "Iron Mountain", zip: "49801", zone: "5a", county: "Dickinson", lat: 45.82, lng: -88.07, grassType: "Fine Fescue blend", challenges: "Extreme cold (-30°F possible), thin soils over iron-bearing bedrock, very short growing season", soilType: "Loamy sand over bedrock", avgFirstFrost: "Sep 10", avgLastFrost: "Jun 5" },
  { slug: "escanaba", name: "Escanaba", zip: "49829", zone: "5b", county: "Delta", lat: 45.74, lng: -87.06, grassType: "Fine Fescue / Kentucky Bluegrass", challenges: "Lake Michigan moderating but cold, alkaline soils from limestone, snow mold, limited season", soilType: "Loam", avgFirstFrost: "Sep 25", avgLastFrost: "May 28" },
  { slug: "sault-sainte-marie", name: "Sault Sainte Marie", zip: "49783", zone: "5a", county: "Chippewa", lat: 46.49, lng: -84.34, grassType: "Fine Fescue / Creeping Red Fescue", challenges: "115-day season, lake-effect snow, acidic sandy soils, freeze-thaw heaving, late green-up", soilType: "Sandy loam", avgFirstFrost: "Sep 15", avgLastFrost: "Jun 8" },
];

// Zone-specific monthly task calendars (month = 0-indexed)
export const ZONE_CALENDARS = {
  "5a": [
    { month: 4, task: "fertilize", intensity: 2 },
    { month: 4, task: "mow", intensity: 1 },
    { month: 5, task: "mow", intensity: 3 },
    { month: 5, task: "water", intensity: 2 },
    { month: 5, task: "weed", intensity: 3 },
    { month: 6, task: "mow", intensity: 3 },
    { month: 6, task: "water", intensity: 3 },
    { month: 6, task: "weed", intensity: 2 },
    { month: 7, task: "mow", intensity: 3 },
    { month: 7, task: "water", intensity: 3 },
    { month: 7, task: "fertilize", intensity: 2 },
    { month: 8, task: "mow", intensity: 2 },
    { month: 8, task: "overseed", intensity: 3 },
    { month: 8, task: "aerate", intensity: 3 },
    { month: 9, task: "fertilize", intensity: 3 },
    { month: 9, task: "winterize", intensity: 2 },
    { month: 9, task: "mow", intensity: 1 },
  ],
  "5b": [
    { month: 3, task: "fertilize", intensity: 1 },
    { month: 4, task: "mow", intensity: 2 },
    { month: 4, task: "weed", intensity: 3 },
    { month: 4, task: "fertilize", intensity: 2 },
    { month: 5, task: "mow", intensity: 3 },
    { month: 5, task: "water", intensity: 2 },
    { month: 6, task: "mow", intensity: 3 },
    { month: 6, task: "water", intensity: 3 },
    { month: 7, task: "mow", intensity: 3 },
    { month: 7, task: "water", intensity: 3 },
    { month: 7, task: "fertilize", intensity: 2 },
    { month: 8, task: "aerate", intensity: 3 },
    { month: 8, task: "overseed", intensity: 3 },
    { month: 9, task: "fertilize", intensity: 3 },
    { month: 9, task: "winterize", intensity: 2 },
    { month: 10, task: "mow", intensity: 1 },
  ],
  "6a": [
    { month: 2, task: "fertilize", intensity: 1 },
    { month: 3, task: "mow", intensity: 1 },
    { month: 3, task: "weed", intensity: 2 },
    { month: 3, task: "fertilize", intensity: 2 },
    { month: 4, task: "mow", intensity: 3 },
    { month: 4, task: "weed", intensity: 3 },
    { month: 4, task: "water", intensity: 1 },
    { month: 5, task: "mow", intensity: 3 },
    { month: 5, task: "water", intensity: 2 },
    { month: 6, task: "mow", intensity: 3 },
    { month: 6, task: "water", intensity: 3 },
    { month: 7, task: "mow", intensity: 2 },
    { month: 7, task: "water", intensity: 3 },
    { month: 7, task: "fertilize", intensity: 2 },
    { month: 8, task: "aerate", intensity: 3 },
    { month: 8, task: "overseed", intensity: 3 },
    { month: 9, task: "fertilize", intensity: 3 },
    { month: 9, task: "weed", intensity: 2 },
    { month: 10, task: "winterize", intensity: 3 },
    { month: 10, task: "mow", intensity: 1 },
  ],
  "6b": [
    { month: 1, task: "fertilize", intensity: 1 },
    { month: 2, task: "weed", intensity: 1 },
    { month: 3, task: "mow", intensity: 2 },
    { month: 3, task: "fertilize", intensity: 3 },
    { month: 3, task: "weed", intensity: 3 },
    { month: 4, task: "mow", intensity: 3 },
    { month: 4, task: "water", intensity: 2 },
    { month: 4, task: "weed", intensity: 3 },
    { month: 5, task: "mow", intensity: 3 },
    { month: 5, task: "water", intensity: 3 },
    { month: 6, task: "mow", intensity: 3 },
    { month: 6, task: "water", intensity: 3 },
    { month: 6, task: "fertilize", intensity: 2 },
    { month: 7, task: "mow", intensity: 2 },
    { month: 7, task: "water", intensity: 3 },
    { month: 8, task: "aerate", intensity: 3 },
    { month: 8, task: "overseed", intensity: 3 },
    { month: 9, task: "fertilize", intensity: 3 },
    { month: 9, task: "weed", intensity: 2 },
    { month: 10, task: "winterize", intensity: 3 },
    { month: 10, task: "mow", intensity: 1 },
    { month: 11, task: "winterize", intensity: 1 },
  ],
};

// Zone-specific task recommendations for static pages
export const ZONE_TASKS = {
  "5a": {
    spring: { title: "Late Spring Startup (May)", detail: "Soil temps rarely hit 50°F before mid-May in the UP. Wait for consistent ground temps before any fertilizer application. Overseed bare patches as soon as frost is out of the ground.", product: "GreenView Fairway Formula Grass Seed" },
    summer: { title: "Careful Summer Watering", detail: "UP summers are cool: avoid overwatering which promotes fungal disease in Fine Fescue. 1 inch per week is sufficient. Mow at 3.5 inches to shade roots.", product: "Rain Bird Drip Irrigation Kit" },
    fall: { title: "Critical Fall Fertilization (Late August)", detail: "Your window is tight. Apply a high-potassium winterizer by September 10 to harden grass before first frost. Late application risks winter kill.", product: "Scotts WinterGuard Fall Fertilizer" },
    winter: { title: "Snow Mold Prevention", detail: "Apply preventive fungicide before first permanent snowfall. Avoid piling snow on lawn. Mow final cut at 2.5 inches to reduce matting.", product: "Daconil Fungicide Concentrate" },
  },
  "5b": {
    spring: { title: "April Green-Up (Watch Soil Temp)", detail: "Soil temps hit 50°F around late April. Apply a balanced 18-0-6 slow-release starter by May 1. Pre-emergent for crabgrass should go down when forsythia blooms.", product: "Jonathan Green Lawn Food Spring Fertilizer" },
    summer: { title: "July Heat Stress Management", detail: "Zone 5b lawns stress in July heat. Water deeply 2x per week, 1.5 inches total. Don't mow during heat. Wait for temps below 85°F.", product: "Orbit Lawn Sprinkler System" },
    fall: { title: "September Overseeding Window", detail: "Best window is September 1-20. Soil still warm enough for germination before frost. Aerate before seeding for best results.", product: "Jonathan Green Black Beauty Grass Seed" },
    winter: { title: "Dormant Feeding (November)", detail: "A late dormant feed (25-0-12) applied when grass stops growing but ground isn't frozen gives a head start on spring green-up.", product: "Scotts Turf Builder WinterGuard" },
  },
  "6a": {
    spring: { title: "Early Spring Fertilization (Late March)", detail: "Zone 6a soil temps hit 50°F around April 1. Apply pre-emergent herbicide when soil hits 55°F (crabgrass germination threshold). Forsythia bloom is your field indicator.", product: "Scotts Turf Builder with Halts Crabgrass Preventer" },
    summer: { title: "June–August Irrigation", detail: "Kentucky Bluegrass goes semi-dormant above 90°F. Water 1-1.5 inches/week in the early morning. Avoid evening watering, which increases fungal risk.", product: "Rain Bird Oscillating Lawn Sprinkler" },
    fall: { title: "September Aerate + Overseed", detail: "Aerate compacted soil the first week of September. Immediately overseed at 4 lbs/1,000 sq ft. Keep moist for 3 weeks. This is your highest-ROI lawn task of the year.", product: "Scotts Turf Builder Thick'R Lawn" },
    winter: { title: "Winterizer Application (October)", detail: "Apply 25-0-12 winterizer by October 15. This feeds roots through freeze and dramatically improves spring green-up. Don't skip this step.", product: "Scotts WinterGuard Fall Lawn Fertilizer" },
  },
  "6b": {
    spring: { title: "March Pre-Emergent Window", detail: "Zone 6b pre-emergent application targets mid-March when soil hits 55°F. Crabgrass germinates early here. Don't miss the window. Split application (March + May) for season-long control.", product: "Dimension 2EW Dithiopyr Pre-Emergent Herbicide" },
    summer: { title: "Summer Fungal Management", detail: "High July humidity in Zone 6b creates prime conditions for dollar spot and brown patch. Apply preventive fungicide June 15. Avoid irrigation after 10am.", product: "Spectracide Immunox Fungus Control" },
    fall: { title: "Labor Day Renovation", detail: "Zone 6b's best seeding window is September 1-15. Soil temps stay above 60°F into late September, giving new seed excellent establishment before winter.", product: "Pennington Kentucky 31 Tall Fescue Seed" },
    winter: { title: "Late-Season Potassium Loading", detail: "Zone 6b lawns benefit from a high-K winterizer (12-0-30) applied in November. Potassium hardens cell walls and dramatically reduces winter desiccation.", product: "Lebanon ProScape Fertilizer" },
  },
};

export function getCityBySlug(slug) {
  return MICHIGAN_CITIES.find(c => c.slug === slug);
}

export function getCitiesByZone(zone) {
  return MICHIGAN_CITIES.filter(c => c.zone === zone);
}
