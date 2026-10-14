import originalRegistry from '../../assets/heroes/yasuo/selected-2026-10-10/animations.json';
import attackRegistry from '../../assets/heroes/yasuo/attacks-v2-2026-10-13/animations.json';
const registry={...originalRegistry,attacks:attackRegistry.attacks};

export function flipYasuoAttack(facing:number):boolean {return Math.cos(facing)<-0.001;}
import { headingToDirection, type SpriteDirection } from '../../assets/hero-walk-directions/2026-10-09/v1/direction';
import { BALANCE } from '../game/config';
import type { Entity } from '../game/types';
import { sampleYasuoQ, type YasuoQClip } from './YasuoQAnimation';
import { sampleYasuoE, type YasuoEClip } from './YasuoEAnimation';

export const YASUO_ASSETS = registry;
export type YasuoClip = typeof registry.attacks[number] | typeof registry.locomotion[number] | YasuoQClip | YasuoEClip;
export interface YasuoSample { clip: YasuoClip; frame: number; state: 'idle' | 'walk' | 'A' | 'B' | 'Q' | 'E'; scale: number }

/** Original frame timings, sampled without reversing, deleting or interpolating art. */
export function spriteFrameAt(milliseconds: number, durations: readonly number[], loop: boolean): number {
  const total = durations.reduce((sum, duration) => sum + duration, 0);
  if (!Number.isFinite(milliseconds) || milliseconds < 0 || !durations.length || durations.some(d => !Number.isFinite(d) || d <= 0)) {
    throw new RangeError('Invalid sprite timing');
  }
  let remaining = loop ? milliseconds % total : Math.min(milliseconds, total);
  for (let frame = 0; frame < durations.length; frame++) {
    if (remaining < durations[frame]) return frame;
    remaining -= durations[frame];
  }
  return durations.length - 1;
}

export function attackClipFor(entity: Pick<Entity, 'attackReleasedAt' | 'attacksReleased'>): typeof registry.attacks[number] {
  const committed = entity.attacksReleased - (entity.attackReleasedAt === null ? 0 : 1);
  return registry.attacks[Math.max(0, committed) % 2];
}

/** Align each clip's impact pose with the existing simulation's attack release. */
export function attackFrameAt(entity: Entity, now: number, clip = attackClipFor(entity)): number {
  const impact = clip.durations_ms.slice(0, clip.impact_frame).reduce((sum, ms) => sum + ms, 0);
  const sourceTime = entity.attackReleasedAt === null
    ? Math.min(1, Math.max(0, (now - (entity.attackStartedAt ?? now)) / BALANCE.hero.windup)) * impact
    : impact + Math.min(1, Math.max(0, (now - entity.attackReleasedAt) / entity.attackInterval)) * (clip.duration_ms - impact);
  return spriteFrameAt(sourceTime, clip.durations_ms, false);
}

/** Simulation time, not wall time: pause, restart and cancelled windups stay exact. */
export class YasuoAnimator {
  private previous: { x: number; y: number; time: number } | null = null;
  private moving = false;
  private direction: SpriteDirection | undefined;
  private stateStartedAt = 0;
  private locomotionState: 'idle' | 'walk' | null = null;

  reset(): void {
    this.previous = null; this.moving = false; this.direction = undefined;
    this.stateStartedAt = 0;
    this.locomotionState = null;
  }

  sample(entity: Entity, now: number): YasuoSample {
    if (this.previous && this.previous.time !== now) this.moving = Math.hypot(entity.x - this.previous.x, entity.y - this.previous.y) > 0.01;
    this.previous = { x: entity.x, y: entity.y, time: now };
    this.direction = headingToDirection(entity.facing, this.direction);
    const e = sampleYasuoE(entity, now);
    if (e) { this.locomotionState = null; return e; }
    const q = sampleYasuoQ(entity, now);
    if (q) { this.locomotionState = null; return q; }
    const attacking = entity.hp > 0 && entity.attackStartedAt !== null &&
      (entity.windup > 0 || (!this.moving && entity.attackReleasedAt !== null && now - entity.attackReleasedAt <= entity.attackInterval));
    if (attacking) {
      const clip = attackClipFor(entity);
      this.locomotionState = null;
      return { clip, frame: attackFrameAt(entity, now, clip), state: clip.id as 'A' | 'B', scale: registry.scale_in_world };
    }
    const state = this.moving && entity.hp > 0 ? 'walk' : 'idle';
    const clip = registry.locomotion.find(c => c.state === state && c.direction === this.direction)!;
    // Turning changes the view, not the footstep clock. Actions still restart locomotion.
    if (this.locomotionState !== state) this.stateStartedAt = now;
    this.locomotionState = state;
    return { clip, frame: spriteFrameAt(Math.max(0, now - this.stateStartedAt) * 1000, clip.durations_ms, true), state, scale: registry.scale_in_world };
  }
}
