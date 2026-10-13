"""Plan one fallback clip with automatic enhancement; no paid submission."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v10-wrist-flip'
PREFIX = BASE.relative_to(ROOT).as_posix()
path = BASE / 'animation-B.plan.json'
if path.exists():
    raise SystemExit('Plan exists; inspect original state, never overwrite or resubmit.')
contract_path = BASE / 'contract.json'
contract = json.loads(contract_path.read_text(encoding='utf-8'))
contract.update({'route': 'keyframes-run', 'frames': 12, 'estimated_credits': 63,
                 'optimization_method': 'keyframes-run --optimize-prompt; enhanced text is not returned',
                 'reference_edit_optimization': 'failed; no reference-edit animation submitted',
                 'sword_input_limitation': 'keyframes-run does not accept a separate weapon reference; supplied sword is a review reference only',
                 'requested_canvas': '176x176, same as selected A endpoints'})
plan = {'command': 'keyframes-run', 'recovery_command': 'animate-poll',
        'args': ['--keyframe', f'0={PREFIX}/inputs/low.png', '--keyframe', f'11={PREFIX}/inputs/high.png',
                 '--keyframe-strength', '0=1', '--keyframe-strength', '11=1',
                 '--prompt', contract['approved_motion_prompt'], '--animation-model', 'pixel-engine-v1.1',
                 '--optimize-prompt', '--total-frames', '12', '--output-format', 'webp',
                 '--animation-type', 'attack', '--color-count', '64', '--remove-bg-method', 'standard'],
        'output_dir': f'{PREFIX}/clips/animation-B'}
path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
contract_path.write_text(json.dumps(contract, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('One 12-frame B planned. Two selected A endpoints remain unchanged. No submission by this script.')
