# Connected Launch Step Cards

## Scope

Refine the process flowcharts on slides 14 and 15 in `slides/deck-july-2026.html`. The three deliverable cards above each flowchart stay unchanged. The original `slides/deck.html` stays unchanged.

## Desktop design

- Present the four process steps as four separate, equal-width cards.
- Give every step the same existing light-green background and white text.
- Remove the darker background treatment from Step 4.
- Use small gaps between cards so the four stages are visually distinct.
- Place a white arrow in each gap to show the connection from one step to the next.
- Keep the existing step number, descriptive title, and action title content.
- Increase the serif action titles, such as Create, Publish, Engage, and Convert, from 13px to 18px.
- Add wider letter spacing to the serif action titles for readability.

## Mobile design

- Stack the four cards vertically at the existing responsive breakpoint.
- Keep every card the same light-green background.
- Rotate the connecting arrows downward between cards.
- Preserve the larger action-title typography without horizontal overflow.

## Accessibility and behavior

- Keep each process as an ordered list.
- Keep arrows decorative with `aria-hidden="true"`.
- Preserve keyboard navigation and existing responsive slide scrolling.

## Verification

- Automated checks confirm four matching step cards and three connectors on both slides.
- Automated checks confirm there is no special Step 4 background.
- Automated checks confirm 18px action titles with increased letter spacing.
- Desktop and phone-size previews confirm the cards remain readable and contained.
