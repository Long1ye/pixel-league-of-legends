import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/combat-ambience'; await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=central', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts')]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match({ ai: false, waves: false }), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'; view.cameraRig.setElevation(45); view.cameraRig.setZoom(.4); view.cameraRig.lookAt(bridgePoint(0, -36));
    host.update(0); window.ambience = { view, host };
  });
  await page.waitForTimeout(1400);
  if (errors.length) throw new Error(errors.join('\n'));
  // Real-time recording from the actual game canvas; simulation advances at
  // 20 samples/second. This is a visual preview, not a frame-rate benchmark.
  const video = await page.evaluate(async () => {
    const { view, host } = window.ambience, stream = view.renderer.domElement.captureStream(20), chunks = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 3500000 });
    const finished = new Promise(resolve => { recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      recorder.onstop = async () => { const blob = new Blob(chunks, { type: 'video/webm' }), reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.readAsDataURL(blob); }; });
    recorder.start(); let frame = 0;
    await new Promise(resolve => { const timer = setInterval(() => {
      host.update(1 / 20); frame++;
      if (frame === 240) {
        window.ambience.activeStill = view.renderer.domElement.toDataURL('image/jpeg', .94).split(',')[1];
        window.ambience.crossing = view.ravens.group.children.map(o => ({ name: o.name, state: o.userData.state, position: o.position.toArray() }));
      }
      if (frame >= 320) { clearInterval(timer); resolve(); }
    }, 50); });
    recorder.stop(); stream.getTracks().forEach(t => t.stop()); return { data: await finished, still: window.ambience.activeStill, crossing: window.ambience.crossing };
  });
  await writeFile(`${output}/central-motion.webm`, Buffer.from(video.data, 'base64'));
  await writeFile(`${output}/central-active.jpg`, Buffer.from(video.still, 'base64'));
  await page.screenshot({ path: `${output}/central.jpg`, type: 'jpeg', quality: 92 });
  const report = await page.evaluate(() => {
    const { view, host } = window.ambience, gl = view.renderer.getContext(); gl.disable(gl.DITHER);
    const groundSnowPresent = !!view.groundSnow;
    const pixels = t => { view.groundSnow?.update(t); view.renderer.render(view.scene, view.cameraRig.camera); const p = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, p); return p; };
    const diff = (a, b) => { let changed = 0, maximum = 0; for (let i = 0; i < a.length; i += 4) { const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i+1] - b[i+1]), Math.abs(a[i+2] - b[i+2])); if (d > 2) changed++; maximum = Math.max(maximum, d); } return { changed, maximum }; };
    const a = pixels(7.6), b = pixels(7.9), c = pixels(7.9);
    const flakes = view.atmosphere.group.getObjectByName('bridge-sparse-snow');
    const atmosphereVisibility = view.atmosphere.group.children.map(o => o.visible);
    view.atmosphere.group.children.forEach(o => { o.visible = o === flakes; });
    view.atmosphere.update(7.6, view.cameraRig); const fallingA = pixels(7.9);
    view.atmosphere.update(7.9, view.cameraRig); const fallingB = pixels(7.9), fallingC = pixels(7.9);
    const fallingSnow = { count: flakes.geometry.getAttribute('position').count, temporal: diff(fallingA,fallingB), frozen: diff(fallingB,fallingC) };
    view.atmosphere.group.children.forEach((o, i) => { o.visible = atmosphereVisibility[i]; });
    view.smallDetails.update(7.6); const flagA = pixels(7.9);
    view.smallDetails.update(7.9); const flagB = pixels(7.9);
    const flagCount = view.smallDetails.group.children.flatMap(o => o.userData.placements ?? []).filter(p => p.kind === 'wall-banner').length;
    if (view.groundSnow) view.groundSnow.group.visible = false; view.renderer.render(view.scene, view.cameraRig.camera); const baseCalls = view.renderer.info.render.calls;
    pixels(7.9); const enhancedCalls = view.renderer.info.render.calls;
    view.setQuality(true); host.update(0); const reducedHidden = !view.groundSnow?.group.visible;
    view.setQuality(false); view.setQualityEffect('weather', false); host.update(0); const toggleHidden = !view.groundSnow?.group.visible;
    view.setQualityEffect('weather', true); host.update(0);
    const time = host.match.time; host.pause(); host.update(.2); const paused = host.match.time === time;
    const resources = []; for (let i=0;i<5;i++) { host.restart(); host.update(0); resources.push({ ...view.renderer.info.memory }); }
    const birds = view.ravens.group.children.map(o => ({ name: o.name, state: o.userData.state }));
    const result = { fallingSnow, groundSnowPresent, groundTemporal: diff(a,b), flagTemporal: diff(flagA,flagB), flagCount, frozen: diff(b,c), calls: [baseCalls,enhancedCalls], reducedHidden, toggleHidden, paused, resources, birds,
      viewport: [1600,900], zoom: .4, recording: { seconds: 16, samplesPerSecond: 20, note: 'Visual preview; not an FPS benchmark.' } };
    host.dispose(); return result;
  });
  const failures = [];
  if (report.fallingSnow.temporal.changed < 50 || report.fallingSnow.frozen.changed > 32) failures.push('falling snow update/pause');
  if (report.groundSnowPresent && (report.groundTemporal.changed < 50 || report.groundTemporal.maximum < 4)) failures.push('ground snow not visible');
  if (report.frozen.changed > 32 || report.frozen.maximum > 4 || !report.paused) failures.push('pause changed');
  if (!report.reducedHidden || !report.toggleHidden) failures.push('quality controls');
  if (report.resources.some(r => r.geometries !== report.resources[0].geometries || r.textures !== report.resources[0].textures)) failures.push('resources grew');
  report.recording.crossing = video.crossing;
  if (!video.crossing.some(b => b.name === 'raven-1' && b.state === 'flying')) failures.push('central raven did not cross');
  await page.goto(`http://127.0.0.1:5173/${output}/preview.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => { const v = document.querySelector('video'); return v && Number.isFinite(v.duration) && v.duration > 10 && v.videoWidth > 0; });
  report.recording.playback = await page.locator('video').evaluate(async v => {
    v.pause(); await new Promise(resolve => { v.addEventListener('seeked', resolve, { once: true }); v.currentTime = Math.min(12, v.duration - .5); });
    return { duration: v.duration, width: v.videoWidth, height: v.videoHeight };
  });
  await page.locator('video').screenshot({ path: `${output}/video-frame-12.jpg`, type: 'jpeg', quality: 92 });
  await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors, failures }, null, 2));
  console.log(JSON.stringify({ ...report, errors, failures })); if (errors.length || failures.length) process.exitCode = 1;
} finally { await browser.close(); }
