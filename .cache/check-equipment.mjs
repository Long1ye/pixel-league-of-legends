import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(60000);
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await mkdir('docs/visual-validation/2026-10-20/equipment',{recursive:true});
await page.route(/\/src\/game\/Match(?:\.ts)?(?:\?|$)/,async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\nconst qaStep=Match.prototype.step;Match.prototype.step=function(dt){window.__equipmentMatch=this;return qaStep.call(this,dt);};'});});
try{
 for(const [name,path] of [['three','/three.html?map=howling&scene=match'],['phaser','/?map=howling']]){
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'domcontentloaded'});
  await page.locator('.start-play').waitFor();await page.locator('.start-play').click();
  await page.waitForFunction(()=>window.__equipmentMatch?.phase==='playing');
  await page.locator('#shop-toggle').waitFor({state:'visible'});
  await page.keyboard.press('p');await page.locator('#equipment-shop').waitFor({state:'visible'});
  assert.equal(await page.locator('.shop-grid .shop-item').count(),5);
  await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__equipmentMatch.hero('blue').inventory.includes(1055));
  assert.equal(await page.evaluate(()=>window.__equipmentMatch.hero('blue').gold),50);
  await page.locator('#shop-sell').click();
  await page.waitForFunction(()=>window.__equipmentMatch.hero('blue').gold===230);
  await page.evaluate(()=>{window.__equipmentMatch.hero('blue').gold=10000;window.__equipmentMatch.hero('red').damage=0;});
  await page.locator('.shop-filters button',{hasText:'全部',exact:true}).click();
  assert.equal(await page.locator('.shop-grid .shop-item').count(),16);
  await page.locator('[data-item-id="1001"]').click();await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__equipmentMatch.hero('blue').inventory.includes(1001));
  await page.locator('[data-item-id="3006"]').click();await page.waitForFunction(()=>document.querySelector('#shop-buy').textContent.includes('800'));
  await page.locator('#shop-buy').click();
  await page.waitForFunction(()=>window.__equipmentMatch.hero('blue').inventory.includes(3006));
  assert.equal(await page.evaluate(()=>window.__equipmentMatch.hero('blue').inventory.includes(1001)),false);
  await page.locator('[data-item-id="3153"]').click();
  await page.screenshot({path:`docs/visual-validation/2026-10-20/equipment/${name}-shop.png`});
  await page.locator('.shop-search').fill('暴击');assert.equal(await page.locator('.shop-grid .shop-item').count(),4);
  await page.keyboard.press('Escape');await page.locator('#equipment-shop').waitFor({state:'hidden'});
  assert.equal(await page.evaluate(()=>window.__equipmentMatch.phase),'playing');
  await page.evaluate(()=>window.__equipmentMatch.orderMove('blue',{x:window.__equipmentMatch.hero('blue').x+350,y:window.__equipmentMatch.hero('blue').y}));
  await page.waitForTimeout(2500);await page.keyboard.press('p');
  await page.locator('.shop-search').fill('');await page.locator('[data-item-id="3031"]').click();
  assert.equal(await page.locator('#shop-buy').isDisabled(),true);
  assert.match(await page.locator('.shop-location').textContent(),/返回己方泉水/);
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:900,height:700});await page.keyboard.press('p');await page.waitForTimeout(300);
  await page.screenshot({path:`docs/visual-validation/2026-10-20/equipment/${name}-900.png`});
  const rect=await page.locator('#equipment-shop').boundingBox();assert(rect.x>=0&&rect.x+rect.width<=901);
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(300);
  await page.screenshot({path:`docs/visual-validation/2026-10-20/equipment/${name}-390.png`});
  await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:900});
  await page.screenshot({path:`docs/visual-validation/2026-10-20/equipment/${name}-hud.png`});
  console.log('PASS',name,'purchase/sell, six slots, boots upgrade, search, P/Esc, fountain restriction, 900/390px layout');
 }
 assert.deepEqual(errors,[]);console.log('No browser runtime errors');
}catch(error){console.log(errors);await page.screenshot({path:'.cache/equipment-failure.png'});throw error;}
finally{await browser.close();}
