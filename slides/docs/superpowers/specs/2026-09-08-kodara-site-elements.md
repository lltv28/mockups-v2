# Kodara Website Elements in the Webinar

## Problem Statement

The webinar explains the Kodara model, but it does not yet use the strongest real assets already present on the Kodara Health website. The early teaching section needs a more concrete view of demand research, the mechanism needs a simple three-step overview before the detailed build sequence, the founder and client-proof slides need real media, and the close needs a direct route to the live qualification experience.

## Solution

Bring the highest-value website elements into the existing 50-slide deck without changing its central argument or importing unsupported claims. Keep the 1920 by 1080 stage, current visual language, presenter workflow, and slide count. Replace existing slide content rather than adding slides.

## User Stories

1. As a health and wellness expert, I want to see what demand research looks like, so I can understand how Kodara chooses an angle.
2. As a webinar viewer, I want the build summarized in three plain steps before the detailed process, so I can hold the mechanism in my head.
3. As a prospective client, I want to hear a real client describe her experience, so I can judge the model through specific evidence.
4. As a prospective client, I want to see the real founder and brand, so the presentation feels connected to the company I am evaluating.
5. As a qualified prospect, I want a clear live next step, so I can move from the webinar to the assessment without guessing where to go.

## Implementation Decisions

- Keep the Rule of One: Kodara turns an expert's knowledge into a searchable, approved AI-led business without asking the expert to build a second business.
- Add the real Kodara wordmark to the title and closing slides.
- Replace the founder headshot with the existing event photograph of Lucas speaking.
- Rework the current search-signals slide into a demand-research teaching visual. Use selected values from the website's illustrative search-estimate dataset only as an example, with a prominent label that the values are illustrative and must not be presented as measured demand.
- Retain the three practical search signals: outcome, explanation, and readiness.
- Replace the six-part overview slide with the website's three-step macro sequence: share what you know, review what we build, and launch and onboard users. Keep the six detailed process slides that follow.
- Replace the generic proof slide with Sandra Parker's website-approved story and a local excerpt from the published video that omits the ROAS and earnings statements. Attribute her words, label the story as client-acquisition evidence rather than proof of a Kodara AI build, and place an individual-results disclosure on the slide.
- Replace the final white close with a forest-green qualification slide linking directly to `https://kodarahealth.com/#kodara-triager`.
- Keep all customer-facing additions in the Lucas Writing voice: direct, specific, spoken, and free of invented proof.
- Do not import the website logo wall, aggregate proof-strip metrics, offer-price examples, or the 30-day refund promise. Those elements require substantiation or complete written terms before webinar use.

## Testing Decisions

- Use the rendered HTML deck as the public seam.
- Extend the existing webinar test first to require the wordmark, founder event image, illustrative demand label, three-step overview, local Sandra excerpt and disclosure, and live qualification link.
- Preserve the 50-slide count, accessibility labels, presenter synchronization, keyboard controls, fixed 16:9 scaling, and existing high-risk-claim exclusions.
- Verify the revised slides in the local browser at the 1920 by 1080 design size and in the presenter thumbnail flow.

## Out of Scope

- New proof claims, benchmark claims, endorsements, prices, guarantees, or typical-results representations.
- Changes to the offer, contract, triage widget, or Kodara Health website.
- Rebuilding the deck in a new framework or adding dependencies.

## Further Notes

The website's search-interest dataset identifies itself as illustrative design data. It is useful for teaching how an analysis looks, not as evidence that a topic has a measured level of demand.
