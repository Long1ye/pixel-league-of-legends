import atlasUrl from './runtime/wind-wall-atlas.png?url';
import layout from './runtime/layout.json';
import {drawWindWall,WIND_WALL_CANVAS} from '../../../src/render/WindWallArt';
import {W_DURATION,WIND_WALL} from '../../../src/game/WindWall';
const canvas=document.querySelector<HTMLCanvasElement>('#stage')!,ctx=canvas.getContext('2d')!;
const buffer=document.createElement('canvas');buffer.width=buffer.height=WIND_WALL_CANVAS.size;
const ink=buffer.getContext('2d')!,image=new Image();image.src=atlasUrl;
const angle=document.querySelector<HTMLInputElement>('#angle')!,phase=document.querySelector<HTMLOutputElement>('#phase')!;
let time=0,last=0,paused=false;
document.querySelector<HTMLButtonElement>('#pause')!.onclick=e=>{paused=!paused;(e.target as HTMLElement).textContent=paused?'继续':'暂停';};
document.querySelector<HTMLButtonElement>('#restart')!.onclick=()=>{time=0;};
document.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(button=>button.onclick=()=>{angle.value=button.dataset.angle!;});
function render(now:number){
 if(last&&!paused)time+=(now-last)/1000;last=now;
 const age=time%(W_DURATION+.65);
 ctx.fillStyle='#142c3b';ctx.fillRect(0,0,900,560);ctx.strokeStyle='#274655';ctx.lineWidth=1;
 for(let x=-600;x<1500;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+560,560);ctx.stroke();ctx.beginPath();ctx.moveTo(x,560);ctx.lineTo(x+560,0);ctx.stroke();}
 ink.clearRect(0,0,256,256);
 if(image.complete&&image.naturalWidth)drawWindWall(ink,{center:{x:0,y:0},angle:Number(angle.value),width:WIND_WALL.width,height:WIND_WALL.height,thickness:WIND_WALL.thickness},
  {origin:{x:128,y:176},groundScale:1},age*1000,age*1000,{image,...layout});
 ctx.imageSmoothingEnabled=false;ctx.drawImage(buffer,194,24,512,512);
 phase.textContent=`${Number(angle.value)}° · ${age<.32?'升起':age<W_DURATION-.45?'流动':age<W_DURATION?'消散':'结束'}`;
 requestAnimationFrame(render);
}
requestAnimationFrame(render);
