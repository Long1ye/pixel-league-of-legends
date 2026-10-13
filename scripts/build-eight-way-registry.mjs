/** Assemble declared final outputs; preserve and reference the six existing SE clips. */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = resolve(project, 'assets/hero-animations/2026-10-09');
const output = resolve(base, 'v2');
const previous = JSON.parse(readFileSync(resolve(base, 'v1/study.json'), 'utf8'));
const sources = JSON.parse(readFileSync(resolve(project, 'assets/hero-walk-directions/2026-10-09/v1/study.json'), 'utf8'));
const batch = JSON.parse(readFileSync(resolve(output, 'batch.json'), 'utf8'));
const directions = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];
const balanceArg = process.argv.indexOf('--balance');
const balance = balanceArg >= 0 ? Number(process.argv[balanceArg + 1]) : null;
if (balance !== null && (!Number.isFinite(balance) || balance < 0)) throw new Error('Invalid balance');
const toUrl = path => relative(output, path).replaceAll('\\', '/');
const heroes = sources.heroes.map(hero => {
  const oldHero = previous.heroes.find(item => item.id === hero.id);
  const clips = directions.flatMap(direction => ['idle', 'walk'].map(state => {
    if (direction === 'se') {
      const clip = oldHero.clips.find(item => item.state === state);
      return { ...clip, direction, status: 'success', reused: true,
        webp: `../v1/${clip.webp}`, gif: `../v1/${clip.gif}`, sheet: `../v1/${clip.sheet}`,
        manifest: `../v1/${dirname(clip.webp).replaceAll('\\', '/')}/final_outputs.json` };
    }
    const job = batch.jobs.find(item => item.hero === hero.id && item.state === state && item.direction === direction);
    const clip = { state, name: state === 'idle' ? '待机' : '走路', direction, status: job.status,
      reused: false, job_id: job.job_id, webp: '', gif: '', sheet: '', manifest: '',
      width: hero.cell_size, height: hero.cell_size, frame_count: 8,
      durations_ms: Array(8).fill(100), duration_ms: 800, columns: 3, rows: 3 };
    if (job.status === 'success') {
      const manifestPath = resolve(project, job.manifest);
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      const files = manifest.outputs.filter(item => item.type === 'media');
      for (const [key, mime] of [['webp', 'image/webp'], ['gif', 'image/gif'], ['sheet', 'image/png']]) {
        const media = files.find(item => item.mime_type === mime);
        if (!media) throw new Error(`Missing declared ${key}: ${job.key}`);
        clip[key] = toUrl(resolve(project, media.path));
      }
      clip.manifest = toUrl(manifestPath);
    }
    return clip;
  }));
  return { id: hero.id, name: hero.name, preview_scale: hero.preview_scale,
    anchors: Object.fromEntries(directions.map(direction => [direction,
      direction === 'se' ? oldHero.anchor : [hero.cell_size / 2, hero.frames[direction].bbox[3]]])),
    notes: '按用户要求保留现有造型与镜像方向，不进行修正或重画。造型变化与动作跳动不代表技术输出缺失。', clips };
});
const ready = heroes.flatMap(hero => hero.clips).filter(clip => clip.status === 'success').length;
const validationPath = resolve(output, 'validation.json');
const checked = existsSync(validationPath) ? JSON.parse(readFileSync(validationPath, 'utf8')) : null;
const technicallyPassed = ready === 48 && checked?.status === 'passed' && checked.media_count === 144;
const registry = {
  status: ready === 48 ? 'eight_direction_animation_studies' : 'generating', capability: 'animate-run',
  mode: 'pixel-engine-v1.1', intelligence: 'standard', direction_count: 8, directions,
  requested_frames_per_clip: 8, runtime_integration: false, corrective_regeneration: false,
  total_clip_count: 48, ready_clip_count: ready, reused_clip_count: 6, new_clip_count: 42,
  refunded_failed_attempt_count: batch.refunded_failed_attempt_count ?? 0,
  refunded_credits: batch.refunded_credits ?? 0,
  credits: { before: batch.initial_credits, after: balance, expected_consumed: 1470,
    consumed: balance !== null ? batch.initial_credits - balance : null },
  validation: { status: technicallyPassed ? 'technical_pass' : 'pending_full_check', production_ready: false,
    input_files_unmodified: checked?.inputs_unmodified ?? false,
    media_count: technicallyPassed ? checked.media_count : 0,
    seamless_loop_guaranteed: false }, heroes,
};
writeFileSync(resolve(output, 'study.json'), `${JSON.stringify(registry, null, 2)}\n`);
process.stdout.write(JSON.stringify({ status: registry.status, ready, total: 48, reused: 6, new_ready: ready - 6 }) + '\n');
