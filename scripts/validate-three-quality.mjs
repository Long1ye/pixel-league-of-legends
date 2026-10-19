import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/quality-optimization'; await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const errors = [], failures = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
try {
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    document.querySelector('#pause').click();
    const [{ ThreeArena }, { PrototypeHost }, { createCombatPractice }, { bridgePoint }, { ART_OUTER_U, ART_BASE }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/CombatPractice.ts'), import('/src/game/Bridge.ts'), import('/src/render-three/PaintedMapLayout.ts'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;background:#111c2b;z-index:100'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(createCombatPractice, view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6);
    host.update(1 / 60); host.pause();
    window.qualityValidation = { view, host, container, bridgePoint, ART_OUTER_U, ART_BASE, samples: [] };
  });
  await page.waitForTimeout(1600);
  for (const scene of ['central', 'tower', 'sanctuary']) {
    await page.evaluate(scene => {
      const { view, host, bridgePoint, ART_OUTER_U, ART_BASE } = window.qualityValidation;
      const u = scene === 'tower' ? -ART_OUTER_U : scene === 'sanctuary' ? ART_BASE.innerTower[0] + 8 : -18;
      const point = bridgePoint(u, scene === 'central' ? 0 : -24);
      Object.assign(host.match.hero('blue'), point); Object.assign(host.match.hero('red'), { x: point.x + 59, y: point.y });
      view.cameraRig.lookAt(point); view.cameraRig.setZoom(scene === 'sanctuary' ? .5 : .65); host.update(0);
    }, scene);
    for (const enhanced of [false, true]) {
      await page.evaluate(enhanced => { const { view, host } = window.qualityValidation; view.setEnhanced(enhanced); host.update(0); }, enhanced);
      await page.waitForTimeout(200);
      const sample = await page.evaluate(({ scene, enhanced }) => {
        const { view, host } = window.qualityValidation; host.update(0);
        const light = view.painted.group.children.find(object => object.isDirectionalLight), camera = light.shadow.camera;
        const sample = { scene, enhanced, time: host.match.time, calls: view.renderer.info.render.calls, geometry: view.renderer.info.memory.geometries, textures: view.renderer.info.memory.textures, shadowWorldTexel: (camera.right - camera.left) / light.shadow.mapSize.x, contacts: view.contacts.group.visible, glow: view.architecturalGlow.group.visible };
        window.qualityValidation.samples.push(sample); return sample;
      }, { scene, enhanced });
      await page.screenshot({ path: `${output}/${scene}-${enhanced ? 'enhanced' : 'baseline'}.jpg` });
      console.log(JSON.stringify(sample));
    }
  }
  const effectDifferences = await page.evaluate(() => {
    const { view, host } = window.qualityValidation;
    const pixels = () => { host.update(0); const gl = view.renderer.getContext(), data = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, data); return data; };
    view.setEnhanced(true); const optimized = pixels(), differences = [];
    for (const effect of ['contact', 'materials', 'glow', 'grading', 'weather']) {
      view.setQualityEffect(effect, false); const without = pixels(); let changed = 0, maximum = 0;
      for (let i = 0; i < optimized.length; i += 4) { const difference = Math.max(Math.abs(optimized[i] - without[i]), Math.abs(optimized[i + 1] - without[i + 1]), Math.abs(optimized[i + 2] - without[i + 2])); if (difference) changed++; maximum = Math.max(maximum, difference); }
      differences.push({ effect, changedPixels: changed, maximumChannelDelta: maximum }); view.setQualityEffect(effect, true);
    }
    return differences;
  });
  const roundSpecific = await page.evaluate(() => {
    const { view, host } = window.qualityValidation;
    const gl = view.renderer.getContext();
    const pixels = () => { view.renderer.render(view.scene, view.cameraRig.camera); const data = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, data); return data; };
    const difference = (a, b) => { let changedPixels = 0, maximumChannelDelta = 0; for (let i = 0; i < a.length; i += 4) { const delta = Math.max(...[0, 1, 2].map(c => Math.abs(a[i + c] - b[i + c]))); if (delta) changedPixels++; maximumChannelDelta = Math.max(maximumChannelDelta, delta); } return { changedPixels, maximumChannelDelta }; };
    view.setEnhanced(true); host.update(0); view.quality.weather.value = 0;
    view.quality.surfaceRefinement.value = 0; const oldSurface = pixels();
    view.quality.surfaceRefinement.value = 1; const surface = difference(oldSurface, pixels());
    const hiddenWorld = view.scene.children.filter(object => object !== view.atmosphere.group).map(object => ({ object, visible: object.visible }));
    hiddenWorld.forEach(({ object }) => { object.visible = false; });
    const hidden = view.atmosphere.group.children.filter(object => object.name !== 'bridge-sparse-snow').map(object => ({ object, visible: object.visible }));
    hidden.forEach(({ object }) => { object.visible = false; });
    view.atmosphere.update(2, view.cameraRig); const oldSnow = pixels();
    view.quality.weather.value = 1; const newSnow = pixels(), weather = difference(oldSnow, newSnow);
    view.atmosphere.update(2.25, view.cameraRig); const moving = pixels(), temporal = difference(newSnow, moving);
    view.atmosphere.update(2.25, view.cameraRig); const frozen = difference(moving, pixels());
    hidden.forEach(({ object, visible }) => { object.visible = visible; });
    hiddenWorld.forEach(({ object, visible }) => { object.visible = visible; });
    const snow = view.atmosphere.group.getObjectByName('bridge-sparse-snow');
    host.update(0);
    return { surface, weather, temporal, frozen, snowVertices: snow.geometry.getAttribute('position').count };
  });
  const timing = await page.evaluate(async () => {
    const { view, host } = window.qualityValidation, results = [];
    for (const enhanced of [false, true]) {
      view.setEnhanced(enhanced);
      const samples = [];
      for (let i = 0; i < 55; i++) {
        await new Promise(requestAnimationFrame);
        const start = performance.now(); host.update(0); view.renderer.getContext().finish();
        if (i >= 10) samples.push(performance.now() - start);
      }
      samples.sort((a, b) => a - b);
      results.push({ enhanced, frames: samples.length, medianMs: samples[Math.floor(samples.length * .5)], p95Ms: samples[Math.floor(samples.length * .95)], note: 'Static sanctuary, host update + gl.finish; includes CPU/GPU synchronization, not a gameplay FPS guarantee.' });
    }
    view.setEnhanced(true); return results;
  });
  const details = [];
  for (const scene of ['fire-actors', 'lantern-actors', 'blue-ice', 'red-ice', 'canyon']) {
    const target = await page.evaluate(async scene => {
      const { view, host, bridgePoint } = window.qualityValidation;
      const [{ toSimulation }, { artEdgeV }] = await Promise.all([import('/src/render-three/Coordinates.ts'), import('/src/render-three/PaintedMapLayout.ts')]);
      let point, object;
      if (scene.endsWith('actors')) {
        const sources = view.illumination.sources.filter(entry => scene === 'fire-actors' ? entry.source.name === 'painted-fire-bowl' && entry.point.z < 0 : entry.strength < 1);
        const source = sources.reduce((a, b) => Math.hypot(a.point.x, a.point.z) < Math.hypot(b.point.x, b.point.z) ? a : b);
        point = toSimulation({ x: source.point.x, z: source.point.z + 62 }); object = source.source.name;
      } else if (scene.endsWith('ice')) {
        const team = scene === 'red-ice' ? 'red' : 'blue';
        const batch = view.architecturalIce.group.children.find(mesh => mesh.name.includes('coping-crown') && mesh.userData.team === team);
        const placements = batch.userData.placements.filter(p => p.side === 1);
        const placement = placements.reduce((a, b) => Math.abs(Math.abs(a.u) - 190) < Math.abs(Math.abs(b.u) - 190) ? a : b);
        point = bridgePoint(placement.u, artEdgeV(placement.u) - 8); object = batch.name;
      } else { point = bridgePoint(-18, 210); object = 'painted-bridge-arch'; }
      const actorOffset = scene.endsWith('actors') ? 0 : 3000;
      Object.assign(host.match.hero('blue'), { x: point.x + 10 + actorOffset, y: point.y + 5 + actorOffset });
      Object.assign(host.match.hero('red'), { x: point.x + 95 + actorOffset, y: point.y + 26 + actorOffset });
      view.cameraRig.lookAt(point); view.cameraRig.setZoom(.6); view.setEnhanced(true); host.update(0);
      return { object, time: host.match.time, lightAtBlueTorso: view.illumination.sample(host.match.hero('blue'), 38), lightAtRedTorso: view.illumination.sample(host.match.hero('red'), 38) };
    }, scene);
    for (const enabled of [false, true]) {
      await page.evaluate(({ scene, enabled }) => {
        const { view, host } = window.qualityValidation;
        if (scene.endsWith('actors')) {
          host.update(0);
          // Isolate the new per-pixel body illumination. Terrain and CPU body
          // palette stay identical, unlike the all-material quality toggle.
          for (const team of ['blue', 'red']) view.sprites.body(host.match.hero(team).id).material.userData.environmentReaction.value = enabled ? 1 : 0;
          view.renderer.render(view.scene, view.cameraRig.camera);
        } else { view.setQualityEffect(scene === 'canyon' ? 'grading' : 'materials', enabled); host.update(0); }
      }, { scene, enabled });
      await page.screenshot({ path: `${output}/${scene}-${enabled ? 'enabled' : 'disabled'}.jpg` });
    }
    const checks = await page.evaluate(async ({ scene }) => {
      const { view, host } = window.qualityValidation, gl = view.renderer.getContext();
      const read = () => { const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels); return pixels; };
      // Screenshots allow the browser to clear a non-preserved drawing buffer.
      // Render again immediately before each readback.
      view.renderer.render(view.scene, view.cameraRig.camera); const enabled = read();
      if (scene.endsWith('actors')) {
        for (const team of ['blue', 'red']) view.sprites.body(host.match.hero(team).id).material.userData.environmentReaction.value = 0;
        view.renderer.render(view.scene, view.cameraRig.camera);
      } else { view.setQualityEffect(scene === 'canyon' ? 'grading' : 'materials', false); host.update(0); }
      const disabled = read(); let changedPixels = 0, maximumChannelDelta = 0;
      for (let i = 0; i < enabled.length; i += 4) {
        const delta = Math.max(...[0, 1, 2].map(c => Math.abs(enabled[i + c] - disabled[i + c])));
        if (delta) changedPixels++; maximumChannelDelta = Math.max(maximumChannelDelta, delta);
      }
      // Warm the restored shaders and shadow target before checking a stopped frame.
      const ditherWasEnabled = gl.isEnabled(gl.DITHER); gl.disable(gl.DITHER);
      view.setEnhanced(true); host.update(0); host.update(0); const a = read(); host.update(0); const b = read();
      const pausedBitExact = a.every((value, i) => value === b[i]);
      let pausedChangedPixels = 0, pausedMaximumDelta = 0;
      const pausedDifferences = [];
      for (let i = 0; i < a.length; i += 4) {
        const delta = Math.max(...[0, 1, 2].map(c => Math.abs(a[i + c] - b[i + c])));
        if (delta) {
          pausedChangedPixels++; pausedMaximumDelta = Math.max(pausedMaximumDelta, delta);
          if (pausedDifferences.length < 6) pausedDifferences.push({ x: i / 4 % gl.drawingBufferWidth, y: Math.floor(i / 4 / gl.drawingBufferWidth), delta });
        }
      }
      // Texture derivatives can vary by a few 8-bit levels on a handful of
      // samples. Preserve the raw counts; require the clock to stay fixed and
      // the isolated weather clock check below to remain bit-stable.
      const pausedFrameStable = pausedBitExact || (pausedMaximumDelta <= 4 && pausedChangedPixels <= 32);
      let fullyFoggedPier = null;
      if (scene === 'canyon') {
        const { toThree } = await import('/src/render-three/Coordinates.ts');
        const { QUALITY_TUNING } = await import('/src/render-three/QualitySettings.ts');
        const structures = view.painted.group.children.filter(mesh => /^painted-(bridge-arch|load-bearing-pier)$/.test(mesh.name) && mesh.visible);
        // Compare projected deep-pier vertices with the exact background they
        // should dissolve into, rather than counting unrelated changed pixels.
        view.renderer.render(view.scene, view.cameraRig.camera); const withPiers = read();
        structures.forEach(mesh => { mesh.visible = false; });
        view.renderer.render(view.scene, view.cameraRig.camera); const background = read();
        structures.forEach(mesh => { mesh.visible = true; });
        let samples = 0, maximumDelta = 0;
        for (const mesh of structures) {
          const positions = mesh.geometry.getAttribute('position');
          for (let i = 0; i < positions.count; i++) {
            const world = toThree({ x: 0, y: 0 }).fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld);
            if (world.y > -QUALITY_TUNING.pierMistEnd - 5) continue;
            const screen = world.project(view.cameraRig.camera);
            const x = Math.floor((screen.x + 1) * gl.drawingBufferWidth / 2), y = Math.floor((screen.y + 1) * gl.drawingBufferHeight / 2);
            if (x < 2 || x >= gl.drawingBufferWidth - 2 || y < 2 || y >= gl.drawingBufferHeight - 2) continue;
            const pixel = (y * gl.drawingBufferWidth + x) * 4;
            maximumDelta = Math.max(maximumDelta, ...[0, 1, 2].map(c => Math.abs(withPiers[pixel + c] - background[pixel + c]))); samples++;
          }
        }
        fullyFoggedPier = { samples, maximumDelta };
      }
      if (ditherWasEnabled) gl.enable(gl.DITHER);
      return { changedPixels, maximumChannelDelta, pausedFrameStable, pausedBitExact, pausedChangedPixels, pausedMaximumDelta, pausedDifferences, fullyFoggedPier, pausedDitherEnabled: false };
    }, { scene });
    details.push({ scene, ...target, ...checks });
  }
  const verification = await page.evaluate(async () => {
    const { view, host, samples } = window.qualityValidation;
    view.setEnhanced(true); view.setQuality(true); host.update(0);
    const reduced = { calls: view.renderer.info.render.calls, glow: view.architecturalGlow.group.visible, contacts: view.contacts.group.visible };
    view.setQuality(false);
    const time = host.match.time; for (let i = 0; i < 20; i++) host.update(1 / 60); const paused = time === host.match.time;
    const motion = [], simulationBefore = JSON.stringify(host.match.entities);
    for (const resolution of [1280, 1920]) for (const zoom of [.4, .65, 1.5]) {
      view.setResolution(resolution); view.cameraRig.setZoom(zoom);
      for (let i = 0; i < 12; i++) { view.pan(2, -1); host.update(0); }
      const hero = host.match.hero('blue'); view.cameraRig.lookAt(hero); host.update(0);
      const projected = view.cameraRig.project(hero), picked = view.cameraRig.pick(projected, { left: 0, top: 0, ...view.cameraRig.size });
      motion.push({ resolution, zoom, pickingError: picked ? Math.hypot(picked.x - hero.x, picked.y - hero.y) : null });
    }
    const simulationUntouched = simulationBefore === JSON.stringify(host.match.entities);
    const resources = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(1 / 60); resources.push({ ...view.renderer.info.memory }); }
    const failures = [...view.painted.errors, ...view.landmarks.errors, ...view.sprites.errors, ...view.combat.sprites.errors];
    const renderer = view.renderer.getContext().getParameter(view.renderer.getContext().RENDERER);
    host.dispose(); window.qualityValidation.container.remove();
    return { samples, reduced, paused, resources, failures, renderer, motion, simulationUntouched };
  });
  await openThreeControls(page, true);
  await page.locator('#quality-options summary').click();
  await page.locator('[data-quality-effect="materials"]').uncheck();
  await page.locator('[data-quality-effect="weather"]').uncheck();
  const weatherUnchecked = !(await page.locator('[data-quality-effect="weather"]').isChecked());
  const customized = await page.locator('#quality-compare').textContent();
  await page.locator('#quality-compare').click();
  const baselineDisabled = await page.locator('[data-quality-effect="materials"]').isDisabled();
  await page.locator('#quality-compare').click();
  const restored = await page.locator('[data-quality-effect="materials"]').isChecked();
  const weatherRestored = await page.locator('[data-quality-effect="weather"]').isChecked();
  await page.screenshot({ path: `${output}/quality-controls.jpg`, fullPage: true });
  const stableResources = verification.resources.every(value => value.geometries === verification.resources[0].geometries && value.textures === verification.resources[0].textures);
  const validPicking = verification.motion.every(value => value.pickingError !== null && value.pickingError < 1e-8);
  if (errors.length || failures.length || verification.failures.length || !verification.paused || !verification.simulationUntouched || !stableResources || !validPicking || !baselineDisabled || !restored || !customized.includes('自定义') || effectDifferences.some(value => value.changedPixels === 0)) { console.log(JSON.stringify({ errors, failures, verification })); process.exitCode = 1; }
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); await openThreeControls(page); await page.locator('#pause').click();
  await page.locator('#quality-compare').click(); await page.waitForTimeout(150);
  await closeThreeControls(page); await page.screenshot({ path: `${output}/match-baseline.jpg` });
  await openThreeControls(page);
  await page.locator('#quality-compare').click(); await page.waitForTimeout(150);
  await closeThreeControls(page); await page.screenshot({ path: `${output}/match-enhanced.jpg` });
  await writeFile(`${output}/report.json`, JSON.stringify({ verification, errors, failures, effectDifferences, roundSpecific, timing, details, controls: { customized, baselineDisabled, restored, weatherUnchecked, weatherRestored }, pausedPixelTolerance: { maximumPixels: 32, maximumChannelDelta: 4 }, viewport: [1600, 900], internal: [1920, 1080] }, null, 2));
  if (errors.length || failures.length || details.some(sample => !sample.pausedFrameStable || sample.changedPixels === 0 || (sample.fullyFoggedPier && (!sample.fullyFoggedPier.samples || sample.fullyFoggedPier.maximumDelta > 3)))) process.exitCode = 1;
  if (!roundSpecific.surface.changedPixels || !roundSpecific.weather.changedPixels || !roundSpecific.temporal.changedPixels || roundSpecific.frozen.maximumChannelDelta > 1 || roundSpecific.frozen.changedPixels > 8 || roundSpecific.snowVertices !== 240) process.exitCode = 1;
  if (!weatherUnchecked || !weatherRestored) process.exitCode = 1;
} finally { await browser.close(); }
