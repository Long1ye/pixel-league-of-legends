from pathlib import Path
import json,re,subprocess,wave,hashlib,array,math,concurrent.futures
import imageio_ffmpeg
cache=Path('.cache/yasuo-voice-zh');root=Path('assets/audio/yasuo-voice-zh-v1');runtime=root/'runtime';runtime.mkdir(exist_ok=True)
decoded=cache/'decoded';decoded.mkdir(exist_ok=True);ff=imageio_ffmpeg.get_ffmpeg_exe()
events={}
for path in sorted((cache/'events').glob('*.txtp')):
 name=path.name.split(' ')[0].replace('.txtp','').removeprefix('Play_vo_Yasuo_')
 ids=list(dict.fromkeys(re.findall(r'/([0-9]+)\.wem #',path.read_text())))
 if ids:events[name]=ids
ids=sorted(set(key for group in events.values() for key in group))
def convert(key):
 source=cache/'wem'/f'{key}.wem';wav=decoded/f'{key}.wav';target=runtime/f'{key}.mp3'
 subprocess.run([str(Path('.cache/riot-audio-tools/vgmstream/vgmstream-cli.exe').resolve()),'-i','-o',str(wav),str(source)],capture_output=True,check=True)
 raw=subprocess.run([ff,'-v','error','-i',str(wav),'-f','f32le','-ac','1','-ar','22050','-'],capture_output=True,check=True).stdout
 samples=array.array('f',raw);peak=max(map(abs,samples));rms=math.sqrt(sum(x*x for x in samples)/len(samples));assert rms>.001
 gain=min(4,.70/peak,.105/rms)
 subprocess.run([ff,'-v','error','-y','-i',str(wav),'-af',f'volume={gain},afade=t=in:d=0.004','-ar','44100','-ac','1','-b:a','96k',str(target)],capture_output=True,check=True)
 return {'id':key,'file':target.name,'duration':len(samples)/22050,'gain':gain,'sourcePeak':peak,'sourceRms':rms,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: clips=list(pool.map(convert,ids))
manifest={'locale':'zh_CN','skin':'base','source':'source.json','events':events,'clips':clips}
bank_sources=set(re.findall(r'name="sourceID" value="([0-9]+)"',(cache/'bank.xml').read_text()))
assert bank_sources==set(ids),f'Voice bank coverage mismatch: {bank_sources-set(ids)}'
manifest['coverage']={'bankSoundSources':len(bank_sources),'packagedSoundSources':len(ids),'missing':[]}
(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(json.dumps({'clips':len(clips),'events':len(events),'seconds':round(sum(c['duration'] for c in clips),2),'bytes':sum(p.stat().st_size for p in runtime.glob('*.mp3')),'groups':{k:len(v) for k,v in events.items()}}))
cards=''.join('<section><h2>'+name+'</h2>'+''.join(f'<label>{key}<audio controls preload="none" src="runtime/{key}.mp3"></audio></label>' for key in group)+'</section>' for name,group in events.items())
(root/'index.html').write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>亚索原版中文完整基础语音库</title><style>body{background:#101b26;color:#dce8ef;font:15px system-ui;margin:32px}section{margin:24px 0;border-top:1px solid #405060}label{display:inline-flex;flex-direction:column;margin:8px}audio{width:270px}a{color:#9dd5ff}</style><h1>亚索原版中文 · 基础语音</h1><p>本机客户端基础皮肤语音事件，共 '+str(len(clips))+' 条独立音频；按原事件分类，所有随机变体保留。专属英雄互动也完整保留，当前对局无对应英雄时不自动触发。</p>'+cards+'<script>document.addEventListener("play",e=>{if(e.target.tagName==="AUDIO")document.querySelectorAll("audio").forEach(a=>{if(a!==e.target)a.pause()})},true)</script></html>',encoding='utf-8')
index=root/'index.html';index.write_text(index.read_text(encoding='utf-8').replace('<title>','<link rel="icon" href="data:,"><title>',1),encoding='utf-8')
