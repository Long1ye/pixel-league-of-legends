"""Read native final WebPs; generate validation metadata and internal QA, not replacement art."""
from pathlib import Path
import json
import os
import sys
from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v3-horizontal'
candidate = sys.argv[2] if len(sys.argv) > 2 else 'cycle'
assert candidate in ('cycle', 'retry')
manifests = list((BASE / candidate).rglob('final_outputs.json'))
assert len(manifests) == 1
manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
assert manifest['status'] == 'success' and len(manifest['outputs']) == (2 if candidate == 'cycle' else 3)
assert all(o['type'] == 'media' for o in manifest['outputs'])
checks, decoded, paths = [], {}, {}
for output in manifest['outputs']:
    path = ROOT / output['path']
    suffix = path.suffix
    if suffix == '.png':
        paths['sheet'] = path
        continue
    with Image.open(path) as image:
        frames, durations = [], []
        for f in ImageSequence.Iterator(image):
            rgba = f.convert('RGBA'); rgba.load(); frames.append(rgba.copy()); durations.append(f.info.get('duration', 0))
        transparent = any(f.getchannel('A').getextrema()[0] == 0 for f in frames)
        role = 'transparent_gif' if suffix == '.gif' else 'transparent' if transparent else 'background'
        assert role not in decoded
        assert (len(frames) > 16 if candidate == 'cycle' else len(frames) == 16) and all(d > 0 for d in durations)
        decoded[role] = frames; paths[role] = path
        checks.append({'role': role, 'path': str(path.relative_to(ROOT)).replace('\\', '/'), 'size': list(image.size),
            'frame_count': len(frames), 'durations_ms': durations, 'duration_ms': sum(durations), 'loop': image.info.get('loop'),
            'bounds': [f.getchannel('A').getbbox() for f in frames],
            'alpha_levels': [len(f.getchannel('A').getcolors(image.width * image.height)) for f in frames]})
assert set(decoded) == ({'transparent', 'background'} if candidate == 'cycle' else {'transparent', 'transparent_gif'})
assert checks[0]['size'] == checks[1]['size'] and checks[0]['durations_ms'] == checks[1]['durations_ms']
frames = decoded['transparent']
if candidate == 'retry':
    with Image.open(paths['sheet']) as im:
        sheet = im.convert('RGBA'); sheet.load()
    assert sheet.size == (frames[0].width * 4, frames[0].height * 4)
    cells = [sheet.crop((i % 4 * frames[0].width, i // 4 * frames[0].height,
        (i % 4 + 1) * frames[0].width, (i // 4 + 1) * frames[0].height)) for i in range(16)]
    black = lambda f: Image.alpha_composite(Image.new('RGBA', f.size, '#000000'), f).convert('RGB')
    assert all(ImageChops.difference(black(a), black(b)).getbbox() is None and
        ImageChops.difference(a.getchannel('A'), b.getchannel('A')).getbbox() is None for a, b in zip(cells, frames))
    checks.append({'role': 'sheet', 'path': str(paths['sheet'].relative_to(ROOT)).replace('\\', '/'),
        'size': list(sheet.size), 'cells': 16, 'png_webp_visible_pixels_identical': True})
assert all(f.getchannel('A').getextrema() == (0, 255) for f in frames)
assert all(len(f.getchannel('A').getcolors(f.width * f.height)) == 2 for f in frames)
assert all(f.getchannel('A').getbbox() is not None for f in frames)
visible = lambda f: Image.alpha_composite(Image.new('RGBA', f.size, '#192d38'), f).convert('RGB')
diffs = [sum(ImageStat.Stat(ImageChops.difference(visible(a), visible(b))).mean) / 3 for a, b in zip(frames, frames[1:] + frames[:1])]
edge_frames = []
for i, f in enumerate(frames):
    x0, y0, x1, y1 = f.getchannel('A').getbbox()
    if x0 == 0 or y0 == 0 or x1 == f.width or y1 == f.height: edge_frames.append(i + 1)
qa = ROOT / 'docs/screenshots/animation-qa'
qa.mkdir(parents=True, exist_ok=True)
# Native 1x contacts cover every frame, including the final loop boundary.
for page in range((len(frames) + 15) // 16):
    subset = frames[page * 16:page * 16 + 16]
    cw, ch = frames[0].width, frames[0].height + 24
    contact = Image.new('RGB', (cw * 4, ch * 4), '#101f28')
    draw = ImageDraw.Draw(contact)
    for i, f in enumerate(subset):
        tile = Image.new('RGBA', f.size, '#192d38'); td = ImageDraw.Draw(tile)
        for y in range(0, f.height, 8):
            for x in range(0, f.width, 8):
                if (x // 8 + y // 8) % 2: td.rectangle((x, y, x + 7, y + 7), fill='#294653')
        x, y = i % 4 * cw, i // 4 * ch
        draw.text((x + 6, y + 6), f'Frame {page * 16 + i + 1}', fill='white')
        contact.paste(Image.alpha_composite(tile, f).convert('RGB'), (x, y + 24))
    contact.save(qa / f'yasuo-horizontal-{candidate}-frames-{page + 1}.png')
reviews = {
    'cycle': '未采用：虽然有39帧，但主要在两个静止姿势间跳变，部分左挥帧刀尖触边，未达到动作要求。',
    'retry': '新样稿已有左右横挥和腰肩转动。仍有大面积白色刀光、服装细节变化，以及末帧回到首帧的姿势跳变；尚未达到流畅自然的定稿标准。',
}
technical = {'status': 'technical_pass' if not edge_frames else 'edge_warning', 'files': checks,
    'binary_alpha': True, 'edge_contact_frames': edge_frames, 'adjacent_mean_rgb_error': diffs,
    'identical_adjacent_frames': [i + 1 for i, d in enumerate(diffs) if d == 0],
    'loop_mean_rgb_error': diffs[-1], 'visual_review': reviews[candidate],
    'visual_acceptance': 'not_accepted', 'production_ready': False, 'runtime_integrated': False}
(BASE / f'validation-{candidate}.json').write_text(json.dumps(technical, indent=2) + '\n', encoding='utf-8')
info = next(c for c in checks if c['role'] == 'transparent')
rel = lambda p: os.path.relpath(p, BASE).replace('\\', '/')
study = {'hero': 'yasuo', 'action': 'alternating_horizontal_slash_loop', 'direction': 'se', 'width': info['size'][0], 'height': info['size'][1],
    'frame_count': info['frame_count'], 'durations_ms': info['durations_ms'], 'duration_ms': info['duration_ms'],
    'webp': rel(paths['transparent']), 'job_id': manifest['job_id'], 'candidate': candidate,
    'final_media': [{'label': '透明WebP', 'path': rel(paths['transparent']), 'animated': True}]
        + ([{'label': '保留背景WebP', 'path': rel(paths['background']), 'animated': True}] if candidate == 'cycle' else
           [{'label': '透明GIF', 'path': rel(paths['transparent_gif']), 'animated': True}, {'label': 'PNG图集', 'path': rel(paths['sheet']), 'animated': False}]),
    'credits_before': 9595, 'credits_after': int(sys.argv[1]), 'credits_consumed': 9595 - int(sys.argv[1]),
    'review': reviews[candidate], 'visual_acceptance': 'not_accepted',
    'production_ready': False, 'runtime_integrated': False}
(BASE / 'study.json').write_text(json.dumps(study, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'frames': info['frame_count'], 'canvas': info['size'], 'duration_ms': info['duration_ms'],
    'alpha': 'binary', 'edge_contact_frames': edge_frames, 'identical_adjacent_frames': technical['identical_adjacent_frames'],
    'loop_mean_rgb_error': diffs[-1], 'qa_pages': (len(frames) + 15) // 16}, indent=2))
