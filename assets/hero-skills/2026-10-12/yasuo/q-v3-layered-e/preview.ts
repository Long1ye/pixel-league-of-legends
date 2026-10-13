import contract from './contract.json';
import bodyUrl from './media/body.png?url';
import upperUrl from './media/upper-arm.png?url';
import lowerUrl from './media/forearm-hand.png?url';
import swordUrl from './media/sword.png?url';
import sheetUrl from './media/parts-sheet.png?url';
import sourceAtlasUrl from '../../../2026-10-10/yasuo/q-v2-user-ne/references/source-atlas.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import { RIG, partAngle, sampleThrust, type Point } from './rig';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const rigCanvas = el<HTMLCanvasElement>('rig'), sceneCanvas = el<HTMLCanvasElement>('scene');
const reference = el<HTMLCanvasElement>('reference');
const scrub = el<HTMLInputElement>('scrub'), zoomSelect = el<HTMLSelectElement>('zoom');
const speed = el<HTMLSelectElement>('speed'), joints = el<HTMLInputElement>('joints');
const images = { body: new Image(), upper: new Image(), lower: new Image(), sword: new Image(), source: new Image(), map: new Image() };
let elapsed = 0, lastTime: number | null = null, playing = true, repeating = true, zoom = 1;
const labels = { prepare: '蓄力', thrust: '快速刺出', impact: '刺出到位', recover: '收回', ready: '准备姿态' };

function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url; });
}

function rotated(ctx: CanvasRenderingContext2D, image: HTMLImageElement, joint: Point, mount: Point, angle: number): void {
  ctx.save();
  ctx.translate(joint.x, joint.y); ctx.rotate(angle);
  ctx.drawImage(image, -mount.x, -mount.y);
  ctx.restore();
}

function renderRig(ctx: CanvasRenderingContext2D, milliseconds: number): void {
  const pose = sampleThrust(milliseconds, repeating);
  ctx.imageSmoothingEnabled = false;
  // Upper sleeve overlaps underneath the scarf. The gripping hand covers the hilt.
  rotated(ctx, images.upper, pose.shoulder, RIG.upper.mount, partAngle(pose.shoulder, pose.elbow, RIG.upper.mount, RIG.upper.end));
  ctx.drawImage(images.body, 0, 0);
  rotated(ctx, images.sword, pose.wrist, RIG.sword.grip, pose.swordAngle);
  rotated(ctx, images.lower, pose.elbow, RIG.lower.mount, partAngle(pose.elbow, pose.wrist, RIG.lower.mount, RIG.lower.end));
  if (joints.checked) {
    ctx.lineWidth = 1; ctx.strokeStyle = '#f6c774';
    ctx.beginPath(); ctx.moveTo(pose.shoulder.x, pose.shoulder.y); ctx.lineTo(pose.elbow.x, pose.elbow.y); ctx.lineTo(pose.wrist.x, pose.wrist.y); ctx.stroke();
    for (const p of [pose.shoulder, pose.elbow, pose.wrist]) { ctx.fillStyle = '#f6c774'; ctx.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, 3, 3); }
  }
}

function resize(): void {
  for (const canvas of [rigCanvas, sceneCanvas]) { canvas.width = 240 * zoom; canvas.height = 160 * zoom; }
  reference.width = 256 * zoom; reference.height = 128 * zoom;
}

function draw(): void {
  const plain = rigCanvas.getContext('2d')!;
  plain.setTransform(zoom, 0, 0, zoom, 0, 0); plain.clearRect(0, 0, 240, 160);
  plain.save(); plain.translate(65 - RIG.foot.x, 138 - RIG.foot.y); renderRig(plain, elapsed); plain.restore();
  const map = sceneCanvas.getContext('2d')!;
  map.setTransform(zoom, 0, 0, zoom, 0, 0); map.imageSmoothingEnabled = false;
  // World-space map ratio and hero ratio match the existing game, not a new art rescale.
  map.drawImage(images.map, 198, 112, 120, 80, 0, 0, 240, 160);
  map.fillStyle = '#06101680'; map.beginPath(); map.ellipse(88, 106, 9, 3, 0, 0, Math.PI * 2); map.fill();
  map.save(); map.translate(88, 106); map.scale(0.25, 0.25); map.translate(-RIG.foot.x, -RIG.foot.y); renderRig(map, elapsed); map.restore();
  const pose = sampleThrust(elapsed, repeating);
  const frame = Math.min(15, Math.floor(pose.castTime / RIG.duration * 16));
  const original = reference.getContext('2d')!;
  original.setTransform(zoom, 0, 0, zoom, 0, 0); original.clearRect(0, 0, 256, 128); original.imageSmoothingEnabled = false;
  original.drawImage(images.source, frame % 4 * 256, Math.floor(frame / 4) * 200 + 72, 256, 128, 0, 0, 256, 128);
  scrub.value = String(Math.round(pose.castTime));
  const message = `${playing ? repeating ? '循环检查' : '播放一次' : '暂停'} · ${labels[pose.phase]} · 400ms / 次 · 仅朝右`;
  if (el('status').textContent !== message) el('status').textContent = message;
}

function tick(now: number): void {
  if (playing && lastTime !== null) {
    elapsed += Math.min(now - lastTime, 100) * Number(speed.value);
    if (!repeating && elapsed >= RIG.duration) { elapsed = RIG.duration; playing = false; }
  }
  lastTime = now; draw(); requestAnimationFrame(tick);
}

async function main(): Promise<void> {
  await Promise.all([
    load(images.body, bodyUrl), load(images.upper, upperUrl), load(images.lower, lowerUrl),
    load(images.sword, swordUrl), load(images.source, sourceAtlasUrl), load(images.map, mapUrl),
  ]);
  const expected = [[images.body, 69, 94], [images.upper, 44, 25], [images.lower, 45, 19], [images.sword, 106, 18]] as const;
  if (expected.some(([image, width, height]) => image.naturalWidth !== width || image.naturalHeight !== height)) throw new Error('分层素材尺寸与关节配置不一致');
  for (const [label, url] of [['身体', bodyUrl], ['上臂', upperUrl], ['前臂与手', lowerUrl], ['刀', swordUrl]]) {
    const figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption');
    img.src = url; img.alt = `独立部件：${label}`; img.className = 'checker'; caption.textContent = `${label} · 原生尺寸`;
    figure.append(img, caption); el('layers').append(figure);
  }
  el('prompt').textContent = contract.prompt;
  const sheet = el<HTMLAnchorElement>('sheet'); sheet.href = sheetUrl;
  for (const id of ['once', 'repeat', 'pause']) el<HTMLButtonElement>(id).disabled = false;
  el('once').onclick = () => { elapsed = 0; lastTime = null; repeating = false; playing = true; };
  el('repeat').onclick = () => { elapsed = 0; lastTime = null; repeating = true; playing = true; };
  el('pause').onclick = () => { playing = false; draw(); };
  scrub.oninput = () => { elapsed = Number(scrub.value); repeating = false; playing = false; draw(); };
  zoomSelect.onchange = () => { zoom = Number(zoomSelect.value); resize(); draw(); };
  speed.onchange = () => { lastTime = null; };
  joints.onchange = draw;
  resize(); requestAnimationFrame(tick);
}

main().catch(error => { el('status').textContent = String(error); });
