import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/tower-flag-isolation';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=central', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { crystalAnchor }, { toSimulation }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'),
      import('/src/render-three/CrystalMotes.ts'), import('/src/render-three/Coordinates.ts')]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match({ ai: false, waves: false }), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.95); view.landmarks.towerFloatEnabled = false; host.update(0);
    const towers = ['blue','red'].map(team => view.landmarks.group.children.find(o => o.name === 'painted-tower' && o.userData.team === team));
    const clocks = [];
    towers.forEach((tower, i) => {
      const previous = tower.material.onBeforeCompile;
      tower.material.onBeforeCompile = (shader, renderer) => { previous.call(tower.material, shader, renderer); shader.uniforms.crystalTime = { value: 2 }; clocks[i] = shader.uniforms.towerFlagTime; };
      tower.material.needsUpdate = true;
    });
    const project = (tower,u,v) => { const p = crystalAnchor(tower,u,v); tower.updateWorldMatrix(true,false); p.applyMatrix4(tower.matrixWorld).project(view.cameraRig.camera); return { x:(p.x+1)*view.renderer.domElement.width/2, y:(1-p.y)*view.renderer.domElement.height/2 }; };
    function render(index,time) {
      const tower = towers[index], p = crystalAnchor(tower,.5,.5); tower.updateWorldMatrix(true,false); p.applyMatrix4(tower.matrixWorld); p.z -= p.y; p.y=0; view.cameraRig.lookAt(toSimulation(p));
      for (const child of view.scene.children) child.visible = child === view.landmarks.group;
      for (const child of view.landmarks.group.children) child.visible = child === tower;
      for (const child of tower.children) child.visible = false;
      view.renderer.setClearColor(0x16202b); view.renderer.render(view.scene,view.cameraRig.camera);
      clocks[index].value=time; view.renderer.render(view.scene,view.cameraRig.camera);
    }
    window.flagCheck = { view,host,towers,render,project };
  });
  await page.waitForTimeout(1500);
  const report = await page.evaluate(() => {
    const {view,towers,render,project}=window.flagCheck, gl=view.renderer.getContext(), w=gl.drawingBufferWidth,h=gl.drawingBufferHeight;
    const read=()=>{const p=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,p);return p;};
    return towers.map((tower,index)=>{
      render(index,0); const base=read(), tl=project(tower,.28125,.58), br=project(tower,.71875,.42); let stoneChanges=0, flagChanges=0, pausedChanges=0;
      for(let frame=1;frame<=24;frame++){
        render(index,frame/12);const next=read();
        for(let y=0;y<h;y++)for(let x=0;x<w;x++){
          const i=((h-1-y)*w+x)*4,delta=Math.max(Math.abs(base[i]-next[i]),Math.abs(base[i+1]-next[i+1]),Math.abs(base[i+2]-next[i+2]));
          if(delta<=2)continue;
          if(x>tl.x+2&&x<br.x-2&&y>tl.y+2&&y<br.y-2)stoneChanges++;else flagChanges++;
        }
        if(frame===24){render(index,frame/12);const frozen=read();for(let i=0;i<next.length;i+=4)if(Math.max(Math.abs(next[i]-frozen[i]),Math.abs(next[i+1]-frozen[i+1]),Math.abs(next[i+2]-frozen[i+2]))>2)pausedChanges++;}
      }
      return {team:tower.userData.team,stoneChanges,flagChanges,pausedChanges,stoneRegion:{tl,br},note:'Only flag clock advances; crystal shading and floating crown held fixed.'};
    });
  });
  for(let team=0;team<2;team++)for(let frame=0;frame<16;frame++){
    await page.evaluate(({team,frame})=>window.flagCheck.render(team,frame/8),{team,frame});
    await page.screenshot({path:`${output}/${team?'red':'blue'}-${String(frame).padStart(2,'0')}.jpg`,type:'jpeg',quality:90});
  }
  const failures=report.filter(r=>r.stoneChanges>0||r.flagChanges<100||r.pausedChanges>0).map(r=>r.team);
  await page.evaluate(()=>window.flagCheck.host.dispose());
  await writeFile(`${output}/report.json`,JSON.stringify({report,errors,failures},null,2));
  await writeFile(`${output}/preview.html`,`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>塔旗隔离修复</title><style>body{margin:0;background:#16202b;color:#dae5ef;font:16px system-ui}header{padding:14px}img{display:block;max-width:100%;margin:auto}button,select{padding:8px;margin-right:12px}</style><header><button id="play">暂停</button><select id="team"><option value="blue">蓝方塔旗</option><option value="red">红方塔旗</option></select>旗布运动隔离近景 · 水晶发光/悬浮冻结以检查塔身 · 8 张/秒采样，非性能基准</header><img id="frame" src="blue-00.jpg"><script>let frame=0,play=true;const img=document.querySelector('#frame'),team=document.querySelector('#team');function show(){img.src=team.value+'-'+String(frame).padStart(2,'0')+'.jpg'}document.querySelector('#play').onclick=e=>{play=!play;e.target.textContent=play?'暂停':'播放'};team.onchange=show;setInterval(()=>{if(play){frame=(frame+1)%16;show()}},125)</script></html>`);
  console.log(JSON.stringify({report,errors,failures})); if(errors.length||failures.length)process.exitCode=1;
} finally { await browser.close(); }
