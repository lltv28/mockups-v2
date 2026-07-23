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
   - ~$1,500/month
2. 3-Pay
   - 3 × $7,000
3. Pay In Full
   - $18,000
   - Card or wire

## Visual Treatment

- Preserve the existing Kodara deck design system.
- Use equal-width cards for quick comparison.
- Use the same white background, gray border, and shadow on all three cards.
- Maintain the existing mobile stacking behavior.

## Payment Card Refinement

- Remove “$21,000 total” from the 3-Pay card.
- Set all three payment cards to a 105px CSS height, which renders at about 158px under the deck’s 150% desktop scaling and is about 30% shorter than the current cards.
- Center each card’s content vertically and horizontally.
- Keep all three cards equal in height on desktop and mobile.
- Remove the Best Value badge.
- Keep “Pay In Full” and “$18,000” centered as one inline content group.
- Pin “~$1,500/month” near the bottom of the Financing Partner card so it does not affect the centered price group.
- Pin “Card or wire” near the bottom of the card so it does not affect the centered price group.
- Preserve the one-card-per-row mobile layout.

## Verification

- Add automated checks for the new standard price and all three payment options.
- Confirm the old “Two ways to pay” and “$6,800 ×3” copy is removed.
- Confirm “$21,000 total” is removed.
- Confirm all three payment cards use the shared 105px centered layout.
- Confirm all three cards use the same neutral styling.
- Confirm “~$1,500/month” is pinned near the bottom without shifting the centered financing price.
- Confirm “Card or wire” is pinned near the bottom without shifting the centered price.
- Run the complete slide test suite and production build.
