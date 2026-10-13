const canvas = document.querySelector('#preview');
const context = canvas.getContext('2d');
const stage = document.querySelector('#stage');
const status = document.querySelector('#status');
const scrub = document.querySelector('#scrub');
const label = document.querySelector('#frame-label');
const pause = document.querySelector('#pause');
const speedControl = document.querySelector('#speed');
const zoomControl = document.querySelector('#zoom');

let frames = [];
let manifest;
let frameIndex = 0;
let elapsed = 0;
let playing = false;
let looping = true;
let previousTime;
let previewRect;

function draw() {
  if (!frames.length) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = false;
  context.drawImage(frames[frameIndex], -previewRect[0], -previewRect[1]);
  scrub.value = String(frameIndex);
  label.textContent = `帧 ${frameIndex + 1} / ${frames.length}`;
  pause.textContent = playing ? '暂停' : '继续';
}

function scale() {
  const zoom = Number(zoomControl.value);
  canvas.style.width = `${canvas.width * zoom}px`;
  canvas.style.height = `${canvas.height * zoom}px`;
}

function play(loop) {
  if (!frames.length) return;
  looping = loop;
  frameIndex = 0;
  elapsed = 0;
  previousTime = undefined;
  playing = true;
  status.textContent = loop ? '循环播放 · 仅刀与风' : '单次播放 · 仅刀与风';
  draw();
}

function tick(time) {
  if (playing && previousTime !== undefined) {
    elapsed += Math.max(0, time - previousTime) * Number(speedControl.value);
    while (playing && elapsed >= manifest.frames[frameIndex].durationMs) {
      elapsed -= manifest.frames[frameIndex].durationMs;
      if (frameIndex + 1 < frames.length) frameIndex++;
      else if (looping) frameIndex = 0;
      else {
        playing = false;
        elapsed = 0;
        status.textContent = '单次播放完成 · 未接入角色或游戏';
      }
    }
    draw();
  }
  previousTime = time;
  requestAnimationFrame(tick);
}

document.querySelector('#once').addEventListener('click', () => play(false));
document.querySelector('#loop').addEventListener('click', () => play(true));
pause.addEventListener('click', () => {
  if (!frames.length) return;
  playing = !playing;
  previousTime = undefined;
  status.textContent = playing ? '播放中 · 仅刀与风' : '已暂停 · 可拖动查看每帧';
  draw();
});
scrub.addEventListener('input', () => {
  frameIndex = Number(scrub.value);
  elapsed = 0;
  playing = false;
  status.textContent = '已暂停 · 可拖动查看每帧';
  draw();
});
zoomControl.addEventListener('change', scale);
document.querySelector('#background').addEventListener('change', event => {
  stage.className = `stage ${event.target.value === 'dark' ? '' : event.target.value}`;
});

async function initialize() {
  const [animationResponse, designResponse] = await Promise.all([
    fetch('./animation.json'), fetch('./design.json'),
  ]);
  if (!animationResponse.ok || !designResponse.ok) throw new Error('预览文件加载失败');
  manifest = await animationResponse.json();
  const design = await designResponse.json();
  document.querySelector('#prompt').textContent = design.frameEditPrompt ?? design.editIntent;
  frames = await Promise.all(manifest.frames.map(frame => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`动画帧加载失败：${frame.path}`));
    image.src = frame.path;
  })));
  previewRect = manifest.previewRect ?? [0, 0, manifest.width, manifest.height];
  canvas.width = previewRect[2];
  canvas.height = previewRect[3];
  scrub.max = String(frames.length - 1);
  document.querySelector('#download').href = manifest.animationPath;
  if (manifest.retainedBackgroundPath) {
    const retained = document.querySelector('#retained-background');
    retained.src = manifest.retainedBackgroundPath;
    retained.width = manifest.width * 2;
    retained.height = manifest.height * 2;
  } else document.querySelector('#retained-details').hidden = true;
  // Integer nearest-neighbor preview only; do not shrink pixel artwork to fit.
  if (window.innerWidth < canvas.width * 2 + 80) zoomControl.value = '1';
  scale();
  document.querySelector('#metadata').textContent = `${manifest.width}×${manifest.height} · ${frames.length} 帧 · ${(manifest.durationMs / 1000).toFixed(2)} 秒 · 整数倍像素预览`;
  play(true);
  requestAnimationFrame(tick);
}

initialize().catch(error => {
  status.textContent = error.message;
  console.error(error);
});
