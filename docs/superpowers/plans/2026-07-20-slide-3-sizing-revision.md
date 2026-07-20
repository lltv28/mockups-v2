# Slide 3 Sizing Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make slide 3's three reason cards about 25% smaller and its nine-company logo row about 25% larger without changing the content or layout order.

**Architecture:** Keep the revision isolated to the existing slide 3 CSS component in `slides/deck.html`. Extend the current Node structure test with exact sizing assertions, then verify the production build and the rendered slide at 1600 x 900.

**Tech Stack:** HTML, CSS, Node.js built-in test runner, Vite, browser rendering

---

## File structure

- Modify: `slides/tests/slide3-logo-strip.test.mjs` to lock the approved card and logo measurements.
- Modify: `slides/deck.html` to apply the approved sizing values to the existing slide 3 component.

### Task 1: Apply the approved slide 3 sizing

**Files:**
- Modify: `slides/tests/slide3-logo-strip.test.mjs`
- Modify: `slides/deck.html:1837-1854`

- [ ] **Step 1: Write the failing sizing test**

Append this test to `slides/tests/slide3-logo-strip.test.mjs`:

```js
test('slide 3 uses the approved smaller cards and larger logos', () => {
  assert.match(deck, /\.love-reasons\s*\{[^}]*max-width:\s*690px/s);
  assert.match(deck, /\.love-reason\s*\{[^}]*padding:\s*14px/s);
  assert.match(deck, /\.love-reason__num\s*\{[^}]*width:\s*20px;[^}]*height:\s*20px/s);
  assert.match(deck, /\.love-reason__title\s*\{[^}]*font-size:\s*13px/s);
  assert.match(deck, /\.love-reason__body\s*\{[^}]*font-size:\s*11px;[^}]*line-height:\s*1\.4/s);

  assert.match(deck, /\.client-logo-strip\s*\{[^}]*max-width:\s*1040px/s);
  assert.match(deck, /\.client-logo-strip__row\s*\{[^}]*gap:\s*8px/s);
  assert.match(deck, /\.client-logo-strip__logo\s*\{[^}]*max-width:\s*148px/s);
  assert.match(deck, /\.client-logo-strip__wordmark\s*\{[^}]*font-size:\s*15px/s);

  const logoHeights = [
    ['mayo', 35],
    ['jh', 29],
    ['ghl', 19],
    ['fid', 18],
    ['st', 18],
    ['tr', 11],
    ['hrb', 16],
    ['ram', 18],
  ];

  logoHeights.forEach(([name, height]) => {
    assert.match(
      deck,
      new RegExp(`\\.client-logo-strip__logo--${name}\\s*\\{[^}]*height:\\s*${height}px`, 's'),
    );
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```powershell
node --test slides/tests/slide3-logo-strip.test.mjs
```

Expected: three existing tests pass and the new sizing test fails because the CSS still contains the original measurements.

- [ ] **Step 3: Apply the approved card and logo sizes**

Replace the existing slide 3 sizing rules in `slides/deck.html` with:

```css
.love-reasons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 690px; margin: 0 auto; width: 100%; }
.love-reason { text-align: center; padding: 14px; border-radius: 16px; background: var(--ad-800); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); border: 1px solid var(--al-50); box-shadow: var(--shadow-card); }
.love-reason__num { width: 20px; height: 20px; border-radius: 999px; background: var(--brand-50); color: var(--brand-950); border: 1px solid rgba(16,104,68,0.10); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; margin: 0 auto 8px; }
.love-reason__title { font-size: 13px; font-weight: 700; color: var(--al-900); line-height: 1.3; margin-bottom: 3px; }
.love-reason__body { font-size: 11px; font-weight: 400; color: var(--al-600); line-height: 1.4; }
.client-logo-strip { width: 100%; max-width: 1040px; margin: -4px auto 0; }
.client-logo-strip__label { font-size: 10.5px; font-weight: 600; color: var(--al-500); text-align: center; }
.client-logo-strip__row { display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 8px; margin-top: 8px; }
.client-logo-strip__logo { display: block; max-width: 148px; object-fit: contain; filter: grayscale(1) opacity(.55); }
.client-logo-strip__wordmark { white-space: nowrap; color: var(--al-500); line-height: 1; font-size: 15px; font-weight: 800; letter-spacing: -.02em; opacity: .72; order: 2; }
.client-logo-strip__logo--mayo { height: 35px; order: 1; }
.client-logo-strip__logo--jh { height: 29px; order: 3; }
.client-logo-strip__logo--ghl { height: 19px; order: 4; }
.client-logo-strip__logo--fid { height: 18px; order: 5; }
.client-logo-strip__logo--st { height: 18px; order: 6; }
.client-logo-strip__logo--tr { height: 11px; order: 7; }
.client-logo-strip__logo--hrb { height: 16px; order: 8; }
.client-logo-strip__logo--ram { height: 18px; order: 9; }
```

- [ ] **Step 4: Run the automated checks**

Run:

```powershell
node --test slides/tests/slide3-logo-strip.test.mjs
npm run build
git diff --check
```

Expected: all four Node tests pass, the Vite build exits successfully, and `git diff --check` reports no whitespace errors. The existing Vite warning about `app.js` not using `type="module"` may remain.

- [ ] **Step 5: Verify slide 3 visually**

Serve the worktree locally and open `slides/deck.html` at a 1600 x 900 viewport. Navigate to slide 3 and confirm:

1. All four moving client rows remain visible and unchanged.
2. All nine logos are visibly larger and remain centered on one row.
3. All three reason cards are centered, about 25% smaller in width and height, and fully readable.
4. The caption, company order, card wording, and grayscale logo treatment are unchanged.
5. No element clips or overflows the slide.

- [ ] **Step 6: Commit the sizing revision**

Run:

```powershell
git add slides/deck.html slides/tests/slide3-logo-strip.test.mjs
git commit -m "style: rebalance slide 3 cards and logos"
```
