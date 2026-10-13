import plan from './parts.plan.json';
import bodyUrl from './media/body.png?url';
import upperUrl from './media/upper-arm.png?url';
import handUrl from './media/casting-hand.png?url';
import swordUrl from './media/wind-sword.png?url';
import sheetUrl from './media/parts-sheet.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import { RIG, partAngle, sampleWindCast, type Point } from './rig';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const rigCanvas = el<HTMLCanvasElement>('rig'), sceneCanvas = el<HTMLCanvasElement>('scene');
const scrub = el<HTMLInputElement>('scrub'), zoomSelect = el<HTMLSelectElement>('zoom');
const speed = el<HTMLSelectElement>('speed'), joints = el<HTMLInputElement>('joints');
const images = { body: new Image(), upper: new Image(), hand: new Image(), sword: new Image(), map: new Image() };
let elapsed = 0, lastTime: number | null = null, playing = true, repeating = true, zoom = 1;
const labels = { gather: '抬手聚风', release: '推出', impact: '风托刀刺击', recover: '风散收手', ready: '准备姿态' };

function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url; });
}
function rotated(ctx: CanvasRenderingContext2D, image: HTMLImageElement, joint: Point, mount: Point, angle: number): void {
  ctx.save(); ctx.translate(joint.x, joint.y); ctx.rotate(angle); ctx.drawImage(image, -mount.x, -mount.y); ctx.restore();
}

function wind(ctx: CanvasRenderingContext2D, pose: ReturnType<typeof sampleWindCast>): void {
  if (pose.opacity <= 0) return;
  const x = pose.sword.x, y = pose.sword.y;
  ctx.save(); ctx.globalAlpha = pose.opacity;
  // A faint moving envelope and thin ribbons surround the blade, not a slash arc.
  ctx.fillStyle = '#8bdcff'; ctx.globalAlpha = pose.opacity * 0.13;
  ctx.beginPath();
  for (let u = 32; u <= 109; u += 3) {
    const v = Math.round(y - 6 + Math.sin(u / 11 + pose.castTime / 60) * 2);
    if (u === 32) ctx.moveTo(x + u, v); else ctx.lineTo(x + u, v);
  }
  for (let u = 109; u >= 32; u -= 3) ctx.lineTo(x + u, Math.round(y + 6 + Math.sin(u / 11 + pose.castTime / 60) * 2));
  ctx.closePath(); ctx.fill();
  ctx.globalAlpha = pose.opacity * 0.65; ctx.strokeStyle = '#c0efff'; ctx.lineWidth = 1;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    for (let u = 33; u <= 109; u += 2) {
      const v = Math.round(y + side * (3 + Math.sin(u / 10 - pose.castTime / 45) * 2));
      if (u === 33) ctx.moveTo(x + u, v); else ctx.lineTo(x + u, v);
    }
    ctx.stroke();
  }
  // Moving wisps link the casting palm to the floating hilt without physical contact.
  ctx.fillStyle = '#9ce4ff';
  for (let i = 0; i < 3; i++) {
    const p = (pose.castTime / 150 + i / 3) % 1;
    const px = pose.handBounds.right + 2 + (x + 24 - pose.handBounds.right - 2) * p;
    const py = pose.wrist.y + (y - pose.wrist.y) * p + Math.sin(p * Math.PI * 2) * 2;
    ctx.fillRect(Math.round(px), Math.round(py), 2, 1);
  }
  ctx.restore();
}

function renderRig(ctx: CanvasRenderingContext2D, milliseconds: number): void {
  const pose = sampleWindCast(milliseconds, repeating);
  ctx.imageSmoothingEnabled = false;
  rotated(ctx, images.upper, pose.shoulder, RIG.upper.mount, partAngle(pose.shoulder, pose.elbow, RIG.upper.mount, RIG.upper.end));
  ctx.drawImage(images.body, 0, 0);
  wind(ctx, pose);
  ctx.save(); ctx.globalAlpha = pose.opacity;
  ctx.drawImage(images.sword, Math.round(pose.sword.x), pose.sword.y - RIG.sword.axisY); ctx.restore();
  rotated(ctx, images.hand, pose.elbow, RIG.lower.mount, pose.lowerAngle);
  if (joints.checked && pose.opacity > 0) {
    ctx.strokeStyle = '#f6c774'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pose.handBounds.right, 23); ctx.lineTo(pose.sword.x, 23); ctx.stroke();
    ctx.font = '10px sans-serif'; ctx.fillStyle = '#f6c774'; ctx.fillText(`间距 ≥ ${RIG.minimumGap}px`, pose.handBounds.right - 15, 19);
  }
}
function resize(): void { for (const canvas of [rigCanvas, sceneCanvas]) { canvas.width = 256 * zoom; canvas.height = 160 * zoom; } }
function draw(): void {
  const plain = rigCanvas.getContext('2d')!;
  plain.setTransform(zoom, 0, 0, zoom, 0, 0); plain.clearRect(0, 0, 256, 160);
  plain.save(); plain.translate(43 - RIG.foot.x, 138 - RIG.foot.y); renderRig(plain, elapsed); plain.restore();
  const map = sceneCanvas.getContext('2d')!;
  map.setTransform(zoom, 0, 0, zoom, 0, 0); map.imageSmoothingEnabled = false;
  map.drawImage(images.map, 198, 112, 128, 80, 0, 0, 256, 160);
  map.fillStyle = '#06101680'; map.beginPath(); map.ellipse(88, 106, 9, 3, 0, 0, Math.PI * 2); map.fill();
  map.save(); map.translate(88, 106); map.scale(0.25, 0.25); map.translate(-RIG.foot.x, -RIG.foot.y); renderRig(map, elapsed); map.restore();
  const pose = sampleWindCast(elapsed, repeating); scrub.value = String(Math.round(pose.castTime));
  const message = `${playing ? repeating ? '循环检查' : '播放一次' : '暂停'} · ${labels[pose.phase]} · 480ms / 次 · 仅朝右`;
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
  await Promise.all([load(images.body, bodyUrl), load(images.upper, upperUrl), load(images.hand, handUrl), load(images.sword, swordUrl), load(images.map, mapUrl)]);
  const expected = [[images.body, 69, 94], [images.upper, 44, 25], [images.hand, 49, 25], [images.sword, 112, 18]] as const;
  if (expected.some(([image, width, height]) => image.naturalWidth !== width || image.naturalHeight !== height)) throw new Error('素材尺寸与动作配置不一致');
  for (const [label, url] of [['身体 · 沿用旧版', bodyUrl], ['上臂 · 沿用旧版', upperUrl], ['施法手 · 新', handUrl], ['缠风刀 · 新', swordUrl]]) {
    const figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption');
    img.src = url; img.alt = label; img.className = 'checker'; caption.textContent = label; figure.append(img, caption); el('layers').append(figure);
  }
  el('prompt').textContent = plan.args[plan.args.indexOf('--prompt') + 1];
  el<HTMLAnchorElement>('sheet').href = sheetUrl;
  for (const id of ['once', 'repeat', 'pause']) el<HTMLButtonElement>(id).disabled = false;
  el('once').onclick = () => { elapsed = 0; lastTime = null; repeating = false; playing = true; };
  el('repeat').onclick = () => { elapsed = 0; lastTime = null; repeating = true; playing = true; };
  el('pause').onclick = () => { playing = false; draw(); };
  scrub.oninput = () => { elapsed = Number(scrub.value); repeating = false; playing = false; draw(); };
  zoomSelect.onchange = () => { zoom = Number(zoomSelect.value); resize(); draw(); };
  speed.onchange = () => { lastTime = null; }; joints.onchange = draw;
  resize(); requestAnimationFrame(tick);
}
main().catch(error => { el('status').textContent = String(error); });
