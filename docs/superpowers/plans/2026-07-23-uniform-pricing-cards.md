# Uniform Pricing Cards Implementation Plan

> **For Lucas:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make all three payment cards on slide 20 use the same neutral styling while keeping the financing estimate and “Card or wire” pinned to their card bottoms.

**Architecture:** Move the shared visual treatment into the existing `.payment-option-card` CSS class. Add a centered inner wrapper to every card and an absolutely positioned helper class for the Financing Partner and Pay In Full notes so the centered price groups do not move.

**Tech Stack:** HTML, CSS, Node test runner, Vite

---

### Task 1: Add a failing regression test

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

**Step 1: Write the failing test**

Add this test beside the existing payment-option tests:

```js
test('all payment cards share neutral styling while helper notes stay out of the center flow', () => {
  const paymentOptions = section('<!-- S10b, Payment Plans', '<!-- Video Modal -->');

  assert.equal(
    (paymentOptions.match(/class="payment-option-card">\s*<div class="payment-option-card__center">/g) ?? []).length,
    3,
  );
  assert.doesNotMatch(paymentOptions, /Best value/i);
  assert.doesNotMatch(paymentOptions, /border:\s*2px solid var\(--brand-950\)/);
  assert.match(
    paymentOptions,
    /<div class="payment-option-card__note">~\$1,500\/month<\/div>/,
  );
  assert.match(
    paymentOptions,
    /<div class="payment-option-card__note">Card or wire<\/div>/,
  );
  assert.match(
    deck,
    /\.payment-option-card \{[^}]*position: relative;[^}]*background: white;[^}]*border: 2px solid var\(--al-100\);[^}]*\}/s,
  );
  assert.match(
    deck,
    /\.payment-option-card__center \{[^}]*display: inline-flex;[^}]*flex-direction: column;[^}]*align-items: center;[^}]*\}/s,
  );
  assert.match(
    deck,
    /\.payment-option-card__note \{[^}]*position: absolute;[^}]*bottom: 8px;[^}]*\}/s,
  );
});
```

**Step 2: Run the focused test to verify it fails**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the Best Value badge and green border still exist, and the new CSS classes do not.

**Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: define uniform pricing card styling"
```

### Task 2: Unify the payment-card CSS and markup

**Files:**
- Modify: `slides/deck.html`
- Modify: `slides/deck-july-2026.html`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

**Step 1: Expand the shared card CSS**

Update `.payment-option-card` so it contains the complete neutral card treatment:

```css
.payment-option-card {
  min-width: 0;
  height: 105px;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: white;
  border: 2px solid var(--al-100);
  border-radius: 14px;
  text-align: center;
  box-shadow: var(--shadow-card);
}

.payment-option-card__center {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.payment-option-card__note {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 8px;
  font-size: 11px;
  line-height: 1;
  color: var(--al-500);
}
```

**Step 2: Simplify all three card wrappers**

Replace each styled wrapper with:

```html
<div class="payment-option-card">
```

Wrap each card’s heading and price with:

```html
<div class="payment-option-card__center">
  <!-- existing heading and price -->
</div>
```

**Step 3: Remove the special Pay In Full treatment**

Delete the absolutely positioned `Best value` badge element.

Remove the green border and every other one-off wrapper style from the Pay In Full card.

**Step 4: Pin the financing and payment-method notes**

Add this immediately after the Financing Partner center wrapper:

```html
<div class="payment-option-card__note">~$1,500/month</div>
```

Replace the existing helper text with:

```html
<div class="payment-option-card__note">Card or wire</div>
```

Keep both notes outside their `.payment-option-card__center` wrappers.

**Step 5: Synchronize the versioned deck**

Run:

```powershell
Copy-Item -LiteralPath slides/deck.html -Destination slides/deck-july-2026.html -Force
```

**Step 6: Run the focused test**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

**Step 7: Commit the implementation**

```powershell
git add slides/deck.html slides/deck-july-2026.html
git commit -m "style: unify pricing option cards"
```

### Task 3: Verify the full deck

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/deck-july-2026.html`

**Step 1: Confirm both deck files are identical**

Run:

```powershell
git diff --no-index -- slides/deck.html slides/deck-july-2026.html
```

Expected: no output and exit code 0.

**Step 2: Run the full test suite**

Run:

```powershell
npm test
```

Expected: all tests pass.

**Step 3: Run the production build**

Run:

```powershell
npm run build
```

Expected: build succeeds. The existing Vite warning about `app.js` not using `type="module"` may remain.

**Step 4: Check slide 20 in the local browser**

Open:

```text
http://127.0.0.1:8770/slides/deck.html
```

Verify:

1. All three cards use the same white background, gray border, and shadow.
2. The Best Value badge is gone.
3. Each heading and price stays centered vertically and horizontally.
4. “~$1,500/month” sits near the bottom of the first card without moving `$21,000`.
5. “Card or wire” sits near the bottom of the third card without moving `$18,000`.
6. The cards remain equal height on desktop and stacked mobile layouts.

**Step 5: Check the final diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and no uncommitted implementation changes.
