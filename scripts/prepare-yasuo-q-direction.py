"""Pad the user's Q reference for a northeast trial without changing visible pixels."""
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path("D:/Long1ye/资源/yasuo-Q.webp")
BASE = ROOT / "assets/hero-skills/2026-10-10/yasuo/q-v2-user-ne"
TOP = 72


def main():
    target = BASE / "references/user-q-top-padded.webp"
    target.parent.mkdir(parents=True, exist_ok=True)
    frames, durations, source_frames = [], [], []
    with Image.open(SOURCE) as animation:
        assert animation.size == (256, 128)
        for index in range(animation.n_frames):
            animation.seek(index)
            source_frame = animation.convert("RGBA").copy()
            padded = Image.new("RGBA", (256, 200))
            padded.paste(source_frame, (0, TOP))
            assert padded.crop((0, TOP, 256, TOP + 128)).tobytes() == source_frame.tobytes()
            source_frames.append(source_frame)
            frames.append(padded)
            durations.append(animation.info["duration"])
    if not target.exists():
        frames[0].save(target, save_all=True, append_images=frames[1:],
                       duration=durations, loop=0, lossless=True, exact=True)
    with Image.open(target) as prepared:
        assert prepared.n_frames == len(source_frames)
        for index, original in enumerate(source_frames):
            prepared.seek(index)
            cropped = prepared.convert("RGBA").crop((0, TOP, 256, TOP + 128))
            assert prepared.info["duration"] == durations[index]
            assert cropped.getchannel("A").tobytes() == original.getchannel("A").tobytes()
            visible_mask = original.getchannel("A").point(lambda alpha: 255 if alpha else 0).convert("RGB")
            difference = ImageChops.difference(cropped.convert("RGB"), original.convert("RGB"))
            assert ImageChops.multiply(difference, visible_mask).getbbox() is None
    contract = {
        "source": str(SOURCE), "source_sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        "source_dimensions": [256, 128], "frame_count": len(frames),
        "durations_ms": durations, "duration_ms": sum(durations),
        "reference": str(target.relative_to(ROOT)).replace("\\", "/"),
        "padded_dimensions": [256, 200], "padding": {"top": TOP, "left": 0, "right": 0, "down": 0},
        "reference_visible_pixels_and_alpha_preserved": True, "target_direction": "ne",
        "requested_heading_degrees": -45, "planned_jobs": 1,
        "estimated_credits": 20, "credits_before": 6019,
        "mode": "video-reference animation edit", "layered": False, "runtime_integrated": False,
    }
    (BASE / "contract.json").write_text(json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"reference": str(target), "dimensions": [256, 200],
                      "frames": len(frames), "total_ms": sum(durations), "source_unchanged": True}))


if __name__ == "__main__":
    main()
