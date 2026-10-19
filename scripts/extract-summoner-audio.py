"""Read shared SFX banks without modifying the installed League client."""
from pathlib import Path
import struct,json,sys,subprocess
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
import zstandard,xxhash
root=Path('.cache/summoner-client');paths=json.loads((root/'banks.json').read_text());out=root/'original';out.mkdir(exist_ok=True)
chosen=[p for p in paths if 'misc_gameplay_sfx_' in p['path'] or 'misc_global_sfx_' in p['path']]
for wad in set(p['wad'] for p in chosen):
 with Path(wad).open('rb') as f:
  f.seek(268);n=struct.unpack('<I',f.read(4))[0];entries={}
  for _ in range(n):
   e=struct.unpack('<QIIIBBHQ',f.read(32));entries[f'{e[0]:016x}']=e
  def read(e,toc=None):
   _,off,c,size,kind,hi,lo,_=e;f.seek(off);raw=f.read(c)
   if kind&15==0:return raw
   if kind&15==3:return zstandard.ZstdDecompressor().decompress(raw,max_output_size=size)
   if kind&15==4:
    chunks=[];offset=0
    for index in range(lo+(hi<<16),lo+(hi<<16)+(kind>>4)):
     c,u,h=struct.unpack('<IIQ',toc[index*16:(index+1)*16]);chunk=raw[offset:offset+c];offset+=c
     assert xxhash.xxh3_64_intdigest(chunk)==h
     chunks.append(chunk if c==u else zstandard.ZstdDecompressor().decompress(chunk,max_output_size=u))
    return b''.join(chunks)
   raise ValueError(kind)
  toc_path=next((p for p in paths if p['wad']==wad and p['path'].endswith('.subchunktoc')),None)
  toc=read(entries[toc_path['hash']]) if toc_path else None
  for p in chosen:
   if p['wad']==wad:
    data=read(entries[p['hash']],toc);(out/Path(p['path']).name).write_bytes(data);print(p['path'],len(data))
# Extract embedded WEM data with their original ids.
wem=root/'wem';wem.mkdir(exist_ok=True)
for bank in out.glob('*audio.bnk'):
 data=bank.read_bytes();chunks={};offset=0
 while offset<len(data):
  tag=data[offset:offset+4];size=struct.unpack_from('<I',data,offset+4)[0];chunks[tag]=data[offset+8:offset+8+size];offset+=8+size
 for pos in range(0,len(chunks.get(b'DIDX',b'')),12):
  id,start,size=struct.unpack_from('<III',chunks[b'DIDX'],pos);(wem/f'{id}.wem').write_bytes(chunks[b'DATA'][start:start+size])
subprocess.run([sys.executable,'.cache/riot-audio-tools/wwiser.pyz',*[str(p) for p in out.glob('*.bnk')],'-d','xml','-dn',str(root/'events'),'-g','-go',str(root/'txtp'),'-gw',str(wem.resolve()),'-gxnl'],check=True)
