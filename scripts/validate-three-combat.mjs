import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/combat-migration';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
const errors = [], failed = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push({ text: message.text(), location: message.location() }); });
page.on('response', response => { if (response.status() >= 400) failed.push({ url: response.url(), status: response.status() }); });
try {
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
  await page.locator('#viewport').click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${output}/combat-idle.jpg`, fullPage: true });
  const result = await page.evaluate(async () => {
    // Isolated deterministic harness: production modules, no second simulation inside the game.
    const [{ ThreeArena }, { PrototypeHost }, { createCombatPractice }, { ThreeAudio }, { COMBAT_ART }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'),
      import('/src/game/CombatPractice.ts'), import('/src/presentation/ThreeAudio.ts'), import('/src/render-three/CombatArt.ts'),
    ]);
    document.querySelector('#pause').click();
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(createCombatPractice, view), audio = new ThreeAudio();
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.8); view.cameraRig.lookAt(host.match.hero('blue'));
    view.onFrame = frame => audio.update(frame, view.cameraRig.focus, 1000);
    audio.unlock();
    const stats = { art: [], frames: [], audioRequests: [], errors: [], resources: [], sources: [], audioEnergy: [] };
    const context = audio.combat.audioContext;
    const analyser = context.createAnalyser(); analyser.fftSize = 256;
    const originalConnect = AudioNode.prototype.connect;
    AudioNode.prototype.connect = function(destination, ...args) {
      const value = originalConnect.call(this, destination, ...args);
      if (destination === context.destination && this.context === context) originalConnect.call(this, analyser);
      return value;
    };
    const createSource = context.createBufferSource.bind(context);
    context.createBufferSource = () => {
      const source = createSource(), start = source.start.bind(source);
      source.start = (...args) => { stats.sources.push({ duration: source.buffer?.duration, loop: source.loop }); return start(...args); };
      return source;
    };
    // Load every original sheet before deterministic timing samples.
    for (const [key, spec] of Object.entries(COMBAT_ART)) {
      const image = new Image(); image.src = spec.url; await image.decode();
      stats.art.push({ key, width: image.width, height: image.height });
    }
    await new Promise(resolve => setTimeout(resolve, 1400));
    const tick = (count = 1) => { for (let i = 0; i < count; i++) host.update(1 / 60); };
    const save = name => {
      host.update(0); const samples = new Float32Array(256); analyser.getFloatTimeDomainData(samples);
      stats.audioEnergy.push({ name, rms: Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length) });
      stats.frames.push({ name, time: host.match.time, calls: view.renderer.info.render.calls, geometry: view.renderer.info.memory.geometries, textures: view.renderer.info.memory.textures, cards: view.combat.sprites.group.children.filter(card => card.visible).map(card => card.name) });
    };
    window.combatValidation = { view, host, audio, tick, save, stats, container, restoreAudio: () => { AudioNode.prototype.connect = originalConnect; } };
    tick(); return stats;
  });
  const capture = async name => {
    await page.evaluate(name => window.combatValidation.save(name), name);
    await page.screenshot({ path: `${output}/${name}.jpg` });
  };
  // Warm lazy GPU textures without advancing gameplay between asset loads.
  await page.evaluate(() => { const { host, tick } = window.combatValidation; host.command({ kind: 'cast', ability: 'q', point: host.match.hero('red') }); tick(12); });
  await page.waitForTimeout(500);
  await capture('q-draw');
  await page.evaluate(() => window.combatValidation.tick(16));
  await page.waitForTimeout(250); await capture('q-contact');
  await page.evaluate(() => {
    const { host, tick } = window.combatValidation; tick(25); host.match.hero('blue').abilities.w = 0;
    const h = host.match.hero('blue'); if (!host.command({ kind: 'cast', ability: 'w', point: { x: h.x + 50, y: h.y + 80 } })) throw new Error('W rejected'); tick(40);
  });
  await page.waitForTimeout(500); await capture('wind-wall');
  await page.evaluate(() => {
    const { host, tick } = window.combatValidation; host.restart(); tick();
    const h = host.match.hero('blue'); h.qStacks = 2; h.qReadyAt = host.match.time - .2; h.qStacksUntil = host.match.time + 6; tick();
  });
  await page.waitForTimeout(400); await capture('q3-ready');
  await page.evaluate(() => { const { host, tick } = window.combatValidation; host.command({ kind: 'cast', ability: 'q', point: host.match.hero('red') }); tick(24); });
  await page.waitForTimeout(400); await capture('tornado');
  await page.evaluate(() => { const { host, tick } = window.combatValidation; tick(12); host.command({ kind: 'cast', ability: 'r', point: host.match.hero('red') }); tick(40); });
  await page.waitForTimeout(400); await capture('ultimate');
  await page.evaluate(() => {
    const { host, tick } = window.combatValidation; host.restart(); tick();
    const h = host.match.hero('blue'); h.qStacks = 2; h.qReadyAt = 0; h.qStacksUntil = 6;
    host.command({ kind: 'cast', ability: 'e', point: host.match.hero('red') }); tick(9);
    if (!host.command({ kind: 'cast', ability: 'q', point: host.match.hero('red') })) throw new Error('EQ3 rejected'); tick(25);
  });
  await page.waitForTimeout(400); await capture('eq3');
  await page.evaluate(() => {
    const { host, tick } = window.combatValidation; host.restart(); tick(); const h = host.match.hero('blue');
    h.passiveShieldAt = host.match.time; h.passiveShieldUntil = host.match.time + 1; h.passiveShield = 100; tick(8);
    host.command({ kind: 'summoner', key: 'f', point: host.match.hero('red'), targetId: host.match.hero('red').id }); tick(12);
  });
  await page.waitForTimeout(400); await capture('shield-ignite');
  await page.evaluate(() => {
    const { host, tick } = window.combatValidation; host.command({ kind: 'summoner', key: 'd', point: { x: host.match.hero('blue').x + 100, y: host.match.hero('blue').y }, targetId: null }); tick(6);
  });
  await page.waitForTimeout(400); await capture('flash');
  await page.evaluate(() => {
    const { host, view, tick } = window.combatValidation; host.restart(); tick();
    const tower = host.match.tower('blue'); tower.hp = 0; view.cameraRig.lookAt(tower); view.cameraRig.setZoom(.65); tick();
  });
  await capture('tower-rubble');
  await page.evaluate(async () => {
    const { host, view, tick } = window.combatValidation;
    const [{ ART_BRAZIERS, artBrazierMount }, { bridgePoint }] = await Promise.all([import('/src/render-three/PaintedMapLayout.ts'), import('/src/game/Bridge.ts')]);
    host.restart(); const mount = artBrazierMount(ART_BRAZIERS[0].u, ART_BRAZIERS[0].v), point = bridgePoint(mount.u, mount.v);
    Object.assign(host.match.hero('blue'), { x: point.x + 35, y: point.y + 25 });
    view.cameraRig.lookAt(point); tick(10);
  });
  await capture('fire-and-environment');
  const verification = await page.evaluate(async () => {
    const { host, view, audio, tick, stats } = window.combatValidation;
    host.pause(); const before = host.match.time; tick(120); const paused = host.match.time === before;
    for (let i = 0; i < 5; i++) { host.restart(); tick(2); stats.resources.push({ geometry: view.renderer.info.memory.geometries, textures: view.renderer.info.memory.textures }); }
    stats.errors.push(...view.combat.sprites.errors, ...view.sprites.errors, ...view.architecturalIce.errors);
    stats.audioRequests = performance.getEntriesByType('resource').filter(e => /\.(mp3|wav|ogg)/.test(e.name)).map(e => e.name);
    const contextState = audio.combat.audioContext?.state;
    const performanceSamples = [];
    for (const reduced of [false, true]) {
      view.setQuality(reduced); const costs = []; let previous = performance.now();
      for (let i = 0; i < 45; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const now = performance.now(); if (i > 5) costs.push(now - previous); previous = now; host.update(1 / 60);
      }
      costs.sort((a, b) => a - b);
      performanceSamples.push({ reduced, median: costs[Math.floor(costs.length / 2)], p95: costs[Math.floor(costs.length * .95)], calls: view.renderer.info.render.calls });
    }
    view.setQuality(true); tick(); const lowDrawCalls = view.renderer.info.render.calls; view.setQuality(false); tick();
    const memory = { ...view.renderer.info.memory };
    audio.dispose(); host.dispose(); window.combatValidation.restoreAudio(); window.combatValidation.container.remove();
    return { paused, contextState, lowDrawCalls, memory, performanceSamples, stats };
  });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await page.locator('#viewport').click();
  await page.keyboard.press('3'); await page.waitForTimeout(150);
  await page.keyboard.press('s'); await page.keyboard.press('w'); await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.screenshot({ path: `${output}/normal-gameplay.jpg`, fullPage: true });
  verification.productionInputs = { scenario: await page.locator('#scenario').inputValue(), hud: await page.locator('#combat-hud').textContent(), errorHidden: await page.locator('#error').isHidden() };
  await writeFile(`${output}/browser-report.json`, JSON.stringify({ initial: result.art, verification, errors, failed }, null, 2));
  console.log(JSON.stringify({ paused: verification.paused, contextState: verification.contextState, audioFiles: verification.stats.audioRequests.length, frames: verification.stats.frames, resources: verification.stats.resources, errors, failed }, null, 2));
  if (errors.length || failed.length || verification.stats.errors.length || !verification.paused) process.exitCode = 1;
} finally { await browser.close(); }
