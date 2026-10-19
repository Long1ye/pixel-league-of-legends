import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = process.argv[2] ?? 'docs/visual-validation/2026-10-19/quality-round4/gameplay';
const incremental = process.argv[3] === '--incremental';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } }), errors = [], failures = [], samples = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
try {
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { bridgePoint }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'), import('/src/game/Bridge.ts'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match(), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); view.following = true;
    view.cameraRig.lookAt(host.match.hero('blue')); host.update(1 / 60);
    window.gameplayQuality = { view, host, bridgePoint, frame: 1 };
  });
  await page.waitForTimeout(1400);
  const times = [0, 1, ...Array.from({ length: 16 }, (_, i) => 2 + i * .1), 5, 8, 12, 18, 24, 30, 36, 42];
  for (let index = 0; index < times.length; index++) {
    await page.evaluate(target => {
      const state = window.gameplayQuality, { view, host, bridgePoint } = state;
      if (state.frame === 1) host.command({ kind: 'move', point: bridgePoint(20, 10) });
      while (host.match.time + 1e-8 < target && host.match.phase === 'playing') {
        if (!state.attackOrdered && host.match.time >= 30) {
          const hero = host.match.hero('blue'), enemies = host.match.entities.filter(e => e.team === 'red' && e.hp > 0 && e.kind !== 'tower');
          enemies.sort((a, b) => Math.hypot(a.x - hero.x, a.y - hero.y) - Math.hypot(b.x - hero.x, b.y - hero.y));
          if (enemies[0]) { host.command({ kind: 'attack', id: enemies[0].id }); state.attackOrdered = true; }
        }
        if (!state.qOrdered && host.match.time >= 35.9) {
          host.command({ kind: 'cast', ability: 'q', point: host.match.hero('red') }); state.qOrdered = true;
        }
        host.update(1 / 60); state.frame++;
      }
      // Keep native follow behavior for the movement; lock this exact camera
      // during the two quality renders at the same simulation tick.
      view.following = false;
    }, times[index]);
    // Let newly used walk/combat atlases finish loading before the pair.
    await page.waitForTimeout(index === 1 ? 350 : 20);
    for (const enhanced of [false, true]) {
      await page.evaluate(({ enhanced, incremental }) => {
        const { view, host } = window.gameplayQuality; view.setEnhanced(incremental || enhanced);
        if (incremental) { view.quality.surfaceRefinement.value = enhanced ? 1 : 0; view.quality.weather.value = enhanced ? 1 : 0; }
        host.update(0); host.update(0);
      }, { enhanced, incremental });
      await page.screenshot({ path: `${output}/${String(index).padStart(2, '0')}-${enhanced ? 'enhanced' : 'baseline'}.jpg`, quality: 88 });
    }
    samples.push(await page.evaluate(index => {
      const { view, host } = window.gameplayQuality, hero = host.match.hero('blue');
      const shadow = view.sprites.group.getObjectByName(`actor-sun-shadow-${hero.id}`), body = view.sprites.body(hero.id);
      const pixels = () => { const gl = view.renderer.getContext(), data = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4); gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, data); return data; };
      const render = () => view.renderer.render(view.scene, view.cameraRig.camera);
      render(); const full = pixels(), fullCalls = view.renderer.info.render.calls;
      const shadowWasVisible = shadow?.visible ?? false;
      if (shadow) shadow.visible = false;
      render(); const noActorShadow = pixels(); if (shadow) shadow.visible = shadowWasVisible;
      view.pavingShadows.group.visible = false; render(); const noPaving = pixels(); view.pavingShadows.update();
      const changed = other => { let count = 0, maximum = 0; for (let i = 0; i < full.length; i += 4) { const d = Math.max(...[0,1,2].map(c => Math.abs(full[i+c] - other[i+c]))); if (d) count++; maximum = Math.max(maximum, d); } return { pixels: count, maximum }; };
      const result = { index, time: host.match.time, phase: host.match.phase, hero: { x: hero.x, y: hero.y, hp: hero.hp }, liveUnits: host.match.entities.filter(e => e.hp > 0).length,
        calls: fullCalls, memory: { ...view.renderer.info.memory }, hasLiveBody: Boolean(body?.visible), shadowSharesAtlas: body ? shadow?.material.map === body.material.map : !shadow,
        actorShadow: changed(noActorShadow), pavingShadow: changed(noPaving), shadowVertices: shadow ? Array.from(shadow.geometry.getAttribute('position').array) : [],
        uvMatches: body && shadow ? Array.from(shadow.geometry.getAttribute('uv').array).every((v, i) => v === body.geometry.getAttribute('uv').array[i]) : !body && !shadow,
      };
      view.following = true; return result;
    }, index));
  }
  const final = await page.evaluate(() => { const { host, view } = window.gameplayQuality; const time = host.match.time; host.pause(); for (let i = 0; i < 20; i++) host.update(1 / 60); const paused = host.match.time === time; const resources = []; for (let i = 0; i < 5; i++) { host.restart(); host.update(1 / 60); resources.push({ ...view.renderer.info.memory }); } host.dispose(); return { paused, resources }; });
  await writeFile(`${output}/report.json`, JSON.stringify({ comparison: incremental ? 'Previous material/weather versus this round; all other enhancements enabled in both.' : 'All baseline versus all enhanced.', samples, final, errors, failures }, null, 2));
  const stable = final.resources.every(v => v.geometries === final.resources[0].geometries && v.textures === final.resources[0].textures);
  if (errors.length || failures.length || !final.paused || !stable || samples.some(s => !s.shadowSharesAtlas || !s.uvMatches) || !samples.some(s => s.actorShadow.pixels > 100) || !samples.some(s => s.pavingShadow.pixels > 100)) process.exitCode = 1;
  const frames = samples.map(sample => ({ index: sample.index, label: `正常比赛 ${sample.time.toFixed(1)} 秒${sample.hero.hp <= 0 ? ' · 阵亡' : ''}` }));
  await writeFile(`${output}/comparison.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>正常游玩画质对照</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:14px 24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}button,select{padding:8px;background:#243448;color:inherit;border:1px solid #546578;border-radius:5px}#scene{position:relative;max-width:1600px;aspect-ratio:16/9;margin:auto;overflow:hidden}img{position:absolute;width:100%;height:100%;object-fit:contain}#top{clip-path:inset(0 50% 0 0)}input{width:240px}p{margin:8px 24px;color:#a4b5c6}b{font-size:13px;background:#101721b0;padding:6px;position:absolute;top:12px;z-index:2}#left{left:12px}#right{right:12px}</style><header><strong>正常游玩 · 45° · 缩放 0.6</strong><button id="play">播放走动</button><select id="frames"></select><label>基础 / 当前优化 <input id="split" type="range" value="50"></label></header><div id="scene"><img id="base"><img id="top"><b id="left">基础</b><b id="right">当前优化</b></div><p>同一比赛状态、同一动作帧、同一镜头。拖动分界线比较；播放为 2.0–3.5 秒的走动采样（每 0.1 秒一帧），不是帧率测试。角色没有被传送或修改属性。当前优化包含全部画质轮次。</p><script>const frames=${JSON.stringify(frames)};const select=document.querySelector('#frames'),topImage=document.querySelector('#top');frames.forEach(f=>select.add(new Option(f.label,f.index)));function show(i){select.value=i;document.querySelector('#base').src=String(i).padStart(2,'0')+'-enhanced.jpg';topImage.src=String(i).padStart(2,'0')+'-baseline.jpg'}select.onchange=()=>show(+select.value);document.querySelector('#split').oninput=e=>topImage.style.clipPath='inset(0 '+(100-e.target.value)+'% 0 0)';let timer;document.querySelector('#play').onclick=()=>{if(timer){clearInterval(timer);timer=null;return}let i=2;show(i);timer=setInterval(()=>{i=i>=17?2:i+1;show(i)},100)};show(0);</script></html>`);
  if (incremental) {
    const path = `${output}/comparison.html`;
    const html = (await readFile(path, 'utf8')).replace('当前优化包含全部画质轮次。', '仅切换第五轮的材质细化与风雪，其余画质效果在两边保持开启。').replaceAll('基础', '上轮材质/天气').replaceAll('当前优化', '本轮材质/天气');
    await writeFile(path, html);
  }
} finally { await browser.close(); }
