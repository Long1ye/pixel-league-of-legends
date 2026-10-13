"""Import only declared Q direction outputs and create native-pixel QA/preview atlases."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-10/yasuo/q-v2-user-ne"
OUTPUT = ROOT / "meowa-output/yasuo-q-v2-user-ne"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-q-v2-user-ne"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def decode(path):
    frames, durations = [], []
    with Image.open(path) as animation:
        for index in range(animation.n_frames):
            animation.seek(index)
            frames.append(animation.convert("RGBA").copy())
            durations.append(animation.info.get("duration", 0))
    assert len(frames) > 1 and all(duration > 0 for duration in durations)
    assert all(frame.size == frames[0].size for frame in frames)
    return frames, durations


def atlas_and_contact(frames, atlas_path, contact_path, label):
    width, height = frames[0].size
    columns, rows = 4, (len(frames) + 3) // 4
    atlas = Image.new("RGBA", (columns * width, rows * height))
    contact = Image.new("RGB", (columns * width, rows * (height + 20)), "#192d38")
    draw = ImageDraw.Draw(contact)
    for index, frame in enumerate(frames):
        x, y = index % columns * width, index // columns * height
        atlas.paste(frame, (x, y))
        cell_y = index // columns * (height + 20)
        draw.text((x + 5, cell_y + 3), f"{label} / {index + 1}", fill="white")
        contact.paste(Image.alpha_composite(Image.new("RGBA", frame.size, "#192d38"), frame).convert("RGB"), (x, cell_y + 20))
    atlas_path.parent.mkdir(parents=True, exist_ok=True)
    contact_path.parent.mkdir(parents=True, exist_ok=True)
    atlas.save(atlas_path)
    contact.save(contact_path)
    with Image.open(atlas_path) as saved:
        for index, frame in enumerate(frames):
            x, y = index % columns * width, index // columns * height
            assert saved.crop((x, y, x + width, y + height)).tobytes() == frame.tobytes()
    return columns, rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--credits-after", required=True, type=int)
    args = parser.parse_args()
    contract = read_json(BASE / "contract.json")
    source = Path(contract["source"])
    assert digest(source) == contract["source_sha256"], "User's original Q changed; stop before import"
    state = read_json(BASE / "animation.plan.state.json")
    manifest_path = Path(state["manifest"]).resolve()
    assert manifest_path.is_relative_to(OUTPUT.resolve())
    manifest = read_json(manifest_path)
    assert manifest["status"] == "success" and manifest["job_id"] == state["job_id"]
    files = {}
    for output in manifest["outputs"]:
        assert output["type"] == "media" and output["mime_type"] == "image/webp"
        path = (ROOT / output["path"]).resolve()
        assert path.is_relative_to(OUTPUT.resolve()) and path.is_file()
        role = "background" if "background" in path.stem else "transparent"
        assert role not in files
        files[role] = path
        target = BASE / "media" / ("q-ne-background.webp" if role == "background" else "q-ne.webp")
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists():
            assert digest(target) == digest(path), "Refuse to overwrite changed output"
        else:
            shutil.copyfile(path, target)
        assert digest(target) == digest(path)
    assert set(files) == {"transparent", "background"}
    frames, durations = decode(files["transparent"])
    background_frames, background_durations = decode(files["background"])
    assert len(background_frames) == len(frames) and background_durations == durations
    width, height = frames[0].size
    bounds = [frame.getchannel("A").getbbox() for frame in frames]
    assert all(bounds), "Empty output frame"
    partial = [sum(frame.getchannel("A").histogram()[1:255]) for frame in frames]
    has_transparency = all(frame.getchannel("A").getextrema()[0] == 0 for frame in frames)
    columns, rows = atlas_and_contact(frames, BASE / "media/q-ne-atlas.png", QA / "q-ne-all-frames.png", "NE trial")
    atlas_and_contact(background_frames, BASE / "media/q-ne-background-atlas.png", QA / "q-ne-background-all-frames.png", "Background")
    source_frames, source_durations = decode(ROOT / contract["reference"])
    source_columns, _ = atlas_and_contact(source_frames, BASE / "references/source-atlas.png", QA / "user-reference-all-frames.png", "User Q")
    plan = read_json(BASE / "animation.plan.json")
    edit_intent = plan["args"][plan["args"].index("--edit-intent") + 1]
    video_description = plan["args"][plan["args"].index("--video-description") + 1]
    edges = [index + 1 for index, box in enumerate(bounds) if box[0] == 0 or box[1] == 0 or box[2] == width or box[3] == height]
    study = {
        "hero": "yasuo", "skill": "Q1/Q2", "requested_direction": "ne", "requested_heading_degrees": -45,
        "job_id": manifest["job_id"], "frame_count": len(frames), "width": width, "height": height,
        "columns": columns, "rows": rows, "durations_ms": durations, "duration_ms": sum(durations),
        "has_transparency": has_transparency, "partial_alpha_pixels": partial, "edge_contact_frames": edges,
        "edit_intent": edit_intent, "video_description": video_description,
        "prompt_mode": plan["prompt_mode"], "source_sha256": digest(source),
        "source": {"width": source_frames[0].width, "height": source_frames[0].height, "columns": source_columns,
                   "frame_count": len(source_frames), "durations_ms": source_durations, "duration_ms": sum(source_durations)},
        "final_media_sha256": {role: digest(path) for role, path in files.items()},
        "estimated_credits": contract["estimated_credits"], "credits_before": contract["credits_before"],
        "credits_after": args.credits_after, "account_balance_delta": args.credits_after - contract["credits_before"],
        "credits_charged": None, "billing_note": "Final output manifest does not contain billing; account balance changed independently, so cost is not inferred from the balance delta.",
        "native_frames_preserved_in_preview": True, "original_media_byte_exact": True,
        "layered": False, "runtime_integrated": False, "visual_acceptance": "pending_review",
        "review": "生成结果等待逐帧检查；页面标题表示请求的方向，不代表方向验收已经通过。",
    }
    (BASE / "study.json").write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    validation = {"source_hash_unchanged": True, "original_media_byte_exact": True,
                  "frames": len(frames), "dimensions": [width, height], "durations_ms": durations,
                  "has_transparency": has_transparency, "partial_alpha_pixels": partial,
                  "frame_bounds": bounds, "edge_contact_frames": edges,
                  "preview_atlas_rgba_identical": True, "retained_background_frames": len(background_frames)}
    (BASE / "validation.json").write_text(json.dumps(validation, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(validation, indent=2))


if __name__ == "__main__":
    main()
