import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const deck = readFileSync(resolve(here, '..', 'deck.html'), 'utf8');
const start = deck.indexOf('<!-- INTRO 1.2, Why Clients Love The Kodara Model');
const end = deck.indexOf('<!-- INTRO 1.4, Why This Model Works');
const slide = deck.slice(start, end);

test('slide 3 contains the approved embedded logo strip', () => {
  assert.ok(start >= 0 && end > start, 'slide 3 boundaries must exist');
  assert.match(slide, /class="rv d4 client-logo-strip"/);
  assert.match(slide, /We've built AI products used and loved by people at:/);

  const logoAlts = [...slide.matchAll(/class="client-logo-strip__logo[^\"]*" alt="([^"]+)"/g)]
    .map((match) => match[1]);

  const expectedAlts = [
    'Mayo Clinic',
    'Johns Hopkins',
    'HighLevel',
    'Fidelity Investments',
    'ServiceTitan',
    'Tony Robbins',
    'H&amp;R Block',
    'Ramsey Solutions',
  ];

  assert.deepEqual([...logoAlts].sort(), [...expectedAlts].sort());

  assert.match(slide, /class="client-logo-strip__wordmark">ClickFunnels<\/span>/);

  const embeddedSources = [...slide.matchAll(/class="client-logo-strip__logo[^\"]*"[^>]*src="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(embeddedSources.length, 8);
  embeddedSources.forEach((source) => {
    assert.match(source, /^data:image\/(?:png|svg\+xml);base64,/);
  });

  assert.match(slide, /class="rv d5 love-reasons"/);
});

test('logo strip CSS is isolated and uses one row', () => {
  assert.match(deck, /\.client-logo-strip\s*\{/);
  assert.match(deck, /\.client-logo-strip__row\s*\{[^}]*flex-wrap:\s*nowrap/s);
  assert.match(deck, /\.client-logo-strip__logo\s*\{[^}]*grayscale\(1\)/s);

  const orderedSelectors = [
    ['client-logo-strip__logo--mayo', 1],
    ['client-logo-strip__wordmark', 2],
    ['client-logo-strip__logo--jh', 3],
    ['client-logo-strip__logo--ghl', 4],
    ['client-logo-strip__logo--fid', 5],
    ['client-logo-strip__logo--st', 6],
    ['client-logo-strip__logo--tr', 7],
    ['client-logo-strip__logo--hrb', 8],
    ['client-logo-strip__logo--ram', 9],
  ];

  orderedSelectors.forEach(([className, order]) => {
    assert.match(deck, new RegExp(`\\.${className}\\s*\\{[^}]*order:\\s*${order}`, 's'));
  });
});

test('embedded PNG logos contain a complete PNG trailer', () => {
  const pngSources = [...slide.matchAll(/class="client-logo-strip__logo[^\"]*"[^>]*src="data:image\/png;base64,([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(pngSources.length, 2);
  pngSources.forEach((source) => {
    const bytes = Buffer.from(source, 'base64');
    assert.equal(bytes.subarray(-12).toString('hex'), '0000000049454e44ae426082');
  });
});

test('slide 3 uses the approved smaller cards and larger logos', () => {
  assert.match(deck, /\.love-reasons\s*\{[^}]*max-width:\s*690px/s);
  assert.match(deck, /\.love-reason\s*\{[^}]*padding:\s*14px/s);
  assert.match(deck, /\.love-reason__num\s*\{[^}]*width:\s*20px;[^}]*height:\s*20px;[^}]*font-size:\s*10px;[^}]*margin:\s*0 auto 8px/s);
  assert.match(deck, /\.love-reason__title\s*\{[^}]*font-size:\s*13px;[^}]*margin-bottom:\s*3px/s);
  assert.match(deck, /\.love-reason__body\s*\{[^}]*font-size:\s*11px;[^}]*line-height:\s*1\.4/s);
  assert.match(deck, /\.client-logo-strip\s*\{[^}]*max-width:\s*1040px/s);
  assert.match(deck, /\.client-logo-strip__row\s*\{[^}]*gap:\s*8px/s);
  assert.match(deck, /\.client-logo-strip__logo\s*\{[^}]*max-width:\s*148px/s);
  assert.match(deck, /\.client-logo-strip__wordmark\s*\{[^}]*font-size:\s*15px/s);
  const logoHeights = [
    ['mayo', 35], ['jh', 29], ['ghl', 19], ['fid', 18],
    ['st', 18], ['tr', 11], ['hrb', 16], ['ram', 18],
  ];
  logoHeights.forEach(([name, height]) => {
    assert.match(deck, new RegExp(`\\.client-logo-strip__logo--${name}\\s*\\{[^}]*height:\\s*${height}px`, 's'));
  });
});

test('slide 3 tightens the logo row gap at the 900px breakpoint', () => {
  assert.match(deck, /@media\s*\(max-width:\s*900px\)\s*\{(?:[^{}]|\{[^{}]*\})*\.client-logo-strip__row\s*\{[^}]*gap:\s*4px/s);
  assert.match(deck, /\.client-logo-strip__row\s*\{[^}]*flex-wrap:\s*nowrap/s);
});
