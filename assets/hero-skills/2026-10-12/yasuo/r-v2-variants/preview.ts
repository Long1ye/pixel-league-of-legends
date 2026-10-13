import originalUrl from '../r-v1-last-breath/media/e-atlas.png?url';
import originalData from '../r-v1-last-breath/animation.json';
const urls=import.meta.glob('./*/media/e-atlas.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
const data=import.meta.glob('./*/animation.json',{eager:true,import:'default'}) as Record<string,typeof originalData>;
const plans=import.meta.glob('./*/motion.plan.json',{eager:true,import:'default'}) as Record<string,{args:string[]}>;
const $=(id:string)=>document.getElementById(id)!;
let elapsed=0,playing=true,loop=true,prev=0;
const clips:{image:HTMLImageElement;canvas:HTMLCanvasElement;m:typeof originalData}[]=[];
async function init(){for(const [id,title] of [['original','保留版 · 原试作'],['a','A · 快速连斩'],['b','B · 蓄力终结'],['c','C · 克制刀光']]){
 const m=id==='original'?originalData:data[`./${id}/animation.json`];const article=document.createElement('article'),heading=document.createElement('h2');heading.textContent=title;article.append(heading);$('cards').append(article);
 if(!m){article.append('尚未完成');continue;}const image=new Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error(title+'加载失败'));image.src=id==='original'?originalUrl:urls[`./${id}/media/e-atlas.png`];});
 const canvas=document.createElement('canvas');canvas.width=m.width;canvas.height=m.height;canvas.style.width=`${m.width*2}px`;canvas.style.height=`${m.height*2}px`;article.append(canvas);clips.push({image,canvas,m});
 const link=document.createElement('a');link.textContent='逐帧图';link.href=id==='original'?'../r-v1-last-breath/media/e-frames.png':`./${id}/media/e-frames.png`;article.append(link);
 if(id!=='original'){const details=document.createElement('details'),summary=document.createElement('summary'),pre=document.createElement('pre');summary.textContent='生成要求';const args=plans[`./${id}/motion.plan.json`].args;pre.textContent=args[args.indexOf('--prompt')+1];details.append(summary,pre);article.append(details);}
 }requestAnimationFrame(tick);}
function tick(now:number){const dt=prev?now-prev:0;prev=now;if(playing){elapsed+=dt*Number(($('speed') as HTMLSelectElement).value);if(elapsed>=1600){if(loop)elapsed%=1600;else{elapsed=1600;playing=false;}}}const frame=Math.min(15,Math.floor(elapsed/100));for(const {image,canvas,m} of clips){const c=canvas.getContext('2d')!;c.clearRect(0,0,m.width,m.height);c.imageSmoothingEnabled=false;c.drawImage(image,frame%4*m.width,Math.floor(frame/4)*m.height,m.width,m.height,0,0,m.width,m.height);}($('scrub') as HTMLInputElement).value=String(frame);$('status').textContent=`${frame+1}/16 帧 · ${playing?'播放中':'暂停'}`;requestAnimationFrame(tick);}
$('once').onclick=()=>{elapsed=0;playing=true;loop=false;};$('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};$('pause').onclick=()=>{playing=!playing;};$('scrub').oninput=()=>{elapsed=Number(($('scrub') as HTMLInputElement).value)*100;playing=false;};init().catch(e=>{$('status').textContent=String(e);});
