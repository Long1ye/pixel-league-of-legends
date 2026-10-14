// Bake the approved layered rig into game atlases; no new artwork generation.
import {createRequire} from 'node:module';
import {writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {order,rigs,poseAt} from '../assets/hero-skills/2026-10-13/yasuo/q-v26-user-eight/rig.ts';
import {drawSword,BLADE_LENGTH_SCALE} from '../assets/hero-skills/2026-10-13/yasuo/q-v26-user-eight/sword.ts';
const require=createRequire(import.meta.url);
const {createCanvas,loadImage}=require('C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const base='assets/hero-skills/2026-10-13/yasuo/q-v26-user-eight';
const dest='assets/heroes/yasuo/q-user-eight-2026-10-13';mkdirSync(dest,{recursive:true});
// Lossless frame extraction, keeping source canvas and alpha unchanged.
execFileSync('python',['-c',"from PIL import Image; import sys; from pathlib import Path; im=Image.open(sys.argv[1]); out=Path(sys.argv[2]); out.mkdir(exist_ok=True); [(im.seek(i),im.convert('RGBA').save(out/('frame-%02d.png'%i))) for i in range(im.n_frames)]",'assets/hero-skills/2026-10-13/yasuo/q-v25-user-sword-subtle/sword.webp',`${dest}/sword-frames`]);
const upper=await loadImage('assets/hero-skills/2026-10-13/yasuo/q-v22-natural-arm-sword/components/component_002.png');
const fore=await loadImage('assets/hero-skills/2026-10-13/yasuo/q-v22-natural-arm-sword/components/component_003.png');
const swords=await Promise.all(Array.from({length:16},(_,i)=>loadImage(`${dest}/sword-frames/frame-${String(i).padStart(2,'0')}.png`)));
const clips=[];
for(const direction of order){
 const body=await loadImage(`${base}/bodies/${direction}.png`),r=rigs[direction];
 const width=480,height=430,atlas=createCanvas(width*4,height*8),out=atlas.getContext('2d');
 for(let frame=0;frame<31;frame++){
  const time=frame*16,p=poseAt(direction,time),c=out;c.save();c.beginPath();c.rect(frame%4*width,Math.floor(frame/4)*height,width,height);c.clip();c.translate(frame%4*width+width/2-64,Math.floor(frame/4)*height+148);c.imageSmoothingEnabled=false;
  function part(img,s,e,a,b){const flip=r.flip?-1:1;const scale=Math.hypot(e.x-s.x,e.y-s.y)/Math.hypot(b.x-a.x,b.y-a.y);c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x));c.scale(scale,scale*flip);c.rotate(-Math.atan2(b.y-a.y,b.x-a.x));c.drawImage(img,-a.x,-a.y);c.restore();}
  const up=()=>part(upper,p.shoulder,p.elbow,{x:43,y:40},{x:154,y:178});
  const low=()=>part(fore,p.elbow,p.wrist,{x:32,y:32},{x:162,y:184});
  const sword=()=>{const fi=time>=480?0:Math.min(15,Math.floor(time/480*16));c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(r.reach,.56);drawSword(c,swords[fi]);c.restore();};
  up();if(r.behind){sword();low();c.drawImage(body,0,0);}else{c.drawImage(body,0,0);sword();low();}c.restore();
 }
 const sheet=`q-${direction}-layered.png`;writeFileSync(resolve(dest,sheet),atlas.toBuffer('image/png'));
 clips.push({direction,key:`yasuo-q-${direction}-wind`,sheet,width,height,anchor:[240,265],frame_count:31,columns:4,rows:8,source_pixels_preserved:true});
}
writeFileSync(`${dest}/animations.json`,JSON.stringify({version:'v26-user-eight-layered-long-blade',blade_length_scale:BLADE_LENGTH_SCALE,cast_duration_ms:480,sample_step_ms:16,scale_in_world:26/108,visible_body_height_in_world:26,clips},null,2)+'\n');
console.log(`Packaged ${clips.length} directions, 31 frames each.`);
