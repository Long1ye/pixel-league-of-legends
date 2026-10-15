"""Package the generated final sheet without resampling its pixel artwork."""
from pathlib import Path
import json
from PIL import Image

root=Path('assets/effects/yasuo-aura-summoners-2026-10-15')
runtime=root/'runtime'
runtime.mkdir(parents=True,exist_ok=True)
source=Path('.cache/vfxgen/job_b304fdde1444431fbf826335076de92d/result_images_0_url.png')
im=Image.open(source).convert('RGBA')
assert im.size==(1024,1024)
im.save(root/'generated-sheet.png')
atlas=Image.new('RGBA',(1024,1280))
regions=[(0,320,0),(360,522,118),(522,728,47),(746,1024,12)]
frames=[]
for row,(top,bottom,offset) in enumerate(regions):
 for col in range(4):
  cell=Image.new('RGBA',(256,320))
  crop=im.crop((col*256,top,(col+1)*256,bottom))
  # Remove nearly invisible alpha specks between isolated effects.
  alpha=crop.getchannel('A').point(lambda a:0 if a<20 else a)
  crop.putalpha(alpha)
  cell.paste(crop,(0,offset))
  atlas.paste(cell,(col*256,row*320))
  cell.save(runtime/f'{row}-{col}.png')
  frames.append({'row':row,'frame':col,'bounds':cell.getbbox(),'alpha':cell.getchannel('A').getextrema()})
atlas.save(runtime/'vfx-atlas.png')
background=Image.new('RGBA',atlas.size,(22,35,47,255))
background.alpha_composite(atlas)
background.save(root/'contact-sheet.png')
(root/'contract.json').write_text(json.dumps({'sourceJob':'job_b304fdde1444431fbf826335076de92d',
 'cell':[256,320],'columns':4,'rows':['wind-rear','wind-front','flash','ignite'],
 'fps':12,'anchors':{'wind':[128,280],'flash':[128,165],'ignite':[128,255]},'frames':frames},indent=2),encoding='utf-8')
print('Packaged 16 transparent frames, 256x320; no resampling.')
