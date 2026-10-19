"""Copy declared final textures without resampling and build nearest-neighbor seam reviews."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

root = Path('assets/map-modules/arpg-s01-v1')
runtime = root / 'runtime'
runtime.mkdir(parents=True, exist_ok=True)
materials = []
for kind in ('floor', 'wall', 'moss'):
    manifests = list((root / 'generated' / kind).glob('*/final_outputs.json'))
    if len(manifests) != 1:
        raise RuntimeError(f'Expected one completed {kind} job, found {len(manifests)}')
    manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
    image_path = Path(manifest['outputs'][0]['path'])
    im = Image.open(image_path).convert('RGBA')
    if im.size != (64, 64) or im.getextrema()[3] != (255, 255):
        raise RuntimeError(f'{kind}: expected opaque 64x64 texture, got {im.size}')
    destination = runtime / f'{kind}.png'
    shutil.copyfile(image_path, destination)
    repeat = Image.new('RGBA', (192, 192))
    for row in range(3):
        for col in range(3):
            repeat.paste(im, (col * 64, row * 64))
    repeat.resize((768, 768), Image.Resampling.NEAREST).save(root / f'{kind}-repeat-review.png')
    rgb = im.convert('RGB')
    colors = [rgb.getpixel((x, y)) for y in range(64) for x in range(64)]
    def delta(a, b):
        return sum(abs(a[k] - b[k]) for k in range(3)) / 3
    horizontal = sum(delta(colors[y * 64], colors[y * 64 + 63]) for y in range(64)) / 64
    vertical = sum(delta(colors[x], colors[63 * 64 + x]) for x in range(64)) / 64
    materials.append({'id': f's01-{kind}-v1', 'path': destination.as_posix(), 'width': 64, 'height': 64,
        'opaque': True, 'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
        'jobId': manifest['job_id'], 'sourceManifest': manifests[0].as_posix(),
        'edgeDelta': {'leftRightMean': horizontal, 'topBottomMean': vertical},
        'status': 'dimension-and-alpha-checked; seam review required; gameplay visual approval pending'})
(root / 'materials.json').write_text(json.dumps({'schemaVersion': 1, 'materials': materials}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(materials, ensure_ascii=False, indent=2))

# Validate actual source atlases separately from the browser-oriented TS compiler.
atlases = []
for directory, registry_name, collection in [
    ('assets/heroes/yasuo/locomotion16-2026-10-15', 'animations.json', 'locomotion'),
    ('assets/heroes/yasuo/attacks-v2-2026-10-13', 'animations.json', 'attacks'),
    ('assets/heroes/yasuo/q-meowa-eight-2026-10-13', 'animations.json', 'clips'),
]:
    directory = Path(directory)
    registry = json.loads((directory / registry_name).read_text(encoding='utf-8'))
    for clip in registry[collection]:
        image_path = directory / ('runtime' if collection == 'locomotion' else '') / clip['sheet']
        image = Image.open(image_path)
        width, height = image.size
        if width % clip['width'] or height % clip['height'] or clip['frame_count'] > (width // clip['width']) * (height // clip['height']):
            raise RuntimeError(f'Invalid source atlas: {image_path}')
        atlases.append({'path': image_path.as_posix(), 'sheetSize': [width, height], 'frames': clip['frame_count']})
catalog_root = Path('assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right')
catalog = json.loads((catalog_root / 'catalog.json').read_text(encoding='utf-8'))
for clip in catalog['directions']:
    image_path = catalog_root / clip['direction'] / 'media/e-atlas.png'
    image = Image.open(image_path)
    width, height = image.size
    if width % clip['width'] or height % clip['height'] or clip['count'] > (width // clip['width']) * (height // clip['height']):
        raise RuntimeError(f'Invalid E atlas: {image_path}')
    atlases.append({'path': image_path.as_posix(), 'sheetSize': [width, height], 'frames': clip['count']})
(root / 'actor-atlas-validation.json').write_text(json.dumps({'status': 'dimensions-checked', 'atlases': atlases}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Validated {len(atlases)} reused hero atlases')
