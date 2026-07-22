# Deck Order and Program Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the Expert AIs slide before the client-love slide and make the six-month program timeline clear on both Build/Launch overview slides.

**Architecture:** Keep `slides/deck.html` untouched and edit only the July deck. Add stable slide hooks, reorder the two introduction slides before navigation initializes, and reuse one responsive timeline-bar component on both two-card overview slides.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js built-in test runner, Vite

---

## File map

- Modify `slides/deck-july-2026.html`: slide hooks, navigation-time reorder, timeline bars, and responsive styling.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: regression tests for the runtime slide order and both timeline bars.
- Keep `slides/deck.html` unchanged as the original deck.

### Task 1: Add failing slide-order and timeline tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:201-212`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:413-432`

- [ ] **Step 1: Add the slide-order regression test**

Add this test before the existing visible-slide-order test:

```js
test('Expert AIs moves before client proof before navigation initializes', () => {
  assert.match(deck, /id="clients-love-slide"/);
  assert.match(deck, /id="expert-ai-slide"/);
  const reorder = deck.indexOf("deckElement.insertBefore(expertAiSlide, clientsLoveSlide)");
  const navigation = deck.indexOf("const slides = document.querySelectorAll('.slide:not([hidden])')");
  assert.ok(reorder >= 0 && reorder < navigation, 'intro slides must reorder before navigation captures slide order');
});
```

- [ ] **Step 2: Add the two-slide timeline regression test**

Add this test after the existing overview test:

```js
test('both two-phase overview slides show the six-month program timeline', () => {
  const overview = section('<!-- S5, 2 Stages Overview -->', '<!-- Phase 1, AI Build (Cover) -->');
  const summary = section('<!-- Offer Stack, Simple Phase Recap -->', '<!-- S9, Fast Action Bonus');
  [overview, summary].forEach((slide) => {
    assert.match(slide, /class="program-timeline-bar/);
    assert.match(slide, /6 weeks to go live\. 6 months of selling\./);
  });
  assert.equal((deck.match(/6 weeks to go live\. 6 months of selling\./g) ?? []).length, 2);
});
```

- [ ] **Step 3: Keep the source-order test focused on slides that are not moved at runtime**

Replace `orderedCopy` with this complete list. The new runtime-reorder test above covers Expert AIs and client proof.

```js
const orderedCopy = [
  'You can only sell one person at a time',
  'Meet the version of you that never stops selling',
  'Build and launch',
  "Your life's work finally working without you",
  'Your entire AI system, built and launched for you',
  'Two ways to pay',
];
```

- [ ] **Step 4: Run the tests and confirm the new assertions fail**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: the new slide-hook, reorder, and timeline assertions fail while existing tests continue to pass.

- [ ] **Step 5: Commit the tests**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover deck order and program timeline"
```

### Task 2: Reorder the introduction slides

**Files:**
- Modify: `slides/deck-july-2026.html:2053`
- Modify: `slides/deck-july-2026.html:2155`
- Modify: `slides/deck-july-2026.html:2922-2924`

- [ ] **Step 1: Add stable IDs to both slide containers**

Use these opening tags:

```html
<div class="slide" id="clients-love-slide">
<div class="slide slide--ai-proof" id="expert-ai-slide" role="group" aria-roledescription="slide" aria-labelledby="ai-proof-title">
```

- [ ] **Step 2: Move Expert AIs before client proof before navigation initializes**

Insert this at the beginning of the main script, immediately before the `slides` query:

```js
const deckElement = document.getElementById('deck');
const clientsLoveSlide = document.getElementById('clients-love-slide');
const expertAiSlide = document.getElementById('expert-ai-slide');
deckElement.insertBefore(expertAiSlide, clientsLoveSlide);

const slides = document.querySelectorAll('.slide:not([hidden])');
```

- [ ] **Step 3: Run the slide tests**

Run the Node test command from Task 1.

Expected: the slide-order regression passes. Timeline tests still fail.

- [ ] **Step 4: Commit the slide reorder**

```powershell
git add slides/deck-july-2026.html
git commit -m "feat: show Expert AIs before client proof"
```

### Task 3: Add the reusable program timeline bars

**Files:**
- Modify: `slides/deck-july-2026.html:1157-1183`
- Modify: `slides/deck-july-2026.html:1571-1610`
- Modify: `slides/deck-july-2026.html:2200-2226`
- Modify: `slides/deck-july-2026.html:2663-2691`

- [ ] **Step 1: Add the shared component styling**

Add this after the phase-card styles:

```css
.program-timeline-bar {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 16px 24px;
  border-radius: 16px;
  background: var(--brand-950);
  color: white;
  box-shadow: var(--shadow-card);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
}
```

- [ ] **Step 2: Add responsive scrolling and sizing**

Add `slide--program-overview` to the two overview slide containers. Inside the `max-width: 900px` rules, add:

```css
.slide--program-overview {
  overflow-y: auto;
  justify-content: flex-start;
  align-items: flex-start;
}
.slide--program-overview > .content--wide {
  justify-content: flex-start !important;
  align-items: stretch;
}
.program-timeline-bar {
  padding: 14px 18px;
  font-size: 15px;
}
```

- [ ] **Step 3: Add the timeline below the first phase-card grid**

Insert immediately after the first `.phases-grid`:

```html
<div class="program-timeline-bar rv d5">6 weeks to go live. 6 months of selling.</div>
```

- [ ] **Step 4: Add the timeline above the Offer Summary guarantee**

Insert immediately after the two-card Offer Summary grid and before the guarantee box:

```html
<div class="program-timeline-bar rv d4">6 weeks to go live. 6 months of selling.</div>
```

Move the guarantee reveal class from `d4` to `d5` so the timeline appears first.

- [ ] **Step 5: Run tests and build**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
```

Expected: 35 tests pass, the Vite build succeeds, the whitespace check succeeds, and `slides/deck.html` has no differences.

- [ ] **Step 6: Commit the timeline treatment**

```powershell
git add slides/deck-july-2026.html
git commit -m "feat: clarify six-month Kodara program"
```

### Task 4: Visual verification

**Files:**
- Inspect: `slides/deck-july-2026.html`

- [ ] **Step 1: Preview the deck at desktop width**

Open `http://127.0.0.1:8766/slides/deck-july-2026.html` at 1600 by 900. Confirm Expert AIs is slide 3, client proof is slide 4, and both timeline bars fit without overlap.

- [ ] **Step 2: Preview the affected slides at phone width**

Resize to 430 by 900. Confirm both overview slides scroll from the top, all phase-card text remains readable, and each timeline sentence wraps cleanly without clipping.

- [ ] **Step 3: Record the final verification commit**

If visual inspection requires no corrections, no additional commit is needed. If spacing changes are required, edit only the shared responsive CSS, rerun Task 3 Step 5, and commit with:

```powershell
git add slides/deck-july-2026.html
git commit -m "fix: refine program timeline spacing"
```
