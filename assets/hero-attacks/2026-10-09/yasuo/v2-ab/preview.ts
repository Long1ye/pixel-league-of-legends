import study from './study.json';
import { abSample, frameStart } from './timing';

const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;
const play = $<HTMLButtonElement>('#play'), once = $<HTMLButtonElement>('#once');
const loop = $<HTMLInputElement>('#loop'), rate = $<HTMLSelectElement>('#rate');
const status = $<HTMLOutputElement>('#status');
type Group = typeof study.groups[number];
type Clip = Group['a'];
const views: { group: Group; sheets: HTMLImageElement[]; canvas: HTMLCanvasElement; status: HTMLOutputElement; cards: HTMLElement[] }[] = [];
const url = (path: string) => new URL(path, import.meta.url).href;
const load = async (path: string) => { const image = new Image(); image.src = url(path); await image.decode(); return image; };
let elapsed = 0, previousTime: number | null = null, playing = true, ready = false, selected = 0;

function drawCell(canvas: HTMLCanvasElement, sheet: HTMLImageElement, frame: number): void {
  const ctx = canvas.getContext('2d')!; ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, study.width, study.height);
  ctx.drawImage(sheet, frame % study.columns * study.width, Math.floor(frame / study.columns) * study.height,
    study.width, study.height, 0, 0, study.width, study.height);
}
function draw(indexOverride?: number): void {
  for (const view of views) {
    const sample = abSample(elapsed, view.group.a.durations_ms, view.group.b.durations_ms, loop.checked);
    const index = indexOverride ?? sample.index, variant = index < 8 ? 0 : 1, frame = index % 8;
    drawCell(view.canvas, view.sheets[variant], frame);
    const ended = !loop.checked && !sample.active && indexOverride === undefined;
    view.status.value = `${variant ? 'B' : 'A'} · 第 ${frame + 1}/8 帧${ended ? ' · 本次 A+B 已结束' : frame === 7 ? variant ? ' → 下一帧 A1' : ' → 下一帧 B1' : ''}`;
    view.cards.forEach((card, i) => card.classList.toggle('selected', i === index));
    selected = index;
  }
  const ended = !loop.checked && !abSample(elapsed, study.groups[0].a.durations_ms, study.groups[0].b.durations_ms, false).active;
  status.value = playing ? '三组同步连续播放' : ended ? '本次 A+B 已结束' : `暂停 · ${selected < 8 ? 'A' : 'B'}${selected % 8 + 1}`;
}
function select(index: number): void {
  selected = (index + 16) % 16; playing = false; play.textContent = '继续';
  elapsed = frameStart(selected, study.groups[0].a.durations_ms, study.groups[0].b.durations_ms); draw(selected);
}
function mediaLinks(container: HTMLElement, variant: string, clip: Clip): void {
  for (const [label, path] of [['WebP', clip.webp], ['GIF', clip.gif], ['PNG图集', clip.sheet]]) {
    const link = document.createElement('a'); link.href = url(path); link.textContent = `${variant} · ${label}`;
    link.download = `yasuo-${clip.id}-se.${path.split('.').at(-1)}`; container.append(link);
  }
}
async function createGroup(group: Group): Promise<void> {
  const sheets = await Promise.all([load(group.a.sheet), load(group.b.sheet)]);
  if (sheets.some(s => s.naturalWidth !== study.width * study.columns || s.naturalHeight !== study.height * study.rows)) throw new Error('Invalid sheet canvas');
  const card = document.createElement('article'); card.className = 'group'; card.dataset.group = group.id;
  const title = document.createElement('h2'); title.textContent = `${group.id.slice(1)} / ${group.name}`;
  const description = document.createElement('p'); description.className = 'description'; description.textContent = group.description;
  const stage = document.createElement('div'); stage.className = 'stage checker';
  const canvas = document.createElement('canvas'); canvas.width = study.width; canvas.height = study.height; canvas.className = 'pixel';
  canvas.setAttribute('aria-label', `${group.name}连续动画`); stage.append(canvas);
  const output = document.createElement('output'); output.className = 'frame-status';
  const links = document.createElement('div'); links.className = 'downloads'; mediaLinks(links, 'A', group.a); mediaLinks(links, 'B', group.b);
  const note = document.createElement('p'); note.className = 'note'; note.textContent = group.review;
  const details = document.createElement('details'), summary = document.createElement('summary'); summary.textContent = '展开16帧与原文件播放'; details.append(summary);
  const frames = document.createElement('div'); frames.className = 'frames';
  const cards: HTMLElement[] = [];
  for (let i = 0; i < 16; i++) {
    const frame = document.createElement('div'); frame.className = 'frame';
    const button = document.createElement('button'); button.textContent = `${i < 8 ? 'A' : 'B'}${i % 8 + 1} · 查看此帧`;
    button.addEventListener('click', () => select(i));
    const c = document.createElement('canvas'); c.className = 'pixel'; c.width = study.width; c.height = study.height;
    drawCell(c, sheets[i < 8 ? 0 : 1], i % 8); frame.append(button, c); frames.append(frame); cards.push(frame);
  }
  const originals = document.createElement('div'); originals.className = 'originals native-overflow';
  for (const [variant, clip] of [['A', group.a], ['B', group.b]] as const) for (const [format, path] of [['WebP', clip.webp], ['GIF', clip.gif]]) {
    const figure = document.createElement('figure'), image = new Image(), caption = document.createElement('figcaption');
    image.src = url(path); image.className = 'pixel checker'; image.width = 352; image.height = 352;
    image.alt = `${group.name} ${variant} ${format}原文件动画`; caption.textContent = `${variant} · ${format}原文件单独循环 · 2×`;
    figure.append(image, caption); originals.append(figure);
  }
  details.append(frames, originals); card.append(title, description, stage, output, links, note, details);
  // Resolve concurrently but present in the defined group order after all assets load.
  views.push({ group, sheets, canvas, status: output, cards });
  $<HTMLElement>('#groups').append(card);
}
async function init(): Promise<void> {
  for (const group of study.groups) await createGroup(group);
  $<HTMLElement>('#facts').textContent = `3组 / 6条动画 / 共48帧 · ${study.width}×${study.height}每帧 · 每次挥刀 ${study.groups[0].a.duration_ms / 1000}秒 · 完整 A+B ${
    (study.groups[0].a.duration_ms + study.groups[0].b.duration_ms) / 1000}秒`;
  $<HTMLElement>('#review').textContent = study.review;
  $<HTMLElement>('#credits').textContent = `本轮实际消耗 ${study.credits_consumed} 积分。仅生成亚索右下方向，没有扩展八向或修改战斗逻辑。`;
  ready = true; document.querySelectorAll<HTMLButtonElement>('button').forEach(b => b.disabled = false); draw();
}
play.addEventListener('click', () => {
  if (!playing && !loop.checked && !abSample(elapsed, study.groups[0].a.durations_ms, study.groups[0].b.durations_ms, false).active) elapsed = 0;
  playing = !playing; play.textContent = playing ? '暂停' : '继续'; draw();
});
once.addEventListener('click', () => { elapsed = 0; playing = true; loop.checked = false; play.textContent = '暂停'; draw(); });
$<HTMLButtonElement>('#previous').addEventListener('click', () => select(selected - 1));
$<HTMLButtonElement>('#next').addEventListener('click', () => select(selected + 1));
document.querySelectorAll<HTMLButtonElement>('[data-seam]').forEach(b => b.addEventListener('click', () => select(Number(b.dataset.seam))));
loop.addEventListener('change', () => { elapsed = 0; playing = true; play.textContent = '暂停'; draw(); });
$<HTMLButtonElement>('#background').addEventListener('click', event => {
  const button = event.currentTarget as HTMLButtonElement, checker = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(checker)); document.querySelectorAll('.stage').forEach(s => s.classList.toggle('checker', checker));
});
function tick(now: number): void {
  if (ready && playing && previousTime !== null) {
    elapsed += Math.min(now - previousTime, 100) * Number(rate.value); draw();
    if (!abSample(elapsed, study.groups[0].a.durations_ms, study.groups[0].b.durations_ms, loop.checked).active) { playing = false; play.textContent = '继续'; draw(); }
  }
  previousTime = now; requestAnimationFrame(tick);
}
void init().catch(() => { status.value = '素材加载失败，请检查本地资源'; }); requestAnimationFrame(tick);
