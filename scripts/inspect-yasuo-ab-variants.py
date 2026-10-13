"""Reuse final-media validation for three independent pairs, without resubmission."""
import argparse
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v9-three-variants"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-ab-three-variants"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--partial", action="store_true")
    parser.add_argument("--credits-after", type=int)
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location("pair_inspector", ROOT / "scripts/inspect-yasuo-ab-user.py")
    inspector = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(inspector)
    contract = json.loads((BASE / "contract.json").read_text(encoding="utf-8"))
    variants, technical, summary = [], [], []
    for identifier in range(1, 4):
        with contextlib.redirect_stdout(io.StringIO()):
            result = inspector.main(["--partial", "--base", str(BASE / f"variant-{identifier}"),
                                     "--qa", str(QA / f"variant-{identifier}"), "--input-dir", str(BASE / "inputs")])
        summary.append({"variant": identifier, "completed": len(result["clips"]), "seams": result["seams"]})
        if len(result["clips"]) != 2:
            if args.partial:
                continue
            raise RuntimeError(f"Variant {identifier} incomplete; recover original job IDs, never resubmit")
        for clip in result["clips"]:
            clip["webp_sha256"] = hashlib.sha256((BASE / f"variant-{identifier}" / clip["webp"]).read_bytes()).hexdigest()
        variants.append({"id": identifier, "clips": result["clips"], "seams": result["seams"],
                         "review": "已完成技术检查，待逐帧及循环验收。", "visual_acceptance": "pending_review"})
        technical.append({"id": identifier, "clips": result["validation"], "seams": result["seams"]})
    if not args.partial:
        assert len(variants) == 3 and args.credits_after is not None
        study = {"hero": "yasuo", "direction": "se", "width": 176, "height": 176, "variants": variants,
                 "prompts": contract["prompts"], "credits_before": contract["credits_before"],
                 "credits_after": args.credits_after, "credits_consumed": contract["credits_before"] - args.credits_after,
                 "review": "三组按相同用户prompt原文独立生成，开启自动优化；结果尚待动作及接缝验收。",
                 "production_ready": False, "runtime_integrated": False}
        # Mechanically derived registries; no final media is altered.
        (BASE / "study.json").write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (BASE / "validation.json").write_text(json.dumps({"status": "technical_pass", "variants": technical}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
