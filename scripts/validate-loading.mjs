import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const base = process.argv[2] || 'http://127.0.0.1:5181';
const output = 'docs/visual-validation/2026-10-19/full-quality-loading';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const errors = [], report = {};
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  let release;
  const hold = new Promise(resolve => { release = resolve; });
  await page.route(/\/assets\/heroes\/yasuo\/locomotion16[^?]*\/walk-w\.png/, async route => { if (route.request().resourceType() === 'image') await hold; await route.continue(); });
  await page.goto(`${base}/three.html?map=howling&scene=match&online=1&launch=1`, { waitUntil: 'domcontentloaded' });
  await Promise.race([page.locator('.asset-loading').waitFor({ state: 'visible', timeout: 60000 }), page.locator('.start-play').waitFor({ state: 'visible', timeout: 60000 }).then(() => page.locator('.start-play').click())]);
  await page.locator('.asset-loading').waitFor({ state: 'visible', timeout: 60000 });
  await page.waitForTimeout(1200);
  assert.equal(await page.locator('.asset-loading').isVisible(), true);
  assert.equal(await page.locator('#detail').inputValue(), '1920');
  assert.equal(await page.locator('#detail option[value="auto"]').count(), 0);
  await page.screenshot({ path: `${output}/loading.jpg` });
  await page.evaluate(async () => {
    const url = performance.getEntriesByType('resource').map(entry => entry.name).find(name => name.includes('/src/render-three/ThreeArena.ts'));
    const { ThreeArena } = await import(url || '/src/render-three/ThreeArena.ts');
    const frame = ThreeArena.prototype.frame;
    window.actorChecks = [];
    ThreeArena.prototype.frame = function(value) {
      const result = frame.call(this, value);
      window.actorChecks.push({ loading: !!document.querySelector('.asset-loading'), phase: value.match.phase,
        cylinders: [...this.actors.values()].filter(mesh => mesh.visible && mesh.geometry.type === 'CylinderGeometry').length,
        heroReady: this.sprites.hasVisibleBody(value.match.hero(value.localTeam || 'blue').id),
        width: this.renderer.domElement.width, fogInterval: this.warFog.updateInterval });
      return result;
    };
  });
  release();
  await page.locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
  await page.waitForTimeout(500);
  const checks = await page.evaluate(() => window.actorChecks);
  assert.ok(checks.some(check => !check.loading));
  assert.ok(checks.every(check => check.cylinders === 0));
  assert.ok(checks.filter(check => !check.loading).every(check => check.heroReady && check.width === 1920 && check.fogInterval === 0));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
  await page.waitForTimeout(7000);
  assert.equal(await page.locator('#detail').inputValue(), '1920');
  assert.equal(await page.locator('#viewport > canvas').getAttribute('width'), '1920');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await page.screenshot({ path: `${output}/full-quality.jpg` });
  report.delayedTextureBlocksEntry = true; report.visibleCylinders = 0;
  report.resolution = 1920; report.autoDowngradeUnderCpuLoad = false; report.fogInterval = 0;

  const failedContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const failedPage = await failedContext.newPage(); failedPage.on('pageerror', error => errors.push(error.message));
  await failedPage.route(/\/assets\/heroes\/yasuo\/locomotion16[^?]*\/walk-w\.png/, route => route.request().resourceType() === 'image' ? route.abort() : route.continue());
  await failedPage.goto(`${base}/three.html?map=howling&scene=match&online=1&launch=1`, { waitUntil: 'domcontentloaded' });
  await failedPage.locator('.asset-loading-failed').waitFor({ state: 'visible', timeout: 120000 });
  assert.equal(await failedPage.getByRole('button', { name: '刷新重试' }).isVisible(), true);
  await failedPage.screenshot({ path: `${output}/load-failed.jpg` });
  report.loadFailureBlocksEntry = true;
  assert.deepEqual(errors, []); report.errors = errors;
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
