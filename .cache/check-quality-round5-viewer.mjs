import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/quality-round5/gameplay/comparison.html');
  await page.locator('#frames').selectOption('24');
  await page.locator('#split').fill('70');
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  const report = await page.evaluate(() => ({ options: document.querySelector('#frames').options.length, frame: document.querySelector('#frames').value, caption: document.querySelector('#left').textContent, split: document.querySelector('#top').style.clipPath, loaded: [...document.images].every(image => image.naturalWidth > 0) }));
  await page.locator('#play').click();
  await page.waitForTimeout(250);
  report.playingFrame = await page.locator('#frames').inputValue();
  report.errors = errors;
  if (report.options !== 26 || report.frame !== '24' || !report.caption.includes('上轮') || !report.loaded || Number(report.playingFrame) < 2 || errors.length) throw new Error(JSON.stringify(report));
  await writeFile('.cache/quality-round5-viewer.log', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
}
