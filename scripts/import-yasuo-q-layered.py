"""Import only declared Meowa media and native crops from the bundled splitter."""
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v3-layered-e"


def main():
    state = json.loads((BASE / "parts.plan.state.json").read_text(encoding="utf-8"))
    final = json.loads(Path(state["manifest"]).read_text(encoding="utf-8"))
    assert final["status"] == "success" and final["job_id"] == state["job_id"]
    assert len(final["outputs"]) == 1 and final["outputs"][0]["type"] == "media"
    source = ROOT / final["outputs"][0]["path"]
    media = BASE / "media"
    media.mkdir(exist_ok=True)
    shutil.copy2(source, media / "parts-sheet.png")
    parts = json.loads((BASE / "components/final_outputs.json").read_text(encoding="utf-8"))
    assert parts["component_count"] == 4 and not parts["warnings"]
    roles = {"body": 1, "upper-arm": 2, "sword": 3, "forearm-hand": 4}
    outputs = []
    qa = Image.new("RGBA", (320, 260), (17, 36, 44, 255))
    for role, number in roles.items():
        item = parts["components"][number - 1]
        component = BASE / "components" / item["file"]
        destination = media / f"{role}.png"
        shutil.copy2(component, destination)
        with Image.open(destination) as image:
            rgba = image.convert("RGBA")
            outputs.append({"role": role, "path": str(destination.relative_to(BASE)).replace("\\", "/"),
                            "dimensions": list(rgba.size), "alpha_bounds": list(rgba.getchannel("A").getbbox()),
                            "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(), "bbox_in_sheet": item["bbox"]})
            position = {"body": (15, 30), "upper-arm": (120, 35), "forearm-hand": (180, 45), "sword": (110, 125)}[role]
            qa.alpha_composite(rgba, position)
    qa_root = ROOT / "docs/screenshots/animation-qa/yasuo-q-v3-layered-e"
    qa_root.mkdir(parents=True, exist_ok=True)
    qa.resize((640, 520), Image.Resampling.NEAREST).save(qa_root / "parts-2x.png")
    manifest = {"status": "success", "job_id": final["job_id"],
                "outputs": [{"type": "media", "path": "media/parts-sheet.png", "mime_type": "image/png"}]
                + [{"type": "media", "path": item["path"], "mime_type": "image/png"} for item in outputs]}
    (BASE / "final_outputs.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (BASE / "parts-inspection.json").write_text(json.dumps({"native_parts": outputs, "source_media_byte_exact": True,
        "splitter": "bundled split-components.py; transparency segmentation only; no resampling",
        "visual_review": "pending"}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"job_id": final["job_id"], "native_parts": outputs}, ensure_ascii=False))


if __name__ == "__main__":
    main()
