"""Validate declared Meowa finals, preserve bytes, and make integer nearest-neighbor repeat reviews."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

root = Path('assets/map-modules/arpg-s01-ground-v2')
sources = {
    'rubble': Path('assets/s01-g2-rock'),
    'repair': Path('assets/s01-g2-slate'),
    'ice': root / 'generated/ice',
}
(root / 'runtime').mkdir(parents=True, exist_ok=True)
materials = []
for kind, directory in sources.items():
    manifests = list(directory.glob('*/final_outputs.json'))
    if len(manifests) != 1:
        raise RuntimeError(f'Expected exactly one completed {kind} job, found {len(manifests)}')
    manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
    source = Path(manifest['outputs'][0]['path'])
    image = Image.open(source).convert('RGBA')
    if image.size != (64, 64) or image.getextrema()[3] != (255, 255):
        raise RuntimeError(f'{kind}: expected opaque native 64x64 final, got {image.size}')
    destination = root / 'runtime' / f'{kind}.png'
    shutil.copyfile(source, destination)
    repeat = Image.new('RGBA', (192, 192))
    for y in range(3):
        for x in range(3):
            repeat.paste(image, (x * 64, y * 64))
    repeat.resize((768, 768), Image.Resampling.NEAREST).save(root / f'{kind}-repeat-review.png')
    delta = lambda a, b: sum(abs(a[k] - b[k]) for k in range(3)) / 3
    materials.append({
        'id': f's01-ground-{kind}-v2', 'path': destination.as_posix(),
        'sourceManifest': manifests[0].as_posix(), 'jobId': manifest['job_id'],
        'size': [64, 64], 'opaque': True, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'byteIdentical': source.read_bytes() == destination.read_bytes(),
        'edgeDelta': {
            'leftRightMean': sum(delta(image.getpixel((0, y)), image.getpixel((63, y))) for y in range(64)) / 64,
            'topBottomMean': sum(delta(image.getpixel((x, 0)), image.getpixel((x, 63))) for x in range(64)) / 64,
        },
        'status': 'native-size-and-alpha-checked; game-scale visual acceptance pending',
    })
(root / 'materials.json').write_text(json.dumps(materials, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(materials, ensure_ascii=False, indent=2))
