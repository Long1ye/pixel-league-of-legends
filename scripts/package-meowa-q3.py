"""Register the generated Q3 loop to a fixed foot point, preserving native soft alpha."""
from pathlib import Path
from PIL import Image
import json,hashlib
root=Path('assets/effects/yasuo-q3-meowa-2026-10-19');runtime=root/'runtime';runtime.mkdir(exist_ok=True)
records=[]
for folder,key,columns,rows in [('generated','tornado',4,2),('hit-generated','hit',2,2)]:
 manifest=json.loads(next((root/folder).rglob('final_outputs.json')).read_text(encoding='utf-8'));source=Path(manifest['outputs'][0]['path']);sheet=Image.open(source).convert('RGBA')
 assert sheet.size==(1024,1024) and sheet.getchannel('A').getextrema()[0]==0
 width,height=sheet.width//columns,sheet.height//rows;atlas=Image.new('RGBA',sheet.size);frames=[];bounds=[];shifts=[]
 for index in range(columns*rows):
  cell=sheet.crop((index%columns*width,index//columns*height,(index%columns+1)*width,(index//columns+1)*height))
  bound=cell.getchannel('A').point(lambda a:255 if a>48 else 0).getbbox();assert bound
  dx=dy=0
  if key=='tornado':
   weighted=[(x,cell.getpixel((x,y))[3]) for y in range(max(0,bound[3]-18),bound[3]) for x in range(width) if cell.getpixel((x,y))[3]>48]
   axis=round(sum(x*a for x,a in weighted)/sum(a for _,a in weighted));dx=width//2-axis;dy=460-bound[3]
   aligned=Image.new('RGBA',cell.size);aligned.paste(cell,(dx,dy));cell=aligned
  shifts.append([dx,dy]);bounds.append(cell.getchannel('A').point(lambda a:255 if a>48 else 0).getbbox());frames.append(cell);atlas.paste(cell,(index%columns*width,index//columns*height))
 atlas.save(runtime/(key+'-atlas.png'))
 frames[0].save(runtime/(key+'-preview.webp'),save_all=True,append_images=frames[1:],duration=125 if key=='tornado' else 100,loop=0,lossless=True)
 background=Image.new('RGBA',atlas.size,(43,55,61,255));background.alpha_composite(atlas);background.save(root/(key+'-contact.png'))
 records.append(dict(key=key,job=manifest['job_id'],source=str(source),sha256=hashlib.sha256(source.read_bytes()).hexdigest(),cell=[width,height],columns=columns,frames=len(frames),alignment_shifts=shifts,bounds=bounds,alpha=sheet.getchannel('A').getextrema(),resampled=False))
(root/'contract.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(records,ensure_ascii=False,indent=2))
