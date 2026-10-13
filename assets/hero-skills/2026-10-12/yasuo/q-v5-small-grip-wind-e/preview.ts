import plan from './parts.plan.json';
import bodyUrl from './media/body.png?url';
import upperUrl from './media/upper-arm.png?url';
import handUrl from './media/forearm-hand.png?url';
import swordUrl from './media/wind-sword.png?url';
import sheetUrl from './media/parts-sheet.png?url';
import mapUrl from '../../../../map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';
import { RIG, partAngle, sampleGripThrust, windRibbon, type Point } from './rig';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const rigCanvas = el<HTMLCanvasElement>('rig'), sceneCanvas = el<HTMLCanvasElement>('scene');
const scrub = el<HTMLInputElement>('scrub'), zoomSelect = el<HTMLSelectElement>('zoom');
const speed = el<HTMLSelectElement>('speed'), joints = el<HTMLInputElement>('joints');
const images = { body: new Image(), upper: new Image(), hand: new Image(), sword: new Image(), map: new Image() };
let elapsed = 0, lastTime: number | null = null, playing = true, repeating = true, zoom = 1;
const labels = { prepare: '收刀聚风', thrust: '握刀刺出', impact: '刺出到位', recover: '收刀复位', ready: '准备姿态' };

function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url; });
}
function rotated(ctx: CanvasRenderingContext2D, image: HTMLImageElement, joint: Point, mount: Point, angle: number): void {
  ctx.save(); ctx.translate(joint.x, joint.y); ctx.rotate(angle); ctx.drawImage(image, -mount.x, -mount.y); ctx.restore();
}
function wind(ctx: CanvasRenderingContext2D, pose: ReturnType<typeof sampleGripThrust>, front: boolean): void {
  if (pose.wind <= 0) return;
  ctx.save(); ctx.translate(pose.swordOrigin.x, pose.swordOrigin.y);
  if (!front) {
    // A thin pale-blue sheath of air around the metal, not a broad slash/glow arc.
    ctx.fillStyle = '#82d5f5'; ctx.globalAlpha = pose.wind * 0.16;
    for (let x = RIG.sword.bladeStart; x <= RIG.sword.tip.x; x++) {
      const radius = Math.max(1, Math.round(5 * Math.min(1, (x - 34) / 12, (113 - x) / 12)));
      ctx.fillRect(x, RIG.sword.grip.y - radius, 1, radius * 2 + 1);
    }
  }
  for (const strand of [0, 1] as const) {
    ctx.fillStyle = front ? '#c3eeff' : '#73badb'; ctx.globalAlpha = pose.wind * (front ? 0.75 : 0.45);
    for (const point of windRibbon(pose.castTime, strand)) {
      if (point.front === front) ctx.fillRect(point.x, point.y, 1, 1);
    }
  }
  ctx.restore();
}
function renderRig(ctx: CanvasRenderingContext2D, milliseconds: number): void {
  const pose = sampleGripThrust(milliseconds, repeating);
  ctx.imageSmoothingEnabled = false;
  rotated(ctx, images.upper, pose.shoulder, RIG.upper.mount, partAngle(pose.shoulder, pose.elbow, RIG.upper.mount, RIG.upper.end));
  ctx.drawImage(images.body, 0, 0);
  wind(ctx, pose, false);
  ctx.drawImage(images.sword, pose.swordOrigin.x, pose.swordOrigin.y);
  wind(ctx, pose, true);
  // The closed fist is above the hilt in draw order and shares the same attachment.
  rotated(ctx, images.hand, pose.elbow, RIG.lower.mount, partAngle(pose.elbow, pose.wrist, RIG.lower.mount, RIG.lower.end));
  if (joints.checked) {
    ctx.strokeStyle = '#f6c774'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pose.shoulder.x, pose.shoulder.y); ctx.lineTo(pose.elbow.x, pose.elbow.y); ctx.lineTo(pose.wrist.x, pose.wrist.y); ctx.stroke();
    ctx.fillStyle = '#f6c774'; ctx.fillRect(Math.round(pose.wrist.x) - 1, Math.round(pose.wrist.y) - 1, 3, 3);
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
  const pose = sampleGripThrust(elapsed, repeating); scrub.value = String(Math.round(pose.castTime));
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
  const expected = [[images.body, 69, 94], [images.upper, RIG.upper.width, RIG.upper.height], [images.hand, RIG.lower.width, RIG.lower.height], [images.sword, RIG.sword.width, RIG.sword.height]] as const;
  if (expected.some(([image, width, height]) => image.naturalWidth !== width || image.naturalHeight !== height)) throw new Error('素材尺寸与动作配置不一致');
  for (const [label, url] of [['身体 · 沿用旧版', bodyUrl], ['较小上臂 · 35×20', upperUrl], ['握刀前臂与手 · 34×16', handUrl], ['缠风刀 · 114×22', swordUrl]]) {
    const figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption');
    img.src = url; img.alt = label; img.className = 'checker'; caption.textContent = label; figure.append(img, caption); el('layers').append(figure);
  }
  el('prompt').textContent = plan.args[plan.args.indexOf('--prompt') + 1]; el<HTMLAnchorElement>('sheet').href = sheetUrl;
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
