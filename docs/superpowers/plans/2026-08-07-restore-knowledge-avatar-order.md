# Restore Knowledge/Avatar Phase 1 Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the Knowledge/Avatar slide as the second content slide in Phase 1.

**Architecture:** Keep the deck's source order identical to its presentation order. Move the complete `#clients-love-slide` block from the opening narrative to immediately after `#lucas-onboarding-slide`, without adding runtime DOM reordering.

**Tech Stack:** Static HTML/CSS/JavaScript deck, Node.js built-in test runner.

## Global Constraints

- Preserve all Knowledge/Avatar slide content, styling, embedded media, and runtime behavior.
- Preserve the total visible slide count at 24.
- Preserve the approved Phase 1 sequence: cover, Lucas Onboarding, Knowledge/Avatar, remaining Phase 1 slides.
- Preserve the cash-runway slide immediately after the self-funding flywheel slide.
- Do not reintroduce `deckElement.insertBefore(clientsLoveSlide, lucasOnboardingSlide.nextElementSibling)`.

---

### Task 1: Lock the corrected narrative order with tests

**Files:**
- Modify: `slides/tests/deck-narrative-refresh.test.mjs`
- Modify: `slides/tests/deck-cash-runway.test.mjs`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

**Interfaces:**
- Consumes: slide IDs parsed from `slides/deck.html` by existing test helpers.
- Produces: an explicit source-order contract for the opening and Phase 1 sequences.

- [ ] **Step 1: Write the failing tests**

Update the opening-order expectations so the first six visible IDs are:

```js
[
  null,
  'client-wall-slide',
  'internal-proof-slide',
  'cash-runway-slide',
  'program-overview-slide',
  'phase-1-cover-slide',
]
```

Add an explicit Phase 1 assertion:

```js
assertInOrder(deck, [
  'id="phase-1-cover-slide"',
  'id="lucas-onboarding-slide"',
  'id="clients-love-slide"',
  'id="triager-closer-slide"',
], 'Phase 1 opening slides');
```

Rename the cash-runway order test to state that it is visible slide 4.

- [ ] **Step 2: Run the focused tests to verify they fail**

Run:

```bash
node --test slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because `clients-love-slide` still appears before `internal-proof-slide` and before the Phase 1 cover.

### Task 2: Move the Knowledge/Avatar slide in source

**Files:**
- Modify: `slides/deck.html`

**Interfaces:**
- Consumes: the existing complete `#clients-love-slide` HTML block.
- Produces: static slide order `#phase-1-cover-slide`, `#lucas-onboarding-slide`, `#clients-love-slide`, `#triager-closer-slide`.

- [ ] **Step 1: Implement the minimal source-order change**

Move the complete `<div class="slide" id="clients-love-slide">…</div>` block from its current early-deck location to immediately after the closing tag of `#lucas-onboarding-slide`. Do not alter the block's inner markup and do not add a runtime `insertBefore` call.

- [ ] **Step 2: Run the focused tests to verify they pass**

Run:

```bash
node --test slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

- [ ] **Step 3: Run the full slide test suite**

Run:

```bash
node --test slides/tests/*.test.mjs
```

Expected: all current deck tests pass; the previously documented archived-July checksum mismatch may remain unchanged.

- [ ] **Step 4: Verify the rendered sequence**

Open `slides/deck.html` and confirm that Phase 1 presents as cover, Lucas Onboarding, then Knowledge/Avatar, with navigation and the `/24` counter intact at desktop and mobile widths.

- [ ] **Step 5: Commit**

```bash
git add slides/deck.html slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs slides/tests/pitch-deck-tweaks.test.mjs docs/superpowers/plans/2026-08-07-restore-knowledge-avatar-order.md
git commit -m "fix: restore knowledge avatar phase order"
```
