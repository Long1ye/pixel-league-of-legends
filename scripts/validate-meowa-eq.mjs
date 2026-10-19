import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output = 'docs/visual-validation/2026-10-19/meowa-eq'; await mkdir(output, { recursive: true });
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
  const tick = (n = 1) => { for (let i = 0; i < n; i++) host.update(1 / 120); };
  const start = (empowered, elevation = 60) => {
   host.restart(); const h = host.match.hero('blue'), target = host.match.hero('red');
   if (empowered) { h.qStacks = 2; h.qStacksUntil = 6; h.qReadyAt = 0; }
   view.cameraRig.setElevation(elevation); view.cameraRig.setZoom(.8); view.cameraRig.lookAt({ x: h.x + 65, y: h.y }); tick(2);
   if (!host.command({ kind: 'cast', ability: 'e', point: target })) throw new Error('E rejected'); tick(14);
   if (!host.command({ kind: 'cast', ability: 'q', point: target })) throw new Error('EQ rejected');
   return h.eqCast.triggerAt;
  };
  const cards = () => view.combat.sprites.group.children.filter(c => c.visible && c.name.startsWith('meowa-eq')).map(c => ({ name: c.name, opacity: c.material.opacity, depthTest: c.material.depthTest, x: c.position.x, y: c.position.y, z: c.position.z }));
  window.eqReview = { host, view, tick, start, cards, records: [] }; tick(); await new Promise(r => setTimeout(r, 800));
 });
 for (const empowered of [false, true]) {
  const contact = await page.evaluate(empowered => window.eqReview.start(empowered), empowered);
  for (const [age, stage] of [[-.06, 'gather'], [0, 'contact'], [.075, 'sweep'], [.14, 'release'], [.24, 'fade'], [.32, 'finished']]) {
   await page.evaluate(({ age, contact, stage, empowered }) => {
    const { host, tick, cards, records } = window.eqReview;
    while (host.match.time < contact + age - .000001) tick(); host.update(0);
    records.push({ empowered, stage, time: host.match.time, after: host.match.time - contact, cards: cards(), targetHp: host.match.hero('red').hp });
   }, { age, contact, stage, empowered });
   await page.screenshot({ path: `${output}/${empowered ? 'eq3' : 'eq'}-${stage}.jpg` });
  }
 }
 for (const elevation of [45, 75]) {
  await page.evaluate(elevation => { const r = window.eqReview, contact = r.start(true, elevation); while (r.host.match.time < contact + .075) r.tick(); r.host.update(0); }, elevation);
  await page.screenshot({ path: `${output}/eq3-angle-${elevation}.jpg` });
 }
 const report = await page.evaluate(() => {
  const r = window.eqReview; const start = r.start(true); while (r.host.match.time < start + .05) r.tick();
  r.host.pause(); r.host.update(0); const before = JSON.stringify(r.cards()), time = r.host.match.time; r.tick(120);
  const paused = time === r.host.match.time && before === JSON.stringify(r.cards());
  r.host.restart(); r.tick(2); const cleared = r.cards().length === 0;
  const result = { records: r.records, paused, cleared, errors: [...r.view.sprites.errors, ...r.view.combat.sprites.errors] }; r.host.dispose(); return result;
 });
 await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors: [...errors, ...report.errors] }, null, 2));
 if (errors.length || report.errors.length || !report.paused || !report.cleared) throw new Error('EQ runtime checks failed');
 console.log(JSON.stringify({ paused: report.paused, cleared: report.cleared, errors, frames: report.records.length }));
} finally { await browser.close(); }
