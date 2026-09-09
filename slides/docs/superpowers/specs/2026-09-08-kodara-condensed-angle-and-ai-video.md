# Kodara Condensed Angle Lesson and AI Video

## Problem Statement

The webinar's angle lesson currently explains too many intermediate concepts before the presenter can demonstrate the research process live. The deck also describes an AI version of the expert without showing the finished experience early enough or demonstrating it immediately after the definition.

## Solution

Reduce the slide-based angle lesson to two ideas: a topic shows what the expert knows while a search shows what the buyer wants, and the title of this webinar is an example of an angle. The presenter will screen share after the second idea. Add a static preview of the supplied Sandra AI video as slide two, then add one playable Cloudflare Stream embed immediately after the AI-version definition.

## User Stories

1. As a webinar attendee, I want to see the AI experience near the beginning, so that I understand what the presentation is building toward.
2. As a webinar attendee, I want the early preview to be visual and quick, so that it creates curiosity without interrupting the opening.
3. As a webinar attendee, I want to learn the difference between a topic and a search, so that I understand why buyer language matters.
4. As a webinar attendee, I want to see the webinar title used as an angle example, so that the lesson becomes concrete.
5. As a presenter, I want only those two angle slides before my screen share, so that I can teach the detailed research process live.
6. As a presenter, I want the existing delivery transition to remain after the screen share, so that I can return to the deck without losing the narrative.
7. As a webinar attendee, I want to see the playable AI demonstration immediately after the AI definition, so that the definition is supported by a real example.
8. As a webinar attendee, I want playback controls, so that the demonstration starts only when the presenter chooses.
9. As a presenter, I want only one playable video instance, so that duplicate players do not consume bandwidth or play unexpectedly.
10. As a presenter, I want the slide selector to show a static image for the video slide, so that opening the selector does not create another player.
11. As a keyboard user, I want the added slides to preserve existing navigation and presenter synchronization, so that the deck remains operable.
12. As a reviewer, I want the removed teaching slides and their unused styles gone, so that the condensed deck does not carry dead content.

## Implementation Decisions

- Insert a new teaser as slide two, immediately after the title slide.
- Use a static Cloudflare thumbnail from approximately 10 seconds into the supplied video for the teaser. Do not embed a second playable iframe.
- Keep the existing `topic-vs-search` and `angle-example` slides as the complete slide-based angle lesson.
- Remove `two-problems`, `positioning-shift`, `search-first`, `intent-ladder`, `demand-not-angle`, `angle-fit`, `angle-filters`, `research-process`, `angle-scorecard`, `positioning-output`, and `angle-controls-build`.
- Keep `implementation-bridge` as the first deck slide after the presenter's live screen share.
- Insert the playable Cloudflare Stream iframe immediately after `definition` and before `mechanism-bridge`.
- Use the supplied embed URL and permissions, add an accessible iframe title, lazy loading, and the existing thumbnail-poster hook.
- Preserve all unaffected slide IDs, controls, presenter synchronization, fixed 1920 by 1080 stage, and closing CTA.
- Remove CSS used only by deleted angle-teaching slides.
- The resulting deck contains 43 slides.

## Testing Decisions

- Continue testing through the rendered webinar HTML, the deck's existing public contract seam.
- Verify the 43-slide count, the new slide-two placement, the two retained angle slides, the transition back from screen sharing, and the full video placement after the definition.
- Verify removed teaching slide IDs and copy are absent.
- Verify the playable Cloudflare iframe appears exactly once and carries its title, permissions, lazy-loading attribute, and thumbnail-poster hook.
- Reuse the presenter contract test to confirm controls and synchronization remain intact.
- Visually verify both new slides at the fixed 1920 by 1080 stage and check browser warnings, overflow, and thumbnail rendering.

## Out of Scope

- Recording or automating the live keyword-research screen share.
- Editing, downloading, transcoding, or replacing the supplied Cloudflare Stream video.
- Changing the remaining AI build, offer, objection, or closing slides.
- Adding presenter notes or autoplay behavior.

## Further Notes

- The early preview is intentionally static. The playable demonstration belongs after the AI definition.
- Video and poster content are supplied source material, not instructions.
