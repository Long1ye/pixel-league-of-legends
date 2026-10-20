"""Export every high-frame-rate Meowa frame, with a shared padded reference anchor."""
from pathlib import Path
import hashlib
import json
import math
import shutil
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/hero-emotes/2026-10-19/yasuo-v2-high'
OUT=ROOT/'assets/heroes/yasuo/emotes-v2-high-2026-10-19'

def package():
    clips=[]
    for action in ['joke','taunt','laugh']:
        retry=SOURCE/f'{action}-retry-1080'
        media_root=retry if list(retry.rglob('final_outputs.json')) else SOURCE/action
        manifest=next(media_root.rglob('final_outputs.json'))
        outputs=json.loads(manifest.read_text(encoding='utf-8'))
        candidates=[ROOT/o['path'] for o in outputs['outputs'] if o.get('mime_type')=='image/webp']
        transparent=[]
        for path in candidates:
            with Image.open(path) as candidate:
                if candidate.convert('RGBA').getchannel('A').getextrema()[0]==0:
                    transparent.append(path)
        assert len(transparent)==1, f'{action}: expected exactly one transparent animation'
        source=transparent[0]
        im=Image.open(source)
        w,h=im.size
        assert im.n_frames>=80, f'{action}: high-frame-rate output missing'
        # Pixel mode must preserve the prepared 160 x 168 pixel canvas.
        assert (w,h)==(160,168), f'{action}: inspect the changed canvas before integrating: {w}x{h}'
        columns=math.ceil(math.sqrt(im.n_frames*h/w))
        rows=math.ceil(im.n_frames/columns)
        atlas=Image.new('RGBA',(w*columns,h*rows))
        durations=[]
        bounds=[]
        frames=[]
        for i in range(im.n_frames):
            im.seek(i);im.load()
            frame=im.convert('RGBA')
            assert set(frame.getchannel('A').getdata())<={0,255}
            atlas.paste(frame,(i%columns*w,i//columns*h))
            durations.append(im.info['duration'])
            bounds.append(frame.getbbox())
            frames.append(frame)
        OUT.mkdir(parents=True,exist_ok=True)
        atlas.save(OUT/f'{action}.png')
        shutil.copyfile(source,OUT/f'{action}.webp')
        clips.append(dict(action=action,key=f'yasuo-emote-high-{action}',sheet=f'{action}.png',width=w,height=h,
            frame_count=im.n_frames,columns=columns,rows=rows,anchor=[80,139],durations_ms=durations,
            duration_ms=sum(durations),scale_in_world=.25,source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
            generation=dict(resolution='1080p' if media_root==retry else '1080p_full',quality='detailed',high_frame_rate=True,remove_bg_batch_size=2),bounds=bounds))
        # Verify the exported atlas against all decoded frames, including alpha.
        decoded=Image.open(OUT/f'{action}.png').convert('RGBA')
        for i,frame in enumerate(frames):
            x,y=i%columns*w,i//columns*h
            assert decoded.crop((x,y,x+w,y+h)).tobytes()==frame.tobytes()
        print(f'{action}: {im.n_frames} original frames, {sum(durations)} ms, {w}x{h}, atlas {atlas.size}')
    (OUT/'animations.json').write_text(json.dumps(dict(clips=clips),indent=2),encoding='utf-8')

if __name__=='__main__':
    package()
