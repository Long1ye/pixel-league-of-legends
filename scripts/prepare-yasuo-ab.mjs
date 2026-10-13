/** Explicit, finite paid study plans; no submission or regeneration in this script. */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const base = 'assets/hero-attacks/2026-10-09/yasuo/v2-ab';
const originalReady = 'assets/hero-attacks/2026-10-09/yasuo/v1/ready-pose/把这个亚索像素角色改成普通攻击的起手姿势_保持朝向屏幕右下方_双脚在原位置略_8f57dd18/remove_bg.png';
const definitions = [
  { id: 'g1', name: '斜劈 · 反撩', description: '大斜线下劈，再沿反向斜线向上回刀。',
    a: '原来的持剑手把武士刀从肩后斜劈向右下方，定格在刀刃经过身体前方、斜指右下的击中姿势。躯干微向前倾。',
    b: '原来的持剑手把低位武士刀沿反向斜线撩向右上方，定格在刀刃经过身体前方、斜指右上的击中姿势。',
    motionA: '从肩后抬刀姿势做一次向右下方的快速斜劈，结束在低位持刀姿势。',
    motionB: '从低位持刀姿势做一次向右上方的反手斜撩，结束在肩后抬刀姿势。' },
  { id: 'g2', name: '横斩 · 回斩', description: '短距离横斩，配反手回斩，动作更紧凑。',
    a: '原来的持剑手把肩后的武士刀在腰前短距离横斩，定格在刀刃水平伸向屏幕右侧的击中姿势。',
    b: '原来的持剑手把低位武士刀抬到胸前反手横向回斩，定格在刀刃斜向屏幕左上的击中姿势。身体仍朝右下。',
    motionA: '从肩后抬刀姿势做一次紧凑的腰前横斩，结束在低位持刀姿势。',
    motionB: '从低位持刀姿势做一次胸前反手回斩，结束在肩后抬刀姿势。' },
  { id: 'g3', name: '短劈 · 挑刀', description: '更短的下劈和上挑，比较快节奏普攻的辨识度。',
    a: '原来的持剑手把肩后的武士刀在身体右前方快速向下短劈，定格在刀尖朝下、刀刃接近竖直的击中姿势。',
    b: '原来的持剑手把低位武士刀在身体右前方快速向上挑，定格在刀尖朝上、刀刃接近竖直的击中姿势。',
    motionA: '从肩后抬刀姿势做一次身体右前方的短促下劈，结束在低位持刀姿势。',
    motionB: '从低位持刀姿势做一次身体右前方的短促上挑，结束在肩后抬刀姿势。' },
];
mkdirSync(resolve(root, base), { recursive: true });
const save = (path, data) => writeFileSync(resolve(root, path), JSON.stringify(data, null, 2) + '\n', 'utf8');
const common = '保持同一亚索像素造型、朝向右下、身高和脚底位置，只调整手臂、单把武士刀和小幅躯干动作。完整武器留在176×176画布内，透明背景，不加刀光。';
if (process.argv[2] === 'poses') {
  const poses = [{ id: 'low-guard', prompt: '把图中的抬刀姿势改为低位持刀：原来的持剑手把单把武士刀收到身体右前方低位，刀尖斜指右下，双脚不动。' },
    ...definitions.flatMap(g => [{ id: `${g.id}-a-impact`, prompt: g.a }, { id: `${g.id}-b-impact`, prompt: g.b }])];
  for (const pose of poses) save(`${base}/${pose.id}.plan.json`, {
    command: 'image-edit-run', args: ['--reference-image', originalReady, '--prompt', pose.prompt + common,
      '--mode', 'pixel', '--strict', '--generation-model', 'nano-banana', '--resolution', '1K', '--remove-bg-method', 'standard'],
    output_dir: `${base}/poses/${pose.id}`,
  });
  save(`${base}/contract.json`, { hero: 'yasuo', action: 'basic_attack_ab', direction: 'se', width: 176, height: 176,
    anchor: [72, 131], groups: definitions, clips_per_group: 2, frames_per_clip: 8, background: 'transparent',
    animation_model: 'pixel-engine-v1.1', ready_pose: originalReady, credits_before: 9985,
    expected_credits: 315, pricing_status: 'estimate', production_ready: false, runtime_integrated: false });
  save(`${base}/poses.batch.json`, poses.map(p => `${base}/${p.id}.plan.json`));
  console.log('Prepared 7 pose plans. No paid submission.');
} else if (process.argv[2] === 'repair' || process.argv[2] === 'animations') {
  function files(path) { return readdirSync(resolve(root, path), { withFileTypes: true }).flatMap(e => e.isDirectory()
    ? files(`${path}/${e.name}`) : e.name === 'final_outputs.json' ? [`${path}/${e.name}`] : []); }
  function posePath(id) {
    const manifests = files(`${base}/poses/${id}`);
    if (manifests.length !== 1) throw new Error(`Expected one final manifest for ${id}`);
    const m = JSON.parse(readFileSync(resolve(root, manifests[0]), 'utf8'));
    if (m.status !== 'success' || m.outputs.length !== 1 || m.outputs[0].type !== 'media') throw new Error(`Invalid ${id} result`);
    return relative(root, resolve(root, m.outputs[0].path)).replaceAll('\\', '/');
  }
  const low = posePath('low-guard'), plans = [];
  if (process.argv[2] === 'repair') {
    save(`${base}/g2-b-impact-repaired.plan.json`, { command: 'image-edit-run', args: [
      '--reference-image', low, '--prompt', '保持刀在画面右侧的同一只手，让亚索在胸前做反手回斩，定格在单把武士刀横向伸向屏幕左侧的击中姿势。另一只手不拿武器。保持右下朝向、同一造型、176×176透明画布、身高和脚底位置，不加刀光。',
      '--mode', 'pixel', '--strict', '--generation-model', 'nano-banana', '--resolution', '1K', '--remove-bg-method', 'standard'],
      output_dir: `${base}/poses/g2-b-impact-repaired` });
    console.log('Prepared one exact hand-continuity repair. No paid submission.');
    process.exit(0);
  }
  // Reuse the inspected vertical raised pose: same wielding hand as the low guard and impact poses.
  const high = posePath('g3-b-impact');
  const contract = JSON.parse(readFileSync(resolve(root, `${base}/contract.json`), 'utf8'));
  contract.ready_pose = high; contract.expected_credits = 390;
  contract.pricing_status = 'verified: 8 pose edits at 15, 6 keyframe clips at 45';
  contract.pose_review = 'Use inspected raised pose with the same screen-right wielding hand as low guard; replace the inconsistent G2 B impact.';
  save(`${base}/contract.json`, contract);
  for (const g of definitions) for (const variant of ['a', 'b']) {
    const id = `${g.id}-${variant}`, first = variant === 'a' ? high : low, last = variant === 'a' ? low : high;
    const prompt = `${(variant === 'a' ? g.motionA : g.motionB).replaceAll('肩后抬刀', '抬刀')}只有一次挥刀，双脚原地、固定镜头，保持原造型和持剑手，只留细短刀光，不转圈、不冲刺。`;
    const planPath = `${base}/${id}.plan.json`;
    save(planPath, { command: 'keyframes-run', recovery_command: 'animate-poll', args: [
      '--keyframe', `0=${first}`, '--keyframe', `3=${posePath(id === 'g2-b' ? 'g2-b-impact-repaired' : `${id}-impact`)}`, '--keyframe', `7=${last}`,
      '--keyframe-strength', '0=1', '--keyframe-strength', '3=0.85', '--keyframe-strength', '7=1',
      '--prompt', prompt, '--total-frames', '8', '--output-format', 'webp', '--animation-type', 'attack',
      '--animation-model', 'pixel-engine-v1.1', '--optimize-prompt', '--color-count', '64', '--remove-bg-method', 'standard'],
      output_dir: `${base}/clips/${id}` });
    plans.push(planPath);
  }
  save(`${base}/animations.batch.json`, plans);
  console.log('Prepared 6 keyframe animation plans. No paid submission.');
} else throw new Error('Choose poses or animations');
