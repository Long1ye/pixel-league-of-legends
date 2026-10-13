"""Inspect declared final media without changing generated art or source inputs."""
from pathlib import Path
import argparse
import hashlib
import json

from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets/hero-animations/2026-10-09/v2"
parser = argparse.ArgumentParser()
parser.add_argument("--partial", action="store_true")
parser.add_argument("--contact-sheets", action="store_true")
args = parser.parse_args()
study = json.loads((BASE / "study.json").read_text(encoding="utf-8"))
batch = json.loads((BASE / "batch.json").read_text(encoding="utf-8"))
rows, errors, contact_frames, comparisons = [], [], {}, []


def require(condition, message):
    if not condition:
        errors.append(message)


for job in batch["jobs"]:
    source = ROOT / job["source"]
    require(hashlib.sha256(source.read_bytes()).hexdigest() == job["source_sha256"],
            f"Source changed: {job['key']}")

for hero in study["heroes"]:
    for clip in hero["clips"]:
        key = f"{hero['id']}/{clip['state']}-{clip['direction']}"
        if clip["status"] != "success":
            require(args.partial, f"Clip unfinished: {key}")
            continue
        manifest = json.loads((BASE / clip["manifest"]).read_text(encoding="utf-8"))
        require(manifest["status"] == "success", f"Manifest unsuccessful: {key}")
        require(manifest["job_id"] == clip["job_id"], f"Job ID mismatch: {key}")
        declared = {(ROOT / item["path"]).resolve() for item in manifest["outputs"] if item["type"] == "media"}
        registered = {(BASE / clip[format]).resolve() for format in ("webp", "gif", "sheet")}
        require(declared == registered and len(declared) == 3, f"Final media mismatch: {key}")
        decoded = {}
        for format in ("webp", "gif", "sheet"):
            path = BASE / clip[format]
            with Image.open(path) as source:
                frames, durations = [], []
                for frame in ImageSequence.Iterator(source):
                    rgba = frame.convert("RGBA")
                    rgba.load()
                    frames.append(rgba.copy())
                    durations.append(source.info.get("duration", 0))
                size, image_format, loop = list(source.size), source.format, source.info.get("loop")
            alpha_levels = [sorted(f.getchannel("A").getextrema()) for f in frames]
            alpha_counts = [len(f.getchannel("A").getcolors(256)) for f in frames]
            require(all(levels == [0, 255] for levels in alpha_levels) and all(count == 2 for count in alpha_counts),
                    f"Non-binary or absent alpha: {key}/{format}")
            if format == "sheet":
                require(image_format == "PNG" and size == [clip["width"] * 3, clip["height"] * 3],
                        f"Sheet dimensions: {key}")
                cells = [frames[0].crop((i % 3 * clip["width"], i // 3 * clip["height"],
                         (i % 3 + 1) * clip["width"], (i // 3 + 1) * clip["height"])) for i in range(9)]
                require([f.getchannel("A").getbbox() is not None for f in cells] == [True] * 8 + [False],
                        f"Sheet cells: {key}")
                frames = cells[:8]
                contact_frames[(hero["id"], clip["state"], clip["direction"])] = frames
            else:
                require(image_format == format.upper() and size == [clip["width"], clip["height"]],
                        f"Animation format/dimensions: {key}/{format}")
                require(len(frames) == 8 and durations == [100] * 8 and loop == 0,
                        f"Animation timing/loop: {key}/{format}")
            bounds = [f.getchannel("A").getbbox() for f in frames]
            require(all(bounds), f"Empty animation frame: {key}/{format}")
            visible = [Image.alpha_composite(Image.new("RGBA", f.size, (0, 0, 0, 255)), f).convert("RGB") for f in frames]
            decoded[format] = visible
            changes = [sum(ImageStat.Stat(ImageChops.difference(a, b)).sum)
                       for a, b in zip(visible, visible[1:] + visible[:1])]
            rows.append({"key": key, "format": image_format, "path": clip[format], "size": size,
                         "frame_count": len(frames), "durations_ms": durations if format != "sheet" else None,
                         "loop": loop, "bounds": bounds, "frame_change_sums": changes,
                         "alpha_binary": all(count == 2 for count in alpha_counts),
                         "touches_canvas_edge": any(b and (b[0] == 0 or b[1] == 0 or b[2] == frames[0].width or b[3] == frames[0].height) for b in bounds)})
        for format in ("webp", "gif"):
            differences = [ImageChops.difference(a, b) for a, b in zip(decoded[format], decoded["sheet"])]
            exact = len(decoded[format]) == len(decoded["sheet"]) and all(diff.getbbox() is None for diff in differences)
            comparisons.append({"key": key, "format": format, "visible_pixels_equal_to_sheet": exact,
                                "max_frame_mean_channel_difference": max(sum(ImageStat.Stat(diff).mean) / 3 for diff in differences)})
            # WebP is lossless. GIF has a smaller palette and legitimately differs in colour.
            if format == "webp":
                require(exact, f"WebP visible frames differ from PNG sheet: {key}")

report = {"status": "passed" if not errors and len(rows) == 144 else "partial_pass" if not errors else "failed",
          "media_count": len(rows), "clip_count": len(rows) // 3,
          "authored_frames": len(rows) // 3 * 8, "inputs_unmodified": not any("Source changed" in e for e in errors),
          "canvas_edge_contacts": [row["key"] for row in rows if row["format"] == "WEBP" and row["touches_canvas_edge"]],
          "errors": errors, "media": rows, "format_comparisons": comparisons}
(BASE / "validation.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

if args.contact_sheets:
    qa = ROOT / "docs/screenshots/animation-qa"
    qa.mkdir(parents=True, exist_ok=True)
    for hero in study["heroes"]:
        for state in ("idle", "walk"):
            available = [(direction, contact_frames[(hero["id"], state, direction)]) for direction in study["directions"]
                         if (hero["id"], state, direction) in contact_frames]
            all_bounds = [f.getchannel("A").getbbox() for _, frames in available for f in frames]
            left, top = min(b[0] for b in all_bounds), min(b[1] for b in all_bounds)
            right, bottom = max(b[2] for b in all_bounds), max(b[3] for b in all_bounds)
            width, height = right - left, bottom - top
            # Internal QA only: crop transparent margins, never resample pixels or modify originals.
            sheet = Image.new("RGBA", (68 + (width + 8) * 8, 30 + (height + 24) * len(available)), (19, 38, 48, 255))
            draw = ImageDraw.Draw(sheet)
            draw.text((8, 8), f"{hero['id']} {state} | native pixels | internal review", fill="white")
            for row, (direction, frames) in enumerate(available):
                y = 30 + row * (height + 24)
                draw.text((8, y + 8), direction.upper(), fill="white")
                for column, frame in enumerate(frames):
                    x = 68 + column * (width + 8)
                    draw.text((x, y), str(column + 1), fill=(151, 228, 209))
                    sheet.alpha_composite(frame.crop((left, top, right, bottom)), (x, y + 18))
            sheet.convert("RGB").save(qa / f"{hero['id']}-{state}.png")

print(json.dumps({key: value for key, value in report.items() if key not in ("media", "format_comparisons")}, ensure_ascii=False))
if errors:
    raise SystemExit(1)
