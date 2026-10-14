"""Pack approved final animation frames without modifying pixels."""
from pathlib import Path
import json
from PIL import Image, ImageSequence
root=Path(__file__).resolve().parent.parent
folder=root/'assets/hero-skills/2026-10-13/yasuo/q-v35-clean-wind'
with Image.open(folder/'clean.webp') as im:
    frames=[]; durations=[]
    for f in ImageSequence.Iterator(im):
        f.load(); frames.append(f.convert('RGBA').copy()); durations.append(f.info.get('duration',125))
w,h=frames[0].size
atlas=Image.new('RGBA',(w*4,h*((len(frames)+3)//4)))
for i,f in enumerate(frames):
    x,y=i%4*w,i//4*h; atlas.paste(f,(x,y))
    assert atlas.crop((x,y,x+w,y+h)).tobytes()==f.tobytes()
atlas.save(folder/'clean-atlas.png')
(folder/'clip.json').write_text(json.dumps(dict(width=w,height=h,count=len(frames),durations=durations,alpha=[f.getchannel('A').getextrema() for f in frames])),encoding='utf-8')
print(w,h,len(frames),durations)
