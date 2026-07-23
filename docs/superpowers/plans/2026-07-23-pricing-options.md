# Pricing Options Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the deck to present a $21,000 standard investment and three approved payment options.

**Architecture:** Keep the existing two-slide pricing section and its inline visual system. Update the active deck first, copy it byte-for-byte to the versioned July deck, and protect the approved copy and card order with the existing Node test suite.

**Tech Stack:** HTML, inline CSS, Node.js built-in test runner, Vite

---

## File Map

- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: assert the standard price, three payment choices, card order, and removed legacy copy.
- Modify `slides/deck.html`: update the investment anchor and payment-options slide.
- Modify `slides/deck-july-2026.html`: remain byte-for-byte synchronized with the active deck.

### Task 1: Protect the approved pricing copy

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Write the failing test**

Add this test after the existing price-card deliverables test:

```js
test('pricing presents the approved standard investment and three payment options', () => {
  const investment = section('<!-- S10a, The Investment', '<!-- S10b, Payment Plans');
  const paymentOptions = section('<!-- S10b, Payment Plans', '<!-- Video Modal -->');

  assert.match(investment, />Standard Investment<\/div>\s*<div[^>]*>\$21,000<\/div>/);
  assert.match(investment, />for your six-month build and launch program<\/div>/);

  assert.match(paymentOptions, />Three ways to pay\.<\/h2>/);
  assertInOrder(paymentOptions, [
    '>Financing Partner</div>',
    '>$21,000</div>',
    '>3-Pay</div>',
    '>$7,000',
    '×3</span>',
    '>$21,000 total</div>',
    '>Pay In Full</div>',
    '>$18,000</div>',
    '>Card or wire</div>',
  ], 'payment option order');
  assert.equal((paymentOptions.match(/border-radius: 14px; padding: 24px 16px/g) ?? []).length, 3);
  assert.doesNotMatch(paymentOptions, /Two ways to pay|\$6,800|\$20,400/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
node --test --test-name-pattern="pricing presents" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the deck still contains the old $18,000 anchor and two-option layout.

### Task 2: Update both pricing slides

**Files:**
- Modify: `slides/deck.html`
- Modify: `slides/deck-july-2026.html`

- [ ] **Step 1: Update the investment anchor**

In `slides/deck.html`, replace the investment card’s label, price, and supporting sentence with:

```html
<div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--al-500);">Standard Investment</div>
<div style="font-family: var(--font-hero); font-size: clamp(34px, 4.5vw, 44px); font-weight: 700; color: var(--al-900); letter-spacing: -1px; line-height: 1; margin-top: 6px;">$21,000</div>
<div style="font-size: 12px; color: var(--al-500); margin-top: 5px;">for your six-month build and launch program</div>
```

- [ ] **Step 2: Replace the payment-options intro**

Use:

```html
<h2 class="h-lg">Three ways to pay.</h2>
<p class="body" style="max-width: 720px; margin: 8px auto 0; color: var(--al-600); font-weight: 400; line-height: 1.55;">
  Choose the payment option that works best for you.
</p>
```

- [ ] **Step 3: Replace the payment-option grid**

Use a three-column grid with `max-width: 720px` and these cards in order:

```html
<div class="rv d2" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 720px; margin: 0 auto; width: 100%; padding-top: 8px;">
  <!-- Financing -->
  <div style="background: white; border: 2px solid var(--al-100); border-radius: 14px; padding: 24px 16px; text-align: center; box-shadow: var(--shadow-card);">
    <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--al-500);">Financing Partner</div>
    <div style="font-family: var(--font-hero); font-size: 30px; font-weight: 700; color: var(--al-900); letter-spacing: -0.5px; margin-top: 14px;">$21,000</div>
  </div>
  <!-- 3-Pay -->
  <div style="background: white; border: 2px solid var(--al-100); border-radius: 14px; padding: 24px 16px; text-align: center; box-shadow: var(--shadow-card);">
    <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--al-500);">3-Pay</div>
    <div style="font-family: var(--font-hero); font-size: 30px; font-weight: 700; color: var(--al-900); letter-spacing: -0.5px; margin-top: 14px;">$7,000<span style="font-size: 14px; color: var(--al-500); font-weight: 400;"> ×3</span></div>
    <div style="font-size: 12px; color: var(--al-900); margin-top: 16px; font-weight: 700;">$21,000 total</div>
  </div>
  <!-- Pay In Full -->
  <div style="background: white; border: 2px solid var(--brand-950); border-radius: 14px; padding: 24px 16px; text-align: center; box-shadow: var(--shadow-card); position: relative;">
    <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--brand-950); color: white; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; padding: 3px 10px; border-radius: 999px; white-space: nowrap;">Best value</div>
    <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--al-500);">Pay In Full</div>
    <div style="font-family: var(--font-hero); font-size: 30px; font-weight: 700; color: var(--al-900); letter-spacing: -0.5px; margin-top: 14px;">$18,000</div>
    <div style="font-size: 11px; color: var(--al-500); margin-top: 2px;">Card or wire</div>
  </div>
</div>
```

- [ ] **Step 4: Synchronize the versioned deck**

Run:

```powershell
Copy-Item -LiteralPath 'slides/deck.html' -Destination 'slides/deck-july-2026.html' -Force
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
node --test --test-name-pattern="pricing presents" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

### Task 3: Verify the deck

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/deck-july-2026.html`
- Verify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Run the complete slide suite**

Run:

```powershell
node --test slides/tests/*.test.mjs
```

Expected: all tests pass, including byte-for-byte deck synchronization.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm run build
```

Expected: Vite completes successfully.

- [ ] **Step 3: Inspect the local pricing slides**

Open `http://127.0.0.1:8770/slides/deck.html`, navigate to the final two visible slides, and confirm:

- The standard investment reads $21,000.
- Three equal payment cards fit without clipping.
- Pay In Full keeps the Best value badge.
- The mobile layout remains readable.

- [ ] **Step 4: Check the final diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only the planned pricing files are modified.

- [ ] **Step 5: Commit the implementation**

```powershell
git add -- slides/deck.html slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs docs/superpowers/plans/2026-07-23-pricing-options.md
git commit -m "update deck pricing options"
```
