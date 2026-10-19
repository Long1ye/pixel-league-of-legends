"""Inspect transparent gutters and describe source UV regions without editing pixels."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'assets/map-modules/howling-snow-varieties-v1'
image = Image.open(root / 'atlas.png').convert('RGBA')
alpha = image.getchannel('A')
regions = [(0, 0, 472, 443), (472, 0, 888, 443), (888, 0, 1330, 443), (1330, 0, 1774, 443),
           (0, 443, 440, 887), (440, 443, 900, 887), (900, 443, 1320, 887), (1320, 443, 1774, 887)]
names = ['thick', 'rubble', 'wind', 'thin', 'post', 'melt', 'roots', 'crust']
labels = ['贴墙厚雪', '碎石覆雪', '风积雪脊', '薄雪残片', '柱脚拥雪', '融雪边缘', '草根积雪', '冻融雪壳']
heights = [12, 13, 8, 2, 9, 3, 5, 4]
assets = []
for i, (name, region) in enumerate(zip(names, regions)):
    mask = alpha.crop(region).point(lambda a: 255 if a >= 96 else 0)
    bbox = mask.getbbox()
    if bbox is None:
        raise ValueError(f'Missing sprite {name}')
    crop = [max(region[0], region[0] + bbox[0] - 5), max(region[1], region[1] + bbox[1] - 5),
            min(region[2], region[0] + bbox[2] + 5), min(region[3], region[1] + bbox[3] + 5)]
    size = [crop[2] - crop[0], crop[3] - crop[1]]
    assets.append(dict(id=name, label=labels[i], crop=crop, size=size,
                       anchor=[size[0] / 2, size[1] * (.5 if i in (4, 5, 6, 7) else .58)],
                       maxHeight=heights[i], axisSlope=.53 if i < 4 else .335))
manifest = dict(size=list(image.size), alphaRange=list(alpha.getextrema()), assets=assets)
(root / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(manifest, ensure_ascii=False))
