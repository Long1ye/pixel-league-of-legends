import inspection from './parts-inspection.json';
import bodyE from './media/body-e.png?url';
import bodySE from './media/body-se.png?url';
import bodyS from './media/body-s.png?url';
import bodySW from './media/body-sw.png?url';
import bodyW from './media/body-w.png?url';
import bodyNW from './media/body-nw.png?url';
import bodyNE from './media/body-ne.png?url';
import upperUrl from './media/upper-arm.png?url';
import handUrl from './media/forearm-hand.png?url';
import swordUrl from './media/wind-sword.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import { BODIES, DIRECTIONS, LABELS, RIG, directionForAngle, headingForDirection, sampleAimedThrust, type Direction } from './rig';
import { renderThrust, type RigImages } from './render';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const scrub = el<HTMLInputElement>('scrub'), zoomSelect = el<HTMLSelectElement>('zoom'), speed = el<HTMLSelectElement>('speed');
const joints = el<HTMLInputElement>('joints'), mapCanvas = el<HTMLCanvasElement>('aim');
const angleInput = el<HTMLInputElement>('angle');
const images: RigImages = { bodies: {}, upper: new Image(), hand: new Image(), sword: new Image() }, map = new Image();
const bodyUrls: Partial<Record<Direction, string>> = { e: bodyE, se: bodySE, s: bodyS, sw: bodySW, w: bodyW, nw: bodyNW, ne: bodyNE };
const cards: Partial<Record<Direction, HTMLCanvasElement>> = {};
let elapsed = 0, lastTime: number | null = null, playing = true, repeating = true, zoom = 1, selectedAngle = 315;
const phaseLabels = { prepare: '收刀聚风', thrust: '握刀刺出', impact: '刺出到位', recover: '收刀复位', ready: '准备姿态' };
function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url; });
}
function selectAngle(angle: number, once = false): void {
  selectedAngle = (angle % 360 + 360) % 360; elapsed = 0; lastTime = null;
  angleInput.value = String(Math.round(selectedAngle));
  playing = Boolean(BODIES[directionForAngle(selectedAngle)]); repeating = !once;
  if (!playing) elapsed = RIG.duration;
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-direction]')) button.setAttribute('aria-pressed', String(button.dataset.direction === directionForAngle(selectedAngle)));
  draw();
}
function resize(): void { for (const canvas of [mapCanvas, ...Object.values(cards)]) { canvas.width = 256 * zoom; canvas.height = 256 * zoom; } }
function draw(): void {
  for (const direction of DIRECTIONS) {
    const canvas = cards[direction]; if (!canvas) continue;
    const ctx = canvas.getContext('2d')!; ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.clearRect(0, 0, 256, 256);
    const angle = headingForDirection(direction), pose = sampleAimedThrust(angle, elapsed, repeating);
    // Reframe each thumbnail camera slightly to keep the entire native blade in view.
    const footX = Math.cos(pose.radians) > 0.2 ? 116 : Math.cos(pose.radians) < -0.2 ? 140 : 128;
    ctx.save(); ctx.translate(footX, 155); renderThrust(ctx, pose, images, joints.checked); ctx.restore();
    ctx.fillStyle = '#99ccc7'; ctx.font = '12px Microsoft YaHei'; ctx.fillText(`${angle}° · ${phaseLabels[pose.phase]}`, 12, 238);
  }
  const ctx = mapCanvas.getContext('2d')!; ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.imageSmoothingEnabled = false;
  ctx.drawImage(map, 198, 86, 128, 128, 0, 0, 256, 256);
  const direction = directionForAngle(selectedAngle), angle = selectedAngle * Math.PI / 180;
  const color = BODIES[direction] ? '#a0eff0' : '#ffae98';
  ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(128, 150); ctx.lineTo(128 + Math.cos(angle) * 65, 150 + Math.sin(angle) * 65); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(128 + Math.cos(angle) * 65, 150 + Math.sin(angle) * 65, 2, 0, Math.PI * 2); ctx.fill();
  let time = repeating ? Math.min(elapsed % RIG.repeatPeriod, RIG.duration) : Math.min(elapsed, RIG.duration);
  let phase = '方向缺失，未施放';
  if (BODIES[direction]) {
    const pose = sampleAimedThrust(selectedAngle, elapsed, repeating); time = pose.castTime; phase = phaseLabels[pose.phase];
    ctx.fillStyle = '#07121d80'; ctx.beginPath(); ctx.ellipse(128, 150, 8, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(128, 150); ctx.scale(0.25, 0.25); renderThrust(ctx, pose, images, joints.checked); ctx.restore();
  } else {
    ctx.fillStyle = '#ffceba'; ctx.font = '12px Microsoft YaHei'; ctx.fillText('正上 Q 素材缺失', 70, 140);
  }
  scrub.value = String(Math.round(time));
  el('status').textContent = `${playing ? repeating ? '循环' : '单次' : '暂停'} · ${LABELS[direction]} · ${Math.round(selectedAngle)}° · ${phase}`;
}
function tick(now: number): void {
  if (playing && lastTime !== null) {
    elapsed += Math.min(now - lastTime, 100) * Number(speed.value);
    if (!repeating && elapsed >= RIG.duration) { elapsed = RIG.duration; playing = false; }
  }
  lastTime = now; draw(); requestAnimationFrame(tick);
}
async function main(): Promise<void> {
  const jobs = [load(images.upper, upperUrl), load(images.hand, handUrl), load(images.sword, swordUrl), load(map, mapUrl)];
  for (const direction of DIRECTIONS) {
    const url = bodyUrls[direction], body = BODIES[direction]; if (!url || !body) continue;
    const image = new Image(); images.bodies[direction] = image; jobs.push(load(image, url));
    const section = document.createElement('section'); section.className = `card dir-${direction}`;
    const heading = document.createElement('h2'); heading.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`;
    const viewport = document.createElement('div'); viewport.className = 'viewport'; const canvas = document.createElement('canvas');
    canvas.className = 'checker'; canvas.setAttribute('aria-label', `${LABELS[direction]} Q 戳刺动画`); cards[direction] = canvas; viewport.append(canvas);
    const button = document.createElement('button'); button.textContent = `在地图查看${LABELS[direction]}`; button.dataset.direction = direction; button.setAttribute('aria-pressed', String(direction === 'ne'));
    button.onclick = () => selectAngle(headingForDirection(direction)); section.append(heading, viewport, button); el('directions').append(section);
  }
  await Promise.all(jobs);
  for (const [direction, image] of Object.entries(images.bodies)) {
    const body = BODIES[direction as Direction]!;
    if (image!.naturalWidth !== body.width || image!.naturalHeight !== body.height) throw new Error(`身体尺寸不匹配：${direction}`);
  }
  for (const [image, width, height] of [[images.upper, 35, 20], [images.hand, 34, 16], [images.sword, 114, 22]] as const)
    if (image.naturalWidth !== width || image.naturalHeight !== height) throw new Error('V5 复用部件尺寸不匹配');
  el('sources').textContent = `身体底图：${inspection.bodies.length} 个方向（E 沿用 V5）；缺失：${inspection.missing_directions.join(', ').toUpperCase()}。小手臂和缠风刀均原像素复用。`;
  for (const id of ['once', 'repeat', 'pause']) el<HTMLButtonElement>(id).disabled = false;
  el('once').onclick = () => selectAngle(selectedAngle, true); el('repeat').onclick = () => selectAngle(selectedAngle);
  el('pause').onclick = () => { playing = false; draw(); };
  scrub.oninput = () => { elapsed = Number(scrub.value); playing = false; repeating = false; draw(); };
  zoomSelect.onchange = () => { zoom = Number(zoomSelect.value); el('directions').classList.toggle('zoomed', zoom === 2); resize(); draw(); };
  speed.onchange = () => { lastTime = null; }; joints.onchange = draw;
  angleInput.oninput = () => { if (angleInput.value !== '' && Number.isFinite(angleInput.valueAsNumber)) selectAngle(angleInput.valueAsNumber, true); };
  mapCanvas.onclick = event => {
    const rect = mapCanvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 256 - 128, y = (event.clientY - rect.top) / rect.height * 256 - 150;
    if (Math.hypot(x, y) > 3) selectAngle(Math.atan2(y, x) * 180 / Math.PI, true);
  };
  resize(); requestAnimationFrame(tick);
}
main().catch(error => { playing = false; el('status').textContent = String(error); });
