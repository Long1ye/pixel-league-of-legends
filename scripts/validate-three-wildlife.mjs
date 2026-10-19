import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); } catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/wildlife'; await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts')]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => {
      const match = new Match({ ai: false, waves: false }); Object.assign(match.hero('blue'), bridgePoint(-370, -15), { speed: 0 }); match.hero('red').hp = 0; return match;
    }, view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.cameraRig.lookAt(bridgePoint(-385, -65)); host.update(0);
    window.wildlife = { view, host, bridgePoint, advance: (time) => { for (let t = host.match.time + 1 / 60; t < time; t += 1 / 60) { host.match.time = t; host.update(0); } host.match.time = time; host.update(0); } };
  });
  await page.waitForTimeout(1400); await page.evaluate(() => window.wildlife.host.update(0));
  const report = { errors, frames: [], cases: [] };
  for (let index = 0; index < 24; index++) {
    const time = index * .5;
    report.frames.push(await page.evaluate(time => {
      const { advance, view } = window.wildlife; advance(time);
      return { time, birds: view.ravens.group.children.map(body => ({ state: body.userData.state, frame: body.userData.frame, position: body.position.toArray(), visible: body.visible })) };
    }, time));
    await page.screenshot({ path: `${output}/road-${index}.jpg`, type: 'jpeg', quality: 85 });
  }
  report.cases.push({ name: 'normal scale loaded birds', passed: report.frames.every(f => f.birds.every(b => b.visible)) });
  report.cases.push({ name: 'flight and landing visible', passed: ['perched', 'flying', 'landing'].every(state => report.frames.some(f => f.birds.some(b => b.state === state))) });
  const clip = await page.evaluate(async () => {
    const { host, view } = window.wildlife; host.restart(); host.update(0);
    const stream = view.renderer.domElement.captureStream(30), chunks = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 5000000 });
    recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    const stopped = new Promise(resolve => { recorder.onstop = resolve; });
    recorder.start(); const start = performance.now();
    await new Promise(resolve => {
      const tick = now => {
        const time = Math.min(12, (now - start) / 1000); host.match.time = time; host.update(0);
        if (time < 12) requestAnimationFrame(tick); else resolve();
      }; requestAnimationFrame(tick);
    });
    recorder.stop(); await stopped; stream.getTracks().forEach(t => t.stop());
    return Array.from(new Uint8Array(await new Blob(chunks, { type: 'video/webm' }).arrayBuffer()));
  });
  await writeFile(`${output}/wildlife.webm`, Buffer.from(clip));
  report.cases.push(await page.evaluate(() => {
    const { host, view } = window.wildlife; host.pause(); host.update(0);
    const snapshot = () => JSON.stringify([...view.poros.group.children, ...view.ravens.group.children].map(body => [body.position.toArray(), body.quaternion.toArray(), body.geometry.getAttribute('uv').array]));
    const before = snapshot(); for (let i = 0; i < 60; i++) host.update(1 / 60);
    return { name: 'pause freezes animals and poses', passed: before === snapshot() };
  }));
  await page.evaluate(() => { const { host, view, bridgePoint } = window.wildlife; view.cameraRig.lookAt(bridgePoint(0, -65)); Object.assign(host.match.hero('blue'), bridgePoint(0, -15)); view.fogEnabled = true; host.update(0); });
  await page.screenshot({ path: `${output}/central-fog.jpg`, type: 'jpeg', quality: 87 });
  report.cases.push(await page.evaluate(() => {
    const { host, view, bridgePoint } = window.wildlife;
    host.restart(); view.fogEnabled = true;
    Object.assign(host.match.hero('blue'), bridgePoint(-620, 0)); Object.assign(host.match.hero('red'), bridgePoint(26, -97)); host.match.hero('red').hp = 1000;
    host.update(0);
    return { name: 'hidden enemy cannot attract poros', passed: !view.canSeeEntity(host.match.hero('red')) && !view.poros.residents.find(r => r.placement.id === 'bridge-lookout').motion.attention };
  }));
  report.cases.push(await page.evaluate(() => {
    const { host, view, bridgePoint } = window.wildlife, bird = view.ravens.residents[1].motion;
    Object.assign(host.match.hero('red'), bridgePoint(bird.u, bird.v)); host.match.time = .1; host.update(0);
    return { name: 'hidden enemy cannot startle ravens', passed: !view.canSeeEntity(host.match.hero('red')) && view.ravens.group.children.every(body => body.userData.state === 'perched') };
  }));
  report.resources = await page.evaluate(() => {
    const { host, view } = window.wildlife, samples = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(0); samples.push({ ...view.renderer.info.memory }); }
    return samples;
  });
  report.cases.push({ name: 'restart resources stable', passed: report.resources.every(r => r.geometries === report.resources[0].geometries && r.textures === report.resources[0].textures) });
  report.assetErrors = await page.evaluate(() => [...window.wildlife.view.poros.errors, ...window.wildlife.view.ravens.errors]);
  report.failures = report.cases.filter(c => !c.passed).map(c => c.name);
  await page.evaluate(() => window.wildlife.host.dispose());
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await writeFile(`${output}/motion.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>冰桥居民：魄罗与寒鸦</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:14px;display:flex;gap:20px;align-items:center}a{color:#a9d5ff}video{display:block;width:100%;max-width:1600px;margin:auto}</style><header><span>魄罗与寒鸦 · 45° · 正常缩放 0.6 · 12 秒连续实机演示</span><a href="/three.html?map=howling&scene=match">进入比赛</a><a href="central-fog.jpg">中央区域与迷雾</a></header><video src="wildlife.webm" poster="road-0.jpg" autoplay loop muted playsinline controls></video></html>`);
  console.log(JSON.stringify({ cases: report.cases, errors, assetErrors: report.assetErrors, resources: report.resources, failures: report.failures }));
  if (errors.length || report.assetErrors.length || report.failures.length) process.exitCode = 1;
} finally { await browser.close(); }
