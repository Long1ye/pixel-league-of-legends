"""Losslessly split the approved regular atlas; no repainting or resampling."""
from pathlib import Path
import sys
from PIL import Image

source = Path(sys.argv[1])
destination = Path(sys.argv[2])
destination.mkdir(parents=True, exist_ok=True)
with Image.open(source) as image:
    assert image.size == (1024, 1024), image.size
    for index in range(16):
        x, y = index % 4 * 256, index // 4 * 256
        image.crop((x, y, x + 256, y + 256)).save(destination / f"stone-{index:02}.png")
    print(f"Validated {image.size} {image.mode}; exported 16 unchanged 256x256 cells")
