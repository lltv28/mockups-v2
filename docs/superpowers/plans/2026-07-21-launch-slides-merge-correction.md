# Launch Slides Merge Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the current Authority Branding and Organic Launch slides into one 19-slide deck, then give both launch detail slides large square proof previews above their flowcharts.

**Architecture:** Keep the deck in its existing single `slides/deck.html` file and reuse the current launch proof-card and ordered-flow components. Replace the standalone Organic proof slide with a proof-card grid on Authority Branding, move the Organic ordered flow under that grid, add a CSS-rendered ManyChat preview, and update the Node regression tests to lock in the new structure and square media treatment.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner, Vite

---

## File map

- Modify `slides/deck.html`: merge the two slides, add the approved proof-card visuals, remove the old Organic video/bullets, make proof media square, and keep responsive scrolling.
- Modify `slides/tests/pitch-deck-tweaks.test.mjs`: replace the old 20-slide and standalone-Organic assertions with 19-slide, merged-flow, asset, square-preview, and accessibility checks.

### Task 1: Lock the corrected launch structure with failing tests

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:243-332`
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:385-403`

- [ ] **Step 1: Replace the old Launch structure and Organic proof tests**

Replace the tests from `Launch contains four visible slides...` through `Organic Launch keeps the third bullet...` with:

```js
test('Launch contains three visible slides with Authority and Paid Ads in order', () => {
  const launch = section('<!-- Phase 2, Launch (Cover) -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const slideStarts = launch.match(/<div class="slide(?: [^"]*)?"[^>]*>/g) ?? [];
  assert.equal(slideStarts.length, 3);
  slideStarts.forEach((slideStart) => assert.doesNotMatch(slideStart, /\shidden(?:\s|=|>)/));
  assertInOrder(launch, [
    '<!-- Phase 2, Authority Branding Overview -->',
    '<!-- Phase 2, Paid Ads Launch Flow -->',
  ], 'Launch detail slides');
  assert.doesNotMatch(launch, /<!-- Phase 2, Organic Launch Flow -->/);
});

test('Authority Branding combines three proof cards with the Organic flow', () => {
  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const proofIndex = authority.indexOf('class="launch-proof-grid');
  const flowIndex = authority.indexOf('<ol class="upsell-flow rv d4">');

  assertOneVisibleSlide(authority, 'merged Authority Branding slide');
  assert.ok(proofIndex >= 0 && proofIndex < flowIndex, 'Authority proof cards must appear above the Organic flow');
  assert.equal((authority.match(/<li class="launch-proof-card">/g) ?? []).length, 3);
  assert.match(authority, /src="website-bonus\.png"/);
  assert.match(authority, /src="dfy-marketing\.png"/);
  assert.match(authority, /class="manychat-preview"/);
  assert.match(authority, /role="img" aria-label="ManyChat automated comment-to-DM conversation preview"/);
  [
    'Personal branded website',
    'Done-for-you posting',
    'ManyChat comment and DM automation',
  ].forEach((copy) => assert.match(authority, new RegExp(escapeRegex(copy), 'i')));
  assertInOrder(authority, [
    'Content created',
    'Content posted consistently',
    'ManyChat starts the conversation',
    'Lead enters the AI assessment and funnel',
  ], 'merged Organic flow');
  assert.doesNotMatch(authority, /16369f811f94556e674955011d506194/);
  assert.doesNotMatch(authority, /launch-organic-proof|launch-bullet-stack|launch-bullet-card/);
});

```

Also replace the later `organic and paid Launch flows use accessible ordered-list semantics` test with:

```js
test('merged Authority and Paid Ads flows keep accessible ordered-list semantics', () => {
  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');

  [authority, paid].forEach((flow) => {
    assertOneVisibleSlide(flow, 'launch detail slide');
    assert.match(flow, /<ol class="upsell-flow rv d4">/);
    assert.equal((flow.match(/<li class="upsell-step(?: upsell-final)?">/g) ?? []).length, 4);
    assert.equal((flow.match(/<li class="upsell-arrow" aria-hidden="true">→<\/li>/g) ?? []).length, 3);
    assert.match(flow, /<\/ol>/);
  });
});
```

- [ ] **Step 2: Change the full-deck count test to 19 slides**

Replace the test name and count assertion with:

```js
test('deck contains the approved 19 visible slides in order', () => {
  const visibleSlideStarts = [...deck.matchAll(/<div class="slide(?: [^"]*)?"(?![^>]*\shidden)[^>]*>/g)];
  assert.equal(visibleSlideStarts.length, 19);
  const orderedCopy = [
    'You can only sell one person at a time',
    'Meet the version of you that never stops selling',
    'Why our clients love the Kodara model',
    'The biggest experts are already turning their knowledge into AI',
    'Build and launch',
    "Your life's work finally working without you",
    'Your entire AI system, built and launched for you',
    'Two ways to pay',
  ];
  let cursor = -1;
  orderedCopy.forEach((copy) => {
    const next = deck.indexOf(copy, cursor + 1);
    assert.ok(next > cursor, `${copy} must appear in order`);
    cursor = next;
  });
});
```

- [ ] **Step 3: Run the focused tests and confirm the old deck fails**

Run:

```powershell
node --test --test-name-pattern="Launch contains three|Authority Branding combines|merged Authority|approved 19" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the deck still has a standalone Organic slide and 20 visible slides.

### Task 2: Merge Slides 14 and 15 with approved proof cards

**Files:**
- Modify: `slides/deck.html:1904-1941`
- Modify: `slides/deck.html:2503-2592`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Remove the obsolete Organic proof CSS and add the ManyChat preview styles**

Remove `.launch-organic-proof`, `.launch-bullet-stack`, and `.launch-bullet-card` rules. Keep the current launch grid and 112px proof-card media rows for this structural task. Add these ManyChat preview rules after `.launch-proof-card__body`:

```css
.manychat-preview { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px; background: linear-gradient(145deg, #f4efff 0%, #ffffff 62%, #edf8f3 100%); }
.manychat-preview__header { display: flex; align-items: center; gap: 7px; color: #5b2aa5; font-size: 12px; font-weight: 700; }
.manychat-preview__dot { width: 9px; height: 9px; border-radius: 50%; background: #6d34bd; box-shadow: 0 0 0 4px rgba(109,52,189,.12); }
.manychat-preview__thread { display: flex; flex: 1; flex-direction: column; justify-content: center; gap: 9px; }
.manychat-preview__bubble { max-width: 82%; padding: 9px 11px; border-radius: 11px; background: #e8ddff; color: #4a2a74; font-size: 9px; line-height: 1.3; box-shadow: 0 4px 12px rgba(74,42,116,.08); }
.manychat-preview__bubble--reply { align-self: flex-end; background: var(--brand-950); color: var(--white); }
```

- [ ] **Step 2: Replace the Authority and standalone Organic slides with one merged slide**

Replace everything from `<!-- Phase 2, Authority Branding Overview -->` up to `<!-- Phase 2, Paid Ads Launch Flow -->` with:

```html
<!-- Phase 2, Authority Branding Overview -->
<div class="slide slide--launch-proof">
  <div class="bg-orb bg-orb--green" style="top: -100px; right: -80px;"></div>
  <div class="bg-orb bg-orb--cyan" style="bottom: -120px; left: -80px;"></div>

  <div class="content--wide text-center flex-col launch-flow-layout">
    <div class="flex-col gap-10">
      <div class="rv d1"><span class="label-tag">Phase 2 · Authority Branding</span></div>
      <div class="rv d2"><h2 class="h-lg">Your authority system, built for you.</h2></div>
      <div class="rv d3"><p class="body" style="max-width: 720px; margin: 0 auto; color: var(--al-500); font-size: 12px; line-height: 1.35;">A consistent brand presence turns attention into conversations before a lead ever reaches your calendar.</p></div>
    </div>

    <ul class="launch-proof-grid rv d3" role="list">
      <li class="launch-proof-card">
        <div class="launch-proof-media"><img src="website-bonus.png" alt="Examples of personal branded websites"></div>
        <div class="launch-proof-copy">
          <div class="launch-proof-card__title">Personal branded website</div>
          <div class="launch-proof-card__body">A credible home for your expertise, offers, and AI products.</div>
        </div>
      </li>
      <li class="launch-proof-card">
        <div class="launch-proof-media"><img src="dfy-marketing.png" alt="Done-for-you content library"></div>
        <div class="launch-proof-copy">
          <div class="launch-proof-card__title">Done-for-you posting</div>
          <div class="launch-proof-card__body">Consistent content keeps your ideas visible to the right audience.</div>
        </div>
      </li>
      <li class="launch-proof-card">
        <div class="launch-proof-media" role="img" aria-label="ManyChat automated comment-to-DM conversation preview">
          <div class="manychat-preview" aria-hidden="true">
            <div class="manychat-preview__header"><span class="manychat-preview__dot"></span>ManyChat</div>
            <div class="manychat-preview__thread">
              <div class="manychat-preview__bubble">Comment “GUIDE” below and I’ll send it to you.</div>
              <div class="manychat-preview__bubble manychat-preview__bubble--reply">GUIDE</div>
              <div class="manychat-preview__bubble">Sent to your DMs ✓</div>
            </div>
          </div>
        </div>
        <div class="launch-proof-copy">
          <div class="launch-proof-card__title">ManyChat comment and DM automation</div>
          <div class="launch-proof-card__body">Every response can become a direct, automated sales conversation.</div>
        </div>
      </li>
    </ul>

    <ol class="upsell-flow rv d4">
      <li class="upsell-step">
        <div class="upsell-step__tag">Step 1</div>
        <div class="upsell-step__title">Content created</div>
        <div class="upsell-step__body">We turn your expertise into clear, useful content designed for your audience.</div>
        <div class="upsell-step__price">Create</div>
      </li>
      <li class="upsell-arrow" aria-hidden="true">→</li>
      <li class="upsell-step">
        <div class="upsell-step__tag">Step 2</div>
        <div class="upsell-step__title">Content posted consistently</div>
        <div class="upsell-step__body">Your brand stays visible without adding another task to your calendar.</div>
        <div class="upsell-step__price">Publish</div>
      </li>
      <li class="upsell-arrow" aria-hidden="true">→</li>
      <li class="upsell-step">
        <div class="upsell-step__tag">Step 3</div>
        <div class="upsell-step__title">ManyChat starts the conversation</div>
        <div class="upsell-step__body">Comments and direct messages trigger an automated, personal response.</div>
        <div class="upsell-step__price">Engage</div>
      </li>
      <li class="upsell-arrow" aria-hidden="true">→</li>
      <li class="upsell-step upsell-final">
        <div class="upsell-step__tag">Step 4</div>
        <div class="upsell-step__title">Lead enters the AI assessment and funnel</div>
        <div class="upsell-step__body">Interested people move into the sales experience while their attention is fresh.</div>
        <div class="upsell-step__price">Convert</div>
      </li>
    </ol>
  </div>
</div>

```

- [ ] **Step 3: Run the merged-structure tests**

Run:

```powershell
node --test --test-name-pattern="Launch contains three|Authority Branding combines|merged Authority|approved 19" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Commit the merged slide**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: merge Authority and Organic launch slides"
```

### Task 3: Apply square media to both launch detail slides

**Files:**
- Modify: `slides/deck.html:1904-1941`
- Test: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Add the square-preview regression test after the existing Paid Ads proof test**

```js
test('both launch detail slides use full square proof previews with visible descriptions', () => {
  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const launchCss = section('/* ── Launch flow components ── */', '/* deck-wide: balance line widths');

  [authority, paid].forEach((slide) => {
    assert.equal((slide.match(/<li class="launch-proof-card">/g) ?? []).length, 3);
    assert.equal((slide.match(/class="launch-proof-copy"/g) ?? []).length, 3);
    assert.equal((slide.match(/class="launch-proof-card__body"/g) ?? []).length, 3);
  });
  assert.match(launchCss, /\.launch-proof-card \.launch-proof-media \{[^}]*aspect-ratio: 1 \/ 1;/);
  assert.doesNotMatch(launchCss, /grid-template-rows:\s*112px auto/);
  assert.doesNotMatch(launchCss, /grid-template-rows:\s*200px auto/);
});
```

- [ ] **Step 2: Run the new test and confirm it fails**

Run:

```powershell
node --test --test-name-pattern="full square" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: FAIL because the proof-card media rows are still fixed at 112px and 200px.

- [ ] **Step 3: Replace the launch sizing rules with square shared media**

Replace the existing launch layout, proof media, proof grid, proof card, proof copy, and compact flow rules with:

```css
.launch-flow-layout { justify-content: center; gap: 8px; }
.launch-flow-layout .h-lg { font-size: clamp(26px, 3vw, 38px); }
.launch-proof-media { position: relative; overflow: hidden; background: var(--al-25); border: 1px solid var(--al-100); border-radius: 14px; box-shadow: var(--shadow-card); }
.launch-proof-media iframe, .launch-proof-media img { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; object-fit: cover; object-position: center top; }
.launch-proof-grid { list-style: none; margin: 0 auto; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; max-width: 900px; width: 100%; text-align: left; }
.launch-proof-card { display: grid; grid-template-rows: auto auto; overflow: hidden; background: var(--white); border: 1px solid var(--al-100); border-radius: 14px; box-shadow: var(--shadow-card); }
.launch-proof-card .launch-proof-media { min-height: 0; aspect-ratio: 1 / 1; border: 0; border-radius: 0; box-shadow: none; }
.launch-proof-copy { padding: 8px 10px 9px; }
.launch-proof-card__title { color: var(--al-900); font-size: 12px; font-weight: 700; line-height: 1.2; }
.launch-proof-card__body { margin-top: 2px; color: var(--al-600); font-size: 9px; line-height: 1.25; }
.launch-flow-layout .upsell-step { padding: 8px 9px; gap: 2px; }
.launch-flow-layout .upsell-step__title { font-size: 11px; }
.launch-flow-layout .upsell-step__body { font-size: 8.5px; line-height: 1.3; }
.launch-flow-layout .upsell-step__price { font-size: 14px; }
```

- [ ] **Step 4: Replace the launch responsive block so stacked cards remain square**

```css
@media (max-width: 900px) {
  .slide--launch-proof { overflow-x: hidden; overflow-y: auto; justify-content: flex-start; align-items: flex-start; }
  .slide--launch-proof > .content--wide { justify-content: flex-start !important; align-items: stretch; }
  .launch-proof-grid { grid-template-columns: 1fr; }
  .launch-proof-card { width: min(100%, 420px); justify-self: center; }
  .upsell-flow { flex-direction: column; }
  .upsell-arrow { transform: rotate(90deg); height: 22px; }
}
```

- [ ] **Step 5: Run the square-preview and Paid Ads tests**

Run:

```powershell
node --test --test-name-pattern="Paid Ads Launch shows|full square|Launch proof slides hide" slides/tests/pitch-deck-tweaks.test.mjs
```

Expected: PASS. The shared media rule supplies `aspect-ratio: 1 / 1`, and the old 112px and 200px media rows are gone.

- [ ] **Step 6: Commit the square-preview treatment**

```powershell
git add slides/deck.html slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "feat: enlarge launch proof previews"
```

### Task 4: Full regression and browser verification

**Files:**
- Verify: `slides/deck.html`
- Verify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] **Step 1: Run every deck regression test**

Run:

```powershell
node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs
```

Expected: all 33 tests PASS, or the updated total if the replaced tests change the count.

- [ ] **Step 2: Build the site**

Run:

```powershell
npm run build
```

Expected: Vite exits successfully and writes the production bundle to `dist/`.

- [ ] **Step 3: Check formatting and branch scope**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and no unrelated working-tree changes.

- [ ] **Step 4: Verify the two launch detail slides at desktop and narrow widths**

Open `http://127.0.0.1:8766/slides/deck.html` and inspect the merged Authority slide and the following Paid Ads slide at 1600×900, 900×900, and 430×900.

Expected at 1600×900:

1. The Authority slide shows three square previews and all three descriptions above the four-step Organic flow.
2. The Paid Ads slide shows three square previews and all three descriptions above its four-step flow.
3. Neither slide clips, overlaps, or hides the bottom flowchart.

Expected at 900×900 and 430×900: cards stack, each preview stays square, vertical scrolling reaches the complete flowchart, and horizontal overflow is absent.

- [ ] **Step 5: Verify navigation and the new slide count**

Use the right-arrow key from the first slide through the last slide, then use the left-arrow key once.

Expected: the counter reaches `19 / 19`, each arrow advances one slide, and the previous-slide action works. The Paid Ads video controls remain usable.
