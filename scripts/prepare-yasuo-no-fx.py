"""Prepare two approved pose inputs and two finite, recoverable Meowa plans.

Only translate static input B by integer pixels; never resample the sprites or
modify generated animation frames. Do not submit a paid request in this script.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets/hero-attacks/2026-10-09/yasuo/v5-endpoints"
BASE = ROOT / "assets/hero-attacks/2026-10-09/yasuo/v6-no-fx-transitions"


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    study = json.loads((SOURCE / "study.json").read_text(encoding="utf-8"))
    preparation = BASE / "preparation"
    preparation.mkdir(parents=True, exist_ok=True)
    inputs = {}
    for record in study["images"]:
        label = record["label"].lower()
        original = ROOT / record["path"]
        manifest = json.loads((original.parent / "final_outputs.json").read_text(encoding="utf-8"))
        assert manifest["job_id"] == record["job_id"] and manifest["status"] == "success"
        assert any((ROOT / output["path"]).resolve() == original.resolve() for output in manifest["outputs"])
        image = Image.open(original).convert("RGBA")
        assert image.size == (192, 192)
        dx = 3 if label == "b" else 0
        bbox = image.getchannel("A").getbbox()
        assert bbox and bbox[2] + dx < image.width
        aligned = Image.new("RGBA", image.size, (0, 0, 0, 0))
        aligned.paste(image, (dx, 0))
        # Exact translated RGBA pixels, no alpha compositing or interpolation.
        assert aligned.crop((dx, 0, image.width, image.height)).tobytes() == image.crop((0, 0, image.width-dx, image.height)).tobytes()
        assert image.getchannel("A").histogram()[255] == aligned.getchannel("A").histogram()[255]
        target = preparation / f"{label}-aligned.png"
        aligned.save(target)
        inputs[label] = target.relative_to(ROOT).as_posix()

    common = ["--style-mode", "pixel", "--resolution", "480p", "--alpha-mode", "sharp",
              "--output-frames", "24", "--quality-mode", "medium", "--high-frame-rate",
              "--animation-mode", "non_loop", "--remove-bg-method", "standard",
              "--remove-bg-batch-size", "16", "--background-color", "#c6c6c6", "--padding", "0",
              "--no-optimize-prompt"]
    motions = {
        "a-to-b": ("a", "b", "Yasuo performs exactly one upward sword slash on the right side of the screen, from the low guard in the first image to the high guard in the last image, then stops. Keep feet planted, camera fixed, blue scarf and silver shoulder armor unchanged. Show one solid metal katana only: no sword glow, light trails, afterimages, motion blur, particles or magic effects."),
        "b-to-a": ("b", "a", "Yasuo performs exactly one downward sword slash on the right side of the screen, from the high guard in the first image to the low guard in the last image, then stops. Keep feet planted, camera fixed, blue scarf and silver shoulder armor unchanged. Show one solid metal katana only: no sword glow, light trails, afterimages, motion blur, particles or magic effects."),
    }
    for name, (first, last, prompt) in motions.items():
        write_json(BASE / f"{name}.plan.json", {
            "command": "meowa-animation-run", "recovery_command": "animate-poll",
            "args": ["--image-file", inputs[first], "--last-image-file", inputs[last], "--prompt", prompt, *common],
            "output_dir": (BASE / "clips" / name).relative_to(ROOT).as_posix(),
        })
    write_json(BASE / "contract.json", {
        "scope": "Two independent attacks, A-to-B and B-to-A. No runtime integration or eight-direction generation.",
        "canvas": [192, 192], "facing": "screen southeast", "inputs": inputs,
        "input_b_translation_px": [3, 0], "input_pixels_resampled": False,
        "motion_space": "Existing transparent 192px canvas has at least 44px right and 48px top clearance; no extra padding needed.",
        "effect_constraint": "Solid blade only. No sword glow, light trails, afterimages, particles or magic effects.",
        "prompt_enhancement": "Disabled for reviewed, final English prompts to avoid automatically adding sword effects.",
        "output_contract": "Preserve every declared final transparent and background-retained animation; inspect actual dimensions and timing.",
        "credits_before": 9225, "estimated_credits": 90,
    })
    print("Two aligned 192x192 static inputs and two paid-job plans prepared; no generation submitted.")


if __name__ == "__main__":
    main()
