import upperUrl from '../q-v22-natural-arm-sword/components/component_002.png?url';
import foreUrl from '../q-v22-natural-arm-sword/components/component_003.png?url';
import swordUrl from '../q-v25-user-sword-subtle/sword.webp?url';
import {rigs,order,poseAt,type Point,type Direction} from './rig';
import {drawSword} from '../q-v26-user-eight/sword';
const bodyUrls=import.meta.glob('../q-v28-meowa-eight/frames/*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const frameIds={nw:'12',n:'17',ne:'20',w:'09',e:'23',sw:'06',s:'04',se:'00'};
const el=(id:string)=>document.getElementById(id)!;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error(`无法加载 ${src}`));i.src=src;});
type Frame=CanvasImageSource & {close():void};
type Decoder={tracks:{ready:Promise<void>;selectedTrack:{frameCount:number}};decode(o:{frameIndex:number}):Promise<{image:Frame}>;close():void};
async function init(){
 const [upper,fore,...bodies]=await Promise.all([upperUrl,foreUrl,...order.map(d=>bodyUrls[`../q-v28-meowa-eight/frames/${frameIds[d]}.png`])].map(load));
 const Decode=(window as unknown as {ImageDecoder?:new(o:{data:ArrayBuffer;type:string})=>Decoder}).ImageDecoder;
 if(!Decode)throw new Error('此预览需要支持 ImageDecoder 的 Chromium 浏览器');
 const response=await fetch(swordUrl);if(!response.ok)throw new Error('剑动画加载失败');
 const decoder=new Decode({data:await response.arrayBuffer(),type:'image/webp'});await decoder.tracks.ready;
 const frames:Frame[]=[];for(let i=0;i<decoder.tracks.selectedTrack.frameCount;i++)frames.push((await decoder.decode({frameIndex:i})).image);decoder.close();
 window.addEventListener('pagehide',()=>frames.forEach(f=>f.close()),{once:true});
 let dir:Direction='se',time=0,last=0,loop=true,running=true;
 const stage=el('stage') as HTMLCanvasElement;stage.width=480;stage.height=430;stage.style.width='480px';stage.style.height='430px';
 const main=stage.getContext('2d')!;
 const small=order.map(d=>{const fig=document.createElement('figure'),canvas=document.createElement('canvas'),caption=document.createElement('figcaption');canvas.width=240;canvas.height=230;caption.textContent=rigs[d].label;fig.append(canvas,caption);el('overview').append(fig);return canvas.getContext('2d')!;});
 for(const d of ['nw','n','ne','w',null,'e','sw','s','se'] as const){if(!d){el('directions').append(document.createElement('span'));continue;}const b=document.createElement('button');b.textContent=rigs[d].label;b.dataset.dir=d;b.onclick=()=>{dir=d;draw();};el('directions').append(b);}
 function render(c:CanvasRenderingContext2D,d:Direction){
  if(c.canvas.width!==480){c.canvas.width=480;c.canvas.height=430;c.canvas.style.width='480px';c.canvas.style.height='430px';el('overview').style.gridTemplateColumns='repeat(2,480px)';}
  const r=rigs[d],p=poseAt(d,time);c.clearRect(0,0,c.canvas.width,c.canvas.height);c.imageSmoothingEnabled=false;c.save();c.translate(c.canvas.width/2-64,148);
  function part(img:HTMLImageElement,s:Point,e:Point,a:Point,b:Point){const flip=r.flip?-1:1;const sourceAngle=Math.atan2(b.y-a.y,b.x-a.x);const scale=Math.hypot(e.x-s.x,e.y-s.y)/Math.hypot(b.x-a.x,b.y-a.y);c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x));c.scale(scale,scale*flip);c.rotate(-sourceAngle);c.drawImage(img,-a.x,-a.y);c.restore();}
  const upperPart=()=>part(upper,p.shoulder,p.elbow,{x:43,y:40},{x:154,y:178});
  const lowerPart=()=>part(fore,p.elbow,p.wrist,{x:32,y:32},{x:162,y:184});
  const sword=()=>{const fi=time>=480?0:Math.min(frames.length-1,Math.floor(time/480*frames.length));c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(r.reach,.56);drawSword(c,frames[fi]);c.restore();};
  if(d==='sw'||d==='s'){
   // This near-side arm crosses the torso: keep both segments in front.
   // Restore the shoulder-armor cap over the socket, without hiding the elbow.
   const body=bodies[order.indexOf(d)];
   c.drawImage(body,0,0,115.2,140.8);upperPart();sword();lowerPart();
   const capX=d==='sw'?55:64;
   c.drawImage(body,capX*5,270,90,105,capX,54,18,21);
  }else if(r.behind){upperPart();sword();lowerPart();c.drawImage(bodies[order.indexOf(d)],0,0,115.2,140.8);}else{upperPart();c.drawImage(bodies[order.indexOf(d)],0,0,115.2,140.8);sword();lowerPart();}
  if((el('joints') as HTMLInputElement).checked){c.strokeStyle='#ffda86';c.beginPath();c.moveTo(p.shoulder.x,p.shoulder.y);c.lineTo(p.elbow.x,p.elbow.y);c.lineTo(p.wrist.x,p.wrist.y);c.stroke();for(const v of [p.shoulder,p.elbow,p.wrist]){c.fillStyle='#ffda86';c.fillRect(v.x-1,v.y-1,2,2);}}
  c.restore();
 }
 function draw(){render(main,dir);order.forEach((d,i)=>render(small[i],d));for(const b of el('directions').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.dir===dir));(el('scrub') as HTMLInputElement).value=String(Math.min(time,480));el('status').textContent=`${rigs[dir].label} · ${Math.round(Math.min(time,480))} / 480 ms · ${running?'播放':'暂停'} · 八向独立关节配置`;
 }
 el('attack').onclick=()=>{time=0;running=true;loop=false;};el('loop').onclick=()=>{loop=!loop;time=0;running=true;};
 (el('scrub') as HTMLInputElement).oninput=()=>{running=false;time=Number((el('scrub') as HTMLInputElement).value);draw();};
 function tick(now:number){const dt=last?Math.min(now-last,100):0;last=now;if(running){time+=dt*Number((el('speed') as HTMLSelectElement).value);if(time>(loop?1300:480)){if(loop)time=0;else{time=480;running=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>el('status').textContent=String(e));
