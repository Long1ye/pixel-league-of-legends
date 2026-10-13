import type { Entity, Point } from './types';
import { clampPoint, direction, distance } from './geometry';
export const E = { range: 60, travel: 80, startup: 0.04, dash: 0.22, recovery: 0.06, duration: 0.32, targetCooldown: 6 } as const;
export interface DashCast { startedAt: number; start: Point; end: Point; facing: number; targetId: number; hit: boolean; }
export function isDashing(hero: Entity, time: number): boolean { return !!hero.eCast && hero.hp > 0 && time < hero.eCast.startedAt + E.duration; }
export function dashEndpoint(hero: Point, target: Point): Point {
  const dir=direction(hero,target);
  return clampPoint({x:hero.x+dir.x*E.travel,y:hero.y+dir.y*E.travel},7);
}
export function pickDashTarget(hero: Entity, entities: Entity[], cursor: Point): Entity | undefined {
  // Resolve the hovered target before eligibility: never silently choose a different unit.
  return entities.filter(e=>e.hp>0 && e.team!==hero.team && e.kind!=='tower' &&
    (distance(e,cursor)<=e.radius+5 || (Math.abs(cursor.x-e.x)<=e.radius+3 && cursor.y>=e.y-20 && cursor.y<=e.y)))
    .sort((a,b)=>distance(a,cursor)-distance(b,cursor)||a.id-b.id)[0];
}
