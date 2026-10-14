import { YASUO_Q_CAST_SECONDS } from '../game/YasuoQ';
import { HERO_ATTACHMENT_SCALE } from './Presentation';
export const Q_DRAW_FRAME_COUNT = 37;
// The supplied v2 first shows its hand flash at frame 22.
export const Q_FLASH_START = 22 / Q_DRAW_FRAME_COUNT * YASUO_Q_CAST_SECONDS;
export const Q_FLASH_DURATION = .18;
export function qDrawPose(age:number, facing:number) {
  const flipX=Math.cos(facing)<-.001;
  return {frame:Math.min(Q_DRAW_FRAME_COUNT-1,Math.max(0,Math.floor(age/YASUO_Q_CAST_SECONDS*Q_DRAW_FRAME_COUNT))),flipX,originX:.5,originY:108/113};
}
export function qSwordPose(age:number,vx:number,vy:number) {
  return {frame:Math.min(15,Math.max(0,Math.floor((age-Q_FLASH_START)/Q_FLASH_DURATION*16))),
    rotation:Math.atan2(vy,vx)-Math.atan2(27,112),scale:.65*HERO_ATTACHMENT_SCALE*.8,originX:0,originY:0};
}
/** One anchored flash outside the actor silhouette; no projectile-position dependency. */
export function qSwordFlash(age:number,x:number,y:number,facing:number) {
  const dx=Math.cos(facing),dy=Math.sin(facing);
  const elapsed=age-Q_FLASH_START;
  return {...qSwordPose(age,dx,dy),x:x+dx*10*HERO_ATTACHMENT_SCALE,y:y+(-18+dy*10)*HERO_ATTACHMENT_SCALE,
    visible:elapsed>=0&&elapsed<Q_FLASH_DURATION,
    alpha:Math.max(0,Math.min(1,elapsed/.012,(Q_FLASH_DURATION-elapsed)/.04))};
}
