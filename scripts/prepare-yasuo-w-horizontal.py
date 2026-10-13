"""Pad the user's intact east-facing character without changing its pixels."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/hero-skills/2026-10-12/yasuo/q-v7-user-linked/media/user-e.png'
DEST = ROOT / 'assets/hero-skills/2026-10-12/yasuo/w-v3-horizontal-e/source'
DEST.mkdir(parents=True, exist_ok=True)
with Image.open(SOURCE) as original:
    image = original.convert('RGBA')
canvas = Image.new('RGBA', (240, 160))
canvas.paste(image, (32, 16))
assert canvas.crop((32, 16, 160, 144)).tobytes() == image.tobytes()
canvas.save(DEST / 'user-east-padded.png')
print({'size': canvas.size, 'bounds': canvas.getchannel('A').getbbox(), 'source_pixels_unchanged': True})
