import eUrl from '../q-v7-user-linked/media/user-e.png?url';
import seUrl from '../q-v7-user-linked/media/user-se.png?url';
import sUrl from '../q-v7-user-linked/media/user-s.png?url';
import swUrl from '../q-v7-user-linked/media/user-sw.png?url';
import wUrl from '../q-v7-user-linked/media/user-w.png?url';
import nwUrl from '../q-v7-user-linked/media/user-nw.png?url';
import nUrl from '../q-v7-user-linked/media/user-n.png?url';
import neUrl from '../q-v7-user-linked/media/user-ne.png?url';
import eClip from './export/q-e-linked.webp?url';
import seClip from './export/q-se-linked.webp?url';
import sClip from './export/q-s-linked.webp?url';
import swClip from './export/q-sw-linked.webp?url';
import wClip from './export/q-w-linked.webp?url';
import nwClip from './export/q-nw-linked.webp?url';
import nClip from './export/q-n-linked.webp?url';
import neClip from './export/q-ne-linked.webp?url';
import fixedAtlasUrl from './export/yasuo-q-v8-fixed-atlas.png?url';
import upperUrl from '../q-v5-small-grip-wind-e/media/upper-arm.png?url';
import handUrl from '../q-v5-small-grip-wind-e/media/forearm-hand.png?url';
import swordUrl from '../q-v5-small-grip-wind-e/media/wind-sword.png?url';
import { DIRECTIONS, LABELS, headingForDirection, sampleLinkedThrust, type Direction } from './rig';
import { renderLinkedThrust, type RigImages } from '../q-v7-user-linked/render';
import { DirectionPlayer } from './player';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = el<HTMLCanvasElement>('selected'), ctx = canvas.getContext('2d')!;
const directionSelect = el<HTMLSelectElement>('direction'), zoomSelect = el<HTMLSelectElement>('zoom');
const speedSelect = el<HTMLSelectElement>('speed'), scrub = el<HTMLInputElement>('scrub'), joints = el<HTMLInputElement>('joints');
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-direction]')];
const urls: Record<Direction, string> = { e: eUrl, se: seUrl, s: sUrl, sw: swUrl, w: wUrl, nw: nwUrl, n: nUrl, ne: neUrl };
const clips: Record<Direction, string> = { e: eClip, se: seClip, s: sClip, sw: swClip, w: wClip, nw: nwClip, n: nClip, ne: neClip };
const bodies = Object.fromEntries(DIRECTIONS.map(d => [d, new Image()])) as Record<Direction, HTMLImageElement>;
const images: RigImages = { bodies, upper: new Image(), hand: new Image(), sword: new Image() };
const player = new DirectionPlayer();
const phases = { prepare: '腰肩蓄力', thrust: '戳刺出刀', impact: '刺出到位', recover: '收刀复位', ready: '准备姿态' };
let zoom = 2, lastTime: number | null = null, lastStatus = '';

function load(image: HTMLImageElement, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(); image.onerror = () => reject(new Error('素材加载失败，请刷新页面重试')); image.src = url;
  });
}

function syncSelection(): void {
  directionSelect.value = player.direction;
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.direction === player.direction));
  el('selected-name').textContent = `${LABELS[player.direction]} · ${player.direction.toUpperCase()}`;
  canvas.setAttribute('aria-label', `${LABELS[player.direction]}方向的亚索 Q 动画`);
  const download = el<HTMLAnchorElement>('download');
  download.href = clips[player.direction]; download.download = `yasuo-q-${player.direction}-linked.webp`;
  download.textContent = `下载${LABELS[player.direction]}方向 WebP`; download.hidden = false;
}

function draw(): void {
  const pose = sampleLinkedThrust(headingForDirection(player.direction), player.elapsed, true, player.repeating);
  ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.clearRect(0, 0, 288, 256);
  ctx.save(); ctx.translate(144, 158); renderLinkedThrust(ctx, pose, images, joints.checked); ctx.restore();
  scrub.value = String(Math.round(pose.castTime)); el('time').textContent = `${Math.round(pose.castTime)} / 480ms`;
  const mode = player.playing ? player.repeating ? '循环播放' : '单次播放' : '已暂停';
  const status = `${LABELS[player.direction]} ${headingForDirection(player.direction)}° · ${mode} · ${phases[pose.phase]}`;
  if (status !== lastStatus) { el('status').textContent = status; lastStatus = status; }
  el('pause').textContent = player.playing ? '暂停' : '继续';
  el('loop').setAttribute('aria-pressed', String(player.repeating));
}

function select(direction: Direction): void {
  player.select(direction); lastTime = null; syncSelection(); draw();
}

function resize(): void {
  canvas.width = 288 * zoom; canvas.height = 256 * zoom;
  canvas.closest('.viewport')!.scrollLeft = 0; draw();
}

function tick(now: number): void {
  if (lastTime !== null) player.advance(now - lastTime);
  lastTime = now; draw(); requestAnimationFrame(tick);
}

async function main(): Promise<void> {
  for (const direction of DIRECTIONS) {
    const option = document.createElement('option'); option.value = direction;
    option.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`; directionSelect.append(option);
    const figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption');
    img.src = clips[direction]; img.alt = `${LABELS[direction]}的已导出 Q 循环动画`; img.width = 288; img.height = 256;
    caption.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`;
    const button = document.createElement('button'); button.textContent = `选择${LABELS[direction]}方向`;
    button.disabled = true; button.dataset.direction = direction;
    button.onclick = () => { select(direction); el('selected-name').scrollIntoView({ block: 'start', behavior: 'smooth' }); };
    figure.append(img, caption, button); el('overview').append(figure);
    buttons.push(button);
  }
  await Promise.all([...DIRECTIONS.map(d => load(bodies[d], urls[d])), load(images.upper, upperUrl), load(images.hand, handUrl), load(images.sword, swordUrl)]);
  for (const direction of DIRECTIONS) if (bodies[direction].naturalWidth !== 128 || bodies[direction].naturalHeight !== 128) throw new Error(`方向素材尺寸错误：${direction}`);
  for (const button of buttons) { button.disabled = false; if (!button.onclick) button.onclick = () => select(button.dataset.direction as Direction); }
  for (const control of [directionSelect, zoomSelect, speedSelect, scrub, joints, el<HTMLButtonElement>('once'), el<HTMLButtonElement>('loop'), el<HTMLButtonElement>('pause')]) control.disabled = false;
  directionSelect.onchange = () => select(directionSelect.value as Direction);
  el('once').onclick = () => { player.start(false); lastTime = null; draw(); };
  el('loop').onclick = () => { player.start(true); lastTime = null; draw(); };
  el('pause').onclick = () => { player.togglePause(); lastTime = null; draw(); };
  speedSelect.onchange = () => { player.setSpeed(Number(speedSelect.value)); lastTime = null; };
  zoomSelect.onchange = () => { zoom = Number(zoomSelect.value); resize(); };
  scrub.oninput = () => { player.seek(Number(scrub.value)); lastTime = null; draw(); };
  joints.onchange = draw;
  const existingFrames = el<HTMLAnchorElement>('fixed-frames'); existingFrames.href = fixedAtlasUrl; existingFrames.hidden = false;
  el<HTMLButtonElement>('export-fix').disabled = false;
  el('export-fix').onclick = () => {
    const atlas = document.createElement('canvas'); atlas.width = 1152; atlas.height = 8192;
    const context = atlas.getContext('2d')!; context.imageSmoothingEnabled = false;
    for (const [directionIndex, direction] of DIRECTIONS.entries()) {
      for (let frameIndex = 0; frameIndex < 16; frameIndex++) {
        context.save(); context.translate(frameIndex % 4 * 288 + 144, (directionIndex * 4 + Math.floor(frameIndex / 4)) * 256 + 158);
        renderLinkedThrust(context, sampleLinkedThrust(headingForDirection(direction), frameIndex * 32), images);
        context.restore();
      }
    }
    const link = el<HTMLAnchorElement>('fixed-frames'); link.href = atlas.toDataURL('image/png'); link.hidden = false;
  };
  if (window.matchMedia('(max-width: 700px)').matches) { zoom = 1; zoomSelect.value = '1'; }
  syncSelection(); resize(); requestAnimationFrame(tick);
}

main().catch(error => { player.playing = false; el('status').textContent = String(error); });
