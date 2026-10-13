"""Import only the edited small arms and blade; preserve the v3 body byte-exact."""
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v5-small-grip-wind-e"
PREVIOUS = BASE.parent / "q-v3-layered-e"


def main():
    state = json.loads((BASE / "parts.plan.state.json").read_text(encoding="utf-8"))
    final = json.loads(Path(state["manifest"]).read_text(encoding="utf-8"))
    assert final["status"] == "success" and final["job_id"] == state["job_id"]
    assert len(final["outputs"]) == 1 and final["outputs"][0]["type"] == "media"
    source = ROOT / final["outputs"][0]["path"]
    split = json.loads((BASE / "components/final_outputs.json").read_text(encoding="utf-8"))
    assert split["component_count"] == 4 and not split["warnings"]
    media = BASE / "media"
    media.mkdir(exist_ok=True)
    shutil.copy2(source, media / "parts-sheet.png")
    imported = []
    for name, number in [("body", None), ("upper-arm", 3), ("forearm-hand", 4), ("wind-sword", 2)]:
        src = PREVIOUS / "media" / f"{name}.png" if number is None else BASE / "components" / split["components"][number - 1]["file"]
        dst = media / f"{name}.png"
        shutil.copy2(src, dst)
        assert hashlib.sha256(src.read_bytes()).digest() == hashlib.sha256(dst.read_bytes()).digest()
        with Image.open(dst) as image:
            rgba = image.convert("RGBA")
            imported.append({"role": name, "path": f"media/{name}.png", "dimensions": list(rgba.size),
                "alpha_bounds": list(rgba.getchannel("A").getbbox()), "native_pixels_preserved": True,
                "reused_from_v3": number is None, "sha256": hashlib.sha256(dst.read_bytes()).hexdigest()})
    qa = Image.new("RGBA", (320, 180), (17, 36, 44, 255))
    positions = {"body": (14, 18), "upper-arm": (110, 28), "forearm-hand": (170, 30), "wind-sword": (110, 88)}
    for item in imported:
        with Image.open(BASE / item["path"]) as image:
            qa.alpha_composite(image.convert("RGBA"), positions[item["role"]])
    qa_root = ROOT / "docs/screenshots/animation-qa/yasuo-q-v5-small-grip-wind-e"
    qa_root.mkdir(parents=True, exist_ok=True)
    qa.resize((640, 360), Image.Resampling.NEAREST).save(qa_root / "parts-2x.png")
    outputs = {"status": "success", "job_id": state["job_id"], "outputs":
        [{"type": "media", "path": "media/parts-sheet.png", "mime_type": "image/png"}] +
        [{"type": "media", "path": item["path"], "mime_type": "image/png"} for item in imported]}
    (BASE / "final_outputs.json").write_text(json.dumps(outputs, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    inspection = {"parts": imported, "sheet_byte_exact": True,
        "review": "Compact closed fist, smaller native arm parts and pale blue wind-covered blade; body preserved byte-exact.",
        "previous_arm_canvases": {"upper-arm": [44, 25], "forearm-hand": [45, 19]},
        "billing": "No charge inferred without a final bill."}
    (BASE / "parts-inspection.json").write_text(json.dumps(inspection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(imported, ensure_ascii=False))


if __name__ == "__main__":
    main()
