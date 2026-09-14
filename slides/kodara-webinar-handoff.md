# Kodara Webinar Project Handoff

This document hands off the current Kodara health and wellness webinar deck, its presenter controls, speaker script, tests, and GitHub Pages deployment. The public deck is deployed; the September 14 content revision is committed locally and has not been published. The main unfinished task is bringing the long speaker script back into alignment with the condensed 22-slide deck.

## Current state

- Audience deck: `slides/kodara-webinar.html`
- Presenter view: `slides/kodara-webinar-presenter.html`
- Live URL: <https://lltv28.github.io/mockups-v2/slides/kodara-webinar.html>
- Live Sandra preview: <https://lltv28.github.io/mockups-v2/slides/kodara-webinar.html?slide=2>
- Primary CTA: `KodaraHealth.com/webinar`
- Git branch: `master`
- Last verified deployed commit: `90db54c` (September 14, before this content revision)
- Current deck length: 22 slides
- Authored stage: 1920 by 1080

This repository contains other prototypes. Treat the files named `kodara-webinar*` and the supporting assets under `slides/health/assets/` as the scope of this handoff.

## Source of truth

| File | Purpose | Authority |
| --- | --- | --- |
| `slides/kodara-webinar.html` | Audience-facing deck, visual system, slide order, selector, navigation, video embeds, and presenter synchronization | Primary source of truth |
| `slides/tests/kodara-webinar.test.mjs` | Contract for slide count, order, required copy, claims, media, controls, and 16:9 scaling | Primary verification source |
| `slides/kodara-webinar-presenter.html` | Private presenter window with current and next slide previews, timer, notes, and remote navigation | Primary source for presenter behavior |
| `slides/tests/kodara-webinar-presenter.test.mjs` | Contract for presenter synchronization, notes, timer, and controls | Primary verification source |
| `slides/kodara-webinar-optimized-transcript.md` | Long-form speaker script and Zoom operating notes | Useful draft, but currently out of sync with the 22-slide deck |
| `slides/docs/superpowers/specs/2026-09-14-kodara-demand-and-offer.md` | Current revision scope, confirmed pricing, draft choices, and verification results | Current revision brief |
| `slides/docs/superpowers/specs/2026-09-08-kodara-*.md` | Historical product and narrative decisions | Background only. Several documents refer to older 43-slide or 50-slide versions |

When a historical spec conflicts with the current HTML or tests, follow the current HTML and tests.

## Current webinar flow

### Act 1 Opportunity, authority, and proof

1. How to build the AI version of you
2. Preview the AI version of you
3. Health and wellness interest is moving online
4. The vehicle decides whether this works
5. Broader growth agenda: opportunity, capacity, and done-for-you implementation
6. Why you should listen to Lucas
7. A closer look at the work: proof image space
8. What clients have shared: proof image space
9. Michelle's story with three image spaces
10. Why Lucas built Kodara
11. What Kodara clients have built
12. Healthcare evidence: Gallup left, additional screenshot space right

### Act 2 Demand and acquisition

13. Evidence of what people already want
14. Mine related keywords and group intent
15. Organic and paid paths to the offer
16. The calendar bottleneck

Leave the deck after slide 14 for the live keyword-tool demonstration. Return to slide 15 to explain how those searches can inform organic content and paid ads. Tool estimates show search activity; they do not prove buying intent or guarantee customers.

### Act 3 AI mechanism and demonstration

17. The AI customer path around approved expertise
18. AI marketer, AI salesperson, AI program: an illustrative connected flow
19. Sandra AI demonstration

### Act 4 Offer and ownership

20. One two-column list of the done-for-you build
21. Annual subscription: $8,000 per year. Founding license: $15,000 one time, own it forever. No bonuses listed.

### Act 5 Call to action

22. Book your session at `KodaraHealth.com/webinar`

The September 14 revision is specified in `slides/docs/superpowers/specs/2026-09-14-kodara-demand-and-offer.md`. Two new proof slides and one pricing slide replace space recovered by consolidating the four-slide offer section. The total remains 22.

## Audience deck controls

- Use the bottom-right arrow buttons to move one slide at a time.
- Use `ArrowRight`, `ArrowDown`, or `Space` to advance.
- Use `ArrowLeft` or `ArrowUp` to go back.
- Use `Home` and `End` to jump to the first or last slide.
- Use the grid button in the top-left corner to open the slide selector.
- The selector occupies its own 260px column. The deck scales and centers in the remaining viewport instead of sitting beneath an overlay.
- Selecting a thumbnail keeps the selector open.
- Press `Escape` to close the selector.
- Add `?slide=N` to open a specific slide.
- Add `?preview=1` to hide audience controls inside presenter preview frames.
- The audience deck intentionally has no progress bar or slide counter.

## Presenter view

Press `P` while the audience deck has focus. This opens or refocuses `kodara-webinar-presenter.html`.

The presenter window includes:

- current slide preview;
- next slide preview;
- slide position;
- elapsed time;
- private notes saved in browser local storage by stable slide ID;
- previous and next controls;
- left and right arrow-key navigation when the notes field does not have focus.

The audience deck remains the source of truth. Both windows synchronize through the native `BroadcastChannel` API using the `kodara-webinar` channel. Keep only one audience deck open per origin and browser profile because the channel has no session identifier.

Serve both files from the same origin. Share only the audience window or browser tab in Zoom. Sharing the entire desktop can expose the presenter window and private notes.

## Sandra video behavior

- Slides 2 and 19 share one 680px square media frame. The source video is 1:1, so a 16:9 frame would letterbox it.
- Both embeds use the same Cloudflare video. The poster is the 10-second frame, which shows the Sandra AI chat instead of the opening ad copy.
- Slide 2 loads eagerly and exposes play, seek, mute, settings, picture-in-picture, and fullscreen controls.
- Slide 19 loads lazily.
- The slide selector replaces video iframes with static poster images so thumbnail rendering does not create extra players.
- Two playable Sandra embeds are now intentional. This supersedes the older spec that called for a static opening preview and one playable embed.
- Playback depends on Cloudflare Stream and an internet connection. The older `slides/health/assets/sandra-video-poster.jpg` and `slides/health/assets/sandra-client-story.mp4` belong to a client testimonial, not this AI demonstration. Prepare an approved static AI-demo fallback separately.

## Local preview

Run a static server from the repository root:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:4174/slides/kodara-webinar.html?slide=1
```

The deck is a self-contained HTML presentation, so a static server is the shortest preview path. The repository also has a Vite application. If that application is needed, install its locked dependencies with `npm ci` before running `npm run dev`.

## Verification

Run the focused contracts from the repository root:

```bash
node --test slides/tests/kodara-webinar.test.mjs
node --test slides/tests/kodara-webinar-presenter.test.mjs
```

Before shipping a change, also inspect the affected slide in a real browser at its authored 16:9 proportions. For video changes, confirm the Cloudflare player loads and that play and fullscreen controls are visible.

The tests below inspect source text. They do not execute navigation, notes, or cross-window synchronization; browser checks are required for those behaviors. Static contracts cover:

- the 22-slide order;
- required audience copy and disclosures;
- removal of outdated slides and unsupported claims;
- 1920 by 1080 scaling;
- selector and keyboard behavior;
- URL navigation;
- presenter synchronization and private notes;
- Sandra player attributes and poster thumbnails;
- absence of audience progress and counter UI.

## Deployment

GitHub Pages currently serves the repository root from the `master` branch. The normal deployment is:

```bash
git push origin master
```

Monitor the Pages deployment with:

```bash
gh run list --workflow pages-build-deployment --branch master --limit 3
```

After the Pages run succeeds, verify the exact live webinar URL. Add a temporary cache-busting query parameter if the browser still shows the previous source.

The checked-in `.github/workflows/deploy.yml` listens for pushes to `main`, while active work and GitHub Pages use `master`. That workflow is not the current deployment path and should not be treated as authoritative until its branch and output strategy are intentionally reconciled.

## Visual and writing rules

- Preserve the fixed 1920 by 1080 stage and proportional browser scaling.
- Preserve the existing Instrument Sans typeface, green Kodara accent, 12px corner radius, and restrained light visual system.
- Use the type tokens in `:root` (`--fs-display` through `--fs-small`, `--w-heading`, `--w-body`, `--track-display`, `--track-label`). Do not add raw font sizes. Body text floor is 24px and caption floor is 20px so copy survives Zoom compression.
- Every slide carries a fixed-position `act-label` eyebrow as the first child of its section. It shows the act number and name and replaces the progress bar for wayfinding.
- Use the four layout templates: `stack` (headline top, body centered in the remaining height, footer pinned), split (`profile`, `origin-story`, `provider-demand`, `bottleneck`), `statement` (bridge slides), and the media template (`ai-preview`, `ai-demonstration`). Add `dense` to drop a long headline to the smaller h2 size.
- Use the three surfaces: neutral card (default), `is-emphasis` (brand tint and border, reserved for the Kodara or answer side), and inverse (`agenda-side`, `origin-conclusion`, `close-slide`). Photos, screenshots, and video share the `media-frame` treatment.
- Highlight at most one span per headline in brand green, and only on the payoff word.
- Keep audience slides sparse enough to support Lucas on camera rather than repeat his full script.
- Keep stable slide IDs for unchanged subjects because presenter notes depend on them. Slide URLs and navigation use numeric positions, so reordering changes numeric deep links.
- Apply the Lucas writing style to all new audience-visible marketing copy.
- Keep the offer framed as done for you, with the expert providing knowledge, review, approval, professional judgment, and oversight.

## Claims and compliance boundaries

Do not add a claim unless its evidence and approved wording are available. Existing safeguards include:

- client stories are individual experiences and do not guarantee a specific result;
- no revenue or client outcome is guaranteed;
- the demand chart is explicitly illustrative teaching material, not measured market demand;
- the Gallup slide says the survey does not directly measure demand for independent providers;
- Sandra AI is presented as an AI system, not a hidden human or a replacement for professional judgment;
- the AI uses approved knowledge and has defined human handoffs.

Do not reintroduce claims that AI fully replaces an expert, achieves a stated percentage of the expert's quality, guarantees demand or revenue, monetizes every lead, makes every use case HIPAA compliant, or produces guaranteed health or business outcomes without approved substantiation and terms.

## Known issues and handoff risks

- Proof image spaces still need user assets: two founder proof images, three Michelle images, and one healthcare screenshot.
- The keyword lesson is a draft for refinement with the sales manager. The speaker transcript and saved notes need review against the new order and copy.
- Founding ownership wording and both prices are user-confirmed. No bonus, ongoing support, or third-party operating-cost terms were supplied or invented.

1. **Speaker script mismatch:** `kodara-webinar-optimized-transcript.md` still describes a 43-slide version. Its production advice and claim lock remain useful, but its slide numbers and much of its second half no longer match the live 22-slide deck.
2. **Historical specs are stale:** Several September 8 specs refer to 43-slide or 50-slide versions. They explain intent but should not drive current slide count or order.
3. **Deployment workflow mismatch:** `.github/workflows/deploy.yml` targets `main`; active Pages deployment comes from `master` through the branch-based Pages workflow.
4. **Presenter view needs same-origin windows:** Opening files directly with `file://` can break the intended cross-window setup. Use a local HTTP server or the live site.
5. **Popups may be blocked:** The browser must allow the presenter window opened by the `P` shortcut.
6. **Video is externally hosted:** Keep a static backup ready for a live webinar. If video playback fails, move on instead of troubleshooting during the presentation.
7. **Unrelated untracked files exist:** `slides/kodara-expertise-growth-demo.html` and `slides/tests/kodara-expertise-growth-demo.test.mjs` are separate work. Do not include them in a webinar commit unless their owner confirms that scope.

## Recommended next work

1. Rewrite the optimized speaker script against the current 22-slide order and remove all references to deleted slides.
2. Rehearse the audience deck, presenter window, Sandra playback, and keyword screen share in the exact Zoom sharing setup.
3. Prepare one static Sandra fallback and one static keyword-research fallback in the same shared browser window.
4. Decide whether to repair or remove the unused `main`-branch deployment workflow.
