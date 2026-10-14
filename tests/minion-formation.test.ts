import {describe,it,expect} from 'vitest';
import {Match} from '../src/game/Match';
import {BALANCE,BASES} from '../src/game/config';
import {direction,distance} from '../src/game/geometry';
describe('six unit waves',()=>{
 it('spawns three melee then three casters with 30 unit gaps',()=>{
  const m=new Match({ai:false});m.start();m.step(2);
  for(const team of ['blue','red'] as const){
   const group=m.entities.filter(e=>e.team===team&&e.formation);
   expect(group.map(e=>e.kind)).toEqual(['melee','melee','melee','ranged','ranged','ranged']);
   for(let i=1;i<6;i++)expect(distance(group[i].formation!.goal,group[i-1].formation!.goal)).toBeCloseTo(30);
   expect(group[0].hp).toBe(180);expect(group[5].hp).toBe(125);
  }
  expect(BALANCE.waveInterval).toBe(30);
 });
 it('deploys into two separated rows on enemy approach and deals damage',()=>{
  const m=new Match({ai:false});m.start();m.step(2);
  const blue=m.entities.filter(e=>e.team==='blue'&&e.formation);
  const dir=direction(BASES.blue,BASES.red),front=blue[0];
  const enemy=m.spawnMinion('red','melee',{x:front.x+dir.x*110,y:front.y+dir.y*110});
  enemy.hp=enemy.maxHp=10000;enemy.damage=0;enemy.speed=0;
  // Remove unrelated opponents to keep this a focused formation test.
  m.entities=m.entities.filter(e=>e.team==='blue'||e===enemy);
  for(let i=0;i<1800;i++)m.step(1/60);
  const a=blue[0].formation!.goal,b=blue[3].formation!.goal;
  expect(distance(a,b)).toBeCloseTo(64);
  expect(distance(blue[0].formation!.goal,blue[1].formation!.goal)).toBeCloseTo(40);
  expect(enemy.hp).toBeLessThan(enemy.maxHp);
  expect(blue.filter(e=>e.kind==='ranged').every(e=>e.attacksReleased>0)).toBe(true);
 });
});
