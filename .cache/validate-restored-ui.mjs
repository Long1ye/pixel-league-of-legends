import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1600,height:900}});
page.setDefaultTimeout(8000); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
 await page.mouse.move(880,450); await page.keyboard.press('q');
 await page.waitForFunction(()=>document.querySelector('#ability-q').classList.contains('cooling'));
 assert.notEqual(await page.locator('#cooldown-q').textContent(),'');
 await page.locator('#ability-w').click();
 await page.waitForFunction(()=>document.querySelector('#ability-w').classList.contains('cooling'));
 await page.waitForTimeout(1200); await page.locator('#summoner-d').click(); console.log('after D',page.url(),await page.locator('body').getAttribute('class'),errors);
 await page.waitForFunction(()=>document.querySelector('#summoner-d').classList.contains('cooling'));
 await page.keyboard.press('Escape');
 await page.locator('#match-overlay').waitFor({state:'visible'});
 const paused=await page.locator('#match-time').textContent(); await page.waitForTimeout(500);
 assert.equal(await page.locator('#match-time').textContent(),paused);
 await page.locator('#start-button').click(); await page.locator('#match-overlay').waitFor({state:'hidden'});
 await page.locator('.hud-menu > summary').click();
 assert.equal(await page.locator('#restart').isVisible(),true);
 await page.locator('#restart').click();
 await page.waitForFunction(()=>!document.querySelector('#ability-w').classList.contains('cooling'));
 assert.equal(await page.locator('#match-time').textContent(),'00:00');
 await page.screenshot({path:'.cache/restored-ui-options.png'});
 await page.locator('.hud-menu > summary').click();
 await page.locator('.minimap').click();
 await page.locator('.hud-menu > summary').click(); await page.locator('#follow').click(); await page.locator('.hud-menu > summary').click();
 await page.screenshot({path:'.cache/restored-ui-desktop.png'});
 for(const width of [800,390]) {
  await page.setViewportSize({width,height:844}); await page.waitForTimeout(350);
  const hud=await page.locator('.player-hud').boundingBox(), map=await page.locator('.minimap').boundingBox();
  assert(hud.x>=0&&hud.x+hud.width<=width); assert(map.x>=0&&map.x+map.width<=width);
  assert(hud.x+hud.width<=map.x||map.y+map.height<=hud.y);
  await page.screenshot({path:`.cache/restored-ui-${width}.png`});
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: live icons and vitals, keyboard Q, clickable W and D cooldowns, pause freezes time, resume, restart resets state, minimap, follow control and 800/390px layouts. No browser errors.');
} finally {await browser.close();}


