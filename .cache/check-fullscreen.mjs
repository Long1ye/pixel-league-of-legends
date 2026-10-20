import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 for(const route of ['/', '/three.html?map=howling&scene=match']) {
  await page.goto('http://127.0.0.1:5173'+route);
  const toggle=page.locator('.fullscreen-toggle');
  await toggle.click();
  await page.waitForFunction(()=>!!document.fullscreenElement);
  assert.equal(await toggle.getAttribute('aria-pressed'),'true');
  await toggle.click();
  await page.waitForFunction(()=>!document.fullscreenElement);
  assert.equal(await toggle.getAttribute('aria-pressed'),'false');
  await toggle.click();
  await page.locator('.start-play').click();
  await page.locator('.start-screen').waitFor({state:'detached'});
  assert(await page.evaluate(()=>!!document.fullscreenElement),'Fullscreen stays active into game');
  await page.locator('.hud-menu>summary').click();
  assert.equal(await page.locator('.fullscreen-toggle').getAttribute('aria-pressed'),'true');
  await page.locator('.fullscreen-toggle').click();
  await page.waitForFunction(()=>!document.fullscreenElement);
  console.log('PASS',route,'enter/exit fullscreen, preserve into game, settings toggle');
 }
} finally {await browser.close();}
