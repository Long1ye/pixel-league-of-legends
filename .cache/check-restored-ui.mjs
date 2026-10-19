import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1600,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
await page.waitForTimeout(1800);
await page.screenshot({path:'.cache/restored-ui-desktop.png'});
console.log(JSON.stringify({errors,body:await page.locator('body').getAttribute('class'),health:await page.locator('#health-text').textContent(),hud:await page.locator('.player-hud').boundingBox(),viewport:await page.locator('#viewport').boundingBox(),overlay:await page.locator('#match-overlay').isVisible(),icons:await page.locator('.player-hud img').evaluateAll(imgs=>imgs.map(i=>({loaded:i.complete&&i.naturalWidth>0,src:i.getAttribute('src')})))}));
await browser.close();

