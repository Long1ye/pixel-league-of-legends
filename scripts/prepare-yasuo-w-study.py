"""Prepare one wind-wall study from declared Meowa outputs; do not submit jobs."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-10/yasuo/w-v1-loop"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-w-v1-loop"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def declared(phase):
    plan = read_json(BASE / f"{phase}.plan.json")
    state = read_json(BASE / f"{phase}.plan.state.json")
    assert state["status"] == "success", "Job not complete; do not resubmit"
    output_root = (ROOT / plan["output_dir"]).resolve()
    manifest_path = Path(state["manifest"]).resolve()
    assert manifest_path.is_relative_to(output_root)
    manifest = read_json(manifest_path)
    assert manifest["status"] == "success" and manifest["job_id"] == state["job_id"]
    files = []
    for item in manifest["outputs"]:
        path = (ROOT / item["path"]).resolve()
        assert item["type"] == "media" and item["mime_type"].startswith("image/")
        assert path.is_relative_to(output_root) and path.is_file()
        files.append(path)
    return manifest, files


def copy_exact(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        assert sha(source) == sha(target), "Refuse to replace a changed asset"
    else:
        shutil.copyfile(source, target)


def prepare():
    _, base_files = declared("base")
    _, clean_files = declared("cleanup")
    assert len(base_files) == len(clean_files) == 1
    with Image.open(base_files[0]) as base_image:
        base_size = base_image.size
    with Image.open(clean_files[0]) as clean:
        assert getattr(clean, "n_frames", 1) == 1
        image = clean.convert("RGBA")
    assert image.size == base_size, "Background removal changed the source canvas"
    alpha = image.getchannel("A")
    assert alpha.getextrema()[0] == 0 and alpha.getbbox(), "Not a usable transparent still"
    padding = 12
    size = (image.width + padding * 2, image.height + padding * 2)
    assert max(size) <= 320, "Prepared Pixel canvas exceeds limit; stop before paying"
    prepared = Image.new("RGBA", size)
    prepared.paste(image, (padding, padding))
    assert prepared.crop((padding, padding, padding + image.width, padding + image.height)).tobytes() == image.tobytes()
    source_path = BASE / "references/wall-prepared.png"
    source_path.parent.mkdir(parents=True, exist_ok=True)
    if source_path.exists():
        with Image.open(source_path) as previous:
            assert previous.convert("RGBA").tobytes() == prepared.tobytes()
    else:
        prepared.save(source_path)
    copy_exact(base_files[0], BASE / "media/wall-base-background.png")
    copy_exact(clean_files[0], BASE / ("media/wall-base" + clean_files[0].suffix))
    plan = {
        "command": "meowa-animation-run",
        "args": ["--image-file", source_path.relative_to(ROOT).as_posix(),
                 "--prompt", "这面风墙保持成型和原位，内部青白色风纹连续向上翻卷，边缘轻微起伏，流动自然，首尾无缝循环。保留参考图的像素风格和倾斜角度，底边位置和宽度稳定，固定镜头，不出现或消散。",
                 "--style-mode", "pixel", "--resolution", "480p",
                 "--alpha-mode", "soft", "--output-frames", "8",
                 "--quality-mode", "standard", "--animation-mode", "loop",
                 "--remove-bg-method", "standard", "--remove-bg-batch-size", "8",
                 "--background-color", "#c6c6c6", "--optimize-prompt", "--padding", "0"],
        "output_dir": "meowa-output/yasuo-w-v1-loop-animation",
        "recovery_command": "animate-poll",
        "estimated_credits": 20,
        "purpose": "One independent sustained loop, with soft alpha for wind translucency; no direction batch"
    }
    assert not (BASE / "animation.plan.state.json").exists(), "Animation already planned/submitted; do not alter it"
    write_json(BASE / "animation.plan.json", plan)
    write_json(BASE / "preparation.json", {"base_dimensions": base_size, "prepared_dimensions": size,
               "padding": padding, "alpha_bounds": alpha.getbbox(), "alpha_extrema": alpha.getextrema(),
               "partial_alpha_pixels": sum(alpha.histogram()[1:255]), "no_resampling": True,
               "prepared_sha256": sha(source_path), "base_sha256": sha(base_files[0]),
               "transparent_base_sha256": sha(clean_files[0])})
    print(json.dumps(read_json(BASE / "preparation.json"), indent=2))


def decode(path):
    frames, durations = [], []
    with Image.open(path) as animation:
        for index in range(animation.n_frames):
            animation.seek(index)
            frames.append(animation.convert("RGBA").copy())
            durations.append(animation.info.get("duration", 0))
    assert len(frames) > 1 and all(d > 0 for d in durations)
    return frames, durations


def atlas(frames, output, contact):
    width, height = frames[0].size
    columns, rows = 4, (len(frames) + 3) // 4
    sheet = Image.new("RGBA", (columns * width, rows * height))
    proof = Image.new("RGB", (columns * width, rows * (height + 20)), "#203b3a")
    draw = ImageDraw.Draw(proof)
    for index, frame in enumerate(frames):
        x, y = index % columns * width, index // columns * height
        sheet.paste(frame, (x, y))
        cy = index // columns * (height + 20)
        proof.paste(Image.alpha_composite(Image.new("RGBA", frame.size, "#203b3a"), frame).convert("RGB"), (x, cy + 20))
        draw.text((x + 4, cy + 3), str(index + 1), fill="white")
    output.parent.mkdir(parents=True, exist_ok=True)
    contact.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output)
    proof.save(contact)
    with Image.open(output) as saved:
        for index, frame in enumerate(frames):
            x, y = index % columns * width, index // columns * height
            assert saved.crop((x, y, x + width, y + height)).tobytes() == frame.tobytes()
    return columns, rows


def import_animation(credits_after):
    manifest, files = declared("animation")
    roles = {"background" if "background" in p.stem else "transparent": p for p in files}
    assert len(files) == 2 and set(roles) == {"background", "transparent"}
    frames, durations = decode(roles["transparent"])
    bg_frames, bg_durations = decode(roles["background"])
    assert len(frames) == len(bg_frames) == 8 and durations == bg_durations
    assert all(frame.size == frames[0].size for frame in frames)
    width, height = frames[0].size
    bounds = [f.getchannel("A").getbbox() for f in frames]
    assert all(bounds), "Empty frame"
    assert all(f.getchannel("A").getextrema()[0] == 0 for f in frames), "Missing transparent background"
    for role, path in roles.items():
        copy_exact(path, BASE / "media" / ("wall-loop-background.webp" if role == "background" else "wall-loop.webp"))
    columns, rows = atlas(frames, BASE / "media/wall-atlas.png", QA / "wall-all-frames.png")
    atlas(bg_frames, BASE / "media/wall-background-atlas.png", QA / "wall-background-all-frames.png")
    partial = [sum(f.getchannel("A").histogram()[1:255]) for f in frames]
    edge = [i + 1 for i, b in enumerate(bounds) if b[0] == 0 or b[1] == 0 or b[2] == width or b[3] == height]
    contract = read_json(BASE / "contract.json")
    study = {"skill": "W", "job_id": manifest["job_id"], "width": width, "height": height,
             "frames": len(frames), "columns": columns, "rows": rows, "durations_ms": durations,
             "duration_ms": sum(durations), "bounds": bounds, "partial_alpha_pixels": partial,
             "edge_contact_frames": edge, "transparent": True, "native_frames_preserved": True,
             "final_media_sha256": {role: sha(path) for role, path in roles.items()},
             "credits_before": contract["credits_before"], "credits_after": credits_after,
             "account_balance_delta": credits_after - contract["credits_before"], "credits_charged": None,
             "billing_note": "Final manifest has no bill; balance delta is not used as proof of task charges.",
             "runtime_integrated": False, "direction_count": 1, "visual_review": "pending",
             "review": "生成结果等待逐帧检查；当前只是一个固定视角，未完成方向或无缝循环验收。",
             "prompt": read_json(BASE / "animation.plan.json")["args"][3]}
    write_json(BASE / "study.json", study)
    write_json(BASE / "validation.json", {"dimensions": [width, height], "frames": len(frames),
               "durations_ms": durations, "transparent": True, "partial_alpha_pixels": partial,
               "frame_bounds": bounds, "edge_contact_frames": edge,
               "preview_atlas_rgba_identical": True, "media_byte_exact": True,
               "retained_background_preserved": True})
    print(json.dumps(read_json(BASE / "validation.json"), indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("phase", choices=["prepare", "import"])
    parser.add_argument("--credits-after", type=int)
    args = parser.parse_args()
    if args.phase == "prepare":
        prepare()
    else:
        assert args.credits_after is not None
        import_animation(args.credits_after)


if __name__ == "__main__":
    main()
