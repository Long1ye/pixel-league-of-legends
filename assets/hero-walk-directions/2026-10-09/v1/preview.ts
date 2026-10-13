import study from './study.json';
import { DIRECTIONS, headingToDirection, type SpriteDirection } from './direction';

const labels: Record<SpriteDirection, string> = {
  e: '右 E', se: '右下 SE', s: '下 S', sw: '左下 SW', w: '左 W', nw: '左上 NW', n: '上 N', ne: '右上 NE',
};
const angle = document.querySelector<HTMLInputElement>('#angle')!;
const result = document.querySelector<HTMLOutputElement>('#angle-result')!;
const pose = document.querySelector<HTMLImageElement>('#active-pose')!;
const arrow = document.querySelector<HTMLElement>('#direction-arrow')!;
const gallery = document.querySelector<HTMLElement>('#direction-gallery')!;
const info = document.querySelector<HTMLElement>('#asset-info')!;
const notes = document.querySelector<HTMLElement>('#hero-notes')!;
const sheetLink = document.querySelector<HTMLAnchorElement>('#sheet-link')!;

let hero = study.heroes[0];
let currentDirection: SpriteDirection = 'se';

function assetUrl(file: string): string { return new URL(`${hero.directory}/${file}`, import.meta.url).href; }

function renderPose(): void {
  const degrees = Number(angle.value);
  currentDirection = headingToDirection(degrees * Math.PI / 180, currentDirection);
  const frame = hero.frames[currentDirection], scale = hero.preview_scale;
  pose.src = assetUrl(frame.file);
  pose.width = pose.height = hero.cell_size * scale;
  pose.style.left = `${280 - hero.cell_size * scale / 2}px`;
  pose.style.top = `${470 - frame.bbox[3] * scale}px`;
  pose.alt = `${hero.name} ${labels[currentDirection]} 迈步姿势`;
  arrow.style.transform = `rotate(${degrees}deg)`;
  result.value = `${degrees}° → ${labels[currentDirection]}`;
  info.textContent = `${hero.name} · 源格 ${hero.cell_size}×${hero.cell_size} · 验证窗口 ${scale}×整数放大 · 近似底部对齐，尚非正式脚底锚点`;
  for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-direction]')) {
    button.setAttribute('aria-pressed', String(button.dataset.direction === currentDirection));
  }
  for (const figure of gallery.querySelectorAll<HTMLElement>('figure')) {
    figure.classList.toggle('selected', figure.dataset.direction === currentDirection);
  }
}

function selectDirection(direction: SpriteDirection): void {
  angle.value = String(DIRECTIONS.indexOf(direction) * 45);
  renderPose();
}

function renderGallery(): void {
  gallery.replaceChildren();
  for (const direction of ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'] as const) {
    const figure = document.createElement('figure'); figure.dataset.direction = direction;
    const image = document.createElement('img');
    image.src = assetUrl(hero.frames[direction].file);
    image.width = image.height = hero.cell_size * hero.gallery_scale;
    image.alt = `${hero.name} ${labels[direction]} 原始迈步姿势`;
    const caption = document.createElement('figcaption');
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = labels[direction];
    button.addEventListener('click', () => selectDirection(direction));
    const link = document.createElement('a'); link.href = image.src; link.textContent = ' PNG';
    caption.append(button, link); figure.append(image, caption); gallery.append(figure);
  }
  sheetLink.href = assetUrl(hero.preview_sheet);
  notes.textContent = hero.id === 'yasuo'
    ? '亚索：斜后方与正背面区分较弱，单侧护肩和刀手被镜像换边，仍需修正。'
    : hero.id === 'ahri'
      ? '阿狸：背面尾巴遮挡较多，尾巴数量、步幅和持球手方向还需要检查。'
      : '盖伦：大剑会换持剑手，披风遮住部分后腿，剑尖也可能影响底部锚点。';
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-hero]')) {
  button.addEventListener('click', () => {
    hero = study.heroes.find(entry => entry.id === button.dataset.hero)!;
    for (const other of document.querySelectorAll<HTMLButtonElement>('[data-hero]')) {
      other.setAttribute('aria-pressed', String(other === button));
    }
    renderGallery(); renderPose();
  });
}
for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-direction]')) {
  button.addEventListener('click', () => selectDirection(button.dataset.direction as SpriteDirection));
}
angle.addEventListener('input', renderPose);
renderGallery(); renderPose();
