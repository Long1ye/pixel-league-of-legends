"""Package browser-rendered W frames without resizing or redrawing source artwork."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
STUDY = ROOT / 'assets/hero-skills/2026-10-12/yasuo/w-v2-layered-e'
OUTPUT = STUDY / 'export'


def main():
    with Image.open(OUTPUT / 'yasuo-w-east-atlas.png') as source:
        atlas = source.convert('RGBA')
    assert atlas.size == (1792, 640)
    frames = [atlas.crop((i % 8 * 224, i // 8 * 160, i % 8 * 224 + 224, i // 8 * 160 + 160)) for i in range(29)]
    boxes = [frame.getchannel('A').getbbox() for frame in frames]
    assert all(box and box[0] > 0 and box[1] > 0 and box[2] < 224 and box[3] < 160 for box in boxes), boxes
    assert frames[0].tobytes() == frames[-1].tobytes(), 'Rest pose must close exactly'
    frames[0].save(OUTPUT / 'yasuo-w-east.webp', save_all=True, append_images=frames[1:],
                   duration=[20] * 28 + [640], loop=0, lossless=True, method=6)
    with Image.open(OUTPUT / 'yasuo-w-east.webp') as clip:
        assert clip.n_frames == 29
        for i, frame in enumerate(frames):
            clip.seek(i)
            decoded = clip.convert('RGBA')
            # RGB of fully transparent pixels is immaterial; compare visible pixels and alpha.
            assert decoded.getchannel('A').tobytes() == frame.getchannel('A').tobytes()
            assert all(a == b or a[3] == 0 for a, b in zip(frame.getdata(), decoded.getdata()))
    manifest = {
        'type': 'local-layered-animation-study', 'direction': 'e', 'new_generation_jobs': 0,
        'main_game_integrated': False, 'wall': 'procedural timing placeholder, not final art',
        'character_duration_ms': 560, 'preview_loop_ms': 2700, 'webp_loop_ms': 1200,
        'frame_count': 29, 'frame_size': [224, 160], 'columns': 8, 'rows': 4,
        'sample_step_ms': 20, 'foot_anchor': [64, 128], 'transparent': True,
        'rest_frames_pixel_identical': True, 'edge_contacts': 0,
        'bounds': [min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)],
        'sources': ['../q-v7-user-linked/media/user-e.png', '../q-v5-small-grip-wind-e/media/upper-arm.png',
                    '../q-v5-small-grip-wind-e/media/forearm-hand.png', '../q-v5-small-grip-wind-e/media/wind-sword.png'],
        'events_ms': {'send_wind': 190, 'wall_rise': 300, 'hero_ready': 560, 'wall_fade': 1920, 'wall_end': 2240},
        'known_limits': ['One direction only', 'Uses existing small grip artwork and affine torso motion',
                         'Hair and scarf are part of the body texture, not independently simulated',
                         'Wall shown side-on for an eastward cast, duration is only for this preview'],
    }
    (STUDY / 'animation.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    outputs = {'final_outputs': [
        {'path': 'index.html', 'type': 'interactive-preview'},
        {'path': 'export/yasuo-w-east.webp', 'type': 'transparent-animation'},
        {'path': 'export/yasuo-w-east-atlas.png', 'type': 'sprite-atlas'},
        {'path': 'export/yasuo-w-east-poses.png', 'type': 'pose-preview'},
        {'path': 'export/preview.png', 'type': 'interactive-preview-screenshot'},
    ]}
    (STUDY / 'final_outputs.json').write_text(json.dumps(outputs, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'frames': 29, 'size': [224, 160], 'edge_contacts': 0, 'rest_loop_exact': True, 'bounds': manifest['bounds']}))


if __name__ == '__main__':
    main()
