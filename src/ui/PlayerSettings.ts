import './player-settings.css';

/** Keep existing controls and event handlers, showing only player preferences. */
export function mountPlayerSettings(shell: HTMLElement): void {
  const menu=document.createElement('details');menu.className='hud-menu';
  const summary=document.createElement('summary');summary.textContent='设置';
  const content=document.createElement('div');content.className='hud-menu-content';
  const internal=document.createElement('div');internal.className='settings-internal';internal.hidden=true;
  internal.append(document.querySelector('.match-actions')!,document.querySelector('.controls-strip')!);
  for(const [id,title] of [['operation-settings','操作设置'],['graphics-settings','画质设置']]){
    const section=document.createElement('section');section.className='settings-section';section.setAttribute('aria-labelledby',`${id}-title`);
    const heading=document.createElement('h2');heading.id=`${id}-title`;heading.textContent=title;
    const controls=document.createElement('div');controls.id=id;controls.className='settings-controls';
    section.append(heading,controls);content.append(section);
  }
  menu.append(summary,content);shell.append(menu,internal);
  const move=(id:string,selectors:string[])=>{
    const target=document.getElementById(id)!;
    for(const selector of selectors)for(const node of internal.querySelectorAll<HTMLElement>(selector)){
      target.append(node instanceof HTMLSelectElement ? node.closest('label')! : node);
    }
  };
  move('operation-settings',['#camera-button','#follow','#sound-button','#sound','#music','#ambience','[data-setting-group="operation"]']);
  move('graphics-settings',['#detail','#quality','#fullscreen','#quality-compare','[data-setting-group="graphics"]']);
}
