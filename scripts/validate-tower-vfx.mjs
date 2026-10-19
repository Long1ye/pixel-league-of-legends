import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output='docs/visual-validation/2026-10-19/tower-vfx';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1600,height:1100}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{
  document.querySelector('#pause').click();
  const [{ThreeArena},{PrototypeHost},{Match}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts')]);
  const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100;background:#111c2b';document.body.append(container);
  const view=new ThreeArena(container),host=new PrototypeHost(()=>new Match({ai:false,waves:false}),view);
  const tick=(n=1)=>{for(let i=0;i<n;i++)host.update(1/120);};
  const cards=()=>view.combat.sprites.group.children.filter(c=>c.visible&&c.name.startsWith('tower-')).map(c=>({name:c.name,x:c.position.x,y:c.position.y,z:c.position.z,angle:c.rotation.z,opacity:c.material.opacity}));
  const start=(team,kind='hero',elevation=60)=>{
   host.restart();const source=host.match.tower(team),opponent=team==='red'?'blue':'red',sign=team==='red'?-1:1;
   const point={x:source.x+sign*155,y:source.y-sign*45};
   for(const side of ['blue','red'])Object.assign(host.match.hero(side),{x:100,y:100,speed:0,damage:0});
   const target=kind==='hero'?host.match.hero(opponent):host.match.spawnMinion(opponent,'melee',point);
   Object.assign(target,point,{hp:4000,maxHp:4000,speed:0,damage:0});
   view.cameraRig.setElevation(elevation);view.cameraRig.setZoom(.5);view.cameraRig.lookAt({x:source.x+sign*55,y:source.y-85});
   tick(2);return {sourceId:source.id,targetId:target.id};
  };
  window.towerReview={view,host,tick,cards,start,records:[]};tick();await new Promise(r=>setTimeout(r,800));
 });
 for(const team of ['red','blue'])for(const kind of ['hero','melee']){
  await page.evaluate(({team,kind})=>{const r=window.towerReview;r.ids=r.start(team,kind);}, {team,kind});
  for(const stage of ['windup','launch','flight','near','impact','fade','cleared']){
   const record=await page.evaluate(({stage,team,kind})=>{
    const r=window.towerReview,{host,tick,cards,ids}=r,source=host.match.entity(ids.sourceId),target=host.match.entity(ids.targetId);
    let satisfied=false;
    for(let n=0;n<300;n++){
     const shot=host.match.projectiles.find(s=>s.sourceId===source.id),age=host.match.time-(source.attackReleasedAt??1e9);
     satisfied=stage==='windup'?source.windup>0:stage==='launch'?!!shot:stage==='flight'?!!shot&&age>.25:stage==='near'?!!shot&&Math.hypot(shot.x-target.x,shot.y-target.y)<45:stage==='impact'?target.hp<4000:stage==='fade'?host.match.time-r.hitAt>.15:host.match.time-r.hitAt>.27;
     if(satisfied)break;tick();
    }
    if(!satisfied)throw new Error(`Missing stage ${team} ${kind} ${stage}`);
    if(stage==='impact')r.hitAt=host.match.time;host.update(0);
    const record={team,kind,stage,time:host.match.time,hp:target.hp,cards:cards()};r.records.push(record);return record;
   },{stage,team,kind});
   await page.screenshot({path:`${output}/${team}-${kind}-${stage}.jpg`});
   if(stage==='impact'&&!record.cards.some(c=>c.name==='tower-energy-impact'))throw new Error('Missing real damage impact');
  }
 }
 const report=await page.evaluate(()=>{
  const r=window.towerReview;r.start('red');for(let i=0;i<120&&!r.cards().some(c=>c.name==='tower-energy-bolt');i++)r.tick();
  r.host.pause();r.host.update(0);const before=JSON.stringify(r.cards()),time=r.host.match.time;r.tick(120);const paused=time===r.host.match.time&&before===JSON.stringify(r.cards());
  r.host.restart();r.tick(2);const cleared=r.cards().length===0;const result={records:r.records,paused,cleared,errors:[...r.view.combat.sprites.errors,...r.view.landmarks.errors]};r.host.dispose();return result;
 });
 await writeFile(`${output}/report.json`,JSON.stringify({...report,errors:[...errors,...report.errors]},null,2));
 if(!report.paused||!report.cleared||errors.length||report.errors.length)throw new Error('Tower runtime verification failed');
 console.log(JSON.stringify({frames:report.records.length,paused:report.paused,cleared:report.cleared,errors}));
}finally{await browser.close();}
