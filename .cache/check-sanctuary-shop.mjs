import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(60000);
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await mkdir('docs/visual-validation/2026-10-20/sanctuary-shop',{recursive:true});
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__shopView=this;window.__shopMatch=value.match;return qaFrame.call(this,value);};'});});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match',{waitUntil:'domcontentloaded'});
 await page.locator('.start-play').click();await page.waitForFunction(()=>window.__shopMatch?.phase==='playing');
 await page.locator('.sanctuary-shop-marker').waitFor({state:'visible'});
 await page.screenshot({path:'docs/visual-validation/2026-10-20/sanctuary-shop/sanctuary.png'});
 console.log('marker',await page.locator('.sanctuary-shop-marker').boundingBox());
 await page.locator('.sanctuary-shop-marker').click();await page.locator('#equipment-shop').waitFor({state:'visible'});
 await page.locator('#shop-buy').click();await page.waitForFunction(()=>window.__shopMatch.hero('blue').inventory.includes(1055));await page.keyboard.press('Escape');
 const building=await page.evaluate(async()=>{
  const {bridgePoint}=await import('/src/game/Bridge.ts');const view=window.__shopView;
  const p=view.cameraRig.project(bridgePoint(-636),130);
  const rect=view.renderer.domElement.getBoundingClientRect();
  for(let y=-50;y<=80;y+=5)for(let x=-40;x<=40;x+=5){const client={x:p.x+x+rect.left,y:p.y+y+rect.top};if(view.pickShop(client)&&view.pickActor(client)===null&&document.elementFromPoint(client.x,client.y)?.tagName==='CANVAS')return client;}
  return null;
 });assert(building,'visible sanctuary building has clickable opaque pixels');console.log('building',building);
 await page.mouse.click(building.x,building.y);await page.locator('#equipment-shop').waitFor({state:'visible'});await page.keyboard.press('Escape');
 await page.mouse.move(building.x,building.y);await page.mouse.down();await page.mouse.move(building.x+45,building.y+10,{steps:10});await page.mouse.up();assert.equal(await page.locator('#equipment-shop').isVisible(),false);
 await page.screenshot({path:'docs/visual-validation/2026-10-20/sanctuary-shop/after-drag.png'});
 // Red players must get their own sanctuary marker rather than the blue entrance.
 await page.evaluate(async()=>{const {SANCTUARY_SHOPS}=await import('/src/render-three/SanctuaryShop.ts');const {bridgePoint}=await import('/src/game/Bridge.ts');const view=window.__shopView;view.cameraRig.setMapBounds(false);view.following=false;view.cameraRig.lookAt(bridgePoint(674));view.onFrame=undefined;const original=view.frame.bind(view);view.frame=value=>original({...value,localTeam:'red'});});
 await page.waitForTimeout(400);await page.locator('.sanctuary-shop-marker').waitFor({state:'visible'});await page.screenshot({path:'docs/visual-validation/2026-10-20/sanctuary-shop/red-sanctuary.png'});
 assert.deepEqual(errors,[]);console.log('PASS marker, building click, purchase, drag without opening, red team entrance; no runtime errors');
}catch(error){console.log(errors);await page.screenshot({path:'.cache/sanctuary-shop-failure.png'});throw error;}
finally{await browser.close();}
