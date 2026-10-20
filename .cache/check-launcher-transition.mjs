import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const [path,module] of [['/','main.ts'],['/three.html?map=howling&scene=match','main-three.ts']]) {
  const page=await browser.newPage({viewport:{width:1440,height:960}});
  let release; const waiting=new Promise(resolve=>release=resolve);
  let requested; const started=new Promise(resolve=>requested=resolve);
  await page.route(new RegExp('/src/'+module.replace('.', '\\.')+'(?:\\?.*)?$'),async route=>{requested();await waiting;await route.continue();});
  console.log('Testing',path);await page.goto('http://127.0.0.1:5173'+path);
  await page.locator('.fullscreen-toggle').click();
  await page.waitForFunction(()=>!!document.fullscreenElement);
  await page.locator('.start-play').click();await Promise.race([started,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Import not intercepted')),10000))]);
  assert.equal(await page.locator('.match-shell').isVisible(),false,'Game markup stays hidden during delayed import');
  assert.equal(await page.locator('.start-screen').isVisible(),true);
  assert.equal(await page.locator('.start-screen').evaluate(e=>e.getBoundingClientRect().top),0);
  await page.screenshot({path:'.cache/start-screen/transition-'+module+'.png'});
  release();await page.locator('.start-screen').waitFor({state:'detached',timeout:30000});
  assert.equal(await page.locator('.match-shell').isVisible(),true);
  assert(await page.evaluate(()=>!!document.fullscreenElement));
  console.log('PASS',path,'slow loading hides debug markup, menu stays at top, fullscreen retained');
  await page.close();
 }
 const page=await browser.newPage();await page.route('**/src/launch.ts',route=>route.abort());
 await page.goto('http://127.0.0.1:5173/three.html');
 assert.equal(await page.locator('.match-shell').isVisible(),false);
 console.log('PASS initial HTML hides debug markup before JavaScript loads');
} finally {await browser.close();}

