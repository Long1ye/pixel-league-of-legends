from pathlib import Path
import sys,io,re,json,subprocess,os
os.environ['CDTB_HASHES_DIR']='C:/Users/PC/.codex/tmp/lol-hashes'
sys.path.insert(0,'C:/Users/PC/.codex/tmp/lol-asset-parser')
sys.path.insert(0,str(Path('.cache/riot-ui-tools').resolve()))
from xxhash import xxh64_intdigest
from cdtb.wad import Wad
from cdtb.binfile import BinFile
base=Path(r'D:/Long1ye/英雄联盟(26)/Game/DATA/FINAL');out=Path('.cache/summoner-client')
names=[f'{prefix}/{name}.bin' for prefix in ['data/spells','data/shared/spells','data/shared/particles','data/shared','data'] for name in ['summonerflash','summonerdot','summonerignite','shared']]
names += ['data/maps/shipping/common/common.bin','data/maps/shipping/map11/map11.bin']
events=set()
for path in [base/'Global.wad.client',base/'Maps/Shipping/Common.wad.client',base/'DATA.wad.client',base/'Maps/Shipping/Map11.wad.client',base/'Maps/Shipping/Map12.wad.client']:
 wad=Wad(str(path),hashes={});table={e.path_hash:e for e in wad.files}
 with path.open('rb') as source:
  for name in names:
   e=table.get(xxh64_intdigest(name.encode()))
   if not e:continue
   e.path=name;raw=wad.read_file_data(source,e)
   doc=json.dumps(BinFile(io.BytesIO(raw)).to_serializable(),indent=2,default=str)
   (out/(Path(name).name+'.json')).write_text(doc)
   events.update(re.findall(r'(?:Play|Stop)_[A-Za-z0-9_]+',doc));print('found',name)
print('\n'.join(sorted(events)))
(out/'wwnames.txt').write_text('\n'.join(sorted(events)))
# Actual event names drive TXTP generation; embedded sources reference the original banks.
subprocess.run([sys.executable,'.cache/riot-audio-tools/wwiser.pyz',*[str(p) for p in (out/'original').glob('*.bnk')],'-d','none','-nl',str(out/'wwnames.txt'),'-g','-gd','-gbs','-go',str(out/'named-events'),'-gw',str((out/'wem').resolve()),'-gxnl'],check=True)
