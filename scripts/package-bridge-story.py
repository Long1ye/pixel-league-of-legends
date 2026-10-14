"""Losslessly package two generated 2x2 sheets; never resize or repaint art."""
import json
import sys
from pathlib import Path
from PIL import Image

destination = Path(sys.argv[3])
destination.mkdir(parents=True, exist_ok=True)
outputs = []
for group, source in zip(('repair', 'damage'), sys.argv[1:3]):
    with Image.open(source) as image:
        assert image.size == (1024, 1024), image.size
        if group == 'damage':
            assert image.mode == 'RGBA'
            assert image.getchannel('A').getextrema() == (0, 255)
        image.save(destination / f'{group}-sheet.png')
        outputs.append({'path': f'{group}-sheet.png', 'type': 'media'})
        for index in range(4):
            x, y = index % 2 * 512, index // 2 * 512
            cell = image.crop((x, y, x + 512, y + 512))
            name = f'{group}-{index}.png'
            cell.save(destination / name)
            outputs.append({'path': name, 'type': 'media'})
            print(name, cell.size, cell.mode, 'bounds', cell.getbbox())
(destination / 'final_outputs.json').write_text(json.dumps({'status': 'packaged', 'outputs': outputs}, indent=2))
