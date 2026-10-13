"""Inspect declared final media; never submit a job or change generated pixels."""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v11-walk-six'
QA = ROOT / 'docs/screenshots/animation-qa/yasuo-walk-six'
SIZE = 176
spec = importlib.util.spec_from_file_location('media_checks', ROOT / 'scripts/inspect-yasuo-ab-user.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def contact(frames, name):
    QA.mkdir(parents=True, exist_ok=True)
    image = Image.new('RGB', (SIZE * 4, (SIZE + 20) * ((len(frames) + 3) // 4)), '#122731')
    draw = ImageDraw.Draw(image)
    for i, frame in enumerate(frames):
        x, y = i % 4 * SIZE, i // 4 * (SIZE + 20)
        draw.text((x + 6, y + 3), f'{name} / {i + 1}', fill='white')
        image.paste(Image.alpha_composite(Image.new('RGBA', frame.size, '#24333e'), frame).convert('RGB'), (x, y + 20))
    image.save(QA / f'{name}.png')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--partial', action='store_true')
    parser.add_argument('--credits-after', type=int)
    args = parser.parse_args()
    contract = read(BASE / 'contract.json')
    reviews = read(BASE / 'reviews.json') if (BASE / 'reviews.json').exists() else {}
    source = ROOT / contract['walk_source']
    assert hashlib.sha256(source.read_bytes()).hexdigest() == contract['walk_sha256']
    walk_frames = [Image.open(BASE / 'inputs' / f'walk-{i}.png').convert('RGBA') for i in range(1, 9)]
    variants, validations = [], []
    names = {'entry': '走路→第一次挥刀结束', 'second': '第一次→第二次挥刀结束', 'repeat': '第二次→第一次挥刀结束'}
    pairs = {'entry': ('walk-8', 'first-end'), 'second': ('first-end', 'second-end'), 'repeat': ('second-end', 'first-end')}
    for variant in range(1, 7):
        clips, decoded = [], {}
        for kind, name in names.items():
            plan_path = BASE / f'variant-{variant}' / f'{kind}.plan.json'
            state_path = plan_path.with_name(f'{kind}.plan.state.json')
            state = read(state_path) if state_path.exists() else {}
            if state.get('status') != 'success':
                omission = contract.get('requested_omission', {})
                if args.partial or (omission.get('variant') == variant and omission.get('clip') == kind):
                    continue
                raise RuntimeError(f'{variant}/{kind} incomplete. Recover original job; never resubmit.')
            plan = read(plan_path)
            manifest = read(Path(state['manifest']))
            assert manifest['status'] == 'success' and manifest['job_id'] == state['job_id']
            media = {}
            for output in manifest['outputs']:
                path = (ROOT / output['path']).resolve()
                assert output['type'] == 'media' and path.is_relative_to(BASE) and path.is_file()
                assert output['mime_type'] in {'image/webp', 'image/gif', 'image/png'} and path.suffix not in media
                media[path.suffix] = path
            assert set(media) == {'.webp', '.gif', '.png'}
            frames, durations = checks.animation(media['.webp'])
            assert len(frames) == 8 and all(f.size == (SIZE, SIZE) for f in frames) and all(d > 0 for d in durations)
            gif, gif_times = checks.animation(media['.gif'])
            assert len(gif) == 8 and gif_times == durations
            with Image.open(media['.png']) as atlas:
                sheet = atlas.convert('RGBA')
            assert sheet.width % SIZE == 0 and sheet.height % SIZE == 0
            columns, rows = sheet.width // SIZE, sheet.height // SIZE
            assert columns * rows >= 8
            cells = [sheet.crop((i % columns * SIZE, i // columns * SIZE, (i % columns + 1) * SIZE, (i // columns + 1) * SIZE)) for i in range(columns * rows)]
            diffs = [checks.difference(f, c) for f, c in zip(frames, cells)]
            assert all(d['alpha_identical'] and d['mean_rgb_error'] == 0 for d in diffs)
            assert all(c.getchannel('A').getbbox() is None for c in cells[8:])
            bounds, edges = [], []
            for i, frame in enumerate(frames, 1):
                alpha = frame.getchannel('A')
                bbox = alpha.getbbox()
                assert bbox and alpha.getextrema()[0] == 0
                bounds.append(bbox)
                if bbox[0] == 0 or bbox[1] == 0 or bbox[2] == SIZE or bbox[3] == SIZE:
                    edges.append(i)
            prompt = plan['args'][plan['args'].index('--prompt') + 1]
            assert prompt == contract['motion_prompts'][kind] and '--optimize-prompt' in plan['args']
            rel = lambda p: os.path.relpath(p, BASE).replace('\\', '/')
            start, end = pairs[kind]
            record = {
                'id': kind, 'name': name, 'job_id': state['job_id'], 'width': SIZE, 'height': SIZE,
                'webp': rel(media['.webp']), 'gif': rel(media['.gif']), 'sheet': rel(media['.png']),
                'columns': columns, 'rows': rows, 'frame_count': 8, 'durations_ms': durations,
                'duration_ms': sum(durations), 'prompt': prompt, 'prompt_optimization': True,
                'edge_contact_frames': edges, 'webp_sha256': hashlib.sha256(media['.webp'].read_bytes()).hexdigest(),
                'first_to_input': checks.difference(frames[0], Image.open(BASE / 'inputs' / f'{start}.png').convert('RGBA')),
                'last_to_input': checks.difference(frames[-1], Image.open(BASE / 'inputs' / f'{end}.png').convert('RGBA')),
            }
            clips.append(record)
            decoded[kind] = frames
            validations.append({'variant': variant, 'clip': kind, 'frame_bounds': bounds, 'edge_contact_frames': edges,
                                'webp_png_visible_pixels_identical': True, 'gif_timing_identical': True,
                                'gif_pixel_differences': [checks.difference(f, g) for f, g in zip(frames, gif)]})
            contact(frames, f'v{variant}-{kind}')
        if len(clips) == 3:
            seams = []
            for first, second in [('walk', 'entry'), ('entry', 'second'), ('second', 'repeat'), ('repeat', 'second')]:
                previous = walk_frames[-1] if first == 'walk' else decoded[first][-1]
                seams.append({'from': first, 'to': second, **checks.difference(previous, decoded[second][0])})
            contact([walk_frames[-1], decoded['entry'][0], decoded['entry'][-1], decoded['second'][0], decoded['second'][-1], decoded['repeat'][0], decoded['repeat'][-1], decoded['second'][0]], f'v{variant}-seams')
            variants.append({'id': variant, 'clips': clips, 'seams': seams, 'review': '技术检查已完成，待逐帧检查刀光、造型和衔接；不代表美术通过。', 'visual_acceptance': 'pending_review'})
        elif clips:
            omitted = contract.get('requested_omission', {}).get('variant') == variant
            variants.append({'id': variant, 'clips': clips, 'seams': [],
                             'review': '第二段没有取得任务编号，按用户选择不补交；只有第一、三段可看，不能展示完整攻击循环。' if omitted else '部分动画已完成，其余段落仍在生成；三段齐全后才能看完整循环。',
                             'visual_acceptance': 'incomplete' if omitted else 'pending_generation'})
        if clips and str(variant) in reviews:
            variants[-1].update(reviews[str(variant)])
    study = {
        'hero': 'yasuo', 'direction': 'se', 'width': SIZE, 'height': SIZE, 'variants': variants,
        'completed_clips': len(validations), 'expected_clips': 18, 'prompts': contract['motion_prompts'],
        'complete_variants': sum(len(v['clips']) == 3 for v in variants), 'requested_omission': contract.get('requested_omission'),
        'walk': {'frames': [f'inputs/walk-{i}.png' for i in range(1, 9)], 'durations_ms': [100] * 8, 'duration_ms': 800},
        'timeline': contract['timeline'], 'credits_before': contract['credits_before'], 'credits_after': args.credits_after,
        'credits_consumed': contract['credits_before'] - args.credits_after if args.credits_after is not None else None,
        'production_ready': False, 'runtime_integrated': False,
    }
    if not args.partial:
        assert len(variants) == 6 and len(validations) == contract.get('expected_delivered_clips', 18) and args.credits_after is not None
    # Registries and QA are mechanically derived, never replacements for final media.
    (BASE / 'study.json').write_text(json.dumps(study, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (BASE / 'validation.json').write_text(json.dumps({'status': 'delivered_media_technical_pass' if len(validations) == contract.get('expected_delivered_clips', 18) else 'partial', 'requested_omission': contract.get('requested_omission'), 'clips': validations}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    summary = {'completed': len(validations), 'full_variants': study['complete_variants'],
               'edge_contacts': [{'variant': v['variant'], 'clip': v['clip'], 'frames': v['edge_contact_frames']} for v in validations if v['edge_contact_frames']]}
    if not args.partial:
        summary['seams'] = [{'id': v['id'], 'seams': v['seams']} for v in variants]
    print(json.dumps(summary, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
