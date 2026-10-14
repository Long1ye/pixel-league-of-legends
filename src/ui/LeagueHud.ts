import qIcon from '../../assets/ui/2026-10-13/league-hud/icons/component_001.png?url';
import wIcon from '../../assets/ui/2026-10-13/league-hud/icons/component_004.png?url';
import eIcon from '../../assets/ui/2026-10-13/league-hud/icons/component_002.png?url';
import rIcon from '../../assets/ui/2026-10-13/league-hud/icons/component_003.png?url';
import portrait from '../../assets/hero-skills/2026-10-13/yasuo/q-v26-user-eight/bodies/s.png?url';
import {BALANCE,HOWLING_MAP} from '../game/config';
import './league-hud.css';

/** Move existing controls, retaining their ids, listeners and live game state. */
export function mountLeagueHud(practice:boolean):void {
 const shell=document.querySelector<HTMLElement>('.match-shell')!;
 if(practice||!HOWLING_MAP){
  const back=document.createElement('a');back.href='/?map=howling';back.textContent='← 返回冰桥对局';
  back.title='进入嚎哭深渊正常对局（重新开局）';
  back.style.cssText='position:absolute;right:14px;top:94px;z-index:7;padding:7px 12px;background:#0a151be8;border:1px solid #806b45;color:#dfd1ad;font-size:11px;text-decoration:none';
  shell.append(back);
 }
 document.body.classList.add('league-ui');
 for(const [key,url] of Object.entries({q:qIcon,w:wIcon,e:eIcon,r:rIcon})){
  const image=document.createElement('img');image.src=url;image.alt='';image.draggable=false;
  document.querySelector(`#ability-${key} .ability-glyph`)!.replaceChildren(image);
 }
 const face=document.createElement('img');face.src=portrait;face.alt='亚索';face.draggable=false;
 document.querySelector('.hero-portrait')!.replaceChildren(face);
 const menu=document.createElement('details');menu.className='hud-menu';
 const summary=document.createElement('summary');summary.textContent='选项 / 练习';
 const content=document.createElement('div');content.className='hud-menu-content';
 content.append(document.querySelector('.match-actions')!,document.querySelector('.controls-strip')!);
 const heading=document.createElement('p');heading.className='hud-menu-heading';heading.textContent=document.querySelector('h1')!.textContent;
 content.prepend(heading);menu.append(summary,content);shell.append(menu);
 const panels=Array.from(document.querySelectorAll<HTMLElement>('main > section:not(.match-shell)'));
 if(practice&&panels.length){const tools=document.createElement('details');tools.className='hud-practice';const s=document.createElement('summary');s.textContent='训练工具';tools.append(s);for(const panel of panels){panel.removeAttribute('style');tools.append(panel);}shell.append(tools);}
 const stats=document.createElement('div');stats.className='champion-stats';
 for(const [name,value] of [['攻击',BALANCE.hero.damage],['攻速',(1/BALANCE.hero.attackInterval).toFixed(2)],['移速',BALANCE.hero.speed],['射程',BALANCE.hero.range]]){
  const line=document.createElement('div');const label=document.createElement('span');const number=document.createElement('b');label.textContent=String(name);number.textContent=String(value);line.append(label,number);stats.append(line);
 }
 document.querySelector('.match-sidebar')!.prepend(stats);
 const caption=document.createElement('span');caption.className='hud-mode';caption.textContent=practice?'练习模式':'中路 SOLO · 1 对 1';shell.append(caption);
}
