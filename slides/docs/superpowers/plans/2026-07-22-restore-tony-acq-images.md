# Restore Tony Robbins and ACQ AI Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the exact original Tony Robbins and ACQ AI screenshots and remove the ACQ zoom.

**Architecture:** Assert the original asset hashes and direct image markup first. Restore both binaries from `ce0f5cf`, remove the scoped zoom wrapper and styles, add cache-busting URL versions, and restore the original provenance entries.

**Tech Stack:** HTML/CSS, Node.js test runner, Git, PowerShell, Vite

---

### Task 1: Add failing rollback coverage

**Files:**
- Modify: `slides/tests/pitch-deck-tweaks.test.mjs`

- [ ] Require Tony Robbins to be 800×450 with SHA-256 `5C2724D6826627C2CFCB40C80CBB013BD2F69C2CBD88E39B17A4B5EE85BA8967`.
- [ ] Require ACQ AI to be 800×450 with SHA-256 `23B7F7454B2555557B5788892D59F999D3C36C23E2D2255C54132B60619EF427`.
- [ ] Require direct versioned image tags for Tony and ACQ, and reject the ACQ zoom wrapper and zoom CSS.
- [ ] Require the original Tony CDN URL and ACQ Open Graph URL in `SOURCES.md`.
- [ ] Run `node --test slides/tests/pitch-deck-tweaks.test.mjs` and confirm failure.
- [ ] Commit with `test: cover original expert AI images`.

### Task 2: Restore assets and remove zoom

**Files:**
- Replace: `slides/ai-proof/tony-robbins.png`
- Replace: `slides/ai-proof/alex-hormozi.png`
- Modify: `slides/ai-proof/SOURCES.md`
- Modify: `slides/deck-july-2026.html`

- [ ] Restore both PNGs with `git restore --source=ce0f5cf -- slides/ai-proof/tony-robbins.png slides/ai-proof/alex-hormozi.png`.
- [ ] Restore their original source rows from commit `ce0f5cf`.
- [ ] Remove `.ai-proof-card__media`, `.ai-proof-card__media--zoom`, and their responsive rule.
- [ ] Replace the ACQ wrapper with a direct image using `?v=20260722c`; add the same version to Tony.
- [ ] Run the focused tests and confirm they pass.
- [ ] Commit with `feat: restore original Tony and ACQ images`.

### Task 3: Verify

**Files:**
- Verify: `slides/deck-july-2026.html`
- Protect: `slides/deck.html`

- [ ] Run both slide test files and `npm run build`.
- [ ] Run `git diff --check` and confirm `slides/deck.html` matches `origin/master`.
- [ ] Inspect slide 3 at 1600×900 and 430×900 for the original Tony and ACQ images, unchanged Grant and Hyman cards, no zoom, no overlap, and no horizontal overflow.
