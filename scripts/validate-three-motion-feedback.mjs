import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openThreeControls, closeThreeControls } from './three-quality-browser-ui.mjs';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import(pathToFileURL(join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href); }
const output = 'docs/visual-validation/2026-10-19/motion-feedback';
await mkdir(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true }), errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=match', { waitUntil: 'networkidle' });
  await openThreeControls(page); await page.locator('#pause').click(); await closeThreeControls(page);
  await page.evaluate(async () => {
    const [{ ThreeArena }, { PrototypeHost }, { Match }, { crystalAnchor }, { toSimulation }, { Vector3 }] = await Promise.all([
      import('/src/render-three/ThreeArena.ts'), import('/src/presentation/PrototypeHost.ts'), import('/src/game/Match.ts'),
      import('/src/render-three/CrystalMotes.ts'), import('/src/render-three/Coordinates.ts'), import('/node_modules/.vite/deps/three.js'),
    ]);
    const container = document.createElement('div'); container.style.cssText = 'position:fixed;inset:0;z-index:100;background:#111c2b'; document.body.append(container);
    const view = new ThreeArena(container), host = new PrototypeHost(() => new Match({ ai: false, waves: false }), view);
    view.renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    view.cameraRig.setElevation(45); view.cameraRig.setZoom(.6); host.update(0);
    const wall = view.landmarks.group.children.find(o => o.name === 'painted-backwall');
    const tower = view.landmarks.group.children.find(o => o.name === 'painted-tower');
    const blueIce = view.architecturalIce.group.children.find(o => o.name === 'ice-coping-crown-blue');
    const redIce = view.architecturalIce.group.children.find(o => o.name === 'ice-ice-crystal-cluster-red');
    const bowl = view.painted.group.children.find(o => o.name === 'painted-fire-bowl');
    const cases = [
      { name: 'wall-fire', source: wall, u: 857 / 1672, v: 1 - 560 / 941 },
      { name: 'blue-ice', source: blueIce, u: .5, v: .72 },
      { name: 'red-ice', source: redIce, u: .5, v: .72 },
      { name: 'tower-flag', source: tower, u: .85, v: .48 },
      { name: 'brazier', source: bowl, u: .5, v: .65 },
    ];
    const pixel = new Vector3();
    function focus(c) {
      pixel.copy(crystalAnchor(c.source, c.u, c.v)); c.source.updateWorldMatrix(true, false); pixel.applyMatrix4(c.source.matrixWorld);
      pixel.z -= pixel.y; pixel.y = 0; view.cameraRig.lookAt(toSimulation(pixel));
    }
    function render(c, time, isolated = false) {
      focus(c); host.match.time = time; host.update(0);
      if (isolated) {
        for (const child of view.scene.children) child.visible = child === c.source.parent;
        for (const child of c.source.parent.children) child.visible &&= child === c.source || (c.name === 'brazier' && child === view.painted.livingFire.mesh);
      }
      view.renderer.render(view.scene, view.cameraRig.camera);
    }
    window.motionFeedback = { view, host, cases, render, focus };
  });
  await page.waitForTimeout(1500);
  const report = await page.evaluate(() => {
    const { view, host, cases, render } = window.motionFeedback;
    const gl = view.renderer.getContext(), width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
    const read = () => { const pixels = new Uint8Array(width * height * 4); gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels); return pixels; };
    const results = [], colorSamples = [];
    view.renderer.setClearColor(0);
    for (const c of cases) {
      render(c, 2, true); const first = read(); render(c, 2.35, true); const last = read(); render(c, 2.35, true); const frozen = read();
      let changed = 0, silhouette = 0, maximum = 0;
      // Center region includes the selected flag tail/fire and excludes the tower core.
      const radius = c.name === 'tower-flag' ? 65 : 160;
      for (let y = height / 2 - radius; y < height / 2 + radius; y++) for (let x = width / 2 - radius; x < width / 2 + radius; x++) {
        const i = (y * width + x) * 4;
        const delta = Math.max(Math.abs(first[i] - last[i]), Math.abs(first[i + 1] - last[i + 1]), Math.abs(first[i + 2] - last[i + 2]));
        if (delta > 2) changed++; maximum = Math.max(maximum, delta);
        if ((Math.max(first[i], first[i + 1], first[i + 2]) > 10) !== (Math.max(last[i], last[i + 1], last[i + 2]) > 10)) silhouette++;
      }
      let pausedChanges = 0;
      for (let i = 0; i < last.length; i += 4) if (Math.max(Math.abs(last[i] - frozen[i]), Math.abs(last[i + 1] - frozen[i + 1]), Math.abs(last[i + 2] - frozen[i + 2])) > 2) pausedChanges++;
      results.push({ name: c.name, changed, maximum, silhouette, pausedChanges });
    }
    const red = cases.find(c => c.name === 'red-ice');
    for (let frame = 0; frame < 12; frame++) {
      render(red, frame * .25, true); const p = read(); let redPixels = 0, bluePixels = 0;
      for (let i = 0; i < p.length; i += 4) {
        const r = p[i], g = p[i + 1], b = p[i + 2], high = Math.max(r, g, b), low = Math.min(r, g, b);
        if (high < 60 || (high - low) / high < .20) continue;
        if (r > b * 1.12 && r > g * 1.05) redPixels++;
        if (b > r * 1.12 && b > g * 1.05) bluePixels++;
      }
      colorSamples.push({ time: frame * .25, redPixels, bluePixels });
    }
    const blue = cases.find(c => c.name === 'blue-ice'), material = blue.source.material, original = material.color.getHex();
    const luminance = pixels => {
      let total = 0, count = 0;
      for (let i = 0; i < pixels.length; i += 4) if (Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) > 10) {
        total += pixels[i] * .2126 + pixels[i + 1] * .7152 + pixels[i + 2] * .0722; count++;
      }
      return total / count;
    };
    material.color.setHex(0xc6d4e2); render(blue, 2, true); const tinted = luminance(read());
    material.color.setHex(original); render(blue, 2, true); const untinted = luminance(read());
    view.renderer.setClearColor(0x8293ad); host.match.time = 0; host.update(0);
    return { results, colorSamples, brightness: { tinted, untinted, ratio: untinted / tinted, note: 'Same animation time, changes only the old material multiply color.' }, errors: [] };
  });
  for (let c = 0; c < 5; c++) for (let frame = 0; frame < 16; frame++) {
    await page.evaluate(({ c, frame }) => {
      const state = window.motionFeedback; state.render(state.cases[c], frame / 8);
    }, { c, frame });
    await page.screenshot({ path: `${output}/${report.results[c].name}-${String(frame).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 87 });
    await page.screenshot({ path: `${output}/${report.results[c].name}-detail-${String(frame).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 92, clip: { x: 560, y: 270, width: 480, height: 360 } });
  }
  report.errors = errors;
  report.resources = await page.evaluate(() => {
    const { host, view } = window.motionFeedback, resources = [];
    for (let i = 0; i < 5; i++) { host.restart(); host.update(0); resources.push({ ...view.renderer.info.memory }); }
    return resources;
  });
  report.failures = report.results.filter(r => r.changed < 20).map(r => `${r.name}: no visible change`);
  if (report.results.find(r => r.name === 'tower-flag').silhouette < 8) report.failures.push('flag silhouette stayed static');
  if (report.colorSamples.some(r => r.redPixels < 100 || r.bluePixels > r.redPixels * .15)) report.failures.push('red ice hue regression');
  if (report.results.some(r => r.pausedChanges > 32)) report.failures.push('paused motion changed');
  if (report.brightness.ratio < 1.1) report.failures.push('ice brightness did not improve');
  if (report.resources.some(r => r.geometries !== report.resources[0].geometries || r.textures !== report.resources[0].textures)) report.failures.push('restart resource growth');
  await page.evaluate(() => window.motionFeedback.host.dispose());
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await writeFile(`${output}/motion.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>反馈位置修复</title><style>body{margin:0;background:#101721;color:#dce5ed;font:16px system-ui}header{padding:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}button,select{padding:8px}img{display:block;width:100%;max-width:1600px;margin:auto}</style><header><button id="play">暂停</button><select id="case">${report.results.map(r => `<option value="${r.name}">${({ 'wall-fire': '墙上火焰', 'blue-ice': '蓝方冰晶', 'red-ice': '红方冰晶', 'tower-flag': '塔旗', brazier: '火盆遮挡' })[r.name]}</option>`).join('')}</select><select id="size"><option value="normal">正常视野</option><option value="detail">局部原比例裁切</option></select><span>45° · 缩放 0.6 · 8 张/秒采样，非帧率测试</span></header><img id="frame" src="wall-fire-00.jpg"><script>let frame=0,playing=true;function show(){const detail=document.querySelector('#size').value==='detail',img=document.querySelector('#frame');img.style.width=detail?'auto':'100%';img.style.maxWidth=detail?'100%':'1600px';img.src=document.querySelector('#case').value+(detail?'-detail-':'-')+String(frame).padStart(2,'0')+'.jpg'}document.querySelector('#case').onchange=show;document.querySelector('#size').onchange=show;document.querySelector('#play').onclick=e=>{playing=!playing;e.target.textContent=playing?'暂停':'播放'};setInterval(()=>{if(playing){frame=(frame+1)%16;show()}},125)</script></html>`);
  console.log(JSON.stringify(report));
  if (errors.length || report.failures.length) process.exitCode = 1;
} finally { await browser.close(); }
