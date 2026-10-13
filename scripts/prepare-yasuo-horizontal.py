"""Only add transparent motion space; preserve every source pixel, with no resampling."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v3-horizontal'
source = ROOT / 'assets/hero-attacks/2026-10-09/yasuo/v1/ready-pose/把这个亚索像素角色改成普通攻击的起手姿势_保持朝向屏幕右下方_双脚在原位置略_8f57dd18/remove_bg.png'
with Image.open(source) as original:
    original = original.convert('RGBA'); original.load()
assert original.size == (176, 176)
prepared = Image.new('RGBA', (224, 192))
prepared.paste(original, (24, 8))
folder = BASE / 'preparation'
folder.mkdir(parents=True, exist_ok=True)
prepared.save(folder / 'padded-source.png')
contract = {'hero': 'yasuo', 'action': 'horizontal_two_slash_loop', 'direction': 'se',
    'source_canvas': [176, 176], 'prepared_canvas': [224, 192], 'source_offset': [24, 8],
    'anchor': [96, 139], 'representation': 'pixel', 'resampled_source': False,
    'clips': 1, 'requested_duration_seconds': 2, 'high_frame_rate': True,
    'final_format': 'animated_webp', 'final_transparency': True,
    'final_dimensions': 'Inspect native pixel output; do not rescale',
    'credits_before': 9595, 'estimated_credits': 80, 'runtime_integrated': False, 'production_ready': False}
(BASE / 'contract.json').write_text(json.dumps(contract, indent=2) + '\n', encoding='utf-8')
print('Prepared 224x192 transparent canvas at anchor 96,139; source pixels unchanged.')
