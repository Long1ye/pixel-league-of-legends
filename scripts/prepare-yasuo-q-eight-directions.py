"""Native directional references and explicit, recoverable Meowa body edit plans."""
import hashlib
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v6-eight-directions"
SELECTED = ROOT / "assets/heroes/yasuo/selected-2026-10-10"
V5 = BASE.parent / "q-v5-small-grip-wind-e"
DIRECTIONS = {
    "se": "朝屏幕右下方，能看到正面和右侧，保持参考图1的三分之四侧面",
    "s": "朝屏幕正下方，面向镜头，保持参考图1的正面",
    "sw": "朝屏幕左下方，能看到正面和左侧，保持参考图1的三分之四侧面",
    "w": "朝屏幕正左方，保持参考图1的左向侧面",
    "nw": "朝屏幕左上方，背向镜头偏左，保持参考图1的背面与左侧",
    "n": "朝屏幕正上方，完全背向镜头，只能看到后脑和背部，保持参考图1的背面",
    "ne": "朝屏幕右上方，背向镜头偏右，保持参考图1的背面与右侧",
}


def main():
    refs = BASE / "references"
    plans = BASE / "plans"
    refs.mkdir(parents=True, exist_ok=True)
    plans.mkdir(exist_ok=True)
    preview = Image.new("RGBA", (512, 256), (17, 36, 44, 255))
    entries = []
    for i, direction in enumerate(["e", *DIRECTIONS]):
        with Image.open(SELECTED / f"idle-{direction}.png") as atlas:
            idle = atlas.convert("RGBA").crop((0, 0, 128, 128))
        preview.alpha_composite(idle, (i % 4 * 128, i // 4 * 128))
        prepared = Image.new("RGBA", (256, 160))
        prepared.paste(idle, (12, 16))
        assert prepared.crop((12, 16, 140, 144)).tobytes() == idle.tobytes()
        prepared.save(refs / f"idle-{direction}-prepared.png")
        idle.save(refs / f"idle-{direction}-native.png")
        entries.append({"direction": direction, "source_sha256": hashlib.sha256((SELECTED / f"idle-{direction}.png").read_bytes()).hexdigest(),
                        "visible_bounds": idle.getchannel("A").getbbox(), "native_pixels_preserved": True})
        if direction == "e":
            continue
        plan_path = plans / f"{direction}.plan.json"
        if plan_path.with_suffix(".state.json").exists():
            continue
        prompt = (
            f"仅编辑参考图1左侧的亚索：{DIRECTIONS[direction]}。头部、躯干和双脚不转向，保留原来的发型、蓝围巾、单侧肩甲、服装和像素大小。"
            "为Q戳刺制作无持刀右臂的身体底图：去掉角色的持刀右臂和它握着的刀，补齐肩根和衣服，另一只手与腰侧刀鞘保留。"
            "右臂之后会单独绑定，因此身体上不要残留右手或多余的刀。参考图2只用来统一身体设计和比例。"
            "只画一个完整身体，右半画布保持空白，不画手臂零件、武器、风效、刀光或文字，透明背景。"
        )
        plan = {"command": "image-edit-run", "recovery_command": "pixel-gen-poll",
                "output_dir": f"meowa-output/yasuo-q-v6-body-{direction}",
                "args": ["--reference-image", str((refs / f"idle-{direction}-prepared.png").relative_to(ROOT)).replace("\\", "/"),
                         "--reference-image", str((V5 / "media/parts-sheet.png").relative_to(ROOT)).replace("\\", "/"),
                         "--prompt", prompt, "--mode", "pixel", "--strict", "--generation-model", "image-2.5",
                         "--resolution", "1K", "--quality", "detailed", "--remove-bg-method", "standard"]}
        plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    qa = ROOT / "docs/screenshots/animation-qa/yasuo-q-v6-eight-directions"
    qa.mkdir(parents=True, exist_ok=True)
    preview.resize((1024, 512), Image.Resampling.NEAREST).save(qa / "source-directions-2x.png")
    (BASE / "references-inspection.json").write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"plans": list(DIRECTIONS), "native_references": entries}, ensure_ascii=False))


if __name__ == "__main__":
    main()
