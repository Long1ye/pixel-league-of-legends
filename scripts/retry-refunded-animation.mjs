/** One bounded replacement, only after the original job is terminal and fully refunded. */
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ledgerPath = resolve(project, 'assets/hero-animations/2026-10-09/v2/batch.json');
const originalId = 'job_29ba66acf4ae4234b17cf0d274a8f3be';
if (!process.argv.includes('--retry-confirmed-refund')) throw new Error('Explicit refund-check flag required');
const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
const job = ledger.jobs.find(item => item.key === 'yasuo/walk-n');
if (ledger.status !== 'needs_attention' || job?.status !== 'needs_recovery' || job.job_id !== originalId || job.attempts?.length) {
  throw new Error('Refusing an unverified or repeated replacement');
}
const refund = await new Promise((resolveResult, reject) => {
  const child = spawn('python', ['-u', '.agents/skills/game-assets/meowart_api.py',
    'animate-poll', '--api-job-id', originalId, '--output-dir', job.output_dir],
    { cwd: project, env: { ...process.env, PYTHONUTF8: '1' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'], shell: false });
  let output = '';
  child.stdout.on('data', chunk => { output += chunk.toString('utf8'); });
  child.stderr.on('data', () => {});
  child.on('error', reject);
  child.on('close', () => {
    try {
      const start = output.indexOf('\n{');
      const payload = JSON.parse(output.slice(start + 1).trim());
      if (payload.job_id !== originalId || payload.status !== 'failure' || payload.error_code !== 'generation_failed' ||
        payload.credit_refund?.refunded !== true || payload.credit_refund.amount !== 35) {
        throw new Error('Original job is not terminal and fully refunded; no replacement submitted');
      }
      resolveResult({ job_id: originalId, status: 'failure', refunded: true, refunded_credits: 35 });
    } catch (error) { reject(error); }
  });
});
if (createHash('sha256').update(readFileSync(resolve(project, job.source))).digest('hex') !== job.source_sha256) {
  throw new Error('Source changed; no replacement submitted');
}
job.attempts = [refund];
job.job_id = null;
job.status = 'pending';
job.manifest = null;
delete job.exit_code;
delete job.remote_status;
delete job.failure_category;
ledger.status = 'planned';
ledger.refunded_failed_attempt_count = 1;
ledger.refunded_credits = 35;
writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
process.stdout.write('[RETRY] Original generation failed and 35 credits refunded; one replacement prepared\n');
