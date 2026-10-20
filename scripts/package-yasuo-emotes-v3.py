"""Losslessly split generated frames for Meowa cutout, then register approved cutouts."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import argparse
import hashlib
import json
import math

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/hero-emotes/2026-10-19/yasuo-v3-separated'
OUT=ROOT/'assets/heroes/yasuo/emotes-v3-2026-10-19'
CACHE=ROOT/'.cache/yasuo-emotes-v3'

def read_animation(path):
    frames=[];durations=[]
    with Image.open(path) as im:
        for i in range(getattr(im,'n_frames',1)):
            im.seek(i);im.load()
            frames.append(im.convert('RGBA'))
            durations.append(im.info.get('duration'))
    return frames,durations

def media(manifest):
    data=json.loads(manifest.read_text(encoding='utf-8'))
    assert data['status']=='success'
    return ROOT/next(o['path'] for o in data['outputs'] if o['mime_type'] in ['image/webp','image/png'])

def prepare(action):
    source=media(next((SOURCE/action).rglob('final_outputs.json')))
    frames,durations=read_animation(source)
    assert len(frames)==90 and frames[0].size==(160,168)
    backgrounds=[f.getpixel((0,0))[:3] for f in frames]
    ranges=[];run_start=0
    for i in range(1,len(frames)+1):
        if i==len(frames) or backgrounds[i]!=backgrounds[run_start]:
            ranges.extend((start,min(i,start+16)) for start in range(run_start,i,16));run_start=i
    chunks=[];folder=CACHE/f'{action}-chunks';folder.mkdir(parents=True,exist_ok=True)
    for start,end in ranges:
        part=frames[start:end];times=durations[start:end];path=folder/f'{start:03d}.webp'
        part[0].save(path,save_all=True,append_images=part[1:],duration=times,loop=0,lossless=True,exact=True,method=6)
        decoded,decoded_times=read_animation(path)
        assert len(decoded)==len(part) and (len(part)==1 or decoded_times==times)
        assert all(a.tobytes()==b.tobytes() for a,b in zip(part,decoded))
        color='#'+''.join(f'{c:02x}' for c in backgrounds[start])
        chunks.append(dict(start=start,count=len(part),path=str(path.relative_to(ROOT)),durations_ms=times,background=color))
    info=dict(source=str(source.relative_to(ROOT)),source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
        chunks=chunks)
    (folder/'chunks.json').write_text(json.dumps(info,indent=2),encoding='utf-8')
    print(f'{action}: {len(frames)} frames, {sum(durations)} ms, {len(set(backgrounds))} background colors, {len(chunks)} lossless chunks')

def package(action):
    info=json.loads((CACHE/f'{action}-chunks/chunks.json').read_text(encoding='utf-8'))
    frames=[];durations=[];inputs=[]
    for chunk in info['chunks']:
        original=SOURCE/f'{action}-cutout'/f'{chunk["start"]:03d}'
        refined=SOURCE/f'{action}-cutout'/f'{chunk["start"]:03d}-refined'
        folder=refined if list(refined.rglob('final_outputs.json')) else original
        manifest=next(folder.rglob('final_outputs.json'))
        source=media(manifest);part,times=read_animation(source)
        # A static cutout may acquire a default 100 ms WebP duration. The source
        # frame's original time remains authoritative when restoring the sequence.
        if len(part)==1 and chunk['count']==1:times=chunk['durations_ms']
        assert len(part)==chunk['count'] and times==chunk['durations_ms']
        assert all(f.size==(160,168) and sum(f.getchannel('A').histogram()[1:255])==0 and f.getpixel((0,0))[3]==0 for f in part)
        inputs.append(str(source.relative_to(ROOT)));frames.extend(part);durations.extend(times)
    assert len(frames)==90 and sum(durations)==4000
    OUT.mkdir(parents=True,exist_ok=True)
    columns=10;rows=math.ceil(len(frames)/columns);atlas=Image.new('RGBA',(160*columns,168*rows))
    for i,frame in enumerate(frames):atlas.paste(frame,(i%columns*160,i//columns*168))
    atlas.save(OUT/f'{action}.png')
    frames[0].save(OUT/f'{action}.webp',save_all=True,append_images=frames[1:],duration=durations,loop=0,lossless=True,exact=True,method=6)
    # The game atlas retains every frame, including deliberate held poses.
    decoded=Image.open(OUT/f'{action}.png').convert('RGBA')
    for i,frame in enumerate(frames):
        x,y=i%columns*160,i//columns*168
        assert decoded.crop((x,y,x+160,y+168)).tobytes()==frame.tobytes()
    clip=dict(action=action,key=f'yasuo-emote-v3-{action}',sheet=f'{action}.png',width=160,height=168,
        frame_count=90,columns=columns,rows=rows,anchor=[80,139],durations_ms=durations,duration_ms=sum(durations),
        scale_in_world=.25,source_sha256=info['source_sha256'],cutout_inputs=inputs,
        generation=dict(resolution='1080p_full',quality='detailed',high_frame_rate=True),
        bounds=[f.getbbox() for f in frames])
    registry_path=OUT/'animations.json'
    registry=json.loads(registry_path.read_text(encoding='utf-8')) if registry_path.exists() else dict(clips=[])
    registry['clips']=[c for c in registry['clips'] if c['action']!=action]+[clip]
    registry['clips'].sort(key=lambda c:['joke','taunt','laugh'].index(c['action']))
    registry_path.write_text(json.dumps(registry,indent=2),encoding='utf-8')
    outputs=[dict(type='media',path=f'{c["action"]}.{ext}',mime_type=f'image/{ext}') for c in registry['clips'] for ext in ['png','webp']]
    (OUT/'final_outputs.json').write_text(json.dumps(dict(status='success',outputs=outputs),indent=2),encoding='utf-8')
    print(f'Packaged {action}: 90 frames, 4000 ms, sharp alpha, fixed anchor [80,139], original timing')

def preview():
    registry=json.loads((OUT/'animations.json').read_text(encoding='utf-8'))
    assert [c['action'] for c in registry['clips']]==['joke','taunt','laugh']
    idle_root=ROOT/'assets/heroes/yasuo/locomotion16-2026-10-15'
    idle=next(c for c in json.loads((idle_root/'animations.json').read_text(encoding='utf-8'))['locomotion'] if c['state']=='idle' and c['direction']=='se')
    entries=[(idle,idle_root/'runtime'/idle['sheet'])]+[(c,OUT/c['sheet']) for c in registry['clips']]
    sheets=[Image.open(path).convert('RGBA') for _,path in entries]
    font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',13)
    labels=['正式待机','1 · 玩笑','2 · 挑衅','4 · 大笑']
    durations=registry['clips'][0]['durations_ms'];frames=[];elapsed=0
    for duration in durations:
        canvas=Image.new('RGBA',(640,194),(49,54,64,255));draw=ImageDraw.Draw(canvas)
        for column,((clip,_),sheet) in enumerate(zip(entries,sheets)):
            ms=elapsed%clip['duration_ms'];frame=0
            while frame<clip['frame_count']-1 and ms>=clip['durations_ms'][frame]:
                ms-=clip['durations_ms'][frame];frame+=1
            w,h=clip['width'],clip['height'];x,y=frame%clip['columns']*w,frame//clip['columns']*h
            cell=sheet.crop((x,y,x+w,y+h))
            draw.text((column*160+8,2),labels[column],font=font,fill=(232,236,242))
            draw.line((column*160+74,161,column*160+86,161),fill=(130,151,151))
            if column:draw.line((column*160,0,column*160,193),fill=(75,80,90))
            canvas.paste(cell,(column*160+80-clip['anchor'][0],161-clip['anchor'][1]),cell)
        frames.append(canvas);elapsed+=duration
    path=OUT/'comparison.webp'
    frames[0].save(path,save_all=True,append_images=frames[1:],duration=durations,loop=0,lossless=True,exact=True,method=6)
    manifest_path=OUT/'final_outputs.json';manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
    manifest['outputs']=[o for o in manifest['outputs'] if o['path']!='comparison.webp']+[dict(type='media',path='comparison.webp',mime_type='image/webp')]
    manifest_path.write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    print('Saved native-pixel animated idle/emote comparison, all 90 frames / 4000 ms.')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('command',choices=['prepare','package','preview']);parser.add_argument('action',nargs='?',choices=['joke','taunt','laugh'])
    args=parser.parse_args()
    if args.command=='preview':preview()
    else:
        if args.action is None:parser.error('An action is required for prepare/package')
        (prepare if args.command=='prepare' else package)(args.action)
