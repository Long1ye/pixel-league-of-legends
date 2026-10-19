import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output = 'docs/visual-validation/2026-10-19/airborne-motion'; await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
 await page.evaluate(async () => {
  document.querySelector('#pause').click();
  const [{ ThreeArena }, { PrototypeHost }, { createCombatPractice }, { airborneMotion }] = await Promise.all([
   import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/CombatPractice.ts'), import('/src/render/AirborneMotion.ts'),
  ]);
  const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
  const view = new ThreeArena(container), host = new PrototypeHost(createCombatPractice, view);
  const h = host.match.hero('blue'); view.cameraRig.setElevation(45); view.cameraRig.setZoom(.8); view.cameraRig.lookAt({ x: h.x + 35, y: h.y });
  const tick = (count = 1) => { for (let i = 0; i < count; i++) host.update(1 / 120); };
  const launch = () => { host.restart(); const h = host.match.hero('blue'), target = host.match.hero('red'); target.x = h.x + 83; target.y = h.y;
   h.qStacks = 2; h.qStacksUntil = 6; h.qReadyAt = 0; tick(2); host.command({ kind: 'cast', ability: 'q', point: target });
   for (let i = 0; i < 240 && target.airborneStartedAt === undefined; i++) tick();
   if (target.airborneStartedAt === undefined) throw new Error('Q3 did not connect'); return target.airborneStartedAt;
  };
  window.airReview = { host, view, tick, launch, airborneMotion, frames: [] }; tick(); await new Promise(r => setTimeout(r, 700));
  window.airReview.start = launch();
 });
 for (const [age, name] of [[0, 'impact'], [.033, 'push'], [.083, 'rising'], [.16, 'rise-end'], [.35, 'apex'], [.6, 'suspended'], [.78, 'fall-start'], [.90, 'falling'], [.99, 'touchdown'], [1.025, 'landing-compress'], [1.075, 'landing-recover'], [1.19, 'recovered']]) {
  await page.evaluate(({ age, name }) => {
   const { host, view, tick, airborneMotion, start, frames } = window.airReview;
   while (host.match.time < start + age - .000001) tick(); host.update(0);
   const target = host.match.hero('red'), body = view.sprites.body(target.id), pose = airborneMotion(target, host.match.time), p = body.geometry.getAttribute('position');
   frames.push({ name, age: host.match.time - start, time: host.match.time, pose, y: body.position.y, vertices: [0, 1, 2, 3].map(i => [p.getX(i), p.getY(i)]), hp: target.hp, x: target.x, groundY: target.y });
  }, { age, name });
  await page.screenshot({ path: `${output}/${name}.jpg` });
 }
 const report = await page.evaluate(() => {
  const { host, view, launch, tick, airborneMotion, frames } = window.airReview;
  launch(); tick(10); host.pause(); const before = airborneMotion(host.match.hero('red'), host.match.time), time = host.match.time; tick(240);
  const paused = host.match.time === time && JSON.stringify(before) === JSON.stringify(airborneMotion(host.match.hero('red'), host.match.time)); host.pause();
  const start = launch(); while (host.match.time < start + .86) tick();
  const target = host.match.hero('red'), from = airborneMotion(target, host.match.time); if (!host.command({ kind: 'cast', ability: 'r', point: target })) throw new Error('R rejected');
  const to = airborneMotion(target, host.match.time), holdContinuous = Math.abs(from.lift - to.lift) < .001;
  tick(240); const landed = airborneMotion(target, host.match.time);
  host.restart(); tick(2); const reset = view.sprites.body(host.match.hero('red').id).position.y;
  const result = { frames, paused, holdContinuous, landed, reset, errors: [...view.sprites.errors, ...view.combat.sprites.errors] }; host.dispose(); return result;
 });
 await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors: [...errors, ...report.errors] }, null, 2));
 if (errors.length || report.errors.length || !report.paused || !report.holdContinuous || report.landed.active || Math.abs(report.reset - .7) > .001) throw new Error('Airborne runtime verification failed');
 console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
