"""Pack original generated frames losslessly; retain per-frame foot anchors."""
from pathlib import Path
import json
from PIL import Image, ImageSequence
root=Path('assets/units/minions-animated-v1')
out=root/'runtime'
out.mkdir(exist_ok=True)
clips={}
for state_file in sorted((root/'plans').glob('*.state.json')):
    state=json.loads(state_file.read_text(encoding='utf-8'))
    assert state['status']=='success'
    manifest=json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
    source=next(Path(o['path']) for o in manifest['outputs'] if o['path'].endswith('.webp'))
    im=Image.open(source)
    frames=[f.convert('RGBA').copy() for f in ImageSequence.Iterator(im)]
    w,h=im.size
    atlas=Image.new('RGBA',(w*4,h*2))
    anchors=[]
    for i,f in enumerate(frames):
        a=f.getchannel('A'); box=a.getbbox(); assert box
        # The bottom boot band excludes shields, staves and swinging weapons.
        y0=box[3]-int((box[3]-box[1])*.13)
        feet=a.crop((0,y0,w,box[3])).getbbox()
        anchors.append([(feet[0]+feet[2])/2,box[3]-2])
        atlas.paste(f,(i%4*w,i//4*h))
    key=state_file.name.replace('.state.json','')
    atlas.save(out/(key+'.png'))
    clips[key]={'width':w,'height':h,'frames':len(frames),'anchors':anchors,'scale':46/(frames[0].getbbox()[3]-frames[0].getbbox()[1])}
(out/'clips.json').write_text(json.dumps(clips,indent=2),encoding='utf-8')
print('Packed',len(clips),'clips')
