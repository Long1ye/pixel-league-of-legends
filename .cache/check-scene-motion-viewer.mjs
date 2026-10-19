import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/scene-motion-v2/motion.html');
  await page.locator('#scene').selectOption('wall');
  await page.waitForFunction(() => document.querySelector('#frame').complete && document.querySelector('#frame').naturalWidth === 1600);
  await page.locator('#play').click();
  const paused = await page.locator('#frame').getAttribute('src');
  await page.waitForTimeout(200);
  const frozen = paused === await page.locator('#frame').getAttribute('src');
  await page.locator('#version').selectOption('previous');
  await page.waitForFunction(() => document.querySelector('#frame').getAttribute('src').startsWith('../scene-motion/') && document.querySelector('#frame').complete && document.querySelector('#frame').naturalWidth === 1600);
  const previous = await page.locator('#frame').getAttribute('src');
  await page.locator('#version').selectOption('current');
  await page.locator('#play').click();
  await page.waitForTimeout(200);
  const advanced = paused !== await page.locator('#frame').getAttribute('src');
  const result = { frozen, advanced, previous, errors };
  await writeFile('.cache/scene-motion-v2-viewer.log', JSON.stringify(result));
  console.log(result);
  if (!frozen || !advanced || errors.length) process.exitCode = 1;
} finally { await browser.close(); }
