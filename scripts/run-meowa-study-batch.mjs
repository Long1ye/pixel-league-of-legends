/** Bounded process concurrency over explicitly prepared finite plans. No automatic replacement jobs. */
import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const plans = JSON.parse(readFileSync(resolve(root, process.argv[2]), 'utf8'));
if (!Array.isArray(plans) || !plans.length || plans.some(p => typeof p !== 'string' || !p.endsWith('.plan.json'))) throw new Error('Invalid batch');
const concurrency = Number(process.argv[3] ?? 3);
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 3) throw new Error('Concurrency must be 1, 2, or 3');
let cursor = 0, failures = 0;
async function worker() {
  while (cursor < plans.length) {
    const plan = plans[cursor++];
    console.log(`Starting: ${plan}`);
    const exit = await new Promise((done, reject) => {
      const child = spawn(process.execPath, ['scripts/run-meowa-study.mjs', plan], {
        cwd: root, windowsHide: true, shell: false, stdio: ['ignore', 'inherit', 'inherit'],
      });
      child.on('error', reject); child.on('close', done);
    });
    if (exit !== 0) { failures++; console.log(`Needs inspection/recovery: ${plan}`); }
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, plans.length) }, worker));
console.log(`Batch finished: ${plans.length - failures}/${plans.length} successful.`);
if (failures) process.exitCode = 1;
