import { readFile } from 'node:fs/promises';

const app=await readFile(new URL('../pages/_app.js',import.meta.url),'utf8');
const component=await readFile(new URL('../components/ToolNetworkLinks.js',import.meta.url),'utf8');

const checks=[
  ['app loads network component',/ToolNetworkLinks/.test(app)&&/<ToolNetworkLinks\s*\/>/.test(app),20],
  ['planting calendar handoff',/planting-calendar/.test(component)&&/zone-6a-planting-calendar/.test(component),15],
  ['frost dates handoff',/frost-dates/.test(component)&&/michigan-frost-dates/.test(component),15],
  ['phenology handoff',/phenology/.test(component)&&/phenology\.chrisizworski\.com/.test(component),10],
  ['symbolic exposure measurement',/Network Amplification Exposure/.test(component)&&/source: "perfect-lawn"/.test(component),15],
  ['symbolic handoff measurement',/Contextual Tool Handoff/.test(component)&&/destination: link\.id/.test(component),15],
  ['no address data in analytics payload',!/address:\s|zipcode:\s|zip:\s|latitude:\s|longitude:\s|coordinates:\s/.test(component),10],
];
let score=0;
for(const [name,pass,points] of checks){if(pass)score+=points;console.log(`${pass?'PASS':'FAIL'} ${String(pass?points:0).padStart(2)}/${points} ${name}`)}
console.log(`Perfect Lawn tool-network benchmark: ${score}/100`);
if(score<95)process.exit(1);
