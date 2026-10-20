import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({channel:'chrome',headless:true});
const page = await browser.newPage({viewport:{width:1280,height:800}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('.cache/operation-guide',{recursive:true});
try {
 for(const route of ['/three.html?map=howling&scene=match','/?map=howling']){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
  await page.locator('.operation-guide').waitFor();
  if(route.startsWith('/?')) await page.locator('#start-button').click();
  assert.match(await page.locator('.operation-guide').innerText(),/A → 左键/);
  for(const key of ['q','w','e','r']){
   await page.locator('#ability-'+key).hover();
   await page.locator('#skill-description-'+key).waitFor({state:'visible'});
   assert((await page.locator('#skill-description-'+key+' p').innerText()).length>20);
  }
  await page.mouse.move(700,400);
  await page.locator('#ability-q').focus();
  await page.locator('#skill-description-q').waitFor({state:'visible'});
  await page.locator('#ability-q').evaluate(el=>el.blur());
  await page.locator('.operation-guide>summary').click();
  await page.waitForFunction(()=>!document.querySelector('.operation-guide').open);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.operation-guide').waitFor();
  if(route.startsWith('/?')) await page.locator('#start-button').click();
  assert.equal(await page.locator('.operation-guide').evaluate(el=>el.open),false);
  await page.locator('.operation-guide>summary').click();
  await page.locator('#ability-e').hover();
  await page.screenshot({path:'.cache/operation-guide/'+(route.startsWith('/three')?'three':'phaser')+'.png'});
 }
 await page.setViewportSize({width:375,height:740});
 await page.locator('#ability-r').hover();
 const bounds=await page.locator('#skill-description-r').boundingBox();
 assert(bounds&&bounds.x>=0&&bounds.x+bounds.width<=375);
 await page.screenshot({path:'.cache/operation-guide/narrow.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: both entries, A reference, QWER hover, keyboard focus, collapse persistence, narrow tooltip bounds; no page errors.');
} finally {await browser.close();}
