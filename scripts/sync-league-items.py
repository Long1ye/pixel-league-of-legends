"""Build the pinned normal-mode equipment catalog and cache official icons locally."""
import concurrent.futures
import html
import json
import re
import time
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
VERSION = '16.20.1'
source = json.loads((ROOT / f'docs/item-data/items-{VERSION}.json').read_text(encoding='utf-8'))['data']
store = {int(k): v for k, v in source.items() if int(k) < 10000 and any(v['maps'].get(m) for m in ('11', '12')) and v['gold']['purchasable'] and v.get('inStore', True) and not v.get('hideFromAll', False)}
automatic = {3040: '女神之泪叠满后由大天使之杖进化', 3042: '女神之泪叠满后由魔宗进化', 3121: '女神之泪叠满后由凛冬之临进化', 2530: '由耳语头环进化', 3866: '辅助任务升级', 3867: '辅助任务升级', 2422: '启迪符文赠送', 2052: '大乱斗开局赠送'}
pool = {**store, **{k: source[str(k)] for k in automatic}}
pending = list(pool)
while pending:
    key = pending.pop()
    for dependency in pool[key].get('from', []):
        item_id = int(dependency)
        if item_id not in pool:
            pool[item_id] = source[dependency]
            automatic[item_id] = '条件升级装备，不能直接购买'
            pending.append(item_id)

def plain(text):
    return html.unescape(re.sub(r'<[^>]+>', '', re.sub(r'<br\s*/?>', '\n', text))).strip()

labels = {'攻击力': 'ad', '生命值': 'hp', '护甲': 'armor', '魔法抗性': 'mr', '法术强度': 'ap', '攻击速度': 'as', '暴击几率': 'crit', '移动速度': 'ms', '生命偷取': 'lifesteal', '全能吸血': 'omnivamp', '技能急速': 'haste', '法力': 'mana', '基础法力回复': 'manaRegen', '基础生命回复': 'regenPercent', '生命回复': 'regen', '护甲穿透': 'armorPen', '穿甲': 'lethality', '法术穿透': 'magicPen', '韧性': 'tenacity', '治疗和护盾强度': 'healShield', '治疗与护盾强度': 'healShield', '暴击伤害': 'critDamage', '减速抗性': 'slowResist'}
fields = {'FlatHPPoolMod': 'hp', 'FlatPhysicalDamageMod': 'ad', 'FlatMagicDamageMod': 'ap', 'FlatArmorMod': 'armor', 'FlatSpellBlockMod': 'mr', 'PercentAttackSpeedMod': 'as', 'FlatCritChanceMod': 'crit', 'FlatMovementSpeedMod': 'ms', 'PercentMovementSpeedMod': 'percentMS', 'PercentLifeStealMod': 'lifesteal', 'FlatMPPoolMod': 'mana'}
active_ids = {2003:'potion',2031:'refill',2138:'elixir',2139:'elixir',2140:'elixir',2141:'hat',2420:'stasis',3157:'stasis',3077:'cleave',3074:'cleave',3748:'cleave',6631:'stride',6698:'cleave',3140:'cleanse',3139:'cleanse',3142:'speed',2065:'speed',3143:'slow',3190:'shield',3107:'heal',3222:'cleanse',3146:'gunblade',3152:'rocket',4003:'anchor',4004:'anchor',3340:'ward',3363:'ward',3364:'sweep',2055:'ward'}
groups = json.loads((ROOT / f'docs/item-data/items-{VERSION}.json').read_text(encoding='utf-8')).get('groups', [])
group_ids = {g['id'] for g in groups if g.get('MaxGroupOwnable') == '1'}
legacy_order = [1036,1042,1001,1055,1018,1037,1038,1053,1043,3086,1028,1029,3006,3031,3046,3153]
catalog = []
for key in sorted(pool, key=lambda k: (legacy_order.index(k) if k in legacy_order else 1000 + k)):
    item = pool[key]
    raw = re.search(r'<stats>(.*?)</stats>', item['description'], re.S)
    stats = {fields[k]: value for k, value in item['stats'].items() if k in fields and value}
    if raw:
        for value, percent, label in re.findall(r'(\d+(?:\.\d+)?)\s*(%)?\s*([^\d\n]+)', plain(raw[1])):
            label = label.strip()
            if label in labels:
                field = labels[label]
                if percent and field == 'ms': field = 'percentMS'
                if not percent and field == 'magicPen': field = 'flatMagicPen'
                stats[field] = float(value) / (100 if percent else 1)
    tags = item['tags']
    recipe = [int(k) for k in item.get('from', [])]
    category = '饰品' if 'Trinket' in tags else '消耗品' if 'Consumable' in tags else '成装' if item.get('depth', 0) >= 3 or str(key) in group_ids and recipe else '组件' if recipe else '基础'
    condition = automatic.get(key)
    if item.get('requiredChampion'): condition = f"英雄专属：{item['requiredChampion']}"
    if 'Jungle' in tags and key in (1101,1102,1103,1105,1106,1107): condition = '需要打野任务与野怪系统；当前 Solo 未开放'
    if key in (3865,3866,3867,3869,3870,3871,3876,3877): condition = '需要辅助任务；当前 Solo 未开放'
    if 3168 <= key <= 3176: condition = '位置任务奖励升级；当前 Solo 未开放'
    if key == 6032: condition = '地图事件专属奖励；不能直接购买'
    if key == 3085: condition = '仅远程英雄可使用分裂箭；当前亚索为近战英雄'
    effect = plain(re.sub(r'<stats>.*?</stats>', '', item['description'], flags=re.S)).strip()
    unique = 'boots' if 'Boots' in tags or key == 3172 else 'legendary' if category == '成装' else None
    exclusions = []
    for name, ids in {'lifeline':[2525,3053,3155,3156,6673], 'lastwhisper':[3033,3036,6694], 'magicpen':[3135,3137], 'hydra':[3074,3748,6631,6698], 'tear':[3003,3004,3119,3040,3042,3121], 'spellblade':[3057,3078,3100,3508,6662,2510], 'quicksilver':[3140,3139], 'stasis':[2420,3157], 'starter':[1054,1055,1056,1086,1120]}.items():
        if key in ids: exclusions.append(name)
    record = {'id':key,'name':plain(item['name']),'cost':item['gold']['total'],'sell':item['gold']['sell'],'icon':legacy_order.index(key) if key in legacy_order else key,'category':category,'stats':stats,'recipe':recipe,'tags':tags,'maps':[int(m) for m in ('11','12') if item['maps'].get(m)],'effect':effect,'officialIcon':item['image']['full']}
    if unique: record['unique'] = unique
    if exclusions: record['groups'] = exclusions
    if condition: record['condition'] = condition
    if key in active_ids: record['active'] = active_ids[key]
    if key == 2031: record['charges'] = 2
    if key in (2138,2139,2140): record['minLevel'] = 9
    catalog.append(record)

data_dir = ROOT / 'src/game/data'
data_dir.mkdir(parents=True, exist_ok=True)
(data_dir / f'items-{VERSION}.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=1),encoding='utf-8')
icon_dir = ROOT / 'assets/ui/league-items-16.20.1'
icon_dir.mkdir(parents=True, exist_ok=True)
def download(record):
    path = icon_dir / f"{record['id']}.png"
    url = f"https://ddragon.leagueoflegends.com/cdn/{VERSION}/img/item/{record['officialIcon']}"
    for attempt in range(3):
        try:
            if not path.exists():
                with urllib.request.urlopen(url,timeout=25) as response: content=response.read()
                assert content[:8] == b'\x89PNG\r\n\x1a\n'
                path.write_bytes(content)
            with Image.open(path) as image: assert image.width == image.height and 64 <= image.width <= 512
            return None
        except Exception as error:
            if attempt == 2: return f"{record['id']}: {error}"
            time.sleep(attempt+1)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    failures = [error for error in executor.map(download,catalog) if error]
audit = {'version':VERSION,'source':f'https://ddragon.leagueoflegends.com/cdn/{VERSION}/data/zh_CN/item.json','count':len(catalog),'storeEntries':len(store),'conditional':sum('condition' in r for r in catalog),'icons':len(catalog)-len(failures),'failures':failures,'excluded':'Arena and other game modes, removed inStore=false legacy items, internal building buffs and test items','ids':[r['id'] for r in catalog]}
(ROOT / 'docs/item-data/full-catalog-16.20.1.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in audit.items() if k not in ('ids','source')},ensure_ascii=False))
if failures: raise SystemExit(1)
