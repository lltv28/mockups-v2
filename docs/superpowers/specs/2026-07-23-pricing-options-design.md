# Pricing Options Design

## Goal

Update the pricing section so the standard investment is $21,000 and buyers can compare three payment options.

## Investment Slide

- Present $21,000 as the standard investment.
- Keep the existing deliverables and six-month program framing.
- Update supporting pricing language so it does not imply that $18,000 is the standard price.

## Payment Options Slide

Change the heading to “Three ways to pay.”

Show three equal-width cards in this order:

1. Financing Partner
   - $21,000
   - No monthly estimate, term, or extra financing copy
2. 3-Pay
   - 3 × $7,000
3. Pay In Full
   - $18,000
   - Card or wire
   - Keep the “Best value” badge

## Visual Treatment

- Preserve the existing Kodara deck design system.
- Use equal-width cards for quick comparison.
- Keep Pay In Full visually emphasized as the best value.
- Maintain the existing mobile stacking behavior.

## Payment Card Refinement

- Remove “$21,000 total” from the 3-Pay card.
- Set all three payment cards to a 105px CSS height, which renders at about 158px under the deck’s 150% desktop scaling and is about 30% shorter than the current cards.
- Center each card’s content vertically and horizontally.
- Keep all three cards equal in height on desktop and mobile.
- Preserve the Best Value badge and one-card-per-row mobile layout.

## Verification

- Add automated checks for the new standard price and all three payment options.
- Confirm the old “Two ways to pay” and “$6,800 ×3” copy is removed.
- Confirm “$21,000 total” is removed.
- Confirm all three payment cards use the shared 105px centered layout.
- Run the complete slide test suite and production build.
