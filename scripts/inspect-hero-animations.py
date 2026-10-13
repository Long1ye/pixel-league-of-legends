"""Read declared animation media and report frame/alpha properties; never changes art."""
from pathlib import Path
import json

from PIL import Image, ImageChops, ImageSequence, ImageStat


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets/hero-animations/2026-10-09/v1"
rows = []
for manifest_path in sorted(ASSETS.rglob("final_outputs.json")):
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for item in manifest["outputs"]:
        if item["type"] != "media":
            continue
        path = ROOT / item["path"]
        with Image.open(path) as source:
            frames = []
            durations = []
            for frame in ImageSequence.Iterator(source):
                rgba = frame.convert("RGBA")
                rgba.load()
                frames.append(rgba.copy())
                durations.append(source.info.get("duration", 0))
            alpha_extrema = [f.getchannel("A").getextrema() for f in frames]
            bounds = [f.getchannel("A").getbbox() for f in frames]
            visible = [Image.alpha_composite(Image.new("RGBA", f.size, (0, 0, 0, 255)), f).convert("RGB") for f in frames]
            changes = [sum(ImageStat.Stat(ImageChops.difference(a, b)).sum) for a, b in zip(visible, visible[1:] + visible[:1])]
            sheet_cells = None
            if source.format == "PNG":
                width, height = source.width // 3, source.height // 3
                alpha = frames[0].getchannel("A")
                sheet_cells = [alpha.crop((i % 3 * width, i // 3 * height,
                    (i % 3 + 1) * width, (i // 3 + 1) * height)).getbbox() is not None for i in range(9)]
            rows.append({
                "path": path.relative_to(ASSETS).as_posix(),
                "job_id": manifest["job_id"],
                "format": source.format,
                "size": list(source.size),
                "frame_count": len(frames),
                "durations_ms": durations,
                "duration_ms": sum(durations),
                "loop": source.info.get("loop"),
                "alpha_extrema": alpha_extrema,
                "alpha_level_counts": [len(f.getchannel("A").getcolors(256)) for f in frames],
                "bounds": bounds,
                "frame_change_sums": changes,
                "sheet_nonempty_cells": sheet_cells,
            })

study = json.loads((ASSETS / "study.json").read_text(encoding="utf-8"))
expected = {clip[format]: clip for hero in study["heroes"] for clip in hero["clips"] for format in ("webp", "gif", "sheet")}
if set(expected) != {row["path"] for row in rows}:
    raise ValueError("Registry must contain exactly the declared media outputs")
for row in rows:
    clip = expected[row["path"]]
    if any(extrema != (0, 255) for extrema in row["alpha_extrema"]) or any(count != 2 for count in row["alpha_level_counts"]):
        raise ValueError(f"Non-binary/missing transparency: {row['path']}")
    if row["format"] == "PNG":
        if row["size"] != [clip["width"] * 3, clip["height"] * 3] or row["sheet_nonempty_cells"] != [True] * 8 + [False]:
            raise ValueError(f"Invalid eight-frame sheet: {row['path']}")
    elif row["frame_count"] != 8 or row["duration_ms"] != 800 or row["loop"] != 0 or row["size"] != [clip["width"], clip["height"]]:
        raise ValueError(f"Invalid animation contract: {row['path']}")
print(json.dumps(rows, ensure_ascii=False, indent=2))
