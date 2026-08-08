# Build, Deploy, Launch Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every program-phase reference in the current deck read `Build → Deploy → Launch` while preserving ordinary action language and all existing layouts.

**Architecture:** Treat phase taxonomy as a focused content contract across the overview, Phase 2 and Phase 3 groups, recap, and structural markers. Protect that contract with one current-deck regression test and update the cash-runway marker dependency when the overview comment changes from two stages to three phases.

**Tech Stack:** Self-contained HTML/CSS/JavaScript deck, Node.js built-in test runner, browser responsive inspection.

## Global Constraints

- Phase 1 remains `Build`.
- Phase 2 changes from `Sell` to `Deploy`.
- Phase 3 changes from `Grow` to `Launch`.
- Preserve ordinary uses of `sell`, `selling`, `grow`, `growth`, and `launch` when they describe actions or outcomes rather than phase names.
- Preserve all phase descriptions, duration labels, slide order, navigation, IDs, layouts, visual styling, and launch-proof component names.
- Preserve operational phrases such as `Paid Ads Launch`, `We run the entire launch`, and `We keep improving the launch`.

---

### Task 1: Replace and protect the three-phase taxonomy

**Files:**
- Modify: `slides/tests/deck-narrative-refresh.test.mjs`
- Modify: `slides/tests/deck-cash-runway.test.mjs:10`
- Modify: `slides/deck.html:3661-4338, 4565-4655`

**Interfaces:**
- Consumes: the current overview, phase-cover IDs, phase-detail labels, recap, dynamic slide templates, and structural HTML markers.
- Produces: a consistent audience-facing and structural sequence of `Build → Deploy → Launch` without changing runtime navigation.

- [ ] **Step 1: Write the failing taxonomy regression**

Add this test to `slides/tests/deck-narrative-refresh.test.mjs`:

```js
test('program taxonomy is Build, Deploy, Launch everywhere', () => {
  const overview = section('<!-- S5, 3 Phases Overview -->', '<!-- Phase 1, AI Build (Cover) -->');
  const phase2 = section('<!-- Phase 2, Deploy (Cover) -->', '<!-- Phase 3, Launch (Cover) -->');
  const phase3 = section('<!-- Phase 3, Launch (Cover) -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const recap = section('<!-- Offer Stack, Simple Phase Recap -->', '<!-- Money-back guarantee -->');

  for (const block of [overview, recap]) {
    const build = block.indexOf('>Build</div>');
    const deploy = block.indexOf('>Deploy</div>');
    const launch = block.indexOf('>Launch</div>');
    assert.ok(build >= 0 && deploy > build && launch > deploy);
  }

  assert.match(overview, /Build, deploy, then launch\./);
  assert.match(phase2, /<h2 class="h-lg">Deploy<\/h2>/);
  assert.ok((phase2.match(/Phase 2 · Deploy/g) ?? []).length >= 3);
  assert.match(phase3, /<h2 class="h-lg">Launch<\/h2>/);
  assert.ok((deck.match(/Phase 3 · Launch/g) ?? []).length >= 3);
  assert.match(recap, /Build, deploy, then launch\./);

  for (const obsolete of [
    'Phase 2 · Sell',
    '<!-- Phase 2, Sell (Cover) -->',
    'Phase 3 · Grow',
    '<!-- Phase 3, Grow (Cover) -->',
    'Build, sell, then grow.',
  ]) {
    assert.doesNotMatch(deck, new RegExp(obsolete.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
```

Update the cash-runway section terminator in `slides/tests/deck-cash-runway.test.mjs`:

```js
const cashEnd = deck.indexOf('<!-- S5, 3 Phases Overview -->', cashStart);
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs
```

Expected: the new taxonomy test fails because the deck still uses `Sell` and `Grow`; the cash-runway test may also fail until the overview marker is updated.

- [ ] **Step 3: Apply the minimal taxonomy replacements**

In `slides/deck.html`, make only these semantic changes:

```text
S5, 2 Stages Overview                    → S5, 3 Phases Overview
Build your AI, start selling, then grow. → Build, deploy, then launch.
Phase 2 phase-name labels: Sell          → Deploy
Phase 2 detail tags                      → Phase 2 · Deploy
Phase 2, Sell (Cover)                    → Phase 2, Deploy (Cover)
Phase 3 phase-name labels: Grow          → Launch
Phase 3 detail tags                      → Phase 3 · Launch
Phase 3, Grow (Cover)                    → Phase 3, Launch (Cover)
Build, sell, then grow.                  → Build, deploy, then launch.
Phase 2, Paid Ads Launch Flow            → Phase 3, Paid Ads Launch Flow
```

Correct the Triager/Salesperson structural comment from Phase 1 to Phase 2 without changing its position or ID.

- [ ] **Step 4: Run focused and full automated verification**

Run the focused command from Step 2, then:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: focused tests pass. Report the full suite's exact result, including the known archived-July checksum exception if it remains the only failure.

- [ ] **Step 5: Audit the final taxonomy and preserved operational copy**

Run searches confirming no old phase taxonomy remains and that ordinary operational launch language remains intact:

```bash
rg -n "Phase 2 · Sell|Phase 3 · Grow|Build, sell, then grow|Phase 2, Sell \(Cover\)|Phase 3, Grow \(Cover\)" slides/deck.html
rg -n "Paid Ads Launch|We run the entire launch|We keep improving the launch|Phase 2 · Deploy|Phase 3 · Launch" slides/deck.html
```

Expected: the first command returns no matches; the second returns both preserved operational copy and new phase labels.

- [ ] **Step 6: Verify responsive rendered fit**

Render the overview, Phase 2 cover, Phase 3 cover, representative Phase 2 and Phase 3 detail slides, and recap at 1920×1080 and 390×844. Confirm `Deploy` and `Launch` do not wrap, overlap, clip, or create horizontal overflow.

- [ ] **Step 7: Commit and publish**

Stage only the approved spec, plan, current-deck tests, and `slides/deck.html`. Commit the implementation, push `agent/build-deploy-launch`, open a ready pull request against `master`, and merge only after GitHub reports it cleanly mergeable and the deploy preview passes. Fetch `origin/master` and verify the implementation commit is an ancestor of the remote branch.
