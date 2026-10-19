"""Extract the user's local base-skin Mandarin voice bank, without editing the client."""
from pathlib import Path
import sys,os,re,struct,json,subprocess,hashlib
sys.path.insert(0,'C:/Users/PC/.codex/tmp/lol-asset-parser')
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
os.environ['CDTB_HASHES_DIR']='C:/Users/PC/.codex/tmp/lol-hashes'
from cdtb.wad import Wad
archive=Path(r'D:/Long1ye/英雄联盟(26)/Game/DATA/FINAL/Champions/Yasuo.zh_CN.wad.client')
root=Path('assets/audio/yasuo-voice-zh-v1');cache=Path('.cache/yasuo-voice-zh');cache.mkdir(parents=True,exist_ok=True);root.mkdir(parents=True,exist_ok=True)
wad=Wad(str(archive),hashes={})
def fnv(name):
 value=2166136261
 for byte in name.lower().encode():value=((value*16777619)&0xffffffff)^byte
 return value
bank_names={fnv('yasuo_base_vo_'+kind):'yasuo_base_vo_'+kind+'.bnk' for kind in ['audio','events']}
banks=[];wem=cache/'wem';wem.mkdir(exist_ok=True);sources=[]
with archive.open('rb') as f:
 for entry in wad.files:
  data=wad.read_file_data(f,entry)
  if data.startswith(b'BKHD') and struct.unpack_from('<I',data,12)[0] in bank_names:
   name=bank_names[struct.unpack_from('<I',data,12)[0]]
   target=cache/name;target.write_bytes(data);banks.append(target);sources.append({'wadHash':f'{entry.path_hash:016x}','bank':name,'resolution':'BKHD bank id = Wwise FNV name hash'});print(name,len(data))
  elif data.startswith(b'r3d2'):
   for index in range(struct.unpack_from('<I',data,8)[0]):
    offset=struct.unpack_from('<I',data,12+index*4)[0];start,size,length=struct.unpack_from('<III',data,offset)
    name=data[offset+12:offset+12+length*2].decode('utf-16le').rstrip('\0');assert name.endswith('.wem') and name[:-4].isdigit()
    (wem/name).write_bytes(data[start:start+size])
assert len(banks)==2,'Base Mandarin voice banks not resolved'
for bank in banks:
 data=bank.read_bytes();chunks={};offset=0
 while offset<len(data):
  tag=data[offset:offset+4];size=struct.unpack_from('<I',data,offset+4)[0];chunks[tag]=data[offset+8:offset+8+size];offset+=8+size
 for offset in range(0,len(chunks.get(b'DIDX',b'')),12):
  key,start,size=struct.unpack_from('<III',chunks[b'DIDX'],offset);(wem/f'{key}.wem').write_bytes(chunks[b'DATA'][start:start+size])
events=sorted(set(re.findall(r'(?:Play|Stop)_vo_[A-Za-z0-9_]+',Path('assets/source-materials/client-reference/yasuo-combat-2026-10-15/skin0.bin.json').read_text())))
(cache/'wwnames.txt').write_text('\n'.join(events))
subprocess.run([sys.executable,'.cache/riot-audio-tools/wwiser.pyz',*map(str,banks),'-d','xml','-dn',str(cache/'bank'),'-nl',str(cache/'wwnames.txt'),'-g','-gd','-gbs','-go',str(cache/'events'),'-gw',str(wem.resolve()),'-gxnl'],check=True)
(root/'source.json').write_text(json.dumps({'archive':str(archive),'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'banks':sources,'declaredEvents':events,'availableWpkMedia':len(list(wem.glob('*.wem')))},ensure_ascii=False,indent=2))
print('embedded media',len(list(wem.glob('*.wem'))),'declared events',len(events))
