import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1600,height:900}});page.setDefaultTimeout(8000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});await page.waitForTimeout(4500);
 assert.equal(await page.locator('.minimap').count(),0);
 assert.equal(await page.locator('.world-health-bar[data-kind=hero]').count(),2);
 await page.keyboard.press('a');assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'true');
 const cursor=await page.locator('#viewport > canvas').evaluate(c=>getComputedStyle(c).cursor);assert(cursor.includes('target_precise'));
 await page.keyboard.press('Escape');assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'false');assert.equal(await page.locator('#match-overlay').isVisible(),false);
 const bars=page.locator('.world-health-bar[data-kind=hero]');const enemy=await bars.nth(1).boundingBox();
 await page.keyboard.press('a');await page.mouse.click(enemy.x+enemy.width/2,enemy.y+65);
 assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'false');
 await page.waitForTimeout(500);console.log('selected',await page.locator('#target-name').textContent(),await page.locator('#selection').textContent());
 await page.keyboard.press('a');await page.mouse.click(1100,550);assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'false');
 await page.keyboard.press('a');await page.keyboard.press('q');assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'false');
 await page.keyboard.press('a');await page.mouse.click(900,500,{button:'right'});assert.equal(await page.locator('#viewport').getAttribute('data-attack-selecting'),'false');
 await page.screenshot({path:'.cache/world-healthbars-combat.png'});
 const result=await page.evaluate(async()=>{
  document.querySelector('#pause').click();
  const [{WorldHealthBars},{ThreeCamera},{Match},{RenderPositions}]=await Promise.all([import('/src/render-three/WorldHealthBars.ts'),import('/src/render-three/Coordinates.ts'),import('/src/game/Match.ts'),import('/src/render/RenderPositions.ts')]);
  const match=new Match({ai:false,waves:false}), camera=new ThreeCamera();camera.resize(1600,900);camera.setElevation(45);camera.lookAt(match.hero('blue'));
  const positions=new RenderPositions(),root=document.createElement('div');root.style.cssText='position:fixed;inset:0;z-index:50;pointer-events:none';document.body.append(root);
  const ui=new WorldHealthBars(root);await new Promise(resolve=>setTimeout(resolve,150));
  const hero=match.hero('blue');match.hero('red').x=hero.x+1000;positions.capture(match.entities);const start={x:hero.x,y:hero.y};hero.x+=1.7;hero.y+=.2;
  const samples=[];let hash;
  for(const alpha of [.1,.2,.3,.4,.5,.6,.7,.8,.9]){
   ui.update({match,positions,alpha,events:[]},camera,true,true);
   const bar=root.querySelector(`[data-entity-id="${hero.id}"]`),rect=bar.getBoundingClientRect(),data=bar.getContext('2d').getImageData(0,0,bar.width,9).data;
   const current=Array.from(data).join(',');if(hash!==undefined&&hash!==current)throw Error('Static health raster changed during movement');hash=current;
   samples.push({x:rect.x,y:rect.y});
  }
  const blue=match.tower('blue'), red=match.tower('red');
  const blueVisible=!root.querySelector(`[data-entity-id="${blue.id}"]`).hidden,redHidden=root.querySelector(`[data-entity-id="${red.id}"]`).hidden;
  Object.assign(hero,{x:red.x-50,y:red.y});positions.reset();ui.update({match,positions,alpha:1,events:[]},camera,true,true);
  const redVisible=!root.querySelector(`[data-entity-id="${red.id}"]`).hidden;
  const tower=root.querySelector(`[data-entity-id="${red.id}"]`);const pixel=Array.from(tower.getContext('2d').getImageData(4,4,1,1).data);
  ui.dispose();root.remove();return {samples,blueVisible,redHidden,redVisible,pixel};
 });
 for(let i=1;i<result.samples.length;i++){assert(result.samples[i].x>result.samples[i-1].x);assert(result.samples[i].x-result.samples[i-1].x<1);}
 assert(result.blueVisible&&result.redHidden&&result.redVisible);assert(result.pixel[0]>result.pixel[1]);
 assert.deepEqual(errors,[]);console.log(JSON.stringify(result));console.log('PASS: A targeting, cancel, attack-move, hero movement anchors and unchanged raster, allied/enemy tower visibility and red fill. No browser errors.');
}finally{await browser.close();}
