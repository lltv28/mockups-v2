# Connected Launch Step Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the two launch process rails into four matching light-green cards with visible connectors and larger serif action titles.

**Architecture:** Keep the existing ordered-list markup and reuse the current launch-flow classes. CSS will move the green background from the shared rail onto each step card, give the connectors their own green circles, and increase the serif action-title typography. Step 4 will use the same markup and styling as Steps 1 through 3.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner

---

### Task 1: Lock the connected-card design into tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:391-419`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Write the failing assertions**

Update the launch-flow test so it requires four standard step cards, three green circular connectors, a transparent shared rail, and 18px action titles:

```js
[authority, paid].forEach((flow) => {
  const orderedFlowOpening = '<ol class="upsell-flow upsell-flow--launch-rail rv d4">';
  const orderedFlowStart = flow.indexOf(orderedFlowOpening);
  const orderedFlowEnd = flow.indexOf('</ol>', orderedFlowStart) + '</ol>'.length;
  const orderedFlow = flow.slice(orderedFlowStart, orderedFlowEnd);

  assertOneVisibleSlide(flow, 'launch detail slide');
  assert.match(flow, /class="launch-flow-label rv d4">How it works<\/div>/);
  assert.equal((orderedFlow.match(/<li class="upsell-step">/g) ?? []).length, 4);
  assert.equal((orderedFlow.match(/<li class="upsell-arrow" aria-hidden="true">→<\/li>/g) ?? []).length, 3);
  assert.doesNotMatch(orderedFlow, /upsell-final/);
  assert.equal((orderedFlow.match(/class="upsell-step__body"/g) ?? []).length, 0);
});

const railRule = launchCss.match(/\.upsell-flow--launch-rail \{[^}]*\}/)?.[0] ?? '';
assert.match(railRule, /gap: 8px;/);
assert.match(railRule, /overflow: visible;/);
assert.match(railRule, /background: transparent;/);
assert.match(launchCss, /\.upsell-flow--launch-rail \.upsell-step \{[^}]*background: var\(--brand-950\);[^}]*border-radius: 12px;/);
assert.match(launchCss, /\.upsell-flow--launch-rail \.upsell-step__price \{[^}]*font-size: 18px;[^}]*letter-spacing: 0\.04em;/);
assert.match(launchCss, /\.upsell-flow--launch-rail \.upsell-arrow \{[^}]*background: var\(--brand-950\);[^}]*color: var\(--white\);[^}]*border-radius: 50%;/);
assert.match(responsiveBlock, /\.upsell-flow--launch-rail \{[^}]*flex-direction: column;/);
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run:

```powershell
node --test --test-name-pattern "merged Authority and Paid Ads flows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the current shared rail has no card gaps, Step 4 still has `upsell-final`, and the action titles are 13px.

- [ ] **Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover connected launch step cards"
```

### Task 2: Implement matching connected cards

**Files:**
- Modify: `slides/deck-july-2026.html:1962-1985`
- Modify: `slides/deck-july-2026.html:2600-2687`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Replace the shared-rail CSS with connected-card CSS**

Use these launch-specific rules:

```css
.upsell-flow--launch-rail { gap: 8px; overflow: visible; background: transparent; border: 0; border-radius: 0; box-shadow: none; }
.upsell-flow--launch-rail .upsell-step { min-height: 72px; padding: 10px 12px; gap: 3px; background: var(--brand-950); border: 0; border-radius: 12px; box-shadow: none; }
.upsell-flow--launch-rail .upsell-step__tag { color: rgba(255,255,255,0.72); }
.upsell-flow--launch-rail .upsell-step__title { color: var(--white); font-size: 12px; letter-spacing: 0.01em; }
.upsell-flow--launch-rail .upsell-step__price { color: var(--white); font-size: 18px; letter-spacing: 0.04em; }
.upsell-flow--launch-rail .upsell-arrow { align-self: center; width: 24px; height: 24px; padding: 0; background: var(--brand-950); color: var(--white); border-radius: 50%; font-size: 14px; }
```

Keep the responsive stack and update its gap and connector sizing:

```css
.upsell-flow--launch-rail { flex-direction: column; gap: 8px; }
.upsell-flow--launch-rail .upsell-step { width: 100%; min-height: 0; padding: 12px 14px; }
.upsell-flow--launch-rail .upsell-arrow { width: 24px; height: 24px; padding: 0; transform: rotate(90deg); }
```

- [ ] **Step 2: Remove the Step 4 special class from both flows**

Change both Step 4 openings from:

```html
<li class="upsell-step upsell-final">
```

to:

```html
<li class="upsell-step">
```

- [ ] **Step 3: Run the focused test and confirm it passes**

Run:

```powershell
node --test --test-name-pattern "merged Authority and Paid Ads flows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Run the full deck tests**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: all tests pass.

- [ ] **Step 5: Commit the implementation**

```powershell
git add slides/deck-july-2026.html
git commit -m "feat: separate launch flows into connected cards"
```

### Task 3: Verify the final deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Protect: `slides/deck.html`

- [ ] **Step 1: Inspect slides 14 and 15 at desktop size**

Open `http://127.0.0.1:8768/slides/deck-july-2026.html` at 1600 by 900. Confirm both process flows show four equal green cards, three visible connectors, matching Step 4 styling, and readable action titles.

- [ ] **Step 2: Inspect slides 14 and 15 at phone size**

Set the preview to 430 by 900. Confirm the cards stack, arrows point downward, and no card overflows horizontally.

- [ ] **Step 3: Run final verification**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
git status --short
```

Expected: tests and build exit successfully, no whitespace errors, `slides/deck.html` remains unchanged, and the working tree is clean.
