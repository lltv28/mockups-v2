# Cash Runway Chart Size Adjustment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase both cash-runway chart panels on visible slide 3 by 15% where the viewport permits, cap the increase safely at tablet width, and preserve the current mobile layout.

**Architecture:** Keep the existing SVG markup and chart geometry unchanged. Enlarge the scoped two-column grid with percentage width and symmetric negative inline margins, cap it edge-to-edge inside the existing 900px breakpoint, then reset it inside the 700px mobile breakpoint. Protect the behavior with a source-level regression test and rendered viewport measurements.

**Tech Stack:** Static HTML, scoped CSS, native inline SVG, Node.js built-in test runner, in-app browser viewport verification.

## Global Constraints

- Expand the two-column `.cash-runway-grid` to 115% of its current rendered width and keep it centered within the slide.
- Raise its desktop maximum width from 1080px to 1242px, which is exactly 15% larger.
- From 701px through 900px, cap the grid at the slide edges by adding back the existing 28px horizontal padding on each side; this yields approximately 7% larger panels at 900×600 without clipping.
- At 700px and below, retain the current stacked, 100%-wide layout.
- Preserve the original chart geometry, assumptions, copy, colors, animation, and accessible SVG structure.
- Keep all new sizing rules scoped to `.slide--cash-runway`.
- Do not change other slides or archived decks.
- Do not introduce horizontal scrolling or label/path/marker collisions.
- Keep thumbnail and reduced-motion behavior unchanged.
- The repository has one documented pre-existing full-suite failure: the July archived-deck checksum mismatch in `slides/tests/pitch-deck-tweaks.test.mjs`. Do not modify archived decks or its checksum fixture.

## File Structure

- `slides/deck.html`: owns the cash-runway slide markup, scoped layout CSS, responsive rules, and deck runtime. Modify only the cash-runway grid sizing declarations.
- `slides/tests/deck-cash-runway.test.mjs`: owns static contract tests for the new slide. Add one focused regression test for wide-desktop growth, the tablet cap, and the mobile reset.

---

### Task 1: Enlarge both cash-runway chart panels responsively

**Files:**
- Modify: `slides/tests/deck-cash-runway.test.mjs`
- Modify: `slides/deck.html:3293-3300`
- Modify: `slides/deck.html:3350-3358`

**Interfaces:**
- Consumes: the existing `.slide--cash-runway .cash-runway-layout`, `.cash-runway-grid`, `@media (max-width: 900px)`, and `@media (max-width: 700px)` CSS boundaries.
- Produces: a wide-desktop grid whose rendered width is `1.15 ×` its parent layout width up to `1242px`, an edge-to-edge grid from 701px through 900px, and a mobile grid whose width and inline margins return to `100%` and `0`.

- [ ] **Step 1: Add the failing sizing contract**

Append this test to `slides/tests/deck-cash-runway.test.mjs`:

```js
test('cash runway chart panels enlarge where room permits and cap safely on tablets', () => {
  const gridRule = cssRuleBody(deck, '.slide--cash-runway .cash-runway-grid');
  assert.match(gridRule, /width:\s*115%/);
  assert.match(gridRule, /max-width:\s*1242px/);
  assert.match(gridRule, /margin-inline:\s*-7\.5%/);

  const tabletStart = deck.lastIndexOf('@media (max-width: 900px)');
  const tabletEnd = deck.indexOf('@media (max-width: 700px)', tabletStart);
  const tabletCss = deck.slice(tabletStart, tabletEnd);
  const tabletGridRule = cssRuleBody(tabletCss, '.slide--cash-runway .cash-runway-grid');
  assert.match(tabletGridRule, /width:\s*calc\(100% \+ 56px\)/);
  assert.match(tabletGridRule, /max-width:\s*calc\(100% \+ 56px\)/);
  assert.match(tabletGridRule, /margin-inline:\s*-28px/);

  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileEnd = deck.indexOf('@media (min-width: 701px)', mobileStart);
  const mobileCss = deck.slice(mobileStart, mobileEnd);
  const mobileGridRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-grid');
  assert.match(mobileGridRule, /width:\s*100%/);
  assert.match(mobileGridRule, /max-width:\s*100%/);
  assert.match(mobileGridRule, /margin-inline:\s*0/);
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: the sizing test fails because the 701–900px tablet cap is not implemented yet.

- [ ] **Step 3: Add the minimal scoped desktop/tablet sizing**

Change the existing grid rule in `slides/deck.html` to:

```css
.slide--cash-runway .cash-runway-grid {
  width: 115%;
  max-width: 1242px;
  margin-inline: -7.5%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  align-items: stretch;
  gap: 20px;
}
```

The negative margins center a box that is 15% wider without using `transform`, which would conflict with the existing `.rv` reveal animation.

- [ ] **Step 4: Cap width at the existing tablet breakpoint**

Add this rule inside the existing `@media (max-width: 900px)` block:

```css
.slide--cash-runway .cash-runway-grid {
  width: calc(100% + 56px);
  max-width: calc(100% + 56px);
  margin-inline: -28px;
}
```

The 56px expansion exactly recovers the existing 28px slide padding on both sides, preventing the 35px-per-side clipping measured with an uncapped 115% grid at 900×600.

- [ ] **Step 5: Reset width and margins at the existing mobile breakpoint**

Change the mobile grid rule inside `@media (max-width: 700px)` to:

```css
.slide--cash-runway .cash-runway-grid {
  width: 100%;
  max-width: 100%;
  margin-inline: 0;
  grid-template-columns: 1fr;
  gap: 14px;
}
```

- [ ] **Step 6: Run the focused test and confirm GREEN**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: 10 tests pass and 0 fail.

- [ ] **Step 7: Run the full slide suite**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: no new failures. The only permitted failure is the documented July archived-deck checksum mismatch; its actual and expected hashes must be unchanged from baseline.

- [ ] **Step 8: Verify rendered sizing and containment**

Serve `slides/` locally:

```bash
cd slides
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/deck.html?slide=3` and inspect at 1920×1080, 1280×720, 900×600, and 390×844. At each viewport, collect:

```js
(() => {
  const slide = document.querySelector('#cash-runway-slide');
  const layout = slide.querySelector('.cash-runway-layout');
  const grid = slide.querySelector('.cash-runway-grid');
  const panels = [...slide.querySelectorAll('.cash-runway-panel')];
  return {
    counter: document.querySelector('#counter')?.innerText,
    ratio: grid.getBoundingClientRect().width / layout.getBoundingClientRect().width,
    gridWidth: grid.getBoundingClientRect().width,
    panelWidths: panels.map((panel) => panel.getBoundingClientRect().width),
    slideWidth: [slide.clientWidth, slide.scrollWidth],
    documentWidth: [document.documentElement.clientWidth, document.documentElement.scrollWidth],
  };
})()
```

Expected:

- 1920×1080 and 1280×720: `ratio` is approximately `1.15`, both panel widths are equal, `03 / 25` is shown, and client/scroll widths match for both slide and document.
- 900×600: the grid aligns with both slide edges, both panel widths are approximately 7% larger than baseline, and no clipping or horizontal overflow occurs.
- 390×844: `ratio` is approximately `1`, both charts remain stacked, and client/scroll widths match horizontally.
- At all viewports: chart titles, annotations, closing labels, paths, and sale markers remain visible without collisions. Keyboard navigation, entry animation, thumbnail rendering, and reduced-motion declarations remain unchanged.

- [ ] **Step 9: Inspect the final diff**

Run:

```bash
git diff --check
git diff -- slides/deck.html slides/tests/deck-cash-runway.test.mjs
```

Expected: no whitespace errors; only the scoped cash-runway grid declarations and one focused regression test changed.

- [ ] **Step 10: Commit the implementation**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "style: enlarge cash runway charts"
```
