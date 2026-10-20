import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(60000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const output='docs/visual-validation/2026-10-20/equipment-icons-v2';await mkdir(output,{recursive:true});
await page.route(/\/src\/game\/Match(?:\.ts)?(?:\?|$)/,async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaStep=Match.prototype.step;Match.prototype.step=function(dt){window.__iconMatch=this;return qaStep.call(this,dt);};'});});
try{
 for(const [name,url] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:5173'+url,{waitUntil:'domcontentloaded'});await page.locator('.start-play').click();
  await page.waitForFunction(()=>window.__iconMatch?.phase==='playing');await page.locator('#shop-toggle').waitFor({state:'visible'});
  await page.evaluate(()=>{const m=window.__iconMatch;m.hero('blue').gold=100000;for(const id of [1055,3006,3031,3046,3153,1029])m.buyItem('blue',id);});
  await page.keyboard.press('p');await page.locator('.shop-filters button').filter({hasText:'全部'}).click();
  const ids=await page.locator('.shop-grid .shop-item').evaluateAll(nodes=>nodes.map(n=>n.dataset.itemId));assert.equal(ids.length,16);
  const urls=new Set();
  for(const id of ids){
   const entry=page.locator(`.shop-grid [data-item-id="${id}"]`);await entry.click();
   assert.equal(await page.locator('.shop-detail-heading .item-icon').getAttribute('data-item-icon'),id);
   const result=await entry.locator('.item-icon').evaluate(async node=>{const style=getComputedStyle(node);const url=style.backgroundImage.slice(5,-2);const image=new Image();image.src=url;await image.decode();return {url,width:image.naturalWidth,height:image.naturalHeight,size:style.backgroundSize};});
   assert.equal(result.width,512);assert.equal(result.height,512);assert.equal(result.size,'100% 100%');urls.add(result.url);
   assert(result.url.includes(`/${id}.webp`));
  }
  assert.equal(urls.size,16);await page.locator('[data-item-id="3031"]').click();
  const slots=await page.locator('.equipment-slot').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect();return {w:r.width,h:r.height,icon:node.querySelector('.item-icon')?.getAttribute('data-item-icon')};}));
  for(const slot of slots){assert.equal(slot.w,slot.h);assert(slot.icon);}assert.equal(new Set(slots.map(slot=>slot.icon)).size,6);
  await page.screenshot({path:`${output}/${name}-shop.png`});await page.keyboard.press('Escape');
  await page.locator('.player-hud').screenshot({path:`${output}/${name}-six-items.png`});
  await page.setViewportSize({width:390,height:844});await page.keyboard.press('p');await page.waitForTimeout(200);await page.screenshot({path:`${output}/${name}-390.png`});
  console.log('PASS',name,'16 unique 512px icons decode, correct IDs in catalog/details, six square inventory slots, narrow viewport');
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors');
}finally{await browser.close();}
