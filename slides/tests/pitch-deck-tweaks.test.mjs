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

test('deck uses two stages and preserves the Build sequence', () => {
  assert.match(deck, /The Kodara System/);
  assert.match(deck, /Build and launch\./);
  assert.doesNotMatch(deck, /Build, launch, monetize\./i);
  ['Lucas Onboarding Call', 'Your Entry Level AI', 'Your AI Pocket Coach', 'Three products, all ready to launch', 'We prove it works before the world sees it']
    .forEach((copy) => assert.match(deck, new RegExp(copy)));
});

test('Launch contains authority branding plus organic and paid flows', () => {
  ['Personal branded website', 'Done-for-you posting', 'ManyChat comment and DM automation']
    .forEach((copy) => assert.match(deck, new RegExp(escapeRegex(copy), 'i')));
  ['Content created', 'Content posted consistently', 'ManyChat starts the conversation', 'Lead enters the AI assessment and funnel']
    .forEach((copy) => assert.match(deck, new RegExp(escapeRegex(copy), 'i')));
  ['Ads created and configured', 'Traffic reaches the funnel', 'Buyer completes the $17 assessment', 'remaining buyers receive the Pocket Coach offer']
    .forEach((copy) => assert.match(deck, new RegExp(escapeRegex(copy), 'i')));
});

test('obsolete marketing and Monetize slides are removed', () => {
  ['Done-For-You Pipeline Activation', 'Phase 3 · Ascension', 'Back-End Ecosystem', 'How the AI upsells every lead']
    .forEach((copy) => assert.doesNotMatch(deck, new RegExp(copy, 'i')));
});
