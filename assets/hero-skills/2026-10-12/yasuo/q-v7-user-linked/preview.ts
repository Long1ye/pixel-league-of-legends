import inspection from './source-inspection.json';
import eUrl from './media/user-e.png?url';
import seUrl from './media/user-se.png?url';
import sUrl from './media/user-s.png?url';
import swUrl from './media/user-sw.png?url';
import wUrl from './media/user-w.png?url';
import nwUrl from './media/user-nw.png?url';
import nUrl from './media/user-n.png?url';
import neUrl from './media/user-ne.png?url';
import eClip from './export/q-e-linked.webp?url';
import seClip from './export/q-se-linked.webp?url';
import sClip from './export/q-s-linked.webp?url';
import swClip from './export/q-sw-linked.webp?url';
import wClip from './export/q-w-linked.webp?url';
import nwClip from './export/q-nw-linked.webp?url';
import nClip from './export/q-n-linked.webp?url';
import neClip from './export/q-ne-linked.webp?url';
import atlasUrl from './export/yasuo-q-user-linked-atlas.png?url';
import upperUrl from '../q-v5-small-grip-wind-e/media/upper-arm.png?url';
import handUrl from '../q-v5-small-grip-wind-e/media/forearm-hand.png?url';
import swordUrl from '../q-v5-small-grip-wind-e/media/wind-sword.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import { DIRECTIONS, LABELS, RIG, directionForAngle, headingForDirection, sampleLinkedThrust, type Direction } from './rig';
import { renderLinkedThrust, type RigImages } from './render';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const fixedCanvas = el<HTMLCanvasElement>('fixed'), linkedCanvas = el<HTMLCanvasElement>('linked'), mapCanvas = el<HTMLCanvasElement>('map');
const scrub = el<HTMLInputElement>('scrub'), directionSelect = el<HTMLSelectElement>('direction');
const zoomSelect = el<HTMLSelectElement>('zoom'), speed = el<HTMLSelectElement>('speed'), angleInput = el<HTMLInputElement>('angle');
const joints = el<HTMLInputElement>('joints');
const urls: Record<Direction, string> = { e: eUrl, se: seUrl, s: sUrl, sw: swUrl, w: wUrl, nw: nwUrl, n: nUrl, ne: neUrl };
const clips: Record<Direction, string> = { e: eClip, se: seClip, s: sClip, sw: swClip, w: wClip, nw: nwClip, n: nClip, ne: neClip };
const bodies = Object.fromEntries(DIRECTIONS.map(d => [d, new Image()])) as Record<Direction, HTMLImageElement>;
const images: RigImages = { bodies, upper: new Image(), hand: new Image(), sword: new Image() }, map = new Image();
const cards: Partial<Record<Direction, HTMLCanvasElement>> = {};
let angle = 0, elapsed = 0, lastTime: number | null = null, playing = true, repeating = true, zoom = 1;
const phases = { prepare: '腰肩蓄力', thrust: '躯干带动刺出', impact: '刺出到位', recover: '回收复位', ready: '准备姿态' };
function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url; });
}
function cast(nextAngle: number, repeat = true): void {
  angle = (nextAngle % 360 + 360) % 360; angleInput.value = String(Math.round(angle)); directionSelect.value = directionForAngle(angle);
  elapsed = 0; lastTime = null; playing = true; repeating = repeat; draw();
}
function resize(): void {
  for (const canvas of [fixedCanvas, linkedCanvas, ...Object.values(cards)]) { canvas.width = 288 * zoom; canvas.height = 256 * zoom; }
  mapCanvas.width = 288 * zoom; mapCanvas.height = 192 * zoom;
  el('focus').classList.toggle('zoomed', zoom === 2);
  el('grid').classList.toggle('zoomed', zoom === 2);
}
function frame(canvas: HTMLCanvasElement, heading: number, linked: boolean): void {
  const ctx = canvas.getContext('2d')!; ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.clearRect(0, 0, 288, 256);
  ctx.save(); ctx.translate(144, 158); renderLinkedThrust(ctx, sampleLinkedThrust(heading, elapsed, linked, repeating), images, joints.checked); ctx.restore();
}
function draw(): void {
  frame(fixedCanvas, angle, false); frame(linkedCanvas, angle, true);
  for (const direction of DIRECTIONS) if (cards[direction]) frame(cards[direction]!, headingForDirection(direction), true);
  const pose = sampleLinkedThrust(angle, elapsed, true, repeating);
  const ctx = mapCanvas.getContext('2d')!; ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.imageSmoothingEnabled = false;
  ctx.drawImage(map, 198, 106, 144, 96, 0, 0, 288, 192);
  ctx.fillStyle = '#08102080'; ctx.beginPath(); ctx.ellipse(130, 120, 8, 3, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(130, 120); ctx.scale(0.25, 0.25); renderLinkedThrust(ctx, pose, images, false); ctx.restore();
  scrub.value = String(Math.round(pose.castTime));
  el('status').textContent = `${playing ? repeating ? '循环' : '单次' : '暂停'} · ${LABELS[pose.direction]} ${Math.round(angle)}° · ${phases[pose.phase]}`;
}
function tick(now: number): void {
  if (playing && lastTime !== null) {
    elapsed += Math.min(now - lastTime, 100) * Number(speed.value);
    if (!repeating && elapsed >= RIG.duration) { elapsed = RIG.duration; playing = false; }
  }
  lastTime = now; draw(); requestAnimationFrame(tick);
}
async function main(): Promise<void> {
  for (const direction of DIRECTIONS) {
    const option = document.createElement('option'); option.value = direction; option.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`; directionSelect.append(option);
    const section = document.createElement('section'), heading = document.createElement('h3'), viewport = document.createElement('div');
    heading.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`; viewport.className = 'viewport';
    const canvas = document.createElement('canvas'); canvas.className = 'checker'; canvas.setAttribute('aria-label', `${LABELS[direction]}的身体联动戳刺`);
    cards[direction] = canvas; viewport.append(canvas);
    const button = document.createElement('button'); button.textContent = `查看${LABELS[direction]}对照`; button.dataset.direction = direction; button.onclick = () => cast(headingForDirection(direction));
    section.append(heading, viewport, button); el('grid').append(section);
    const figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption');
    img.src = clips[direction]; img.alt = `${LABELS[direction]}的已导出 Q 联动动画`; img.width = 288; img.height = 256; img.className = 'checker';
    caption.textContent = `${LABELS[direction]} · 16 帧 · 480ms 动作＋休止循环`;
    const download = document.createElement('a'); download.href = clips[direction]; download.download = `yasuo-q-${direction}-linked.webp`; download.textContent = '下载 WebP';
    figure.append(img, caption, download); el('clips').append(figure);
  }
  await Promise.all([...DIRECTIONS.map(d => load(bodies[d], urls[d])), load(images.upper, upperUrl), load(images.hand, handUrl), load(images.sword, swordUrl), load(map, mapUrl)]);
  for (const direction of DIRECTIONS) if (bodies[direction].naturalWidth !== 128 || bodies[direction].naturalHeight !== 128) throw new Error(`方向素材尺寸错误：${direction}`);
  directionSelect.value = 'e'; directionSelect.onchange = () => cast(headingForDirection(directionSelect.value as Direction));
  angleInput.oninput = () => { if (angleInput.value !== '' && Number.isFinite(angleInput.valueAsNumber)) cast(angleInput.valueAsNumber, false); };
  for (const id of ['once', 'repeat', 'pause']) el<HTMLButtonElement>(id).disabled = false;
  el('once').onclick = () => cast(angle, false); el('repeat').onclick = () => cast(angle); el('pause').onclick = () => { playing = false; draw(); };
  scrub.oninput = () => { elapsed = Number(scrub.value); playing = false; repeating = false; draw(); };
  zoomSelect.onchange = () => { zoom = Number(zoomSelect.value); resize(); draw(); };
  speed.onchange = () => { lastTime = null; }; joints.onchange = draw;
  mapCanvas.onclick = event => {
    const rect = mapCanvas.getBoundingClientRect(), x = (event.clientX - rect.left) / rect.width * 288 - 130, y = (event.clientY - rect.top) / rect.height * 192 - 120;
    if (Math.hypot(x, y) > 3) cast(Math.atan2(y, x) * 180 / Math.PI, false);
  };
  el('sources').textContent = `已使用你提供的 ${inspection.entries.length} 个独立方向；正上、右下均已齐全。原图另存不改，运行纹理为 128×128，整体统一游戏身高。`;
  el<HTMLButtonElement>('export').disabled = false;
  const existingAtlas = el<HTMLAnchorElement>('atlas'); existingAtlas.href = atlasUrl; existingAtlas.hidden = false;
  el('export').onclick = () => {
    const atlas = document.createElement('canvas'); atlas.width = 288 * 4; atlas.height = 256 * 4 * 8;
    const ctx = atlas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
    for (let directionIndex = 0; directionIndex < DIRECTIONS.length; directionIndex++) {
      for (let frameIndex = 0; frameIndex < 16; frameIndex++) {
        ctx.save(); ctx.translate(frameIndex % 4 * 288 + 144, (directionIndex * 4 + Math.floor(frameIndex / 4)) * 256 + 158);
        renderLinkedThrust(ctx, sampleLinkedThrust(headingForDirection(DIRECTIONS[directionIndex]), frameIndex * 32), images);
        ctx.restore();
      }
    }
    const link = el<HTMLAnchorElement>('atlas'); link.href = atlas.toDataURL('image/png'); link.hidden = false;
    el('export-status').textContent = '已准备八向透明帧图 · 128 帧 · 每帧 288×256 · 脚点 144,158';
  };
  resize(); requestAnimationFrame(tick);
}
main().catch(error => { playing = false; el('status').textContent = String(error); });
