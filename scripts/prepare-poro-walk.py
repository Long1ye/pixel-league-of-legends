"""Align generated 4x4 cells at their feet; preserve native pixels and source."""
from pathlib import Path
import json
import sys
from PIL import Image

source = Image.open(sys.argv[1]).convert('RGBA')
assert source.size == (1024, 1024)
out = Path('assets/map-modules/howling-poros-v1')
atlas = Image.new('RGBA', source.size)
bounds = []
for row in range(4):
    for col in range(4):
        cell = source.crop((col * 256, row * 256, (col + 1) * 256, (row + 1) * 256))
        bbox = cell.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
        assert bbox is not None
        sprite = cell.crop(bbox)
        assert sprite.width < 244 and sprite.height < 236, bbox
        x, y = 128 - sprite.width // 2, 240 - sprite.height
        atlas.paste(sprite, (col * 256 + x, row * 256 + y))
        bounds.append(list(bbox))
atlas.save(out / 'poro-walk.png')
(out / 'walk.json').write_text(json.dumps({
    'size': [1024, 1024], 'cell': [256, 256], 'anchor': [128, 240],
    'directions': ['down-right', 'down-left', 'up-right', 'up-left'],
    'framesPerDirection': 4, 'fps': 6, 'sourceBounds': bounds,
}, indent=2), encoding='utf-8')
print('Prepared 16 transparent, foot-aligned frames without resampling.')
