"""Validate only declared native media; QA contacts are internal, never replacement art."""
from pathlib import Path
import json
import os
import sys
from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v4-diagonal-ab'
QA = ROOT / 'docs/screenshots/animation-qa'
QA.mkdir(parents=True, exist_ok=True)
contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))

def declared(folder):
    found = list(folder.rglob('final_outputs.json'))
    assert len(found) == 1, folder
    manifest = json.loads(found[0].read_text(encoding='utf-8'))
    assert manifest['status'] == 'success' and all(o['type'] == 'media' for o in manifest['outputs'])
    return manifest, [ROOT / o['path'] for o in manifest['outputs']]

def native_contacts(frames, label):
    cw, ch = frames[0].width, frames[0].height + 24
    for page in range((len(frames) + 15) // 16):
        contact = Image.new('RGB', (cw * 4, ch * 4), '#101f28')
        draw = ImageDraw.Draw(contact)
        for cell, frame in enumerate(frames[page * 16:page * 16 + 16]):
            tile = Image.new('RGBA', frame.size, '#192d38'); td = ImageDraw.Draw(tile)
            for y in range(0, frame.height, 8):
                for x in range(0, frame.width, 8):
                    if (x // 8 + y // 8) % 2: td.rectangle((x, y, x + 7, y + 7), fill='#294653')
            x, y = cell % 4 * cw, cell // 4 * ch
            draw.text((x + 5, y + 5), f'{label} {page * 16 + cell + 1}', fill='white')
            contact.paste(Image.alpha_composite(tile, frame).convert('RGB'), (x, y + 24))
        contact.save(QA / f'yasuo-diagonal-{label}-{page + 1}.png')

def difference(a, b):
    visible = lambda im: Image.alpha_composite(Image.new('RGBA', im.size, '#192d38'), im).convert('RGB')
    diff = ImageChops.difference(visible(a), visible(b))
    return {'mean_rgb_error': sum(ImageStat.Stat(diff).mean) / 3,
        'alpha_identical': ImageChops.difference(a.getchannel('A'), b.getchannel('A')).getbbox() is None}

if sys.argv[1] == 'poses':
    with Image.open(ROOT / contract['original_source']) as im:
        source = im.convert('RGBA'); source.load()
    with Image.open(BASE / 'preparation/original-outfit-padded.png') as im:
        padded = im.convert('RGBA'); padded.load()
    x, y = contract['source_offset']
    restored = padded.crop((x, y, x + source.width, y + source.height))
    assert ImageChops.difference(restored, source).getbbox() is None
    checks = []
    for name in ('low-right', 'high-left', 'high-left-raised'):
        manifest, files = declared(BASE / 'poses' / name); assert len(files) == 1
        with Image.open(files[0]) as im:
            image = im.convert('RGBA'); image.load()
        assert image.size == tuple(contract['prepared_size'])
        bounds = image.getchannel('A').getbbox(); assert bounds is not None
        assert bounds[0] > 0 and bounds[1] > 0 and bounds[2] < image.width and bounds[3] < image.height
        checks.append({'pose': name, 'job_id': manifest['job_id'], 'size': list(image.size), 'bounds': bounds})
    (BASE / 'pose-validation.json').write_text(json.dumps({'source_pixels_preserved': True, 'poses': checks}, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(checks, indent=2)); sys.exit(0)

clips, decoded, checks = {}, {}, []
keyframes_a = '--original-a' not in sys.argv
variants = [arg for arg in sys.argv[2:] if not arg.startswith('--')] if sys.argv[1] == 'partial' else ('a', 'b')
for variant in variants:
    legacy = keyframes_a and variant == 'a'
    candidate = 'a-keyframes' if legacy else variant
    manifest, files = declared(BASE / 'clips' / candidate)
    assert len(files) == (3 if legacy else 2)
    roles = {}
    sheet_path = None
    for path in files:
        if path.suffix == '.png':
            sheet_path = path; continue
        assert path.suffix in ('.webp', '.gif')
        with Image.open(path) as im:
            frames, durations = [], []
            for frame in ImageSequence.Iterator(im):
                rgba = frame.convert('RGBA'); rgba.load(); frames.append(rgba.copy()); durations.append(frame.info.get('duration', 0))
            assert im.size == tuple(contract['prepared_size'])
            assert (len(frames) == 12 if legacy else len(frames) > 24) and all(d > 0 for d in durations)
            transparent = frames[0].getchannel('A').getextrema()[0] == 0
            role = 'gif' if path.suffix == '.gif' else 'transparent' if transparent else 'background'
            assert role not in roles
            roles[role] = (path, frames, durations)
            checks.append({'variant': variant, 'role': role, 'size': list(im.size), 'frames': len(frames),
                'durations_ms': durations, 'duration_ms': sum(durations), 'loop': im.info.get('loop'),
                'path': str(path.relative_to(ROOT)).replace('\\', '/')})
    assert set(roles) == ({'transparent', 'gif'} if legacy else {'transparent', 'background'})
    path, frames, durations = roles['transparent']
    assert roles['gif' if legacy else 'background'][2] == durations
    if legacy:
        assert sheet_path is not None
        with Image.open(sheet_path) as im:
            sheet = im.convert('RGBA'); sheet.load()
        assert sheet.width % frames[0].width == 0 and sheet.height % frames[0].height == 0
        columns, rows = sheet.width // frames[0].width, sheet.height // frames[0].height
        cells = [sheet.crop((i % columns * frames[0].width, i // columns * frames[0].height,
            (i % columns + 1) * frames[0].width, (i // columns + 1) * frames[0].height)) for i in range(columns * rows)]
        assert len(cells) >= len(frames)
        assert all(difference(a, b)['mean_rgb_error'] == 0 and difference(a, b)['alpha_identical'] for a, b in zip(frames, cells))
        assert all(cell.getchannel('A').getbbox() is None for cell in cells[len(frames):])
        checks.append({'variant': variant, 'role': 'sheet', 'size': list(sheet.size), 'cells': len(cells),
            'valid_cells': len(frames), 'png_webp_visible_pixels_identical': True})
    assert all(f.getchannel('A').getextrema() == (0, 255) and len(f.getchannel('A').getcolors(f.width * f.height)) == 2 for f in frames)
    edges = []
    for i, frame in enumerate(frames):
        bounds = frame.getchannel('A').getbbox(); assert bounds is not None
        if bounds[0] == 0 or bounds[1] == 0 or bounds[2] == frame.width or bounds[3] == frame.height: edges.append(i + 1)
    decoded[variant] = frames
    relative = lambda p: os.path.relpath(p, BASE).replace('\\', '/')
    source_plan = json.loads((BASE / f'{candidate}.plan.json').read_text(encoding='utf-8'))
    input_path = source_plan['args'][1].split('=', 1)[-1]
    final_media = [{'label': '透明WebP', 'path': relative(path), 'animated': True}]
    if legacy:
        final_media += [{'label': '透明GIF', 'path': relative(roles['gif'][0]), 'animated': True},
            {'label': 'PNG图集', 'path': relative(sheet_path), 'animated': False}]
    else:
        final_media += [{'label': '保留背景WebP', 'path': relative(roles['background'][0]), 'animated': True}]
    clips[variant] = {'id': variant, 'candidate': candidate, 'job_id': manifest['job_id'], 'webp': relative(path),
        'final_media': final_media, 'frame_count': len(frames),
        'durations_ms': durations, 'duration_ms': sum(durations), 'edge_contact_frames': edges,
        'source_to_first': difference(frames[0], Image.open(ROOT / input_path).convert('RGBA'))}
    native_contacts(frames, candidate)
    native_contacts(roles['gif' if legacy else 'background'][1], f'{candidate}-alternate')
if sys.argv[1] == 'partial':
    print(json.dumps({'files': checks, 'clips': clips}, indent=2)); sys.exit(0)
seams = {'a_to_b': difference(decoded['a'][-1], decoded['b'][0]), 'b_to_a': difference(decoded['b'][-1], decoded['a'][0])}
native_contacts([decoded['a'][-1], decoded['b'][0], decoded['b'][-1], decoded['a'][0]], 'seams')
validation = {'status': 'technical_pass' if not any(c['edge_contact_frames'] for c in clips.values()) else 'edge_warning',
    'files': checks, 'seams': seams, 'binary_alpha': True, 'visual_acceptance': 'not_accepted',
    'runtime_integrated': False, 'production_ready': False}
(BASE / 'validation.json').write_text(json.dumps(validation, indent=2) + '\n', encoding='utf-8')
study = {'hero': 'yasuo', 'action': 'two_independent_diagonal_attacks', 'direction': 'se',
    'width': contract['prepared_size'][0], 'height': contract['prepared_size'][1], 'anchor': contract['anchor'],
    'clips': clips, 'seams': seams, 'credits_before': contract['credits_before'], 'credits_after': int(sys.argv[1]),
    'credits_consumed': contract['credits_before'] - int(sys.argv[1]),
    'review': 'A：右下→左上的斜撩；B：左上→右下的斜砍，两条可独立播放。蓝围巾与银色护肩比上一轮稳定，但A中间过渡仍偏跳、B有额外红色刀光，接缝颜色和轮廓也有变化；尚未达到自然流畅定稿标准。',
    'visual_acceptance': 'not_accepted', 'preview_attack_duration_ms': 1200,
    'runtime_integrated': False, 'production_ready': False}
(BASE / 'study.json').write_text(json.dumps(study, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'clips': {k: {'frames': c['frame_count'], 'duration_ms': c['duration_ms'], 'edges': c['edge_contact_frames']} for k, c in clips.items()}, 'seams': seams}, indent=2))
