/** Create exactly two first/last-frame plans after the shared poses have been inspected. */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const base = 'assets/hero-attacks/2026-10-09/yasuo/v4-diagonal-ab';
function manifests(path) {
  return readdirSync(resolve(root, path), { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? manifests(`${path}/${entry.name}`) : entry.name === 'final_outputs.json' ? [`${path}/${entry.name}`] : []);
}
function pose(id) {
  const found = manifests(`${base}/poses/${id}`);
  if (found.length !== 1) throw new Error(`Expected one inspected ${id} pose`);
  const manifest = JSON.parse(readFileSync(resolve(root, found[0]), 'utf8'));
  if (manifest.status !== 'success' || manifest.outputs.length !== 1 || manifest.outputs[0].type !== 'media') throw new Error('Invalid pose output');
  return relative(root, resolve(root, manifest.outputs[0].path)).replaceAll('\\', '/');
}
const low = pose('low-right'), high = pose('high-left-raised');
if (process.argv[2] === 'retry-a') {
  pose('a-middle'); // Ensure the inspected source exists; use its foot-aligned preparation below.
  const middle = `${base}/preparation/a-middle-aligned.png`;
  writeFileSync(resolve(root, `${base}/a-keyframes.plan.json`), JSON.stringify({
    command: 'keyframes-run', recovery_command: 'animate-poll',
    args: ['--keyframe', `0=${low}`, '--keyframe', `5=${middle}`, '--keyframe', `11=${high}`,
      '--keyframe-strength', '0=0.95', '--keyframe-strength', '5=0.85', '--keyframe-strength', '11=0.95',
      '--prompt', '从右下低位持刀起手，经过胸前向左的中间姿势，沿斜线只做一次向左上的斜撩攻击，收刀停在左上。是向上撩斩，不是举刀后下劈；完整保留蓝围巾和银色护肩，双脚稳定，镜头固定，不加刀光。',
      '--total-frames', '12', '--output-format', 'webp', '--animation-type', 'attack',
      '--animation-model', 'pixel-engine-v1.1', '--optimize-prompt', '--color-count', '64', '--remove-bg-method', 'standard'],
    output_dir: `${base}/clips/a-keyframes`,
  }, null, 2) + '\n');
  console.log('One explicit A retry plan; B is not regenerated. No paid submission.');
  process.exit(0);
}
const attacks = [
  { id: 'a', first: low, last: high, prompt: '亚索只做一次普通攻击：刀从画面右下方沿斜线挥到左上方，腰肩带动手臂，最后收住刀。完整蓝色围巾与银色护肩始终保持原样。双脚稳定，镜头固定，不回砍，不加刀光。' },
  { id: 'b', first: high, last: low, prompt: '亚索只做一次普通攻击：刀从画面左上方沿同一斜线挥到右下方，腰肩带动手臂，最后收住刀。完整蓝色围巾与银色护肩始终保持原样。双脚稳定，镜头固定，不反向挥第二刀，不加刀光。' },
];
for (const attack of attacks) writeFileSync(resolve(root, `${base}/${attack.id}.plan.json`), JSON.stringify({
  command: 'meowa-animation-run', recovery_command: 'animate-poll',
  args: ['--image-file', attack.first, '--last-image-file', attack.last, '--prompt', attack.prompt,
    '--style-mode', 'pixel', '--resolution', '480p', '--alpha-mode', 'sharp', '--output-frames', '24',
    '--quality-mode', 'medium', '--high-frame-rate', '--animation-mode', 'non_loop',
    '--remove-bg-method', 'standard', '--remove-bg-batch-size', '16', '--background-color', '#c6c6c6',
    '--padding', '0', '--optimize-prompt'],
  output_dir: `${base}/clips/${attack.id}`,
}, null, 2) + '\n');
console.log('Two independent one-attack plans created; no paid submission.');
