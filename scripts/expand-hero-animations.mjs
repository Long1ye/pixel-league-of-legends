/** Bounded orchestration of the bundled CLI. Persists only sanitized job bookkeeping. */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = 'assets/hero-animations/2026-10-09/v2';
const ledgerFile = resolve(project, output, 'batch.json');
const cli = '.agents/skills/game-assets/meowart_api.py';
const directions = ['e', 's', 'sw', 'w', 'nw', 'n', 'ne'];
const labels = { e: '右方', s: '下方', sw: '左下方', w: '左方', nw: '左上方', n: '上方', ne: '右上方' };
const extras = {
  yasuo: '头发和蓝色围巾随动作轻摆',
  ahri: '白色尾巴和衣摆随动作轻摆，保持法球和持球手不变',
  garen: '披风随动作轻摆，保持大剑形状和持剑手不变',
};
const sources = JSON.parse(readFileSync(resolve(project, 'assets/hero-walk-directions/2026-10-09/v1/study.json'), 'utf8'));

function inputHash(path) { return createHash('sha256').update(readFileSync(resolve(project, path))).digest('hex'); }
function plan() {
  const jobs = [];
  for (const direction of directions) {
    for (const hero of sources.heroes) {
      for (const state of ['idle', 'walk']) {
        const source = `assets/hero-walk-directions/2026-10-09/v1/${hero.directory}/${hero.frames[direction].file}`;
        const motion = state === 'idle' ? '原地站立待机，双脚固定，轻微呼吸' : '原地交替迈步，双脚轮流向前和向后';
        jobs.push({
          key: `${hero.id}/${state}-${direction}`, hero: hero.id, state, direction, source,
          source_sha256: inputHash(source),
          prompt: `角色保持输入图中的朝向（屏幕${labels[direction]}），${motion}，${extras[hero.id]}。不转身，不平移，固定镜头，完整循环，保持原有造型。`,
          output_dir: `${output}/${hero.id}/${state}-${direction}`,
          status: 'pending', job_id: null, manifest: null,
        });
      }
    }
  }
  return { status: 'planned', initial_credits: 11515, expected_new_jobs: 42, expected_credits: 1470, reused_se_clips: 6, jobs };
}
function manifests(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(root, entry.name);
    return entry.isDirectory() ? manifests(path) : entry.name === 'final_outputs.json' ? [path] : [];
  });
}
function savedManifest(job) {
  for (const path of manifests(resolve(project, job.output_dir))) {
    const data = JSON.parse(readFileSync(path, 'utf8'));
    if (data.status === 'success' && data.outputs?.length && (!job.job_id || job.job_id === data.job_id) &&
      data.outputs.every(item => item.type === 'media' && existsSync(resolve(project, item.path)))) {
      return { path, job_id: data.job_id };
    }
  }
  return null;
}

async function main() {
  if (!process.argv.includes('--start')) throw new Error('Pass --start only when this paid expansion is authorized');
  mkdirSync(resolve(project, output), { recursive: true });
  const ledger = existsSync(ledgerFile) ? JSON.parse(readFileSync(ledgerFile, 'utf8')) : plan();
  if (ledger.jobs.length !== 42 || ledger.expected_credits !== 1470) throw new Error('Unexpected expansion scope');
  const save = () => writeFileSync(ledgerFile, `${JSON.stringify(ledger, null, 2)}\n`);
  let stopped = false;
  for (const job of ledger.jobs) {
    if (inputHash(job.source) !== job.source_sha256) throw new Error(`Source changed: ${job.key}`);
    const saved = savedManifest(job);
    if (saved) {
      job.job_id = saved.job_id; job.manifest = saved.path; job.status = 'success';
    } else if (!job.job_id && job.status !== 'pending') {
      throw new Error(`Unknown submission outcome; refusing to resubmit ${job.key}`);
    }
  }
  ledger.status = 'running'; save();

  function run(job) {
    return new Promise(resolveJob => {
      const recovering = Boolean(job.job_id);
      const args = recovering ? [cli, 'animate-poll', '--api-job-id', job.job_id, '--output-dir', job.output_dir] : [
        cli, 'animate-run', '--image-file', job.source, '--prompt', job.prompt,
        '--output-frames', '8', '--output-format', 'webp', '--animation-type', job.state,
        '--animation-model', 'pixel-engine-v1.1', '--intelligence', 'standard', '--optimize-prompt',
        '--color-count', '64', '--remove-bg-method', 'standard', '--output-dir', job.output_dir,
      ];
      job.status = recovering ? 'recovering' : 'submitting'; save();
      process.stdout.write(`[BATCH] ${recovering ? 'recover' : 'start'} ${job.key}\n`);
      const child = spawn('python', ['-u', ...args], {
        cwd: project, env: { ...process.env, PYTHONUTF8: '1' }, windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'], shell: false,
      });
      let buffer = '';
      const diagnose = line => {
        const remoteStatus = line.match(/^\[INFO\].*\bstatus=([a-z_]+)/)?.[1];
        if (remoteStatus) job.remote_status = remoteStatus;
        if (/outdated|newer version|skill_upgrade_required/i.test(line)) job.runner_upgrade_warning = true;
        if (/timed out|timeout|超时/i.test(line)) job.failure_category = 'timeout';
        else if (/no downloadable declared final media|missing.*final/i.test(line)) job.failure_category = 'final_media_contract';
        else if (/poll request failed|connectionerror|sslerror|http.*error/i.test(line)) job.failure_category = 'network';
        else if (/insufficient.*credits|积分不足/i.test(line)) job.failure_category = 'credits';
        save();
      };
      child.stdout.on('data', chunk => {
        buffer += chunk.toString('utf8');
        let newline;
        while ((newline = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, newline); buffer = buffer.slice(newline + 1);
          if (line.startsWith('[INFO]') || line.startsWith('[WARN]') || line.startsWith('[ERROR]')) diagnose(line);
          const id = line.match(/submitted api_job_id=(job_[a-z0-9]+)/)?.[1];
          if (id) {
            job.job_id = id; job.status = 'running'; save();
            process.stdout.write(`[BATCH] submitted ${job.key} ${id}\n`);
          }
        }
      });
      // Never persist raw CLI/job responses or signed URLs.
      child.stderr.on('data', chunk => diagnose(chunk.toString('utf8')));
      child.on('error', () => { job.status = 'launch_failed'; stopped = true; save(); resolveJob(); });
      child.on('close', code => {
        const saved = savedManifest(job);
        if (saved) {
          job.job_id = saved.job_id; job.manifest = saved.path; job.status = 'success';
          const done = ledger.jobs.filter(item => item.status === 'success').length;
          process.stdout.write(`[BATCH] complete ${job.key} ${done}/42\n`);
        } else {
          job.status = job.job_id ? 'needs_recovery' : 'unknown_outcome';
          job.exit_code = code; stopped = true;
          process.stdout.write(`[BATCH] stopped ${job.key} status=${job.status} job_id=${job.job_id ?? 'unknown'} remote_status=${job.remote_status ?? 'unknown'} category=${job.failure_category ?? 'unknown'} upgrade_warning=${job.runner_upgrade_warning ?? false}\n`);
        }
        save(); resolveJob();
      });
    });
  }
  let cursor = 0;
  const queue = ledger.jobs.filter(job => job.status !== 'success');
  const worker = async () => {
    while (!stopped && cursor < queue.length) {
      const job = queue[cursor++];
      await run(job);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  ledger.status = ledger.jobs.every(job => job.status === 'success') ? 'success' : 'needs_attention';
  save(); process.stdout.write(`[BATCH] finished status=${ledger.status}\n`);
  if (ledger.status !== 'success') process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
