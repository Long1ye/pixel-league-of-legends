import study from './study.json';
import sourceAtlas from './references/source-atlas.png?url';
import resultAtlas from './media/q-ne-atlas.png?url';
import resultWebp from './media/q-ne.webp?url';
import { sampleQ, frameStartQ } from '../q-v1-se/timing';

const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const source = $<HTMLCanvasElement>('#source'), result = $<HTMLCanvasElement>('#result');
const timing = $<HTMLSelectElement>('#timing'), zoom = $<HTMLSelectElement>('#zoom');
const scrub = $<HTMLInputElement>('#scrub'), pause = $<HTMLButtonElement>('#pause');
const cards: HTMLElement[] = [];
let originalFrames: ImageBitmap[] = [], generatedFrames: ImageBitmap[] = [];
let elapsed = 0, previousTime: number | null = null, playing = false, repeat = true, ready = false;
const duration = () => timing.value === 'demo' ? 500 : undefined;

async function loadFrames(path: string, width: number, height: number, count: number, columns: number) {
  const image = new Image(); image.src = path; await image.decode();
  if (image.naturalWidth !== width * columns || image.naturalHeight < height * Math.ceil(count / columns)) throw new Error('图集尺寸不一致');
  const frames: ImageBitmap[] = [];
  for (let index = 0; index < count; index++) frames.push(await createImageBitmap(image, index % columns * width, Math.floor(index / columns) * height, width, height));
  return frames;
}

function paint(canvas: HTMLCanvasElement, frame: ImageBitmap) {
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frame, 0, 0);
}

function draw() {
  const a = sampleQ(elapsed, study.source.durations_ms, repeat, duration());
  const b = sampleQ(elapsed, study.durations_ms, repeat, duration());
  paint(source, originalFrames[a.frame]); paint(result, generatedFrames[b.frame]);
  result.dataset.frame = String(b.frame + 1); result.dataset.cycle = String(b.cycle); result.dataset.active = String(b.active);
  scrub.value = String(b.frame);
  if (!b.active) { playing = false; pause.textContent = '继续'; }
  $<HTMLOutputElement>('#status').value = `${!b.active ? '本次播放结束' : playing ? '播放中' : '暂停'} · 原模板第${a.frame + 1}/${study.source.frame_count}帧 · 结果第${b.frame + 1}/${study.frame_count}帧${b.cycle ? ` · 循环${b.cycle}` : ''}`;
  cards.forEach((card, index) => card.classList.toggle('selected', index === b.frame));
}

function start(loop: boolean) { repeat = loop; elapsed = 0; previousTime = null; playing = true; pause.textContent = '暂停'; draw(); }
function select(index: number) { repeat = false; playing = false; previousTime = null; pause.textContent = '继续'; elapsed = frameStartQ(index, study.durations_ms, duration()); draw(); }
function setZoom() {
  for (const canvas of [source, result]) { canvas.style.width = `${canvas.width * Number(zoom.value)}px`; canvas.style.height = `${canvas.height * Number(zoom.value)}px`; }
}

async function init() {
  [originalFrames, generatedFrames] = await Promise.all([
    loadFrames(sourceAtlas, study.source.width, study.source.height, study.source.frame_count, study.source.columns),
    loadFrames(resultAtlas, study.width, study.height, study.frame_count, study.columns),
  ]);
  source.width = study.source.width; source.height = study.source.height;
  result.width = study.width; result.height = study.height; setZoom();
  $<HTMLElement>('#source-facts').textContent = `${study.source.frame_count}帧 · ${(study.source.duration_ms / 1000).toFixed(2)}秒 · ${study.source.width}×${study.source.height}（只补透明留白）`;
  $<HTMLElement>('#result-facts').textContent = `${study.frame_count}帧 · ${(study.duration_ms / 1000).toFixed(2)}秒 · ${study.width}×${study.height} · ${study.has_transparency ? '有透明通道' : '无透明背景'}`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#intent').textContent = study.edit_intent;
  $<HTMLElement>('#description').textContent = study.video_description;
  $<HTMLElement>('#credits').textContent = `本轮仅提交1个动画任务，预计${study.estimated_credits}积分。期间账户余额增加${study.account_balance_delta}积分，包含其他账户变动，不能据此确认本次实际扣费；输出记录未提供账单。`;
  const download = $<HTMLAnchorElement>('#download'); download.href = resultWebp; download.download = 'yasuo-q-ne-trial.webp';
  const original = $<HTMLImageElement>('#original'); original.src = resultWebp; await original.decode();
  for (let index = 0; index < generatedFrames.length; index++) {
    const card = document.createElement('div'); card.className = 'frame';
    const button = document.createElement('button'); button.textContent = `第${index + 1}帧`; button.addEventListener('click', () => select(index));
    const cell = document.createElement('canvas'); cell.width = study.width; cell.height = study.height; cell.className = 'checker'; paint(cell, generatedFrames[index]);
    card.append(button, cell); cards.push(card); $<HTMLElement>('#frames').append(card);
  }
  scrub.max = String(study.frame_count - 1); scrub.disabled = false;
  document.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false);
  ready = true; start(true);
}

$<HTMLButtonElement>('#once').addEventListener('click', () => start(false));
$<HTMLButtonElement>('#loop').addEventListener('click', () => start(true));
pause.addEventListener('click', () => { if (!playing && !sampleQ(elapsed, study.durations_ms, repeat, duration()).active) elapsed = 0; playing = !playing; previousTime = null; pause.textContent = playing ? '暂停' : '继续'; draw(); });
$<HTMLButtonElement>('#previous').addEventListener('click', () => select((Number(scrub.value) + study.frame_count - 1) % study.frame_count));
$<HTMLButtonElement>('#next').addEventListener('click', () => select((Number(scrub.value) + 1) % study.frame_count));
scrub.addEventListener('input', () => select(Number(scrub.value)));
timing.addEventListener('change', () => start(repeat)); zoom.addEventListener('change', setZoom);
function tick(now: number) {
  if (ready && playing) { if (previousTime !== null) elapsed += Math.min(250, now - previousTime); previousTime = now; draw(); }
  else previousTime = null;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
init().catch(error => { $<HTMLOutputElement>('#status').value = `加载失败：${error instanceof Error ? error.message : String(error)}`; });
