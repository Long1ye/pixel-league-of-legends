"""Native, byte-preserving references for the one-direction layered Q study."""
import hashlib
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v3-layered-e"
Q_SOURCE = Path("D:/Long1ye/资源/yasuo-Q.webp")
IDLE_SOURCE = ROOT / "assets/heroes/yasuo/selected-2026-10-10/idle-e.png"


def main():
    refs = BASE / "references"
    if (BASE / "parts.plan.state.json").exists():
        raise RuntimeError("Already submitted; recover the original job, do not recreate a plan")
    refs.mkdir(parents=True, exist_ok=True)
    with Image.open(IDLE_SOURCE) as atlas:
        idle = atlas.convert("RGBA").crop((0, 0, 128, 128))
    prepared = Image.new("RGBA", (256, 160))
    prepared.paste(idle, (12, 16))
    assert prepared.crop((12, 16, 140, 144)).tobytes() == idle.tobytes()
    prepared.save(refs / "idle-e-prepared.png")
    idle.save(refs / "idle-e-native.png")
    with Image.open(Q_SOURCE) as animation:
        count = animation.n_frames
        durations = []
        for frame in range(count):
            animation.seek(frame)
            durations.append(animation.info.get("duration", 125))
        animation.seek(11)
        impact = animation.convert("RGBA").copy()
        assert impact.size == (256, 128)
        impact.save(refs / "q-user-extended.png")
    prompt = (
        "将参考亚索绘制成朝画面正右的像素Q戳刺分层素材，保持蓝色围巾、单侧肩甲、发型、衣服和像素大小。"
        "同一张透明图上分开摆放四个部件：左侧是双脚站稳、微微蓄力的完整身体，移除靠近镜头的持刀右臂，补全肩根和胸腹，但保留另一只手与刀鞘；"
        "右上分别放一段从肩到肘的上臂、以及一段从肘到握刀拳头的前臂，关节处留少量可重叠连接的皮肤；右下放完整武士刀，刀柄在左、刀尖朝右。"
        "两段手臂都水平朝右，与身体比例相配，拳头不带刀。部件之间留透明空隙，不要文字、风效或刀光。"
    )
    plan = {
        "command": "image-edit-run",
        "recovery_command": "pixel-gen-poll",
        "output_dir": "meowa-output/yasuo-q-v3-layered-e-parts",
        "args": [
            "--reference-image", str((refs / "idle-e-prepared.png").relative_to(ROOT)).replace("\\", "/"),
            "--reference-image", str((refs / "q-user-extended.png").relative_to(ROOT)).replace("\\", "/"),
            "--prompt", prompt, "--mode", "pixel", "--strict",
            "--generation-model", "image-2.5", "--resolution", "1K",
            "--quality", "detailed", "--remove-bg-method", "standard",
        ],
    }
    (BASE / "parts.plan.json").write_text(json.dumps(plan, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    contract = {
        "hero": "yasuo", "skill": "Q1/Q2", "direction": "e", "heading_degrees": 0,
        "method": "AI-generated parts + local procedural two-joint thrust, not whole-sprite rotation",
        "scope": "One single-direction layered animation proof; no multi-direction generation or main-game integration",
        "source_q_sha256": hashlib.sha256(Q_SOURCE.read_bytes()).hexdigest(),
        "source_idle_sha256": hashlib.sha256(IDLE_SOURCE.read_bytes()).hexdigest(),
        "source_q_frames": count, "source_q_duration_ms": sum(durations),
        "references_native_pixels_preserved": True,
        "planned_primary_jobs": 1, "credits_before": 5969,
        "runtime_integrated": False, "other_directions_validated": False,
        "prompt": prompt,
    }
    (BASE / "contract.json").write_text(json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"study": str(BASE), "prepared_dimensions": prepared.size, "source_q_frames": count, "source_q_unchanged": True}))


if __name__ == "__main__":
    main()
