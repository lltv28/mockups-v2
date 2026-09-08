# Kodara Webinar Presenter View

## Problem Statement

The webinar host needs private production notes, slide context, timing, and navigation without exposing that information in the audience-facing deck.

## Solution

Add a separate presenter window that opens from the deck with the `P` key. The audience deck and presenter window stay synchronized through a same-origin browser channel. The presenter window shows the current slide, next slide, private notes, elapsed time, and navigation controls. Notes persist locally by stable slide ID.

## User Stories

1. As a presenter, I want to open presenter view from the audience deck, so that I can prepare without changing what the audience sees.
2. As a presenter, I want the presenter window to show the current slide, so that I can confirm what the audience sees.
3. As a presenter, I want to preview the next slide, so that I can transition smoothly.
4. As a presenter, I want private notes for each slide, so that I can retain prompts and production cues.
5. As a presenter, I want notes saved automatically by slide ID, so that they remain aligned after reopening the window.
6. As a presenter, I want elapsed time, so that I can manage webinar pacing.
7. As a presenter, I want previous and next controls, so that I can run the deck from the presenter window.
8. As a presenter, I want keyboard navigation outside the notes field, so that I can advance without reaching for the mouse.
9. As a presenter, I want the presenter window to recover after refresh, so that a temporary reload does not end the session.
10. As an audience member, I want slide previews and presenter controls excluded from the shared deck, so that the presentation stays clean.

## Implementation Decisions

- Use one separate presenter document rather than an overlay inside the audience deck.
- Open or focus the presenter window from the audience deck with the `P` key.
- Use the native `BroadcastChannel` API with a webinar-specific channel name. Add no dependency.
- Treat the audience deck as the source of truth for the current slide and slide metadata.
- Send navigation requests from presenter view to the audience deck, then let the audience deck publish the resulting state.
- Render current and next previews from the real deck in non-interactive preview mode.
- Hide audience navigation controls inside preview frames.
- Store notes in browser local storage with keys derived from stable slide IDs.
- Start the elapsed timer when presenter view loads.
- Keep the presenter interface dark and compact so it reads as production tooling rather than another audience slide.

## Testing Decisions

- Use the existing HTML contract tests as the public seam.
- Verify that the audience document exposes the presenter shortcut, same-origin channel, preview mode, and synchronized navigation contract.
- Verify that the presenter document contains current and next previews, persistent private notes, timer, and previous and next controls.
- Verify the complete interaction manually in the live browser because cross-window focus and rendering are browser behavior.

## Out of Scope

- Cloud-synced notes or collaboration between devices.
- A guarantee of privacy when the presenter shares the entire desktop rather than the audience window.
- Automatic generation of slide notes.
- Remote-control support from a phone or separate computer.
- Editing audience slide content from presenter view.

## Further Notes

Presenter notes remain private only when the audience sees the deck window or browser tab. Sharing the entire desktop can expose the presenter window.
