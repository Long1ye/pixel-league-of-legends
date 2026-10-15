import {Match} from './Match';
import {HOWLING_MAP} from './config';
import {bridgePoint} from './Bridge';
/** A quiet place to compare contact feedback without waiting for a wave. */
export function createCombatPractice():Match{
 const match=new Match({ai:false,waves:false});
 const p=HOWLING_MAP?bridgePoint(-18):{x:470,y:350};
 Object.assign(match.hero('blue'),p);
 Object.assign(match.hero('red'),{x:p.x+59,y:p.y,speed:0,damage:0,hp:2000,maxHp:2000});
 for(const dy of [-38,38]){
  const target=match.spawnMinion('red','melee',{x:p.x+85,y:p.y+dy});
  Object.assign(target,{speed:0,damage:0});
 }
 return match;
}
