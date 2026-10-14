import bodyUrl from '../q-v21-one-arm-body/generated/Edit_this_exact_pixel_character_into_a_body_layer_for_a_thrust_animation_Remove_only_the_thrust_arm_below_the_3a59cc0b/remove_bg.png?url';
import upperUrl from '../q-v22-natural-arm-sword/components/component_002.png?url';
import foreUrl from '../q-v22-natural-arm-sword/components/component_003.png?url';
import swordUrl from '../q-v22-natural-arm-sword/components/component_001.png?url';
const el=(id:string)=>document.getElementById(id)!;
const ctx=(el('stage') as HTMLCanvasElement).getContext('2d')!;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
type P={x:number,y:number};
async function init(){
 const [body,upper,fore,sword]=await Promise.all([bodyUrl,upperUrl,foreUrl,swordUrl].map(load));
 const light=document.createElement('canvas');light.width=sword.width;light.height=sword.height;
 const lc=light.getContext('2d')!;lc.drawImage(sword,0,0);lc.globalCompositeOperation='source-in';lc.fillStyle='#bdefff';lc.fillRect(165,0,light.width-165,light.height);lc.clearRect(0,0,165,light.height);
 const shoulder={x:53,y:62},elbow={x:57,y:73},wrist={x:69,y:77};
 function part(img:HTMLImageElement,start:P,end:P,a:P,b:P){const scale=Math.hypot(end.x-start.x,end.y-start.y)/Math.hypot(b.x-a.x,b.y-a.y);ctx.save();ctx.translate(start.x,start.y);ctx.rotate(Math.atan2(end.y-start.y,end.x-start.x)-Math.atan2(b.y-a.y,b.x-a.x));ctx.scale(scale,scale);ctx.drawImage(img,-a.x,-a.y);ctx.restore();}
 let time=0,last=0,loop=true,running=true;
 function draw(){
  const t=Math.min(time,360);const alpha=t<55?t/55:t<100?1:Math.max(0,1-(t-100)/190);
  ctx.clearRect(0,0,320,220);ctx.imageSmoothingEnabled=false;ctx.save();ctx.translate(88,32);
  part(upper,shoulder,elbow,{x:43,y:40},{x:154,y:178});ctx.drawImage(body,0,0);
  ctx.save();ctx.translate(wrist.x,wrist.y);ctx.rotate(Math.PI/4-Math.atan2(174,665));ctx.scale(.105,.105);ctx.drawImage(sword,-91,-30);ctx.globalAlpha=alpha;ctx.drawImage(light,-91,-30);ctx.restore();
  part(fore,elbow,wrist,{x:32,y:32},{x:162,y:184});ctx.restore();
  (el('scrub') as HTMLInputElement).value=String(t);el('status').textContent=`${Math.round(t)} / 360 ms · ${t<55?'聚亮':t<100?'攻击闪光':t<290?'消退':'持剑待机'} · 手臂与武器无位移`;
 }
 el('attack').onclick=()=>{time=0;running=true;loop=false;};el('loop').onclick=()=>{loop=!loop;time=0;running=true;};
 (el('scrub') as HTMLInputElement).oninput=()=>{running=false;time=Number((el('scrub') as HTMLInputElement).value);draw();};
 function tick(now:number){const dt=last?Math.min(now-last,100):0;last=now;if(running){time+=dt*Number((el('speed') as HTMLSelectElement).value);if(time>(loop?1100:360)){if(loop)time=0;else{time=360;running=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>el('status').textContent=String(e));
