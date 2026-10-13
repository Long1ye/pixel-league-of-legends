import data from './animation.json';
import plan from './motion.plan.json';
import atlasUrl from './media/e-atlas.png?url';
const $=(id:string)=>document.getElementById(id)!;
const canvas=$('animation') as HTMLCanvasElement, ctx=canvas.getContext('2d')!, image=new Image();
const scrub=$('scrub') as HTMLInputElement;
canvas.width=data.width; canvas.height=data.height; canvas.style.width=`${data.width*2}px`; canvas.style.height=`${data.height*2}px`;
let elapsed=0, playing=true, loop=false, previous:number|undefined;
function frameAt(t:number){let end=0; for(let i=0;i<data.count;i++){end+=data.durations[i];if(t<end)return i;}return data.count-1;}
function draw(c:CanvasRenderingContext2D,i:number){c.clearRect(0,0,data.width,data.height);c.imageSmoothingEnabled=false;c.drawImage(image,i%4*data.width,Math.floor(i/4)*data.height,data.width,data.height,0,0,data.width,data.height);}
image.onload=()=>{
  scrub.max=String(data.count-1);
  $('once').onclick=()=>{elapsed=0;playing=true;loop=false;}; $('loop').onclick=()=>{elapsed=0;playing=true;loop=true;};
  $('pause').onclick=()=>{playing=!playing;}; scrub.oninput=()=>{playing=false;elapsed=data.durations.slice(0,Number(scrub.value)).reduce((a,b)=>a+b,0);};
  for(let i=0;i<data.count;i++){const f=document.createElement('figure'), c=document.createElement('canvas'), label=document.createElement('figcaption');c.width=data.width;c.height=data.height;draw(c.getContext('2d')!,i);label.textContent=`${i+1}/${data.count}`;f.append(c,label);$('frames').append(f);}
  function tick(now:number){const dt=previous===undefined?0:now-previous;previous=now;const selected=($('speed') as HTMLSelectElement).value;
    if(playing){elapsed+=dt*(selected==='game'?data.totalDuration/320:Number(selected));if(elapsed>=data.totalDuration){if(loop)elapsed%=data.totalDuration;else{elapsed=data.totalDuration;playing=false;}}}
    const frame=frameAt(elapsed);draw(ctx,frame);scrub.value=String(frame);$('status').textContent=`${frame+1}/${data.count} 帧 · ${Math.round(elapsed)}/${data.totalDuration}ms · ${playing?'播放中':'已停留'}`;requestAnimationFrame(tick);
  }requestAnimationFrame(tick);
};
$('prompt').textContent=plan.args[plan.args.indexOf('--prompt')+1]; image.src=atlasUrl;
