from pathlib import Path
import struct,json
out=Path('assets/ui/move-click-2026-10-15/official')
d=(out/'movement_indicator4.scb').read_bytes();nv,nf,flags=struct.unpack_from('<III',d,140);pos=176
vertices=[struct.unpack_from('<3f',d,pos+i*12) for i in range(nv)];pos+=nv*12+12
faces=[]
for i in range(nf):
 ids=struct.unpack_from('<3I',d,pos);uv=struct.unpack_from('<6f',d,pos+76);faces.append(dict(indices=ids,uv=[[uv[j],uv[j+3]] for j in range(3)]));pos+=100
if flags&1:pos+=nf*9
assert pos==len(d),(pos,len(d))
(out/'movement-mesh.json').write_text(json.dumps(dict(vertices=vertices,faces=faces),separators=(',',':')))
d=(out/'cursor_moveto.troybin').read_bytes();length,flags=struct.unpack_from('<HH',d,1);pos=5;values={};strings=[]
formats=['i','f','B','h','B',None,'3B','3f','2B','2f','4B','4f','H','q']
for bit in range(14):
 if not flags&(1<<bit):continue
 count=struct.unpack_from('<H',d,pos)[0];pos+=2
 keys=struct.unpack_from('<'+'I'*count,d,pos);pos+=count*4
 if bit==5:
  bits=d[pos:pos+(count+7)//8];pos+=len(bits)
  for i,key in enumerate(keys):values[key]=bool((bits[i//8]>>(i%8))&1)
 else:
  fmt='<'+formats[bit];size=struct.calcsize(fmt)
  for key in keys:
   v=struct.unpack_from(fmt,d,pos);pos+=size;v=v[0] if len(v)==1 else v
   if bit==12:strings.append((key,v))
   else:values[key]=v/10 if bit==2 else v
for key,offset in strings:values[key]=d[pos+offset:].split(b'\0',1)[0].decode()
def h(s):
 v=0
 for c in s.lower().encode():v=(v*65599+c)&0xffffffff
 return v
sections=['System','cursor','Simple','cursor_shadow1','cursor_shadow2','cursor_shadow3','cursor_shadow4','circle']
props=['GroupPart'+str(i) for i in range(12)]+['p-'+n for n in ['life','scale','scale1','scale2','scale3','type','mesh','texture','texdiv','texrate','vel','vel1','vel2','offset','postoffset','rot','rotation','rotvel','rotvel1','bindtoemitter','rgba','rgba1','rgba2','rgba3','rgba4','rgba5','drag','birth','startframe','frame','uvscroll','orientation','localorientation','localrotation','linger']]+['e-'+n for n in ['life','rate','time','period','rotation','offset','active','linger','maxcount']]
decoded={};remaining=dict(values)
for prefix in ['p-','e-','']:
 for name in ['scale','rgba','color','alpha','rotation','rot','rotvel','vel','velocity','offset','postoffset','mesh','texture','bindtoemitter','localorientation','quadrot','birthrot','accel','drag','lifetime','rate','texvel','texscroll','texscrollrate','texuvscroll','texuvscrollrate','uvscroll','uvscrollrate','texoffset','uvoffset','texuv','uv','texturevelocity','texturescroll','textureScrollRate','uvrate','texrate','texrot','texscale','textranslation']:
  for suffix in ['', 'P','XP','YP','ZP','X','Y','Z','-x','-y','-z','-xp','-yp','-zp','-p']:
   for number in ['',*[str(i) for i in range(10)]]:props.append(prefix+name+suffix+number)
for section in sections:
 for prop in props:
  key=h(section+'*'+prop)
  if key in values:decoded.setdefault(section,{})[prop]=values[key];remaining.pop(key,None)
(out/'cursor-moveto-decoded.json').write_text(json.dumps(dict(decoded=decoded,unknown={f'{k:08x}':v for k,v in remaining.items()}),indent=2))
print(json.dumps(decoded,indent=2));print('mesh',nv,nf,'unknown properties',len(remaining))
