# Slide 3 Logo Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved nine-company social-proof strip below the moving client faces on slide 3 without removing or clipping existing content.

**Architecture:** Keep the deck self-contained by copying the nine embedded data-URI logo elements from the approved source file into `slides/deck.html`. Add CSS scoped to a new `client-logo-strip` component, then verify the HTML structure with a Node test and confirm the final slide visually in a browser.

**Tech Stack:** HTML, CSS, embedded SVG/PNG data URIs, Node.js built-in test runner, browser rendering

---

## File structure

- Modify: `slides/deck.html` to add the logo strip markup and its isolated CSS.
- Create: `slides/tests/slide3-logo-strip.test.mjs` to verify the logo set, order, embedded image sources, caption, and reveal order.

### Task 1: Add the slide 3 logo strip

**Files:**
- Create: `slides/tests/slide3-logo-strip.test.mjs`
- Modify: `slides/deck.html:1825-1843`
- Modify: `slides/deck.html:1965-2052`
- Source: `C:\Users\lucas\OneDrive\Documents\claude-code\ai-growth-offer-embed.html:64-80`
- Source: `C:\Users\lucas\OneDrive\Documents\claude-code\ai-growth-offer-embed.html:130-143`

- [ ] **Step 1: Write the failing structure test**

Create `slides/tests/slide3-logo-strip.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');
const start = deck.indexOf('<!-- INTRO 1.2, Why Clients Love The Kodara Model');
const end = deck.indexOf('<!-- INTRO 1.4, Why This Model Works');
const slide = deck.slice(start, end);

test('slide 3 contains the approved embedded logo strip', () => {
  assert.ok(start >= 0 && end > start, 'slide 3 boundaries must exist');
  assert.match(slide, /class="rv d4 client-logo-strip"/);
  assert.match(slide, /We've built AI products used and loved by people at:/);

  const logoAlts = [...slide.matchAll(/class="client-logo-strip__logo[^\"]*" alt="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual(logoAlts, [
    'Mayo Clinic',
    'Johns Hopkins',
    'HighLevel',
    'Fidelity Investments',
    'ServiceTitan',
    'Tony Robbins',
    'H&amp;R Block',
    'Ramsey Solutions',
  ]);

  assert.match(slide, /class="client-logo-strip__wordmark">ClickFunnels<\/span>/);

  const embeddedSources = [...slide.matchAll(/class="client-logo-strip__logo[^\"]*"[^>]*src="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(embeddedSources.length, 8);
  embeddedSources.forEach((source) => {
    assert.match(source, /^data:image\/(?:png|svg\+xml);base64,/);
  });

  assert.match(slide, /class="rv d5 love-reasons"/);
});

test('logo strip CSS is isolated and uses one row', () => {
  assert.match(deck, /\.client-logo-strip\s*\{/);
  assert.match(deck, /\.client-logo-strip__row\s*\{[^}]*flex-wrap:\s*nowrap/s);
  assert.match(deck, /\.client-logo-strip__logo\s*\{[^}]*grayscale\(1\)/s);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```powershell
node --test slides/tests/slide3-logo-strip.test.mjs
```

Expected: FAIL because `client-logo-strip` is not present in `slides/deck.html`.

- [ ] **Step 3: Add the isolated logo-strip styles**

Add these styles directly after the existing `.love-reason__body` rule:

```css
.client-logo-strip { width: 100%; max-width: 920px; margin: -4px auto 0; }
.client-logo-strip__label { font-size: 10.5px; font-weight: 600; color: var(--al-500); text-align: center; }
.client-logo-strip__row { display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 14px; margin-top: 8px; }
.client-logo-strip__logo { display: block; max-width: 118px; object-fit: contain; filter: grayscale(1) opacity(.55); }
.client-logo-strip__wordmark { white-space: nowrap; color: var(--al-500); line-height: 1; font-size: 12px; font-weight: 800; letter-spacing: -.02em; opacity: .72; }
.client-logo-strip__logo--mayo { height: 28px; }
.client-logo-strip__logo--jh { height: 23px; }
.client-logo-strip__logo--ghl { height: 15px; }
.client-logo-strip__logo--fid { height: 14px; }
.client-logo-strip__logo--st { height: 14px; }
.client-logo-strip__logo--tr { height: 9px; }
.client-logo-strip__logo--hrb { height: 13px; }
.client-logo-strip__logo--ram { height: 14px; }
```

Change the slide's outer content gap from `gap-24` to `gap-16` so the new band fits without shrinking the moving cards or the reason text.

- [ ] **Step 4: Add the exact embedded logo markup**

Copy the complete `<div class="logostrip">` block from `C:\Users\lucas\OneDrive\Documents\claude-code\ai-growth-offer-embed.html:130-143`. Insert it immediately after the closing `.love-marquee` tag and before `.love-reasons`.

Apply these exact class changes to the copied block while preserving every embedded `src` value byte-for-byte:

| Source | Deck |
|---|---|
| `class="logostrip"` | `class="rv d4 client-logo-strip"` |
| `class="logostrip-label"` | `class="client-logo-strip__label"` |
| `class="logostrip-row"` | `class="client-logo-strip__row"` |
| `class="lg lg-cf"` | `class="client-logo-strip__wordmark"` |
| `class="lgimg lgimg-mayo"` | `class="client-logo-strip__logo client-logo-strip__logo--mayo"` |
| `class="lgimg lgimg-jh"` | `class="client-logo-strip__logo client-logo-strip__logo--jh"` |
| `class="lgimg lgimg-ghl"` | `class="client-logo-strip__logo client-logo-strip__logo--ghl"` |
| `class="lgimg lgimg-fid"` | `class="client-logo-strip__logo client-logo-strip__logo--fid"` |
| `class="lgimg lgimg-st"` | `class="client-logo-strip__logo client-logo-strip__logo--st"` |
| `class="lgimg lgimg-tr"` | `class="client-logo-strip__logo client-logo-strip__logo--tr"` |
| `class="lgimg lgimg-hrb"` | `class="client-logo-strip__logo client-logo-strip__logo--hrb"` |
| `class="lgimg lgimg-ram"` | `class="client-logo-strip__logo client-logo-strip__logo--ram"` |

Preserve the caption and source alternative-text values, except change `alt="Fidelity"` to `alt="Fidelity Investments"` to match the approved company name. The resulting order is Mayo Clinic, ClickFunnels, Johns Hopkins, HighLevel, Fidelity Investments, ServiceTitan, Tony Robbins, H&R Block, and Ramsey Solutions.

Change the existing reason-card wrapper from `class="rv d4 love-reasons"` to `class="rv d5 love-reasons"` so it reveals after the logo band.

- [ ] **Step 5: Run the automated checks**

Run:

```powershell
node --test slides/tests/slide3-logo-strip.test.mjs
npm run build
```

Expected: the Node test passes with two tests and zero failures. The Vite build completes successfully.

- [ ] **Step 6: Verify slide 3 visually**

Open `slides/deck.html` in a browser at a 16:9 desktop viewport and navigate to slide 3. Confirm:

1. All four moving client rows remain visible.
2. The caption and nine logos form one centered row below them.
3. The three reason cards remain fully visible below the logos.
4. No logo is clipped, stretched, or colored.
5. No horizontal or vertical overflow appears.

- [ ] **Step 7: Commit the implementation**

Run:

```powershell
git add slides/deck.html slides/tests/slide3-logo-strip.test.mjs
git commit -m "feat: add client logo strip to slide 3"
```
