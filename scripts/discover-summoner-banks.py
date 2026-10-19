"""Resolve only audio-bank paths from the user's read-only game installation."""
from pathlib import Path
import struct, json, urllib.request, concurrent.futures
base=Path(r'D:/Long1ye/英雄联盟(26)/Game/DATA/FINAL')
out=Path('.cache/summoner-client');out.mkdir(exist_ok=True)
files=[base/'Audio.wad.client',base/'Global.wad.client',base/'Maps/Shipping/Common.wad.client',base/'DATA.wad.client',base/'Maps/Shipping/Map11.wad.client']
keys={}
for path in files:
 with path.open('rb') as f:
  f.seek(268);count=struct.unpack('<I',f.read(4))[0]
  for _ in range(count):keys[struct.unpack('<QIIIBBHQ',f.read(32))[0]]=str(path)
def scan(i):
 matches=[]
 with urllib.request.urlopen('https://raw.githubusercontent.com/CommunityDragon/Data/master/hashes/lol/hashes.game.txt.'+str(i),timeout=90) as response:
  for line in response:
   if b'.bin' in line and (b'summonerflash' in line.lower() or b'summonerdot' in line.lower()):
    print(line.decode().strip(),flush=True)
   if b'.bnk' not in line and b'.subchunktoc' not in line and b'.bin' not in line:continue
   h,p=line.decode().strip().split(' ',1)
   if int(h,16) in keys:matches.append(dict(hash=h,path=p,wad=keys[int(h,16)]))
 return matches
matches=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for found in pool.map(scan,range(9)):
  matches.extend(found)
(out/'banks.json').write_text(json.dumps(matches,indent=2))
for match in matches:
 if 'gameplay' in match['path']:print(match['path'])
