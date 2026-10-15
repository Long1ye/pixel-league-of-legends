import { ABILITIES, AI_HOLD, BALANCE, BASES, HOWLING_MAP, MINION_EXITS, SPAWNS, TOWERS, WORLD } from './config';
import { clampPoint, direction, distance, moveTowards, segmentDistance } from './geometry';
import { isYasuoQCasting, YASUO_Q_HIT_SECONDS, YASUO_Q_HALF_WIDTH } from './YasuoQ';
import { YASUO_R,findYasuoRTarget } from './YasuoR';
import { HOMEGUARD, homeguardActive, updateHomeguard } from './Homeguard';
import { clearStorm, grantStorm, stormReady, STORM } from './YasuoStorm';
import { E, EQ, dashEndpoint, isDashing, pickDashTarget } from './YasuoE';
import { bridgeDetour, clearBridgeFootprints } from './BridgeInteraction';
import { circleHit, wallHit, W_CAST_SECONDS, W_DELAY, W_DURATION, type WindWall } from './WindWall';
import {UNIT_METRICS,basicAttackReach} from './UnitMetrics';
import {gainFlow,absorbWithPassive,yasuoCritStats} from './YasuoPassive';
import {SUMMONERS,type SummonerKey,type SummonerEffect} from './SummonerSpells';
import {MINION_LANE,minionLaneSlot,minionAttackSpot,minionMovementSpeed,minionTargetCost} from './MinionLane';
import {applyHitStun,inHitStun,committedUntil,HIT_STUN,type BufferedOrder} from './HitStun';
import {actionReadyAt,finishActionRecovery} from './ActionTiming';
import { enemyOf, type AbilityKey, type Entity, type EntityKind, type GameEvent, type ImpactKind, type MatchPhase, type MatchResult, type Point, type Projectile, type Team, type WinReason, type Zone } from './types';

export interface MatchOptions { ai?: boolean; waves?: boolean; random?:()=>number }

/** Pure simulation. No Phaser, DOM, browser timers or asset dependencies. */
export class Match {
  phase: MatchPhase = 'ready';
  time = 0;
  wave = 0;
  cs: Record<Team, number> = { blue: 0, red: 0 };
  kills:Record<Team,number>={blue:0,red:0};
  deaths:Record<Team,number>={blue:0,red:0};
  entities: Entity[] = [];
  projectiles: Projectile[] = [];
  zones: Zone[] = [];
  windWalls: WindWall[] = [];
  summonerEffects:SummonerEffect[]=[];
  summonerCooldowns:Record<Team,Record<SummonerKey,number>>={blue:{d:0,f:0},red:{d:0,f:0}};
  eTargetLocks = new Map<number, number>();
  hitStunEnabled=true;
  private bufferedOrders=new Map<Team,BufferedOrder>();
  private bufferedNavigation=new Map<Team,BufferedOrder>();
  private attackMoveGoals=new Map<Team,Point>();
  bufferedOrder(team:Team):Readonly<BufferedOrder>|undefined{return this.bufferedOrders.get(team)??this.bufferedNavigation.get(team);}
  private retainBufferedCast(team:Team,order:BufferedOrder){
    if(this.bufferedOrders.get(team)?.kind==='cast'){this.bufferedNavigation.set(team,order);return true;}
    return false;
  }
  private inputExpiry(hero:Entity){return Math.max(this.time+HIT_STUN.inputBuffer,committedUntil(hero,this.time)+HIT_STUN.inputBuffer);}
  setHitStunEnabled(enabled:boolean){
    this.hitStunEnabled=enabled;
    if(!enabled)for(const entity of this.entities){entity.flinchUntil=0;entity.flinchProtectedUntil=0;}
  }
  private flushBufferedOrders(){
    for(const team of ['blue','red'] as const){
      const order=this.bufferedOrders.get(team)??this.bufferedNavigation.get(team);if(!order)continue;
      const hero=this.hero(team);
      if(hero.hp<=0||this.time>order.expiresAt){this.bufferedOrders.delete(team);this.bufferedNavigation.delete(team);continue;}
      if(inHitStun(hero,this.time)||(hero.airborneUntil??0)>this.time)continue;
      const combo=order.kind==='cast'&&order.ability==='q'&&isDashing(hero,this.time);
      if(actionReadyAt(hero,this.time)>this.time&&!combo)continue;
      if(order.kind!=='cast'&&hero.windup>0)continue;
      if(order.kind==='cast'&&hero.abilities[order.ability]>this.time)continue;
      const navigation=this.bufferedNavigation.get(team);
      this.bufferedOrders.delete(team);
      this.bufferedNavigation.delete(team);
      if(!combo)finishActionRecovery(hero,this.time);
      if(order.kind==='move')this.orderMove(team,order.point);
      else if(order.kind==='attack-move')this.orderAttackMove(team,order.point);
      else if(order.kind==='attack')this.orderAttack(team,order.targetId);
      else if(order.kind==='cast'){
        this.cast(team,order.ability,order.point,order.targetId);
        if(navigation)this.bufferedNavigation.set(team,{...navigation,expiresAt:Math.max(navigation.expiresAt,actionReadyAt(hero,this.time)+HIT_STUN.inputBuffer)});
      }
      else this.stop(team);
    }
  }
  dashTarget(point: Point, team:Team='blue',targetId?:number): Entity | undefined {
    if(targetId===undefined)return pickDashTarget(this.hero(team),this.entities,point);
    const target=this.entity(targetId);return target&&target.hp>0&&target.team!==team&&target.kind!=='tower'?target:undefined;
  }
  dashError(point: Point, team:Team='blue',targetId?:number): string | null {
    const hero=this.hero(team), target=this.dashTarget(point,team,targetId);
    if (!target) return '请指向敌方小兵或英雄后按 E。';
    if ((this.eTargetLocks.get(target.id) ?? 0) > this.time) return '该目标暂时不能再次踏前斩。';
    if (distance(hero,target)>E.range) return '目标超出踏前斩范围。';
    const end=dashEndpoint(hero,target), dir=direction(hero,target);
    if ((end.x-target.x)*dir.x+(end.y-target.y)*dir.y < hero.radius+target.radius) return '地图边界处没有足够的穿越空间。';
    if(HOWLING_MAP&&distance(bridgeDetour(hero,end,hero.radius,hero.id),end)>1)return '建筑石座挡住了踏前斩的路径。';
    return null;
  }
  events: GameEvent[] = [];
  result: MatchResult | null = null;
  private nextId = 1;
  private nextWaveAt: number = BALANCE.firstWaveAt;
  private nextAiAt = 1;
  private laneWaves: {team:Team;wave:number;front:Point}[]=[];
  private claims: { team: Team; reason: Exclude<WinReason, 'draw'> }[] = [];
  private options: Required<MatchOptions>;

  constructor(options: MatchOptions = {}) {
    this.options = { ai: options.ai ?? true, waves: options.waves ?? true,random:options.random??Math.random };
    this.entities.push(this.createEntity('tower', 'blue', TOWERS.blue));
    this.entities.push(this.createEntity('tower', 'red', TOWERS.red));
    this.entities.push(this.createEntity('hero', 'blue', SPAWNS.blue));
    this.entities.push(this.createEntity('hero', 'red', SPAWNS.red));
  }

  hero(team: Team): Entity { return this.entities.find(e => e.kind === 'hero' && e.team === team)!; }
  rTarget(team:Team):Entity|undefined {
    const hero=this.hero(team);
    if(this.phase!=='playing'||hero.hp<=0||hero.abilities.r>this.time||hero.rCast||(hero.airborneUntil??0)>this.time||
      (hero.q3Cast&&!hero.q3Cast.released))return undefined;
    return findYasuoRTarget(hero,this.entities,this.time,ABILITIES.r.range);
  }
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
      radius: UNIT_METRICS[kind].radius,
      speed: 'speed' in spec ? spec.speed : 0,
      range: spec.range, damage: spec.damage, attackInterval: spec.attackInterval,
      cooldown: 0, windup: 0, targetId: null, attackTargetId: null, destination: null,
      attackStartedAt: null, attackReleasedAt: null, attacksReleased: 0,
      qCast: null,
      facing: team === 'blue' ? -0.45 : 2.7,
      slowUntil: 0, hitAt: -10,
      mana: kind === 'hero' ? BALANCE.hero.mana : 0,
      maxMana: kind === 'hero' ? BALANCE.hero.mana : 0,
      ...(kind==='hero'?{flow:0,passiveShield:0,passiveShieldUntil:0,critChance:0,level:1}:{}),
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
      const exit=MINION_EXITS[team];
      const front=HOWLING_MAP
        ? {x:exit.x+dir.x*90,y:exit.y+dir.y*90}
        : {x:base.x+dir.x*180,y:base.y+dir.y*180};
      this.spawnMinionLane(team,front,this.wave);
    }
    this.events.push({ type: 'wave', team: 'blue', ...(HOWLING_MAP?MINION_EXITS.blue:SPAWNS.blue) });
  }

  /** Shared by normal waves and the playable hero/minion review scene. */
  spawnMinionLane(team:Team,front:Point,wave=this.wave):void {
    const dir=direction(BASES[team],BASES[enemyOf(team)]);
    this.laneWaves.push({team,wave,front:{...front}});
    for(let slot=0;slot<6;slot++){
      const p=clampPoint(minionLaneSlot(front,dir,slot),UNIT_METRICS.melee.radius);
      const unit=this.spawnMinion(team,slot<3?'melee':'ranged',p);
      unit.formation={wave,slot,goal:p};
    }
  }

  startFlute(team:Team='blue'):boolean {
    const hero=this.hero(team);
    if(this.phase!=='playing'||hero.hp<=0||inHitStun(hero,this.time)||(hero.airborneUntil??0)>this.time
      ||committedUntil(hero,this.time)>this.time||hero.qCast||hero.q3Cast||hero.wCast||hero.eCast||hero.rCast||hero.eqCast)return false;
    this.stop(team);hero.fluteAt=this.time;return true;
  }

  orderMove(team: Team, point: Point): void {
    if (this.phase !== 'playing') return;
    const hero = this.hero(team);
    if(hero.hp<=0)return;
    this.attackMoveGoals.delete(team);
    hero.fluteAt=null;
    if(this.retainBufferedCast(team,{kind:'move',point:{...point},expiresAt:this.inputExpiry(hero)}))return;
    if(inHitStun(hero,this.time)){this.bufferedOrders.set(team,{kind:'move',point:{...point},expiresAt:this.inputExpiry(hero)});return;}
    this.bufferedOrders.delete(team);
    this.bufferedNavigation.delete(team);
    finishActionRecovery(hero,this.time);
    const destination=clampPoint(point);
    hero.destination = HOWLING_MAP?clampPoint(clearBridgeFootprints(destination,hero.radius,hero.id)):destination;
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
    if(hero.hp<=0)return;
    this.attackMoveGoals.delete(team);
    hero.fluteAt=null;
    if(this.retainBufferedCast(team,{kind:'attack',targetId,expiresAt:this.inputExpiry(hero)}))return;
    if(inHitStun(hero,this.time)){this.bufferedOrders.set(team,{kind:'attack',targetId,expiresAt:this.inputExpiry(hero)});return;}
    this.bufferedOrders.delete(team);
    this.bufferedNavigation.delete(team);
    finishActionRecovery(hero,this.time);
    if (hero.targetId !== targetId) { hero.windup = 0; hero.attackTargetId = null; this.clearAttackPresentation(hero); }
    hero.targetId = targetId;
    hero.destination = null;
  }

  orderAttackMove(team:Team,point:Point):void {
    const hero=this.hero(team);
    if(this.phase!=='playing'||hero.hp<=0)return;
    if(this.retainBufferedCast(team,{kind:'attack-move',point:{...point},expiresAt:this.inputExpiry(hero)}))return;
    if(inHitStun(hero,this.time)){
      hero.fluteAt=null;
      this.bufferedOrders.set(team,{kind:'attack-move',point:{...point},expiresAt:this.inputExpiry(hero)});
      return;
    }
    this.orderMove(team,point);
    this.attackMoveGoals.set(team,{...hero.destination!});
  }

  private updateAttackMove(hero:Entity):void {
    const goal=this.attackMoveGoals.get(hero.team);
    if(!goal)return;
    // Keep an acquired opponent while nearby; never chase it across the map.
    const nearby=(e:Entity)=>e.hp>0&&e.team!==hero.team&&distance(hero,e)<=145+e.radius;
    const current=this.entity(hero.targetId);
    const target=current&&nearby(current)?current:this.entities.filter(nearby)
      .sort((a,b)=>distance(goal,a)-distance(goal,b)||distance(hero,a)-distance(hero,b)||a.id-b.id)[0];
    if(hero.targetId!==(target?.id??null)){
      hero.windup=0;hero.attackTargetId=null;this.clearAttackPresentation(hero);
    }
    hero.targetId=target?.id??null;
    hero.destination=target||distance(hero,goal)<1?null:{...goal};
  }

  castSummoner(team:Team,key:SummonerKey,point:Point,targetId:number|null=null):boolean {
    const hero=this.hero(team),spec=SUMMONERS[key];
    if(this.phase!=='playing'||hero.hp<=0||this.summonerCooldowns[team][key]>this.time||
      inHitStun(hero,this.time)||(hero.airborneUntil??0)>this.time||
      (committedUntil(hero,this.time)>this.time&&!(key==='f'&&hero.rCast)))return false;
    if(key==='d'){
      const dir=direction(hero,point),length=Math.min(spec.range,distance(hero,point));
      if(length<1)return false;
      const from={x:hero.x,y:hero.y};
      const destination=clampPoint({x:hero.x+dir.x*length,y:hero.y+dir.y*length},hero.radius);
      const to=HOWLING_MAP?clampPoint(clearBridgeFootprints(destination,hero.radius,hero.id),hero.radius):destination;
      this.stop(team);Object.assign(hero,to);gainFlow(hero,distance(from,to),this.time);
      this.summonerEffects.push({kind:'flash',team,startedAt:this.time,endsAt:this.time+.5,from,to:{...to},sourceId:hero.id});
    }else{
      const target=targetId!==null?this.entity(targetId):hero.rCast?.targetIds.map(id=>this.entity(id)).find(e=>e&&e.hp>0&&e.team!==team);
      if(!target||target.team===team||target.kind==='tower'||target.hp<=0||distance(hero,target)>spec.range+target.radius)return false;
      hero.fluteAt=null;
      this.summonerEffects.push({kind:'ignite',team,startedAt:this.time,endsAt:this.time+SUMMONERS.f.duration,
        from:{x:hero.x,y:hero.y},to:{x:target.x,y:target.y},sourceId:hero.id,targetId:target.id,ticks:0});
    }
    this.summonerCooldowns[team][key]=this.time+spec.cooldown;
    return true;
  }

  private updateSummoners():void {
    for(const effect of this.summonerEffects)if(effect.kind==='ignite'){
      const source=this.entity(effect.sourceId),target=this.entity(effect.targetId??null);
      if(!source||!target||target.hp<=0){effect.endsAt=this.time;continue;}
      const due=Math.min(SUMMONERS.f.ticks,Math.floor((this.time-effect.startedAt+1e-9)/(SUMMONERS.f.duration/SUMMONERS.f.ticks)));
      while((effect.ticks??0)<due&&target.hp>0){
        effect.ticks=(effect.ticks??0)+1;
        this.damage(source,target,SUMMONERS.f.damage/SUMMONERS.f.ticks,false,'ignite');
      }
      if(target.hp<=0)effect.endsAt=this.time;
    }
    this.summonerEffects=this.summonerEffects.filter(e=>e.endsAt>this.time);
  }

  stop(team: Team): void {
    const hero = this.hero(team);
    this.attackMoveGoals.delete(team);
    hero.fluteAt=null;
    this.bufferedNavigation.delete(team);
    if(this.phase==='playing'&&hero.hp>0&&inHitStun(hero,this.time)){this.bufferedOrders.set(team,{kind:'stop',expiresAt:this.inputExpiry(hero)});return;}
    this.bufferedOrders.delete(team);
    hero.destination = null;
    hero.targetId = null;
    hero.windup = 0;
    hero.attackTargetId = null;
    this.clearAttackPresentation(hero);
  }

  cast(team: Team, key: AbilityKey, point: Point,targetId?:number): boolean {
    if (this.phase !== 'playing') return false;
    const hero = this.hero(team), spec = ABILITIES[key];
    if(hero.hp<=0)return false;
    const dashTarget=key==='e'?this.dashTarget(point,team,targetId):undefined;
    if(key==='e'&&(!dashTarget||(this.eTargetLocks.get(dashTarget.id)??0)>this.time))return false;
    const combo=key==='q'&&isDashing(hero,this.time)&&!hero.eqCast;
    const rInterrupt=key==='r'&&!!this.rTarget(team);
    if(key==='r'&&!rInterrupt)return false;
    const readyAt=Math.max(hero.abilities[key],combo||rInterrupt?this.time:actionReadyAt(hero,this.time));
    if(readyAt>this.time+HIT_STUN.inputBuffer&&(!inHitStun(hero,this.time)||hero.abilities[key]>this.time+HIT_STUN.inputBuffer))return false;
    if(key==='e'&&readyAt<=this.time&&!inHitStun(hero,this.time)&&this.dashError(point,team,targetId))return false;
    hero.fluteAt=null;
    if(inHitStun(hero,this.time)||readyAt>this.time){
      this.bufferedOrders.set(team,{kind:'cast',ability:key,point:{...point},...(dashTarget?{targetId:dashTarget.id}:{}),expiresAt:this.inputExpiry(hero)});return true;
    }
    this.bufferedOrders.delete(team);
    if(!combo)finishActionRecovery(hero,this.time);
    if(hero.rCast || (hero.airborneUntil??0)>this.time) return false;
    if(key==='r') {
      if(hero.q3Cast&&!hero.q3Cast.released)return false;
      const target=this.rTarget(team);
      if(!target) return false;
      const victims=this.entities.filter(e=>e.team!==team&&e.kind!=='tower'&&e.hp>0&&(e.airborneUntil??0)>this.time&&distance(e,target)<=32);
      hero.rCast={startedAt:this.time,targetIds:victims.map(e=>e.id),hit:false};
      hero.flow=100;
      clearStorm(hero);
      for(const v of victims){v.airborneUntil=this.time+YASUO_R.airborneDuration;v.windup=0;v.attackTargetId=null;}
      const arrival=clampPoint({x:target.x+YASUO_R.offsetX,y:target.y+YASUO_R.offsetY});
      Object.assign(hero,HOWLING_MAP?clampPoint(clearBridgeFootprints(arrival,hero.radius,hero.id)):arrival);hero.facing=Math.PI*.75;
      hero.eCast=null;hero.eqCast=null;hero.qCast=null;hero.q3Cast=null;hero.wCast=null;hero.destination=null;hero.targetId=null;hero.windup=0;hero.attackTargetId=null;this.clearAttackPresentation(hero);
      hero.abilities.r=this.time+spec.cooldown;
      hero.homeguardUntil=0;hero.homeguardCombatAt=this.time;
      this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:key});return true;
    }
    if(hero.q3Cast)return false;
    if (hero.wCast && this.time < hero.wCast.startedAt + W_CAST_SECONDS) return false;
    if (isDashing(hero,this.time)) {
      if(key!=='q'||hero.eqCast) return false;
      const cast=hero.eCast!, triggerAt=Math.max(cast.startedAt+E.startup+E.dash,this.time+EQ.windup);
      hero.abilities.q=this.time+spec.cooldown;
      const empowered=stormReady(hero,this.time);
      if(empowered)clearStorm(hero);
      hero.eqCast={startedAt:triggerAt-EQ.windup,triggerAt,endsAt:triggerAt+EQ.recovery,eStartedAt:cast.startedAt,facing:cast.facing,hit:false,empowered,critical:this.rollCritical(hero)};
      hero.qCast=null;
      hero.homeguardUntil=0;hero.homeguardCombatAt=this.time;
      this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:'q',impact:empowered?'eq3':'eq'});
      return true;
    }
    if(hero.eqCast && this.time<hero.eqCast.endsAt) return false;
    if (key==='e' && this.dashError(point,team,targetId)) return false;
    hero.abilities[key] = this.time + spec.cooldown;
    const aim = clampPoint(point), dir = direction(hero, aim);
    hero.facing = Math.atan2(dir.y, dir.x);
    hero.qCast = key === 'q' ? { startedAt: this.time, facing: hero.facing,critical:this.rollCritical(hero) } : null;
    if (key === 'q') {
      hero.windup = 0;
      hero.attackTargetId = null;
      this.clearAttackPresentation(hero);
    }
    if (key === 'q') {
      if(stormReady(hero,this.time)) {
        const critical=hero.qCast?.critical;
        clearStorm(hero);hero.qCast=null;
        hero.q3Cast={startedAt:this.time,facing:hero.facing,released:false,critical};
        hero.homeguardUntil=0;hero.homeguardCombatAt=this.time;
        this.events.push({type:'cast',team,x:hero.x,y:hero.y,ability:key,impact:'q3'});
        return true;
      }
    } else if (key === 'w') {
      hero.wCast = { startedAt: this.time, facing: hero.facing };
      this.windWalls.push({ id: this.nextId++, team, x: hero.x + dir.x * 32, y: hero.y + dir.y * 32,
        angle: hero.facing, startsAt: this.time + W_DELAY });
      hero.windup = 0;
      hero.attackTargetId = null;
      this.clearAttackPresentation(hero);
    } else {
      const target=this.dashTarget(point,team,targetId)!;
      const start={x:hero.x,y:hero.y}, end=dashEndpoint(hero,target);
      hero.facing=Math.atan2(target.y-hero.y,target.x-hero.x);
      hero.eCast={startedAt:this.time,start,end,facing:hero.facing,targetId:target.id,hit:false};
      this.eTargetLocks.set(target.id,this.time+E.targetCooldown);
      hero.destination=null; hero.targetId=null; hero.windup=0; hero.attackTargetId=null;
      this.clearAttackPresentation(hero);
    }
    hero.homeguardUntil=0;hero.homeguardCombatAt=this.time;
    this.events.push({ type: 'cast', team, x: hero.x, y: hero.y, ability: key });
    return true;
  }

  /** All lethal outcomes are resolved together at the end of the current tick. */
  private rollCritical(source:Entity){return source.kind==='hero'&&yasuoCritStats(source).chance>0&&this.options.random()<yasuoCritStats(source).chance;}
  damage(source: Entity, target: Entity, amount: number, slow = false, impact: ImpactKind = 'attack',criticalOverride?:boolean): void {
    if (this.phase !== 'playing' || amount<=0 || target.hp <= 0 || target.team === source.team) return;
    const crit=yasuoCritStats(source),canCrit=source.kind==='hero'&&target.kind!=='tower'&&['attack','q','q3','eq','eq3'].includes(impact);
    const critical=canCrit&&(criticalOverride??this.rollCritical(source));
    const bonus=source.kind!=='hero'?0:impact==='attack'||['q','q3','eq','eq3'].includes(impact)?crit.bonusAD:impact==='e'?crit.bonusAD*.2:impact==='r'?crit.bonusAD*1.5:0;
    const dealt = (amount+bonus)*(critical?crit.multiplier:1) * (impact!=='ignite'&&target.guardUntil > this.time ? 0.6 : 1) * (target.kind === 'tower' ? 0.65 : 1);
    const shield=absorbWithPassive(source,target,dealt,this.time);
    target.hp = Math.max(0, target.hp - shield.remaining);
    target.fluteAt=null;
    target.hitAt = this.time;
    target.hitFrom = {x:source.x,y:source.y};
    if(this.hitStunEnabled)applyHitStun(source,target,impact,this.time,dealt);
    if (target.kind === 'hero') { target.homeguardUntil = 0; target.homeguardCombatAt = this.time; }
    if (slow) target.slowUntil = this.time + 1.5;
    const feedback={at:this.time,sourceId:source.id,targetId:target.id,sourceKind:source.kind,targetKind:target.kind,from:{x:source.x,y:source.y},impact};
    this.events.push({ type: 'hit', team: source.team, x: target.x, y: target.y, amount: Math.round(shield.remaining),absorbed:shield.absorbed,critical,...feedback });
    if (source.kind === 'hero' && target.kind === 'hero') {
      // Trading beside an enemy wave creates a short, local retaliation window.
      for(const minion of this.entities)if(minion.team===target.team&&(minion.kind==='melee'||minion.kind==='ranged')&&minion.hp>0&&distance(minion,source)<MINION_LANE.heroNotice){
        minion.aggroTargetId=source.id;minion.aggroUntil=this.time+2;
      }
      const tower = this.tower(target.team);
      if (tower.hp > 0 && distance(tower, source) <= tower.range + source.radius) {
        tower.aggroTargetId = source.id;
        tower.aggroUntil = this.time + 2.5;
      }
    }
    if (target.hp > 0) return;
    target.flinchUntil=0;target.flinchProtectedUntil=0;
    if(target.kind==='hero'){this.bufferedOrders.delete(target.team);this.bufferedNavigation.delete(target.team);this.attackMoveGoals.delete(target.team);}
    target.qCast = null;
    target.q3Cast = null;
    clearStorm(target);
    target.wCast = null;
    target.eCast = null;
    target.eqCast = null;
    target.rCast = null;
    target.airborneUntil = 0;
    target.flow=0;target.passiveShield=0;target.passiveShieldUntil=0;
    this.events.push({ type: 'kill', team: source.team, x: target.x, y: target.y,...feedback });
    if(target.kind==='hero'){this.deaths[target.team]++;if(source.kind==='hero')this.kills[source.team]++;}
    if (target.kind === 'hero') this.claims.push({ team: enemyOf(target.team), reason: 'first-blood' });
    else if (target.kind === 'tower') this.claims.push({ team: enemyOf(target.team), reason: 'first-tower' });
    else if (source.kind === 'hero') {
      this.cs[source.team]++;
      this.events.push({ type: 'last-hit', team: source.team, x: target.x, y: target.y,...feedback });
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
    this.updateMinionLanes(dt);
    for (const entity of this.entities) {
      if((entity.qStacksUntil??0)<=this.time && (entity.qStacks??0)>0)clearStorm(entity);
      if (entity.hp <= 0) continue;
      const previousPosition={x:entity.x,y:entity.y};
      entity.cooldown = Math.max(0, entity.cooldown - dt);
      if (entity.kind === 'hero') {
        updateHomeguard(entity, this.time);
        if((entity.passiveShieldUntil??0)<=this.time)entity.passiveShield=0;
        if (distance(entity, BASES[entity.team]) < BALANCE.fountainRadius) {
          entity.hp = Math.min(entity.maxHp, entity.hp + BALANCE.fountainHeal * dt);
        }
      } else {
        this.chooseTarget(entity);
      }
      this.updateCombat(entity, dt);
      gainFlow(entity,distance(previousPosition,entity),this.time);
      if(entity.eqCast && entity.hp>0) {
        const eq=entity.eqCast;
        if(!eq.hit && this.time>=eq.triggerAt) {
          eq.hit=true;
          let connected=false;
          for(const victim of this.entities) if(victim.hp>0 && victim.team!==entity.team && victim.kind!=='tower' && distance(entity,victim)<=EQ.radius+victim.radius) {
            connected=true;this.damage(entity,victim,ABILITIES.q.damage,false,eq.empowered?'eq3':'eq',eq.critical);
            if(eq.empowered && victim.hp>0){victim.airborneUntil=this.time+STORM.knockup;victim.windup=0;victim.attackTargetId=null;}
          }
          if(connected && !eq.empowered)grantStorm(entity,this.time);
        }
        if(this.time>=eq.endsAt) entity.eqCast=null;
      }
    }
    // Finish committed actions and clear their cast records before replaying input.
    this.flushBufferedOrders();
    this.separateUnits();
    this.windWalls = this.windWalls.filter(w => this.time < w.startsAt + W_DURATION);
    this.updateProjectiles(dt);
    this.updateZones();
    this.updateSummoners();
    this.entities = this.entities.filter(e => e.hp > 0 || e.kind === 'hero' || e.kind === 'tower' || this.projectiles.some(s => s.sourceId === e.id));
    this.resolveOutcome();
    if (this.events.length > 300) this.events.splice(0, this.events.length - 300);
  }

  private chooseTarget(unit: Entity): void {
    const radius = unit.kind === 'tower' ? unit.range : unit.formation ? 160 : unit.kind === 'ranged' ? 110 : 39;
    const minion=unit.kind==='melee'||unit.kind==='ranged';
    const lane=direction(BASES[unit.team],BASES[enemyOf(unit.team)]);
    const inLaneColumn=(e:Entity)=>!unit.formation||e.kind==='hero'||e.kind==='tower'
      ||Math.abs((e.x-unit.formation.goal.x)*-lane.y+(e.y-unit.formation.goal.y)*lane.x)<=MINION_LANE.spacing*2;
    const candidates = this.entities.filter(e => e.hp > 0 && e.team !== unit.team && distance(e, unit) <= radius + e.radius
      &&(!minion||inLaneColumn(e))
      &&(!minion||e.kind!=='hero'||distance(unit,e)<=MINION_LANE.heroNotice&&(!unit.formation||distance(unit.formation.goal,e)<=MINION_LANE.leash)));
    if(minion&&unit.aggroUntil>this.time){
      const aggressor=candidates.find(e=>e.id===unit.aggroTargetId);
      if(aggressor){unit.targetId=aggressor.id;unit.destination=null;return;}
    }
    if (unit.kind === 'tower' && unit.aggroUntil > this.time) {
      const forced = candidates.find(e => e.id === unit.aggroTargetId);
      if (forced) { unit.targetId = forced.id; return; }
    }
    const priority = (e: Entity): number => e.kind === 'melee' || e.kind === 'ranged' ? 0 : e.kind === 'hero' ? 1 : 2;
    const previous = candidates.find(e => e.id === unit.targetId);
    // Keep a valid opponent instead of swapping targets as neighbours shuffle.
    if(previous&&priority(previous)===Math.min(...candidates.map(priority)))unit.targetId=previous.id;
    else {
      const costs=new Map(candidates.map(target=>[target.id,minion&&unit.formation?minionTargetCost(unit,target,this.entities):distance(unit,target)]));
      candidates.sort((a,b)=>priority(a)-priority(b)||costs.get(a.id)!-costs.get(b.id)!||a.id-b.id);
      unit.targetId=candidates[0]?.id??null;
    }
    if (unit.kind !== 'tower') unit.destination = unit.formation?.goal ?? (unit.targetId ? null : BASES[enemyOf(unit.team)]);
  }

  private updateMinionLanes(dt:number):void {
    this.laneWaves=this.laneWaves.filter(f=>this.entities.some(e=>e.hp>0&&e.team===f.team&&e.formation?.wave===f.wave));
    for(const f of this.laneWaves){
      const dir=direction(BASES[f.team],BASES[enemyOf(f.team)]);
      const members=this.entities.filter(e=>e.hp>0&&e.team===f.team&&e.formation?.wave===f.wave);
      const hasMelee=members.some(e=>e.kind==='melee');
      let clearance=Infinity;
      for(const e of this.entities){
        if(e.hp<=0||e.team===f.team)continue;
        const dx=e.x-f.front.x,dy=e.y-f.front.y;
        const ahead=dx*dir.x+dy*dir.y,side=-dx*dir.y+dy*dir.x;
        if(ahead>=-30&&Math.abs(side)<100)clearance=Math.min(clearance,ahead-e.radius-(hasMelee?BALANCE.melee.range-2:BALANCE.ranged.range-2));
      }
      // No collective arrival gate: one blocked or fighting soldier cannot freeze its wave.
      const advance=Math.max(0,Math.min(BALANCE.melee.speed*MINION_LANE.marchMultiplier*dt,clearance));
      f.front=clampPoint({x:f.front.x+dir.x*advance,y:f.front.y+dir.y*advance});
      for(const e of members){
        e.formation!.goal=clampPoint(minionLaneSlot(f.front,dir,e.formation!.slot,hasMelee),e.radius);
      }
    }
  }

  private clearAttackPresentation(unit: Entity): void {
    unit.attackStartedAt = null;
    unit.attackReleasedAt = null;
  }

  private updateCombat(unit: Entity, dt: number): void {
    const buffered=this.bufferedOrders.get(unit.team);
    const queuedEQ=buffered?.kind==='cast'&&buffered.ability==='q'&&isDashing(unit,this.time);
    if(unit.kind==='hero'&&!queuedEQ&&(unit.destination||unit.targetId!==null||this.bufferedOrder(unit.team)))finishActionRecovery(unit,this.time);
    if(unit.rCast) {
      const cast=unit.rCast;
      if(!cast.hit && this.time>=cast.startedAt+YASUO_R.hitAt){cast.hit=true;for(const id of cast.targetIds){const victim=this.entity(id);if(victim&&victim.hp>0)this.damage(unit,victim,ABILITIES.r.damage,false,'r');}}
      if(this.time>=cast.startedAt+YASUO_R.duration)unit.rCast=null;
      return;
    }
    if((unit.airborneUntil??0)>this.time) return;
    if(unit.q3Cast) {
      const cast=unit.q3Cast;unit.facing=cast.facing;
      if(!cast.released && this.time>=cast.startedAt+STORM.releaseDelay) {
        cast.released=true;
        this.projectiles.push({id:this.nextId++,sourceId:unit.id,team:unit.team,kind:'q',empowered:true,critical:cast.critical,startedAt:this.time,hitIds:[],x:unit.x,y:unit.y,targetId:null,damage:ABILITIES.q.damage,speed:STORM.speed,vx:Math.cos(cast.facing),vy:Math.sin(cast.facing),remaining:STORM.range,radius:STORM.radius});
      }
      if(this.time>=cast.startedAt+STORM.castDuration)unit.q3Cast=null;
      return;
    }
    if (unit.eCast) {
      const cast=unit.eCast, from={x:unit.x,y:unit.y};
      const progress=Math.max(0,Math.min(1,(this.time-cast.startedAt-E.startup)/E.dash));
      unit.x=cast.start.x+(cast.end.x-cast.start.x)*progress;
      unit.y=cast.start.y+(cast.end.y-cast.start.y)*progress; unit.facing=cast.facing;
      const dashPoint=clampPoint(unit,unit.radius);
      Object.assign(unit,HOWLING_MAP?clampPoint(clearBridgeFootprints(dashPoint,unit.radius,unit.id)):dashPoint);
      const target=this.entity(cast.targetId);
      if (!cast.hit && progress>0 && target && target.hp>0 && segmentDistance(target,from,unit)<=target.radius+unit.radius) {
        cast.hit=true; this.damage(unit,target,ABILITIES.e.damage,false,'e');
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
    if (unit.qCast) {
      const cast=unit.qCast!;
      unit.facing=cast.facing;
      if(!cast.hit && this.time>=cast.startedAt+YASUO_Q_HIT_SECONDS){
        cast.hit=true;
        const dir={x:Math.cos(cast.facing),y:Math.sin(cast.facing)};
        const end={x:unit.x+dir.x*ABILITIES.q.range,y:unit.y+dir.y*ABILITIES.q.range};
        const victims=this.entities.filter(v=>v.hp>0&&v.team!==unit.team&&v.kind!=='tower'&&
          (v.x-unit.x)*dir.x+(v.y-unit.y)*dir.y>=0&&segmentDistance(v,unit,end)<=v.radius+YASUO_Q_HALF_WIDTH);
        for(const victim of victims)this.damage(unit,victim,ABILITIES.q.damage,false,'q',cast.critical);
        if(victims.length)grantStorm(unit,this.time);
      }
      if(isYasuoQCasting(unit,this.time))return;
    }
    unit.qCast = null;
    // A committed attack may release; new attacks and movement wait for recovery.
    if(inHitStun(unit,this.time)&&unit.windup<=0)return;
    if(unit.kind==='hero')this.updateAttackMove(unit);
    if(unit.formation){
      const goal=unit.formation.goal;
      const opponent=this.entity(unit.targetId);
      // Formation guides marching. Once engaged, attacks take priority over exact slots.
      if(!opponent||opponent.hp<=0){
       if(distance(unit,goal)>2){
        unit.windup=0;unit.attackTargetId=null;this.clearAttackPresentation(unit);
        this.walk(unit,goal,dt);return;
       }
        unit.windup=0;unit.attackTargetId=null;this.clearAttackPresentation(unit);return;
      }
      unit.destination=null;
    }
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
      if(unit.kind!=='hero'&&unit.attackTargetId!==target.id){
        unit.windup=0;unit.attackTargetId=null;this.clearAttackPresentation(unit);return;
      }
      if (distance(unit, target) > basicAttackReach(unit,target,true)) {
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
        if(unit.kind==='hero')this.events.push({type:'attack',team:unit.team,x:unit.x,y:unit.y,at:this.time,sourceId:unit.id,sourceKind:unit.kind,targetId:target.id,targetKind:target.kind,impact:'attack'});
        if (unit.kind === 'melee' || unit.kind === 'hero') this.damage(unit, target, unit.damage);
        else this.projectiles.push({ id: this.nextId++, sourceId: unit.id, team: unit.team,
          kind: 'attack', x: unit.x, y: unit.y - 4, targetId: target.id,
          damage: unit.damage, speed: unit.kind === 'tower' ? 145 : BALANCE.projectileSpeed,
          vx: 0, vy: 0, remaining: 4, radius: unit.kind === 'tower' ? 3 : 1.5 });
      }
      return;
    }
    // Attack spots guide the approach only. Re-seeking them while already in range
    // makes two opponents chase each other's moving spots and drag the fight apart.
    if (distance(unit, target) <= basicAttackReach(unit,target)) {
      if (unit.cooldown <= 0) {
        unit.windup = BALANCE[unit.kind].windup;
        unit.attackTargetId = target.id;
        unit.attackStartedAt = this.time;
        unit.attackReleasedAt = null;
      }
    } else if (unit.speed > 0) {
      this.walk(unit,unit.formation?minionAttackSpot(unit,target,BASES[unit.team],this.entities):target,dt);
    }
  }

  private walk(unit: Entity, target: Point, dt: number): void {
    if(inHitStun(unit,this.time))return;
    const waypoint=HOWLING_MAP?bridgeDetour(unit,target,unit.radius,unit.id):target;
    unit.facing = Math.atan2(waypoint.y - unit.y, waypoint.x - unit.x);
    const opponent=this.entity(unit.targetId);
    const speed=minionMovementSpeed(unit,!!opponent&&opponent.hp>0);
    moveTowards(unit, waypoint, speed * dt * (unit.slowUntil > this.time ? 0.7 : 1) * (homeguardActive(unit,this.time) ? HOMEGUARD.multiplier : 1));
    const point = clampPoint(unit, unit.radius);
    const placed=HOWLING_MAP?clampPoint(clearBridgeFootprints(point,unit.radius,unit.id)):point;
    unit.x = placed.x; unit.y = placed.y;
    if (unit.destination && distance(unit, unit.destination) < 1) unit.destination = null;
  }

  private separateUnits(): void {
    const alive = this.entities.filter(e => e.hp > 0);
    for (let i = 0; i < alive.length; i++) {
      for (let j = i + 1; j < alive.length; j++) {
        const a = alive[i], b = alive[j], length = distance(a, b);
        const minions=(a.kind==='melee'||a.kind==='ranged')&&(b.kind==='melee'||b.kind==='ranged');
        const minimum = minions?Math.max(a.radius+b.radius-1,a.team===b.team?MINION_LANE.allySpacing:18):a.radius+b.radius-1;
        if (a.eCast || b.eCast || a.rCast || b.rCast || (a.airborneUntil??0)>this.time || (b.airborneUntil??0)>this.time) continue;
        if (length >= minimum) continue;
        const dir = length>0?direction(a,b):{x:(a.id+b.id)%2?1:-1,y:0}, push = (minimum - length) * 0.5;
        if (a.speed > 0) { a.x -= dir.x * push; a.y -= dir.y * push; }
        if (b.speed > 0) { b.x += dir.x * push; b.y += dir.y * push; }
        const pa=clampPoint(a,a.radius),pb=clampPoint(b,b.radius);
        if(HOWLING_MAP&&a.speed>0)Object.assign(pa,clampPoint(clearBridgeFootprints(pa,a.radius,a.id)));
        if(HOWLING_MAP&&b.speed>0)Object.assign(pb,clampPoint(clearBridgeFootprints(pb,b.radius,b.id)));
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
          (shot.hitIds??=[]).push(victim.id);this.damage(source,victim,shot.damage,false,'q3',shot.critical);
          if(victim.hp>0){victim.airborneUntil=this.time+STORM.knockup;victim.windup=0;victim.attackTargetId=null;}
        }
        shot.remaining-=distance(from,end);shot.x=end.x;shot.y=end.y;
        if(wallFraction>1&&shot.remaining>0)survivors.push(shot);
        continue;
      }
      // Only ranged attack shots reach this interceptor. Q1/Q2 are thrusts;
      // legacy non-empowered Q records must also ignore the wall. Q3 is handled above.
      const candidates = shot.kind === 'attack' ? (targetForPath ? [targetForPath] : [])
        : this.entities.filter(e => e.hp > 0 && e.team !== shot.team && e.kind !== 'tower');
      const firstTarget = Math.min(...candidates.map(e => circleHit(from, to, e, e.radius + (shot.kind === 'q' ? shot.radius : 0)) ?? Infinity));
      if (shot.kind==='attack' && source.kind !== 'tower' && this.windWalls.some(w => {
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
        if (target) { this.damage(source, target, shot.damage,false,'q');grantStorm(source,this.time); }
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
          this.damage(source, target, zone.damage, true,'spell');
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
    this.bufferedOrders.clear();
    this.bufferedNavigation.clear();
    this.events.push({ type: 'end', team: this.result.winner ?? 'blue', x: WORLD.width / 2, y: WORLD.height / 2 });
    this.claims = [];
  }

  private thinkAi(): void {
    const hero = this.hero('red'), player = this.hero('blue');
    if (hero.hp <= 0 || player.hp <= 0) return;
    if(committedUntil(hero,this.time)>this.time||inHitStun(hero,this.time))return;
    const health = hero.hp / hero.maxHp, enemyTower = this.tower('blue');
    const alliesAtTower = this.entities.some(e => e.team === 'red' && e.kind !== 'hero' && e.kind !== 'tower' && e.hp > 0 && distance(e, enemyTower) < enemyTower.range);
    if (health < 0.32 || (health < 0.83 && distance(hero, BASES.red) < BALANCE.fountainRadius + 2)) {
      this.orderMove('red', BASES.red);
      if (distance(player, hero) < ABILITIES.q.range && health < 0.26) this.cast('red', 'w', player);
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
    if((player.airborneUntil??0)>this.time&&this.cast('red','r',player))return;
    if(stormReady(hero,this.time)&&heroDistance<STORM.range&&this.cast('red','q',player))return;
    if(heroDistance<E.range&&health>.58&&Math.floor(this.time)%3===0&&this.cast('red','e',player)){
      this.cast('red','q',player);return;
    }
    if(heroDistance<ABILITIES.q.range&&health>.45&&this.cast('red','q',player))return;
    const minions = this.entities.filter(e => e.hp > 0 && e.team === 'blue' && (e.kind === 'melee' || e.kind === 'ranged') && distance(e, hero) < 120);
    minions.sort((a, b) => Number(a.hp > hero.damage) - Number(b.hp > hero.damage) || a.hp - b.hp || distance(a, hero) - distance(b, hero));
    if (minions[0]) this.orderAttack('red', minions[0].id);
    else if (heroDistance < 73 && health > 0.6) this.orderAttack('red', player.id);
    else if (alliesAtTower && distance(hero, enemyTower) < 130) this.orderAttack('red', enemyTower.id);
    else this.orderMove('red', AI_HOLD);
  }
}
