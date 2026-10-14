import type { Entity } from './types';

/** V11's committed cast: input orders are retained and resume after recovery. */
export const YASUO_Q_CAST_SECONDS = 0.72;
export function isYasuoQCasting(entity: Entity, now: number): boolean {
  return entity.team === 'blue' && entity.kind === 'hero' && entity.hp > 0 && entity.qCast !== null &&
    now >= entity.qCast.startedAt && now < entity.qCast.startedAt + YASUO_Q_CAST_SECONDS;
}
