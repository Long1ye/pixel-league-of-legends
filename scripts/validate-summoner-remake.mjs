import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output = 'docs/visual-validation/2026-10-19/summoner-remake/review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
 await page.evaluate(async () => {
  document.querySelector('#pause').click();
  const [{ ThreeArena }, { PrototypeHost }, { createCombatPractice }, { SummonerAudio }] = await Promise.all([
   import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/CombatPractice.ts'), import('/src/ui/SummonerAudio.ts'),
  ]);
  const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
  const view = new ThreeArena(container), host = new PrototypeHost(createCombatPractice, view), context = new AudioContext(), audio = new SummonerAudio();
  await context.resume(); await audio.load(context);
  const analyser = context.createAnalyser(); analyser.fftSize = 512;
  const connect = AudioNode.prototype.connect, sources = [], create = context.createBufferSource.bind(context);
  AudioNode.prototype.connect = function (destination, ...args) { const result = connect.call(this, destination, ...args); if (this.context === context && destination === context.destination) connect.call(this, analyser); return result; };
  context.createBufferSource = () => {
   const s = create(), start = s.start.bind(s), stop = s.stop.bind(s), record = { duration: 0, loop: false, stopped: false };
   s.start = (...args) => { record.duration = s.buffer.duration; record.loop = s.loop; sources.push(record); start(...args); };
   s.stop = (...args) => { record.stopped = true; stop(...args); }; return s;
  };
  view.cameraRig.setElevation(45); view.cameraRig.setZoom(.8); view.cameraRig.lookAt(host.match.hero('blue'));
  view.onFrame = frame => audio.update(frame.match, context, true, true);
  const tick = (n = 1) => { for (let i = 0; i < n; i++) host.update(1 / 60); };
  tick(); await new Promise(r => setTimeout(r, 600));
  window.spells = { host, view, context, audio, analyser, sources, tick, errors: [], restore: () => { AudioNode.prototype.connect = connect; } };
 });
 const shot = async name => { await page.screenshot({ path: `${output}/${name}.jpg` }); };
 await page.evaluate(() => { const { host, tick } = window.spells, h = host.match.hero('blue'); h.qStacks = 2; h.qReadyAt = host.match.time - .5; h.qStacksUntil = host.match.time + 6; tick(); });
 await shot('q3-wind');
 await page.evaluate(() => { const { host, tick } = window.spells, h = host.match.hero('blue'); h.qStacks = 0; h.passiveShieldAt = host.match.time; h.passiveShieldUntil = host.match.time + 1; h.passiveShield = 100; tick(8); });
 await shot('shield-active');
 await page.evaluate(() => { const { host, tick } = window.spells; host.match.hero('blue').passiveShield = 0; tick(4); });
 await shot('shield-break');
 await page.evaluate(() => { const { host, tick } = window.spells; tick(20); host.command({ kind: 'summoner', key: 'd', point: { x: host.match.hero('blue').x - 90, y: host.match.hero('blue').y + 20 }, targetId: null }); tick(2); });
 await shot('flash-snap');
 await page.waitForTimeout(2600); // Play the full original flash recording.
 await page.evaluate(() => { const { host, tick } = window.spells; host.restart(); tick(); host.command({ kind: 'summoner', key: 'f', point: host.match.hero('red'), targetId: host.match.hero('red').id }); tick(7); });
 await shot('ignite');
 const energy = [];
 for (let i = 0; i < 11; i++) {
  await page.waitForTimeout(500);
  energy.push(await page.evaluate(() => { const { host, tick, analyser } = window.spells; tick(30); const data = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(data); return { time: host.match.time, rms: Math.sqrt(data.reduce((sum, x) => sum + x * x, 0) / data.length) }; }));
 }
 await shot('ignite-ended');
 const report = await page.evaluate(() => {
  const { view, sources, audio, host, context, restore } = window.spells;
  const result = { sources, failed: audio.failed, effects: host.match.summonerEffects.length, resources: { ...view.renderer.info.memory } };
  audio.dispose(); host.dispose(); void context.close(); restore(); return result;
 });
 await writeFile(`${output}/report.json`, JSON.stringify({ ...report, energy, errors }, null, 2));
 if (report.failed || errors.length || !report.sources.some(s => s.loop && s.stopped) || !energy.some(s => s.rms > .001)) throw new Error('Summoner runtime validation failed');
 console.log(JSON.stringify({ ...report, energy, errors }, null, 2));
} finally { await browser.close(); }
