import initial from './map.json';
import {terrainAt,walkable,tileKey,atlasCells} from './layout';
import grassUrl from './generated-grass.png?url';
import atlasUrl from './atlas.png?url';
import heroUrl from '../../heroes/yasuo/selected-2026-10-10/idle-se.png?url';
import reedsUrl from '../../map-layers/forest-v1/layers/reeds-west.png?url';
const config=structuredClone(initial),canvas=document.querySelector('canvas')!,ctx=canvas.getContext('2d')!;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(`图片加载失败: ${src}`));im.src=src;});
const [grass,atlas,hero,reeds]=await Promise.all([grassUrl,atlasUrl,heroUrl,reedsUrl].map(load));
const ground=document.createElement('canvas');ground.width=config.width;ground.height=config.height;
const g=ground.getContext('2d')!;g.imageSmoothingEnabled=false;ctx.imageSmoothingEnabled=false;
let coverage=0;
function rebuild(){
  g.fillStyle=g.createPattern(grass,'repeat')!;g.fillRect(0,0,1024,640);
  let count=0;
  for(let y=0;y<640;y+=4)for(let x=0;x<1024;x+=4){const type=terrainAt(config,x,y);if(type!=='border')count++;if(type==='border'){g.fillStyle='#102e2690';g.fillRect(x,y,4,4);}if(type==='river'){g.fillStyle='#284f55';g.fillRect(x,y,4,4);}}
  coverage=Math.round(count/(256*160)*100);
  for(let row=0;row<10;row++)for(let col=0;col<16;col++){const key=tileKey(config,col,row);if(key){const [ax,ay]=atlasCells[key];g.drawImage(atlas,ax*64,ay*64,64,64,col*64,row*64,64,64);}}
  for(const t of config.towers){g.fillStyle='#263534';g.beginPath();g.ellipse(t.x,t.y+5,40,26,0,0,Math.PI*2);g.fill();g.strokeStyle='#7a8070';g.lineWidth=3;g.stroke();g.strokeStyle=t.team==='blue'?'#72b2b9':'#bd7a76';g.lineWidth=2;g.beginPath();g.ellipse(t.x,t.y+5,31,19,0,0,Math.PI*2);g.stroke();}
  document.querySelector('#status')!.textContent=`可行走地形约 ${coverage}% · 1024 × 640 · 原生 1×`;
}
rebuild();
let x=config.spawn[0],y=config.spawn[1],target:number[]|null=null,last=0,time=0;
const keys=new Set<string>();
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLInputElement)return;if(['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){keys.add(e.key);target=null;e.preventDefault();}});
window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>keys.clear());
canvas.onclick=e=>{const box=canvas.getBoundingClientRect();const p=[(e.clientX-box.left)*1024/box.width,(e.clientY-box.top)*640/box.height];if(walkable(config,...p as [number,number]))target=p;};
document.querySelector<HTMLInputElement>('#width')!.oninput=e=>{config.lane.width=Number((e.target as HTMLInputElement).value);document.querySelector('#widthValue')!.textContent=String(config.lane.width);rebuild();if(!walkable(config,x,y)){[x,y]=config.spawn;target=null;}};
document.querySelector('#reset')!.addEventListener('click',()=>{[x,y]=config.spawn;target=null;});
document.querySelector('#export')!.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(config,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='midlane-v2-layout.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
function tower(t:typeof config.towers[number]){const blue=t.team==='blue';ctx.fillStyle='#273635';ctx.fillRect(t.x-18,t.y-40,36,40);ctx.fillStyle='#68796c';ctx.fillRect(t.x-15,t.y-45,30,37);ctx.fillStyle='#94a28c';ctx.fillRect(t.x-17,t.y-47,34,7);ctx.fillStyle='#46584f';ctx.fillRect(t.x+5,t.y-39,10,32);ctx.fillStyle=blue?'#7cd6e2':'#e89194';ctx.beginPath();ctx.moveTo(t.x,t.y-72);ctx.lineTo(t.x+9,t.y-58);ctx.lineTo(t.x,t.y-43);ctx.lineTo(t.x-9,t.y-58);ctx.closePath();ctx.fill();ctx.fillStyle='#18272a';ctx.fillRect(t.x-22,t.y-83,44,5);ctx.fillStyle=blue?'#69b9c8':'#d08080';ctx.fillRect(t.x-21,t.y-82,42,3);}
function render(now:number){const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(document.querySelector<HTMLInputElement>('#motion')!.checked)time+=dt;
  let vx=Number(keys.has('d')||keys.has('ArrowRight'))-Number(keys.has('a')||keys.has('ArrowLeft')),vy=Number(keys.has('s')||keys.has('ArrowDown'))-Number(keys.has('w')||keys.has('ArrowUp'));
  if(target){vx=target[0]-x;vy=target[1]-y;if(Math.hypot(vx,vy)<4){target=null;vx=vy=0;}}
  const length=Math.hypot(vx,vy);if(length){const nx=x+vx/length*150*dt,ny=y+vy/length*150*dt;let moved=false;if(walkable(config,nx,y)){x=nx;moved=true;}if(walkable(config,x,ny)){y=ny;moved=true;}if(!moved)target=null;}
  ctx.drawImage(ground,0,0);
  ctx.fillStyle='#7db3af50';for(let i=0;i<65;i++){const px=Math.round((i*137+time*10)%1024),py=(i*83)%640;if(terrainAt(config,px,py)==='river')ctx.fillRect(px,py,9+(i%9),1);}
  if(document.querySelector<HTMLInputElement>('#zones')!.checked){for(let py=0;py<640;py+=8)for(let px=0;px<1024;px+=8){ctx.fillStyle=walkable(config,px,py)?'#6dde9e30':'#15171e75';ctx.fillRect(px,py,8,8);}}
  const actors=[...config.towers.map(t=>({y:t.y,draw:()=>tower(t)})),{y,draw:()=>{ctx.fillStyle='#101d2680';ctx.beginPath();ctx.ellipse(x,y,17,6,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#84d8b5';ctx.lineWidth=1;ctx.stroke();const frame=Math.floor(time*8)%8;ctx.drawImage(hero,(frame%3)*128,Math.floor(frame/3)*128,128,128,Math.round(x-64),Math.round(y-116),128,128);}},...config.brushes.map((b,i)=>({y:b.y+16,draw:()=>{ctx.globalAlpha=Math.abs(x-b.x)<b.width/2&&Math.abs(y-b.y)<30?.5:1;for(let k=0;k<2;k++)ctx.drawImage(reeds,b.x-b.width/2+k*48+Math.round(Math.sin(time*2+i)*1),b.y-25);ctx.globalAlpha=1;}}))];actors.sort((a,b)=>a.y-b.y).forEach(a=>a.draw());
  if(target){ctx.strokeStyle='#a7dcb3';ctx.beginPath();ctx.arc(target[0],target[1],7,0,Math.PI*2);ctx.stroke();}
  requestAnimationFrame(render);
}requestAnimationFrame(render);
