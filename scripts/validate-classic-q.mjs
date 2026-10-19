import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/classic-q'; await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
 await page.evaluate(async () => {
  document.querySelector('#pause').click();
  const [{ ThreeArena }, { PrototypeHost }, { createCombatPractice }] = await Promise.all([
   import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/CombatPractice.ts'),
  ]);
  const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
  const view = new ThreeArena(container), host = new PrototypeHost(createCombatPractice, view);
  view.cameraRig.setElevation(45); view.cameraRig.setZoom(.8); view.cameraRig.lookAt(host.match.hero('blue'));
  const tick = (n = 1) => { for (let i = 0; i < n; i++) host.update(1 / 60); };
  const cast = (angle = 0, hit = true) => {
   host.restart(); const h = host.match.hero('blue'), target = host.match.hero('red');
   target.x = h.x + Math.cos(angle) * (hit ? 83 : 400); target.y = h.y + Math.sin(angle) * (hit ? 83 : 400);
   tick(); if (!host.command({ kind: 'cast', ability: 'q', point: { x: h.x + Math.cos(angle) * 130, y: h.y + Math.sin(angle) * 130 } })) throw new Error('Q rejected');
  };
  const stats = []; window.qReview = { host, view, tick, cast, stats };
  tick(); await new Promise(r => setTimeout(r, 800));
 });
 const shot = async name => {
  await page.evaluate(name => { const { host, view, stats } = window.qReview; stats.push({ name, time: host.match.time, hp: host.match.hero('red').hp, qStacks: host.match.hero('blue').qStacks, calls: view.renderer.info.render.calls, geometry: view.renderer.info.memory.geometries, strokeVertices: view.combat.group.getObjectByName('combat-foreground-contact-batch').geometry.drawRange.count }); }, name);
  await page.screenshot({ path: `${output}/${name}.jpg` });
 };
 await page.evaluate(() => window.qReview.cast());
 for (const [n, name] of [[20, 'windup'], [7, 'thrust-contact'], [4, 'thrust-wind'], [7, 'dissipate'], [12, 'recovered']]) { await page.evaluate(n => window.qReview.tick(n), n); await shot(name); }
 for (const [name, angle] of [['east', 0], ['northeast', -Math.PI / 4], ['north', -Math.PI / 2], ['northwest', -Math.PI * .75], ['west', Math.PI], ['southwest', Math.PI * .75], ['south', Math.PI / 2], ['southeast', Math.PI / 4]]) {
  await page.evaluate(angle => { const { cast, tick } = window.qReview; cast(angle, false); tick(29); }, angle); await shot(`aim-${name}`);
 }
 await page.evaluate(() => window.qReview.cast(0, true));
 await page.evaluate(async () => { const { host } = window.qReview; let previous = performance.now(); const end = host.match.time + 1.2, deadline = previous + 12000; while (host.match.time < end && performance.now() < deadline) { await new Promise(r => requestAnimationFrame(r)); const now = performance.now(); host.update(Math.min(.1, (now - previous) / 1000)); previous = now; } });
 const report = await page.evaluate(() => { const { host, view, stats, tick } = window.qReview;
  const h = host.match.hero('blue'); tick(60); h.abilities.q = 0; if (!host.command({ kind: 'cast', ability: 'q', point: host.match.hero('red') })) throw new Error('Second Q rejected'); tick(29);
  const q2 = { hp: host.match.hero('red').hp, stacks: h.qStacks };
  host.pause(); const time = host.match.time; tick(90); const paused = host.match.time === time;
  host.restart(); tick(); const resetVertices = view.combat.group.getObjectByName('combat-foreground-contact-batch').geometry.drawRange.count;
  const result = { stats, q2, paused, resetVertices, errors: [...view.combat.sprites.errors] }; host.dispose(); return result;
 });
 await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors: [...errors, ...report.errors] }, null, 2));
 if (errors.length || report.errors.length || !report.paused || report.resetVertices !== 0 || report.q2.stacks !== 2) throw new Error('Q browser validation failed');
 console.log(JSON.stringify(report, null, 2));
} finally { await page.close(); await browser.close(); }
