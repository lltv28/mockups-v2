# AI Sales Cash Runway Slide Design

## Purpose

Add one self-contained animated comparison slide to `slides/deck.html` immediately after the current client-wall slide. The new slide becomes visible slide 3 and moves the current slide 3 and every later slide forward by one.

The slide's communication job is:

> By the end of the slide, a high-ticket expert should understand that traditional paid marketing puts working capital at risk while a self-funding AI sales system protects the cash baseline and turns high-ticket sales into upside.

This change is limited to the new slide and the minimum deck plumbing and tests needed to support it. It does not include unrelated fixes to the existing deck.

## Source Material

The content and chart geometry come from `lltv28/ai-sales-cash-runway` at commit `bef8ca23e656ab296aec795818ca2fe4fe6f7bd3`.

Preserve these illustrative assumptions:

- 24-week illustration
- $30,000 starting cash balance
- $2,000 weekly media spend
- Four $10,000 high-ticket sales
- The existing accuracy disclaimer explaining the illustrative cash balance and 1x ROAS scope

The implementation must copy the required SVG markup and animation behavior into `slides/deck.html`. It must not depend on an iframe, GitHub Pages, JavaScript from the source repository, or any other external runtime asset.

## Narrative Placement

The opening sequence becomes:

1. Kodara opening promise
2. Client proof wall
3. AI sales cash-runway comparison
4. Five-minute lead-response problem
5. Self-funding flywheel
6. Remaining deck sequence

This placement uses social proof to earn attention, then makes the cash-flow problem tangible before the deck explains the operational lead-response problem and the Kodara mechanism.

## Slide Content

### Framing

- Eyebrow: `The cash-flow problem`
- Headline: `Stop betting your cash on the next big sale.`
- Context line: `24-week illustration · $30K start · $2K/week media · four $10K high-ticket sales`

### Comparison

The main composition is a flat two-column comparison with a subtle vertical separation rather than two heavy dashboard cards.

Left chart:

- Title: `Traditional marketing`
- Subtitle: `Spend. Wait. Hope.`
- A muted red sawtooth cash line shows weekly spend and irregular sale spikes.
- A restrained red risk fill shows the cash consumed below the starting baseline.
- Closing label: `Volatile. Capital-dependent.`

Right chart:

- Title: `Self-funding AI sales`
- Subtitle: `Recover. Qualify. Grow.`
- A Kodara-green staircase holds the starting baseline and steps upward at the same four sales.
- A pale brand-green fill shows retained upside above the baseline.
- Closing label: `Stable baseline. Compounding upside.`

Closing takeaway:

`Protect the baseline. Let every high-ticket sale raise the floor.`

The accuracy disclaimer remains visible at the bottom in subdued small text. It is audience-facing legal/financial context, not a presenter note.

## Visual System

The slide must use the existing deck tokens rather than the source demo's standalone styling:

- Instrument Serif for the main headline
- Instrument Sans for labels, chart titles, axes, annotations, and disclaimer
- `--brand-950` for the self-funding line and key positive labels
- `--brand-50` or `--brand-100` for retained-upside fill
- Existing alpha neutrals for axes, baselines, secondary copy, and dividers
- A restrained red reserved only for the traditional cash drawdown and its closing label
- Existing `--shadow-card` only where a subtle lift is necessary; the composition should remain primarily flat
- Existing spacing, rounded-corner, and background-orb conventions from the opening section

The slide receives a scoped class, `slide--cash-runway`, so fit and responsive rules do not affect other slides. At desktop sizes it should use a lower scoped zoom than the deck's global `1.5` when necessary to remain fully visible at 1280x720.

## Component Boundaries

The implementation has four bounded pieces:

1. **Slide markup**: heading, context, two accessible SVG charts, closing takeaway, and disclaimer.
2. **Scoped CSS**: layout, chart typography and colors, responsive behavior, and animation keyframes under the `cash-runway-*` namespace.
3. **Slide lifecycle**: animations are driven by the existing `.slide.active` state so no new global controller is required.
4. **Regression test**: a focused test reads the current `deck.html` and verifies placement, content, accessibility markers, and self-contained implementation.

No source-demo HTML or CSS should be copied wholesale. Only the SVG paths, markers, and content required for this slide should be brought across.

## Animation

The animation should complete in about five seconds:

- The traditional line draws segment by segment over roughly 2.6 seconds.
- The self-funding staircase begins shortly after the comparison is established and completes by roughly 4.5 seconds.
- Closing labels fade in at the end.

Animations are attached to `.slide--cash-runway.active`, so removing and restoring the existing `active` class restarts them when the presenter revisits the slide. The base SVG state remains fully drawn, which preserves the chart if CSS animation is unavailable.

For thumbnail clones:

- Paths render fully drawn.
- Closing labels render visible.
- Animations are disabled.

For `prefers-reduced-motion: reduce`:

- All paths render fully drawn immediately.
- Closing labels are visible immediately.
- No timed animation runs.

## Responsive Behavior

- Desktop: two charts sit side by side and share a baseline.
- Narrow tablet and mobile: charts stack vertically, preserve readable SVG proportions, and the slide allows vertical scrolling.
- The slide must not introduce horizontal scrolling.
- Headline and context copy may wrap naturally, but chart labels must remain legible and must not collide with paths or markers.
- The scoped layout must fit without clipping at 1920x1080, 1280x720, 900x600, and 390x844.

## Accessibility

- The slide uses `role="group"`, `aria-roledescription="slide"`, and `aria-labelledby` consistent with the opening slides.
- Each SVG uses `role="img"` and includes a unique `<title>` and `<desc>`.
- The SVG descriptions explain the trend and meaning rather than enumerating every point.
- Color is not the only differentiator: the charts use different line shapes, titles, subtitles, and closing labels.
- Decorative background elements remain hidden from assistive technology.

## Failure and Degradation Behavior

- No network request is required for the chart.
- If animation does not run, the base paths and labels remain visible.
- If JavaScript is disabled, the static markup still communicates the full comparison.
- Thumbnail cloning must not create duplicate IDs; SVG title and description IDs are unnecessary because each SVG can use its own child `<title>` and `<desc>`.

## Verification

Automated checks must verify:

- The new slide exists once in current `deck.html`.
- It appears directly after `#client-wall-slide` and before `#real-problem-slide`.
- The deck has 25 visible slides after runtime ordering.
- Required copy, assumptions, takeaway, and disclaimer are present.
- Both SVGs contain accessible titles and descriptions.
- The new slide contains no iframe or external asset reference.
- Reduced-motion and thumbnail-static rules exist.

Browser verification must confirm:

- The slide is visible as slide 3 and the counter/progress reflect 25 slides.
- The animation plays on entry and restarts after navigating away and back.
- The thumbnail shows completed chart lines rather than blank graphs.
- No clipping, overlap, or horizontal overflow occurs at 1920x1080, 1280x720, 900x600, and 390x844.
- The slide remains readable with reduced motion enabled.

