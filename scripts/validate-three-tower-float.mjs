import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
let playwright;
try { playwright = await import('playwright'); } catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/tower-float'; await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  // Freeze this isolated capture against unrelated concurrent Vite reloads.
  await page.route('**/@vite/client', route => route.fulfill({ contentType: 'application/javascript', body: 'export function createHotContext(){return {accept(){},dispose(){},prune(){},on(){},off(){},send(){},invalidate(){},data:{}}} export function updateStyle(){} export function removeStyle(){} export const injectQuery=u=>u;' }));
  await page.route('**/src/main-three.ts', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts')]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => { const match = new Match({ ai: false, waves: false }); Object.assign(match.hero('blue'), bridgePoint(-270, 35)); return match; }, view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'; view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.cameraRig.lookAt(bridgePoint(-225, -15));
    host.update(0); window.towerFloat = { view, host, bridgePoint };
  });
  await page.waitForTimeout(1200);
  const report = { errors, cases: [], frames: [] };
  for (const team of ['blue', 'red']) {
    await page.evaluate(team => { const { view, host, bridgePoint } = window.towerFloat; view.cameraRig.lookAt(bridgePoint(team === 'blue' ? -225 : 195, -15)); host.update(0); }, team);
    for (let i = 0; i < 12; i++) {
      await page.evaluate(i => { const { view, host } = window.towerFloat; host.match.time = i * .4; host.update(0); }, i);
      await page.screenshot({ path: `${output}/${team}-${i}.jpg`, type: 'jpeg', quality: 88 });
    }
    const clip = await page.evaluate(async () => {
      const { host, view } = window.towerFloat; host.match.time = 0; host.update(0);
      const stream = view.renderer.domElement.captureStream(24), chunks = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 2500000 });
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      const stopped = new Promise(resolve => { recorder.onstop = resolve; }); recorder.start(); const start = performance.now();
      await new Promise(resolve => { const tick = now => { const t = Math.min(4.8, (now - start) / 1000); host.match.time = t; host.update(0); if (t < 4.8) requestAnimationFrame(tick); else resolve(); }; requestAnimationFrame(tick); });
      recorder.stop(); await stopped; stream.getTracks().forEach(t => t.stop());
      return await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(new Blob(chunks, { type: 'video/webm' })); });
    });
    await writeFile(`${output}/${team}.webm`, Buffer.from(clip.split(',')[1], 'base64'));
  }
  report.cases.push(await page.evaluate(() => {
    const { host, view } = window.towerFloat, crystals = [];
    view.landmarks.group.traverse(mesh => { if (mesh.name === 'floating-tower-crystal') crystals.push(mesh); });
    host.match.time = 0; host.update(0);
    const towers = crystals.map(c => c.parent.position.toArray()), initial = crystals.map(c => c.position.toArray());
    host.match.time = 1.2; host.update(0);
    const moving = crystals.every((c, i) => Math.abs(c.position.y - initial[i][1]) > .1);
    const fixed = crystals.every((c, i) => c.parent.position.toArray().every((p, j) => p === towers[i][j]));
    const paused = JSON.stringify(crystals.map(c => c.position.toArray())); for (let i = 0; i < 30; i++) host.update(0);
    return { name: 'eight crystals move, stone stays fixed and pause freezes', passed: crystals.length === 8 && moving && fixed && paused === JSON.stringify(crystals.map(c => c.position.toArray())) };
  }));
  await page.evaluate(() => { const { host, view, bridgePoint } = window.towerFloat; view.cameraRig.lookAt(bridgePoint(-225, -15)); host.match.time = 2; view.landmarks.towerFloatEnabled = false; host.update(0); });
  await page.screenshot({ path: `${output}/original.jpg`, type: 'jpeg', quality: 88 });
  report.cases.push(await page.evaluate(() => {
    const { host, view } = window.towerFloat; const crystals = []; view.landmarks.group.traverse(o => { if (o.name === 'floating-tower-crystal') crystals.push(o); });
    const hidden = crystals.every(c => !c.visible); view.landmarks.towerFloatEnabled = true; host.update(0);
    const restored = crystals.every(c => c.visible); host.match.tower('blue').hp = 0; host.update(0);
    const blue = crystals.filter(c => c.parent.name === 'painted-tower' && c.parent.userData.team === 'blue');
    return { name: 'toggle restores original and destroyed outer tower hides crystal', passed: hidden && restored && blue.every(c => !c.parent.visible) };
  }));
  report.resources = await page.evaluate(() => { const { host, view } = window.towerFloat, samples = []; for (let i = 0; i < 5; i++) { host.restart(); host.update(0); samples.push({ ...view.renderer.info.memory }); } return samples; });
  report.cases.push({ name: 'restart resources stable', passed: report.resources.every(r => r.geometries === report.resources[0].geometries && r.textures === report.resources[0].textures) });
  await page.evaluate(() => window.towerFloat.host.dispose());
  report.failures = report.cases.filter(c => !c.passed).map(c => c.name);
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await writeFile(`${output}/motion.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>防御塔水晶悬浮</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:14px;display:flex;gap:16px;align-items:center}img,video{display:block;width:100%;max-width:1600px;margin:auto}select,button{padding:7px}a{color:#a9d5ff}</style><header><select id="team"><option value="blue">蓝方水晶悬浮</option><option value="red">红方水晶悬浮</option><option value="original">原版对照</option></select><button id="play">暂停</button><span>45° · 正常缩放 0.6 · 水晶独立浮动，塔身固定</span><a href="/three.html?map=howling&scene=match">进入比赛</a></header><video id="video" src="blue.webm" autoplay loop muted playsinline controls></video><img id="frame" src="original.jpg" style="display:none"><script>const select=document.querySelector('#team'),video=document.querySelector('#video'),frame=document.querySelector('#frame');select.onchange=()=>{const original=select.value==='original';video.style.display=original?'none':'block';frame.style.display=original?'block':'none';if(original)video.pause();else{video.src=select.value+'.webm';video.play()}};document.querySelector('#play').onclick=e=>{if(video.paused){video.play();e.target.textContent='暂停'}else{video.pause();e.target.textContent='播放'}}</script></html>`);
  console.log(JSON.stringify(report)); if (errors.length || report.failures.length) process.exitCode = 1;
} finally { await browser.close(); }
