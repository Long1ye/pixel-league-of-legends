import type {MatchPhase} from '../game/types';
import bgmUrl from '../../assets/audio/riot-original/runtime/howling-abyss-early.mp3?url';
/** Stream the five-minute original rather than decoding a large PCM buffer. */
export class MapMusic {
 enabled=true;
 volume=.16;
 failed=false;
 private media:HTMLAudioElement|null=null;
 private active=false;
 private disposed=false;
 private clock=-1;
 private combatUntil=0;
 private generation=0;
 noticeCombat(time:number){this.combatUntil=time+1.2;}
 update(time:number,phase:MatchPhase,masterEnabled:boolean,visible=true){
  if(this.disposed)return;
  if(time<this.clock){if(this.media)this.media.currentTime=0;this.combatUntil=0;}
  this.clock=time;
  const shouldPlay=this.enabled&&masterEnabled&&visible&&phase==='playing';
  if(!shouldPlay){if(this.active){this.generation++;this.media?.pause();}this.active=false;this.failed=false;return;}
  if(this.failed)return;
  if(!this.media){
   this.media=new Audio(bgmUrl);this.media.preload='none';this.media.loop=true;
   if(typeof document!=='undefined'){this.media.hidden=true;this.media.dataset.track='howling-abyss-early';document.body.append(this.media);}
  }
  this.media.volume=Math.max(0,Math.min(1,this.volume*(time<this.combatUntil?.6:1)));
  if(this.active)return;
  this.active=true;this.failed=false;const generation=++this.generation;
  void this.media.play().then(()=>{
   if(this.disposed||!this.active)this.media?.pause();
  }).catch(()=>{if(generation===this.generation){this.failed=true;this.active=false;}});
 }
 dispose(){this.disposed=true;this.generation++;this.active=false;this.media?.pause();this.media?.removeAttribute('src');this.media?.load();this.media?.remove?.();this.media=null;}
}
