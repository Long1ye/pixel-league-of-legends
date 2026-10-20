import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});page.setDefaultTimeout(15000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('.cache/skill-casting',{recursive:true});
const ready=async()=>{await page.waitForFunction(()=>document.querySelector('#cooldown-q')?.textContent==='');};
try{
for(const [name,route] of [['three','/three.html?map=howling&scene=combat'],['phaser','/?map=howling&practice=combat']]){
 console.log('Checking',name);
 await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
 await page.locator('.cast-settings').waitFor({state:'attached'});
 if(name==='phaser')await page.locator('#start-button').click();
 const menu=page.locator('.hud-menu');
 const mode=async(value)=>{await menu.locator(':scope>summary').click();await page.getByLabel('技能施法模式').selectOption(value);await menu.locator(':scope>summary').click();};
 await mode('release');
 await page.mouse.move(800,450);
 await page.keyboard.down('q');
 await page.locator('#ability-q.cast-selected').waitFor();
 assert.equal(await page.locator('#cooldown-q').innerText(),'');
 await page.screenshot({path:'.cache/skill-casting/'+name+'-hold-q.png'});
 await page.keyboard.up('q');
 await page.waitForFunction(()=>document.querySelector('#cooldown-q').textContent!=='');
 await ready();
 await page.keyboard.down('q');await page.keyboard.press('Escape');await page.keyboard.up('q');
 assert.equal(await page.locator('#cooldown-q').innerText(),'');
 assert.equal(await page.locator('#ability-q').evaluate(el=>el.classList.contains('cast-selected')),false);
 await page.locator('#ability-q').click();
 assert.equal(await page.locator('#cooldown-q').innerText(),'');
 await page.mouse.move(800,450);
 await page.screenshot({path:'.cache/skill-casting/'+name+'-ui-aim.png'});
 await page.mouse.click(800,450);
 await page.waitForFunction(()=>document.querySelector('#cooldown-q').textContent!=='');
 await ready();
 await page.locator('#ability-w').click();await page.mouse.click(760,420,{button:'right'});
 assert.equal(await page.locator('#ability-w').evaluate(el=>el.classList.contains('cast-selected')),false);
 assert.equal(await page.locator('#cooldown-w').innerText(),'');
 await mode('instant');await page.mouse.move(800,450);await page.keyboard.down('q');
 await page.waitForFunction(()=>document.querySelector('#cooldown-q').textContent!=='');await page.keyboard.up('q');await ready();
 await mode('release');await page.mouse.move(800,450);await page.keyboard.down('q');
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('q');
 assert.equal(await page.locator('#cooldown-q').innerText(),'');
 assert.equal(await page.locator('#ability-q').evaluate(el=>el.classList.contains('cast-selected')),false);
 console.log('PASS',name,'hold/release, UI confirmation, Escape/right cancel, instant mode, blur cancellation');
}
assert.deepEqual(errors,[]);console.log('No browser runtime errors.');
}catch(error){console.log('URL',page.url(),'errors',errors);await page.screenshot({path:'.cache/skill-casting/failure.png'});throw error;}finally{await browser.close();}
