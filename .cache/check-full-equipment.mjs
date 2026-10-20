import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(60000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const output='docs/visual-validation/2026-10-20/full-equipment';await mkdir(output,{recursive:true});
await page.route(/\/src\/game\/Match(?:\.ts)?(?:\?|$)/,async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaStep=Match.prototype.step;Match.prototype.step=function(dt){window.__fullItemMatch=this;return qaStep.call(this,dt);};'});});
try{
 for(const [name,url] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:5173'+url,{waitUntil:'domcontentloaded'});await page.locator('.start-play').click();
  await page.waitForFunction(()=>window.__fullItemMatch?.phase==='playing');await page.locator('#shop-toggle').waitFor({state:'visible'});
  await page.evaluate(()=>{window.__fullItemMatch.hero('blue').gold=100000;});
  await page.keyboard.press('p');await page.locator('.shop-filters button').filter({hasText:/^全部$/}).click();
  assert.equal(await page.locator('.shop-grid .shop-item').count(),229);
  const sources=await page.locator('.shop-grid .item-icon').evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).backgroundImage));
  assert(sources.every(url=>url.includes('/league-items-16.20.1/')&&url.includes('.png')),'Every item must use its original local icon');
  const dimensions=await page.locator('.shop-grid .item-icon').evaluateAll(async nodes=>Promise.all(nodes.map(async node=>{const url=getComputedStyle(node).backgroundImage.slice(5,-2),image=new Image();image.src=url;await image.decode();return [image.naturalWidth,image.naturalHeight];})));
  assert(dimensions.every(([w,h])=>w===h&&w>=64));
  await page.locator('[data-item-id="3115"]').click();assert.match(await page.locator('.shop-detail').textContent(),/纳什之牙/);await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__fullItemMatch.hero('blue').inventory.includes(3115));
  await page.locator('.shop-search').fill('法术穿透');assert((await page.locator('.shop-item').count())>=5);
  await page.locator('.shop-search').fill('');await page.locator('[data-item-id="3157"]').click();await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__fullItemMatch.hero('blue').inventory.includes(3157));
  await page.locator('#shop-use').click();await page.waitForFunction(()=>window.__fullItemMatch.hero('blue').stasisUntil>window.__fullItemMatch.time);
  await page.screenshot({path:`${output}/${name}-zhonya.png`});
  await page.locator('.shop-search').fill('');await page.locator('[data-item-id="3026"]').click();assert.equal(await page.locator('#shop-buy').isDisabled(),true);assert.match(await page.locator('.shop-buy-note').first().textContent(),/地图/);
  await page.locator('[data-item-id="3865"]').click();assert.equal(await page.locator('#shop-buy').isDisabled(),true);assert.match(await page.locator('.shop-implementation').textContent(),/辅助任务/);
  await page.locator('[data-item-id="3031"]').click();await page.locator('.shop-catalog').evaluate(node=>node.scrollTop=0);await page.screenshot({path:`${output}/${name}-catalog.png`});
  await page.locator('.shop-filters button').filter({hasText:/^本图装备$/}).click();const available=await page.locator('.shop-item').count();assert(available>150&&available<229);
  await page.locator('.shop-filters button').filter({hasText:/^主动装备$/}).click();assert((await page.locator('.shop-item').count())>=20);
  await page.locator('.shop-filters button').filter({hasText:/^消耗品$/}).click();await page.locator('[data-item-id="2003"]').click();await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__fullItemMatch.hero('blue').inventory.includes(2003));
  await page.keyboard.press('Escape');
  await page.evaluate(()=>{const m=window.__fullItemMatch;m.hero('blue').stasisUntil=0;});
  const potionSlot=await page.evaluate(()=>window.__fullItemMatch.hero('blue').inventory.indexOf(2003));
  await page.keyboard.press(['1','2','5','6','7','8'][potionSlot]);await page.waitForFunction(()=>!window.__fullItemMatch.hero('blue').inventory.includes(2003));
  await page.setViewportSize({width:390,height:844});await page.keyboard.press('p');await page.waitForTimeout(200);await page.screenshot({path:`${output}/${name}-390.png`});
  console.log('PASS',name,'229 icon decodes, full/on-map/active filters, AP purchase, stasis use, map/quest restrictions, consumable shortcut, 390px layout; on-map',available);
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors');
}catch(error){console.log(errors);await page.screenshot({path:'.cache/full-equipment-failure.png'});throw error;}
finally{await browser.close();}
