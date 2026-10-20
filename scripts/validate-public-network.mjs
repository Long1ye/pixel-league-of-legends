import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }

const base = process.argv[2] || 'http://127.0.0.1:5182';
const output = 'docs/visual-validation/2026-10-19/public-network';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true,
  args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const pages = [], errors = [], results = [];
try {
  for (let i = 0; i < 2; i++) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage(); pages.push(page);
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      // Ordered message scheduling approximates TCP latency/jitter/retransmission HOL.
      // It does not drop WebSocket messages or emulate real IP packet loss.
      const NativeSocket = window.WebSocket;
      window.netTest = { config: null, sent: 0, received: 0, retransmits: 0, latest: null, states: [], samples: [],
        commandAt: 0, firstMoveAt: 0, ackAt: 0, seq: 0, origin: null, frameTimes: [], lastFrame: 0 };
      window.WebSocket = class extends NativeSocket {
        constructor(...args) {
          super(...args); this.isBattle = String(args[0]).endsWith('/battle');
          this.upAt = 0; this.downAt = 0; this.upN = 0; this.downN = 0; this.tasks = new Set();
          if (!this.isBattle) return;
          super.addEventListener('message', event => {
            if (event.isTrusted && window.netTest.config) {
              event.stopImmediatePropagation(); this.schedule('down', () => this.dispatchEvent(new MessageEvent('message', { data: event.data })));
              return;
            }
            const message = JSON.parse(event.data), test = window.netTest;
            if (message.type === 'state') {
              test.latest = message;
              test.states.push({ time: message.state.time, state: message.state });
              if (test.states.length > 160) test.states.shift();
              if (test.seq && message.ack[window.netHost?.team] >= test.seq && !test.ackAt) test.ackAt = performance.now();
            }
          });
          super.addEventListener('close', () => { for (const task of this.tasks) clearTimeout(task); this.tasks.clear(); });
        }
        schedule(direction, deliver) {
          const config = window.netTest.config;
          if (!config) { deliver(); return; }
          const n = ++this[direction + 'N'];
          const jitter = config.jitter * ([0, .8, -.6, .3, -1, .5, -.2][n % 7]);
          const retransmit = config.lossEvery && n % config.lossEvery === 0 ? 120 : 0;
          if (retransmit) window.netTest.retransmits++;
          const deadline = Math.max(this[direction + 'At'], performance.now() + config.rtt / 2 + jitter + retransmit);
          this[direction + 'At'] = deadline;
          const task = setTimeout(() => {
            this.tasks.delete(task); if (this.readyState === NativeSocket.OPEN) deliver();
          }, Math.max(0, deadline - performance.now()));
          this.tasks.add(task);
        }
        send(data) {
          if (!this.isBattle || !window.netTest.config) { super.send(data); return; }
          this.schedule('up', () => super.send(data));
        }
      };
    });
    await page.goto(`${base}/three.html?map=howling&scene=match&online=1&launch=1`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-create]').waitFor({ state: 'visible', timeout: 30000 });
    await page.locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
    await page.evaluate(async () => {
      const url = performance.getEntriesByType('resource').map(e => e.name).find(name => name.includes('/src/network/NetworkHost.ts'));
      const { NetworkHost } = await import(url || '/src/network/NetworkHost.ts');
      const original = NetworkHost.prototype.update;
      NetworkHost.prototype.update = function(dt) {
        window.netHost = this;
        if (!this.netTestHook) {
          this.netTestHook = true; const frame = this.view.frame.bind(this.view);
          this.view.frame = value => {
            const test = window.netTest, now = performance.now();
            if (this.room?.phase === 'playing') {
              const hero = value.match.hero(this.team);
              if (test.commandAt && test.origin && !test.firstMoveAt && Math.hypot(hero.x - test.origin.x, hero.y - test.origin.y) > .05) test.firstMoveAt = now;
              if (test.lastFrame) test.frameTimes.push(now - test.lastFrame);
              test.lastFrame = now;
              test.samples.push({ at: now, x: hero.x, y: hero.y });
              if (test.samples.length > 2000) test.samples.shift();
            }
            frame(value);
          };
        }
        return original.call(this, dt);
      };
    });
  }
  await pages[0].locator('[data-create]').click();
  await pages[0].locator('[data-code]').filter({ hasText: /^\d{6}$/ }).waitFor();
  const code = await pages[0].locator('[data-code]').textContent();
  await pages[1].getByRole('textbox', { name: '房间码' }).fill(code);
  await pages[1].getByRole('button', { name: '加入房间', exact: true }).click();
  await pages[0].locator('[data-ready]').click(); await pages[1].locator('[data-ready]').click();
  await Promise.all(pages.map(page => page.waitForFunction(() => window.netHost?.room?.phase === 'playing')));

  for (const scenario of [
    { name: 'rtt60', rtt: 60, jitter: 5, lossEvery: 0 },
    { name: 'rtt100-jitter30', rtt: 100, jitter: 30, lossEvery: 0 },
    { name: 'rtt150-retransmission-1pct-cycle', rtt: 150, jitter: 20, lossEvery: 100 },
    { name: 'rtt150-retransmission', rtt: 150, jitter: 20, lossEvery: 20 },
  ]) {
    await Promise.all(pages.map(page => page.evaluate(config => {
      window.netTest.config = config; window.netTest.retransmits = 0;
      window.netTest.frameTimes = []; window.netTest.lastFrame = 0;
    }, scenario)));
    await new Promise(resolve => setTimeout(resolve, scenario.lossEvery === 100 ? 5500 : 1500));
    const trials = [];
    for (const page of pages) {
      await page.evaluate(() => {
        const host = window.netHost, test = window.netTest, hero = host.match.hero(host.team);
        const other = host.match.hero(host.team === 'blue' ? 'red' : 'blue');
        test.origin = { x: hero.x, y: hero.y }; test.commandAt = performance.now(); test.firstMoveAt = 0; test.ackAt = 0;
        test.seq = host.seq + 1;
        host.command({ kind: 'move', point: { x: hero.x + (other.x - hero.x) * .2, y: hero.y + (other.y - hero.y) * .2 } });
      });
      await page.waitForFunction(() => window.netTest.firstMoveAt && window.netTest.ackAt, undefined, { timeout: 5000 });
      trials.push(await page.evaluate(() => {
        const t = window.netTest;
        return { team: window.netHost.team, localResponseMs: t.firstMoveAt - t.commandAt,
          acknowledgementMs: t.ackAt - t.commandAt, pending: window.netHost.prediction.pendingCount };
      }));
      await page.evaluate(() => window.netHost.command({ kind: 'stop' }));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    const peers = await Promise.all(pages.map(page => page.evaluate(() => {
      const host = window.netHost, test = window.netTest, actual = host.match.hero(host.team);
      const authority = test.latest.state.entities.find(e => e.kind === 'hero' && e.team === host.team);
      const sorted = [...test.frameTimes].sort((a, b) => a - b);
      return { team: host.team, positionError: Math.hypot(actual.x - authority.x, actual.y - authority.y),
        pending: host.prediction.pendingCount, interpolationMs: host.snapshots.interpolationMs,
        retransmits: test.retransmits, frameP95Ms: sorted[Math.floor(sorted.length * .95)] ?? 0 };
    })));
    for (const trial of trials) {
      assert(trial.localResponseMs < trial.acknowledgementMs, JSON.stringify(trial));
      assert(trial.localResponseMs < 80, JSON.stringify(trial));
    }
    for (const peer of peers) { assert(peer.positionError < 2, JSON.stringify(peer)); assert.equal(peer.pending, 0); }
    results.push({ scenario, trials, peers });
    console.log(JSON.stringify(results.at(-1)));
  }
  assert(results.at(-1).peers.some(peer => peer.retransmits > 0));
  assert(results.find(result => result.scenario.lossEvery === 100).peers.some(peer => peer.retransmits > 0));
  // Same browser, same route: disable local prediction for an observational baseline.
  await pages[0].evaluate(() => {
    const host = window.netHost, test = window.netTest, hero = host.match.hero(host.team), other = host.match.hero('red');
    window.savedPrediction = host.prediction.sample.bind(host.prediction); host.prediction.sample = () => null;
    test.origin = { x: hero.x, y: hero.y }; test.commandAt = performance.now(); test.firstMoveAt = 0; test.ackAt = 0; test.seq = host.seq + 1;
    host.command({ kind: 'move', point: { x: hero.x + (other.x - hero.x) * .2, y: hero.y + (other.y - hero.y) * .2 } });
  });
  await pages[0].waitForFunction(() => window.netTest.firstMoveAt && window.netTest.ackAt);
  const withoutPrediction = await pages[0].evaluate(() => {
    const host = window.netHost, t = window.netTest;
    const trial = { localResponseMs: t.firstMoveAt - t.commandAt, acknowledgementMs: t.ackAt - t.commandAt };
    host.prediction.sample = window.savedPrediction; host.command({ kind: 'stop' }); return trial;
  });
  console.log(JSON.stringify({ withoutPrediction }));
  // Suppress delivery for 650 ms without closing the socket: ordered short-outage recovery.
  await pages[1].evaluate(() => { window.netTest.config = { rtt: 1300, jitter: 0, lossEvery: 0 }; });
  await new Promise(resolve => setTimeout(resolve, 700));
  await pages[1].evaluate(() => { window.netTest.config = { rtt: 100, jitter: 0, lossEvery: 0 }; });
  await new Promise(resolve => setTimeout(resolve, 1300));
  assert.equal(await pages[1].evaluate(() => window.netHost.room.phase), 'playing');
  const states = await Promise.all(pages.map(page => page.evaluate(() => window.netTest.latest)));
  const time = states[0].state.time;
  await pages[1].waitForFunction(t => window.netTest.states.some(state => state.time === t), time);
  const corresponding = await pages[1].evaluate(t => window.netTest.states.find(state => state.time === t).state, time);
  assert.deepEqual(states[0].state, corresponding);
  await pages[0].screenshot({ path: `${output}/blue-weak-network.jpg` });
  await pages[1].screenshot({ path: `${output}/red-weak-network.jpg` });
  const session = await pages[1].evaluate(() => sessionStorage.getItem('midline-room-v1'));
  await pages[1].reload({ waitUntil: 'domcontentloaded' });
  await pages[1].locator('.start-play').click();
  await pages[1].locator('.asset-loading').waitFor({ state: 'detached', timeout: 120000 });
  await pages[1].waitForFunction(() => window.netTest.latest?.room.phase === 'playing', undefined, { timeout: 30000 });
  assert.equal(await pages[1].evaluate(() => sessionStorage.getItem('midline-room-v1')), session);
  assert.deepEqual(errors, []);
  await writeFile(`${output}/report.json`, JSON.stringify({ base, results, withoutPrediction, sharedAuthoritativeState: true,
    shortOutageRecovered: true, reloadResumedSeat: true, errors,
    model: 'Real browser WebSockets with ordered application-message delays; retransmission stalls approximated, not real IP packet loss.' }, null, 2));
} catch (error) {
  const diagnostics = await Promise.all(pages.map(async (page, i) => {
    await page.screenshot({ path: `${output}/failure-${i}.jpg` }).catch(() => {});
    return page.evaluate(() => ({ url: location.href, message: document.querySelector('.battle-message')?.textContent,
      alert: document.querySelector('[role="alert"]')?.textContent, phase: window.netTest?.latest?.room?.phase,
      body: document.body.innerText.slice(0, 1200) })).catch(() => null);
  }));
  console.error(JSON.stringify({ diagnostics, errors })); throw error;
} finally { await browser.close(); }
