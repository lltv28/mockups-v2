# Default Slide One Design

## Goal

Open the deck on slide 1 when the URL does not specify a slide.

## Selected approach

Change the startup fallback from `17` to `1`. Keep the existing `?slide=N` deep-link behavior and the existing navigation logic that writes the active slide number back to the URL.

This is preferable to removing URL parameters entirely because presenters still need shareable slide links. It is also preferable to remembering the last slide in browser storage because the requested behavior is a predictable first-slide default, not session restoration.

## Behavior

- Opening `deck.html` without a `slide` parameter starts on slide 1.
- Opening `deck.html?slide=17` continues to start on slide 17.
- Navigating between slides continues to update `?slide=N` in the address bar.
- Existing invalid-value handling remains unchanged and returns to slide 1.

## Scope

- Modify only the startup fallback in `slides/deck.html`.
- Add a regression assertion to the current-deck narrative test.
- Do not change slide content, order, styling, counter behavior, navigation, or archived decks.

## Validation

- Prove the regression assertion fails while the fallback is still `17`.
- Change the fallback to `1` and prove the focused test passes.
- Run the complete slide test suite and compare any failure with the documented archived-July checksum baseline.
