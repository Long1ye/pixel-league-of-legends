"""Validate only declared final media, and render native-size internal QA sheets."""
import argparse
import json
import os
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v8-user-ab"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-user-ab"
SIZE = 176


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def difference(first, last):
    def visible(frame):
        return Image.alpha_composite(Image.new("RGBA", frame.size, "#192d38"), frame).convert("RGB")
    return {"mean_rgb_error": sum(ImageStat.Stat(ImageChops.difference(visible(first), visible(last))).mean) / 3,
            "alpha_identical": ImageChops.difference(first.getchannel("A"), last.getchannel("A")).getbbox() is None}


def contact(frames, name):
    QA.mkdir(parents=True, exist_ok=True)
    columns = 4
    sheet = Image.new("RGB", (SIZE * columns, (SIZE + 20) * ((len(frames) + columns - 1) // columns)), "#122731")
    draw = ImageDraw.Draw(sheet)
    for index, frame in enumerate(frames):
        x, y = index % columns * SIZE, index // columns * (SIZE + 20)
        draw.text((x + 8, y + 3), f"{name} / {index + 1}", fill="white")
        sheet.paste(Image.alpha_composite(Image.new("RGBA", frame.size, "#24333e"), frame).convert("RGB"), (x, y + 20))
    sheet.save(QA / f"{name}.png")


def animation(path):
    with Image.open(path) as image:
        frames, durations = [], []
        for frame in ImageSequence.Iterator(image):
            frame.load()
            durations.append(frame.info.get("duration", 0))
            frames.append(frame.convert("RGBA").copy())
        return frames, durations


def main(argv=None):
    global BASE, QA
    parser = argparse.ArgumentParser()
    parser.add_argument("--partial", action="store_true")
    parser.add_argument("--credits-after", type=int)
    parser.add_argument("--base", default=str(BASE))
    parser.add_argument("--qa", default=str(QA))
    parser.add_argument("--input-dir")
    args = parser.parse_args(argv)
    BASE, QA = Path(args.base).resolve(), Path(args.qa).resolve()
    input_dir = Path(args.input_dir).resolve() if args.input_dir else BASE / "inputs"
    assert BASE.is_relative_to(ROOT / "assets") and QA.is_relative_to(ROOT / "docs/screenshots")
    assert input_dir.is_relative_to(ROOT / "assets")
    contract = read_json(BASE / "contract.json")
    clips, decoded, validation = [], {}, []
    for identifier, (first, last), name in [("A", (1, 2), "第二次挥刀 · 图1→图2"), ("B", (2, 1), "第一次挥刀 · 图2→图1")]:
        state_path = BASE / f"animation-{identifier}.plan.state.json"
        state = read_json(state_path) if state_path.exists() else {}
        if state.get("status") != "success":
            if args.partial:
                continue
            raise RuntimeError(f"Animation {identifier} incomplete; use original-job recovery, never resubmit")
        plan = read_json(BASE / f"animation-{identifier}.plan.json")
        manifest = read_json(Path(state["manifest"]))
        assert manifest["status"] == "success" and manifest["job_id"] == state["job_id"]
        media = {}
        for output in manifest["outputs"]:
            assert output["type"] == "media" and output["mime_type"] in {"image/webp", "image/gif", "image/png"}
            path = (ROOT / output["path"]).resolve()
            assert path.is_relative_to(BASE.resolve()) and path.is_file()
            assert path.suffix not in media
            media[path.suffix] = path
        assert set(media) == {".webp", ".gif", ".png"}
        frames, durations = animation(media[".webp"])
        assert len(frames) == contract["requested_frames_per_clip"] and all(frame.size == (SIZE, SIZE) for frame in frames)
        assert all(duration > 0 for duration in durations)
        edges, bounds, partial_alpha = [], [], []
        for number, frame in enumerate(frames, 1):
            alpha = frame.getchannel("A")
            bbox = alpha.getbbox()
            assert bbox is not None and alpha.getextrema()[0] == 0
            bounds.append(bbox)
            partial_alpha.append(sum(alpha.histogram()[1:255]))
            if bbox[0] == 0 or bbox[1] == 0 or bbox[2] == SIZE or bbox[3] == SIZE:
                edges.append(number)
        gif_frames, gif_durations = animation(media[".gif"])
        assert len(gif_frames) == len(frames) and gif_durations == durations
        with Image.open(media[".png"]) as image:
            sheet = image.convert("RGBA")
        assert sheet.width % SIZE == 0 and sheet.height % SIZE == 0
        columns, rows = sheet.width // SIZE, sheet.height // SIZE
        assert columns * rows >= len(frames)
        cells = [sheet.crop((index % columns * SIZE, index // columns * SIZE, (index % columns + 1) * SIZE, (index // columns + 1) * SIZE)) for index in range(columns * rows)]
        comparisons = [difference(frame, cell) for frame, cell in zip(frames, cells)]
        assert all(record["alpha_identical"] and record["mean_rgb_error"] == 0 for record in comparisons)
        assert all(cell.getchannel("A").getbbox() is None for cell in cells[len(frames):])
        prompt = plan["args"][plan["args"].index("--prompt") + 1]
        assert prompt == contract["prompts"][identifier]
        assert "--optimize-prompt" in plan["args"] and "--no-optimize-prompt" not in plan["args"]
        relative = lambda path: os.path.relpath(path, BASE).replace("\\", "/")
        record = {"id": identifier, "name": name, "from_pose": first, "to_pose": last,
                  "prompt": prompt, "prompt_author": "user", "prompt_optimization": True,
                  "job_id": state["job_id"], "webp": relative(media[".webp"]),
                  "frame_count": len(frames), "durations_ms": durations, "duration_ms": sum(durations),
                  "columns": columns, "rows": rows, "edge_contact_frames": edges,
                  "first_to_input": difference(frames[0], Image.open(input_dir / f"pose-{first}.png").convert("RGBA")),
                  "last_to_input": difference(frames[-1], Image.open(input_dir / f"pose-{last}.png").convert("RGBA")),
                  "final_media": [{"label": label, "path": relative(media[extension])} for extension, label in [(".webp", "透明WebP"), (".gif", "透明GIF"), (".png", "PNG图集")]]}
        clips.append(record)
        decoded[identifier] = frames
        validation.append({"id": identifier, "native_size": [SIZE, SIZE], "frame_count": len(frames),
                           "duration_ms": sum(durations), "durations_ms": durations, "partial_alpha_pixels": partial_alpha,
                           "edge_contact_frames": edges, "frame_bounds": bounds, "sheet_dimensions": list(sheet.size),
                           "webp_png_visible_pixels_identical": True,
                           "gif_differences": [difference(frame, gif) for frame, gif in zip(frames, gif_frames)]})
        contact(frames, f"animation-{identifier}")
    seams = []
    if len(decoded) == 2:
        for previous, following in [("A", "B"), ("B", "A")]:
            seams.append({"from": previous, "to": following, **difference(decoded[previous][-1], decoded[following][0])})
        contact([decoded["A"][-1], decoded["B"][0], decoded["B"][-1], decoded["A"][0]], "seams")
    if not args.partial:
        assert len(clips) == 2 and args.credits_after is not None
        study = {"hero": "yasuo", "direction": "se", "width": SIZE, "height": SIZE, "clips": clips,
                 "attack_loop_sequence": ["A", "B"], "seams": seams,
                 "credits_before": contract["credits_before"], "credits_after": args.credits_after,
                 "credits_consumed": contract["credits_before"] - args.credits_after,
                 "review": "两段按用户原文并开启提示词优化独立生成，待逐帧和循环验收，尚未美术定稿。",
                 "visual_acceptance": "pending_review", "production_ready": False, "runtime_integrated": False}
        # Mechanically derived asset registries, not generated media replacements.
        (BASE / "study.json").write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (BASE / "validation.json").write_text(json.dumps({"status": "technical_pass", "clips": validation, "seams": seams}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"clips": [{key: record[key] for key in ["id", "frame_count", "duration_ms", "edge_contact_frames", "first_to_input", "last_to_input"]} for record in clips], "seams": seams}, ensure_ascii=False, indent=2))
    return {"clips": clips, "validation": validation, "seams": seams}


if __name__ == "__main__":
    main()
