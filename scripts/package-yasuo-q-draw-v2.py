"""Losslessly pack the user-provided Q draw v2, preserving the original."""
from pathlib import Path
from PIL import Image, ImageSequence
import shutil

root = Path(__file__).resolve().parent.parent
dest = root / 'assets/heroes/yasuo/q-draw-v2-2026-10-13'
dest.mkdir(parents=True, exist_ok=True)
source = Path('D:/Long1ye/资源/亚索拔刀v2.webp')
shutil.copyfile(source, dest / 'body.webp')
with Image.open(source) as im:
    frames = [f.convert('RGBA').copy() for f in ImageSequence.Iterator(im)]
w, h = frames[0].size
atlas = Image.new('RGBA', (w * 8, h * ((len(frames) + 7) // 8)))
for i, frame in enumerate(frames):
    x, y = i % 8 * w, i // 8 * h
    atlas.paste(frame, (x, y))
    assert atlas.crop((x, y, x+w, y+h)).tobytes() == frame.tobytes()
atlas.save(dest / 'body.png')
print(w, h, len(frames))
