import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:960}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('.cache/start-screen',{recursive:true});
try {
 for(const route of ['/', '/three.html?map=howling&scene=match']) {
  await page.goto('http://127.0.0.1:5173'+route);
  await page.locator('.start-screen').waitFor();
  assert.equal(await page.locator('canvas').count(),0,'No running game before entry');
  assert.equal(await page.locator('[data-mode=solo]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-mode=online]').click();
  assert.equal(await page.locator('.start-play').innerText(),'进入对战大厅\n→');
  await page.locator('[data-mode=solo]').click();
  await page.screenshot({path:'.cache/start-screen/'+(route==='/'?'root':'three')+'.png',fullPage:true});
  await page.setViewportSize({width:375,height:740});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
  await page.locator('.start-more summary').click();
  await page.screenshot({path:'.cache/start-screen/mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:960});
  await page.locator('.start-play').click();
  await page.locator('canvas').first().waitFor({timeout:30000});
  await page.waitForTimeout(1200);
  assert.equal(await page.locator('.start-screen').count(),0);
  if(route==='/')assert.equal(await page.locator('#match-overlay').isVisible(),false);
  await page.locator('.hud-menu>summary').click(); await page.locator('.start-return').click();
  await page.locator('.start-screen').waitFor();
  console.log('PASS',route,'menu, mode toggles, mobile, launch, return');
 }
 await page.goto('http://127.0.0.1:5180/');
 await page.locator('[data-mode=online]').click();await page.locator('.start-play').click();
 await page.locator('.battle-lobby').waitFor({timeout:30000});
 await page.locator('[data-create]').waitFor();
 await page.waitForFunction(()=>!document.querySelector('[data-create]').disabled);
 await page.locator('[data-create]').click();
 await page.waitForFunction(()=>document.querySelector('[data-code]').textContent.length===6);
 console.log('PASS root -> online lobby -> six-digit room');
 await page.screenshot({path:'.cache/start-screen/lobby.png'});
 await page.locator('[data-leave]').click();
 assert.deepEqual(errors,[]);console.log('No browser runtime errors.');
} finally {await browser.close();}


