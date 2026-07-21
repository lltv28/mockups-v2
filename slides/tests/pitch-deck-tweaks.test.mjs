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

test('opening uses the approved AI scale message', () => {
  const opening = section('<!-- INTRO 1, Bottleneck (4-combo intro from sales manager) -->', '<!-- INTRO 1.1,');
  assert.match(opening, /You can only sell one person at a time\./);
  assert.match(opening, /Your AI can sell a thousand, all at once\./);
  assert.match(opening, /cloned, automated version of you that works 24\/7/);
  assert.match(opening, /only ready buyers ever land on your calendar/);
  assert.doesNotMatch(opening, /Your business can't grow past how many hours you work/);
});

test('offer ladder sends qualified buyers to high ticket before the Pocket Coach downsell', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  const assessment = ladder.indexOf('AI Assessment');
  const highTicket = ladder.indexOf('1-on-1 Service');
  const pocketCoach = ladder.indexOf('AI Pocket Coach');
  assert.ok(assessment >= 0 && assessment < highTicket && highTicket < pocketCoach);
  assert.match(ladder, /not ready for a call/i);
});

test('product library keeps high ticket before the Pocket Coach downsell', () => {
  const library = section('<!-- Phase 1, AI Product Library Recap', '<!-- Phase 2, Test');
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
