import {YasuoSkillAudio} from './YasuoSkillAudio';
import {fluteActive} from '../game/YasuoFlute';
import type { GameEvent } from '../game/types';
import {combatSound} from './CombatSound';
import type {Match} from '../game/Match';
import {MovementVoice} from './MovementVoice';
import {OriginalCombatAudio} from './OriginalCombatAudio';

export class AudioFeedback {
  enabled = true;
  private context: AudioContext | null = null;
  private noise:AudioBuffer|null=null;
  private voices=new Set<{stop:()=>void}>();
  private lastHit=-Infinity;
  private original=new OriginalCombatAudio();
  private skills=new YasuoSkillAudio();
  private movement=new MovementVoice();
  private fluteStarted:number|null=null;
  private heroId:number|null=null;
  get movementPlaying(){return this.original.movementPlaying||this.original.flutePlaying;}
  updateMovement(match:Match,visible=true){
    const hero=match.hero('blue');this.heroId=hero.id;
    this.skills.update(match,this.context,this.enabled,visible);
    const flute=fluteActive(hero,match.time);
    const audible=this.enabled&&visible&&match.phase==='playing'&&this.context?.state==='running';
    if(!flute||!audible){this.original.stopFlute();this.fluteStarted=null;}
    else if(this.fluteStarted!==hero.fluteAt){
      this.original.stopFlute();
      if(this.context&&this.original.playFlute(this.context,match.time-hero.fluteAt!))this.fluteStarted=hero.fluteAt!;
    }
    const calm=!flute&&hero.hp>0&&match.time-(hero.homeguardCombatAt??-Infinity)>5
      &&hero.windup<=0&&!hero.qCast&&!hero.q3Cast&&!hero.wCast&&!hero.eCast&&!hero.rCast&&!hero.eqCast
      &&(hero.airborneUntil??0)<=match.time&&(hero.flinchUntil??0)<=match.time
      &&!match.entities.some(e=>e.team!==hero.team&&e.hp>0&&Math.hypot(e.x-hero.x,e.y-hero.y)<260);
    const eligible=this.enabled&&visible&&match.phase==='playing'&&this.context?.state==='running'&&calm;
    const variant=this.movement.update(match.time,hero,eligible);
    if(!eligible)this.original.stopMovement();
    if(variant!==null&&this.context&&this.original.playMovement(variant,this.context))this.movement.played(match.time);
  }
  get audioContext(){return this.context;}
  /** Called from a real input gesture; constructing the app itself stays silent. */
  unlock():void {
    if(!this.enabled)return;
    this.context ??= new AudioContext();
    if(this.context.state!=='running')void this.context.resume().catch(()=>{});
    void this.original.load(this.context);
    void this.skills.load(this.context);
  }
  toggle(): boolean {
    this.enabled = !this.enabled;
    if(!this.enabled)this.stop();
    if (this.enabled)this.unlock();
    return this.enabled;
  }
  play(event: GameEvent): void {
    if (!this.enabled || !this.context || this.context.state !== 'running') return;
    if(event.type==='end'||event.type==='hit'&&event.targetId===this.heroId
      ||event.team==='blue'&&(event.type==='cast'||event.sourceKind==='hero'&&(event.type==='attack'||event.type==='hit')))this.original.stopMovement();
    const skill=this.skills.play(event,this.context),original=this.original.play(event,this.context);
    if(skill||original)return;
    const plan=combatSound(event);if(!plan)return;
    const context=this.context,now=context.currentTime;
    // One cleave can hit several targets in the same simulation tick.
    if(event.type==='hit'&&now-this.lastHit<.028)return;
    if(event.type==='hit')this.lastHit=now;
    if(!this.noise){
      this.noise=context.createBuffer(1,Math.ceil(context.sampleRate*.35),context.sampleRate);
      const data=this.noise.getChannelData(0);let seed=19;
      for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)|0;data[i]=seed/2147483648;}
    }
    if(this.voices.size>=8)this.voices.values().next().value?.stop();
    const gain=context.createGain(),high=context.createBiquadFilter(),low=context.createBiquadFilter();
    const noise=context.createBufferSource(),oscillator=context.createOscillator(),tone=context.createGain();
    high.type='highpass';high.frequency.value=plan.low;low.type='lowpass';low.frequency.value=plan.high;
    noise.buffer=this.noise;noise.playbackRate.value=event.type==='hit'? .96+(event.targetId??0)%4*.025:1;
    gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(Math.max(.0001,plan.noise),now+.002);
    gain.gain.exponentialRampToValueAtTime(.0001,now+plan.duration);
    noise.connect(high);high.connect(low);low.connect(gain);gain.connect(context.destination);
    oscillator.type=event.type==='last-hit'?'sine':'triangle';
    oscillator.frequency.setValueAtTime(plan.pitch,now);oscillator.frequency.exponentialRampToValueAtTime(plan.sweep,now+plan.duration);
    tone.gain.setValueAtTime(.0001,now);tone.gain.linearRampToValueAtTime(Math.max(.0001,plan.tone),now+.003);
    tone.gain.exponentialRampToValueAtTime(.0001,now+plan.duration);
    oscillator.connect(tone);tone.connect(context.destination);
    let stopped=false;
    const voice={stop:()=>{
      if(stopped)return;stopped=true;
      try{noise.stop();oscillator.stop();}catch{/* Sources already ended. */}
      for(const node of [noise,oscillator,gain,tone,high,low])node.disconnect();this.voices.delete(voice);
    }};
    this.voices.add(voice);noise.onended=()=>voice.stop();
    noise.start(now);oscillator.start(now);noise.stop(now+plan.duration+.01);oscillator.stop(now+plan.duration+.01);
  }
  stop(){this.fluteStarted=null;this.movement.reset();this.original.stop();this.skills.stop();for(const voice of [...this.voices])voice.stop();this.lastHit=-Infinity;}
  dispose(){this.stop();this.original.dispose();this.skills.dispose();this.noise=null;}
}
