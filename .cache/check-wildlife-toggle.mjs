import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match',{waitUntil:'networkidle'});
 const result=await page.evaluate(async()=>{
  const [{ThreeArena},{PrototypeHost},{Match}]=await Promise.all([import('/src/render-three/ThreeArena.ts'),import('/src/presentation/PrototypeHost.ts'),import('/src/game/Match.ts')]);
  const container=document.createElement('div');container.style.cssText='width:800px;height:450px';document.body.append(container);
  const view=new ThreeArena(container),host=new PrototypeHost(()=>new Match({ai:false,waves:false}),view);
  host.update(0);const enabled=view.poros.group.visible&&view.ravens.group.visible;
  view.wildlifeEnabled=false;host.update(0);const disabled=!view.poros.group.visible&&!view.ravens.group.visible;
  view.wildlifeEnabled=true;host.update(0);const restored=view.poros.group.visible&&view.ravens.group.visible;
  view.presentation='gray';host.update(0);const grayHidden=!view.poros.group.visible&&!view.ravens.group.visible;
  host.dispose();container.remove();return {enabled,disabled,restored,grayHidden};
 });console.log(JSON.stringify({...result,errors}));if(Object.values(result).some(v=>!v)||errors.length)process.exitCode=1;
}finally{await browser.close()}
