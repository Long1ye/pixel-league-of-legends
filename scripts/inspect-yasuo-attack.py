"""Read every declared frame; create registry and internal visual QA without editing art."""
from pathlib import Path
import json
import os
from PIL import Image, ImageChops, ImageDraw, ImageSequence, ImageStat

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets/hero-attacks/2026-10-09/yasuo/v1"
manifests = list((BASE / "attack-se").rglob("final_outputs.json"))
assert len(manifests) == 1, "Exactly one paid attack job is expected"
manifest = json.loads(manifests[0].read_text(encoding="utf-8"))
assert manifest["status"] == "success"
paths = {Path(o["path"]).suffix: ROOT / o["path"] for o in manifest["outputs"]}
assert set(paths) == {".webp", ".gif", ".png"}
rows = []
decoded = {}
for suffix, path in paths.items():
    with Image.open(path) as image:
        frames, durations = [], []
        for index, frame in enumerate(ImageSequence.Iterator(image)):
            rgba = frame.convert("RGBA"); rgba.load()
            frames.append(rgba.copy()); durations.append(image.info.get("duration", 0))
        decoded[suffix] = frames
        rows.append({"path": str(path.relative_to(ROOT)).replace("\\", "/"), "format": image.format,
                     "size": list(image.size), "frame_count": len(frames), "durations_ms": durations,
                     "loop": image.info.get("loop"), "alpha_levels": [len(f.getchannel("A").getcolors(256)) for f in frames],
                     "bounds": [f.getchannel("A").getbbox() for f in frames]})
        assert all(f.getchannel("A").getextrema() == (0, 255) for f in frames)
        assert all(len(f.getchannel("A").getcolors(256)) == 2 for f in frames)
        if suffix != ".png":
            assert image.size == (176, 176) and len(frames) == 8 and durations == [100] * 8 and image.info.get("loop") == 0
        else:
            assert image.size == (528, 528)
webp = decoded[".webp"]
sheet = decoded[".png"][0]
cells = [sheet.crop((i % 3 * 176, i // 3 * 176, (i % 3 + 1) * 176, (i // 3 + 1) * 176)) for i in range(9)]
assert all(f.getchannel("A").getbbox() is not None for f in cells[:8]) and cells[8].getchannel("A").getbbox() is None
visible = lambda f: Image.alpha_composite(Image.new("RGBA", f.size, (0, 0, 0, 255)), f).convert("RGB")
assert all(ImageChops.difference(a.getchannel("A"), b.getchannel("A")).getbbox() is None and
           ImageChops.difference(visible(a), visible(b)).getbbox() is None for a, b in zip(webp, cells))
for f in webp:
    x0, y0, x1, y1 = f.getchannel("A").getbbox()
    assert x0 > 0 and y0 > 0 and x1 < 176 and y1 < 176, "Artwork touches a frame edge"
gif_differences = [sum(ImageStat.Stat(ImageChops.difference(visible(a), visible(b))).mean) / 3
                   for a, b in zip(webp, decoded[".gif"])]
validation = {"status": "technical_pass", "job_id": manifest["job_id"], "files": rows,
              "png_webp_visible_pixels_identical": True, "gif_mean_rgb_error": gif_differences,
              "frame_count": 8, "edge_contact": False, "production_ready": False, "runtime_integrated": False}
(BASE / "validation.json").write_text(json.dumps(validation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
relative = lambda path: os.path.relpath(path, BASE).replace("\\", "/")
source = ROOT / "assets/hero-walk-directions/2026-10-09/v1/yasuo/component_004_pixel_multi_view/iso_front_right.png"
study = {"hero": "yasuo", "action": "basic_attack", "direction": "se", "status": "motion_study",
         "width": 176, "height": 176, "frame_count": 8, "columns": 3, "rows": 3,
         "durations_ms": [100] * 8, "duration_ms": 800,
         "webp": relative(paths[".webp"]), "gif": relative(paths[".gif"]), "sheet": relative(paths[".png"]),
         "source": relative(source), "source_anchor": [64, 115], "source_offset": [8, 16], "anchor": [72, 131],
         "reference_page": "https://www.leagueoflegends.com/en-us/champions/yasuo/",
         "reference_video": "https://lol.dyn.riotcdn.net/x/videos/champion-abilities/0157/ability_0157_R1.mp4",
         "reference_seconds": [6.0, 7.2], "reference_use": "Observed motion, translated to prompt; not uploaded as motion conditioning",
         "credits_before": 10045, "credits_after": 9985, "credits_consumed": 60,
         "review": "8帧尺寸与透明度检查通过，挥刀后回收；第3–4帧刀光偏宽亮，末帧与起手并非完全相同。先验收动作，不视为正式美术定稿。脚底检查点固定，未做逐帧自动对齐。",
         "production_ready": False, "runtime_integrated": False}
(BASE / "study.json").write_text(json.dumps(study, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
# Internal QA on a checkerboard. Only declared original media is handed off.
contact = Image.new("RGB", (4 * 352, 2 * 382), "#11242d")
draw = ImageDraw.Draw(contact)
for index, frame in enumerate(webp):
    tile = Image.new("RGBA", frame.size, "#162c37")
    checker = ImageDraw.Draw(tile)
    for y in range(0, 176, 8):
        for x in range(0, 176, 8):
            if (x // 8 + y // 8) % 2: checker.rectangle((x, y, x + 7, y + 7), fill="#244350")
    tile = Image.alpha_composite(tile, frame).convert("RGB").resize((352, 352), Image.Resampling.NEAREST)
    x, y = index % 4 * 352, index // 4 * 382
    draw.text((x + 8, y + 8), f"Frame {index + 1} / {index * 100} ms", fill="white")
    contact.paste(tile, (x, y + 30))
qa = ROOT / "docs/screenshots/animation-qa/yasuo-basic-attack-frames.png"
qa.parent.mkdir(parents=True, exist_ok=True); contact.save(qa)
print(json.dumps({"validation": validation["status"], "frames": 8, "canvas": [176, 176],
                  "binary_alpha": True, "edge_contact": False, "gif_max_mean_rgb_error": max(gif_differences)}, indent=2))
