"""Preserve built-in generated concept originals and add them to the review page."""
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
folder = root / 'assets/map-concepts/howling-detail-v1'
config = json.loads((folder / 'motion-studies.json').read_text(encoding='utf-8'))
records = []
for study in config['studies']:
    source = Path(study['source'])
    target = folder / (study['file'] + '.png')
    if target.exists() and target.read_bytes() != source.read_bytes():
        raise RuntimeError(f'Refusing to overwrite different image: {target}')
    shutil.copyfile(source, target)
    (folder / (study['file'] + '.prompt.txt')).write_text(study['prompt'] + '\n', encoding='utf-8')
    with Image.open(target) as art:
        art.load()
        record = dict(file=target.name, title=study['title'], source=str(source),
                      size=list(art.size), mode=art.mode, format=art.format,
                      sha256=hashlib.sha256(target.read_bytes()).hexdigest(),
                      byteIdentical=source.read_bytes() == target.read_bytes(),
                      references=study['refs'], prompt=study['file'] + '.prompt.txt',
                      role='static environmental motion concept; animation not implemented')
        records.append(record)
manifest = dict(generator='built-in image_gen', builtinImageCalls=4, externalPaidRequests=0, assets=records)
(folder / 'motion-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

page_path = folder / 'index.html'
page = page_path.read_text(encoding='utf-8')
page = page.replace('地图细节 · 连续直墙专题', '地图细节 · 环境动态概念')
old_intro = '新增 09—11：古旧墙雕与金属饰件、墙脚霜晶与冰蚀、火盆灰烬与融雪。用局部材质和使用痕迹丰富场景，墙体完整共线，中央主路开敞；不增加转角、回墙或零散小草团。功能草丛继续参考 08 的少量、大块、连片高草。'
new_intro = '新增 12—15：飘旗与草浪、飞烬与融雪滴水、深渊流雾与飞鸟、圣所水晶与魄罗。通过风、火、水、雾和生物行为增加生命力；沿用现有冰桥画风，主路保持开敞。四张均为静态动态设计概念，尚未制作循环动画或接入游戏。'
page = page.replace(old_intro, new_intro)
if "import motion from './motion-studies.json';" not in page:
    page = page.replace("import materials from './material-studies.json';", "import materials from './material-studies.json';\nimport motion from './motion-studies.json';")
    page = page.replace('const studies=[', "const studies=[...motion.studies.map(s=>({title:s.file.slice(0,2)+' · '+s.title,url:images['./'+s.file+'.png'],prompt:prompts['./'+s.file+'.prompt.txt'],text:s.text})),")
page = page.replace('内置 imagegen 累计生成十一张；本轮新增三张', '内置 imagegen 累计生成十五张；动态概念本轮新增四张')
page_path.write_text(page, encoding='utf-8')

readme_path = folder / 'README.md'
readme = readme_path.read_text(encoding='utf-8')
section = '''## 新增环境动态概念（12—15）

2026-10-16，参考现有四张地图目标图与十一张细节概念的美术及修订约束，使用内置 imagegen 生成四张静态概念图。原图逐字节复制，未裁切、重采样或修图；每张的尺寸、来源与哈希见 motion-manifest.json，精确提示词见同名 .prompt.txt 与 motion-studies.json。浏览页默认展示 12，保留此前全部概念。

| 图像 | 画面动态 | 后续动画建议（尚未实现） |
| --- | --- | --- |
| [12 风场](12-wind-banner-brush.png) | 飘旗、大块草浪、挂灯轻摆、贴地雪粉 | 布料和草茎根部固定；共享阵风方向，摆幅错开；草丛边界稳定 |
| [13 冷暖](13-fire-embers-thaw.png) | 火舌、飞烬、薄烟、融雪滴水和涟漪 | 火焰短循环，飞烬独立粒子；滴水与水圈按事件衔接；暖光仅小幅变化 |
| [14 纵深](14-abyss-mist-flight.png) | 峡谷雾带、未冻瀑流、三只飞鸟 | 雾层缓慢错速漂移，鸟偶发穿行；瀑流在桥外循环；不遮蔽战斗面 |
| [15 生机](15-sanctuary-crystal-poros.png) | 水晶内部流光、稀疏微粒、两只魄罗 | 晶体本体固定，流光缓慢循环；魄罗呼吸、嗅闻与短跳使用停顿和随机间隔 |

建议首先制作 12 与 13：它们直接复用已有旗帜、功能草丛与火盆，能在近景持续传达风和温度。14 补远景纵深；15 的魄罗为可选环境生命设计，尚未确认碰撞、交互或最终落点。飞鸟、水滴在概念图中为便于阅读略作强调，落地时需按实机尺度校准。

桥段维持完整连续直墙、开敞主路与大块功能草丛；15 沿用圣所原有空间，仅用于出生区局部。四张均为不透明场景概念，不是动画文件、透明特效或可直接使用的精灵图集。本轮没有增加游戏代码、动画、碰撞或视野逻辑。四次内置生成，外部付费生成请求为零。

'''
if '## 新增环境动态概念（12—15）' not in readme:
    readme = readme.replace('# 冰桥地图细节概念图\n', '# 冰桥地图细节概念图\n\n' + section, 1)
readme_path.write_text(readme, encoding='utf-8')
print(json.dumps(manifest, ensure_ascii=False, indent=2))
