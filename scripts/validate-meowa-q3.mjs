import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/meowa-q3'; await mkdir(output, { recursive: true });
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
   target.x = h.x + Math.cos(angle) * (hit ? 135 : 600); target.y = h.y + Math.sin(angle) * (hit ? 135 : 600);
   h.qStacks = 2; h.qReadyAt = 0; h.qStacksUntil = 6;
   tick(); if (!host.command({ kind: 'cast', ability: 'q', point: { x: h.x + Math.cos(angle) * 200, y: h.y + Math.sin(angle) * 200 } })) throw new Error('Q3 rejected');
  };
  window.q3Review = { host, view, tick, cast, stats: [] }; tick(); await new Promise(r => setTimeout(r, 800));
 });
 const shot = async name => {
  await page.evaluate(name => { const { host, view, stats } = window.q3Review; const target = host.match.hero('red');
   stats.push({ name, time: host.match.time, hp: target.hp, airborne: (target.airborneUntil ?? 0) > host.match.time, shots: host.match.projectiles.filter(p => p.empowered).map(p => ({ x: p.x, y: p.y, remaining: p.remaining, vx: p.vx, vy: p.vy })), cards: view.combat.sprites.group.children.filter(c => c.visible).map(c => c.name), calls: view.renderer.info.render.calls });
  }, name); await page.screenshot({ path: `${output}/${name}.jpg` });
 };
 await page.evaluate(() => window.q3Review.cast());
 for (const [count, name] of [[12, 'startup'], [12, 'launch'], [15, 'flight'], [12, 'knockup'], [15, 'late-flight'], [30, 'ended']]) { await page.evaluate(n => window.q3Review.tick(n), count); await shot(name); }
 for (let i = 0; i < 8; i++) {
  await page.evaluate(angle => { const { cast, tick } = window.q3Review; cast(angle, false); tick(33); }, i * Math.PI / 4); await shot(`direction-${i}`);
 }
 const report = await page.evaluate(() => {
  const { host, view, tick, cast, stats } = window.q3Review;
  cast(0, false); tick(30); host.pause(); const before = JSON.stringify(host.match.projectiles), time = host.match.time; tick(90);
  const paused = time === host.match.time && before === JSON.stringify(host.match.projectiles); host.pause();
  cast(); const h = host.match.hero('blue'), target = host.match.hero('red'); host.match.windWalls.push({ id: 999, team: 'red', x: h.x + 70, y: h.y, angle: 0, startsAt: 0 }); tick(100);
  const blocked = host.match.projectiles.length === 0 && target.hp === 2000;
  cast(); const minion = host.match.spawnMinion('red', 'melee', { x: host.match.hero('blue').x + 75, y: host.match.hero('blue').y }); minion.hp = minion.maxHp = 1000; minion.damage = minion.speed = 0; tick(60);
  const piercing = { heroHp: host.match.hero('red').hp, minionHp: minion.hp, airborne: (minion.airborneUntil ?? 0) > host.match.time };
  const resources = []; for (let i = 0; i < 4; i++) { host.restart(); tick(2); resources.push({ ...view.renderer.info.memory }); }
  const result = { stats, paused, blocked, piercing, resources, artErrors: [...view.combat.sprites.errors] }; host.dispose(); return result;
 });
 await writeFile(`${output}/report.json`, JSON.stringify({ ...report, errors }, null, 2));
 if (errors.length || report.artErrors.length || !report.paused || !report.blocked || report.piercing.heroHp !== 1915 || report.piercing.minionHp !== 915) throw new Error('Q3 runtime validation failed');
 console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
