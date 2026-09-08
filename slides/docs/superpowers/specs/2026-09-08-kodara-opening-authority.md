# Kodara Webinar Opening and Authority Sequence

## Problem Statement

The webinar reaches its angle lesson before viewers receive a clear agenda, Lucas's full reason for building Kodara, or early proof that Kodara has already helped experts move their knowledge online. The existing founder and client-proof material appears too late, and the current opening spends several slides revisiting familiar online-business models before establishing why the presenter and company should be trusted.

## Solution

Rebuild the first nine slides around one sequence: the AI Version Of You big idea, visible online health and wellness demand, the need for the right vehicle, the webinar agenda, Lucas's credentials, the personal catalyst, the origin of Kodara, one client-proof montage, and a decision bridge into the existing angle and keyword training. Move and repurpose existing slides instead of increasing the 50-slide count. Remove the later repeated founder and Sandra proof moments.

## User Stories

1. As a health and wellness expert, I want the big idea first, so I immediately understand what the webinar is about.
2. As a webinar viewer, I want to see that health and wellness interest is moving online, so the opportunity feels relevant before the mechanism is explained.
3. As an expert who has considered courses or coaching, I want the webinar to acknowledge the work those models require, so the new vehicle addresses my real concern.
4. As a webinar viewer, I want a concise agenda, so I know what I will learn and when Kodara will be explained.
5. As a prospective client, I want to know Lucas's relevant track record, so I can judge whether his demand and positioning lesson is credible.
6. As a prospective client, I want to understand why health and wellness became personal to Lucas, so Kodara's origin has a clear human reason.
7. As a prospective client, I want to understand the connection between a virtual wellness program and Kodara, so the company does not appear to be an arbitrary AI offer.
8. As a prospective client, I want to see three named examples from the Kodara landing page, so I can evaluate the kinds of changes clients describe.
9. As a viewer, I want to decide whether this business direction fits me before hearing the detailed process, so the training helps me make a real decision.
10. As a presenter, I want the opening to remain visually readable while I am on camera, so the slides support rather than duplicate my spoken delivery.
11. As a presenter, I want the existing controls, presenter view, and 16:9 scaling to keep working, so the narrative change does not disrupt delivery.

## Implementation Decisions

- Keep the current 1920 by 1080 stage, Kodara wordmark, typography, color tokens, controls, selector, presenter view, and 50-slide total.
- Preserve existing slide IDs where possible and reorder the existing slide elements rather than introducing a new slide system.
- The first nine slides will be: title, online demand, right-vehicle problem, agenda, Lucas's credentials, Michelle's diagnosis, why Lucas built Kodara, client proof, and a direction-fit bridge.
- Move the existing illustrative demand chart to slide two. Keep the prominent teaching-only label and do not present its values as measured market demand.
- Collapse the prior course, coaching, group-program, and content-model opening into one right-vehicle slide. Emphasize that many viewers have not seen major success with these models or found that the model became a second business to run.
- The agenda will promise three outcomes: decide whether taking expertise online is the right direction, learn how to find an angle people already search for, and see how that angle can become an AI product without creating an entire second business.
- The agenda will state that the final section shows how Kodara can build and launch the entire system for the viewer.
- The credentials slide will identify Lucas Tyson as founder and CEO of Kodara and state the two user-approved claims: an online marketing agency built to more than $50 million by age 25, and more than 100,000 leads and appointments generated, including for health and wellness businesses.
- The personal slide will contain only the title and the statement that Michelle was diagnosed with Graves Disease. It will not use a photo, describe the healthcare system as broken, or add presenter notes.
- The Kodara-origin slide will connect Lucas's discovery of an at-home virtual wellness program to his decision to focus the business on health and wellness and build the Kodara team.
- The proof slide will appear only in the opening. Use the landing page's approved identities and local images for Dr. Mike of Power-Up Sports Psychology, Martyn Buffler of The Cancer Battle Plan, and Leanne Ellington, neuroscience educator.
- Give the three clients equal editorial weight. Use one narrowly phrased change from the landing page for each person and include an individual-results disclosure.
- Remove Sandra Parker's later video proof from the deck instead of repeating client proof later. Retain its local media files but do not load or display them.
- Begin the existing angle and keyword lesson immediately after the direction-fit bridge, starting with the two problems the business must solve.
- Apply Lucas's spoken sales voice to new visible copy. Keep language direct and causal, avoid invented proof, and use no em dashes.

## Testing Decisions

- Use the rendered webinar HTML as the public seam, matching the existing deck tests.
- Update the webinar contract test first so it requires the new opening order, agenda, credentials, Michelle line, Kodara origin, three client identities and outcomes, proof disclosure, and transition into the existing lesson.
- Assert that the Sandra video proof no longer appears in the audience deck and that no duplicate client-proof slide remains later.
- Preserve tests for the 50-slide count, accessible slide labels, 1920 by 1080 scaling, selector behavior, keyboard navigation, presenter synchronization, and claim guardrails.
- Run the focused webinar and presenter tests, the full slide test set, and a browser check of the first ten slides at the authored 16:9 size.

## Out of Scope

- Changing the offer, guarantee, qualification flow, pricing, or closing CTA.
- Adding new market statistics or treating the illustrative demand chart as measured data.
- Adding Michelle's detailed story to the visible slide or presenter notes.
- Adding the broader VSL claims about total clients, HIPAA compliance, typical earnings, or guaranteed results.
- Rebuilding the deck in a new framework or adding dependencies.

## Further Notes

The health VSL supplies the founder chronology and previously used credentials. The Kodara landing page supplies the three client identities, roles, images, and narrowly scoped outcome language. These sources guide the narrative but do not independently substantiate claims beyond the user's approval.
