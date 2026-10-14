import layout from './layers.json';
import {mapLayerFrame,mapFrameAt,MAP_FRAME_COUNT,MAP_LAYER_PADDING as padding} from '../../../src/render/MapLayerFrames';
import {layerMotion,type MapLayerKind} from '../../../src/render/MapLayerLayout';
import originalUrl from '../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import groundUrl from './ground.png?url';
const urls=import.meta.glob('./layers/*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
const original=await load(originalUrl),ground=await load(groundUrl);
const layers=await Promise.all(layout.layers.map(async layer=>{
 const image=await load(urls[`./${layer.file}`]),scratch=document.createElement('canvas');scratch.width=layer.width;scratch.height=layer.height;
 const c=scratch.getContext('2d')!;c.drawImage(image,0,0);const data=c.getImageData(0,0,layer.width,layer.height).data;
 const frames=Array.from({length:MAP_FRAME_COUNT},(_,f)=>{const canvas=document.createElement('canvas');canvas.width=layer.width+padding*2;canvas.height=layer.height+padding*2;canvas.getContext('2d')!.putImageData(new ImageData(mapLayerFrame(data,layer.width,layer.height,layer.kind as MapLayerKind,f) as Uint8ClampedArray<ArrayBuffer>,canvas.width,canvas.height),0,0);return canvas;});
 const figure=document.createElement('figure'),caption=document.createElement('figcaption'),link=document.createElement('a');link.href=image.src;link.textContent=`${layer.id} · ${layer.width}×${layer.height}`;caption.append(link);figure.append(image,caption);document.querySelector('#layers')!.append(figure);
 return {...layer,frames};
}));
const labels={water:'水面',grass:'高草',canopy:'树冠',fire:'火焰'},active=new Set(Object.keys(labels));
for(const [kind,name] of Object.entries(labels)){const l=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.checked=true;input.onchange=()=>{if(input.checked)active.add(kind);else active.delete(kind);};l.append(input,name);document.querySelector('#controls')!.append(l);}
let staticMap=false,paused=false,time=0,last=0;
document.querySelector<HTMLButtonElement>('#mode')!.onclick=e=>{staticMap=!staticMap;(e.target as HTMLElement).textContent=staticMap?'查看动态分层':'查看原图';};
document.querySelector<HTMLButtonElement>('#pause')!.onclick=e=>{paused=!paused;(e.target as HTMLElement).textContent=paused?'播放动画':'暂停动画';};
const ctx=document.querySelector('canvas')!.getContext('2d')!;ctx.imageSmoothingEnabled=false;
function render(now:number){if(last&&!paused)time+=Math.min(.1,(now-last)/1000);last=now;ctx.clearRect(0,0,511,327);ctx.drawImage(staticMap?original:ground,0,0);
 if(!staticMap)for(const {layer,i} of layers.map((layer,i)=>({layer,i})).sort((a,b)=>Number(b.layer.kind==='water')-Number(a.layer.kind==='water'))){if(!active.has(layer.kind))continue;const kind=layer.kind as MapLayerKind,frame=layer.frames[mapFrameAt(kind,time,i)],motion=layerMotion(kind,time,i*1.7);ctx.save();ctx.globalAlpha=motion.alpha;ctx.translate(layer.x-padding,layer.y+layer.height+padding);ctx.scale(1,motion.scaleY);ctx.drawImage(frame,0,-frame.height);ctx.restore();}
 requestAnimationFrame(render);
}requestAnimationFrame(render);
