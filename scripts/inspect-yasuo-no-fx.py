"""Inspect declared Meowa files; produce metadata and internal native-size QA sheets."""
import json
import os
import sys
from pathlib import Path
from PIL import Image, ImageSequence, ImageChops, ImageDraw, ImageStat

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-09/yasuo/v6-no-fx-transitions"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-no-fx"
QA.mkdir(parents=True, exist_ok=True)


def difference(a, b):
    def visible(image):
        return Image.alpha_composite(Image.new("RGBA", image.size, "#192d38"), image).convert("RGB")
    diff = ImageChops.difference(visible(a), visible(b))
    return {"mean_rgb_error": sum(ImageStat.Stat(diff).mean) / 3,
            "alpha_identical": ImageChops.difference(a.getchannel("A"), b.getchannel("A")).getbbox() is None}


def contacts(frames, name, full=True):
    selected = list(enumerate(frames)) if full else [(i, frames[i]) for i in sorted(set(round(i*(len(frames)-1)/15) for i in range(16)))]
    for offset in range(0, len(selected), 16):
        sheet = Image.new("RGB", (768, 864), "#122731")
        draw = ImageDraw.Draw(sheet)
        for cell, (index, frame) in enumerate(selected[offset:offset+16]):
            background = Image.new("RGBA", (192, 192), "#192d38")
            tile_draw = ImageDraw.Draw(background)
            for y in range(0, 192, 8):
                for x in range(0, 192, 8):
                    if (x//8+y//8) % 2:
                        tile_draw.rectangle((x, y, x+7, y+7), fill="#294653")
            x, y = (cell % 4)*192, (cell // 4)*216
            draw.text((x+6, y+6), f"{name} {index+1}", fill="white")
            sheet.paste(Image.alpha_composite(background, frame).convert("RGB"), (x, y+24))
        sheet.save(QA / f"{name}-{offset//16+1}.png")


def main():
    contract = json.loads((BASE / "contract.json").read_text(encoding="utf-8"))
    clean_a = "--clean-a" in sys.argv
    keyframes_a = "--keyframes-a" in sys.argv
    clips, decoded, validation = {}, {}, []
    for variant, directory in [("a", "a-to-b"), ("b", "b-to-a")]:
        legacy = variant == "a" and keyframes_a
        if legacy:
            directory = "a-keyframes-no-fx"
        elif variant == "a" and clean_a:
            directory = "a-remove-fx"
        manifests = list((BASE / "clips" / directory).rglob("final_outputs.json"))
        assert len(manifests) == 1
        manifest = json.loads(manifests[0].read_text(encoding="utf-8"))
        assert manifest["status"] == "success" and len(manifest["outputs"]) == (3 if legacy else 2)
        roles, sheet_path = {}, None
        for output in manifest["outputs"]:
            assert output["type"] == "media" and output["mime_type"] in {"image/webp", "image/png", "image/gif"}
            path = ROOT / output["path"]
            if path.suffix == ".png":
                assert variant == "a" and (clean_a or keyframes_a) and sheet_path is None
                sheet_path = path
                continue
            with Image.open(path) as im:
                frames, durations = [], []
                for frame in ImageSequence.Iterator(im):
                    frames.append(frame.convert("RGBA").copy())
                    durations.append(frame.info.get("duration", 0))
                assert im.size == tuple(contract["canvas"])
                loop = im.info.get("loop")
            assert (len(frames) == 12 if legacy else len(frames) > 24) and all(value > 0 for value in durations)
            role = "gif" if path.suffix == ".gif" else "transparent" if frames[0].getchannel("A").getextrema()[0] == 0 else "background"
            assert role not in roles
            roles[role] = (path, frames, durations)
            edge_frames = []
            for index, frame in enumerate(frames):
                alpha = frame.getchannel("A")
                bbox = alpha.getbbox()
                assert bbox is not None, "Empty frame"
                if role in {"transparent", "gif"}:
                    assert set(alpha.get_flattened_data()) == {0, 255}
                    if 0 in bbox[:2] or bbox[2] == frame.width or bbox[3] == frame.height:
                        edge_frames.append(index+1)
                else:
                    assert alpha.getextrema() == (255, 255)
            validation.append({"variant": variant, "role": role, "size": [192, 192],
                "frame_count": len(frames), "duration_ms": sum(durations), "loop": loop,
                "edge_contact_frames": edge_frames, "path": path.relative_to(ROOT).as_posix()})
            prefix = "keyframes-" if legacy else "clean-" if variant == "a" and clean_a else ""
            contacts(frames, f"{variant}-{prefix}{role}", role in {"transparent", "gif"})
        expected = {"transparent", "gif"} if legacy else {"transparent"} if variant == "a" and clean_a else {"transparent", "background"}
        assert set(roles) == expected
        path, frames, durations = roles["transparent"]
        if "background" in roles:
            assert durations == roles["background"][2]
        if "gif" in roles:
            assert durations == roles["gif"][2]
        if variant == "a" and clean_a and not keyframes_a:
            original_manifest = json.loads(next((BASE / "clips/a-to-b").rglob("final_outputs.json")).read_text(encoding="utf-8"))
            with Image.open(ROOT / original_manifest["outputs"][0]["path"]) as original:
                original_durations = []
                for frame in ImageSequence.Iterator(original):
                    frame.load()
                    original_durations.append(frame.info["duration"])
            assert durations == original_durations, "Edited frame timing was changed"
        if sheet_path is not None:
            with Image.open(sheet_path) as im:
                sheet = im.convert("RGBA")
            assert sheet.width % 192 == 0 and sheet.height % 192 == 0
            columns, rows = sheet.width//192, sheet.height//192
            assert columns*rows >= len(frames)
            cells = [sheet.crop((i % columns*192, i//columns*192, (i % columns+1)*192, (i//columns+1)*192)) for i in range(columns*rows)]
            comparisons = [difference(frame, cell) for frame, cell in zip(frames, cells)]
            assert all(record["alpha_identical"] and record["mean_rgb_error"] == 0 for record in comparisons)
            assert all(cell.getchannel("A").getbbox() is None for cell in cells[len(frames):])
            validation.append({"variant": variant, "role": "sheet", "size": list(sheet.size),
                "valid_cells": len(frames), "png_webp_visible_pixels_identical": True,
                "frame_timing_identical_to_original": not legacy, "path": sheet_path.relative_to(ROOT).as_posix()})
        decoded[variant] = frames
        first = "a" if variant == "a" else "b"
        last = "b" if variant == "a" else "a"
        clips[variant] = {
            "id": variant, "transition": "a-to-b" if variant == "a" else "b-to-a", "candidate": directory, "job_id": manifest["job_id"],
            "webp": os.path.relpath(path, BASE).replace("\\", "/"),
            "frame_count": len(frames), "durations_ms": durations, "duration_ms": sum(durations),
            "first_to_input": difference(frames[0], Image.open(ROOT / contract["inputs"][first]).convert("RGBA")),
            "last_to_input": difference(frames[-1], Image.open(ROOT / contract["inputs"][last]).convert("RGBA")),
            "final_media": [{"label": {"transparent": "透明WebP", "background": "保留背景WebP", "gif": "透明GIF"}[role],
                "path": os.path.relpath(record[0], BASE).replace("\\", "/"), "animated": True}
                for role, record in roles.items()],
        }
        if sheet_path is not None:
            clips[variant]["final_media"].append({"label": "PNG图集", "path": os.path.relpath(sheet_path, BASE).replace("\\", "/"), "animated": False})
    seams = {"a_to_b": difference(decoded["a"][-1], decoded["b"][0]),
             "b_to_a": difference(decoded["b"][-1], decoded["a"][0])}
    contacts([decoded["a"][-1], decoded["b"][0], decoded["b"][-1], decoded["a"][0]], "keyframes-seams" if keyframes_a else "clean-seams" if clean_a else "seams")
    after = int(sys.argv[1])
    result = {"hero": "yasuo", "action": "endpoint_transitions_no_fx", "direction": "se",
        "width": 192, "height": 192, "clips": clips, "seams": seams,
        "credits_before": contract["credits_before"], "credits_after": after,
        "credits_consumed": contract["credits_before"]-after,
        "review": "端点方向为画面右下 ⇄ 右上。上撩关键帧版本逐帧检查中。" if keyframes_a else "端点方向为画面右下 ⇄ 右上。两次独立单刀攻击；上撩已做去刀光编辑，修正结果逐帧检查中。" if clean_a else "端点方向为画面右下 ⇄ 右上。初版上撩存在额外蓝色刀光，不能作为无刀光版本交付。",
        "visual_acceptance": "pending_review", "runtime_integrated": False, "production_ready": False,
    }
    if clean_a or keyframes_a:
        result["rejected_candidates"] = [{"candidate": "a-to-b", "job_id": "job_ec01c813817f435f91cd5753438356a4", "reason": "Blue sword trail in frames 10-16; repaired with animation-edit-run."}]
    if keyframes_a:
        result["rejected_candidates"].append({"candidate": "a-remove-fx", "job_id": "job_192791e279ff446cbb111d20281fb8d2", "reason": "Removed trails but redrew clothing and face, not consistent with accepted endpoint sprites."})
    (BASE / "study.json").write_text(json.dumps(result, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    (BASE / "validation.json").write_text(json.dumps({"files": validation, "seams": seams, "visual_acceptance": "pending_review"}, indent=2)+"\n", encoding="utf-8")
    print(json.dumps({"clips": {key: {"frames": value["frame_count"], "duration_ms": value["duration_ms"],
        "first_to_input": value["first_to_input"], "last_to_input": value["last_to_input"]} for key, value in clips.items()}, "seams": seams}, indent=2))


if __name__ == "__main__":
    main()
