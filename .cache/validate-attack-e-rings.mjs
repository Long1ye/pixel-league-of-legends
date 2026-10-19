import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:720}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
await page.evaluate(async()=>{
 document.querySelector('#pause').click();
 const [{ThreeArena},{PrototypeHost},{Match},{bridgePoint},{COMBAT_ART}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts'),import('/src/game/Bridge.ts'),import('/src/render-three/CombatArt.ts')]);
 const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100;background:#111c2b';document.body.append(container);
 const view=new ThreeArena(container),host=new PrototypeHost(()=>{const m=new Match({ai:false,waves:false});Object.assign(m.hero('blue'),bridgePoint(-10,0));Object.assign(m.hero('red'),bridgePoint(300,0));const h=m.hero('blue');const minion=m.spawnMinion('red','melee',{x:h.x+30,y:h.y-15});Object.assign(minion,{hp:2000,maxHp:2000,speed:0,damage:0});return m;},view);
 view.renderer.domElement.style.cssText='display:block;width:100%;height:100%'; view.cameraRig.setElevation(45);view.cameraRig.setZoom(1.2);view.cameraRig.lookAt(host.match.hero('blue'));host.update(0);
 window.vfxCheck={view,host,target:host.match.entities.find(e=>e.kind==='melee')};
 await Promise.all(Object.values(COMBAT_ART).map(async s=>{const img=new Image();img.src=s.url;await img.decode();}));
});
await page.waitForTimeout(3500);

await page.evaluate(()=>{const {view,host,target}=window.vfxCheck;view.cameraRig.setZoom(.7);view.attackSelecting=true;host.command({kind:'cast',ability:'e',point:target});for(let i=0;i<50;i++)host.update(1/60);});
await page.waitForTimeout(1500);await page.evaluate(()=>window.vfxCheck.host.update(0));await page.screenshot({path:'.cache/attack-e-rings-after.png'});
const result=await page.evaluate(()=>{
 const {view,host,target}=window.vfxCheck;
 const first=view.targetCooldowns.element.querySelector(`[data-entity-id="${target.id}"]`);
 if(!first)throw Error('Minion E timer missing');
 const pixel=first.getContext('2d').getImageData(0,0,first.width,first.height).data;let white=0;
 for(let i=0;i<pixel.length;i+=4)if(pixel[i]>220&&pixel[i+1]>220&&pixel[i+2]>220&&pixel[i+3]>180)white++;
 if(white<20)throw Error('E timer arc not visible');
 view.range.updateMatrixWorld();const vertices=view.range.geometry.getAttribute('position');let minY=Infinity,maxY=-Infinity;
 for(let i=0;i<vertices.count;i++){if(vertices.getY(i)!==0)throw Error('Circle plane has a scaled vertical offset');const p=view.range.position.clone().set(vertices.getX(i),vertices.getY(i),vertices.getZ(i)).applyMatrix4(view.range.matrixWorld).project(view.cameraRig.camera);const y=(1-p.y)*view.cameraRig.size.height/2;minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
 const center=view.range.position.clone().project(view.cameraRig.camera),centerY=(1-center.y)*view.cameraRig.size.height/2;
 if(Math.abs((minY+maxY)/2-centerY)>.01)throw Error('Attack range not centered on feet');
 const remaining=first.dataset.remaining;host.pause();host.update(1);if(first.dataset.remaining!==remaining)throw Error('Timer moved while paused');host.pause();
 const hero=host.match.hero('blue'),red=host.match.hero('red');Object.assign(red,{x:hero.x+30,y:hero.y-15,speed:0,damage:0,hp:2000,maxHp:2000});hero.abilities.e=host.match.time;
 if(!host.command({kind:'cast',ability:'e',point:red}))throw Error('Hero E cast rejected');for(let i=0;i<50;i++)host.update(1/60);
 const second=view.targetCooldowns.element.querySelector(`[data-entity-id="${red.id}"]`);if(!second)throw Error('Hero E timer missing');
 const count=view.targetCooldowns.element.querySelectorAll('.e-target-cooldown').length;
 for(let i=0;i<400;i++)host.update(1/60);
 if(view.targetCooldowns.element.querySelectorAll('.e-target-cooldown').length)throw Error('Expired E timers remain visible');
 return {whitePixels:white,minionAndHeroTimers:count,attackCenterError:Math.abs((minY+maxY)/2-centerY),paused:true,expiredCleanly:true};
});console.log(JSON.stringify({result,errors}));if(errors.length)throw Error(errors.join('\n'));await browser.close();
