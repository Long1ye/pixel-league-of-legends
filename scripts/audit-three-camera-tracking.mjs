// CPU projection audit only. This measures screen drift, not perceived blur or GPU FPS.
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
try {
  const { ThreeCamera } = await server.ssrLoadModule('/src/render-three/Coordinates.ts');
  const { RenderPositions } = await server.ssrLoadModule('/src/render/RenderPositions.ts');
  const { trackHeroCamera } = await server.ssrLoadModule('/src/render-three/CameraTracking.ts');
  const results = [];
  for (const rate of [60, 120, 165, 240]) for (const zoom of [.6, 1, 1.5]) {
    const hero = { id: 1, x: 3100, y: 1700 }, positions = new RenderPositions();
    const previous = new ThreeCamera(), current = new ThreeCamera();
    for (const camera of [previous, current]) { camera.resize(852, 884); camera.setElevation(45); camera.setZoom(zoom); camera.lookAt(hero); }
    let accumulator = 0, simulationTime = 0, lastTime = 0, beforeX, beforeY, maxBeforeStep = 0, maxAfterDrift = 0;
    for (let frame = 0; frame < rate * 4; frame++) {
      accumulator += 1 / rate;
      while (accumulator + 1e-12 >= 1 / 60) { positions.capture([hero]); hero.x += 80 / 60; hero.y += 35 / 60; accumulator -= 1 / 60; simulationTime += 1 / 60; }
      const alpha = accumulator * 60, sample = positions.sample(hero, alpha);
      previous.follow(sample, simulationTime - lastTime); lastTime = simulationTime;
      trackHeroCamera(current, { match: { hero: () => hero }, positions, alpha }, true);
      const a = previous.project(sample), b = current.project(sample);
      if (frame > rate * 2) {
        if (beforeX !== undefined) maxBeforeStep = Math.max(maxBeforeStep, Math.hypot(a.x - beforeX, a.y - beforeY));
        maxAfterDrift = Math.max(maxAfterDrift, Math.hypot(b.x - 426, b.y - 442));
      }
      beforeX = a.x; beforeY = a.y;
    }
    results.push({ rate, zoom, previousMaxScreenStepCssPx: maxBeforeStep, currentMaxScreenDriftCssPx: maxAfterDrift });
  }
  const dir = 'docs/visual-validation/2026-10-19/locked-camera-clarity'; await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/projection-audit.json`, JSON.stringify({ evidence: 'CPU projection, 60 Hz simulation with interpolated render positions; not a visual sharpness or frame-rate measurement', results }, null, 2));
  console.log(JSON.stringify(results.filter(row => row.rate === 165)));
} finally { await server.close(); }
