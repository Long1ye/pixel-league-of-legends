import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/target-picking';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'),
      import('/src/game/Match.ts'), import('/src/game/Bridge.ts'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100'; document.body.append(container);
    const view = new ThreeArena(container);
    view.renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    const center = bridgePoint(0);
    const host = new PrototypeHost(() => {
      const match = new Match({ ai: false, waves: false });
      Object.assign(match.hero('blue'), { x: center.x - 60, y: center.y, speed: 0 });
      Object.assign(match.hero('red'), { x: center.x + 90, y: center.y, speed: 0, damage: 0 });
      match.spawnMinion('red', 'melee', center);
      match.spawnMinion('blue', 'melee', { x: center.x, y: center.y + 6 });
      return match;
    }, view);
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.cameraRig.lookAt(center);
    host.update(0);
    window.targetPicking = { host, view, center };
  });
  await page.waitForTimeout(1200);
  const report = await page.evaluate(() => {
    const { host, view, center } = window.targetPicking;
    host.update(0);
    const rect = view.renderer.domElement.getBoundingClientRect();
    const cursor = (entity, height = 16) => {
      const p = view.cameraRig.project(entity, height); return { x: p.x + rect.left, y: p.y + rect.top };
    };
    const enemy = host.match.entities.find(e => e.kind === 'melee' && e.team === 'red');
    const ally = host.match.entities.find(e => e.kind === 'melee' && e.team === 'blue');
    const cases = [];
    const record = (name, actual, expected) => cases.push({ name, actual, expected, passed: actual === expected });
    record('enemy minion behind allied minion', view.pickActor(cursor(enemy)), enemy.id);
    host.command({ kind: 'attack', id: view.pickActor(cursor(enemy)) });
    record('attack command keeps hostile target', host.match.hero('blue').targetId, enemy.id);
    const redHero = host.match.hero('red');
    Object.assign(redHero, center); host.update(0);
    record('minion torso with overlapping enemy hero', view.pickActor(cursor(enemy)), enemy.id);
    record('enemy hero upper torso', view.pickActor(cursor(redHero, 55)), redHero.id);
    enemy.hp = 0; redHero.hp = 0; host.update(0);
    record('dead enemies removed from picking', view.pickActor(cursor(ally)), ally.id);
    const ground = { x: center.x + 160, y: center.y + 80 };
    record('empty ground stays unselected', view.pickActor(cursor(ground, 0)), null);
    host.command({ kind: 'move', point: view.ground(cursor(ground, 0)) });
    record('empty ground issues move', host.match.hero('blue').destination !== null, true);
    return { cases };
  });
  report.errors = errors;
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  if (errors.length || report.cases.some(test => !test.passed)) process.exitCode = 1;
  await page.evaluate(() => window.targetPicking.host.dispose());
} finally { await browser.close(); }
