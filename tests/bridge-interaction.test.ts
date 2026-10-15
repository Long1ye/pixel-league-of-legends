import {afterEach,describe,expect,it,vi} from 'vitest';
import {BRIDGE,bridgePoint} from '../src/game/Bridge';
import {bridgeDetour,BRIDGE_FOOTPRINTS,clearBridgeFootprints,onBridgeFootprint} from '../src/game/BridgeInteraction';

describe('ice bridge interaction footprints',()=>{
  it('keeps a mobile foot outside every visible stone foundation',()=>{
    for(const site of BRIDGE_FOOTPRINTS){
      const clear=clearBridgeFootprints({x:site.x,y:site.y},7,1);
      expect(onBridgeFootprint(clear,7),site.id).toBe(false);
    }
  });

  it('routes a straight command around the central crystal plinth',()=>{
    const start=bridgePoint(BRIDGE.blue.inhibitor[0]-45);
    const target=bridgePoint(BRIDGE.blue.inhibitor[0]+45);
    const waypoint=bridgeDetour(start,target,7,1);
    expect(waypoint).not.toEqual(target);
    expect(onBridgeFootprint(waypoint,7)).toBe(false);
  });
});

afterEach(()=>{vi.unstubAllGlobals();vi.resetModules();});
it('lets a hero and minion travel past their own bridge foundations',async()=>{
  vi.stubGlobal('location',{search:'?map=howling'});vi.resetModules();
  const [{Match},{bridgePoint:point,BRIDGE:bridge},{onBridgeFootprint:inside}]=await Promise.all([
    import('../src/game/Match'),import('../src/game/Bridge'),import('../src/game/BridgeInteraction'),
  ]);
  const match=new Match({ai:false,waves:false});match.start();
  match.orderMove('blue',point(-90));
  const minion=match.spawnMinion('blue','melee',point(-550));
  for(let i=0;i<5000;i++){
    match.step(1/60);
    if(i%30===0){
      expect(inside(match.hero('blue'),match.hero('blue').radius)).toBe(false);
      expect(inside(minion,minion.radius)).toBe(false);
    }
  }
  const passed=(unit:{x:number;y:number})=>unit.x>point(bridge.blue.outerTower[0]).x;
  expect(passed(match.hero('blue'))).toBe(true);
  expect(passed(minion)).toBe(true);
});

it('records a visual impact direction without moving the victim in simulation',async()=>{
  vi.stubGlobal('location',{search:'?map=howling'});vi.resetModules();
  const [{Match},{bridgePoint:point}]=await Promise.all([
    import('../src/game/Match'),import('../src/game/Bridge'),
  ]);
  const match=new Match({ai:false,waves:false});match.start();
  const source=match.hero('blue');
  const victim=match.spawnMinion('red','melee',point(-400));
  const before={x:victim.x,y:victim.y};
  match.damage(source,victim,5);
  expect(victim.hitFrom).toEqual({x:source.x,y:source.y});
  expect({x:victim.x,y:victim.y}).toEqual(before);
});
