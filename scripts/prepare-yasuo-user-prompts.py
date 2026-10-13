"""Inspect or pad the four user-supplied poses without redrawing any pixels.

This script never submits a generation request. Prepared PNGs are inputs only.
"""
import argparse
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v7-user-prompts"
SOURCE_IDS = [
    "bb282a55-9396-455f-9265-c70ce90f27a0",
    "d3c76bfe-d445-4c29-a039-345c1462e569",
    "5b9aabd1-3ca2-4d36-88e5-a3eece67c78b",
    "88c0673e-906e-432e-9ce2-b95a4f5f0f2b",
]
# Foot-center points are reviewed after the --inspect pass.
SOURCE_ANCHORS = [(37, 107), (40, 107), (49, 122), (79, 119)]
CANVAS = (192, 192)
GROUND_ANCHOR = (96, 164)


def inspect(image):
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    histogram = alpha.histogram()
    rows = []
    if bbox:
        for y in range(max(0, bbox[3] - 6), bbox[3]):
            xs = [x for x in range(image.width) if alpha.getpixel((x, y))]
            rows.append({"y": y, "xs": xs})
    return {
        "size": list(image.size), "bbox": bbox,
        "alpha_extrema": alpha.getextrema(),
        "partial_alpha_pixels": sum(histogram[1:255]),
        "bottom_rows": rows,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--inspect", action="store_true")
    args = parser.parse_args()
    reports = []
    prepared = []
    for index, (source_id, source_anchor) in enumerate(zip(SOURCE_IDS, SOURCE_ANCHORS), 1):
        source = Path("C:/Users/PC/AppData/Local/Temp") / f"codex-clipboard-{source_id}.png"
        image = Image.open(source).convert("RGBA")
        report = {"pose": index, **inspect(image)}
        if not args.inspect:
            assert image.getchannel("A").getextrema()[0] == 0, "Expected a transparent source"
            original = BASE / "inputs" / f"pose-{index}-original.png"
            original.parent.mkdir(parents=True, exist_ok=True)
            if original.exists():
                assert original.read_bytes() == source.read_bytes(), "Never overwrite another input"
            else:
                shutil.copyfile(source, original)
            dx = GROUND_ANCHOR[0] - source_anchor[0]
            dy = GROUND_ANCHOR[1] - source_anchor[1]
            assert dx >= 0 and dy >= 0
            assert dx + image.width <= CANVAS[0] and dy + image.height <= CANVAS[1]
            aligned = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
            aligned.paste(image, (dx, dy))
            assert aligned.crop((dx, dy, dx + image.width, dy + image.height)).tobytes() == image.tobytes()
            assert aligned.getchannel("A").histogram()[1:] == image.getchannel("A").histogram()[1:]
            target = BASE / "inputs" / f"pose-{index}.png"
            if target.exists():
                assert Image.open(target).convert("RGBA").tobytes() == aligned.tobytes()
            else:
                aligned.save(target)
            report.update(source_anchor=list(source_anchor), translation=[dx, dy], prepared=target.relative_to(ROOT).as_posix())
            prepared.append(aligned)
        reports.append(report)
    if prepared:
        sheet = Image.new("RGB", (192 * 4, 216), "#24333e")
        draw = ImageDraw.Draw(sheet)
        for index, image in enumerate(prepared):
            sheet.paste(image, (index * 192, 24), image)
            draw.text((index * 192 + 8, 8), f"Pose {index + 1} - native 1x", fill="white")
            x, y = index * 192 + GROUND_ANCHOR[0], 24 + GROUND_ANCHOR[1]
            draw.line((x - 3, y, x + 3, y), fill="#efba63")
        qa = ROOT / "docs/screenshots/animation-qa/yasuo-user-prompts"
        qa.mkdir(parents=True, exist_ok=True)
        sheet.save(qa / "prepared-inputs.png")
    print(json.dumps(reports, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
