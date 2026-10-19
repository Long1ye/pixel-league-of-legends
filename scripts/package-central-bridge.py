"""Validate declared final art layers and copy original PNG bytes into the runtime version."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

root = Path('assets/map-modules/howling-central-v1')
(root / 'runtime').mkdir(parents=True, exist_ok=True)
records = []
for kind in ('ground', 'snow', 'rail', 'arch', 'depth', 'fire'):
    manifests = list(Path(f'assets/ha-live-{kind}').glob('*/final_outputs.json'))
    if len(manifests) != 1:
        raise RuntimeError(f'{kind}: expected one final manifest')
    manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
    if manifest['status'] != 'success' or len(manifest['outputs']) != 1:
        raise RuntimeError(f'{kind}: no unique successful final')
    source = Path(manifest['outputs'][0]['path'])
    image = Image.open(source).convert('RGBA')
    alpha = image.getchannel('A')
    solid_bounds = alpha.point(lambda value: 255 if value >= 128 else 0).getbbox()
    histogram = alpha.histogram()
    transparent = histogram[0] / (image.width * image.height)
    if kind in ('snow', 'rail', 'arch', 'fire') and transparent < 0.05:
        raise RuntimeError(f'{kind}: cutout lacks actual transparent pixels')
    if kind in ('ground', 'depth') and alpha.getextrema() != (255, 255):
        raise RuntimeError(f'{kind}: expected opaque surface/background')
    target = root / 'runtime' / f'{kind}.png'
    shutil.copyfile(source, target)
    records.append({'id': f'howling-central-{kind}-v1', 'path': target.as_posix(),
        'sourceManifest': manifests[0].as_posix(), 'jobId': manifest['job_id'],
        'size': list(image.size), 'alphaRange': list(alpha.getextrema()),
        'transparentFraction': transparent, 'visibleBounds': alpha.getbbox(),
        'solidBounds': solid_bounds,
        'runtimeBounds': [solid_bounds[0], max(solid_bounds[1], 205) if kind == 'arch' else solid_bounds[1], solid_bounds[2], solid_bounds[3]] if kind in ('rail', 'arch', 'fire') else [0, 0, image.width, 512 if kind == 'snow' else image.height],
        'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'byteIdentical': source.read_bytes() == target.read_bytes(),
        'status': 'candidate layer; native media checked; gameplay visual acceptance pending'})
(root / 'manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(records, ensure_ascii=False, indent=2))
