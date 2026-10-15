"""Losslessly package the generated transparent rest cycle with foot anchors."""
from pathlib import Path
from PIL import Image,ImageSequence
import json
root=Path(__file__).resolve().parent.parent
source=next((root / 'assets/generation-archive/units/bridge-camp/camp-rest-v1').glob('*/result_output_url.webp'))
im=Image.open(source)
frames=[f.convert('RGBA').copy() for f in ImageSequence.Iterator(im)]
w,h=im.size
out=(root/'assets/units/bridge-camp-v1');out.mkdir(exist_ok=True)
atlas=Image.new('RGBA',(w*4,h*2));anchors=[]
for i,f in enumerate(frames):
    box=f.getchannel('A').getbbox()
    anchors.append([(box[0]+box[2])/2,box[3]])
    atlas.paste(f,(i%4*w,i//4*h))
atlas.save(out/'rest.png')
im.save(out/'rest.webp',save_all=True,append_images=frames[1:],duration=125,loop=0,lossless=True)
(out/'rest.json').write_text(json.dumps(dict(width=w,height=h,anchors=anchors,scale=55/(box[3]-box[1]),frames=len(frames))))
print(w,h,len(frames),frames[0].getchannel('A').getextrema())
