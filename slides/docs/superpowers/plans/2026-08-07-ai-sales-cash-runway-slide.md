# AI Sales Cash Runway Slide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a self-contained, design-system-aligned animated cash-runway comparison as the new visible slide 3 in `slides/deck.html`.

**Architecture:** Copy the two source SVG charts into the existing single-file deck and wrap them in one accessible slide using the deck's existing typography and color tokens. Drive drawing and label animations from the deck's existing `.slide.active` lifecycle, with static completed states for thumbnails, reduced motion, and animation failure. Protect the feature with a focused Node test that reads the current `deck.html` rather than archived deck versions.

**Tech Stack:** HTML5, scoped CSS, inline SVG, CSS keyframe animation, Node.js built-in test runner.

## Global Constraints

- Insert exactly one new visible slide immediately after `#client-wall-slide` and before `#real-problem-slide`.
- The new slide is visible slide 3; the deck contains 25 visible slides after the change.
- Preserve the 24-week illustration, $30K starting cash, $2K/week media spend, and four $10K high-ticket sales.
- Preserve the source accuracy disclaimer explaining illustrative end-of-week cash balance and 1x ROAS scope.
- Use native inline SVG only: no iframe, GitHub Pages dependency, source-repository JavaScript, external runtime asset, or new package.
- Use Instrument Serif for the headline, Instrument Sans for chart and supporting text, `--brand-950` for the self-funding line, and `--brand-50` or `--brand-100` for positive fill.
- Keep a restrained red only for traditional cash drawdowns and their negative closing label.
- Complete the comparison animation in approximately five seconds and restart it when the slide becomes active again.
- Render completed charts without animation in thumbnails and under `prefers-reduced-motion: reduce`.
- Fit without clipping or horizontal overflow at 1920x1080, 1280x720, 900x600, and 390x844.
- Do not address unrelated deck findings or alter other slide content in this feature.

---

### Task 1: Add the slide contract and accessible SVG markup

**Files:**
- Create: `slides/tests/deck-cash-runway.test.mjs`
- Modify: `slides/deck.html:3388-3402`
- Modify: `slides/deck.html:4401-4403`

**Interfaces:**
- Consumes: the existing `.slide`, `.label-tag`, `.h-lg`, `.rv`, `.d1` through `.d5`, `#client-wall-slide`, and `#real-problem-slide` deck conventions.
- Produces: `#cash-runway-slide`, `.cash-runway-layout`, `.cash-runway-grid`, `.cash-runway-panel`, `.cash-runway-path`, `.cash-runway-closing-label`, and two inline accessible SVGs for Task 2 to style and animate.

- [ ] **Step 1: Write the failing current-deck regression test**

Create `slides/tests/deck-cash-runway.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');
const cashStart = deck.indexOf('<!-- Cash Runway Comparison -->');
const cashEnd = deck.indexOf('<!-- INTRO 1.1, The Real Problem -->', cashStart);
const cashSlide = cashStart >= 0 && cashEnd > cashStart ? deck.slice(cashStart, cashEnd) : '';

function visibleSlideIds() {
  return [...deck.matchAll(/<div class="slide[^"]*"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\shidden(?:\s|=|>)/.test(tag))
    .map((tag) => tag.match(/\sid="([^"]+)"/)?.[1] ?? null);
}

test('cash runway is the new visible slide 3', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 25);
  assert.deepEqual(ids.slice(0, 4), [null, 'client-wall-slide', 'cash-runway-slide', 'real-problem-slide']);
  assert.ok(cashStart > deck.indexOf('id="client-wall-slide"'));
  assert.ok(cashEnd < deck.indexOf('id="real-problem-slide"') + 1);
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 25<\/div>/);
});

test('cash runway preserves the approved assumptions and takeaway', () => {
  assert.match(cashSlide, /The cash-flow problem/);
  assert.match(cashSlide, /Stop betting your cash on the next big sale\./);
  assert.match(cashSlide, /24-week illustration · \$30K start · \$2K\/week media · four \$10K high-ticket sales/);
  assert.match(cashSlide, /Traditional marketing/);
  assert.match(cashSlide, /Spend\. Wait\. Hope\./);
  assert.match(cashSlide, /Self-funding AI sales/);
  assert.match(cashSlide, /Recover\. Qualify\. Grow\./);
  assert.match(cashSlide, /Protect the baseline\. Let every high-ticket sale raise the floor\./);
  assert.match(cashSlide, /Illustrative end-of-week cash balance\./);
  assert.match(cashSlide, /processing fees, fulfillment, refunds, taxes, and cash-collection timing are excluded/);
});

test('cash runway is accessible and self-contained', () => {
  assert.match(cashSlide, /id="cash-runway-slide"[^>]*role="group"[^>]*aria-roledescription="slide"[^>]*aria-labelledby="cash-runway-title"/);
  assert.equal((cashSlide.match(/<svg\b/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<svg[^>]*role="img"/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<title>/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<desc>/g) ?? []).length, 2);
  assert.doesNotMatch(cashSlide, /<iframe\b/);
  assert.doesNotMatch(cashSlide, /(?:src|href)="https?:/);
});
```

- [ ] **Step 2: Run the test and verify the feature is absent**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: three failing tests because the cash-runway marker, slide, copy, SVGs, and `/ 25` counter do not exist.

- [ ] **Step 3: Insert the new slide markup after `#client-wall-slide`**

Add `<!-- Cash Runway Comparison -->` between the closing tag for `#client-wall-slide` and `<!-- INTRO 1.1, The Real Problem -->`. Use this exact surrounding structure:

```html
<!-- Cash Runway Comparison -->
<div class="slide slide--cash-runway" id="cash-runway-slide" role="group" aria-roledescription="slide" aria-labelledby="cash-runway-title">
  <div class="bg-orb bg-orb--green" style="top: -160px; right: -120px;" aria-hidden="true"></div>
  <div class="bg-orb bg-orb--neutral" style="bottom: -180px; left: -120px;" aria-hidden="true"></div>

  <div class="cash-runway-layout">
    <header class="cash-runway-header text-center">
      <div class="rv d1"><span class="label-tag">The cash-flow problem</span></div>
      <div class="rv d2"><h2 id="cash-runway-title" class="h-lg">Stop betting your cash on the next big sale.</h2></div>
      <p class="cash-runway-context rv d3">24-week illustration · $30K start · $2K/week media · four $10K high-ticket sales</p>
    </header>

    <section class="cash-runway-grid rv d4" aria-label="Cash-balance comparison">
      <div class="cash-runway-panel cash-runway-panel--traditional">
        <svg class="cash-runway-chart" viewBox="0 0 568 420" role="img" xmlns="http://www.w3.org/2000/svg">
          <title>Traditional marketing cash balance</title>
          <desc>Traditional marketing spends cash every week and depends on four irregular high-ticket sales to restore the balance.</desc>
        </svg>
      </div>
      <div class="cash-runway-divider" aria-hidden="true"></div>
      <div class="cash-runway-panel cash-runway-panel--self-funding">
        <svg class="cash-runway-chart" viewBox="0 0 568 420" role="img" xmlns="http://www.w3.org/2000/svg">
          <title>Self-funding AI sales cash balance</title>
          <desc>Self-funding AI sales protects the starting baseline while four high-ticket sales raise the cash floor.</desc>
        </svg>
      </div>
    </section>

    <p class="cash-runway-takeaway rv d5">Protect the baseline. Let every high-ticket sale raise the floor.</p>
    <p class="cash-runway-accuracy">Illustrative end-of-week cash balance. 1× ROAS refers to gross revenue divided by media spend; processing fees, fulfillment, refunds, taxes, and cash-collection timing are excluded.</p>
  </div>
</div>
```

Populate both SVGs from `lltv28/ai-sales-cash-runway/index.html` at commit `bef8ca23e656ab296aec795818ca2fe4fe6f7bd3`. Copy the chart geometry exactly:

- Traditional SVG: chart title/subtitle text, axes, `$30K start` baseline, `data-fill="capital-risk"`, all 24 `draw-on-entry` line segments, 25 weekly circles, four `data-sale-marker` groups, and the negative closing label.
- Self-funding SVG: chart title/subtitle text, axes, `$30K baseline`, `data-fill="retained-upside"`, the single `data-path="staircase"` path, 25 weekly circles, four `data-sale-marker` groups, and the positive closing label.
- Remove each source SVG's solid background `<rect>` so the deck background shows through.
- Replace source `font-family="Inter,Arial,sans-serif"` attributes with CSS classes from Task 2.
- Rename source `draw-on-entry` to `cash-runway-path` and retain each `pathLength="1"` and `style="--segment:N"` value.
- Add `cash-runway-path--loss` to declining traditional segments, `cash-runway-path--gain` to the four sale-rise segments, and `cash-runway-path--self-funding` to the staircase.
- Rename both source `closing-label` classes to `cash-runway-closing-label`; additionally add `cash-runway-closing-label--negative` or `cash-runway-closing-label--positive`.
- Add `cash-runway-fill cash-runway-fill--risk` to `data-fill="capital-risk"` and `cash-runway-fill cash-runway-fill--upside` to `data-fill="retained-upside"`.
- Add `cash-runway-axis`, `cash-runway-baseline`, `cash-runway-chart-title`, `cash-runway-chart-subtitle`, `cash-runway-axis-label`, `cash-runway-baseline-label`, and `cash-runway-sale-label` to their corresponding source elements.

Change the static counter markup from `/ 24` to `/ 25`. Do not modify the dynamic `total`, progress, or `goTo` calculations; they already derive their values from the visible slide collection.

- [ ] **Step 4: Run the focused test and verify the markup contract passes**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: all three tests pass.

- [ ] **Step 5: Commit the accessible slide structure**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "feat: add cash runway comparison slide"
```

---

### Task 2: Apply the deck design system, animation, and responsive states

**Files:**
- Modify: `slides/tests/deck-cash-runway.test.mjs`
- Modify: `slides/deck.html:3074-3279`

**Interfaces:**
- Consumes: the `cash-runway-*` markup classes from Task 1 and the deck's `.slide.active` navigation lifecycle.
- Produces: scoped design-system CSS, `cash-runway-draw`, `cash-runway-draw-staircase`, and `cash-runway-label-in` animations, static thumbnail state, and reduced-motion state.

- [ ] **Step 1: Extend the test with the styling and lifecycle contract**

Append to `slides/tests/deck-cash-runway.test.mjs`:

```js
test('cash runway uses scoped deck tokens and active-slide animation', () => {
  assert.match(deck, /\.slide--cash-runway\s*\{[^}]*zoom:\s*1\.15/s);
  assert.match(deck, /\.cash-runway-layout\s*\{/);
  assert.match(deck, /\.cash-runway-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)\s+1px\s+minmax\(0, 1fr\)/s);
  assert.match(deck, /\.cash-runway-path--self-funding\s*\{[^}]*stroke:\s*var\(--brand-950\)/s);
  assert.match(deck, /\.cash-runway-fill--upside\s*\{[^}]*fill:\s*var\(--brand-100\)/s);
  assert.match(deck, /\.slide--cash-runway\.active[^{]*\.cash-runway-path--loss/);
  assert.match(deck, /@keyframes cash-runway-draw/);
  assert.match(deck, /@keyframes cash-runway-draw-staircase/);
  assert.match(deck, /@keyframes cash-runway-label-in/);
});

test('cash runway has static thumbnail and reduced-motion fallbacks', () => {
  assert.match(deck, /\.thumb-clone \.cash-runway-path[^{]*\{[^}]*animation:\s*none\s*!important[^}]*stroke-dashoffset:\s*0\s*!important/s);
  assert.match(deck, /\.thumb-clone \.cash-runway-closing-label[^{]*\{[^}]*opacity:\s*1\s*!important/s);
  const reducedStart = deck.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedStart >= 0);
  const reducedWindow = deck.slice(reducedStart, reducedStart + 900);
  assert.match(reducedWindow, /cash-runway-path/);
  assert.match(reducedWindow, /cash-runway-closing-label/);
});

test('cash runway stacks without horizontal overflow on narrow screens', () => {
  assert.match(deck, /@media \(max-width: 700px\)[\s\S]*?\.cash-runway-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(deck, /@media \(max-width: 700px\)[\s\S]*?\.slide--cash-runway\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(deck, /\.cash-runway-chart\s*\{[^}]*width:\s*100%[^}]*height:\s*auto/s);
});
```

- [ ] **Step 2: Run the test and verify the CSS contract fails**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: the three new CSS tests fail because the scoped layout, animations, thumbnail state, and reduced-motion state are absent.

- [ ] **Step 3: Add the scoped layout and visual styling before the existing final responsive block**

Add these exact layout values and selectors before the existing `@media (max-width: 700px)` block near the end of the stylesheet:

```css
.slide--cash-runway { zoom: 1.15; }
.cash-runway-layout {
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.cash-runway-header { display: flex; flex-direction: column; gap: 6px; }
.cash-runway-header .h-lg { font-size: clamp(30px, 3.2vw, 44px); }
.cash-runway-context {
  color: var(--al-400);
  font-family: var(--font);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.cash-runway-grid {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  align-items: stretch;
  gap: 20px;
}
.cash-runway-divider { width: 1px; background: var(--al-100); }
.cash-runway-panel { min-width: 0; border-radius: 16px; background: rgba(255,255,255,.7); }
.cash-runway-panel--self-funding { background: var(--brand-50); }
.cash-runway-chart { display: block; width: 100%; height: auto; overflow: visible; }
.cash-runway-chart text { font-family: var(--font); font-variation-settings: var(--fvs); }
.cash-runway-chart-title { fill: var(--al-900); font-size: 20px; font-weight: 700; }
.cash-runway-chart-subtitle { fill: var(--al-400); font-size: 11px; }
.cash-runway-axis { fill: none; stroke: var(--al-200); stroke-width: 1.5; }
.cash-runway-baseline { stroke: var(--al-100); stroke-dasharray: 5 7; }
.cash-runway-axis-label,
.cash-runway-baseline-label,
.cash-runway-sale-label { fill: var(--al-400); font-size: 9px; }
.cash-runway-fill--risk { fill: rgba(201, 90, 94, .14); }
.cash-runway-fill--upside { fill: var(--brand-100); }
.cash-runway-path { fill: none; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.cash-runway-path--loss { stroke: #C95A5E; }
.cash-runway-path--gain { stroke: var(--brand-950); }
.cash-runway-path--self-funding { stroke: var(--brand-950); stroke-width: 7; stroke-linejoin: round; }
.cash-runway-closing-label { opacity: 1; font-size: 16px; font-weight: 700; }
.cash-runway-closing-label--negative { fill: #A7474B; }
.cash-runway-closing-label--positive { fill: var(--brand-950); }
.cash-runway-takeaway { color: var(--al-900); font-size: 18px; font-weight: 700; text-align: center; }
.cash-runway-accuracy { max-width: 820px; color: var(--al-300); font-size: 8px; line-height: 1.4; text-align: center; }
```

- [ ] **Step 4: Add entry animation, thumbnail state, and reduced-motion state**

Add:

```css
.slide--cash-runway.active .cash-runway-path--loss,
.slide--cash-runway.active .cash-runway-path--gain {
  animation: cash-runway-draw .22s ease-out calc(.1s + var(--segment) * .09s) both;
}
.slide--cash-runway.active .cash-runway-path--self-funding {
  animation: cash-runway-draw-staircase 3.7s ease-out .75s both;
}
.slide--cash-runway.active .cash-runway-closing-label {
  animation: cash-runway-label-in .45s ease-out 4.45s both;
}
@keyframes cash-runway-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes cash-runway-draw-staircase { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes cash-runway-label-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.thumb-clone .cash-runway-path { animation: none !important; stroke-dashoffset: 0 !important; }
.thumb-clone .cash-runway-closing-label { animation: none !important; opacity: 1 !important; transform: none !important; }

@media (prefers-reduced-motion: reduce) {
  .cash-runway-path { animation: none !important; stroke-dashoffset: 0 !important; }
  .cash-runway-closing-label { animation: none !important; opacity: 1 !important; transform: none !important; }
}
```

Because the existing `goTo` function removes `.active` from the old slide and adds it to the new slide on every visit, these selectors restart without a new JavaScript controller.

- [ ] **Step 5: Add the exact narrow-screen layout**

Extend the existing `@media (max-width: 700px)` block with:

```css
.slide--cash-runway { overflow-y: auto; align-items: flex-start; padding-top: 42px; padding-bottom: 72px; }
.cash-runway-layout { gap: 16px; }
.cash-runway-grid { grid-template-columns: 1fr; gap: 14px; }
.cash-runway-divider { width: 100%; height: 1px; }
.cash-runway-header .h-lg { font-size: clamp(28px, 8vw, 38px); }
.cash-runway-context { max-width: 320px; line-height: 1.5; }
.cash-runway-takeaway { font-size: 16px; }
.cash-runway-accuracy { font-size: 8px; }
```

Also add a `@media (min-width: 701px) and (max-height: 700px)` block that reduces the header-to-chart gaps without changing chart geometry:

```css
@media (min-width: 701px) and (max-height: 700px) {
  .cash-runway-layout { gap: 6px; }
  .cash-runway-header { gap: 3px; }
  .cash-runway-header .h-lg { font-size: 32px; }
  .cash-runway-grid { max-width: 980px; }
  .cash-runway-takeaway { font-size: 16px; }
}
```

- [ ] **Step 6: Run the focused tests and verify all six pass**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: six passing tests.

- [ ] **Step 7: Commit the design-system integration**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "style: align cash runway slide with deck"
```

---

### Task 3: Verify navigation, animation restart, thumbnails, and responsive fit

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/tests/deck-cash-runway.test.mjs`
- Modify only if verification finds a defect: `slides/deck.html`

**Interfaces:**
- Consumes: the completed slide and stylesheet from Tasks 1 and 2.
- Produces: browser-verified behavior across the required viewports and a final regression-test result.

- [ ] **Step 1: Run the focused test and the repository test suite**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected:

- The new focused test has six passing tests.
- The repository suite has no new failures.
- The pre-existing `the July deck remains available and the previous deck stays archived` checksum failure may remain; do not change archived decks as part of this feature.

- [ ] **Step 2: Start a temporary local server and open slide 3**

Run from `slides/`:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/deck.html?slide=3` with the in-app browser workflow. Confirm the counter reads `03 / 25`, exactly one main slide is active, and the active slide is `#cash-runway-slide`.

- [ ] **Step 3: Verify desktop and laptop fit**

At 1920x1080 and 1280x720, inspect the active slide's bounding boxes and a screenshot. Confirm:

- Headline, both complete charts, takeaway, disclaimer, progress bar, and counter are visible.
- Neither chart label nor closing label collides with its path or sale markers.
- The active slide's `scrollWidth` equals `clientWidth`.
- No meaningful child content extends above or below the deck viewport.

- [ ] **Step 4: Verify landscape tablet and mobile fit**

At 900x600, confirm the two-column comparison fits without clipping. At 390x844, confirm the charts stack, the slide scrolls vertically, and document-level horizontal overflow is absent.

- [ ] **Step 5: Verify animation restart and static thumbnail behavior**

On slide 3:

1. Observe the traditional segments and self-funding staircase drawing, followed by both closing labels within about five seconds.
2. Navigate to slide 4 and back to slide 3; confirm the animation restarts from the beginning.
3. Inspect thumbnail 3; confirm both graph lines and closing labels are visible immediately and do not animate.

- [ ] **Step 6: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`, reload `?slide=3`, and confirm both graphs and labels are immediately complete with no animation.

- [ ] **Step 7: Correct only verified slide-specific defects and rerun checks**

If any required viewport clips, adjust only `.slide--cash-runway`, `.cash-runway-layout`, `.cash-runway-grid`, or the scoped responsive rules. If a chart label collides, adjust only the corresponding SVG text position. Repeat Steps 1 through 6 after every correction.

- [ ] **Step 8: Commit verification fixes if any were required**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "fix: polish cash runway slide responsiveness"
```

If verification requires no correction, do not create an empty commit.
