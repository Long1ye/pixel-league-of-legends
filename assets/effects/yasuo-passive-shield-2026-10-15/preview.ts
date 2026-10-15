import atlasUrl from './runtime/shield-atlas.png?url';
import layout from './runtime/layout.json';
import {passiveShieldPose} from '../../../src/render/PassiveShieldPose';
const canvas=document.querySelector<HTMLCanvasElement>('#stage')!,ctx=canvas.getContext('2d')!,atlas=new Image();atlas.src=atlasUrl;
let time=0,last=0,paused=false,brokenAt:number|undefined;
document.querySelector<HTMLButtonElement>('#restart')!.onclick=()=>{time=0;brokenAt=undefined;};
document.querySelector<HTMLButtonElement>('#break')!.onclick=()=>{if(time<1)brokenAt=time;};
document.querySelector<HTMLButtonElement>('#pause')!.onclick=e=>{paused=!paused;(e.target as HTMLElement).textContent=paused?'继续':'暂停';};
function render(now:number){
 if(last&&!paused)time+=(now-last)/1000;last=now;
 if(time>1.8){time=0;brokenAt=undefined;}
 const pose=passiveShieldPose(time,0,1,brokenAt);ctx.clearRect(0,0,512,512);ctx.imageSmoothingEnabled=false;
 if(atlas.complete&&atlas.naturalWidth&&pose.active){
  const h=384*pose.scale,w=h*layout.width/layout.height;
  ctx.globalAlpha=pose.alpha;ctx.drawImage(atlas,pose.frame%4*layout.width,Math.floor(pose.frame/4)*layout.height,layout.width,layout.height,(512-w)/2,448-h,w,h);ctx.globalAlpha=1;
 }
 requestAnimationFrame(render);
}
requestAnimationFrame(render);
