// National ZIP-anchored city database for lawn care zone verification
// Prevents AI hallucination of USDA zone, grass type, and soil data
// Organized by region. Indexed by ZIP in the API via buildZipMap().
// Grass categories: cool = northern cool-season, warm = southern warm-season,
//                   transition = mixed zone (Tall Fescue / Bermuda)

export const US_CITIES = [

  // ── MAINE ─────────────────────────────────────────────────────────────
  { zip:"04101", city:"Portland",       state:"ME", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue / Perennial Ryegrass", soilType:"Glacial till, sandy loam", challenges:"Short 150-day season, acidic soils, late spring green-up, snow mold risk", avgLastFrost:"Apr 29", avgFirstFrost:"Oct 15" },
  { zip:"04401", city:"Bangor",         state:"ME", zone:"5a", grassType:"Fine Fescue / Kentucky Bluegrass", soilType:"Sandy loam, acidic", challenges:"Cold winters, brief summer, very acidic soils need regular liming, snow mold", avgLastFrost:"May 10", avgFirstFrost:"Oct 1" },
  { zip:"04330", city:"Augusta",        state:"ME", zone:"5a", grassType:"Fine Fescue / Kentucky Bluegrass", soilType:"Glacial loam", challenges:"Short season, deer pressure on new seedings, acidic soils", avgLastFrost:"May 8", avgFirstFrost:"Oct 3" },

  // ── NEW HAMPSHIRE ──────────────────────────────────────────────────────
  { zip:"03101", city:"Manchester",     state:"NH", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue / Perennial Ryegrass", soilType:"Sandy loam to loam", challenges:"Cold winters, late spring, sandy drought-prone soils, crabgrass in June", avgLastFrost:"May 3", avgFirstFrost:"Oct 8" },
  { zip:"03301", city:"Concord",        state:"NH", zone:"5b", grassType:"Fine Fescue / Kentucky Bluegrass", soilType:"Loam over glacial till", challenges:"Acidic rocky soils, short season, snow mold under deep snowpack", avgLastFrost:"May 11", avgFirstFrost:"Oct 2" },

  // ── VERMONT ───────────────────────────────────────────────────────────
  { zip:"05401", city:"Burlington",     state:"VT", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Sandy loam (Lake Champlain valley)", challenges:"Lake Champlain moderates but winters are harsh, acidic soils, short season", avgLastFrost:"May 4", avgFirstFrost:"Oct 3" },
  { zip:"05602", city:"Montpelier",     state:"VT", zone:"4b", grassType:"Fine Fescue / Kentucky Bluegrass", soilType:"Rocky loam", challenges:"One of the coldest capitals, short 135-day season, thin rocky soils", avgLastFrost:"May 19", avgFirstFrost:"Sep 22" },

  // ── MASSACHUSETTS ──────────────────────────────────────────────────────
  { zip:"02101", city:"Boston",         state:"MA", zone:"6b", grassType:"Kentucky Bluegrass / Perennial Ryegrass / Fine Fescue", soilType:"Urban fill, clay loam", challenges:"Urban heat island, salt from roads and harbor proximity, compacted soils, heavy crabgrass", avgLastFrost:"Apr 9", avgFirstFrost:"Nov 7" },
  { zip:"01601", city:"Worcester",      state:"MA", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Loam over glacial till", challenges:"Elevation keeps it cooler than Boston, acidic soils, dollar spot in summer", avgLastFrost:"Apr 27", avgFirstFrost:"Oct 15" },
  { zip:"01101", city:"Springfield",    state:"MA", zone:"6a", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Connecticut River valley silt loam", challenges:"River valley fog increases fungal pressure, hot humid summers, crabgrass pressure", avgLastFrost:"Apr 25", avgFirstFrost:"Oct 17" },

  // ── RHODE ISLAND ──────────────────────────────────────────────────────
  { zip:"02903", city:"Providence",     state:"RI", zone:"6b", grassType:"Kentucky Bluegrass / Perennial Ryegrass", soilType:"Urban fill, sandy loam", challenges:"Urban compaction, bay humidity increases fungal disease, salt spray in coastal areas", avgLastFrost:"Apr 15", avgFirstFrost:"Oct 27" },

  // ── CONNECTICUT ───────────────────────────────────────────────────────
  { zip:"06101", city:"Hartford",       state:"CT", zone:"6a", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Loam (Connecticut River valley)", challenges:"River valley fog and humidity, dollar spot pressure, dog spot damage in dense neighborhoods", avgLastFrost:"Apr 27", avgFirstFrost:"Oct 10" },
  { zip:"06604", city:"Bridgeport",     state:"CT", zone:"7a", grassType:"Kentucky Bluegrass / Tall Fescue / Perennial Ryegrass", soilType:"Urban loam, sandy in places", challenges:"Long Island Sound humidity, urban compaction, crabgrass and annual bluegrass", avgLastFrost:"Apr 5", avgFirstFrost:"Nov 13" },
  { zip:"06510", city:"New Haven",      state:"CT", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Clay loam", challenges:"Urban heat, heavy clay soils, shade from dense tree canopy in older neighborhoods", avgLastFrost:"Apr 8", avgFirstFrost:"Nov 8" },

  // ── NEW YORK ──────────────────────────────────────────────────────────
  { zip:"10001", city:"New York City",  state:"NY", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass / Perennial Ryegrass", soilType:"Urban fill, heavily compacted", challenges:"Extreme urban heat island, foot traffic, dog damage, shade from buildings, poor soil quality", avgLastFrost:"Apr 1", avgFirstFrost:"Nov 11" },
  { zip:"14201", city:"Buffalo",        state:"NY", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam (Erie plain)", challenges:"Lake Erie lake-effect snow, heavy clay, short season, vole damage under snowpack, snow mold", avgLastFrost:"May 3", avgFirstFrost:"Oct 16" },
  { zip:"12207", city:"Albany",         state:"NY", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue / Perennial Ryegrass", soilType:"Sandy loam (Hudson valley)", challenges:"Cold continental climate, sandy Hudson Valley soils dry quickly, dollar spot in summer", avgLastFrost:"Apr 27", avgFirstFrost:"Oct 13" },
  { zip:"13201", city:"Syracuse",       state:"NY", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam (glacial lake bottom)", challenges:"Highest snowfall of any major US city, heavy lake-effect, clay soils, snow mold, short season", avgLastFrost:"Apr 28", avgFirstFrost:"Oct 16" },
  { zip:"14601", city:"Rochester",      state:"NY", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam", challenges:"Lake Ontario lake-effect, heavy clay, salt damage from roads, crabgrass pressure in summer", avgLastFrost:"Apr 29", avgFirstFrost:"Oct 22" },

  // ── NEW JERSEY ────────────────────────────────────────────────────────
  { zip:"07101", city:"Newark",         state:"NJ", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass / Perennial Ryegrass", soilType:"Urban fill, clay over rock", challenges:"Urban heat, compaction, crabgrass, annual bluegrass invasion, salt from roads", avgLastFrost:"Apr 4", avgFirstFrost:"Nov 12" },
  { zip:"08608", city:"Trenton",        state:"NJ", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Sandy loam to clay loam", challenges:"Delaware River humidity, dollar spot, crabgrass pressure, compaction", avgLastFrost:"Apr 11", avgFirstFrost:"Nov 4" },
  { zip:"08401", city:"Atlantic City",  state:"NJ", zone:"7a", grassType:"Tall Fescue / Fine Fescue", soilType:"Sandy coastal soils", challenges:"Salt spray, sandy soils with low nutrient retention, strong coastal winds desiccate lawns", avgLastFrost:"Mar 30", avgFirstFrost:"Nov 15" },

  // ── PENNSYLVANIA ──────────────────────────────────────────────────────
  { zip:"19102", city:"Philadelphia",   state:"PA", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass / Perennial Ryegrass", soilType:"Urban clay over schist", challenges:"Urban heat island, heavy clay, crabgrass from April, summer fungal disease (brown patch)", avgLastFrost:"Mar 30", avgFirstFrost:"Nov 17" },
  { zip:"15219", city:"Pittsburgh",     state:"PA", zone:"6a", grassType:"Kentucky Bluegrass / Tall Fescue / Fine Fescue", soilType:"Shale-derived clay, hilly terrain", challenges:"Steep slopes, acid mine drainage areas, shade from valleys and hills, heavy clay compaction", avgLastFrost:"Apr 20", avgFirstFrost:"Oct 23" },
  { zip:"16501", city:"Erie",           state:"PA", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam (lake plain)", challenges:"Lake Erie lake-effect snow, heavy clay, snow mold, ice damage, one of highest US snowfall totals", avgLastFrost:"May 2", avgFirstFrost:"Oct 19" },
  { zip:"18101", city:"Allentown",      state:"PA", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Limestone-derived loam", challenges:"Alkaline limestone soils unique in the region, summer heat, crabgrass, chinch bugs", avgLastFrost:"Apr 12", avgFirstFrost:"Oct 28" },

  // ── DELAWARE ──────────────────────────────────────────────────────────
  { zip:"19801", city:"Wilmington",     state:"DE", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Sandy loam to clay loam", challenges:"Delaware River humidity, brown patch in July, crabgrass, compaction from urban traffic", avgLastFrost:"Apr 2", avgFirstFrost:"Nov 11" },

  // ── MARYLAND ──────────────────────────────────────────────────────────
  { zip:"21201", city:"Baltimore",      state:"MD", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Urban clay, heavy compaction", challenges:"High summer humidity, brown patch fungus, crabgrass pressure from mid-March, urban heat", avgLastFrost:"Mar 26", avgFirstFrost:"Nov 19" },
  { zip:"20850", city:"Rockville",      state:"MD", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Piedmont clay loam", challenges:"Hot humid summers, brown patch and dollar spot, white grubs, clay soil compaction", avgLastFrost:"Apr 5", avgFirstFrost:"Nov 6" },

  // ── WASHINGTON DC ─────────────────────────────────────────────────────
  { zip:"20001", city:"Washington",     state:"DC", zone:"7a", grassType:"Tall Fescue dominant", soilType:"Urban clay (heavy construction fill)", challenges:"Intense heat and humidity, worst brown patch pressure in region, crabgrass from late March", avgLastFrost:"Mar 25", avgFirstFrost:"Nov 15" },

  // ── VIRGINIA ──────────────────────────────────────────────────────────
  { zip:"23219", city:"Richmond",       state:"VA", zone:"7b", grassType:"Tall Fescue dominant / Bermudagrass in sunny areas", soilType:"Clay loam (Piedmont red clay)", challenges:"Red clay compaction, brown patch in summer, Bermuda vs. Tall Fescue transition zone competition", avgLastFrost:"Mar 27", avgFirstFrost:"Nov 14" },
  { zip:"23510", city:"Norfolk",        state:"VA", zone:"8a", grassType:"Bermudagrass / Tall Fescue / Zoysiagrass", soilType:"Sandy coastal soils", challenges:"Salt spray from Chesapeake Bay, sandy soils dry quickly, high humidity, St. Augustine in some areas", avgLastFrost:"Mar 18", avgFirstFrost:"Nov 21" },
  { zip:"22201", city:"Arlington",      state:"VA", zone:"7a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Heavy clay", challenges:"Dense shade from mature trees, heavy clay soils, lawn renovation every 3-5 years common", avgLastFrost:"Apr 3", avgFirstFrost:"Nov 8" },

  // ── WEST VIRGINIA ─────────────────────────────────────────────────────
  { zip:"25301", city:"Charleston",     state:"WV", zone:"6a", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Shale and sandstone-derived clay", challenges:"Steep terrain limits many lawn care practices, acidic soils, high summer humidity", avgLastFrost:"Apr 18", avgFirstFrost:"Oct 28" },

  // ── NORTH CAROLINA ────────────────────────────────────────────────────
  { zip:"28201", city:"Charlotte",      state:"NC", zone:"7b", grassType:"Tall Fescue dominant (transition zone) / Bermudagrass in full sun", soilType:"Piedmont red clay (heavy)", challenges:"Red clay is dense and slow to drain, brown patch in July, crabgrass from March, Bermuda invasion into Fescue", avgLastFrost:"Mar 21", avgFirstFrost:"Nov 15" },
  { zip:"27601", city:"Raleigh",        state:"NC", zone:"7b", grassType:"Tall Fescue / Bermudagrass / Zoysiagrass", soilType:"Piedmont clay loam", challenges:"Summer brown patch, heat stress on Tall Fescue in August, crabgrass pressure, red clay", avgLastFrost:"Mar 24", avgFirstFrost:"Nov 15" },
  { zip:"27401", city:"Greensboro",     state:"NC", zone:"7b", grassType:"Tall Fescue / Bermudagrass", soilType:"Piedmont clay loam", challenges:"Transition zone creates competition between warm and cool grasses, summer heat stress on fescue", avgLastFrost:"Apr 5", avgFirstFrost:"Oct 31" },
  { zip:"28401", city:"Wilmington",     state:"NC", zone:"8a", grassType:"Bermudagrass / Centipedegrass / St. Augustine", soilType:"Sandy coastal soils", challenges:"Sandy soils lose nutrients quickly, salt spray, chinch bugs in St. Augustine, nematodes", avgLastFrost:"Mar 7", avgFirstFrost:"Nov 26" },

  // ── SOUTH CAROLINA ────────────────────────────────────────────────────
  { zip:"29201", city:"Columbia",       state:"SC", zone:"8a", grassType:"Bermudagrass / Centipedegrass / Zoysiagrass", soilType:"Sandy loam to clay", challenges:"Hottest city in SC, extreme summer heat stresses all grasses, brown patch, chinch bugs", avgLastFrost:"Mar 14", avgFirstFrost:"Nov 21" },
  { zip:"29401", city:"Charleston",     state:"SC", zone:"8b", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Sandy, low organic matter", challenges:"Salt air, sandy soils, chinch bugs in St. Augustine, high humidity, tropical storm damage", avgLastFrost:"Feb 19", avgFirstFrost:"Dec 3" },
  { zip:"29601", city:"Greenville",     state:"SC", zone:"7b", grassType:"Tall Fescue / Bermudagrass (transition)", soilType:"Red clay (Piedmont)", challenges:"Transition zone, Tall Fescue heat stress, Bermuda invasion, red clay drainage problems", avgLastFrost:"Apr 1", avgFirstFrost:"Nov 6" },

  // ── GEORGIA ───────────────────────────────────────────────────────────
  { zip:"30301", city:"Atlanta",        state:"GA", zone:"7b", grassType:"Bermudagrass / Zoysiagrass / Tall Fescue (shade)", soilType:"Georgia red clay", challenges:"Dense red clay, extreme summer heat, dollar spot, armyworm pressure August, tree shade competition", avgLastFrost:"Mar 24", avgFirstFrost:"Nov 19" },
  { zip:"31401", city:"Savannah",       state:"GA", zone:"8b", grassType:"Bermudagrass / St. Augustine / Centipedegrass", soilType:"Sandy coastal soils", challenges:"Sandy soils, salt air, high humidity, chinch bugs, dollar spot, armyworms in summer", avgLastFrost:"Feb 18", avgFirstFrost:"Dec 5" },
  { zip:"30901", city:"Augusta",        state:"GA", zone:"8a", grassType:"Bermudagrass dominant / Zoysiagrass", soilType:"Sandy loam (Fall Line)", challenges:"Home of The Masters means high lawn expectations, sandy Fall Line soils, armyworms, drought pressure", avgLastFrost:"Mar 12", avgFirstFrost:"Nov 18" },

  // ── FLORIDA ───────────────────────────────────────────────────────────
  { zip:"32201", city:"Jacksonville",   state:"FL", zone:"9a", grassType:"St. Augustine / Centipedegrass / Bahiagrass", soilType:"Sandy, low fertility", challenges:"Sandy soils hold no nutrients, chinch bugs in St. Augustine are the primary pest, dollar spot, irrigation required year-round", avgLastFrost:"Feb 6", avgFirstFrost:"Dec 16" },
  { zip:"32301", city:"Tallahassee",    state:"FL", zone:"8b", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Sandy loam to clay", challenges:"Higher clay content than south FL, winter frost damage possible, mole crickets, armyworms", avgLastFrost:"Feb 27", avgFirstFrost:"Nov 30" },
  { zip:"32801", city:"Orlando",        state:"FL", zone:"9b", grassType:"St. Augustine (Floratam) / Zoysiagrass / Bahiagrass", soilType:"Sandy (very low organic matter)", challenges:"Chinch bugs are relentless, gray leaf spot, irrigation required, tourist traffic compaction, nematodes", avgLastFrost:"Jan 31", avgFirstFrost:"Dec 14" },
  { zip:"33601", city:"Tampa",          state:"FL", zone:"9b", grassType:"St. Augustine / Zoysiagrass / Bahiagrass", soilType:"Sandy, high pH near coast", challenges:"Sandy soils, chinch bugs, gray leaf spot, flooding from summer storms, irrigation scheduling critical", avgLastFrost:"Jan 28", avgFirstFrost:"Dec 17" },
  { zip:"33101", city:"Miami",          state:"FL", zone:"10b", grassType:"St. Augustine / Zoysiagrass / Seashore Paspalum", soilType:"Sandy limestone, alkaline", challenges:"Limestone soils cause iron chlorosis, salt air, chinch bugs year-round, no frost dormancy, continuous growth demands continuous maintenance", avgLastFrost:"never", avgFirstFrost:"never" },

  // ── ALABAMA ───────────────────────────────────────────────────────────
  { zip:"35201", city:"Birmingham",     state:"AL", zone:"7b", grassType:"Bermudagrass / Centipedegrass / Tall Fescue (shade/north slopes)", soilType:"Red clay (Alabama Piedmont)", challenges:"Heavy red clay, transition zone creates Bermuda vs. Fescue management conflict, dollar spot, mole crickets", avgLastFrost:"Mar 19", avgFirstFrost:"Nov 14" },
  { zip:"36104", city:"Montgomery",     state:"AL", zone:"8a", grassType:"Bermudagrass / Centipedegrass / Zoysiagrass", soilType:"Clay loam", challenges:"Hot humid summers, dollar spot, mole crickets, chinch bugs in Centipede, summer drought stress", avgLastFrost:"Feb 27", avgFirstFrost:"Nov 24" },
  { zip:"36601", city:"Mobile",         state:"AL", zone:"8b", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Sandy loam to clay", challenges:"Gulf Coast humidity, chinch bugs, gray leaf spot, flooding from tropical storms, high rainfall leaches nutrients", avgLastFrost:"Feb 17", avgFirstFrost:"Dec 3" },

  // ── MISSISSIPPI ───────────────────────────────────────────────────────
  { zip:"39201", city:"Jackson",        state:"MS", zone:"8a", grassType:"Bermudagrass / Centipedegrass / Zoysiagrass", soilType:"Clay loam", challenges:"Heavy clay, mole crickets, dollar spot, extreme summer heat, humid disease pressure", avgLastFrost:"Mar 10", avgFirstFrost:"Nov 14" },
  { zip:"39501", city:"Gulfport",       state:"MS", zone:"8b", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Sandy coastal", challenges:"Gulf Coast exposure, sandy soils, chinch bugs, gray leaf spot, hurricane recovery", avgLastFrost:"Feb 17", avgFirstFrost:"Dec 3" },

  // ── LOUISIANA ─────────────────────────────────────────────────────────
  { zip:"70112", city:"New Orleans",    state:"LA", zone:"9a", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Alluvial clay, poor drainage", challenges:"Flooding and drainage issues, very poor drainage soils, chinch bugs, tropical disease pressure, hurricane damage", avgLastFrost:"Feb 13", avgFirstFrost:"Dec 9" },
  { zip:"70801", city:"Baton Rouge",    state:"LA", zone:"9a", grassType:"St. Augustine / Centipedegrass / Bermudagrass", soilType:"Alluvial clay loam", challenges:"High humidity, Gray leaf spot in St. Augustine, mole crickets, flooding risk, hurricane damage", avgLastFrost:"Feb 18", avgFirstFrost:"Dec 9" },

  // ── TENNESSEE ─────────────────────────────────────────────────────────
  { zip:"37201", city:"Nashville",      state:"TN", zone:"7a", grassType:"Tall Fescue dominant (transition zone) / Bermudagrass in sun", soilType:"Tennessee limestone-derived clay loam", challenges:"Prime transition zone, Tall Fescue goes dormant in summer heat, Bermuda invasion, dollar spot, summer drought", avgLastFrost:"Apr 3", avgFirstFrost:"Nov 7" },
  { zip:"38101", city:"Memphis",        state:"TN", zone:"7b", grassType:"Bermudagrass / Tall Fescue / Zoysiagrass", soilType:"Mississippi River loam, some clay", challenges:"Hot humid summers favor warm-season grasses, Tall Fescue struggles in July-August, brown patch pressure", avgLastFrost:"Mar 23", avgFirstFrost:"Nov 13" },
  { zip:"37901", city:"Knoxville",      state:"TN", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass (cooler areas)", soilType:"Appalachian valley clay loam", challenges:"Valley humidity, brown patch in summer, red clover and thistle weed pressure, acidic soils", avgLastFrost:"Apr 6", avgFirstFrost:"Oct 29" },

  // ── KENTUCKY ──────────────────────────────────────────────────────────
  { zip:"40201", city:"Louisville",     state:"KY", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass (the state invented KY Blue)", soilType:"Ohio River valley silt loam", challenges:"High summer humidity, brown patch, dollar spot, crabgrass pressure, flooding in low areas", avgLastFrost:"Apr 11", avgFirstFrost:"Oct 28" },
  { zip:"40507", city:"Lexington",      state:"KY", zone:"6b", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Limestone-derived loam (Bluegrass region)", challenges:"Horse country means high lawn expectations, alkaline limestone soils, drought in August, crown rust", avgLastFrost:"Apr 13", avgFirstFrost:"Oct 28" },

  // ── OHIO ──────────────────────────────────────────────────────────────
  { zip:"43215", city:"Columbus",       state:"OH", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue / Perennial Ryegrass", soilType:"Clay loam (glacial till)", challenges:"Heavy clay, summer heat and humidity, dollar spot, crabgrass pressure, black cutworm", avgLastFrost:"Apr 22", avgFirstFrost:"Oct 22" },
  { zip:"44101", city:"Cleveland",      state:"OH", zone:"6a", grassType:"Kentucky Bluegrass / Perennial Ryegrass / Fine Fescue", soilType:"Heavy clay (Lake Erie plain)", challenges:"Lake Erie lake-effect snow and moisture, heavy clay compaction, snow mold, salt damage from winter roads", avgLastFrost:"May 2", avgFirstFrost:"Oct 28" },
  { zip:"45201", city:"Cincinnati",     state:"OH", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Ohio River valley silt loam", challenges:"Ohio River valley humidity, brown patch and dollar spot, crabgrass from late March, summer heat stress on KY Blue", avgLastFrost:"Apr 15", avgFirstFrost:"Oct 20" },
  { zip:"43601", city:"Toledo",         state:"OH", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Heavy clay (Maumee River floodplain)", challenges:"Some of the heaviest clay soils in Ohio, flooding risk in low areas, snow mold, lake-effect from Lake Erie", avgLastFrost:"Apr 29", avgFirstFrost:"Oct 25" },

  // ── INDIANA ───────────────────────────────────────────────────────────
  { zip:"46201", city:"Indianapolis",   state:"IN", zone:"6a", grassType:"Kentucky Bluegrass / Tall Fescue / Perennial Ryegrass", soilType:"Clay loam (glacial till)", challenges:"Heavy clay, summer heat and humidity, crabgrass pressure, dollar spot, flooding in low neighborhoods", avgLastFrost:"Apr 20", avgFirstFrost:"Oct 27" },
  { zip:"46801", city:"Fort Wayne",     state:"IN", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam", challenges:"Cold continental climate, heavy clay, winter road salt, snow mold risk, white grub pressure", avgLastFrost:"Apr 24", avgFirstFrost:"Oct 20" },

  // ── ILLINOIS ──────────────────────────────────────────────────────────
  { zip:"60601", city:"Chicago",        state:"IL", zone:"5b", grassType:"Kentucky Bluegrass / Perennial Ryegrass / Fine Fescue", soilType:"Urban clay, heavy compaction", challenges:"Lake Michigan cold delays spring, heavy clay, salt damage, urban heat in summer, crabgrass pressure", avgLastFrost:"Apr 22", avgFirstFrost:"Oct 28" },
  { zip:"62701", city:"Springfield",    state:"IL", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Prairie loam (highly fertile)", challenges:"Rich prairie soils grow weeds as well as grass, summer heat and drought stress, crabgrass", avgLastFrost:"Apr 20", avgFirstFrost:"Oct 25" },
  { zip:"61601", city:"Peoria",         state:"IL", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Illinois River valley loam", challenges:"River valley humidity, dollar spot, summer heat, crabgrass and annual bluegrass pressure", avgLastFrost:"Apr 22", avgFirstFrost:"Oct 17" },

  // ── WISCONSIN ─────────────────────────────────────────────────────────
  { zip:"53201", city:"Milwaukee",      state:"WI", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue / Perennial Ryegrass", soilType:"Clay loam (Lake Michigan plain)", challenges:"Lake Michigan moderates but winters are severe, heavy clay, snow mold, ice damage, very short season", avgLastFrost:"Apr 20", avgFirstFrost:"Oct 25" },
  { zip:"53701", city:"Madison",        state:"WI", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Glacial loam to sandy loam", challenges:"Cold winters, acidic soils, snow mold, vole damage under long snowpack, white grub pressure", avgLastFrost:"Apr 28", avgFirstFrost:"Oct 14" },
  { zip:"54301", city:"Green Bay",      state:"WI", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam", challenges:"Lake Michigan effect extends season slightly but winters are brutal, heavy clay, snow mold", avgLastFrost:"May 4", avgFirstFrost:"Oct 7" },

  // ── MINNESOTA ─────────────────────────────────────────────────────────
  { zip:"55401", city:"Minneapolis",    state:"MN", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue (cold-hardy varieties)", soilType:"Loam to clay loam", challenges:"One of the harshest lawn climates in the US, short 150-day season, snow mold, vole damage, acidic soils", avgLastFrost:"May 3", avgFirstFrost:"Oct 7" },
  { zip:"55101", city:"Saint Paul",     state:"MN", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam (Mississippi River valley)", challenges:"Extreme cold, short season, vole damage, snow mold, acidic soils, flooding near river", avgLastFrost:"May 6", avgFirstFrost:"Oct 5" },
  { zip:"55801", city:"Duluth",         state:"MN", zone:"4a", grassType:"Fine Fescue / Cold-hardy Kentucky Bluegrass", soilType:"Sandy loam over bedrock", challenges:"Lake Superior keeps summers cool, very short 130-day season, acidic soils, snow mold, cold lake winds", avgLastFrost:"May 24", avgFirstFrost:"Sep 20" },

  // ── IOWA ──────────────────────────────────────────────────────────────
  { zip:"50301", city:"Des Moines",     state:"IA", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue / Perennial Ryegrass", soilType:"Prairie loam (highly fertile)", challenges:"Prairie soils are very fertile but summer drought and heat stress cool-season grasses, crabgrass June-August", avgLastFrost:"Apr 24", avgFirstFrost:"Oct 19" },
  { zip:"52401", city:"Cedar Rapids",   state:"IA", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Prairie loam", challenges:"Continental climate, summer drought, cold winters, crabgrass pressure, flooding near Cedar River", avgLastFrost:"Apr 29", avgFirstFrost:"Oct 9" },

  // ── MISSOURI ──────────────────────────────────────────────────────────
  { zip:"63101", city:"St. Louis",      state:"MO", zone:"6a", grassType:"Tall Fescue / Kentucky Bluegrass (transition zone)", soilType:"Missouri River valley clay loam", challenges:"Transition zone, extreme summer heat, brown patch, crabgrass from March, Bermuda invades from south", avgLastFrost:"Apr 5", avgFirstFrost:"Oct 30" },
  { zip:"64101", city:"Kansas City",    state:"MO", zone:"6a", grassType:"Tall Fescue / Kentucky Bluegrass (transition zone)", soilType:"Prairie clay loam", challenges:"Transition zone management, hot dry summers, brown patch, crabgrass, Bermuda encroachment", avgLastFrost:"Apr 9", avgFirstFrost:"Oct 26" },

  // ── NORTH DAKOTA ──────────────────────────────────────────────────────
  { zip:"58102", city:"Fargo",          state:"ND", zone:"4a", grassType:"Kentucky Bluegrass / Fine Fescue (cold-hardy varieties)", soilType:"Red River Valley clay (extremely fertile)", challenges:"Severe winters, very short 140-day season, Red River flooding, heavy clay soils, extreme wind", avgLastFrost:"May 13", avgFirstFrost:"Sep 27" },
  { zip:"58501", city:"Bismarck",       state:"ND", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue / Buffalograss", soilType:"Clay loam, mixed prairie soils", challenges:"Very cold winters, severe drought risk, strong winds, short season, low humidity benefits some but challenges irrigation", avgLastFrost:"May 11", avgFirstFrost:"Sep 25" },

  // ── SOUTH DAKOTA ──────────────────────────────────────────────────────
  { zip:"57101", city:"Sioux Falls",    state:"SD", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Prairie loam", challenges:"Short season, extreme winter cold, summer drought, strong winds, hail damage", avgLastFrost:"May 4", avgFirstFrost:"Oct 3" },
  { zip:"57701", city:"Rapid City",     state:"SD", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue / Buffalograss", soilType:"Mixed clay loam and sandy soils", challenges:"Chinook winds cause extreme temperature swings, low humidity requires irrigation, short season", avgLastFrost:"May 7", avgFirstFrost:"Oct 4" },

  // ── NEBRASKA ──────────────────────────────────────────────────────────
  { zip:"68101", city:"Omaha",          state:"NE", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue / Buffalograss", soilType:"Loess (highly fertile, well-drained)", challenges:"Summer drought, hail, wind, transition to low-water grasses popular, crabgrass pressure", avgLastFrost:"Apr 14", avgFirstFrost:"Oct 20" },
  { zip:"68501", city:"Lincoln",        state:"NE", zone:"5b", grassType:"Kentucky Bluegrass / Tall Fescue / Buffalograss", soilType:"Prairie loam", challenges:"Continental drought, summer heat, strong wind, water restrictions push Buffalograss adoption", avgLastFrost:"Apr 20", avgFirstFrost:"Oct 14" },

  // ── KANSAS ────────────────────────────────────────────────────────────
  { zip:"67201", city:"Wichita",        state:"KS", zone:"6a", grassType:"Tall Fescue / Bermudagrass / Buffalograss (true transition zone)", soilType:"Silt loam (highly fertile)", challenges:"Extreme heat, summer drought, transition zone creates Bermuda vs. Fescue management dilemma, strong winds", avgLastFrost:"Apr 11", avgFirstFrost:"Oct 28" },
  { zip:"66601", city:"Topeka",         state:"KS", zone:"5b", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Silty clay loam", challenges:"Hot dry summers, crabgrass, summer drought stress on cool-season grasses, flooding near Kansas River", avgLastFrost:"Apr 17", avgFirstFrost:"Oct 20" },

  // ── OKLAHOMA ──────────────────────────────────────────────────────────
  { zip:"73101", city:"Oklahoma City",  state:"OK", zone:"7a", grassType:"Bermudagrass dominant / Tall Fescue (north-facing, shade)", soilType:"Red clay (high iron content)", challenges:"Extreme summer heat, severe drought, strong winds, red clay soils, bermuda dormancy in mild winters", avgLastFrost:"Mar 27", avgFirstFrost:"Nov 7" },
  { zip:"74101", city:"Tulsa",          state:"OK", zone:"7a", grassType:"Bermudagrass / Zoysiagrass / Tall Fescue (transition)", soilType:"Clay loam", challenges:"Hot dry summers, ice storms in winter, transition zone management, dollar spot, chinch bugs in Bermuda", avgLastFrost:"Mar 31", avgFirstFrost:"Nov 4" },

  // ── ARKANSAS ──────────────────────────────────────────────────────────
  { zip:"72201", city:"Little Rock",    state:"AR", zone:"7b", grassType:"Bermudagrass / Zoysiagrass / Tall Fescue (partial shade)", soilType:"Red clay loam", challenges:"Hot humid summers, Bermuda dormancy management, dollar spot, armyworm pressure, ice storms", avgLastFrost:"Mar 16", avgFirstFrost:"Nov 14" },

  // ── TEXAS ─────────────────────────────────────────────────────────────
  { zip:"77001", city:"Houston",        state:"TX", zone:"9a", grassType:"St. Augustine (Floratam) / Bermudagrass / Zoysiagrass", soilType:"Heavy clay (Houston black gumbo)", challenges:"Houston black clay expands and contracts dramatically, chinch bugs, gray leaf spot, flooding, Bermuda vs. St. Augustine competition", avgLastFrost:"Feb 4", avgFirstFrost:"Dec 11" },
  { zip:"75201", city:"Dallas",         state:"TX", zone:"8a", grassType:"Bermudagrass / Zoysiagrass / St. Augustine", soilType:"Black clay (Blackland Prairie)", challenges:"Dallas black clay is extremely challenging, drought, summer heat, fire ant mounds in lawns, Bermuda bermuda dormancy", avgLastFrost:"Mar 18", avgFirstFrost:"Nov 12" },
  { zip:"78201", city:"San Antonio",    state:"TX", zone:"9a", grassType:"St. Augustine / Bermudagrass / Zoysiagrass", soilType:"Caliche over limestone (very alkaline)", challenges:"Limestone and caliche soils create iron deficiency, chinch bugs, extreme summer drought, water restrictions", avgLastFrost:"Feb 26", avgFirstFrost:"Nov 28" },
  { zip:"78701", city:"Austin",         state:"TX", zone:"8b", grassType:"St. Augustine / Bermudagrass / Buffalo grass (xeriscape)", soilType:"Clay over limestone (Edwards Plateau edge)", challenges:"Limestone soils, chinch bugs, summer drought, water restrictions drive Buffalograss adoption, cedar pollen affects seeding", avgLastFrost:"Feb 19", avgFirstFrost:"Dec 1" },
  { zip:"76101", city:"Fort Worth",     state:"TX", zone:"8a", grassType:"Bermudagrass / Buffalo grass / Zoysiagrass", soilType:"Black clay (Blackland Prairie)", challenges:"Blackland clay, extreme drought, fire ants, Bermuda management, water conservation requirements", avgLastFrost:"Mar 13", avgFirstFrost:"Nov 18" },
  { zip:"79901", city:"El Paso",        state:"TX", zone:"8a", grassType:"Bermudagrass / Buffalo grass / Tall Fescue (winter overseed)", soilType:"Sandy loam to caliche, alkaline", challenges:"Desert climate, extreme aridity, water restrictions, alkaline caliche soils, summer heat 100+ degrees", avgLastFrost:"Mar 18", avgFirstFrost:"Nov 22" },
  { zip:"79101", city:"Amarillo",       state:"TX", zone:"6b", grassType:"Bermudagrass / Buffalo grass / Kentucky Bluegrass (transition)", soilType:"Sandy loam (High Plains)", challenges:"Extreme wind, drought, winter cold, hail, caliche hardpan limits rooting, water table dropping", avgLastFrost:"Apr 14", avgFirstFrost:"Oct 28" },
  { zip:"79401", city:"Lubbock",        state:"TX", zone:"7a", grassType:"Bermudagrass / Buffalo grass", soilType:"Sandy loam (West Texas)", challenges:"Extreme drought, High Plains wind, dust, sand movement, water restrictions, summer heat", avgLastFrost:"Apr 2", avgFirstFrost:"Nov 5" },

  // ── COLORADO ──────────────────────────────────────────────────────────
  { zip:"80201", city:"Denver",         state:"CO", zone:"5b", grassType:"Kentucky Bluegrass (irrigated) / Buffalo grass (low water)", soilType:"Clay loam, alkaline (dryland soils)", challenges:"Chinook wind causes extreme temp swings, very low humidity, irrigation critical (16 in annual rain), alkaline soils, hail damage", avgLastFrost:"May 7", avgFirstFrost:"Oct 1" },
  { zip:"80901", city:"Colorado Springs", state:"CO", zone:"5b", grassType:"Kentucky Bluegrass / Buffalo grass / Fine Fescue", soilType:"Sandy loam to clay, alkaline", challenges:"Altitude 6,000 ft, hail, intense UV damages turfgrass, low humidity, fire risk in dry spells, irrigation required", avgLastFrost:"May 16", avgFirstFrost:"Sep 20" },
  { zip:"80301", city:"Boulder",        state:"CO", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue (eco-conscious alternatives popular)", soilType:"Mixed clay and sandy loam", challenges:"Foothills chinook winds, hail, water restrictions, xeriscaping trends replacing traditional lawns, fire risk", avgLastFrost:"May 3", avgFirstFrost:"Oct 7" },
  { zip:"80521", city:"Fort Collins",   state:"CO", zone:"5b", grassType:"Kentucky Bluegrass / Buffalo grass", soilType:"Sandy loam to clay loam", challenges:"Low humidity, wind, hail, irrigation required, alkaline soils, Colorado State turfgrass research hub", avgLastFrost:"May 7", avgFirstFrost:"Oct 1" },

  // ── UTAH ──────────────────────────────────────────────────────────────
  { zip:"84101", city:"Salt Lake City", state:"UT", zone:"7a", grassType:"Kentucky Bluegrass (heavily irrigated) / Tall Fescue", soilType:"Alkaline lake-bottom soils, clay to sandy", challenges:"Only 16 inches of annual rain, irrigation absolutely required, alkaline soils, water restrictions, summer drought", avgLastFrost:"Apr 19", avgFirstFrost:"Oct 26" },
  { zip:"84601", city:"Provo",          state:"UT", zone:"7a", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Sandy loam to clay, alkaline", challenges:"Mountain valley location, irrigation required, alkaline soils cause iron chlorosis, low humidity", avgLastFrost:"Apr 24", avgFirstFrost:"Oct 28" },
  { zip:"84770", city:"St. George",     state:"UT", zone:"8b", grassType:"Bermudagrass (summer) / Perennial Ryegrass (winter overseed)", soilType:"Sandy, red rock soils, alkaline", challenges:"Desert, 8 in annual rain, extreme summer heat, water restrictions drive xeriscape adoption, alkaline soils", avgLastFrost:"Mar 8", avgFirstFrost:"Nov 23" },

  // ── WYOMING ───────────────────────────────────────────────────────────
  { zip:"82001", city:"Cheyenne",       state:"WY", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Sandy clay loam, alkaline", challenges:"Highest state capital in US at 6,062 ft, extreme wind, short 120-day season, hail, low humidity, irrigation required", avgLastFrost:"May 20", avgFirstFrost:"Sep 27" },
  { zip:"82601", city:"Casper",         state:"WY", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue / Buffalo grass", soilType:"Sandy loam, alkaline", challenges:"High altitude, extreme wind, severe drought, short season, very low humidity, hail storms", avgLastFrost:"May 22", avgFirstFrost:"Sep 22" },

  // ── MONTANA ───────────────────────────────────────────────────────────
  { zip:"59101", city:"Billings",       state:"MT", zone:"4b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam, alkaline", challenges:"Extreme continental climate, Chinook wind creates unpredictable temperature swings, drought, short season, hail", avgLastFrost:"May 7", avgFirstFrost:"Sep 28" },
  { zip:"59801", city:"Missoula",       state:"MT", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Valley loam (Clark Fork River valley)", challenges:"Valley smoke from wildfires stresses lawns, drought, short season, deer pressure, acidic soils under conifers", avgLastFrost:"May 5", avgFirstFrost:"Oct 5" },

  // ── IDAHO ─────────────────────────────────────────────────────────────
  { zip:"83701", city:"Boise",          state:"ID", zone:"6b", grassType:"Kentucky Bluegrass / Tall Fescue (irrigated)", soilType:"Sandy loam to clay loam, alkaline", challenges:"Only 12 in annual rain, irrigation required, alkaline soils, summer heat, water restrictions increasing", avgLastFrost:"Apr 23", avgFirstFrost:"Oct 17" },
  { zip:"83651", city:"Nampa",          state:"ID", zone:"7a", grassType:"Kentucky Bluegrass / Tall Fescue", soilType:"Sandy loam to clay", challenges:"Similar to Boise but slightly warmer, irrigation critical, alkaline soils, water rights issues", avgLastFrost:"Apr 14", avgFirstFrost:"Oct 23" },

  // ── NEVADA ────────────────────────────────────────────────────────────
  { zip:"89101", city:"Las Vegas",      state:"NV", zone:"9b", grassType:"Bermudagrass (summer) / Perennial Ryegrass (winter overseed)", soilType:"Sandy desert soils, extremely alkaline", challenges:"4 in annual rain, extreme aridity, 115 degree heat, water restrictions reduce traditional lawns, Las Vegas is phasing out grass entirely", avgLastFrost:"Feb 7", avgFirstFrost:"Dec 10" },
  { zip:"89501", city:"Reno",           state:"NV", zone:"7a", grassType:"Kentucky Bluegrass (irrigated) / Tall Fescue", soilType:"Sandy desert soils, alkaline", challenges:"High desert at 4,500 ft, only 7 in annual rain, extreme aridity, irrigation essential, alkaline soils, water restrictions", avgLastFrost:"May 14", avgFirstFrost:"Oct 2" },

  // ── ARIZONA ───────────────────────────────────────────────────────────
  { zip:"85001", city:"Phoenix",        state:"AZ", zone:"9b", grassType:"Bermudagrass (summer) / Perennial Ryegrass (winter overseed)", soilType:"Sandy desert soils, caliche, alkaline", challenges:"Hottest major city in US, 110+ summer temps, caliche hardpan limits roots, extreme alkalinity, monsoon flooding, water restrictions", avgLastFrost:"Feb 5", avgFirstFrost:"Dec 15" },
  { zip:"85701", city:"Tucson",         state:"AZ", zone:"9a", grassType:"Bermudagrass / Desert-adapted varieties / Winter Rye overseed", soilType:"Sandy desert soils, alkaline", challenges:"Desert climate, summer monsoon brings brief irrigation relief but also disease, caliche, alkaline soils, water restrictions", avgLastFrost:"Feb 28", avgFirstFrost:"Nov 29" },
  { zip:"86001", city:"Flagstaff",      state:"AZ", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue (mountain climate)", soilType:"Volcanic loam (ponderosa pine zone)", challenges:"High altitude 7,000 ft, late spring, acidic soils under pines, short season, snowmelt erosion, hail", avgLastFrost:"Jun 1", avgFirstFrost:"Sep 18" },

  // ── NEW MEXICO ────────────────────────────────────────────────────────
  { zip:"87101", city:"Albuquerque",    state:"NM", zone:"7a", grassType:"Kentucky Bluegrass (irrigated) / Bermudagrass / Buffalo grass", soilType:"Sandy loam to clay, alkaline", challenges:"High desert at 5,300 ft, 9 in annual rain, alkaline soils, water restrictions, extreme UV, wind erosion", avgLastFrost:"Apr 15", avgFirstFrost:"Oct 29" },
  { zip:"88001", city:"Las Cruces",     state:"NM", zone:"8a", grassType:"Bermudagrass / Buffalo grass / Winter Rye overseed", soilType:"Sandy, caliche, alkaline", challenges:"Chihuahuan Desert, irrigation required, caliche soils, extreme heat and drought, alkaline pH above 8", avgLastFrost:"Mar 21", avgFirstFrost:"Nov 15" },

  // ── WASHINGTON STATE ──────────────────────────────────────────────────
  { zip:"98101", city:"Seattle",        state:"WA", zone:"8b", grassType:"Perennial Ryegrass dominant / Fine Fescue blend", soilType:"Clay loam, often wet and compacted", challenges:"Wet winters cause waterlogging and moss invasion, summer drought (only 2-3 in July-August), red thread fungus in spring, moss control is annual necessity", avgLastFrost:"Mar 6", avgFirstFrost:"Nov 11" },
  { zip:"99201", city:"Spokane",        state:"WA", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue / Tall Fescue", soilType:"Sandy loam (Palouse area)", challenges:"Dry eastern WA climate contrasts with wet west, low rainfall requires irrigation, summer drought, hail", avgLastFrost:"Apr 27", avgFirstFrost:"Oct 12" },
  { zip:"98401", city:"Tacoma",         state:"WA", zone:"8b", grassType:"Perennial Ryegrass / Fine Fescue", soilType:"Clay loam, glacial till", challenges:"Heavy annual rainfall causes waterlogging, moss invasion, Puget Sound humidity, red thread and fusarium patch", avgLastFrost:"Mar 16", avgFirstFrost:"Nov 7" },

  // ── OREGON ────────────────────────────────────────────────────────────
  { zip:"97201", city:"Portland",       state:"OR", zone:"8b", grassType:"Perennial Ryegrass dominant / Fine Fescue", soilType:"Willamette Valley clay loam", challenges:"37 in annual rain mostly October to May, moss invasion is primary enemy, summer drought requires irrigation, red thread, fusarium patch in fall", avgLastFrost:"Mar 5", avgFirstFrost:"Nov 18" },
  { zip:"97401", city:"Eugene",         state:"OR", zone:"8b", grassType:"Perennial Ryegrass / Fine Fescue blend", soilType:"Willamette Valley loam", challenges:"Wet winters, moss and thatch problems, summer drought, red thread in spring, high seed production region (Willamette Valley is US grass seed capital)", avgLastFrost:"Mar 25", avgFirstFrost:"Nov 8" },
  { zip:"97701", city:"Bend",           state:"OR", zone:"6a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Sandy volcanic soils, low organic matter", challenges:"High desert at 3,600 ft, only 12 in annual rain, irrigation required, cold winters, volcanic soils low in nutrients", avgLastFrost:"May 25", avgFirstFrost:"Sep 22" },

  // ── CALIFORNIA ────────────────────────────────────────────────────────
  { zip:"90001", city:"Los Angeles",    state:"CA", zone:"10a", grassType:"Bermudagrass / Tall Fescue / Kikuyugrass", soilType:"Sandy loam to clay, alkaline", challenges:"Water restrictions, kikuyu grass invasion is almost impossible to stop, summer drought, Santa Ana wind desiccation, alkaline soils", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"94101", city:"San Francisco",  state:"CA", zone:"10a", grassType:"Perennial Ryegrass / Fine Fescue (cool coastal)", soilType:"Sandy loam to clay", challenges:"Cold fog limits warm-season growth, but also inhibits cool-season dormancy, very little rain June-October, water restrictions, salt air coastal zones", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"92101", city:"San Diego",      state:"CA", zone:"10b", grassType:"Bermudagrass / St. Augustine / Kikuyugrass / Tall Fescue", soilType:"Sandy coastal soils", challenges:"Water restrictions, kikuyu is nearly unstoppable, salt air, minimal rainfall, summer drought, coastal erosion affects sandy lawns", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"95814", city:"Sacramento",     state:"CA", zone:"9b", grassType:"Tall Fescue dominant / Bermudagrass (full sun)", soilType:"Sacramento Valley clay loam, alkaline", challenges:"Summer drought (zero rain June-October), extreme July heat stresses Tall Fescue, water restrictions, clay soils bake hard", avgLastFrost:"Feb 14", avgFirstFrost:"Dec 1" },
  { zip:"95101", city:"San Jose",       state:"CA", zone:"9b", grassType:"Tall Fescue / Bermudagrass / Kikuyugrass", soilType:"Santa Clara Valley clay loam", challenges:"Water restrictions, summer drought, kikuyu grass invasion, heat in inland valleys, clay soils compact severely", avgLastFrost:"Feb 13", avgFirstFrost:"Dec 14" },
  { zip:"93701", city:"Fresno",         state:"CA", zone:"9b", grassType:"Bermudagrass / Tall Fescue", soilType:"Sandy loam to clay (San Joaquin Valley)", challenges:"Extreme summer heat 105+, summer drought, heavy irrigation required, alkaline soils, foggy winters (Tule fog)", avgLastFrost:"Feb 17", avgFirstFrost:"Nov 24" },
  { zip:"93301", city:"Bakersfield",    state:"CA", zone:"9b", grassType:"Bermudagrass dominant", soilType:"Sandy loam, alkaline", challenges:"Hottest California city outside Death Valley, zero summer rain, water restrictions, dust and poor air quality stress lawns", avgLastFrost:"Feb 17", avgFirstFrost:"Nov 28" },

  // ── ALASKA ────────────────────────────────────────────────────────────
  { zip:"99501", city:"Anchorage",      state:"AK", zone:"4a", grassType:"Fine Fescue / Creeping Bentgrass / Timothy", soilType:"Glacial loam, silty", challenges:"Only 110-120 day growing season, permafrost in some areas, waterlogging, moose browse on lawns, midnight sun can cause uneven growth", avgLastFrost:"May 17", avgFirstFrost:"Sep 15" },

  // ── HAWAII ────────────────────────────────────────────────────────────
  { zip:"96813", city:"Honolulu",       state:"HI", zone:"12b", grassType:"Bermudagrass / Zoysiagrass / Seashore Paspalum / St. Augustine", soilType:"Volcanic soils, varies by island side", challenges:"Year-round growth with no dormancy, continuous maintenance required, tropical disease pressure, salt air coastal, centipede grass invasion", avgLastFrost:"never", avgFirstFrost:"never" },

  // ── ADDITIONAL MAJOR METROS ───────────────────────────────────────────
  { zip:"85251", city:"Scottsdale",     state:"AZ", zone:"9b", grassType:"Bermudagrass / Perennial Ryegrass (winter overseed)", soilType:"Sandy desert, caliche, alkaline", challenges:"Luxury lawn expectations in desert climate, caliche, extreme heat, water cost and restrictions, scorched appearance without irrigation", avgLastFrost:"Feb 5", avgFirstFrost:"Dec 11" },
  { zip:"85281", city:"Tempe",          state:"AZ", zone:"9b", grassType:"Bermudagrass / Perennial Ryegrass overseed", soilType:"Sandy desert soils", challenges:"Urban heat island amplifies Phoenix heat, game day traffic compaction at ASU, water restrictions, caliche", avgLastFrost:"Feb 5", avgFirstFrost:"Dec 15" },
  { zip:"92614", city:"Irvine",         state:"CA", zone:"10a", grassType:"Tall Fescue / Bermudagrass / Kikuyugrass", soilType:"Adobe clay, alkaline", challenges:"Water restrictions, kikuyu invasion, clay soils bake hard in summer, planned community HOA lawn standards are strict", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"92801", city:"Anaheim",        state:"CA", zone:"10a", grassType:"Bermudagrass / Tall Fescue", soilType:"Sandy loam to clay", challenges:"Water restrictions, kikuyu, urban heat, summer drought, tourist district foot traffic", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"92501", city:"Riverside",      state:"CA", zone:"9b", grassType:"Bermudagrass / Tall Fescue", soilType:"Sandy loam, alkaline", challenges:"Inland Empire heat, smog stress on turfgrass, water restrictions, summer drought, citrus region soils tend acidic", avgLastFrost:"Jan 7", avgFirstFrost:"Dec 30" },
  { zip:"91910", city:"Chula Vista",    state:"CA", zone:"10b", grassType:"Bermudagrass / St. Augustine", soilType:"Sandy coastal to clay", challenges:"Border region heat in summer, water restrictions, salt air from bay, kikuyu invasion", avgLastFrost:"never", avgFirstFrost:"never" },
  { zip:"30401", city:"Savannah",       state:"GA", zone:"8b", grassType:"Bermudagrass / St. Augustine / Centipedegrass", soilType:"Sandy coastal", challenges:"Coastal humidity, chinch bugs, gray leaf spot, armyworms, military base traffic compaction in some areas", avgLastFrost:"Feb 18", avgFirstFrost:"Dec 5" },
  { zip:"35801", city:"Huntsville",     state:"AL", zone:"7a", grassType:"Bermudagrass / Tall Fescue (NASA research area, tech corridor)", soilType:"Clay loam (Tennessee Valley)", challenges:"Transition zone, Bermuda vs. Fescue management, summer heat, dollar spot, armyworm pressure", avgLastFrost:"Mar 25", avgFirstFrost:"Nov 9" },
  { zip:"27701", city:"Durham",         state:"NC", zone:"7b", grassType:"Tall Fescue / Bermudagrass (Research Triangle)", soilType:"Piedmont red clay", challenges:"Research Triangle urban growth, red clay compaction from construction, brown patch, crabgrass, Bermuda invasion", avgLastFrost:"Apr 1", avgFirstFrost:"Oct 31" },
  { zip:"37401", city:"Chattanooga",    state:"TN", zone:"7a", grassType:"Tall Fescue / Bermudagrass", soilType:"Tennessee River valley clay", challenges:"Valley humidity, brown patch in summer, crabgrass, flooding near river, Bermuda vs. Fescue transition", avgLastFrost:"Apr 3", avgFirstFrost:"Oct 29" },
  { zip:"42101", city:"Bowling Green",  state:"KY", zone:"6b", grassType:"Tall Fescue / Kentucky Bluegrass", soilType:"Limestone-derived clay loam", challenges:"Karst terrain, sinkholes possible, limestone alkalinity, summer brown patch, crabgrass", avgLastFrost:"Apr 9", avgFirstFrost:"Oct 25" },
  { zip:"71101", city:"Shreveport",     state:"LA", zone:"8a", grassType:"Bermudagrass / Centipedegrass / St. Augustine", soilType:"Red clay (North Louisiana)", challenges:"Red clay, mole crickets, armyworms, extreme summer heat and humidity, drought in late summer", avgLastFrost:"Feb 28", avgFirstFrost:"Nov 20" },
  { zip:"44301", city:"Akron",          state:"OH", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay over shale", challenges:"Summit County elevation keeps it cooler than Cleveland, heavy clay, lake-effect influence, tire-industry heritage left some soil issues", avgLastFrost:"May 2", avgFirstFrost:"Oct 15" },
  { zip:"46601", city:"South Bend",     state:"IN", zone:"5b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam", challenges:"Lake Michigan lake-effect snow, clay soils, snow mold, short season, high crabgrass pressure in summer", avgLastFrost:"Apr 29", avgFirstFrost:"Oct 18" },
  { zip:"61101", city:"Rockford",       state:"IL", zone:"5a", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Clay loam (glacial till)", challenges:"Cold northern Illinois winters, heavy clay, snow mold, crabgrass from late May, Rock River flooding in low areas", avgLastFrost:"May 2", avgFirstFrost:"Oct 5" },
  { zip:"49401", city:"Grand Haven",    state:"MI", zone:"6b", grassType:"Fine Fescue / Kentucky Bluegrass", soilType:"Sandy lake-effect soils", challenges:"Lake Michigan proximity creates high humidity, sandy dune soils, dollar spot, salt spray on shoreline properties", avgLastFrost:"Apr 22", avgFirstFrost:"Oct 28" },
  { zip:"48104", city:"Ann Arbor",      state:"MI", zone:"6b", grassType:"Kentucky Bluegrass / Fine Fescue", soilType:"Loam to clay loam", challenges:"University city with heavy traffic compaction, mature tree canopy creates deep shade, mole activity, dog damage", avgLastFrost:"Apr 26", avgFirstFrost:"Oct 22" },
  { zip:"48601", city:"Saginaw",        state:"MI", zone:"6a", grassType:"Kentucky Bluegrass / Perennial Ryegrass", soilType:"Silt loam", challenges:"Compacted urban soils, flooding risk, heavy crabgrass pressure, Saginaw Bay proximity moderates winters slightly", avgLastFrost:"May 5", avgFirstFrost:"Oct 10" },
];

// Build a ZIP-indexed map for O(1) lookup
export function buildZipMap() {
  const map = {};
  for (const city of US_CITIES) {
    map[city.zip] = city;
  }
  return map;
}
