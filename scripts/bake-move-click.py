"""Bake the client mesh with a scrolling texture, rather than deforming its geometry.

The local reference video shows the texture travelling down the curved arrow surfaces.
Lifetime .4 is from cursor_moveto.troybin. UV travel is calibrated against that clip;
the client's complete material/shadow pipeline is not reproduced.
"""
from pathlib import Path
import json,math,sys
from PIL import Image,ImageDraw,ImageChops

OUT=Path('assets/ui/move-click-2026-10-15/official')
mesh=json.loads((OUT/'movement-mesh.json').read_text())
red='--red' in sys.argv
suffix='-red' if red else ''
source=Image.open(OUT/('movement_indicator_red.png' if red else 'movement_indicator.png')).convert('RGBA')
vertices=mesh['vertices']
faces=sorted(mesh['faces'],key=lambda f:sum(vertices[i][2] for i in f['indices']))
frames=[]
for frame in range(24):
 age=frame/60;canvas=Image.new('RGBA',(128,128))
 for face in faces:
  points=[(64+vertices[i][0]*1.4,64-vertices[i][1]*1.4+vertices[i][2]*.7) for i in face['indices']]
  (x0,y0),(x1,y1),(x2,y2)=points
  det=(x1-x0)*(y2-y0)-(x2-x0)*(y1-y0)
  # Cull the back surface: the SCB has paired front/back arrow surfaces.
  if det<.00001:continue
  uv=[(u*source.width,(v+1-2*age)*source.height) for u,v in face['uv']]
  (u0,v0),(u1,v1),(u2,v2)=uv
  a=((u1-u0)*(y2-y0)-(u2-u0)*(y1-y0))/det
  b=((x1-x0)*(u2-u0)-(x2-x0)*(u1-u0))/det
  d=((v1-v0)*(y2-y0)-(v2-v0)*(y1-y0))/det
  e=((x1-x0)*(v2-v0)-(x2-x0)*(v1-v0))/det
  left=max(0,math.floor(min(x for x,y in points)));top=max(0,math.floor(min(y for x,y in points)))
  right=min(128,math.ceil(max(x for x,y in points))+1);bottom=min(128,math.ceil(max(y for x,y in points))+1)
  if right<=left or bottom<=top:continue
  size=(right-left,bottom-top)
  triangle=source.transform(size,Image.Transform.AFFINE,(a,b,u0-a*x0-b*y0+a*left+b*top,d,e,v0-d*x0-e*y0+d*left+e*top),Image.Resampling.BILINEAR)
  mask=Image.new('L',size);ImageDraw.Draw(mask).polygon([(x-left,y-top) for x,y in points],fill=255)
  triangle.putalpha(ImageChops.multiply(triangle.getchannel('A'),mask));canvas.alpha_composite(triangle,(left,top))
 frames.append(canvas)
atlas=Image.new('RGBA',(128*24,128))
for i,im in enumerate(frames):atlas.paste(im,(i*128,0))
atlas.save(OUT/f'move-click-atlas{suffix}.png')
sheet=Image.new('RGBA',(128*6,150*4),(22,39,52,255));draw=ImageDraw.Draw(sheet)
for i,im in enumerate(frames):
 sheet.alpha_composite(im,(i%6*128,i//6*150));draw.text((i%6*128+4,i//6*150+130),f'{i/60:.3f}s',fill='white')
sheet.convert('RGB').save(OUT/f'animation-contact-sheet{suffix}.png')
preview=[Image.alpha_composite(Image.new('RGBA',(128,128),(22,39,52,255)),im).convert('RGB') for im in frames]
blank=Image.new('RGB',(128,128),(22,39,52));preview.extend([blank]*20)
preview[0].save(OUT/f'animation-preview{suffix}.gif',save_all=True,append_images=preview[1:],duration=17,loop=0)
print('Baked 24 frames, 0.4 seconds; geometry unchanged.')
