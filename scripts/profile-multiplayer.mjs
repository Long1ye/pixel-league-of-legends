import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] || '.cache/multiplayer-performance/before.json';
const base = process.argv[3] || 'http://127.0.0.1:5180';
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true, args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const pages = [];
try {
  for (let i = 0; i < 2; i++) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage(); pages.push(page);
    await page.addInitScript(() => {
      window.netProfile = { frame: [], wire: [], frames: 0, bytes: 0, renders: [], samples: [], last: 0 };
      const NativeSocket = window.WebSocket;
      window.WebSocket = class extends NativeSocket {
        constructor(...args) {
          super(...args);
          if (!String(args[0]).endsWith('/battle')) return;
          this.addEventListener('message', event => {
            const m = JSON.parse(event.data), p = window.netProfile;
            if (m.type === 'state' && m.room.phase === 'playing') {
              p.wire.push(performance.now()); p.bytes += event.data.length; p.frames++;
            }
          });
        }
      };
    });
    await page.goto(`${base}/three.html?map=howling&scene=match&online=1&launch=1`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-create]').waitFor({ state: 'visible' });
    await page.locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
    await page.evaluate(async () => {
      const moduleUrl = performance.getEntriesByType('resource').map(entry => entry.name).find(name => name.includes('/src/network/NetworkHost.ts'));
      const { NetworkHost } = await import(moduleUrl || '/src/network/NetworkHost.ts');
      const update = NetworkHost.prototype.update;
      NetworkHost.prototype.update = function(dt) {
        const p = window.netProfile;
        if (!this.profileHook) {
          this.profileHook = true;
          const frame = this.view.frame.bind(this.view);
          this.view.frame = value => {
            if (this.room?.phase === 'playing') {
              const now = performance.now(); if (p.last) p.frame.push(now - p.last); p.last = now;
              const hero = value.positions.sample(value.match.hero(this.team), value.alpha);
              p.samples.push({ at: now, x: hero.x, y: hero.y, time: value.match.time });
              const start = performance.now(); frame(value); p.renders.push(performance.now() - start);
            } else frame(value);
          };
          window.profileHost = this;
        }
        return update.call(this, dt);
      };
    });
  }
  await pages[0].locator('[data-create]').click();
  await pages[0].locator('[data-code]').filter({ hasText: /^\d{6}$/ }).waitFor();
  await pages[1].locator('input[aria-label="房间码"]').fill(await pages[0].locator('[data-code]').textContent());
  await pages[1].getByRole('button', { name: '加入房间', exact: true }).click();
  await pages[0].locator('[data-ready]').click(); await pages[1].locator('[data-ready]').click();
  await pages[0].locator('.battle-lobby').waitFor({ state: 'hidden', timeout: 20000 });
  await pages[1].locator('.battle-lobby').waitFor({ state: 'hidden', timeout: 20000 });
  for (const page of pages) await page.evaluate(async () => {
    const { bridgePoint } = await import('/src/game/Bridge.ts');
    window.profileHost.command({ kind: 'move', point: bridgePoint(0, 0) });
    // Exclude shader compilation and asset warmup from steady-state statistics.
    window.netProfile.frame = []; window.netProfile.renders = []; window.netProfile.samples = [];
  });
  await new Promise(resolve => setTimeout(resolve, 12000));
  const result = [];
  for (const page of pages) result.push(await page.evaluate(() => {
    const p = window.netProfile;
    const stats = list => { const a = [...list].sort((x, y) => x - y); return { count: a.length, mean: a.reduce((s, x) => s + x, 0) / a.length, p50: a[Math.floor(a.length * .5)], p95: a[Math.floor(a.length * .95)], max: a.at(-1) }; };
    const frame = p.frame.slice(30), samples = p.samples.slice(30), intervals = p.wire.slice(1).map((n, i) => n - p.wire[i]);
    const stationary = samples.slice(1).filter((s, i) => Math.hypot(s.x - samples[i].x, s.y - samples[i].y) < .001).length;
    return { frameMs: stats(frame), fps: 1000 / stats(frame).mean, renderMs: stats(p.renders.slice(30)), snapshotMs: stats(intervals), bytesPerSecond: p.bytes / ((p.wire.at(-1) - p.wire[0]) / 1000), stationaryFrames: stationary, sampleCount: samples.length, ui: document.querySelector('.battle-badge')?.textContent, resolution: document.querySelector('#detail')?.value, canvas: { width: document.querySelector('#viewport > canvas').width, height: document.querySelector('#viewport > canvas').height } };
  }));
  await mkdir(join(output, '..'), { recursive: true }); await writeFile(output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally { await browser.close(); }
