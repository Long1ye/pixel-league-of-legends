"""Lossless 2x2 sheet slicing; no repainting or resampling."""
import json
import sys
from pathlib import Path
from PIL import Image

source, target = Path(sys.argv[1]), Path(sys.argv[2])
prefix = sys.argv[3] if len(sys.argv) > 3 else 'edge'
target.mkdir(parents=True, exist_ok=True)
with Image.open(source) as sheet:
    assert sheet.size == (1024, 1024) and sheet.mode == 'RGBA'
    assert sheet.getchannel('A').getextrema() == (0, 255)
    outputs = []
    for i in range(4):
        x, y = i % 2 * 512, i // 2 * 512
        cell = sheet.crop((x, y, x + 512, y + 512))
        name = f'{prefix}-{i}.png'
        cell.save(target / name)
        print(name, cell.size, cell.getbbox(), cell.getchannel('A').getextrema())
        outputs.append({'type': 'media', 'path': name})
    (target / 'final_outputs.json').write_text(json.dumps({'status': 'packaged', 'outputs': outputs}, indent=2))
