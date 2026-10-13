"""Prepare reference media and retain only the skill's reviewed prompt fields."""
import argparse
import json
import shutil
import subprocess
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'assets/hero-attacks/2026-10-10/yasuo/v10-wrist-flip'
PREFIX = BASE.relative_to(ROOT).as_posix()
SKILL = '.agents/skills/game-assets/meowart_api.py'

def save(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--optimize', action='store_true')
    parser.add_argument('--make-plan', action='store_true')
    args = parser.parse_args()
    contract_path = BASE / 'contract.json'
    contract = json.loads(contract_path.read_text(encoding='utf-8'))
    video_path = BASE / 'inputs/original-B.webp'
    sword_path = BASE / 'inputs/sword-reference-padded.png'
    source = ROOT / contract['retained_A']['root'] / contract['original_B']['webp']
    if not video_path.exists():
        shutil.copyfile(source, video_path)
    assert video_path.read_bytes() == source.read_bytes()
    if not sword_path.exists():
        with Image.open(BASE / 'inputs/sword-reference.png') as image:
            assert image.width <= 176 and image.height <= 176
            padded = Image.new('RGBA', (176, 176))
            padded.paste(image.convert('RGBA'), ((176 - image.width) // 2, (176 - image.height) // 2))
            padded.save(sword_path)
    with Image.open(video_path) as video:
        assert video.size == (176, 176) and video.n_frames == 8
    contract['pose_preparation_review'] = {
        'accepted': False, 'reason': '低位被改成高位，高位背景不透明；两个辅助姿势均不用于动画。',
        'credits_consumed': 18,
    }
    contract['route'] = 'meowa-animation-edit-run'
    contract['frames'] = 16
    contract['requested_canvas'] = 'Pixel reference-edit final canvas; inspect actual output dimensions'
    contract['primary_reference'] = 'video'
    contract['optimization_method'] = 'meowa-animation-edit-prompts; explicit polishing step, not a generation flag'
    contract['estimated_credits'] = 38
    save(contract_path, contract)
    media_args = ['--video-file', f'{PREFIX}/inputs/original-B.webp', '--image-file',
                  f'{PREFIX}/inputs/sword-reference-padded.png', '--background-color', '#c6c6c6']
    if args.optimize:
        output_path = BASE / 'optimized-prompt.json'
        if output_path.exists():
            raise SystemExit('Prompt already optimized; inspect saved fields rather than request again.')
        result = subprocess.run(['python', '-u', SKILL, 'meowa-animation-edit-prompts', *media_args,
                                 '--edit-intent', contract['approved_motion_prompt'], '--output-language', 'zh'],
                                cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
        if result.returncode:
            raise SystemExit('Prompt optimization failed; no animation submitted.')
        decoder = json.JSONDecoder()
        payload = None
        for index, char in enumerate(result.stdout):
            if char != '{':
                continue
            try:
                parsed, _ = decoder.raw_decode(result.stdout[index:])
            except json.JSONDecodeError:
                continue
            if isinstance(parsed, dict) and all(key in parsed for key in ['edit_intent', 'video_description', 'image_description']):
                payload = {key: parsed[key] for key in ['edit_intent', 'video_description', 'image_description']}
                break
        if not payload or not all(isinstance(value, str) and value.strip() for value in payload.values()):
            raise SystemExit('No complete public prompt fields returned; no animation submitted.')
        save(output_path, payload)
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    if args.make_plan:
        plan_path = BASE / 'animation-B.plan.json'
        if plan_path.exists():
            raise SystemExit('Animation plan exists; inspect original state and do not replace it.')
        optimized = json.loads((BASE / 'optimized-prompt.json').read_text(encoding='utf-8'))
        save(plan_path, {'command': 'meowa-animation-edit-run', 'recovery_command': 'animate-poll',
                         'args': [*media_args, '--edit-intent', optimized['edit_intent'],
                                  '--video-description', optimized['video_description'],
                                  '--image-description', optimized['image_description'], '--primary-reference', 'video',
                                  '--style-mode', 'pixel', '--resolution', '480p', '--alpha-mode', 'sharp',
                                  '--remove-bg-method', 'standard', '--remove-bg-batch-size', '16'],
                         'output_dir': f'{PREFIX}/clips/animation-B'})
        print('One B animation plan prepared; no submission by this script.')

if __name__ == '__main__':
    main()
