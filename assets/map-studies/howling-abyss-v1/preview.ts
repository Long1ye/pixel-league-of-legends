import initial from './layout.json';
import stoneUrl from '../../map-modules/howling-stone-v2/stone.png?url';
import snowUrl from '../../map-modules/howling-snow-v2/snow.png?url';
import {project,unproject,onBridge,outline,halfWidth} from './geometry';
let c=structuredClone(initial),marker:[number,number]=[-60,10];
const canvas=document.querySelector('canvas')!,ctx=canvas.getContext('2d')!;
ctx.imageSmoothingEnabled=false;
const stone=new Image(),snow=new Image();
stone.onload=render;snow.onload=render;stone.src=stoneUrl;snow.src=snowUrl;
const p=(u:number,v:number)=>project(c,u,v);
function poly(points:number[][],fill:string,stroke?:string){ctx.beginPath();points.forEach(([u,v],i)=>{const [x,y]=p(u,v);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
function line(a:number[],b:number[],color:string,width=1){ctx.beginPath();ctx.moveTo(...p(a[0],a[1]));ctx.lineTo(...p(b[0],b[1]));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
function rect(u:number,v:number,w:number,h:number,fill:string,stroke?:string){poly([[u-w/2,v-h/2],[u+w/2,v-h/2],[u+w/2,v+h/2],[u-w/2,v+h/2]],fill,stroke);}
function label(text:string,u:number,v:number,color='#b5cbd9'){const [x,y]=p(u,v);ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillStyle='#0b1622dd';const w=ctx.measureText(text).width;ctx.fillRect(x-w/2-4,y-10,w+8,16);ctx.fillStyle=color;ctx.fillText(text,x,y+2);}
function tower(u:number,v:number,color:string,name:string){const [x,y]=p(u,v);ctx.fillStyle='#162633';ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y,13,10,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.fillRect(x-3,y-4,6,7);label(name,u,v+25,color);}
function render(){
 ctx.fillStyle='#09121f';ctx.fillRect(0,0,1080,644);
 // Sparse depth contours remain decorative, never walkable geometry.
 for(let i=0;i<9;i++){ctx.strokeStyle=i%2?'#162b3c':'#102132';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,125+i*45);ctx.lineTo(230,100+i*38);ctx.lineTo(800,40+i*45);ctx.lineTo(1080,90+i*40);ctx.stroke();}
 ctx.fillStyle='#496577';ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillText('深渊 / 不可通行',38,74);ctx.fillText('深渊 / 不可通行',880,585);
 const edge=outline(c);
 for(let u=-600;u<=600;u+=150){const v=halfWidth(c,u);const a=p(u-20,v),b=p(u+20,v);ctx.fillStyle='#152d40';ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.lineTo(b[0]-10,b[1]+66);ctx.lineTo(a[0]+4,a[1]+66);ctx.closePath();ctx.fill();}
 ctx.save();ctx.translate(0,12);poly(edge,'#1b3345','#345365');ctx.restore();
 poly(edge,'#405b6c','#afcbd8');
 // All floor markings are replaceable blockout drawing, not baked art.
 ctx.save();ctx.beginPath();edge.forEach(([u,v],i)=>{const [x,y]=p(u,v);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.closePath();ctx.clip();
 if(document.querySelector<HTMLInputElement>('#materials')!.checked&&stone.complete&&stone.naturalWidth){
  // Native 128x64 atlas cells, clipped to the existing bridge silhouette.
  // Do not stretch the generated isometric art to the blockout's planning grid.
  for(let row=-1;row<22;row++)for(let col=-1;col<10;col++){
   const x=col*128+(row%2?64:0),y=row*32;
   ctx.drawImage(stone,256,64,128,64,x-64,y-32,128,64);
  }
  if(snow.complete&&snow.naturalWidth){
   for(let u=-672,i=0;u<=672;u+=96,i++)for(const side of [-1,1]){
    const [x,y]=p(u,side*(halfWidth(c,u)-24));
    const variant=(i*3+(side===1?1:0))%4,density=i%3===0?2:3;
    ctx.drawImage(snow,variant*128,density*64,128,64,x-64,y-32,128,64);
   }
   for(let u=-600,i=0;u<=600;u+=144,i++){
    const [x,y]=p(u,(i%2?1:-1)*28);
    ctx.drawImage(snow,(i%4)*128,0,128,64,x-64,y-32,128,64);
   }
  }
 }else{
  for(let u=-720;u<720;u+=48)for(let v=-192;v<192;v+=48){const odd=(u/48+v/48)%2===0;rect(u+24,v+24,47,47,odd?'#486374':'#435f70');}
 }
 ctx.setLineDash([8,10]);line([-700,0],[700,0],'#bed4dd40');ctx.setLineDash([]);
 if(document.querySelector<HTMLInputElement>('#grid')!.checked){for(let u=-720;u<=720;u+=48)line([u,-190],[u,190],'#c1e1ed50');for(let v=-192;v<=192;v+=48)line([-720,v],[720,v],'#c1e1ed50');}
 ctx.restore();
 // Snow parapet outline; bridge footprint and blocker boundary stay separate.
 for(const sign of [-1,1]){for(let u=-680;u<=680;u+=64){rect(u,sign*(halfWidth(c,u)-5),32,10,'#b7cbd4','#708fa2');}}
 if(document.querySelector<HTMLInputElement>('#slots')!.checked){
  for(const b of c.brush){rect(b.u,b.v,b.length,b.width,'#284847','#83a49a');for(let u=b.u-b.length/2+8;u<b.u+b.length/2;u+=12)line([u,b.v-b.width/3],[u+12,b.v+b.width/3],'#799f9160');label('草丛',b.u,b.v);}
  for(const sign of [1,-1]){const color=sign===1?'#82c9ed':'#e4a1ae',b=c.blue;
   rect(sign*b.spawn[0],0,88,148,sign===1?'#345b70':'#644d60',color);label('出生 / 商店',sign*b.spawn[0],0,color);
   rect(sign*b.nexus[0],0,47,47,'#203948',color);label('基地',sign*b.nexus[0],0,color);
   for(const [u,v] of b.nexusTowers)tower(sign*u,sign*v,color,'门牙');
   rect(sign*b.inhibitor[0],0,29,29,'#243a47',color);label('水晶',sign*b.inhibitor[0],30,color);
   tower(sign*b.innerTower[0],0,color,'内塔');tower(sign*b.outerTower[0],0,color,'外塔');
  }
 }
 label('中央对线区',0,-32,'#ecf0df');
 const [mx,my]=p(...marker);ctx.fillStyle='#f5da8d';ctx.fillRect(mx-5,my-11,10,13);ctx.strokeStyle='#f5da8d80';ctx.beginPath();ctx.ellipse(mx,my+3,13,7,0,0,Math.PI*2);ctx.stroke();
 ctx.textAlign='left';ctx.fillStyle='#92acbd';ctx.font='12px system-ui';ctx.fillText('轮廓 → 碰撞 → 地表 → 独立物件 → 氛围层',28,614);
}
canvas.onclick=e=>{const r=canvas.getBoundingClientRect(),pos=unproject(c,(e.clientX-r.left)*1080/r.width,(e.clientY-r.top)*644/r.height);if(onBridge(c,...pos)){marker=pos;render();}};
document.querySelector<HTMLInputElement>('#width')!.oninput=e=>{c.bridge.halfWidth=Number((e.target as HTMLInputElement).value);document.querySelector('#widthText')!.textContent=String(c.bridge.halfWidth*2);if(!onBridge(c,...marker))marker=[0,0];render();};
for(const id of ['slots','grid','materials'])document.querySelector(`#${id}`)!.addEventListener('change',render);
document.querySelector('#reset')!.addEventListener('click',()=>{c=structuredClone(initial);marker=[-60,10];document.querySelector<HTMLInputElement>('#width')!.value='112';document.querySelector('#widthText')!.textContent='224';render();});
document.querySelector('#save')!.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(c,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='howling-abyss-layout.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
render();
