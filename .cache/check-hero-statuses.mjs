import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__statusFrame=value;return qaFrame.call(this,value);};'});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__statusFrame?.match.phase==='playing',{},{timeout:60000});
 await page.evaluate(async()=>{
  const m=window.__statusFrame.match,h=m.hero('blue');m.options.ai=false;m.options.waves=false;m.step=()=>{};
  h.gold=10000;if(!m.buyItem('blue',2003)||!m.buyItem('blue',3142))throw new Error('buy failed');
  for(const id of [2003,3142])if(!m.useItem('blue',h.inventory.indexOf(id),h))throw new Error('active failed');
  const {grantStorm}=await import('/src/game/YasuoStorm.ts');grantStorm(h,m.time);grantStorm(h,m.time);
  h.flow=100;h.eDamageStacks=3;h.eDamageStacksUntil=m.time+5;h.slowUntil=m.time+1.5;h.grievousUntil=m.time+3;
  const enemy=m.hero('red');Object.assign(enemy,{x:h.x+80,y:h.y});if(!m.castSummoner('red','f',h,h.id))throw new Error('ignite failed');
 });
 await page.locator('[data-status-id="q-stacks"]').waitFor({state:'visible'});
 assert.equal(await page.locator('[data-status-id="q-stacks"] .status-stacks').textContent(),'2');
 assert.equal(await page.locator('[data-status-id="e-stacks"] .status-stacks').textContent(),'3');
 assert.equal(await page.locator('.status-debuffs .hero-status').count(),3);
 for(const width of [1440,900,650,390]){
  await page.setViewportSize({width,height:900});
  await page.waitForTimeout(250);
  const overlaps=await page.evaluate(()=>{
   const rect=n=>n.getBoundingClientRect(),intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
   const obstacles=[...document.querySelectorAll('.skill-upgrade:not([hidden]),.champion-skill-points:not([hidden]),.equipment-hud,.operation-guide')].map(rect);
   return [...document.querySelectorAll('.hero-status')].filter(n=>{const r=rect(n);return r.left<0||r.right>innerWidth||obstacles.some(o=>intersects(r,o));}).map(n=>n.dataset.statusId);
  });assert.deepEqual(overlaps,[],`overlap at ${width}`);
  await page.screenshot({path:`.cache/hero-statuses-${width}.png`});
 }
 await page.locator('[data-status-id="q-stacks"]').hover();await page.locator('.status-tooltip').waitFor({state:'visible'});
 assert.match(await page.locator('.status-tooltip').textContent(),/旋风就绪/);
 await page.screenshot({path:'.cache/hero-statuses-tooltip.png'});
 await page.evaluate(()=>window.__statusFrame.match.time+=2);
 await page.waitForFunction(()=>!document.querySelector('[data-status-id="slow"]'));
 await page.evaluate(()=>window.__statusFrame.match.time+=60);
 await page.waitForFunction(()=>!document.querySelector('[data-status-id="q-stacks"]'));
 await page.locator('.status-tooltip').waitFor({state:'hidden'});
 assert.equal(await page.locator('[data-status-id="flow-ready"]').isVisible(),true);
 await page.evaluate(()=>window.__statusFrame.match.hero('blue').hp=0);
 await page.locator('.hero-statuses').waitFor({state:'hidden'});
 assert.deepEqual(errors,[]);console.log('PASS: real Q/active item/ignite effects, stacks, expiry, tooltip cleanup, death, 1440/900/650/390px without HUD overlap; no page errors');
}finally{await browser.close();}
