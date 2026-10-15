from pathlib import Path
import subprocess,json,wave
root=Path('assets/audio/yasuo-client-v1');out=root/'decoded';out.mkdir(exist_ok=True)
keys={'q-cast':'YasuoQ2_OnCast','q-wind':'YasuoQW_buffactivate','q-hit':'YasuoQ_hit','q3-cast':'YasuoQ3W_missilelaunch','q3-hit':'YasuoQ3W_hit','w-cast':'YasuoWMovingWall_OnCast','w-loop':'YasuoWMovingWall_buffactivate','w-block':'YasuoWMovingWall_hit','e-cast':'YasuoDashWrapper_cast','e-hit':'YasuoDashWrapper_hit','r-slash':'YasuoRKnockUpCombo_OnBuffActivate','r-hit':'YasuoRKnockUpCombo_hit_land','r-start':'YasuoRLeashParticle_buffactivate'}
records=[]
for key,term in keys.items():
 source=next(p for p in [* (root/'named-events').glob('*.txtp'),* (root/'events').glob('*.txtp')] if p.name.startswith('Play_sfx_Yasuo_'+term));target=out/f'{key}.wav'
 r=subprocess.run([str(Path('.cache/riot-audio-tools/vgmstream/vgmstream-cli.exe').resolve()),'-i','-o',str(target),str(source)],capture_output=True,encoding='utf-8',errors='replace')
 if r.returncode:print(key,r.stdout,r.stderr);continue
 with wave.open(str(target)) as w:seconds=w.getnframes()/w.getframerate()
 records.append(dict(key=key,event=source.stem,file=str(target),seconds=seconds));print(key,round(seconds,3),source.stem)
(root/'decoded-events.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
