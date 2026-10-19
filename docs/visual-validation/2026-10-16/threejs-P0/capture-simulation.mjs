// Run from the repository root. This records simulation data, never browser evidence.
import { createServer } from 'vite';
import { writeFile, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const output = path.dirname(fileURLToPath(import.meta.url));
globalThis.location = { search: '?map=howling' };
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { Match } = await server.ssrLoadModule('/src/game/Match.ts');
  const config = await server.ssrLoadModule('/src/game/config.ts');
  const bridge = await server.ssrLoadModule('/src/game/Bridge.ts');
  const { CameraRig } = await server.ssrLoadModule('/src/render/CameraRig.ts');
  const presentation = await server.ssrLoadModule('/src/render/Presentation.ts');
  const metrics = await server.ssrLoadModule('/src/game/UnitMetrics.ts');
  if (!config.HOWLING_MAP) throw new Error('Expected howling simulation configuration');
  const seed = 20261016;
  function random() {
    let value = seed;
    return () => { value = (Math.imul(value, 1664525) + 1013904223) >>> 0; return value / 4294967296; };
  }
  function make(options = {}) { return new Match({ ...options, random: random() }); }
  function snapshot(match, focus = match.hero('blue')) {
    const camera = new CameraRig(); camera.reset(focus);
    return JSON.parse(JSON.stringify({ time: match.time, phase: match.phase, wave: match.wave,
      cs: match.cs, result: match.result, entities: match.entities, projectiles: match.projectiles,
      zones: match.zones, windWalls: match.windWalls,
      referenceCamera: { viewport: camera.viewport, zoom: camera.zoom, center: camera.center, bounds: camera.bounds },
    }));
  }
  function advance(match, ticks, events) {
    for (let i = 0; i < ticks && match.phase === 'playing'; i++) {
      match.step(config.WORLD.step);
      events.push(...match.drainEvents().map(event => ({ ...event, sampledAt: match.time })));
    }
  }
  function run() {
    const birth = make(); birth.start();
    const mid = make(); mid.start(); const midEvents = [];
    advance(mid, 7200, midEvents);
    const skill = make({ ai: false, waves: false });
    const p = bridge.bridgePoint(-18);
    Object.assign(skill.hero('blue'), p);
    Object.assign(skill.hero('red'), { x:p.x+59, y:p.y, speed:0, damage:0, hp:2000, maxHp:2000 });
    for (const dy of [-38,38]) Object.assign(skill.spawnMinion('red','melee',{x:p.x+85,y:p.y+dy}),{speed:0,damage:0});
    skill.start();
    const skillBefore = snapshot(skill);
    const target = skill.hero('red');
    const accepted = skill.cast('blue','q',target);
    if (!accepted) throw new Error('Baseline Q fixture rejected cast');
    const skillEvents = skill.drainEvents().map(event => ({ ...event, sampledAt:skill.time }));
    const skillFrames = [];
    for (let tick=1;tick<=60;tick++) {
      advance(skill,1,skillEvents);
      if ([1,8,15,30,60].includes(tick)) skillFrames.push({tick,state:snapshot(skill)});
    }
    if (!skillEvents.some(event=>event.type==='hit'&&event.targetId===target.id)) throw new Error('Baseline Q fixture produced no hit');
    if (!midEvents.some(event=>event.type==='hit'&&event.sourceKind!=='hero'&&event.targetKind!=='hero')) throw new Error('No minion battle in middle fixture');
    return {
      schemaVersion:1, evidenceType:'node-simulation-only', seed, step:config.WORLD.step,
      cameraNote:'Reference 480x270 logical viewport, not measured browser viewport; runtime layout resizes it.',
      scenarios: {
        birth:{recipe:'new Match({random:seeded}); start(); no ticks',state:snapshot(birth)},
        midlane:{recipe:'new Match({random:seeded}); start(); no player orders; step 7200 ticks (120s), camera focus bridgePoint(0)',state:snapshot(mid,bridge.bridgePoint(0)),events:midEvents},
        skill:{recipe:'Seeded equivalent of createCombatPractice; cast Q at red hero at tick 0; record ticks 1/8/15/30/60',accepted,before:skillBefore,frames:skillFrames,events:skillEvents},
      },
    };
  }
  const first=run(),second=run();
  const json=JSON.stringify(first,null,2)+'\n';
  if (JSON.stringify(first)!==JSON.stringify(second)) throw new Error('Repeated fixed-seed scenario differs');
  await writeFile(path.join(output,'simulation-baseline.json'),json);
  const summary={
    repeatedIdentically:true,sha256:createHash('sha256').update(json).digest('hex'),
    birth:{time:first.scenarios.birth.state.time,entities:first.scenarios.birth.state.entities.length},
    midlane:{time:first.scenarios.midlane.state.time,phase:first.scenarios.midlane.state.phase,wave:first.scenarios.midlane.state.wave,entities:first.scenarios.midlane.state.entities.length,events:first.scenarios.midlane.events.length},
    skill:{accepted:first.scenarios.skill.accepted,hits:first.scenarios.skill.events.filter(e=>e.type==='hit')},
  };
  await writeFile(path.join(output,'simulation-summary.json'),JSON.stringify(summary,null,2)+'\n');
  await writeFile(path.join(output,'runtime-contract.json'),JSON.stringify({
    WORLD:config.WORLD,VIEWPORT:config.VIEWPORT,BALANCE:config.BALANCE,ABILITIES:config.ABILITIES,
    BASES:config.BASES,TOWERS:config.TOWERS,SPAWNS:config.SPAWNS,MINION_EXITS:config.MINION_EXITS,
    bridge:{world:bridge.BRIDGE_WORLD,mapScale:bridge.BRIDGE_MAP_SCALE,lengthScale:bridge.BRIDGE_LENGTH_SCALE,projection:bridge.BRIDGE.projection,outline:bridge.BRIDGE_OUTLINE,slots:bridge.BRIDGE_SLOTS},
    presentation:{heroScale:presentation.HERO_VISUAL_SCALE,effectScale:presentation.HERO_EFFECT_SCALE,renderScale:presentation.RENDER_SCALE},
    unitMetrics:metrics.UNIT_METRICS,minionScale:metrics.MINION_VISUAL_SCALE,
  },null,2)+'\n');
  const files=[];
  async function walk(dir) {
    for (const item of await readdir(dir,{withFileTypes:true})) {
      const file=path.join(dir,item.name);
      if(item.isDirectory()) await walk(file);
      else files.push(file);
    }
  }
  await walk('src'); await walk('tests');
  files.push('package.json','package-lock.json','vite.config.ts','vite.share.config.ts','tsconfig.json','index.html',
    'assets/map-studies/howling-abyss-v1/layout.json','assets/map-studies/howling-abyss-v1/geometry.ts',
    'assets/units/minions-animated-v1/runtime/clips.json');
  const manifest=[];
  for(const file of files.sort()) {
    const bytes=await readFile(file);
    manifest.push({path:file.replaceAll('\\','/'),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
  }
  await writeFile(path.join(output,'source-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(JSON.stringify(summary,null,2));
} finally { await server.close(); delete globalThis.location; }
