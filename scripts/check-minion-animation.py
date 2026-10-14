"""Read generated WebPs and make native-size frame contact sheets for QA."""
from pathlib import Path
import json
from PIL import Image, ImageSequence

root = Path('assets/units/minions-animated-v1')
qa = root / 'qa'
qa.mkdir(exist_ok=True)
for state_file in sorted((root / 'plans').glob('*.state.json')):
    state = json.loads(state_file.read_text(encoding='utf-8'))
    if state['status'] != 'success':
        continue
    manifest = json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
    path = next(Path(o['path']) for o in manifest['outputs'] if o['path'].endswith('.webp'))
    im = Image.open(path)
    frames = [f.convert('RGBA') for f in ImageSequence.Iterator(im)]
    sheet = Image.new('RGBA', (im.width * 4, im.height * 2), '#203743')
    bounds = []
    for i, frame in enumerate(frames):
        sheet.alpha_composite(frame, (i % 4 * im.width, i // 4 * im.height))
        bounds.append(frame.getchannel('A').getbbox())
    name = state_file.name.replace('.state.json', '')
    sheet.save(qa / (name + '.png'))
    print(json.dumps({'name':name,'size':im.size,'frames':len(frames),'alpha':frames[0].getchannel('A').getextrema(),'bounds':bounds}))
