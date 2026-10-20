import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').click();
 await page.locator('#upgrade-q').waitFor({state:'visible',timeout:60000});
 await page.locator('#upgrade-q').click();
 for(const width of [1280,590,375]){
  await page.setViewportSize({width,height:800});
  const bounds=await page.evaluate(()=>{
   const health=document.querySelector('#hero-health').getBoundingClientRect();
   return [...document.querySelectorAll('.skill-rank')].map(rank=>({rankBottom:rank.getBoundingClientRect().bottom,healthTop:health.top}));
  });
  for(const value of bounds)assert.ok(value.healthTop-value.rankBottom>=3,JSON.stringify({width,...value}));
  console.log('PASS',width,bounds[0]);
  await page.locator('.player-hud').screenshot({path:`.cache/hud-redesign/health-clearance-${width}.png`});
 }
}finally{await browser.close();}
