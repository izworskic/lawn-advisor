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
  const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[{...city,name:city.city,zip:'48706'}],US_CITIES:[],buildZipMap:()=>({}),ToolState:class{async get(){throw Error('offline')}async set(){throw Error('offline')}},fallbackPlan,validPlan,evidenceNotice,createHash:require('node:crypto').createHash,Date,AbortSignal,console:{warn(){}},process:{env:mode==='missing-key'?{}:{ANTHROPIC_API_KEY:'fixture'}},fetch:async()=>{if(mode==='network-error')throw Error('offline');return {ok:mode==='malformed',json:async()=>mode==='malformed'?{content:[{type:'text',text:'{"tasks":"bad"}'}]}:{error:{message:'private provider error'}}}}});
  const run=async(address)=>{const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address}},res);return res};
  const known=await run('1 Test Street, Bay City, MI 48706');assert.equal(known.code,200);assert.equal(known.body.degraded,true);assert.equal(known.body.plan.location,'Bay City, MI');assert.equal(known.body.plan.shareSlug,undefined);
  for(const suffix of [', USA',' United States','-1234, U.S.A.','-1234 United States of America',' US']){
   const result=await run('1 Test Street, Bay City, MI 48706'+suffix);assert.equal(result.code,200,suffix);assert.equal(result.body.plan.location,'Bay City, MI');
  }
  assert.equal((await run('48706 Test Street, Bay City, MI')).code,400);
  const unknown=await run('1 Test Street, Unknown, MI 99999');assert.equal(unknown.code,503);assert.doesNotMatch(unknown.body.error,/private provider error/);
  assert.equal((await run('short')).code,400);
 }
});

test('active Sonnet migration retains bounded search and records only sanitized failure categories',async()=>{
 const source=fs.readFileSync(require.resolve('../pages/api/lawn-plan.js'),'utf8').replace(/^import .*;$/gm,'').replace('export default async function handler','async function handler')+'\nhandler';
 for(const [status,expected] of [[401,'authentication'],[402,'billing'],[403,'permission'],[404,'model-or-endpoint-unavailable'],[429,'rate-or-spend-limit'],[529,'provider-server-error']]){
  let sent,logs=[];
  const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[{...city,name:city.city,zip:'48706'}],US_CITIES:[],buildZipMap:()=>({}),ToolState:class{async get(){return null}},fallbackPlan,validPlan,evidenceNotice,createHash:require('node:crypto').createHash,Date,AbortSignal,process:{env:{ANTHROPIC_API_KEY:'fixture-key'}},console:{warn:x=>logs.push(JSON.parse(x))},fetch:async(url,options)=>{sent=JSON.parse(options.body);return {ok:false,status,json:async()=>({error:{message:'sensitive provider text'}})}}});
  const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address:'1 Test Street, Bay City, MI 48706'}},res);
  assert.equal(res.code,200);assert.equal(res.body.degraded,true);assert.equal(sent.model,'claude-sonnet-5-5');assert.equal(sent.output_config.effort,'low');assert.equal(sent.max_tokens,3000);assert.equal(sent.tools[0].max_uses,3);assert.deepEqual(logs,[{event:'lawn-plan-provider-fallback',reason:expected,status}]);
 }
});
