from pathlib import Path
import struct,json,sys,io,hashlib
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
import zstandard,xxhash
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
WAD=Path(r'D:\Long1ye\英雄联盟(26)\Game\DATA\FINAL\UI.wad.client')
OUT=ROOT/'assets/ui/riot-healthbars-2026-10-15'
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
 toc=read(entries[next(h for h,p in paths.items() if p.endswith('ui.wad.subchunktoc'))])
 records=[];(OUT/'original').mkdir(exist_ok=True);(OUT/'textures').mkdir(exist_ok=True)
 cursor_names=['hover_precise','hover_ally_precise','hover_enemy_precise','hover_enemycannotattack_precise','target_precise']
 selected=[(h,p) for h,p in paths.items() if (('floatinghealthbars/' in p or 'healthbarsdefault' in p or '/bar_health/' in p) and p.endswith('.tex')) or ('/cursors/upscaled/' in p and Path(p).stem in cursor_names)]
 for h,path in selected:
  data=read(entries[h],toc);name=Path(path).stem;(OUT/'original'/f'{name}{Path(path).suffix}').write_bytes(data)
  if path.endswith('.tga'):
   im=Image.open(io.BytesIO(data));im.save(OUT/'textures'/f'{name}.png');records.append(dict(path=path,hash=h,width=im.width,height=im.height,format='TGA',sha256=hashlib.sha256(data).hexdigest(),file=f'textures/{name}.png'));print(name,im.size);continue
  magic,w,height,fmt,mips=struct.unpack('<4sHHxBx?',data[:12]);assert magic==b'TEX\0';dx10=b''
  if fmt in [10,12]:pf=struct.pack('<LL4s20x',32,4,b'DXT1' if fmt==10 else b'DXT5')
  elif fmt in [13,14]:pf=struct.pack('<LL4s20x',32,4,b'DX10');dx10=struct.pack('<LL4xLL',99 if fmt==13 else 84,3,1,1)
  elif fmt==20:pf=struct.pack('<LL4x5L',32,0x41,32,0x00ff0000,0x0000ff00,0x000000ff,0xff000000)
  else:raise ValueError(fmt)
  n=((w+3)//4)*((height+3)//4)*(8 if fmt==10 else 16) if fmt!=20 else w*height*4
  pixels=data[-n:] if mips else data[12:]
  dds=struct.pack('<4s4L56x32sL16x',b'DDS ',124,0x1007,height,w,pf,0x1000)+dx10+pixels
  im=Image.open(io.BytesIO(dds));im.save(OUT/'textures'/f'{name}.png')
  records.append(dict(path=path,hash=h,width=w,height=height,format=fmt,sha256=hashlib.sha256(data).hexdigest(),file=f'textures/{name}.png'))
  print(name,w,height,'format',fmt)
(OUT/'extracted.json').write_text(json.dumps(dict(source=str(WAD),format_reference='https://github.com/CommunityDragon/CDTB/blob/master/cdtb/export.py',textures=records),indent=2),encoding='utf-8')
