import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('.cache/player-settings',{recursive:true});
try{
 for(const [name,route] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
  await page.locator('.hud-menu').waitFor();
  if(name==='phaser')await page.locator('#start-button').click();
  assert.equal(await page.locator('.hud-menu>summary').innerText(),'设置');
  await page.locator('.hud-menu>summary').click();
  assert.deepEqual(await page.locator('.settings-section h2').allTextContents(),['操作设置','画质设置']);
  assert.equal(await page.locator('#operation-settings .cast-settings').count(),1);
  assert.equal(await page.locator('.hud-menu-content a').count(),0);
  assert.equal(await page.locator('.hud-menu-content .champion-stats').count(),0);
  await page.getByLabel('技能施法模式').selectOption('release');
  assert.equal(await page.evaluate(()=>localStorage.getItem('midline-cast-mode')),'release');
  await page.getByLabel('技能施法模式').selectOption('instant');
  const camera=page.locator(name==='three'?'#follow':'#camera-button');
  const before=await camera.innerText();await camera.click();assert.notEqual(await camera.innerText(),before);
  const sound=page.locator(name==='three'?'#sound':'#sound-button');
  const pressed=await sound.getAttribute('aria-pressed');await sound.click();assert.notEqual(await sound.getAttribute('aria-pressed'),pressed);
  if(name==='three'){
   for(const id of ['scenario','presentation','elevation','texture','war-fog','restart','pause'])assert.equal(await page.locator('#'+id).isVisible(),false,id);
   await page.locator('#detail').selectOption('1280');
   await page.locator('#quality').selectOption('low');
   await page.locator('#quality-compare').click();
   assert.equal(await page.locator('[data-quality-effect="contact"]').isDisabled(),true);
   await page.locator('#quality-compare').click();
   await page.locator('[data-quality-effect="contact"]').uncheck();
   assert.equal(await page.locator('[data-quality-effect="contact"]').isChecked(),false);
  }else assert.equal(await page.locator('#restart-button').isVisible(),false);
  await page.screenshot({path:'.cache/player-settings/'+name+'.png'});
  await page.setViewportSize({width:375,height:740});
  const box=await page.locator('.hud-menu-content').boundingBox();assert(box&&box.x>=0&&box.x+box.width<=375);
  await page.screenshot({path:'.cache/player-settings/'+name+'-narrow.png'});
  await page.setViewportSize({width:1280,height:800});
  console.log('PASS',name,'two sections, player preferences, cast mode, live toggles, hidden diagnostics, narrow layout');
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors.');
}finally{await browser.close();}
