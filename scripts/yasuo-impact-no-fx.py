"""Finite two-clip study with exact user prompts; prepare/inspect only, no API calls."""
import argparse
import sys
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets/hero-attacks/2026-10-10/yasuo/v13-impact-no-fx-user"
QA = ROOT / "docs/screenshots/animation-qa/yasuo-impact-no-fx-user"
SOURCES = [
    ("d04136fb-883c-45ae-bf79-6393d624a354", (57, 124)),
    ("d40730a5-dedc-4735-a73b-670dc2f75dd4", (68, 115)),
]
PROMPTS = {
    "A": "亚索从高位挥砍到低位，动作自然流畅，要有打击感，不要有刀光",
    "B": "亚索从低位挥砍到高位，动作自然流畅，要有打击感，不要有刀光",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("phase", choices=["prepare", "inspect"])
    parser.add_argument("--credits-before", type=int)
    parser.add_argument("--credits-after", type=int)
    args = parser.parse_args()
    credit_option = "--credits-before" if args.phase == "prepare" else "--credits-after"
    credits = args.credits_before if args.phase == "prepare" else args.credits_after
    if credits is None:
        parser.error(f"{args.phase} requires {credit_option}")
    filename = "prepare-yasuo-high-low.py" if args.phase == "prepare" else "inspect-yasuo-high-low.py"
    spec = spec_from_file_location("configured_study", ROOT / "scripts" / filename)
    module = module_from_spec(spec)
    spec.loader.exec_module(module)
    module.BASE, module.QA = BASE, QA
    if args.phase == "prepare":
        module.SOURCES, module.PROMPTS = SOURCES, PROMPTS
        # Attachments have 72 unused transparent columns on the right.
        module.SOURCE_CROPS = {identifier: (0, 0, 128, 128) for identifier, _ in SOURCES}
    sys.argv = [str(Path(__file__)), credit_option, str(credits)]
    module.main()


if __name__ == "__main__":
    main()
