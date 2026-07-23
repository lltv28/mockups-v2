# Pricing Card Height Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the redundant 3-Pay total and make all three payment cards 150px tall with centered content.

**Architecture:** Extend the existing shared `.payment-option-card` class so sizing and alignment remain identical across all three cards. Update the active deck first, copy it byte-for-byte to the versioned July deck, and protect the approved result with the existing Node tests.

**Tech Stack:** HTML, CSS, Node.js built-in test runner, Vite

---

## File Map

- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: assert the removed total and shared 150px centered-card rule.
- Modify `slides/deck.html`: remove the total and add the shared card layout.
- Modify `slides/deck-july-2026.html`: remain byte-for-byte synchronized with the active deck.

### Task 1: Protect the compact card design

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Write the failing assertions**

Update the pricing tests to require the compact shared layout:

```js
test('payment options use compact centered cards without a repeated total', () => {
  const paymentOptions = section('<!-- S10b, Payment Plans', '<!-- Video Modal -->');

  assert.doesNotMatch(paymentOptions, /\$21,000 total/);
  assert.match(deck, /\.payment-option-card \{[^}]*height: 150px;[^}]*display: flex;[^}]*flex-direction: column;[^}]*align-items: center;[^}]*justify-content: center;[^}]*\}/s);
  assert.equal((paymentOptions.match(/class="payment-option-card"/g) ?? []).length, 3);
});
```

Remove `'>$21,000 total</div>',` from the approved payment-option order assertion.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
node --test --test-name-pattern="payment options use compact" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the repeated total still exists and the cards do not yet use the 150px centered layout.

### Task 2: Apply the compact shared card layout

**Files:**
- Modify: `slides/deck.html`
- Modify: `slides/deck-july-2026.html`

- [ ] **Step 1: Update the shared payment-card class**

Replace the current rule with:

```css
.payment-option-card {
  min-width: 0;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 2: Remove the repeated total**

Delete this line from the middle 3-Pay card:

```html
<div style="font-size: 12px; color: var(--al-900); margin-top: 16px; font-weight: 700;">$21,000 total</div>
```

- [ ] **Step 3: Synchronize the versioned deck**

Run:

```powershell
Copy-Item -LiteralPath 'slides/deck.html' -Destination 'slides/deck-july-2026.html' -Force
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
node --test --test-name-pattern="payment options use compact" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

### Task 3: Verify and commit

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

- [ ] **Step 3: Inspect slide 20 locally**

Open `http://127.0.0.1:8770/slides/deck.html`, navigate to slide 20, and confirm:

- All three cards are 150px tall.
- All card content is horizontally and vertically centered.
- The 3-Pay total is absent.
- The Best Value badge remains centered over Pay In Full.
- The mobile one-card-per-row layout remains readable.

- [ ] **Step 4: Check the final diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only the two deck files plus the pricing test are modified.

- [ ] **Step 5: Commit the implementation**

```powershell
git add -- slides/deck.html slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "shorten pricing option cards"
```
