"""Prepare a finite two-pose + one-clip study; never submit API requests."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v9-three-variants'
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v10-wrist-flip'
SWORD = Path('C:/Users/PC/AppData/Local/Temp/codex-clipboard-c780503f-4bf8-4b96-a3e8-9a142ea039ba.png')
MOTION = '在最低点翻转手腕，将刀身转为参考图所示的朝向，以这一形态从下向上连贯挥砍。到达最高点后再次翻腕，恢复高位持刀姿态，为下一次向下挥砍做准备。'

def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--credits-before', required=True, type=int)
    args = parser.parse_args()
    if BASE.exists():
        raise SystemExit('Output root already exists; inspect original plans/state, do not overwrite or resubmit.')
    study = json.loads((SOURCE / 'study.json').read_text(encoding='utf-8'))
    pair = study['variants'][0]
    a = next(clip for clip in pair['clips'] if clip['id'] == 'A')
    a_path = SOURCE / 'variant-1' / a['webp']
    manifest = json.loads((a_path.parent / 'final_outputs.json').read_text(encoding='utf-8'))
    assert any(Path(item['path']).resolve() == a_path.resolve() for item in manifest['outputs'])
    assert SWORD.is_file()
    inputs = BASE / 'inputs'
    inputs.mkdir(parents=True)
    with Image.open(a_path) as image:
        assert image.size == (176, 176) and image.n_frames == 8
        image.seek(0)
        image.convert('RGBA').save(inputs / 'high.png')
        image.seek(7)
        image.convert('RGBA').save(inputs / 'low.png')
    shutil.copyfile(SWORD, inputs / 'sword-reference.png')
    prefix = BASE.relative_to(ROOT).as_posix()
    prompts = {
        'low': '只输出参考图1中的完整亚索人物。保持服装、发型、身体比例、双脚位置和刀柄位置不变，仅翻转持刀手腕，让刀身采用参考图2的翻面朝向，形成在最低点准备向上反手挥砍的姿势。保持原图176×176透明画布，不添加刀光。',
        'high': '只输出参考图1中的完整亚索人物。保持服装、发型、身体比例、双脚位置和刀柄位置不变，仅翻转持刀手腕，让刀身采用参考图2的翻面朝向，表现向上反手挥砍刚到最高点、尚未翻腕还原的姿势。保持原图176×176透明画布，不添加刀光。',
    }
    plans = []
    for name, prompt in prompts.items():
        plan = {'command': 'image-edit-run', 'recovery_command': 'general-image-poll',
                'recovery_id_flag': '--job-id',
                'args': ['--reference-image', f'{prefix}/inputs/{name}.png', '--reference-image',
                         f'{prefix}/inputs/sword-reference.png', '--prompt', prompt, '--mode', 'pixel',
                         '--strict', '--no-multi-pixelation', '--generation-model', 'image-2.5',
                         '--resolution', '1K', '--quality', 'detailed', '--remove-bg-method', 'standard'],
                'output_dir': f'{prefix}/poses/{name}-flipped'}
        plan_path = BASE / f'{name}-flipped.plan.json'
        write_json(plan_path, plan)
        plans.append(plan_path.relative_to(ROOT).as_posix())
    write_json(BASE / 'poses.batch.json', plans)
    write_json(BASE / 'contract.json', {
        'hero': 'yasuo', 'direction': 'se', 'scope': 'one B refinement, first variant A retained',
        'approved_motion_prompt': MOTION, 'prompt_author': 'assistant_reviewed_and_authorized_by_user',
        'prompt_optimization': True, 'width': 176, 'height': 176, 'frames': 12,
        'credits_before': args.credits_before, 'estimated_credits': 63,
        'pose_edit_prompts': prompts,
        'sword_reference': {'original': str(SWORD), 'sha256': hashlib.sha256(SWORD.read_bytes()).hexdigest()},
        'retained_A': {'root': SOURCE.relative_to(ROOT).as_posix() + '/variant-1', 'clip': a,
                       'sha256': hashlib.sha256(a_path.read_bytes()).hexdigest()},
        'original_B': next(clip for clip in pair['clips'] if clip['id'] == 'B'),
        'endpoints': {'low': 'selected A frame 8', 'high': 'selected A frame 1'},
        'production_ready': False, 'runtime_integrated': False,
    })
    print(json.dumps({'root': str(BASE), 'pose_plans': plans, 'animation_submitted': False}, ensure_ascii=False))

if __name__ == '__main__':
    main()
