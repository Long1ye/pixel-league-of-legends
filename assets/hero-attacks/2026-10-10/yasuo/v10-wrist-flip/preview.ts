import { sampleAt, type ClipTiming } from '../v8-user-ab/timing';

interface Media { path: string; width: number; height: number; frame_count: number; durations_ms: number[]; duration_ms: number; transparent?: boolean }
interface Study { approved_prompt: string; optimized_prompt: Record<string, string>; newB: Media; originals: (Media & { id: string })[]; final_media: Media[]; downloads: { path: string; label: string }[]; canvas_compatible: boolean; review: string; credits_consumed: number }
interface Decoder { tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null }; decode(options: { frameIndex: number; completeFramesOnly: boolean }): Promise<{ image: VideoFrame }>; close(): void }
interface DecoderHost { ImageDecoder?: new (options: { data: ArrayBuffer; type: string; preferAnimation: boolean }) => Decoder }
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const newCanvas = $<HTMLCanvasElement>('#new-B'), oldCanvas = $<HTMLCanvasElement>('#old-B'), pairCanvas = $<HTMLCanvasElement>('#pair-canvas');
const pace = $<HTMLSelectElement>('#pace'), play = $<HTMLButtonElement>('#play');
let study: Study, oldB: Media, oldA: Media, newFrames: ImageBitmap[] = [], oldFrames: ImageBitmap[] = [], aFrames: ImageBitmap[] = [];
let elapsed = 0, last: number | null = null, playing = true, ready = false, pairMode = false;
const mediaUrl = (path: string) => new URL(path, import.meta.url).href;
const originalUrl = (path: string) => { const relative = `../${path}`; return mediaUrl(relative); };
function configure(canvas: HTMLCanvasElement, record: Media): void { canvas.width = record.width; canvas.height = record.height; }
function paint(canvas: HTMLCanvasElement, frame: ImageBitmap): void {
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frame, 0, 0);
}
function indexAt(ms: number, record: Media): number {
  let remaining = Math.max(0, ms) % record.duration_ms;
  for (const [index, duration] of record.durations_ms.entries()) { if (remaining < duration) return index; remaining -= duration; }
  return record.frame_count - 1;
}
function newTime(): number { return pace.value === 'matched' ? elapsed * study.newB.duration_ms / oldB.duration_ms : elapsed; }
function pairTiming(): ClipTiming[] {
  const factor = pace.value === 'matched' ? oldB.duration_ms / study.newB.duration_ms : 1;
  return [{ id: 'A', durations_ms: oldA.durations_ms }, { id: 'B', durations_ms: study.newB.durations_ms.map(ms => ms * factor) }];
}
function draw(): void {
  const newIndex = indexAt(newTime(), study.newB), oldIndex = indexAt(elapsed, oldB);
  paint(newCanvas, newFrames[newIndex]); paint(oldCanvas, oldFrames[oldIndex]);
  $<HTMLOutputElement>('#new-status').value = `B · ${newIndex + 1}/${study.newB.frame_count}帧`;
  $<HTMLOutputElement>('#old-status').value = `原B · ${oldIndex + 1}/${oldB.frame_count}帧`;
  let pairLabel = '';
  if (pairMode && study.canvas_compatible) {
    const sample = sampleAt(elapsed, pairTiming(), 'loop');
    paint(pairCanvas, sample.clip === 'A' ? aFrames[sample.frame] : newFrames[sample.frame]);
    pairLabel = ` · A/B衔接 ${sample.clip} ${sample.frame + 1}帧 · 循环${sample.cycle}`;
  }
  $<HTMLOutputElement>('#status').value = `${playing ? '播放中' : '暂停'} · ${pace.value === 'matched' ? '匹配原B节奏' : '原始时长'}${pairLabel}`;
}
async function decode(url: string, record: Media): Promise<ImageBitmap[]> {
  const Constructor = (window as unknown as DecoderHost).ImageDecoder;
  if (!Constructor) throw new Error('当前浏览器不支持逐帧解码，请使用下方最终WebP文件。');
  const response = await fetch(url); if (!response.ok) throw new Error('动画文件加载失败');
  const decoder = new Constructor({ data: await response.arrayBuffer(), type: 'image/webp', preferAnimation: true }), decoded: ImageBitmap[] = [];
  try {
    await decoder.tracks.ready; if (decoder.tracks.selectedTrack?.frameCount !== record.frame_count) throw new Error('帧数与素材索引不一致');
    for (let index = 0; index < record.frame_count; index++) {
      const frame = await decoder.decode({ frameIndex: index, completeFramesOnly: true });
      try { decoded.push(await createImageBitmap(frame.image)); } finally { frame.image.close(); }
    }
    if (decoded.some(frame => frame.width !== record.width || frame.height !== record.height)) throw new Error('动画尺寸与素材索引不一致');
    return decoded;
  } catch (error) { decoded.forEach(frame => frame.close()); throw error; } finally { decoder.close(); }
}
function zoom(): void {
  const factor = Number($<HTMLSelectElement>('#zoom').value);
  for (const canvas of [newCanvas, oldCanvas, pairCanvas]) { canvas.style.width = `${canvas.width * factor}px`; canvas.style.height = `${canvas.height * factor}px`; }
}
function step(direction: number): void {
  const target = (indexAt(newTime(), study.newB) + direction + study.newB.frame_count) % study.newB.frame_count;
  const start = study.newB.durations_ms.slice(0, target).reduce((sum, duration) => sum + duration, 0);
  elapsed = pace.value === 'matched' ? start * oldB.duration_ms / study.newB.duration_ms : start;
  playing = false; last = null; play.textContent = '继续'; draw();
}
async function init(): Promise<void> {
  const response = await fetch(new URL('./study.json', import.meta.url), { cache: 'no-store' });
  if (!response.ok) throw new Error('素材尚未齐全，完成后刷新本页。');
  study = await response.json() as Study; oldB = study.originals.find(clip => clip.id === 'oldB')!; oldA = study.originals.find(clip => clip.id === 'A')!;
  configure(newCanvas, study.newB); configure(oldCanvas, oldB);
  $<HTMLElement>('#facts').textContent = `新版B：${study.newB.width}×${study.newB.height}，${study.newB.frame_count}帧，原速${study.newB.duration_ms / 1000}秒；原B：${oldB.width}×${oldB.height}，${oldB.frame_count}帧，${oldB.duration_ms / 1000}秒。`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗${study.credits_consumed}积分，包含未采用的两张辅助姿势。`;
  for (const [label, text] of [['已确认原文', study.approved_prompt], ...Object.entries(study.optimized_prompt)]) {
    const block = document.createElement('blockquote'); block.textContent = `${label}：${text}`; $<HTMLElement>('#prompts').append(block);
  }
  for (const media of study.downloads) {
    const link = document.createElement('a'); link.href = mediaUrl(media.path); link.textContent = media.label; link.download = ''; $<HTMLElement>('#downloads').append(link);
  }
  [newFrames, oldFrames] = await Promise.all([decode(mediaUrl(study.newB.path), study.newB), decode(originalUrl(oldB.path), oldB)]);
  for (const [index, frame] of newFrames.entries()) {
    const card = document.createElement('div'); card.className = 'frame';
    const button = document.createElement('button'); button.textContent = `B · 第${index + 1}帧`;
    button.addEventListener('click', () => { const ms = study.newB.durations_ms.slice(0, index).reduce((a, b) => a + b, 0); elapsed = pace.value === 'matched' ? ms * oldB.duration_ms / study.newB.duration_ms : ms; playing = false; play.textContent = '继续'; last = null; draw(); });
    const canvas = document.createElement('canvas'); configure(canvas, study.newB); canvas.className = 'checker'; paint(canvas, frame); card.append(button, canvas); $<HTMLElement>('#frames').append(card);
  }
  if (study.canvas_compatible) {
    configure(pairCanvas, oldA); aFrames = await decode(originalUrl(oldA.path), oldA); paint(pairCanvas, aFrames[0]);
    $<HTMLElement>('#pair-note').textContent = '画布尺寸一致，可查看原A与新版B的切换；这不代表接缝或脚底锚点已美术验收。';
    $<HTMLButtonElement>('#pair').disabled = false;
  } else {
    pairCanvas.hidden = true;
    $<HTMLElement>('#pair-note').textContent = '新版B与原A的画布尺寸不同，暂不直接拼接，需先校准角色尺度与脚底锚点。';
  }
  for (const id of ['restart', 'play', 'previous', 'next']) $<HTMLButtonElement>(`#${id}`).disabled = false;
  ready = true; last = null; zoom(); draw();
}
$<HTMLButtonElement>('#restart').addEventListener('click', () => { elapsed = 0; playing = true; pairMode = false; play.textContent = '暂停'; last = null; draw(); });
play.addEventListener('click', () => { playing = !playing; play.textContent = playing ? '暂停' : '继续'; last = null; draw(); });
$<HTMLButtonElement>('#previous').addEventListener('click', () => step(-1)); $<HTMLButtonElement>('#next').addEventListener('click', () => step(1));
$<HTMLButtonElement>('#pair').addEventListener('click', () => { pairMode = true; elapsed = 0; playing = true; play.textContent = '暂停'; last = null; draw(); });
pace.addEventListener('change', () => { elapsed = 0; last = null; if (ready) draw(); });
$<HTMLSelectElement>('#zoom').addEventListener('change', () => { if (ready) zoom(); });
document.addEventListener('visibilitychange', () => { last = null; });
function tick(now: number): void { if (ready && playing && last !== null) { elapsed += now - last; draw(); } last = now; requestAnimationFrame(tick); }
void init().catch(error => { $<HTMLOutputElement>('#status').value = error instanceof Error ? error.message : '素材加载失败'; });
window.addEventListener('pagehide', () => { [...newFrames, ...oldFrames, ...aFrames].forEach(frame => frame.close()); });
requestAnimationFrame(tick);
