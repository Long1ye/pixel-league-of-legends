"""Inspect declared media, not provider responses. Never alter generated artwork."""
from pathlib import Path
import json
import os
import sys
from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v2-ab'
QA = ROOT / 'docs/screenshots/animation-qa'
QA.mkdir(parents=True, exist_ok=True)
contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))

def declared(directory):
    manifests = list(directory.rglob('final_outputs.json'))
    assert len(manifests) == 1, f'Expected one final manifest: {directory}'
    manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
    assert manifest['status'] == 'success'
    assert all(o['type'] == 'media' for o in manifest['outputs'])
    return manifest, {Path(o['path']).suffix: ROOT / o['path'] for o in manifest['outputs']}

def checker(frame, zoom=2):
    bg = Image.new('RGBA', frame.size, '#192d38')
    draw = ImageDraw.Draw(bg)
    for y in range(0, frame.height, 8):
        for x in range(0, frame.width, 8):
            if (x // 8 + y // 8) % 2: draw.rectangle((x, y, x + 7, y + 7), fill='#294653')
    draw.line((62, 131, 82, 131), fill='#f4a354')
    draw.line((72, 126, 72, 136), fill='#f4a354')
    return Image.alpha_composite(bg, frame).convert('RGB').resize((frame.width * zoom, frame.height * zoom), Image.Resampling.NEAREST)

def contact(items, name, columns=4):
    width, height = 352, 380
    image = Image.new('RGB', (width * columns, height * ((len(items) + columns - 1) // columns)), '#101f28')
    draw = ImageDraw.Draw(image)
    for i, (label, frame) in enumerate(items):
        x, y = i % columns * width, i // columns * height
        draw.text((x + 8, y + 8), label, fill='white')
        image.paste(checker(frame), (x, y + 28))
    image.save(QA / name)

def read_image(path):
    with Image.open(path) as f:
        image = f.convert('RGBA'); image.load()
    assert image.size == (176, 176), f'Unexpected canvas: {path} {image.size}'
    assert image.getchannel('A').getbbox() is not None
    return image

if sys.argv[1] == 'poses':
    items = [('Shared raised ready', read_image(ROOT / contract['ready_pose']))]
    checks = []
    plans = json.loads((BASE / 'poses.batch.json').read_text(encoding='utf-8')) + [str((BASE / 'g2-b-impact-repaired.plan.json').relative_to(ROOT))]
    for plan in plans:
        p = json.loads((ROOT / plan).read_text(encoding='utf-8'))
        manifest, paths = declared(ROOT / p['output_dir'])
        assert len(paths) == 1
        frame = read_image(next(iter(paths.values())))
        bounds = frame.getchannel('A').getbbox()
        checks.append({'job_id': manifest['job_id'], 'id': Path(p['output_dir']).name, 'bounds': bounds,
            'alpha_levels': len(frame.getchannel('A').getcolors(256))})
        assert bounds[0] > 0 and bounds[1] > 0 and bounds[2] < 176 and bounds[3] < 176
        items.append((Path(p['output_dir']).name, frame))
    contact(items, 'yasuo-ab-poses.png')
    (BASE / 'pose-validation.json').write_text(json.dumps(checks, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(checks, indent=2))
elif sys.argv[1] == 'partial':
    for group in sys.argv[2:]:
        items = []
        for variant in ['a', 'b']:
            _, paths = declared(BASE / 'clips' / (group + '-' + variant))
            with Image.open(paths['.webp']) as image:
                for i, f in enumerate(ImageSequence.Iterator(image)):
                    rgba = f.convert('RGBA'); rgba.load()
                    items.append((variant.upper() + str(i + 1), rgba.copy()))
        contact(items, 'yasuo-ab-' + group + '-frames.png')
    print('Created read-only partial frame contacts.')
elif sys.argv[1] == 'clips':
    def visible(f):
        return Image.alpha_composite(Image.new('RGBA', f.size, (0, 0, 0, 255)), f).convert('RGB')
    def difference(a, b):
        diff = ImageChops.difference(visible(a), visible(b))
        mask = diff.convert('L').point(lambda v: 255 if v else 0)
        count = sum(n for n, v in mask.getcolors(176 * 176) if v)
        return {'mean_rgb_error': sum(ImageStat.Stat(diff).mean) / 3, 'changed_canvas_percent': count / (176 * 176) * 100,
            'alpha_identical': ImageChops.difference(a.getchannel('A'), b.getchannel('A')).getbbox() is None}
    clips, decoded = {}, {}
    all_checks = []
    for plan in json.loads((BASE / 'animations.batch.json').read_text(encoding='utf-8')):
        p = json.loads((ROOT / plan).read_text(encoding='utf-8'))
        clip_id = Path(p['output_dir']).name
        manifest, paths = declared(ROOT / p['output_dir'])
        assert set(paths) == {'.webp', '.gif', '.png'}
        formats = {}
        for suffix, path in paths.items():
            with Image.open(path) as image:
                frames, durations = [], []
                for frame in ImageSequence.Iterator(image):
                    f = frame.convert('RGBA'); f.load(); frames.append(f.copy()); durations.append(frame.info.get('duration', 0))
                formats[suffix] = (frames, durations)
                all_checks.append({'id': clip_id, 'path': str(path.relative_to(ROOT)).replace('\\', '/'),
                    'size': list(image.size), 'frames': len(frames), 'durations_ms': durations,
                    'bounds': [f.getchannel('A').getbbox() for f in frames]})
                assert all(f.getchannel('A').getextrema() == (0, 255) for f in frames)
                assert all(len(f.getchannel('A').getcolors(256)) == 2 for f in frames)
                if suffix != '.png':
                    assert image.size == (176, 176) and len(frames) == 8 and all(d > 0 for d in durations)
                else: assert image.size == (528, 528)
        webp, durations = formats['.webp']
        sheet = formats['.png'][0][0]
        cells = [sheet.crop((i % 3 * 176, i // 3 * 176, (i % 3 + 1) * 176, (i // 3 + 1) * 176)) for i in range(9)]
        assert cells[8].getchannel('A').getbbox() is None
        assert all(difference(a, b)['mean_rgb_error'] == 0 and difference(a, b)['alpha_identical'] for a, b in zip(webp, cells))
        assert formats['.gif'][1] == durations
        for f in webp:
            bounds = f.getchannel('A').getbbox()
            assert bounds is not None and bounds[0] > 0 and bounds[1] > 0 and bounds[2] < 176 and bounds[3] < 176
        decoded[clip_id] = webp
        rel = lambda path: os.path.relpath(path, BASE).replace('\\', '/')
        clips[clip_id] = {'id': clip_id, 'job_id': manifest['job_id'], 'webp': rel(paths['.webp']), 'gif': rel(paths['.gif']), 'sheet': rel(paths['.png']),
            'durations_ms': durations, 'duration_ms': sum(durations),
            'gif_max_mean_rgb_error': max(difference(a, b)['mean_rgb_error'] for a, b in zip(webp, formats['.gif'][0]))}
    groups, seams, seam_images = [], [], []
    visual_reviews = {
        'g1': '斜劈与上撩最容易区分；A第3帧刀光偏宽，回收段停留较长。',
        'g2': '横斩动作较紧凑，但A/B刀路相近，横斩时脚部重心变化更大。',
        'g3': 'A的刀光最克制；B仍有弧形刀光，挥刀转折偏快。',
    }
    for g in contract['groups']:
        a, b = decoded[g['id'] + '-a'], decoded[g['id'] + '-b']
        seam = {'group': g['id'], 'a_to_b': difference(a[-1], b[0]), 'b_to_a': difference(b[-1], a[0])}
        seams.append(seam)
        seam_images.extend([(g['id'] + ' A8', a[-1]), (g['id'] + ' B1', b[0]), (g['id'] + ' B8', b[-1]), (g['id'] + ' A1', a[0])])
        contact([(f'A{i + 1}', f) for i, f in enumerate(a)] + [(f'B{i + 1}', f) for i, f in enumerate(b)], 'yasuo-ab-' + g['id'] + '-frames.png')
        groups.append({'id': g['id'], 'name': g['name'], 'description': g['description'], 'a': clips[g['id'] + '-a'], 'b': clips[g['id'] + '-b'], 'seam': seam,
            'review': visual_reviews[g['id']] + '接缝姿势接近，但颜色与轮廓仍有小幅变化，非像素级无缝。'})
    contact(seam_images, 'yasuo-ab-seams.png')
    validation = {'status': 'technical_pass', 'groups': 3, 'clips': 6, 'frames': 48, 'files': all_checks, 'seams': seams,
        'binary_alpha': True, 'edge_contact': False, 'png_webp_visible_pixels_identical': True,
        'production_ready': False, 'runtime_integrated': False}
    (BASE / 'validation.json').write_text(json.dumps(validation, indent=2) + '\n', encoding='utf-8')
    study = {'hero': 'yasuo', 'action': 'basic_attack_ab', 'direction': 'se', 'width': 176, 'height': 176,
        'columns': 3, 'rows': 3, 'anchor': [72, 131], 'frame_count': 8, 'groups': groups,
        'credits_before': contract['credits_before'], 'credits_after': int(sys.argv[2]), 'credits_consumed': contract['credits_before'] - int(sys.argv[2]),
        'production_ready': False, 'runtime_integrated': False,
        'review': 'game-assets关键帧动画样稿，非官方动作逐帧复刻。各组A/B连续播放，不插入待机帧；接缝姿势接近但非严格无缝，中间帧刀光和造型仍待验收。未接入对局，也未对生成结果逐帧移位修正。'}
    (BASE / 'study.json').write_text(json.dumps(study, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'status': 'technical_pass', 'seams': seams, 'gif_max_error': max(c['gif_max_mean_rgb_error'] for c in clips.values())}, indent=2))
else: raise ValueError('Choose poses or clips')
