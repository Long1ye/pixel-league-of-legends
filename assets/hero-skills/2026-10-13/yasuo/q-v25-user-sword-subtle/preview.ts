import bodyUrl from '../q-v21-one-arm-body/generated/Edit_this_exact_pixel_character_into_a_body_layer_for_a_thrust_animation_Remove_only_the_thrust_arm_below_the_3a59cc0b/remove_bg.png?url';
import upperUrl from '../q-v22-natural-arm-sword/components/component_002.png?url';
import foreUrl from '../q-v22-natural-arm-sword/components/component_003.png?url';
import swordUrl from './sword.webp?url';
const el=(id:string)=>document.getElementById(id)!;
const ctx=(el('stage') as HTMLCanvasElement).getContext('2d')!;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
type P={x:number,y:number};
type Frame=CanvasImageSource & {close():void};
type Decoder={tracks:{ready:Promise<void>;selectedTrack:{frameCount:number}};decode(opts:{frameIndex:number}):Promise<{image:Frame}>;close():void};
async function init(){
 const [body,upper,fore]=await Promise.all([bodyUrl,upperUrl,foreUrl].map(load));
 const Decode=(window as unknown as {ImageDecoder?:new(o:{data:ArrayBuffer;type:string})=>Decoder}).ImageDecoder;
 if(!Decode)throw new Error('当前浏览器不支持逐帧 WebP 解码，请使用新版 Chromium 浏览器。');
 const response=await fetch(swordUrl);if(!response.ok)throw new Error('剑动画加载失败');
 const decoder=new Decode({data:await response.arrayBuffer(),type:'image/webp'});await decoder.tracks.ready;
 const frames:Frame[]=[];for(let i=0;i<decoder.tracks.selectedTrack.frameCount;i++)frames.push((await decoder.decode({frameIndex:i})).image);decoder.close();
 window.addEventListener('pagehide',()=>frames.forEach(f=>f.close()),{once:true});
 const shoulder={x:53,y:62};
 function part(img:HTMLImageElement,start:P,end:P,a:P,b:P){const scale=Math.hypot(end.x-start.x,end.y-start.y)/Math.hypot(b.x-a.x,b.y-a.y);ctx.save();ctx.translate(start.x,start.y);ctx.rotate(Math.atan2(end.y-start.y,end.x-start.x)-Math.atan2(b.y-a.y,b.x-a.x));ctx.scale(scale,scale);ctx.drawImage(img,-a.x,-a.y);ctx.restore();}
 let time=0,last=0,loop=true,running=true;
 function draw(){
  const t=Math.min(time,480),p=t<150?Math.sin(t/150*Math.PI/2):t<210?1:Math.max(0,(1+Math.cos((t-210)/270*Math.PI))/2);
  const wrist={x:69+p*2.5,y:77+p*2.5};
  const dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y,d=Math.hypot(dx,dy);
  const angle=Math.atan2(dy,dx)+Math.acos((144+d*d-225)/(24*d));
  const elbow={x:shoulder.x+12*Math.cos(angle),y:shoulder.y+12*Math.sin(angle)};
  const fi=t>=480?0:Math.min(frames.length-1,Math.floor(t/480*frames.length));
  ctx.clearRect(0,0,320,220);ctx.imageSmoothingEnabled=false;ctx.save();ctx.translate(88,32);
  part(upper,shoulder,elbow,{x:43,y:40},{x:154,y:178});ctx.drawImage(body,0,0);
  ctx.save();ctx.translate(wrist.x,wrist.y);ctx.rotate(Math.PI/4-Math.atan2(27,112));ctx.scale(.56,.56);ctx.drawImage(frames[fi],-16,-5);ctx.restore();
  part(fore,elbow,wrist,{x:32,y:32},{x:162,y:184});ctx.restore();
  (el('scrub') as HTMLInputElement).value=String(t);el('status').textContent=`${Math.round(t)} / 480 ms · 剑动画 ${fi+1}/${frames.length} 帧 · ${t<150?'轻微前送':t<210?'攻击':'收回'} · 手腕最大位移 3.5 px`;
 }
 el('attack').onclick=()=>{time=0;running=true;loop=false;};el('loop').onclick=()=>{loop=!loop;time=0;running=true;};
 (el('scrub') as HTMLInputElement).oninput=()=>{running=false;time=Number((el('scrub') as HTMLInputElement).value);draw();};
 function tick(now:number){const dt=last?Math.min(now-last,100):0;last=now;if(running){time+=dt*Number((el('speed') as HTMLSelectElement).value);if(time>(loop?1300:480)){if(loop)time=0;else{time=480;running=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>el('status').textContent=String(e));
