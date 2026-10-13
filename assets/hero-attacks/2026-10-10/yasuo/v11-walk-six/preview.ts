import { frameAt, sequenceAt, type Segment, type Timing } from './timing';
type Kind = Exclude<Segment, 'walk'>;
interface Clip extends Timing { id: Kind; name: string; width: number; height: number; frame_count: number; columns: number; rows: number; webp: string; gif: string; sheet: string; prompt: string; edge_contact_frames: number[] }
interface Variant { id: number; clips: Clip[]; review: string; visual_acceptance: string }
interface Study { variants: Variant[]; walk: Timing & { frames: string[] }; completed_clips: number; expected_clips: number; complete_variants: number; requested_omission: {variant:number;clip:Kind} | null; credits_consumed: number | null; credits_after: number | null; prompts: Record<Kind,string> }
interface Player { variant: Variant; main: HTMLCanvasElement; phase: HTMLOutputElement; singles: Record<Kind,HTMLCanvasElement>; frames: Record<Segment,HTMLImageElement[]>; timings: Record<Segment,Timing> }
const kinds: readonly Kind[] = ['entry','second','repeat'];
const names: Record<Segment,string> = {walk:'现有走路',entry:'① 走路→首击结束',second:'② 首击→第二击结束',repeat:'③ 第二击→首击结束'};
function node<T extends HTMLElement>(id: string): T { const element = document.getElementById(id); if (!element) throw new Error(`Missing ${id}`); return element as T; }
const play = node<HTMLButtonElement>('play'), restart = node<HTMLButtonElement>('restart');
const previous = node<HTMLButtonElement>('previous'), next = node<HTMLButtonElement>('next');
const rateInput = node<HTMLSelectElement>('rate'), zoomInput = node<HTMLSelectElement>('zoom');
const status = node<HTMLOutputElement>('status'), container = node('variants');
let players: Player[] = [], elapsed = 0, playing = true, last: number | null = null, rate = 1, zoom = 2, loading = false;
function url(path: string): string { return new URL(path, import.meta.url).href; }
async function loadImage(path: string): Promise<HTMLImageElement> { const image = new Image(); image.src = url(path); await image.decode(); return image; }
function canvas(label: string): HTMLCanvasElement { const result = document.createElement('canvas'); result.width = 176; result.height = 176; result.className = 'pixel'; result.setAttribute('aria-label',label); return result; }
function draw(target: HTMLCanvasElement, image: HTMLImageElement): void { const ctx = target.getContext('2d')!; ctx.imageSmoothingEnabled = false; ctx.clearRect(0,0,176,176); ctx.drawImage(image,0,0); }
async function clipFrames(clip: Clip): Promise<HTMLImageElement[]> {
  const sheet = await loadImage(clip.sheet);
  if (sheet.naturalWidth !== clip.columns * 176 || sheet.naturalHeight !== clip.rows * 176) throw new Error('PNG图集尺寸不符合索引');
  // Copy native cells to data URLs for playback; original deliverables are never edited.
  const frames: HTMLImageElement[] = [];
  for (let i=0;i<clip.frame_count;i++) { const cell = canvas('原生帧'); const ctx = cell.getContext('2d')!; ctx.imageSmoothingEnabled=false; ctx.drawImage(sheet,(i%clip.columns)*176,Math.floor(i/clip.columns)*176,176,176,0,0,176,176); const image = new Image(); image.src=cell.toDataURL('image/png'); await image.decode(); frames.push(image); }
  return frames;
}
function links(clip: Clip): HTMLElement {
  const nav=document.createElement('nav'); nav.className='downloads';
  for(const [label,path] of [['WebP',clip.webp],['GIF',clip.gif],['PNG图集',clip.sheet]]) { const a=document.createElement('a'); a.textContent=label; a.href=url(path); a.download=`yasuo-${clip.id}.${path.split('.').at(-1)}`; nav.append(a); }
  return nav;
}
function scale(): void { for(const player of players) { player.main.style.width=`${176*zoom}px`; player.main.style.height=`${176*zoom}px`; } }
function render(): void {
  for(const player of players) {
    const sample=sequenceAt(elapsed,player.timings);
    draw(player.main,player.frames[sample.segment][sample.frame]);
    player.main.dataset.phase=sample.segment; player.main.dataset.frame=String(sample.frame+1); player.main.dataset.cycle=String(sample.cycle);
    player.phase.value=`${names[sample.segment]} · 第${sample.frame+1}/8帧${sample.cycle ? ` · 攻击循环${sample.cycle}` : ''}`;
    for(const kind of kinds) { const frame=frameAt(elapsed,player.timings[kind]); draw(player.singles[kind],player.frames[kind][frame]); player.singles[kind].dataset.frame=String(frame+1); }
  }
  status.value=players.length ? `${playing?'播放':'暂停'} · ${rate}× · ${Math.floor(elapsed/100)/10}s` : '等待完整版本';
}
async function load(): Promise<void> {
  if(loading) return; loading=true;
  for(const button of [play,restart,previous,next]) button.disabled=true;
  node('error').hidden=true; status.value='加载素材…';
  try {
    const response=await fetch(url('study.json'),{cache:'no-store'}); if(!response.ok) throw new Error(`素材索引 HTTP ${response.status}`);
    const study=await response.json() as Study;
    node('facts').textContent=`已生成 ${study.completed_clips}/${study.expected_clips} 条 · ${study.complete_variants}/6 个完整版本 · 每段176×176、8帧。${study.requested_omission?'第1版第二段按用户要求保留缺失、不补交。':''}走路源像素不缩放，只增加透明画布。`;
    node('cost').textContent=study.credits_consumed===null?'积分待全部完成后核对，未额外重试动画。':`本轮余额减少 ${study.credits_consumed} 积分（包含端点生成及去特效修正），余额 ${study.credits_after}。`;
    const walk=await Promise.all(study.walk.frames.map(loadImage));
    if(walk.some(image=>image.naturalWidth!==176 || image.naturalHeight!==176)) throw new Error('走路准备帧尺寸错误');
    players=[]; container.replaceChildren();
    for(let id=1;id<=6;id++) {
      const section=document.createElement('article'); section.className='variant'; section.id=`variant-${id}`; section.dataset.variant=String(id);
      const title=document.createElement('h2'); title.textContent=`第 ${id} 版`; section.append(title); container.append(section);
      const variant=study.variants.find(item=>item.id===id);
      if(!variant) { const pending=document.createElement('p'); pending.textContent='尚未生成完三段动画，等待素材。'; section.append(pending); continue; }
      if(variant.clips.length!==3) {
        const note=document.createElement('p'); note.className='review'; note.textContent=variant.review; section.append(note);
        const row=document.createElement('div');row.className='clips';section.append(row);
        for(const kind of kinds) {
          const box=document.createElement('div');box.className='clip';const heading=document.createElement('h3');heading.textContent=names[kind];box.append(heading);row.append(box);
          const clip=variant.clips.find(item=>item.id===kind);
          if(!clip) {const missing=document.createElement('p');missing.textContent=study.requested_omission?.variant===id && study.requested_omission.clip===kind?'缺失 · 未补交':'生成中';box.append(missing);continue;}
          const image=await loadImage(clip.webp);image.width=176;image.height=176;image.className='pixel';image.alt=`第${id}版 ${clip.name} 原速`;box.append(image,links(clip));
        }
        const info=document.createElement('p');info.textContent='不完整版本只显示原始WebP循环，不受上方暂停与慢放控制。';section.append(info);
        continue;
      }
      const main=canvas(`第${id}版完整走路攻击循环`), stage=document.createElement('div'); stage.className='main-stage'; stage.append(main); section.append(stage);
      const phase=document.createElement('output'); phase.className='phase'; section.append(phase);
      const row=document.createElement('div'); row.className='clips'; section.append(row);
      const decoded=await Promise.all(kinds.map(kind=>clipFrames(variant.clips.find(clip=>clip.id===kind)!)));
      const singles={} as Record<Kind,HTMLCanvasElement>, frames={walk,entry:decoded[0],second:decoded[1],repeat:decoded[2]} as Record<Segment,HTMLImageElement[]>;
      const timings: Record<Segment,Timing> = {walk:study.walk,entry:variant.clips.find(clip=>clip.id==='entry')!,second:variant.clips.find(clip=>clip.id==='second')!,repeat:variant.clips.find(clip=>clip.id==='repeat')!};
      for(let index=0;index<kinds.length;index++) {
        const kind=kinds[index], clip=variant.clips.find(item=>item.id===kind)!;
        frames[kind]=decoded[index]; timings[kind]=clip;
        const box=document.createElement('div'); box.className='clip'; const heading=document.createElement('h3'); heading.textContent=names[kind];
        const single=canvas(`第${id}版 ${clip.name}`); singles[kind]=single; const info=document.createElement('p'); info.className='metadata'; info.textContent=`8帧 / ${clip.duration_ms/1000}s / 176px`;
        box.append(heading,single,info,links(clip)); row.append(box);
      }
      const review=document.createElement('p'); review.className='review'; review.textContent=variant.review; section.append(review);
      const details=document.createElement('details'), summary=document.createElement('summary'); summary.textContent='展开三段全部原生帧'; details.append(summary);
      const gallery=document.createElement('div'); gallery.className='frames';
      for(const kind of kinds) for(let i=0;i<frames[kind].length;i++) { const cell=document.createElement('div'), label=document.createElement('p'); label.className='frame-label'; label.textContent=`${kind} / ${i+1}`; const frame=canvas(`第${id}版 ${kind} 第${i+1}帧`); draw(frame,frames[kind][i]); cell.append(label,frame); gallery.append(cell); }
      details.append(gallery); section.append(details);
      players.push({variant,main,phase,singles,frames,timings});
    }
    node('prompts').replaceChildren();
    for(const kind of kinds) { const p=document.createElement('p'); p.textContent=`${names[kind]}：${study.prompts[kind]}`; node('prompts').append(p); }
    elapsed=0; last=null; scale(); render();
    for(const button of [play,restart,previous,next]) button.disabled=players.length===0;
  } catch(error) { node('error').hidden=false; node('error').textContent=`预览加载失败：${error instanceof Error?error.message:String(error)}。可点击“刷新素材状态”。`; status.value='加载失败'; console.error(error); }
  finally { loading=false; }
}
function tick(now: number): void { if(last!==null && playing && !loading && players.length) elapsed+=(now-last)*rate; last=now; if(!loading && players.length) render(); requestAnimationFrame(tick); }
restart.addEventListener('click',()=>{elapsed=0;playing=true;play.textContent='暂停';render();});
play.addEventListener('click',()=>{playing=!playing;play.textContent=playing?'暂停':'播放';render();});
function step(delta: number): void { playing=false;play.textContent='播放';elapsed=Math.max(0,Math.floor(elapsed/100)*100+delta*100);render(); }
previous.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
rateInput.addEventListener('change',()=>{rate=Number(rateInput.value);render();});zoomInput.addEventListener('change',()=>{zoom=Number(zoomInput.value);scale();});
node('reload').addEventListener('click',()=>void load());
void load();requestAnimationFrame(tick);
