# Expert AI Crop Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the original Dr. Mark Hyman screenshot and display ACQ AI at 130% scale, centered horizontally and pinned to the top of its existing card frame.

**Architecture:** Restore the tracked Hyman binary from commit `ce0f5cf`, then add a cache-busting query to its HTML reference. Preserve the ACQ source file and create a small, ACQ-only clipped media wrapper that applies a reversible CSS transform at both existing responsive image heights.

**Tech Stack:** HTML/CSS, Node.js test runner, Git, PowerShell, Vite

---

### Task 1: Add failing regression coverage

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:103-168`

- [ ] **Step 1: Allow versioned local image URLs**

Normalize each image source by removing its query string:

```js
const imageSources = [...proof.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
  .map((match) => match[1].split('?')[0]);
```

- [ ] **Step 2: Update the approved asset test for the restored Hyman file**

Keep Tony Robbins and Alex Hormozi in the `approved` array. Remove Mark Hyman from that array and add this assertion after the loop:

```js
const hymanPath = resolve(slidesDir, 'ai-proof', 'mark-hyman.png');
assert.deepEqual(readPngInfo(hymanPath), { width: 800, height: 450 }, 'Mark Hyman must use the original image dimensions');
assert.equal(sha256(hymanPath), 'A3E41555D4FAC20946AFFDF5479799D198687EB9C468E8D85027B4A7A49FDAB4', 'Mark Hyman must use the original deck image');
```

- [ ] **Step 3: Add an ACQ zoom and cache-busting test**

Add this test after the local image test:

```js
test('ACQ AI is zoomed 30 percent from the top and Hyman bypasses stale caches', () => {
  const proof = section('<!-- INTRO 1.3, Big-Name AI Credibility', '<!-- S5, 2 Stages Overview');
  assert.match(proof, /<div class="ai-proof-card__media ai-proof-card__media--zoom">\s*<img src="ai-proof\/alex-hormozi\.png" alt="ACQ AI" loading="lazy">\s*<\/div>/);
  assert.match(proof, /<img src="ai-proof\/mark-hyman\.png\?v=20260722b" alt="AI Mark" loading="lazy">/);
  assert.match(deck, /\.ai-proof-card__media \{[^}]*height: 112px;[^}]*overflow: hidden;[^}]*\}/s);
  assert.match(deck, /\.ai-proof-card__media--zoom img \{[^}]*transform: scale\(1\.3\);[^}]*transform-origin: center top;[^}]*\}/s);
  assert.match(deck, /@media \(max-width: 900px\) \{[\s\S]*?\.ai-proof-card__media \{ height: 140px; \}/);
});
```

- [ ] **Step 4: Update the source-manifest assertions**

Require only Tony Robbins and Alex Hormozi to be user-provided, and require the restored Hyman official image URL:

```js
['tony-robbins.png', 'alex-hormozi.png'].forEach((file) => {
  assert.match(sources, new RegExp(`${file.replace('.', '\\.')}.+User-provided screenshot`, 'i'));
});
assert.ok(sources.includes('https://drhyman.com/cdn/shop/files/aimark.gif?v=1763763004'));
```

- [ ] **Step 5: Run the focused tests and verify failure**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because Hyman still uses the replacement screenshot, the ACQ wrapper and zoom CSS are absent, and the Hyman cache-busting query is absent.

- [ ] **Step 6: Commit the failing regression tests**

```powershell
git add -- slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover expert AI crop adjustments"
```

### Task 2: Restore the original Hyman image and source record

**Files:**
- Replace: `slides/ai-proof/mark-hyman.png`
- Modify: `slides/ai-proof/SOURCES.md`

- [ ] **Step 1: Restore the Hyman PNG from the commit before its replacement**

```powershell
git restore --source=ce0f5cf -- slides/ai-proof/mark-hyman.png
```

- [ ] **Step 2: Restore the official Hyman source record**

Change the Hyman row to:

```markdown
| `mark-hyman.png` | https://drhyman.com/products/ai-mark | https://drhyman.com/cdn/shop/files/aimark.gif?v=1763763004 |
```

Change the note below the table to:

```markdown
The Tony Robbins and Alex Hormozi images were replaced with screenshots supplied directly by the user. The Grant Cardone and Mark Hyman images remain the Open Graph images from their official product pages.
```

- [ ] **Step 3: Verify the restored file fingerprint**

```powershell
Get-FileHash slides\ai-proof\mark-hyman.png -Algorithm SHA256
```

Expected hash: `A3E41555D4FAC20946AFFDF5479799D198687EB9C468E8D85027B4A7A49FDAB4`.

- [ ] **Step 4: Commit the restored asset and source record**

```powershell
git add -- slides/ai-proof/mark-hyman.png slides/ai-proof/SOURCES.md
git commit -m "feat: restore original Hyman proof image"
```

### Task 3: Add the ACQ-only top-pinned zoom

**Files:**
- Modify: `slides/deck-july-2026.html:1889-1922`
- Modify: `slides/deck-july-2026.html:2199-2211`

- [ ] **Step 1: Add the clipped media-frame styles**

Add after the existing `.ai-proof-card img` rule:

```css
.ai-proof-card__media { height: 112px; border-radius: 12px; overflow: hidden; }
.ai-proof-card__media img { height: 100%; border-radius: 0; }
.ai-proof-card__media--zoom img { transform: scale(1.3); transform-origin: center top; }
```

Add inside the existing `@media (max-width: 900px)` block after `.ai-proof-card img { height: 140px; }`:

```css
.ai-proof-card__media { height: 140px; }
```

- [ ] **Step 2: Wrap only the ACQ image**

Replace the ACQ image line with:

```html
<div class="ai-proof-card__media ai-proof-card__media--zoom">
  <img src="ai-proof/alex-hormozi.png" alt="ACQ AI" loading="lazy">
</div>
```

- [ ] **Step 3: Version the restored Hyman image URL**

Replace its image line with:

```html
<img src="ai-proof/mark-hyman.png?v=20260722b" alt="AI Mark" loading="lazy">
```

- [ ] **Step 4: Run the focused tests and verify they pass**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 5: Commit the deck change**

```powershell
git add -- slides/deck-july-2026.html
git commit -m "feat: refine expert AI proof crops"
```

### Task 4: Verify the deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Protect: `slides/deck.html`

- [ ] **Step 1: Run all slide tests**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Build and inspect the final diff**

```powershell
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
```

Expected: the build exits successfully, the diff has no whitespace errors, and `slides/deck.html` remains unchanged.

- [ ] **Step 3: Visually inspect desktop and phone layouts**

Open `http://127.0.0.1:8768/slides/deck-july-2026.html`, navigate to slide 3, and inspect at 1600 by 900 and 430 by 900.

Expected: Hyman shows the original image; ACQ appears 30% closer, centered horizontally, and pinned to the top; the enlarged ACQ image stays inside its frame; Tony Robbins and Grant Cardone remain unchanged; and there is no overlap or horizontal overflow.
