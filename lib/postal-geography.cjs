'use strict';
// GeoNames-derived postal locality, not USPS deliverability or parcel geocoding.
const bins=[require('../data/postal-us/0.json'),require('../data/postal-us/1.json'),require('../data/postal-us/2.json'),require('../data/postal-us/3.json'),require('../data/postal-us/4.json'),require('../data/postal-us/5.json'),require('../data/postal-us/6.json'),require('../data/postal-us/7.json'),require('../data/postal-us/8.json'),require('../data/postal-us/9.json')];
const norm=s=>String(s??'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function lookupPostal(zip){
 if(typeof zip!=='string'||!/^\d{5}$/.test(zip))return null;
 const bin=bins[Number(zip[0])];
 if(!Object.hasOwn(bin,zip))return null;
 const [city,state]=bin[zip];return {zip,city,state};
}
function hasStateConflict(input,postal){
 const m=String(input).match(/,\s*([A-Za-z]{2})\s+\d{5}(?:-\d{4})?(?:\s*,?\s+(?:USA|US|U\.S\.A\.?|U\.S\.?|United States(?: of America)?))?\s*$/i);
 return Boolean(m&&m[1].toUpperCase()!==postal.state);
}
function resolveReference(postal,refs){
 const same=c=>c&&norm(c.city)===norm(postal.city)&&c.state===postal.state;
 const exact=Object.hasOwn(refs,postal.zip)?refs[postal.zip]:null;
 if(same(exact))return {reference:exact,scope:'zip-reference'};
 const matches=Object.values(refs).filter(same);
 if(matches.length===1)return {reference:matches[0],scope:'city-reference'};
 return {reference:null,scope:'postal-only'};
}
module.exports={lookupPostal,hasStateConflict,resolveReference};
