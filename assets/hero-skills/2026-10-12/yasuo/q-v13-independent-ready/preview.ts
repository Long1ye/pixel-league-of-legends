import registry from '../../../../heroes/yasuo/selected-2026-10-10/animations.json';
import windData from './animation.json';
import windUrl from './media/e-atlas.png?url';
import clipUrl from './media/e.webp?url';
import { DIRECTIONS, headingToDirection, type SpriteDirection } from '../../../../hero-walk-directions/2026-10-09/v1/direction';
const urls = import.meta.glob('../../../../heroes/yasuo/selected-2026-10-10/*.png', {eager:true,query:'?url',import:'default'}) as Record<string,string>;
const $ = <T extends HTMLElement>(id:string) => document.getElementById(id) as T;
const canvas=$<HTMLCanvasElement>('scene'),ctx=canvas.getContext('2d')!;
let facing:SpriteDirection='e',bodyMs=0,windMs=0,previous=0,paused=false,windOn=true;
const position={x:280,y:240};
function load(url:string){return new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('素材加载失败'));image.src=url;});}
function frameAt(time:number,durations:number[]){let remaining=time%durations.reduce((a,b)=>a+b,0);for(let i=0;i<durations.length;i++){remaining-=durations[i];if(remaining<0)return i;}return 0;}
function setFacing(dir:SpriteDirection){facing=dir;document.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dir===dir)));}
async function main(){
 const wind=await load(windUrl);const characters=new Map<string,HTMLImageElement>();
 await Promise.all(registry.locomotion.map(async clip=>{const url=urls[`../../../../heroes/yasuo/selected-2026-10-10/${clip.sheet}`];if(!url)throw new Error(`缺少人物素材 ${clip.sheet}`);characters.set(clip.key,await load(url));}));
 $<HTMLImageElement>('clip').src=clipUrl;$<HTMLAnchorElement>('download').href=clipUrl;
 document.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach(b=>b.onclick=()=>setFacing(b.dataset.dir as SpriteDirection));
 $('pause').onclick=()=>{paused=!paused;};$('windToggle').onclick=()=>{windOn=!windOn;};$('reset').onclick=()=>{position.x=280;position.y=240;};
 function drawWind(front:boolean){if(!windOn||$<HTMLSelectElement>('layers').value==='body')return;
  const f=frameAt(windMs,windData.durations),x=Math.round(position.x-windData.width/2),y=Math.round(position.y-windData.height+12),split=Math.round(position.y-32);
  ctx.save();ctx.beginPath();ctx.rect(0,front?split:0,560,front?360-split:split);ctx.clip();
  ctx.drawImage(wind,f%windData.columns*windData.width,Math.floor(f/windData.columns)*windData.height,windData.width,windData.height,x,y,windData.width,windData.height);ctx.restore();
 }
 function draw(){ctx.imageSmoothingEnabled=false;ctx.fillStyle='#182e37';ctx.fillRect(0,0,560,360);ctx.strokeStyle='#29434d';
  for(let x=0;x<560;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();}for(let y=0;y<360;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(560,y);ctx.stroke();}
  const state=$<HTMLSelectElement>('motion').value;const clip=registry.locomotion.find(c=>c.state===state&&c.direction===facing)!;const bf=frameAt(bodyMs,clip.durations_ms);
  if($<HTMLSelectElement>('layers').value!=='wind'){ctx.fillStyle='#08192390';ctx.beginPath();ctx.ellipse(position.x,position.y,27,8,0,0,Math.PI*2);ctx.fill();}
  drawWind(false);
  if($<HTMLSelectElement>('layers').value!=='wind')ctx.drawImage(characters.get(clip.key)!,bf%clip.columns*clip.width,Math.floor(bf/clip.columns)*clip.height,clip.width,clip.height,Math.round(position.x-clip.anchor[0]),Math.round(position.y-clip.anchor[1]),clip.width,clip.height);
  drawWind(true);$('status').textContent=`人物：${state==='walk'?'行走':'待机'} ${facing} · 帧 ${bf+1}｜蓄风：${windOn?'开启':'关闭'} · 帧 ${frameAt(windMs,windData.durations)+1}｜风时钟 ${Math.floor(windMs)}ms`;
  $('pause').textContent=paused?'全部继续':'全部暂停';$('windToggle').textContent=windOn?'关闭蓄风':'开启蓄风';
 }
 function tick(now:number){const dt=previous?Math.min(100,now-previous):0;previous=now;
  if(!paused){windMs+=dt*Number($<HTMLSelectElement>('windSpeed').value);
   if(!$<HTMLInputElement>('bodyPaused').checked){bodyMs+=dt;
    if($<HTMLSelectElement>('motion').value==='walk'&&$<HTMLInputElement>('moving').checked){const theta=DIRECTIONS.indexOf(facing)*Math.PI/4;let dx=Math.cos(theta),dy=Math.sin(theta);
     if(position.x+dx*dt*.045<150||position.x+dx*dt*.045>410)dx=-dx;if(position.y+dy*dt*.045<170||position.y+dy*dt*.045>285)dy=-dy;
     setFacing(headingToDirection(Math.atan2(dy,dx)));position.x+=dx*dt*.045;position.y+=dy*dt*.045;
    }
   }
  }draw();requestAnimationFrame(tick);
 }setFacing('e');requestAnimationFrame(tick);
}
main().catch(error=>{$('status').textContent=error.message;});
