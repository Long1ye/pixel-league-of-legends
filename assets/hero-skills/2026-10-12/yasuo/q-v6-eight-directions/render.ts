import { RIG, partAngle, windRibbon, type Direction, type Point, type sampleAimedThrust } from './rig';
export type Pose = ReturnType<typeof sampleAimedThrust>;
export interface RigImages { bodies: Partial<Record<Direction, HTMLImageElement>>; upper: HTMLImageElement; hand: HTMLImageElement; sword: HTMLImageElement }
function part(ctx: CanvasRenderingContext2D, image: HTMLImageElement, joint: Point, mount: Point, angle: number): void {
  ctx.save(); ctx.translate(joint.x, joint.y); ctx.rotate(angle); ctx.drawImage(image, -mount.x, -mount.y); ctx.restore();
}
function bladeTransform(ctx: CanvasRenderingContext2D, pose: Pose): void {
  ctx.translate(pose.wrist.x, pose.wrist.y); ctx.rotate(pose.radians); ctx.scale(pose.swordScale, 1); ctx.translate(-RIG.sword.grip.x, -RIG.sword.grip.y);
}
function wind(ctx: CanvasRenderingContext2D, pose: Pose, front: boolean): void {
  if (pose.wind <= 0) return;
  ctx.save(); bladeTransform(ctx, pose);
  if (!front) {
    ctx.fillStyle = '#82d5f5'; ctx.globalAlpha = pose.wind * 0.16;
    for (let x = RIG.sword.bladeStart; x <= RIG.sword.tip.x; x++) {
      const radius = Math.max(1, Math.round(5 * Math.min(1, (x - 34) / 12, (113 - x) / 12)));
      ctx.fillRect(x, RIG.sword.grip.y - radius, 1, radius * 2 + 1);
    }
  }
  for (const strand of [0, 1] as const) {
    ctx.fillStyle = front ? '#c3eeff' : '#73badb'; ctx.globalAlpha = pose.wind * (front ? 0.75 : 0.45);
    for (const point of windRibbon(pose.castTime, strand)) if (point.front === front) ctx.fillRect(point.x, point.y, 1, 1);
  }
  ctx.restore();
}
/** Never rotate the body. Only jointed parts and the ground-plane blade turn. */
export function renderThrust(ctx: CanvasRenderingContext2D, pose: Pose, images: RigImages, showJoints = false): void {
  ctx.imageSmoothingEnabled = false;
  const bodyImage = images.bodies[pose.direction];
  if (!bodyImage) throw new Error(`Body missing: ${pose.direction}`);
  const body = (): void => {
    ctx.save(); ctx.scale(pose.body.scale, pose.body.scale); ctx.drawImage(bodyImage, -pose.body.foot.x, -pose.body.foot.y); ctx.restore();
  };
  const weapon = (): void => {
    wind(ctx, pose, false); ctx.save(); bladeTransform(ctx, pose); ctx.drawImage(images.sword, 0, 0); ctx.restore(); wind(ctx, pose, true);
    part(ctx, images.hand, pose.elbow, RIG.lower.mount, partAngle(pose.elbow, pose.wrist, RIG.lower.mount, RIG.lower.end));
  };
  part(ctx, images.upper, pose.shoulder, RIG.upper.mount, partAngle(pose.shoulder, pose.elbow, RIG.upper.mount, RIG.upper.end));
  if (pose.body.behindBody) { weapon(); body(); } else { body(); weapon(); }
  if (showJoints) {
    ctx.strokeStyle = '#eabd75'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pose.shoulder.x, pose.shoulder.y); ctx.lineTo(pose.elbow.x, pose.elbow.y); ctx.lineTo(pose.wrist.x, pose.wrist.y); ctx.stroke();
    ctx.fillStyle = '#eabd75'; ctx.fillRect(Math.round(pose.wrist.x) - 1, Math.round(pose.wrist.y) - 1, 3, 3);
  }
}
