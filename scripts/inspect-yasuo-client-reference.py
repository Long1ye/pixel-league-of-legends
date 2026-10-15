"""Read local Yasuo WAD data with CDTB; write reference copies only, never edit the client."""
from pathlib import Path
import os,sys,json,io,hashlib,collections

ROOT=Path(__file__).resolve().parents[1]
TOOLS=Path('C:/Users/PC/.codex/tmp/lol-asset-parser')
HASHES=Path('C:/Users/PC/.codex/tmp/lol-hashes')
sys.path.insert(0,str(TOOLS));os.environ['CDTB_HASHES_DIR']=str(HASHES)
from xxhash import xxh64_intdigest
from cdtb.wad import Wad
from cdtb.binfile import BinFile
from cdtb.hashes import hashfile_game

OUT=ROOT/'assets/source-materials/client-reference/yasuo-combat-2026-10-15'
CLIENT=next(p for p in ROOT.parent.iterdir() if p.name.startswith('\u82f1\u96c4\u8054\u76df('))
ARCHIVE=CLIENT/'Game/DATA/FINAL/Champions/Yasuo.wad.client'
names=['data/characters/yasuo/yasuo.bin',*[f'data/characters/yasuo/skins/skin{i}.bin' for i in range(100)]]
hashes={xxh64_intdigest(n.encode()):n for n in names}
HASHES.mkdir(exist_ok=True)
(HASHES/'hashes.game.txt').write_text(''.join(f'{h:016x} {p}\n' for h,p in hashes.items()),encoding='utf-8')
wad=Wad(str(ARCHIVE),hashes=hashes)
OUT.mkdir(parents=True,exist_ok=True)
summary=[]
queue=['data/characters/yasuo/yasuo.bin','data/characters/yasuo/skins/skin0.bin'];seen=set()
table={e.path_hash:e for e in wad.files}
with ARCHIVE.open('rb') as source:
    while queue and len(seen)<80:
        source_path=queue.pop(0).lower()
        if source_path in seen:continue
        seen.add(source_path)
        entry=table.get(xxh64_intdigest(source_path.encode()))
        if entry is None:continue
        entry.path=source_path
        hashfile_game.load()[entry.path_hash]=source_path
        data=wad.read_file_data(source,entry)
        name='animation-skin0.bin' if '/animations/' in source_path else Path(source_path).name
        if len(name)>120:name=f'shared-{len(summary):02d}.bin'
        (OUT/name).write_bytes(data)
        parsed=BinFile(io.BytesIO(data))
        doc=parsed.to_serializable()
        (OUT/(name+'.json')).write_text(json.dumps(doc,ensure_ascii=False,indent=2,default=str)+'\n',encoding='utf-8')
        summary.append({'source_path':entry.path,'local_file':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'entries':len(parsed.entries),'types':dict(collections.Counter(str(e.type) for e in parsed.entries)),'linked_files':parsed.linked_files})
        queue.extend(p for p in parsed.linked_files or [] if p.lower().startswith('data/characters/yasuo/'))
manifest={'source_archive':str(ARCHIVE),'source_archive_sha256':hashlib.sha256(ARCHIVE.read_bytes()).hexdigest(),'wad_version':wad.version,'archive_entries':len(wad.files),'parser':'CommunityDragon CDTB 1.3.0','files':summary}
(OUT/'source-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'parsed_files':len(summary),'files':[{'local_file':s['local_file'],'entries':s['entries'],'types':s['types']} for s in summary]},ensure_ascii=True))


