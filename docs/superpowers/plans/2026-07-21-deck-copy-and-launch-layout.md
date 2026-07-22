# Deck Copy and Launch Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved copy, offer-card styling, and richer Organic and Paid Ads proof layouts while keeping the pitch deck at 20 visible slides.

**Architecture:** Keep the deck as a single HTML document and extend its existing component-style CSS. Add focused CSS classes for the offer cards and launch proof areas, then update the existing Node tests to lock in copy, asset use, slide order, and flowchart semantics.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner

---

## File map

- Modify `slides/deck.html`: exact copy changes, unified offer-card shell, Organic proof layout, Paid Ads proof layout, and responsive CSS.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: regression coverage for the approved copy, matching card shells, proof assets, proof-before-flow ordering, and 20 visible slides.

### Task 1: Approved copy and offer-card styling

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Modify: `slides/deck.html:1937-2009`
- Modify: `slides/deck.html:2165-2185`

- [ ] **Step 1: Update the opening and overview tests, then add a matching-card-shell test**

In `slides/tests/pitch-deck-tweaks.test.mjs`, update the opening assertion and add the approved phase descriptors:

```js
test('opening uses the approved AI scale message', () => {
  const opening = section('<!-- INTRO 1, Bottleneck (4-combo intro from sales manager) -->', '<!-- INTRO 1.1,');
  assert.match(opening, /You can only sell one person at a time\./);
  assert.match(opening, /Your AI can sell a thousand, all at once\./);
  assert.match(opening, /cloned, automated version of you that works 24\/7/);
  assert.match(opening, /only hot-and-ready buyers ever land on your calendar/);
  assert.doesNotMatch(opening, /only ready buyers ever land on your calendar/);
  assert.doesNotMatch(opening, /Your business can't grow past how many hours you work/);
});
```

Replace the overview test with:

```js
test('overview uses exactly the approved Build and Launch stages', () => {
  const overview = section('<!-- S5, 2 Stages Overview -->', '<!-- Phase 1, AI Build (Cover) -->');
  assert.match(overview, /The Kodara System/);
  assert.match(overview, /Build and launch\./);
  assert.match(overview, /Your expertise becomes a proven AI product\./);
  assert.match(overview, /Your AI product becomes a predictable growth engine\./);
  assert.doesNotMatch(overview, /We build and prove your AI product on real clients\./);
  assert.doesNotMatch(overview, /We build your authority system and turn on organic and paid acquisition\./);
  assert.equal((overview.match(/class="phase-col /g) ?? []).length, 2);
  assertInOrder(overview, ['Build', '4 weeks', 'Launch', '2 weeks'], 'two-stage overview');
});
```

Add this test after the existing offer-ladder ordering test:

```js
test('offer ladder uses one neutral card shell for all three offers', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  assert.equal((ladder.match(/class="offer-ladder-card"/g) ?? []).length, 3);
  assert.doesNotMatch(ladder, /background:\s*var\(--brand-50\)/);
  assert.doesNotMatch(ladder, /border:\s*1px solid var\(--brand-200\)/);
});
```

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run:

```powershell
node --test --test-name-pattern="opening|overview|offer ladder uses one neutral" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the new copy and `offer-ladder-card` class are not present.

- [ ] **Step 3: Add the shared card class and apply the approved copy**

Add this CSS near the other deck components in `slides/deck.html`:

```css
.offer-ladder-card {
  background: var(--white);
  border: 1px solid var(--al-100);
  border-radius: 16px;
  padding: 22px 18px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

Change each of the three offer-card opening tags to:

```html
<div class="offer-ladder-card">
```

On the AI Pocket Coach card, change its divider to the same neutral divider used by the other cards:

```html
<div style="border-top: 1px solid var(--al-50); padding-top: 12px; text-align: left;">
```

Replace the Slide 1 sentence fragment with:

```html
It's a cloned, automated version of you that works 24/7, pre-selling and qualifying leads so only hot-and-ready buyers ever land on your calendar.
```

Replace the two Slide 5 body paragraphs with:

```html
<p class="body" style="font-size: 15px; line-height: 22px;">Your expertise becomes a proven AI product.</p>
```

```html
<p class="body" style="font-size: 15px; line-height: 22px;">Your AI product becomes a predictable growth engine.</p>
```

- [ ] **Step 4: Run the focused tests and confirm they pass**

Run:

```powershell
node --test --test-name-pattern="opening|overview|offer ladder" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS for all matching tests.

- [ ] **Step 5: Commit the copy and card changes**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: update deck copy and unify offer cards"
```

### Task 2: Organic proof content above its flowchart

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Modify: `slides/deck.html:1893-1907`
- Modify: `slides/deck.html:2499-2540`

- [ ] **Step 1: Add a failing Organic proof-layout test**

Add after the existing Launch flow ordering test:

```js
test('Organic Launch restores proof content above its four-step flow', () => {
  const organic = section('<!-- Phase 2, Organic Launch Flow -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const proofIndex = organic.indexOf('class="launch-organic-proof');
  const flowIndex = organic.indexOf('<ol class="upsell-flow rv d4">');
  assert.ok(proofIndex >= 0 && proofIndex < flowIndex, 'Organic proof must appear above the flow');
  assert.match(organic, /16369f811f94556e674955011d506194/);
  [
    'Short videos &amp; reels',
    'Posts &amp; captions',
    'Filmed, designed, and published by us',
  ].forEach((copy) => assert.match(organic, new RegExp(escapeRegex(copy))));
  assert.equal((organic.match(/class="launch-bullet-card"/g) ?? []).length, 3);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```powershell
node --test --test-name-pattern="Organic Launch restores" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the proof layout is not present.

- [ ] **Step 3: Add reusable launch-proof CSS**

Add above the existing `.upsell-flow` rules:

```css
.launch-flow-layout { justify-content: center; gap: 14px; }
.launch-flow-layout .h-lg { font-size: clamp(28px, 3.4vw, 44px); }
.launch-organic-proof {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
  gap: 14px;
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  align-items: stretch;
  text-align: left;
}
.launch-proof-media {
  position: relative;
  min-height: 160px;
  overflow: hidden;
  background: var(--al-25);
  border: 1px solid var(--al-100);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
}
.launch-proof-media iframe,
.launch-proof-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}
.launch-bullet-stack { display: grid; grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 8px; }
.launch-bullet-card {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 12px;
  background: var(--white);
  border: 1px solid var(--al-100);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  color: var(--al-700);
  font-size: 11px;
  line-height: 1.35;
}
.launch-bullet-card strong { color: var(--al-900); }
.launch-bullet-card::before { content: "✓"; color: var(--brand-950); font-weight: 800; }
.launch-flow-layout .upsell-step { padding: 10px; gap: 3px; }
.launch-flow-layout .upsell-step__title { font-size: 12px; }
.launch-flow-layout .upsell-step__body { font-size: 9.5px; line-height: 1.35; }
.launch-flow-layout .upsell-step__price { font-size: 16px; }
```

Extend the existing `@media (max-width: 900px)` launch block with:

```css
.slide--launch-proof { overflow-y: auto; justify-content: flex-start; align-items: flex-start; }
.slide--launch-proof > .content--wide { justify-content: flex-start !important; }
.launch-organic-proof { grid-template-columns: 1fr; }
.launch-proof-media { min-height: 220px; }
```

- [ ] **Step 4: Insert the Organic proof area before the existing ordered list**

Add `slide--launch-proof` to the Organic slide and change its content wrapper to:

```html
<div class="content--wide text-center flex-col launch-flow-layout">
```

Insert this block immediately before `<ol class="upsell-flow rv d4">`:

```html
<div class="launch-organic-proof rv d3">
  <div class="launch-proof-media">
    <iframe
      src="https://customer-nguqf0yqc9xf45px.cloudflarestream.com/16369f811f94556e674955011d506194/iframe?muted=true&amp;preload=true&amp;loop=true&amp;autoplay=true&amp;controls=false"
      title="Done-for-you Organic Marketing example"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowfullscreen="true"
    ></iframe>
  </div>
  <div class="launch-bullet-stack">
    <div class="launch-bullet-card"><span><strong>Short videos &amp; reels</strong> generated in your voice, ready to post</span></div>
    <div class="launch-bullet-card"><span><strong>Posts &amp; captions</strong> written and scheduled across platforms</span></div>
    <div class="launch-bullet-card"><span><strong>Filmed, designed, and published by us</strong>, so you stay in your zone of genius</span></div>
  </div>
</div>
```

- [ ] **Step 5: Run Organic and flow-semantic tests**

Run:

```powershell
node --test --test-name-pattern="Organic Launch restores|organic and paid Launch flows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS, including the existing four-step ordered-list checks.

- [ ] **Step 6: Commit the Organic proof layout**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: restore Organic launch proof content"
```

### Task 3: Paid Ads proof cards above its flowchart

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Modify: `slides/deck.html:1893-1907`
- Modify: `slides/deck.html:2541-2584`

- [ ] **Step 1: Add a failing Paid Ads proof-layout test**

Add after the Organic proof test:

```js
test('Paid Ads Launch shows three proof cards above its four-step flow', () => {
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const proofIndex = paid.indexOf('class="launch-proof-grid');
  const flowIndex = paid.indexOf('<ol class="upsell-flow rv d4">');
  assert.ok(proofIndex >= 0 && proofIndex < flowIndex, 'Paid Ads proof must appear above the flow');
  assert.equal((paid.match(/class="launch-proof-card"/g) ?? []).length, 3);
  assert.match(paid, /cf012831e12dd92855000b85e12a60db/);
  assert.match(paid, /src="leanne-landing\.jpg"/);
  assert.match(paid, /src="pipeline-activation-email\.png"/);
  assertInOrder(paid, ['Ad Creative', 'Funnel', 'Pipeline Activation'], 'Paid Ads proof cards');
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```powershell
node --test --test-name-pattern="Paid Ads Launch shows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the proof grid is not present.

- [ ] **Step 3: Add the three-card proof CSS**

Add beside the Organic proof styles:

```css
.launch-proof-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  text-align: left;
}
.launch-proof-card {
  display: grid;
  grid-template-rows: 112px auto;
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--al-100);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
}
.launch-proof-card .launch-proof-media { min-height: 0; border: 0; border-radius: 0; box-shadow: none; }
.launch-proof-card__copy { padding: 8px 10px 9px; }
.launch-proof-card__title { color: var(--al-900); font-size: 12px; font-weight: 700; }
.launch-proof-card__body { margin-top: 2px; color: var(--al-500); font-size: 9.5px; line-height: 1.3; }
```

Extend the existing `@media (max-width: 900px)` launch block with:

```css
.launch-proof-grid { grid-template-columns: 1fr; }
.launch-proof-card { grid-template-rows: 200px auto; }
```

- [ ] **Step 4: Insert the Paid Ads proof grid before the existing ordered list**

Add `slide--launch-proof` to the Paid Ads slide and change its content wrapper to:

```html
<div class="content--wide text-center flex-col launch-flow-layout">
```

Insert this block immediately before `<ol class="upsell-flow rv d4">`:

```html
<div class="launch-proof-grid rv d3">
  <article class="launch-proof-card">
    <div class="launch-proof-media">
      <iframe
        src="https://customer-nguqf0yqc9xf45px.cloudflarestream.com/cf012831e12dd92855000b85e12a60db/iframe?muted=true&amp;preload=true&amp;loop=true&amp;autoplay=true&amp;controls=false"
        title="Done-for-you Paid Ads creative example"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="launch-proof-card__copy">
      <div class="launch-proof-card__title">Ad Creative</div>
      <div class="launch-proof-card__body">Hooks, angles, and launch-ready creative built by our team.</div>
    </div>
  </article>
  <article class="launch-proof-card">
    <div class="launch-proof-media">
      <img src="leanne-landing.jpg" alt="Leanne Ellington's AI sales funnel">
    </div>
    <div class="launch-proof-card__copy">
      <div class="launch-proof-card__title">Funnel</div>
      <div class="launch-proof-card__body">A focused sales experience built to turn traffic into buyers.</div>
    </div>
  </article>
  <article class="launch-proof-card">
    <div class="launch-proof-media">
      <img src="pipeline-activation-email.png" alt="Pipeline activation email sequence">
    </div>
    <div class="launch-proof-card__copy">
      <div class="launch-proof-card__title">Pipeline Activation</div>
      <div class="launch-proof-card__body">Email and SMS sequences wake up the leads already in your CRM.</div>
    </div>
  </article>
</div>
```

- [ ] **Step 5: Run Paid Ads and Launch structure tests**

Run:

```powershell
node --test --test-name-pattern="Paid Ads Launch shows|Launch contains four|organic and paid Launch flows" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS, including four visible Launch slides and four ordered steps per flow.

- [ ] **Step 6: Commit the Paid Ads proof layout**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: restore Paid Ads launch proof content"
```

### Task 4: Full regression and visual verification

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Run the complete deck test suite**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 2: Check formatting and branch scope**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and no unrelated files.

- [ ] **Step 3: Reload the local deck and inspect Slides 1, 2, 5, 15, and 16**

Open `http://127.0.0.1:8766/slides/deck.html` and verify:

1. Slide 1 uses “hot-and-ready buyers.”
2. Slide 2 has three matching neutral card shells.
3. Slide 5 uses the two approved descriptors.
4. Slide 15 shows the Organic video and three bullets above the flowchart.
5. Slide 16 shows three proof cards above the flowchart.

Expected: no clipping, overlap, horizontal overflow, or unreadably small proof content at the standard desktop preview size.

- [ ] **Step 4: Verify navigation and slide count**

Use the right-arrow key from Slide 1 through Slide 20, then use the left-arrow key back one slide.

Expected: the counter reaches `20 / 20`, all slides advance once, and the previous-slide action works.

- [ ] **Step 5: Commit any visual-fit adjustments**

If visual verification required CSS-only fit adjustments, run:

```powershell
git add slides/deck.html
git commit -m "fix: refine launch slide fit"
```

If no adjustment was needed, do not create an empty commit.
