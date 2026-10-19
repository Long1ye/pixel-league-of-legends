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

const result=await page.evaluate(async()=>{
 const {ART_BRUSHES}=await import('/src/render-three/PaintedMapLayout.ts'),{bridgePoint}=await import('/src/game/Bridge.ts');
 const {view,host}=window.vfxCheck,brush=ART_BRUSHES[1],hero=host.match.hero('blue');
 Object.assign(hero,bridgePoint(brush.u,brush.v));view.cameraRig.lookAt(hero);view.cameraRig.setZoom(.65);host.update(0);
 await new Promise(r=>setTimeout(r,2000));host.update(0);
 const body=view.sprites.body(hero.id),label=view.healthBars.element.querySelector('.brush-concealment-status');
 window.brushCheck={brush,hero,bridgePoint};return {opacity:body.material.opacity,depthTest:body.material.depthTest,visible:body.visible,labelVisible:!label.hidden};
});
if(result.opacity!==.45||result.depthTest||!result.visible||!result.labelVisible)throw Error(JSON.stringify(result));
await page.screenshot({path:'.cache/brush-concealment-inside.png'});
const outside=await page.evaluate(()=>{const {view,host}=window.vfxCheck,{brush,hero,bridgePoint}=window.brushCheck;Object.assign(hero,bridgePoint(brush.u,brush.v+brush.width/2+15));host.update(0);const b=view.sprites.body(hero.id);return {opacity:b.material.opacity,depthTest:b.material.depthTest,labelHidden:view.healthBars.element.querySelector('.brush-concealment-status').hidden};});
if(outside.opacity!==1||!outside.depthTest||!outside.labelHidden)throw Error(JSON.stringify(outside));
await page.screenshot({path:'.cache/brush-concealment-outside.png'});
console.log(JSON.stringify({inside:result,outside,errors}));if(errors.length)throw Error(errors.join('\n'));await browser.close();

