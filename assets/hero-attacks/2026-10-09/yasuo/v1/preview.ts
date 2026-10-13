import study from './study.json';
import { attackSample } from './timing';
const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const attack = $<HTMLCanvasElement>('#attack'), source = $<HTMLCanvasElement>('#source');
const once = $<HTMLButtonElement>('#once'), play = $<HTMLButtonElement>('#play');
const previous = $<HTMLButtonElement>('#previous'), next = $<HTMLButtonElement>('#next');
const loop = $<HTMLInputElement>('#loop'), rate = $<HTMLSelectElement>('#rate');
const status = $<HTMLOutputElement>('#status');
const url = (path: string) => new URL(path, import.meta.url).href;
const load = async (path: string) => { const image = new Image(); image.src = url(path); await image.decode(); return image; };
let elapsed = 0, last: number | null = null, playing = true, displayedFrame = 0, ready = false;
let sheet: HTMLImageElement, original: HTMLImageElement;
function configure(canvas: HTMLCanvasElement, width: number, height: number, anchor: number[]): void {
  canvas.width = width; canvas.height = height; canvas.style.width = `${width * 3}px`; canvas.style.height = `${height * 3}px`;
  canvas.style.left = `${276 - anchor[0] * 3}px`; canvas.style.top = `${447 - anchor[1] * 3}px`;
}
function draw(frame: number): void {
  displayedFrame = frame;
  const ctx = attack.getContext('2d')!; ctx.imageSmoothingEnabled = false; ctx.clearRect(0, 0, attack.width, attack.height);
  if (frame < 0) ctx.drawImage(original, study.source_offset[0], study.source_offset[1]);
  else ctx.drawImage(sheet, frame % study.columns * study.width, Math.floor(frame / study.columns) * study.height,
    study.width, study.height, 0, 0, study.width, study.height);
  status.value = frame < 0 ? '待机 / 本次挥刀结束' : `普攻 帧 ${frame + 1}/${study.frame_count}`;
  document.querySelectorAll<HTMLElement>('[data-frame]').forEach(card => card.classList.toggle('selected', Number(card.dataset.frame) === frame));
}
function selectFrame(frame: number): void {
  playing = false; play.textContent = '继续'; elapsed = study.durations_ms.slice(0, frame).reduce((sum, n) => sum + n, 0); draw(frame);
}
function links(): void {
  const downloads = $<HTMLDivElement>('#downloads');
  for (const [label, path] of [['WebP动画', study.webp], ['GIF动画', study.gif], ['PNG图集', study.sheet]]) {
    const a = document.createElement('a'); a.href = url(path); a.textContent = label; a.download = `yasuo-basic-attack-se.${path.split('.').at(-1)}`; downloads.append(a);
  }
  for (const [label, path] of [['WebP · 2× / 原文件循环播放', study.webp], ['GIF · 2× / 原文件循环播放', study.gif]]) {
    const figure = document.createElement('figure'), image = new Image(), caption = document.createElement('figcaption');
    image.src = url(path); image.width = study.width * 2; image.height = study.height * 2; image.className = 'pixel'; image.alt = label;
    caption.textContent = label; figure.append(image, caption); $<HTMLDivElement>('#originals').append(figure);
  }
}
async function init(): Promise<void> {
  [sheet, original] = await Promise.all([load(study.sheet), load(study.source)]);
  if (sheet.naturalWidth !== study.width * study.columns || sheet.naturalHeight !== study.height * study.rows) throw new Error('Unexpected sheet dimensions');
  configure(attack, study.width, study.height, study.anchor); configure(source, original.naturalWidth, original.naturalHeight, study.source_anchor);
  source.getContext('2d')!.drawImage(original, 0, 0);
  const frames = $<HTMLElement>('#frames');
  for (let frame = 0; frame < study.frame_count; frame++) {
    const card = document.createElement('article'), canvas = document.createElement('canvas'), button = document.createElement('button');
    card.className = 'frame'; card.dataset.frame = String(frame); canvas.className = 'pixel'; canvas.width = study.width; canvas.height = study.height;
    canvas.style.width = `${study.width * 2}px`; canvas.style.height = `${study.height * 2}px`;
    canvas.getContext('2d')!.drawImage(sheet, frame % study.columns * study.width, Math.floor(frame / study.columns) * study.height,
      study.width, study.height, 0, 0, study.width, study.height);
    button.textContent = `查看第 ${frame + 1} 帧`; button.addEventListener('click', () => selectFrame(frame)); card.append(button, canvas); frames.append(card);
  }
  links(); $<HTMLElement>('#facts').textContent = `${study.width}×${study.height} / 帧 · ${study.frame_count}帧 · ${study.duration_ms / 1000}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮消耗 ${study.credits_consumed} 积分（起手姿势15 + 动画45）。未生成盖伦、其他方向、暴击或Q动画。`;
  ready = true; for (const button of [once, play, previous, next]) button.disabled = false; draw(0);
}
once.addEventListener('click', () => { loop.checked = false; elapsed = 0; playing = true; play.textContent = '暂停'; draw(0); });
play.addEventListener('click', () => { if (!playing && displayedFrame < 0 && !loop.checked) elapsed = 0; playing = !playing; play.textContent = playing ? '暂停' : '继续'; });
previous.addEventListener('click', () => selectFrame((Math.max(0, displayedFrame) + study.frame_count - 1) % study.frame_count));
next.addEventListener('click', () => selectFrame((displayedFrame + 1) % study.frame_count));
loop.addEventListener('change', () => { elapsed = 0; playing = true; play.textContent = '暂停'; draw(0); });
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  const checker = $<HTMLElement>('#attack-stage').classList.toggle('checker'); $<HTMLElement>('#source-stage').classList.toggle('checker', checker);
  (event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed', String(checker));
});
function tick(time: number): void {
  if (ready && playing && last !== null) {
    elapsed += Math.min(time - last, 100) * Number(rate.value);
    const sample = attackSample(elapsed, study.durations_ms, loop.checked); draw(sample.frame);
    if (!sample.active && !loop.checked) { playing = false; play.textContent = '继续'; }
  }
  last = time; requestAnimationFrame(tick);
}
void init().catch(() => { status.value = '素材加载失败'; }); requestAnimationFrame(tick);
