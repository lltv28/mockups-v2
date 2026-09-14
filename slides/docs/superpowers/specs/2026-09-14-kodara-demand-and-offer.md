# Kodara webinar: broader growth, proof, demand, and ownership

## Problem

The early agenda narrows too quickly into angles. Proof needs more visual space, the keyword lesson should prepare and unpack a live tool demonstration, and the close needs a clear done-for-you offer and ownership comparison.

## Agreed scope

- Draft five broader three-point agendas. Use the growth-with-more-freedom option in the deck.
- Insert two large proof-image slides immediately after Lucas's introduction. Keep Michelle and her three image spaces afterward.
- Center Martyn's face in the existing circular testimonial portrait.
- Put the Gallup screenshot on the left and a second screenshot space on the right. Retain the survey limitation.
- Replace the three angle slides with demand signals, keyword mining, and organic versus paid acquisition. Conduct the external keyword-tool demonstration after the keyword-mining slide and before the acquisition slide.
- Show an AI marketer, AI salesperson, and AI program in a connected flow before the full Sandra video. Retain expert approval and human handoffs. This is an illustrative architecture, not a claim that all stages are shown in the video.
- Consolidate the four existing offer/fit slides into one two-column list of included work, using existing deliverables and the AI roles requested by the user.
- Follow the offer list with $8,000 per year versus a $15,000 one-time founding license. The user confirmed the latter means paying once and owning it forever. Omit bonuses for now.
- End with the existing booking CTA. Do not invent support terms, ad budgets, client outcomes, additional fees, or guarantees.

## Implementation and verification

Use the existing static HTML deck, proportional 1920 by 1080 stage, type tokens, local assets, and presenter controls. Preserve slide IDs where the subject remains the same; give the fully replaced keyword lesson new IDs. The final deck still has 22 slides because the longer offer sequence is condensed.

Update the existing source-contract test for the new order and approved copy. Verify layout and the image crop in a real browser, including the slide selector and presenter synchronization. Existing tests are static source checks, not browser behavior tests.

The new AI flow uses `ai-business-flow` so private notes for the retired four-job slide do not attach to it. Five agenda alternatives are saved in `/Users/lucas/Documents/Codex/2026-09-12/rev/outputs/kodara-agenda-options.md`. The selected option emphasizes opportunity, calendar capacity, and done-for-you implementation; the location-expansion and test-before-expanding approaches remain alternatives.

### Verification results

- Both focused webinar contract tests pass, including image-space structure, two-column offer, annual/one-time price labels, and slide order.
- Visually inspected the revised agenda, proof space, Martyn portrait, paired healthcare screenshots, all three demand slides, AI flow, offer checklist, and pricing at a 1920 by 1080 browser viewport.
- Checked content bounds across all 22 slides; no content exceeded its slide bounds.
- Opened the selector, selected the new AI flow, and closed it with Escape. Confirmed the sidebar remains open after selection and the URL updates.
- Opened the presenter page on the same local origin. Confirmed current/next previews and its Next button advancing the audience from slide 18 to slide 19. The P shortcut did not open a popup in the in-app test browser, so popup behavior remains a rehearsal check.
- Full tracked slide suite: 70 passed, 3 failed in unrelated health-deck and archived pitch-deck tests. Those tests and their source decks are unchanged by this revision.

## Remaining content

The user will supply the two founder proof images and the additional healthcare screenshot. Michelle's three image spaces remain unfilled. The user and sales manager will refine the keyword research segment. The long speaker transcript remains a separate, stale draft. Publication is not part of this revision request.
