# Cash Runway Transaction Ledgers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add matching one-week transaction ledgers beneath the two cash-runway graphs so the slide shows how four $500 Facebook Ads charges consume cash traditionally but are recovered by front-end sales in the self-funding model.

**Architecture:** Keep the feature self-contained inside the existing `cash-runway-slide`. Add semantic HTML tables directly after each inline SVG, style them only through `.slide--cash-runway` selectors, and reuse the current two-column/mobile-stack layout. Preserve all graph data and animation behavior; the new tables are static content that stays visible in thumbnails and reduced-motion mode.

**Tech Stack:** Self-contained HTML5, scoped CSS, native inline SVG already present in the deck, Node.js built-in test runner.

## Global Constraints

- Modify only `slides/deck.html` and `slides/tests/deck-cash-runway.test.mjs` during implementation.
- Use four visible `Facebook Ads` charges of `−$500` in each ledger.
- Use `Front-end sales —` and `Weekly cash movement −$2,000` on the traditional side.
- Use `Front-end sales +$2,000` and `Weekly cash movement $0` on the self-funding side.
- Keep the existing graph data, +$10,000 high-ticket sale markers, headline, assumptions, takeaway, accuracy note, narrative position, and 24-slide count unchanged.
- Do not add external images, logos, fonts, scripts, network requests, dependencies, or iframes.
- Preserve keyboard navigation, graph animation restart, static thumbnails, reduced-motion behavior, and mobile vertical scrolling.
- Prevent horizontal overflow at desktop, tablet, and mobile widths.
- Keep all new component selectors scoped to `.slide--cash-runway` or `.thumb-clone .slide--cash-runway`.

## File Structure

- Modify `slides/deck.html`: add both semantic ledgers, base ledger styling, responsive rules, and the small graph-height adjustment needed to fit the new content.
- Modify `slides/tests/deck-cash-runway.test.mjs`: add content, semantics, value, scoping, and responsive regression coverage for the ledgers.

---

### Task 1: Add the semantic weekly ledgers

**Files:**
- Modify: `slides/tests/deck-cash-runway.test.mjs:9-46,64-105`
- Modify: `slides/deck.html:3206-3274,3525-3561`

**Interfaces:**
- Consumes: the existing `cashSlide` source slice and `cashRunwaySelectors()` helper in `slides/tests/deck-cash-runway.test.mjs`.
- Produces: `.cash-runway-ledger`, `.cash-runway-ledger--traditional`, `.cash-runway-ledger--self-funding`, `data-transaction`, and `data-amount` markup used by Task 2 and visual verification.

- [ ] **Step 1: Add helpers that isolate each comparison panel**

Add below `cashSlide`:

```js
function cashPanel(startMarker, endMarker) {
  const start = cashSlide.indexOf(startMarker);
  const end = cashSlide.indexOf(endMarker, start);
  return start >= 0 && end > start ? cashSlide.slice(start, end) : '';
}

const traditionalPanel = cashPanel(
  'cash-runway-panel cash-runway-panel--traditional',
  '<div class="cash-runway-divider"',
);
const selfFundingPanel = cashPanel(
  'cash-runway-panel cash-runway-panel--self-funding',
  '</section>',
);
```

- [ ] **Step 2: Write the failing ledger content and semantics test**

Add after `cash runway preserves the approved assumptions and takeaway`:

```js
test('cash runway pairs each graph with an accessible one-week transaction ledger', () => {
  assert.equal((cashSlide.match(/<table class="cash-runway-ledger/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<caption>One illustrative week<\/caption>/g) ?? []).length, 2);

  for (const panel of [traditionalPanel, selfFundingPanel]) {
    assert.match(panel, /<table class="cash-runway-ledger/);
    assert.match(panel, /<tbody>/);
    assert.match(panel, /<tfoot>/);
    assert.equal((panel.match(/data-transaction="facebook-ads" data-amount="-500"/g) ?? []).length, 4);
    assert.equal((panel.match(/>Facebook Ads</g) ?? []).length, 4);
    assert.equal((panel.match(/>−\$500</g) ?? []).length, 4);
    assert.match(panel, /<th scope="row"/);
  }

  assert.match(traditionalPanel, /data-transaction="front-end-sales" data-amount="0"/);
  assert.match(traditionalPanel, />Front-end sales</);
  assert.match(traditionalPanel, />—</);
  assert.match(traditionalPanel, /data-total="weekly-cash-movement" data-amount="-2000"/);
  assert.match(traditionalPanel, />Weekly cash movement</);
  assert.match(traditionalPanel, />−\$2,000</);

  assert.match(selfFundingPanel, /data-transaction="front-end-sales" data-amount="2000"/);
  assert.match(selfFundingPanel, />\+\$2,000</);
  assert.match(selfFundingPanel, /data-total="weekly-cash-movement" data-amount="0"/);
  assert.match(selfFundingPanel, />\$0</);
});
```

- [ ] **Step 3: Run the focused test and confirm RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: the new ledger test fails because no `.cash-runway-ledger` tables exist; the pre-existing cash-runway tests still pass.

- [ ] **Step 4: Add one semantic ledger after each graph SVG**

Insert this structure after the traditional SVG, before its panel closes:

```html
<table class="cash-runway-ledger cash-runway-ledger--traditional" aria-label="Traditional marketing illustrative weekly transactions">
  <caption>One illustrative week</caption>
  <tbody>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="front-end-sales" data-amount="0"><th scope="row">Front-end sales</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--empty">—</td></tr>
  </tbody>
  <tfoot>
    <tr data-total="weekly-cash-movement" data-amount="-2000"><th scope="row">Weekly cash movement</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$2,000</td></tr>
  </tfoot>
</table>
```

Insert the same structure after the self-funding SVG with these exact differences:

```html
<table class="cash-runway-ledger cash-runway-ledger--self-funding" aria-label="Self-funding AI sales illustrative weekly transactions">
  <caption>One illustrative week</caption>
  <tbody>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="facebook-ads" data-amount="-500"><th scope="row">Facebook Ads</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--debit">−$500</td></tr>
    <tr data-transaction="front-end-sales" data-amount="2000"><th scope="row">Front-end sales</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--credit">+$2,000</td></tr>
  </tbody>
  <tfoot>
    <tr data-total="weekly-cash-movement" data-amount="0"><th scope="row">Weekly cash movement</th><td class="cash-runway-ledger-amount cash-runway-ledger-amount--neutral">$0</td></tr>
  </tfoot>
</table>
```

- [ ] **Step 5: Add the base panel and ledger styling**

Extend the cash-runway CSS block with:

```css
.slide--cash-runway .cash-runway-panel {
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(255,255,255,.7);
}
.slide--cash-runway .cash-runway-chart { flex: 0 0 auto; }
.slide--cash-runway .cash-runway-ledger {
  width: calc(100% - 40px);
  margin: -2px 20px 18px;
  border: 1px solid var(--al-100);
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  background: rgba(255,255,255,.82);
  color: var(--al-700);
  font-family: var(--font);
  font-size: 11px;
  line-height: 1.2;
  overflow: hidden;
}
.slide--cash-runway .cash-runway-ledger caption {
  padding: 8px 12px 7px;
  color: var(--al-400);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .08em;
  text-align: left;
  text-transform: uppercase;
}
.slide--cash-runway .cash-runway-ledger th,
.slide--cash-runway .cash-runway-ledger td {
  padding: 5px 12px;
  border-top: 1px solid var(--al-100);
}
.slide--cash-runway .cash-runway-ledger th { font-weight: 600; text-align: left; }
.slide--cash-runway .cash-runway-ledger td { font-variant-numeric: tabular-nums; text-align: right; }
.slide--cash-runway .cash-runway-ledger tfoot th,
.slide--cash-runway .cash-runway-ledger tfoot td {
  padding-block: 8px;
  color: var(--al-900);
  font-size: 12px;
  font-weight: 800;
}
.slide--cash-runway .cash-runway-ledger-amount--debit { color: #A7474B; }
.slide--cash-runway .cash-runway-ledger-amount--credit { color: var(--brand-950); font-weight: 800; }
.slide--cash-runway .cash-runway-ledger-amount--empty { color: var(--al-300); }
.slide--cash-runway .cash-runway-ledger--self-funding tfoot td { color: var(--brand-950); }
```

If `border-radius` clipping on a collapsed table is inconsistent in the target browser, keep `border-collapse: separate` and `border-spacing: 0`; do not add wrapper markup.

- [ ] **Step 6: Slightly shorten both SVG viewports without changing graph data**

Change both chart roots from:

```html
viewBox="0 0 568 420"
```

to:

```html
viewBox="0 0 568 405"
```

Do not edit any path, circle, marker, label, or animation data. The lowest existing text is at `y="392"`, so the 405-unit viewport retains it while removing unused bottom space.

- [ ] **Step 7: Run the focused test and confirm GREEN**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: all focused cash-runway tests pass.

- [ ] **Step 8: Commit the semantic ledger implementation**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "feat: add cash runway transaction ledgers"
```

---

### Task 2: Lock responsive legibility and fit

**Files:**
- Modify: `slides/tests/deck-cash-runway.test.mjs:117-201`
- Modify: `slides/deck.html:3281-3310`

**Interfaces:**
- Consumes: the ledger class names and panel markup from Task 1.
- Produces: explicit tablet/mobile ledger sizing and test-enforced minimum mobile type sizes.

- [ ] **Step 1: Write the failing responsive ledger test**

Add after `cash runway stacks without horizontal overflow on narrow screens`:

```js
test('cash runway ledgers preserve aligned rows and mobile legibility', () => {
  const baseLedgerRule = cssRuleBody(deck, '.slide--cash-runway .cash-runway-ledger');
  assert.match(baseLedgerRule, /width:\s*calc\(100% - 40px\)/);
  assert.match(baseLedgerRule, /font-size:\s*11px/);

  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileEnd = deck.indexOf('@media (min-width: 701px)', mobileStart);
  const mobileCss = deck.slice(mobileStart, mobileEnd);
  const mobileLedgerRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-ledger');

  assert.match(mobileLedgerRule, /width:\s*calc\(100% - 24px\)/);
  assert.match(mobileLedgerRule, /margin:\s*0 12px 14px/);
  assert.ok(cssPixelValue(mobileLedgerRule, 'font-size') >= 13);
  assert.match(
    mobileCss,
    /\.slide--cash-runway \.cash-runway-ledger th,\s*\.slide--cash-runway \.cash-runway-ledger td\s*\{[^}]*padding:\s*7px 10px/s,
  );
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: only the new mobile ledger assertions fail because the mobile overrides do not exist.

- [ ] **Step 3: Add mobile ledger overrides inside the existing 700px media query**

Add after the existing `.cash-runway-accuracy` rule so the current graph-annotation rules and their regression-test window remain undisturbed:

```css
.slide--cash-runway .cash-runway-ledger {
  width: calc(100% - 24px);
  margin: 0 12px 14px;
  font-size: 13px;
}
.slide--cash-runway .cash-runway-ledger caption { padding: 10px; font-size: 11px; }
.slide--cash-runway .cash-runway-ledger th,
.slide--cash-runway .cash-runway-ledger td { padding: 7px 10px; }
.slide--cash-runway .cash-runway-ledger tfoot th,
.slide--cash-runway .cash-runway-ledger tfoot td { padding-block: 9px; font-size: 14px; }
```

Do not change the existing mobile grid, scrolling, graph annotation, or navigation CSS.

- [ ] **Step 4: Add a short-viewport ledger adjustment**

Inside the existing `@media (min-width: 701px) and (max-height: 700px)` block, add:

```css
.slide--cash-runway .cash-runway-ledger {
  margin-bottom: 10px;
  font-size: 10px;
}
.slide--cash-runway .cash-runway-ledger caption { padding-block: 6px; }
.slide--cash-runway .cash-runway-ledger th,
.slide--cash-runway .cash-runway-ledger td { padding-block: 4px; }
.slide--cash-runway .cash-runway-ledger tfoot th,
.slide--cash-runway .cash-runway-ledger tfoot td { padding-block: 6px; }
```

This adjustment applies only to short desktop/tablet viewports; the 13px mobile minimum remains unchanged.

- [ ] **Step 5: Run the focused test and confirm GREEN**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
```

Expected: all focused cash-runway tests pass.

- [ ] **Step 6: Commit responsive support**

```bash
git add slides/deck.html slides/tests/deck-cash-runway.test.mjs
git commit -m "fix: keep cash runway ledgers responsive"
```

---

### Task 3: Verify rendered behavior and the full deck

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/tests/deck-cash-runway.test.mjs`

**Interfaces:**
- Consumes: the complete slide implementation from Tasks 1 and 2.
- Produces: fresh automated and browser evidence that the slide is readable, responsive, navigable, and regression-safe.

- [ ] **Step 1: Run the focused and full automated suites**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-cash-runway.test.mjs
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: the focused suite passes. In the full suite, report the exact pass/fail count; if the known archived-July checksum mismatch is the sole failure, identify it as pre-existing rather than claiming a clean suite.

- [ ] **Step 2: Open the cash-runway slide and inspect four viewport sizes**

Open `slides/deck.html?slide=4` and inspect at:

- 1920×1080
- 1280×720
- 900×600
- 390×844

At every size confirm:

- each ledger remains directly below its matching graph;
- both desktop ledgers have equal row heights and aligned totals;
- all `Facebook Ads`, `Front-end sales`, and amount labels are fully visible;
- graph labels, sale markers, closing labels, takeaway, and accuracy note remain visible;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth`;
- the active slide does not horizontally overflow;
- mobile vertical scrolling reaches the final accuracy note.

- [ ] **Step 3: Verify navigation, animation, thumbnails, and reduced motion**

- Press ArrowRight to leave slide 4 and ArrowLeft to return; confirm both graph animations restart and the ledgers remain static.
- Open the thumbnail navigator and confirm both ledgers render as static content without clipping or animation artifacts.
- Verify the existing `prefers-reduced-motion` rule still disables graph animation while both ledgers remain fully visible.
- On the 390×844 viewport, confirm ArrowDown scrolls within the slide and ArrowRight advances to the next slide.

- [ ] **Step 4: Use test-first debugging for any rendered defect**

If any check fails, stop, reproduce the exact failure, add the smallest focused regression assertion to `slides/tests/deck-cash-runway.test.mjs`, confirm it fails, make one scoped CSS/HTML correction, and rerun the focused plus full suites before repeating the browser checks.

- [ ] **Step 5: Verify the final diff and repository state**

Run:

```bash
git diff --check origin/master...HEAD
git diff --stat origin/master...HEAD
git status --short --branch
```

Expected: no whitespace errors; only the approved spec, plan, `slides/deck.html`, and `slides/tests/deck-cash-runway.test.mjs` differ from `origin/master`; the worktree is clean after any final corrective commit.
