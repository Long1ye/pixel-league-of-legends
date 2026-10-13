"""Import user art unchanged and prepare explicit 128px runtime textures."""
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-skills/2026-10-12/yasuo/q-v7-user-linked"
TEMP = Path("C:/Users/PC/AppData/Local/Temp")
FILES = {
    "nw": "codex-clipboard-53225e16-0e41-46ee-b6c3-cfca16fe6730.png",
    "n": "codex-clipboard-407c29ac-2572-4ecf-8ed1-f73aae5b09ff.png",
    "ne": "codex-clipboard-e3653fb2-e760-4070-9155-74b6b24d2010.png",
    "w": "codex-clipboard-108b29b7-b542-4b21-babc-973f83524544.png",
    "e": "codex-clipboard-7dc3fb59-bab8-432b-aca0-9216fcf0893d.png",
    "sw": "codex-clipboard-0749ccef-453c-4bb6-a8c0-9b7067c56a9e.png",
    "se": "codex-clipboard-3c4a66aa-9f64-43ef-b93c-e30e837259fd.png",
    "s": "codex-clipboard-8c0e722d-843e-4186-a820-4b1f784310d4.png",
}


def main():
    source_root = BASE / "source"
    media = BASE / "media"
    source_root.mkdir(parents=True, exist_ok=True)
    media.mkdir(exist_ok=True)
    entries = []
    for direction, filename in FILES.items():
        source = TEMP / filename
        destination = source_root / f"user-{direction}.png"
        shutil.copy2(source, destination)
        assert source.read_bytes() == destination.read_bytes()
        with Image.open(source) as image:
            rgba = image.convert("RGBA")
            bounds = rgba.getchannel("A").getbbox()
            runtime = rgba.resize((128, 128), Image.Resampling.NEAREST)
            runtime.save(media / f"user-{direction}.png")
            entries.append({"direction": direction, "source": f"source/user-{direction}.png", "source_dimensions": list(image.size),
                "source_alpha_bounds": bounds, "source_sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
                "runtime": f"media/user-{direction}.png", "runtime_dimensions": [128, 128],
                "runtime_alpha_bounds": runtime.getchannel("A").getbbox(),
                "source_byte_exact": True, "runtime_sampling": "nearest; explicit game asset preparation, original retained"})
    extra = TEMP / "codex-clipboard-427cdf28-1b8a-4ca4-bc68-81c677fc0198.png"
    shutil.copy2(extra, source_root / "duplicate-upload-7.png")
    duplicate_exact = extra.read_bytes() == (TEMP / FILES["sw"]).read_bytes()
    assert duplicate_exact
    (BASE / "source-inspection.json").write_text(json.dumps({"entries": entries,
        "duplicate_uploads": [6, 7], "duplicate_byte_exact": duplicate_exact,
        "missing_direction": None, "southeast_supplied_separately": True, "north_supplied_by_user": True,
        "scope": "Use the user's art, preserve originals and previous studies; no paid regeneration"}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(entries, ensure_ascii=False))


if __name__ == "__main__":
    main()
