"""Extract an internal, timestamped contact sheet from a local reference video."""
import argparse
import subprocess
from io import BytesIO
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw

parser = argparse.ArgumentParser()
parser.add_argument("video", type=Path)
parser.add_argument("--times", required=True, help="Comma-separated seconds")
parser.add_argument("--crop", help="left,top,right,bottom in source pixels")
parser.add_argument("--output", required=True, type=Path)
args = parser.parse_args()
times = [float(value) for value in args.times.split(",")]
crop = tuple(map(int, args.crop.split(","))) if args.crop else None
frames = []
for time in times:
    result = subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-ss", str(time),
         "-i", str(args.video), "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"],
        check=True, capture_output=True,
    )
    frame = Image.open(BytesIO(result.stdout)).convert("RGB")
    print(f"reference {time:.3f}s source={frame.width}x{frame.height}")
    if crop:
        frame = frame.crop(crop)
    # Reference inspection only; never used to resample game art.
    if frame.width > 480:
        frame = frame.resize((480, round(frame.height * 480 / frame.width)))
    frames.append(frame)
width, height = frames[0].size
columns = min(4, len(frames))
rows = (len(frames) + columns - 1) // columns
contact = Image.new("RGB", (columns * width, rows * (height + 24)), "#182029")
draw = ImageDraw.Draw(contact)
for index, (time, frame) in enumerate(zip(times, frames)):
    x, y = index % columns * width, index // columns * (height + 24)
    draw.text((x + 8, y + 5), f"{time:.3f} s", fill="white")
    contact.paste(frame, (x, y + 24))
args.output.parent.mkdir(parents=True, exist_ok=True)
contact.save(args.output)
print(f"Internal reference inspection: {args.output}")
