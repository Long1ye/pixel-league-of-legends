"""Prepare a Q study input without redrawing/resizing the approved hero pixels."""
import hashlib
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-10/yasuo/q-v1-se"
SOURCE = ROOT / "assets/heroes/yasuo/selected-2026-10-10/attack-B.webp"


def main():
    target = BASE / "references/approved-low-padded.png"
    if target.exists():
        raise SystemExit("Reference already exists; do not overwrite an earlier study.")
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE) as animation:
        animation.seek(0)
        original = animation.convert("RGBA").copy()
    assert original.size == (200, 128)
    frame = Image.new("RGBA", (248, 160), (0, 0, 0, 0))
    frame.paste(original, (8, 8))
    assert frame.crop((8, 8, 208, 136)).tobytes() == original.tobytes()
    frame.save(target)
    contract = {
        "hero": "yasuo", "skill": "Q1/Q2", "direction": "se",
        "reference": str(target.relative_to(ROOT)).replace("\\", "/"),
        "source_sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        "reference_frame": 0, "source_pixels_preserved": True,
        "canvas": [248, 160], "reference_anchor": [72, 132],
        "padding": {"left": 8, "top": 8, "right": 40, "down": 24},
        "planned_jobs": {"still_edits": 2, "animations": 1},
        "planned_animation_frames": 8, "optimize_prompt": True,
        "estimated_credits": 54, "credits_before": 6313,
        "layered": False, "integrated_into_game": False,
        "notes": "单方向整身Q刺击样稿。保留原始像素尺度；不生成八向、旋风或分层绑定。",
    }
    (BASE / "contract.json").write_text(json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"reference": str(target), "size": frame.size,
                      "bounds": frame.getchannel("A").getbbox(), "anchor": [72, 132]}))


if __name__ == "__main__":
    main()
