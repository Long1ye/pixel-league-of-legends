"""Losslessly extract delivered animation frames for directional review."""
import json
import sys
from pathlib import Path
from PIL import Image

source = Path(sys.argv[1])
out = Path(__file__).parent / 'frames'
out.mkdir(exist_ok=True)
im = Image.open(source)
frames = []
for index in range(im.n_frames):
    im.seek(index)
    frame = im.convert('RGBA')
    path = out / f'{index:02d}.png'
    frame.save(path)
    frames.append({'index': index, 'file': path.name, 'duration_ms': im.info.get('duration'), 'bounds': frame.getbbox()})
(out / 'frames.json').write_text(json.dumps({'source': str(source), 'width': im.width, 'height': im.height, 'frames': frames}, indent=2), encoding='utf-8')
print(json.dumps({'frame_count': len(frames), 'width': im.width, 'height': im.height, 'output': str(out)}))
