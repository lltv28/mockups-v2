# Deck Narrative Reorder and Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the speed-to-lead slide, refresh the opener, place the cash comparison immediately after the self-funding flywheel, and clarify the ownership slide while preserving all unaffected deck behavior.

**Architecture:** Make the visible source order identical to the narrative order by physically deleting and moving HTML blocks in `slides/deck.html`, then remove only the runtime reorders that would override the approved early sequence and warranty-to-ownership adjacency. Keep the cash-runway block byte-for-byte unchanged while relocating it, update the static denominator to 24, remove CSS that becomes unused, and protect the complete sequence and copy with focused Node.js contract tests.

**Tech Stack:** Static HTML, scoped CSS, native inline SVG, vanilla JavaScript deck runtime, Node.js built-in test runner, in-app browser viewport verification.

## Global Constraints

- The opener must read exactly `We turn your expertise into an AI Sales department that pays for its own leads`, with `AI Sales department` retaining the existing brand-color span and no terminal period.
- Delete `#real-problem-slide`; do not hide it.
- Remove the unused `.problem-speed-*` and `.problem-banner` rules and responsive overrides.
- The first six visible slides must be opening, client wall, the existing AI build/knowledge slide, self-funding flywheel, cash-runway comparison, and program overview.
- Move the complete `#cash-runway-slide` block after `#internal-proof-slide` and before `#program-overview-slide` without changing its markup, SVG geometry, copy, animation, styling, responsiveness, or accessibility.
- The deck must contain 24 visible slides and the static counter must be `01 / 24`.
- `#ownership-slide` must remain directly after `#double-guarantee-slide`.
- Remove target-related runtime moves for internal proof, program overview, clients love, ad-loop reinvestment, and ownership; leave unrelated phase reorders unchanged.
- On the ownership slide, replace `During the program` with `Months 1-6` and `Weekly optimization` with `We run the entire launch`.
- Preserve all remaining ownership, warranty, and deck content.
- Do not modify archived decks or the checksum fixture. The documented July archived-deck checksum mismatch may remain as the only full-suite failure.

## File Structure

- `slides/deck.html`: owns slide source order, visible copy, scoped CSS, static counter, runtime reorders, and navigation inputs. Modify the opener, remove the speed-to-lead slide and unused CSS, relocate the cash block, remove conflicting target reorders, update ownership copy, and change the denominator.
- `slides/tests/deck-narrative-refresh.test.mjs`: new focused contract for visible order, opener/removal requirements, warranty-to-ownership adjacency, and exact ownership copy.
- `slides/tests/deck-cash-runway.test.mjs`: existing cash-slide contract. Update its block boundary, visible count, early-order expectations, placement assertions, and denominator.

---

### Task 1: Apply the approved narrative and copy refresh

**Files:**
- Create: `slides/tests/deck-narrative-refresh.test.mjs`
- Modify: `slides/tests/deck-cash-runway.test.mjs:8-55`
- Modify: `slides/deck.html:2434-2497`
- Modify: `slides/deck.html:2841-2844`
- Modify: `slides/deck.html:3408`
- Modify: `slides/deck.html:3503-3580`
- Modify: `slides/deck.html:3713-3748`
- Modify: `slides/deck.html:4401-4402`
- Modify: `slides/deck.html:4559`
- Modify: `slides/deck.html:4563-4745`

**Interfaces:**
- Consumes: visible slides identified by `<div class="slide...">` without `hidden`, `#internal-proof-slide` as the flywheel boundary, `#program-overview-slide` as the next narrative boundary, and the existing runtime that derives slide state from DOM order.
- Produces: a 24-entry visible slide sequence, `#cash-runway-slide` as visible slide 5, `#double-guarantee-slide` immediately followed by `#ownership-slide`, and exact approved copy strings consumed by the regression tests.

- [ ] **Step 1: Create the failing narrative regression test**

Create `slides/tests/deck-narrative-refresh.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');

function visibleSlideIds() {
  return [...deck.matchAll(/<div class="slide[^"]*"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\shidden(?:\s|=|>)/.test(tag))
    .map((tag) => tag.match(/\sid="([^"]+)"/)?.[1] ?? null);
}

function section(startMarker, endMarker) {
  const start = deck.indexOf(startMarker);
  const end = deck.indexOf(endMarker, start);
  return start >= 0 && end > start ? deck.slice(start, end) : '';
}

test('deck uses the approved 24-slide opening narrative', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 24);
  assert.deepEqual(ids.slice(0, 6), [
    null,
    'client-wall-slide',
    'clients-love-slide',
    'internal-proof-slide',
    'cash-runway-slide',
    'program-overview-slide',
  ]);

  assert.match(
    deck,
    /id="opening-title"[^>]*>We turn your expertise into an <span[^>]*>AI Sales department<\/span> that pays for its own leads<\/h2>/,
  );
  assert.doesNotMatch(deck, /id="real-problem-slide"/);
  assert.doesNotMatch(deck, /The first five minutes decide whether a lead gets worked or wasted\./);
  assert.doesNotMatch(deck, /\.problem-speed-|\.problem-banner/);
  for (const obsoleteMove of [
    'deckElement.insertBefore(internalProofSlide, clientsLoveSlide)',
    'deckElement.insertBefore(programOverviewSlide, clientsLoveSlide)',
    'deckElement.insertBefore(clientsLoveSlide, lucasOnboardingSlide.nextElementSibling)',
    'deckElement.insertBefore(adLoopReinvestmentSlide, internalProofSlide.nextElementSibling)',
  ]) {
    assert.doesNotMatch(deck, new RegExp(obsoleteMove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 24<\/div>/);
});

test('warranty flows directly into ownership with the approved launch language', () => {
  const ids = visibleSlideIds();
  const warrantyIndex = ids.indexOf('double-guarantee-slide');
  assert.ok(warrantyIndex >= 0);
  assert.equal(ids[warrantyIndex + 1], 'ownership-slide');

  const ownership = section('id="ownership-slide"', 'id="investment-slide"');
  assert.match(ownership, /You own the asset\. We keep improving the launch\./);
  assert.match(ownership, /Months 1-6/);
  assert.match(ownership, /We run the entire launch/);
  assert.doesNotMatch(ownership, /During the program/);
  assert.doesNotMatch(ownership, /Weekly optimization/);
  assert.doesNotMatch(deck, /deckElement\.insertBefore\(ownershipSlide, offerRecapSlide\)/);
});
```

The production changes that make these tests pass are the requested removal, physical reorder, denominator update, and copy replacements. The assertions use literal expected order and copy rather than deriving expectations from production helpers.

- [ ] **Step 2: Update the existing cash-runway contract for its new boundary and order**

In `slides/tests/deck-cash-runway.test.mjs`, replace:

```js
const cashEnd = deck.indexOf('<!-- INTRO 1.1, The Real Problem -->', cashStart);
```

with:

```js
const cashEnd = deck.indexOf('<!-- S5, 2 Stages Overview -->', cashStart);
```

Replace the first order test with:

```js
test('cash runway follows the self-funding flywheel as visible slide 5', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 24);
  assert.deepEqual(ids.slice(0, 6), [
    null,
    'client-wall-slide',
    'clients-love-slide',
    'internal-proof-slide',
    'cash-runway-slide',
    'program-overview-slide',
  ]);
  assert.ok(cashStart > deck.indexOf('id="internal-proof-slide"'));
  assert.ok(cashEnd < deck.indexOf('id="program-overview-slide"'));
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 24<\/div>/);
});
```

- [ ] **Step 3: Run both focused tests and confirm RED**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs
```

Expected: the current deck fails for the old opener, 25-slide count, existing speed slide/CSS, cash slide at position 3, old ownership copy, and `/ 25` denominator. Existing cash markup, styling, animation, and accessibility assertions continue to pass.

- [ ] **Step 4: Replace the opening headline**

Change only the `#opening-title` content in `slides/deck.html`:

```html
<h2 id="opening-title" class="h-hero" style="font-size: clamp(36px, 4vw, 52px);">We turn your expertise into an <span style="color: var(--brand-950);">AI Sales department</span> that pays for its own leads</h2>
```

- [ ] **Step 5: Remove the speed-to-lead slide and its unused CSS**

Delete the entire HTML block from:

```html
<!-- INTRO 1.1, The Real Problem -->
```

through the closing `</div>` immediately before:

```html
<!-- INTRO 1.2, Why Clients Love The Kodara Model (floating avatars) -->
```

Delete the base rules for these selectors:

```css
.problem-speed-layout
.problem-speed-stat
.problem-speed-stat__value
.problem-speed-stat__label
.problem-speed-divider
.problem-speed-copy
.problem-speed-support
.problem-banner
```

Also delete their four rules inside the existing responsive block:

```css
.problem-speed-layout { grid-template-columns: 1fr; gap: 18px; padding: 24px; }
.problem-speed-stat { min-height: auto; }
.problem-speed-divider { display: none; }
.problem-banner { padding: 12px; font-size: 14px; }
```

- [ ] **Step 6: Move the complete cash-runway block after the flywheel**

Use `apply_patch` to cut the block beginning at:

```html
<!-- Cash Runway Comparison -->
```

and ending at its outer closing `</div>` immediately before the now-removed speed-to-lead marker. Paste that exact block after the outer closing `</div>` of `#internal-proof-slide` and immediately before:

```html
<!-- S5, 2 Stages Overview -->
```

Do not edit within the moved block. The surrounding source sequence must be:

```html
<div class="slide slide--internal-proof" id="internal-proof-slide" ...>
  ...unchanged flywheel content...
</div>

<!-- Cash Runway Comparison -->
<div class="slide slide--cash-runway" id="cash-runway-slide" ...>
  ...unchanged cash-runway content...
</div>

<!-- S5, 2 Stages Overview -->
<div class="slide slide--program-overview" id="program-overview-slide" ...>
```

- [ ] **Step 7: Verify the moved cash block is byte-for-byte unchanged**

Run this read-only comparison before staging the implementation:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e "const fs=require('fs'),cp=require('child_process'),crypto=require('crypto'); const extract=s=>(s.match(/<!-- Cash Runway Comparison -->([\s\S]*?)(?=\n\s*<!--)/)||[])[0]; const before=extract(cp.execFileSync('git',['show','HEAD:slides/deck.html'],{encoding:'utf8'})); const after=extract(fs.readFileSync('slides/deck.html','utf8')); const hash=s=>crypto.createHash('sha256').update(s).digest('hex'); if(!before||!after||hash(before)!==hash(after)){console.error({before:before&&hash(before),after:after&&hash(after)});process.exit(1)} console.log(hash(after));"
```

Expected: exit 0 and one SHA-256 hash. Any mismatch means the relocation changed the cash block; restore the block and repeat the move mechanically.

- [ ] **Step 8: Remove runtime moves that override the approved order**

Delete these declarations because they become unused:

```js
const programOverviewSlide = document.getElementById('program-overview-slide');
const adLoopReinvestmentSlide = document.getElementById('ad-loop-reinvestment-slide');
const ownershipSlide = document.getElementById('ownership-slide');
const offerRecapSlide = document.getElementById('offer-recap-slide');
```

Delete these reorder calls before the slide list is initialized:

```js
deckElement.insertBefore(internalProofSlide, clientsLoveSlide);
deckElement.insertBefore(programOverviewSlide, clientsLoveSlide);
deckElement.insertBefore(clientsLoveSlide, lucasOnboardingSlide.nextElementSibling);
deckElement.insertBefore(ownershipSlide, offerRecapSlide);
deckElement.insertBefore(adLoopReinvestmentSlide, internalProofSlide.nextElementSibling);
```

Keep the remaining phase-cover, reinvestment, triager, and ad-loop-sales reorders unchanged.

- [ ] **Step 9: Update the ownership copy and counter**

In `#ownership-slide`, replace:

```html
During the program
Weekly optimization
```

with:

```html
Months 1-6
We run the entire launch
```

Update the static counter:

```html
<div class="counter" id="counter"><span class="cur">01</span> / 24</div>
```

- [ ] **Step 10: Run the focused tests and confirm GREEN**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs
```

Expected: 12 tests pass and 0 fail.

- [ ] **Step 11: Run the full slide suite**

Run:

```bash
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test slides/tests/*.test.mjs
```

Expected: no new failures. The only permitted failure is the unchanged July archived-deck checksum mismatch in `slides/tests/pitch-deck-tweaks.test.mjs`; do not modify archived content or the checksum fixture.

- [ ] **Step 12: Verify the deck in the browser**

Serve `slides/` locally:

```bash
cd slides
/Users/lucas/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8765
```

At 1920×1080 and 390×844, inspect:

- `?slide=1`: exact opener, `01 / 24`, no clipping.
- Keyboard navigation through slides 2–6: client wall, the existing AI build/knowledge slide, self-funding flywheel, cash comparison at `05 / 24`, then program overview.
- `?slide=5`: both charts, animation restart after leaving/returning, thumbnail fully drawn, mobile stack and internal scroll unchanged.
- `?slide=21`: warranty content unchanged.
- `?slide=22`: ownership headline unchanged; `Months 1-6` and `We run the entire launch` visible; remaining milestones and descriptions intact.

At each inspected viewport, confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth` and the active slide has no unintended horizontal clipping.

- [ ] **Step 13: Inspect the final diff**

Run:

```bash
git diff --check
git diff --stat
git diff -- slides/deck.html slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs
```

Expected: only the approved opener, speed-slide/CSS deletion, cash-block relocation, denominator, ownership copy, and focused tests changed. Archived decks are absent from the diff.

- [ ] **Step 14: Commit the implementation**

```bash
git add slides/deck.html slides/tests/deck-narrative-refresh.test.mjs slides/tests/deck-cash-runway.test.mjs
git commit -m "feat: refine deck narrative flow"
```
