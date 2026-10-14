import bodyUrl from '../q-v17-crouched-body-se/body-base.png?url';
import upperUrl from '../q-v20-meowa-parts/components/component_003.png?url';
import forearmUrl from '../q-v20-meowa-parts/components/component_002.png?url';
import swordUrl from '../q-v20-meowa-parts/components/component_001.png?url';
import {poseAt,DURATION,WAIST,UPPER,LOWER,type Point} from './rig';
const $=(id:string)=>document.getElementById(id)!;
const c=($('stage') as HTMLCanvasElement).getContext('2d')!;
const enabled=(id:string)=>($(id) as HTMLInputElement).checked;
const load=(url:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
let elapsed=0,playing=true,loop=true,last=0;
async function init(){
 const [body,upper,forearm,sword]=await Promise.all([bodyUrl,upperUrl,forearmUrl,swordUrl].map(load));
 const height=128,width=body.width/body.height*height;
 function arm(s:Point,e:Point,upperPart:boolean){
   // Entire forearm and fist share one scale; no separate oversized hand patch.
   const mount=upperPart?{x:45,y:85}:{x:35,y:80};
   const end=upperPart?{x:370,y:145}:{x:445,y:90};
   const part=upperPart?upper:forearm;
   const scale=(upperPart?UPPER:LOWER)/Math.hypot(end.x-mount.x,end.y-mount.y);
   c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x)-Math.atan2(end.y-mount.y,end.x-mount.x));c.scale(scale,scale);
   c.drawImage(part,-mount.x,-mount.y);
   c.restore();
 }
 function draw(){
  const p=poseAt(elapsed);c.clearRect(0,0,320,220);c.imageSmoothingEnabled=false;c.save();c.translate(88,27);
  if(enabled('arm')){arm(p.support,p.supportArm.elbow,true);arm(p.supportArm.elbow,p.supportArm.wrist,false);}
  // Shoulder armor covers the near upper-arm root, while the wrist stays in front.
  if(enabled('arm'))arm(p.shoulder,p.elbow,true);
  if(enabled('body')){
   c.save();c.beginPath();c.rect(0,WAIST,width,128-WAIST);c.clip();c.drawImage(body,0,0,width,height);c.restore();
   c.save();c.transform(1,0,-p.p*.15,1-p.p*.04,WAIST*p.p*.15,WAIST*p.p*.04);c.beginPath();c.rect(0,0,width,WAIST+1);c.clip();c.drawImage(body,0,0,width,height);c.restore();
  }
  if(enabled('sword')){c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(.06,.06);c.drawImage(sword,-240,-87);c.restore();}
  if(enabled('arm'))arm(p.elbow,p.wrist,false);
  if(enabled('joints')){c.strokeStyle='#ffd98a';c.beginPath();c.moveTo(p.shoulder.x,p.shoulder.y);c.lineTo(p.elbow.x,p.elbow.y);c.lineTo(p.wrist.x,p.wrist.y);c.stroke();for(const v of [p.shoulder,p.elbow,p.wrist]){c.fillStyle='#ffd98a';c.fillRect(v.x-1,v.y-1,2,2);}}
  c.restore();($('scrub') as HTMLInputElement).value=String(p.t);$('status').textContent=`${Math.round(p.t)} / 480 ms · ${p.t<110?'蓄力':p.t<240?'刺出':'收回'} · ${playing?'播放中':'暂停'}`;
 }
 $('once').onclick=()=>{elapsed=0;playing=true;loop=false;};$('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};$('pause').onclick=()=>playing=!playing;
 ($('scrub') as HTMLInputElement).oninput=e=>{elapsed=Number((e.target as HTMLInputElement).value);playing=false;draw();};
 function tick(now:number){const dt=last?Math.min(100,now-last):0;last=now;if(playing){elapsed+=dt*Number(($('speed') as HTMLSelectElement).value);if(elapsed>(loop?1100:DURATION)){if(loop)elapsed=0;else{elapsed=DURATION;playing=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>$('status').textContent=String(e));
