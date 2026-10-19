import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1600,height:960}}), errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/tower-float/motion.html');
 const videos=[];
 for(const team of ['blue','red']){
  await page.selectOption('#team',team);await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
  await page.evaluate(async()=>{const v=document.querySelector('video');v.loop=false;v.playbackRate=8;v.currentTime=0;await v.play()});
  await page.waitForFunction(()=>document.querySelector('video').ended,{},{timeout:15000});
  videos.push(await page.evaluate(team=>({team,duration:document.querySelector('video').duration,ended:document.querySelector('video').ended}),team));
 }
 await page.selectOption('#team','original');await page.waitForFunction(()=>document.querySelector('#frame').complete&&document.querySelector('#frame').naturalWidth===1600);
 await page.route('**/@vite/client',r=>r.fulfill({contentType:'application/javascript',body:'export function createHotContext(){return {accept(){},dispose(){},prune(){},on(){},off(){},send(){},invalidate(){},data:{}}} export function updateStyle(){} export function removeStyle(){}'}));
 await page.route('**/src/main-three.ts',r=>r.fulfill({contentType:'application/javascript',body:''}));
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match');
 const crown=await page.evaluate(async()=>{
  const [{ThreeArena},{PrototypeHost},{Match},{bridgePoint},{Vector3}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts'),import('/src/game/Bridge.ts'),import('/node_modules/.vite/deps/three.js')]);
  const container=document.createElement('div');container.style.cssText='position:fixed;inset:0;z-index:100';document.body.append(container);
  const view=new ThreeArena(container), host=new PrototypeHost(()=>new Match({ai:false,waves:false}),view);
  view.cameraRig.setElevation(45);view.cameraRig.setZoom(.6);view.cameraRig.lookAt(bridgePoint(-225,-15));
  host.match.time=3.285;host.update(0);
  const tower=host.match.tower('blue'), root=view.landmarks.group.children.find(o=>o.name==='painted-tower'&&o.userData.team==='blue'), crystal=root.children[0];
  const uv=crystal.geometry.getAttribute('uv'),pos=crystal.geometry.getAttribute('position');let nearest=0,distance=Infinity;
  for(let i=0;i<uv.count;i++){const d=(uv.getX(i)-.5)**2+(uv.getY(i)-1)**2;if(d<distance){nearest=i;distance=d}}
  const p=new Vector3().fromBufferAttribute(pos,nearest);crystal.localToWorld(p);p.project(view.cameraRig.camera);
  const rect=view.renderer.domElement.getBoundingClientRect(),x=(p.x+1)*rect.width/2+rect.left,y=(1-p.y)*rect.height/2+rect.top;
  const selected=view.pickActor({x,y}),bar=view.healthBars.element.querySelector(`[data-entity-id="${tower.id}"]`).getBoundingClientRect();
  const result={crownSelected:selected===tower.id,healthBarClear:bar.bottom+4<y,gap:y-bar.bottom};host.dispose();container.remove();return result;
 });
 console.log(JSON.stringify({videos,crown,errors}));if(errors.length||!crown.crownSelected||!crown.healthBarClear)process.exitCode=1;
}finally{await browser.close()}
