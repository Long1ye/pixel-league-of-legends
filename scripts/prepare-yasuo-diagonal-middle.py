"""Align a still input pose's feet before animation; no resampling or final-frame edits."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v4-diagonal-ab'
found = list((BASE / 'poses/a-middle').rglob('final_outputs.json'))
assert len(found) == 1
manifest = json.loads(found[0].read_text(encoding='utf-8'))
assert manifest['status'] == 'success' and len(manifest['outputs']) == 1
with Image.open(ROOT / manifest['outputs'][0]['path']) as im:
    source = im.convert('RGBA'); source.load()
assert source.size == (192, 192)
# The inspected intermediate pose's near boot is 22px right of the two endpoint poses.
# Translate the entire still input only, never the returned animation frames.
offset = (-22, 0)
bounds = source.getchannel('A').getbbox(); assert bounds is not None
assert bounds[0] + offset[0] > 0 and bounds[2] + offset[0] < 192
aligned = Image.new('RGBA', source.size)
aligned.paste(source, offset)
aligned.save(BASE / 'preparation/a-middle-aligned.png')
(BASE / 'preparation/middle-alignment.json').write_text(json.dumps({
    'source': manifest['outputs'][0]['path'], 'whole_still_pose_offset': offset,
    'resampled': False, 'visible_pixels_clipped': False, 'applies_to_final_animation_frames': False,
}, indent=2) + '\n', encoding='utf-8')
print('Prepared same-size intermediate input at offset -22,0; no visible clipping or resampling.')
