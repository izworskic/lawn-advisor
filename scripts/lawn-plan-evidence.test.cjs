'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {fallbackPlan,validPlan,evidenceNotice}=require('../lib/lawn-plan-evidence.cjs');
const city={city:'Bay City',state:'MI',zone:'6a',grassType:'Fine Fescue',soilType:'Clay loam',challenges:'Drainage',avgLastFrost:'May 3',avgFirstFrost:'Oct 12'};
test('provider fallback is explicitly regional, no live claim, grade, share or invented schedule',()=>{
 const p=fallbackPlan(city,new Date(2026,10,27));
 assert.equal(p.location,'Bay City, MI');assert.equal(p.season,'fall');assert.ok(validPlan(p));assert.match(p.evidenceNotice,/Live advice unavailable/);assert.equal(p.soilTemp,'Not measured at this property');assert.equal(p.grade,null);assert.equal(p.shareUrl,undefined);assert.deepEqual(p.calendar,[]);assert.match(p.tasks[1].detail,/frozen or saturated/);assert.equal(fallbackPlan(null),null);
});
test('malformed generated data cannot reach the UI',()=>{assert.equal(validPlan(null),false);assert.equal(validPlan({tasks:'wrong'}),false);const p=fallbackPlan(city);assert.equal(validPlan({...p,tasks:[{category:'wrong'}]}),false);assert.equal(validPlan({...p,calendar:[{month:12,task:'mow'}]}),false)});
test('actual API handler returns a known ZIP fallback on provider errors and refuses unknown ZIP',async()=>{
 const source=fs.readFileSync(require.resolve('../pages/api/lawn-plan.js'),'utf8').replace(/^import .*;$/gm,'').replace('export default async function handler','async function handler')+'\nhandler';
 for(const mode of ['missing-key','http-error','malformed','network-error']){
  const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[{...city,name:city.city,zip:'48706'}],US_CITIES:[],buildZipMap:()=>({}),ToolState:class{async get(){throw Error('offline')}async set(){throw Error('offline')}},fallbackPlan,validPlan,evidenceNotice,createHash:require('node:crypto').createHash,Date,AbortSignal,process:{env:mode==='missing-key'?{}:{ANTHROPIC_API_KEY:'fixture'}},fetch:async()=>{if(mode==='network-error')throw Error('offline');return {ok:mode==='malformed',json:async()=>mode==='malformed'?{content:[{type:'text',text:'{"tasks":"bad"}'}]}:{error:{message:'private provider error'}}}}});
  const run=async(address)=>{const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address}},res);return res};
  const known=await run('1 Test Street, Bay City, MI 48706');assert.equal(known.code,200);assert.equal(known.body.degraded,true);assert.equal(known.body.plan.location,'Bay City, MI');assert.equal(known.body.plan.shareSlug,undefined);
  const unknown=await run('1 Test Street, Unknown, MI 99999');assert.equal(unknown.code,503);assert.doesNotMatch(unknown.body.error,/private provider error/);
  assert.equal((await run('short')).code,400);
 }
});
