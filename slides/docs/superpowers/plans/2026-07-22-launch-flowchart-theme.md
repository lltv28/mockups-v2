# Launch Flowchart Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the four-step flows on slides 14 and 15 as compact dark green process rails while keeping the three deliverable cards visually primary.

**Architecture:** Add a launch-only modifier class to the existing ordered lists so other deck flows remain unchanged. Remove only the longer process descriptions, retain ordered-list semantics, and use responsive CSS to turn the horizontal rail into a vertical rail on narrow screens.

**Tech Stack:** Static HTML, CSS, Node.js test runner, Vite

---

### Task 1: Lock the selected process-rail design into the deck tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:291-402`

- [ ] **Step 1: Update the launch-flow selectors and assertions**

Use this opening tag for both launch flows:

```js
const orderedFlowOpening = '<ol class="upsell-flow upsell-flow--launch-rail rv d4">';
```

Inside the existing launch-flow test, verify the selected structure:

```js
assert.match(flow, /class="launch-flow-label rv d4">How it works<\/div>/);
assert.match(flow, /<ol class="upsell-flow upsell-flow--launch-rail rv d4">/);
assert.equal((orderedFlow.match(/class="upsell-step__body"/g) ?? []).length, 0);
assert.equal((orderedFlow.match(/<li class="upsell-step(?: upsell-final)?">/g) ?? []).length, 4);
assert.equal((orderedFlow.match(/<li class="upsell-arrow" aria-hidden="true">→<\/li>/g) ?? []).length, 3);
assert.match(orderedFlow, /<li class="upsell-step upsell-final">[\s\S]*?<div class="upsell-step__tag">Step 4<\/div>/);
```

Add launch-only CSS checks using the existing `launchCss` and `responsiveBlock` variables:

```js
assert.match(launchCss, /\.upsell-flow--launch-rail \{[^}]*background: var\(--brand-950\);[^}]*border-radius: 14px;[^}]*overflow: hidden;/);
assert.match(launchCss, /\.upsell-flow--launch-rail \.upsell-step \{[^}]*background: transparent;[^}]*box-shadow: none;/);
assert.match(launchCss, /\.upsell-flow--launch-rail \.upsell-step__title \{[^}]*color: var\(--white\);/);
assert.match(responsiveBlock, /\.upsell-flow--launch-rail \{[^}]*flex-direction: column;/);
```

- [ ] **Step 2: Run the focused deck test and verify it fails**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs`

Expected: FAIL because the launch flows do not yet have the rail modifier, `How it works` labels, or compact body-free markup.

- [ ] **Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover compact launch process rails"
```

### Task 2: Implement the dark green process rails

**Files:**
- Modify: `slides/deck-july-2026.html:1948-1975`
- Modify: `slides/deck-july-2026.html:2588-2705`

- [ ] **Step 1: Add the launch-only rail styling**

Add these rules after the existing launch flow component rules:

```css
.launch-flow-label { color: var(--al-500); font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-align: center; text-transform: uppercase; }
.upsell-flow--launch-rail { gap: 0; overflow: hidden; background: var(--brand-950); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; box-shadow: 0 12px 28px rgba(5,65,47,0.16); }
.upsell-flow--launch-rail .upsell-step { min-height: 72px; padding: 10px 12px; gap: 3px; background: transparent; border: 0; border-radius: 0; box-shadow: none; }
.upsell-flow--launch-rail .upsell-step__tag { color: var(--brand-200); }
.upsell-flow--launch-rail .upsell-step__title { color: var(--white); font-size: 11px; }
.upsell-flow--launch-rail .upsell-step__price { color: var(--brand-100); font-size: 13px; }
.upsell-flow--launch-rail .upsell-arrow { padding: 0 3px; color: rgba(255,255,255,0.56); font-size: 14px; }
.upsell-flow--launch-rail .upsell-final { background: rgba(0,0,0,0.18); }
```

Inside the existing `@media (max-width: 900px)` block, add:

```css
.upsell-flow--launch-rail { flex-direction: column; gap: 0; }
.upsell-flow--launch-rail .upsell-step { width: 100%; min-height: 0; padding: 12px 14px; }
.upsell-flow--launch-rail .upsell-arrow { height: 20px; padding: 0; transform: rotate(90deg); }
```

- [ ] **Step 2: Update both launch-flow opening tags and labels**

Immediately before each launch ordered list, insert:

```html
<div class="launch-flow-label rv d4">How it works</div>
```

Change each ordered-list opening tag to:

```html
<ol class="upsell-flow upsell-flow--launch-rail rv d4">
```

- [ ] **Step 3: Remove the eight longer flow descriptions**

Delete these eight lines from the Authority Branding and Paid Ads Launch flows only:

```html
<div class="upsell-step__body">We turn your expertise into clear, useful content designed for your audience.</div>
<div class="upsell-step__body">Your brand stays visible without adding another task to your calendar.</div>
<div class="upsell-step__body">Comments and direct messages trigger an automated, personal response.</div>
<div class="upsell-step__body">Interested people move into the sales experience while their attention is fresh.</div>
<div class="upsell-step__body">We build the campaign, creative, targeting, and tracking for launch.</div>
<div class="upsell-step__body">The right audience lands in a focused sales experience built around your expertise.</div>
<div class="upsell-step__body">The entry offer creates a buyer and identifies what support they need next.</div>
<div class="upsell-step__body">Every buyer gets the next step that matches their readiness.</div>
```

Keep all step numbers, step titles, and action words.

- [ ] **Step 4: Make Step 4 the final highlighted segment on Paid Ads Launch**

Change Paid Ads Step 3 to:

```html
<li class="upsell-step">
```

Change Paid Ads Step 4 to:

```html
<li class="upsell-step upsell-final">
```

- [ ] **Step 5: Run the focused deck test and verify it passes**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs`

Expected: 32 tests pass and 0 fail.

- [ ] **Step 6: Commit the implementation**

```powershell
git add slides/deck-july-2026.html
git commit -m "feat: restyle launch flows as compact rails"
```

### Task 3: Verify the complete deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Verify: `slides/deck.html`

- [ ] **Step 1: Run all deck tests**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs`

Expected: 38 tests pass and 0 fail.

- [ ] **Step 2: Build the project**

Run: `npm run build`

Expected: Vite exits with code 0.

- [ ] **Step 3: Confirm the original deck remains unchanged**

Run: `git diff --quiet origin/master -- slides/deck.html`

Expected: exit code 0.

- [ ] **Step 4: Inspect slides 14 and 15 in the local preview**

Open: `http://127.0.0.1:8768/slides/deck-july-2026.html`

Expected: each slide keeps its three deliverable cards and shows a compact dark green four-step rail below, with no process descriptions or horizontal overflow.
