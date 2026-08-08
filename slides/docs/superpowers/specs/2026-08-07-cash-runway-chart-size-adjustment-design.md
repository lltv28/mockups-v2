# Cash Runway Chart Size Adjustment

## Goal

Increase both cash-runway chart panels on visible slide 3 by 15% so the comparison is easier to read, without enlarging the headline, takeaway, or disclaimer.

## Approved approach

Expand the two-column `.cash-runway-grid` to 115% of its current rendered width and keep it centered within the slide. Raise its desktop maximum width from 1080px to 1242px, which is exactly 15% larger. Recover the required width from the slide's unused horizontal margins rather than scaling or cropping either SVG.

Above 900px, both panels, their SVGs, and their labels grow together by the full 15% because the existing SVGs remain `width: 100%` with unchanged `viewBox` geometry. The divider and inter-panel gap remain centered and visually balanced.

From 701px through 900px, cap the grid at the slide edges by recovering the existing 28px horizontal padding on each side. At 900×600 this produces an approximately 7% panel increase, the largest safe two-column treatment without clipping.

At 700px and below, retain the current stacked, 100%-wide layout. Mobile already uses the available safe width, so applying another 15% there would recreate horizontal overflow.

## Constraints

- Preserve the original chart geometry, assumptions, copy, colors, animation, and accessible SVG structure.
- Keep all new sizing rules scoped to `.slide--cash-runway`.
- Do not change other slides or archived decks.
- Do not introduce horizontal scrolling or label/path/marker collisions.
- Keep thumbnail and reduced-motion behavior unchanged.

## Verification

- Add a focused regression assertion for the 115% wide-desktop grid width, 1242px maximum, centered positioning, edge-to-edge tablet cap, and 100% mobile reset.
- Run the focused cash-runway test and the full slide suite.
- Render slide 3 at 1920×1080, 1280×720, 900×600, and 390×844.
- At 1920×1080 and 1280×720, confirm the chart panels are approximately 15% larger than the current baseline.
- At 900×600, confirm the chart grid is edge-to-edge, the panels are approximately 7% larger, and no content clips.
- At 390×844, confirm the charts remain stacked at the existing width with no horizontal overflow.
- Confirm labels remain legible and do not collide with paths or sale markers.
