import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const slidesDir = resolve(here, '..');
const deck = readFileSync(resolve(slidesDir, 'deck.html'), 'utf8');

function section(startMarker, endMarker) {
  const start = deck.indexOf(startMarker);
  const end = deck.indexOf(endMarker, start + startMarker.length);
  assert.ok(start >= 0, `missing marker: ${startMarker}`);
  assert.ok(end > start, `missing end marker: ${endMarker}`);
  return deck.slice(start, end);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertInOrder(content, copies, label) {
  let cursor = -1;
  copies.forEach((copy) => {
    const next = content.indexOf(copy, cursor + 1);
    assert.ok(next > cursor, `${label}: ${copy} must appear in order`);
    cursor = next;
  });
}

function assertOneVisibleSlide(content, label) {
  const slideStarts = content.match(/<div class="slide(?: [^"]*)?"[^>]*>/g) ?? [];
  assert.equal(slideStarts.length, 1, `${label} must contain exactly one slide`);
  assert.doesNotMatch(slideStarts[0], /\shidden(?:\s|=|>)/, `${label} must remain visible`);
}

function readPngInfo(imagePath) {
  const bytes = readFileSync(imagePath);
  assert.ok(bytes.length >= 24, `${imagePath} must contain a PNG header`);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${imagePath} must have a PNG signature`);
  assert.equal(bytes.readUInt32BE(8), 13, `${imagePath} must begin with a 13-byte IHDR chunk`);
  assert.equal(bytes.subarray(12, 16).toString('ascii'), 'IHDR', `${imagePath} must begin with an IHDR chunk`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

test('opening uses the approved AI scale message', () => {
  const opening = section('<!-- INTRO 1, Bottleneck (4-combo intro from sales manager) -->', '<!-- INTRO 1.1,');
  assert.match(opening, /You can only sell one person at a time\./);
  assert.match(opening, /Your AI can sell a thousand, all at once\./);
  assert.match(opening, /cloned, automated version of you that works 24\/7/);
  assert.match(opening, /only ready buyers ever land on your calendar/);
  assert.doesNotMatch(opening, /Your business can't grow past how many hours you work/);
});

test('opening slides use headings as their accessible names', () => {
  const opening = section('<!-- INTRO 1, Bottleneck (4-combo intro from sales manager) -->', '<!-- INTRO 1.1,');
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  assert.match(opening, /<div class="slide active" role="group" aria-roledescription="slide" aria-labelledby="opening-title">/);
  assert.match(opening, /<h2 id="opening-title" class="h-hero">/);
  assert.match(ladder, /<div class="slide" role="group" aria-roledescription="slide" aria-labelledby="offer-ladder-title">/);
  assert.match(ladder, /<h2 id="offer-ladder-title" class="h-hero"/);
  assert.doesNotMatch(ladder, /<div class="slide" aria-label=/);
});

test('offer ladder sends qualified buyers to high ticket before the Pocket Coach downsell', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  const cardGridStart = ladder.indexOf('<div class="rv d3"');
  assert.ok(cardGridStart >= 0, 'offer ladder card grid must exist');
  const cards = ladder.slice(cardGridStart);
  const assessment = cards.indexOf('AI Assessment');
  const highTicket = cards.indexOf('1-on-1 Service');
  const pocketCoach = cards.indexOf('AI Pocket Coach');
  assert.ok(assessment >= 0 && assessment < highTicket && highTicket < pocketCoach);
  assert.match(ladder, /not ready for a call/i);
});

test('product library keeps high ticket before the Pocket Coach downsell', () => {
  const library = section('<!-- Phase 1, AI Product Library Recap', '<!-- Phase 1, Test');
  const assessment = library.indexOf('AI Assessment');
  const highTicket = library.indexOf('1-on-1 Service');
  const pocketCoach = library.indexOf('AI Pocket Coach');
  assert.ok(assessment >= 0 && assessment < highTicket && highTicket < pocketCoach);
});

test('AI credibility slide contains four verified products and local images', () => {
  const proof = section('<!-- INTRO 1.3, Big-Name AI Credibility', '<!-- S5, 2 Stages Overview');
  const proofCards = [...proof.matchAll(/<[^>]+\bclass=["'][^"']*\bai-proof-card\b[^"']*["'][^>]*>/g)];
  const imageSources = [...proof.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1]);
  assert.equal(proofCards.length, 4);
  [
    ['Tony Robbins', 'Tony Robbins AI', 'tony-robbins.png'],
    ['Alex Hormozi', 'ACQ AI', 'alex-hormozi.png'],
    ['Grant Cardone', '10X AI Revenue Coach', 'grant-cardone.png'],
    ['Dr. Mark Hyman', 'AI Mark', 'mark-hyman.png'],
  ].forEach(([person, product, file]) => {
    assert.match(proof, new RegExp(person));
    assert.match(proof, new RegExp(product));
    assert.ok(imageSources.includes(`ai-proof/${file}`), `${file} must be referenced by a local image`);
    const imagePath = resolve(slidesDir, 'ai-proof', file);
    assert.ok(existsSync(imagePath), `${file} must exist`);
    assert.ok(statSync(imagePath).size > 10 * 1024, `${file} must be larger than 10 KB`);
  });
  ['Available 24/7', 'Automated nurturing', 'Recurring monthly revenue', 'Scale without adding calendar time']
    .forEach((benefit) => assert.match(proof, new RegExp(benefit)));
});

test('AI credibility slide uses scoped short-viewport scrolling and slide semantics', () => {
  const proof = section('<!-- INTRO 1.3, Big-Name AI Credibility', '<!-- S5, 2 Stages Overview');
  assert.match(proof, /<div class="slide slide--ai-proof" role="group" aria-roledescription="slide" aria-labelledby="ai-proof-title">/);
  assert.match(proof, /<h2 id="ai-proof-title" class="h-lg"/);
  assert.match(deck, /@media \(max-width: 900px\) \{\s*\.slide--ai-proof \{[^}]*overflow-y: auto;[^}]*justify-content: flex-start;[^}]*align-items: flex-start;[^}]*\}\s*\.slide--ai-proof > \.content--wide \{[^}]*justify-content: flex-start !important;[^}]*align-items: stretch;[^}]*\}/s);
});

test('local AI proof images are valid 800 by 450 PNG files', () => {
  ['tony-robbins.png', 'alex-hormozi.png', 'grant-cardone.png', 'mark-hyman.png'].forEach((file) => {
    const dimensions = readPngInfo(resolve(slidesDir, 'ai-proof', file));
    assert.deepEqual(dimensions, { width: 800, height: 450 }, `${file} must be 800 by 450 pixels`);
  });
});

test('AI proof source manifest records exact official provenance without asserting permission', () => {
  const manifestPath = resolve(slidesDir, 'ai-proof', 'SOURCES.md');
  assert.ok(existsSync(manifestPath), 'SOURCES.md must exist');
  const sources = readFileSync(manifestPath, 'utf8');
  assert.match(sources, /Retrieved: 2026-07-21/);
  [
    ['tony-robbins.png', 'https://www.tonyrobbins.com/programs/tony-ai'],
    ['alex-hormozi.png', 'https://ai.acquisition.com/'],
    ['grant-cardone.png', 'https://10xgc.grantcardone.com/blt-offer'],
    ['mark-hyman.png', 'https://drhyman.com/products/ai-mark'],
  ].forEach(([file, url]) => {
    assert.match(sources, new RegExp(file.replace('.', '\\.')));
    assert.ok(sources.includes(url), `${file} must list ${url}`);
  });
  assert.match(sources, /does not assert or grant reuse permission/i);
});

test('thumbnail slide clones are hidden from assistive technology', () => {
  const thumbnailCode = section("wrapper.className = 'thumb-clone';", 'wrapper.appendChild(clonedSlide);');
  const hidden = thumbnailCode.indexOf("wrapper.setAttribute('aria-hidden', 'true');");
  const clone = thumbnailCode.indexOf('const clonedSlide = slide.cloneNode(true);');
  assert.ok(hidden >= 0, 'thumbnail clone wrapper must be aria-hidden');
  assert.ok(hidden < clone, 'thumbnail clone wrapper must be hidden before the slide is cloned');
});

test('obsolete pre-pitch slides are removed', () => {
  const obsoleteHeadings = [
    'Why a $17 AI beats a free lead magnet every time.',
    'The three things everyone asks before they say yes.',
    "We've built AI products for niches you'd never expect.",
    'Same coaching calls. The empty hours now sell on their own.',
  ];
  const remainingHeadings = obsoleteHeadings.filter((heading) => deck.includes(heading));
  assert.deepEqual(remainingHeadings, [], 'obsolete pre-pitch slide content must be removed');
});

test('overview uses exactly the approved Build and Launch stages', () => {
  const overview = section('<!-- S5, 2 Stages Overview -->', '<!-- Phase 1, AI Build (Cover) -->');
  assert.match(overview, /The Kodara System/);
  assert.match(overview, /Build and launch\./);
  assert.doesNotMatch(overview, /Build, launch, monetize\./i);
  assert.equal((overview.match(/class="phase-col /g) ?? []).length, 2);
  assertInOrder(overview, ['Build', '4 weeks', 'Launch', '2 weeks'], 'two-stage overview');
});

test('Build contains seven visible slides in the approved order', () => {
  const buildMarkers = [
    '<!-- Phase 1, AI Build (Cover) -->',
    '<!-- Phase 1, Slide 1, Lucas Onboarding Call -->',
    '<!-- Phase 1, Slide 2, The AI Plan + Connector Grid -->',
    '<!-- Phase 1, Mid-Ticket Demo',
    '<!-- Phase 1, AI Product Library Recap',
    '<!-- Phase 1, Test',
    '<!-- Phase 1 · Validate · Combined Orbit demo',
    '<!-- Phase 2, Launch (Cover) -->',
  ];
  const buildHeadings = [
    '>Build</h2>',
    'Lucas Onboarding Call',
    'Your Entry Level AI',
    'Your AI Pocket Coach',
    'Three products, all ready to launch',
    'We prove it works before the world sees it.',
    'Validate — Command Center Orbit',
  ];
  const build = section(buildMarkers[0], buildMarkers.at(-1));
  assertInOrder(build, buildHeadings, 'Build slides');
  buildHeadings.forEach((heading, index) => {
    const slide = section(buildMarkers[index], buildMarkers[index + 1]);
    assertOneVisibleSlide(slide, `Build slide ${index + 1}`);
    assert.ok(slide.includes(heading), `Build slide ${index + 1} must contain ${heading}`);
  });
});

test('Launch contains four visible slides with the three detail slides in approved order', () => {
  const launch = section('<!-- Phase 2, Launch (Cover) -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const slideStarts = launch.match(/<div class="slide(?: [^"]*)?"[^>]*>/g) ?? [];
  assert.equal(slideStarts.length, 4);
  slideStarts.forEach((slideStart) => assert.doesNotMatch(slideStart, /\shidden(?:\s|=|>)/));
  assertInOrder(launch, [
    '<!-- Phase 2, Authority Branding Overview -->',
    '<!-- Phase 2, Organic Launch Flow -->',
    '<!-- Phase 2, Paid Ads Launch Flow -->',
  ], 'Launch detail slides');

  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Organic Launch Flow -->');
  assertOneVisibleSlide(authority, 'authority branding slide');
  ['Personal branded website', 'Done-for-you posting', 'ManyChat comment and DM automation']
    .forEach((copy) => assert.match(authority, new RegExp(escapeRegex(copy), 'i')));
});

test('organic and paid Launch flows keep four steps in their own approved order', () => {
  const organic = section('<!-- Phase 2, Organic Launch Flow -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  assertOneVisibleSlide(organic, 'organic Launch flow');
  assertOneVisibleSlide(paid, 'paid Launch flow');
  assertInOrder(organic, ['Content created', 'Content posted consistently', 'ManyChat starts the conversation', 'Lead enters the AI assessment and funnel'], 'organic Launch flow');
  assertInOrder(paid, ['Ads created and configured', 'Traffic reaches the funnel', 'Buyer completes the $17 assessment', 'remaining buyers receive the Pocket Coach offer'], 'paid Launch flow');
});

test('organic and paid Launch flows use accessible ordered-list semantics', () => {
  const organic = section('<!-- Phase 2, Organic Launch Flow -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  [organic, paid].forEach((flow) => {
    assert.match(flow, /<ol class="upsell-flow rv d4">/);
    assert.equal((flow.match(/<li class="upsell-step(?: upsell-final)?">/g) ?? []).length, 4);
    assert.equal((flow.match(/class="upsell-arrow"/g) ?? []).length, 3);
    assert.equal((flow.match(/<li class="upsell-arrow" aria-hidden="true">→<\/li>/g) ?? []).length, 3);
    assert.match(flow, /<\/ol>/);
  });
  assert.match(deck, /\.upsell-flow \{[^}]*list-style: none;[^}]*padding: 0;/);
});

test('obsolete marketing and Monetize slides are removed', () => {
  ['Done-For-You Pipeline Activation', 'Phase 3 · Ascension', 'Back-End Ecosystem', 'How the AI upsells every lead']
    .forEach((copy) => assert.doesNotMatch(deck, new RegExp(copy, 'i')));
});

test('closing uses the logo stack and removes internal business numbers', () => {
  const closing = section('<!-- S11, Your Knowledge Becomes An Asset', '<!-- S10b, Payment Plans');
  assert.match(closing, /class="closing-logo-stack"/);
  ['Mayo Clinic', 'Johns Hopkins', 'HighLevel', 'Fidelity Investments', 'ServiceTitan', 'Tony Robbins', 'H&amp;R Block', 'Ramsey Solutions']
    .forEach((name) => assert.match(closing, new RegExp(name)));
  assert.match(closing, /ClickFunnels/);
  assert.doesNotMatch(closing, />\s*34\s*</);
  ['\\$612K\\+', 'APRIL – JUNE 2026', 'out of 1,000 leads with this exact same system']
    .forEach((copy) => assert.doesNotMatch(closing, new RegExp(copy, 'i')));
});

test('investment deliverables match the approved Build and Launch offer', () => {
  [
    'Lucas Onboarding Call', 'Done-For-You AI Build', 'Your AI Avatar', 'AI Sales Team',
    'Personal Branded Website', 'Done-For-You Posting', 'ManyChat Automation',
    'Done-For-You Funnel', 'Paid Ads Setup',
  ].forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
  assert.match(deck, /Requires at least \$5,000 in ad spend/);
  assert.match(deck, /\$6,800 ×3/);
});

test('deck contains the approved 20 visible slides in order', () => {
  const visibleSlideStarts = [...deck.matchAll(/<div class="slide(?: [^"]*)?"(?![^>]*\shidden)[^>]*>/g)];
  assert.equal(visibleSlideStarts.length, 20);
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
