import {mkdir,writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';import {join} from 'node:path';import{pathToFileURL}from'node:url';
const{chromium}=await import(pathToFileURL(join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')).href);
const output='docs/visual-validation/2026-10-19/yasuo-voice';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),errors=[];
try{
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto('http://127.0.0.1:5173/assets/audio/yasuo-voice-zh-v1/index.html',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{
  const[{AudioFeedback},{Match}]=await Promise.all([import('/src/ui/AudioFeedback.ts'),import('/src/game/Match.ts')]);
  const match=new Match({ai:false,waves:false});match.start();Object.assign(match.hero('red'),{x:10000,y:10000});
  const audio=new AudioFeedback();window.voiceProbe={match,audio};
  const button=document.createElement('button');button.id='unlock-test';button.textContent='验证语音';button.onclick=()=>{audio.unlock();audio.updateMovement(match,true);};document.body.prepend(button);
 });
 await page.locator('#unlock-test').click();
 const result=await page.evaluate(async()=>{
  const{match,audio}=window.voiceProbe,ctx=audio.audioContext,voice=audio.speech;await voice.load(ctx);
  const clips=[...voice.buffers.entries()].map(([id,buffer])=>{let peak=0,energy=0;const data=buffer.getChannelData(0);for(const value of data){peak=Math.max(peak,Math.abs(value));energy+=value*value;}return{id,duration:buffer.duration,peak,rms:Math.sqrt(energy/data.length)};});
  const destination=ctx.createMediaStreamDestination(),createGain=ctx.createGain.bind(ctx);
  ctx.createGain=()=>{const gain=createGain(),connect=gain.connect.bind(gain);gain.connect=(target,...args)=>{if(target===ctx.destination)connect(destination);return connect(target,...args);};return gain;};
  const recorder=new MediaRecorder(destination.stream,{mimeType:'audio/webm;codecs=opus'}),chunks=[];
  recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};const done=new Promise(resolve=>recorder.onstop=resolve);recorder.start();
  const trace=[];const snap=label=>trace.push({label,active:[...voice.active.entries()].map(([team,v])=>({team,group:v.group}))});
  voice.speak('Move2DStandard',ctx);snap('move');await new Promise(r=>setTimeout(r,1500));
  match.time=2;audio.updateMovement(match,true);const hero=match.hero('blue');
  audio.play({type:'cast',team:'blue',ability:'q',sourceId:hero.id,sourceKind:'hero',x:hero.x,y:hero.y});snap('q');await new Promise(r=>setTimeout(r,1500));
  match.time=4;audio.updateMovement(match,true);audio.play({type:'cast',team:'blue',ability:'r',sourceId:hero.id,sourceKind:'hero',x:hero.x,y:hero.y});snap('r');await new Promise(r=>setTimeout(r,1800));
  match.time=6;hero.hp=0;match.phase='ended';audio.updateMovement(match,true);audio.play({type:'kill',team:'red',targetId:hero.id,targetKind:'hero',x:hero.x,y:hero.y});snap('death');await new Promise(r=>setTimeout(r,2000));
  recorder.stop();await done;const blob=new Blob(chunks,{type:'audio/webm'}),bytes=await blob.arrayBuffer(),recorded=await ctx.decodeAudioData(bytes.slice(0));let recordedPeak=0;for(const v of recorded.getChannelData(0))recordedPeak=Math.max(recordedPeak,Math.abs(v));
  audio.stop();const stopped=!voice.talking;audio.dispose();
  const data=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob);});
  return{clips,trace,stopped,recorded:{duration:recorded.duration,peak:recordedPeak},data};
 });
 await writeFile(`${output}/integration.webm`,Buffer.from(result.data,'base64'));delete result.data;
 // Exercise the actual Three.js entry point's keyboard binding after a real unlock.
 await page.addInitScript(()=>{window.voiceStarts=[];const start=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(...args){window.voiceStarts.push(this.buffer?.duration??0);return start.apply(this,args);};});
 await page.goto('http://127.0.0.1:5173/three.html?map=howling&scene=central',{waitUntil:'networkidle'});
 await page.locator('#viewport').click({position:{x:30,y:30}});await page.waitForTimeout(1800);const before=await page.evaluate(()=>window.voiceStarts.length);
 await page.keyboard.press('1');await page.waitForTimeout(150);result.keyboard=await page.evaluate(before=>({before,after:window.voiceStarts.length,started:window.voiceStarts.slice(before)}),before);
 const failures=[];
 if(result.clips.length!==91||result.clips.some(c=>c.duration<=0||c.rms<.001||c.peak>1))failures.push('decode/coverage/audio levels');
 if(!result.stopped||result.recorded.peak<.01)failures.push('playback/stop');
 if(result.trace.some(s=>!s.active.length))failures.push('missing event speech');
 if(result.keyboard.after<=result.keyboard.before)failures.push('actual game emote key');
 await writeFile(`${output}/report.json`,JSON.stringify({...result,errors,failures},null,2));
 await writeFile(`${output}/preview.html`,`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>亚索完整中文语音</title><style>body{background:#101b26;color:#dce8ef;font:17px/1.8 system-ui;max-width:900px;margin:40px auto;padding:20px}a{color:#9dd5ff}audio{display:block;width:100%;margin:20px 0}</style><h1>亚索原版中文语音已接入</h1><p>基础皮肤 91 条独立语音、29 组事件。移动、攻击、技能、死亡自动触发；按 1 玩笑、2 嘲讽、4 笑声，3 保留吹箫。首次操作后才启用音频。</p><p><a href="/three.html?map=howling&scene=combat">进入游戏</a> · <a href="/assets/audio/yasuo-voice-zh-v1/index.html">完整分类试听库</a></p><p>以下是实际 AudioFeedback 音频引擎的事件注入录音：移动 → Q → R → 死亡，用于检查打断及单语音通道；并非一段真实比赛录像。</p><audio controls src="integration.webm"></audio><p>专属英雄互动素材完整保留。当前对局仅有亚索，对剑圣、锐雯、慎、永恩的专属台词不自动触发。</p></html>`);
 console.log(JSON.stringify({clips:result.clips.length,recorded:result.recorded,trace:result.trace,keyboard:result.keyboard,errors,failures}));if(errors.length||failures.length)process.exitCode=1;
}finally{await browser.close();}
