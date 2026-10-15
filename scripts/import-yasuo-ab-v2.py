"""Pack user A/B animations losslessly; keep the previous selection intact."""
import json, shutil, hashlib
from pathlib import Path
from PIL import Image, ImageSequence, ImageDraw

root=Path(__file__).resolve().parent.parent
dest=root/'assets/heroes/yasuo/attacks-v2-2026-10-13'
dest.mkdir(parents=True,exist_ok=True)
clips=[]
for name in ['A','B']:
    source=(root/'assets/source-materials/heroes/yasuo')/f'yasuo-{name}-v2.webp'
    shutil.copyfile(source,dest/f'attack-{name}.webp')
    frames=[]; durations=[]
    with Image.open(source) as im:
        for f in ImageSequence.Iterator(im):
            f.load(); frames.append(f.convert('RGBA').copy()); durations.append(f.info['duration'])
    w,h=frames[0].size
    atlas=Image.new('RGBA',(w*8,h*6))
    for i,f in enumerate(frames):
        atlas.paste(f,(i%8*w,i//8*h))
        assert atlas.crop((i%8*w,i//8*h,(i%8+1)*w,(i//8+1)*h)).tobytes()==f.tobytes()
    atlas.save(dest/f'attack-{name}.png')
    contact=Image.new('RGB',(w*6,(h+20)*2),'#213541'); draw=ImageDraw.Draw(contact)
    for j,i in enumerate(range(0,len(frames),4)):
        x=j%6*w;y=j//6*(h+20)
        contact.paste(frames[i],(x,y+20),frames[i]);draw.text((x,y),str(i),fill='white')
    contact.save(dest/f'review-{name}.png')
    clips.append(dict(id=name,key=f'yasuo-attack-{name}',name=f'{name} v2',webp=f'attack-{name}.webp',sheet=f'attack-{name}.png',width=w,height=h,frame_count=len(frames),columns=8,rows=6,durations_ms=durations,duration_ms=sum(durations),anchor=[48,168],impact_frame=20 if name=='A' else 16,source_pixels_preserved=True,source_sha256=hashlib.sha256(source.read_bytes()).hexdigest()))
(dest/'animations.json').write_text(json.dumps({'attacks':clips},indent=2)+'\n',encoding='utf-8')
print([(c['id'],c['frame_count'],c['duration_ms']) for c in clips])
