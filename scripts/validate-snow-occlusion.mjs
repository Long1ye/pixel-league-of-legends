import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/snow-occlusion', stage = process.argv[2] ?? 'after';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts')]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match({ ai: false, waves: false }), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'; view.cameraRig.setElevation(45); host.update(0);
    window.snowDepth = { view, host, bridgePoint };
  });
  await page.waitForTimeout(1300);
  for (const [name, u, v, zoom] of [['blue-poro', -405, -97, 1], ['crystals', -370, -110, 1], ['sanctuary', -599, -119, .85], ['red-poro', 405, -97, 1], ['central-poro', 26, -97, 1], ['normal', -357, -60, .6]]) {
    await page.evaluate(({ u, v, zoom }) => { const { view, host, bridgePoint } = window.snowDepth; view.cameraRig.lookAt(bridgePoint(u, v)); view.cameraRig.setZoom(zoom); host.update(0); }, { u, v, zoom });
    await page.screenshot({ path: `${output}/${name}-${stage}.jpg`, type: 'jpeg', quality: 94 });
  }
  const result = await page.evaluate(async () => {
    const { host, view } = window.snowDepth;
    const { SNOW_RESERVES, snowReserveApplies, snowBoundsOverlap } = await import('/src/render-three/SnowClearance.ts');
    const { snowPlacementBounds } = await import('/src/render-three/SnowVarieties.ts');
    const conflicts = view.snowBanks.varieties.placements.flatMap(p => SNOW_RESERVES.filter(r => snowReserveApplies(p, r) && snowBoundsOverlap(snowPlacementBounds(p), r)).map(r => `${p.kind}@${p.u}:${r.id}`));
    const resources = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(0); resources.push({ ...view.renderer.info.memory }); }
    return { resources, placements: view.snowBanks.varieties.placements, conflicts, errors: view.snowBanks.errors };
  });
  await page.evaluate(() => window.snowDepth.host.dispose());
  if (stage === 'after') {
    await page.goto(`http://127.0.0.1:5173/${output}/comparison.html`, { waitUntil: 'networkidle' });
    for (const name of ['blue-poro', 'crystals', 'sanctuary', 'red-poro', 'central-poro', 'normal']) {
      await page.selectOption('#camera', name);
      await page.waitForFunction(() => [...document.querySelectorAll('img')].every(i => i.complete && i.naturalWidth));
    }
  }
  await writeFile(`${output}/${stage}-report.json`, JSON.stringify({ ...result, errors: [...errors, ...result.errors] }, null, 2));
  console.log(JSON.stringify({ stage, placements: result.placements.length, conflicts: result.conflicts, errors }));
  if (stage === 'after' && result.conflicts.length) process.exitCode = 1;
} finally { await browser.close(); }
if (errors.length) process.exitCode = 1;
