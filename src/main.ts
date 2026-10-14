import Phaser from 'phaser';
import './style.css';
import { ABILITIES, BALANCE, BASES, MAP_LAYOUT, VIEWPORT, WORLD, mapToWorld } from './game/config';
import { Match } from './game/Match';
import type { AbilityKey, MatchPhase } from './game/types';
import { ArenaScene } from './render/ArenaScene';
import { AudioFeedback } from './ui/AudioFeedback';
import { createEPractice } from './game/EPractice';
import { createRPractice } from './game/RPractice';
import { clearStorm, grantStorm, stormReady } from './game/YasuoStorm';
import { mountLeagueHud } from './ui/LeagueHud';
import { RENDER_SCALE } from './render/Presentation';
import { HOWLING_MAP } from './game/config';
import { BRIDGE_OUTLINE, BRIDGE_SLOTS, bridgePoint } from './game/Bridge';

function element<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing UI element: ${id}`);
  return node as T;
}
const ui = {
  blueCs: element('blue-cs'), redCs: element('red-cs'), time: element('match-time'),
  phase: element('phase-label'), wave: element('wave-label'),
  hp: element<HTMLProgressElement>('hero-health'), mana: element<HTMLProgressElement>('hero-mana'),
  hpText: element('health-text'), manaText: element('mana-text'),
  blueTower: element<HTMLProgressElement>('blue-tower'), redTower: element<HTMLProgressElement>('red-tower'),
  overlay: element('match-overlay'), title: element('overlay-title'), description: element('overlay-description'),
  kicker: element('overlay-kicker'), symbol: element('overlay-symbol'), stats: element('result-stats'),
  start: element<HTMLButtonElement>('start-button'), pause: element<HTMLButtonElement>('pause-button'),
  restart: element<HTMLButtonElement>('restart-button'), sound: element<HTMLButtonElement>('sound-button'),
  toast: element('toast'), arena: element('arena'),
  target: element('target-readout'), targetName: element('target-name'), targetHealth: element('target-health'),
  targetBar: element<HTMLProgressElement>('target-bar'),
  camera: element<HTMLButtonElement>('camera-button'), cameraLabel: element('camera-label'),
  minimap: element<HTMLButtonElement>('minimap'),
  heroAnimation: element('hero-animation-state'),
};
const audio = new AudioFeedback();
// Keep the overview and click mapping tied to world geometry, not the PNG size.
ui.minimap.querySelector('svg')!.setAttribute('viewBox', `0 0 ${WORLD.width} ${WORLD.height}`);
document.getElementById('mini-terrain')!.setAttribute('width', `${WORLD.width}`);
document.getElementById('mini-terrain')!.setAttribute('height', `${WORLD.height}`);
document.getElementById('mini-lane')!.setAttribute('d', `M${BASES.blue.x} ${BASES.blue.y} ${BASES.red.x} ${BASES.red.y}`);
document.getElementById('mini-lane')!.setAttribute('stroke-width', `${55 * MAP_LAYOUT.scale}`);
const riverStart = mapToWorld({ x: 40, y: 0 }), riverEnd = mapToWorld({ x: 471, y: 327 });
document.getElementById('mini-river')!.setAttribute('d', `M${riverStart.x} ${riverStart.y} ${riverEnd.x} ${riverEnd.y}`);
document.getElementById('mini-river')!.setAttribute('stroke-width', `${90 * MAP_LAYOUT.scale}`);
if(HOWLING_MAP){
  const atmosphereToggle=document.createElement('button');
  atmosphereToggle.textContent='风雪氛围：开';atmosphereToggle.setAttribute('aria-pressed','true');
  atmosphereToggle.onclick=()=>{scene.atmosphereEnabled=!scene.atmosphereEnabled;atmosphereToggle.textContent=scene.atmosphereEnabled?'风雪氛围：开':'风雪氛围：关';atmosphereToggle.setAttribute('aria-pressed',String(scene.atmosphereEnabled));};
  document.querySelector('.match-actions')!.append(atmosphereToggle);
 document.getElementById('mini-terrain')!.setAttribute('fill','#091521');
 document.getElementById('mini-river')!.setAttribute('display','none');
 const lane=document.getElementById('mini-lane')!;
 lane.setAttribute('d',BRIDGE_OUTLINE.map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' ')+' Z');
 lane.setAttribute('fill','#647e90');lane.setAttribute('stroke-width','2');
 for(const site of BRIDGE_SLOTS){
  const p=bridgePoint(site.u,site.v),dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx',String(p.x));dot.setAttribute('cy',String(p.y));dot.setAttribute('r',site.id.includes('spawn')?'15':'11');
  dot.setAttribute('fill',site.team==='blue'?'#83cdeb':'#e9a8b7');lane.parentNode!.insertBefore(dot,lane.nextSibling);
 }
}
const ePractice = new URLSearchParams(location.search).get('practice') === 'e';
const rPractice = new URLSearchParams(location.search).get('practice') === 'r';
const qPractice = new URLSearchParams(location.search).get('practice') === 'q';
if(qPractice){document.querySelector('h1')!.textContent='斩钢闪 · 蓄风与 Q3 测试场';document.querySelector('.team-score.red .team-label')!.textContent='固定靶 · 无 AI';document.querySelector('.heading-description')!.textContent='Q 命中两次蓄风，右键移动观察独立风层；下一次 Q 发射龙卷风。命中击飞英雄后可接 R。测试按钮可清冷却或直接准备蓄风。';}
if(rPractice){document.querySelector('h1')!.textContent='狂风绝息斩 · 原版 R 测试场';document.querySelector('.heading-description')!.textContent='先击飞测试英雄，再指向目标按 R；也可通过 Q3 击飞后接 R。采用保留的原版 16 帧，暂不包含剑意及暴击穿甲。';}
if (ePractice) {
  document.querySelector('h1')!.textContent='踏前斩 · 八向测试场';
  document.querySelector('.team-score.red .team-label')!.textContent='固定靶 · 无 AI';
  document.querySelector('.heading-description')!.textContent='八向固定靶 · 指向小兵按 E，滑行期间按 Q 接环斩 · 右键移动。方向按钮默认复位并试放 EQ，可取消勾选对照普通 E。';
}
function createMatch(): Match {
  return rPractice || qPractice ? createRPractice() : ePractice ? createEPractice() : new Match();
}
let match = createMatch();
let displayedPhase: MatchPhase | null = null;
let toastTimer = 0;

function clock(seconds: number): string {
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

function toast(message: string): void {
  window.clearTimeout(toastTimer);
  ui.toast.textContent = message;
  ui.toast.classList.add('visible');
  toastTimer = window.setTimeout(() => ui.toast.classList.remove('visible'), 1700);
}

function syncHud(state: Match): void {
  const hero = state.hero('blue');
  ui.heroAnimation.textContent = scene.heroAnimationLabel;
  const ready=stormReady(hero,state.time),stacks=(hero.qStacksUntil??0)>state.time?(hero.qStacks??0):0;
  element('ability-q').querySelector('.ability-name')!.textContent=ready?'Q3 · 旋风':`斩钢闪${stacks?' · 1层':''}`;
  element('ability-q').style.boxShadow=ready?'inset 0 0 0 2px #a5e5f5':'';
  if(stacks)ui.heroAnimation.textContent+=` · 蓄风 ${stacks}/2 · ${Math.max(0,(hero.qStacksUntil??0)-state.time).toFixed(1)}s`;
  const rig = scene.cameraRig, bounds = rig.bounds;
  ui.camera.setAttribute('aria-pressed', `${rig.following}`);
  ui.camera.textContent = rig.following ? '跟随镜头 · Y' : '自由镜头 · Y';
  ui.cameraLabel.textContent = `${rig.zoom}× ${rig.zoom < 1 ? '高位视角' : '局部视角'}`;
  const miniView = document.getElementById('mini-view')!;
  for (const [key, value] of Object.entries(bounds)) miniView.setAttribute(key, `${value}`);
  for (const team of ['blue', 'red'] as const) {
    for (const kind of ['hero', 'tower'] as const) {
      const unit = kind === 'hero' ? state.hero(team) : state.tower(team);
      const marker = document.getElementById(`mini-${team}-${kind}`)!;
      marker.setAttribute('cx', `${unit.x}`); marker.setAttribute('cy', `${unit.y}`);
      marker.setAttribute('opacity', unit.hp > 0 ? '1' : '0.25');
    }
  }
  ui.blueCs.textContent = `${state.cs.blue}`;
  ui.redCs.textContent = `${state.cs.red}`;
  ui.time.textContent = clock(state.time);
  ui.wave.textContent = state.wave ? `第 ${state.wave} 波兵线 · 下一波 ${Math.max(0, Math.ceil(BALANCE.firstWaveAt + state.wave * BALANCE.waveInterval - state.time))}s` : '等待第一波兵线';
  if (ePractice) ui.wave.textContent = `E 测试 · 八向固定靶 · ${scene.simulationSpeed}× 速度`;
  if(rPractice) ui.wave.textContent=`R 原版测试 · ${scene.simulationSpeed}× 速度 · 先击飞再按 R`;
  if(qPractice)ui.wave.textContent=`Q 测试 · ${scene.simulationSpeed}× · 独立蓄风 / 横斩 / 龙卷风`;
  ui.hp.value = hero.hp; ui.mana.value = hero.mana;
  ui.hpText.textContent = `${Math.ceil(hero.hp)} / ${hero.maxHp}`;
  ui.manaText.textContent = `${Math.floor(hero.mana)} / ${hero.maxMana}`;
  ui.blueTower.value = state.tower('blue').hp;
  ui.redTower.value = state.tower('red').hp;
  const target = state.entity(scene.selectedId);
  ui.target.hidden = !target || target.hp <= 0;
  if (target && target.hp > 0) {
    const names = { hero: target.team === 'red' ? '卡牌大师' : '亚索', melee: '近战兵', ranged: '远程兵', tower: '防御塔' };
    ui.targetName.textContent = `${target.team === 'blue' ? '友方' : '敌方'} · ${names[target.kind]}`;
    ui.targetHealth.textContent = `${Math.ceil(target.hp)} / ${target.maxHp}`;
    ui.targetBar.value = target.hp / target.maxHp * 100;
  }
  for (const key of ['q', 'w', 'e', 'r'] as const) {
    const remaining = Math.max(0, hero.abilities[key] - state.time);
    element(`ability-${key}`).classList.toggle('cooling', remaining > 0);
    element(`ability-${key}`).classList.toggle('unaffordable', hero.mana < ABILITIES[key].cost);
    element(`cooldown-${key}`).textContent = remaining > 0 ? `${Math.ceil(remaining)}` : '';
  }
  if (state.phase === displayedPhase) return;
  displayedPhase = state.phase;
  ui.phase.textContent = { ready: '准备就绪', playing: '对线进行中', paused: '比赛已暂停', ended: '比赛结束' }[state.phase];
  ui.pause.disabled = state.phase === 'ready' || state.phase === 'ended';
  ui.pause.textContent = state.phase === 'paused' ? '继续 Esc' : '暂停 Esc';
  ui.overlay.hidden = state.phase === 'playing' || ((ePractice||rPractice||qPractice) && state.phase === 'paused');
  ui.stats.hidden = state.phase !== 'ended';
  ui.symbol.style.color = '';
  if (state.phase === 'ready') {
    ui.kicker.textContent = 'THE MIDLINE TRIAL';
    ui.symbol.textContent = '◈';
    ui.title.textContent = HOWLING_MAP?'嚎哭深渊 · 冰桥对线':'赢下这条中路';
    ui.description.textContent = '补好每一刀，找准出手的时机。一血、一塔、一百刀，任意一项即可获胜。';
    ui.start.textContent = '进入对线 →';
    if (ePractice) {
      ui.kicker.textContent='YASUO E LAB'; ui.title.textContent='测试八向踏前斩';
      ui.description.textContent='指向固定靶按 E 穿过目标。上方方向按钮可复位试放；支持慢放与清除冷却。';
      ui.start.textContent='进入测试 →';
    }
    if(rPractice){ui.kicker.textContent='YASUO R LAB';ui.title.textContent='测试原版狂风绝息斩';ui.description.textContent='使用上方一键试放，或先用 Q3 / EQ3 击飞目标再按 R。';ui.start.textContent='进入测试 →';}
    if(qPractice){ui.kicker.textContent='YASUO Q LAB';ui.title.textContent='测试蓄风与龙卷风';ui.description.textContent='点上方“蓄风并行走”查看效果，或连续使用“Q 命中靶”测试叠层和 Q3。';ui.start.textContent='进入测试 →';}
  } else if (state.phase === 'paused') {
    ui.kicker.textContent = 'TAKE A BREATH';
    ui.symbol.textContent = 'Ⅱ';
    ui.title.textContent = '稍作休息';
    ui.description.textContent = '比赛时间、兵线和技能冷却已暂停。';
    ui.start.textContent = '继续对线 →';
  } else if (state.result) {
    const won = state.result.winner === 'blue', draw = state.result.winner === null;
    const reasons = { 'first-blood': '一血', 'first-tower': '一塔', '100-cs': '一百刀', draw: '同时达成胜利条件' };
    ui.kicker.textContent = draw ? 'A CLOSE CONTEST' : won ? 'VICTORY' : 'TRY ANOTHER LINE';
    ui.symbol.textContent = won ? '✦' : draw ? '◇' : '◈';
    ui.symbol.style.color = won || draw ? '#6de5db' : '#ee8582';
    ui.title.textContent = draw ? '势均力敌' : won ? '这条中路，属于你。' : '下一次，找准时机。';
    ui.description.textContent = draw ? '双方在同一逻辑步达成胜利条件，本局平局。' : `${won ? '你' : '训练对手'}通过「${reasons[state.result.reason]}」赢得了本局对线。`;
    const time = document.createElement('span'), cs = document.createElement('span');
    time.textContent = `用时 ${clock(state.result.time)}`;
    cs.textContent = `补刀 ${state.cs.blue} : ${state.cs.red}`;
    ui.stats.replaceChildren(time, cs);
    ui.start.textContent = '再来一局 ↻';
  }
}

const scene = new ArenaScene(match, {
  frame: syncHud,
  event: event => {
    audio.play(event);
    if (event.type === 'wave' && match.wave === 1) toast('兵线出发。靠近残血小兵，完成最后一击。');
    if (event.type === 'last-hit' && event.team === 'blue' && match.cs.blue === 1) toast('补刀 +1。先到 100 刀也能获胜。');
  },
});
const game = new Phaser.Game({
  type: Phaser.AUTO, parent: 'game', width: VIEWPORT.width * RENDER_SCALE, height: VIEWPORT.height * RENDER_SCALE,
  backgroundColor: '#142b28', pixelArt: true, roundPixels: true,
  render: { antialias: false, pixelArt: true, roundPixels: true },
  scale: { mode: Phaser.Scale.NONE, autoCenter: Phaser.Scale.NO_CENTER },
  scene: [scene], audio: { noAudio: true },
});

function reset(start = true): void {
  match = createMatch();
  scene.setMatch(match);
  window.clearTimeout(toastTimer);
  ui.toast.classList.remove('visible');
  displayedPhase = null;
  if (start) match.start();
  syncHud(match);
  ui.arena.focus({ preventScroll: true });
}
function begin(): void {
  if (match.phase === 'ended') reset();
  else if (match.phase === 'paused') match.togglePause();
  else match.start();
  syncHud(match);
  ui.arena.focus({ preventScroll: true });
}
function cast(key: AbilityKey): void {
  if (match.phase !== 'playing') return;
  if (!match.cast('blue', key, scene.aim)) {
    if(key==='r'){toast('R 需要范围内被击飞的敌方英雄，且技能冷却完成。');return;}
    const hero = match.hero('blue');
    if(hero.eCast) { toast(key==='q'?'Q 尚未就绪，或本次 E 已触发 EQ。':'正在踏前斩，可按 Q 接环斩。'); return; }
    if(key==='e' && match.dashError(scene.aim)) { toast(match.dashError(scene.aim)!); return; }
    toast(hero.wCast && match.time < hero.wCast.startedAt + 0.8 ? '正在释放风墙，请等待收招。' : hero.mana < ABILITIES[key].cost ? '法力不足，回出生点恢复。' : '技能尚未冷却。');
  }
  syncHud(match);
}
const practiceLink = document.createElement('a');
const accentsToggle=document.createElement('button');
accentsToggle.textContent='场景与命中特效：开';accentsToggle.setAttribute('aria-pressed','true');
accentsToggle.onclick=()=>{scene.accentsEnabled=!scene.accentsEnabled;accentsToggle.textContent=scene.accentsEnabled?'场景与命中特效：开':'场景与命中特效：关';accentsToggle.setAttribute('aria-pressed',String(scene.accentsEnabled));};
document.querySelector('.match-actions')!.append(accentsToggle);
if(HOWLING_MAP){
  const lightToggle=document.createElement('button');
  const firelightToggle=document.createElement('button');
  const materialToggle=document.createElement('button');
  materialToggle.textContent='石砖凹凸受光：开';materialToggle.setAttribute('aria-pressed','true');
  materialToggle.title='需要开启引擎光影；使用程序生成的浅浮雕法线，不改变地形';
  materialToggle.onclick=()=>{scene.materialLightingEnabled=!scene.materialLightingEnabled;materialToggle.textContent=scene.materialLightingEnabled?'石砖凹凸受光：开':'石砖凹凸受光：关';materialToggle.setAttribute('aria-pressed',String(scene.materialLightingEnabled));};
  document.querySelector('.match-actions')!.append(materialToggle);
  lightToggle.textContent='引擎光影：开';lightToggle.setAttribute('aria-pressed','true');
  lightToggle.onclick=()=>{scene.lightingEnabled=!scene.lightingEnabled;lightToggle.textContent=scene.lightingEnabled?'引擎光影：开':'引擎光影：关';lightToggle.setAttribute('aria-pressed',String(scene.lightingEnabled));};
  document.querySelector('.match-actions')!.append(lightToggle);
  firelightToggle.textContent='动态火光：开';firelightToggle.setAttribute('aria-pressed','true');
  firelightToggle.title='控制环境火盆的动态受光；关闭后保留原有静态照明，不影响技能特效';
  firelightToggle.onclick=()=>{scene.firelightMotionEnabled=!scene.firelightMotionEnabled;firelightToggle.textContent=scene.firelightMotionEnabled?'动态火光：开':'动态火光：关';firelightToggle.setAttribute('aria-pressed',String(scene.firelightMotionEnabled));};
  document.querySelector('.match-actions')!.append(firelightToggle);
}
const mapToggle=document.createElement('button');
const iceToggle=document.createElement('button');
iceToggle.textContent='地面：新版石砖＋积雪';iceToggle.setAttribute('aria-pressed','true');
iceToggle.onclick=()=>{scene.iceMap=!scene.iceMap;iceToggle.textContent=scene.iceMap?'地面：新版石砖＋积雪':'地面：原森林';iceToggle.setAttribute('aria-pressed',String(scene.iceMap));mapToggle.disabled=scene.iceMap;};
document.querySelector('.match-actions')!.append(iceToggle);
if(HOWLING_MAP){iceToggle.disabled=true;iceToggle.textContent='地图：嚎哭深渊冰桥';}
mapToggle.textContent='动态地图：开';mapToggle.setAttribute('aria-pressed','true');
mapToggle.disabled=scene.iceMap;
mapToggle.title='仅控制原森林的动态层；石砖和积雪是静态地面材质';
mapToggle.onclick=()=>{scene.dynamicMap=!scene.dynamicMap;mapToggle.textContent=scene.dynamicMap?'动态地图：开':'动态地图：关（原图）';mapToggle.setAttribute('aria-pressed',String(scene.dynamicMap));};
document.querySelector('.match-actions')!.append(mapToggle);
practiceLink.href = ePractice ? '/?map=howling' : '/?practice=e';
practiceLink.textContent = ePractice ? '返回冰桥对局' : 'E 技能测试场';
practiceLink.style.cssText = 'color:#9fe8db;margin:8px;display:inline-block';
document.querySelector('.match-actions')!.append(practiceLink);
const rLink=document.createElement('a');rLink.href=rPractice?'/?map=howling':'/?practice=r';rLink.textContent=rPractice?'返回冰桥对局':'R 大招测试场';rLink.style.cssText=practiceLink.style.cssText;document.querySelector('.match-actions')!.append(rLink);
const qLink=document.createElement('a');qLink.href=qPractice?'/?map=howling':'/?practice=q';qLink.textContent=qPractice?'返回冰桥对局':'Q 蓄风测试场';qLink.style.cssText=practiceLink.style.cssText;document.querySelector('.match-actions')!.append(qLink);
if(qPractice){
 const panel=document.createElement('section');panel.setAttribute('aria-label','Q 测试控制');panel.style.cssText='display:flex;gap:8px;flex-wrap:wrap;padding:12px;background:#18332f;color:#d4eee7';
 const ready=()=>{reset();const h=match.hero('blue');grantStorm(h,match.time);grantStorm(h,match.time);};
 const walk=document.createElement('button');walk.textContent='蓄风并行走';walk.onclick=()=>{ready();match.orderMove('blue',{x:445,y:390});syncHud(match);};
 const hit=document.createElement('button');hit.textContent='Q 命中靶（清冷却）';hit.onclick=()=>{if(match.phase!=='playing')begin();const h=match.hero('blue');h.abilities.q=match.time;h.mana=h.maxMana;scene.aim={...match.hero('red')};scene.selectedId=match.hero('red').id;cast('q');};
 const clear=document.createElement('button');clear.textContent='清除蓄风';clear.onclick=()=>{clearStorm(match.hero('blue'));syncHud(match);};
 const slow=document.createElement('button');slow.textContent='慢放 ×0.25';slow.onclick=()=>{scene.simulationSpeed=scene.simulationSpeed===1?.25:1;slow.textContent=scene.simulationSpeed===1?'慢放 ×0.25':'恢复原速';};
 panel.append(walk,hit,clear,slow);
 ['正右','右下','正下','左下','正左','左上','正上','右上'].forEach((name,i)=>{const button=document.createElement('button');button.textContent=`Q3 ${name}`;button.onclick=()=>{ready();const h=match.hero('blue');scene.aim={x:h.x+Math.cos(i*Math.PI/4)*100,y:h.y+Math.sin(i*Math.PI/4)*100};cast('q');};panel.append(button);});
 document.querySelector('.page-heading')!.after(panel);
}
if(rPractice){
 const panel=document.createElement('section');panel.style.cssText='display:flex;gap:8px;flex-wrap:wrap;padding:12px;background:#18332f;color:#d4eee7';
 const prepare=()=>{reset();const target=match.hero('red');target.airborneUntil=match.time+3;scene.aim={x:target.x,y:target.y};scene.selectedId=target.id;};
 const air=document.createElement('button');air.textContent='复位并击飞目标';air.onclick=prepare;
 const trial=document.createElement('button');trial.textContent='一键试放原版 R';trial.onclick=()=>{prepare();cast('r');};
 const slow=document.createElement('button');slow.textContent='慢放 ×0.25';slow.onclick=()=>{scene.simulationSpeed=scene.simulationSpeed===1?.25:1;slow.textContent=scene.simulationSpeed===1?'慢放 ×0.25':'恢复原速';};
 panel.append(air,trial,slow);document.querySelector('.page-heading')!.after(panel);
}
if (ePractice) {
  const panel = document.createElement('section');
  panel.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:12px;background:#18332f;color:#d4eee7';
  panel.setAttribute('aria-label', 'E 测试控制');
  const label = document.createElement('span'); label.textContent = '复位并试放：'; panel.append(label);
  const eqMode=document.createElement('input');eqMode.type='checkbox';eqMode.checked=true;
  const eqLabel=document.createElement('label');eqLabel.append(eqMode,' EQ 连招（E 后接 Q）');panel.append(eqLabel);
  const eq3Mode=document.createElement('input');eq3Mode.type='checkbox';
  const eq3Label=document.createElement('label');eq3Label.append(eq3Mode,' EQ3 蓄风多层环斩');panel.append(eq3Label);
  eq3Mode.onchange=()=>{if(eq3Mode.checked)eqMode.checked=true;};
  eqMode.onchange=()=>{if(!eqMode.checked)eq3Mode.checked=false;};
  ['正右','右下','正下','左下','正左','左上','正上','右上'].forEach((name, index) => {
    const button = document.createElement('button'); button.textContent = name;
    button.addEventListener('click', () => {
      reset();
      const target = match.entities.filter(e => e.team === 'red' && e.kind === 'melee')[index];
      scene.aim = { x: target.x, y: target.y }; scene.selectedId = target.id;
      if(eq3Mode.checked){grantStorm(match.hero('blue'),match.time);grantStorm(match.hero('blue'),match.time);}
      cast('e');
      if(eqMode.checked) cast('q');
    }); panel.append(button);
  });
  const slow = document.createElement('button'); slow.textContent = '慢放 ×0.25'; slow.setAttribute('aria-pressed','false');
  slow.onclick = () => { scene.simulationSpeed = scene.simulationSpeed === 1 ? 0.25 : 1; slow.setAttribute('aria-pressed',String(scene.simulationSpeed !== 1)); slow.textContent=scene.simulationSpeed===1?'慢放 ×0.25':'恢复原速'; };
  const clear = document.createElement('button'); clear.textContent='清除 E / Q 冷却';
  clear.onclick = () => { match.eTargetLocks.clear(); match.hero('blue').abilities.e=match.time; match.hero('blue').abilities.q=match.time; syncHud(match); };
  panel.append(slow,clear); document.querySelector('.page-heading')!.after(panel);
}
mountLeagueHud(ePractice || rPractice || qPractice);
ui.start.addEventListener('click', begin);
ui.restart.addEventListener('click', () => reset());
ui.pause.addEventListener('click', () => { match.togglePause(); syncHud(match); });
ui.sound.addEventListener('click', () => {
  const enabled = audio.toggle();
  ui.sound.textContent = enabled ? '音效开启 ♪' : '音效关闭 ♪';
  ui.sound.setAttribute('aria-pressed', `${enabled}`);
});
function toggleCamera(): void {
  scene.cameraRig.toggleFollow(match.hero('blue'));
  syncHud(match);
}
ui.camera.addEventListener('click', toggleCamera);
ui.minimap.addEventListener('click', event => {
  if (match.phase !== 'playing') return;
  if (event.detail === 0) { scene.cameraRig.lookAt(match.hero('blue')); return; }
  const rect = ui.minimap.querySelector('svg')!.getBoundingClientRect();
  scene.cameraRig.following = false;
  scene.cameraRig.lookAt({ x: (event.clientX - rect.left) / rect.width * WORLD.width, y: (event.clientY - rect.top) / rect.height * WORLD.height });
  ui.arena.focus({ preventScroll: true });
  syncHud(match);
});
for (const key of ['q', 'w', 'e', 'r'] as const) {
  const button = element(`ability-${key}`);
  button.title = `${key.toUpperCase()} ${key === 'q' ? '斩钢闪（八向动画）' : ABILITIES[key].name} · ${ABILITIES[key].cost} 法力 · ${ABILITIES[key].cooldown}s 冷却`;
  button.addEventListener('click', () => cast(key));
  button.addEventListener('mouseenter', () => { scene.aimKey = key; });
  button.addEventListener('mouseleave', () => { scene.aimKey = null; });
}
window.addEventListener('keydown', event => {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  const key = event.key.toLowerCase();
  if (['q', 'w', 'e', 's', 'y', ' ', 'escape', 'enter', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) event.preventDefault();
  if (key === 'q' || key === 'w' || key === 'e' || key === 'r') cast(key);
  else if (key === 's' && match.phase === 'playing') match.stop('blue');
  else if (key === 'escape') { match.togglePause(); syncHud(match); }
  else if (key === 'enter' && match.phase !== 'playing') begin();
  else if (key === 'y') toggleCamera();
  else if (key === ' ' && match.phase === 'playing') {
    scene.recenterHeld = true;
    scene.cameraRig.lookAt(match.hero('blue'));
  }
});
window.addEventListener('keyup', event => { if (event.key === ' ') scene.recenterHeld = false; });
window.addEventListener('blur', () => {
  scene.recenterHeld = false;
  if (match.phase === 'playing') { match.togglePause(); syncHud(match); }
});
function resize(): void {
  const available = Math.min(ui.arena.clientWidth / VIEWPORT.width, ui.arena.clientHeight / VIEWPORT.height);
  game.scale.setZoom(available / RENDER_SCALE);
  game.scale.updateBounds();
}
game.events.once(Phaser.Core.Events.READY, resize);
const observer = new ResizeObserver(resize);
observer.observe(ui.arena);
window.addEventListener('beforeunload', () => { observer.disconnect(); game.destroy(true); });
syncHud(match);
