import {chromium} from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:720}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
await page.evaluate(async()=>{
 document.querySelector('#pause').click();
 const [{ThreeArena},{PrototypeHost},{Match},{bridgePoint},{COMBAT_ART}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts'),import('/src/game/Bridge.ts'),import('/src/render-three/CombatArt.ts')]);
 const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100;background:#111c2b';document.body.append(container);
 const view=new ThreeArena(container),host=new PrototypeHost(()=>{const m=new Match({ai:false,waves:false});Object.assign(m.hero('blue'),bridgePoint(-10,0));Object.assign(m.hero('red'),bridgePoint(300,0));const h=m.hero('blue');const minion=m.spawnMinion('red','melee',{x:h.x+30,y:h.y-15});Object.assign(minion,{hp:2000,maxHp:2000,speed:0,damage:0});return m;},view);
 view.cameraRig.setElevation(45);view.cameraRig.setZoom(1.2);view.cameraRig.lookAt(host.match.hero('blue'));host.update(0);
 window.vfxCheck={view,host,target:host.match.entities.find(e=>e.kind==='melee')};
 await Promise.all(Object.values(COMBAT_ART).map(async s=>{const img=new Image();img.src=s.url;await img.decode();}));
});
await page.waitForTimeout(3500);
await page.evaluate(()=>{const {view,host,target}=window.vfxCheck;host.command({kind:'cast',ability:'q',point:target});for(let i=0;i<27;i++)host.update(1/60);});
await page.waitForTimeout(1000);await page.evaluate(()=>window.vfxCheck.host.update(0));await page.screenshot({path:'.cache/minion-vfx-after.png'});
console.log(await page.evaluate(()=>{const {view,host,target}=window.vfxCheck;return {targetHp:target.hp,cards:view.combat.sprites.group.children.filter(c=>c.visible).map(c=>({name:c.name,depthTest:c.material.depthTest})),time:host.match.time};}));
console.log(await page.evaluate(()=>{
 const {view}=window.vfxCheck;const renderer=view.renderer,gl=renderer.getContext();
 const pixels=()=>{renderer.render(view.scene,view.cameraRig.camera);const data=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,data);return data;};
 const normal=pixels(),changed=[];
 view.combat.group.traverse(o=>{if(o.isMesh&&o.material.depthTest===false&&o.renderOrder>=20&&o.renderOrder<100){changed.push(o);o.material.depthTest=true;}});
 const previous=pixels();let count=0;for(let i=0;i<normal.length;i+=4)if(Math.abs(normal[i]-previous[i])+Math.abs(normal[i+1]-previous[i+1])+Math.abs(normal[i+2]-previous[i+2])>10)count++;
 changed.forEach(o=>o.material.depthTest=false);renderer.render(view.scene,view.cameraRig.camera);
 if(count===0)throw Error('No recovered minion VFX pixels');return {recoveredPixels:count,foregroundMeshes:changed.map(o=>o.name)};
}));console.log({errors});if(errors.length)throw Error(errors.join('\n'));await browser.close();
