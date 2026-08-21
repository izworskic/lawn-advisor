import { readFile } from 'node:fs/promises';

const app=await readFile(new URL('../pages/_app.js',import.meta.url),'utf8');
const layout=await readFile(new URL('../components/Layout.js',import.meta.url),'utf8');
const component=await readFile(new URL('../components/ToolNetworkLinks.js',import.meta.url),'utf8');

const checks=[
  ['native Vercel Analytics is enabled',/@vercel\/analytics\/react/.test(app)&&/<Analytics\s*\/>/.test(app),15],
  ['shared layout renders the network strip',/ToolNetworkLinks/.test(layout)&&/<ToolNetworkLinks\s*\/>/.test(layout),15],
  ['planting calendar handoff',/planting-calendar/.test(component)&&/zone-6a-planting-calendar/.test(component),15],
  ['frost dates handoff',/frost-dates/.test(component)&&/michigan-frost-dates/.test(component),15],
  ['phenology handoff',/phenology/.test(component)&&/phenology\.chrisizworski\.com/.test(component),10],
  ['symbolic exposure measurement',/Network Amplification Exposure/.test(component)&&/source:\s*"perfect-lawn"/.test(component),10],
  ['symbolic handoff measurement',/Contextual Tool Handoff/.test(component)&&/destination:\s*link\.id/.test(component),10],
  ['analytics payload excludes precise lawn inputs',!/address:\s|zipcode:\s|zip:\s|latitude:\s|longitude:\s|coordinates:\s/.test(component),10],
];
let score=0;
for(const [name,pass,points] of checks){
  if(pass)score+=points;
  console.log(`${pass?'PASS':'FAIL'} ${String(pass?points:0).padStart(2)}/${points} ${name}`);
}
console.log(`Perfect Lawn tool-network benchmark: ${score}/100`);
if(score<95)process.exit(1);
