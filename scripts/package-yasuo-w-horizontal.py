"""Inspect and package one declared generated animation, preserving every source pixel."""
import json
import shutil
import sys
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
STUDY = ROOT / 'assets/hero-skills/2026-10-12/yasuo/w-v3-horizontal-e'


def main():
    source = (ROOT / sys.argv[1]).resolve()
    state = json.loads((STUDY / 'motion.plan.state.json').read_text(encoding='utf-8'))
    manifest = json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
    declared = [(ROOT / output['path']).resolve() for output in manifest['outputs'] if output['type'] == 'media']
    assert source in declared, 'Only declared final outputs can be packaged'
    target = STUDY / 'media'
    target.mkdir(exist_ok=True)
    frames, durations, boxes = [], [], []
    with Image.open(source) as clip:
        size = clip.size
        for i in range(clip.n_frames):
            clip.seek(i)
            frame = clip.convert('RGBA')
            frames.append(frame)
            durations.append(clip.info.get('duration', 100))
            boxes.append(frame.getchannel('A').getbbox())
    assert len(frames) >= 2 and all(boxes)
    atlas = Image.new('RGBA', (size[0] * 4, size[1] * ((len(frames) + 3) // 4)))
    contact = Image.new('RGB', (size[0] * 4, (size[1] + 22) * ((len(frames) + 3) // 4)), '#203139')
    pen = ImageDraw.Draw(contact)
    for i, frame in enumerate(frames):
        x, y = i % 4 * size[0], i // 4 * size[1]
        atlas.paste(frame, (x, y))
        contact.paste(frame, (x, i // 4 * (size[1] + 22)), frame)
        pen.text((x + 10, i // 4 * (size[1] + 22) + size[1] + 3), f'{i + 1} / {len(frames)}', fill='#d6ecf0')
    atlas.save(target / 'w-cast-e-atlas.png')
    contact.save(target / 'w-cast-e-frames.png')
    shutil.copy2(source, target / 'w-cast-e.webp')
    data = {'width': size[0], 'height': size[1], 'count': len(frames), 'durations': durations,
            'totalDuration': sum(durations), 'columns': 4, 'bounds': boxes,
            'alphaExtrema': [frame.getchannel('A').getextrema() for frame in frames],
            'edgeContacts': [i for i, box in enumerate(boxes) if box[0] == 0 or box[1] == 0 or box[2] == size[0] or box[3] == size[1]],
            'sourceJob': state['job_id'], 'sourceBytesPreserved': source.read_bytes() == (target / 'w-cast-e.webp').read_bytes(),
            'generatedFullBody': True, 'reusesQMotion': False, 'includesWall': False}
    (STUDY / 'animation.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    final = {'final_outputs': [{'path': name, 'type': kind} for name, kind in [
        ('index.html', 'interactive-preview'), ('media/w-cast-e.webp', 'animation'),
        ('media/w-cast-e-atlas.png', 'sprite-atlas'), ('media/w-cast-e-frames.png', 'frame-preview')]]}
    (STUDY / 'final_outputs.json').write_text(json.dumps(final, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(data))


if __name__ == '__main__':
    main()
