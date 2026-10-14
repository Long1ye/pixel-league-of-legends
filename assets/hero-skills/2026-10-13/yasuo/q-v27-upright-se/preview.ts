import bodyUrl from './body.png?url';
import upperUrl from '../q-v22-natural-arm-sword/components/component_002.png?url';
import foreUrl from '../q-v22-natural-arm-sword/components/component_003.png?url';
import swordUrl from '../q-v25-user-sword-subtle/sword.webp?url';
import {drawSword} from '../q-v26-user-eight/sword';
import {compactPoseAt} from './motion';
type Point={x:number;y:number};
type Frame=CanvasImageSource & {close():void};
type Decoder={tracks:{ready:Promise<void>;selectedTrack:{frameCount:number}};decode(o:{frameIndex:number}):Promise<{image:Frame}>;close():void};
const el=(id:string)=>document.getElementById(id)!;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
async function init(){
 const [body,upper,fore]=await Promise.all([bodyUrl,upperUrl,foreUrl].map(load));
 const Decode=(window as unknown as {ImageDecoder:new(o:{data:ArrayBuffer;type:string})=>Decoder}).ImageDecoder;
 const decoder=new Decode({data:await(await fetch(swordUrl)).arrayBuffer(),type:'image/webp'});await decoder.tracks.ready;
 const frames:Frame[]=[];for(let i=0;i<decoder.tracks.selectedTrack.frameCount;i++)frames.push((await decoder.decode({frameIndex:i})).image);decoder.close();
 window.addEventListener('pagehide',()=>frames.forEach(f=>f.close()),{once:true});
 const c=(el('stage') as HTMLCanvasElement).getContext('2d')!;
 let time=0,last=0,running=true;
 function draw(){
  const t=Math.min(time,480),{shoulder,wrist,elbow,lean:p,swordAngle}=compactPoseAt(t);
  c.clearRect(0,0,360,280);c.imageSmoothingEnabled=false;c.save();c.translate(40,34);
  function part(img:HTMLImageElement,s:Point,e:Point,a:Point,b:Point){const scale=Math.hypot(e.x-s.x,e.y-s.y)/Math.hypot(b.x-a.x,b.y-a.y);c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x));c.scale(scale,scale);c.rotate(-Math.atan2(b.y-a.y,b.x-a.x));c.drawImage(img,-a.x,-a.y);c.restore();}
  const only=(el('bodyOnly') as HTMLInputElement).checked;
  if(!only)part(upper,shoulder,elbow,{x:43,y:40},{x:154,y:178});
  // Pivot the body around the planted feet, keeping its baseline and scale stable.
  c.save();c.translate(60,121);c.transform(1,0,-p*.018,1,0,0);c.drawImage(body,-60,-121,114,138);c.restore();
  if(!only){
   c.save();c.translate(wrist.x,wrist.y);c.rotate(swordAngle);c.scale(.51,.56);drawSword(c,frames[t>=480?0:Math.min(frames.length-1,Math.floor(t/480*frames.length))]);c.restore();
   part(fore,elbow,wrist,{x:32,y:32},{x:162,y:184});
   if((el('joints') as HTMLInputElement).checked){c.strokeStyle='#ffda86';c.beginPath();c.moveTo(shoulder.x,shoulder.y);c.lineTo(elbow.x,elbow.y);c.lineTo(wrist.x,wrist.y);c.stroke();}
  }
  c.restore();(el('scrub') as HTMLInputElement).value=String(t);el('status').textContent=`右下 · ${Math.round(t)} / 480 ms · ${running?'循环播放':'暂停'} · 身体 / 手臂 / 武器独立分层`;
 }
 el('play').onclick=()=>{time=0;running=true;};el('pause').onclick=()=>{running=!running;};
 (el('scrub') as HTMLInputElement).oninput=()=>{running=false;time=Number((el('scrub') as HTMLInputElement).value);draw();};
 function tick(now:number){if(running)time+=(last?Math.min(now-last,100):0)*Number((el('speed') as HTMLSelectElement).value);last=now;if(time>1250)time=0;draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>{el('status').textContent=`加载失败：${e}`;});
