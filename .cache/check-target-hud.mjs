import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route(/\/src\/main-three(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('hud.update(match, selected, localTeam());','hud.update(match, window.__targetView?.selectedId ?? selected, localTeam());')});
});
await page.route(/\/src\/render-three\/ThreeArena(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaFrame=ThreeArena.prototype.frame;ThreeArena.prototype.frame=function(value){window.__targetView=this;window.__targetFrame=value;return qaFrame.call(this,value);};'});
});
await page.route(/\/src\/main\.ts(?:\?|$)/,async route=>{
 const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('updateTargetHud(state, target);','updateTargetHud(state, window.__phaserTarget ?? target);window.__phaserState=state;')});
});
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__targetFrame?.match.phase==='playing',{},{timeout:60000});
 await page.evaluate(()=>{
  const m=window.__targetFrame.match,v=window.__targetView;m.options.ai=false;m.options.waves=false;v.fogEnabled=false;
  const h=m.hero('red');Object.assign(h,{x:m.hero('blue').x+100,y:m.hero('blue').y,damage:60});v.selectedId=h.id;
 });
 await page.locator('#target-readout').waitFor({state:'visible'});
 await page.waitForFunction(()=>document.querySelector('#target-name').textContent==='亚索');
 assert.equal(await page.locator('#target-level').textContent(),'1');
 assert.equal(await page.locator('#target-stat-0').textContent(),'60');
 assert.equal(await page.locator('#target-stat-6').textContent(),'345');
 assert.equal(await page.locator('[data-target-slot]').count(),7);
 const expected=await page.evaluate(async()=>{
  const {BASES}=await import('/src/game/config.ts');
  const {grantExperience,totalXPForLevel}=await import('/src/game/ChampionProgression.ts');
  const m=window.__targetFrame.match,h=m.hero('red');Object.assign(h,BASES.red);h.gold=20000;
  for(const id of [3006,3031,3153])if(!m.buyItem('red',id))throw new Error(`purchase failed ${id}`);
  grantExperience(h,totalXPForLevel(6));h.flow=63;
  h.hp=Math.round(h.maxHp*.65);h.healthRegen=0;m.hero('blue').damage=0;Object.assign(h,{x:m.hero('blue').x+100,y:m.hero('blue').y});
  return {health:`${Math.ceil(h.hp)} / ${Math.ceil(h.maxHp)}`,damage:h.damage.toFixed(0)};
 });
 await page.waitForFunction(()=>document.querySelector('#target-level').textContent==='6');
 assert.equal(await page.locator('#target-health').textContent(),expected.health);
 assert.equal(await page.locator('#target-stat-0').textContent(),expected.damage);
 assert.equal(await page.locator('.target-item img').count(),3);
 assert.match(await page.locator('#target-resource-text').textContent(),/剑意 63/);
 assert.equal(await page.locator('.target-item img').first().getAttribute('alt'),'狂战士胫甲');
 for(const width of [1440,900,650,390]){
  await page.setViewportSize({width,height:900});
  for(const open of [true,false]){
   await page.evaluate(open=>document.querySelector('.operation-guide').open=open,open);
   const rects=await page.evaluate(()=>({target:document.querySelector('#target-readout').getBoundingClientRect().toJSON(),guide:document.querySelector('.operation-guide').getBoundingClientRect().toJSON()}));
   assert(rects.target.bottom+4<=rects.guide.top,JSON.stringify({width,open,...rects}));
   assert(rects.target.right<=width);
  }
  await page.screenshot({path:`.cache/target-hud-${width}.png`});
 }
 await page.setViewportSize({width:1440,height:900});
 for(const kind of ['melee','ranged','tower']){
  await page.evaluate(kind=>{const m=window.__targetFrame.match;window.__targetView.selectedId=(kind==='tower'?m.tower('red'):m.spawnMinion('red',kind,{x:m.hero('blue').x+200,y:m.hero('blue').y})).id;},kind);
  await page.waitForFunction(kind=>document.querySelector('#target-readout').dataset.kind===kind,kind);
  assert.equal(await page.locator('#target-level').isVisible(),false);
  assert.equal(await page.locator('.target-inventory').isVisible(),false);
  await page.screenshot({path:`.cache/target-hud-${kind}.png`});
 }
 await page.evaluate(()=>{const m=window.__targetFrame.match;m.tower('red').hp=0;});
 await page.waitForFunction(()=>document.querySelector('#target-readout').hidden);
 await page.goto('http://127.0.0.1:5173/?map=howling');await page.locator('.start-play').waitFor({timeout:60000});await page.locator('.start-play').click();
 await page.waitForFunction(()=>window.__phaserState?.phase==='playing',{},{timeout:60000});
 await page.evaluate(()=>{window.__phaserTarget=window.__phaserState.hero('red');});
 await page.locator('#target-readout').waitFor({state:'visible'});
 assert.equal(await page.locator('#target-name').textContent(),'亚索');assert.equal(await page.locator('#target-level').textContent(),'1');
 await page.screenshot({path:'.cache/target-hud-phaser.png'});
 assert.deepEqual(errors,[]);console.log('PASS: Three and Phaser enemy inspection; hero level, live HP/Flow/stats, equipment icons, target switches, death hide, four viewport sizes, guide separation; no page errors');
}finally{await browser.close();}
