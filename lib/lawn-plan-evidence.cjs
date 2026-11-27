'use strict';
const evidenceNotice='Regional planning guidance, not a property inspection. Grass type, soil, soil temperature and current lawn condition are not measured at your address. Confirm local conditions and follow Extension guidance before applying products.';
const categories=new Set(['fertilize','mow','water','overseed','aerate','weed','winterize']);
const seasons=['winter','winter','spring','spring','spring','summer','summer','summer','fall','fall','fall','winter'];
function validPlan(p) {
 return Boolean(p&&typeof p==='object'&&typeof p.location==='string'&&typeof p.zone==='string'&&typeof p.grassType==='string'&&seasons.includes(p.season)&&Array.isArray(p.tasks)&&p.tasks.length>0&&p.tasks.every(t=>t&&categories.has(t.category)&&typeof t.title==='string'&&typeof t.detail==='string'&&typeof t.timing==='string')&&Array.isArray(p.calendar)&&p.calendar.every(t=>t&&Number.isInteger(t.month)&&t.month>=0&&t.month<12&&categories.has(t.task))&&Array.isArray(p.tips)&&p.tips.every(t=>typeof t==='string'));
}
function fallbackPlan(city,now=new Date()){
 if(!city||!city.city||!city.state)return null;
 const month=now.getMonth(),season=seasons[month], location=city.city+', '+city.state;
 const task=(category,title,detail)=>({category,title,detail,timing:'Before acting',product:null,month});
 return {location,zone:'Zone '+city.zone,grassType:city.grassType,soilType:city.soilType,soilTemp:'Not measured at this property',season,
  evidenceNotice:'Live advice unavailable. Showing regional reference guidance only. '+evidenceNotice,
  currentCondition:'Current weather and lawn condition were not verified.',
  propertyNotes:'Regional ZIP reference; actual lawn and soil may differ.',
  insight:'Regional considerations: '+city.challenges+'. Average frost dates are '+city.avgLastFrost+' in spring and '+city.avgFirstFrost+' in fall, not a forecast.',
  urgentTask:'Check actual grass growth and soil condition before doing any treatment.',
  tasks:[task('mow','Check growth and ground condition','Mow only if actively growing and the surface is firm. Follow local grass-specific mowing guidance.'),task('fertilize','Plan a soil test','Do not apply fertilizer to dormant turf, frozen or saturated ground. Use soil-test results and local Extension advice before selecting a rate.'),task('water','Inspect soil moisture','Check actual moisture, drainage and local restrictions before irrigating. No irrigation schedule is inferred.')],
  calendar:[],tips:['Identify the grass actually growing in the lawn.','Use a soil test rather than assuming a regional soil description fits the property.','Consult your local Cooperative Extension office for species-specific seasonal timing.'],grade:null};
}
module.exports={fallbackPlan,validPlan,evidenceNotice};
