import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/tower-crystal-occlusion';
await mkdir(output,{recursive:true});
const browser=await playwright.chromium.launch({channel:'chrome',headless:true}),errors=[];
try {
  const page=await browser.newPage({viewport:{width:1200,height:900}});
  page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=central',{waitUntil:'networkidle'});
  await openThreeControls(page);await page.locator('#pause').click();await closeThreeControls(page);
  await page.evaluate(async()=>{
    const [{ThreeArena},{PrototypeHost},{Match},{crystalAnchor},{toSimulation}]=await Promise.all([
      import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts'),import('/src/render-three/CrystalMotes.ts'),import('/src/render-three/Coordinates.ts')]);
    const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100;background:#16202b';document.body.append(container);
    const view=new ThreeArena(container),host=new PrototypeHost(()=>new Match({ai:false,waves:false}),view);
    view.renderer.domElement.style.cssText='display:block;width:100%;height:100%';view.cameraRig.setElevation(45);view.cameraRig.setZoom(1.2);host.update(0);
    const towers=['blue','red'].map(team=>view.landmarks.group.children.find(o=>o.name==='painted-tower'&&o.userData.team===team));
    towers.forEach(tower=>[tower,tower.getObjectByName('floating-tower-crystal')].forEach(mesh=>{
      const previous=mesh.material.onBeforeCompile;mesh.material.onBeforeCompile=(shader,renderer)=>{previous.call(mesh.material,shader,renderer);shader.uniforms.crystalTime={value:2};shader.uniforms.towerFlagTime={value:0};};mesh.material.needsUpdate=true;
    }));
    const project=(tower,u,v)=>{const p=crystalAnchor(tower,u,v);tower.updateWorldMatrix(true,false);p.applyMatrix4(tower.matrixWorld).project(view.cameraRig.camera);return{x:(p.x+1)*view.renderer.domElement.width/2,y:(1-p.y)*view.renderer.domElement.height/2};};
    const render=(index,time,visible=true)=>{
      host.match.time=time;host.update(0);const tower=towers[index],p=crystalAnchor(tower,.5,.60);tower.updateWorldMatrix(true,false);p.applyMatrix4(tower.matrixWorld);p.z-=p.y;p.y=0;view.cameraRig.lookAt(toSimulation(p));
      view.scene.children.forEach(o=>o.visible=o===view.landmarks.group);view.landmarks.group.children.forEach(o=>o.visible=o===tower);
      tower.children.forEach(o=>o.visible=o.name==='floating-tower-crystal'&&visible);view.renderer.setClearColor(0x16202b);view.renderer.render(view.scene,view.cameraRig.camera);
    };
    window.occlusion={view,host,towers,project,render};
  });
  await page.waitForTimeout(1400);
  const report=await page.evaluate(()=>{
    const{view,towers,project,render}=window.occlusion,gl=view.renderer.getContext(),w=gl.drawingBufferWidth,h=gl.drawingBufferHeight;
    const read=()=>{const p=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,p);return p;};
    return towers.map((tower,index)=>{
      render(index,0,false);const baseline=read(),left=project(tower,0,1),right=project(tower,1,0),samples=[];
      for(let frame=0;frame<48;frame++){
        render(index,frame/10);const current=read();let changed=0,tested=0,max=0;
        for(let y=0;y<h;y++)for(let x=0;x<w;x++){
          const px=(x-left.x)/(right.x-left.x)*344,py=(y-left.y)/(right.y-left.y)*513;
          if(py<188||py>220||Math.abs(px-172)>(py-177)*.55-3)continue;
          const i=((h-1-y)*w+x)*4,d=Math.max(Math.abs(baseline[i]-current[i]),Math.abs(baseline[i+1]-current[i+1]),Math.abs(baseline[i+2]-current[i+2]));tested++;max=Math.max(max,d);if(d>2)changed++;
        }
        samples.push({time:frame/10,changed,tested,max});
      }
      return{team:tower.userData.team,samples};
    });
  });
  for(let team=0;team<2;team++)for(let frame=0;frame<24;frame++){
    await page.evaluate(({team,frame})=>window.occlusion.render(team,frame/5),{team,frame});
    await page.screenshot({path:`${output}/${team?'red':'blue'}-${String(frame).padStart(2,'0')}.jpg`,type:'jpeg',quality:91});
  }
  const failures=report.filter(r=>r.samples.some(s=>s.changed>0||s.tested<20)).map(r=>r.team+' stone occluded by crystal');
  await page.evaluate(()=>window.occlusion.host.dispose());
  await writeFile(`${output}/report.json`,JSON.stringify({report,errors,failures},null,2));
  await writeFile(`${output}/preview.html`,`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>水晶与石座遮挡修复</title><style>body{margin:0;background:#16202b;color:#dce5ef;font:16px system-ui}header{padding:12px}img{display:block;max-width:100%;margin:auto}button,select{padding:8px;margin-right:12px}</style><header><button id="play">暂停</button><select id="team"><option value="blue">蓝方</option><option value="red">红方</option></select>检查水晶底部与前方石尖 · 发光和旗帜冻结，仅水晶悬浮 · 5 张/秒采样</header><img id="frame" src="blue-00.jpg"><script>let n=0,playing=true;const img=document.querySelector('#frame'),team=document.querySelector('#team');function show(){img.src=team.value+'-'+String(n).padStart(2,'0')+'.jpg'}document.querySelector('#play').onclick=e=>{playing=!playing;e.target.textContent=playing?'暂停':'播放'};team.onchange=show;setInterval(()=>{if(playing){n=(n+1)%24;show()}},200)</script></html>`);
  console.log(JSON.stringify({report:report.map(r=>({team:r.team,maximumChanged:Math.max(...r.samples.map(s=>s.changed)),maximumDifference:Math.max(...r.samples.map(s=>s.max)),tested:r.samples[0].tested})),errors,failures}));
  if(errors.length||failures.length)process.exitCode=1;
}finally{await browser.close();}
