"""Validate declared reference-edit finals; render pixel-native internal QA."""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageSequence

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v10-wrist-flip'
QA = ROOT / 'docs/screenshots/animation-qa/yasuo-wrist-flip'

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def save(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def load(path):
    with Image.open(path) as image:
        frames, timings = [], []
        for frame in ImageSequence.Iterator(image):
            frame.load()
            timings.append(frame.info.get('duration', 0))
            frames.append(frame.convert('RGBA').copy())
    assert frames and all(frame.size == frames[0].size for frame in frames) and all(ms > 0 for ms in timings)
    return frames, timings

def contact(frames, label):
    width, height = frames[0].size
    # Four frames per sheet, every pixel displayed once, no smoothing or shrinking.
    QA.mkdir(parents=True, exist_ok=True)
    for offset in range(0, len(frames), 4):
        selection = frames[offset:offset + 4]
        sheet = Image.new('RGB', (width * 2, (height + 20) * 2), '#192d38')
        draw = ImageDraw.Draw(sheet)
        for index, frame in enumerate(selection):
            x, y = index % 2 * width, index // 2 * (height + 20)
            draw.text((x + 8, y + 3), f'{label} / {offset + index + 1}', fill='white')
            sheet.paste(Image.alpha_composite(Image.new('RGBA', frame.size, '#24333e'), frame).convert('RGB'), (x, y + 20))
        sheet.save(QA / f'{label}-{offset // 4 + 1}.png')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--credits-after', required=True, type=int)
    args = parser.parse_args()
    contract = read(BASE / 'contract.json')
    state = read(BASE / 'animation-B.plan.state.json')
    assert state['status'] == 'success' and state['job_id']
    manifest = read(Path(state['manifest']))
    assert manifest['status'] == 'success' and manifest['job_id'] == state['job_id']
    finals, transparent, all_paths = [], [], []
    for output in manifest['outputs']:
        assert output['type'] == 'media' and output['mime_type'] in {'image/webp', 'image/gif', 'image/png'}
        path = (ROOT / output['path']).resolve()
        assert path.is_relative_to(BASE) and path.is_file()
        all_paths.append(path)
        if path.suffix != '.webp':
            continue
        frames, durations = load(path)
        assert len(frames) == contract['frames']
        bounds = [frame.getchannel('A').getbbox() for frame in frames]
        assert all(bounds)
        removed = all(frame.getchannel('A').getextrema()[0] == 0 for frame in frames)
        width, height = frames[0].size
        edges = [index + 1 for index, box in enumerate(bounds)
                 if box[0] == 0 or box[1] == 0 or box[2] == width or box[3] == height]
        record = {'path': path.relative_to(BASE).as_posix(), 'width': width, 'height': height,
                  'frame_count': len(frames), 'durations_ms': durations, 'duration_ms': sum(durations),
                  'transparent': removed, 'edge_contact_frames': edges, 'bounds': bounds,
                  'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        finals.append(record)
        if removed:
            transparent.append((record, frames))
    assert len(transparent) == 1, 'Require one declared transparent final; do not select retained-background preview.'
    new_b, frames = transparent[0]
    plan = read(BASE / 'animation-B.plan.json')
    assert plan['args'][plan['args'].index('--prompt') + 1] == contract['approved_motion_prompt']
    assert '--optimize-prompt' in plan['args'] and '--no-optimize-prompt' not in plan['args']
    gif = next(path for path in all_paths if path.suffix == '.gif')
    gif_frames, gif_durations = load(gif)
    assert len(gif_frames) == len(frames) and gif_durations == new_b['durations_ms']
    png = next(path for path in all_paths if path.suffix == '.png')
    with Image.open(png) as image:
        atlas = image.convert('RGBA')
    width, height = new_b['width'], new_b['height']
    assert atlas.width % width == 0 and atlas.height % height == 0
    columns, rows = atlas.width // width, atlas.height // height
    assert columns * rows >= len(frames)
    for index in range(columns * rows):
        cell = atlas.crop((index % columns * width, index // columns * height, (index % columns + 1) * width, (index // columns + 1) * height))
        if index < len(frames):
            assert ImageChops.difference(cell.getchannel('A'), frames[index].getchannel('A')).getbbox() is None
            background = Image.new('RGBA', cell.size, '#24333e')
            assert ImageChops.difference(Image.alpha_composite(background, cell).convert('RGB'), Image.alpha_composite(background, frames[index]).convert('RGB')).getbbox() is None
        else:
            assert cell.getchannel('A').getbbox() is None
    contact(frames, 'new-B')
    old_root = ROOT / contract['retained_A']['root']
    clips = []
    for identifier, original in [('A', contract['retained_A']['clip']), ('oldB', contract['original_B'])]:
        path = old_root / original['webp']
        old_manifest = read(path.parent / 'final_outputs.json')
        assert any((ROOT / output['path']).resolve() == path.resolve() for output in old_manifest['outputs'])
        old_frames, durations = load(path)
        if identifier == 'A':
            assert hashlib.sha256(path.read_bytes()).hexdigest() == contract['retained_A']['sha256']
        clips.append({'id': identifier, 'path': path.relative_to(ROOT / 'assets/hero-attacks/2026-10-10/yasuo').as_posix(),
                      'width': old_frames[0].width, 'height': old_frames[0].height,
                      'frame_count': len(old_frames), 'durations_ms': durations, 'duration_ms': sum(durations)})
    compatible = (new_b['width'], new_b['height']) == (clips[0]['width'], clips[0]['height'])
    study = {'hero': 'yasuo', 'approved_prompt': contract['approved_motion_prompt'],
             'optimized_prompt': {'优化方式': contract['optimization_method'], '刀图输入限制': contract['sword_input_limitation']}, 'final_media': finals,
             'newB': new_b, 'originals': clips, 'canvas_compatible': compatible,
             'downloads': [{'path': path.relative_to(BASE).as_posix(), 'label': {'.webp': '透明WebP', '.gif': 'GIF动画', '.png': 'PNG图集'}[path.suffix]} for path in all_paths],
             'credits_before': contract['credits_before'], 'credits_after': args.credits_after,
             'credits_consumed': contract['credits_before'] - args.credits_after,
             'pose_preparation_review': contract['pose_preparation_review'],
             'review': '已完成技术检查，翻腕与刀刃朝向仍待逐帧验收。',
             'production_ready': False, 'runtime_integrated': False}
    save(BASE / 'study.json', study)
    save(BASE / 'validation.json', {'status': 'technical_pass', 'final_media': finals, 'retained_A_unchanged': True,
                                   'gif_frame_count_and_timing_match': True, 'png_cells_match_webp': True})
    print(json.dumps({'newB': {key: new_b[key] for key in ['width', 'height', 'frame_count', 'duration_ms', 'edge_contact_frames']},
                      'canvas_compatible': compatible, 'credits_consumed': study['credits_consumed']}, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
