/** Lossless original-pixel extraction; only selected holes use the Meowa ground candidate. */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {inflateSync,deflateSync} from 'node:zlib';
import {MAP_REGIONS,insidePolygon,layerPixel} from '../src/render/MapLayerLayout.ts';
const root='assets/map-layers/forest-v1';
const source='assets/map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png';
const candidate=root+'/generated-ground/制作这张地图的干净地面补底_移除树冠和河岸的高草_补出它们遮挡的土壤_草地或_82a1b3cc/edited.png';
function decode(path){
 const bytes=readFileSync(path),chunks=[];let w,h,type,depth,interlace,palette,trns;
 for(let p=8;p<bytes.length;){const n=bytes.readUInt32BE(p),tag=bytes.toString('ascii',p+4,p+8),d=bytes.subarray(p+8,p+8+n);p+=n+12;
 if(tag==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);depth=d[8];type=d[9];interlace=d[12];}if(tag==='IDAT')chunks.push(d);if(tag==='PLTE')palette=d;if(tag==='tRNS')trns=d;}
 if(depth!==8||interlace||![2,3,6].includes(type))throw Error('Unsupported PNG encoding');
 const channels=type===6?4:type===2?3:1,stride=w*channels,raw=inflateSync(Buffer.concat(chunks)),unfiltered=Buffer.alloc(h*stride),rgba=new Uint8Array(w*h*4);
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<h;y++){const filter=raw[y*(stride+1)];for(let x=0;x<stride;x++){const i=y*stride+x,a=x>=channels?unfiltered[i-channels]:0,b=y?unfiltered[i-stride]:0,c=y&&x>=channels?unfiltered[i-stride-channels]:0;unfiltered[i]=(raw[y*(stride+1)+x+1]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][filter])&255;}}
 for(let i=0;i<w*h;i++){const p=i*channels,q=i*4,k=unfiltered[p];rgba[q]=type===3?palette[k*3]:k;rgba[q+1]=type===3?palette[k*3+1]:unfiltered[p+1];rgba[q+2]=type===3?palette[k*3+2]:unfiltered[p+2];rgba[q+3]=type===6?unfiltered[p+3]:type===3?(trns?.[k]??255):255;}
 return {w,h,data:rgba};
}
function crc32(data){let c=0xffffffff;for(const b of data){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function encode(file,w,h,rgba){const chunk=(tag,data)=>{const body=Buffer.concat([Buffer.from(tag),data]),n=Buffer.alloc(4),c=Buffer.alloc(4);n.writeUInt32BE(data.length);c.writeUInt32BE(crc32(body));return Buffer.concat([n,body,c]);};const hdr=Buffer.alloc(13);hdr.writeUInt32BE(w);hdr.writeUInt32BE(h,4);hdr[8]=8;hdr[9]=6;const rows=Buffer.alloc(h*(w*4+1));for(let y=0;y<h;y++)rows.set(rgba.subarray(y*w*4,(y+1)*w*4),y*(w*4+1)+1);writeFileSync(file,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',hdr),chunk('IDAT',deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]));}
const original=decode(source),clean=decode(candidate),{w,h}=original;
if(w!==511||h!==327||clean.w!==w||clean.h!==h)throw Error('Ground alignment mismatch');
mkdirSync(root+'/layers',{recursive:true});const base=original.data.slice(),used=new Uint8Array(w*h),layers=[];
// Foreground first so water cannot steal grass edges.
const regions=[...MAP_REGIONS].sort((a,b)=>Number(a.kind==='water')-Number(b.kind==='water'));
for(const region of regions){const mask=new Uint8Array(w*h);let count=0;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,p=i*4;if(!used[i]&&insidePolygon(x+.5,y+.5,region.polygon)&&layerPixel(region.kind,...original.data.subarray(p,p+3)))mask[i]=1;}
 // Include dark silhouette outlines next to selected green leaves, not rectangular scenery.
 if(region.kind==='grass'||region.kind==='canopy'){const core=mask.slice();for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x,p=i*4;if(!used[i]&&insidePolygon(x+.5,y+.5,region.polygon)&&original.data[p]<60&&original.data[p+1]<90&&original.data[p+2]<85&&[i-1,i+1,i-w,i+w].some(j=>core[j]))mask[i]=1;}}
 let x0=w,y0=h,x1=0,y1=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(mask[i]){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x+1);y1=Math.max(y1,y+1);count++;}}
 if(!count)throw Error(`Empty layer ${region.id}`);
 const lw=x1-x0,lh=y1-y0,pixels=new Uint8Array(lw*lh*4);
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=y*w+x,p=i*4;if(!mask[i])continue;used[i]=1;pixels.set(original.data.subarray(p,p+4),((y-y0)*lw+x-x0)*4);if(region.kind!=='water')base.set(clean.data.subarray(p,p+4),p);}
 encode(`${root}/layers/${region.id}.png`,lw,lh,pixels);
 layers.push({id:region.id,kind:region.kind,x:x0,y:y0,width:lw,height:lh,pixelCount:count,file:`layers/${region.id}.png`});
}
encode(root+'/ground.png',w,h,base);
// Reassembly must be pixel-perfect with motion disabled: no missing pixels or duplicates.
const rebuilt=base.slice();for(const layer of layers){const p=decode(`${root}/${layer.file}`);for(let y=0;y<p.h;y++)for(let x=0;x<p.w;x++){const s=(y*p.w+x)*4;if(p.data[s+3])rebuilt.set(p.data.subarray(s,s+4),((y+layer.y)*w+x+layer.x)*4);}}
if(!Buffer.from(rebuilt).equals(Buffer.from(original.data)))throw Error('Layer reconstruction differs from source');
writeFileSync(root+'/layers.json',JSON.stringify({width:w,height:h,ground:'ground.png',layers},null,2)+'\n');
console.log(JSON.stringify({size:[w,h],layers:layers.map(l=>({id:l.id,pixels:l.pixelCount})),reconstruction:'pixel-perfect'}));
