import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/scene-motion';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const errors = [], failures = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match({ ai: false, waves: false }), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.cameraRig.lookAt(bridgePoint(-285));
    host.update(0);
    window.sceneMotion = { view, host, bridgePoint };
  });
  await page.waitForTimeout(1400);
  const report = await page.evaluate(() => {
    const { view, host, bridgePoint } = window.sceneMotion;
    const results = [];
    const groups = [
      ['fire', view.painted.group, ['painted-fire-bowl', 'living-brazier-flames'], -285],
      ['flags', view.smallDetails.group, 'painted-small-wall-banner', -357, -60],
      ['grass', view.details.group, 'painted-brush-', -285],
      ['structures', view.landmarks.group, 'painted-', -550],
      ['structures-red', view.landmarks.group, 'painted-', 550],
      ['ice', view.architecturalIce.group, 'ice-', -285],
      ['lanterns', view.smallDetails.group, 'painted-small-wall-lantern', -357, -60],
      ['glints', view.crystalMotes.points, '', -357, -60],
    ];
    const gl = view.renderer.getContext();
    function pixels(t, root, prefix) {
      host.match.time = t; host.update(0);
      for (const child of view.scene.children) child.visible = child === root;
      for (const child of root.children) child.visible &&= (Array.isArray(prefix) ? prefix : [prefix]).some(p => child.name.startsWith(p));
      view.renderer.render(view.scene, view.cameraRig.camera);
      const data = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
      gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);
      return data;
    }
    const diff = (a, b) => {
      let pixels = 0, maximum = 0;
      for (let i = 0; i < a.length; i += 4) {
        const delta = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
        if (delta > 2) pixels++;
        maximum = Math.max(maximum, delta);
      }
      return { pixels, maximum };
    };
    for (const [name, root, prefix, u, v = 0] of groups) {
      view.cameraRig.lookAt(bridgePoint(u, v));
      const first = pixels(2, root, prefix), next = pixels(2.35, root, prefix), frozen = pixels(2.35, root, prefix);
      results.push({ name, temporal: diff(first, next), frozen: diff(next, frozen), camera: { u, v } });
    }
    // Fixed gameplay camera, stationary units: time changes only the environment.
    view.cameraRig.lookAt(bridgePoint(-285));
    host.match.time = 0; host.update(0);
    return { results, memory: { ...view.renderer.info.memory }, viewport: [1600, 900], zoom: .6 };
  });
  for (const result of report.results) {
    if (result.temporal.pixels < 8 || result.temporal.maximum < 4) failures.push(`${result.name}: motion not measurable`);
    if (result.frozen.pixels > 32 || result.frozen.maximum > 4) failures.push(`${result.name}: paused rendering changed`);
  }
  for (const scene of ['bridge', 'wall']) for (let i = 0; i < 48; i++) {
    await page.evaluate(({ i, scene }) => {
      const { host, view, bridgePoint } = window.sceneMotion;
      view.cameraRig.lookAt(scene === 'wall' ? bridgePoint(-357, -60) : bridgePoint(-285));
      host.match.time = i / 16; host.update(0);
    }, { i, scene });
    await page.screenshot({ path: `${output}/${scene}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 82 });
  }
  report.cameraSampling = await page.evaluate(() => {
    const { host, view, bridgePoint } = window.sceneMotion, samples = [];
    const gl = view.renderer.getContext();
    const pixels = () => {
      host.update(0);
      const p = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
      gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, p); return p;
    };
    host.match.time = 2;
    for (const resolution of [1280, 1920]) for (const zoom of [.4, .6, 1.5]) {
      view.setResolution(resolution); view.cameraRig.setZoom(zoom);
      const focus = bridgePoint(-357, -60); view.cameraRig.lookAt(focus);
      const first = pixels();
      for (const dx of [.25, .5, 1, 2, 4]) { view.pan(dx, dx * .5); host.update(0); }
      view.cameraRig.lookAt(focus); const last = pixels();
      let changed = 0, maximum = 0;
      for (let i = 0; i < first.length; i += 4) {
        const delta = Math.max(Math.abs(first[i] - last[i]), Math.abs(first[i + 1] - last[i + 1]), Math.abs(first[i + 2] - last[i + 2]));
        if (delta > 2) changed++; maximum = Math.max(maximum, delta);
      }
      const rect = view.renderer.domElement.getBoundingClientRect(), screen = view.cameraRig.project(focus);
      const ground = view.ground({ x: rect.left + screen.x, y: rect.top + screen.y });
      samples.push({ resolution, zoom, restoredChangedPixels: changed, restoredMaximumDelta: maximum, pickingError: ground ? Math.hypot(ground.x - focus.x, ground.y - focus.y) : Infinity });
    }
    return { hardwareAntialias: gl.getContextAttributes().antialias, samples,
      note: 'Camera pan/return and picking regression, not proof that all intermediate frames are free from shimmer.' };
  });
  if (report.cameraSampling.samples.some(s => s.pickingError > 1e-6 || s.restoredChangedPixels > 32 || s.restoredMaximumDelta > 4)) failures.push('camera sampling regression');
  const stable = await page.evaluate(() => {
    const { host, view } = window.sceneMotion;
    const resources = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(0); resources.push({ ...view.renderer.info.memory }); }
    host.dispose(); return resources;
  });
  report.resources = stable;
  if (stable.some(v => v.geometries !== stable[0].geometries || v.textures !== stable[0].textures)) failures.push('resource growth');
  report.errors = errors; report.failures = failures;
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await writeFile(`${output}/motion.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>场景动态修订对照</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}img{display:block;width:100%;max-width:1600px;margin:auto}button,select{padding:8px}</style><header><button id="play">暂停播放</button><select id="version"><option value="current">本轮修订</option><option value="previous">上轮记录</option></select><select id="scene"><option value="bridge">桥面：火盆 / 冰晶</option><option value="wall">靠墙：塔核心 / 挂旗</option></select><span>45° · 缩放 0.6 · 固定镜头 · 16 张/秒采样，非帧率测试</span></header><img id="frame" src="bridge-00.jpg"><script>let i=0,playing=true;function show(){const prefix=document.querySelector('#version').value==='previous'?'../scene-motion/':'';document.querySelector('#frame').src=prefix+document.querySelector('#scene').value+'-'+String(i).padStart(2,'0')+'.jpg'}document.querySelector('#scene').onchange=show;document.querySelector('#version').onchange=show;document.querySelector('#play').onclick=e=>{playing=!playing;e.target.textContent=playing?'暂停播放':'继续播放'};setInterval(()=>{if(playing){i=(i+1)%48;show()}},62.5)</script></html>`);
  console.log(JSON.stringify(report));
  if (errors.length || failures.length) process.exitCode = 1;
} finally { await browser.close(); }
