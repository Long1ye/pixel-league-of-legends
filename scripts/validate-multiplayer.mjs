import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const url = process.argv[2] || 'http://127.0.0.1:5180/three.html?map=howling&scene=match&online=1';
const output = 'docs/visual-validation/2026-10-19/multiplayer';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const errors = [], states = [[], []], pages = [], sockets = [];
const waitState = async (index, predicate) => {
  const start = Date.now();
  while (Date.now() - start < 15000) {
    const found = [...states[index]].reverse().find(predicate); if (found) return found;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Player ${index + 1}: expected state not received`);
};
try {
  for (let i = 0; i < 2; i++) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage(); pages.push(page);
    page.on('pageerror', e => errors.push(e.message));
    page.on('websocket', ws => {
      if (!ws.url().endsWith('/battle')) return;
      sockets[i] = ws;
      ws.on('framereceived', ({ payload }) => {
        const message = JSON.parse(String(payload));
        if (message.type === 'state') { states[i].push(message); if (states[i].length > 600) states[i].shift(); }
      });
    });
    const launchUrl = new URL(url); launchUrl.searchParams.delete('launch');
    await page.goto(launchUrl.href, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-mode=online]').click();
    await page.locator('.start-play').click();
    await page.locator('[data-create]').waitFor({ state: 'visible', timeout: 30000 });
    await page.waitForFunction(() => !document.querySelector('[data-create]').disabled);
    assert.equal(await page.locator('canvas').count(), 0, 'Room entry precedes game creation');
  }
  await pages[0].screenshot({ path: `${output}/room-entry.jpg` });
  await pages[1].getByRole('textbox', { name: '房间码' }).fill('000000');
  await pages[1].getByRole('button', { name: '加入房间', exact: true }).click();
  await pages[1].getByRole('status').filter({ hasText: '房间不存在或已关闭' }).waitFor();
  assert.equal(await pages[1].locator('canvas').count(), 0, 'Invalid room stays in the lobby');
  await pages[0].locator('[data-create]').click();
  await pages[0].locator('[data-code]').filter({ hasText: /^\d{6}$/ }).waitFor();
  const code = await pages[0].locator('[data-code]').textContent();
  await pages[1].getByRole('textbox', { name: '房间码' }).fill(code);
  await pages[1].getByRole('button', { name: '加入房间', exact: true }).click();
  await waitState(1, m => m.room.players.length === 2);
  for (const page of pages) {
    await page.locator('[data-ready]').waitFor({ state: 'visible', timeout: 30000 });
    await page.locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
  }
  await pages[1].screenshot({ path: `${output}/red-lobby.jpg` });
  await pages[0].locator('[data-ready]').click(); await pages[1].locator('[data-ready]').click();
  await Promise.all([waitState(0, m => m.room.phase === 'playing'), waitState(1, m => m.room.phase === 'playing')]);
  await pages[0].locator('.battle-lobby').waitFor({ state: 'hidden' });
  await pages[1].locator('.battle-lobby').waitFor({ state: 'hidden' });
  for (let i = 0; i < 2; i++) {
    const page = pages[i], team = i ? 'red' : 'blue';
    await page.locator('#viewport').click({ button: 'right', position: { x: 760, y: 340 } });
    await page.keyboard.press('q');
    await waitState(i, m => m.events.some(e => e.type === 'cast' && e.team === team));
    assert.match(await page.locator('.battle-badge').textContent(), new RegExp(`${team === 'red' ? '红' : '蓝'}方`));
  }
  const startTime = states[0].at(-1).state.time;
  await pages[0].keyboard.press('Escape');
  await pages[0].evaluate(() => window.dispatchEvent(new Event('blur')));
  const wave = await waitState(0, m => m.state.time > Math.max(2.2, startTime + .3) && m.state.wave > 0);
  const corresponding = await waitState(1, m => m.state.time === wave.state.time);
  assert.deepEqual(wave.state, corresponding.state);
  assert.equal(wave.state.entities.filter(e => e.kind === 'tower').length, 2);
  for (let i = 0; i < 2; i++) {
    await pages[i].screenshot({ path: `${output}/${i ? 'red' : 'blue'}-playing.jpg` });
    assert.equal(await pages[i].locator('#error').isVisible(), false);
  }
  // The transport interruption uses the actual browser connection, then auto-resumes its seat.
  const session = await pages[1].evaluate(() => sessionStorage.getItem('midline-room-v1'));
  states[1].length = 0;
  await pages[1].reload({ waitUntil: 'domcontentloaded' });
  await pages[1].locator('.start-play').click();
  await pages[1].locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
  await waitState(1, m => m.state.time > wave.state.time && m.room.phase === 'playing');
  assert.equal(await pages[1].evaluate(() => sessionStorage.getItem('midline-room-v1')), session);
  assert.equal(errors.length, 0, JSON.stringify(errors));
  const report = { url, code, players: 2, sharedState: true, blueAndRedInput: true, pauseIgnored: true, waves: wave.state.wave, towers: 2, reconnectSessionRetained: true, errors };
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
