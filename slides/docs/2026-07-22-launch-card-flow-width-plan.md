# Launch Card and Flow Width Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the three-card rows on slides 14 and 15 exactly as wide as their `1060px` flowcharts.

**Architecture:** Keep both slides on the shared `.launch-proof-grid` component and change its desktop maximum width from `900px` to `1060px`. Leave the shared flowchart and all responsive rules unchanged.

**Tech Stack:** HTML, CSS, Node.js built-in test runner, Vite

---

## File map

- Modify `slides/deck-july-2026.html`: update the shared desktop card-grid width.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: protect width equality and both-slide usage.
- Keep `slides/deck.html` unchanged.

### Task 1: Lock the shared width with a failing test

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add the width regression test**

Add this after the existing launch-proof tests:

```js
test('both launch proof rows match the flowchart width', () => {
  assert.equal((deck.match(/<ul class="launch-proof-grid rv d3" role="list">/g) ?? []).length, 2);
  assert.match(deck, /\.launch-proof-grid \{[^}]*max-width: 1060px;[^}]*\}/s);
  assert.match(deck, /\.upsell-flow \{[^}]*max-width: 1060px;[^}]*\}/s);
});
```

- [ ] **Step 2: Run the tests and confirm the new assertion fails**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: 36 tests pass and the new width test fails because `.launch-proof-grid` still uses `900px`.

- [ ] **Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover launch card width alignment"
```

### Task 2: Expand the shared card row

**Files:**
- Modify: `slides/deck-july-2026.html:1936`

- [ ] **Step 1: Change the desktop maximum width**

Replace the shared card-grid rule with the same rule using `max-width: 1060px`:

```css
.launch-proof-grid { list-style: none; margin: 0 auto; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; max-width: 1060px; width: 100%; text-align: left; }
```

- [ ] **Step 2: Run the complete verification**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
```

Expected: 37 tests pass, the build succeeds, the whitespace check succeeds, and `slides/deck.html` remains unchanged.

- [ ] **Step 3: Commit the implementation**

```powershell
git add slides/deck-july-2026.html
git commit -m "feat: align launch card and flow widths"
```

### Task 3: Inspect both affected slides

**Files:**
- Inspect: `slides/deck-july-2026.html`

- [ ] **Step 1: Verify slides 14 and 15 at desktop width**

Open `http://127.0.0.1:8768/slides/deck-july-2026.html` at 1600 by 900. For each slide, confirm the card-row left and right edges align with the flowchart edges and no card text or image is clipped.

- [ ] **Step 2: Verify the existing phone layout**

Resize to 430 by 900. Confirm cards remain one centered column, flow steps remain vertically stacked, and there is no page-level horizontal overflow.
