from pathlib import Path
import json,hashlib,subprocess,imageio_ffmpeg
root=Path('assets/ui/pixel-hud-v2-2026-10-15');source=next((root/'generated').rglob('ui_output.png'));runtime=root/'runtime';runtime.mkdir(exist_ok=True)
rects=[('portrait',106,121,276,277),('passive',457,121,278,277),('q',807,121,278,277),('w',1156,121,276,277),('e',107,477,275,276),('r',458,477,276,276),('d',807,477,277,276),('f',1157,477,275,276)]
manifest=[]
for name,x,y,w,h in rects:
 target=runtime/f'{name}.png'
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-y','-i',str(source),'-vf',f'crop={w}:{h}:{x}:{y}:exact=1','-frames:v','1',str(target)],capture_output=True,check=True)
 manifest.append(dict(id=name,file=f'runtime/{name}.png',bbox=[x,y,x+w,y+h],width=w,height=h,pixels_preserved=True,sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
(root/'assets.json').write_text(json.dumps(dict(sheet=str(source).replace(chr(92),'/'),source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),icons=manifest),indent=2),encoding='utf-8')
print('Packaged eight icons, preserving original generated pixels.')
