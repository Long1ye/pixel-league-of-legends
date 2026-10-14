"""Losslessly pack the approved tornado frames for Phaser; preserve source media."""
from pathlib import Path
from PIL import Image, ImageSequence

root = Path(__file__).resolve().parent.parent
folder = root / 'assets/hero-skills/2026-10-13/yasuo/q3-v3-pale-tornado'
with Image.open(folder / 'tornado.webp') as source:
    frames = [f.convert('RGBA').copy() for f in ImageSequence.Iterator(source)]
assert len(frames) == 16 and all(f.size == (640, 640) for f in frames)
atlas = Image.new('RGBA', (2560, 2560))
for i, frame in enumerate(frames):
    x, y = i % 4 * 640, i // 4 * 640
    atlas.paste(frame, (x, y))
    assert atlas.crop((x, y, x+640, y+640)).tobytes() == frame.tobytes()
atlas.save(folder / 'tornado-atlas.png')
print('Packed 16 unmodified 640x640 frames at 8 fps.')
