import sourceUrl from './source.png?url';
import {poseAt,DURATION,type Point} from './rig';
import {weaponFrame,gripForFrame,WEAPON} from '../../../2026-10-12/yasuo/q-v11-eight-wind-blade/weapon';
const urls=import.meta.glob('../../../2026-10-12/yasuo/q-v10-sword-wind-only/media/frames/frame-*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const $=(id:string)=>document.getElementById(id)!;
const canvas=$('stage') as HTMLCanvasElement,c=canvas.getContext('2d')!;
const enabled=(id:string)=>($ (id) as HTMLInputElement).checked;
const load=(url:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
let elapsed=0,playing=true,loop=false,last=0;
function polygon(ctx:CanvasRenderingContext2D,points:number[][]){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();}
// Disjoint source-pixel pieces. No generated replacement skin or painted filler.
const upperMask=[[9,51],[24,51],[22,62],[9,64]];
const lowerMask=[[9,63],[22,62],[21,78],[9,78]];
async function init(){
 const source=await load(sourceUrl),frames=await Promise.all(Object.entries(urls).sort(([a],[b])=>a.localeCompare(b)).map(([,url])=>load(url)));
 ($('reference') as HTMLImageElement).src=sourceUrl;($('reference') as HTMLImageElement).style.width=`${source.width*2}px`;
 function piece(mask:number[][]|null){const v=document.createElement('canvas');v.width=source.width;v.height=source.height;const ctx=v.getContext('2d')!;if(mask){polygon(ctx,mask);ctx.clip();}ctx.drawImage(source,0,0);return v;}
 const body=piece(null),upper=piece(upperMask),lower=piece(lowerMask),bc=body.getContext('2d')!;
 bc.globalCompositeOperation='destination-out';for(const mask of [upperMask,lowerMask]){polygon(bc,mask);bc.fill();}
 function arm(image:HTMLCanvasElement,start:Point,end:Point,nativeStart:Point,nativeEnd:Point){
   c.save();c.translate(start.x,start.y);c.rotate(Math.atan2(end.y-start.y,end.x-start.x)-Math.atan2(nativeEnd.y-nativeStart.y,nativeEnd.x-nativeStart.x));c.drawImage(image,-nativeStart.x,-nativeStart.y);c.restore();
 }
 function draw(){
   const p=poseAt(elapsed);c.clearRect(0,0,280,200);c.imageSmoothingEnabled=false;c.save();c.translate(80,35);
   if(enabled('body')){
     c.save();c.beginPath();c.rect(0,73,66,40);c.clip();c.drawImage(body,0,0);c.restore();
     c.save();c.transform(1,0,-p.p*3/22,1-p.p/22,p.p*3/22*73,p.p/22*73);c.beginPath();c.rect(0,0,66,74);c.clip();c.drawImage(body,0,0);c.restore();
   }
   if(enabled('arm'))arm(upper,p.shoulder,p.elbow,{x:20,y:51},{x:17,y:62});
   if(enabled('sword')){
     const f=weaponFrame(p.t),g=gripForFrame(f),r=WEAPON.source;
     c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(.55,.65);
     c.drawImage(frames[f],r.x,r.y,r.width,r.height,r.x-g.x,r.y-g.y,r.width,r.height);c.restore();
   }
   if(enabled('arm'))arm(lower,p.elbow,p.wrist,{x:17,y:62},{x:16,y:72});
   if(enabled('joints')){c.strokeStyle='#f6c879';c.beginPath();c.moveTo(p.shoulder.x,p.shoulder.y);c.lineTo(p.elbow.x,p.elbow.y);c.lineTo(p.wrist.x,p.wrist.y);c.stroke();for(const v of [p.shoulder,p.elbow,p.wrist]){c.fillStyle='#ffd98a';c.fillRect(v.x-1,v.y-1,2,2);}}
   c.restore();($('scrub') as HTMLInputElement).value=String(Math.min(480,elapsed));$('status').textContent=`${Math.round(Math.min(480,elapsed))} / 480ms · ${playing?'播放中':'暂停'} · 原图像素分层 / 右下`;
 }
 $('once').onclick=()=>{elapsed=0;playing=true;loop=false;};$('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};$('pause').onclick=()=>playing=!playing;
 ($('scrub') as HTMLInputElement).oninput=e=>{elapsed=Number((e.target as HTMLInputElement).value);playing=false;draw();};
 function tick(now:number){const dt=last?Math.min(100,now-last):0;last=now;if(playing){elapsed+=dt*Number(($('speed') as HTMLSelectElement).value);if(elapsed>(loop?1100:DURATION)){if(loop)elapsed=0;else{elapsed=DURATION;playing=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>$('status').textContent=String(e));
