"""Pack the approved V11 frames for the game without resizing or changing pixels."""
import hashlib
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/hero-skills/2026-10-12/yasuo/q-v11-eight-wind-blade'
OUTPUT = ROOT / 'assets/heroes/yasuo/q-wind-2026-10-12'


def main():
    manifest = json.loads((SOURCE / 'animations.json').read_text(encoding='utf-8'))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    clips = []
    for entry in manifest['directions']:
        source = SOURCE / entry['atlas']
        with Image.open(source) as image:
            atlas = image.convert('RGBA')
            frames = [atlas.crop((i % 4 * 384, i // 4 * 320, i % 4 * 384 + 384, i // 4 * 320 + 320)) for i in range(31)]
        bounds = [frame.getchannel('A').getbbox() for frame in frames]
        # Fixed per-direction crop across the whole cast preserves all motion and the foot anchor.
        left, top = min(b[0] for b in bounds) - 2, min(b[1] for b in bounds) - 2
        right, bottom = max(b[2] for b in bounds) + 2, max(b[3] for b in bounds) + 2
        assert 0 <= left < right <= 384 and 0 <= top < bottom <= 320
        width, height = right - left, bottom - top
        packed = Image.new('RGBA', (width * 4, height * 8))
        for i, frame in enumerate(frames):
            crop = frame.crop((left, top, right, bottom))
            packed.paste(crop, (i % 4 * width, i // 4 * height))
            restored = Image.new('RGBA', frame.size)
            restored.paste(crop, (left, top))
            assert restored.tobytes() == frame.tobytes(), (entry['direction'], i)
        filename = f"q-{entry['direction']}-wind.png"
        packed.save(OUTPUT / filename)
        clips.append({'direction': entry['direction'], 'key': f"yasuo-q-{entry['direction']}-wind", 'sheet': filename,
            'width': width, 'height': height, 'anchor': [192 - left, 200 - top], 'frame_count': 31,
            'columns': 4, 'rows': 8, 'source_crop': [left, top, right, bottom],
            'source_atlas': source.relative_to(ROOT).as_posix(), 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'source_pixels_preserved': True})
    output = {'version': 'v11-eight-wind-blade', 'cast_duration_ms': 480, 'sample_step_ms': 16,
        'scale_in_world': 26 / 90, 'visible_body_height_in_world': 26, 'clips': clips,
        'new_generation_jobs': 0, 'tip_explosion': False}
    (OUTPUT / 'animations.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'directions': len(clips), 'pixel_exact': True, 'texture_pixels': sum(c['width'] * c['height'] * 32 for c in clips)}))


if __name__ == '__main__':
    main()
