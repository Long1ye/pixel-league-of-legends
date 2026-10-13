"""Validate declared skill outputs and prepare a lossless local Q preview, no API calls."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat


ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-10/yasuo/q-v1-se"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-q-v1-se"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def declared_outputs(name):
    directory = ROOT / f"meowa-output/yasuo-q-v1-se-{name}"
    manifests = list(directory.rglob("final_outputs.json"))
    assert len(manifests) == 1, f"Expected one completed {name} job; never resubmit automatically"
    manifest = read_json(manifests[0])
    assert manifest["status"] == "success" and manifest["outputs"]
    media = {}
    for output in manifest["outputs"]:
        assert output["type"] == "media" and output["mime_type"] in {"image/png", "image/webp", "image/gif"}
        source = (ROOT / output["path"]).resolve()
        assert source.is_relative_to(directory.resolve()) and source.is_file()
        assert source.suffix not in media
        media[source.suffix] = source
    return manifest, media


def copy_exact(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        assert digest(source) == digest(target), f"Refuse to overwrite changed file: {target}"
    else:
        shutil.copyfile(source, target)
    assert digest(source) == digest(target)


def visible(frame):
    return Image.alpha_composite(Image.new("RGBA", frame.size, "#192d38"), frame).convert("RGB")


def difference(first, second):
    if first.size != second.size:
        return {"size_equal": False}
    return {"size_equal": True,
            "mean_rgb_error": sum(ImageStat.Stat(ImageChops.difference(visible(first), visible(second))).mean) / 3,
            "alpha_identical": first.getchannel("A").tobytes() == second.getchannel("A").tobytes()}


def contact(frames, path, label):
    width, height = frames[0].size
    columns = 4
    sheet = Image.new("RGB", (columns * width, ((len(frames) + columns - 1) // columns) * (height + 20)), "#122731")
    draw = ImageDraw.Draw(sheet)
    for index, frame in enumerate(frames):
        x, y = index % columns * width, index // columns * (height + 20)
        draw.text((x + 6, y + 3), f"{label} / {index + 1}", fill="white")
        sheet.paste(visible(frame), (x, y + 20))
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--credits-after", type=int, required=True)
    args = parser.parse_args()
    contract = read_json(BASE / "contract.json")
    approved = ROOT / "assets/heroes/yasuo/selected-2026-10-10/attack-B.webp"
    assert digest(approved) == contract["source_sha256"]
    jobs = {}
    for name in ["ready", "impact"]:
        manifest, media = declared_outputs(name)
        assert set(media) == {".png"}
        pose = Image.open(media[".png"]).convert("RGBA")
        assert pose.size == tuple(contract["canvas"]) and pose.getchannel("A").getextrema()[0] == 0
        copy_exact(media[".png"], BASE / f"poses/{name}.png")
        jobs[name] = manifest["job_id"]
    manifest, media = declared_outputs("animation")
    assert {".webp", ".png"}.issubset(media), "Missing declared animation or atlas"
    jobs["animation"] = manifest["job_id"]
    frames, durations = [], []
    with Image.open(media[".webp"]) as animation:
        for frame in ImageSequence.Iterator(animation):
            frame.load()
            frames.append(frame.convert("RGBA").copy())
            durations.append(frame.info.get("duration", 0))
    assert len(frames) == contract["planned_animation_frames"] and all(duration > 0 for duration in durations)
    width, height = frames[0].size
    assert all(frame.size == (width, height) for frame in frames)
    assert (width, height) == tuple(contract["canvas"]), "Inspect changed canvas before handoff"
    assert all(frame.getchannel("A").getextrema() == (0, 255) for frame in frames)
    atlas = Image.open(media[".png"]).convert("RGBA")
    assert atlas.width % width == 0 and atlas.height % height == 0
    columns, rows = atlas.width // width, atlas.height // height
    assert columns * rows >= len(frames)
    for index, frame in enumerate(frames):
        cell = atlas.crop((index % columns * width, index // columns * height,
                           (index % columns + 1) * width, (index // columns + 1) * height))
        report = difference(frame, cell)
        assert report["alpha_identical"] and report["mean_rgb_error"] == 0, "PNG and WebP frames differ"
    for index in range(len(frames), columns * rows):
        cell = atlas.crop((index % columns * width, index // columns * height,
                           (index % columns + 1) * width, (index // columns + 1) * height))
        assert cell.getchannel("A").getbbox() is None
    outputs = []
    for extension, name, label in [(".webp", "q-original.webp", "透明WebP"), (".png", "q-atlas.png", "PNG图集"), (".gif", "q-original.gif", "透明GIF")]:
        if extension in media:
            target = BASE / "media" / name
            copy_exact(media[extension], target)
            outputs.append({"path": f"media/{name}", "label": label, "sha256": digest(target)})
    bounds = [frame.getchannel("A").getbbox() for frame in frames]
    assert all(bounds)
    edges = [index + 1 for index, box in enumerate(bounds) if box[0] == 0 or box[1] == 0 or box[2] == width or box[3] == height]
    partial = [sum(frame.getchannel("A").histogram()[1:255]) for frame in frames]
    plan = read_json(BASE / "animation.plan.json")
    prompt = plan["args"][plan["args"].index("--prompt") + 1]
    assert "--optimize-prompt" in plan["args"]
    study = {
        "hero": "yasuo", "skill": "Q1/Q2", "direction": "se", "width": width, "height": height,
        "frame_count": len(frames), "columns": columns, "rows": rows,
        "durations_ms": durations, "duration_ms": sum(durations), "preview_duration_ms": 450,
        "requested_keyframe_indices": {"ready": 0, "extended": 3, "recovery": 7},
        "observed_impact_frame": 4,
        "prompt": prompt, "prompt_author": "assistant", "prompt_optimization": True,
        "optimized_prompt_text_returned": False, "jobs": jobs, "final_media": outputs,
        "reference_anchor": contract["reference_anchor"], "layered": False, "runtime_integrated": False,
        "credits_before": contract["credits_before"], "credits_after": args.credits_after,
        "credits_consumed": contract["credits_before"] - args.credits_after,
        "edge_contact_frames": edges, "visual_acceptance": "pending_user_review",
        "review": "单方向刺击样稿，无明显刀光或拖尾。前两帧近乎静止，刺出主要在第5–7帧，末帧收招偏快，角色细节有轻微重绘差异；关键姿势并非逐像素锁定。原始帧与图集未缩放、删帧或倒放，等待你验收；尚未拆分武器或接入Q命中逻辑。",
    }
    validation = {"frame_count": len(frames), "size": [width, height], "frame_bounds": bounds,
                  "durations_ms": durations, "partial_alpha_pixels": partial, "edge_contact_frames": edges,
                  "webp_png_visible_pixels_identical": True, "original_media_byte_exact": True,
                  "loop_boundary": difference(frames[-1], frames[0]),
                  "first_to_ready": difference(frames[0], Image.open(BASE / "poses/ready.png").convert("RGBA")),
                  "requested_impact_to_pose": difference(frames[3], Image.open(BASE / "poses/impact.png").convert("RGBA")),
                  "observed_impact_to_pose": difference(frames[4], Image.open(BASE / "poses/impact.png").convert("RGBA"))}
    for filename, record in [("study.json", study), ("validation.json", validation)]:
        (BASE / filename).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    contact(frames, QA / "q-all-frames.png", "Q")
    print(json.dumps({"validation": validation, "credits_consumed": study["credits_consumed"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
