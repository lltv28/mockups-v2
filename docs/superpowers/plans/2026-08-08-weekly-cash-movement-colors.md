# Weekly Cash Movement Colors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Color the two `Weekly cash movement` value cells red and green respectively without changing their labels or any other slide.

**Architecture:** Keep the existing semantic ledger markup and add two explicit selectors inside the cash-runway slide's scoped CSS. A focused regression test protects the requested outcome colors, and browser verification confirms the actual cascade and layout.

**Tech Stack:** Self-contained HTML/CSS, native semantic tables, Node.js test runner, browser computed-style inspection.

## Global Constraints

- Modify only the cash-runway comparison slide and its focused test.
- Traditional `−$2,000` must use `#A7474B`.
- Self-funding `$0` must use `var(--brand-950)`.
- Both `Weekly cash movement` labels must remain dark neutral.
- Do not change slide order, copy, chart data, transaction values, or any other slide.

---

### Task 1: Apply outcome colors to weekly cash movement values

**Files:**
- Modify: `slides/tests/deck-cash-runway.test.mjs`
- Modify: `slides/deck.html:3293-3303`

**Interfaces:**
- Consumes: the existing `.cash-runway-ledger--traditional`, `.cash-runway-ledger--self-funding`, `tfoot`, `th`, and `td` markup.
- Produces: browser-resolved red and green footer value colors scoped to `.slide--cash-runway`.

- [ ] **Step 1: Write the failing regression test**

Add a focused test that asserts the deck defines explicit value-only footer rules:

```js
test('cash runway weekly movement values use outcome colors without recoloring labels', () => {
  const traditionalValueRule = cssRuleBody(
    deck,
    '.slide--cash-runway .cash-runway-ledger--traditional tfoot td',
  );
  const selfFundingValueRule = cssRuleBody(
    deck,
    '.slide--cash-runway .cash-runway-ledger--self-funding tfoot td',
  );
  const sharedFooterRule = deck.match(
    /\.slide--cash-runway \.cash-runway-ledger tfoot th,\s*\.slide--cash-runway \.cash-runway-ledger tfoot td\s*\{([^}]*)\}/s,
  )?.[1] ?? '';

  assert.match(traditionalValueRule, /color:\s*#A7474B/);
  assert.match(selfFundingValueRule, /color:\s*var\(--brand-950\)/);
  assert.match(sharedFooterRule, /color:\s*var\(--al-900\)/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: the new test fails because the traditional value does not yet have an explicit footer selector.

- [ ] **Step 3: Add the minimal slide-scoped CSS**

In `slides/deck.html`, keep the shared footer typography intact and add explicit value-only rules:

```css
.slide--cash-runway .cash-runway-ledger--traditional tfoot td { color: #A7474B; }
.slide--cash-runway .cash-runway-ledger--self-funding tfoot td { color: var(--brand-950); }
```

- [ ] **Step 4: Run focused and full automated verification**

Run the focused test command from Step 2, then:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: the focused file passes. Report the full suite's exact pass/fail count, including the known archived-July checksum exception if it remains the only failure.

- [ ] **Step 5: Verify actual browser appearance and layout**

Open `slides/deck.html?slide=4` and inspect the cash-runway slide at 1920×1080 and 390×844. Confirm computed styles resolve the traditional value to `rgb(167, 71, 75)`, the self-funding value to the resolved `--brand-950` green, both labels remain neutral, and no horizontal overflow or new wrapping appears.

- [ ] **Step 6: Commit, push, open a ready pull request, and merge**

Stage only the approved spec, plan, test, and deck changes. Commit the implementation, push `agent/weekly-cash-movement-colors`, open a ready pull request against `master`, merge only if GitHub reports it cleanly mergeable and checks pass, then fetch and verify the implementation commit is an ancestor of `origin/master`.
