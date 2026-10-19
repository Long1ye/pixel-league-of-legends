import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
import { openThreeControls, closeThreeControls } from '../scripts/three-quality-browser-ui.mjs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page);
  const button = page.locator('#war-fog'), initial = await button.getAttribute('aria-pressed');
  await button.click(); const off = await button.getAttribute('aria-pressed');
  await button.click(); const on = await button.getAttribute('aria-pressed');
  await closeThreeControls(page);
  await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/war-fog/comparison.html');
  await page.locator('#case').selectOption('fog-memory');
  await page.waitForFunction(() => document.querySelector('#frame').complete && document.querySelector('#frame').naturalWidth === 1600);
  const result = { initial, off, on, viewerLoaded: true, errors };
  await writeFile('.cache/war-fog-ui.log', JSON.stringify(result)); console.log(result);
  if (initial !== 'true' || off !== 'false' || on !== 'true' || errors.length) process.exitCode = 1;
} finally { await browser.close(); }
