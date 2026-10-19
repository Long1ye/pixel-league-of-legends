import './style.css';
import { mountThreeHud } from './ui/ThreeHud';
import './render-three/prototype.css';
import { Match } from './game/Match';
import { ABILITIES, HOWLING_MAP } from './game/config';
import { bridgePoint } from './game/Bridge';
import { createCombatPractice } from './game/CombatPractice';
import { ThreeArena } from './render-three/ThreeArena';
import { PrototypeHost } from './presentation/PrototypeHost';
import type { AbilityKey, Point } from './game/types';
import { createS01Match } from './presentation/S01Match';
import { CENTRAL_BRIDGE } from './render-three/CentralBridgeLayout';
import { PAINTED_MAP } from './render-three/PaintedBridgeSample';
import { ART_VIEWS, ART_OUTER_U } from './render-three/PaintedMapLayout';
import overviewReference from '../assets/map-concepts/howling-abyss-target-v1/01-overview.png?url';
import sanctuaryReference from '../assets/map-concepts/howling-abyss-target-v1/02-sanctuary.png?url';
import towerReference from '../assets/map-concepts/howling-abyss-target-v1/03-outer-tower.png?url';
import centralReference from '../assets/map-concepts/howling-abyss-target-v1/04-central-bridge.png?url';
import { MapDrag } from './presentation/MapDrag';
import { GAMEPLAY_VIEW } from './render-three/Coordinates';
import { ThreeAudio } from './presentation/ThreeAudio';
import type { QualityEffect } from './render-three/QualitySettings';

function element<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id); if (!node) throw new Error(`Missing ${id}`); return node as T;
}
const viewport = element('viewport'), status = element('status'), error = element('error');
if (!HOWLING_MAP) {
  // Reload with an explicit map selection before importing a different simulation state.
  const url = new URL(location.href); url.searchParams.set('map', 'howling'); location.replace(url);
} else {
  try { boot(); } catch (cause) {
    error.hidden = false; error.textContent = `样板启动失败：${cause instanceof Error ? cause.message : String(cause)}\n原版入口仍可从上方链接打开。`;
  }
}

function boot(): void {
  const scenario = element<HTMLSelectElement>('scenario');
  const requestedScene = new URLSearchParams(location.search).get('scene');
  if (requestedScene && requestedScene in ART_VIEWS) scenario.value = requestedScene;
  const artView = () => ART_VIEWS[scenario.value as keyof typeof ART_VIEWS] ?? ART_VIEWS.central;
  const view = new ThreeArena(viewport);
  let fogWanted = true;
  const syncEnvironment = () => { view.showLayout = scenario.value === 'layout'; view.centralOnly = scenario.value === 'central' || scenario.value === 'combat'; view.fogEnabled = fogWanted && scenario.value === 'match'; view.cameraRig.setMapBounds(scenario.value === 'match' && view.paintedArt); };
  syncEnvironment();
  const fogButton = element<HTMLButtonElement>('war-fog');
  const detail = element<HTMLSelectElement>('detail');
  const lookSelect = element<HTMLSelectElement>('presentation');
  const requestedLook = new URLSearchParams(location.search).get('look');
  if (requestedLook === 'gray' || requestedLook === 'solid') lookSelect.value = requestedLook;
  view.paintedArt = lookSelect.value === 'art';
  syncEnvironment();
  view.presentation = lookSelect.value === 'gray' ? 'gray' : 'art';
  const host = new PrototypeHost(() => scenario.value === 'match' ? new Match() : scenario.value === 'combat' ? createCombatPractice() : createS01Match(scenario.value === 'sanctuary' ? -659 : scenario.value === 'sample' ? -ART_OUTER_U + 50 : -10), view);
  const abort = new AbortController(), signal = abort.signal;
  fogButton.addEventListener('click', () => {
    fogWanted = !fogWanted; syncEnvironment(); fogButton.textContent = `战争迷雾：${fogWanted ? '开' : '关'}`; fogButton.setAttribute('aria-pressed', String(fogWanted));
  }, { signal });
  const audio = new ThreeAudio();
  document.addEventListener('pointerdown', () => audio.unlock(), { signal, capture: true });
  document.addEventListener('keydown', () => audio.unlock(), { signal, capture: true });
  const sound = element<HTMLButtonElement>('sound'), music = element<HTMLButtonElement>('music'), ambience = element<HTMLButtonElement>('ambience');
  sound.addEventListener('click', () => { sound.textContent = `音效：${audio.combat.toggle() ? '开' : '关'}`; sound.setAttribute('aria-pressed', String(audio.combat.enabled)); }, { signal });
  music.addEventListener('click', () => { audio.music.enabled = !audio.music.enabled; music.textContent = `音乐：${audio.music.enabled ? '开' : '关'}`; music.setAttribute('aria-pressed', String(audio.music.enabled)); }, { signal });
  ambience.addEventListener('click', () => { audio.environment.enabled = !audio.environment.enabled; ambience.textContent = `环境声音：${audio.environment.enabled ? '开' : '关'}`; ambience.setAttribute('aria-pressed', String(audio.environment.enabled)); }, { signal });
  detail.addEventListener('change', () => view.setResolution(detail.value === '640' ? 640 : detail.value === '1280' ? 1280 : 1920), { signal });
  element<HTMLSelectElement>('quality').addEventListener('change', event => view.setQuality((event.target as HTMLSelectElement).value === 'low'), { signal });
  const compare = element<HTMLButtonElement>('quality-compare');
  const qualityInputs = [...document.querySelectorAll<HTMLInputElement>('[data-quality-effect]')];
  const syncQuality = () => {
    const all = qualityInputs.every(input => view.quality[input.dataset.qualityEffect as QualityEffect].value > 0);
    compare.textContent = `画质对比：${view.quality.enhanced ? all ? '优化' : '自定义' : '基础'}`; compare.setAttribute('aria-pressed', String(view.quality.enhanced));
    for (const input of qualityInputs) { input.checked = view.quality[input.dataset.qualityEffect as QualityEffect].value > 0; input.disabled = !view.quality.enhanced; }
  };
  compare.addEventListener('click', () => { view.setEnhanced(!view.quality.enhanced); syncQuality(); }, { signal });
  for (const input of qualityInputs) input.addEventListener('change', () => { view.setQualityEffect(input.dataset.qualityEffect as QualityEffect, input.checked); syncQuality(); }, { signal });
  element('fullscreen').addEventListener('click', () => {
    void document.querySelector<HTMLElement>('.match-shell')!.requestFullscreen().catch(() => { element('selection').textContent = '当前窗口无法全屏，可在浏览器中打开后重试。'; });
  }, { signal });
  let previous = performance.now(), raf = 0, lastStatus = -1, selected: number | null = null;
  const keys = new Set<string>();
  let pointer: Point | null = null;
  const followButton = element<HTMLButtonElement>('follow');
  function syncFollow(): void { followButton.textContent = `跟随英雄：${view.following ? '开' : '关'}`; }
  function focusScene(): void {
    const target = artView(), gameplay = scenario.value === 'match'; view.following = false;
    const frameWidth = scenario.value === 'ice' ? 680 : (scenario.value === 'overview' || scenario.value === 'layout') ? 6200 : scenario.value === 'central' || scenario.value === 'combat' ? 1770 : scenario.value === 'sanctuary' ? 1300 : 900;
    view.cameraRig.setZoom(gameplay ? GAMEPLAY_VIEW.zoom : Math.min(target.zoom, 270 * view.cameraRig.size.width / view.cameraRig.size.height / frameWidth));
    view.cameraRig.lookAt(gameplay ? host.match.hero('blue') : bridgePoint(target.u, target.v)); syncFollow();
    const reference = element<HTMLAnchorElement>('art-reference');
    const sources: Record<string, string> = { '01-overview.png': overviewReference, '02-sanctuary.png': sanctuaryReference, '03-outer-tower.png': towerReference, '04-central-bridge.png': centralReference };
    reference.href = sources[target.source];
  }
  if (view.paintedArt) {
    focusScene();
  }
  function targetAim(point: Point): Point | null {
    const actor = host.match.entity(view.pickActor(point));
    return actor && actor.hp > 0 ? { x: actor.x, y: actor.y } : view.ground(point);
  }
  function cast(ability: AbilityKey): void {
    setAttackSelecting(false);
    const aim = pointer ? targetAim(pointer) : null;
    if (!aim) { element('selection').textContent = '先将鼠标移到地面或目标，再施放技能。'; return; }
    const targeted = ability === 'e' ? host.match.dashTarget(aim) : ability === 'r' ? host.match.rTarget('blue') : undefined;
    if (targeted && !view.canSeeEntity(targeted)) { element('selection').textContent = '目标不在我方视野内。'; return; }
    const accepted = host.command({ kind: 'cast', ability, point: aim });
    element('selection').textContent = `${ability.toUpperCase()}：${accepted ? '已释放' : '检查冷却、目标、击飞或当前动作'}。`;
  }
  const castSummoner = (key: 'd' | 'f') => {
    if (!pointer) return;
    const point = targetAim(pointer);
    if (point) host.command({ kind: 'summoner', key, point, targetId: view.pickActor(pointer) });
  };
  const hud = mountThreeHud({ cast, summoner: castSummoner, canSee: entity => view.canSeeEntity(entity),
    stop: () => { setAttackSelecting(false); host.command({ kind: 'stop' }); }, flute: () => { host.command({ kind: 'flute' }); },
    resume: () => { if (host.match.phase === 'ended') restart(); else if (host.match.phase === 'paused') host.pause(); },
  }, signal);
  view.onFrame = frame => {
    const { match } = frame;
    const selectedEntity = match.entity(selected);
    if (selectedEntity && !view.canSeeEntity(selectedEntity)) { selected = null; view.selectedId = null; element('target-readout').hidden = true; }
    const attackTarget = match.entity(match.hero('blue').targetId);
    if (attackTarget && !view.canSeeEntity(attackTarget)) host.command({ kind: 'stop' });
    if (match.phase !== 'playing' || match.hero('blue').hp <= 0) setAttackSelecting(false);
    audio.update(view.perceivedFrame(frame), view.cameraRig.focus, view.cameraRig.camera.right - view.cameraRig.camera.left, !document.hidden);
    if (performance.now() - lastStatus < 200) return; lastStatus = performance.now();
    hud.update(match, selected);
    const h = match.hero('blue'), target = match.entity(selected);
    const cooldowns = (['q', 'w', 'e', 'r'] as const).map(key => `${key.toUpperCase()} ${Math.max(0, h.abilities[key] - match.time).toFixed(1)}`).join(' / ');
    element('combat-hud').textContent = `生命 ${Math.ceil(h.hp)} / ${h.maxHp} · 剑意 ${Math.floor(h.flow ?? 0)} / 100 · ${cooldowns} · D 闪现 ${Math.ceil(Math.max(0, match.summonerCooldowns.blue.d - match.time))} · F 点燃 ${Math.ceil(Math.max(0, match.summonerCooldowns.blue.f - match.time))} · 补刀 ${match.cs.blue}`;
    status.textContent = `${view.presentation === 'art' ? (view.paintedArt ? artView().label : '旧 3D 样板') : 'P1 灰盒'} · ${match.phase} · ${match.time.toFixed(2)}s · HP ${Math.round(h.hp)}/${h.maxHp} · 缩放 ${view.cameraRig.zoom} · ${view.cameraRig.elevation}° · 内部 ${view.renderer.domElement.width}×${view.renderer.domElement.height} · 调用 ${view.renderer.info.render.calls} · 目标 ${target ? `${target.id} HP ${Math.round(target.hp)}` : '无'} · 冷却 ${cooldowns}${view.presentation === 'gray' ? ` · Q 范围 ${ABILITIES.q.range}` : ''}${view.environment.textureErrors.length || view.central.errors.length || view.painted.errors.length || view.landmarks.errors.length || view.details.errors.length || view.smallDetails.errors.length || view.architecturalIce.errors.length || view.poros.errors.length || view.sprites.errors.length ? ' · 部分素材加载失败，请检查本地服务' : ''}`;
    if (view.combat.sprites.errors.length || audio.combat.failed || audio.music.failed || audio.environment.failed) status.textContent += ' · 部分特效或音频加载失败，请刷新重试';
  };
  const listen = <K extends keyof HTMLElementEventMap>(node: HTMLElement, type: K, fn: (event: HTMLElementEventMap[K]) => void) => node.addEventListener(type, fn, { signal });
  const mapDrag = new MapDrag();
  function setAttackSelecting(enabled: boolean): void {
    view.attackSelecting = enabled;
    viewport.dataset.attackSelecting = String(enabled);
  }
  let capturedPointer: number | null = null;
  const cancelDrag = () => {
    mapDrag.cancel(); delete viewport.dataset.dragging;
    const id = capturedPointer; capturedPointer = null;
    if (id !== null && viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
  };
  const panDrag = (delta: Point | null) => {
    if (!delta) return; view.pan(delta.x, delta.y); viewport.dataset.dragging = 'true'; syncFollow();
  };
  listen(viewport, 'contextmenu', event => event.preventDefault());
  listen(viewport, 'pointermove', event => {
    pointer = { x: event.clientX, y: event.clientY };
    if (mapDrag.active && !(event.buttons & 1)) cancelDrag();
    panDrag(mapDrag.move(event.pointerId, pointer)); view.aim = targetAim(pointer);
  });
  listen(viewport, 'pointerdown', event => {
    viewport.focus(); pointer = { x: event.clientX, y: event.clientY };
    const id = view.pickActor(pointer), entity = host.match.entity(id);
    if (event.button === 0 && event.isPrimary) {
      if (view.attackSelecting && host.match.phase === 'playing') {
        event.preventDefault(); cancelDrag(); setAttackSelecting(false);
        if (entity && entity.team === 'red' && entity.hp > 0) {
          if (host.command({ kind: 'attack', id: entity.id })) view.combat.showMove(entity, host.match.time, true);
          selected = entity.id; view.selectedId = entity.id;
        } else {
          const point = view.ground(pointer);
          if (point && host.command({ kind: 'attack-move', point })) view.combat.showMove(point, host.match.time, true);
          selected = null; view.selectedId = null;
        }
        return;
      }
      event.preventDefault(); cancelDrag(); mapDrag.begin(event.pointerId, pointer, id);
      capturedPointer = event.pointerId; viewport.setPointerCapture(event.pointerId);
    }
    if (event.button === 2 && !mapDrag.active) {
      setAttackSelecting(false);
      if (entity && entity.team === 'red' && entity.hp > 0) { if (host.command({ kind: 'attack', id: entity.id })) view.combat.showMove(entity, host.match.time, true); }
      else { const point = view.ground(pointer); if (point && host.command({ kind: 'move', point })) view.combat.showMove(point, host.match.time); }
    }
  });
  listen(viewport, 'pointerup', event => {
    if (event.button !== 0) return;
    const result = mapDrag.end(event.pointerId, { x: event.clientX, y: event.clientY });
    if (result) { panDrag(result.pan); if (result.click) { selected = result.target; view.selectedId = result.target; } }
    delete viewport.dataset.dragging;
    capturedPointer = null;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  });
  listen(viewport, 'pointercancel', cancelDrag); listen(viewport, 'lostpointercapture', cancelDrag);
  viewport.addEventListener('wheel', event => {
    event.preventDefault(); const levels = [.13, .25, .4, .5, .6, 1, 1.5];
    const current = view.cameraRig.zoom;
    const next = event.deltaY < 0 ? levels.find(level => level > current + .001) ?? levels[levels.length - 1] : [...levels].reverse().find(level => level < current - .001) ?? levels[0];
    view.cameraRig.setZoom(next);
  }, { signal, passive: false });
  window.addEventListener('keydown', event => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
    const key = event.key.toLowerCase();
    if (['a', 'escape', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
    keys.add(key); if (event.repeat) return;
    if (key === 'escape' && view.attackSelecting) { setAttackSelecting(false); return; }
    if (key === 'a' && host.match.phase === 'playing' && host.match.hero('blue').hp > 0) { cancelDrag(); setAttackSelecting(true); }
    if (['q', 'w', 'e', 'r'].includes(key)) cast(key as AbilityKey);
    if (key === 'd' || key === 'f') castSummoner(key);
    if (key === '3') { event.preventDefault(); host.command({ kind: 'flute' }); }
    if (!event.ctrlKey&&!event.altKey&&!event.metaKey&&['1','2','4'].includes(key)) { event.preventDefault(); audio.combat.emote(key==='1'?'joke':key==='2'?'taunt':'laugh',host.match); }
    if (key === 's') { setAttackSelecting(false); host.command({ kind: 'stop' }); }
    if (key === 'escape') host.pause();
    if (key === 'y') { view.following = !view.following; syncFollow(); }
  }, { signal });
  window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()), { signal });
  const pauseHidden = () => { keys.clear(); cancelDrag(); setAttackSelecting(false); if (host.match.phase === 'playing') host.pause(); audio.stop(); previous = performance.now(); };
  window.addEventListener('blur', pauseHidden, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseHidden(); previous = performance.now(); }, { signal });
  listen(element('pause'), 'click', () => host.pause());
  const restart = () => {
    cancelDrag();
    setAttackSelecting(false);
    audio.stop(); syncEnvironment(); host.restart(); selected = null; view.selectedId = null;
    view.following = false;
    if (view.paintedArt) focusScene();
    previous = performance.now(); syncFollow();
  };
  listen(element('restart'), 'click', restart); listen(scenario, 'change', restart);
  listen(followButton, 'click', () => { view.following = !view.following; syncFollow(); });
  const look = (point: Point) => { view.following = false; view.cameraRig.lookAt(point); syncFollow(); };
  listen(element('sample'), 'click', () => { if (view.paintedArt) focusScene(); else look(bridgePoint(CENTRAL_BRIDGE.focusU, 0)); });
  listen(element('middle'), 'click', () => look(bridgePoint(0, 0)));
  const elevation = element<HTMLSelectElement>('elevation'), texture = element<HTMLSelectElement>('texture');
  if (view.presentation === 'art') {
    view.cameraRig.setElevation(CENTRAL_BRIDGE.cameraElevation); elevation.value = String(CENTRAL_BRIDGE.cameraElevation);
  }
  listen(elevation, 'change', () => view.cameraRig.setElevation(Number(elevation.value)));
  listen(texture, 'change', () => view.setTexture(Number(texture.value) as 32 | 64));
  listen(lookSelect, 'change', () => {
    view.presentation = lookSelect.value === 'gray' ? 'gray' : 'art';
    view.paintedArt = lookSelect.value === 'art';
    syncEnvironment();
    texture.disabled = view.presentation === 'art';
    elevation.disabled = view.paintedArt;
    if (view.presentation === 'art') { view.cameraRig.setElevation(CENTRAL_BRIDGE.cameraElevation); elevation.value = String(CENTRAL_BRIDGE.cameraElevation); }
    view.cameraRig.setZoom(view.paintedArt ? PAINTED_MAP.zoom : .6);
    if (view.paintedArt) focusScene();
  });
  texture.disabled = view.presentation === 'art';
  elevation.disabled = view.paintedArt;
  function frame(now: number): void {
    const dt = Math.min(Math.max(0, now - previous) / 1000, 0.25); previous = now;
    const dx = Number(keys.has('arrowright')) - Number(keys.has('arrowleft'));
    const dy = Number(keys.has('arrowdown')) - Number(keys.has('arrowup'));
    if (dx || dy) { view.pan(dx * 280 * dt, dy * 280 * dt); syncFollow(); }
    view.recenterHeld = keys.has(' ');
    // Refresh ground aim after any camera motion; the pointer's client position is unchanged.
    if (pointer) view.aim = targetAim(pointer);
    host.update(dt); raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  const dispose = () => { cancelAnimationFrame(raf); cancelDrag(); abort.abort(); audio.dispose(); host.dispose(); };
  window.addEventListener('pagehide', dispose, { once: true, signal });
  if (import.meta.hot) import.meta.hot.dispose(dispose);
}
