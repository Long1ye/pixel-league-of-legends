import catalog from '../e-v7-fixed-right/catalog.json';
import ringUrl from './refined/media/e-atlas.png?url';
import ordinaryUrl from '../eq-v2-ring-only/media/e-atlas.png?url';
import { DIRECTIONS, END_MS, sample } from '../eq-v3-eight-dash/timeline';
import { isFrontArc } from './depth';
const urls=import.meta.glob('../e-v7-fixed-right/*/media/e-atlas.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const $=(id:string)=>document.getElementById(id)!;
const main=$('stage') as HTMLCanvasElement, scrub=$('scrub') as HTMLInputElement;
const images:Record<string,HTMLImageElement>={}, cards:Record<string,HTMLCanvasElement>={};
const ring=new Image(), ordinary=new Image(); let selected='se',elapsed=0,previous=0,playing=true,loop=true;
const depthLayers = [document.createElement('canvas'), document.createElement('canvas')];
function prepareDepthLayers() {
  for (const [layer, canvas] of depthLayers.entries()) {
    canvas.width=ring.naturalWidth; canvas.height=ring.naturalHeight;
    const context=canvas.getContext('2d')!;
    context.drawImage(ring,0,0);
    const pixels=context.getImageData(0,0,canvas.width,canvas.height);
    for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++) {
      if(Number(isFrontArc(x%176,y%144))!==layer)pixels.data[(y*canvas.width+x)*4+3]=0;
    }
    context.putImageData(pixels,0,0);
  }
}
async function load(img:HTMLImageElement,url:string){await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error('加载失败：'+url));img.src=url;});}
function draw(canvas:HTMLCanvasElement,id:string,t:number){
  const c=canvas.getContext('2d')!, d=DIRECTIONS.find(d=>d.id===id)!, s=sample(t);
  const travel=canvas===main?160:100, cx=canvas.width/2,cy=canvas.height/2+45;
  const sx=cx-d.x*travel/2,sy=cy-d.y*travel/2,ex=cx+d.x*travel/2,ey=cy+d.y*travel/2;
  const x=Math.round(sx+d.x*travel*s.progress),y=Math.round(sy+d.y*travel*s.progress);
  c.clearRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;c.fillStyle='#172d34';c.fillRect(0,0,canvas.width,canvas.height);
  c.strokeStyle='#23404a';c.lineWidth=1;for(let v=0;v<canvas.width;v+=24){c.beginPath();c.moveTo(v,0);c.lineTo(v,canvas.height);c.stroke();}for(let v=0;v<canvas.height;v+=24){c.beginPath();c.moveTo(0,v);c.lineTo(canvas.width,v);c.stroke();}
  c.setLineDash([4,5]);c.strokeStyle='#577780';c.beginPath();c.moveTo(sx,sy);c.lineTo(ex,ey);c.stroke();c.setLineDash([]);
  for(const [px,py,color] of [[sx,sy,'#799b9d'],[ex,ey,'#84d7e2']] as const){c.strokeStyle=color;c.beginPath();c.ellipse(px,py,9,4,0,0,Math.PI*2);c.stroke();}
  c.fillStyle='#06161b88';c.beginPath();c.ellipse(x,y,24,7,0,0,Math.PI*2);c.fill();
  const fx=(front:boolean)=>{
    if(s.ringFrame<2||s.ringFrame>5||!($('fx') as HTMLInputElement).checked)return;
    const f=s.ringFrame;
    if(($('ordinary') as HTMLInputElement).checked){
      const offset=front?88:0,h=front?56:88;
      c.drawImage(ordinary,f%4*176,Math.floor(f/4)*144+offset,176,h,x-88,y-125+offset,176,h);
    }else c.drawImage(depthLayers[Number(front)],f%4*176,Math.floor(f/4)*144,176,144,x-88,y-125,176,144);
  };
  fx(false);
  const m=catalog.directions.find(m=>m.direction===id)!;
  if(($('body') as HTMLInputElement).checked)c.drawImage(images[id],s.bodyFrame%4*m.width,Math.floor(s.bodyFrame/4)*m.height,m.width,m.height,x-64,y-117,m.width,m.height);
  fx(true);
}
function choose(id:string){selected=id;elapsed=0;playing=true;$('heading').textContent=DIRECTIONS.find(d=>d.id===id)!.label;document.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===id)));}
async function init(){await Promise.all([load(ring,ringUrl),load(ordinary,ordinaryUrl),...DIRECTIONS.map(d=>{const img=new Image();images[d.id]=img;return load(img,urls[`../e-v7-fixed-right/${d.id}/media/e-atlas.png`]);})]);
  prepareDepthLayers();
  for(const d of DIRECTIONS){const b=document.createElement('button');b.dataset.direction=d.id;b.textContent=d.label;b.onclick=()=>choose(d.id);$('directions').append(b);const fig=document.createElement('figure'),cv=document.createElement('canvas'),label=document.createElement('figcaption');cv.width=320;cv.height=280;label.textContent=d.label;fig.append(cv,label);$('grid').append(fig);cards[d.id]=cv;}
  choose(selected);requestAnimationFrame(tick);
}
function tick(now:number){const dt=previous?Math.min(now-previous,100):0;previous=now;if(playing){elapsed+=dt*Number(($('speed') as HTMLSelectElement).value);if(elapsed>(loop?1200:END_MS)){if(loop)elapsed=0;else{elapsed=END_MS;playing=false;}}}const t=Math.min(elapsed,END_MS);draw(main,selected,t);for(const d of DIRECTIONS)draw(cards[d.id],d.id,t);scrub.value=String(Math.round(t));$('status').textContent=`${Math.round(t)}ms · ${sample(t).phase} · ${playing?'播放中':'暂停'} · E 位移 40–260ms / 环斩可见 200–400ms`;requestAnimationFrame(tick);}
$('once').onclick=()=>{elapsed=0;playing=true;loop=false;};$('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};$('pause').onclick=()=>{playing=!playing;};scrub.oninput=()=>{elapsed=Number(scrub.value);playing=false;};
init().catch(e=>{$('status').textContent=String(e);});
