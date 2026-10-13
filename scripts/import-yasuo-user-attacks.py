"""Lossless local import of user-selected WebPs; no generation or API requests."""
import hashlib
import json
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageSequence

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/heroes/yasuo/selected-2026-10-10"
PREVIEW = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v14-user-selected"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-user-selected"
SOURCES = {
    "A": "b2020f64-c549-4ef6-9b41-53816e96475b",
    "B": "d9506a7c-7b6e-476e-ad66-701683e6f477",
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def visible_equal(a, b):
    if a.getchannel("A").tobytes() != b.getchannel("A").tobytes():
        return False
    backdrop = Image.new("RGBA", a.size, "#192d38")
    return Image.alpha_composite(backdrop, a).tobytes() == Image.alpha_composite(backdrop, b).tobytes()


def contact(frames, target, label):
    columns = 6
    w, h = frames[0].size
    sheet = Image.new("RGB", (columns * w, ((len(frames) + columns - 1) // columns) * (h + 20)), "#192d38")
    draw = ImageDraw.Draw(sheet)
    for i, frame in enumerate(frames):
        x, y = i % columns * w, i // columns * (h + 20)
        draw.text((x + 5, y + 2), f"{label} {i + 1}", fill="white")
        sheet.paste(Image.alpha_composite(Image.new("RGBA", frame.size, "#24333e"), frame).convert("RGB"), (x, y + 20))
    sheet.save(target)


def main():
    if "--verify-only" in sys.argv[1:]:
        verify()
        return
    assert not (BASE / "animations.json").exists(), "Preserve an already imported selection"
    BASE.mkdir(parents=True, exist_ok=True)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    QA.mkdir(parents=True, exist_ok=True)
    clips, frames_by_id = [], {}
    for identifier, source_id in SOURCES.items():
        source = Path("C:/Users/PC/AppData/Local/Temp") / f"codex-clipboard-{source_id}.webp"
        original = BASE / f"attack-{identifier}.webp"
        assert not original.exists()
        shutil.copyfile(source, original)
        assert digest(original) == digest(source)
        frames, durations = [], []
        with Image.open(original) as animation:
            for frame in ImageSequence.Iterator(animation):
                frame.load()
                frames.append(frame.convert("RGBA").copy())
                durations.append(frame.info["duration"])
        assert len(frames) == 24 and all(f.size == (200, 128) for f in frames)
        assert all(d > 0 for d in durations)
        assert all(f.getchannel("A").getextrema() == (0, 255) for f in frames)
        atlas = Image.new("RGBA", (1600, 384), (0, 0, 0, 0))
        for i, frame in enumerate(frames):
            x, y = i % 8 * 200, i // 8 * 128
            atlas.paste(frame, (x, y))  # No mask: preserve RGBA exactly.
            assert atlas.crop((x, y, x + 200, y + 128)).tobytes() == frame.tobytes()
        sheet = BASE / f"attack-{identifier}.png"
        atlas.save(sheet)
        with Image.open(sheet) as exported:
            assert exported.convert("RGBA").tobytes() == atlas.tobytes()
        bounds = [frame.getchannel("A").getbbox() for frame in frames]
        edges = [i + 1 for i, b in enumerate(bounds) if b[0] == 0 or b[1] == 0 or b[2] == 200 or b[3] == 128]
        clips.append({
            "id": identifier, "key": f"yasuo-attack-{identifier}", "name": "高位→低位" if identifier == "A" else "低位→高位",
            "webp": original.name, "sheet": sheet.name, "width": 200, "height": 128,
            "frame_count": len(frames), "columns": 8, "rows": 3,
            "durations_ms": durations, "duration_ms": sum(durations),
            "anchor": [64, 124], "impact_frame": 6 if identifier == "A" else 10,
            "source_sha256": digest(original), "atlas_sha256": digest(sheet),
            "source_pixels_preserved": True, "edge_contact_frames": edges,
        })
        frames_by_id[identifier] = frames
        contact(frames, QA / f"attack-{identifier}.png", identifier)
    seams = [
        {"from": first, "to": following,
         "visible_pixels_identical": visible_equal(frames_by_id[first][-1], frames_by_id[following][0])}
        for first, following in [("A", "B"), ("B", "A")]
    ]
    contact([frames_by_id["A"][-1], frames_by_id["B"][0], frames_by_id["B"][-1], frames_by_id["A"][0]], QA / "seams.png", "seam")
    locomotion = []
    study_base = ROOT / "assets/hero-animations/2026-10-09/v2"
    study = json.loads((study_base / "study.json").read_text(encoding="utf-8"))
    hero = next(hero for hero in study["heroes"] if hero["id"] == "yasuo")
    for clip in hero["clips"]:
        source = (study_base / clip["sheet"]).resolve()
        assert source.is_relative_to(ROOT / "assets") and source.is_file()
        target = BASE / f"{clip['state']}-{clip['direction']}.png"
        assert not target.exists()
        shutil.copyfile(source, target)
        assert digest(source) == digest(target)
        with Image.open(target) as image:
            assert image.size == (clip["columns"] * clip["width"], clip["rows"] * clip["height"])
            assert image.convert("RGBA").getchannel("A").getextrema()[0] == 0
        locomotion.append({key: clip[key] for key in ["state", "direction", "width", "height", "frame_count", "columns", "rows", "durations_ms", "duration_ms"]} | {
            "key": f"yasuo-{clip['state']}-{clip['direction']}", "sheet": target.name,
            "anchor": hero["anchors"][clip["direction"]], "source_sha256": digest(target),
        })
    registry = {"hero": "yasuo", "selection": "user_approved", "attack_direction": "se", "scale_in_world": 0.25,
                "attacks": clips, "locomotion": locomotion, "seams": seams,
                "generated_this_turn": False, "credits_consumed": 0,
                "notes": "原始文件逐字节保留，图集逐帧RGBA一致。不剪帧、不重画。攻击只支持右下样稿，不旋转或镜像。"}
    (BASE / "animations.json").write_text(json.dumps(registry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    prefix = "../../../../heroes/yasuo/selected-2026-10-10/"
    preview = {
        "hero": "yasuo", "width": 200, "height": 128,
        "clips": [{**clip, "prompt": "用户自行制作并选定的动画，未重新生成。", "webp": prefix + clip["webp"],
                   "final_media": [{"label": "原始WebP", "path": prefix + clip["webp"]}, {"label": "PNG图集", "path": prefix + clip["sheet"]}]} for clip in clips],
        "review": "完整保留A/B各24帧、每段3秒，原速循环6秒。末尾包含收势停留；不剪掉静止帧。两处接缝对应高/低位姿态，但不是逐像素一致。原始图中的刀光、触边和位移全部保留，不自动修改用户选定的素材。",
        "credits_consumed": 0, "credits_after": 0,
    }
    (PREVIEW / "study.json").write_text(json.dumps(preview, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"selection": "user_approved", "clips": [{"id": c["id"], "frame_count": c["frame_count"], "duration_ms": c["duration_ms"], "edge_contact_frames": c["edge_contact_frames"]} for c in clips], "seams": seams, "locomotion_count": len(locomotion), "paid_jobs": 0}, ensure_ascii=False, indent=2))


def verify():
    """Repeatable read-only checks of originals, frame pixels, timing and copied atlases."""
    registry = json.loads((BASE / "animations.json").read_text(encoding="utf-8"))
    verified = 0
    for clip in registry["attacks"]:
        original, sheet = BASE / clip["webp"], BASE / clip["sheet"]
        assert digest(original) == clip["source_sha256"]
        assert digest(sheet) == clip["atlas_sha256"]
        source = Path("C:/Users/PC/AppData/Local/Temp") / f"codex-clipboard-{SOURCES[clip['id']]}.webp"
        if source.exists():
            assert source.read_bytes() == original.read_bytes()
        with Image.open(original) as animation, Image.open(sheet) as atlas:
            assert animation.n_frames == clip["frame_count"]
            for i, frame in enumerate(ImageSequence.Iterator(animation)):
                frame.load()
                cell = atlas.crop((i % 8 * 200, i // 8 * 128, (i % 8 + 1) * 200, (i // 8 + 1) * 128)).convert("RGBA")
                assert cell.tobytes() == frame.convert("RGBA").tobytes()
                assert frame.info["duration"] == clip["durations_ms"][i]
                verified += 1
    for clip in registry["locomotion"]:
        assert digest(BASE / clip["sheet"]) == clip["source_sha256"]
    print(json.dumps({"original_file_hashes_verified": 2, "rgba_frames_verified": verified,
                      "locomotion_atlases_verified": len(registry["locomotion"]), "paid_jobs": 0}))


if __name__ == "__main__":
    main()
