import { DIRECTIONS } from '../q-v7-user-linked/rig';
import type { RigImages } from '../q-v7-user-linked/render';
import { drawHero, drawScene } from './render';
import { phaseLabel, TIMING, VIEW } from './motion';
import bodyUrl from '../q-v7-user-linked/media/user-e.png?url';
import upperUrl from '../q-v5-small-grip-wind-e/media/upper-arm.png?url';
import handUrl from '../q-v5-small-grip-wind-e/media/forearm-hand.png?url';
import swordUrl from '../q-v5-small-grip-wind-e/media/wind-sword.png?url';
import clipUrl from './export/yasuo-w-east.webp?url';

const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = element<HTMLCanvasElement>('scene'), context = canvas.getContext('2d')!;
canvas.width = VIEW.width; canvas.height = VIEW.height;
canvas.style.width = `${VIEW.width * 2}px`; canvas.style.height = `${VIEW.height * 2}px`;
const scrub = element<HTMLInputElement>('scrub'), pause = element<HTMLButtonElement>('pause');
const loop = element<HTMLInputElement>('loop'), speed = element<HTMLSelectElement>('speed');
const linked = element<HTMLInputElement>('linked'), joints = element<HTMLInputElement>('joints');
function load(url: string): Promise<HTMLImageElement> { return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error(`无法加载 ${url}`)); img.src = url; }); }
async function start() {
  const clipLink = document.createElement('a'); clipLink.href = clipUrl; clipLink.download = 'yasuo-w-east.webp'; clipLink.textContent = '下载透明人物动画 WebP';
  element('export').parentElement!.append(clipLink);
  const [body, upper, hand, sword] = await Promise.all([bodyUrl, upperUrl, handUrl, swordUrl].map(load));
  const images: RigImages = { bodies: Object.fromEntries(DIRECTIONS.map(d => [d, body])) as RigImages['bodies'], upper, hand, sword };
  let time = 0, playing = true, previous: number | undefined;
  const paint = () => { drawScene(context, time, images, linked.checked, joints.checked); scrub.value = String(Math.round(time)); element('phase').textContent = phaseLabel(time); element('time').textContent = `${Math.round(time)} / 2700ms`; pause.textContent = playing ? '暂停' : '继续'; };
  function tick(now: number) {
    const delta = previous === undefined ? 0 : Math.max(0, now - previous); previous = now;
    if (playing) { time += delta * Number(speed.value); if (time >= TIMING.period) { if (loop.checked) time %= TIMING.period; else { time = TIMING.period; playing = false; } } }
    paint(); requestAnimationFrame(tick);
  }
  pause.onclick = () => { playing = !playing; };
  element('replay').onclick = () => { time = 0; playing = true; loop.checked = false; };
  scrub.oninput = () => { time = Number(scrub.value); playing = false; paint(); };
  document.querySelectorAll<HTMLButtonElement>('[data-time]').forEach(button => { button.onclick = () => { time = Number(button.dataset.time); playing = false; paint(); }; });
  const strip = element<HTMLCanvasElement>('contact'), stripContext = strip.getContext('2d')!;
  stripContext.imageSmoothingEnabled = false;
  [0, 130, 190, 280, 560].forEach((t, i) => { stripContext.save(); stripContext.fillStyle = i % 2 ? '#16262d' : '#1b2d35'; stripContext.fillRect(i * 192, 0, 192, 160); stripContext.translate(i * 192 + 50, 128); drawHero(stripContext, t, images); stripContext.restore(); stripContext.fillStyle = '#a3c3cc'; stripContext.font = '11px monospace'; stripContext.fillText(`${t}ms`, i * 192 + 9, 150); });
  element('export').onclick = () => {
    const columns = 8, count = 29, cellW = 224, cellH = 160;
    const atlas = document.createElement('canvas'); atlas.width = columns * cellW; atlas.height = Math.ceil(count / columns) * cellH;
    const atlasContext = atlas.getContext('2d')!; atlasContext.imageSmoothingEnabled = false;
    for (let i = 0; i < count; i++) { atlasContext.save(); atlasContext.translate(i % columns * cellW + 64, Math.floor(i / columns) * cellH + 128); drawHero(atlasContext, i * 20, images); atlasContext.restore(); }
    const anchor = document.createElement('a'); anchor.href = atlas.toDataURL('image/png'); anchor.download = 'yasuo-w-east-atlas.png'; anchor.textContent = '下载人物序列 PNG（29 帧）';
    const contact = document.createElement('a'); contact.href = strip.toDataURL('image/png'); contact.download = 'yasuo-w-east-poses.png'; contact.textContent = '下载关键姿态图';
    element('exports').replaceChildren(anchor, contact); element('export-status').textContent = '已生成 · 224×160 / 帧 · 20ms / 帧 · 透明底';
  };
  paint(); requestAnimationFrame(tick);
}
start().catch(error => { element('phase').textContent = String(error); });
