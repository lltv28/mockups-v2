# Cash Runway Transaction Ledgers

## Goal

Add a statement-like transaction ledger beneath each graph on the “Stop betting your cash on the next big sale.” slide. The ledgers must make the cash-flow difference immediately concrete while remaining consistent with the slide’s existing illustrative scenario and the deck’s design system.

By the end of the slide, prospective clients should understand that the same $2,000 weekly media spend consumes cash in the traditional model but is recovered by front-end revenue in the self-funding model, leaving high-ticket sales as retained upside.

## Approved Approach

Attach one compact ledger to the bottom of each existing graph panel. Each graph and ledger form a single visual story. The comparison remains two-column on desktop and stacks as paired graph-plus-ledger panels on mobile.

The ledgers will be native HTML and CSS rather than an embedded screenshot. They will reuse the deck’s typography, colors, spacing, borders, and responsive patterns.

## Ledger Content

Each ledger represents one illustrative week and uses the user-confirmed Facebook Ads billing interval of $500 per charge.

### Traditional marketing

| Transaction | Amount |
| --- | ---: |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Front-end sales | — |
| **Weekly cash movement** | **−$2,000** |

### Self-funding AI sales

| Transaction | Amount |
| --- | ---: |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Facebook Ads | −$500 |
| Front-end sales | +$2,000 |
| **Weekly cash movement** | **$0** |

The existing graphs continue to carry the +$10,000 high-ticket sale events. The ledgers do not duplicate those events because their job is to explain the recurring weekly cash mechanism.

## Visual Design

- Slightly shorten the displayed graph area to make room for the ledgers without increasing the desktop slide height.
- Place each ledger inside its existing comparison panel directly beneath the matching graph.
- Use thin neutral separators and a quiet panel boundary so the treatment reads as a financial statement, not an interactive dashboard.
- Render Facebook Ads charges in the existing muted loss red.
- Render recovered front-end revenue and the self-funding result in the existing deep brand green.
- Keep the traditional zero-recovery row neutral and de-emphasized.
- Make the weekly cash movement footer the strongest line in each ledger.
- Keep both ledgers the same height and use identical row geometry so the amounts compare horizontally.
- Use simple native inline SVG transaction marks or restrained typographic symbols only if they improve scanning; do not introduce external logos or image dependencies.

## Responsive Behavior

- Desktop and tablet: retain the two-column comparison and keep both ledgers aligned beneath their charts.
- Mobile: retain the existing single-column stack, with each graph immediately followed by its own ledger.
- Preserve the slide’s existing vertical scrolling behavior on small screens.
- Prevent horizontal overflow at all tested widths.
- Keep ledger labels and amounts comfortably legible on mobile; shorten labels before shrinking type below the slide’s established mobile minimum.

## Motion and Accessibility

- Preserve the existing graph-drawing animation and reduced-motion behavior.
- The ledgers may reveal with the existing slide reveal cadence but must remain static in thumbnails and reduced-motion mode.
- Use semantic table or ledger markup with accessible labels.
- Maintain the slide’s existing `role`, title association, and keyboard navigation behavior.

## Verification

- Add focused regression coverage for both ledger structures, the four $500 charges on each side, the front-end recovery amounts, weekly cash movement totals, and slide-scoped styling.
- Verify the existing cash-runway tests remain green.
- Render and inspect the slide at desktop, tablet, and mobile sizes.
- Check for text collisions, clipped rows, unexpected wrapping, horizontal overflow, and mismatched ledger heights.
- Verify keyboard navigation, thumbnail rendering, graph animation restart, and reduced-motion behavior.
- Run the full slide test suite and report any pre-existing exception separately.

## Out of Scope

- Changing the slide’s scenario, graph data, high-ticket sale timing, headline, or narrative position.
- Showing all 24 weeks of transactions.
- Adding live data, interactivity, external brand assets, or new dependencies.
- Altering other slides.
