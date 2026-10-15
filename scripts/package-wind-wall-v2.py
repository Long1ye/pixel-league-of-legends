"""Retain final media, extract all animation frames, and pack a stable atlas."""
import argparse,json,shutil
from pathlib import Path
from PIL import Image,ImageSequence

parser=argparse.ArgumentParser();parser.add_argument('animation');args=parser.parse_args()
source=Path(args.animation)
root=Path('assets/effects/wind-wall-v2-2026-10-15');runtime=root/'runtime';runtime.mkdir(parents=True,exist_ok=True)
generated=root/'generated';generated.mkdir(exist_ok=True)
for p in source.parent.iterdir():
 if p.suffix.lower() in ('.webp','.gif','.png','.mp4'):shutil.copy2(p,generated/p.name)
base=next(Path('.cache/wallbase').glob('*/result_images_0_url.png'))
shutil.copy2(base,generated/'wind-wall-base.png')
animation=Image.open(source)
frames=[f.convert('RGBA').copy() for f in ImageSequence.Iterator(animation)]
assert len(frames)==8,f'Expected 8 frames, got {len(frames)}'
bounds=[]
for f in frames:
 f.putalpha(f.getchannel('A').point(lambda a:0 if a<20 else a))
 assert f.getchannel('A').getextrema()[0]==0,'Animation has no transparency'
 bounds.append(f.getbbox())
left=max(0,min(b[0] for b in bounds)-4);top=max(0,min(b[1] for b in bounds)-4)
right=min(frames[0].width,max(b[2] for b in bounds)+4);bottom=min(frames[0].height,max(b[3] for b in bounds)+4)
w,h=right-left,bottom-top
atlas=Image.new('RGBA',(w*4,h*2));durations=[]
for i,f in enumerate(frames):
 cell=f.crop((left,top,right,bottom));cell.save(runtime/f'frame-{i}.png');atlas.paste(cell,(i%4*w,i//4*h))
 durations.append(f.info.get('duration',125))
atlas.save(runtime/'wind-wall-atlas.png')
layout={'width':w,'height':h,'columns':4,'frames':8,'fps':8}
(runtime/'layout.json').write_text(json.dumps(layout,indent=2),encoding='utf-8')
background=Image.new('RGBA',atlas.size,(18,35,48,255));background.alpha_composite(atlas);background.save(root/'contact-sheet.png')
(root/'contract.json').write_text(json.dumps({'baseJob':'job_ff36eb1a539041a7b293f01f7742d196',
 'animationJob':'job_e980a7f647c94486a6c4776371007f95','sourceDimensions':frames[0].size,'crop':[left,top,right,bottom],
 'layout':layout,'bounds':bounds,'sourceDurations':durations,'resampled':False},indent=2),encoding='utf-8')
print(json.dumps(layout))
