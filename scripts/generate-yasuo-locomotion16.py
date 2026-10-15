"""Generate the authorized 16-direction/action clips; resume known jobs without resubmitting."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import threading

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets/heroes/yasuo/locomotion16-2026-10-15'
LEDGER = OUTPUT / 'generation.json'
CLI = ROOT / '.agents/skills/game-assets/meowart_api.py'
DIRECTIONS = {'se':'右下方','e':'右方','s':'下方','sw':'左下方','w':'左方','nw':'左上方','n':'上方','ne':'右上方'}
lock = threading.Lock()

def save():
    LEDGER.write_text(json.dumps(ledger, ensure_ascii=False, indent=2), encoding='utf-8')

def generate(job):
    output = OUTPUT / 'generated' / job['key']
    manifests = list(output.glob('**/final_outputs.json')) if output.exists() else []
    for manifest in manifests:
        data = json.loads(manifest.read_text(encoding='utf-8'))
        if data.get('status') == 'success' and data.get('outputs'):
            with lock:
                job.update(status='success', manifest=manifest.relative_to(ROOT).as_posix())
                save()
            return
    if job['status'] in ('submitting','interrupted') and not job.get('job_id'):
        raise RuntimeError(f"Unknown submission outcome for {job['key']}; inspect before retrying")
    source = ROOT / job['source']
    if hashlib.sha256(source.read_bytes()).hexdigest() != job['source_sha256']:
        raise RuntimeError('Source changed: '+job['key'])
    if job.get('job_id'):
        args = ['animate-poll', '--api-job-id', job['job_id']]
    else:
        args = ['animate-run', '--image-file', str(source), '--prompt', job['prompt'],
                '--output-frames','16','--output-format','webp','--animation-type',job['state'],
                '--animation-model','pixel-engine-v1.1','--intelligence','standard','--optimize-prompt',
                '--color-count','64','--remove-bg-method','standard']
    with lock:
        job['status'] = 'submitting'
        save()
    process = subprocess.Popen([sys.executable,'-u',str(CLI),*args,'--output-dir',str(output)],
                               cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,
                               text=True,encoding='utf-8',errors='replace',
                               env={**os.environ,'PYTHONUTF8':'1','PYTHONIOENCODING':'utf-8'})
    last_status = ''
    for line in process.stdout:
        match = re.search(r'\bjob_[a-zA-Z0-9]+\b',line)
        if match:
            with lock:
                job['job_id'] = match.group(0)
                save()
        if 'status=' in line:
            if line == last_status:
                continue
            last_status = line
        if line.startswith(('[INFO]','[WARN]','[ERROR]')):
            print(f"[{job['key']}] {line.strip()}",flush=True)
    code = process.wait()
    manifests = list(output.glob('**/final_outputs.json'))
    with lock:
        if code == 0 and manifests:
            job.update(status='success', manifest=manifests[-1].relative_to(ROOT).as_posix())
        else:
            job['status'] = 'interrupted'
        save()
    print(f"[{job['key']}] {job['status']}",flush=True)
    if job['status'] != 'success':
        raise RuntimeError('Generation incomplete: '+job['key'])

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8',errors='replace')
    parser=argparse.ArgumentParser()
    parser.add_argument('--pilot',action='store_true')
    options=parser.parse_args()
    if LEDGER.exists():
        ledger=json.loads(LEDGER.read_text(encoding='utf-8'))
    else:
        jobs=[]
        for direction,label in DIRECTIONS.items():
            for state in ['idle','walk']:
                source=OUTPUT/'inputs'/f'{state}-{direction}.png'
                motion=('双脚固定，缓慢轻微呼吸，围巾与头发轻摆' if state=='idle' else
                        '原地缓慢交替迈步，完成一个完整左右脚步行循环，落脚稳定，围巾和头发自然跟随')
                jobs.append(dict(key=f'{state}-{direction}',state=state,direction=direction,
                    source=source.relative_to(ROOT).as_posix(),source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
                    prompt=f'角色始终保持输入图中的朝向（屏幕{label}），{motion}。动作首尾自然衔接，不转身，不平移，镜头固定，保持现有造型、服装、武器与像素风格。',
                    status='pending',job_id=None))
        ledger=dict(frame_count=16,cycle_ms=800,estimated_credits=560,jobs=jobs)
        save()
    selected=[j for j in ledger['jobs'] if not options.pilot or j['direction']=='se']
    with ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(generate,selected))
