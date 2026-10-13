import { renderLinkedThrust, type RigImages, type Pose } from '../q-v7-user-linked/render';
import { RIG } from '../q-v7-user-linked/rig';
import { sampleWindCast, sampleGust, sampleWall, VIEW, TIMING } from './motion';

export function drawHero(ctx: CanvasRenderingContext2D, time: number, images: RigImages, joints = false) {
  const pose = sampleWindCast(time);
  renderLinkedThrust(ctx, pose, images, joints, (context: CanvasRenderingContext2D, p: Pose) => {
    context.save(); context.translate(p.wrist.x, p.wrist.y); context.rotate(p.radians);
    context.drawImage(images.sword, -RIG.sword.grip.x, -RIG.sword.grip.y);
    // A restrained moving ribbon follows the blade, not a tip explosion.
    context.globalAlpha = p.wind * 0.6;
    for (let i = 0; i < 65; i += 2) {
      const y = Math.round(Math.sin(i / 9 - time / 35) * 3);
      context.fillStyle = i % 4 ? '#e4faff' : '#77ccec';
      context.fillRect(17 + i, y, 2, 1);
    }
    context.restore();
  });
}

function wall(ctx: CanvasRenderingContext2D, time: number) {
  const state = sampleWall(time);
  if (!state.active) return;
  // East cast => north/south footprint. Wind columns remain screen-upright.
  // This edge-on procedural wall is a motion placeholder, not a rotated perspective sprite.
  for (let column = -6; column <= 6; column++) {
    const along = column * 5;
    const localGrowth = Math.max(0, Math.min(1, (time - TIMING.wallStart - Math.abs(column) * 15) / 200));
    const height = 53 * localGrowth;
    if (height <= 0) continue;
    ctx.globalAlpha = state.opacity * 0.12;
    ctx.fillStyle = '#82c8dd'; ctx.fillRect(VIEW.wall.x - 7, VIEW.wall.y + along - height, 15, height);
    for (let strand = 0; strand < 3; strand++) {
      const offset = ((time - TIMING.wallStart) * 0.08 + column * 7 + strand * 19 + 300) % 54;
      for (let k = 0; k < 10; k++) {
        const lift = (offset + k) % 54;
        if (lift > height) continue;
        const x = VIEW.wall.x + Math.round(Math.sin(lift / 11 + column * 0.6 + strand * 2) * 7);
        ctx.fillStyle = strand === 1 ? '#e0f7f5' : '#a0d5df';
        ctx.globalAlpha = state.opacity * (0.18 + k / 22);
        ctx.fillRect(x, Math.round(VIEW.wall.y + along - lift), strand === 1 ? 2 : 1, 2);
      }
    }
  }
  ctx.globalAlpha = 1;
}

export function drawScene(ctx: CanvasRenderingContext2D, time: number, images: RigImages, linked: boolean, joints: boolean) {
  const { width, height, foot } = VIEW;
  ctx.clearRect(0, 0, width, height); ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#17252a'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#21343a'; ctx.lineWidth = 1;
  for (let x = -height; x < width; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + height, height); ctx.stroke(); }
  for (let y = 0; y <= height; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
  ctx.fillStyle = '#07151888'; ctx.beginPath(); ctx.ellipse(foot.x, foot.y - 2, 28, 8, 0, 0, Math.PI * 2); ctx.fill();
  if (linked) {
    ctx.setLineDash([2, 4]); ctx.strokeStyle = '#66868a'; ctx.beginPath(); ctx.moveTo(foot.x + 30, foot.y); ctx.lineTo(VIEW.wall.x, foot.y); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#92c6c080'; ctx.beginPath(); ctx.moveTo(VIEW.wall.x, foot.y - 32); ctx.lineTo(VIEW.wall.x, foot.y + 32); ctx.stroke();
    wall(ctx, time);
  }
  ctx.save(); ctx.translate(foot.x, foot.y); drawHero(ctx, time, images, joints); ctx.restore();
  const gust = sampleGust(time);
  if (linked && gust.active) {
    ctx.save(); ctx.translate(gust.x, gust.y);
    for (let s = -2; s <= 2; s++) {
      ctx.fillStyle = s === 0 ? '#e1fbff' : '#95d9e5'; ctx.globalAlpha = 0.7 - Math.abs(s) * 0.17;
      for (let i = -18; i < 9; i += 2) ctx.fillRect(i, Math.round(s * (3 + gust.progress * 2) + Math.sin(i / 8) * 2), 3, 1);
    }
    ctx.restore();
  }
  ctx.fillStyle = '#99b6bd'; ctx.font = '10px monospace'; ctx.fillText('E / 正右', 13, 20);
  if (linked) ctx.fillText('风墙侧视', 211, 209);
}
