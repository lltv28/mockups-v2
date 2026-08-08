import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');

function visibleSlideIds() {
  return [...deck.matchAll(/<div class="slide[^"]*"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\shidden(?:\s|=|>)/.test(tag))
    .map((tag) => tag.match(/\sid="([^"]+)"/)?.[1] ?? null);
}

function section(startMarker, endMarker) {
  const start = deck.indexOf(startMarker);
  const end = deck.indexOf(endMarker, start);
  return start >= 0 && end > start ? deck.slice(start, end) : '';
}

test('deck uses the approved 24-slide opening narrative', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 24);
  assert.deepEqual(ids.slice(0, 6), [
    null,
    'client-wall-slide',
    'clients-love-slide',
    'internal-proof-slide',
    'cash-runway-slide',
    'program-overview-slide',
  ]);

  assert.match(
    deck,
    /id="opening-title"[^>]*>We turn your expertise into an <span[^>]*>AI Sales department<\/span> that pays for its own leads<\/h2>/,
  );
  assert.doesNotMatch(deck, /id="real-problem-slide"/);
  assert.doesNotMatch(deck, /The first five minutes decide whether a lead gets worked or wasted\./);
  assert.doesNotMatch(deck, /\.problem-speed-|\.problem-banner/);
  for (const obsoleteMove of [
    'deckElement.insertBefore(internalProofSlide, clientsLoveSlide)',
    'deckElement.insertBefore(programOverviewSlide, clientsLoveSlide)',
    'deckElement.insertBefore(clientsLoveSlide, lucasOnboardingSlide.nextElementSibling)',
    'deckElement.insertBefore(adLoopReinvestmentSlide, internalProofSlide.nextElementSibling)',
  ]) {
    assert.doesNotMatch(deck, new RegExp(obsoleteMove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 24<\/div>/);
});

test('warranty flows directly into ownership with the approved launch language', () => {
  const ids = visibleSlideIds();
  const warrantyIndex = ids.indexOf('double-guarantee-slide');
  assert.ok(warrantyIndex >= 0);
  assert.equal(ids[warrantyIndex + 1], 'ownership-slide');

  const ownership = section('id="ownership-slide"', 'id="investment-slide"');
  assert.match(ownership, /You own the asset\. We keep improving the launch\./);
  assert.match(ownership, /Months 1-6/);
  assert.match(ownership, /We run the entire launch/);
  assert.doesNotMatch(ownership, /During the program/);
  assert.doesNotMatch(ownership, /Weekly optimization/);
  assert.doesNotMatch(deck, /deckElement\.insertBefore\(ownershipSlide, offerRecapSlide\)/);
});

test('mobile opener keeps support copy clear of the scaled flywheel', () => {
  const mobileCss = section('/* ── Mobile ── */', '/* Property Coach AI mockups');
  const shellCss = section('.sales-demo-shell {', '.sales-demo-shell video,');
  const flywheelIframeCss = section(
    '#opening-demo .sales-demo-shell--flywheel iframe {',
    '.sales-demo-shell--live iframe:not([src])',
  );
  const horizontalPadding = Number(mobileCss.match(/\.slide\s*\{[^}]*padding:\s*\d+px\s+(\d+)px/s)?.[1]);
  const stackedGap = Number(mobileCss.match(/\.split-layout\s*\{[^}]*gap:\s*(\d+)px/s)?.[1]);
  const [, aspectWidth, aspectHeight] = shellCss.match(/aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/) ?? [];
  const iframeScale = Number(flywheelIframeCss.match(/transform:\s*scale\(([\d.]+)\)/)?.[1]);
  let cascadedDemoMarginTop = 0;
  for (const rule of deck.matchAll(/#opening-demo\s*\{([^}]*)\}/g)) {
    for (const declaration of rule[1].split(';')) {
      const [property, value] = declaration.split(':').map((part) => part.trim());
      if (property === 'margin') cascadedDemoMarginTop = Number.parseFloat(value);
      if (property === 'margin-top') cascadedDemoMarginTop = Number.parseFloat(value);
    }
  }
  const shellWidth = 390 - (2 * horizontalPadding);
  const shellHeight = shellWidth * Number(aspectHeight) / Number(aspectWidth);
  const transformedOverflowAbove = shellHeight * (iframeScale - 1) / 2;
  const renderedSeparation = stackedGap + cascadedDemoMarginTop - transformedOverflowAbove;

  assert.ok(
    renderedSeparation >= 2,
    `support/demo separation is ${renderedSeparation.toFixed(2)}px at 390px`,
  );
});
