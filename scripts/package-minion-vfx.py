"""Register native Meowa energy cores without scaling or repainting pixels."""
from pathlib import Path
from PIL import Image
import json, hashlib
root=Path('assets/minion-vfx'); source=next((root/'generated').rglob('result*.png'))
image=Image.open(source).convert('RGBA'); assert image.size==(1024,1024)
assert image.getchannel('A').getextrema()[0]==0
atlas=Image.new('RGBA',image.size);frames=[];shifts=[]
for i in range(16):
 cell=image.crop((i%4*256,i//4*256,(i%4+1)*256,(i//4+1)*256))
 points=[(x,y,cell.getpixel((x,y))[3]) for y in range(256) for x in range(256)
         if min(cell.getpixel((x,y))[:3])>210 and cell.getpixel((x,y))[3]>180]
 if not points:
  maximum=max(cell.getchannel('A').getdata())
  points=[(x,y,a) for y in range(256) for x in range(256) if (a:=cell.getpixel((x,y))[3])>=maximum-8]
 cx=round(sum(x*a for x,y,a in points)/sum(a for x,y,a in points));cy=round(sum(y*a for x,y,a in points)/sum(a for x,y,a in points))
 dx=(192 if i<8 else 128)-cx;dy=128-cy
 aligned=Image.new('RGBA',cell.size);aligned.paste(cell,(dx,dy));frames.append(aligned);shifts.append([dx,dy]);atlas.paste(aligned,(i%4*256,i//4*256))
(root/'runtime').mkdir(exist_ok=True);atlas.save(root/'runtime/energy-atlas.png')
for row,name in enumerate(['blue-flight','red-flight','melee-impact','caster-impact']):
 sequence=frames[row*4:row*4+4];sequence[0].save(root/f'runtime/{name}.webp',save_all=True,append_images=sequence[1:],duration=60,loop=0,lossless=True)
contact=Image.new('RGBA',image.size,(40,48,55,255));contact.alpha_composite(atlas);contact.save(root/'contact.png')
(root/'contract.json').write_text(json.dumps(dict(job='job_07ad834e0fc844a0b32a6182270a7a2a',source=str(source),sha256=hashlib.sha256(source.read_bytes()).hexdigest(),cell=[256,256],frames=16,shifts=shifts,alpha=image.getchannel('A').getextrema(),resampled=False),indent=2),encoding='utf-8')
print('Packaged 16 transparent minion attack frames')
