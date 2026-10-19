import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const {chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output='docs/visual-validation/2026-10-19/minion-aggro';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{
  document.querySelector('#pause').click();
  const [{ThreeArena},{PrototypeHost},{Match},{createCombatPractice},{bridgePoint}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts'),import('/src/game/CombatPractice.ts'),import('/src/game/Bridge.ts')]);
  const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100;background:#111c2b';document.body.append(container);
  const view=new ThreeArena(container);let factory=()=>new Match({ai:false,waves:false});const host=new PrototypeHost(()=>factory(),view);
  const tick=(n=1)=>{for(let i=0;i<n;i++)host.update(1/120);};
  const cards=()=>view.combat.sprites.group.children.filter(c=>c.visible&&c.name.startsWith('minion-')).map(c=>({name:c.name,y:c.position.y,angle:c.rotation.z,opacity:c.material.opacity}));
  const start=(team,kind,targetKind='hero')=>{
   factory=()=>new Match({ai:false,waves:false});host.restart();const center=bridgePoint(0),sign=team==='blue'?1:-1,opponent=team==='blue'?'red':'blue';
   for(const team of ['blue','red'])Object.assign(host.match.hero(team),{x:100,y:100,speed:0,damage:0});
   const source=host.match.spawnMinion(team,kind,{x:center.x-sign*32,y:center.y});
   const point={x:center.x+sign*(targetKind==='hero'?28:kind==='melee'?-14:28),y:center.y};
   const target=targetKind==='hero'?host.match.hero(opponent):host.match.spawnMinion(opponent,'melee',point);
   Object.assign(target,point,{speed:0,damage:0,hp:2000,maxHp:2000,flow:0});
   view.cameraRig.setElevation(60);view.cameraRig.setZoom(.75);view.cameraRig.lookAt({x:center.x,y:center.y-20});tick(2);
   return {sourceId:source.id,targetId:target.id};
  };
  window.minionReview={view,host,tick,cards,start,records:[],createCombatPractice,setFactory:f=>factory=f};tick();await new Promise(r=>setTimeout(r,800));
 });
 for(const team of ['blue','red'])for(const kind of ['melee','ranged'])for(const targetKind of ['hero','melee']){
  await page.evaluate(args=>{const r=window.minionReview;r.ids=r.start(...args);},[team,kind,targetKind]);
  const stages=kind==='ranged'?['notice','windup','release','flight','impact','sparks','clear']:['notice','windup','impact','sparks','clear'];
  for(const stage of stages){
   const record=await page.evaluate(({stage,team,kind,targetKind})=>{
    const r=window.minionReview,{host,tick,cards,ids}=r,source=host.match.entity(ids.sourceId),target=host.match.entity(ids.targetId);let success=false;
    for(let n=0;n<600;n++){
     const shot=host.match.projectiles.find(s=>s.sourceId===source.id),age=host.match.time-(source.attackReleasedAt??1e9);
     success=stage==='notice'?source.targetId===target.id:stage==='windup'?source.windup>0:stage==='release'?source.attacksReleased>0:stage==='flight'?!!shot&&age>.08:stage==='impact'?target.hp<2000:stage==='sparks'?host.match.time-r.hitAt>.065:host.match.time-r.hitAt>.24;
     if(success)break;tick();
    }
    if(!success)throw new Error(`Missing ${team} ${kind} ${targetKind} ${stage}`);
    if(stage==='impact')r.hitAt=host.match.time;host.update(0);
    const result={team,kind,targetKind,stage,time:host.match.time,hp:target.hp,attacks:source.attacksReleased,targetId:source.targetId,cards:cards()};r.records.push(result);return result;
   },{stage,team,kind,targetKind});
   await page.screenshot({path:`${output}/${team}-${kind}-${targetKind}-${stage}.jpg`});
   if(stage==='flight'&&!record.cards.some(c=>c.name==='minion-caster-bolt'))throw new Error('Caster missile invisible');
   if(stage==='impact'&&!record.cards.some(c=>c.name===`minion-${kind==='ranged'?'caster':'melee'}-contact`))throw new Error('Minion contact invisible');
  }
 }
 const report=await page.evaluate(()=>{
  const r=window.minionReview;r.setFactory(r.createCombatPractice);r.host.restart();r.tick(2);const hero=r.host.match.hero('blue'),units=r.host.match.entities.filter(e=>e.kind==='melee'||e.kind==='ranged');
  const from=hero.hp;for(let i=0;i<720;i++)r.tick();const practice={before:from,after:hero.hp,units:units.map(e=>({kind:e.kind,damage:e.damage,speed:e.speed,released:e.attacksReleased,targetId:e.targetId}))};
  r.ids=r.start('red','ranged');for(let i=0;i<240&&!r.cards().some(c=>c.name==='minion-caster-bolt');i++)r.tick();
  r.host.pause();r.host.update(0);const before=JSON.stringify(r.cards()),time=r.host.match.time;r.tick(120);const paused=time===r.host.match.time&&before===JSON.stringify(r.cards());
  r.host.restart();r.tick(2);const cleared=r.cards().length===0;const result={records:r.records,practice,paused,cleared,errors:[...r.view.combat.sprites.errors,...r.view.sprites.errors]};r.host.dispose();return result;
 });
 await writeFile(`${output}/report.json`,JSON.stringify({...report,errors:[...errors,...report.errors]},null,2));
 if(report.practice.after>=report.practice.before||!report.practice.units.some(e=>e.kind==='ranged'&&e.released>0)||!report.paused||!report.cleared||errors.length||report.errors.length)throw new Error('Minion browser checks failed');
 console.log(JSON.stringify({frames:report.records.length,practice:report.practice,paused:report.paused,cleared:report.cleared,errors}));
}finally{await browser.close();}
