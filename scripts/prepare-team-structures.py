"""Prepare native transparent building crops on matching team canvases."""
from pathlib import Path
from PIL import Image
import json

source = Path('.cache/towers/split')
output = Path('assets/map-modules/howling-team-structures-v1')
output.mkdir(parents=True, exist_ok=True)
specs = {}
for kind, first, size, scale, anchor in [('tower', 1, (344, 513), .5, [172, 410]), ('inhibitor', 3, (308, 366), .24, [154, 292])]:
    images = []
    for team, index in [('blue', first), ('red', first + 1)]:
        image = Image.open(source / f'component_{index:03}.png').convert('RGBA')
        canvas = Image.new('RGBA', size)
        canvas.paste(image, ((size[0] - image.width) // 2, size[1] - image.height))
        canvas.save(output / f'{kind}-{team}.png')
        images.append(canvas)
    foot = []
    for x in range(0, size[0] + 1, 8):
        ys = [y for im in images for px in range(max(0, x-4), min(size[0], x+5)) for y in range(size[1]) if im.getpixel((px, y))[3] > 100]
        if ys: foot.append([x, max(ys) + 1])
    specs[kind] = {'size': list(size), 'anchor': anchor, 'scale': scale, 'baseline': foot}
(output / 'geometry.json').write_text(json.dumps(specs, indent=2), encoding='utf-8')
print('Prepared four transparent native-size building assets with shared team geometry.')
