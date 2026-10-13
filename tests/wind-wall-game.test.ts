import { describe, it, expect } from 'vitest';
import { Match } from '../src/game/Match';
import { wallHit, circleHit } from '../src/game/WindWall';
function setup() {
  const m=new Match({ai:false,waves:false}); m.start();
  Object.assign(m.hero('blue'),{x:300,y:300}); Object.assign(m.hero('red'),{x:400,y:300});
  m.cast('blue','w',{x:500,y:300}); return m;
}
describe('in-game wind wall',()=>{
  it('locks cast, places once, pauses and expires on simulation time',()=>{
    const m=setup(), h=m.hero('blue'); m.orderMove('blue',{x:500,y:400}); m.step(.2);
    expect(h.x).toBe(300); expect(m.cast('blue','q',{x:500,y:300})).toBe(false);
    const wall={...m.windWalls[0]}; m.togglePause(); m.step(5); expect(m.time).toBe(.2);
    m.togglePause(); m.step(.7); expect(m.windWalls[0]).toEqual(wall);
    m.step(4); expect(m.windWalls).toHaveLength(0);
  });
  for(const kind of ['q','attack'] as const) it(`blocks hostile ${kind} across a swept path`,()=>{
    const m=setup(); m.step(.4); const hp=m.hero('blue').hp;
    m.projectiles.push({id:900,sourceId:m.hero('red').id,team:'red',kind,x:360,y:300,targetId:m.hero('blue').id,damage:100,speed:200,vx:-1,vy:0,remaining:200,radius:2});
    m.step(.3); expect(m.projectiles).toHaveLength(0); expect(m.hero('blue').hp).toBe(hp);
  });
  it('lets allied projectiles pass',()=>{
    const m=setup(); m.step(.4); m.cast('blue','q',{x:500,y:300}); // still casting, rejected
    m.step(.5); expect(m.cast('blue','q',{x:500,y:300})).toBe(true);
    m.step(.2); expect(m.projectiles).toHaveLength(1);
  });
  it('does not block tower shots',()=>{
    const m=setup(); m.step(.4); const hp=m.hero('blue').hp;
    m.projectiles.push({id:900,sourceId:m.tower('red').id,team:'red',kind:'attack',x:360,y:300,targetId:m.hero('blue').id,damage:100,speed:200,vx:-1,vy:0,remaining:4,radius:2});
    m.step(.3); expect(m.hero('blue').hp).toBe(hp-100);
  });
  it('uses continuous angles and rejects paths beyond the wall ends',()=>{
    for(let angle=0;angle<Math.PI*2;angle+=.17){
      const w={id:1,team:'blue' as const,x:0,y:0,angle,startsAt:0};
      const p={x:Math.cos(angle)*80,y:Math.sin(angle)*80};
      expect(wallHit(w,p,{x:-p.x,y:-p.y},1)).not.toBeNull();
    }
    expect(wallHit({id:1,team:'blue',x:0,y:0,angle:0,startsAt:0},{x:-50,y:90},{x:50,y:90},1)).toBeNull();
    expect(circleHit({x:0,y:0},{x:100,y:0},{x:20,y:0},5)).toBeCloseTo(.15);
  });
});
