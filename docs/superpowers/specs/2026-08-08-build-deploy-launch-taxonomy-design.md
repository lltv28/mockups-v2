# Build, Deploy, Launch Taxonomy Design

## Objective

Make the deck's three program phases read consistently as `Build → Deploy → Launch` everywhere phase taxonomy appears.

## Audience Outcome

By the end of the program sequence, prospective buyers should understand the delivery path as three distinct stages: Kodara builds the AI system, deploys the buyer-routing and offer machinery, then launches ongoing organic and paid acquisition.

## Approved Renames

- Phase 1 remains `Build`.
- Phase 2 changes from `Sell` to `Deploy`.
- Phase 3 changes from `Grow` to `Launch`.

## Deck Scope

Update phase naming in all of the following places:

- The three-phase overview title and three phase-column labels.
- The Phase 2 cover heading and any Phase 2 label that currently uses `Sell` as the phase name.
- The Phase 3 cover heading and every Phase 3 label that currently uses `Grow` as the phase name.
- The three-phase offer recap title and phase-card labels.
- Structural HTML comments and test section markers that identify Phase 2 or Phase 3 by the old names.
- Regression tests that describe or assert the program taxonomy.

## Guardrails

- Preserve ordinary uses of `sell`, `selling`, `grow`, `growth`, and `launch` when they describe an action, outcome, product capability, or marketing operation rather than a phase name.
- Preserve the existing phase descriptions, duration labels, slide order, navigation, IDs, layouts, and visual styling.
- Preserve established phrases such as `Paid Ads Launch`, `We run the entire launch`, and `We keep improving the launch` when they are operational copy rather than phase labels.
- Do not rename CSS classes or JavaScript identifiers whose `launch` wording describes the existing launch-proof component family.

## Verification

- Add a focused regression that asserts the overview, covers, Phase 2 and Phase 3 detail labels, and recap all use `Build → Deploy → Launch` in order.
- Assert that `Phase 2 · Sell`, Phase 2 cover `Sell`, `Phase 3 · Grow`, Phase 3 cover `Grow`, and `Build, sell, then grow.` no longer exist as phase taxonomy.
- Run the full slide test suite and report the existing archived-July checksum exception separately if unchanged.
- Render the overview, both phase covers, both affected detail groups, and recap at desktop and mobile sizes to confirm the longer `Deploy` and `Launch` labels fit without wrapping or overflow.
