"""Losslessly pack the declared Q37 final animation for the preview."""
from pathlib import Path
import json
from PIL import Image, ImageSequence

folder = Path(__file__).resolve().parent.parent / 'assets/hero-skills/2026-10-13/yasuo/q-v37-official-study'
with Image.open(folder / 'wind.webp') as im:
    frames, durations = [], []
    for frame in ImageSequence.Iterator(im):
        frame.load()
        frames.append(frame.convert('RGBA').copy())
        durations.append(frame.info.get('duration', 125))
w, h = frames[0].size
atlas = Image.new('RGBA', (w * 4, h * ((len(frames) + 3) // 4)))
for i, frame in enumerate(frames):
    x, y = i % 4 * w, i // 4 * h
    atlas.paste(frame, (x, y))
    assert atlas.crop((x, y, x + w, y + h)).tobytes() == frame.tobytes()
atlas.save(folder / 'wind-atlas.png')
info = dict(width=w, height=h, count=len(frames), durations=durations,
            alpha=[f.getchannel('A').getextrema() for f in frames],
            bounds=[f.getchannel('A').getbbox() for f in frames])
(folder / 'clip.json').write_text(json.dumps(info), encoding='utf-8')
print(json.dumps(info))
