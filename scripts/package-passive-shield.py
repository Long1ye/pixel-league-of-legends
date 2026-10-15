"""Pack generated transparent shield animation, retaining every final media output."""
import argparse,json,shutil
from pathlib import Path
from PIL import Image,ImageSequence
parser=argparse.ArgumentParser();parser.add_argument('animation');args=parser.parse_args()
source=Path(args.animation);root=Path('assets/effects/yasuo-passive-shield-2026-10-15');runtime=root/'runtime';runtime.mkdir(parents=True,exist_ok=True)
generated=root/'generated';generated.mkdir(exist_ok=True)
for p in source.parent.iterdir():
 if p.suffix.lower() in ('.webp','.gif','.png'):shutil.copy2(p,generated/p.name)
shutil.copy2(next(Path('.cache/shieldbase').glob('*/result_images_0_url.png')),generated/'shield-base.png')
animation=Image.open(source);frames=[f.convert('RGBA').copy() for f in ImageSequence.Iterator(animation)]
assert len(frames)==8,f'Expected eight frames, got {len(frames)}'
bounds=[]
for f in frames:
 f.putalpha(f.getchannel('A').point(lambda a:0 if a<20 else a))
 assert f.getchannel('A').getextrema()[0]==0
 bounds.append(f.getbbox())
box=(max(0,min(b[0] for b in bounds)-4),max(0,min(b[1] for b in bounds)-4),
 min(frames[0].width,max(b[2] for b in bounds)+4),min(frames[0].height,max(b[3] for b in bounds)+4))
w,h=box[2]-box[0],box[3]-box[1];atlas=Image.new('RGBA',(w*4,h*2))
for i,f in enumerate(frames):
 cell=f.crop(box);cell.save(runtime/f'frame-{i}.png');atlas.paste(cell,(i%4*w,i//4*h))
atlas.save(runtime/'shield-atlas.png')
layout={'width':w,'height':h,'columns':4,'frames':8,'fps':12}
(runtime/'layout.json').write_text(json.dumps(layout,indent=2),encoding='utf-8')
bg=Image.new('RGBA',atlas.size,(18,35,48,255));bg.alpha_composite(atlas);bg.save(root/'contact-sheet.png')
(root/'contract.json').write_text(json.dumps({'baseJob':'job_9ba520fa900d4eb1a1e87353e2843a67','animationJob':'job_f663be2813aa4d2586a6b1eb624e6456',
 'sourceSize':frames[0].size,'crop':box,'bounds':bounds,'layout':layout,'resampled':False,'worldHeight':94},indent=2),encoding='utf-8')
print(json.dumps(layout))
