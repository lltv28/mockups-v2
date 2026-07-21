# Pitch Deck Tweaks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Kodara HTML pitch deck into the approved 20-slide Build and Launch presentation.

**Architecture:** Keep the single-file `slides/deck.html` architecture and its existing controller, animation, thumbnail, and responsive systems. Make surgical HTML and CSS changes, add four local credibility images, and protect the approved behavior with a new Node regression suite alongside the existing slide 3 tests.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node’s built-in test runner, Vite, local PNG/JPEG assets.

---

## File map

- Modify `slides/deck.html`: final slide sequence, content, CSS, local image references, and removal of obsolete slides.
- Create `slides/ai-proof/tony-robbins.png`: official Tony Robbins AI image.
- Create `slides/ai-proof/alex-hormozi.png`: official ACQ AI image.
- Create `slides/ai-proof/grant-cardone.png`: official 10X AI Revenue Coach image.
- Create `slides/ai-proof/mark-hyman.png`: official AI Mark image.
- Create `slides/tests/pitch-deck-tweaks.test.mjs`: full-deck regression coverage.
- Preserve `slides/tests/slide3-logo-strip.test.mjs`: approved slide 3 regression coverage.

### Task 1: Lock the approved pre-pitch behavior with failing tests

**Files:**
- Create: `slides/tests/pitch-deck-tweaks.test.mjs`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Create the test harness and opening-copy test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const slidesDir = resolve(here, '..');
const deck = readFileSync(resolve(slidesDir, 'deck.html'), 'utf8');

function section(startMarker, endMarker) {
  const start = deck.indexOf(startMarker);
  const end = deck.indexOf(endMarker, start + startMarker.length);
  assert.ok(start >= 0, `missing marker: ${startMarker}`);
  assert.ok(end > start, `missing end marker: ${endMarker}`);
  return deck.slice(start, end);
}

test('opening uses the approved AI scale message', () => {
  assert.match(deck, /You can only sell one person at a time\./);
  assert.match(deck, /Your AI can sell a thousand, all at once\./);
  assert.match(deck, /cloned, automated version of you that works 24\/7/);
  assert.match(deck, /only ready buyers ever land on your calendar/);
  assert.doesNotMatch(deck, /Your business can't grow past how many hours you work/);
});
```

- [ ] **Step 2: Add offer-order and AI-credibility tests**

```js
test('offer ladder sends qualified buyers to high ticket before the Pocket Coach downsell', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  const assessment = ladder.indexOf('AI Assessment');
  const highTicket = ladder.indexOf('1-on-1 Service');
  const pocketCoach = ladder.indexOf('AI Pocket Coach');
  assert.ok(assessment >= 0 && assessment < highTicket && highTicket < pocketCoach);
  assert.match(ladder, /not ready for a call/i);
});

test('AI credibility slide contains four verified products and local images', () => {
  const proof = section('<!-- INTRO 1.3, Big-Name AI Credibility', '<!-- S5, 2 Stages Overview');
  [
    ['Tony Robbins', 'Tony Robbins AI', 'tony-robbins.png'],
    ['Alex Hormozi', 'ACQ AI', 'alex-hormozi.png'],
    ['Grant Cardone', '10X AI Revenue Coach', 'grant-cardone.png'],
    ['Dr. Mark Hyman', 'AI Mark', 'mark-hyman.png'],
  ].forEach(([person, product, file]) => {
    assert.match(proof, new RegExp(person));
    assert.match(proof, new RegExp(product));
    assert.match(proof, new RegExp(`ai-proof/${file}`));
    assert.ok(existsSync(resolve(slidesDir, 'ai-proof', file)), `${file} must exist`);
  });
  ['Available 24/7', 'Automated nurturing', 'Recurring monthly revenue', 'Scale without adding calendar time']
    .forEach((benefit) => assert.match(proof, new RegExp(benefit)));
});
```

- [ ] **Step 3: Run the tests and verify RED**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the new opening copy, reordered ladder, AI credibility marker, and four local assets do not exist.

- [ ] **Step 4: Commit the failing specification**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: define pitch deck revision"
```

### Task 2: Build the four-slide pre-pitch

**Files:**
- Modify: `slides/deck.html:1893-2252`
- Create: `slides/ai-proof/tony-robbins.png`
- Create: `slides/ai-proof/alex-hormozi.png`
- Create: `slides/ai-proof/grant-cardone.png`
- Create: `slides/ai-proof/mark-hyman.png`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Save the four official credibility images locally**

Use the Open Graph hero image from each exact source page, crop it around the named person or product, and save it as the target PNG:

```text
Tony Robbins: https://www.tonyrobbins.com/programs/tony-ai
Alex Hormozi: https://ai.acquisition.com/
Grant Cardone: https://10xgc.grantcardone.com/blt-offer
Dr. Mark Hyman: https://drhyman.com/products/ai-mark
```

Acceptance checks:

```powershell
Get-ChildItem slides\ai-proof\*.png | Select-Object Name,Length
```

Expected: four PNG files, each larger than 10 KB, with no remote image URLs added to `slides/deck.html`.

- [ ] **Step 2: Replace slide 1 copy**

Change the hero to:

```html
<h2 class="h-hero">You can only sell one person at a time.<br>Your AI can sell a thousand, all at once.</h2>
<p class="body-lg" style="max-width: 760px; margin: 0 auto;">
  It's a cloned, automated version of you that works 24/7, pre-selling and qualifying leads so only ready buyers ever land on your calendar.
</p>
```

- [ ] **Step 3: Reorder slide 2 and the product-library cards**

Use this card order in both locations:

```text
AI Assessment
1-on-1 Service
AI Pocket Coach
```

Update slide 2 supporting copy to:

```html
<p class="body-lg" style="max-width: 640px; margin: 0 auto; text-wrap: pretty;">
  We build an AI version of you. It sells a $17 assessment, identifies the buyers ready for your highest level of service, and offers everyone else your $297/month AI Pocket Coach.
</p>
```

The Pocket Coach card description must include “Not ready for a call” so the downsell path is explicit.

- [ ] **Step 4: Keep slide 3 unchanged and replace slides 4 through 7 with one AI credibility slide**

Add marker:

```html
<!-- INTRO 1.3, Big-Name AI Credibility -->
```

Use four `.ai-proof-card` elements in a four-column grid and a four-item `.ai-proof-benefits` band. Remove the free-lead-magnet comparison, objection handler, niche list, and Sandra testimonial sections entirely.

- [ ] **Step 5: Add responsive CSS for the credibility slide**

```css
.ai-proof-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; width: 100%; }
.ai-proof-card { background: var(--white); border: 1px solid var(--al-100); border-radius: 16px; padding: 14px; box-shadow: var(--shadow-card); text-align: left; }
.ai-proof-card img { width: 100%; height: 112px; border-radius: 12px; object-fit: cover; object-position: center top; }
.ai-proof-benefits { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; width: 100%; }
@media (max-width: 900px) {
  .ai-proof-grid, .ai-proof-benefits { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ai-proof-card img { height: 140px; }
}
@media (max-width: 520px) {
  .ai-proof-grid, .ai-proof-benefits { grid-template-columns: 1fr; }
}
```

- [ ] **Step 6: Run pre-pitch tests and verify GREEN**

```powershell
node --test --test-name-pattern="opening|offer ladder|AI credibility" slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/slide3-logo-strip.test.mjs
```

Expected: all selected tests pass and all 6 slide 3 tests pass.

- [ ] **Step 7: Commit the pre-pitch**

```powershell
git add slides/deck.html slides/ai-proof slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: rebuild pitch deck opening"
```

### Task 3: Replace three phases with Build and Launch

**Files:**
- Modify: `slides/deck.html:2253-2966`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add failing Build and Launch tests**

```js
test('deck uses two stages and preserves the Build sequence', () => {
  assert.match(deck, /The Kodara System/);
  assert.match(deck, /Build and launch\./);
  assert.doesNotMatch(deck, /Build, launch, monetize\./i);
  ['Lucas Onboarding Call', 'Your Entry Level AI', 'Your AI Pocket Coach', 'Three products, all ready to launch', 'We prove it works before the world sees it']
    .forEach((copy) => assert.match(deck, new RegExp(copy)));
});

test('Launch contains authority branding plus organic and paid flows', () => {
  ['Personal branded website', 'Done-for-you posting', 'ManyChat comment and DM automation']
    .forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
  ['Content created', 'Content posted consistently', 'ManyChat starts the conversation', 'Lead enters the AI assessment and funnel']
    .forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
  ['Ads created and configured', 'Traffic reaches the funnel', 'Buyer completes the $17 assessment', 'remaining buyers receive the Pocket Coach offer']
    .forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
});

test('obsolete marketing and Monetize slides are removed', () => {
  ['Done-For-You Pipeline Activation', 'Phase 3 · Ascension', 'Back-End Ecosystem', 'How the AI upsells every lead']
    .forEach((copy) => assert.doesNotMatch(deck, new RegExp(copy, 'i')));
});
```

- [ ] **Step 2: Run the tests and verify RED**

```powershell
node --test --test-name-pattern="two stages|Launch contains|obsolete marketing" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the three-stage overview and old Launch and Monetize slides still exist.

- [ ] **Step 3: Convert the overview and offer summary to two stages**

Use two `.phase-col` cards with equal width:

```text
Build | 4 weeks | We build and prove your AI product on real clients.
Launch | 2 weeks | We build your authority system and turn on organic and paid acquisition.
```

- [ ] **Step 4: Preserve the seven approved Build slides**

Keep the Build cover, onboarding, entry-level AI, Pocket Coach, product library, test timeline, and validation demo. Change any residual phase numbering so every retained Build slide is labeled Phase 1 or Build.

- [ ] **Step 5: Replace the old Launch details with three approved slides**

Use these markers:

```html
<!-- Phase 2, Authority Branding Overview -->
<!-- Phase 2, Organic Launch Flow -->
<!-- Phase 2, Paid Ads Launch Flow -->
```

Reuse `.upsell-flow`, `.upsell-step`, and `.upsell-arrow` for both four-card flowcharts. Highlight the fourth organic step and third paid step with `.upsell-final`.

- [ ] **Step 6: Remove the full Monetize section and obsolete marketing slides**

Delete the old funnel detail, organic detail, pipeline activation, paid ads detail, combined funnel summary, Monetize cover, ascension, back-end ecosystem, and upsell-engine sections.

- [ ] **Step 7: Run tests and verify GREEN**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/slide3-logo-strip.test.mjs
```

Expected: all current pitch-deck tests and all 6 slide 3 tests pass.

- [ ] **Step 8: Commit Build and Launch**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: simplify deck to Build and Launch"
```

### Task 4: Rebuild the closing slides

**Files:**
- Modify: `slides/deck.html:2928-3192`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add failing closing tests**

```js
test('closing uses the logo stack and removes internal business numbers', () => {
  const closing = section('<!-- S11, Your Knowledge Becomes An Asset', '<!-- S10b, Payment Plans');
  assert.match(closing, /class="closing-logo-stack"/);
  ['Mayo Clinic', 'Johns Hopkins', 'HighLevel', 'Fidelity Investments', 'ServiceTitan', 'Tony Robbins', 'H&amp;R Block', 'Ramsey Solutions']
    .forEach((name) => assert.match(closing, new RegExp(name)));
  assert.match(closing, /ClickFunnels/);
  assert.doesNotMatch(closing, />\s*34\s*</);
  ['\\$612K\\+', 'APRIL – JUNE 2026', 'out of 1,000 leads with this exact same system']
    .forEach((copy) => assert.doesNotMatch(closing, new RegExp(copy, 'i')));
});

test('investment deliverables match the approved Build and Launch offer', () => {
  [
    'Lucas Onboarding Call', 'Done-For-You AI Build', 'Your AI Avatar', 'AI Sales Team',
    'Personal Branded Website', 'Done-For-You Posting', 'ManyChat Automation',
    'Done-For-You Funnel', 'Paid Ads Setup',
  ].forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
  assert.match(deck, /Requires at least \$5,000 in ad spend/);
  assert.match(deck, /\$6,800 ×3/);
});
```

- [ ] **Step 2: Add the final slide-count and order test**

```js
test('deck contains the approved 20 visible slides in order', () => {
  const visibleSlideStarts = [...deck.matchAll(/<div class="slide(?: [^"]*)?"(?![^>]*\shidden)[^>]*>/g)];
  assert.equal(visibleSlideStarts.length, 20);
  const orderedCopy = [
    'You can only sell one person at a time',
    'Meet the version of you that never stops selling',
    'Why our clients love the Kodara model',
    'The biggest experts are already turning their knowledge into AI',
    'Build and launch',
    "Your life's work finally working without you",
    'Your entire AI system, built and launched for you',
    'Two ways to pay',
  ];
  let cursor = -1;
  orderedCopy.forEach((copy) => {
    const next = deck.indexOf(copy, cursor + 1);
    assert.ok(next > cursor, `${copy} must appear in order`);
    cursor = next;
  });
});
```

- [ ] **Step 3: Run the tests and verify RED**

```powershell
node --test --test-name-pattern="closing|investment|20 visible" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the quote box, internal business numbers, old deliverables, and old visible slide count remain.

- [ ] **Step 4: Replace the green quote with a two-row logo stack**

Create `.closing-logo-stack` and reuse the nine approved embedded logo elements from slide 3. Use a 5-logo first row and 4-logo second row with the same grayscale opacity.

- [ ] **Step 5: Update investment deliverables and remove the business-results card**

Keep the $18,000 amount and six-month payment framing. Use the nine approved deliverables from the failing test. Delete the complete results card beneath the deliverables.

- [ ] **Step 6: Preserve payment options and guarantee**

Do not change the $18,000 pay-in-full option, $6,800 ×3 option, 1,000-assessment guarantee, or $5,000 ad-spend qualifier.

- [ ] **Step 7: Run all deck tests and verify GREEN**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/slide3-logo-strip.test.mjs
```

Expected: every test passes.

- [ ] **Step 8: Commit the closing**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: streamline pitch deck closing"
```

### Task 5: Responsive visual verification and final build

**Files:**
- Modify if required: `slides/deck.html`
- Modify if required: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Run the complete automated suite**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
```

Expected: all tests pass, Vite exits 0, and `git diff --check` prints nothing. The existing Vite warning about `app.js` lacking `type="module"` may remain because it predates this work.

- [ ] **Step 2: Start the local deck server**

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/slides/deck.html`.

- [ ] **Step 3: Inspect desktop at 1600 × 900**

Check all 20 visible slides. Confirm no clipped text, all four credibility images load, the flowcharts stay horizontal, the client logo strip is unchanged, and thumbnails show `01 / 20` through `20 / 20`.

- [ ] **Step 4: Inspect tablet at 900 × 900**

Confirm credibility cards form two columns, flowcharts stack without clipping, logo rows remain visible, and the closing logo stack fits.

- [ ] **Step 5: Inspect phone at 430 × 900**

Confirm all content is reachable vertically, no horizontal overflow occurs, credibility cards form one column, and all nine closing logos remain visible.

- [ ] **Step 6: Fix any visual defect test-first**

For each defect, add a focused failing assertion to `slides/tests/pitch-deck-tweaks.test.mjs`, verify it fails, make the smallest CSS or HTML correction, and rerun both test files.

- [ ] **Step 7: Run final verification and commit**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
node --test slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
git status --short
```

If visual corrections were required:

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "fix: polish responsive pitch deck layout"
```

Expected final state: clean working tree, 20 visible slides, all tests passing, successful build, and clean visual review at all three viewport widths.
