# AI Whitelabel Card Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace card 3 on the client-love slide with the approved AI whitelabel title and first-of-its-kind description.

**Architecture:** Add one focused regression test around the client-love card copy, then make the same two text replacements in both active July deck files. Existing markup, styling, and archived decks remain unchanged.

**Tech Stack:** Static HTML, Node.js built-in test runner, Vite

---

### Task 1: Lock the approved copy with a regression test

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add the failing test**

```js
test('client proof presents the approved AI whitelabel advantage', () => {
  assert.match(deck, /Your Own AI Whitelabel App/);
  assert.match(
    deck,
    /Give your audience a first-of-its-kind AI experience<br>no one else in your industry offers<br>and create a category of your own\./,
  );
  assert.doesNotMatch(deck, /Innovative and hard to copy/);
});
```

- [ ] **Step 2: Run the focused test file**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: one failure for the missing approved AI whitelabel copy.

### Task 2: Replace card 3 in both active decks

**Files:**
- Modify: `slides/deck.html`
- Modify: `slides/deck-july-2026.html`

- [ ] **Step 1: Replace the title and description**

Use this exact markup in card 3 of both files:

```html
<div class="love-reason__title">Your Own AI Whitelabel App</div>
<div class="love-reason__body">Give your audience a first-of-its-kind AI experience<br>no one else in your industry offers<br>and create a category of your own.</div>
```

- [ ] **Step 2: Run the full slide test suite**

Run:

```powershell
node --test "slides/tests/*.test.mjs"
```

Expected: all tests pass.

- [ ] **Step 3: Confirm active decks match and the archive is untouched**

Run:

```powershell
git diff --no-index -- slides/deck.html slides/deck-july-2026.html
git diff --exit-code origin/master -- slides/deck-july-23.html
```

Expected: both commands exit with no differences.

- [ ] **Step 4: Run the production build**

Run:

```powershell
npm run build
```

Expected: Vite exits successfully.

- [ ] **Step 5: Commit the implementation**

```powershell
git add slides/deck.html slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "content: add AI whitelabel card copy"
```
