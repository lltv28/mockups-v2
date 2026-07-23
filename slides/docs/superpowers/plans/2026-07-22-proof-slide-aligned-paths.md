# Proof Slide Aligned Paths Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first comparison row's four-card path with a five-card VSL path and remove the visible row labels and internal-use pill.

**Architecture:** Keep the existing slide component, revenue proof, responsive behavior, and runtime ordering unchanged. Revise only the two comparison sections so both use the existing five-column card grid, then keep the active and versioned deck files byte-for-byte synchronized.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, Vite build verification.

---

## File structure

- Modify `slides/deck.html`: Revise the comparison markup and remove unused label and badge styles.
- Modify `slides/deck-july-2026.html`: Keep the versioned preview synchronized with the active deck.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: Lock the new VSL path, ten-card count, removed copy, and five-column alignment.

### Task 1: Align both comparison paths around VSL versus AI Assessment

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:548-594`
- Modify: `slides/deck.html:1900-1906`
- Modify: `slides/deck.html:2290-2309`
- Modify: `slides/deck-july-2026.html`

- [ ] **Step 1: Update the comparison regression test**

Replace the existing `internal proof slide contains the approved copy and ordered paths` test with:

```js
test('internal proof slide compares aligned VSL and AI Assessment paths', () => {
  const proof = section('id="internal-proof-slide"', '<!-- S5, 2 Stages Overview -->');
  const approvedCopy = [
    'WE RAN THIS ON OURSELVES',
    'One extra step changes everything.',
    'Ad',
    'VSL',
    'Booked call',
    '35%',
    'Shows up',
    '20%',
    'Closes',
    'AI assessment',
    '60%',
    '33%',
    'From 1,000 completed AI assessments',
    '$612,000+',
    'contracted revenue',
    '34 high-ticket clients, our own business',
    'We didn’t just build this for clients. We ran it on ourselves first, and it’s what took our own show and close rates from Model A to Model B.',
    'Figures reflect internal Kodara data, not a guarantee of client results.',
  ];
  approvedCopy.forEach((copy) => assert.match(proof, new RegExp(escapeRegex(copy))));
  assert.doesNotMatch(proof, /MODEL A · AD TO CALL/);
  assert.doesNotMatch(proof, /MODEL B · AD TO ASSESSMENT TO CALL/);
  assert.doesNotMatch(proof, /what we run internally/);
  assert.equal((proof.match(/<ol class="internal-proof-path internal-proof-path--five">/g) ?? []).length, 2);
  assert.equal((proof.match(/<li class="internal-proof-step[^"\n]*"/g) ?? []).length, 10);
  const paths = [...proof.matchAll(/<ol class="internal-proof-path[^>]*>([\s\S]*?)<\/ol>/g)]
    .map((match) => match[1]);
  assertInOrder(paths[0], ['Ad', 'VSL', 'Booked call', '35%', 'Shows up', '20%', 'Closes'], 'VSL sequence');
  assertInOrder(paths[1], ['Ad', 'AI assessment', 'Booked call', '60%', 'Shows up', '33%', 'Closes'], 'AI Assessment sequence');
});
```

- [ ] **Step 2: Run the focused test and confirm the new contract fails**

Run:

```powershell
node --test --test-name-pattern="aligned VSL" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because `VSL` is missing, only nine step cards exist, the first row uses the four-column class, and the removed labels and pill are still present.

- [ ] **Step 3: Remove the unused visible-label and badge CSS**

Delete these rules from `slides/deck.html`. Step 5 carries the same removal into the versioned preview:

```css
  .internal-proof-model h3 { color: var(--al-500); font-size: 11px; font-weight: 700; letter-spacing: 0.11em; line-height: 1.3; text-transform: uppercase; }
  .internal-proof-model--highlight h3 { color: var(--brand-950); }
  .internal-proof-model__badge { align-self: center; padding: 4px 10px; background: var(--brand-950); color: var(--white); border-radius: 999px; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; line-height: 1; text-transform: uppercase; }
  .internal-proof-path--four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
```

Keep the existing shared five-column rule:

```css
  .internal-proof-path--five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
```

- [ ] **Step 4: Replace the two comparison sections in `slides/deck.html`**

Use labeled sections for accessibility without visible row headings:

```html
      <section class="internal-proof-model rv d3" aria-label="Ad to VSL to booked call">
        <ol class="internal-proof-path internal-proof-path--five">
          <li class="internal-proof-step">Ad</li>
          <li class="internal-proof-step">VSL</li>
          <li class="internal-proof-step">Booked call</li>
          <li class="internal-proof-step internal-proof-step--rate"><strong>35%</strong><span>Shows up</span></li>
          <li class="internal-proof-step internal-proof-step--rate"><strong>20%</strong><span>Closes</span></li>
        </ol>
      </section>

      <section class="internal-proof-model internal-proof-model--highlight rv d4" aria-label="Ad to AI Assessment to booked call">
        <ol class="internal-proof-path internal-proof-path--five">
          <li class="internal-proof-step">Ad</li>
          <li class="internal-proof-step internal-proof-step--key">AI assessment</li>
          <li class="internal-proof-step">Booked call</li>
          <li class="internal-proof-step internal-proof-step--result"><strong>60%</strong><span>Shows up</span></li>
          <li class="internal-proof-step internal-proof-step--result"><strong>33%</strong><span>Closes</span></li>
        </ol>
      </section>
```

- [ ] **Step 5: Synchronize the versioned preview**

Run:

```powershell
Copy-Item -LiteralPath slides\deck.html -Destination slides\deck-july-2026.html -Force
```

- [ ] **Step 6: Run the full verification suite**

Run:

```powershell
node --test slides/tests/*.test.mjs
npm run build
git diff --check
```

Expected: all tests PASS, Vite reports a successful build, and the whitespace check produces no errors.

- [ ] **Step 7: Reload the local preview and inspect slide 4**

Reload `http://127.0.0.1:8770/slides/deck.html`, navigate to slide 4, and confirm:

1. Both rows contain five equal-width cards.
2. The top row reads `Ad`, `VSL`, `Booked call`, `35% Shows up`, `20% Closes`.
3. The bottom row reads `Ad`, `AI assessment`, `Booked call`, `60% Shows up`, `33% Closes`.
4. No row labels or internal-use pill remain.
5. The mobile stacked layout and revenue proof remain unchanged.

- [ ] **Step 8: Commit the revision**

```powershell
git add -- slides/deck.html slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "refine proof slide comparison paths"
```

- [ ] **Step 9: Confirm the worktree is clean**

Run:

```powershell
git status --short
```

Expected: no output.
