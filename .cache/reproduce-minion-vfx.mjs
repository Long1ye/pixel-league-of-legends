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
await page.waitForTimeout(1000);await page.evaluate(()=>window.vfxCheck.host.update(0));await page.screenshot({path:'.cache/minion-vfx-before.png'});
console.log(await page.evaluate(()=>{const {view,host,target}=window.vfxCheck;return {targetHp:target.hp,cards:view.combat.sprites.group.children.filter(c=>c.visible).map(c=>({name:c.name,depthTest:c.material.depthTest})),time:host.match.time};}));
console.log({errors});await browser.close();
