"""Decode named original Wwise events and prepare bounded runtime clips."""
from pathlib import Path
import subprocess,json,array,math,hashlib,shutil
import imageio_ffmpeg
root=Path('assets/audio/summoners-client-v2');runtime=root/'runtime';runtime.mkdir(parents=True,exist_ok=True)
source=Path('.cache/summoner-client');ff=imageio_ffmpeg.get_ffmpeg_exe();records=[]
events={'flash':'SummonerFlash_OnCast','ignite-cast':'SummonerDot_OnHit','ignite-burn':'SummonerDot_OnBuffActivate'}
for key,event in events.items():
 txtp=next((source/'named-events').glob('Play_sfx_'+event+' *.txtp'))
 wav=source/(key+'.wav')
 subprocess.run([str(Path('.cache/riot-audio-tools/vgmstream/vgmstream-cli.exe').resolve()),'-i','-o',str(wav),str(txtp)],capture_output=True,check=True)
 raw=subprocess.run([ff,'-v','error','-i',str(wav),'-f','f32le','-ac','1','-ar','44100','-'],capture_output=True,check=True).stdout
 samples=array.array('f',raw);duration=len(samples)/44100;peak=max(map(abs,samples));rms=math.sqrt(sum(v*v for v in samples)/len(samples))
 gain=min(3,.85/max(.001,peak),(.065 if key=='ignite-burn' else .11)/max(.001,rms))
 target=runtime/(key+'.mp3')
 subprocess.run([ff,'-v','error','-y','-i',str(wav),'-af',f'volume={gain},afade=t=in:d=0.005,afade=t=out:st={max(0,duration-.025)}:d=0.025','-ar','44100','-ac','2','-b:a','160k',str(target)],capture_output=True,check=True)
 decoded=subprocess.run([ff,'-v','error','-i',str(target),'-f','f32le','-ac','1','-ar','22050','-'],capture_output=True,check=True).stdout
 pcm=array.array('f',decoded);op=max(map(abs,pcm));orms=math.sqrt(sum(v*v for v in pcm)/len(pcm));assert op<1 and orms>.005
 records.append(dict(key=key,event='Play_sfx_'+event,duration=duration,peak=op,rms=orms,sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
 print(key,duration,op,orms)
(root/'manifest.json').write_text(json.dumps(dict(source='Local League client, Maps/Shipping/Common.wad.client',bank='misc_gameplay_sfx_audio.bnk',events=records),indent=2))
