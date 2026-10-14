export type Team = 'blue' | 'red';
export type EntityKind = 'hero' | 'melee' | 'ranged' | 'tower';
export type AbilityKey = 'q' | 'w' | 'e' | 'r';
export type WinReason = 'first-blood' | 'first-tower' | '100-cs' | 'draw';
export type MatchPhase = 'ready' | 'playing' | 'paused' | 'ended';

export interface Point { x: number; y: number }

export interface Entity extends Point {
  id: number;
  team: Team;
  kind: EntityKind;
  hp: number;
  maxHp: number;
  radius: number;
  speed: number;
  homeguardUntil?: number;
  homeguardCombatAt?: number;
  range: number;
  damage: number;
  attackInterval: number;
  cooldown: number;
  windup: number;
  targetId: number | null;
  attackTargetId: number | null;
  /** Presentation timing; does not change damage, range or attack cadence. */
  attackStartedAt: number | null;
  attackReleasedAt: number | null;
  attacksReleased: number;
  /** The player's Q locks its artwork heading for the committed cast. */
  qCast: { startedAt: number; facing: number } | null;
  qStacks?: number;
  qStacksUntil?: number;
  qReadyAt?: number;
  q3Cast?: { startedAt: number; facing: number; released: boolean } | null;
  wCast?: { startedAt: number; facing: number } | null;
  eCast?: import('./YasuoE').DashCast | null;
  airborneUntil?: number;
  rCast?: { startedAt:number; targetIds:number[]; hit:boolean } | null;
  eqCast?: { startedAt: number; triggerAt: number; endsAt: number; eStartedAt: number; facing: number; hit: boolean; empowered?: boolean } | null;
  destination: Point | null;
  formation?: { wave:number; slot:number; goal:Point };
  facing: number;
  slowUntil: number;
  hitAt: number;
  mana: number;
  maxMana: number;
  abilities: Record<AbilityKey, number>;
  guardUntil: number;
  aggroUntil: number;
  aggroTargetId: number | null;
}

export interface Projectile extends Point {
  empowered?: boolean;
  startedAt?: number;
  hitIds?: number[];
  id: number;
  sourceId: number;
  team: Team;
  kind: 'attack' | 'q';
  targetId: number | null;
  damage: number;
  speed: number;
  vx: number;
  vy: number;
  remaining: number;
  radius: number;
}

export interface Zone extends Point {
  id: number;
  sourceId: number;
  team: Team;
  radius: number;
  triggerAt: number;
  damage: number;
}

export interface MatchResult {
  winner: Team | null;
  reason: WinReason;
  time: number;
}

export interface GameEvent extends Point {
  type: 'hit' | 'kill' | 'last-hit' | 'wave' | 'cast' | 'end' | 'move';
  team: Team;
  amount?: number;
  ability?: AbilityKey;
}

export function enemyOf(team: Team): Team { return team === 'blue' ? 'red' : 'blue'; }
