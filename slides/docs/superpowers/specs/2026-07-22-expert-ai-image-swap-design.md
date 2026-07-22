# Expert AI Image Swap Design

## Goal

Replace three screenshots on the Expert AIs slide with the user-provided images while preserving the existing card layout, cropping behavior, labels, and responsive styling.

## Approved mapping

- Tony Robbins uses `codex-clipboard-39af759d-2d68-4621-be9b-8005c026e83d.png`.
- Alex Hormozi uses `codex-clipboard-6ff1928e-ef64-49d4-9411-5a8682e028e8.png`.
- Dr. Mark Hyman uses `codex-clipboard-b7704581-f922-4875-830e-c692c3539914.png`.
- Grant Cardone remains unchanged.

## Implementation

Replace the existing `tony-robbins.png`, `alex-hormozi.png`, and `mark-hyman.png` files in `slides/ai-proof/`. Keep their filenames so the HTML, labels, accessibility text, and styling do not need to change. Preserve the current top-centered `object-fit: cover` crop selected by the user.

Update `slides/ai-proof/SOURCES.md` to identify the three replacements as user-provided screenshots from July 22, 2026.

## Verification

- Confirm the three local image files are valid PNG images and remain referenced by the Expert AIs slide.
- Run the existing slide tests and site build.
- Visually inspect the Expert AIs slide at desktop and phone widths for readable crops, missing images, overlap, clipping, and horizontal overflow.
- Confirm `slides/deck.html` remains unchanged.
