import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
  assert.match(deck, /You can only sell one person at a time\./);
  assert.match(deck, /Your AI can sell a thousand, all at once\./);
  assert.match(deck, /cloned, automated version of you that works 24\/7/);
  assert.match(deck, /only ready buyers ever land on your calendar/);
  assert.doesNotMatch(deck, /Your business can't grow past how many hours you work/);
});

test('offer ladder sends qualified buyers to high ticket before the Pocket Coach downsell', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  const assessment = ladder.indexOf('AI Assessment');
  const highTicket = ladder.indexOf('1-on-1 Service');
  const pocketCoach = ladder.indexOf('AI Pocket Coach');
  assert.ok(assessment >= 0 && assessment < highTicket && highTicket < pocketCoach);
  assert.match(ladder, /not ready for a call/i);
});

test('AI credibility slide contains four verified products and local images', () => {
  const proof = section('<!-- INTRO 1.3, Big-Name AI Credibility', '<!-- S5, 2 Stages Overview');
  [
    ['Tony Robbins', 'Tony Robbins AI', 'tony-robbins.png'],
    ['Alex Hormozi', 'ACQ AI', 'alex-hormozi.png'],
    ['Grant Cardone', '10X AI Revenue Coach', 'grant-cardone.png'],
    ['Dr. Mark Hyman', 'AI Mark', 'mark-hyman.png'],
  ].forEach(([person, product, file]) => {
    assert.match(proof, new RegExp(person));
    assert.match(proof, new RegExp(product));
    assert.match(proof, new RegExp(`ai-proof/${file}`));
    assert.ok(existsSync(resolve(slidesDir, 'ai-proof', file)), `${file} must exist`);
  });
  ['Available 24/7', 'Automated nurturing', 'Recurring monthly revenue', 'Scale without adding calendar time']
    .forEach((benefit) => assert.match(proof, new RegExp(benefit)));
});
