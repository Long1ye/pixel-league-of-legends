import study from './study.json';
import { attackSample, attackFrameStart, previewDurations, type AttackMode } from '../v4-diagonal-ab/timing';

interface Decoder {
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null };
  decode(options: { frameIndex: number; completeFramesOnly: boolean }): Promise<{ image: VideoFrame }>;
  close(): void;
}
interface DecoderHost { ImageDecoder?: new (options: { data: ArrayBuffer; type: string; preferAnimation: boolean }) => Decoder }
type Variant = 'a' | 'b';
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const canvas = $<HTMLCanvasElement>('#animation'), status = $<HTMLOutputElement>('#status');
const play = $<HTMLButtonElement>('#play'), rate = $<HTMLSelectElement>('#rate'), scrub = $<HTMLInputElement>('#scrub');
const frames: Record<Variant, ImageBitmap[]> = { a: [], b: [] };
const cards: { variant: Variant; frame: number; element: HTMLElement }[] = [];
const url = (path: string) => new URL(path, import.meta.url).href;
let elapsed = 0, previousTime: number | null = null, playing = true, ready = false, mode: AttackMode = 'ab', looping = true, selected = 0;
const originalA = study.clips.a.durations_ms, originalB = study.clips.b.durations_ms;
let a = previewDurations(originalA, 1200), b = previewDurations(originalB, 1200);
const count = () => mode === 'ab' ? a.length + b.length : mode === 'a' ? a.length : b.length;

function draw(): void {
  const sample = attackSample(elapsed, a, b, mode, looping);
  selected = sample.index;
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames[sample.variant][sample.frame], 0, 0);
  scrub.max = String(count() - 1); scrub.value = String(selected);
  const label = mode === 'ab' ? '往返' : mode === 'a' ? 'A→B上撩' : 'B→A下斩';
  status.value = `${!sample.active ? `${label}本次攻击已结束` : playing ? `${label}播放中` : '暂停'} · ${sample.variant === 'a' ? '上撩' : '下斩'} ${sample.frame + 1}/${frames[sample.variant].length}帧`;
  cards.forEach(card => card.element.classList.toggle('selected', card.variant === sample.variant && card.frame === sample.frame));
}
function start(nextMode: AttackMode, loop: boolean): void {
  mode = nextMode; looping = loop; elapsed = 0; playing = true; previousTime = null; play.textContent = '暂停'; draw();
}
function select(index: number): void {
  const normalized = (index + count()) % count();
  elapsed = attackFrameStart(normalized, a, b, mode); playing = false; play.textContent = '继续'; draw();
}
function selectPair(index: number): void { mode = 'ab'; looping = true; select(index); }
async function decode(variant: Variant): Promise<void> {
  const Constructor = (window as unknown as DecoderHost).ImageDecoder;
  if (!Constructor) throw new Error('浏览器不支持逐帧解码，请展开下方原文件预览。');
  const response = await fetch(url(study.clips[variant].webp)); if (!response.ok) throw new Error('动画文件加载失败');
  const decoder = new Constructor({ data: await response.arrayBuffer(), type: 'image/webp', preferAnimation: true });
  try {
    await decoder.tracks.ready;
    if (decoder.tracks.selectedTrack?.frameCount !== study.clips[variant].frame_count) throw new Error('帧数与验证记录不一致');
    for (let index = 0; index < study.clips[variant].frame_count; index++) {
      const frame = await decoder.decode({ frameIndex: index, completeFramesOnly: true });
      try { frames[variant].push(await createImageBitmap(frame.image)); } finally { frame.image.close(); }
    }
  } finally { decoder.close(); }
  if (frames[variant].some(frame => frame.width !== study.width || frame.height !== study.height)) throw new Error('画布尺寸不一致');
}
function clipCard(variant: Variant): void {
  const clip = study.clips[variant], article = document.createElement('article'), title = document.createElement('h2');
  title.textContent = variant === 'a' ? 'A→B：上撩去光版（服装重绘，未定稿）' : 'B→A：下斩（未发现刀光）';
  const facts = document.createElement('p'); facts.textContent = `${clip.frame_count}帧 · ${(clip.duration_ms / 1000).toFixed(2)}秒原速 · 独立单次攻击`;
  const downloads = document.createElement('div'); downloads.className = 'downloads';
  const details = document.createElement('details'), summary = document.createElement('summary'); summary.textContent = `${variant.toUpperCase()}原始文件循环预览`; details.append(summary);
  for (const { label, path, animated } of clip.final_media) {
    const link = document.createElement('a'); link.textContent = `下载${label}`; link.href = url(path); link.download = `yasuo-${variant}-no-fx-${label}.${path.split('.').at(-1)}`; downloads.append(link);
    if (!animated) continue;
    const figure = document.createElement('figure'), image = new Image(), caption = document.createElement('figcaption');
    image.src = url(path); image.alt = `${variant.toUpperCase()}${label}原文件`; image.className = 'pixel checker';
    caption.textContent = `${variant.toUpperCase()} · ${label} · 2×原始像素 · 单文件自行循环`; figure.append(image, caption); details.append(figure);
  }
  article.append(title, facts, downloads, details); $<HTMLElement>('#clips').append(article);
}
async function init(): Promise<void> {
  for (const variant of ['a', 'b'] as const) clipCard(variant);
  $<HTMLElement>('#facts').textContent = `2条独立普攻 · 每帧${study.width}×${study.height} · A ${a.length}帧 / B ${b.length}帧 · 原文件A ${(study.clips.a.duration_ms / 1000).toFixed(2)}秒 / B ${(study.clips.b.duration_ms / 1000).toFixed(2)}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗${study.credits_consumed}积分。旧版本保留，仅制作亚索这一方向的A/B，没有扩展八向。`;
  await Promise.all([decode('a'), decode('b')]);
  canvas.width = study.width; canvas.height = study.height;
  for (const variant of ['a', 'b'] as const) for (let index = 0; index < frames[variant].length; index++) {
    const card = document.createElement('div'); card.className = 'frame';
    const button = document.createElement('button'); button.textContent = `${variant === 'a' ? '上撩' : '下斩'} ${index + 1} · 查看此帧`;
    button.addEventListener('click', () => selectPair(index + (variant === 'a' ? 0 : a.length)));
    const cell = document.createElement('canvas'); cell.width = study.width; cell.height = study.height; cell.className = 'pixel checker';
    cell.getContext('2d')!.drawImage(frames[variant][index], 0, 0); card.append(button, cell);
    $<HTMLElement>('#frames').append(card); cards.push({ variant, frame: index, element: card });
  }
  scrub.disabled = false; document.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false); ready = true; draw();
}
$<HTMLButtonElement>('#attack-a').addEventListener('click', () => start('a', false));
$<HTMLButtonElement>('#attack-b').addEventListener('click', () => start('b', false));
$<HTMLButtonElement>('#pair-once').addEventListener('click', () => start('ab', false));
$<HTMLButtonElement>('#pair-loop').addEventListener('click', () => start('ab', true));
play.addEventListener('click', () => {
  if (!playing && !attackSample(elapsed, a, b, mode, looping).active) elapsed = 0;
  playing = !playing; previousTime = null; play.textContent = playing ? '暂停' : '继续'; draw();
});
$<HTMLButtonElement>('#previous').addEventListener('click', () => select(selected - 1));
$<HTMLButtonElement>('#next').addEventListener('click', () => select(selected + 1));
$<HTMLButtonElement>('#a-first').addEventListener('click', () => selectPair(0));
$<HTMLButtonElement>('#a-last').addEventListener('click', () => selectPair(a.length - 1));
$<HTMLButtonElement>('#b-first').addEventListener('click', () => selectPair(a.length));
$<HTMLButtonElement>('#b-last').addEventListener('click', () => selectPair(a.length + b.length - 1));
scrub.addEventListener('input', () => select(Number(scrub.value)));
$<HTMLSelectElement>('#cadence').addEventListener('change', event => {
  const value = (event.currentTarget as HTMLSelectElement).value;
  const target = value === 'original' ? undefined : Number(value);
  a = previewDurations(originalA, target); b = previewDurations(originalB, target);
  elapsed = attackFrameStart(selected, a, b, mode); previousTime = null; draw();
});
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  const checker = $<HTMLElement>('#stage').classList.toggle('checker'); (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(checker));
});
document.addEventListener('visibilitychange', () => { previousTime = null; });
function tick(now: number): void {
  if (ready && playing && previousTime !== null) {
    elapsed += (now - previousTime) * Number(rate.value); draw();
    if (!attackSample(elapsed, a, b, mode, looping).active) { playing = false; play.textContent = '继续'; draw(); }
  }
  previousTime = now; requestAnimationFrame(tick);
}
void init().catch(error => { status.value = error instanceof Error ? error.message : '素材加载失败'; });
window.addEventListener('pagehide', () => { for (const variant of ['a', 'b'] as const) for (const frame of frames[variant]) frame.close(); });
requestAnimationFrame(tick);
