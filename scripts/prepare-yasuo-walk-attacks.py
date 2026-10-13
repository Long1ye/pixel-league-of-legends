"""Prepare a bounded six-variant study from the existing walk, without API calls."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v11-walk-six'
WALK_STUDY = ROOT / 'assets/hero-animations/2026-10-09/v2/study.json'
POSE_PROMPTS = {
    'first-end': '保持这张走路亚索的像素造型、服装、发型、持刀手和人物大小。只改变动作：停止迈步，拔出腰间的武士刀，完成一次向右上方的上挥砍，刀停在身体右侧高位。双脚自然站稳，角色仍朝右下方。只画真实金属刀身，不要刀光、拖影或特效，透明背景。',
    'second-end': '保持这张走路亚索的像素造型、服装、发型、持刀手和人物大小。只改变动作：完成一次从右上向右下的挥砍，刀停在身体右前方低位，准备反手向上挥砍。双脚自然站稳，角色仍朝右下方。只画真实金属刀身，不要刀光、拖影或特效，透明背景。',
}
MOTIONS = {
    'entry': '亚索从迈步姿势自然停稳，拔刀并完成一次从低位到高位的挥砍，衔接第一次挥刀结束姿势。保持右下朝向和原有服装造型，动作连贯、收势自然。只保留真实刀身，不要刀光、拖影或特效。',
    'second': '亚索从第一次挥刀结束的高位姿势，顺势从上向下挥砍一次，自然衔接第二次挥刀结束的低位姿势。保持右下朝向和原有服装造型，动作连贯、收势自然。只保留真实刀身，不要刀光、拖影或特效。',
    'repeat': '亚索从第二次挥刀结束的低位姿势，翻腕后反手从下向上挥砍一次，到高位后翻腕还原，自然衔接第一次挥刀结束姿势。保持右下朝向和原有服装造型，动作连贯、收势自然。只保留真实刀身，不要刀光、拖影或特效。',
}

def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def prepare(credits):
    if BASE.exists():
        raise SystemExit('Study already exists; inspect its original plans/state rather than recreate it.')
    study = json.loads(WALK_STUDY.read_text(encoding='utf-8'))
    hero = next(h for h in study['heroes'] if h['id'] == 'yasuo')
    walk = next(c for c in hero['clips'] if c['state'] == 'walk' and c['direction'] == 'se')
    source = (WALK_STUDY.parent / walk['webp']).resolve()
    manifest = json.loads((source.parent / 'final_outputs.json').read_text(encoding='utf-8'))
    assert any((ROOT / o['path']).resolve() == source for o in manifest['outputs'])
    inputs = BASE / 'inputs'
    inputs.mkdir(parents=True)
    shutil.copyfile(source, inputs / 'walk-original.webp')
    with Image.open(source) as image:
        assert image.size == (128, 128) and image.n_frames == 8
        for i in range(8):
            image.seek(i)
            frame = image.convert('RGBA')
            padded = Image.new('RGBA', (176, 176))
            padded.paste(frame, (16, 32))
            assert padded.crop((16, 32, 144, 160)).tobytes() == frame.tobytes()
            padded.save(inputs / f'walk-{i + 1}.png')
    prefix = BASE.relative_to(ROOT).as_posix()
    plans = []
    for name, prompt in POSE_PROMPTS.items():
        path = BASE / f'{name}.plan.json'
        write_json(path, {
            'command': 'image-edit-run', 'recovery_command': 'general-image-poll', 'recovery_id_flag': '--job-id',
            'args': ['--reference-image', f'{prefix}/inputs/walk-8.png', '--prompt', prompt,
                     '--mode', 'pixel', '--strict', '--no-multi-pixelation', '--generation-model', 'image-2.5',
                     '--resolution', '1K', '--quality', 'detailed', '--remove-bg-method', 'standard'],
            'output_dir': f'{prefix}/poses/{name}',
        })
        plans.append(path.relative_to(ROOT).as_posix())
    write_json(BASE / 'poses.batch.json', plans)
    write_json(BASE / 'contract.json', {
        'scope': 'Six independently generated variants, three clips each; only the existing SE walk is reused. No runtime integration or new walk generation.',
        'direction': 'se', 'canvas': [176, 176], 'source_dimensions': [128, 128],
        'walk_translation': [16, 32], 'walk_anchor': hero['anchors']['se'],
        'walk_source': source.relative_to(ROOT).as_posix(), 'walk_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'input_pixels_resampled': False, 'pose_prompts': POSE_PROMPTS, 'motion_prompts': MOTIONS,
        'prompt_optimization': True, 'optimized_backend_text_saved': False,
        'variant_count': 6, 'animation_count': 18, 'frames_per_clip': 8,
        'timeline': ['walk_once', 'entry_once', 'second_repeat', 'repeat_repeat'],
        'credits_before': credits, 'estimated_credits': 828,
        'production_ready': False, 'runtime_integrated': False,
    })
    print(json.dumps({'source': str(source), 'walk_frame_bounds': [Image.open(inputs / f'walk-{i + 1}.png').getchannel('A').getbbox() for i in range(8)], 'pose_plans': plans}, ensure_ascii=False))

def plan_animations():
    contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))
    if not contract.get('poses_reviewed'):
        raise SystemExit('Review generated poses and record acceptance before animation.')
    if (BASE / 'animations.batch.json').exists():
        raise SystemExit('Batch already planned; run/recover existing plans, do not recreate.')
    prefix = BASE.relative_to(ROOT).as_posix()
    plans = []
    for variant in range(1, 7):
        directory = BASE / f'variant-{variant}'
        directory.mkdir()
        for name, (start, end) in {'entry': ('walk-8', 'first-end'), 'second': ('first-end', 'second-end'), 'repeat': ('second-end', 'first-end')}.items():
            path = directory / f'{name}.plan.json'
            write_json(path, {
                'command': 'keyframes-run', 'recovery_command': 'animate-poll',
                'args': ['--keyframe', f'0={prefix}/inputs/{start}.png', '--keyframe', f'7={prefix}/inputs/{end}.png',
                         '--keyframe-strength', '0=1', '--keyframe-strength', '7=1',
                         '--prompt', MOTIONS[name], '--animation-model', 'pixel-engine-v1.1', '--optimize-prompt',
                         '--total-frames', '8', '--output-format', 'webp', '--animation-type', 'attack',
                         '--color-count', '64', '--remove-bg-method', 'standard'],
                'output_dir': f'{prefix}/variant-{variant}/clips/{name}',
            })
            plans.append(path.relative_to(ROOT).as_posix())
    write_json(BASE / 'animations.batch.json', plans)
    print('18 independent recoverable animation plans prepared; no API submission.')

def plan_cleanup():
    if (BASE / 'cleanup.batch.json').exists():
        raise SystemExit('Cleanup already planned; inspect/recover the existing jobs.')
    contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))
    prefix = BASE.relative_to(ROOT).as_posix()
    prompt = '参考图1是要保留的挥刀结束动作，参考图2是人物造型。保持图1的姿势、持刀位置和大小，让服装、银色肩甲与图2一致。去掉全部刀光、发光、光晕和脚下光效，只留下清晰像素人物和实心金属刀，背景完全透明。'
    plans = []
    for name in ['first-end', 'second-end']:
        state = json.loads((BASE / f'{name}.plan.state.json').read_text(encoding='utf-8'))
        manifest = json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
        assert state['status'] == 'success' and manifest['job_id'] == state['job_id']
        image = next(o['path'] for o in manifest['outputs'] if o['type'] == 'media' and o['mime_type'] == 'image/png')
        path = BASE / f'{name}-clean.plan.json'
        write_json(path, {
            'command': 'image-edit-run', 'recovery_command': 'general-image-poll', 'recovery_id_flag': '--job-id',
            'args': ['--reference-image', image, '--reference-image', f'{prefix}/inputs/walk-8.png',
                     '--prompt', prompt, '--mode', 'pixel', '--strict', '--no-multi-pixelation',
                     '--generation-model', 'nano-banana', '--generation-speed', 'normal',
                     '--resolution', '1K', '--remove-bg-method', 'standard'],
            'output_dir': f'{prefix}/poses/{name}-clean',
        })
        plans.append(path.relative_to(ROOT).as_posix())
    write_json(BASE / 'cleanup.batch.json', plans)
    contract['initial_pose_acceptance'] = 'rejected: unwanted glow around character and sword; not used as animation keyframes'
    contract['cleanup_prompt'] = prompt
    contract['extra_cleanup_jobs'] = 2
    write_json(BASE / 'contract.json', contract)
    print('Two bounded cleanup plans prepared; original poses retained, no animation submitted.')

def accept_poses():
    contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))
    if contract.get('poses_reviewed'):
        raise SystemExit('Poses already accepted; do not overwrite animation inputs.')
    target_bottom = Image.open(BASE / 'inputs/walk-8.png').getchannel('A').getbbox()[3]
    records = {}
    for name in ['first-end', 'second-end']:
        state = json.loads((BASE / f'{name}-clean.plan.state.json').read_text(encoding='utf-8'))
        manifest = json.loads(Path(state['manifest']).read_text(encoding='utf-8'))
        assert state['status'] == 'success' and manifest['job_id'] == state['job_id']
        source = ROOT / next(o['path'] for o in manifest['outputs'] if o['type'] == 'media' and o['mime_type'] == 'image/png')
        with Image.open(source) as original:
            image = original.convert('RGBA')
        assert image.size == (176, 176) and image.getchannel('A').getextrema()[0] == 0
        bbox = image.getchannel('A').getbbox()
        # Visual review established both poses' lowest opaque pixel is a foot, not the sword.
        dy = target_bottom - bbox[3]
        assert bbox[1] + dy > 0 and bbox[3] + dy < 176
        aligned = Image.new('RGBA', image.size)
        aligned.paste(image, (0, dy))
        assert aligned.getchannel('A').histogram() == image.getchannel('A').histogram()
        aligned.save(BASE / 'inputs' / f'{name}.png')
        records[name] = {'source': source.relative_to(ROOT).as_posix(), 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                         'integer_translation': [0, dy], 'aligned_bbox': aligned.getchannel('A').getbbox(),
                         'review': 'Native view checked: SE facing, blue scarf, silver shoulder armor, one solid blade, no visible glow; accepted as motion keyframe, not production art.'}
    contract['poses_reviewed'] = True
    contract['pose_inputs'] = records
    contract['pose_review_note'] = 'Initial glowy poses rejected. Cleaned poses inspected before use. Foot baseline aligned only by integer translation; no resampling.'
    write_json(BASE / 'contract.json', contract)
    print(json.dumps(records, ensure_ascii=False, indent=2))

def resume_batch():
    contract = json.loads((BASE / 'contract.json').read_text(encoding='utf-8'))
    if (BASE / 'resume.batch.json').exists():
        raise SystemExit('Resume batch exists; use original saved plans.')
    plans = json.loads((BASE / 'animations.batch.json').read_text(encoding='utf-8'))
    omitted = BASE / 'variant-1/second.plan.json'
    remaining = [p for p in plans if (ROOT / p).resolve() != omitted.resolve()]
    assert len(remaining) == 17
    contract['requested_omission'] = {'variant': 1, 'clip': 'second', 'reason': 'Submission outcome unknown, no job ID. Human explicitly chose not to resubmit or incur duplicate charge.'}
    contract['expected_delivered_clips'] = 17
    write_json(BASE / 'contract.json', contract)
    write_json(BASE / 'resume.batch.json', remaining)
    print('17-plan resume batch prepared; unknown-outcome plan excluded by human choice.')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--credits-before', type=int)
    parser.add_argument('--plan-animations', action='store_true')
    parser.add_argument('--plan-cleanup', action='store_true')
    parser.add_argument('--accept-poses', action='store_true')
    parser.add_argument('--plan-resume', action='store_true')
    args = parser.parse_args()
    if args.plan_resume:
        resume_batch()
    elif args.accept_poses:
        accept_poses()
    elif args.plan_cleanup:
        plan_cleanup()
    elif args.plan_animations:
        plan_animations()
    else:
        if args.credits_before is None:
            parser.error('--credits-before required for initial preparation')
        prepare(args.credits_before)

if __name__ == '__main__':
    main()
