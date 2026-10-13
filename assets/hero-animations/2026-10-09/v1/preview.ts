import study from './study.json';
import { frameAt } from './timing';

type Clip = typeof study.heroes[number]['clips'][number];
type State = 'idle' | 'walk';
const states: readonly State[] = ['idle', 'walk'];
const play = document.querySelector<HTMLButtonElement>('#play')!;
const previous = document.querySelector<HTMLButtonElement>('#previous')!;
const next = document.querySelector<HTMLButtonElement>('#next')!;
const rateInput = document.querySelector<HTMLSelectElement>('#rate')!;
const status = document.querySelector<HTMLOutputElement>('#frame-status')!;
const canvases = Object.fromEntries(states.map(state => [state,
  document.querySelector<HTMLCanvasElement>(`#${state}-canvas`)!,
])) as Record<State, HTMLCanvasElement>;
const images = new Map<string, Promise<HTMLImageElement>>();
let hero = study.heroes[0];
let sheets: Partial<Record<State, HTMLImageElement>> = {};
let ready = false;
let playing = true;
let rate = 1;
let elapsed = 0;
let lastTime: number | null = null;
let displayedFrame = 0;
let selection = 0;

function url(path: string): string { return new URL(path, import.meta.url).href; }
function clipFor(state: State): Clip { return hero.clips.find(clip => clip.state === state)!; }
function loadImage(path: string): Promise<HTMLImageElement> {
  let pending = images.get(path);
  if (!pending) {
    const image = new Image(); image.src = url(path);
    pending = image.decode().then(() => image);
    images.set(path, pending);
  }
  return pending;
}

function downloadLinks(clip: Clip): HTMLAnchorElement[] {
  return [['WebP', clip.webp], ['GIF', clip.gif], ['PNG图集', clip.sheet]].map(([label, path]) => {
    const a = document.createElement('a'); a.href = url(path); a.textContent = label;
    a.download = `${hero.id}-${clip.state}-se.${path.split('.').at(-1)}`;
    return a;
  });
}

async function selectHero(id: string): Promise<void> {
  hero = study.heroes.find(item => item.id === id)!;
  const token = ++selection;
  ready = false; elapsed = 0; displayedFrame = 0;
  status.value = '加载中…';
  for (const button of [play, previous, next]) button.disabled = true;
  for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-hero]')) {
    button.setAttribute('aria-pressed', String(button.dataset.hero === id));
  }
  document.querySelector('#hero-notes')!.textContent = `${hero.name}：${hero.notes}`;
  for (const state of states) {
    const clip = clipFor(state), canvas = canvases[state], scale = hero.preview_scale;
    canvas.width = clip.width; canvas.height = clip.height;
    canvas.style.width = `${clip.width * scale}px`; canvas.style.height = `${clip.height * scale}px`;
    canvas.style.left = `${276 - hero.anchor[0] * scale}px`;
    canvas.style.top = `${369 - hero.anchor[1] * scale}px`;
    canvas.setAttribute('aria-label', `${hero.name}${clip.name}动画`);
    document.querySelector(`#${state}-title`)!.textContent = `${hero.name} · ${clip.name}`;
    document.querySelector(`#${state}-info`)!.textContent = `${clip.width}×${clip.height} / 帧 · ${clip.frame_count}帧 · ${clip.duration_ms / 1000}秒循环 · ${scale}×整数放大`;
    document.querySelector(`#${state}-downloads`)!.replaceChildren(...downloadLinks(clip));
  }
  try {
    const loaded = await Promise.all(states.map(state => loadImage(clipFor(state).sheet)));
    if (token !== selection) return;
    for (let i = 0; i < states.length; i++) {
      const clip = clipFor(states[i]), image = loaded[i];
      if (image.naturalWidth !== clip.columns * clip.width || image.naturalHeight !== clip.rows * clip.height) {
        throw new Error('Unexpected spritesheet dimensions');
      }
      sheets[states[i]] = image;
    }
    ready = true;
    for (const button of [play, previous, next]) button.disabled = false;
    draw(0);
  } catch (error) {
    if (token !== selection) return;
    status.value = '加载失败，请刷新预览';
    console.error(error);
  }
}

function draw(frame: number): void {
  if (!ready) return;
  displayedFrame = frame;
  for (const state of states) {
    const clip = clipFor(state), canvas = canvases[state], context = canvas.getContext('2d')!;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sheets[state]!, (frame % clip.columns) * clip.width,
      Math.floor(frame / clip.columns) * clip.height, clip.width, clip.height,
      0, 0, clip.width, clip.height);
    canvas.dataset.frame = String(frame + 1);
  }
  status.value = `${playing ? '播放' : '暂停'} · 帧 ${frame + 1}/8 · ${rate}×`;
}

function tick(now: number): void {
  if (lastTime !== null && playing && ready) elapsed += now - lastTime;
  lastTime = now;
  if (ready) draw(frameAt(elapsed, clipFor('idle').durations_ms, rate));
  requestAnimationFrame(tick);
}

function step(offset: number): void {
  playing = false; play.textContent = '播放';
  const clip = clipFor('idle');
  const frame = (displayedFrame + offset + clip.frame_count) % clip.frame_count;
  elapsed = clip.durations_ms.slice(0, frame).reduce((sum, duration) => sum + duration, 0) / rate;
  draw(frame);
}

function renderOriginals(): void {
  const grid = document.querySelector('#original-grid')!;
  for (const entry of study.heroes) {
    for (const clip of entry.clips) {
      const card = document.createElement('section'); card.className = 'original-card';
      const title = document.createElement('h2'); title.textContent = `${entry.name} · ${clip.name}`;
      const pair = document.createElement('div'); pair.className = 'raw-pair';
      for (const format of ['webp', 'gif'] as const) {
        const figure = document.createElement('figure');
        const img = document.createElement('img'); img.src = url(clip[format]);
        img.width = clip.width; img.height = clip.height;
        img.alt = `${entry.name}${clip.name} ${format.toUpperCase()}原始循环`;
        const caption = document.createElement('figcaption');
        const link = document.createElement('a'); link.href = img.src; link.textContent = `${format.toUpperCase()} 原速`;
        caption.append(link); figure.append(img, caption); pair.append(figure);
      }
      const details = document.createElement('details');
      const summary = document.createElement('summary'); summary.textContent = '展开原始PNG图集（原生尺寸）';
      const sheetBox = document.createElement('div'); sheetBox.className = 'raw-sheet';
      const sheet = document.createElement('img'); sheet.src = url(clip.sheet);
      sheet.width = clip.columns * clip.width; sheet.height = clip.rows * clip.height;
      sheet.alt = `${entry.name}${clip.name} PNG八帧图集`;
      sheetBox.append(sheet); details.append(summary, sheetBox);
      card.append(title, pair, details); grid.append(card);
    }
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-hero]')) {
  button.addEventListener('click', () => void selectHero(button.dataset.hero!));
}
play.addEventListener('click', () => {
  playing = !playing; play.textContent = playing ? '暂停' : '播放';
  draw(displayedFrame);
});
previous.addEventListener('click', () => step(-1));
next.addEventListener('click', () => step(1));
rateInput.addEventListener('change', () => {
  const newRate = Number(rateInput.value);
  elapsed = elapsed * rate / newRate; rate = newRate;
  draw(displayedFrame);
});
document.querySelector<HTMLButtonElement>('#background')!.addEventListener('click', event => {
  const button = event.currentTarget as HTMLButtonElement;
  const checker = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(checker));
  button.textContent = checker ? '切换地图背景' : '切换透明棋盘';
  for (const stage of document.querySelectorAll('.stage')) stage.classList.toggle('checker', checker);
});
renderOriginals();
void selectHero(hero.id);
requestAnimationFrame(tick);
