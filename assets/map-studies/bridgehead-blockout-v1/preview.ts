const canvas=document.querySelector('canvas')!,ctx=canvas.getContext('2d')!;
const control=(id:string)=>document.getElementById(id) as HTMLInputElement;
type V=[number,number,number];
type Block={u:number;v:number;w:number;d:number;h:number;z?:number;color?:string};
let facing=1;
const project=([u,v,z]:V):[number,number]=>[600+facing*(u*.99+v*.74),450+facing*(-u*.47+v*.8)-z];
function polygon(points:V[],fill:string,stroke='#253c4d'){
 ctx.beginPath();points.forEach((p,i)=>{const [x,y]=project(p);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();
}
function box(b:Block){
 const {u,v,w,d,h}=b,z=b.z??0;
 const p:V[]=[[u-w/2,v-d/2,z],[u+w/2,v-d/2,z],[u+w/2,v+d/2,z],[u-w/2,v+d/2,z]];
 const q=p.map(([x,y,k])=>[x,y,k+h] as V);
 for(let i=0;i<4;i++){
  const j=(i+1)%4;
  if((facing===1&&(i===2||i===3))||(facing===-1&&(i===0||i===1)))polygon([p[i],p[j],q[j],q[i]],b.color??(i%2?'#455c6d':'#536d7e'));
 }
 polygon(q,b.color??'#8096a3');
}
function line(points:V[],color:string,dash:number[]=[]){ctx.beginPath();points.forEach((p,i)=>{const [x,y]=project(p);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.strokeStyle=color;ctx.lineWidth=2;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
function label(text:string,p:V,dx=0,dy=0){const [x,y]=project(p);ctx.font='15px system-ui';const w=ctx.measureText(text).width+16;ctx.fillStyle='#0b1721ed';ctx.fillRect(x+dx-w/2,y+dy-12,w,26);ctx.fillStyle='#dbe7ee';ctx.fillText(text,x+dx-w/2+8,y+dy+6);}
function render(){
 facing=Number((document.getElementById('side') as HTMLSelectElement).value);
 const width=Number(control('width').value)/100,height=Number(control('height').value)/100,half=160*width,isolated=control('compare').checked;
 document.getElementById('ratio')!.textContent=`${width.toFixed(2)} × 平台`;
 ctx.clearRect(0,0,1200,760);
 // An orthographic world-space greybox, not a rotated flat building illustration.
 if(!isolated)for(const b of [{u:-270,v:-140,w:240,d:130,h:135,z:-135},{u:-240,v:135,w:190,d:150,h:150,z:-150},{u:-160,v:0,w:200,d:260,h:120,z:-120}])box({...b,color:'#243c4f'});
 box({u:150,v:0,w:340,d:320,h:24,z:-24,color:'#486374'});
 box({u:-105,v:0,w:210,d:isolated?120:half*2,h:24,z:-24,color:'#486374'});
 for(let u=-200;u<=320;u+=26)line([[u,u<0?-Math.min(half,160):-160,1],[u,u<0?Math.min(half,160):160,1]],'#567486');
 for(let v=-156;v<=156;v+=26)line([[isolated&&Math.abs(v)>60?0:-200,v,1],[320,v,1]],'#567486');
 line([[0,-160,2],[320,-160,2],[320,160,2],[0,160,2],[0,-160,2]],'#8dcdd8',[8,5]);
 line([[-225,0,3],[280,0,3]],'#c5d9d9',[9,8]);
 const blocks:Block[]=[];
 const gate=(u:number,h:number)=>{
  blocks.push({u,v:-70,w:34,d:36,h},{u,v:70,w:34,d:36,h},{u,v:0,w:34,d:104,h:30,z:h-30});
  // Stepped underside suggests an arch without filling its passage.
  blocks.push({u,v:-43,w:34,d:18,h:12,z:h-42},{u,v:43,w:34,d:18,h:12,z:h-42});
 };
 gate(-85,115*height);
 if(!isolated){
  gate(-225,85*height);
  for(const sign of [-1,1]){
   blocks.push({u:-90,v:sign*(half+88)/2,w:38,d:half-88,h:68*height});
   for(let i=100;i<half-30;i+=25)blocks.push({u:-90,v:sign*i,w:38,d:12,h:12,z:68*height});
  }
  blocks.push({u:-112,v:-half+24,w:80,d:72,h:155*height});
  blocks.push({u:-112,v:half-24,w:82,d:74,h:74*height});
  for(let i=0;i<4;i++)blocks.push({u:-112+(i%2?26:-26),v:-half+24+(i<2?-25:25),w:22,d:22,h:17,z:155*height});
  for(let i=0;i<3;i++)blocks.push({u:-127+i*18,v:half-22,w:16,d:35,h:10+i*9,z:74*height});
  for(let i=0;i<5;i++)blocks.push({u:-30+i*11,v:half-35+(i%2)*10,w:18,d:15,h:8+(i%3)*4,color:'#617684'});
  for(let i=0;i<3;i++)blocks.push({u:-20-i*22,v:-105,w:18,d:18,h:i===1?28:17,color:'#7d7060'});
  blocks.push({u:-155,v:half-25,w:12,d:60,h:110*height,color:'#716957'});
  blocks.push({u:-235,v:half-45,w:55,d:36,h:40,color:'#5a6974'});
 }
 blocks.sort((a,b)=>project([a.u,a.v,0])[1]-project([b.u,b.v,0])[1]).forEach(box);
 if(!isolated){
  line([[-112,-half+24,155*height],[-112,-half+24,200*height]],'#9aafb9');
  polygon([[-112,-half+24,198*height],[-112,-half+58,192*height],[-112,-half+58,171*height],[-112,-half+24,178*height]],facing===1?'#427f9a':'#925265');
  line([[-148,half-25,0],[-80,half-25,110*height]],'#ab9270');
 }
 // A small scale reference on the actual spawn platform.
 const [hx,hy]=project([140,25,0]);ctx.fillStyle='#b7d1dd';ctx.fillRect(hx-5,hy-26,10,24);ctx.beginPath();ctx.arc(hx,hy-31,5,0,Math.PI*2);ctx.fill();
 if(control('labels').checked){
  label('出生平台 · 不改动',[160,80,0],100,50);
  label('同轴通道 / 宽门洞',[-55,0,0],facing*60,38);
  if(!isolated){
   label('01 完整守卫塔',[-112,-half+24,200*height],0,-26);
   label('02 残塔＋木梁加固',[-110,half-24,100*height],facing*100,0);
   label('03 第二道门 / 要塞内院',[-225,0,95*height],-facing*90,-20);
   label('补给区',[-35,-110,30],-50,0);
  }
 }
 ctx.font='13px system-ui';ctx.fillStyle='#8aa8ba';ctx.fillText('结构灰模 · 非最终材质 · 不增加可行走区域',24,732);
}
for(const id of ['width','height','labels','compare','side'])document.getElementById(id)!.addEventListener('input',render);
document.getElementById('reset')!.addEventListener('click',()=>{control('width').value='112';control('height').value='90';control('compare').checked=false;render();});
render();
