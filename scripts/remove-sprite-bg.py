#!/usr/bin/env python3
"""Remove background from character sprites (person cutout with alpha)."""
from __future__ import annotations

import io
import sys
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
SPRITES = ROOT / "public" / "assets" / "sprites"
CHARS = ["weiyang", "zhixia", "baichuan", "linmu", "zhouyuan"]
EXPRS = ["neutral", "smile", "sad", "surprised", "serious", "gentle"]


def process(path: Path) -> None:
    raw = path.read_bytes()
    out_bytes = remove(raw)
    img = Image.open(io.BytesIO(out_bytes)).convert("RGBA")
    # Trim near-transparent padding
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    # Pad bottom alignment: scale to fit 832x1200 canvas, feet near bottom
    target_w, target_h = 832, 1200
    scale = min(target_w / img.width, target_h / img.height)
    new_w = max(1, int(img.width * scale))
    new_h = max(1, int(img.height * scale))
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    x = (target_w - new_w) // 2
    y = target_h - new_h - 20  # feet margin from bottom
    canvas.paste(img, (x, y), img)
    canvas.save(path, "WEBP", quality=90, method=6)
    print("cutout", path.relative_to(ROOT))


def main() -> None:
    targets = sys.argv[1:] if len(sys.argv) > 1 else None
    count = 0
    for char in CHARS:
        for expr in EXPRS:
            path = SPRITES / char / f"{expr}.webp"
            if not path.exists():
                print("skip missing", path)
                continue
            if targets and str(path) not in targets and char not in targets:
                continue
            process(path)
            count += 1
    print(f"Done: {count} sprites")


if __name__ == "__main__":
    main()
