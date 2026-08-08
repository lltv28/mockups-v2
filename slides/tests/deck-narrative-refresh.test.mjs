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

function parsedCssRules(css, mediaQueries = []) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  let cursor = 0;

  while (cursor < source.length) {
    const open = source.indexOf('{', cursor);
    if (open < 0) break;
    const prelude = source.slice(cursor, open).trim();
    let depth = 1;
    let close = open + 1;
    while (close < source.length && depth > 0) {
      if (source[close] === '{') depth += 1;
      if (source[close] === '}') depth -= 1;
      close += 1;
    }
    const body = source.slice(open + 1, close - 1);

    if (prelude.startsWith('@media')) {
      rules.push(...parsedCssRules(body, [...mediaQueries, prelude]));
    } else if (!prelude.startsWith('@')) {
      rules.push({ selectors: prelude.split(',').map((selector) => selector.trim()), body, mediaQueries });
    }
    cursor = close;
  }

  return rules;
}

const css = section('<style>', '</style>');
const cssRules = parsedCssRules(css);

function cssAt(selector, width) {
  const declarations = {};
  for (const rule of cssRules) {
    const applies = rule.mediaQueries.every((query) => {
      const max = Number(query.match(/max-width:\s*(\d+)px/)?.[1] ?? Number.POSITIVE_INFINITY);
      const min = Number(query.match(/min-width:\s*(\d+)px/)?.[1] ?? Number.NEGATIVE_INFINITY);
      return width <= max && width >= min;
    });
    if (!applies || !rule.selectors.includes(selector)) continue;
    for (const declaration of rule.body.split(';')) {
      const colon = declaration.indexOf(':');
      if (colon < 0) continue;
      declarations[declaration.slice(0, colon).trim()] = declaration.slice(colon + 1).trim();
    }
  }
  return declarations;
}

function horizontalPadding(declarations) {
  const values = declarations.padding.split(/\s+/).map(Number.parseFloat);
  return values.length === 1 ? values[0] : values[1];
}

function cssLength(value, width) {
  const expression = value.trim();
  const functional = expression.match(/^(clamp|min)\((.*)\)$/);
  if (functional) {
    const values = functional[2].split(',').map((part) => cssLength(part, width));
    return functional[1] === 'clamp'
      ? Math.max(values[0], Math.min(values[1], values[2]))
      : Math.min(...values);
  }
  return [...expression.replace(/^calc\((.*)\)$/, '$1').matchAll(/([+-]?)\s*([\d.]+)(px|vw)/g)]
    .reduce((total, [, sign, number, unit]) => (
      total + (sign === '-' ? -1 : 1) * Number(number) * (unit === 'vw' ? width / 100 : 1)
    ), 0);
}

function marginTop(declarations, width) {
  if (declarations['margin-top']) return cssLength(declarations['margin-top'], width);
  return cssLength(declarations.margin?.split(/\s+/)[0] ?? '0px', width);
}

test('deck uses the approved 24-slide opening narrative', () => {
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

  const phase1Start = ids.indexOf('phase-1-cover-slide');
  assert.deepEqual(ids.slice(phase1Start, phase1Start + 4), [
    'phase-1-cover-slide',
    'lucas-onboarding-slide',
    'clients-love-slide',
    'triager-closer-slide',
  ]);

  assert.match(
    deck,
    /id="opening-title"[^>]*>We turn your expertise into an <span[^>]*>AI Sales department<\/span> that pays for its own leads<\/h2>/,
  );
  assert.doesNotMatch(deck, /id="real-problem-slide"/);
  assert.doesNotMatch(deck, /#real-problem-slide/);
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
  assert.match(
    deck,
    /const requestedSlide = Number\(new URLSearchParams\(window\.location\.search\)\.get\('slide'\) \|\| 1\);/,
  );
});

test('program taxonomy is Build, Deploy, Launch everywhere', () => {
  const overview = section('<!-- S5, 3 Phases Overview -->', '<!-- Phase 1, AI Build (Cover) -->');
  const phase2 = section('<!-- Phase 2, Deploy (Cover) -->', '<!-- Phase 3, Launch (Cover) -->');
  const phase3 = section('<!-- Phase 3, Launch (Cover) -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const recap = section('<!-- Offer Stack, Simple Phase Recap -->', '<!-- Money-back guarantee -->');

  for (const block of [overview, recap]) {
    const build = block.indexOf('>Build</div>');
    const deploy = block.indexOf('>Deploy</div>');
    const launch = block.indexOf('>Launch</div>');
    assert.ok(build >= 0 && deploy > build && launch > deploy);
  }

  assert.match(overview, /Build, deploy, then launch\./);
  assert.match(phase2, /<h2 class="h-lg">Deploy<\/h2>/);
  assert.ok((deck.match(/Phase 2 · Deploy/g) ?? []).length >= 3);
  assert.match(phase3, /<h2 class="h-lg">Launch<\/h2>/);
  assert.ok((deck.match(/Phase 3 · Launch/g) ?? []).length >= 3);
  assert.match(recap, /Build, deploy, then launch\./);

  for (const obsolete of [
    'Phase 2 · Sell',
    '<!-- Phase 2, Sell (Cover) -->',
    'Phase 3 · Grow',
    '<!-- Phase 3, Grow (Cover) -->',
    'Build, sell, then grow.',
  ]) {
    assert.doesNotMatch(deck, new RegExp(obsolete.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
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

test('stacked opener keeps support copy clear of the scaled flywheel across breakpoints', () => {
  for (const width of [390, 430, 600, 601, 768, 900]) {
    const slide = cssAt('.slide', width);
    const layout = cssAt('.split-layout', width);
    const demo = cssAt('#opening-demo', width);
    const shell = cssAt('.sales-demo-shell', width);
    const iframe = cssAt('#opening-demo .sales-demo-shell--flywheel iframe', width);
    const [aspectWidth, aspectHeight] = shell['aspect-ratio'].split('/').map(Number);
    const iframeScale = Number(iframe.transform.match(/scale\(([\d.]+)\)/)?.[1]);
    const shellWidth = Math.min(Number.parseFloat(demo['max-width']), width - (2 * horizontalPadding(slide)));
    const shellHeight = shellWidth * aspectHeight / aspectWidth;
    const transformedOverflowAbove = iframe['transform-origin'].includes('top')
      ? 0
      : shellHeight * (iframeScale - 1) / 2;
    const renderedSeparation = cssLength(layout.gap, width) + marginTop(demo, width) - transformedOverflowAbove;

    assert.equal(layout['grid-template-columns'], '1fr', `opener stacks at ${width}px`);
    assert.ok(
      renderedSeparation >= 2,
      `support/demo separation is ${renderedSeparation.toFixed(2)}px at ${width}px`,
    );
  }

  assert.notEqual(cssAt('.split-layout', 901)['grid-template-columns'], '1fr');
  assert.equal(cssAt('#opening-demo .sales-demo-shell--flywheel iframe', 901)['transform-origin'], 'center');
});
