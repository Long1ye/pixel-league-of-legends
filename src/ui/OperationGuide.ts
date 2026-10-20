import { ABILITIES } from '../game/config';
import type { AbilityKey } from '../game/types';
import './operation-guide.css';

const descriptions: Record<AbilityKey, string> = {
  q: '向鼠标方向出剑，伤害沿途敌人。连续命中积攒两层旋风后，下一次 Q 发射旋风并击飞敌人。',
  w: '朝鼠标方向立起风墙，拦截敌方飞行技能和远程普攻；无法阻挡防御塔攻击。',
  e: '鼠标指向附近敌方单位，突进穿过目标并造成伤害。同一目标短时间内不能重复突进，无法对空地释放。',
  r: '附近有被击飞的敌方英雄时可释放，瞬移至目标身边，延长击飞并造成伤害。可用 Q 的旋风击飞后接 R。',
};

/** Passive reference only: never consumes gameplay keys or advances tutorial steps. */
export function mountOperationGuide(shell: HTMLElement, practice: boolean): void {
  const scope = new AbortController();
  document.addEventListener('midline:dispose', () => scope.abort(), { once: true, signal: scope.signal });
  const guide = document.createElement('details');
  guide.className = `operation-guide${practice ? ' practice-guide' : ''}`;
  try { guide.open = localStorage.getItem('midline-operation-guide') !== 'closed'; }
  catch { guide.open = true; }
  const summary = document.createElement('summary');
  summary.textContent = '操作指南';
  const body = document.createElement('div'); body.className = 'operation-guide-body';
  const rows = (parent: HTMLElement, entries: readonly (readonly [string, string])[]) => {
    for (const [key, description] of entries) {
      const row = document.createElement('div'); row.className = 'operation-guide-row';
      const shortcut = document.createElement('kbd'); shortcut.textContent = key;
      const label = document.createElement('span'); label.textContent = description;
      row.append(shortcut, label); parent.append(row);
    }
  };
  rows(body, [
    ['右键', '地面移动 / 攻击敌人'],
    ['左键', '选择单位'],
    ['A → 左键', '攻击目标 / 向地面攻击移动'],
    ['Q W E R', '释放技能 · 悬停图标查看说明'],
    ['S', '停止行动'],
    ['Space', '按住将视角拉回英雄'],
    ['Y', '切换镜头跟随'],
  ]);
  const more = document.createElement('details'); more.className = 'operation-guide-more';
  const moreSummary = document.createElement('summary'); moreSummary.textContent = '更多操作';
  more.append(moreSummary);
  rows(more, [
    ['D / F', '闪现 / 点燃'],
    ['方向键', '移动镜头'],
    ['鼠标拖动', '左键 / 中键拖动地图'],
    ['滚轮', '调整视角缩放'],
    ['3', '吹箫 · 移动或受击打断'],
    ['Esc', '取消 A 选点 / 单人对局暂停'],
  ]);
  body.append(more); guide.append(summary, body); shell.append(guide);
  guide.addEventListener('toggle', () => {
    try { localStorage.setItem('midline-operation-guide', guide.open ? 'open' : 'closed'); }
    catch { /* Storage can be unavailable in private browser contexts. */ }
  });

  for (const key of ['q', 'w', 'e', 'r'] as const) {
    const button = shell.querySelector<HTMLElement>(`#ability-${key}`)!;
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip'; tooltip.id = `skill-description-${key}`;
    tooltip.role = 'tooltip'; tooltip.hidden = true;
    const title = document.createElement('strong'); title.textContent = `${key.toUpperCase()} · ${ABILITIES[key].name}`;
    const description = document.createElement('p'); description.textContent = descriptions[key];
    tooltip.append(title, description); shell.append(tooltip);
    button.setAttribute('aria-describedby', tooltip.id);
    button.removeAttribute('title');
    const sync = () => {
      tooltip.hidden = !(button.matches(':hover') || document.activeElement === button);
      if (tooltip.hidden) return;
      const rect = button.getBoundingClientRect();
      const left = Math.max(8, Math.min(window.innerWidth - tooltip.offsetWidth - 8, rect.left + rect.width / 2 - tooltip.offsetWidth / 2));
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${Math.max(8, rect.top - tooltip.offsetHeight - 12)}px`;
    };
    button.addEventListener('pointerenter', sync);
    button.addEventListener('pointerleave', sync);
    button.addEventListener('focus', sync);
    button.addEventListener('blur', sync);
    window.addEventListener('resize', sync, { signal: scope.signal });
  }
}
