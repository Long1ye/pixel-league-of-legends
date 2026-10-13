import { sampleAt, frameStart, type ClipId, type ClipTiming, type PlaybackMode } from '../v8-user-ab/timing';

interface Clip {
  id: ClipId; name: string; prompt: string; webp: string; columns: number; rows: number;
  frame_count: number; durations_ms: number[]; duration_ms: number;
  final_media: { label: string; path: string }[];
}
interface Study { width: number; height: number; clips: Clip[]; review: string; credits_consumed: number; credits_after: number }
const ids = ['A', 'B'] as const;
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const canvas = $<HTMLCanvasElement>('#animation'), status = $<HTMLOutputElement>('#status');
const play = $<HTMLButtonElement>('#play'), scrub = $<HTMLInputElement>('#scrub'), rate = $<HTMLSelectElement>('#rate');
const frames = new Map<ClipId, ImageBitmap[]>(), cards: { clip: ClipId; frame: number; element: HTMLElement }[] = [];
const url = (path: string) => new URL(path, import.meta.url).href;
let study: Study, timings: ClipTiming[] = [], mode: PlaybackMode = 'loop';
let elapsed = 0, previousTime: number | null = null, playing = true, ready = false;
const clip = (id: ClipId) => study.clips.find(record => record.id === id)!;

function draw(): void {
  const sample = sampleAt(elapsed, timings, mode);
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames.get(sample.clip)![sample.frame], 0, 0);
  const offset = timings.slice(0, ids.indexOf(sample.clip)).reduce((sum, record) => sum + record.durations_ms.length, 0);
  scrub.value = String(offset + sample.frame);
  canvas.dataset.clip = sample.clip; canvas.dataset.frame = String(sample.frame + 1); canvas.dataset.cycle = String(sample.cycle);
  status.value = `${!sample.active ? '本次播放结束' : playing ? '播放中' : '暂停'} · ${sample.clip} ${sample.frame + 1}/${clip(sample.clip).frame_count}帧${sample.cycle ? ` · 循环${sample.cycle}` : ''}`;
  cards.forEach(card => card.element.classList.toggle('selected', card.clip === sample.clip && card.frame === sample.frame));
}
function start(nextMode: PlaybackMode): void {
  mode = nextMode; elapsed = 0; playing = true; previousTime = null; play.textContent = '暂停'; draw();
}
function select(id: ClipId, frame: number): void {
  mode = 'loop'; elapsed = frameStart(id, frame, timings, mode); playing = false; previousTime = null; play.textContent = '继续'; draw();
}
function selectIndex(index: number): void {
  const total = timings.reduce((sum, record) => sum + record.durations_ms.length, 0);
  let remaining = ((index % total) + total) % total;
  for (const id of ids) {
    if (remaining < clip(id).frame_count) { select(id, remaining); return; }
    remaining -= clip(id).frame_count;
  }
}
async function decode(id: ClipId): Promise<void> {
  const record = clip(id), atlas = record.final_media.find(media => media.path.endsWith('.png'));
  if (!atlas) throw new Error(`动画${id}缺少已验收PNG图集`);
  const image = new Image(); image.src = url(atlas.path); await image.decode();
  if (image.naturalWidth !== study.width * record.columns || image.naturalHeight !== study.height * record.rows) throw new Error(`动画${id}图集尺寸不一致`);
  const decoded: ImageBitmap[] = []; frames.set(id, decoded);
  for (let index = 0; index < record.frame_count; index++) decoded.push(await createImageBitmap(image,
    index % record.columns * study.width, Math.floor(index / record.columns) * study.height, study.width, study.height));
}
function clipCard(id: ClipId): void {
  const record = clip(id), article = document.createElement('article'), info = document.createElement('div');
  const title = document.createElement('h2'); title.textContent = `动画${id} · ${record.name}`;
  const facts = document.createElement('p'); facts.textContent = `${record.frame_count}帧 · 原速${(record.duration_ms / 1000).toFixed(2)}秒`;
  const button = document.createElement('button'); button.textContent = `动画${id}播放一次`; button.disabled = true; button.addEventListener('click', () => start(id));
  const image = new Image(); image.src = url(record.webp); image.alt = `动画${id}原始WebP`; image.className = 'pixel checker';
  const prompt = document.createElement('blockquote'); prompt.textContent = record.prompt;
  const downloads = document.createElement('div'); downloads.className = 'downloads';
  for (const media of record.final_media) {
    const link = document.createElement('a'); link.href = url(media.path); link.textContent = `下载${media.label}`;
    link.download = `yasuo-v13-impact-${id}.${media.path.split('.').at(-1)}`; downloads.append(link);
  }
  info.append(title, facts, button, prompt, downloads); article.append(image, info); $<HTMLElement>('#clips').append(article);
}
function frameCard(id: ClipId, frame: number, label: string, target: string, tracked: boolean): void {
  const card = document.createElement('div'); card.className = 'frame';
  const button = document.createElement('button'); button.textContent = label; button.addEventListener('click', () => select(id, frame));
  const cell = document.createElement('canvas'); cell.width = study.width; cell.height = study.height; cell.className = 'pixel checker';
  const ctx = cell.getContext('2d')!; ctx.imageSmoothingEnabled = false; ctx.drawImage(frames.get(id)![frame], 0, 0);
  card.append(button, cell); $<HTMLElement>(target).append(card);
  if (tracked) cards.push({ clip: id, frame, element: card });
}
async function init(): Promise<void> {
  const response = await fetch(url('study.json'), { cache: 'no-store' });
  if (!response.ok) throw new Error('素材尚未验收完成，请稍后刷新本页。');
  study = await response.json() as Study;
  if (study.clips.length !== 2 || ids.some(id => !clip(id))) throw new Error('缺少完整的A/B动画');
  timings = ids.map(id => ({ id, durations_ms: clip(id).durations_ms })); ids.forEach(clipCard);
  $<HTMLElement>('#facts').textContent = `2条独立动画 · 每帧${study.width}×${study.height} · 共${study.clips.reduce((sum, record) => sum + record.frame_count, 0)}帧 · 原速一轮${(study.clips.reduce((sum, record) => sum + record.duration_ms, 0) / 1000).toFixed(2)}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮余额减少${study.credits_consumed}积分，余额${study.credits_after}。`;
  await Promise.all(ids.map(decode)); canvas.width = study.width; canvas.height = study.height;
  for (const id of ids) for (let frame = 0; frame < clip(id).frame_count; frame++) frameCard(id, frame, `动画${id} · 第${frame + 1}帧`, '#frames', true);
  frameCard('A', clip('A').frame_count - 1, 'A末帧 →', '#seams', false); frameCard('B', 0, 'B首帧', '#seams', false);
  frameCard('B', clip('B').frame_count - 1, 'B末帧 →', '#seams', false); frameCard('A', 0, 'A首帧', '#seams', false);
  scrub.max = String(timings.reduce((sum, record) => sum + record.durations_ms.length, 0) - 1); scrub.disabled = false;
  document.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false); ready = true; previousTime = null; draw();
}
for (const nextMode of ['loop', 'once'] as const) $<HTMLButtonElement>(`#${nextMode}`).addEventListener('click', () => start(nextMode));
play.addEventListener('click', () => {
  if (!playing && !sampleAt(elapsed, timings, mode).active) elapsed = 0;
  playing = !playing; previousTime = null; play.textContent = playing ? '暂停' : '继续'; draw();
});
$<HTMLButtonElement>('#previous').addEventListener('click', () => selectIndex(Number(scrub.value) - 1));
$<HTMLButtonElement>('#next').addEventListener('click', () => selectIndex(Number(scrub.value) + 1));
scrub.addEventListener('input', () => selectIndex(Number(scrub.value))); rate.addEventListener('change', () => { previousTime = null; });
$<HTMLSelectElement>('#zoom').addEventListener('change', event => {
  const zoom = Number((event.target as HTMLSelectElement).value), size = 176 * zoom;
  canvas.style.width = canvas.style.height = `${size}px`; $<HTMLElement>('#stage').style.width = $<HTMLElement>('#stage').style.height = `${size}px`;
});
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  const checker = $<HTMLElement>('#stage').classList.toggle('checker'); (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(checker));
});
document.addEventListener('visibilitychange', () => { previousTime = null; });
function tick(now: number): void {
  if (ready && playing && previousTime !== null) {
    elapsed += (now - previousTime) * Number(rate.value); draw();
    if (!sampleAt(elapsed, timings, mode).active) { playing = false; play.textContent = '继续'; draw(); }
  }
  previousTime = now; requestAnimationFrame(tick);
}
void init().catch(error => { status.value = error instanceof Error ? error.message : '素材加载失败'; });
window.addEventListener('pagehide', () => { for (const decoded of frames.values()) for (const frame of decoded) frame.close(); });
requestAnimationFrame(tick);
