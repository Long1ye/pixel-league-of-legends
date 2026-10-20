import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__sanctuaryView=this;window.__sanctuaryFrame=value;return qaFrame.call(this,value);};'});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__sanctuaryFrame?.match.phase==='playing',{},{timeout:60000});
 await page.evaluate(async()=>{
  const {bridgePoint}=await import('/src/game/Bridge.ts');const v=window.__sanctuaryView,m=window.__sanctuaryFrame.match;
  m.options.ai=false;m.options.waves=false;v.following=false;v.recenterHeld=false;
  v.cameraRig.setMapBounds(false);v.cameraRig.setZoom(.46);v.cameraRig.lookAt(bridgePoint(-656,-20));
 });
 await page.waitForTimeout(300);await page.screenshot({path:'.cache/sanctuary-after-blue.png'});
 await page.evaluate(async()=>{
  const {bridgePoint}=await import('/src/game/Bridge.ts'),v=window.__sanctuaryView;
  v.cameraRig.lookAt(bridgePoint(656,20));
 });
 await page.waitForTimeout(300);await page.screenshot({path:'.cache/sanctuary-after-red.png'});
 console.log(await page.evaluate(()=>window.__sanctuaryView.sanctuaryShop.targets.map(mesh=>({name:mesh.name,position:mesh.position.toArray()}))));
 const purchases=await page.evaluate(async()=>{
  const {sanctuaryShopPoint}=await import('/src/game/SanctuaryLayout.ts'),m=window.__sanctuaryFrame.match;
  return ['blue','red'].map(team=>{const h=m.hero(team);Object.assign(h,sanctuaryShopPoint(team));h.gold=500;
   const bought=m.buyItem(team,1055),sold=m.sellItem(team,0);return {team,bought,sold};});
 });
 assert(purchases.every(result=>result.bought&&result.sold));assert.deepEqual(errors,[]);console.log('PASS',purchases);
}finally{await browser.close();}
