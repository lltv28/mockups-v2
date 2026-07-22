# Standalone Launch Arrows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the circular launch-flow connectors on slides 14 and 15 with standalone 18px green arrows.

**Architecture:** Keep the existing arrow list items and responsive rotation. Change only the launch-specific CSS so the arrows lose their background shape, inherit the card green as their text color, and remain centered between cards.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner

---

### Task 1: Replace arrow bubbles with standalone arrows

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:389-419`
- Modify: `slides/deck-july-2026.html:1968-1985`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Write the failing arrow-style assertions**

Replace the current circular-connector assertion with these requirements:

```js
const launchArrowRule = launchCss.match(/\.upsell-flow--launch-rail \.upsell-arrow \{[^}]*\}/)?.[0] ?? '';
assert.match(launchArrowRule, /background: transparent;/);
assert.match(launchArrowRule, /color: var\(--brand-950\);/);
assert.match(launchArrowRule, /border-radius: 0;/);
assert.match(launchArrowRule, /font-size: 18px;/);
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run:

```powershell
node --test --test-name-pattern "merged Authority and Paid Ads flows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the arrows still have a green background, white color, circular radius, and 14px size.

- [ ] **Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover standalone launch arrows"
```

- [ ] **Step 4: Apply the standalone-arrow CSS**

Replace the desktop launch-arrow rule with:

```css
.upsell-flow--launch-rail .upsell-arrow { align-self: center; width: 24px; height: 24px; padding: 0; background: transparent; color: var(--brand-950); border-radius: 0; font-size: 18px; }
```

Keep the existing mobile rule unchanged so the arrows still rotate downward:

```css
.upsell-flow--launch-rail .upsell-arrow { width: 24px; height: 24px; padding: 0; transform: rotate(90deg); }
```

- [ ] **Step 5: Run the focused and full deck tests**

Run:

```powershell
node --test --test-name-pattern "merged Authority and Paid Ads flows" slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: the focused test passes and all deck tests pass.

- [ ] **Step 6: Commit the implementation**

```powershell
git add slides/deck-july-2026.html
git commit -m "style: simplify launch flow arrows"
```

### Task 2: Verify the final deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Protect: `slides/deck.html`

- [ ] **Step 1: Inspect slides 14 and 15 at desktop and phone sizes**

Open `http://127.0.0.1:8768/slides/deck-july-2026.html` at 1600 by 900 and 430 by 900. Confirm the arrows are standalone, green, centered between cards, and rotated downward on mobile.

- [ ] **Step 2: Run final verification**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
git status --short
```

Expected: tests and build exit successfully, no whitespace errors, `slides/deck.html` remains unchanged, and the working tree is clean.
