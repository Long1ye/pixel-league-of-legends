import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startServer} from '../server/server';
const {chromium}=await import('file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
process.env.PORT='5188';const host=await startServer();
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});page.setDefaultTimeout(30000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let documents=0;page.on('request',r=>{if(r.isNavigationRequest()&&r.frame()===page.mainFrame())documents++;});
 console.log('Opening page');await page.goto('http://127.0.0.1:5188/',{waitUntil:'domcontentloaded'});console.log('Page opened');await page.locator('.start-play').waitFor();
 await page.evaluate(()=>window.navigationMarker='same-document');
 console.log('Click fullscreen');await page.locator('.start-screen .fullscreen-toggle').click();await page.waitForFunction(()=>!!document.fullscreenElement);
 const check=async label=>{assert(await page.evaluate(()=>!!document.fullscreenElement),label);assert.equal(await page.evaluate(()=>window.navigationMarker),'same-document');console.log('PASS',label);};
 console.log('Select online');await page.locator('[data-mode=online]').click();await page.locator('.start-play').click();
 console.log('Wait lobby');await page.locator('.battle-lobby').waitFor();await check('root menu -> multiplayer keeps fullscreen');
 await page.locator('.asset-loading').waitFor({state:'detached',timeout:120000});console.log('Multiplayer assets ready');
 await page.getByText('返回单人对局',{exact:true}).click();
 await page.waitForFunction(()=>!location.search.includes('online=1')&&!document.querySelector('.battle-lobby'));
 await page.locator('.asset-loading').waitFor({state:'detached',timeout:120000});await check('multiplayer -> solo keeps fullscreen');
 await page.locator('.hud-menu>summary').click();await page.locator('.start-return').click();
 await page.locator('.start-play').waitFor();await check('solo -> main menu keeps fullscreen');
 await page.locator('.start-brand').click();await page.locator('.start-play').waitFor();await check('menu brand link keeps fullscreen');
 await page.locator('.start-play').click();await page.locator('.start-screen').waitFor({state:'detached'});
 await page.locator('#game canvas').waitFor();await check('legacy solo entry keeps fullscreen');
 await page.locator('.hud-menu>summary').click();await page.locator('.start-return').click();
 await page.locator('.start-play').waitFor();await check('legacy solo -> menu keeps fullscreen');
 console.log('Click fullscreen');await page.locator('.start-screen .fullscreen-toggle').click();await page.waitForFunction(()=>!document.fullscreenElement);
 assert.equal(documents,1,'Only initial navigation should load a document');assert.deepEqual(errors,[]);
 await mkdir('.cache/fullscreen-navigation',{recursive:true});await writeFile('.cache/fullscreen-navigation/report.json',JSON.stringify({documents,errors,explicitExitWorks:true},null,2));
 console.log('PASS explicit exit, only one document loaded, no runtime errors');
}finally{await browser.close();await host.close();}


