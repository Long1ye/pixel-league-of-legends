from pathlib import Path
import struct,urllib.request,json,concurrent.futures
wad=Path(r'D:\Long1ye\英雄联盟(26)\Game\DATA\FINAL\Champions\Yasuo.wad.client');out=Path('assets/audio/yasuo-client-v1');out.mkdir(exist_ok=True)
with wad.open('rb') as f:
 print(f.read(4));f.seek(268);n=struct.unpack('<I',f.read(4))[0];keys={struct.unpack('<QIIIBBHQ',f.read(32))[0] for _ in range(n)}
def scan(i):
 found={}
 with urllib.request.urlopen('https://raw.githubusercontent.com/CommunityDragon/Data/master/hashes/lol/hashes.game.txt.'+str(i),timeout=40) as r:
  for line in r:
   try:h,p=line.decode().strip().split(' ',1)
   except ValueError:continue
   if int(h,16) in keys:found[h]=p
 return found
found={}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 for result in pool.map(scan,[7,8]):found.update(result)
(out/'wad-paths.json').write_text(json.dumps(found,indent=2),encoding='utf-8')
print('entries',n,'resolved',len(found))
for h,p in found.items():
 if p.endswith(('.bnk','.wpk','.subchunktoc')):print(h,p)
