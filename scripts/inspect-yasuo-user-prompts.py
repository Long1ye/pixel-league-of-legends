"""Validate only declared final outputs and render native-size internal QA sheets."""
import argparse
import json
import os
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v7-user-prompts"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-user-prompts"
TRANSITIONS = [(1, 2), (2, 3), (3, 4), (4, 3)]
NAMES = ["站立→拔刀准备", "拔刀→第一刀结束", "第一刀结束→第二刀结束", "第二刀结束→第一刀结束"]


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def difference(first, last):
    def visible(frame):
        return Image.alpha_composite(Image.new("RGBA", frame.size, "#192d38"), frame).convert("RGB")
    return {
        "mean_rgb_error": sum(ImageStat.Stat(ImageChops.difference(visible(first), visible(last))).mean) / 3,
        "alpha_identical": ImageChops.difference(first.getchannel("A"), last.getchannel("A")).getbbox() is None,
    }


def contact(frames, name):
    QA.mkdir(parents=True, exist_ok=True)
    columns = 4
    rows = (len(frames) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * 192, rows * 212), "#122731")
    draw = ImageDraw.Draw(sheet)
    for index, frame in enumerate(frames):
        x, y = index % columns * 192, index // columns * 212
        draw.text((x + 8, y + 3), f"{name} / {index + 1}", fill="white")
        sheet.paste(Image.alpha_composite(Image.new("RGBA", (192, 192), "#24333e"), frame).convert("RGB"), (x, y + 20))
    sheet.save(QA / f"{name}.png")


def animation(path):
    with Image.open(path) as image:
        frames, durations = [], []
        for frame in ImageSequence.Iterator(image):
            frame.load()
            durations.append(frame.info.get("duration", 0))
            frames.append(frame.convert("RGBA").copy())
        return frames, durations


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--partial", action="store_true")
    parser.add_argument("--credits-after", type=int)
    args = parser.parse_args()
    contract = read_json(BASE / "contract.json")
    clips, decoded, validation, summary = [], {}, [], []
    for identifier, (first, last) in enumerate(TRANSITIONS, 1):
        state_path = BASE / f"animation-{identifier}.plan.state.json"
        state = read_json(state_path) if state_path.exists() else {}
        if state.get("status") != "success":
            if args.partial:
                continue
            raise RuntimeError(f"Animation {identifier} is not yet complete; do not submit another job")
        plan = read_json(BASE / f"animation-{identifier}.plan.json")
        manifest = read_json(Path(state["manifest"]))
        assert manifest["status"] == "success" and manifest["job_id"] == state["job_id"]
        assert len(manifest["outputs"]) == 3
        media = {}
        for output in manifest["outputs"]:
            assert output["type"] == "media" and output["mime_type"] in {"image/webp", "image/gif", "image/png"}
            path = (ROOT / output["path"]).resolve()
            assert path.is_relative_to(BASE.resolve()) and path.is_file()
            media[path.suffix] = path
        assert set(media) == {".webp", ".gif", ".png"}
        frames, durations = animation(media[".webp"])
        assert len(frames) == 12 and all(frame.size == (192, 192) for frame in frames)
        assert all(duration > 0 for duration in durations)
        edges, partial_alpha, bounds = [], [], []
        for number, frame in enumerate(frames, 1):
            alpha = frame.getchannel("A")
            bbox = alpha.getbbox()
            assert bbox is not None and alpha.getextrema()[0] == 0
            bounds.append(bbox)
            partial_alpha.append(sum(alpha.histogram()[1:255]))
            if bbox[0] == 0 or bbox[1] == 0 or bbox[2] == 192 or bbox[3] == 192:
                edges.append(number)
        gif_frames, gif_durations = animation(media[".gif"])
        assert len(gif_frames) == len(frames) and gif_durations == durations
        with Image.open(media[".png"]) as image:
            sheet = image.convert("RGBA")
        assert sheet.width % 192 == 0 and sheet.height % 192 == 0
        columns, rows = sheet.width // 192, sheet.height // 192
        assert columns * rows >= len(frames)
        cells = [sheet.crop((index % columns * 192, index // columns * 192, (index % columns + 1) * 192, (index // columns + 1) * 192)) for index in range(columns * rows)]
        comparisons = [difference(frame, cell) for frame, cell in zip(frames, cells)]
        assert all(record["alpha_identical"] and record["mean_rgb_error"] == 0 for record in comparisons)
        assert all(cell.getchannel("A").getbbox() is None for cell in cells[len(frames):])
        prompt = plan["args"][plan["args"].index("--prompt") + 1]
        assert "--optimize-prompt" in plan["args"] and "--no-optimize-prompt" not in plan["args"]
        relative = lambda path: os.path.relpath(path, BASE).replace("\\", "/")
        input_first = Image.open(BASE / f"inputs/pose-{first}.png").convert("RGBA")
        input_last = Image.open(BASE / f"inputs/pose-{last}.png").convert("RGBA")
        record = {
            "id": identifier, "name": NAMES[identifier - 1], "from_pose": first, "to_pose": last,
            "prompt": prompt, "prompt_author": "user", "prompt_optimization": True,
            "job_id": state["job_id"], "webp": relative(media[".webp"]),
            "frame_count": len(frames), "durations_ms": durations, "duration_ms": sum(durations),
            "columns": columns, "rows": rows, "edge_contact_frames": edges,
            "first_to_input": difference(frames[0], input_first), "last_to_input": difference(frames[-1], input_last),
            "final_media": [{"label": label, "path": relative(media[extension]), "animated": extension != ".png"}
                            for extension, label in [(".webp", "透明WebP"), (".gif", "透明GIF"), (".png", "PNG图集")]],
        }
        clips.append(record)
        decoded[identifier] = frames
        validation.append({"id": identifier, "native_size": [192, 192], "frame_count": len(frames),
            "duration_ms": sum(durations), "durations_ms": durations, "partial_alpha_pixels": partial_alpha,
            "edge_contact_frames": edges, "frame_bounds": bounds, "sheet_dimensions": list(sheet.size),
            "webp_png_visible_pixels_identical": True,
            "gif_differences": [difference(frame, gif) for frame, gif in zip(frames, gif_frames)]})
        contact(frames, f"animation-{identifier}")
        summary.append({key: record[key] for key in ["id", "frame_count", "duration_ms", "edge_contact_frames", "first_to_input", "last_to_input"]})
    seams = []
    seam_frames = []
    for previous, following in [(1, 2), (2, 3), (3, 4), (4, 3)]:
        if previous in decoded and following in decoded:
            seams.append({"from": previous, "to": following, **difference(decoded[previous][-1], decoded[following][0])})
            seam_frames.extend([decoded[previous][-1], decoded[following][0]])
    if seam_frames:
        contact(seam_frames, "seams")
    if not args.partial:
        assert len(clips) == 4 and args.credits_after is not None
        study = {
            "hero": "yasuo", "direction": "se", "width": 192, "height": 192, "clips": clips,
            "intro_sequence": [1, 2], "attack_loop_sequence": [3, 4], "seams": seams,
            "credits_before": contract["credits_before"], "credits_after": args.credits_after,
            "credits_consumed": contract["credits_before"] - args.credits_after,
            "review": "四段原始动画已生成，正在逐帧检查；保留用户允许的刀光。尚未保证循环无缝或动作质量，不是美术定稿。",
            "visual_acceptance": "pending_review", "production_ready": False, "runtime_integrated": False,
        }
        # These are mechanically derived asset registries, never input image replacements.
        (BASE / "study.json").write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (BASE / "validation.json").write_text(json.dumps({"status": "technical_pass", "clips": validation, "seams": seams}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"clips": summary, "seams": seams}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
