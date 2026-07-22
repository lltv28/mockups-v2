# Authority Proof Media Update

## Scope

Update only the first two proof-card media areas on the Authority Branding slide in `slides/deck-july-2026.html`.

## Approved design

- Replace the Personal branded website card image with the newest downloaded Cheryl Hunter website screenshot.
- Copy that screenshot into `slides/` so the deck remains portable and works offline.
- Replace the Done-for-you posting card image with the supplied Cloudflare Stream iframe.
- Keep the existing square media area, card titles, card descriptions, card widths, and Organic flow unchanged.
- Give the iframe an accessible title and allow autoplay, encrypted media, picture-in-picture, and fullscreen.

## Verification

- Automated checks confirm the local Cheryl Hunter image and Cloudflare Stream video ID are present in the correct cards.
- Automated checks confirm the previous `website-bonus.png` and `dfy-marketing.png` images are no longer used in those cards.
- The full slide test suite and production build must pass.
- The local preview must serve both updated media elements.
