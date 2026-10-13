import { basis, makeWall, project, unproject, normalize, clamp, stateAt, drawWindWall, drawFootprint, LIFE, DEFAULT, type Point, type WallSpec, type Projection } from './wall';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('scene'), ctx = canvas.getContext('2d')!;
const camera: Projection = { origin: { x: 144, y: 150 }, groundScale: 0.58 };
const angleSlider = $<HTMLInputElement>('angle'), degreeInput = $<HTMLInputElement>('degrees');
const aim = $<HTMLInputElement>('aim'), rotate = $<HTMLInputElement>('rotate'), guides = $<HTMLInputElement>('guides');
const width = $<HTMLInputElement>('width'), height = $<HTMLInputElement>('height'), scrub = $<HTMLInputElement>('scrub');
let caster: Point = { x: 0, y: 0 }, angle = 315, clock = 0, age = 1100, paused = false, mode: 'inspect' | 'cast' = 'inspect';
let placed: WallSpec | undefined, previous: number | undefined, dragging = false;
const pending = () => makeWall(caster, angle, Number(width.value), Number(height.value));
function setAngle(value: number) {
  if (!Number.isFinite(value)) return;
  angle = normalize(value); angleSlider.value = String(Math.round(angle) % 360); degreeInput.value = String(Math.round(angle) % 360);
  document.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.angle) === Math.round(angle))));
}
function cast() { placed = pending(); age = 0; mode = 'cast'; paused = false; rotate.checked = false; }
function toPoint(event: PointerEvent) { const box = canvas.getBoundingClientRect(); return { x: (event.clientX - box.left) / box.width * canvas.width, y: (event.clientY - box.top) / box.height * canvas.height }; }
function aimAt(event: PointerEvent) {
  const p = unproject(toPoint(event), camera), dx = p.x - caster.x, dy = p.y - caster.y;
  if (Math.hypot(dx, dy) > 5) setAngle(Math.atan2(dy, dx) * 180 / Math.PI);
}
canvas.onpointerdown = e => {
  if (e.shiftKey) { dragging = true; canvas.setPointerCapture(e.pointerId); moveCaster(e); }
  else { aimAt(e); cast(); }
};
function moveCaster(e: PointerEvent) {
  const p = unproject(toPoint(e), camera);
  caster = { x: clamp(p.x, -24, 24), y: clamp(p.y, -18, 18) };
}
canvas.onpointermove = e => { if (dragging) moveCaster(e); else if (aim.checked && !rotate.checked) aimAt(e); };
canvas.onpointerup = e => { dragging = false; if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); };
canvas.onpointercancel = () => { dragging = false; };
angleSlider.oninput = () => { rotate.checked = false; setAngle(Number(angleSlider.value)); };
degreeInput.oninput = () => { if (degreeInput.value === '') return; rotate.checked = false; setAngle(Number(degreeInput.value)); };
document.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => { b.onclick = () => { rotate.checked = false; setAngle(Number(b.dataset.angle)); }; });
$('cast').onclick = cast;
$('inspect').onclick = () => { mode = 'inspect'; paused = false; age = 1100; };
$('pause').onclick = () => { paused = !paused; };
$('reset').onclick = () => { caster = { x: 0, y: 0 }; setAngle(315); mode = 'inspect'; paused = false; rotate.checked = false; };
rotate.onchange = () => { if (rotate.checked) { mode = 'inspect'; paused = false; } };
scrub.oninput = () => { if (mode !== 'cast') placed = pending(); mode = 'cast'; age = Number(scrub.value); paused = true; };
$<HTMLSelectElement>('zoom').onchange = e => { const z = Number((e.target as HTMLSelectElement).value); canvas.style.width = `${288 * z}px`; canvas.style.height = `${240 * z}px`; };

function background(context: CanvasRenderingContext2D, w: number, h: number) {
  context.globalAlpha = 1; context.fillStyle = '#16292c'; context.fillRect(0, 0, w, h);
  context.strokeStyle = '#21373a'; context.lineWidth = 1;
  for (let x = -h * 2; x < w + h * 2; x += 28) {
    context.beginPath(); context.moveTo(x, 0); context.lineTo(x + h * 1.4, h); context.stroke();
    context.beginPath(); context.moveTo(x, 0); context.lineTo(x - h * 1.4, h); context.stroke();
  }
}
function arrow() {
  const p = project(caster, 0, camera), n = basis(angle).normal;
  const q = project({ x: caster.x + n.x * 34, y: caster.y + n.y * 34 }, 0, camera);
  ctx.save(); ctx.strokeStyle = '#d6ae6b'; ctx.fillStyle = '#ead19c'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
  const direction = Math.atan2(q.y - p.y, q.x - p.x);
  ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - Math.cos(direction - 0.45) * 6, q.y - Math.sin(direction - 0.45) * 6); ctx.lineTo(q.x - Math.cos(direction + 0.45) * 6, q.y - Math.sin(direction + 0.45) * 6); ctx.closePath(); ctx.fill(); ctx.restore();
}
const comparisons = new Map<number, HTMLCanvasElement>();
for (const degrees of [270, 315, 0, 137]) {
  const figure = document.createElement('figure'), cell = document.createElement('canvas'), label = document.createElement('figcaption');
  cell.width = 192; cell.height = 160; cell.setAttribute('aria-label', `${degrees}度风墙`);
  label.textContent = `${degrees}° · ${degrees === 0 ? '侧面厚度' : degrees === 270 ? '正面' : degrees === 137 ? '非八向角度' : '斜面'}`;
  figure.append(cell, label); $('views').append(figure); comparisons.set(degrees, cell);
}
function paint() {
  background(ctx, 288, 240);
  const wall = mode === 'cast' && placed ? placed : pending();
  if (guides.checked) { drawFootprint(ctx, wall, camera); arrow(); if (mode === 'cast' && Math.abs(normalize(angle - wall.angle)) > 1) drawFootprint(ctx, pending(), camera, '#705f41'); }
  drawWindWall(ctx, wall, camera, mode === 'inspect' ? 1100 : age, clock);
  ctx.fillStyle = '#7fa4a0'; ctx.font = '9px monospace'; ctx.fillText(`${Math.round(wall.angle)} DEG / WALL`, 10, 16);
  $('status').textContent = mode === 'inspect' ? '持续预览 · 风流循环' : `${stateAt(age).phase} · 已放置 ${Math.round(wall.angle)}° / 下次 ${Math.round(angle)}°`;
  $('clock').textContent = mode === 'inspect' ? '位置与方向可实时调整' : `${Math.round(age)} / ${LIFE.end}ms`;
  $('pause').textContent = paused ? '继续' : '暂停';
  $('width-value').textContent = width.value; $('height-value').textContent = height.value;
  scrub.value = String(mode === 'inspect' ? 1100 : age);
  if ($<HTMLDetailsElement>('overview').open) for (const [degrees, cell] of comparisons) {
    const c = cell.getContext('2d')!; background(c, 192, 160);
    const model: WallSpec = { center: { x: 0, y: 0 }, angle: degrees, width: 138, height: 57, thickness: DEFAULT.thickness };
    const projection = { origin: { x: 96, y: 103 }, groundScale: 0.58 };
    if (guides.checked) drawFootprint(c, model, projection);
    drawWindWall(c, model, projection, 1100, clock);
  }
}
$('export').onclick = () => {
  const wall = mode === 'cast' && placed ? placed : pending();
  const model = { ...wall, center: { x: 0, y: 0 } };
  const atlas = document.createElement('canvas'); atlas.width = 240 * 6; atlas.height = 192 * 4;
  const context = atlas.getContext('2d')!;
  for (let i = 0; i < 24; i++) {
    context.save(); context.translate(i % 6 * 240, Math.floor(i / 6) * 192);
    drawWindWall(context, model, { origin: { x: 120, y: 128 }, groundScale: 0.58 }, 1100, i * 75); context.restore();
  }
  const link = document.createElement('a'); link.href = atlas.toDataURL('image/png'); link.download = `wind-wall-${Math.round(wall.angle)}deg.png`; link.textContent = `下载 ${Math.round(wall.angle)}° 透明帧图`;
  $('exports').replaceChildren(link); $('export-status').textContent = '24 帧 · 240×192 / 帧 · 75ms / 帧 · 6列4行';
};
function tick(now: number) {
  const dt = previous === undefined ? 0 : Math.max(0, now - previous); previous = now;
  if (!paused) {
    const delta = dt * Number($<HTMLSelectElement>('speed').value); clock += delta;
    if (mode === 'cast') age = Math.min(LIFE.end, age + delta);
    if (rotate.checked && mode === 'inspect') setAngle(angle + delta * 0.027);
  }
  paint(); requestAnimationFrame(tick);
}
setAngle(angle); requestAnimationFrame(tick);
