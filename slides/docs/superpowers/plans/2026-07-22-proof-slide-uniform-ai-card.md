# Proof Slide Uniform AI Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the AI Assessment card use the shared pale-green bottom-row styling and shorten the proof detail to `34 high-ticket clients`.

**Architecture:** Remove the AI Assessment card's one-off modifier class and CSS rule so it inherits the existing bottom-row card treatment. Update the proof copy in the active deck, synchronize the versioned preview, and lock both changes with the existing Node test suite.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, Vite build verification.

---

## File structure

- Modify `slides/deck.html`: Remove the dark-green card override and shorten the proof line.
- Modify `slides/deck-july-2026.html`: Keep the versioned preview synchronized.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: Verify uniform card styling and removed copy.

### Task 1: Use one pale-green treatment across the second row

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:548-590`
- Modify: `slides/deck.html:1905-1910`
- Modify: `slides/deck.html:2297-2310`
- Modify: `slides/deck-july-2026.html`

- [ ] **Step 1: Add the failing uniform-style and proof-copy assertions**

Add this test after the aligned-path test:

```js
test('internal proof uses one pale-green card treatment and concise client proof', () => {
  const proof = section('id="internal-proof-slide"', '<!-- S5, 2 Stages Overview -->');
  const highlightedRowRule = cssBlock(deck, '.internal-proof-model--highlight .internal-proof-step');
  assert.match(highlightedRowRule, /background: var\(--brand-50\);/);
  assert.match(highlightedRowRule, /border-color: var\(--brand-200\);/);
  assert.match(highlightedRowRule, /color: var\(--brand-950\);/);
  assert.doesNotMatch(proof, /internal-proof-step--key/);
  assert.doesNotMatch(deck, /\.internal-proof-step--key \{/);
  assert.match(proof, />34 high-ticket clients</);
  assert.doesNotMatch(proof, /our own business/);
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run:

```powershell
node --test --test-name-pattern="one pale-green" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the AI Assessment card still uses `internal-proof-step--key` and the proof detail still includes `our own business`.

- [ ] **Step 3: Remove the special card class and CSS override**

Delete this rule from `slides/deck.html`:

```css
  .internal-proof-step--key { background: var(--brand-950) !important; border-color: transparent !important; color: var(--white) !important; }
```

Change the AI Assessment list item to:

```html
          <li class="internal-proof-step">AI assessment</li>
```

- [ ] **Step 4: Shorten the proof detail**

Replace:

```html
        <p class="internal-proof-result__context">34 high-ticket clients, our own business</p>
```

With:

```html
        <p class="internal-proof-result__context">34 high-ticket clients</p>
```

- [ ] **Step 5: Synchronize the versioned preview**

Run:

```powershell
Copy-Item -LiteralPath slides\deck.html -Destination slides\deck-july-2026.html -Force
```

- [ ] **Step 6: Run full verification**

Run:

```powershell
node --test slides/tests/*.test.mjs
npm run build
git diff --check
```

Expected: all tests PASS, Vite reports a successful build, and the whitespace check produces no errors.

- [ ] **Step 7: Reload slide 4 in the local preview**

Reload `http://127.0.0.1:8770/slides/deck.html` and confirm:

1. AI Assessment matches the other pale-green bottom-row cards.
2. The proof line reads `34 high-ticket clients`.
3. Both five-card paths, revenue figure, supporting statement, and disclaimer remain unchanged.

- [ ] **Step 8: Commit the revision**

```powershell
git add -- slides/deck.html slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "refine proof slide AI card styling"
```

- [ ] **Step 9: Confirm the worktree is clean**

Run:

```powershell
git status --short
```

Expected: no output.
