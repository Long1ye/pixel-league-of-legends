import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/winter-dressing';
const varieties = process.argv[3] === '--varieties';
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
    host.match.time = 2; host.update(0); window.winterPreview = { view, host, bridgePoint };
  });
  await page.waitForTimeout(1400);
  const views = [ ['bridge', -285, 0, .6], ['wall', -357, -60, .6], ['red', 285, 0, .6], ['central', 0, -36, .4], ['sanctuary', -580, -20, .6] ];
  if (varieties) views.push(['fire', -310, -90, .6], ['grass', -260, -85, .6], ['crust', -427, -70, .6], ['post', -465, -80, .6]);
  for (const [name, u, v, zoom] of views) for (const enabled of [false, true]) {
    await page.evaluate(({ u, v, zoom, enabled, varieties }) => {
      const { view, host, bridgePoint } = window.winterPreview;
      view.cameraRig.lookAt(bridgePoint(u, v)); view.cameraRig.setZoom(zoom);
      view.setQualityEffect('winter', varieties || enabled); view.snowBanks.setVariety(varieties ? enabled : true); host.update(0);
    }, { u, v, zoom, enabled, varieties });
    await page.screenshot({ path: `${output}/${name}-${enabled ? 'after' : 'before'}.jpg`, type: 'jpeg', quality: 92 });
  }
  const report = await page.evaluate(() => {
    const { view, host, bridgePoint } = window.winterPreview;
    const gl = view.renderer.getContext(); gl.disable(gl.DITHER);
    const pixels = () => { host.update(0); const p = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, p); return p; };
    const diff = (a, b) => { let changed = 0, maximum = 0; for (let i = 0; i < a.length; i += 4) {
      const delta = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
      if (delta > 2) changed++; maximum = Math.max(maximum, delta);
    } return { changed, maximum }; };
    view.cameraRig.lookAt(bridgePoint(-285)); view.cameraRig.setZoom(.6);
    view.setQualityEffect('winter', false); pixels(); const before = pixels(), baselineCalls = view.renderer.info.render.calls;
    view.setQualityEffect('winter', true); pixels(); const after = pixels(), enhancedCalls = view.renderer.info.render.calls;
    const frozen = pixels();
    view.snowBanks.setVariety(false); pixels(); const oldSnow = pixels(), oldSnowCalls = view.renderer.info.render.calls;
    view.snowBanks.setVariety(true); pixels(); const newSnow = pixels(), newSnowCalls = view.renderer.info.render.calls;
    view.pan(18, 7); pixels(); view.cameraRig.lookAt(bridgePoint(-285)); const restored = pixels();
    const screen = view.cameraRig.project(bridgePoint(-285)), rect = view.renderer.domElement.getBoundingClientRect();
    const ground = view.ground({ x: rect.left + screen.x, y: rect.top + screen.y });
    const pickingError = Math.hypot(ground.x - bridgePoint(-285).x, ground.y - bridgePoint(-285).y);
    const source = view.winterDressing.crystalSources.find(s => s.name === 'painted-tower');
    const index = view.winterDressing.crystalSources.indexOf(source);
    source.visible = false; view.winterDressing.update(); const hiddenCrystalStrength = view.winterDressing.crystalColors.value[index].length();
    source.visible = true;
    view.setQuality(true); pixels(); const reducedFine = view.winterDressing.fine.value;
    view.setQuality(false); view.setEnhanced(false); pixels(); const baselineWinter = view.winterDressing.strength.value, baselinePendants = view.winterDressing.group.visible;
    view.setEnhanced(true); pixels();
    const resources = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.match.time = 2; host.update(0); resources.push({ ...view.renderer.info.memory }); }
    const result = { difference: diff(before, after), frozen: diff(after, frozen), cameraRestored: diff(after, restored),
      pickingError, hiddenCrystalStrength, reducedFine, baselineWinter, baselinePendants, resources,
      varietyDifference: diff(oldSnow, newSnow), varietyCalls: { before: oldSnowCalls, after: newSnowCalls },
      calls: { before: baselineCalls, after: enhancedCalls }, errors: [...view.winterDressing.errors, ...view.snowBanks.errors],
      snowBankCount: view.snowBanks.group.getObjectByName('snow-rubble-shoulder-batch')?.userData.placements.length ?? 0,
      snowKinds: [...new Set(view.snowBanks.varieties.placements.map(p => p.kind))],
      snowPlacements: view.snowBanks.varieties.placements,
      viewport: [1600, 900], zoom: .6, time: 2 };
    return result;
  });
  if (report.difference.changed < 10000) failures.push('insufficient visible change');
  if (report.snowKinds.length !== 8) failures.push('missing snow form');
  if (report.frozen.changed > 32 || report.frozen.maximum > 4) failures.push('paused rendering changed');
  if (report.cameraRestored.changed > 32 || report.cameraRestored.maximum > 4) failures.push('camera return changed');
  if (report.pickingError > 1e-6 || report.hiddenCrystalStrength !== 0) failures.push('source visibility or picking');
  if (report.reducedFine !== 0 || report.baselineWinter !== 0 || report.baselinePendants) failures.push('quality fallback');
  if (report.resources.some(r => r.geometries !== report.resources[0].geometries || r.textures !== report.resources[0].textures)) failures.push('resource growth');
  failures.push(...report.errors);
  report.snowContact = await page.evaluate(() => {
    const { view, host, bridgePoint } = window.winterPreview;
    const target = bridgePoint(-390, -95), start = { x: host.match.hero('blue').x, y: host.match.hero('blue').y };
    const accepted = host.command({ kind: 'move', point: target });
    for (let i = 0; i < 720; i++) host.update(1 / 60);
    view.cameraRig.lookAt(bridgePoint(-390, -45)); view.cameraRig.setZoom(.6); host.update(0);
    const hero = host.match.hero('blue'), time = host.match.time;
    host.pause(); for (let i = 0; i < 20; i++) host.update(1 / 60);
    return { accepted, start, end: { x: hero.x, y: hero.y }, target, distance: Math.hypot(hero.x - target.x, hero.y - target.y), paused: host.match.time === time };
  });
  await page.waitForTimeout(400); await page.evaluate(() => window.winterPreview.host.update(0));
  await page.screenshot({ path: `${output}/snow-contact.jpg`, type: 'jpeg', quality: 92 });
  if (!report.snowContact.accepted || !report.snowContact.paused || report.snowContact.distance > 12) failures.push('snow-side movement');
  await page.evaluate(() => window.winterPreview.host.dispose());
  await page.goto(`http://127.0.0.1:5173/${output}/comparison.html`, { waitUntil: 'networkidle' });
  const viewer = [];
  for (const [camera] of views) {
    await page.selectOption('#camera', camera);
    await page.waitForFunction(() => [...document.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0));
    viewer.push({ camera, imagesLoaded: true });
  }
  await page.locator('#before').click();
  const beforeClip = await page.locator('#old').evaluate(i => i.style.clipPath);
  await page.locator('#after').click();
  const afterClip = await page.locator('#old').evaluate(i => i.style.clipPath);
  if (beforeClip !== 'inset(0px 0% 0px 0px)' || afterClip !== 'inset(0px 100% 0px 0px)') failures.push('comparison controls');
  report.viewer = { cameras: viewer, beforeClip, afterClip };
  await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors, failures }, null, 2));
  const { snowPlacements, ...summary } = report;
  console.log(JSON.stringify({ ...summary, snowPlacementCount: snowPlacements.length, errors, failures }, null, 2));
} finally { await browser.close(); }
if (errors.length || failures.length) process.exitCode = 1;
