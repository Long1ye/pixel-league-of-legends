"""Validate final Meowa media, preserve all sixteen frames, and package runtime atlases."""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'assets/heroes/yasuo/locomotion16-2026-10-15'
OLD=ROOT/'assets/heroes/yasuo/selected-2026-10-10'

def package(allow_partial=False):
    ledger=json.loads((BASE/'generation.json').read_text(encoding='utf-8'))
    original=json.loads((OLD/'animations.json').read_text(encoding='utf-8'))
    corrections_path=BASE/'corrections.json'
    corrections=json.loads(corrections_path.read_text(encoding='utf-8')) if corrections_path.exists() else {}
    runtime=BASE/'runtime';runtime.mkdir(exist_ok=True)
    clips=[];validation=[]
    for job in ledger['jobs']:
        if job['status']!='success':
            if allow_partial:continue
            raise RuntimeError('Incomplete clip: '+job['key'])
        correction=corrections.get(job['key'],{})
        manifest_path=correction.get('manifest',job['manifest'])
        manifest=json.loads((ROOT/manifest_path).read_text(encoding='utf-8'))
        assert manifest['status']=='success'
        png=next(Path(m['path']) for m in manifest['outputs'] if m['mime_type']=='image/png')
        webp=next(Path(m['path']) for m in manifest['outputs'] if m['mime_type']=='image/webp')
        gifs=[Path(m['path']) for m in manifest['outputs'] if m['mime_type']=='image/gif']
        atlas=Image.open(png).convert('RGBA')
        source_shape=atlas.size
        if source_shape==(2048,128):
            strip=atlas;atlas=Image.new('RGBA',(512,512))
            for i in range(16):
                atlas.paste(strip.crop((i*128,0,(i+1)*128,128)),(i%4*128,i//4*128))
        assert atlas.size==(512,512), (job['key'],atlas.size)
        native=Image.open(webp);assert native.n_frames==16 and native.size==(128,128)
        animations=[native,*[Image.open(gif) for gif in gifs]]
        for media in animations:
            assert media.n_frames==16 and media.size==(128,128)
            for i in range(16):
                media.seek(i);media.load()
                assert media.convert('RGBA').getchannel('A').getextrema()==(0,255)
        unique=set();bounds=[]
        for i in range(16):
            frame=atlas.crop((i%4*128,i//4*128,(i%4+1)*128,(i//4+1)*128))
            alpha=frame.getchannel('A');assert alpha.getextrema()==(0,255)
            # Compare meaningful visible bounds: soft background remnants must not affect anchor checks.
            bound=alpha.point(lambda value:255 if value>=128 else 0).getbbox()
            assert bound and bound[0]>0 and bound[1]>0 and bound[2]<128 and bound[3]<128,(job['key'],i,bound)
            unique.add(hashlib.sha256(frame.tobytes()).hexdigest());bounds.append(bound)
        assert len(unique)>=12,(job['key'],'too many repeated poses',len(unique))
        filename=job['key']+'.png'
        if source_shape==(512,512):shutil.copy2(png,runtime/filename)
        else:atlas.save(runtime/filename)
        previous=next(c for c in original['locomotion'] if c['state']==job['state'] and c['direction']==job['direction'])
        durations=correction.get('durations_ms',[50]*16)
        assert len(durations)==16 and sum(durations)==800 and all(d>0 for d in durations)
        clips.append(dict(state=job['state'],direction=job['direction'],key=previous['key'],sheet=filename,
            width=128,height=128,frame_count=16,columns=4,rows=4,anchor=previous['anchor'],
            durations_ms=durations,duration_ms=800,source_pixels_preserved=True,
            source_sha256=hashlib.sha256(png.read_bytes()).hexdigest()))
        validation.append(dict(clip=job['key'],frame_count=16,unique_frames=len(unique),alpha=True,bounds=bounds))
    catalog=dict(hero='yasuo',frame_count=16,cycle_ms=800,source='Meowa animate-run',locomotion=clips)
    (BASE/'animations.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
    (BASE/'validation.json').write_text(json.dumps(dict(clips=validation,complete=len(clips)==16),indent=2),encoding='utf-8')
    # One native-resolution contact sheet per direction: idle above walking, all 16 frames each.
    qa=BASE/'contact-sheets';qa.mkdir(exist_ok=True)
    for direction in {c['direction'] for c in clips}:
        contact=Image.new('RGBA',(1024,4*148),'#1b2a37');draw=ImageDraw.Draw(contact)
        for state,offset in [('idle',0),('walk',2)]:
            clip=next((c for c in clips if c['direction']==direction and c['state']==state),None)
            if not clip:continue
            atlas=Image.open(runtime/clip['sheet']).convert('RGBA')
            for i in range(16):
                cell=atlas.crop((i%4*128,i//4*128,(i%4+1)*128,(i//4+1)*128))
                x=i%8*128;y=(offset+i//8)*148
                contact.alpha_composite(cell,(x,y));draw.text((x+4,y+131),f'{state} {direction} {i+1}',fill='white')
        contact.convert('RGB').save(qa/f'{direction}.png')
    print(f'Packaged {len(clips)} clips; all frames, alpha, dimensions and canvas margins checked.')

if __name__=='__main__':
    import sys
    package('--partial' in sys.argv)
