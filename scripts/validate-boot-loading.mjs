import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const base = process.argv[2] || 'http://127.0.0.1:5184';
const baseline = process.argv.includes('--baseline');
const output = 'docs/visual-validation/2026-10-19/boot-loading';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const report = { delayedEntry: [], errors: [] };
try {
  for (const path of ['/three.html?map=howling&scene=match&online=1', '/?map=howling']) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage(); page.on('pageerror', e => report.errors.push(e.message));
    let release; const hold = new Promise(resolve => { release = resolve; });
    await page.route(/\/src\/launch\.ts(?:\?|$)/, async route => { await hold; await route.continue(); });
    await page.goto(base + path, { waitUntil: 'commit' });
    await page.locator('body').waitFor({ state: 'attached' }); await page.waitForTimeout(300);
    const visible = await page.locator('#boot-screen').isVisible();
    const text = await page.locator('body').innerText();
    const first = path.startsWith('/three') ? 'three' : 'index';
    await page.screenshot({ path: `${output}/${baseline ? 'before' : 'after'}-${first}-entry.jpg` });
    report.delayedEntry.push({ path, entryStillHeld: true, visible, text: text.slice(0, 220) });
    if (!baseline) { assert(visible); assert(text.includes('正在启动游戏')); }
    release();
    await page.locator('.start-play').waitFor({ state: 'visible', timeout: 60000 });
    if (!baseline) assert.equal(await page.locator('#boot-screen').count(), 0);
    await context.close();
  }
  if (!baseline) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    let release; const hold = new Promise(resolve => { release = resolve; });
    await page.route(/\/assets\/map-concepts\/howling-abyss-target-v1\/01-overview\.png/, async route => { await hold; await route.continue(); });
    await page.goto(`${base}/three.html?online=1`, { waitUntil: 'commit' });
    await page.locator('.start-play').waitFor({ state: 'visible', timeout: 60000 });
    assert(await page.locator('.start-play').isEnabled());
    report.backgroundDoesNotBlockMenu = true;
    await page.screenshot({ path: `${output}/menu-with-background-held.jpg` });
    release(); await context.close();

    const directContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const direct = await directContext.newPage(); direct.on('pageerror', e => report.errors.push(e.message));
    let releaseGame; const gameHold = new Promise(resolve => { releaseGame = resolve; });
    await direct.route(/\/src\/main-three\.ts(?:\?|$)/, async route => { await gameHold; await route.continue(); });
    await direct.goto(`${base}/three.html?map=howling&online=1&launch=1`, { waitUntil: 'commit' });
    await direct.waitForTimeout(500);
    assert(await direct.locator('#boot-screen').isVisible());
    releaseGame();
    await direct.waitForFunction(() => !document.querySelector('#boot-screen') && !!document.querySelector('.asset-loading, .battle-lobby'), undefined, { timeout: 120000 });
    await direct.screenshot({ path: `${output}/direct-game-loading.jpg` });
    report.directLaunchHasLoadingHandoff = true;
    await directContext.close();

    const failedContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const failed = await failedContext.newPage();
    await failed.route(/\/src\/launch\.ts(?:\?|$)/, route => route.abort('failed'));
    await failed.goto(`${base}/three.html?online=1`, { waitUntil: 'commit' });
    await failed.locator('#boot-screen button').waitFor({ state: 'visible' });
    assert((await failed.locator('[data-boot-message]').innerText()).includes('失败'));
    report.moduleFailureShowsRetry = true;
    await failed.screenshot({ path: `${output}/failed-entry.jpg` });
    await failedContext.close();
    assert.deepEqual(report.errors, []);
  }
  await writeFile(`${output}/${baseline ? 'before' : 'after'}.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally { await browser.close(); }
