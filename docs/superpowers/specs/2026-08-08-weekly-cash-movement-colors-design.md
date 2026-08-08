# Weekly Cash Movement Colors Design

## Scope

Update only the value cells in the `Weekly cash movement` footer rows on the cash-runway comparison slide. Keep all labels, transaction rows, chart data, slide order, and every other slide unchanged.

## Visual Treatment

- Traditional marketing: render the `−$2,000` weekly cash movement value in the deck's existing muted debit red (`#A7474B`).
- Self-funding AI sales: render the `$0` weekly cash movement value in the deck's existing brand green (`var(--brand-950)`).
- Keep both `Weekly cash movement` labels in the current dark neutral color.

## Implementation

Add explicit, slide-scoped footer value selectors in `slides/deck.html`. The selectors must override the shared footer neutral color without changing the appearance of any other ledger cell or slide.

## Verification

- Add a focused regression test that loads the rendered deck and confirms the two footer value cells resolve to their respective red and green colors while the labels remain neutral.
- Run the focused cash-runway test file.
- Run the complete slide test suite and report any pre-existing exception separately.
- Inspect the slide at desktop and mobile sizes for unchanged fit, wrapping, and overflow.

## Communication Job

By the end of the slide, prospective buyers should understand the cash-flow contrast immediately because the negative weekly movement is visually coded red and the protected break-even movement is visually coded green.
