"""Prepare a bounded A/B study. Padding and plan metadata only; no paid submission."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v4-diagonal-ab'
SOURCE = ROOT / 'assets/hero-walk-directions/2026-10-09/v1/yasuo/component_004_pixel_multi_view/iso_front_right.png'

def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

with Image.open(SOURCE) as im:
    source = im.convert('RGBA'); source.load()
assert source.size == (128, 128)
prepared = Image.new('RGBA', (192, 192))
prepared.paste(source, (32, 48))
folder = BASE / 'preparation'
folder.mkdir(parents=True, exist_ok=True)
prepared.save(folder / 'original-outfit-padded.png')
relative = lambda p: str(p.relative_to(ROOT)).replace('\\', '/')
poses = {
    'low-right': '只调整手臂和武士刀：原来的持刀手把刀收到身体右下方，刀尖斜指画面右下，准备向左上斜撩。蓝色围巾必须完整包住颈部和胸口，金属护肩、腰带、裤子、绑腿、马尾的样式和颜色完全保留。保持原身高、右下朝向及双脚位置，透明背景，无刀光。',
    'high-left': '只调整手臂和武士刀：原来的持刀手把刀收到身体左上方，刀尖斜指画面左上，是右下斜撩到左上后的收刀姿势，也能直接起手斜砍回右下。蓝色围巾必须完整包住颈部和胸口，金属护肩、腰带、裤子、绑腿、马尾的样式和颜色完全保留。保持原身高、右下朝向及双脚位置，透明背景，无刀光。',
}
for name, prompt in poses.items():
    save(BASE / f'{name}.plan.json', {
        'command': 'image-edit-run',
        'args': ['--reference-image', relative(folder / 'original-outfit-padded.png'), '--prompt', prompt,
            '--mode', 'pixel', '--strict', '--generation-model', 'nano-banana', '--resolution', '1K', '--remove-bg-method', 'standard'],
        'output_dir': relative(BASE / 'poses' / name),
    })
save(BASE / 'contract.json', {
    'hero': 'yasuo', 'action': 'two_independent_diagonal_attacks', 'direction': 'se',
    'slash_path_a': 'screen lower-right to upper-left', 'slash_path_b': 'screen upper-left to lower-right',
    'original_source': relative(SOURCE), 'source_size': [128, 128], 'prepared_size': [192, 192],
    'source_offset': [32, 48], 'anchor': [96, 163], 'resampled_source': False,
    'clips': 2, 'attacks_per_clip': 1, 'requested_duration_ms_per_clip': 3000,
    'representation': 'pixel', 'final_format': 'animated_webp', 'final_transparency': True,
    'appearance': 'original blue scarf and silver shoulder armor; do not inherit v3 appearance errors',
    'credits_before': 9465, 'estimated_credits': 130,
    'runtime_integrated': False, 'production_ready': False,
})
print('Prepared original-outfit source: 192x192, anchor 96,163; two finite pose plans, no submission.')
