import bodyUrl from '../q-v17-crouched-body-se/body-base.png?url';
import upperUrl from '../../../2026-10-12/yasuo/q-v5-small-grip-wind-e/media/upper-arm.png?url';
import handUrl from '../../../2026-10-12/yasuo/q-v5-small-grip-wind-e/media/forearm-hand.png?url';
import {weaponFrame,gripForFrame,WEAPON} from '../../../2026-10-12/yasuo/q-v11-eight-wind-blade/weapon';
import {poseAt,DURATION,WAIST,UPPER,LOWER,type Point} from './rig';
const urls=import.meta.glob('../../../2026-10-12/yasuo/q-v10-sword-wind-only/media/frames/frame-*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const $=(id:string)=>document.getElementById(id)!;
const c=($('stage') as HTMLCanvasElement).getContext('2d')!;
const enabled=(id:string)=>($(id) as HTMLInputElement).checked;
const load=(url:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
let elapsed=0,playing=true,loop=true,last=0;
async function init(){
 const [body,upper,hand]=await Promise.all([bodyUrl,upperUrl,handUrl].map(load));
 const frames=await Promise.all(Object.entries(urls).sort(([a],[b])=>a.localeCompare(b)).map(([,v])=>load(v)));
 const height=128,width=body.width/body.height*height;
 function arm(s:Point,e:Point,upperPart:boolean){
   c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x));
   if(upperPart){c.scale(UPPER/14,.62);c.drawImage(upper,17,6,16,12,0,-6,16,12);}
   else{c.scale(LOWER/23,.62);c.drawImage(hand,-4,-8);}
   c.restore();
 }
 function draw(){
  const p=poseAt(elapsed);c.clearRect(0,0,320,220);c.imageSmoothingEnabled=false;c.save();c.translate(88,27);
  if(enabled('arm')){arm(p.support,p.supportArm.elbow,true);arm(p.supportArm.elbow,p.supportArm.wrist,false);}
  if(enabled('body')){
   c.save();c.beginPath();c.rect(0,WAIST,width,128-WAIST);c.clip();c.drawImage(body,0,0,width,height);c.restore();
   c.save();c.transform(1,0,-p.p*.15,1-p.p*.04,WAIST*p.p*.15,WAIST*p.p*.04);c.beginPath();c.rect(0,0,width,WAIST+1);c.clip();c.drawImage(body,0,0,width,height);c.restore();
  }
  if(enabled('arm'))arm(p.shoulder,p.elbow,true);
  if(enabled('sword')){const f=weaponFrame(p.t),g=gripForFrame(f),r=WEAPON.source;c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(.65,.7);c.drawImage(frames[f],r.x,r.y,r.width,r.height,r.x-g.x,r.y-g.y,r.width,r.height);c.restore();}
  if(enabled('arm'))arm(p.elbow,p.wrist,false);
  if(enabled('joints')){c.strokeStyle='#ffd98a';c.beginPath();c.moveTo(p.shoulder.x,p.shoulder.y);c.lineTo(p.elbow.x,p.elbow.y);c.lineTo(p.wrist.x,p.wrist.y);c.stroke();for(const v of [p.shoulder,p.elbow,p.wrist]){c.fillStyle='#ffd98a';c.fillRect(v.x-1,v.y-1,2,2);}}
  c.restore();($('scrub') as HTMLInputElement).value=String(p.t);$('status').textContent=`${Math.round(p.t)} / 480 ms · ${p.t<110?'蓄力':p.t<240?'刺出':'收回'} · ${playing?'播放中':'暂停'}`;
 }
 $('once').onclick=()=>{elapsed=0;playing=true;loop=false;};$('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};$('pause').onclick=()=>playing=!playing;
 ($('scrub') as HTMLInputElement).oninput=e=>{elapsed=Number((e.target as HTMLInputElement).value);playing=false;draw();};
 function tick(now:number){const dt=last?Math.min(100,now-last):0;last=now;if(playing){elapsed+=dt*Number(($('speed') as HTMLSelectElement).value);if(elapsed>(loop?1100:DURATION)){if(loop)elapsed=0;else{elapsed=DURATION;playing=false;}}}draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
init().catch(e=>$('status').textContent=String(e));
