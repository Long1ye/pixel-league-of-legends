"""Split the approved 4x3 transparent prop atlas without repainting its pixels."""
import argparse
import hashlib
import json
from pathlib import Path
from shutil import copyfile

from PIL import Image


ASSETS = [
    ('ice-crystal-cluster', '三棱小冰晶', 'ground'),
    ('ice-crystal-shard', '细长小冰晶', 'ground'),
    ('ice-crystal-fan', '低矮扇形冰晶', 'ground'),
    ('wall-banner', '蓝色挂旗', 'wall'),
    ('wall-chain', '垂挂铁链', 'wall'),
    ('wall-lantern', '壁挂暖灯', 'wall'),
    ('drainage-grate', '排水格栅', 'ground'),
    ('rope-coil', '绳圈', 'ground'),
    ('folded-tarp', '折叠蓝篷布', 'ground'),
    ('snow-drift', '浅雪堆', 'ground'),
    ('loose-cobbles', '零散小石', 'ground'),
    ('icicle-fringe', '短冰挂', 'wall'),
]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    atlas = Image.open(args.source).convert('RGBA')
    if atlas.getchannel('A').getextrema()[0] != 0:
        raise ValueError('Expected genuinely transparent atlas')
    if args.output.exists() and any(args.output.iterdir()):
        raise ValueError('Output directory must be new or empty')
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / 'props').mkdir()
    copyfile(args.source, args.output / 'atlas.png')
    assets = []
    for i, (name, title, attachment) in enumerate(ASSETS):
        col, row = i % 4, i // 4
        rect = [col * atlas.width // 4, row * atlas.height // 3,
                (col + 1) * atlas.width // 4, (row + 1) * atlas.height // 3]
        # The approved banner extends slightly past the nominal first-row line.
        # A measured empty gutter at 37% separates its fringe from the rope below.
        if i == 3:
            rect[3] = round(atlas.height * .37)
        elif i == 7:
            rect[1] = round(atlas.height * .37)
        cell = atlas.crop(rect)
        # Use alpha only for bounds; preserve the original soft alpha in the PNG.
        bounds = cell.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
        if bounds is None:
            raise ValueError(f'Empty cell: {name}')
        bounds = [max(0, bounds[0] - 4), max(0, bounds[1] - 4),
                  min(cell.width, bounds[2] + 4), min(cell.height, bounds[3] + 4)]
        prop = cell.crop(bounds)
        path = args.output / 'props' / f'{name}.png'
        prop.save(path)
        assets.append({'id': name, 'title': title, 'file': f'props/{name}.png',
                       'size': list(prop.size), 'attachment': attachment,
                       'atlasCell': rect, 'cropInCell': bounds,
                       'alphaRange': list(prop.getchannel('A').getextrema()),
                       'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    manifest = {'generator': 'built-in imagegen', 'atlasSize': list(atlas.size),
                'grid': [4, 3], 'runtimeIntegrated': False, 'assets': assets}
    (args.output / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'output': str(args.output), 'atlas': atlas.size,
                      'assets': [(a['id'], a['size'], a['alphaRange']) for a in assets]}, ensure_ascii=False))


if __name__ == '__main__':
    main()
