from pathlib import Path
import struct,json,sys,io,hashlib
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
import zstandard,xxhash
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
WAD=Path(r'D:\Long1ye\英雄联盟(26)\Game\DATA\FINAL\Champions\Yasuo.wad.client')
OUT=ROOT/'assets/audio/yasuo-client-v1'
paths=json.loads((OUT/'wad-paths.json').read_text());entries={}
with WAD.open('rb') as f:
 f.seek(268);count=struct.unpack('<I',f.read(4))[0]
 for _ in range(count):
  e=struct.unpack('<QIIIBBHQ',f.read(32));entries[f'{e[0]:016x}']=e
 def read(e,toc=None):
  _,offset,compressed,size,kind,hi,lo,_=e;f.seek(offset);raw=f.read(compressed);kind0=kind&15
  if kind0==0:return raw
  if kind0==3:return zstandard.ZstdDecompressor().decompress(raw,max_output_size=size)
  if kind0==4:
   out=[];offset=0
   for index in range(lo+(hi<<16),lo+(hi<<16)+(kind>>4)):
    c,u,h=struct.unpack('<IIQ',toc[index*16:(index+1)*16]);chunk=raw[offset:offset+c];offset+=c
    assert xxhash.xxh3_64_intdigest(chunk)==h
    out.append(chunk if c==u else zstandard.ZstdDecompressor().decompress(chunk,max_output_size=u))
   result=b''.join(out);assert len(result)==size;return result
  raise ValueError(kind0)
 toc=read(entries[next(h for h,p in paths.items() if p.endswith('yasuo.wad.subchunktoc'))])
 (OUT/'original').mkdir(exist_ok=True)
 for h,path in paths.items():
  if '/skins/base/' in path and path.endswith('.bnk'):
   data=read(entries[h],toc);target=OUT/'original'/Path(path).name;target.write_bytes(data);print(path,len(data))
 for path in ['characters/yasuo/skins/skin0.bin','data/characters/yasuo/skins/skin0.bin','assets/characters/yasuo/skins/skin0.bin']:
  h=f'{xxhash.xxh64_intdigest(path.lower().encode()):016x}'
  if h in entries:
   data=read(entries[h],toc);(OUT/'original'/'skin0.bin').write_bytes(data);print('skin bin',len(data))

