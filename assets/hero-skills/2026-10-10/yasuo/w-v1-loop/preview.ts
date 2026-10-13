import study from './study.json';
import wallUrl from './media/wall-loop.webp?url';
import atlasUrl from './media/wall-atlas.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';

const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const wall = element<HTMLCanvasElement>('wall');
const scene = element<HTMLCanvasElement>('scene');
const scrub = element<HTMLInputElement>('scrub');
const zoomControl = element<HTMLSelectElement>('zoom');
const speedControl = element<HTMLSelectElement>('speed');
const atlas = new Image();
const map = new Image();
let frame = 0, elapsed = 0, previousTime = 0, playing = true, zoom = 2;
const duration = study.durations_ms.reduce((sum, value) => sum + value, 0);

function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`无法加载素材 ${url}`)); image.src = url; });
}

function frameAt(time: number): number {
  let remaining = time % duration;
  for (let index = 0; index < study.frames; index++) {
    if (remaining < study.durations_ms[index]) return index;
    remaining -= study.durations_ms[index];
  }
  return study.frames - 1;
}

function drawFrame(context: CanvasRenderingContext2D, index: number, x = 0, y = 0): void {
  context.imageSmoothingEnabled = false;
  context.drawImage(atlas, index % study.columns * study.width, Math.floor(index / study.columns) * study.height,
    study.width, study.height, x, y, study.width, study.height);
}

function resize(): void {
  for (const canvas of [wall, scene]) {
    canvas.width = study.width * zoom;
    canvas.height = study.height * zoom;
  }
}

function draw(): void {
  const plain = wall.getContext('2d')!;
  plain.setTransform(zoom, 0, 0, zoom, 0, 0);
  plain.clearRect(0, 0, study.width, study.height);
  drawFrame(plain, frame);
  const field = scene.getContext('2d')!;
  field.setTransform(zoom, 0, 0, zoom, 0, 0);
  field.imageSmoothingEnabled = false;
  // Native map pixels: a central lane crop, without resizing the map or effect.
  const mx = Math.max(0, Math.floor((map.width - study.width) / 2));
  const my = Math.max(0, Math.floor((map.height - study.height) / 2));
  field.drawImage(map, mx, my, study.width, study.height, 0, 0, study.width, study.height);
  drawFrame(field, frame);
  scrub.value = String(frame);
  element('status').textContent = `${playing ? '循环' : '暂停'} · 第 ${frame + 1} / ${study.frames} 帧 · ${duration} ms / 周期`;
}

function seek(index: number): void {
  playing = false;
  frame = (index + study.frames) % study.frames;
  elapsed = study.durations_ms.slice(0, frame).reduce((sum, value) => sum + value, 0);
  draw();
}

function tick(now: number): void {
  if (previousTime && playing) elapsed = (elapsed + Math.min(now - previousTime, 150) * Number(speedControl.value)) % duration;
  previousTime = now;
  if (playing) frame = frameAt(elapsed);
  draw();
  requestAnimationFrame(tick);
}

function directionDiagram(): void {
  const canvas = element<HTMLCanvasElement>('direction');
  const ctx = canvas.getContext('2d')!;
  const degrees = Number(element<HTMLInputElement>('angle').value);
  const a = degrees * Math.PI / 180;
  const dx = Math.cos(a), dy = Math.sin(a), tx = -dy, ty = dx;
  const origin = { x: 160, y: 105 }, center = { x: origin.x + dx * 42, y: origin.y + dy * 42 };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0c1d28'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#243e47'; ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y < canvas.height; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
  ctx.fillStyle = '#e4bf78'; ctx.beginPath(); ctx.arc(origin.x, origin.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#e4bf78'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(center.x, center.y); ctx.stroke();
  for (const side of [-1, 1]) { ctx.beginPath(); ctx.moveTo(center.x, center.y); ctx.lineTo(center.x - dx * 9 + tx * 5 * side, center.y - dy * 9 + ty * 5 * side); ctx.stroke(); }
  ctx.strokeStyle = '#a7e5e3'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(center.x - tx * 58, center.y - ty * 58); ctx.lineTo(center.x + tx * 58, center.y + ty * 58); ctx.stroke();
  ctx.fillStyle = '#b4cdce'; ctx.font = '12px sans-serif'; ctx.fillText('地面方向示意 / 不是生成的多向风墙', 12, 20);
  element('angle-label').textContent = `${degrees}°，阻挡线与箭头垂直`;
}

async function main(): Promise<void> {
  const download = element<HTMLAnchorElement>('download');
  download.href = wallUrl; download.download = 'yasuo-w-wall-loop.webp';
  element<HTMLImageElement>('original').src = wallUrl;
  element('facts').textContent = `${study.width} × ${study.height} · ${study.frames} 帧 · ${duration / 1000} 秒 · 透明背景`;
  element('review').textContent = study.review;
  element('prompt').textContent = study.prompt;
  element('billing').textContent = '本轮只生成一个固定视角。原始 WebP 保留；画布用于逐帧检查，不改动动画文件或游戏技能。';
  await Promise.all([load(atlas, atlasUrl), load(map, mapUrl)]);
  scrub.max = String(study.frames - 1);
  for (const id of ['play', 'pause', 'previous', 'next', 'scrub']) element<HTMLButtonElement | HTMLInputElement>(id).disabled = false;
  element('play').onclick = () => { playing = true; previousTime = 0; };
  element('pause').onclick = () => { playing = false; draw(); };
  element('previous').onclick = () => seek(frame - 1);
  element('next').onclick = () => seek(frame + 1);
  scrub.oninput = () => seek(Number(scrub.value));
  zoomControl.onchange = () => { zoom = Number(zoomControl.value); resize(); draw(); };
  speedControl.onchange = () => { previousTime = 0; };
  for (let index = 0; index < study.frames; index++) {
    const card = document.createElement('div'); card.className = 'frame';
    const preview = document.createElement('canvas'); preview.width = study.width; preview.height = study.height; preview.className = 'checker';
    drawFrame(preview.getContext('2d')!, index);
    const button = document.createElement('button'); button.textContent = `第 ${index + 1} 帧`; button.onclick = () => seek(index);
    card.append(preview, button); element('frames').append(card);
  }
  element<HTMLInputElement>('angle').oninput = directionDiagram;
  resize(); directionDiagram(); requestAnimationFrame(tick);
}

main().catch(error => { element('status').textContent = `加载失败：${String(error)}`; });
