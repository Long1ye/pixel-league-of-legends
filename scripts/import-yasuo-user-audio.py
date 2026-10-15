"""Prepare user-named Q variants, Q3 and R; never modify the source files."""
from pathlib import Path
import array
import hashlib
import json
import math
import subprocess
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/source-materials/audio/亚索音频'
OUTPUT = ROOT / 'assets/audio/yasuo-user-v1'
RUNTIME = OUTPUT / 'runtime'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CLIPS = [
    ('亚索q-v1.mp3', 'yasuo-q-user-v1', .19, .43),
    ('亚索q-v2.mp3', 'yasuo-q-user-v2', .015, .57),
    ('亚索大招音效.mp4', 'yasuo-r-user', .86, 1.62),
    ('亚索q3.mp4', 'yasuo-q3-user', 0, 1.23),
    ('亚索走路音效.mp4', 'yasuo-walk-user-v1', 0, 3.65),
    ('亚索走路音效-v2.mp4', 'yasuo-walk-user-v2', .05, 4.95),
    ('亚索吹箫音效.mp4', 'yasuo-flute-user', 0, 6.3),
]


def decode(arguments):
    raw = subprocess.run([FFMPEG, '-v', 'error', *arguments, '-vn', '-f', 'f32le',
                          '-ac', '1', '-ar', '22050', '-'], capture_output=True, check=True).stdout
    samples = array.array('f', raw)
    return len(samples) / 22050, max(map(abs, samples)), math.sqrt(sum(x*x for x in samples) / len(samples))


def main():
    RUNTIME.mkdir(parents=True, exist_ok=True)
    records = []
    for filename, key, start, duration in CLIPS:
        source = SOURCE / filename
        before = hashlib.sha256(source.read_bytes()).hexdigest()
        args = ['-ss', str(start), '-i', str(source), '-t', str(duration)]
        _, peak, rms = decode(args)
        gain = min(3, .78/max(.0001, peak), .095/max(.0001, rms))
        target = RUNTIME / f'{key}.mp3'
        filters = f'volume={gain},afade=t=in:d=0.006,afade=t=out:st={duration-.025}:d=0.025'
        subprocess.run([FFMPEG, '-y', *args, '-vn', '-af', filters, '-ar', '44100',
                        '-ac', '2', '-b:a', '160k', str(target)], capture_output=True, check=True)
        seconds, output_peak, output_rms = decode(['-i', str(target)])
        assert output_peak <= 1 and output_rms > .005
        assert hashlib.sha256(source.read_bytes()).hexdigest() == before
        records.append(dict(source=str(source.relative_to(ROOT)).replace('\\', '/'),
                            source_sha256=before, file=target.name, start=start,
                            duration=round(seconds, 4), gain=round(gain, 6),
                            peak=round(output_peak, 6), rms=round(output_rms, 6),
                            sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
    (OUTPUT / 'manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Prepared {len(records)} audio clips; all source hashes unchanged.')


if __name__ == '__main__':
    main()
