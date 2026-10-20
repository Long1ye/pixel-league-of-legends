import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();
 await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__towerView=this;window.__towerFrame=value;return qaFrame.call(this,value);};'});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__towerFrame?.match.phase==='playing',{},{timeout:60000});
 async function place(offset){return page.evaluate(offset=>{
  const view=window.__towerView,frame=window.__towerFrame,m=frame.match;
  m.options.ai=false;m.options.waves=false;const h=m.hero('blue'),t=m.tower('red');
  h.hp=h.maxHp=100000;t.damage=0;h.destination=null;h.targetId=null;
  const dx=m.tower('blue').x-t.x,dy=m.tower('blue').y-t.y,length=Math.hypot(dx,dy),r=t.range+h.radius+offset;
  h.x=t.x+dx/length*r;h.y=t.y+dy/length*r;frame.positions.reset();
  view.following=false;view.recenterHeld=false;view.cameraRig.lookAt({x:(h.x+t.x)/2,y:(h.y+t.y)/2});
  view.towerRangeIndicator.update(frame,view.cameraRig);const line=view.towerRangeIndicator.group.children[0];
  return {visible:view.towerRangeIndicator.group.visible,color:line.material.color.getHex()};
 },offset);}
 const near=await place(50);assert.equal(near.visible,true);assert.equal(near.color,0xf3ad70);
 await page.screenshot({path:'.cache/tower-range-near.png'});
 const inside=await place(-10);assert.equal(inside.visible,true);assert.equal(inside.color,0xff655f);
 await page.screenshot({path:'.cache/tower-range-inside.png'});
 assert.equal((await place(100)).visible,false);assert.deepEqual(errors,[]);
 console.log('PASS live Three.js: orange approach, red inside, hidden after retreat; no page errors');
}finally{await browser.close();}
