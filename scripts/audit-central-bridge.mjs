// CPU projection/asset audit only. Does not open a browser or render a game frame.
import { createServer } from 'vite';
import { Texture, TextureLoader, Vector3 } from 'three';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const output = 'docs/visual-validation/2026-10-16/threejs-P2-central-review-02';
await mkdir(output, { recursive: true });
const records = JSON.parse(await readFile('assets/map-modules/howling-central-v1/manifest.json', 'utf8'));
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
const original = TextureLoader.prototype.load;
const callbacks = [];
TextureLoader.prototype.load = function (url, done) {
  const map = new Texture(); map.userData.url = url; callbacks.push(() => done?.(map)); return map;
};
let view;
try {
  const { CentralBridgeArt } = await server.ssrLoadModule('/src/render-three/CentralBridgeArt.ts');
  const { ThreeCamera } = await server.ssrLoadModule('/src/render-three/Coordinates.ts');
  const { bridgePoint } = await server.ssrLoadModule('/src/game/Bridge.ts');
  view = new CentralBridgeArt(); callbacks.forEach(done => done());
  const camera = new ThreeCamera(); camera.resize(1280, 720); camera.lookAt(bridgePoint(-4));
  const measurements = [];
  for (const zoom of [0.6, 1, 1.5]) {
    camera.setZoom(zoom); view.update(1, bridgePoint(-4), camera); view.group.updateMatrixWorld(true);
    for (const [name, kind] of [['central-ground', 'ground'], ['near-parapet', 'rail'], ['bridge-support-arch', 'arch']]) {
      const mesh = view.group.getObjectByName(name), positions = mesh.geometry.getAttribute('position'), uv = mesh.geometry.getAttribute('uv');
      const screen = Array.from({ length: 4 }, (_, i) => {
        const p = new Vector3().fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld).project(camera.camera);
        return { x: (p.x + 1) * 640 / 2, y: (1 - p.y) * 360 / 2 };
      });
      const w = { x: screen[1].x - screen[0].x, y: screen[1].y - screen[0].y };
      const h = { x: screen[3].x - screen[0].x, y: screen[3].y - screen[0].y };
      const width = Math.hypot(w.x, w.y), height = Math.hypot(h.x, h.y);
      const angle = Math.acos(Math.max(-1, Math.min(1, (w.x * h.x + w.y * h.y) / width / height))) * 180 / Math.PI;
      const record = records.find(item => item.id === `howling-central-${kind}-v1`);
      const xs = Array.from({ length: 4 }, (_, i) => uv.getX(i));
      const ys = Array.from({ length: 4 }, (_, i) => uv.getY(i));
      const texelWidth = (Math.max(...xs) - Math.min(...xs)) * record.size[0];
      const texelHeight = (Math.max(...ys) - Math.min(...ys)) * record.size[1];
      measurements.push({ name, zoom, canvasPixelsAlongWidth: width, canvasPixelsAlongHeight: height,
        sourceTexelsWidth: texelWidth, sourceTexelsHeight: texelHeight,
        sourceTexelsPerCanvasPixelWidth: texelWidth / width, sourceTexelsPerCanvasPixelHeight: texelHeight / height,
        sourceAspect: texelWidth / texelHeight, projectedBasisAspect: width / height,
        projectedHeightRelativeToAspectPreserving: height / (width / (texelWidth / texelHeight)), basisAngleDegrees: angle,
      });
    }
  }
  const report = { evidence: 'CPU actual scene geometry plus source UV measurements; NOT a screenshot or GPU test',
    referenceConditions: { cssWidth: 1280, cssHeight: 720, canvasWidth: 640, canvasHeight: 360, elevation: 60, cameraFocusU: -4,
      actualUserViewportKnown: false }, measurements,
    geometryCounts: { nearWalls: view.group.children.filter(item => item.name === 'near-parapet').length,
      farWalls: view.group.children.filter(item => item.name === 'far-parapet').length,
      arches: view.group.children.filter(item => item.name === 'bridge-support-arch').length },
    archCrop: { fullSolidBounds: records.find(item => item.id.endsWith('arch-v1')).solidBounds,
      runtimeBounds: records.find(item => item.id.endsWith('arch-v1')).runtimeBounds },
  };
  await writeFile(`${output}/projection-audit.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally { view?.dispose(); TextureLoader.prototype.load = original; await server.close(); }
