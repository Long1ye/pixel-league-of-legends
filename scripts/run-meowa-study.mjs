/** Run one explicitly planned skill command, retaining only safe recovery metadata. */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const planPath = resolve(root, process.argv[2] ?? '');
const plan = JSON.parse(readFileSync(planPath, 'utf8'));
if (!plan.command?.endsWith('-run') || !Array.isArray(plan.args) || !plan.output_dir) throw new Error('Invalid explicit plan');
const statePath = planPath.replace(/\.json$/, '.state.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : { status: 'planned', job_id: null };
function manifests(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? manifests(resolve(path, entry.name)) : entry.name === 'final_outputs.json' ? [resolve(path, entry.name)] : []);
}
function result() {
  return manifests(resolve(root, plan.output_dir)).find(path => {
    const m = JSON.parse(readFileSync(path, 'utf8'));
    return m.status === 'success' && m.outputs?.length && (!state.job_id || state.job_id === m.job_id)
      && m.outputs.every(o => o.type === 'media' && existsSync(resolve(root, o.path)));
  });
}
const save = () => writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
if (result()) { console.log('Declared outputs already present; no new submission.'); process.exit(0); }
if (state.status !== 'planned' && !state.job_id) throw new Error('Unknown submission outcome: refusing duplicate paid job');
const recovering = Boolean(state.job_id);
if (recovering && !plan.recovery_command) throw new Error('Inspect CLI help and add the original-job recovery command');
const args = recovering
  ? [plan.recovery_command, plan.recovery_id_flag ?? '--api-job-id', state.job_id]
  : [plan.command, ...plan.args];
state.status = recovering ? 'recovering' : 'submitting'; save();
const child = spawn('python', ['-u', '.agents/skills/game-assets/meowart_api.py', ...args, '--output-dir', plan.output_dir],
  { cwd: root, env: { ...process.env, PYTHONUTF8: '1' }, windowsHide: true, shell: false, stdio: ['ignore', 'pipe', 'pipe'] });
let buffer = '';
function line(text) {
  const id = text.match(/(?:submitted\s+(?:api_job_id|job_id)|"(?:api_job_id|job_id)"\s*:)\s*=?\s*"?([a-zA-Z0-9][a-zA-Z0-9_-]{7,})/)?.[1];
  if (id && !state.job_id) { state.job_id = id; state.status = 'running'; save(); console.log(`Submitted: ${id}`); }
  const status = text.match(/^\[INFO\].*\bstatus=([a-z_]+)/)?.[1];
  if (status && status !== state.remote_status) { state.remote_status = status; save(); console.log(`Status: ${status}`); }
  if (/outdated|skill_upgrade_required/i.test(text)) { state.upgrade_warning = true; save(); }
  if (/timeout|timed out/i.test(text)) { state.failure_category = 'timeout'; save(); }
  if (/no downloadable declared final media/i.test(text)) { state.failure_category = 'output_contract'; save(); }
  // Retain diagnostic categories, not raw remote responses, URLs, or credentials.
  const http = text.match(/(?:HTTP\s*Error\s*|HTTP\s+|status(?:_code)?[=:]\s*)(400|401|402|403|404|408|409|422|429|500|502|503|504)\b/i)?.[1];
  if (http) { state.http_error_status = Number(http); save(); }
  if (/prompt optimization failed|failed to optimize|prompt enhancement failed/i.test(text)) { state.failure_category = 'prompt_optimization'; save(); }
  if (/connection reset|connection aborted|connection error|remote end closed|RemoteDisconnected|URLError|network error/i.test(text)) { state.failure_category = 'connection'; save(); }
}
child.stdout.on('data', chunk => {
  buffer += chunk.toString('utf8');
  let i;
  while ((i = buffer.indexOf('\n')) >= 0) { line(buffer.slice(0, i)); buffer = buffer.slice(i + 1); }
});
child.stderr.on('data', chunk => line(chunk.toString('utf8')));
child.on('error', () => { state.status = 'launch_failed'; save(); process.exitCode = 1; });
child.on('close', code => {
  line(buffer);
  const path = result();
  state.status = path ? 'success' : 'needs_recovery'; state.exit_code = code;
  if (path) {
    state.manifest = path;
    state.job_id ??= JSON.parse(readFileSync(path, 'utf8')).job_id;
  }
  save();
  console.log(JSON.stringify(state, null, 2));
  if (!path) process.exitCode = 1;
});
