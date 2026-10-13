/** Prepare a finite three-pair batch; this script never submits paid requests. */
import { constants, copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const previous = 'assets/hero-attacks/2026-10-10/yasuo/v8-user-ab';
const target = 'assets/hero-attacks/2026-10-10/yasuo/v9-three-variants';
const balance = Number(process.argv[2]);
assert(Number.isInteger(balance) && balance >= 270, 'Pass the freshly checked balance');
const contract = JSON.parse(readFileSync(resolve(root, previous, 'contract.json'), 'utf8'));
const templates = Object.fromEntries(['A', 'B'].map(id => [id, JSON.parse(readFileSync(resolve(root, previous, `animation-${id}.plan.json`), 'utf8'))]));
for (const id of ['A', 'B']) {
  const plan = templates[id];
  assert.equal(plan.command, 'keyframes-run');
  assert.equal(plan.args[plan.args.indexOf('--prompt') + 1], contract.prompts[id]);
  assert(plan.args.includes('--optimize-prompt') && !plan.args.includes('--no-optimize-prompt'));
  assert.equal(plan.args[plan.args.indexOf('--total-frames') + 1], '8');
}
function save(relative, data) {
  const path = resolve(root, relative), text = JSON.stringify(data, null, 2) + '\n';
  mkdirSync(resolve(path, '..'), { recursive: true });
  if (existsSync(path)) assert.equal(readFileSync(path, 'utf8'), text, 'Never overwrite a different batch');
  else writeFileSync(path, text);
}
mkdirSync(resolve(root, target, 'inputs'), { recursive: true });
for (const filename of ['pose-1.png', 'pose-2.png', 'pose-1-original.png', 'pose-2-original.png']) {
  const from = resolve(root, previous, 'inputs', filename), to = resolve(root, target, 'inputs', filename);
  if (existsSync(to)) assert.deepEqual(readFileSync(to), readFileSync(from));
  else copyFileSync(from, to, constants.COPYFILE_EXCL);
}
const plans = [];
for (let variant = 1; variant <= 3; variant++) {
  const pair = `${target}/variant-${variant}`;
  save(`${pair}/contract.json`, { prompts: contract.prompts, requested_frames_per_clip: 8 });
  for (const id of ['A', 'B']) {
    const template = templates[id];
    const plan = { ...template, args: template.args.map(arg => arg.replace(previous, target)), output_dir: `${pair}/clips/animation-${id}` };
    const path = `${pair}/animation-${id}.plan.json`;
    save(path, plan); plans.push(path);
  }
}
save(`${target}/contract.json`, {
  ...contract,
  scope: 'Three new independently generated A/B pairs, six paid jobs total. Same user prompts and same parameters as v8. No runtime integration or extra replacement jobs.',
  inputs_copied_byte_identical_from: previous,
  variant_count: 3,
  animation_count: 6,
  credits_before: balance,
  estimated_credits: 270,
});
save(`${target}/batch.json`, plans);
console.log(`Prepared ${plans.length} finite plans; inputs copied byte-identically. No paid requests submitted.`);
