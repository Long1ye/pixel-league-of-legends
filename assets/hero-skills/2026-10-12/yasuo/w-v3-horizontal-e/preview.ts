import data from './animation.json';
import plan from './motion.plan.json';
import atlasUrl from './media/w-cast-e-atlas.png?url';
import clipUrl from './media/w-cast-e.webp?url';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('animation'), ctx = canvas.getContext('2d')!;
const scrub = $<HTMLInputElement>('scrub');
const sprite = new Image();
let elapsed = 0, playing = true, looping = false, speed = 1, previous: number | undefined;
canvas.width = data.width; canvas.height = data.height;
function zoom(value: number) { canvas.style.width = `${data.width * value}px`; canvas.style.height = `${data.height * value}px`; }
zoom(2); scrub.max = String(data.count - 1);
$<HTMLAnchorElement>('download').href = clipUrl;
$<HTMLAnchorElement>('atlas').href = atlasUrl;
$('prompt').textContent = plan.args[plan.args.indexOf('--prompt') + 1];
$('settings').textContent = `自动优化提示词：开启 · 像素动画 · ${data.count} 帧 · ${data.width}×${data.height} · 原始时长 ${data.totalDuration}ms`;
const frameStart = (index: number) => data.durations.slice(0, index).reduce((a, b) => a + b, 0);
function frameAt(time: number) {
  let end = 0;
  for (let i = 0; i < data.count; i++) { end += data.durations[i]; if (time < end) return i; }
  return data.count - 1;
}
function drawFrame(context: CanvasRenderingContext2D, frame: number) {
  context.imageSmoothingEnabled = false; context.clearRect(0, 0, data.width, data.height);
  context.drawImage(sprite, frame % data.columns * data.width, Math.floor(frame / data.columns) * data.height, data.width, data.height, 0, 0, data.width, data.height);
}
function paint() {
  const frame = frameAt(elapsed); drawFrame(ctx, frame); scrub.value = String(frame);
  $('status').textContent = `${playing ? '播放中' : '已暂停'} · 第 ${frame + 1} / ${data.count} 帧`;
  $('time').textContent = `${Math.round(elapsed)} / ${data.totalDuration}ms`;
  $('pause').textContent = playing ? '暂停' : '继续';
}
sprite.onload = () => {
  $('once').onclick = () => { elapsed = 0; playing = true; looping = false; };
  $('loop').onclick = () => { elapsed = 0; playing = true; looping = true; };
  $('pause').onclick = () => { playing = !playing; if (playing && elapsed >= data.totalDuration) elapsed = 0; };
  $<HTMLSelectElement>('speed').onchange = e => { speed = Number((e.target as HTMLSelectElement).value); };
  $<HTMLSelectElement>('zoom').onchange = e => zoom(Number((e.target as HTMLSelectElement).value));
  scrub.oninput = () => { elapsed = frameStart(Number(scrub.value)); playing = false; paint(); };
  for (let i = 0; i < data.count; i++) {
    const figure = document.createElement('figure'), cell = document.createElement('canvas'), caption = document.createElement('figcaption');
    cell.width = data.width; cell.height = data.height; drawFrame(cell.getContext('2d')!, i);
    caption.textContent = `${i + 1} / ${data.count} · ${frameStart(i)}ms`;
    figure.append(cell, caption); $('frames').append(figure);
  }
  function tick(now: number) {
    const delta = previous === undefined ? 0 : Math.max(0, now - previous); previous = now;
    if (playing) { elapsed += delta * speed; if (elapsed >= data.totalDuration) { if (looping) elapsed %= data.totalDuration; else { elapsed = data.totalDuration; playing = false; } } }
    paint(); requestAnimationFrame(tick);
  }
  paint(); requestAnimationFrame(tick);
};
sprite.onerror = () => { $('status').textContent = '动画素材加载失败，请刷新重试。'; };
sprite.src = atlasUrl;
