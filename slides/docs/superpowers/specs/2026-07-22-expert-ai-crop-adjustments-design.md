# Expert AI Crop Adjustments Design

## Goal

Restore the Dr. Mark Hyman card to its original deck image and make the ACQ AI screenshot appear approximately 30% closer while remaining pinned to the top of its card.

## Approved changes

- Restore `slides/ai-proof/mark-hyman.png` from the version immediately before commit `b768920`.
- Add a version query to the Mark Hyman image reference so open browsers do not reuse the replacement screenshot from cache.
- Keep the Alex Hormozi source PNG unchanged.
- Add a clipped media frame around only the ACQ AI image.
- Scale the ACQ AI image to `1.3` inside that frame with a top-center transform origin.
- Leave Tony Robbins, Grant Cardone, all card copy, and all other slide styling unchanged.

## Responsive behavior

The ACQ media frame will match the existing image height at each breakpoint: 112 pixels on desktop and 140 pixels at 900 pixels wide or below. The frame will hide the enlarged edges so the image cannot overlap card copy or neighboring cards.

## Source notes

Update `slides/ai-proof/SOURCES.md` so Mark Hyman again references the original official product-page image. Keep Tony Robbins and Alex Hormozi recorded as user-provided screenshots.

## Verification

- Add a regression test for the restored Mark Hyman file and the ACQ-only 130% top-pinned zoom.
- Verify the new test fails before implementation and passes afterward.
- Run all slide tests and the site build.
- Visually inspect the Expert AIs slide at desktop and phone widths.
- Confirm `slides/deck.html` remains unchanged.
