"""Copy declared Meowa outputs and extract unchanged frames for standalone playback."""
import json
import shutil
import argparse
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_BASE = ROOT / 'assets/hero-skills/2026-10-12/yasuo/q-v9-sword-fx-only'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--generation-folder', default='animation')
    parser.add_argument('--base', default=str(DEFAULT_BASE))
    parser.add_argument('--poster-from-first-frame', action='store_true')
    args = parser.parse_args()
    base = (ROOT / args.base).resolve()
    manifests = list((base / 'generated' / args.generation_folder).rglob('final_outputs.json'))
    if len(manifests) != 1:
        raise RuntimeError(f'Expected one animation manifest, found {len(manifests)}')
    generated = json.loads(manifests[0].read_text(encoding='utf-8'))
    assert generated['status'] == 'success'
    media = base / 'media'
    frames_dir = media / 'frames'
    frames_dir.mkdir(parents=True, exist_ok=True)
    declared = [item for item in generated['outputs'] if item['type'] == 'media']
    webps = [item for item in declared if item['mime_type'] == 'image/webp']
    if not webps:
        raise RuntimeError('No declared final animated WebP')

    candidates = []
    retained_outputs = []
    for index, item in enumerate(webps):
        source = ROOT / item['path']
        with Image.open(source) as animation:
            transparent = all(animation.seek(frame) is None and
                              animation.convert('RGBA').getchannel('A').getextrema()[0] == 0
                              for frame in range(animation.n_frames))
        destination = media / f'generated-animation-{index + 1}.webp'
        shutil.copy2(source, destination)
        candidates.append((transparent, source, destination.relative_to(base).as_posix()))
        retained_outputs.append({'type': 'media', 'path': destination.relative_to(base).as_posix(),
                                 'mime_type': 'image/webp'})
    candidates.sort(key=lambda candidate: candidate[0], reverse=True)
    transparent, source, _ = candidates[0]
    destination = media / 'yasuo-q-sword-wind.webp'
    shutil.copy2(source, destination)
    atlas_path = None
    for item in declared:
        source_image = ROOT / item['path']
        if item['mime_type'] == 'image/png' and source_image.name == 'sprite_sheet.png':
            atlas_destination = media / 'sword-wind-atlas.png'
            shutil.copy2(source_image, atlas_destination)
            atlas_path = atlas_destination.relative_to(base).as_posix()
            retained_outputs.append({'type': 'media', 'path': atlas_path, 'mime_type': 'image/png'})

    frames = []
    alpha_validation = []
    decoded_frames = []
    visible_bounds = []
    with Image.open(destination) as animation:
        dimensions = animation.size
        loop = animation.info.get('loop')
        for number in range(animation.n_frames):
            animation.seek(number)
            frame = animation.convert('RGBA')
            decoded_frames.append(frame.copy())
            duration = int(animation.info.get('duration', 125))
            duration = max(1, duration)
            name = f'frame-{number:02d}.png'
            frame.save(frames_dir / name)
            frames.append({'path': f'media/frames/{name}', 'durationMs': duration})
            alpha = frame.getchannel('A')
            bounds = alpha.getbbox()
            readable_bounds = alpha.point(lambda value: 255 if value >= 8 else 0).getbbox()
            if readable_bounds:
                visible_bounds.append(readable_bounds)
            alpha_validation.append({'frame': number, 'bounds': bounds,
                                     'alphaRange': alpha.getextrema(),
                                     'edgeContact': bool(bounds and (bounds[0] == 0 or bounds[1] == 0 or
                                                                    bounds[2] == dimensions[0] or bounds[3] == dimensions[1]))})
    assert len(frames) > 1, 'Must be an animation, not a still image'
    if args.poster_from_first_frame:
        decoded_frames[0].save(media / 'sword-wind-design.png')
    # Diagnostic contact sheet: unchanged frames at native resolution, not a final asset.
    columns = 6
    rows = (len(decoded_frames) + columns - 1) // columns
    all_bounds = [item['bounds'] for item in alpha_validation if item['bounds']]
    qa_top = max(0, min(bounds[1] for bounds in all_bounds) - 8) if all_bounds else 0
    qa_bottom = min(dimensions[1], max(bounds[3] for bounds in all_bounds) + 8) if all_bounds else dimensions[1]
    qa_cell_height = qa_bottom - qa_top
    qa = Image.new('RGBA', ((dimensions[0] + 12) * columns, (qa_cell_height + 24) * rows), '#101f2d')
    qa_draw = ImageDraw.Draw(qa)
    for number, frame in enumerate(decoded_frames):
        x = (number % columns) * (dimensions[0] + 12) + 6
        y = (number // columns) * (qa_cell_height + 24) + 18
        qa.alpha_composite(frame.crop((0, qa_top, dimensions[0], qa_bottom)), (x, y))
        qa_draw.text((x, y - 15), str(number + 1), fill='#cfeaf2')
    qa_directory = ROOT / 'docs/screenshots/animation-qa' / f'yasuo-{base.name}'
    qa_directory.mkdir(parents=True, exist_ok=True)
    qa.save(qa_directory / 'all-frames-native.png')
    animation_manifest = {
        'animationPath': 'media/yasuo-q-sword-wind.webp',
        'width': dimensions[0], 'height': dimensions[1],
        'durationMs': sum(frame['durationMs'] for frame in frames),
        'frames': frames,
        'retainedBackgroundPath': next((candidate[2] for candidate in candidates if not candidate[0]), None),
        'atlasPath': atlas_path,
    }
    # Fixed viewport for the whole clip: trim only unused vertical padding for display.
    # Files and grip coordinates remain untouched; never recenter per frame.
    if visible_bounds:
        preview_top = max(0, min(bounds[1] for bounds in visible_bounds) - 12)
        preview_bottom = min(dimensions[1], max(bounds[3] for bounds in visible_bounds) + 12)
        animation_manifest['previewRect'] = [0, preview_top, dimensions[0], preview_bottom - preview_top]
    (base / 'animation.json').write_text(json.dumps(animation_manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    outputs = [
        {'type': 'preview', 'path': 'index.html', 'mime_type': 'text/html'},
        {'type': 'media', 'path': 'media/yasuo-q-sword-wind.webp', 'mime_type': 'image/webp'},
        {'type': 'media', 'path': 'media/sword-wind-design.png', 'mime_type': 'image/png'},
    ] + retained_outputs + [
        {'type': 'media', 'path': frame['path'], 'mime_type': 'image/png'} for frame in frames
    ]
    validation = {'jobId': generated['job_id'], 'dimensions': dimensions,
                  'frameCount': len(frames), 'durationMs': animation_manifest['durationMs'],
                  'webpLoop': loop, 'hasTransparentBackgroundInEveryFrame': transparent,
                  'frames': alpha_validation,
                  'scope': 'standalone preview only; existing directional assets and gameplay untouched'}
    (base / 'final_outputs.json').write_text(json.dumps({'status': 'success', 'job_id': generated['job_id'], 'outputs': outputs}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (base / 'validation.json').write_text(json.dumps(validation, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: value for key, value in validation.items() if key != 'frames'}))


if __name__ == '__main__':
    main()
