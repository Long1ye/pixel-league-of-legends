/** Shared R presentation and simulation timeline (seconds / world units). */
export const YASUO_R = {
  offsetX: 32,
  offsetY: -24,
  animationDuration: 1.6,
  airborneDuration: 1.6,
  hitAt: 1.312,
  duration: 1.84,
} as const;

export function yasuoRFrame(age:number):number {
  return Math.max(0,Math.min(15,Math.floor(age/YASUO_R.animationDuration*16)));
}
