# Expert AI Image Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Tony Robbins, Alex Hormozi, and Dr. Mark Hyman screenshots on the Expert AIs slide with the three approved user-provided PNG files.

**Architecture:** Keep the existing HTML paths and card styling unchanged by replacing the three local files in place. Update the regression tests to verify the exact approved files and their natural dimensions, then record the new user-provided provenance in the existing source manifest.

**Tech Stack:** HTML/CSS, Node.js test runner, PNG assets, PowerShell, Vite

---

### Task 1: Add regression coverage for the approved screenshots

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:1-4`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:127-153`

- [ ] **Step 1: Add SHA-256 support to the test file**

Add this import beside the existing Node imports:

```js
import { createHash } from 'node:crypto';
```

Add this helper below `readPngInfo`:

```js
function sha256(imagePath) {
  return createHash('sha256').update(readFileSync(imagePath)).digest('hex').toUpperCase();
}
```

- [ ] **Step 2: Replace the fixed 800 by 450 test with exact approved image checks**

Replace the existing `local AI proof images are valid 800 by 450 PNG files` test with:

```js
test('local AI proof images use the three approved user screenshots', () => {
  const approved = [
    ['tony-robbins.png', { width: 1563, height: 785 }, '15B27BFEBA9BA2F12E83AF8B8FB8D0DBD7F1C836702A842CFCDE984470113782'],
    ['alex-hormozi.png', { width: 2083, height: 1203 }, '3C902C71C57ED03D7FE7C2794F9472B90566AAC72E1D9DDB7F45AC40E5FEEE92'],
    ['mark-hyman.png', { width: 1325, height: 724 }, 'F45DE93CF6B66883CFC5204F076CECD6775DF92BEEEFA2D9BDF3D106A24410B8'],
  ];

  approved.forEach(([file, dimensions, hash]) => {
    const imagePath = resolve(slidesDir, 'ai-proof', file);
    assert.deepEqual(readPngInfo(imagePath), dimensions, `${file} must keep its approved dimensions`);
    assert.equal(sha256(imagePath), hash, `${file} must match the approved screenshot`);
  });

  assert.deepEqual(
    readPngInfo(resolve(slidesDir, 'ai-proof', 'grant-cardone.png')),
    { width: 800, height: 450 },
    'Grant Cardone must remain unchanged',
  );
});
```

- [ ] **Step 3: Update the manifest regression test**

Rename the manifest test to `AI proof source manifest records the three user-provided replacements` and replace its retrieval-date and URL assertions with:

```js
assert.match(sources, /Replacements received: 2026-07-22/);
['tony-robbins.png', 'alex-hormozi.png', 'mark-hyman.png'].forEach((file) => {
  assert.match(sources, new RegExp(`${file.replace('.', '\\.')}.+User-provided screenshot`, 'i'));
});
assert.ok(sources.includes('https://10xgc.grantcardone.com/blt-offer'));
assert.match(sources, /does not assert or grant reuse permission/i);
```

- [ ] **Step 4: Run the focused tests and verify they fail for the old assets**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL on the approved screenshot dimensions or SHA-256 values before the files are replaced.

- [ ] **Step 5: Commit the failing regression tests**

```powershell
git add -- slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover approved expert AI screenshots"
```

### Task 2: Replace the image files and update their source notes

**Files:**
- Replace: `slides/ai-proof/tony-robbins.png`
- Replace: `slides/ai-proof/alex-hormozi.png`
- Replace: `slides/ai-proof/mark-hyman.png`
- Modify: `slides/ai-proof/SOURCES.md`

- [ ] **Step 1: Copy the exact approved screenshots into the existing asset paths**

```powershell
Copy-Item -LiteralPath 'C:\Users\lucas\AppData\Local\Temp\codex-clipboard-39af759d-2d68-4621-be9b-8005c026e83d.png' -Destination 'slides\ai-proof\tony-robbins.png' -Force
Copy-Item -LiteralPath 'C:\Users\lucas\AppData\Local\Temp\codex-clipboard-6ff1928e-ef64-49d4-9411-5a8682e028e8.png' -Destination 'slides\ai-proof\alex-hormozi.png' -Force
Copy-Item -LiteralPath 'C:\Users\lucas\AppData\Local\Temp\codex-clipboard-b7704581-f922-4875-830e-c692c3539914.png' -Destination 'slides\ai-proof\mark-hyman.png' -Force
```

- [ ] **Step 2: Update the source manifest**

Keep the Grant Cardone official source unchanged. Replace the Tony Robbins, Alex Hormozi, and Mark Hyman downloaded-image entries with `User-provided screenshot (2026-07-22)`, and add this line below the title:

```markdown
Replacements received: 2026-07-22
```

Keep each official product page as a reference, and retain the reuse-permission disclaimer.

- [ ] **Step 3: Run the focused tests and verify they pass**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: all tests pass, including exact dimensions and hashes for the three approved screenshots.

- [ ] **Step 4: Commit the image replacements and source notes**

```powershell
git add -- slides/ai-proof/tony-robbins.png slides/ai-proof/alex-hormozi.png slides/ai-proof/mark-hyman.png slides/ai-proof/SOURCES.md
git commit -m "feat: replace expert AI screenshots"
```

### Task 3: Verify the deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Protect: `slides/deck.html`

- [ ] **Step 1: Run all slide tests**

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Build the project and check the diff**

```powershell
npm run build
git diff --check
git diff --quiet origin/master -- slides/deck.html
```

Expected: the build exits successfully, the diff check reports no whitespace errors, and `slides/deck.html` matches `origin/master`.

- [ ] **Step 3: Visually inspect the Expert AIs slide**

Open `http://127.0.0.1:8768/slides/deck-july-2026.html`, navigate to the Expert AIs slide, and inspect at 1600 by 900 and 430 by 900.

Expected: Tony Robbins, Alex Hormozi, and Dr. Mark Hyman show the approved screenshots; Grant Cardone is unchanged; the existing top-centered cover crop remains; no image is missing; and there is no overlap, clipping outside the card, or horizontal overflow.
