# Standalone Launch Arrows

## Scope

Refine only the three connector arrows in each process flowchart on slides 14 and 15 of `slides/deck-july-2026.html`. Keep the four step cards and the original `slides/deck.html` unchanged.

## Design

- Remove the green circular background from every launch-flow connector.
- Remove the connector border radius because the arrows no longer use a shape.
- Display each connector as a standalone 18px arrow.
- Use the same green as the step cards for the arrow color.
- Preserve the existing space between the four step cards.
- Keep the arrows centered between cards on desktop.
- Keep the arrows rotated downward between stacked cards on mobile.

## Accessibility

- Keep each arrow marked `aria-hidden="true"` because it is decorative.
- Preserve the ordered-list structure and keyboard behavior.

## Verification

- Automated checks confirm the arrows have no background or border radius.
- Automated checks confirm the arrows use the brand green and an 18px size.
- Desktop and phone-size previews confirm the arrows remain centered and visible.
