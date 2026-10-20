"""Package declared Meowa outputs, preserving each generated frame and fixed source anchor."""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/hero-emotes/2026-10-19/yasuo'
OUT=ROOT/'assets/heroes/yasuo/emotes-2026-10-19'
OUT.mkdir(parents=True,exist_ok=True)
clips=[]
for action,anchor in [('joke',[80,139]),('taunt',[80,123]),('laugh',[72,123])]:
    manifest=next((SOURCE/action).rglob('final_outputs.json'))
    outputs=json.loads(manifest.read_text(encoding='utf-8'))
    source=ROOT/next(o['path'] for o in outputs['outputs'] if o['mime_type']=='image/webp')
    im=Image.open(source)
    w,h=im.size
    assert im.n_frames==16
    atlas=Image.new('RGBA',(w*4,h*4))
    durations=[]
    bounds=[]
    for i in range(im.n_frames):
        im.seek(i);im.load()
        frame=im.convert('RGBA')
        assert set(frame.getchannel('A').getdata())<={0,255}
        atlas.paste(frame,(i%4*w,i//4*h))
        durations.append(im.info['duration'])
        bounds.append(frame.getbbox())
    atlas.save(OUT/f'{action}.png')
    shutil.copyfile(source,OUT/f'{action}.webp')
    clips.append(dict(action=action,key=f'yasuo-emote-{action}',sheet=f'{action}.png',width=w,height=h,
        frame_count=16,columns=4,rows=4,anchor=anchor,durations_ms=durations,duration_ms=sum(durations),
        scale_in_world=.25,source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),bounds=bounds))
(OUT/'animations.json').write_text(json.dumps(dict(clips=clips),indent=2),encoding='utf-8')
print('Packaged 3 emotes, 48 frames; original pixels, timings and fixed padded anchors preserved.')
