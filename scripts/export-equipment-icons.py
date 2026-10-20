"""Export a verified 4x4 item sheet to native-size lossless WebP icons by item ID."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', required=True, type=Path)
parser.add_argument('--output', required=True, type=Path)
parser.add_argument('--job-id', default='')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
catalog = (root / 'src/game/ItemCatalog.ts').read_text(encoding='utf-8')
items = [(int(i), name, int(cell)) for i, name, cell in re.findall(r"\{id:(\d+),name:'([^']+)'.*?icon:(\d+),", catalog)]
assert len(items) == 16 and {cell for _, _, cell in items} == set(range(16)), 'Expected exactly 16 unique atlas cells'
sheet = Image.open(args.source)
assert sheet.width == sheet.height and sheet.width % 4 == 0, 'Expected a square 4x4 atlas'
size = sheet.width // 4
args.output.mkdir(parents=True, exist_ok=True)
outputs = []
for item_id, name, index in items:
    x, y = index % 4 * size, index // 4 * size
    icon = sheet.crop((x, y, x + size, y + size))
    target = args.output / f'{item_id}.webp'
    icon.save(target, 'WEBP', lossless=True, quality=100, method=4)
    with Image.open(target) as check:
        assert check.size == (size, size) and check.convert('RGB').tobytes() == icon.convert('RGB').tobytes()
    outputs.append({'id': item_id, 'name': name, 'cell': index, 'path': target.as_posix(), 'width': size, 'height': size, 'bytes': target.stat().st_size})
manifest = {'job_id': args.job_id, 'source': args.source.as_posix(), 'sha256': hashlib.sha256(args.source.read_bytes()).hexdigest(), 'format': 'lossless WebP', 'outputs': outputs}
(args.output.parent / 'icons.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Exported {len(outputs)} native {size}x{size} icons: {sum(output["bytes"] for output in outputs):,} bytes')
