import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});page.setDefaultTimeout(60000);
const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.stack);});
await page.route(/\/src\/game\/Match(?:\.ts)?(?:\?|$)/,async route=>{
 const response=await route.fetch();
 await route.fulfill({response,body:(await response.text())+'\nconst qaStep=Match.prototype.step;Match.prototype.step=function(dt){window.__testMatch=this;return qaStep.call(this,dt);};'});
});
await mkdir('.cache/hud-redesign',{recursive:true});
try{
 for(const [name,route] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
  await page.locator('.start-play').waitFor();
  await page.waitForLoadState('networkidle');
  const start=page.locator('.start-play');if(await start.count())await start.click();
  await page.locator('#upgrade-q').waitFor({state:'visible'});
  console.log('HUD ready',name);
  await page.waitForFunction(()=>window.__testMatch?.phase==='playing');
  assert.equal(await page.locator('#champion-level').textContent(),'1');
  assert.equal(await page.locator('#upgrade-r').isVisible(),false);
  await page.locator('#upgrade-q').click();
  await page.waitForFunction(()=>window.__testMatch.hero('blue').skillRanks.q===1);
  await page.waitForFunction(()=>!document.querySelector('#ability-q').classList.contains('unlearned'));
  await page.keyboard.press('Control+e');
  assert.equal(await page.evaluate(()=>window.__testMatch.hero('blue').skillRanks.e),0);
  await page.evaluate(async()=>{
   const {grantExperience,totalXPForLevel}=await import('/src/game/ChampionProgression.ts');
   grantExperience(window.__testMatch.hero('blue'),totalXPForLevel(6));
  });
  await page.waitForFunction(()=>document.querySelector('#champion-level').textContent==='6');
  await page.keyboard.press('Control+r');
  await page.waitForFunction(()=>window.__testMatch.hero('blue').skillRanks.r===1);
  assert.equal(await page.evaluate(()=>window.__testMatch.hero('blue').abilities.r),0);
  assert.equal(await page.locator('#champion-stats').isVisible(),true);
  assert.equal(await page.locator('.champion-stat').count(),6);
  console.log('rank DOM',await page.locator('#skill-rank-r').innerHTML());
  await page.waitForFunction(()=>document.querySelectorAll('#skill-rank-r .learned').length===1,null,{timeout:10000});
  await page.screenshot({path:`.cache/hud-redesign/${name}-level6.png`});
  await page.keyboard.press('Escape');
  await page.locator('#player-settings[open]').waitFor();
  const bounds=await page.locator('#player-settings').boundingBox();
  assert.ok(Math.abs(bounds.x+bounds.width/2-640)<2);
  assert.ok(Math.abs(bounds.y+bounds.height/2-400)<2);
  await page.screenshot({path:`.cache/hud-redesign/${name}-settings.png`});
  const qBefore=await page.evaluate(()=>window.__testMatch.hero('blue').skillRanks.q);
  await page.keyboard.press('Control+q');
  assert.equal(await page.evaluate(()=>window.__testMatch.hero('blue').skillRanks.q),qBefore);
  await page.locator('#graphics-settings-tab').click();
  assert.equal(await page.locator('#graphics-settings').isVisible(),true);
  assert.equal(await page.locator('#operation-settings').isVisible(),false);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#player-settings').isVisible(),false);
  await page.keyboard.press('F10');
  await page.locator('#player-settings[open]').waitFor();
  await page.keyboard.press('F10');
  assert.equal(await page.locator('#player-settings').isVisible(),false);
  await page.setViewportSize({width:375,height:740});
  await page.screenshot({path:`.cache/hud-redesign/${name}-mobile.png`});
  const hud=await page.locator('.player-hud').boundingBox();assert.ok(hud.x>=0&&hud.x+hud.width<=376);
  assert.equal(await page.locator('#champion-stats').isVisible(),true);
  await page.keyboard.press('F10');
  await page.screenshot({path:`.cache/hud-redesign/${name}-mobile-settings.png`});
  await page.setViewportSize({width:1280,height:800});
  await page.keyboard.press('F10');
  console.log('PASS',name,'level/XP HUD, legal upgrades, Ctrl shortcuts, stats, restart');
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors');
}catch(error){console.log('URL',page.url(),'errors',errors);await page.screenshot({path:'.cache/hud-redesign/failure.png'});throw error;}
finally{await browser.close();}


