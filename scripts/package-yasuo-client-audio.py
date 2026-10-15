from pathlib import Path
import json,subprocess,array,math,hashlib
import imageio_ffmpeg
root=Path('assets/audio/yasuo-client-v1');out=root/'runtime';out.mkdir(exist_ok=True);ff=imageio_ffmpeg.get_ffmpeg_exe()
limits={'q-cast':1.3,'q-hit':1.15,'q3-cast':2.25,'q3-hit':2.0,'w-cast':1.25,'w-loop':10.5,'e-cast':1.25,'e-hit':.95,'r-slash':2.5,'r-hit':2.3}
source_records={r['key']:r for r in json.loads((root/'decoded-events.json').read_text())};records=[]
for key,duration in limits.items():
 source=root/'decoded'/f'{key}.wav';raw=subprocess.run([ff,'-v','error','-i',str(source),'-t',str(duration),'-f','f32le','-ac','1','-ar','22050','-'],capture_output=True,check=True).stdout
 samples=array.array('f',raw);peak=max(map(abs,samples));rms=math.sqrt(sum(x*x for x in samples)/len(samples));target_rms=.075 if key=='w-loop' else .1;gain=min(3,.82/max(.001,peak),target_rms/max(.001,rms));target=out/f'yasuo-client-{key}.mp3'
 subprocess.run([ff,'-v','error','-y','-i',str(source),'-t',str(duration),'-af',f'volume={gain},afade=t=in:d=0.006,afade=t=out:st={duration-.035}:d=0.035','-ar','44100','-ac','2','-b:a','160k',str(target)],capture_output=True,check=True)
 decoded=subprocess.run([ff,'-v','error','-i',str(target),'-f','f32le','-ac','1','-ar','22050','-'],capture_output=True,check=True).stdout;b=array.array('f',decoded);op=max(map(abs,b));orms=math.sqrt(sum(x*x for x in b)/len(b));assert op<=1 and orms>.01
 records.append(dict(key=key,event=source_records[key]['event'],file=target.name,duration=len(b)/22050,peak=op,rms=orms,gain=gain,source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
(root/'manifest.json').write_text(json.dumps(dict(source_client=r'D:\Long1ye\英雄联盟(26)\Game\DATA\FINAL\Champions\Yasuo.wad.client',bank='assets/sounds/wwise2016/sfx/characters/yasuo/skins/base/yasuo_base_sfx_audio.bnk',clips=records),ensure_ascii=False,indent=2),encoding='utf-8');print('10 original skill clips prepared; all decoded, non-silent, peak below 1.')
