"""Losslessly package the V11 public canvas exports; preserve rendered pixels."""
import json
from pathlib import Path
from PIL import Image

BASE = Path(__file__).resolve().parent.parent / 'assets/hero-skills/2026-10-12/yasuo/q-v11-eight-wind-blade'
DIRECTIONS = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne']
WIDTH, HEIGHT = 384, 320


def main():
    entries = []
    for direction in DIRECTIONS:
        source = BASE / f'export/q-{direction}-wind-atlas.png'
        with Image.open(source) as image:
            assert image.size == (WIDTH * 4, HEIGHT * 8)
            atlas = image.convert('RGBA')
            frames = []
            for i in range(31):
                x, y = i % 4 * WIDTH, i // 4 * HEIGHT
                frame = atlas.crop((x, y, x + WIDTH, y + HEIGHT))
                bounds = frame.getchannel('A').getbbox()
                assert bounds and 0 < bounds[0] < bounds[2] < WIDTH and 0 < bounds[1] < bounds[3] < HEIGHT, (direction, i, bounds)
                frames.append(frame)
        path = BASE / f'export/q-{direction}-wind.webp'
        frames[0].save(path, save_all=True, append_images=frames[1:], duration=[16] * 30 + [920], loop=0, lossless=True, method=6)
        with Image.open(path) as clip:
            duration = 0
            for i in range(clip.n_frames):
                clip.seek(i)
                clip.load()
                duration += clip.info['duration']
            assert duration == 1400 and clip.info['loop'] == 0
            entries.append({'direction': direction, 'path': f'export/{path.name}', 'atlas': f'export/{source.name}',
                            'width': WIDTH, 'height': HEIGHT, 'anchor': [192, 200], 'source_frames': 31,
                            'encoded_frames': clip.n_frames, 'duration_ms': duration, 'cast_duration_ms': 480,
                            'alpha': True, 'edge_contact_frames': []})
    manifest = {'directions': entries, 'frame_durations_ms': [16] * 30 + [920], 'sample_times_ms': list(range(0, 481, 16)),
                'atlas_columns': 4, 'atlas_rows': 8, 'source_motion': '../q-v8-direction-picker/rig.ts',
                'source_weapon': '../q-v10-sword-wind-only/media/yasuo-q-sword-wind.webp',
                'source_weapon_job': 'job_e0da79854e6541d6ad7ae2282376fb24',
                'weapon_grip': [38, 104], 'weapon_scale_x': 132 / 140, 'weapon_source_rect': [19, 93, 164, 24],
                'weapon_phase': 'one 2000ms source cycle mapped to 480ms cast, frame zero during rest',
                'generation_jobs': 0, 'integrated_into_main_game': False}
    (BASE / 'animations.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (BASE / 'final_outputs.json').write_text(json.dumps({'status': 'success', 'generation_jobs': 0,
        'outputs': [{'type': 'interactive_preview', 'path': 'index.html', 'mime_type': 'text/html'}]
        + [{'type': 'media', 'path': e['path'], 'mime_type': 'image/webp'} for e in entries]
        + [{'type': 'media', 'path': e['atlas'], 'mime_type': 'image/png'} for e in entries]}, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(entries, ensure_ascii=False))


if __name__ == '__main__':
    main()
