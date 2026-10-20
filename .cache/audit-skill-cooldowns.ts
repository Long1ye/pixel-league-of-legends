import assert from 'node:assert/strict';
import {Match} from '../src/game/Match';
import {championStats,grantExperience,totalXPForLevel,skillCooldown} from '../src/game/ChampionProgression';
import type {AbilityKey} from '../src/game/types';
const response=await fetch('https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/champion/Yasuo.json');
assert.ok(response.ok);
const {data:{Yasuo:official}}=await response.json();
let checked=0;
for(const [index,key] of (['q','w','e','r'] as const).entries()){
 for(let rank=1;rank<=official.spells[index].maxrank;rank++){
  for(const team of ['blue','red'] as const){
   const m=new Match({league:true,ai:false,waves:false});m.start();m.time=17;
   const hero=m.hero(team),target=m.hero(team==='blue'?'red':'blue');
   Object.assign(hero,{x:400,y:350});Object.assign(target,{x:440,y:350,hp:99999,maxHp:99999});
   // Rank matrix at level 18; the Q base comparison intentionally removes bonus AS.
   grantExperience(hero,totalXPForLevel(18));hero.skillRanks![key]=rank;
   if(key==='q')hero.bonusAttackSpeed=0;
   if(key==='r')target.airborneUntil=m.time+2;
   assert.ok(m.cast(team,key,target),`${team} ${key}${rank} must cast`);
   assert.ok(Math.abs((hero.abilities[key]-m.time)-official.spells[index].cooldown[rank-1])<1e-9,`${key}${rank} timer differs`);
   if(key==='e')assert.equal(m.targetLocks(team).get(target.id)!-m.time,official.spells[index].effect[2][rank-1]);
   const deadline=hero.abilities[key];
   m.upgradeSkill(team,key);assert.equal(hero.abilities[key],deadline,'upgrading must not restart a running cooldown');
   checked++;
  }
 }
}
let previous=4;const samples=[];
for(let level=1;level<=18;level++){
 const m=new Match({league:true,ai:false,waves:false});m.start();const h=m.hero('blue');
 grantExperience(h,totalXPForLevel(level));h.skillRanks!.q=1;
 const actual=skillCooldown(h,'q');assert.ok(actual<=previous&&actual>=1.33);previous=actual;
 Object.assign(h,championStats(level));
 for(let rank=1;rank<=5;rank++){h.skillRanks!.q=rank;assert.equal(skillCooldown(h,'q'),actual,'Q rank must not lower its cooldown');}
 if([1,6,11,16,18].includes(level))samples.push({level,q:Number(actual.toFixed(4))});
 h.bonusAttackSpeed=10;assert.ok(Math.abs(skillCooldown(h,'q')-1.33)<.01,'Q minimum cooldown');
}
console.log(JSON.stringify({officialVersion:'16.20.1',rankAndTeamCases:checked,qGrowthLevels:18,qSamples:samples,result:'PASS'},null,2));
