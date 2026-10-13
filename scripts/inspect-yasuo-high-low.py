"""Inspect declared A/B outputs and retain source identity and honest art review."""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image

from importlib.util import module_from_spec, spec_from_file_location

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v12-high-low-user"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-high-low-user"
spec = spec_from_file_location("ab_inspector", ROOT / "scripts/inspect-yasuo-ab-user.py")
inspector = module_from_spec(spec)
spec.loader.exec_module(inspector)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--credits-after", type=int, required=True)
    args = parser.parse_args()
    contract = json.loads((BASE / "contract.json").read_text(encoding="utf-8"))
    for record in contract["inputs"]:
        original, prepared = ROOT / record["original"], ROOT / record["prepared"]
        assert hashlib.sha256(original.read_bytes()).hexdigest() == record["original_sha256"]
        assert hashlib.sha256(prepared.read_bytes()).hexdigest() == record["prepared_sha256"]
        source = Image.open(original).convert("RGBA")
        if record.get("source_crop") is not None:
            cropped = source.crop(record["source_crop"])
            assert cropped.getchannel("A").histogram()[1:] == source.getchannel("A").histogram()[1:]
            source = cropped
        image = Image.open(prepared).convert("RGBA")
        dx, dy = record["translation"]
        assert image.crop((dx, dy, dx + source.width, dy + source.height)).tobytes() == source.tobytes()
    inspector.main(["--base", str(BASE), "--qa", str(QA), "--credits-after", str(args.credits_after)])
    study_path = BASE / "study.json"
    study = json.loads(study_path.read_text(encoding="utf-8"))
    for clip in study["clips"]:
        clip["name"] = "高位→低位" if clip["id"] == "A" else "低位→高位"
    study["source_keyframes_preserved"] = True
    study["optimized_prompt_text_returned"] = False
    review_path = BASE / "review.json"
    if review_path.exists():
        study.update(json.loads(review_path.read_text(encoding="utf-8")))
    study_path.write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
