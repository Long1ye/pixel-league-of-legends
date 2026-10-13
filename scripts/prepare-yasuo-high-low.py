"""Prepare two user-owned keyframes without resampling or paid submissions."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v12-high-low-user"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-high-low-user"
SOURCES = [
    ("f9a044a9-7e51-4349-9ae4-444d40173892", (62, 118)),
    ("6d470851-67f0-48a0-b6d4-5bcb4f730140", (76, 120)),
]
PROMPTS = {
    "A": "亚索从高位挥砍到低位，动作自然流畅",
    "B": "亚索从低位向上挥砍到高位，动作自然流畅",
}
CANVAS = (176, 176)
ANCHOR = (80, 150)
SOURCE_CROPS = {}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--credits-before", required=True, type=int)
    args = parser.parse_args()
    if (BASE / "contract.json").exists():
        raise RuntimeError("Study already prepared; preserve its plans and recovery state")
    inputs = BASE / "inputs"
    inputs.mkdir(parents=True, exist_ok=True)
    sheet = Image.new("RGB", (352, 196), "#24333e")
    draw = ImageDraw.Draw(sheet)
    records = []
    for number, (identifier, anchor) in enumerate(SOURCES, 1):
        source = Path("C:/Users/PC/AppData/Local/Temp") / f"codex-clipboard-{identifier}.png"
        original = inputs / f"pose-{number}-original.png"
        if original.exists():
            assert digest(original) == digest(source)
        else:
            shutil.copyfile(source, original)
        image = Image.open(original).convert("RGBA")
        source_size = list(image.size)
        source_crop = SOURCE_CROPS.get(identifier)
        if source_crop is not None:
            cropped = image.crop(source_crop)
            # Only discard fully transparent padding, never visible pixels.
            assert cropped.getchannel("A").histogram()[1:] == image.getchannel("A").histogram()[1:]
            image = cropped
        assert image.size == (128, 128)
        assert image.getchannel("A").getextrema() == (0, 255)
        dx, dy = ANCHOR[0] - anchor[0], ANCHOR[1] - anchor[1]
        assert min(dx, dy) >= 0 and dx + image.width <= CANVAS[0] and dy + image.height <= CANVAS[1]
        prepared = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        prepared.paste(image, (dx, dy))
        assert prepared.crop((dx, dy, dx + image.width, dy + image.height)).tobytes() == image.tobytes()
        assert prepared.getchannel("A").histogram()[1:] == image.getchannel("A").histogram()[1:]
        target = inputs / f"pose-{number}.png"
        assert not target.exists(), "Do not overwrite a prepared keyframe"
        prepared.save(target)
        sheet.paste(prepared, ((number - 1) * 176, 20), prepared)
        draw.text(((number - 1) * 176 + 8, 3), f"Pose {number} / native 1x", fill="white")
        records.append({"pose": number, "original": original.relative_to(ROOT).as_posix(),
                        "original_sha256": digest(original), "prepared": target.relative_to(ROOT).as_posix(),
                        "prepared_sha256": digest(target), "source_size": source_size,
                        "source_crop": source_crop,
                        "source_anchor": list(anchor), "translation": [dx, dy],
                        "prepared_bounds": prepared.getchannel("A").getbbox(), "pixels_preserved": True})
    QA.mkdir(parents=True, exist_ok=True)
    sheet.save(QA / "prepared-inputs.png")
    contract = {"hero": "yasuo", "direction": "se", "canvas": list(CANVAS), "anchor": list(ANCHOR),
                "requested_frames_per_clip": 8, "requested_clip_count": 2, "prompts": PROMPTS,
                "prompt_author": "user", "prompt_optimization": True, "optimized_prompt_text_returned": False,
                "inputs": records, "credits_before": args.credits_before, "estimated_credits": 90,
                "attack_loop_sequence": ["A", "B"], "runtime_integration_requested": False}
    (BASE / "contract.json").write_text(json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for identifier, first, last in [("A", 1, 2), ("B", 2, 1)]:
        relative = lambda path: path.relative_to(ROOT).as_posix()
        plan = {"command": "keyframes-run", "recovery_command": "animate-poll", "args": [
            "--keyframe", f"0={relative(inputs / f'pose-{first}.png')}",
            "--keyframe", f"7={relative(inputs / f'pose-{last}.png')}",
            "--keyframe-strength", "0=1", "--keyframe-strength", "7=1",
            "--prompt", PROMPTS[identifier], "--animation-model", "pixel-engine-v1.1",
            "--optimize-prompt", "--total-frames", "8", "--output-format", "webp",
            "--animation-type", "attack", "--color-count", "64", "--remove-bg-method", "standard"],
            "output_dir": relative(BASE / f"clips/animation-{identifier}")}
        (BASE / f"animation-{identifier}.plan.json").write_text(json.dumps(plan, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"inputs": records, "plans_created": 2, "submitted": 0}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
