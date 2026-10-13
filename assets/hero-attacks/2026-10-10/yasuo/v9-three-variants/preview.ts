import type StudyData from './study.json';
import { sampleAt, frameStart, type ClipId, type ClipTiming, type PlaybackMode } from '../v8-user-ab/timing';

let study: typeof StudyData;

interface Decoder {
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null };
  decode(options: { frameIndex: number; completeFramesOnly: boolean }): Promise<{ image: VideoFrame }>;
  close(): void;
}
interface DecoderHost { ImageDecoder?: new (options: { data: ArrayBuffer; type: string; preferAnimation: boolean }) => Decoder }
const ids = ['A', 'B'] as const;
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const play = $<HTMLButtonElement>('#play'), scrub = $<HTMLInputElement>('#scrub'), rate = $<HTMLSelectElement>('#rate');
const frames = new Map<number, Map<ClipId, ImageBitmap[]>>();
const canvases = new Map<number, HTMLCanvasElement>(), labels = new Map<number, HTMLOutputElement>();
const cards: { variant: number; clip: ClipId; frame: number; element: HTMLElement }[] = [];
const variant = (id: number) => study.variants.find(record => record.id === id)!;
const clip = (id: number, action: ClipId) => variant(id).clips.find(record => record.id === action)!;
const timing = (id: number): ClipTiming[] => ids.map(action => ({ id: action, durations_ms: clip(id, action).durations_ms }));
const url = (id: number, path: string) => {
  const relative = `./variant-${id}/${path}`;
  return new URL(relative, import.meta.url).href;
};
const elapsed = new Map<number, number>();
let mode: PlaybackMode = 'loop', previousTime: number | null = null, playing = true, ready = false;

function draw(): void {
  for (const record of study.variants) {
    const sample = sampleAt(elapsed.get(record.id)!, timing(record.id), mode), canvas = canvases.get(record.id)!;
    const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames.get(record.id)!.get(sample.clip)![sample.frame], 0, 0);
    labels.get(record.id)!.value = `${!sample.active ? '播放结束' : playing ? '播放中' : '暂停'} · ${sample.clip} ${sample.frame + 1}/${clip(record.id, sample.clip).frame_count}${sample.cycle ? ` · 循环${sample.cycle}` : ''}`;
    cards.filter(card => card.variant === record.id).forEach(card => card.element.classList.toggle('selected', card.clip === sample.clip && card.frame === sample.frame));
    if (record.id === 1) scrub.value = String((sample.clip === 'B' ? clip(1, 'A').frame_count : 0) + sample.frame);
  }
  $<HTMLOutputElement>('#status').value = playing ? '三版同步起播' : '已暂停 / 结束';
}
function start(nextMode: PlaybackMode): void {
  mode = nextMode; elapsed.forEach((_, id) => elapsed.set(id, 0)); playing = true; previousTime = null; play.textContent = '暂停'; draw();
}
function selectIndex(index: number): void {
  const countA = clip(1, 'A').frame_count, total = countA + clip(1, 'B').frame_count;
  const normalized = ((index % total) + total) % total;
  const action: ClipId = normalized < countA ? 'A' : 'B', frame = normalized < countA ? normalized : normalized - countA;
  mode = 'loop';
  elapsed.forEach((_, id) => elapsed.set(id, frameStart(action, frame, timing(id), mode)));
  playing = false; previousTime = null; play.textContent = '继续'; draw();
}
async function decode(id: number, action: ClipId): Promise<void> {
  const Constructor = (window as unknown as DecoderHost).ImageDecoder;
  if (!Constructor) throw new Error('浏览器不支持逐帧解码，请展开每版原文件预览。');
  const response = await fetch(url(id, clip(id, action).webp)); if (!response.ok) throw new Error(`第${id}版${action}加载失败`);
  const decoder = new Constructor({ data: await response.arrayBuffer(), type: 'image/webp', preferAnimation: true });
  const decoded: ImageBitmap[] = []; frames.get(id)!.set(action, decoded);
  try {
    await decoder.tracks.ready;
    if (decoder.tracks.selectedTrack?.frameCount !== clip(id, action).frame_count) throw new Error('动画帧数不一致');
    for (let frameIndex = 0; frameIndex < clip(id, action).frame_count; frameIndex++) {
      const frame = await decoder.decode({ frameIndex, completeFramesOnly: true });
      try { decoded.push(await createImageBitmap(frame.image)); } finally { frame.image.close(); }
    }
  } finally { decoder.close(); }
  if (decoded.some(frame => frame.width !== study.width || frame.height !== study.height)) throw new Error('动画画布尺寸不一致');
}
function variantCard(id: number): void {
  const record = variant(id), article = document.createElement('article'), heading = document.createElement('h2');
  heading.textContent = `第${id}版`;
  const stage = document.createElement('div'); stage.className = 'stage checker';
  const canvas = document.createElement('canvas'); canvas.className = 'pixel'; canvas.width = study.width; canvas.height = study.height;
  canvas.setAttribute('aria-label', `第${id}版A和B循环`); canvases.set(id, canvas); stage.append(canvas);
  const status = document.createElement('output'); status.textContent = '解码中'; labels.set(id, status);
  const review = document.createElement('p'); review.className = 'review'; review.textContent = record.review;
  const details = document.createElement('details'), summary = document.createElement('summary'); summary.textContent = '原文件与下载'; details.append(summary);
  for (const action of ids) {
    const heading = document.createElement('h3'); heading.textContent = `动画${action}`;
    const image = new Image(); image.src = url(id, clip(id, action).webp); image.alt = `第${id}版${action}原始WebP`; image.className = 'raw pixel checker';
    const links = document.createElement('div'); links.className = 'downloads';
    for (const media of clip(id, action).final_media) {
      const link = document.createElement('a'); link.href = url(id, media.path); link.textContent = media.label;
      link.download = `yasuo-version-${id}-${action}.${media.path.split('.').at(-1)}`; links.append(link);
    }
    details.append(heading, image, links);
  }
  article.append(heading, stage, status, review, details); $<HTMLElement>('#variants').append(article);
}
function frameCard(id: number, action: ClipId, frame: number, label: string, target: HTMLElement, tracked: boolean): void {
  const card = document.createElement('div'); card.className = 'frame';
  const button = document.createElement('button'); button.textContent = label;
  button.addEventListener('click', () => selectIndex((action === 'B' ? clip(1, 'A').frame_count : 0) + frame));
  const canvas = document.createElement('canvas'); canvas.width = study.width; canvas.height = study.height; canvas.className = 'pixel checker';
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false; ctx.drawImage(frames.get(id)!.get(action)![frame], 0, 0);
  card.append(button, canvas); target.append(card);
  if (tracked) cards.push({ variant: id, clip: action, frame, element: card });
}
async function init(): Promise<void> {
  const response = await fetch(new URL('./study.json', import.meta.url), { cache: 'no-store' });
  if (!response.ok) throw new Error('素材索引尚未就绪，请稍后刷新本页。');
  study = await response.json() as typeof StudyData;
  for (const record of study.variants) elapsed.set(record.id, 0);
  for (const record of study.variants) { frames.set(record.id, new Map()); variantCard(record.id); }
  $<HTMLElement>('#facts').textContent = `新增3版 / 6段 · 每帧${study.width}×${study.height} · 每段${clip(1, 'A').frame_count}帧 · 每版原速一轮${(variant(1).clips.reduce((sum, clip) => sum + clip.duration_ms, 0) / 1000).toFixed(2)}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗${study.credits_consumed}积分，全部最终WebP、GIF和PNG图集均保留。`;
  for (const action of ids) { const prompt = document.createElement('blockquote'); prompt.textContent = `${action}：${study.prompts[action]}`; $<HTMLElement>('#prompts').append(prompt); }
  await Promise.all(study.variants.flatMap(record => ids.map(action => decode(record.id, action))));
  for (const record of study.variants) {
    const title = document.createElement('h3'); title.textContent = `第${record.id}版`;
    const container = document.createElement('div'); container.className = 'frames';
    $<HTMLElement>('#frames').append(title, container);
    for (const action of ids) for (let frame = 0; frame < clip(record.id, action).frame_count; frame++) frameCard(record.id, action, frame, `${action} · 第${frame + 1}帧`, container, true);
    const seamTitle = document.createElement('h3'); seamTitle.textContent = `第${record.id}版 · A末 / B首 · B末 / A首`;
    const seams = document.createElement('div'); seams.className = 'frames'; $<HTMLElement>('#seams').append(seamTitle, seams);
    for (const [action, frame, label] of [['A', clip(record.id, 'A').frame_count - 1, 'A末帧 →'], ['B', 0, 'B首帧'], ['B', clip(record.id, 'B').frame_count - 1, 'B末帧 →'], ['A', 0, 'A首帧']] as const) frameCard(record.id, action, frame, label, seams, false);
  }
  scrub.max = String(clip(1, 'A').frame_count + clip(1, 'B').frame_count - 1); scrub.disabled = false;
  document.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false); ready = true; previousTime = null; draw();
}
$<HTMLButtonElement>('#loop').addEventListener('click', () => start('loop'));
$<HTMLButtonElement>('#once').addEventListener('click', () => start('once'));
for (const action of ids) $<HTMLButtonElement>(`#only-${action}`).addEventListener('click', () => start(action));
play.addEventListener('click', () => {
  if (!playing && study.variants.every(record => !sampleAt(elapsed.get(record.id)!, timing(record.id), mode).active)) elapsed.forEach((_, id) => elapsed.set(id, 0));
  playing = !playing; previousTime = null; play.textContent = playing ? '暂停' : '继续'; draw();
});
$<HTMLButtonElement>('#previous').addEventListener('click', () => selectIndex(Number(scrub.value) - 1));
$<HTMLButtonElement>('#next').addEventListener('click', () => selectIndex(Number(scrub.value) + 1));
scrub.addEventListener('input', () => selectIndex(Number(scrub.value)));
rate.addEventListener('change', () => { previousTime = null; });
$<HTMLSelectElement>('#zoom').addEventListener('change', event => {
  if (!ready) return;
  const zoom = Number((event.currentTarget as HTMLSelectElement).value), width = study.width * zoom;
  document.documentElement.style.setProperty('--sprite', `${width}px`);
  document.documentElement.style.setProperty('--card', `${width + 22}px`);
  document.documentElement.style.setProperty('--grid', `${(width + 22) * 3 + 20}px`);
});
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  if (!ready) return;
  const first = document.querySelector('.stage')!, checker = !first.classList.contains('checker');
  document.querySelectorAll('.stage').forEach(stage => stage.classList.toggle('checker', checker));
  (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(checker));
});
document.addEventListener('visibilitychange', () => { previousTime = null; });
function tick(now: number): void {
  if (ready && playing && previousTime !== null) {
    const delta = (now - previousTime) * Number(rate.value); elapsed.forEach((time, id) => elapsed.set(id, time + delta)); draw();
    if (study.variants.every(record => !sampleAt(elapsed.get(record.id)!, timing(record.id), mode).active)) { playing = false; play.textContent = '继续'; draw(); }
  }
  previousTime = now; requestAnimationFrame(tick);
}
void init().catch(error => {
  $<HTMLOutputElement>('#status').value = error instanceof Error ? error.message : '素材加载失败';
  $<HTMLElement>('#facts').textContent = '素材暂时无法加载，请刷新本页重试。';
});
window.addEventListener('pagehide', () => { for (const actions of frames.values()) for (const decoded of actions.values()) for (const frame of decoded) frame.close(); });
requestAnimationFrame(tick);
