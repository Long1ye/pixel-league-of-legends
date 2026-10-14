import {bridgePoint,BRIDGE_OUTLINE} from '../../../src/game/Bridge';
import {STONE_URLS,drawStoneCells} from '../../../src/render/BridgeTiles';
import {BRIDGEHEAD_URLS,drawBridgeheadApproaches,drawBridgeheadGates} from '../../../src/render/Bridgehead';
const canvas=document.querySelector('canvas')!,ctx=canvas.getContext('2d')!;
document.title='桥头要塞 · 冰岩关隘 V4';
document.querySelector('h2')!.textContent='桥头要塞 · 冰岩关隘 V4';
document.querySelector('p')!.textContent='厚墙基 · 深门洞 · 战损加固 · 嵌岩建筑 | 地图外布景';
const load=async(url:string)=>{const im=new Image();im.src=url;await im.decode();return im;};
const stones=await Promise.all(Object.entries(STONE_URLS).sort(([a],[b])=>a.localeCompare(b)).map(([,url])=>load(url)));
const parts=await Promise.all(Object.entries(BRIDGEHEAD_URLS).sort(([a],[b])=>a.localeCompare(b)).map(([,url])=>load(url)));
let side=-1;
function render(){const sign=side;
 ctx.clearRect(0,0,1200,760);ctx.save();const p=bridgePoint(sign*752,0);
 ctx.translate(600,460);ctx.scale(.75,.75);ctx.translate(-p.x,-p.y);ctx.imageSmoothingEnabled=true;
 drawBridgeheadApproaches(ctx,[]);
 ctx.save();ctx.beginPath();BRIDGE_OUTLINE.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.clip();drawStoneCells(ctx,stones);ctx.restore();
 drawBridgeheadGates(ctx,parts);ctx.restore();
}
document.getElementById('blue')!.onclick=()=>{side=-1;render();};document.getElementById('red')!.onclick=()=>{side=1;render();};render();
