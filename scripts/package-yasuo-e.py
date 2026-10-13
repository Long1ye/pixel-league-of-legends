"""Package declared skill output without changing frames or source pixels."""
import json, shutil, sys
from pathlib import Path
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parent.parent
STUDY=ROOT/(sys.argv[1] if len(sys.argv)>1 else 'assets/hero-skills/2026-10-12/yasuo/e-v2-dedicated-e')
state=json.loads((STUDY/'motion.plan.state.json').read_text(encoding='utf-8'))
manifest=json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
source=ROOT/next(o['path'] for o in manifest['outputs'] if o['type']=='media' and o['path'].endswith('.webp'))
media=STUDY/'media'; media.mkdir(exist_ok=True)
frames=[]; durations=[]
with Image.open(source) as clip:
    for i in range(clip.n_frames):
        clip.seek(i); frames.append(clip.convert('RGBA')); durations.append(clip.info.get('duration',100))
w,h=frames[0].size
atlas=Image.new('RGBA',(w*4,h*((len(frames)+3)//4)))
contact=Image.new('RGB',(w*4,(h+20)*((len(frames)+3)//4)),'#203139')
for i,f in enumerate(frames):
    atlas.paste(f,(i%4*w,i//4*h)); contact.paste(f,(i%4*w,i//4*(h+20)),f)
    ImageDraw.Draw(contact).text((i%4*w+8,i//4*(h+20)+h+3),str(i+1),fill='white')
atlas.save(media/'e-atlas.png'); contact.save(media/'e-frames.png'); shutil.copy2(source,media/'e.webp')
boxes=[f.getchannel('A').getbbox() for f in frames]
data={'width':w,'height':h,'count':len(frames),'durations':durations,'totalDuration':sum(durations),'columns':4,'bounds':boxes,
      'alpha':[f.getchannel('A').getextrema() for f in frames],
      'edgeContacts':[i for i,b in enumerate(boxes) if b and (b[0]==0 or b[1]==0 or b[2]==w or b[3]==h)],'sourceJob':state['job_id']}
(STUDY/'animation.json').write_text(json.dumps(data,indent=2),encoding='utf-8')
(STUDY/'final_outputs.json').write_text(json.dumps({'final_outputs':['index.html','media/e.webp','media/e-atlas.png','media/e-frames.png']},indent=2),encoding='utf-8')
print(json.dumps(data))
