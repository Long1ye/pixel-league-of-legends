"""Package the user flute animation without changing any source pixels."""
from pathlib import Path
from PIL import Image
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'assets/source-materials/heroes/yasuo/亚索吹箫.webp'
before=hashlib.sha256(source.read_bytes()).hexdigest()
im=Image.open(source);w,h=im.size;n=im.n_frames
atlas=Image.new('RGBA',(w*8,h*((n+7)//8)))
durations=[];bounds=[]
for i in range(n):
 im.seek(i);im.load();frame=im.convert('RGBA');durations.append(im.info['duration'])
 assert frame.getchannel('A').getextrema()==(0,255)
 bounds.append(frame.getbbox());atlas.paste(frame,(i%8*w,i//8*h))
out=ROOT/'assets/heroes/yasuo/flute-user';out.mkdir(parents=True,exist_ok=True)
atlas.save(out/'flute.png')
clip=dict(key='yasuo-flute-user',sheet='flute.png',width=w,height=h,frame_count=n,columns=8,rows=(n+7)//8,anchor=[32,108],durations_ms=durations,duration_ms=sum(durations),scale_in_world=.25,source_sha256=before,bounds=bounds)
(out/'animation.json').write_text(json.dumps(clip,indent=2),encoding='utf-8')
assert hashlib.sha256(source.read_bytes()).hexdigest()==before
print(f'Packaged {n} original frames, {sum(durations)} ms, alpha preserved.')
