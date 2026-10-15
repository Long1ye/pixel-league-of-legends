from pathlib import Path
import json,shutil,subprocess,imageio_ffmpeg,hashlib,html,zipfile
root=Path('assets/ui/original-gameplay-breakdown-2026-10-15')
backup=root/'manifest-original.json'
if not backup.exists():
 shutil.copy2(root/'manifest.json',backup);shutil.copy2(root/'index.html',root/'original-breakdown.html')
original=json.loads(backup.read_text(encoding='utf-8'))
keep=['02-portrait-level','03-passive','05-skill-q','06-skill-w','07-skill-e','08-skill-r','09-health','10-resource','11-summoners','12-spell-d','13-spell-f','18-minimap','19-map-content','21-scoreboard','23-overhead','24-minion-bar','25-cursor','26-tower-bar']
parts=[dict(next(p for p in original['components'] if p['id']==key)) for key in keep]
target=root/'selected';target.mkdir(exist_ok=True)
for part in parts:
 if part['id']=='02-portrait-level':
  part.update(id='02-portrait',label='头像核心 · 无等级',x=697,y=941,width=63,height=57,note='裁取头像核心，排除右下角等级徽章；外框后续单独绘制')
 elif part['id']=='23-overhead':
  part.update(label='英雄头顶信息 · 无等级',x=768,y=416,width=114,height=50,note='保留名称、生命与资源，裁去左侧等级框')
 if part['id']=='08-skill-r':
  src=Path('assets/ui/2026-10-13/league-hud/icons/component_003.png')
  dst=target/'08-skill-r-ready.png';shutil.copy2(src,dst)
  part.update(id='08-skill-r-ready',label='R 就绪态',file='selected/08-skill-r-ready.png',width=295,height=299,note='使用游戏现有彩色 R 图标，不是从实机视频提取的就绪帧',source_kind='existing-game-asset',source_asset=src.as_posix(),state='ready')
  for key in ['x','y','frame_seconds','sha256']:part.pop(key,None)
 else:
  dst=target/f'{part["id"]}.png'
  subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-y','-i',str(root/f'source-{part["frame_seconds"]}s.png'),'-vf',f'crop={part["width"]}:{part["height"]}:{part["x"]}:{part["y"]}:exact=1','-frames:v','1',str(dst)],capture_output=True,check=True)
  part['file']='selected/'+dst.name;part['source_kind']='video-crop'
 part['sha256']=hashlib.sha256(dst.read_bytes()).hexdigest()
requirements=dict(level=False,r_state='ready',inventory=False,gold=False,side_utilities=False,buff_group='passive-only',skill_upgrade=False)
manifest={**original,'components':parts,'target_requirements':requirements,'reference_manifest':'manifest-original.json','notes':['实机视频 R 全程灰色，就绪态采用现有游戏彩色图标。','当前仅更新 UI 拆解与目标制作清单；不修改技能冷却或施法判定。']}
(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
cards=[]
for part in parts:
 origin='现有游戏素材 · 就绪态' if part['source_kind']=='existing-game-asset' else f'实机 {part["frame_seconds"]}s · ({part["x"]}, {part["y"]})'
 cards.append(f'<article><h3>{html.escape(part["label"])}</h3><a href="{part["file"]}" target="_blank"><div class="crop"><img src="{part["file"]}" alt="{html.escape(part["label"])}"></div></a><p>{html.escape(part["note"])}</p><small>{part["width"]} × {part["height"]} · {origin}</small></article>')
img=lambda key:next(p['file'] for p in parts if p['id']==key)
preview=f'<div class="portrait"><img src="{img("02-portrait")}" alt="无等级头像"></div><div class="center"><div class="skills"><img class="passive" src="{img("03-passive")}" title="被动技能" alt="被动技能">'+''.join(f'<div class="skill"><img src="{img(key)}" alt="{label}"><b>{label}</b></div>' for key,label in [('05-skill-q','Q'),('06-skill-w','W'),('07-skill-e','E'),('08-skill-r-ready','R')])+f'</div><img class="bar" src="{img("09-health")}" alt="生命条"><img class="bar" src="{img("10-resource")}" alt="资源条"></div><img class="summoners" src="{img("11-summoners")}" alt="召唤师技能">'
page='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>精简 UI 部件方案</title><style>*{box-sizing:border-box}body{margin:0;background:#09131c;color:#d9e5e4;font:14px/1.7 system-ui,"Microsoft YaHei",sans-serif}main{max-width:1280px;margin:auto;padding:30px}h1{margin:8px 0;font-size:29px}h2{font-size:20px;margin:26px 0 12px}p,small{color:#90a9b1}.tag{font:11px monospace;letter-spacing:3px;color:#70d8c6}.requirements{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.requirements span{border:1px solid #3a655f;color:#9be3cc;background:#112a2c;padding:5px 10px}nav{display:flex;gap:20px;flex-wrap:wrap}a{color:#d6bf86;text-decoration:none}.note{border-left:2px solid #a18b5a;padding:8px 14px;background:#14242d;color:#a4b7bc;margin:18px 0}.assembly{min-height:150px;border:1px solid #415554;background:linear-gradient(#162c35,#061019);display:flex;align-items:center;justify-content:center;padding:26px;overflow:auto}.hud{display:flex;align-items:center;gap:10px;border:2px solid #897648;background:#07151b;padding:12px;box-shadow:inset 0 2px #bca367;flex-shrink:0}.portrait{width:68px;height:68px;border:2px solid #aa925b;overflow:hidden}.portrait img{width:100%;height:100%;object-fit:cover}.skills{display:flex;align-items:center;gap:5px;margin-bottom:4px}.skill{width:42px;height:42px;position:relative;border:1px solid #9a8758}.skill img{width:100%;height:100%;object-fit:cover}.skill b{position:absolute;bottom:0;left:1px;font:10px monospace;color:#ffe7a6;background:#06131b}.passive{width:29px;height:31px;margin-right:3px}.bar{display:block;width:220px;height:12px;object-fit:fill;margin:2px 0}.bar:last-child{height:9px}.summoners{width:64px;height:39px}img{image-rendering:pixelated}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:16px}article{background:#10212b;border:1px solid #30464e;padding:16px}h3{font-size:15px;margin:0 0 12px}.crop{min-height:115px;display:flex;justify-content:center;align-items:center;padding:12px;background:repeating-conic-gradient(#192d38 0% 25%,#152630 0% 50%) 0 0/16px 16px}.crop img{max-width:100%;max-height:200px;object-fit:contain}article p{font-size:12px;min-height:40px}small{font-size:10px}footer{margin:28px 0;color:#839ba4;font-size:12px}</style><main><div class="tag">UI COMPONENTS / APPROVED SCOPE</div><h1>原版实机 · 精简 UI 制作清单</h1><p>18 个保留参考部件 · 按当前需求筛选 · 等级与扩展功能不制作</p><div class="requirements"><span>无等级</span><span>R 就绪态</span><span>状态仅保留被动</span><span>无装备 / 金币</span><span>无侧边功能 / 技能升级</span></div><nav><a href="manifest.json">当前部件清单</a><a href="original-breakdown.html">完整原始拆解（仅参考）</a><a href="original-ui-breakdown.zip">下载素材包</a></nav><h2>01 / 目标组合示意</h2><div class="assembly"><div class="hud">'''+preview+'''</div></div><div class="note">组合图用于确认布局范围，尚未像素化重绘。视频中的 R 全程灰色，此处明确改用游戏现有彩色 R 图标作为就绪态参考，不修改游戏冷却与施法规则。头像与头顶信息已排除等级；状态区只留一个被动技能图标。</div><h2>02 / 保留部件</h2><section class="grid">'''+''.join(cards)+'''</section><footer>原始截图与原始拆解完整保留。装备、金币、侧边功能、增益组和升级提示不进入目标制作清单。召唤师技能维持原参考范围。</footer></main></html>'''
(root/'index.html').write_text(page,encoding='utf-8')
(root/'target-scope.md').write_text('# 当前 UI 制作范围\n\n'+json.dumps(requirements,ensure_ascii=False,indent=2)+'\n\n保留 18 个参考条目。R 就绪态来自现有游戏彩色图标，原实机视频未出现就绪态。完整原始拆解保留在 original-breakdown.html / manifest-original.json；本轮不修改游戏 UI 或施法逻辑。\n',encoding='utf-8')
archive=root/'original-ui-breakdown.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file() and p!=archive:z.write(p,p.relative_to(root))
print('18 selected components; removed features excluded; R ready reference identified.')
