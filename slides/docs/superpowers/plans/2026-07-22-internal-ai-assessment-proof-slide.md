# Internal AI Assessment Proof Slide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved internal AI Assessment proof slide after Expert AIs and before the client proof slide.

**Architecture:** Add one self-contained HTML slide and a namespaced CSS component to the existing single-file deck. Keep runtime ordering explicit before navigation captures the slide list, then copy the completed active deck to the versioned preview file so both URLs render the same 20-slide deck.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, Vite build verification.

---

## File structure

- Modify `slides/deck.html`: Add the slide styles, semantic markup, responsive rules, and runtime ordering.
- Modify `slides/deck-july-2026.html`: Keep the versioned preview byte-for-byte synchronized with the active deck.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: Test the active deck, exact approved copy, slide order, responsive rules, and file synchronization.

### Task 1: Lock the copy, order, and responsive contract with failing tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:9-10`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:510-536`

- [ ] **Step 1: Point the test suite at the active deck and load the versioned copy**

Replace the current `deck` declaration with:

```js
const deck = readFileSync(resolve(slidesDir, 'deck.html'), 'utf8');
const versionedDeck = readFileSync(resolve(slidesDir, 'deck-july-2026.html'), 'utf8');
```

- [ ] **Step 2: Replace the intro ordering test with the three-slide contract**

```js
test('Expert AIs and internal proof move before client proof before navigation initializes', () => {
  assert.match(deck, /id="clients-love-slide"/);
  assert.match(deck, /id="expert-ai-slide"/);
  assert.match(deck, /id="internal-proof-slide"/);
  const expertReorder = deck.indexOf("deckElement.insertBefore(expertAiSlide, clientsLoveSlide)");
  const proofReorder = deck.indexOf("deckElement.insertBefore(internalProofSlide, clientsLoveSlide)");
  const navigation = deck.indexOf("const slides = document.querySelectorAll('.slide:not([hidden])')");
  assert.ok(expertReorder >= 0 && expertReorder < proofReorder, 'Expert AIs must move first');
  assert.ok(proofReorder < navigation, 'internal proof must move before navigation captures slide order');
});
```

- [ ] **Step 3: Add exact copy and semantic path tests**

```js
test('internal proof slide preserves the approved data and two model paths', () => {
  const proof = section('id="internal-proof-slide"', '<!-- S5, 2 Stages Overview -->');
  [
    'WE RAN THIS ON OURSELVES',
    'One extra step changes everything.',
    'MODEL A · AD TO CALL',
    '35%',
    '20%',
    'MODEL B · AD TO ASSESSMENT TO CALL',
    'AI assessment',
    '60%',
    '33%',
    'what we run internally',
    'From 1,000 completed AI assessments',
    '$612,000+',
    'contracted revenue',
    '34 high-ticket clients, our own business',
    'We didn’t just build this for clients. We ran it on ourselves first, and it’s what took our own show and close rates from Model A to Model B.',
    'Figures reflect internal Kodara data, not a guarantee of client results.',
  ].forEach((copy) => assert.ok(proof.includes(copy), `missing approved copy: ${copy}`));
  assert.equal((proof.match(/<ol class="internal-proof-path/g) ?? []).length, 2);
  assert.equal((proof.match(/<li class="internal-proof-step(?: |")/g) ?? []).length, 9);
  assert.match(proof, /<ol class="internal-proof-path internal-proof-path--four"[^>]*>.*Ad.*Booked call.*35%.*Shows up.*20%.*Closes.*<\/ol>/s);
  assert.match(proof, /<ol class="internal-proof-path internal-proof-path--five"[^>]*>.*Ad.*AI assessment.*Booked call.*60%.*Shows up.*33%.*Closes.*<\/ol>/s);
});

test('internal proof slide has a compact stacked mobile layout', () => {
  assert.match(deck, /@media \(max-width: 900px\) \{[^}]*\.slide--internal-proof/s);
  assert.match(deck, /\.internal-proof-path \{[^}]*grid-template-columns: 1fr;[^}]*\}/s);
  assert.match(deck, /\.internal-proof-step:not\(:last-child\)::after \{[^}]*content: '↓';[^}]*\}/s);
});
```

- [ ] **Step 4: Update the approved visible slide count**

Rename the test to `deck contains the approved 20 visible slides in order` and change its count assertion to:

```js
assert.equal(visibleSlideStarts.length, 20);
```

- [ ] **Step 5: Run the focused tests and confirm they fail for the missing slide**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL on the missing `internal-proof-slide`, missing ordering line, and 19 instead of 20 visible slides.

### Task 2: Build the approved slide in the active deck

**Files:**
- Modify: `slides/deck.html:1933-2010`
- Modify: `slides/deck.html:2240-2245`
- Modify: `slides/deck.html:2963-2968`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add the namespaced desktop styles before the launch-flow styles**

```css
  .slide--internal-proof { padding-block: 30px; }
  .internal-proof {
    width: min(100%, 960px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .internal-proof__header { display: flex; flex-direction: column; gap: 4px; text-align: center; }
  .internal-proof__header .h-lg { font-size: clamp(31px, 3.3vw, 44px); }
  .internal-proof-model { display: flex; flex-direction: column; gap: 6px; }
  .internal-proof-model__label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    color: var(--al-500);
    text-transform: uppercase;
  }
  .internal-proof-path {
    display: grid;
    gap: 22px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .internal-proof-path--four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .internal-proof-path--five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .internal-proof-step {
    position: relative;
    min-width: 0;
    min-height: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    padding: 9px 8px;
    border: 1px solid var(--al-100);
    border-radius: 14px;
    background: var(--white);
    box-shadow: var(--shadow-card);
    color: var(--al-700);
    text-align: center;
  }
  .internal-proof-step:not(:last-child)::after {
    content: '→';
    position: absolute;
    left: calc(100% + 6px);
    top: 50%;
    width: 10px;
    color: var(--al-400);
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    transform: translateY(-50%);
  }
  .internal-proof-step__metric {
    font-family: var(--font-hero);
    font-size: 25px;
    font-weight: 600;
    line-height: 1;
    color: var(--al-900);
  }
  .internal-proof-step__name { font-size: 12px; font-weight: 650; line-height: 1.25; }
  .internal-proof-model--highlight .internal-proof-model__label { color: var(--brand-950); }
  .internal-proof-model--highlight .internal-proof-step { background: var(--brand-50); border-color: rgba(16,104,68,.18); }
  .internal-proof-model--highlight .internal-proof-step:not(:last-child)::after { color: var(--brand-950); }
  .internal-proof-step--key { background: var(--brand-950) !important; color: var(--white); }
  .internal-proof-step--result { background: rgba(16,104,68,.12) !important; color: var(--brand-950); }
  .internal-proof-step--result .internal-proof-step__metric { color: var(--brand-950); }
  .internal-proof-model__badge {
    align-self: flex-end;
    margin-bottom: -2px;
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--brand-950);
    color: var(--white);
    font-size: 9px;
    font-weight: 700;
  }
  .internal-proof-result {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 16px;
    padding: 14px 22px;
    border: 1px solid rgba(16,104,68,.18);
    border-radius: 16px;
    background: var(--brand-50);
    text-align: left;
  }
  .internal-proof-result__intro { grid-column: 1 / -1; font-size: 11px; font-weight: 650; color: var(--al-600); }
  .internal-proof-result__amount { font-family: var(--font-hero); font-size: 39px; font-weight: 600; line-height: 1; color: var(--brand-950); }
  .internal-proof-result__revenue { font-size: 18px; font-weight: 650; color: var(--al-700); }
  .internal-proof-result__detail { grid-column: 1 / -1; font-size: 11px; color: var(--al-500); }
  .internal-proof__support { margin: 0 auto; max-width: 820px; font-size: 11px; font-weight: 600; line-height: 1.35; color: var(--al-600); text-align: center; }
  .internal-proof__disclaimer { margin: 0; font-size: 9px; line-height: 1.3; color: var(--al-400); text-align: center; }
```

- [ ] **Step 2: Add the mobile rules inside the existing `@media (max-width: 900px)` section**

```css
    .slide--internal-proof { align-items: flex-start; padding-block: 24px; overflow-y: auto; }
    .internal-proof { gap: 14px; }
    .internal-proof-path { grid-template-columns: 1fr; gap: 18px; }
    .internal-proof-step { min-height: 58px; }
    .internal-proof-step:not(:last-child)::after {
      content: '↓';
      left: 50%;
      top: calc(100% + 4px);
      transform: translateX(-50%);
    }
    .internal-proof-result { grid-template-columns: 1fr; text-align: center; row-gap: 5px; }
    .internal-proof-result__intro,
    .internal-proof-result__detail { grid-column: auto; }
```

- [ ] **Step 3: Add the semantic slide markup after `expert-ai-slide` and before the S5 comment**

```html
  <div class="slide slide--internal-proof" id="internal-proof-slide" role="group" aria-roledescription="slide" aria-labelledby="internal-proof-title">
    <div class="bg-orb bg-orb--green" style="top: -160px; right: -80px;"></div>
    <div class="bg-orb bg-orb--cyan" style="bottom: -170px; left: -100px;"></div>

    <div class="internal-proof">
      <header class="internal-proof__header">
        <div class="rv d1"><span class="label-tag">WE RAN THIS ON OURSELVES</span></div>
        <div class="rv d2"><h2 id="internal-proof-title" class="h-lg">One extra step changes everything.</h2></div>
      </header>

      <section class="internal-proof-model rv d3" aria-labelledby="model-a-label">
        <h3 id="model-a-label" class="internal-proof-model__label">MODEL A · AD TO CALL</h3>
        <ol class="internal-proof-path internal-proof-path--four">
          <li class="internal-proof-step"><span class="internal-proof-step__name">Ad</span></li>
          <li class="internal-proof-step"><span class="internal-proof-step__name">Booked call</span></li>
          <li class="internal-proof-step"><span class="internal-proof-step__metric">35%</span><span class="internal-proof-step__name">Shows up</span></li>
          <li class="internal-proof-step"><span class="internal-proof-step__metric">20%</span><span class="internal-proof-step__name">Closes</span></li>
        </ol>
      </section>

      <section class="internal-proof-model internal-proof-model--highlight rv d4" aria-labelledby="model-b-label">
        <h3 id="model-b-label" class="internal-proof-model__label">MODEL B · AD TO ASSESSMENT TO CALL</h3>
        <div class="internal-proof-model__badge">what we run internally</div>
        <ol class="internal-proof-path internal-proof-path--five">
          <li class="internal-proof-step"><span class="internal-proof-step__name">Ad</span></li>
          <li class="internal-proof-step internal-proof-step--key"><span class="internal-proof-step__name">AI assessment</span></li>
          <li class="internal-proof-step"><span class="internal-proof-step__name">Booked call</span></li>
          <li class="internal-proof-step internal-proof-step--result"><span class="internal-proof-step__metric">60%</span><span class="internal-proof-step__name">Shows up</span></li>
          <li class="internal-proof-step internal-proof-step--result"><span class="internal-proof-step__metric">33%</span><span class="internal-proof-step__name">Closes</span></li>
        </ol>
      </section>

      <section class="internal-proof-result rv d5" aria-label="Internal Kodara results">
        <div class="internal-proof-result__intro">From 1,000 completed AI assessments</div>
        <div class="internal-proof-result__amount">$612,000+</div>
        <div class="internal-proof-result__revenue">contracted revenue</div>
        <div class="internal-proof-result__detail">34 high-ticket clients, our own business</div>
      </section>

      <p class="internal-proof__support rv d6">We didn’t just build this for clients. We ran it on ourselves first, and it’s what took our own show and close rates from Model A to Model B.</p>
      <p class="internal-proof__disclaimer rv d7">Figures reflect internal Kodara data, not a guarantee of client results.</p>
    </div>
  </div>
```

- [ ] **Step 4: Place the new slide between Expert AIs and client proof at runtime**

Add the new reference and ordering call before the `slides` query:

```js
  const internalProofSlide = document.getElementById('internal-proof-slide');
  deckElement.insertBefore(expertAiSlide, clientsLoveSlide);
  deckElement.insertBefore(internalProofSlide, clientsLoveSlide);
```

- [ ] **Step 5: Run the focused tests and confirm the active deck passes**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS for the new slide tests and the 20-slide count. Existing tests also remain green.

- [ ] **Step 6: Commit the active deck and test changes**

```powershell
git add -- slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: add internal assessment proof slide"
```

### Task 3: Synchronize the preview copy and verify the rendered deck

**Files:**
- Modify: `slides/deck-july-2026.html`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add a failing synchronization test**

```js
test('active and versioned July decks remain synchronized', () => {
  assert.equal(versionedDeck, deck);
});
```

- [ ] **Step 2: Run the synchronization test and confirm it fails**

Run:

```powershell
node --test --test-name-pattern="active and versioned" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because `deck-july-2026.html` does not contain the new slide yet.

- [ ] **Step 3: Copy the completed active deck to the versioned preview**

```powershell
Copy-Item -LiteralPath slides\deck.html -Destination slides\deck-july-2026.html -Force
```

- [ ] **Step 4: Run all deck tests and the production build**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs
npm run build
```

Expected: all deck tests PASS and Vite exits with `built` successfully.

- [ ] **Step 5: Preview desktop and phone layouts**

Open `http://127.0.0.1:8768/slides/deck.html`, navigate to slide 4, and confirm:

1. Model A and Model B are readable without clipping at desktop size.
2. Model B uses pale green and Kodara green emphasis.
3. The proof figure is dominant and every approved sentence is present.
4. At phone width, paths stack vertically and arrows point down.
5. Slide navigation reports 20 total slides.

- [ ] **Step 6: Commit the synchronized preview copy**

```powershell
git add -- slides/deck-july-2026.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: keep July deck preview synchronized"
```

- [ ] **Step 7: Confirm the worktree is clean**

Run:

```powershell
git status --short
```

Expected: no output.
