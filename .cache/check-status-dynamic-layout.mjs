import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__dynamicMatch=value.match;return qaFrame.call(this,value);};'});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__dynamicMatch?.phase==='playing',{},{timeout:60000});
 await page.evaluate(()=>{const m=window.__dynamicMatch;m.step=()=>{};m.hero('blue').flow=100;document.querySelector('.operation-guide').open=false;});
 const gap=()=>page.evaluate(()=>document.querySelector('.player-hud').getBoundingClientRect().top-document.querySelector('.hero-statuses').getBoundingClientRect().bottom);
 for(const width of [1440,900,650,390]){
  await page.setViewportSize({width,height:900});
  await page.evaluate(()=>{const h=window.__dynamicMatch.hero('blue');h.skillPoints=1;h.skillRanks={q:0,w:0,e:0,r:0};});
  await page.waitForFunction(()=>!document.querySelector('#upgrade-q').hidden);
  const raised=await gap();assert(raised>=26&&raised<=36,`raised ${width}: ${raised}`);
  await page.screenshot({path:`.cache/status-dynamic-${width}-points.png`});
  assert.equal(await page.evaluate(()=>window.__dynamicMatch.upgradeSkill('blue','q')),true);
  await page.waitForFunction(()=>document.querySelector('#champion-skill-points').hidden);
  const lowered=await gap();assert(lowered>=0&&lowered<=12,`lowered ${width}: ${lowered}`);
  assert(Math.abs(raised-lowered-26)<1);
  await page.screenshot({path:`.cache/status-dynamic-${width}-spent.png`});
  await page.locator('[data-status-id="flow-ready"]').hover();await page.locator('.status-tooltip').waitFor({state:'visible'});
  await page.evaluate(()=>window.__dynamicMatch.hero('blue').skillPoints=1);
  await page.waitForFunction(()=>!document.querySelector('#upgrade-w').hidden);
  assert(Math.abs(await gap()-raised)<1);
  const overlap=await page.evaluate(()=>{
   const r=document.querySelector('.hero-statuses').getBoundingClientRect();
   return [...document.querySelectorAll('.skill-upgrade:not([hidden]),.champion-skill-points:not([hidden]),.equipment-hud')].some(n=>{const b=n.getBoundingClientRect();return r.left<b.right&&r.right>b.left&&r.top<b.bottom&&r.bottom>b.top;});
  });assert.equal(overlap,false);
  await page.mouse.move(width-10,300);
 }
 assert.deepEqual(errors,[]);console.log('PASS: real skill spending lowers the status row; new points raise it again; 26px adaptation at 1440/900/650/390px, no overlap or browser errors');
}finally{await browser.close();}
