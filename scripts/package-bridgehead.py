"""Lossless extraction of the two complete gate buildings, no resampling."""
import sys
import json
from pathlib import Path
from PIL import Image
source, target = Path(sys.argv[1]), Path(sys.argv[2])
target.mkdir(parents=True, exist_ok=True)
with Image.open(source) as sheet:
    assert sheet.size == (1024, 1024)
    assert sheet.getchannel('A').getextrema() == (0, 255)
    for i, box in enumerate([(0, 0, 512, 544), (512, 0, 1024, 592)]):
        cell = sheet.crop(box)
        if i == 1:
            # The unrelated lower-row wall enters this cell's lower-left margin.
            # Keep only the two rectangles containing the complete gate, losslessly.
            packed = Image.new('RGBA', cell.size)
            packed.paste(cell.crop((0, 0, 512, 520)), (0, 0))
            packed.paste(cell.crop((180, 520, 512, 592)), (180, 520))
            cell = packed
        cell.save(target / f'gate-{i}.png')
        print(i, cell.size, cell.getbbox(), cell.getchannel('A').getextrema())
    (target / 'final_outputs.json').write_text(json.dumps({'outputs': [{'path': f'gate-{i}.png', 'type': 'media'} for i in range(2)]}))
