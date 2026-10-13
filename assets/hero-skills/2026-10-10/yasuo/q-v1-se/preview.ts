import study from './study.json';
import webp from './media/q-original.webp?url';
import atlas from './media/q-atlas.png?url';
import readyPose from './poses/ready.png?url';
import impactPose from './poses/impact.png?url';
import { sampleQ, frameStartQ } from './timing';

const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const canvas = $<HTMLCanvasElement>('#animation'), status = $<HTMLOutputElement>('#status');
const scrub = $<HTMLInputElement>('#scrub'), play = $<HTMLButtonElement>('#play');
const timing = $<HTMLSelectElement>('#timing'), zoom = $<HTMLSelectElement>('#zoom');
const bitmaps: ImageBitmap[] = [], cards: HTMLElement[] = [];
let elapsed = 0, previousTime: number | null = null, playing = true, loop = true, loaded = false;
const duration = () => timing.value === 'demo' ? 450 : undefined;

function draw() {
  const sample = sampleQ(elapsed, study.durations_ms, loop, duration());
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(bitmaps[sample.frame], 0, 0);
  canvas.dataset.frame = String(sample.frame + 1); canvas.dataset.cycle = String(sample.cycle);
  canvas.dataset.active = String(sample.active); canvas.dataset.total = String(sample.total);
  scrub.value = String(sample.frame);
  if (!sample.active) { playing = false; play.textContent = '继续'; }
  status.value = `${!sample.active ? '本次Q播放结束' : playing ? '播放中' : '暂停'} · 第${sample.frame + 1}/${study.frame_count}帧 · ${timing.value === 'demo' ? '0.45秒节奏试播' : '生成原速'}${sample.cycle ? ` · 循环${sample.cycle}` : ''}`;
  cards.forEach((card, index) => card.classList.toggle('selected', index === sample.frame));
}
function start(repeat: boolean) { loop = repeat; elapsed = 0; playing = true; previousTime = null; play.textContent = '暂停'; draw(); }
function select(index: number) {
  loop = false; playing = false; previousTime = null; play.textContent = '继续';
  elapsed = frameStartQ(index, study.durations_ms, duration()); draw();
}
function setZoom() {
  const scale = Number(zoom.value), width = study.width * scale, height = study.height * scale;
  canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
  $<HTMLElement>('#stage').style.width = `${width}px`; $<HTMLElement>('#stage').style.height = `${height}px`;
}
async function init() {
  const image = new Image(); image.src = atlas; await image.decode();
  if (image.naturalWidth !== study.width * study.columns || image.naturalHeight !== study.height * study.rows) throw new Error('Q图集尺寸不一致');
  for (let index = 0; index < study.frame_count; index++) {
    const bitmap = await createImageBitmap(image, index % study.columns * study.width, Math.floor(index / study.columns) * study.height, study.width, study.height);
    bitmaps.push(bitmap);
    const card = document.createElement('div'); card.className = 'frame';
    const button = document.createElement('button'); button.textContent = `第${index + 1}帧`; button.addEventListener('click', () => select(index));
    const cell = document.createElement('canvas'); cell.width = study.width; cell.height = study.height; cell.className = 'pixel checker';
    const ctx = cell.getContext('2d')!; ctx.imageSmoothingEnabled = false; ctx.drawImage(bitmap, 0, 0);
    card.append(button, cell); cards.push(card); $<HTMLElement>('#frames').append(card);
  }
  canvas.width = study.width; canvas.height = study.height; setZoom();
  const original = $<HTMLImageElement>('#original'); original.src = webp; await original.decode();
  $<HTMLElement>('#facts').textContent = `右下方向 · ${study.frame_count}帧 · 每帧${study.width}×${study.height} · 自动优化提示词 · 单次刺击后收招`;
  $<HTMLElement>('#original-facts').textContent = `原文件 ${study.width}×${study.height} · ${(study.duration_ms / 1000).toFixed(2)}秒 · 1× 原生像素显示`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#prompt').textContent = study.prompt;
  $<HTMLElement>('#credits').textContent = `本次生成：两张关键姿势＋一条动画，实际消耗${study.credits_consumed}积分。`;
  for (const [label, path, name] of [['透明WebP', webp, 'yasuo-q-se-original.webp'], ['PNG图集', atlas, 'yasuo-q-se-atlas.png']]) {
    const link = document.createElement('a'); link.href = path; link.textContent = `下载${label}`; link.download = name; $<HTMLElement>('#downloads').append(link);
  }
  for (const [label, path] of [['持刀准备', readyPose], ['刺出到位', impactPose]]) {
    const figure = document.createElement('figure'), picture = new Image(), caption = document.createElement('figcaption');
    picture.src = path; picture.className = 'pixel checker'; picture.alt = label; caption.textContent = label;
    figure.append(picture, caption); $<HTMLElement>('#poses').append(figure);
  }
  scrub.max = String(study.frame_count - 1); scrub.disabled = false;
  document.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false);
  loaded = true; start(true);
}
$<HTMLButtonElement>('#once').addEventListener('click', () => start(false));
$<HTMLButtonElement>('#loop').addEventListener('click', () => start(true));
play.addEventListener('click', () => {
  if (!playing && !sampleQ(elapsed, study.durations_ms, loop, duration()).active) elapsed = 0;
  playing = !playing; previousTime = null; play.textContent = playing ? '暂停' : '继续'; draw();
});
$<HTMLButtonElement>('#previous').addEventListener('click', () => select((Number(scrub.value) + study.frame_count - 1) % study.frame_count));
$<HTMLButtonElement>('#next').addEventListener('click', () => select((Number(scrub.value) + 1) % study.frame_count));
scrub.addEventListener('input', () => select(Number(scrub.value)));
timing.addEventListener('change', () => start(loop)); zoom.addEventListener('change', setZoom);
function tick(now: number) {
  if (loaded && playing) { if (previousTime !== null) elapsed += Math.min(250, now - previousTime); previousTime = now; draw(); }
  else previousTime = null;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
init().catch(error => { status.value = `加载失败：${error instanceof Error ? error.message : String(error)}`; });
