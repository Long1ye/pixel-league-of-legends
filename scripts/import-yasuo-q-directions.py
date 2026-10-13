"""Split exact declared final body sheets; retain native pixels and missing jobs."""
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v6-eight-directions"
V5 = BASE.parent / "q-v5-small-grip-wind-e"
DIRECTIONS = ["e", "se", "s", "sw", "w", "nw", "n", "ne"]


def main():
    media = BASE / "media"
    media.mkdir(exist_ok=True)
    items = []
    qa = Image.new("RGBA", (512, 256), (17, 36, 44, 255))
    for i, direction in enumerate(DIRECTIONS):
        destination = media / f"body-{direction}.png"
        if direction == "e":
            source = V5 / "media/body.png"
            job_id = "reused-approved-v5"
        else:
            state_path = BASE / "plans" / f"{direction}.plan.state.json"
            if not state_path.exists():
                continue
            state = json.loads(state_path.read_text(encoding="utf-8"))
            if state["status"] != "success":
                continue
            final = json.loads(Path(state["manifest"]).read_text(encoding="utf-8"))
            assert final["job_id"] == state["job_id"] and final["status"] == "success"
            assert len(final["outputs"]) == 1 and final["outputs"][0]["type"] == "media"
            sheet = ROOT / final["outputs"][0]["path"]
            split_dir = BASE / "components" / direction
            if not (split_dir / "final_outputs.json").exists():
                subprocess.run(["python", str(ROOT / ".agents/skills/game-assets/scripts/split-components.py"), str(sheet),
                                "--output-dir", str(split_dir), "--padding-px", "2", "--min-component-area", "24"], check=True, capture_output=True)
            split = json.loads((split_dir / "final_outputs.json").read_text(encoding="utf-8"))
            assert not split["warnings"]
            # Only the complete left-side body is intended. Never import stray generated parts.
            candidates = [c for c in split["components"] if c["bbox"][0] < 140 and c["height"] > 60]
            assert len(candidates) == 1, f"Review body candidates for {direction}"
            component = candidates[0]
            source = split_dir / component["file"]
            shutil.copy2(sheet, media / f"edited-sheet-{direction}.png")
            job_id = state["job_id"]
        shutil.copy2(source, destination)
        assert source.read_bytes() == destination.read_bytes()
        with Image.open(destination) as image:
            rgba = image.convert("RGBA")
            bounds = rgba.getchannel("A").getbbox()
            qa.alpha_composite(rgba, (i % 4 * 128 + (128 - rgba.width) // 2, i // 4 * 128 + 118 - bounds[3]))
            items.append({"direction": direction, "path": f"media/body-{direction}.png", "dimensions": list(rgba.size),
                "alpha_bounds": list(bounds), "native_pixels_preserved": True, "job_id": job_id,
                "sha256": hashlib.sha256(destination.read_bytes()).hexdigest()})
    for name in ["upper-arm", "forearm-hand", "wind-sword"]:
        shutil.copy2(V5 / "media" / f"{name}.png", media / f"{name}.png")
    qa_root = ROOT / "docs/screenshots/animation-qa/yasuo-q-v6-eight-directions"
    qa_root.mkdir(parents=True, exist_ok=True)
    qa.resize((1024, 512), Image.Resampling.NEAREST).save(qa_root / "body-directions-2x.png")
    inspection = {"bodies": items, "missing_directions": [d for d in DIRECTIONS if d not in [v["direction"] for v in items]],
        "reused_arm_and_blade": "V5 byte-exact", "north_retry": "Declined by user; no substitute direction"}
    (BASE / "parts-inspection.json").write_text(json.dumps(inspection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    outputs = [{"type": "media", "path": item["path"], "mime_type": "image/png"} for item in items]
    outputs += [{"type": "media", "path": f"media/{name}.png", "mime_type": "image/png"} for name in ["upper-arm", "forearm-hand", "wind-sword"]]
    (BASE / "final_outputs.json").write_text(json.dumps({"status": "partial" if inspection["missing_directions"] else "success", "outputs": outputs}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(inspection, ensure_ascii=False))


if __name__ == "__main__":
    main()
