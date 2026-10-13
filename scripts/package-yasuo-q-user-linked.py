"""Encode the actual browser-rendered atlas, without drawing or AI modification."""
import argparse
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v7-user-linked"
DIRECTIONS = ["e", "se", "s", "sw", "w", "nw", "n", "ne"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", type=Path, default=BASE)
    parser.add_argument("--directions", nargs="+", choices=DIRECTIONS, default=DIRECTIONS)
    parser.add_argument("--atlas-name", default="yasuo-q-user-linked-atlas.png")
    parser.add_argument("--include-preview", action="store_true")
    parser.add_argument("--write-only", nargs="+", choices=DIRECTIONS,
                        help="Re-encode only these directions; validate and preserve the other existing clips")
    args = parser.parse_args()
    base, directions = args.base.resolve(), args.directions
    if len(set(directions)) != len(directions):
        parser.error("directions must be unique")
    write_only = set(args.write_only) if args.write_only else set(directions)
    if not write_only.issubset(directions):
        parser.error("write-only directions must be in the atlas direction list")
    output = base / "export"
    source = output / args.atlas_name
    durations = [32] * 15 + [920]
    entries = []
    with Image.open(source) as image:
        assert image.format == "PNG" and image.size == (1152, 1024 * len(directions))
        atlas = image.convert("RGBA")
        for direction_index, direction in enumerate(directions):
            frames = []
            for frame in range(16):
                x = frame % 4 * 288
                y = (direction_index * 4 + frame // 4) * 256
                frames.append(atlas.crop((x, y, x + 288, y + 256)))
            path = output / f"q-{direction}-linked.webp"
            if direction in write_only:
                frames[0].save(path, save_all=True, append_images=frames[1:], duration=durations, loop=0, lossless=True, method=6)
            elif not path.is_file():
                parser.error(f"Cannot preserve missing clip: {path}")
            with Image.open(path) as animation:
                assert animation.size == (288, 256) and animation.info["loop"] == 0
                decoded_durations = []
                edge_contact = []
                for frame in range(animation.n_frames):
                    animation.seek(frame)
                    rgba = animation.convert("RGBA")
                    decoded_durations.append(animation.info.get("duration", 0))
                    bounds = rgba.getchannel("A").getbbox()
                    if bounds[0] == 0 or bounds[1] == 0 or bounds[2] == 288 or bounds[3] == 256:
                        edge_contact.append(frame)
                assert sum(decoded_durations) == 1400
                entries.append({"direction": direction, "path": f"export/{path.name}", "width": 288, "height": 256,
                    "source_frames": 16, "encoded_frames": animation.n_frames, "duration_ms": 1400,
                    "cast_duration_ms": 480, "loop": 0, "anchor": [144, 158], "alpha": True,
                    "edge_contact_frames": edge_contact, "method": "Actual preview renderer, encoded losslessly; no image generation"})
    (base / "animations.json").write_text(json.dumps({"directions": entries, "atlas": f"export/{args.atlas_name}",
        "atlas_columns": 4, "atlas_rows": 4 * len(directions), "cell_width": 288, "cell_height": 256,
        "direction_order": directions, "frames_per_direction": 16, "frame_durations_ms": durations,
        "cast_sample_times_ms": list(range(0, 481, 32))}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (base / "final_outputs.json").write_text(json.dumps({"status": "success", "generation_jobs": 0,
        "outputs": ([{"type": "interactive_preview", "path": "index.html", "mime_type": "text/html"}] if args.include_preview else [])
        + [{"type": "media", "path": f"export/{args.atlas_name}", "mime_type": "image/png"}]
        + [{"type": "media", "path": entry["path"], "mime_type": "image/webp"} for entry in entries]}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(entries, ensure_ascii=False))


if __name__ == "__main__":
    main()
