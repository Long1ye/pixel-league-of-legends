"""Package only declared final concept images; preserve their original bytes and record checks."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

destination = Path('assets/map-concepts/howling-abyss-target-v1')
destination.mkdir(parents=True, exist_ok=True)
names = [('a', '01-overview'), ('b2', '02-sanctuary'), ('c', '03-outer-tower'), ('d', '04-central-bridge')]
records = []
for suffix, name in names:
    manifests = list(Path(f'assets/ha-target-{suffix}').glob('*/final_outputs.json'))
    if len(manifests) != 1:
        raise RuntimeError(f'{name}: expected exactly one completed final manifest')
    manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
    if manifest.get('status') != 'success' or len(manifest['outputs']) != 1:
        raise RuntimeError(f'{name}: expected one successful declared final')
    source = Path(manifest['outputs'][0]['path'])
    with Image.open(source) as image:
        image.load()
        if image.format != 'PNG':
            raise RuntimeError(f'{name}: expected PNG')
        size = list(image.size)
        alpha = image.convert('RGBA').getextrema()[3]
    target = destination / f'{name}.png'
    shutil.copyfile(source, target)
    if target.read_bytes() != source.read_bytes():
        raise RuntimeError(f'{name}: source bytes changed')
    records.append({
        'id': name, 'path': target.as_posix(), 'sourceManifest': manifests[0].as_posix(),
        'jobId': manifest['job_id'], 'size': size, 'opaque': alpha == (255, 255),
        'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'byteIdentical': True,
        'role': 'generated art target candidate, not an in-game screenshot or production tileset',
    })
(destination / 'manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(records, ensure_ascii=False, indent=2))
