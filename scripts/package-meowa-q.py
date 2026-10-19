"""Package declared Meowa final sheets without resampling or repainting the artwork."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib
root=Path('assets/effects/yasuo-q-meowa-2026-10-19');runtime=root/'runtime';runtime.mkdir(exist_ok=True)
records=[]
for folder,key,rows in [('generated','thrust',4),('hit-generated','hit',2)]:
 manifest=json.loads(next((root/folder).rglob('final_outputs.json')).read_text(encoding='utf-8'))
 source=Path(manifest['outputs'][0]['path']);sheet=Image.open(source).convert('RGBA')
 assert sheet.size==(1024,1024)
 alpha=sheet.getchannel('A');assert alpha.getextrema()[0]==0 and alpha.getextrema()[1]>200
 width,height=sheet.width//2,sheet.height//rows
 frames=[];bounds=[];shifts=[];atlas=Image.new('RGBA',sheet.size)
 for index in range(rows*2):
  cell=sheet.crop((index%2*width,index//2*height,(index%2+1)*width,(index//2+1)*height))
  dy=0
  if key=='thrust':
   axis=max(range(height),key=lambda y:sum((sum(cell.getpixel((x,y))[:3])/765)**4*cell.getpixel((x,y))[3] for x in range(80,500)))
   dy=height//2-axis
   aligned=Image.new('RGBA',cell.size);aligned.paste(cell,(0,dy));cell=aligned
  shifts.append([0,dy]);atlas.paste(cell,(index%2*width,index//2*height))
  bounds.append(cell.getchannel('A').point(lambda a:255 if a>48 else 0).getbbox());frames.append(cell)
 atlas.save(runtime/(key+'-atlas.png'))
 frames[0].save(runtime/(key+'-preview.webp'),save_all=True,append_images=frames[1:],duration=100,loop=0,lossless=True)
 # Alpha-composited native-size contact sheet for edge review.
 background=Image.new('RGBA',sheet.size,(47,58,65,255));background.alpha_composite(sheet);background.save(root/(key+'-contact.png'))
 records.append(dict(key=key,job=manifest['job_id'],source=str(source),sha256=hashlib.sha256(source.read_bytes()).hexdigest(),cell=[width,height],frames=len(frames),bounds=bounds,alignment_shifts=shifts,alpha=alpha.getextrema(),resampled=False))
(root/'contract.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(records,ensure_ascii=False,indent=2))
