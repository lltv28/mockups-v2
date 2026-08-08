import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');
const cashStart = deck.indexOf('<!-- Cash Runway Comparison -->');
const cashEnd = deck.indexOf('<!-- S5, 2 Stages Overview -->', cashStart);
const cashSlide = cashStart >= 0 && cashEnd > cashStart ? deck.slice(cashStart, cashEnd) : '';

function cashPanel(startMarker, endMarker) {
  const start = cashSlide.indexOf(startMarker);
  const end = cashSlide.indexOf(endMarker, start);
  return start >= 0 && end > start ? cashSlide.slice(start, end) : '';
}

const traditionalPanel = cashPanel(
  'cash-runway-panel cash-runway-panel--traditional',
  '<div class="cash-runway-divider"',
);
const selfFundingPanel = cashPanel(
  'cash-runway-panel cash-runway-panel--self-funding',
  '</section>',
);

function visibleSlideIds() {
  return [...deck.matchAll(/<div class="slide[^"]*"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !/\shidden(?:\s|=|>)/.test(tag))
    .map((tag) => tag.match(/\sid="([^"]+)"/)?.[1] ?? null);
}

function cashRunwaySelectors() {
  const cssStart = deck.indexOf('.slide--cash-runway { zoom: 1.15; }');
  const cssEnd = deck.indexOf('</style>', cssStart);
  const css = cssStart >= 0 && cssEnd > cssStart ? deck.slice(cssStart, cssEnd) : '';
  const selectors = [];
  let tokenStart = 0;

  for (let index = 0; index < css.length; index += 1) {
    if (css[index] === '{') {
      selectors.push(...css.slice(tokenStart, index).split(',').map((selector) => selector.trim()));
      tokenStart = index + 1;
    } else if (css[index] === '}') {
      tokenStart = index + 1;
    }
  }

  return selectors.filter((selector) => selector.includes('.cash-runway'));
}

function cssRuleBody(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, 's'))?.[1] ?? '';
}

function cssPixelValue(ruleBody, property) {
  return Number(ruleBody.match(new RegExp(`${property}:\\s*(-?[\\d.]+)px`))?.[1] ?? Number.NaN);
}

test('cash runway follows the self-funding flywheel as visible slide 4', () => {
  const ids = visibleSlideIds();
  assert.equal(ids.length, 24);
  assert.deepEqual(ids.slice(0, 6), [
    null,
    'client-wall-slide',
    'internal-proof-slide',
    'cash-runway-slide',
    'program-overview-slide',
    'phase-1-cover-slide',
  ]);
  assert.ok(cashStart > deck.indexOf('id="internal-proof-slide"'));
  assert.ok(cashEnd < deck.indexOf('id="program-overview-slide"'));
  assert.match(deck, /<div class="counter" id="counter"><span class="cur">01<\/span> \/ 24<\/div>/);
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

test('cash runway pairs each graph with an accessible one-week transaction ledger', () => {
  assert.equal((cashSlide.match(/<table class="cash-runway-ledger/g) ?? []).length, 2);
  assert.equal((cashSlide.match(/<caption>One illustrative week<\/caption>/g) ?? []).length, 2);

  for (const panel of [traditionalPanel, selfFundingPanel]) {
    assert.match(panel, /<table class="cash-runway-ledger/);
    assert.match(panel, /<tbody>/);
    assert.match(panel, /<tfoot>/);
    assert.equal((panel.match(/data-transaction="facebook-ads" data-amount="-500"/g) ?? []).length, 4);
    assert.equal((panel.match(/>Facebook Ads</g) ?? []).length, 4);
    assert.equal((panel.match(/>−\$500</g) ?? []).length, 4);
    assert.match(panel, /<th scope="row"/);
  }

  assert.match(traditionalPanel, /data-transaction="front-end-sales" data-amount="0"/);
  assert.match(traditionalPanel, />Front-end sales</);
  assert.match(traditionalPanel, />—</);
  assert.match(traditionalPanel, /data-total="weekly-cash-movement" data-amount="-2000"/);
  assert.match(traditionalPanel, />Weekly cash movement</);
  assert.match(traditionalPanel, />−\$2,000</);

  assert.match(selfFundingPanel, /data-transaction="front-end-sales" data-amount="2000"/);
  assert.match(selfFundingPanel, />\+\$2,000</);
  assert.match(selfFundingPanel, /data-total="weekly-cash-movement" data-amount="0"/);
  assert.match(selfFundingPanel, />\$0</);
});

test('cash runway weekly movement values use outcome colors without recoloring labels', () => {
  const traditionalValueRule = cssRuleBody(
    deck,
    '.slide--cash-runway .cash-runway-ledger--traditional tfoot td',
  );
  const selfFundingValueRule = cssRuleBody(
    deck,
    '.slide--cash-runway .cash-runway-ledger--self-funding tfoot td',
  );
  const sharedFooterRule = deck.match(
    /\.slide--cash-runway \.cash-runway-ledger tfoot th,\s*\.slide--cash-runway \.cash-runway-ledger tfoot td\s*\{([^}]*)\}/s,
  )?.[1] ?? '';

  assert.match(traditionalValueRule, /color:\s*#A7474B/);
  assert.match(selfFundingValueRule, /color:\s*var\(--brand-950\)/);
  assert.match(sharedFooterRule, /color:\s*var\(--al-900\)/);
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

test('cash runway uses scoped deck tokens and active-slide animation', () => {
  assert.match(deck, /\.slide--cash-runway\s*\{[^}]*zoom:\s*1\.15/s);
  assert.match(deck, /\.slide--cash-runway \.cash-runway-layout\s*\{/);
  assert.match(deck, /\.slide--cash-runway \.cash-runway-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)\s+1px\s+minmax\(0, 1fr\)/s);
  assert.match(deck, /\.slide--cash-runway \.cash-runway-path--self-funding\s*\{[^}]*stroke:\s*var\(--brand-950\)/s);
  assert.match(deck, /\.slide--cash-runway \.cash-runway-fill--upside\s*\{[^}]*fill:\s*var\(--brand-100\)/s);
  assert.match(deck, /\.slide--cash-runway\.active[^{]*\.cash-runway-path--loss/);
  assert.match(deck, /@keyframes cash-runway-draw/);
  assert.match(deck, /@keyframes cash-runway-draw-staircase/);
  assert.match(deck, /@keyframes cash-runway-label-in/);
});

test('cash runway component selectors are structurally scoped to the slide', () => {
  const selectors = cashRunwaySelectors();
  assert.ok(selectors.length > 0);
  for (const selector of selectors) {
    assert.match(selector, /^(?:\.thumb-clone )?\.slide--cash-runway(?:[\s.:]|$)/, `unscoped selector: ${selector}`);
  }
});

test('cash runway has static thumbnail and reduced-motion fallbacks', () => {
  assert.match(deck, /\.thumb-clone \.slide--cash-runway \.cash-runway-path[^{]*\{[^}]*animation:\s*none\s*!important[^}]*stroke-dashoffset:\s*0\s*!important/s);
  assert.match(deck, /\.thumb-clone \.slide--cash-runway \.cash-runway-closing-label[^{]*\{[^}]*opacity:\s*1\s*!important/s);
  const reducedStart = deck.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedStart >= 0);
  const reducedWindow = deck.slice(reducedStart, reducedStart + 900);
  assert.match(reducedWindow, /\.slide--cash-runway \.cash-runway-path/);
  assert.match(reducedWindow, /\.slide--cash-runway \.cash-runway-closing-label/);
});

test('cash runway stacks without horizontal overflow on narrow screens', () => {
  const tabletStart = deck.lastIndexOf('@media (max-width: 900px)');
  const tabletWindow = deck.slice(tabletStart, tabletStart + 500);
  assert.match(tabletWindow, /\.slide--cash-runway\s*\{[^}]*zoom:\s*1/s);
  assert.match(tabletWindow, /\.slide--cash-runway \.bg-orb\s*\{[^}]*display:\s*none/s);

  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileWindow = deck.slice(mobileStart, mobileStart + 1200);
  assert.match(mobileWindow, /\.slide--cash-runway \.cash-runway-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(mobileWindow, /\.slide--cash-runway\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(deck, /\.slide--cash-runway \.cash-runway-chart\s*\{[^}]*width:\s*100%[^}]*height:\s*auto/s);
});

test('cash runway ledgers preserve aligned rows and mobile legibility', () => {
  const baseLedgerRule = cssRuleBody(deck, '.slide--cash-runway .cash-runway-ledger');
  assert.match(baseLedgerRule, /width:\s*calc\(100% - 40px\)/);
  assert.match(baseLedgerRule, /font-size:\s*11px/);

  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileEnd = deck.indexOf('@media (min-width: 701px)', mobileStart);
  const mobileCss = deck.slice(mobileStart, mobileEnd);
  const mobileLedgerRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-ledger');

  assert.match(mobileLedgerRule, /width:\s*calc\(100% - 24px\)/);
  assert.match(mobileLedgerRule, /margin:\s*0 12px 14px/);
  assert.ok(cssPixelValue(mobileLedgerRule, 'font-size') >= 13);
  assert.match(
    mobileCss,
    /\.slide--cash-runway \.cash-runway-ledger th,\s*\.slide--cash-runway \.cash-runway-ledger td\s*\{[^}]*padding:\s*7px 10px/s,
  );
});

test('cash runway compact desktops reset deck zoom before content clips', () => {
  const shortViewportStart = deck.lastIndexOf('@media (min-width: 701px) and (max-height: 760px)');
  assert.ok(shortViewportStart >= 0);
  const shortViewportCss = deck.slice(shortViewportStart, deck.indexOf('</style>', shortViewportStart));
  assert.match(cssRuleBody(shortViewportCss, '.slide--cash-runway'), /zoom:\s*1/);
});

test('cash runway decorative orbs cannot expand the slide scroll width', () => {
  assert.match(deck, /\.slide--cash-runway > \.bg-orb\s*\{[^}]*display:\s*none/s);
});

test('cash runway mobile SVG annotations remain legible and clear of sale markers', () => {
  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileEnd = deck.indexOf('@media (min-width: 701px)', mobileStart);
  const mobileCss = deck.slice(mobileStart, mobileEnd);
  const mobileChartScale = 335 / 568;
  const minimumEffectiveFontSize = 11;
  const requiredSelectors = [
    '.slide--cash-runway .cash-runway-chart-subtitle',
    '.slide--cash-runway .cash-runway-axis-label',
    '.slide--cash-runway .baseline-label-mobile',
    '.slide--cash-runway .cash-runway-sale-label',
    '.slide--cash-runway .cash-runway-closing-label',
  ];

  for (const selector of requiredSelectors) {
    const fontSize = cssPixelValue(cssRuleBody(mobileCss, selector), 'font-size');
    assert.ok(
      fontSize * mobileChartScale >= minimumEffectiveFontSize,
      `${selector} renders below ${minimumEffectiveFontSize}px at the 335px mobile chart width`,
    );
  }

  assert.match(cssRuleBody(mobileCss, '.slide--cash-runway .baseline-label-desktop'), /display:\s*none/);
  const mobileBaselineRule = cssRuleBody(mobileCss, '.slide--cash-runway .baseline-label-mobile');
  assert.match(mobileBaselineRule, /display:\s*block/);
  const baselineTranslate = mobileBaselineRule.match(/transform:\s*translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/);
  const baselineTranslateX = Number(baselineTranslate?.[1] ?? Number.NaN);
  const baselineTranslateY = Number(baselineTranslate?.[2] ?? Number.NaN);
  assert.ok(baselineTranslateX <= -12, 'mobile baseline label must clear the first staircase rise');
  assert.ok(baselineTranslateY <= -8, 'mobile baseline label must clear the baseline path');

  const subtitleRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-chart-subtitle');
  const subtitleTranslateX = Number(subtitleRule.match(/transform:\s*translate\(([\d.]+)px,/i)?.[1] ?? Number.NaN);
  assert.ok(subtitleTranslateX * mobileChartScale >= 10, 'mobile subtitle must clear the CASH axis label');

  const saleRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-sale-label');
  const saleTranslateY = Number(saleRule.match(/transform:\s*translateY\((-?[\d.]+)px\)/)?.[1] ?? Number.NaN);
  const saleMarkers = [...cashSlide.matchAll(/<g data-sale-marker="[^"]+"><circle[^>]*cy="([\d.]+)"[^>]*>.*?<text class="cash-runway-sale-label"[^>]*y="([\d.]+)"/gs)];
  assert.equal(saleMarkers.length, 8);

  for (const [, markerY, labelY] of saleMarkers) {
    const clearanceFromMarker = (Number(markerY) - Number(labelY) - saleTranslateY - 5) * mobileChartScale;
    assert.ok(clearanceFromMarker >= 10, `sale label clears its marker by only ${clearanceFromMarker.toFixed(1)}px`);
  }
});

test('cash runway chart panels enlarge where room permits and cap safely on tablets', () => {
  const gridRule = cssRuleBody(deck, '.slide--cash-runway .cash-runway-grid');
  assert.match(gridRule, /width:\s*115%/);
  assert.match(gridRule, /max-width:\s*1242px/);
  assert.match(gridRule, /margin-inline:\s*-7\.5%/);

  const tabletStart = deck.lastIndexOf('@media (max-width: 900px)');
  const tabletEnd = deck.indexOf('@media (max-width: 700px)', tabletStart);
  const tabletCss = deck.slice(tabletStart, tabletEnd);
  const tabletGridRule = cssRuleBody(tabletCss, '.slide--cash-runway .cash-runway-grid');
  assert.match(tabletGridRule, /width:\s*calc\(100% \+ 56px\)/);
  assert.match(tabletGridRule, /max-width:\s*calc\(100% \+ 56px\)/);
  assert.match(tabletGridRule, /margin-inline:\s*-28px/);

  const mobileStart = deck.lastIndexOf('@media (max-width: 700px)');
  const mobileEnd = deck.indexOf('@media (min-width: 701px)', mobileStart);
  const mobileCss = deck.slice(mobileStart, mobileEnd);
  const mobileGridRule = cssRuleBody(mobileCss, '.slide--cash-runway .cash-runway-grid');
  assert.match(mobileGridRule, /width:\s*100%/);
  assert.match(mobileGridRule, /max-width:\s*100%/);
  assert.match(mobileGridRule, /margin-inline:\s*0/);
});
