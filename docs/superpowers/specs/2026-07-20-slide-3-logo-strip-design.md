# Slide 3 Logo Strip Design

## Goal

Add the nine-company social-proof logo strip from `ai-growth-offer-embed.html` to slide 3, titled "Why our clients love the Kodara model."

## Approved layout

- Keep the existing title, four moving client rows, and three reason cards.
- Insert a compact, single-row logo band between the moving client rows and the reason cards.
- Use the caption: "We've built AI products used and loved by people at:"
- Include Mayo Clinic, ClickFunnels, Johns Hopkins University, HighLevel, Fidelity Investments, ServiceTitan, Tony Robbins, H&R Block, and Ramsey.
- Render every logo in muted grayscale so the strip supports the slide instead of competing with its main message.
- Tighten vertical gaps slightly so the new band fits without clipping or reducing readability.

## Implementation

Copy the existing embedded image data from `C:\Users\lucas\OneDrive\Documents\claude-code\ai-growth-offer-embed.html` into `slides/deck.html`. The logos remain self-contained inside the deck and require no network requests or new asset files.

Add slide-specific CSS classes for the band, caption, row, and logo sizing. Keep the CSS isolated from other slides. Advance the reason-card reveal delay by one step so the logo band appears first.

## Failure handling

Each embedded logo will include descriptive alternative text. Because the image data lives inside the HTML, the strip will still render when the deck is opened offline.

## Verification

- Open `slides/deck.html` and navigate to slide 3.
- Confirm all nine logos appear in one centered row at the normal 16:9 presentation size.
- Confirm the moving client rows and three reason cards remain visible and readable.
- Confirm the deck has no horizontal or vertical clipping.
- Confirm the browser console reports no new errors and the slide still works offline.
