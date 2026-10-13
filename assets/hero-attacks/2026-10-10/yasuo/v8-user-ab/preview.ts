import study from './study.json';
import { sampleAt, frameStart, type ClipId, type ClipTiming, type PlaybackMode } from './timing';

interface Decoder {
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null };
  decode(options: { frameIndex: number; completeFramesOnly: boolean }): Promise<{ image: VideoFrame }>;
  close(): void;
}
interface DecoderHost { ImageDecoder?: new (options: { data: ArrayBuffer; type: string; preferAnimation: boolean }) => Decoder }
const ids = ['A', 'B'] as const;
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const canvas = $<HTMLCanvasElement>('#animation'), status = $<HTMLOutputElement>('#status');
const play = $<HTMLButtonElement>('#play'), scrub = $<HTMLInputElement>('#scrub'), rate = $<HTMLSelectElement>('#rate');
const frames = new Map<ClipId, ImageBitmap[]>();
const cards: { clip: ClipId; frame: number; element: HTMLElement }[] = [];
const clip = (id: ClipId) => study.clips.find(record => record.id === id)!;
const timings: ClipTiming[] = ids.map(id => ({ id, durations_ms: clip(id).durations_ms }));
const url = (path: string) => new URL(path, import.meta.url).href;
let mode: PlaybackMode = 'loop', elapsed = 0, previousTime: number | null = null, playing = true, ready = false;

function draw(): void {
  const sample = sampleAt(elapsed, timings, mode);
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames.get(sample.clip)![sample.frame], 0, 0);
  const offset = timings.slice(0, ids.indexOf(sample.clip)).reduce((sum, record) => sum + record.durations_ms.length, 0);
  scrub.value = String(offset + sample.frame);
  status.value = `${!sample.active ? '本次播放结束' : playing ? '播放中' : '暂停'} · 动画${sample.clip} ${sample.frame + 1}/${clip(sample.clip).frame_count}帧${sample.cycle ? ` · 循环${sample.cycle}` : ''}`;
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
  let remainder = ((index % total) + total) % total;
  for (const id of ids) {
    if (remainder < clip(id).frame_count) { select(id, remainder); return; }
    remainder -= clip(id).frame_count;
  }
}
async function decode(id: ClipId): Promise<void> {
  const Constructor = (window as unknown as DecoderHost).ImageDecoder;
  if (!Constructor) throw new Error('浏览器不支持逐帧解码，请使用下方两条原文件预览。');
  const response = await fetch(url(clip(id).webp)); if (!response.ok) throw new Error(`动画${id}加载失败`);
  const decoder = new Constructor({ data: await response.arrayBuffer(), type: 'image/webp', preferAnimation: true });
  const decoded: ImageBitmap[] = []; frames.set(id, decoded);
  try {
    await decoder.tracks.ready;
    if (decoder.tracks.selectedTrack?.frameCount !== clip(id).frame_count) throw new Error(`动画${id}帧数不一致`);
    for (let frameIndex = 0; frameIndex < clip(id).frame_count; frameIndex++) {
      const frame = await decoder.decode({ frameIndex, completeFramesOnly: true });
      try { decoded.push(await createImageBitmap(frame.image)); } finally { frame.image.close(); }
    }
  } finally { decoder.close(); }
  if (decoded.some(frame => frame.width !== study.width || frame.height !== study.height)) throw new Error('动画画布尺寸不一致');
}
function clipCard(id: ClipId): void {
  const record = clip(id), article = document.createElement('article'), title = document.createElement('h2');
  title.textContent = `动画${id} · ${record.name}`;
  const facts = document.createElement('p'); facts.textContent = `${record.frame_count}帧 · 原速${(record.duration_ms / 1000).toFixed(2)}秒`;
  const button = document.createElement('button'); button.textContent = `动画${id}播放一次`; button.disabled = true; button.addEventListener('click', () => start(id));
  const image = new Image(); image.src = url(record.webp); image.alt = `动画${id}原始WebP`; image.className = 'pixel checker';
  const prompt = document.createElement('blockquote'); prompt.textContent = record.prompt;
  const downloads = document.createElement('div'); downloads.className = 'downloads';
  for (const media of record.final_media) {
    const link = document.createElement('a'); link.href = url(media.path); link.textContent = `下载${media.label}`;
    link.download = `yasuo-attack-${id}.${media.path.split('.').at(-1)}`; downloads.append(link);
  }
  article.append(title, facts, button, image, prompt, downloads); $<HTMLElement>('#clips').append(article);
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
  ids.forEach(clipCard);
  $<HTMLElement>('#facts').textContent = `2条独立动画 · 每帧${study.width}×${study.height} · 共${study.clips.reduce((sum, record) => sum + record.frame_count, 0)}帧 · 原速一轮${(study.clips.reduce((sum, record) => sum + record.duration_ms, 0) / 1000).toFixed(2)}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗${study.credits_consumed}积分。两条用户prompt原文和所有最终格式单独保留。`;
  await Promise.all(ids.map(decode));
  canvas.width = study.width; canvas.height = study.height;
  for (const id of ids) for (let frame = 0; frame < clip(id).frame_count; frame++) frameCard(id, frame, `动画${id} · 第${frame + 1}帧`, '#frames', true);
  frameCard('A', clip('A').frame_count - 1, 'A末帧 →', '#seams', false);
  frameCard('B', 0, 'B首帧', '#seams', false);
  frameCard('B', clip('B').frame_count - 1, 'B末帧 →', '#seams', false);
  frameCard('A', 0, 'A首帧', '#seams', false);
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
scrub.addEventListener('input', () => selectIndex(Number(scrub.value)));
rate.addEventListener('change', () => { previousTime = null; });
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
