"""Draw assets/icon-180.png: the turn rail on the left of the message column.

The artwork is authored in the same 64-unit grid as icon.svg and scaled to the
full canvas, so the two icons stay visually identical.
"""
from pathlib import Path

from PIL import Image, ImageDraw

DESIGN = 64          # coordinate space shared with icon.svg
CANVAS = 180         # output size in pixels
SUPERSAMPLE = 4      # draw large, downscale for clean edges
UNIT = CANVAS * SUPERSAMPLE / DESIGN

OUT = Path(__file__).resolve().parent.parent / "assets" / "icon-180.png"

BLUE = (36, 123, 191, 255)
BAR_STRONG = (143, 180, 210, 255)
BAR_SOFT = (183, 201, 217, 255)

image = Image.new("RGBA", (CANVAS * SUPERSAMPLE, CANVAS * SUPERSAMPLE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)


def rect(x, y, width, height, radius, fill):
    draw.rounded_rectangle(
        [x * UNIT, y * UNIT, (x + width) * UNIT, (y + height) * UNIT],
        radius=radius * UNIT,
        fill=fill,
    )


# The rail: one track plus three ticks, on the outer (left) edge.
rect(9, 12, 3, 40, 1.5, BLUE)
for top in (17, 30, 43):
    rect(6, top, 9, 4, 2, BLUE)

# The conversation column to its right: the turn the reader is on, then two more.
rect(24, 14, 32, 6, 3, BAR_STRONG)
rect(24, 28, 26, 6, 3, BAR_SOFT)
rect(24, 42, 30, 6, 3, BAR_SOFT)

icon = image.resize((CANVAS, CANVAS), Image.LANCZOS)
OUT.parent.mkdir(parents=True, exist_ok=True)
icon.save(OUT, format="PNG", optimize=True)
print(f"{OUT} {icon.size} {OUT.stat().st_size} bytes")
