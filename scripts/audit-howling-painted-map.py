"""Read-only image inspection and reproducible provenance for map parts.

Does not crop, composite, resize, or otherwise edit any image.
"""
from pathlib import Path
from PIL import Image
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path('C:/Users/PC/.codex/generated_images/01a1435f-dfea-77e0-85b1-67e1d730a72b')
OUT = ROOT / 'assets/map-modules/howling-painted-v4'
SOURCES = [
    ('sanctuary-altar.png', 'exec-c725fbd3-3ad2-4707-bc9b-14e2d17439cf.png', '02-sanctuary.png'),
    ('sanctuary-backwall.png', 'exec-0cbaa92e-e740-4232-ae15-2dcb7314b264.png', '02-sanctuary.png'),
    ('sanctuary-paving.png', 'exec-ad52a571-5250-45cf-b00a-8e32a75d8757.png', '02-sanctuary.png'),
    ('combat-tower.png', 'exec-0dc73586-bece-4710-a5af-014810f9cfad.png', '01-overview.png'),
    ('broken-parapet.png', 'exec-35185439-8977-4165-8cfa-945332a9c9d4.png', '04-central-bridge.png'),
]

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

assets = []
for name, source_name, reference in SOURCES:
    path, source = OUT / name, GENERATED / source_name
    with Image.open(path) as image:
        record = dict(file=name, size=list(image.size), mode=image.mode,
                      sha256=digest(path), source=str(source),
                      reference='assets/map-concepts/howling-abyss-target-v1/' + reference,
                      generator='built-in image_gen', byteIdentical=digest(path) == digest(source))
        if image.mode == 'RGBA':
            alpha = image.getchannel('A')
            record['alphaRange'] = list(alpha.getextrema())
            histogram = alpha.histogram()
            record['transparentFraction'] = histogram[0] / (image.width * image.height)
            record['lowAlphaFraction'] = sum(histogram[1:123]) / (image.width * image.height)
            # A temporary in-memory threshold is measurement only. Never saved.
            record['solidBounds'] = list(alpha.point(lambda v: 255 if v >= 123 else 0).getbbox())
            assert record['alphaRange'][0] == 0 and record['alphaRange'][1] >= 250
            assert record['transparentFraction'] > .2
        else:
            assert name == 'sanctuary-paving.png' and image.mode == 'RGB'
        assert record['byteIdentical']
        assets.append(record)

plan = json.loads((ROOT / 'assets/map-concepts/howling-abyss-target-v1/component-plan.json').read_text(encoding='utf-8'))
for part in plan['components']:
    if part['mode'] in ('generate', 'reuse'):
        assert (ROOT / 'assets/map-modules' / part['asset']).is_file(), part['id']

result = dict(externalPaidRequests=0, builtinImageCalls=6, selectedAssets=5,
              assetFamilies=len(plan['components']), references=len(plan['scenes']),
              note='Five original generations plus one tower refinement. Candidate files are excluded from runtime. No raster postprocessing.',
              assets=assets)
(OUT / 'manifest.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: result[k] for k in ('externalPaidRequests', 'builtinImageCalls', 'selectedAssets', 'assetFamilies', 'references')}))
