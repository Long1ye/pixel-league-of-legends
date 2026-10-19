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

const samples=await page.evaluate(async()=>{
 const {view,host}=window.vfxCheck;
 const run=async move=>{host.restart();host.update(0);const h=host.match.hero('blue'),target=host.match.entities.find(e=>e.kind==='melee'),start={x:h.x,y:h.y};
  host.command({kind:'cast',ability:'q',point:target});const result=[];
  for(let tick=1;tick<=50;tick++){
   if(move&&tick===13)host.command({kind:'move',point:{x:start.x-70,y:start.y+60}});
   host.update(1/60); if(tick===45)await new Promise(r=>setTimeout(r,1500));
   if([33,39,42,48].includes(tick)){
    const body=view.sprites.body(h.id),q=view.combat.sprites.group.children.find(c=>c.visible&&c.name==='combat-qSword');
    result.push({tick,time:host.match.time,gameplayQ:!!h.qCast,x:h.x,body:body.material.map.image.src,uv:Array.from(body.geometry.getAttribute('uv').array),sword:!!q,hp:target.hp});
   }
  }return {start,result};
 };
 const idle=await run(false),moving=await run(true);
 for(let i=0;i<3;i++){
  if(idle.result[i].body!==moving.result[i].body||JSON.stringify(idle.result[i].uv)!==JSON.stringify(moving.result[i].uv))throw Error('Q pose was cut short during movement');
 }
 if(moving.result[0].gameplayQ||moving.result[0].x>=moving.start.x)throw Error('Movement did not resume before Q visual ended');
 if(!moving.result[0].sword)throw Error('Sword flash was cut short');
 if(moving.result[3].sword||moving.result[3].body===moving.result[0].body)throw Error('Q visual did not return to movement');
 if(idle.result.at(-1).hp!==moving.result.at(-1).hp)throw Error('Q damage changed');
 return {idle,moving};
});
await page.screenshot({path:'.cache/q-after-move.png'});
console.log(JSON.stringify({samples,errors}));if(errors.length)throw Error(errors.join('\n'));await browser.close();

