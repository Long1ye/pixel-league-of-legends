import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/main-three(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('hud.update(match, selected, localTeam());','hud.update(match, window.__cleanupView?.selectedId ?? selected, localTeam());')});
});
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__cleanupView=this;window.__cleanupFrame=value;return qaFrame.call(this,value);};'});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__cleanupFrame?.match.phase==='playing',{},{timeout:60000});
 await page.evaluate(()=>{const m=window.__cleanupFrame.match;m.options.ai=false;m.options.waves=false;window.__cleanupView.selectedId=m.tower('blue').id;});
 await page.locator('#target-readout').waitFor({state:'visible'});
 assert.equal(await page.locator('.brush-concealment-status,.sanctuary-shop-marker').count(),0);
 assert((await page.locator('.world-health-bar[data-kind="hero"]').count())>=1);
 for(const width of [1440,900,650,390]){
  await page.setViewportSize({width,height:900});
  for(const open of [true,false]){
   await page.evaluate(open=>document.querySelector('.operation-guide').open=open,open);
   const rects=await page.evaluate(()=>{
    const guide=document.querySelector('.operation-guide').getBoundingClientRect(),target=document.querySelector('#target-readout').getBoundingClientRect();
    return {guide:guide.toJSON(),target:target.toJSON()};
   });
   assert(rects.target.bottom+4<=rects.guide.top,JSON.stringify({width,open,...rects}));
   await page.screenshot({path:`.cache/ui-cleanup-${width}-${open?'open':'closed'}.png`});
  }
 }
 await page.keyboard.press('p');await page.locator('#equipment-shop').waitFor({state:'visible'});
 await page.keyboard.press('Escape');await page.locator('#equipment-shop').waitFor({state:'hidden'});
 assert.deepEqual(errors,[]);console.log('PASS: removed overlays, hero bars retained, target and guide separated at 1440/900/650/390px open and closed; P/Esc shop works; no page errors');
}finally{await browser.close();}
