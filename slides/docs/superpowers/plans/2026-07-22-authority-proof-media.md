# Authority Proof Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the Cheryl Hunter website screenshot and supplied looping Cloudflare Stream video in the first two Authority Branding proof cards.

**Architecture:** Keep the existing square proof-card media containers. Store the website screenshot beside the deck for portable local use, and place the supplied Cloudflare Stream iframe directly inside the posting card.

**Tech Stack:** Static HTML, CSS, Node.js test runner, Vite

---

### Task 1: Lock the approved media requirements into the deck test

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs:291-323`

- [ ] **Step 1: Replace the old image expectations with the approved media expectations**

```js
assert.match(proofGrid, /src="authority-website-cheryl-hunter\.jpeg"/);
assert.match(proofGrid, /<iframe[\s\S]*393d729a00e6a20de5e23ae1665153da[\s\S]*<\/iframe>/);
assert.match(proofGrid, /title="Done-for-you posting video preview"/);
assert.doesNotMatch(proofGrid, /src="website-bonus\.png"/);
assert.doesNotMatch(proofGrid, /src="dfy-marketing\.png"/);
assert.ok(existsSync(resolve(slidesDir, 'authority-website-cheryl-hunter.jpeg')));
```

- [ ] **Step 2: Run the focused test and verify it fails because the new media is absent**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs`

Expected: FAIL in `Authority Branding combines three proof cards with the Organic flow` because `authority-website-cheryl-hunter.jpeg` and the Cloudflare iframe are missing.

- [ ] **Step 3: Commit the failing test**

```powershell
git add slides/tests/pitch-deck-tweaks.test.mjs
git commit -m "test: cover authority proof card media"
```

### Task 2: Add the approved screenshot and video

**Files:**
- Create: `slides/authority-website-cheryl-hunter.jpeg`
- Modify: `slides/deck-july-2026.html:2548-2563`

- [ ] **Step 1: Copy the newest downloaded website screenshot into the deck**

```powershell
Copy-Item -LiteralPath 'C:\Users\lucas\Downloads\Screenshot_22-7-2026_103113_cherylhunter.com.jpeg' -Destination 'slides\authority-website-cheryl-hunter.jpeg'
```

- [ ] **Step 2: Replace the website card image**

```html
<div class="launch-proof-media"><img src="authority-website-cheryl-hunter.jpeg" alt="Cheryl Hunter personal branded website homepage"></div>
```

- [ ] **Step 3: Replace the posting card image with the supplied video embed**

```html
<div class="launch-proof-media">
  <iframe
    src="https://customer-nguqf0yqc9xf45px.cloudflarestream.com/393d729a00e6a20de5e23ae1665153da/iframe?preload=true&amp;loop=true&amp;autoplay=true&amp;muted=true&amp;poster=https%3A%2F%2Fcustomer-nguqf0yqc9xf45px.cloudflarestream.com%2F393d729a00e6a20de5e23ae1665153da%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
    title="Done-for-you posting video preview"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen
  ></iframe>
</div>
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs`

Expected: 32 tests pass and 0 fail.

- [ ] **Step 5: Commit the card media update**

```powershell
git add slides/authority-website-cheryl-hunter.jpeg slides/deck-july-2026.html
git commit -m "feat: update authority proof card media"
```

### Task 3: Verify the complete deck

**Files:**
- Verify: `slides/deck-july-2026.html`
- Verify: `slides/deck.html`

- [ ] **Step 1: Run all deck checks**

Run: `node --test slides/tests/pitch-deck-tweaks.test.mjs slides/tests/slide3-logo-strip.test.mjs`

Expected: 38 tests pass and 0 fail.

- [ ] **Step 2: Build the project**

Run: `npm run build`

Expected: Vite exits with code 0.

- [ ] **Step 3: Confirm the original deck remains unchanged**

Run: `git diff --quiet origin/master -- slides/deck.html`

Expected: exit code 0.

- [ ] **Step 4: Confirm the local preview serves both media elements**

Open: `http://127.0.0.1:8768/slides/deck-july-2026.html`

Expected: the Authority Branding slide shows the Cheryl Hunter screenshot in the first card and the looping posting video in the second card.
