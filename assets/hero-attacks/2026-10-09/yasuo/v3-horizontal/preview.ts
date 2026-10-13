import study from './study.json';
import { cycleSample, cycleFrameStart } from './timing';

// WebCodecs ImageDecoder decodes the declared final WebP itself: no derived or retouched sprite files.
interface WebPDecoder {
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null };
  decode(options: { frameIndex: number; completeFramesOnly: boolean }): Promise<{ image: VideoFrame }>;
  close(): void;
}
interface DecoderHost { ImageDecoder?: new (options: { data: ArrayBuffer; type: string; preferAnimation: boolean }) => WebPDecoder }
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const canvas = $<HTMLCanvasElement>('#animation'), status = $<HTMLOutputElement>('#status');
const play = $<HTMLButtonElement>('#play'), loop = $<HTMLInputElement>('#loop'), rate = $<HTMLSelectElement>('#rate');
const scrub = $<HTMLInputElement>('#scrub');
const url = (path: string) => new URL(path, import.meta.url).href;
const frames: ImageBitmap[] = [], cards: HTMLElement[] = [];
const zoom = study.width <= 256 ? 2 : 1;
let elapsed = 0, lastTime: number | null = null, selected = 0, playing = true, ready = false;
function draw(frame: number): void {
  selected = frame;
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames[frame], 0, 0);
  scrub.value = String(frame);
  const ended = !loop.checked && !cycleSample(elapsed, study.durations_ms, false).active;
  status.value = `${ended ? '本次循环已结束' : playing ? '连续播放' : '暂停'} · ${frame + 1}/${study.frame_count}帧`;
  cards.forEach((card, i) => card.classList.toggle('selected', frame === i));
}
function select(frame: number): void {
  const index = (frame + study.frame_count) % study.frame_count;
  elapsed = cycleFrameStart(index, study.durations_ms); playing = false; play.textContent = '继续'; draw(index);
}
function originals(): void {
  for (const { label, path, animated } of study.final_media) {
    const a = document.createElement('a'); a.href = url(path); a.textContent = `下载${label}`;
    a.download = `yasuo-horizontal-${label}.${path.split('.').at(-1)}`; $<HTMLElement>('#downloads').append(a);
    if (!animated) continue;
    const figure = document.createElement('figure'), image = new Image(), caption = document.createElement('figcaption');
    image.src = url(path); image.className = 'pixel checker'; image.width = study.width * zoom; image.height = study.height * zoom;
    image.alt = `${label}原始动画`; caption.textContent = `${label} · ${zoom}×原始像素 · 原速循环`;
    figure.append(image, caption); $<HTMLElement>('#originals').append(figure);
  }
}
async function init(): Promise<void> {
  originals();
  $<HTMLElement>('#facts').textContent = `${study.frame_count}帧 · ${study.width}×${study.height} / 帧 · 原始循环 ${(study.duration_ms / 1000).toFixed(2)}秒 · 约${Math.round(study.frame_count * 1000 / study.duration_ms)}帧/秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗 ${study.credits_consumed} 积分，旧版本保留，未接入对局。`;
  $<HTMLElement>('#method').textContent = `主预览${zoom}×、逐帧图1×整数最近邻。直接解码原始WebP；未插值补帧、镜像拼接、重排帧或逐帧对齐。`;
  const Constructor = (window as unknown as DecoderHost).ImageDecoder;
  if (!Constructor) throw new Error('浏览器不支持逐帧解码，请展开下方查看原文件循环。');
  const response = await fetch(url(study.webp)); if (!response.ok) throw new Error('动画文件加载失败');
  const decoder = new Constructor({ data: await response.arrayBuffer(), type: 'image/webp', preferAnimation: true });
  try {
    await decoder.tracks.ready;
    if (decoder.tracks.selectedTrack?.frameCount !== study.frame_count) throw new Error('帧数与验证记录不一致');
    for (let frame = 0; frame < study.frame_count; frame++) {
      const result = await decoder.decode({ frameIndex: frame, completeFramesOnly: true });
      try { frames.push(await createImageBitmap(result.image)); } finally { result.image.close(); }
    }
  } finally { decoder.close(); }
  if (frames.some(f => f.width !== study.width || f.height !== study.height)) throw new Error('画布尺寸与验证记录不一致');
  canvas.width = study.width; canvas.height = study.height;
  canvas.style.width = `${study.width * zoom}px`; canvas.style.height = `${study.height * zoom}px`;
  $<HTMLElement>('#stage').style.width = `${study.width * zoom}px`; $<HTMLElement>('#stage').style.height = `${study.height * zoom}px`;
  const gallery = $<HTMLElement>('#frames'); gallery.style.gridTemplateColumns = `repeat(auto-fit, ${study.width + 2}px)`;
  for (let i = 0; i < frames.length; i++) {
    const card = document.createElement('div'); card.className = 'frame';
    const button = document.createElement('button'); button.textContent = `第 ${i + 1} 帧`; button.addEventListener('click', () => select(i));
    const c = document.createElement('canvas'); c.width = study.width; c.height = study.height; c.className = 'pixel checker';
    c.getContext('2d')!.drawImage(frames[i], 0, 0); card.append(button, c); gallery.append(card); cards.push(card);
  }
  scrub.max = String(study.frame_count - 1); scrub.disabled = false; ready = true;
  document.querySelectorAll<HTMLButtonElement>('button').forEach(b => b.disabled = false); draw(0);
}
play.addEventListener('click', () => {
  if (!playing && !loop.checked && !cycleSample(elapsed, study.durations_ms, false).active) elapsed = 0;
  playing = !playing; play.textContent = playing ? '暂停' : '继续'; draw(cycleSample(elapsed, study.durations_ms, loop.checked).frame);
});
$<HTMLButtonElement>('#once').addEventListener('click', () => { elapsed = 0; loop.checked = false; playing = true; play.textContent = '暂停'; draw(0); });
$<HTMLButtonElement>('#next').addEventListener('click', () => select(selected + 1));
$<HTMLButtonElement>('#previous').addEventListener('click', () => select(selected - 1));
$<HTMLButtonElement>('#first').addEventListener('click', () => select(0));
$<HTMLButtonElement>('#last').addEventListener('click', () => select(study.frame_count - 1));
scrub.addEventListener('input', () => select(Number(scrub.value)));
loop.addEventListener('change', () => { elapsed = 0; playing = true; play.textContent = '暂停'; draw(0); });
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  const checker = $<HTMLElement>('#stage').classList.toggle('checker'); (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(checker));
});
function tick(now: number): void {
  if (ready && playing && lastTime !== null) {
    elapsed += Math.min(now - lastTime, 100) * Number(rate.value);
    const sample = cycleSample(elapsed, study.durations_ms, loop.checked); draw(sample.frame);
    if (!sample.active) { playing = false; play.textContent = '继续'; draw(sample.frame); }
  }
  lastTime = now; requestAnimationFrame(tick);
}
void init().catch(error => { status.value = error instanceof Error ? error.message : '素材加载失败'; });
window.addEventListener('pagehide', () => { for (const frame of frames) frame.close(); });
requestAnimationFrame(tick);
