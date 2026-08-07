import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');
const cashStart = deck.indexOf('<!-- Cash Runway Comparison -->');
const cashEnd = deck.indexOf('<!-- INTRO 1.1, The Real Problem -->', cashStart);
const cashSlide = cashStart >= 0 && cashEnd > cashStart ? deck.slice(cashStart, cashEnd) : '';

function visibleSlideIds() {
  return [...deck.matchAll(/<div class="slide[^"]*"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\shidden(?:\s|=|>)/.test(tag))
    .map((tag) => tag.match(/\sid="([^"]+)"/)?.[1] ?? null);
}

test('cash runway is the new visible slide 3', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 25);
  assert.deepEqual(ids.slice(0, 4), [null, 'client-wall-slide', 'cash-runway-slide', 'real-problem-slide']);
  assert.ok(cashStart > deck.indexOf('id="client-wall-slide"'));
  assert.ok(cashEnd < deck.indexOf('id="real-problem-slide"') + 1);
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 25<\/div>/);
});

test('cash runway preserves the approved assumptions and takeaway', () => {
  assert.match(cashSlide, /The cash-flow problem/);
  assert.match(cashSlide, /Stop betting your cash on the next big sale\./);
  assert.match(cashSlide, /24-week illustration · \$30K start · \$2K\/week media · four \$10K high-ticket sales/);
  assert.match(cashSlide, /Traditional marketing/);
  assert.match(cashSlide, /Spend\. Wait\. Hope\./);
  assert.match(cashSlide, /Self-funding AI sales/);
  assert.match(cashSlide, /Recover\. Qualify\. Grow\./);
  assert.match(cashSlide, /Protect the baseline\. Let every high-ticket sale raise the floor\./);
  assert.match(cashSlide, /Illustrative end-of-week cash balance\./);
  assert.match(cashSlide, /processing fees, fulfillment, refunds, taxes, and cash-collection timing are excluded/);
});

test('cash runway is accessible and self-contained', () => {
  assert.match(cashSlide, /id="cash-runway-slide"[^>]*role="group"[^>]*aria-roledescription="slide"[^>]*aria-labelledby="cash-runway-title"/);
  assert.equal((cashSlide.match(/<svg\b/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<svg[^>]*role="img"/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<title>/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<desc>/g) ?? []).length, 2);
  assert.doesNotMatch(cashSlide, /<iframe\b/);
  assert.doesNotMatch(cashSlide, /(?:src|href)="https?:/);
});
