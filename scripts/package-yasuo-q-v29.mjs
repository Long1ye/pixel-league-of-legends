// Bake the approved layered rig into game atlases; no new artwork generation.
import {createRequire} from 'node:module';
import {writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {registerHooks} from 'node:module';
const tsHooks=registerHooks({resolve(specifier,context,next){if(specifier.startsWith('.')&&!/\.[a-z]+$/i.test(specifier))return next(specifier+'.ts',context);return next(specifier,context);}});
const {order,rigs,poseAt}=await import('../assets/hero-skills/2026-10-13/yasuo/q-v29-meowa-layered/rig.ts');
tsHooks.deregister();
import {drawSword,BLADE_LENGTH_SCALE} from '../assets/hero-skills/2026-10-13/yasuo/q-v26-user-eight/sword.ts';
const require=createRequire(import.meta.url);
const {createCanvas,loadImage}=require('C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const base='assets/hero-skills/2026-10-13/yasuo/q-v28-meowa-eight';
const frameIds={nw:'12',n:'17',ne:'20',w:'09',e:'23',sw:'06',s:'04',se:'00'};
const dest='assets/heroes/yasuo/q-meowa-eight-2026-10-13';mkdirSync(dest,{recursive:true});
// Lossless frame extraction, keeping source canvas and alpha unchanged.
execFileSync('python',['-c',"from PIL import Image; import sys; from pathlib import Path; im=Image.open(sys.argv[1]); out=Path(sys.argv[2]); out.mkdir(exist_ok=True); [(im.seek(i),im.convert('RGBA').save(out/('frame-%02d.png'%i))) for i in range(im.n_frames)]",'assets/hero-skills/2026-10-13/yasuo/q-v25-user-sword-subtle/sword.webp',`${dest}/sword-frames`]);
const upper=await loadImage('assets/hero-skills/2026-10-13/yasuo/q-v22-natural-arm-sword/components/component_002.png');
const fore=await loadImage('assets/hero-skills/2026-10-13/yasuo/q-v22-natural-arm-sword/components/component_003.png');
const swords=await Promise.all(Array.from({length:16},(_,i)=>loadImage(`${dest}/sword-frames/frame-${String(i).padStart(2,'0')}.png`)));
const clips=[];
for(const direction of order){
 const body=await loadImage(`${base}/frames/${frameIds[direction]}.png`),r=rigs[direction];
 const width=480,height=430,atlas=createCanvas(width*4,height*8),out=atlas.getContext('2d');
 for(let frame=0;frame<31;frame++){
  const time=frame*16,p=poseAt(direction,time),c=out;c.save();c.beginPath();c.rect(frame%4*width,Math.floor(frame/4)*height,width,height);c.clip();c.translate(frame%4*width+width/2-64,Math.floor(frame/4)*height+148);c.imageSmoothingEnabled=false;
  function part(img,s,e,a,b){const flip=r.flip?-1:1;const scale=Math.hypot(e.x-s.x,e.y-s.y)/Math.hypot(b.x-a.x,b.y-a.y);c.save();c.translate(s.x,s.y);c.rotate(Math.atan2(e.y-s.y,e.x-s.x));c.scale(scale,scale*flip);c.rotate(-Math.atan2(b.y-a.y,b.x-a.x));c.drawImage(img,-a.x,-a.y);c.restore();}
  const up=()=>part(upper,p.shoulder,p.elbow,{x:43,y:40},{x:154,y:178});
  const low=()=>part(fore,p.elbow,p.wrist,{x:32,y:32},{x:162,y:184});
  const sword=()=>{const fi=time>=480?0:Math.min(15,Math.floor(time/480*16));c.save();c.translate(p.wrist.x,p.wrist.y);c.rotate(p.angle);c.scale(r.reach,.56);drawSword(c,swords[fi]);c.restore();};
  const drawBody=()=>c.drawImage(body,0,0,115.2,140.8);
  if(direction==='sw'||direction==='s'){
   drawBody();up();sword();low();
   const capX=direction==='sw'?55:64;
   c.drawImage(body,capX*5,270,90,105,capX,54,18,21);
  }else if(r.behind){up();sword();low();drawBody();}else{up();drawBody();sword();low();}
  c.restore();
 }
 const sheet=`q-${direction}-layered.png`;writeFileSync(resolve(dest,sheet),atlas.toBuffer('image/png'));
 clips.push({direction,key:`yasuo-q-${direction}-wind`,sheet,width,height,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:false});
}
writeFileSync(`${dest}/animations.json`,JSON.stringify({version:'v29-meowa-layered-corrected-elbows',blade_length_scale:BLADE_LENGTH_SCALE,cast_duration_ms:480,sample_step_ms:16,scale_in_world:26/108,visible_body_height_in_world:26,clips},null,2)+'\n');
console.log(`Packaged ${clips.length} directions, 31 frames each.`);
