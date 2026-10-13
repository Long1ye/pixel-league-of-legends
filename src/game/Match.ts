import { ABILITIES, AI_HOLD, BALANCE, BASES, SPAWNS, TOWERS, WORLD } from './config';
import { clampPoint, direction, distance, moveTowards, segmentDistance } from './geometry';
import { isYasuoQCasting } from './YasuoQ';
import { clearStorm, grantStorm, stormReady, STORM } from './YasuoStorm';
import { E, dashEndpoint, isDashing, pickDashTarget } from './YasuoE';
import { circleHit, wallHit, W_CAST_SECONDS, W_DELAY, W_DURATION, type WindWall } from './WindWall';
import { enemyOf, type AbilityKey, type Entity, type EntityKind, type GameEvent, type MatchPhase, type MatchResult, type Point, type Projectile, type Team, type WinReason, type Zone } from './types';

export interface MatchOptions { ai?: boolean; waves?: boolean }

/** Pure simulation. No Phaser, DOM, browser timers or asset dependencies. */
export class Match {
  phase: MatchPhase = 'ready';
  time = 0;
  wave = 0;
  cs: Record<Team, number> = { blue: 0, red: 0 };
  entities: Entity[] = [];
  projectiles: Projectile[] = [];
  zones: Zone[] = [];
  windWalls: WindWall[] = [];
  eTargetLocks = new Map<number, number>();
  dashTarget(point: Point): Entity | undefined { return pickDashTarget(this.hero('blue'), this.entities, point); }
  dashError(point: Point): string | null {
    const hero=this.hero('blue'), target=this.dashTarget(point);
    if (!target) return '请指向敌方小兵或英雄后按 E。';
    if ((this.eTargetLocks.get(target.id) ?? 0) > this.time) return '该目标暂时不能再次踏前斩。';
    if (distance(hero,target)>E.range) return '目标超出踏前斩范围。';
    const end=dashEndpoint(hero,target), dir=direction(hero,target);
    if ((end.x-target.x)*dir.x+(end.y-target.y)*dir.y < hero.radius+target.radius) return '地图边界处没有足够的穿越空间。';
    return null;
  }
  events: GameEvent[] = [];
  result: MatchResult | null = null;
  private nextId = 1;
  private nextWaveAt: number = BALANCE.firstWaveAt;
  private nextAiAt = 1;
  private claims: { team: Team; reason: Exclude<WinReason, 'draw'> }[] = [];
  private options: Required<MatchOptions>;

  constructor(options: MatchOptions = {}) {
    this.options = { ai: options.ai ?? true, waves: options.waves ?? true };
    this.entities.push(this.createEntity('tower', 'blue', TOWERS.blue));
    this.entities.push(this.createEntity('tower', 'red', TOWERS.red));
    this.entities.push(this.createEntity('hero', 'blue', SPAWNS.blue));
    this.entities.push(this.createEntity('hero', 'red', SPAWNS.red));
  }

  hero(team: Team): Entity { return this.entities.find(e => e.kind === 'hero' && e.team === team)!; }
  tower(team: Team): Entity { return this.entities.find(e => e.kind === 'tower' && e.team === team)!; }
  entity(id: number | null): Entity | undefined { return this.entities.find(e => e.id === id); }
  start(): void { if (this.phase === 'ready') this.phase = 'playing'; }
  togglePause(): void {
    if (this.phase === 'playing') this.phase = 'paused';
    else if (this.phase === 'paused') this.phase = 'playing';
  }
  drainEvents(): GameEvent[] { const events = this.events; this.events = []; return events; }

  private createEntity(kind: EntityKind, team: Team, position: Point): Entity {
    const spec = BALANCE[kind];
    return {
      ...position, id: this.nextId++, kind, team,
      hp: spec.hp, maxHp: spec.hp,
      radius: kind === 'tower' ? 12 : kind === 'hero' ? 7 : 4,
      speed: 'speed' in spec ? spec.speed : 0,
      range: spec.range, damage: spec.damage, attackInterval: spec.attackInterval,
      cooldown: 0, windup: 0, targetId: null, attackTargetId: null, destination: null,
      attackStartedAt: null, attackReleasedAt: null, attacksReleased: 0,
      qCast: null,
      facing: team === 'blue' ? -0.45 : 2.7,
      slowUntil: 0, hitAt: -10,
      mana: kind === 'hero' ? BALANCE.hero.mana : 0,
      maxMana: kind === 'hero' ? BALANCE.hero.mana : 0,
      abilities: { q: 0, w: 0, e: 0, r: 0 }, guardUntil: 0,
      aggroUntil: 0, aggroTargetId: null,
    };
  }

  spawnMinion(team: Team, kind: 'melee' | 'ranged', position: Point): Entity {
    const unit = this.createEntity(kind, team, position);
    this.entities.push(unit);
    return unit;
  }

  private spawnWave(): void {
    this.wave++;
    for (const team of ['blue', 'red'] as const) {
      const base = BASES[team], dir = direction(base, BASES[enemyOf(team)]);
      for (let i = 0; i < 4; i++) {
        const side = i % 2 === 0 ? 6 : -6;
        const p = clampPoint({ x: base.x + dir.x * (18 - i * 7) - dir.y * side, y: base.y + dir.y * (18 - i * 7) + dir.x * side });
        this.spawnMinion(team, i === 3 ? 'ranged' : 'melee', p);
      }
    }
    this.events.push({ type: 'wave', team: 'blue', ...SPAWNS.blue });
  }

  orderMove(team: Team, point: Point): void {
    if (this.phase !== 'playing') return;
    const hero = this.hero(team);
    hero.destination = clampPoint(point);
    hero.targetId = null;
    hero.attackTargetId = null;
    hero.windup = 0;
    this.clearAttackPresentation(hero);
    this.events.push({ type: 'move', team, ...hero.destination });
  }

  orderAttack(team: Team, targetId: number): void {
    if (this.phase !== 'playing') return;
    const target = this.entity(targetId), hero = this.hero(team);
    if (!target || target.team === team || target.hp <= 0) return;
    if (hero.targetId !== targetId) { hero.windup = 0; hero.attackTargetId = null; this.clearAttackPresentation(hero); }
    hero.targetId = targetId;
    hero.destination = null;
  }

  stop(team: Team): void {
    const hero = this.hero(team);
    hero.destination = null;
    hero.targetId = null;
    hero.windup = 0;
    hero.attackTargetId = null;
    this.clearAttackPresentation(hero);
  }

  cast(team: Team, key: AbilityKey, point: Point): boolean {
    if (this.phase !== 'playing') return false;
    const hero = this.hero(team), spec = team === 'red' && key === 'e' ? {cost:45,cooldown:8,range:105,damage:65} : ABILITIES[key];
    if (hero.hp <= 0 || hero.abilities[key] > this.time || hero.mana < spec.cost) return false;
    if(hero.rCast || hero.q3Cast || (hero.airborneUntil??0)>this.time) return false;
    if(key==='r') {
      if(team!=='blue') return false;
      const target=this.entities.filter(e=>e.team!==team&&e.kind==='hero'&&e.hp>0&&(e.airborneUntil??0)>this.time&&distance(hero,e)<=spec.range&&distance(e,point)<24).sort((a,b)=>distance(a,point)-distance(b,point))[0];
      if(!target) return false;
      const victims=this.entities.filter(e=>e.team!==team&&e.kind!=='tower'&&e.hp>0&&(e.airborneUntil??0)>this.time&&distance(e,target)<=32);
      hero.rCast={startedAt:this.time,targetIds:victims.map(e=>e.id),hit:false};
      clearStorm(hero);
      for(const v of victims){v.airborneUntil=this.time+1;v.windup=0;v.attackTargetId=null;}
      Object.assign(hero,clampPoint({x:target.x+16,y:target.y-12}));hero.facing=Math.PI*.75;
      hero.eCast=null;hero.eqCast=null;hero.qCast=null;hero.wCast=null;hero.destination=null;hero.targetId=null;hero.windup=0;hero.attackTargetId=null;this.clearAttackPresentation(hero);
      hero.abilities.r=this.time+spec.cooldown;hero.mana-=spec.cost;
      this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:key});return true;
    }
    if (hero.wCast && this.time < hero.wCast.startedAt + W_CAST_SECONDS) return false;
    if (isDashing(hero,this.time)) {
      if(team!=='blue'||key!=='q'||hero.eqCast) return false;
      const cast=hero.eCast!, triggerAt=Math.max(cast.startedAt+E.startup+E.dash,this.time+0.05);
      hero.mana-=spec.cost; hero.abilities.q=this.time+spec.cooldown;
      const empowered=stormReady(hero,this.time);
      if(empowered)clearStorm(hero);
      hero.eqCast={startedAt:triggerAt-0.05,triggerAt,endsAt:triggerAt+0.15,eStartedAt:cast.startedAt,facing:cast.facing,hit:false,empowered};
      hero.qCast=null;
      this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:'q'});
      return true;
    }
    if(hero.eqCast && this.time<hero.eqCast.endsAt) return false;
    if (team==='blue' && key==='e' && this.dashError(point)) return false;
    hero.mana -= spec.cost;
    hero.abilities[key] = this.time + spec.cooldown;
    const aim = clampPoint(point), dir = direction(hero, aim);
    hero.facing = Math.atan2(dir.y, dir.x);
    if (team === 'blue') {
      hero.qCast = key === 'q' ? { startedAt: this.time, facing: hero.facing } : null;
      if (key === 'q') {
        hero.windup = 0;
        hero.attackTargetId = null;
        this.clearAttackPresentation(hero);
      }
    }
    if (key === 'q') {
      if(team==='blue' && stormReady(hero,this.time)) {
        clearStorm(hero);hero.qCast=null;
        hero.q3Cast={startedAt:this.time,facing:hero.facing,released:false};
        this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:key});
        return true;
      }
      this.projectiles.push({ id: this.nextId++, sourceId: hero.id, team, kind: 'q', x: hero.x, y: hero.y,
        targetId: null, damage: spec.damage, speed: 200,
        vx: dir.x, vy: dir.y, remaining: spec.range, radius: 3,
      });
    } else if (key === 'w') {
      if (team === 'blue') {
        hero.wCast = { startedAt: this.time, facing: hero.facing };
        this.windWalls.push({ id: this.nextId++, team, x: hero.x + dir.x * 32, y: hero.y + dir.y * 32,
          angle: hero.facing, startsAt: this.time + W_DELAY });
      } else {
      const length = Math.min(distance(hero, aim), 43);
      const destination = clampPoint({ x: hero.x + dir.x * length, y: hero.y + dir.y * length });
      hero.x = destination.x;
      hero.y = destination.y;
      hero.guardUntil = this.time + 0.6;
      }
      hero.windup = 0;
      hero.attackTargetId = null;
      this.clearAttackPresentation(hero);
    } else if (team === 'blue') {
      const target=this.dashTarget(point)!;
      const start={x:hero.x,y:hero.y}, end=dashEndpoint(hero,target);
      hero.facing=Math.atan2(target.y-hero.y,target.x-hero.x);
      hero.eCast={startedAt:this.time,start,end,facing:hero.facing,targetId:target.id,hit:false};
      this.eTargetLocks.set(target.id,this.time+E.targetCooldown);
      hero.destination=null; hero.targetId=null; hero.windup=0; hero.attackTargetId=null;
      this.clearAttackPresentation(hero);
    } else {
      const length = Math.min(distance(hero, aim), spec.range);
      this.zones.push({ id: this.nextId++, sourceId: hero.id, team,
        x: hero.x + dir.x * length, y: hero.y + dir.y * length,
        radius: 26, triggerAt: this.time + 0.55, damage: spec.damage });
    }
    this.events.push({ type: 'cast', team, x: hero.x, y: hero.y, ability: key });
    return true;
  }

  /** All lethal outcomes are resolved together at the end of the current tick. */
  damage(source: Entity, target: Entity, amount: number, slow = false): void {
    if (this.phase !== 'playing' || target.hp <= 0 || target.team === source.team) return;
    const dealt = amount * (target.guardUntil > this.time ? 0.6 : 1) * (target.kind === 'tower' ? 0.65 : 1);
    target.hp = Math.max(0, target.hp - dealt);
    target.hitAt = this.time;
    if (slow) target.slowUntil = this.time + 1.5;
    this.events.push({ type: 'hit', team: source.team, x: target.x, y: target.y, amount: Math.round(dealt) });
    if (source.kind === 'hero' && target.kind === 'hero') {
      const tower = this.tower(target.team);
      if (tower.hp > 0 && distance(tower, source) <= tower.range + source.radius) {
        tower.aggroTargetId = source.id;
        tower.aggroUntil = this.time + 2.5;
      }
    }
    if (target.hp > 0) return;
    target.qCast = null;
    target.q3Cast = null;
    clearStorm(target);
    target.wCast = null;
    target.eCast = null;
    target.eqCast = null;
    target.rCast = null;
    target.airborneUntil = 0;
    this.events.push({ type: 'kill', team: source.team, x: target.x, y: target.y });
    if (target.kind === 'hero') this.claims.push({ team: enemyOf(target.team), reason: 'first-blood' });
    else if (target.kind === 'tower') this.claims.push({ team: enemyOf(target.team), reason: 'first-tower' });
    else if (source.kind === 'hero') {
      this.cs[source.team]++;
      this.events.push({ type: 'last-hit', team: source.team, x: target.x, y: target.y });
      if (this.cs[source.team] >= BALANCE.csToWin) this.claims.push({ team: source.team, reason: '100-cs' });
    }
  }

  step(dt: number): void {
    if (this.phase !== 'playing') return;
    this.time += dt;
    for (const [id,until] of this.eTargetLocks) if (until <= this.time) this.eTargetLocks.delete(id);
    if (this.options.waves && this.time >= this.nextWaveAt) {
      this.spawnWave();
      this.nextWaveAt += BALANCE.waveInterval;
    }
    if (this.options.ai && this.time >= this.nextAiAt) {
      this.thinkAi();
      this.nextAiAt = this.time + BALANCE.aiInterval;
    }
    for (const entity of this.entities) {
      if((entity.qStacksUntil??0)<=this.time && (entity.qStacks??0)>0)clearStorm(entity);
      if (entity.hp <= 0) continue;
      entity.cooldown = Math.max(0, entity.cooldown - dt);
      if (entity.kind === 'hero') {
        entity.mana = Math.min(entity.maxMana, entity.mana + BALANCE.manaRegen * dt);
        if (distance(entity, BASES[entity.team]) < BALANCE.fountainRadius) {
          entity.hp = Math.min(entity.maxHp, entity.hp + BALANCE.fountainHeal * dt);
          entity.mana = Math.min(entity.maxMana, entity.mana + 25 * dt);
        }
      } else {
        this.chooseTarget(entity);
      }
      this.updateCombat(entity, dt);
      if(entity.eqCast && entity.hp>0) {
        const eq=entity.eqCast;
        if(!eq.hit && this.time>=eq.triggerAt) {
          eq.hit=true;
          let connected=false;
          for(const victim of this.entities) if(victim.hp>0 && victim.team!==entity.team && victim.kind!=='tower' && distance(entity,victim)<=20+victim.radius) {
            connected=true;this.damage(entity,victim,ABILITIES.q.damage);
            if(eq.empowered && victim.hp>0){victim.airborneUntil=this.time+STORM.knockup;victim.windup=0;victim.attackTargetId=null;}
          }
          if(connected && !eq.empowered)grantStorm(entity,this.time);
        }
        if(this.time>=eq.endsAt) entity.eqCast=null;
      }
    }
    this.separateUnits();
    this.windWalls = this.windWalls.filter(w => this.time < w.startsAt + W_DURATION);
    this.updateProjectiles(dt);
    this.updateZones();
    this.entities = this.entities.filter(e => e.hp > 0 || e.kind === 'hero' || e.kind === 'tower' || this.projectiles.some(s => s.sourceId === e.id));
    this.resolveOutcome();
    if (this.events.length > 300) this.events.splice(0, this.events.length - 300);
  }

  private chooseTarget(unit: Entity): void {
    const radius = unit.kind === 'tower' ? unit.range : unit.kind === 'ranged' ? 65 : 39;
    const candidates = this.entities.filter(e => e.hp > 0 && e.team !== unit.team && distance(e, unit) <= radius + e.radius);
    if (unit.kind === 'tower' && unit.aggroUntil > this.time) {
      const forced = candidates.find(e => e.id === unit.aggroTargetId);
      if (forced) { unit.targetId = forced.id; return; }
    }
    const priority = (e: Entity): number => e.kind === 'melee' || e.kind === 'ranged' ? 0 : e.kind === 'hero' ? 1 : 2;
    candidates.sort((a, b) => priority(a) - priority(b) || distance(unit, a) - distance(unit, b) || a.id - b.id);
    const previous = candidates.find(e => e.id === unit.targetId);
    unit.targetId = previous && priority(previous) === priority(candidates[0]) ? previous.id : (candidates[0]?.id ?? null);
    if (unit.kind !== 'tower') unit.destination = unit.targetId ? null : BASES[enemyOf(unit.team)];
  }

  private clearAttackPresentation(unit: Entity): void {
    unit.attackStartedAt = null;
    unit.attackReleasedAt = null;
  }

  private updateCombat(unit: Entity, dt: number): void {
    if(unit.rCast) {
      const cast=unit.rCast;
      if(!cast.hit && this.time>=cast.startedAt+.82){cast.hit=true;for(const id of cast.targetIds){const victim=this.entity(id);if(victim&&victim.hp>0)this.damage(unit,victim,ABILITIES.r.damage);}}
      if(this.time>=cast.startedAt+1.15)unit.rCast=null;
      return;
    }
    if((unit.airborneUntil??0)>this.time) return;
    if(unit.q3Cast) {
      const cast=unit.q3Cast;unit.facing=cast.facing;
      if(!cast.released && this.time>=cast.startedAt+STORM.releaseDelay) {
        cast.released=true;
        this.projectiles.push({id:this.nextId++,sourceId:unit.id,team:unit.team,kind:'q',empowered:true,startedAt:this.time,hitIds:[],x:unit.x,y:unit.y,targetId:null,damage:ABILITIES.q.damage,speed:STORM.speed,vx:Math.cos(cast.facing),vy:Math.sin(cast.facing),remaining:STORM.range,radius:STORM.radius});
      }
      if(this.time>=cast.startedAt+STORM.castDuration)unit.q3Cast=null;
      return;
    }
    if (unit.eCast) {
      const cast=unit.eCast, from={x:unit.x,y:unit.y};
      const progress=Math.max(0,Math.min(1,(this.time-cast.startedAt-E.startup)/E.dash));
      unit.x=cast.start.x+(cast.end.x-cast.start.x)*progress;
      unit.y=cast.start.y+(cast.end.y-cast.start.y)*progress; unit.facing=cast.facing;
      const target=this.entity(cast.targetId);
      if (!cast.hit && progress>0 && target && target.hp>0 && segmentDistance(target,from,unit)<=target.radius+unit.radius) {
        cast.hit=true; this.damage(unit,target,ABILITIES.e.damage);
      }
      if (this.time >= cast.startedAt+E.duration) unit.eCast=null;
      return;
    }
    if (unit.wCast && this.time < unit.wCast.startedAt + W_CAST_SECONDS) {
      unit.facing = unit.wCast.facing;
      return;
    }
    unit.wCast = null;
    if(unit.eqCast && this.time<unit.eqCast.endsAt) return;
    if (isYasuoQCasting(unit, this.time)) {
      unit.facing = unit.qCast!.facing;
      return;
    }
    unit.qCast = null;
    const target = this.entity(unit.targetId);
    if (!target || target.hp <= 0) {
      // A released attack can finish its recovery even if it killed the target.
      if (unit.attackReleasedAt === null) this.clearAttackPresentation(unit);
      unit.targetId = null;
      unit.windup = 0;
      unit.attackTargetId = null;
      if (unit.destination) this.walk(unit, unit.destination, dt);
      return;
    }
    unit.facing = Math.atan2(target.y - unit.y, target.x - unit.x);
    if (unit.windup > 0) {
      if (distance(unit, target) > unit.range + target.radius + 8) {
        unit.windup = 0;
        unit.attackTargetId = null;
        this.clearAttackPresentation(unit);
        return;
      }
      unit.windup -= dt;
      if (unit.windup <= 0) {
        unit.cooldown = unit.attackInterval;
        unit.attackTargetId = null;
        unit.attackReleasedAt = this.time;
        unit.attacksReleased++;
        if (unit.kind === 'melee') this.damage(unit, target, unit.damage);
        else this.projectiles.push({ id: this.nextId++, sourceId: unit.id, team: unit.team,
          kind: 'attack', x: unit.x, y: unit.y - 4, targetId: target.id,
          damage: unit.damage, speed: unit.kind === 'tower' ? 145 : BALANCE.projectileSpeed,
          vx: 0, vy: 0, remaining: 4, radius: unit.kind === 'tower' ? 3 : 1.5 });
      }
      return;
    }
    if (distance(unit, target) <= unit.range + target.radius) {
      if (unit.cooldown <= 0) {
        unit.windup = BALANCE[unit.kind].windup;
        unit.attackTargetId = target.id;
        unit.attackStartedAt = this.time;
        unit.attackReleasedAt = null;
      }
    } else if (unit.speed > 0) {
      this.walk(unit, target, dt);
    }
  }

  private walk(unit: Entity, target: Point, dt: number): void {
    unit.facing = Math.atan2(target.y - unit.y, target.x - unit.x);
    moveTowards(unit, target, unit.speed * dt * (unit.slowUntil > this.time ? 0.7 : 1));
    const point = clampPoint(unit, unit.radius);
    unit.x = point.x; unit.y = point.y;
    if (unit.destination && distance(unit, unit.destination) < 1) unit.destination = null;
  }

  private separateUnits(): void {
    const alive = this.entities.filter(e => e.hp > 0);
    for (let i = 0; i < alive.length; i++) {
      for (let j = i + 1; j < alive.length; j++) {
        const a = alive[i], b = alive[j], length = distance(a, b), minimum = a.radius + b.radius - 1;
        if (a.eCast || b.eCast || a.rCast || b.rCast || (a.airborneUntil??0)>this.time || (b.airborneUntil??0)>this.time) continue;
        if (length >= minimum || length === 0) continue;
        const dir = direction(a, b), push = (minimum - length) * 0.5;
        if (a.speed > 0) { a.x -= dir.x * push; a.y -= dir.y * push; }
        if (b.speed > 0) { b.x += dir.x * push; b.y += dir.y * push; }
        const pa = clampPoint(a, a.radius), pb = clampPoint(b, b.radius);
        a.x = pa.x; a.y = pa.y; b.x = pb.x; b.y = pb.y;
      }
    }
  }

  private updateProjectiles(dt: number): void {
    const survivors: Projectile[] = [];
    for (const shot of this.projectiles) {
      const source = this.entity(shot.sourceId);
      if (!source) continue;
      const from = { x: shot.x, y: shot.y };
      const targetForPath = shot.kind === 'attack' ? this.entity(shot.targetId) : undefined;
      const to = { ...from };
      if (shot.kind === 'q') {
        const travel = Math.min(shot.speed * dt, shot.remaining);
        to.x += shot.vx * travel; to.y += shot.vy * travel;
      } else if (targetForPath) moveTowards(to, targetForPath, shot.speed * dt);
      if(shot.empowered) {
        const wallFraction=Math.min(...this.windWalls.filter(w=>w.team!==shot.team&&this.time>=w.startsAt&&this.time<w.startsAt+W_DURATION).map(w=>wallHit(w,from,to,shot.radius)??Infinity));
        const fraction=Math.min(1,wallFraction);
        const end={x:from.x+(to.x-from.x)*fraction,y:from.y+(to.y-from.y)*fraction};
        for(const victim of this.entities)if(victim.hp>0&&victim.team!==shot.team&&victim.kind!=='tower'&&!shot.hitIds?.includes(victim.id)) {
          const hit=circleHit(from,to,victim,victim.radius+shot.radius);
          if(hit===null||hit>=wallFraction)continue;
          (shot.hitIds??=[]).push(victim.id);this.damage(source,victim,shot.damage);
          if(victim.hp>0){victim.airborneUntil=this.time+STORM.knockup;victim.windup=0;victim.attackTargetId=null;}
        }
        shot.remaining-=distance(from,end);shot.x=end.x;shot.y=end.y;
        if(wallFraction>1&&shot.remaining>0)survivors.push(shot);
        continue;
      }
      // Tower shots are deliberately not blocked. Allied projectiles pass through.
      const candidates = shot.kind === 'attack' ? (targetForPath ? [targetForPath] : [])
        : this.entities.filter(e => e.hp > 0 && e.team !== shot.team && e.kind !== 'tower');
      const firstTarget = Math.min(...candidates.map(e => circleHit(from, to, e, e.radius + (shot.kind === 'q' ? shot.radius : 0)) ?? Infinity));
      if (source.kind !== 'tower' && this.windWalls.some(w => {
        if (w.team === shot.team || this.time < w.startsAt || this.time >= w.startsAt + W_DURATION) return false;
        const hit = wallHit(w, from, to, shot.radius);
        return hit !== null && hit <= firstTarget;
      })) continue;
      if (shot.kind === 'attack') {
        const target = this.entity(shot.targetId);
        if (!target || target.hp <= 0) continue;
        shot.remaining -= dt;
        if (distance(shot, target) <= shot.speed * dt + target.radius) this.damage(source, target, shot.damage);
        else if (shot.remaining > 0) { moveTowards(shot, target, shot.speed * dt); survivors.push(shot); }
      } else {
        const start = { x: shot.x, y: shot.y }, travel = Math.min(shot.speed * dt, shot.remaining);
        shot.x += shot.vx * travel; shot.y += shot.vy * travel;
        shot.remaining -= travel;
        const targets = this.entities.filter(e => e.hp > 0 && e.team !== shot.team && e.kind !== 'tower' && !shot.hitIds?.includes(e.id) && segmentDistance(e, start, shot) <= e.radius + shot.radius)
          .sort((a, b) => distance(a, start) - distance(b, start));
        const target = targets[0];
        if (target) { this.damage(source, target, shot.damage);grantStorm(source,this.time); }
        else if (shot.remaining > 0) survivors.push(shot);
      }
    }
    this.projectiles = survivors;
  }

  private updateZones(): void {
    const pending: Zone[] = [];
    for (const zone of this.zones) {
      if (this.time < zone.triggerAt) { pending.push(zone); continue; }
      const source = this.entity(zone.sourceId);
      if (!source) continue;
      for (const target of this.entities) {
        if (target.hp > 0 && target.team !== zone.team && target.kind !== 'tower' && distance(zone, target) <= zone.radius + target.radius) {
          this.damage(source, target, zone.damage, true);
        }
      }
    }
    this.zones = pending;
  }

  private resolveOutcome(): void {
    if (this.claims.length === 0) return;
    const blue = this.claims.some(c => c.team === 'blue'), red = this.claims.some(c => c.team === 'red');
    const rank: Record<Exclude<WinReason, 'draw'>, number> = { 'first-blood': 0, 'first-tower': 1, '100-cs': 2 };
    this.claims.sort((a, b) => rank[a.reason] - rank[b.reason]);
    this.result = { winner: blue && red ? null : blue ? 'blue' : 'red', reason: blue && red ? 'draw' : this.claims[0].reason, time: this.time };
    this.phase = 'ended';
    this.events.push({ type: 'end', team: this.result.winner ?? 'blue', x: WORLD.width / 2, y: WORLD.height / 2 });
    this.claims = [];
  }

  private thinkAi(): void {
    const hero = this.hero('red'), player = this.hero('blue');
    if (hero.hp <= 0 || player.hp <= 0) return;
    const health = hero.hp / hero.maxHp, enemyTower = this.tower('blue');
    const alliesAtTower = this.entities.some(e => e.team === 'red' && e.kind !== 'hero' && e.kind !== 'tower' && e.hp > 0 && distance(e, enemyTower) < enemyTower.range);
    if (health < 0.32 || (health < 0.83 && distance(hero, BASES.red) < BALANCE.fountainRadius + 2)) {
      this.orderMove('red', BASES.red);
      if (distance(player, hero) < 65 && health < 0.26) this.cast('red', 'w', BASES.red);
      return;
    }
    if (distance(hero, enemyTower) < enemyTower.range + 18 && !alliesAtTower) {
      const away = direction(enemyTower, hero);
      this.orderMove('red', { x: enemyTower.x + away.x * (enemyTower.range + 30), y: enemyTower.y + away.y * (enemyTower.range + 30) });
      return;
    }
    const threat = this.zones.find(z => z.team === 'blue' && distance(z, hero) < z.radius + 10);
    if (threat) {
      const away = direction(threat, hero);
      this.orderMove('red', clampPoint({ x: hero.x + away.x * 38, y: hero.y + away.y * 38 }));
      return;
    }
    const heroDistance = distance(hero, player);
    if (heroDistance < 125 && health > 0.45) this.cast('red', 'q', player);
    if (heroDistance < 90 && health > 0.58 && Math.floor(this.time) % 3 === 0) this.cast('red', 'e', player);
    const minions = this.entities.filter(e => e.hp > 0 && e.team === 'blue' && (e.kind === 'melee' || e.kind === 'ranged') && distance(e, hero) < 120);
    minions.sort((a, b) => Number(a.hp > hero.damage) - Number(b.hp > hero.damage) || a.hp - b.hp || distance(a, hero) - distance(b, hero));
    if (minions[0]) this.orderAttack('red', minions[0].id);
    else if (heroDistance < 73 && health > 0.6) this.orderAttack('red', player.id);
    else if (alliesAtTower && distance(hero, enemyTower) < 130) this.orderAttack('red', enemyTower.id);
    else this.orderMove('red', AI_HOLD);
  }
}
