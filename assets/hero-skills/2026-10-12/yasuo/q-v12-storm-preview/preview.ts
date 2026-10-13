import { direction, stormPosition, RELEASE_MS, FLIGHT_MS } from './storm';
import readyData from './ready/animation.json';
import stormData from './tornado/animation.json';
import readyUrl from './ready/media/e-atlas.png?url';
import stormUrl from './tornado/media/e-atlas.png?url';
import readyClipUrl from './ready/media/e.webp?url';
import stormClipUrl from './tornado/media/e.webp?url';
import bodyUrl from '../w-v3-horizontal-e/media/w-cast-e-atlas.png?url';
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('scene'), ctx = canvas.getContext('2d')!;
const angleInput = $<HTMLInputElement>('angle'), scrub = $<HTMLInputElement>('scrub');
const origin = { x: 280, y: 300 };
const castStart = 1400, releaseAt = castStart + RELEASE_MS, endAt = 4100;
let time = 0, angle = 0, lockedAngle = 0, playing = true, speed = 1, previous = 0;
type Clip = { width: number; height: number; count: number; columns: number; durations: number[]; totalDuration: number };
const bodyData: Clip = { width: 240, height: 160, count: 8, columns: 4, durations: Array(8).fill(100), totalDuration: 800 };
function load(url: string) { return new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error('素材加载失败')); image.src = url; }); }
function frameAt(data: Clip, age: number) { let t = ((age % data.totalDuration) + data.totalDuration) % data.totalDuration; for (let i = 0; i < data.count; i++) { t -= data.durations[i]; if (t < 0) return i; } return 0; }
function sprite(image: HTMLImageElement, data: Clip, frame: number, x: number, y: number) { ctx.drawImage(image, frame % data.columns * data.width, Math.floor(frame / data.columns) * data.height, data.width, data.height, Math.round(x), Math.round(y), data.width, data.height); }
function selectAngle(value: number) { angle = ((Math.round(value) % 360) + 360) % 360; angleInput.value = String(angle); $('angleValue').textContent = `${angle}°`; document.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => { const selected = Number(b.dataset.angle) === angle; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); }); }
function cast() { lockedAngle = angle; time = castStart; playing = true; }
function prepare() { time = 0; playing = true; lockedAngle = angle; }
async function main() {
  const [body, ready, storm] = await Promise.all([load(bodyUrl), load(readyUrl), load(stormUrl)]);
  $<HTMLImageElement>('readyClip').src = readyClipUrl; $<HTMLImageElement>('stormClip').src = stormClipUrl;
  angleInput.oninput = () => selectAngle(Number(angleInput.value));
  document.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => b.onclick = () => { selectAngle(Number(b.dataset.angle)); prepare(); });
  $('cast').onclick = cast; $('ready').onclick = prepare;
  $('pause').onclick = () => { playing = !playing; };
  $<HTMLSelectElement>('speed').onchange = e => { speed = Number((e.target as HTMLSelectElement).value); };
  scrub.oninput = () => { time = Number(scrub.value); lockedAngle = angle; playing = false; };
  function aim(event: PointerEvent) { const rect = canvas.getBoundingClientRect(); const x = (event.clientX - rect.left) * canvas.width / rect.width, y = (event.clientY - rect.top) * canvas.height / rect.height; selectAngle(Math.atan2(y - origin.y, x - origin.x) * 180 / Math.PI); }
  canvas.onpointermove = aim; canvas.onpointerdown = e => { aim(e); cast(); };
  function paint() {
    ctx.imageSmoothingEnabled = false; ctx.fillStyle = '#172c33'; ctx.fillRect(0, 0, 560, 510);
    ctx.strokeStyle = '#243c44'; ctx.lineWidth = 1;
    for (let x = 0; x < 560; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 510); ctx.stroke(); }
    for (let y = 20; y < 510; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(560, y); ctx.stroke(); }
    const d = direction(angle); ctx.strokeStyle = '#508492'; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(origin.x, origin.y); ctx.lineTo(origin.x + d.x * 190, origin.y + d.y * 190); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#09161b80'; ctx.beginPath(); ctx.ellipse(origin.x, origin.y, 38, 11, 0, 0, Math.PI * 2); ctx.fill();
    const casting = time >= castStart && time < castStart + 800;
    const windVisible = time < releaseAt;
    const flightAge = time - releaseAt;
    const flying = flightAge >= 0 && flightAge < FLIGHT_MS;
    const pos = stormPosition(lockedAngle, flightAge, origin);
    const drawStorm = () => {
      const fade = Math.min(1, flightAge / 100, (FLIGHT_MS - flightAge) / 180);
      ctx.save(); ctx.globalAlpha = Math.max(0, fade);
      ctx.fillStyle = '#10202990'; ctx.beginPath(); ctx.ellipse(pos.x, pos.y, 20, 6, 0, 0, Math.PI * 2); ctx.fill();
      sprite(storm, stormData, frameAt(stormData, flightAge), pos.x - 57, pos.y - 112);
      ctx.fillStyle = '#a5dbea'; ctx.fillRect(Math.round(pos.x) - 1, Math.round(pos.y) - 1, 3, 3); ctx.restore();
    };
    if (flying && pos.y < origin.y) drawStorm();
    const readyY = origin.y - readyData.height + 12;
    const split = origin.y - 32;
    const drawReady = (front: boolean) => { if (!windVisible) return; ctx.save(); ctx.beginPath(); ctx.rect(0, front ? split : 0, 560, front ? 510 - split : split); ctx.clip(); ctx.globalAlpha = Math.min(0.8, time / 200); sprite(ready, readyData, frameAt(readyData, time), origin.x - readyData.width / 2, readyY); ctx.restore(); };
    drawReady(false);
    sprite(body, bodyData, casting ? Math.min(7, Math.floor((time - castStart) / 100)) : 0, origin.x - 96, origin.y - 138);
    drawReady(true);
    if (flying && pos.y >= origin.y) drawStorm();
    const state = time < castStart ? 'Q2 命中后 · 蓄风循环' : time < releaseAt ? 'Q3 横斩 · 准备出风' : flying ? `龙卷风飞行 · 锁定 ${lockedAngle}°` : '风已消耗 · 回到待机';
    $('status').textContent = `${state}｜${Math.round(time)}ms${playing ? '' : '｜已暂停'}`;
    $('pause').textContent = playing ? '暂停' : '继续'; scrub.value = String(Math.round(time));
  }
  function tick(now: number) { const delta = previous ? Math.min(100, now - previous) : 0; previous = now;
    if (playing) { const before = time; time += delta * speed;
      if (before < castStart && time >= castStart) { if (!$<HTMLInputElement>('loop').checked) time %= castStart; else lockedAngle = angle; }
      if (time >= endAt) { if ($<HTMLInputElement>('loop').checked) { time = 0; lockedAngle = angle; } else { time = endAt; playing = false; } }
    }
    paint(); requestAnimationFrame(tick);
  }
  selectAngle(0); requestAnimationFrame(tick);
}
main().catch(error => { $('status').textContent = `${error.message}，请刷新重试。`; });
