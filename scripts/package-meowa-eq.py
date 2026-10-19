"""Register Meowa EQ frames by integer translation; preserve generated RGBA pixels."""
from pathlib import Path
from PIL import Image
import json, hashlib

root = Path('assets/eq-v3')
runtime = root / 'runtime'
runtime.mkdir(exist_ok=True)
records = []
for key in ['slash', 'storm']:
    manifest = json.loads(next((root / key).rglob('final_outputs.json')).read_text(encoding='utf-8'))
    source = Path(manifest['outputs'][0]['path'])
    sheet = Image.open(source).convert('RGBA')
    assert sheet.size == (1024, 1024) and sheet.getchannel('A').getextrema()[0] == 0
    atlas = Image.new('RGBA', sheet.size)
    frames, shifts, bounds = [], [], []
    for i in range(8):
        cell = sheet.crop((i % 4 * 256, i // 4 * 512, (i % 4 + 1) * 256, (i // 4 + 1) * 512))
        # Centers measured on the generated cutting rim, not the glow bounds.
        dy = (256 - (338 if i < 4 else 278)) if key == 'slash' else 400 - 340
        aligned = Image.new('RGBA', cell.size)
        aligned.paste(cell, (0, dy))
        frames.append(aligned)
        shifts.append([0, dy])
        bounds.append(aligned.getchannel('A').point(lambda a: 255 if a > 48 else 0).getbbox())
        atlas.paste(aligned, (i % 4 * 256, i // 4 * 512))
    atlas.save(runtime / (key + '-atlas.png'))
    frames[0].save(runtime / (key + '-preview.webp'), save_all=True, append_images=frames[1:], duration=75, loop=0, lossless=True)
    background = Image.new('RGBA', atlas.size, (43, 55, 61, 255))
    background.alpha_composite(atlas)
    background.save(root / (key + '-registered.png'))
    records.append(dict(key=key, job=manifest['job_id'], source=str(source),
                        sha256=hashlib.sha256(source.read_bytes()).hexdigest(), cell=[256,512], columns=4,
                        frames=8, alignment_shifts=shifts, bounds=bounds,
                        alpha=sheet.getchannel('A').getextrema(), resampled=False))
(root / 'contract.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print(json.dumps(records, indent=2))
