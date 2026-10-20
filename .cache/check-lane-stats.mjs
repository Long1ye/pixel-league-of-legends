import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});page.setDefaultTimeout(45000);
const errors=[];page.on('pageerror',e=>{errors.push(e.stack);console.log(e.stack);});
page.on('framenavigated',frame=>{if(frame===page.mainFrame())console.log('Navigated',frame.url());});
await page.route(/\/src\/game\/Match(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();
 await route.fulfill({response,body:(await response.text())+'\nconst qaStep=Match.prototype.step;Match.prototype.step=function(dt){window.__laneMatch=this;return qaStep.call(this,dt);};'});
});
try{
 for(const [name,route] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
  await page.locator('.start-play').waitFor();await page.waitForLoadState('networkidle');await page.locator('.start-play').click();
  await page.waitForFunction(()=>window.__laneMatch?.phase==='playing');
  const initial=await page.evaluate(()=>{
   const m=window.__laneMatch;m.options.ai=false;m.options.waves=false;
   for(const e of m.entities)if(e.kind==='melee'||e.kind==='ranged')e.hp=0;
   for(const team of ['blue','red'])m.hero(team).hp=m.hero(team).maxHp=10000;
   const t=m.tower('blue'),v=m.spawnMinion('red','melee',{x:t.x+45,y:t.y});
   v.speed=0;v.damage=0;window.__qaMinion=v;
   return {tower:t.maxHp,armor:t.armor,damage:t.damage,range:t.range,minion:v.hp,plates:t.towerHasPlates,broken:t.towerPlates};
  });
  assert.equal(initial.plates,false);assert.equal(initial.broken,undefined);assert.equal(initial.tower,9000);assert.equal(initial.armor,60);assert.equal(initial.damage,182);assert.equal(initial.minion,465);
  console.log('Prepared',name,initial);
  const plateCheck=await page.evaluate(()=>{const m=window.__laneMatch,t=m.tower('red');t.hp=t.maxHp*.2;m.damage(m.hero('blue'),t,1);return {plates:t.towerHasPlates,broken:t.towerPlates,buffs:t.towerBulwarks,armor:t.armor};});
  assert.equal(plateCheck.plates,false);assert.equal(plateCheck.broken,undefined);assert.deepEqual(plateCheck.buffs,[]);assert.equal(plateCheck.armor,60);
  await page.waitForFunction(()=>window.__qaMinion?.hp<465);
  assert.equal(await page.evaluate(()=>window.__qaMinion.hp),255.75);
  await page.waitForFunction(()=>window.__qaMinion.hp<255.75);
  assert.equal(await page.evaluate(()=>window.__qaMinion.hp),46.5);
  await page.waitForFunction(()=>window.__qaMinion.hp===0);
  await page.screenshot({path:`.cache/lane-stats/${name}-outer-turret.png`});
  console.log('PASS',name,'9000 HP / 60 resists / 182 AD, live tower projectiles deal 45% per shot, melee dies on shot 3');
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors');
}catch(error){console.log('URL',page.url(),'errors',errors);await page.screenshot({path:'.cache/lane-stats/failure.png'});throw error;}
finally{await browser.close();}

