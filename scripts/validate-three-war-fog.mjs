import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/war-fog'; await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.screenshot({ path: `${output}/production-start.jpg`, type: 'jpeg', quality: 85 });
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), center = bridgePoint(0);
    const host = new PrototypeHost(() => {
      const match = new Match({ ai: false, waves: false });
      Object.assign(match.hero('blue'), { x: center.x - 180, y: center.y, speed: 0 });
      Object.assign(match.hero('red'), { x: center.x + 240, y: center.y, speed: 0, damage: 0 });
      return match;
    }, view);
    view.fogEnabled = true; view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.cameraRig.lookAt({ x: center.x + 50, y: center.y }); host.update(0);
    window.warFogTest = { host, view, center };
  });
  await page.waitForTimeout(1600);
  const report = { cases: [], errors };
  report.cases.push(await page.evaluate(() => {
    const { host, view } = window.warFogTest; host.update(0);
    const enemy = host.match.hero('red'), point = view.cameraRig.project(enemy, 35), rect = view.renderer.domElement.getBoundingClientRect();
    return { name: 'hidden enemy', passed: !view.canSeeEntity(enemy) && !view.sprites.body(enemy.id) && view.pickActor({ x: rect.left + point.x, y: rect.top + point.y }) === null && !view.healthBars.element.querySelector(`[data-entity-id="${enemy.id}"]`) };
  }));
  await page.screenshot({ path: `${output}/fog-hidden.jpg`, type: 'jpeg', quality: 87 });
  report.color = await page.evaluate(() => {
    const { host, view } = window.warFogTest, gl = view.renderer.getContext();
    const p = view.cameraRig.project({ x: host.match.hero('blue').x + 45, y: host.match.hero('blue').y });
    const x = Math.floor(p.x / view.cameraRig.size.width * gl.drawingBufferWidth), y = gl.drawingBufferHeight - Math.floor(p.y / view.cameraRig.size.height * gl.drawingBufferHeight);
    const read = () => { const pixels = new Uint8Array(20 * 20 * 4); gl.readPixels(x - 10, y - 10, 20, 20, gl.RGBA, gl.UNSIGNED_BYTE, pixels); return pixels; };
    view.fogEnabled = false; host.update(0); const direct = read();
    view.fogEnabled = true; host.update(0); const composited = read();
    let total = 0, max = 0;
    for (let i = 0; i < direct.length; i++) if (i % 4 !== 3) { const delta = Math.abs(direct[i] - composited[i]); total += delta; max = Math.max(max, delta); }
    return { visibleMeanDifference: total / (20 * 20 * 3), visibleMaximumDifference: max };
  });
  await page.evaluate(() => { const { host, view } = window.warFogTest; view.fogEnabled = false; host.update(0); });
  await page.screenshot({ path: `${output}/fog-off.jpg`, type: 'jpeg', quality: 87 });
  report.cases.push(await page.evaluate(() => {
    const { host, view, center } = window.warFogTest;
    view.fogEnabled = true; window.warFogTest.ally = host.match.spawnMinion('blue', 'melee', { x: center.x + 170, y: center.y });
    for (let i = 1; i <= 10; i++) { host.match.time = i / 20; host.update(0); }
    return { name: 'shared minion sight', passed: view.canSeeEntity(host.match.hero('red')) && !!view.sprites.body(host.match.hero('red').id) };
  }));
  await page.waitForTimeout(600);
  await page.evaluate(() => window.warFogTest.host.update(0));
  await page.screenshot({ path: `${output}/fog-shared.jpg`, type: 'jpeg', quality: 87 });
  report.cases.push(await page.evaluate(() => {
    const state = window.warFogTest, { host, view, center } = state; state.ally.hp = 0;
    host.match.hero('blue').x = center.x - 600;
    for (let i = 1; i <= 20; i++) { host.match.time = .5 + i / 10; host.update(0); }
    const enemy = host.match.hero('red');
    return { name: 'lost sight hides body and bar', passed: !view.canSeeEntity(enemy) && !view.sprites.body(enemy.id) && !view.healthBars.element.querySelector(`[data-entity-id="${enemy.id}"]`) };
  }));
  await page.screenshot({ path: `${output}/fog-memory.jpg`, type: 'jpeg', quality: 87 });
  report.cases.push(await page.evaluate(() => {
    const { host, view } = window.warFogTest; host.pause(); host.update(0);
    const previous = view.warFog.data.slice(), oldSources = JSON.stringify(view.vision.sources);
    view.pan(100, 40); host.update(0);
    return { name: 'paused camera never reveals', passed: previous.every((n, i) => n === view.warFog.data[i]) && oldSources === JSON.stringify(view.vision.sources) };
  }));
  report.cases.push(await page.evaluate(async () => {
    const { ART_BRUSHES } = await import('/src/render-three/PaintedMapLayout.ts');
    const { bridgePoint } = await import('/src/game/Bridge.ts');
    const state = window.warFogTest, { host, view } = state, brush = ART_BRUSHES.find(brush => brush.id === 'center-opposite');
    host.restart();
    state.brush = brush;
    Object.assign(host.match.hero('red'), bridgePoint(brush.u, brush.v));
    Object.assign(host.match.hero('blue'), bridgePoint(brush.u, brush.v - Math.sign(brush.v) * (brush.width / 2 + 25)));
    host.update(0);
    view.cameraRig.lookAt(host.match.hero('blue')); host.update(0);
    return { name: 'authored brush conceals enemy', passed: !view.canSeeEntity(host.match.hero('red')) };
  }));
  await page.screenshot({ path: `${output}/fog-brush-hidden.jpg`, type: 'jpeg', quality: 87 });
  report.brushColor = await page.evaluate(async () => {
    const { bridgePoint } = await import('/src/game/Bridge.ts');
    const { host, view, brush } = window.warFogTest;
    const enemy = host.match.hero('red'), hp = enemy.hp; enemy.hp = 0;
    for (let i = 1; i <= 30; i++) { host.match.time = i / 10; host.update(0); }
    const gl = view.renderer.getContext(), point = view.cameraRig.project(bridgePoint(brush.u, brush.v), 35);
    const x = Math.floor(point.x / view.cameraRig.size.width * gl.drawingBufferWidth), y = gl.drawingBufferHeight - Math.floor(point.y / view.cameraRig.size.height * gl.drawingBufferHeight);
    const read = () => { const pixels = new Uint8Array(64 * 64 * 4); gl.readPixels(x - 32, y - 32, 64, 64, gl.RGBA, gl.UNSIGNED_BYTE, pixels); return pixels; };
    const compare = () => {
      view.fogEnabled = false; host.update(0); const direct = read();
      view.fogEnabled = true; host.update(0); const fogged = read();
      let delta = 0, original = 0, result = 0;
      for (let i = 0; i < direct.length; i++) if (i % 4 !== 3) { delta += Math.abs(direct[i] - fogged[i]); original += direct[i]; result += fogged[i]; }
      return { meanDifference: delta / (64 * 64 * 3), brightnessRatio: result / original };
    };
    const nearby = compare();
    window.warFogTest.brushProbe = { compare, enemy, hp };
    return { nearby };
  });
  await page.screenshot({ path: `${output}/brush-nearby.jpg`, type: 'jpeg', quality: 87 });
  await page.evaluate(() => { const { host, view } = window.warFogTest; view.fogEnabled = false; host.update(0); });
  await page.screenshot({ path: `${output}/brush-original.jpg`, type: 'jpeg', quality: 87 });
  report.brushColor.fogged = await page.evaluate(() => {
    const { host, view, brushProbe } = window.warFogTest;
    view.fogEnabled = true; host.match.hero('blue').x += 1500;
    for (let i = 31; i <= 60; i++) { host.match.time = i / 10; host.update(0); }
    return brushProbe.compare();
  });
  await page.screenshot({ path: `${output}/brush-outside-sight.jpg`, type: 'jpeg', quality: 87 });
  report.cases.push({ name: 'nearby grass keeps original color', passed: report.brushColor.nearby.meanDifference < 3 });
  report.cases.push({ name: 'grass outside sight remains dark', passed: report.brushColor.fogged.brightnessRatio < .8 });
  await page.evaluate(() => { const { brushProbe } = window.warFogTest; brushProbe.enemy.hp = brushProbe.hp; });
  report.cases.push(await page.evaluate(async () => {
    const { bridgePoint } = await import('/src/game/Bridge.ts');
    const state = window.warFogTest, { host, view, brush } = state;
    Object.assign(host.match.hero('blue'), bridgePoint(brush.u + 2, brush.v)); host.match.time = .5; host.update(0);
    return { name: 'entering same brush reveals enemy', passed: view.canSeeEntity(host.match.hero('red')) };
  }));
  await page.screenshot({ path: `${output}/fog-brush-shared.jpg`, type: 'jpeg', quality: 87 });
  report.resources = await page.evaluate(() => {
    const { host, view } = window.warFogTest, snapshots = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(0); snapshots.push({ ...view.renderer.info.memory }); }
    return snapshots;
  });
  report.failures = report.cases.filter(c => !c.passed).map(c => c.name);
  if (report.color.visibleMeanDifference > 3) report.failures.push('visible-region color management');
  if (report.resources.some(r => r.geometries !== report.resources[0].geometries || r.textures !== report.resources[0].textures)) report.failures.push('resource growth');
  await page.evaluate(() => window.warFogTest.host.dispose());
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await writeFile(`${output}/comparison.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>战争迷雾：草丛颜色修正</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:14px}select{padding:8px}img{display:block;width:100%;max-width:1600px;margin:auto}</style><header><select id="case"><option value="brush-nearby">视野内草丛：保持原色</option><option value="brush-original">同镜头关闭迷雾：原色对照</option><option value="brush-outside-sight">失去视野：草丛随迷雾压暗</option><option value="fog-brush-hidden">草外观察：敌人仍隐藏</option><option value="fog-brush-shared">进入同片草：敌人出现</option><option value="fog-hidden">当前视野：敌人隐藏</option><option value="fog-shared">小兵开视野：敌人出现</option><option value="fog-memory">视野离开：保留暗色地形</option><option value="fog-off">关闭迷雾对照</option><option value="production-start">实际出生画面</option></select>　固定 45° · 正常缩放 0.6 · 视野跟随单位，镜头不揭图</header><img id="frame" src="brush-nearby.jpg"><script>document.querySelector('#case').onchange=e=>document.querySelector('#frame').src=e.target.value+'.jpg'</script></html>`);
  console.log(JSON.stringify(report));
  if (errors.length || report.failures.length) process.exitCode = 1;
} finally { await browser.close(); }
