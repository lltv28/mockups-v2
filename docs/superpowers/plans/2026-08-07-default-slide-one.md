# Default Slide One Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the deck open on slide 1 when its URL does not include a `slide` parameter.

**Architecture:** Preserve the existing query-parameter navigation contract and change only its missing-value fallback. Protect the behavior with a source-level regression assertion in the current-deck narrative suite.

**Tech Stack:** Static HTML/JavaScript deck and Node.js built-in test runner.

## Global Constraints

- Opening `deck.html` without a `slide` parameter starts on slide 1.
- Opening `deck.html?slide=17` continues to start on slide 17.
- Navigation continues to update `?slide=N` in the address bar.
- Existing invalid-value handling remains unchanged and returns to slide 1.
- Do not change slide content, order, styling, counter behavior, navigation, or archived decks.

---

### Task 1: Change and protect the startup fallback

**Files:**
- Modify: `slides/tests/deck-narrative-refresh.test.mjs`
- Modify: `slides/deck.html:4939`

**Interfaces:**
- Consumes: the optional `slide` query parameter read by `URLSearchParams`.
- Produces: one-based `requestedSlide`, defaulting to `1` when the parameter is missing.

- [ ] **Step 1: Write the failing regression assertion**

Add this assertion to `deck uses the approved 24-slide opening narrative`:

```js
assert.match(
  deck,
  /const requestedSlide = Number\(new URLSearchParams\(window\.location\.search\)\.get\('slide'\) \|\| 1\);/,
);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-narrative-refresh.test.mjs
```

Expected: FAIL because the production fallback is still `17`.

- [ ] **Step 3: Implement the minimal production change**

Replace:

```js
const requestedSlide = Number(new URLSearchParams(window.location.search).get('slide') || 17);
```

with:

```js
const requestedSlide = Number(new URLSearchParams(window.location.search).get('slide') || 1);
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-narrative-refresh.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Run the complete slide suite**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: current deck checks pass; the documented archived-July checksum mismatch may remain the sole unrelated failure.

- [ ] **Step 6: Commit the behavior change**

```bash
git add slides/deck.html slides/tests/deck-narrative-refresh.test.mjs docs/superpowers/plans/2026-08-07-default-slide-one.md
git commit -m "fix: default deck to slide one"
```
