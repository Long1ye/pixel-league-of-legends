import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/motion-feedback/motion.html');
  await page.locator('#play').click();
  await page.locator('#case').selectOption('red-ice'); await page.locator('#size').selectOption('detail');
  await page.waitForFunction(() => document.querySelector('#frame').complete && document.querySelector('#frame').naturalWidth === 480);
  const paused = await page.locator('#frame').getAttribute('src');
  await page.waitForTimeout(200);
  const frozen = paused === await page.locator('#frame').getAttribute('src');
  await page.locator('#play').click(); await page.waitForTimeout(300);
  const advanced = paused !== await page.locator('#frame').getAttribute('src');
  const result = { frozen, advanced, cases: await page.locator('#case option').count(), errors };
  await writeFile('.cache/motion-feedback-viewer.log', JSON.stringify(result)); console.log(result);
  if (!frozen || !advanced || result.cases !== 5 || errors.length) process.exitCode = 1;
} finally { await browser.close(); }
