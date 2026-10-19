import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/combat-migration'; await mkdir(output, { recursive: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
const errors = [], failures = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push({ text: message.text(), location: message.location() }); });
page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
try {
  await page.goto('http://127.0.0.1:4179/three.html?map=howling&scene=combat', { waitUntil: 'networkidle' });
  await page.locator('#viewport').click();
  await page.keyboard.press('q'); await page.waitForTimeout(1000);
  await page.keyboard.press('w'); await page.waitForTimeout(700);
  await openThreeControls(page); await page.locator('#quality').selectOption('low');
  await page.locator('#quality-compare').click();
  await page.locator('#quality-compare').click();
  await page.locator('#pause').click(); await closeThreeControls(page); await page.waitForTimeout(250);
  const report = { errors, failures, errorHidden: await page.locator('#error').isHidden(), canvasCount: await page.locator('#viewport canvas').count(), rendererCanvasCount: await page.locator('#viewport canvas[aria-label^="Three.js"]').count(), hud: await page.locator('#combat-hud').textContent(), status: await page.locator('#status').textContent(), audioFiles: await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => /\.(mp3|ogg|wav)/.test(entry.name)).length) };
  await page.screenshot({ path: `${output}/production-smoke.jpg`, fullPage: true });
  await writeFile(`${output}/production-report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  if (errors.length || failures.length || !report.errorHidden || report.rendererCanvasCount !== 1 || !report.status.includes('paused')) process.exitCode = 1;
} finally { await browser.close(); }
