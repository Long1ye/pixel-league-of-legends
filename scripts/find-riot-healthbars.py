from pathlib import Path
import urllib.request,struct,json,time
wad=Path(r'D:\Long1ye\英雄联盟(26)\Game\DATA\FINAL\UI.wad.client');out=Path('assets/ui/riot-healthbars-2026-10-15');out.mkdir(parents=True,exist_ok=True)
with wad.open('rb') as f:
 f.seek(268);n=struct.unpack('<I',f.read(4))[0];keys={struct.unpack('<QIIIBBHQ',f.read(32))[0] for _ in range(n)}
found={};hits=[];total=0
with urllib.request.urlopen('https://raw.githubusercontent.com/CommunityDragon/Data/master/hashes/lol/hashes.game.txt.8',timeout=45) as r:
 for line in r:
  total+=1
  try:
   h,path=line.decode().strip().split(' ',1);number=int(h,16)
  except ValueError:continue
  if number in keys:
   found[h]=path
   if any(term in path.lower() for term in ['health','hpbar','healthbar','lifebar']):hits.append((h,path))
(out/'wad-paths.json').write_text(json.dumps(found,indent=2),encoding='utf-8')
(out/'healthbar-candidates.json').write_text(json.dumps(hits,indent=2),encoding='utf-8')
print('Hash lines',total,'UI entries resolved',len(found),'healthbar candidates',len(hits))
for item in hits[:95]:print(*item)

