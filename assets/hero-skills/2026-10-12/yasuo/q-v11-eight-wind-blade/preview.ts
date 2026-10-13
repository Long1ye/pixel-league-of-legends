import { DIRECTIONS, LABELS, RIG, headingForDirection, sampleLinkedThrust, type Direction } from '../q-v8-direction-picker/rig';
import { DirectionPlayer } from '../q-v8-direction-picker/player';
import { renderLinkedThrust, type RigImages } from '../q-v7-user-linked/render';
import { drawWeapon, VIEW, weaponFrame } from './weapon';
import upperUrl from '../q-v5-small-grip-wind-e/media/upper-arm.png?url';
import handUrl from '../q-v5-small-grip-wind-e/media/forearm-hand.png?url';

const bodyUrls = import.meta.glob('../q-v7-user-linked/media/user-*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const frameUrls = import.meta.glob('../q-v10-sword-wind-only/media/frames/frame-*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const savedClips = import.meta.glob('./export/q-*-wind.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const player = new DirectionPlayer();
const canvas = $<HTMLCanvasElement>('selected'), ctx = canvas.getContext('2d')!;
const overview = $<HTMLDetailsElement>('overview-panel');
const overviewCanvases = new Map<Direction, HTMLCanvasElement>();
let images: RigImages, frames: HTMLImageElement[], zoom = 1;
const load = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error(`素材加载失败：${url}`)); image.src = url;
});
function render(context: CanvasRenderingContext2D, direction: Direction, time: number, repeating: boolean, joints = false) {
  const pose = sampleLinkedThrust(headingForDirection(direction), time, true, repeating);
  context.save(); context.translate(VIEW.foot.x, VIEW.foot.y);
  renderLinkedThrust(context, pose, images, joints, (target, p) => drawWeapon(target, p, frames));
  context.restore(); return pose;
}
function draw() {
  ctx.setTransform(zoom, 0, 0, zoom, 0, 0); ctx.clearRect(0, 0, VIEW.width, VIEW.height);
  const pose = render(ctx, player.direction, player.elapsed, player.repeating, $<HTMLInputElement>('joints').checked);
  $<HTMLInputElement>('scrub').value = String(pose.castTime);
  $('time').textContent = `${Math.round(pose.castTime)} / 480ms`;
  const phases = { prepare: '蓄力', thrust: '戳刺', impact: '刺出停留', recover: '收刀', ready: '待机' };
  $('status').textContent = `${LABELS[player.direction]} · ${phases[pose.phase]} · 风帧 ${weaponFrame(pose.castTime) + 1}/56`;
  $('pause').textContent = player.playing ? '暂停' : '继续';
  if (overview.open) for (const [direction, cell] of overviewCanvases) {
    const context = cell.getContext('2d')!; context.clearRect(0, 0, VIEW.width, VIEW.height);
    render(context, direction, player.elapsed, player.repeating);
  }
}
function select(direction: Direction) {
  player.select(direction); $<HTMLSelectElement>('direction').value = direction;
  $('selected-name').textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`;
  canvas.setAttribute('aria-label', `${LABELS[direction]}方向的亚索 Q 风缠刀动画`);
  document.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === direction)));
  const download = $<HTMLAnchorElement>('download'), url = savedClips[`./export/q-${direction}-wind.webp`];
  download.hidden = !url; if (url) { download.href = url; download.download = `yasuo-q-${direction}-wind.webp`; }
  draw();
}
function exportFrames() {
  const links = $('exports'); links.replaceChildren();
  for (const direction of DIRECTIONS) {
    const sheet = document.createElement('canvas'); sheet.width = VIEW.width * 4; sheet.height = VIEW.height * 8;
    const context = sheet.getContext('2d')!;
    for (let i = 0; i < 31; i++) {
      context.save(); context.translate((i % 4) * VIEW.width, Math.floor(i / 4) * VIEW.height);
      render(context, direction, i * 16, false); context.restore();
    }
    const link = document.createElement('a'); link.textContent = `${LABELS[direction]}帧图`;
    link.href = sheet.toDataURL('image/png'); link.download = `q-${direction}-wind-atlas.png`; link.dataset.export = direction; links.append(link);
  }
  $('export-status').textContent = '八向帧图已准备好 · 每向 31 帧 · 16ms 采样';
}
async function main() {
  for (const direction of DIRECTIONS) {
    $<HTMLSelectElement>('direction').add(new Option(LABELS[direction], direction));
    const figure = document.createElement('figure'), cell = document.createElement('canvas'), label = document.createElement('figcaption');
    cell.width = VIEW.width; cell.height = VIEW.height; cell.setAttribute('aria-label', `${LABELS[direction]}同步动画`);
    label.textContent = `${LABELS[direction]} · ${direction.toUpperCase()}`;
    figure.append(label, cell); $('overview').append(figure); overviewCanvases.set(direction, cell);
  }
  const bodies = Object.fromEntries(await Promise.all(DIRECTIONS.map(async direction => [direction, await load(bodyUrls[`../q-v7-user-linked/media/user-${direction}.png`])])) ) as Record<Direction, HTMLImageElement>;
  frames = await Promise.all(Object.entries(frameUrls).sort(([a], [b]) => a.localeCompare(b)).map(([, url]) => load(url)));
  if (frames.length !== 56 || frames.some(frame => frame.width !== 213 || frame.height !== 213)) throw new Error('风缠刀帧不完整');
  images = { bodies, upper: await load(upperUrl), hand: await load(handUrl), sword: frames[0] };
  document.querySelectorAll<HTMLButtonElement | HTMLSelectElement | HTMLInputElement>('button,select,input').forEach(control => { control.disabled = false; });
  document.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(button => button.onclick = () => select(button.dataset.direction as Direction));
  $<HTMLSelectElement>('direction').onchange = event => select((event.target as HTMLSelectElement).value as Direction);
  $<HTMLSelectElement>('speed').onchange = event => player.setSpeed(Number((event.target as HTMLSelectElement).value));
  $<HTMLSelectElement>('zoom').onchange = event => { zoom = Number((event.target as HTMLSelectElement).value); canvas.width = VIEW.width * zoom; canvas.height = VIEW.height * zoom; draw(); };
  $('once').onclick = () => { player.start(false); draw(); };
  $('loop').onclick = () => { player.start(true); draw(); };
  $('pause').onclick = () => { player.togglePause(); draw(); };
  $<HTMLInputElement>('scrub').oninput = event => { player.seek(Number((event.target as HTMLInputElement).value)); draw(); };
  $('joints').onchange = draw; overview.ontoggle = draw; $('export').onclick = exportFrames;
  select('e');
  // Establish the clock from RAF itself: its first timestamp may precede performance.now().
  let previous: number | undefined;
  function tick(now: number) { player.advance(previous === undefined ? 0 : Math.max(0, now - previous)); previous = now; draw(); requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
}
main().catch(error => { $('status').textContent = String(error); console.error(error); });
