'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {fallbackPlan,validPlan,evidenceNotice}=require('../lib/lawn-plan-evidence.cjs');
const {lookupPostal,hasStateConflict,resolveReference}=require('../lib/postal-geography.cjs');
const city={city:'Bay City',state:'MI',zone:'6a',grassType:'Fine Fescue',soilType:'Clay loam',challenges:'Drainage',avgLastFrost:'May 3',avgFirstFrost:'Oct 12'};
test('provider fallback is explicitly regional, no live claim, grade, share or invented schedule',()=>{
 const p=fallbackPlan(city,new Date(2026,10,27));
 assert.equal(p.location,'Bay City, MI');assert.equal(p.season,'fall');assert.ok(validPlan(p));assert.match(p.evidenceNotice,/Live advice unavailable/);assert.equal(p.soilTemp,'Not measured at this property');assert.equal(p.grade,null);assert.equal(p.shareUrl,undefined);assert.deepEqual(p.calendar,[]);assert.match(p.tasks[1].detail,/frozen or saturated/);assert.equal(fallbackPlan(null),null);
});
test('malformed generated data cannot reach the UI',()=>{assert.equal(validPlan(null),false);assert.equal(validPlan({tasks:'wrong'}),false);const p=fallbackPlan(city);assert.equal(validPlan({...p,tasks:[{category:'wrong'}]}),false);assert.equal(validPlan({...p,calendar:[{month:12,task:'mow'}]}),false)});
test('actual API handler returns a known ZIP fallback on provider errors and refuses unknown ZIP',async()=>{
 const source=fs.readFileSync(require.resolve('../pages/api/lawn-plan.js'),'utf8').replace(/^import .*;$/gm,'').replace('export default async function handler','async function handler')+'\nhandler';
 for(const mode of ['missing-key','http-error','malformed','network-error']){
  const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[{...city,name:city.city,zip:'48706'}],US_CITIES:[],buildZipMap:()=>({}),ToolState:class{async get(){throw Error('offline')}async set(){throw Error('offline')}},fallbackPlan,validPlan,evidenceNotice,lookupPostal,hasStateConflict,resolveReference,Date,AbortSignal,console:{warn(){}},process:{env:mode==='missing-key'?{}:{ANTHROPIC_API_KEY:'fixture'}},fetch:async()=>{if(mode==='network-error')throw Error('offline');return {ok:mode==='malformed',json:async()=>mode==='malformed'?{content:[{type:'text',text:'{"tasks":"bad"}'}]}:{error:{message:'private provider error'}}}}});
  const run=async(address)=>{const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address}},res);return res};
  const known=await run('1 Test Street, Bay City, MI 48706');assert.equal(known.code,200);assert.equal(known.body.degraded,true);assert.equal(known.body.plan.location,'Bay City, MI 48706');assert.equal(known.body.plan.shareSlug,undefined);
  for(const suffix of [', USA',' United States','-1234, U.S.A.','-1234 United States of America',' US']){
   const result=await run('1 Test Street, Bay City, MI 48706'+suffix);assert.equal(result.code,200,suffix);assert.equal(result.body.plan.location,'Bay City, MI 48706');
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
  const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[{...city,name:city.city,zip:'48706'}],US_CITIES:[],buildZipMap:()=>({}),ToolState:class{async get(){return null}},fallbackPlan,validPlan,evidenceNotice,lookupPostal,hasStateConflict,resolveReference,Date,AbortSignal,process:{env:{ANTHROPIC_API_KEY:'fixture-key'}},console:{warn:x=>logs.push(JSON.parse(x))},fetch:async(url,options)=>{sent=JSON.parse(options.body);return {ok:false,status,json:async()=>({error:{message:'sensitive provider text'}})}}});
  const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address:'1 Test Street, Bay City, MI 48706'}},res);
  assert.equal(res.code,200);assert.equal(res.body.degraded,true);assert.equal(sent.model,'claude-sonnet-5-5');assert.equal(sent.output_config.effort,'low');assert.equal(sent.max_tokens,3000);assert.equal(sent.tools[0].max_uses,3);assert.deepEqual(logs,[{event:'lawn-plan-provider-fallback',reason:expected,status}]);
 }
});

test('national postal snapshot, leading zeros, neighboring ZIP and conservative resolution',()=>{
 assert.equal(Array.from({length:10},(_,i)=>Object.keys(require('../data/postal-us/'+i+'.json')).length).reduce((a,b)=>a+b,0),42049);
 assert.deepEqual(lookupPostal('02108'),{zip:'02108',city:'Boston',state:'MA'});
 assert.deepEqual(lookupPostal('33602'),{zip:'33602',city:'Tampa',state:'FL'});
 assert.equal(lookupPostal('99999'),null);
 const tampa={city:'Tampa',state:'FL',zone:'9b'};
 assert.deepEqual(resolveReference(lookupPostal('33602'),{'33601':tampa}),{reference:tampa,scope:'city-reference'});
 assert.equal(resolveReference(lookupPostal('33602'),{'33602':{city:'Miami',state:'FL'}}).scope,'postal-only');
 assert.equal(resolveReference(lookupPostal('33602'),{'33601':tampa,'33603':{...tampa,zone:'10a'}}).scope,'postal-only');
 assert.equal(hasStateConflict('1 Test Street, Tampa, MI 33602',lookupPostal('33602')),true);
 assert.equal(hasStateConflict('33602',lookupPostal('33602')),false);
 const general=fallbackPlan(lookupPostal('02108'));
 assert.ok(validPlan(general));assert.match(general.zone,/not established/);assert.match(general.grassType,/not established/);assert.deepEqual(general.calendar,[]);
 assert.doesNotMatch(JSON.stringify(general),/undefined/);
});
test('actual handler resolves neighboring ZIP, refuses state conflict and avoids sending street address',async()=>{
 const source=fs.readFileSync(require.resolve('../pages/api/lawn-plan.js'),'utf8').replace(/^import .*;$/gm,'').replace('export default async function handler','async function handler')+'\nhandler';
 const tampa={...city,city:'Tampa',state:'FL',zone:'9b',grassType:'St. Augustine'};
 let calls=0,request;
 const handler=vm.runInNewContext(source,{MICHIGAN_CITIES:[],US_CITIES:[],buildZipMap:()=>({'33601':tampa}),ToolState:class{async get(){return null}async set(){}},fallbackPlan,validPlan,evidenceNotice,lookupPostal,hasStateConflict,resolveReference,Date,AbortSignal,console:{warn(){}},process:{env:{ANTHROPIC_API_KEY:'fixture'}},fetch:async(url,opts)=>{calls++;request=JSON.parse(opts.body);return {ok:true,json:async()=>({stop_reason:'end_turn',content:[{type:'text',text:JSON.stringify({...fallbackPlan(tampa),address:'invented address',location:'wrong',currentCondition:'invented',propertyNotes:'invented'})}]})}}});
 const run=async(address)=>{const res={status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',body:{address}},res);return res};
 const good=await run('1 Private Test Street, Tampa, FL 33602');assert.equal(good.code,200);assert.equal(good.body.geography,'city-reference');assert.equal(good.body.plan.location,'Tampa, FL 33602');assert.equal(good.body.plan.address,undefined);assert.match(good.body.plan.currentCondition,/not measured/);assert.doesNotMatch(JSON.stringify(request),/Private Test Street/);
 assert.equal((await run('1 Test Street, Tampa, MI 33602')).code,400);
 const broad=await run('02108');assert.equal(broad.code,200);assert.equal(broad.body.geography,'postal-only');assert.equal(broad.body.degraded,true);assert.equal(broad.body.plan.calendar.length,0);assert.equal(calls,1);
 assert.equal((await run('99999')).code,503);
});
