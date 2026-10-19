import stablePage from '../../index.html?raw';
import { mountLeagueHud } from './LeagueHud';
import type { Match } from '../game/Match';
import type { AbilityKey, Entity } from '../game/types';
import type { SummonerKey } from '../game/SummonerSpells';
import { shieldRemaining } from '../game/YasuoPassive';
import { stormReady } from '../game/YasuoStorm';

const clock = (time: number) => `${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60).toString().padStart(2, '0')}`;

/** Reuse the stable entry's markup, icons and styles with the current simulation. */
export function mountThreeHud(actions: {
  cast: (key: AbilityKey) => void;
  summoner: (key: SummonerKey) => void;
  stop: () => void;
  flute: () => void;
  resume: () => void;
  canSee?: (entity: Entity) => boolean;
}, signal: AbortSignal): { update: (match: Match, selected: number | null) => void } {
  const shell = document.querySelector<HTMLElement>('main')!;
  const viewport = document.querySelector<HTMLElement>('#viewport')!;
  const template = new DOMParser().parseFromString(stablePage, 'text/html');
  shell.classList.add('match-shell');
  viewport.classList.add('arena');
  document.body.classList.add('three-ui');
  for (const selector of ['.scoreboard', '.player-hud', '.target-readout', '.match-overlay']) {
    const node = template.querySelector<HTMLElement>(selector)!;
    node.querySelector('.match-actions')?.remove();
    shell.append(document.importNode(node, true));
  }
  document.querySelector('nav')!.classList.add('match-actions');
  const controls = document.querySelector('#status')!.nextElementSibling!;
  controls.classList.add('controls-strip');
  mountLeagueHud(false, { ...actions, focusTarget: viewport });
  const content = document.querySelector('.hud-menu-content')!;
  const diagnostics = document.createElement('details');
  const summary = document.createElement('summary'); summary.textContent = '场景与诊断';
  diagnostics.append(summary);
  for (const selector of ['header', '.notice', '#quality-options', '#combat-hud', '#status', '#selection']) {
    diagnostics.append(document.querySelector(selector)!);
  }
  content.append(diagnostics);
  const node = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  node('hero-animation-state').hidden = true;
  node('match-overlay').hidden = true;
  for (const key of ['q', 'w', 'e', 'r'] as const) {
    node(`ability-${key}`).addEventListener('click', () => { actions.cast(key); viewport.focus({ preventScroll: true }); }, { signal });
  }
  node('start-button').addEventListener('click', () => { actions.resume(); viewport.focus({ preventScroll: true }); }, { signal });

  return { update(match, selected) {
    const hero = match.hero('blue'), shield = shieldRemaining(hero, match.time), flow = hero.flow ?? 0;
    node<HTMLProgressElement>('hero-health').max = hero.maxHp;
    node<HTMLProgressElement>('hero-health').value = hero.hp;
    node<HTMLProgressElement>('hero-flow').value = flow;
    node('health-text').textContent = `${Math.ceil(hero.hp)} / ${hero.maxHp}${shield > 0 ? ` +${Math.ceil(shield)}盾` : ''}`;
    node('flow-text').textContent = `${Math.floor(flow)} / 100`;
    node('hero-flow').classList.toggle('flow-ready', flow >= 100);
    const passive = document.querySelector('.passive-slot')!;
    passive.classList.toggle('passive-ready', flow >= 100); passive.classList.toggle('passive-shielded', shield > 0);
    node('match-time').textContent = clock(match.time);
    node('blue-kills').textContent = String(match.deaths.red); node('red-kills').textContent = String(match.deaths.blue);
    node('player-kda').textContent = `${match.kills.blue}/${match.deaths.blue}/0`; node('player-cs').textContent = String(match.cs.blue);
    for (const key of ['q', 'w', 'e', 'r'] as const) {
      const remaining = Math.max(0, hero.abilities[key] - match.time);
      node(`ability-${key}`).classList.toggle('cooling', remaining > 0);
      node(`cooldown-${key}`).textContent = remaining > 0 ? (remaining < 10 ? remaining.toFixed(1) : String(Math.ceil(remaining))) : '';
    }
    node('ability-q').querySelector('.ability-name')!.textContent = stormReady(hero, match.time) ? 'Q3 · 旋风' : '斩钢闪';
    const rTarget = match.rTarget('blue');
    node('ability-r').classList.toggle('followup-ready', !!rTarget && (actions.canSee?.(rTarget) ?? true));
    for (const key of ['d', 'f'] as const) {
      const remaining = Math.max(0, match.summonerCooldowns.blue[key] - match.time);
      node(`summoner-${key}`).classList.toggle('cooling', remaining > 0);
      node(`summoner-cooldown-${key}`).textContent = remaining > 0 ? String(Math.ceil(remaining)) : '';
    }
    const target = match.entity(selected);
    node('target-readout').hidden = !target || target.hp <= 0;
    if (target && target.hp > 0) {
      const names = { hero: '亚索', melee: '近战兵', ranged: '远程兵', tower: '防御塔' };
      node('target-name').textContent = `${target.team === 'blue' ? '友方' : '敌方'} · ${names[target.kind]}`;
      node('target-health').textContent = `${Math.ceil(target.hp)} / ${target.maxHp}`;
      node<HTMLProgressElement>('target-bar').value = target.hp / target.maxHp * 100;
    }
    node('match-overlay').hidden = match.phase === 'playing';
    const ended = match.phase === 'ended', won = match.result?.winner === 'blue';
    node('overlay-kicker').textContent = ended ? (won ? 'VICTORY' : 'MATCH COMPLETE') : 'TAKE A BREATH';
    node('overlay-symbol').textContent = ended ? '✦' : 'Ⅱ';
    node('overlay-title').textContent = ended ? (won ? '这条中路，属于你。' : '对局结束') : '稍作休息';
    node('overlay-description').textContent = ended ? `对局用时 ${clock(match.time)} · 补刀 ${match.cs.blue} : ${match.cs.red}` : '比赛时间、兵线和技能冷却已暂停。';
    node('start-button').textContent = ended ? '再来一局 ↻' : '继续对线 →';
    node('pause').textContent = match.phase === 'paused' ? '继续 · Esc' : '暂停 · Esc';
    node<HTMLButtonElement>('pause').disabled = ended;
  } };
}
