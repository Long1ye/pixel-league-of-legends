from pathlib import Path
import sys,struct,io,json,hashlib
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
import zstandard
from PIL import Image
names={int(s.split(' ',1)[0],16):s.strip().split(' ',1)[1] for s in Path('.cache/click-resource-paths.txt').read_text().splitlines() if any(t in s for t in ['cursor_moveto','movement_indicator','movetogreen'])}
out=Path('assets/ui/move-click-2026-10-15/official');out.mkdir(parents=True,exist_ok=True)
p=Path(r'D:/Long1ye/英雄联盟(26)/Game/DATA/FINAL/DATA.wad.client')
records=[]
with p.open('rb') as f:
 f.seek(268);entries=[struct.unpack('<QIIIBBHQ',f.read(32)) for _ in range(struct.unpack('<I',f.read(4))[0])]
 for e in entries:
  if e[0] not in names:continue
  name=Path(names[e[0]]).name;f.seek(e[1]);data=zstandard.ZstdDecompressor().decompress(f.read(e[2]),max_output_size=e[3])
  (out/name).write_bytes(data);records.append(dict(path=names[e[0]],file=name,size=len(data),sha256=hashlib.sha256(data).hexdigest()))
  print(name,len(data),data[:32].hex())
  if name.endswith('.dds'):Image.open(io.BytesIO(data)).save(out/(name[:-4]+'.png'))
(out/'manifest.json').write_text(json.dumps(dict(source=str(p),files=records),indent=2))
