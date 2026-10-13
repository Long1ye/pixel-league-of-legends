import type { AbilityKey, Point, Team } from './types';

// Expand terrain in world space without enlarging actors or changing the camera.
// Keep the source PNG untouched and use integer, nearest-neighbor terrain scale.
export const MAP_LAYOUT = { sourceWidth: 511, sourceHeight: 327, scale: 2 } as const;
export const WORLD = {
  width: MAP_LAYOUT.sourceWidth * MAP_LAYOUT.scale,
  height: MAP_LAYOUT.sourceHeight * MAP_LAYOUT.scale,
  step: 1 / 60,
} as const;
export const VIEWPORT = { width: 480, height: 270 } as const;
export function mapToWorld(point: Point): Point {
  return { x: point.x * MAP_LAYOUT.scale, y: point.y * MAP_LAYOUT.scale };
}
export const BALANCE = {
  csToWin: 100,
  firstWaveAt: 2,
  waveInterval: 14,
  aiInterval: 0.18,
  hero: { hp: 640, mana: 240, speed: 53, range: 54, damage: 43, attackInterval: 0.8, windup: 0.19 },
  melee: { hp: 110, speed: 24, range: 11, damage: 10, attackInterval: 1.25, windup: 0.24 },
  ranged: { hp: 78, speed: 24, range: 43, damage: 13, attackInterval: 1.45, windup: 0.25 },
  tower: { hp: 1000, range: 78, damage: 90, attackInterval: 1.15, windup: 0.15 },
  projectileSpeed: 190,
  fountainRadius: 22 * MAP_LAYOUT.scale,
  fountainHeal: 42,
  manaRegen: 6,
} as const;

export const ABILITIES: Record<AbilityKey, { name: string; cost: number; cooldown: number; range: number; damage: number }> = {
  q: { name: '棱光箭', cost: 30, cooldown: 5, range: 145, damage: 85 },
  w: { name: '风之障壁', cost: 25, cooldown: 8, range: 32, damage: 0 },
  e: { name: '踏前斩', cost: 0, cooldown: 0.5, range: 60, damage: 55 },
  r: { name: '狂风绝息斩', cost: 0, cooldown: 70, range: 175, damage: 200 },
};

// The study's corner platforms are fountains; combat towers stand further up the lane.
export const BASES: Record<Team, Point> = { blue: mapToWorld({ x: 51, y: 305 }), red: mapToWorld({ x: 459, y: 44 }) };
export const TOWERS: Record<Team, Point> = { blue: mapToWorld({ x: 115, y: 262 }), red: mapToWorld({ x: 395, y: 85 }) };
export const SPAWNS: Record<Team, Point> = { blue: mapToWorld({ x: 145, y: 241 }), red: mapToWorld({ x: 364, y: 109 }) };
export const AI_HOLD: Point = mapToWorld({ x: 305, y: 147 });
