"""Prepare the latest user poses with integer translation, never redraw pixels."""
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v8-user-ab"
SOURCES = [
    ("c96db295-1a0e-4e74-a5ab-9189fc58cc30", (50, 122)),
    ("8b8ef77d-9d43-42f6-b49a-ab341dd1ce75", (46, 114)),
]
CANVAS = (176, 176)
ANCHOR = (80, 150)


def main():
    inputs = BASE / "inputs"
    inputs.mkdir(parents=True, exist_ok=True)
    sheet = Image.new("RGB", (352, 196), "#24333e")
    draw = ImageDraw.Draw(sheet)
    records = []
    for number, (identifier, anchor) in enumerate(SOURCES, 1):
        source = Path("C:/Users/PC/AppData/Local/Temp") / f"codex-clipboard-{identifier}.png"
        original = inputs / f"pose-{number}-original.png"
        if original.exists():
            assert original.read_bytes() == source.read_bytes(), "Do not replace an input"
        else:
            shutil.copyfile(source, original)
        image = Image.open(original).convert("RGBA")
        assert image.size == (128, 128)
        assert image.getchannel("A").getextrema() == (0, 255)
        dx, dy = ANCHOR[0] - anchor[0], ANCHOR[1] - anchor[1]
        assert min(dx, dy) >= 0 and dx + image.width <= CANVAS[0] and dy + image.height <= CANVAS[1]
        prepared = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        prepared.paste(image, (dx, dy))
        assert prepared.crop((dx, dy, dx + image.width, dy + image.height)).tobytes() == image.tobytes()
        assert prepared.getchannel("A").histogram()[1:] == image.getchannel("A").histogram()[1:]
        target = inputs / f"pose-{number}.png"
        if target.exists():
            assert Image.open(target).convert("RGBA").tobytes() == prepared.tobytes()
        else:
            prepared.save(target)
        sheet.paste(prepared, ((number - 1) * 176, 20), prepared)
        draw.text(((number - 1) * 176 + 8, 3), f"Pose {number} / native 1x", fill="white")
        x, y = (number - 1) * 176 + ANCHOR[0], 20 + ANCHOR[1]
        draw.line((x - 3, y, x + 3, y), fill="#efba63")
        records.append({"pose": number, "original_size": list(image.size), "original_bbox": image.getchannel("A").getbbox(),
                        "source_anchor": list(anchor), "translation": [dx, dy], "prepared_bbox": prepared.getchannel("A").getbbox(),
                        "prepared_size": list(prepared.size), "pixels_preserved": True})
    qa = ROOT / "docs/screenshots/animation-qa/yasuo-user-ab"
    qa.mkdir(parents=True, exist_ok=True)
    sheet.save(qa / "prepared-inputs.png")
    print(json.dumps(records, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
