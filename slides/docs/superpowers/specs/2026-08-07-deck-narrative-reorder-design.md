# Deck Narrative Reorder and Copy Refresh

## Goal

Tighten the presentation narrative by removing the speed-to-lead detour, making the opener explicitly self-funding, placing the cash comparison immediately after the self-funding flywheel, and clarifying launch ownership and delivery.

## Opening copy

Replace the opening headline with exactly:

> We turn your expertise into an AI Sales department that pays for its own leads

Keep “AI Sales department” in the existing brand-color span. Do not add a period. Preserve the existing opening layout, self-funding flywheel demo, accessibility label, and reveal animation.

## Remove the speed-to-lead slide

Delete `#real-problem-slide` from the current deck rather than hiding it. Also remove its dedicated `.problem-speed-*` and `.problem-banner` CSS rules and their responsive overrides when those rules have no remaining consumers.

The removed content includes the “8× higher conversion in 5 minutes” statistic, the “first five minutes” headline, supporting copy, and instant-answer banner.

## Early narrative order

The first six visible slides become:

1. Opening — new self-funding headline
2. Client wall — “Why our clients love the Kodara model.”
3. Existing AI build/knowledge slide (`#clients-love-slide`), with its current runtime-rendered content unchanged
4. Self-funding flywheel — “Each sale helps pay for the next conversation.”
5. Cash-runway comparison — “Stop betting your cash on the next big sale.”
6. Program overview — “Build your AI, start selling, then grow.”

Move the complete `#cash-runway-slide` block, including its comment marker and unchanged inline SVGs, directly after `#internal-proof-slide` and before `#program-overview-slide`. Preserve its chart geometry, sizing, animation, responsive behavior, copy, and accessibility structure.

The deck changes from 25 to 24 visible slides. Update the static counter denominator from 25 to 24; runtime numbering, progress, thumbnails, and URL navigation continue to derive from visible DOM order.

The current runtime contains `insertBefore(...)` calls that override source order. Remove the target-related calls that move the internal-proof, program-overview, clients-love, ad-loop-reinvestment, and ownership slides. Leave unrelated Build, Sell, and Grow reorders unchanged. Remove any constants that become unused. Navigation must initialize only after the approved early order and warranty-to-ownership adjacency are established.

## Warranty and ownership sequence

Keep `#ownership-slide` directly after `#double-guarantee-slide`; this is already the current source order. Do not change the warranty slide.

On `#ownership-slide`, replace exactly:

- “During the program” with “Months 1-6”
- “Weekly optimization” with “We run the entire launch”

Preserve the ownership headline, remaining timeline milestones, supporting descriptions, quote, styling, and layout.

## Testing and verification

- Add or update a current-deck narrative regression test that checks the exact opener copy, absence of the speed-to-lead slide and its dedicated selectors, 24 visible slides, the approved first-six order, absence of runtime moves that would override that order, cash-runway placement after the internal-proof slide, warranty-to-ownership adjacency, and the two ownership copy replacements.
- Update the cash-runway test boundary and order assertions so the moved block is sliced through the program-overview marker instead of the deleted speed-to-lead marker.
- Run the focused current-deck tests and the full slide suite. The documented pre-existing July archived-deck checksum mismatch may remain; do not modify archived decks or the checksum fixture.
- Render and inspect the opener, the early sequence, the moved cash-runway slide, the warranty slide, and the ownership slide at desktop and mobile widths.
- Verify the counter reads `01 / 24` on opening and the cash-runway slide appears as `05 / 24`.
- Confirm keyboard navigation, thumbnails, animation restart, mobile scrolling, and reduced-motion behavior continue to work after reordering.
