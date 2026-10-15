"""Exact source-video UI crops; no source modification or background removal."""
from pathlib import Path
import subprocess,json,hashlib,html
import imageio_ffmpeg
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/source-materials/references/原版实机画面.mp4'
OUT=ROOT/'assets/ui/original-gameplay-breakdown-2026-10-15'
PARTS=[
('01-player-hud','英雄面板整体',24,680,930,500,94,'底部面板比例与内部布局'),
('02-portrait-level','头像与等级',24,680,933,100,91,'圆形头像饰边及等级徽章'),
('03-passive','被动图标',24,780,941,29,31,'独立小型图标槽'),
('04-qwer','QWER 技能组',24,809,939,166,48,'技能槽、快捷键与边框'),
('05-skill-q','Q 技能槽',24,811,941,40,44,'图标与快捷键'),
('06-skill-w','W 技能槽',24,852,941,40,44,'图标与快捷键'),
('07-skill-e','E 技能槽',24,893,941,40,44,'图标与快捷键'),
('08-skill-r','R 未就绪状态',24,934,941,40,44,'保留实机当时灰色状态'),
('09-health','生命条',24,779,988,259,15,'填充、数字与细边框'),
('10-resource','资源条',24,779,1003,259,16,'浅色资源条及数字'),
('11-summoners','召唤师技能双槽',24,975,940,64,39,'D/F 槽位与快捷键'),
('12-spell-d','D 槽',24,977,941,31,36,'单个召唤师技能'),
('13-spell-f','F 槽',24,1008,941,31,36,'单个召唤师技能'),
('14-inventory','装备与功能区',24,1040,931,140,93,'暗色装备区与侧边功能'),
('15-gold','金币读数',24,1053,998,94,24,'金币图标、数字与框'),
('16-utilities','侧边功能图标',24,1145,943,29,78,'竖向功能图标组'),
('17-buffs','增益状态组',24,759,905,134,26,'面板上方状态图标'),
('18-minimap','小地图与外框',24,1583,703,321,321,'右下角方框地图及金属边框'),
('19-map-content','小地图内部',24,1594,716,303,301,'地图、单位与视野框的合成画面'),
('20-map-buttons','小地图侧边按钮',24,1520,990,64,34,'地图侧边功能入口'),
('21-scoreboard','右上对局数据',24,1568,31,336,31,'团队数据、KDA、补刀与时间'),
('22-performance','帧率与延迟',24,1750,61,148,22,'调试读数，后续可默认隐藏'),
('23-overhead','英雄头顶信息',24,741,416,141,50,'名称、等级、分段血条与资源条'),
('24-minion-bar','敌方小兵血条',24,946,211,67,11,'窄条生命提示'),
('25-cursor','游戏光标',24,846,288,48,65,'指针及其下方场景背景'),
('26-tower-bar','防御塔血条',10,881,48,263,37,'从 10 秒补充建筑血条'),
('27-level-up','升级提示组',10,810,886,164,56,'升级文字与箭头按钮'),
]
def run(args):
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-y',*args],capture_output=True,check=True)
def main():
 OUT.mkdir(parents=True,exist_ok=True);(OUT/'components').mkdir(exist_ok=True)
 before=hashlib.sha256(SOURCE.read_bytes()).hexdigest()
 for t in sorted({p[2] for p in PARTS}):run(['-ss',str(t),'-i',str(SOURCE),'-frames:v','1',str(OUT/f'source-{t}s.png')])
 run(['-i',str(OUT/'source-24s.png'),'-vf','crop=1904:993:0:31:exact=1','-frames:v','1',str(OUT/'gameplay-24s.png')])
 parts=[]
 for key,label,t,x,y,w,h,note in PARTS:
  assert x>=0 and y>=0 and x+w<=1904 and y+h<=1024
  file=f'components/{key}.png'
  run(['-i',str(OUT/f'source-{t}s.png'),'-vf',f'crop={w}:{h}:{x}:{y}:exact=1','-frames:v','1',str(OUT/file)])
  parts.append(dict(id=key,label=label,frame_seconds=t,x=x,y=y,width=w,height=h,file=file,note=note,pixels_preserved=True,transparent=False,sha256=hashlib.sha256((OUT/file).read_bytes()).hexdigest()))
 manifest=dict(source=str(SOURCE.relative_to(ROOT)).replace(chr(92),'/'),source_sha256=before,frame_width=1904,frame_height=1024,title_bar_height=31,main_frame_seconds=24,components=parts)
 (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==before
 regions=[('01 HUD',680,930,500,94),('17 BUFFS',759,905,134,26),('18 MINIMAP',1583,703,321,321),('21 MATCH DATA',1568,31,336,31),('23 HERO',741,416,141,50),('25 CURSOR',846,288,48,65)]
 svg=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1904 1024"><image href="source-24s.png" width="1904" height="1024"/>']
 for i,(label,x,y,w,h) in enumerate(regions):
  c=['#70ead7','#f4c477','#a8b8ff'][i%3];ty=max(32,y-27)
  svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="{c}" stroke-width="3"/><rect x="{x}" y="{ty}" width="190" height="24" fill="#07131e"/><text x="{x+5}" y="{ty+17}" fill="{c}" font-family="monospace" font-size="17">{label}</text>')
 svg.append('</svg>');(OUT/'annotated-layout.svg').write_text(''.join(svg),encoding='utf-8')
 cards=[]
 for p in parts:
  cards.append(f'<article><header><span>{p["id"].split("-")[0]}</span><h3>{html.escape(p["label"])}</h3></header><a href="{p["file"]}" target="_blank"><div class="crop"><img src="{p["file"]}" alt="{html.escape(p["label"])}"></div></a><p>{html.escape(p["note"])}</p><code>{p["width"]} × {p["height"]} · x {p["x"]}, y {p["y"]} · {p["frame_seconds"]}s</code></article>')
 page='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>原版实机 UI 拆解</title><style>
 *{box-sizing:border-box}body{margin:0;background:#09131c;color:#d4dfdf;font:14px/1.65 system-ui,"Microsoft YaHei",sans-serif}main{max-width:1320px;margin:auto;padding:32px 28px}h1{font-size:28px;margin:8px 0}h2{margin:28px 0 14px;font-size:20px}p{color:#91a8b3}.tag{color:#72d9ca;font:11px monospace;letter-spacing:3px}nav{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}a{color:#e2ca92;text-decoration:none}nav a{border:1px solid #4b5b60;padding:8px 14px;background:#12212b}.overview{width:100%;border:1px solid #516366;display:block}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px}article{padding:17px;border:1px solid #314750;background:#0f1f29}article header{display:flex;gap:12px;align-items:center}header span{color:#78d9c8;font:12px monospace}h3{font-size:15px;margin:0}.crop{min-height:120px;margin-top:14px;padding:14px;display:flex;align-items:center;justify-content:center;background:repeating-conic-gradient(#182934 0% 25%,#13242e 0% 50%) 0 0/16px 16px;overflow:auto}.crop img{image-rendering:pixelated;max-width:100%;height:auto;object-fit:contain}article p{font-size:12px;min-height:40px;margin-bottom:10px}code{font-size:10px;color:#8caaa9}footer{margin:30px 0;color:#81969e;font-size:12px}.note{border-left:2px solid #ac915a;padding:8px 15px;background:#15222a}
 </style><main><div class="tag">GAMEPLAY REFERENCE / UI ANATOMY</div><h1>原版实机 · UI 部件拆解</h1><p>主截图 24 秒 · 补充截图 10 秒 · 原始画面 1904 × 1024 · 27 个部件</p><div class="note">先观察原版，再逐项像素化。以下是原画面裁切，保留场景背景和界面当时状态；没有去背景，也没有重绘。</div><nav><a href="source-24s.png" target="_blank">完整截图</a><a href="gameplay-24s.png" target="_blank">不含标题栏的画面</a><a href="source-10s.png" target="_blank">补充截图</a><a href="manifest.json" target="_blank">坐标清单</a></nav><h2>01 / 原版布局与分区</h2><object class="overview" data="annotated-layout.svg" type="image/svg+xml" aria-label="原版 HUD 分区标注"></object><h2>02 / 独立部件</h2><section class="grid">'''+''.join(cards)+'''</section><footer>坐标以完整视频帧左上角为原点。源 MP4 保持不变，部件尚未替换游戏 UI。点击部件可打开原始尺寸。</footer></main></html>'''
 (OUT/'index.html').write_text(page,encoding='utf-8')
 lines=['# 原版实机 UI 截图与拆解','','主截图 24 秒；补充截图 10 秒。坐标基于 1904×1024 完整视频帧（含 31px 标题栏）。','','27 个矩形裁切保留原像素与背景，未去背景、未重绘，不能直接当作透明生产素材。manifest.json 记录帧时间、坐标、尺寸和哈希。源视频不变。','','| 部件 | 内容 | 时间 | 坐标 / 尺寸 |','| --- | --- | --- | --- |']
 lines.extend(f'| {p["id"]} | {p["label"]} | {p["frame_seconds"]}s | {p["x"]},{p["y"]} / {p["width"]}×{p["height"]} |' for p in parts)
 (OUT/'README.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
 print(f'Extracted {len(parts)} UI components; source SHA-256 unchanged.')
if __name__=='__main__':main()
