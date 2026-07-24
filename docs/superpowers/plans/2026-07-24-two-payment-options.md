# Two Payment Options Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the 3-Pay card from the final pricing slide and present the remaining financing and pay-in-full choices as a centered two-card layout.

**Architecture:** Update the existing payment-slide regression tests first. Then remove the middle card, change the heading, and tighten the shared payment grid while preserving the existing card and mobile styles. Keep `slides/deck.html` and `slides/deck-july-2026.html` identical.

**Tech Stack:** HTML, CSS, Node test runner, Vite

---

### Task 1: Define the two-option behavior with failing tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:513-605`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Remove the obsolete 3-Pay assertion from the investment test**

Delete this assertion because the 3-Pay price no longer belongs in the deck:

```js
assert.match(deck, /\$7,000<span style="font-size: 14px; color: var\(--al-500\); font-weight: 400;"> ×3<\/span>/);
```

- [ ] **Step 2: Replace the three-option pricing test**

Replace the existing pricing test with:

```js
test('pricing presents the approved standard investment and two payment options', () => {
  const investment = section('<!-- S10a, The Investment', '<!-- S10b, Payment Plans');
  const paymentOptions = section('<!-- S10b, Payment Plans', '<!-- Video Modal -->');

  assert.match(investment, />Standard Investment<\/div>\s*<div[^>]*>\$21,000<\/div>/);
  assert.match(investment, />for your six-month build and launch program<\/div>/);

  assert.match(paymentOptions, />Two ways to pay\.<\/h2>/);
  assertInOrder(paymentOptions, [
    '>Financing Partner</div>',
    '>$21,000</div>',
    '>~$1,500/month</div>',
    '>Pay In Full</div>',
    '>$18,000</div>',
    '>Card or wire</div>',
  ], 'payment option order');
  assert.equal((paymentOptions.match(/class="payment-option-card"/g) ?? []).length, 2);
  assert.doesNotMatch(paymentOptions, /Three ways to pay|3-Pay|\$7,000|×3|\$6,800|\$20,400/);
});
```

- [ ] **Step 3: Update the layout assertion**

Replace the desktop grid and card-count assertions with:

```js
assert.match(deck, /\.payment-options-grid \{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);[^}]*max-width: 500px;[^}]*\}/s);
assert.equal((deck.match(/class="payment-option-card"/g) ?? []).length, 2);
```

Keep the existing mobile assertion unchanged.

- [ ] **Step 4: Update the compact-card counts**

Use:

```js
assert.equal((paymentOptions.match(/class="payment-option-card"/g) ?? []).length, 2);
assert.equal((paymentOptions.match(/margin-top: 8px/g) ?? []).length, 2);
```

- [ ] **Step 5: Update the neutral-card wrapper count**

Use:

```js
assert.equal(
  (paymentOptions.match(/class="payment-option-card">\s*<div class="payment-option-card__center">/g) ?? []).length,
  2,
);
```

- [ ] **Step 6: Update the visible-slide order fixture**

In the `orderedCopy` array, replace:

```js
'Three ways to pay',
```

With:

```js
'Two ways to pay',
```

- [ ] **Step 7: Run the focused test and confirm failure**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the HTML still says “Three ways to pay,” includes the 3-Pay card, and uses a three-column grid.

- [ ] **Step 8: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: define two payment options"
```

### Task 2: Implement the two-card pricing slide

**Files:**
- Modify: `slides/deck.html:1334-1342`
- Modify: `slides/deck.html:3038-3078`
- Modify: `slides/deck-july-2026.html`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Tighten the desktop payment grid**

Change the payment grid to:

```css
.payment-options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding-top: 8px;
}
```

- [ ] **Step 2: Change the pricing-slide heading**

Replace:

```html
<h2 class="h-lg">Three ways to pay.</h2>
```

With:

```html
<h2 class="h-lg">Two ways to pay.</h2>
```

- [ ] **Step 3: Remove the 3-Pay card**

Delete this full block:

```html
<!-- 3-Pay -->
<div class="payment-option-card">
  <div class="payment-option-card__center">
    <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--al-500);">3-Pay</div>
    <div style="font-family: var(--font-hero); font-size: 30px; font-weight: 700; color: var(--al-900); letter-spacing: -0.5px; margin-top: 8px;">$7,000<span style="font-size: 14px; color: var(--al-500); font-weight: 400;"> ×3</span></div>
  </div>
</div>
```

- [ ] **Step 4: Synchronize the versioned deck**

Run:

```powershell
Copy-Item -LiteralPath slides/deck.html -Destination slides/deck-july-2026.html -Force
```

Do not change `slides/deck-july-23.html`; it is the archive of the previous published deck.

- [ ] **Step 5: Run the focused test**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the implementation**

```powershell
git add slides/deck.html slides/deck-july-2026.html
git commit -m "style: simplify pricing payment options"
```

### Task 3: Verify the complete deck

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/deck-july-2026.html`
- Verify: `slides/deck-july-23.html`

- [ ] **Step 1: Confirm active deck files are identical**

Run:

```powershell
git diff --no-index -- slides/deck.html slides/deck-july-2026.html
```

Expected: no output and exit code 0.

- [ ] **Step 2: Confirm the archive was not changed**

Run:

```powershell
git diff origin/master -- slides/deck-july-23.html
```

Expected: no output.

- [ ] **Step 3: Run the complete slide test suite**

Run:

```powershell
node --test slides/tests/*.test.mjs
```

Expected: all tests pass.

- [ ] **Step 4: Run the production build**

Run:

```powershell
npm run build
```

Expected: build succeeds. The existing Vite warning about `app.js` not using `type="module"` may remain.

- [ ] **Step 5: Check the final slide locally**

Open:

```text
http://127.0.0.1:8770/slides/deck.html
```

Verify at desktop and mobile widths:

1. The heading says “Two ways to pay.”
2. Only Financing Partner and Pay In Full appear.
3. Both cards are equal in width and height.
4. The desktop row is centered and compact.
5. The mobile layout stacks one card per row.
6. The helper notes remain pinned near the card bottoms.

- [ ] **Step 6: Check the final Git state**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and no uncommitted implementation changes.
