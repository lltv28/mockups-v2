# Kodara: one business idea throughout the webinar

Status: implemented and verified locally. Not deployed.

## Problem

The deck alternates between an AI version, product, path, and system. The user approved five changes that consistently frame the business as a “telehealth AI clinic,” delivering education, guidance, and programs.

## Approved solution

1. Lead with scaling a health and wellness business with AI; introduce the clinic and its marketing, sales, and program roles on the title slide.
2. Frame the early Sandra preview as one part of the business, reserving the explanation of the connected roles for later.
3. Make the agenda describe health searches, an online offer, and AI marketing, sales, and delivery.
4. After marketing and the calendar bottleneck, compare an in-person clinic with the online model. Reveal the in-person journey, the AI journey, then the growth comparison. Follow with the three AI roles and Sandra demonstration.
5. Name the same clinic in the offer and order the existing two-column inclusion list around acquisition/enrollment and expertise/delivery.

## Implementation decisions

- Use the existing local Markdown brief convention and current HTML deck.
- Use native emojis for the comparison, matching the latest visual direction.
- Implement the reveal as three normal consecutive slides, replacing the old definition slide. The deck grows from 22 to 24 slides. No new navigation or presenter state.
- Keep existing stable IDs for unchanged subjects; use new IDs for the comparison frames.
- Align the speaker script with all 24 slides, including the marketing-to-clinic transition. Retain supplied story facts; do not invent results or offer terms.
- Use the business name in the offer and CTA; clarify the pricing heading without changing either price or ownership wording.

## Verification

- Update and run the existing webinar and presenter contracts.
- Inspect revised copy and all comparison frames at 1920 by 1080; check bounds, sequence, thumbnails, and presenter navigation.
- Run the tracked slide test suite; identify unrelated baseline failures separately.

## Scope boundaries

This implements the five changes in the latest approved plan, not every recommendation in the earlier 22-slide audit. Proof assets, the illustrative chart, the Gallup slide, and commercial terms beyond the confirmed prices remain unchanged. Deployment is not requested by this turn. Browser-saved private notes are not overwritten.

## Verification results

- Both focused webinar and presenter contracts pass.
- Tracked slide suite: 70 passed, with the same three unrelated baseline failures documented by the previous revision.
- Inspected the title, early preview, agenda, three comparison frames, role slide, offer, and CTA at presentation size. Revised content remains within the stage.
- Confirmed in-person-only frame, AI reveal, and growth reveal in the browser. Presenter Next advanced frame 17 to 18; audience Right advanced to 19. Selector lists all 24 slides and navigates correctly.
- Speaker script contains exactly 24 numbered slide sections. Browser-saved notes were not changed.
- Standards review found no actionable issues. Spec review's stale handoff pointer was fixed; reveal-state verification was completed in the browser instead of adding CSS-mirroring source assertions.
- The existing Cloudflare Sandra iframe remained blank in the local browser preview; playback could not be verified. Its source URL and player settings are unchanged. Recheck playback in the rehearsal environment.
