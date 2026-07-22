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
  assert.match(opening, /only hot-and-ready buyers ever land on your calendar/);
  assert.doesNotMatch(opening, /only ready buyers ever land on your calendar/);
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

test('offer ladder uses one neutral card shell for all three offers', () => {
  const ladder = section('<!-- INTRO 1.1,', '<!-- INTRO 1.2,');
  const shell = deck.match(/\.offer-ladder-card\s*\{(?<styles>[^}]*)\}/s)?.groups?.styles ?? '';
  assert.equal((ladder.match(/class="offer-ladder-card"/g) ?? []).length, 3);
  assert.doesNotMatch(ladder, /background: var\(--brand-50\)/);
  assert.doesNotMatch(ladder, /border: 1px solid var\(--brand-200\)/);
  assert.match(shell, /background: var\(--white\)/);
  assert.match(shell, /border: 1px solid var\(--al-100\)/);
  assert.match(shell, /border-radius: 16px/);
  assert.match(shell, /padding: 22px 18px/);
  assert.match(shell, /box-shadow: var\(--shadow-card\)/);
  assert.match(shell, /display: flex/);
  assert.match(shell, /flex-direction: column/);
  assert.match(shell, /gap: 12px/);
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

test('keyboard navigation scrolls narrow active slides with roving tabindex', () => {
  const goToSource = section('function goTo(i) {', "document.querySelectorAll('[data-demo-carousel]')");
  assert.match(goToSource, /slides\[current\]\.setAttribute\('tabindex', '-1'\);/);
  assert.match(goToSource, /slide\.setAttribute\('tabindex', '0'\);/);
  assert.match(goToSource, /slide\.scrollTop = 0;/);
  assert.doesNotMatch(goToSource, /\.focus\(/);

  const verticalSource = section('function handleVerticalNavigation(direction) {', '// Keyboard');
  assert.match(verticalSource, /window\.innerWidth <= 900/);
  assert.match(verticalSource, /slide\.scrollHeight > slide\.clientHeight/);
  assert.match(verticalSource, /slide\.scrollTop <= 0/);
  assert.match(verticalSource, /slide\.scrollTop \+ slide\.clientHeight >= slide\.scrollHeight/);
  assert.match(verticalSource, /slide\.scrollBy\(\{/);

  const keyboardSource = section('// Keyboard', 'let tx = 0;');
  assert.match(keyboardSource, /if \(e\.key === 'ArrowRight'\) \{/);
  assert.match(keyboardSource, /if \(e\.key === 'ArrowLeft'\) \{/);
  assert.match(keyboardSource, /e\.key === 'ArrowDown'/);
  assert.match(keyboardSource, /e\.key === 'ArrowUp'/);
  assert.match(keyboardSource, /e\.key === ' ' && !e\.shiftKey/);
  assert.match(keyboardSource, /e\.key === ' ' && e\.shiftKey/);
  assert.match(keyboardSource, /videoModal\.classList\.contains\('open'\)/);
  assert.match(keyboardSource, /document\.activeElement\.isContentEditable/);
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
  assert.match(overview, /Your expertise becomes a proven AI product\./);
  assert.match(overview, /Your AI product becomes a predictable growth engine\./);
  assert.doesNotMatch(overview, /We build and prove your AI product on real clients\./);
  assert.doesNotMatch(overview, /We build your authority system and turn on organic and paid acquisition\./);
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

test('Launch contains three visible slides with Authority and Paid Ads in order', () => {
  const launch = section('<!-- Phase 2, Launch (Cover) -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const slideStarts = launch.match(/<div class="slide(?: [^"]*)?"[^>]*>/g) ?? [];
  assert.equal(slideStarts.length, 3);
  slideStarts.forEach((slideStart) => assert.doesNotMatch(slideStart, /\shidden(?:\s|=|>)/));
  assertInOrder(launch, [
    '<!-- Phase 2, Authority Branding Overview -->',
    '<!-- Phase 2, Paid Ads Launch Flow -->',
  ], 'Launch detail slides');
  assert.doesNotMatch(launch, /<!-- Phase 2, Organic Launch Flow -->/);
});

test('Authority Branding combines three proof cards with the Organic flow', () => {
  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const proofGridOpening = '<ul class="launch-proof-grid rv d3" role="list">';
  const proofIndex = authority.indexOf(proofGridOpening);
  const flowIndex = authority.indexOf('<ol class="upsell-flow rv d4">');
  const proofGridEnd = authority.indexOf('</ul>', proofIndex) + '</ul>'.length;
  const proofGrid = authority.slice(proofIndex, proofGridEnd);
  const organicFlowEnd = authority.indexOf('</ol>', flowIndex) + '</ol>'.length;
  const organicFlow = authority.slice(flowIndex, organicFlowEnd);

  assertOneVisibleSlide(authority, 'merged Authority Branding slide');
  assert.match(authority, /<ul class="launch-proof-grid rv d3" role="list">/);
  assert.ok(proofIndex >= 0 && proofIndex < flowIndex, 'Authority proof cards must appear above the Organic flow');
  assert.equal((proofGrid.match(/<li class="launch-proof-card">/g) ?? []).length, 3);
  assert.match(proofGrid, /src="website-bonus\.png"/);
  assert.match(proofGrid, /src="dfy-marketing\.png"/);
  assert.match(proofGrid, /class="manychat-preview"/);
  assert.match(proofGrid, /role="img" aria-label="ManyChat automated comment-to-DM conversation preview"/);
  [
    'Personal branded website',
    'Done-for-you posting',
    'ManyChat comment and DM automation',
  ].forEach((copy) => assert.match(proofGrid, new RegExp(escapeRegex(copy), 'i')));
  assertInOrder(organicFlow, [
    'Content created',
    'Content posted consistently',
    'ManyChat starts the conversation',
    'Lead enters the AI assessment and funnel',
  ], 'merged Organic flow');
  assert.doesNotMatch(authority, /16369f811f94556e674955011d506194/);
  assert.doesNotMatch(authority, /launch-organic-proof|launch-bullet-stack|launch-bullet-card/);
});

test('Launch proof slides hide horizontal overflow at the responsive breakpoint', () => {
  const launchCss = section('/* ── Launch flow components ── */', '/* deck-wide: balance line widths');
  const responsiveBlocks = launchCss.match(/@media \(max-width: 900px\) \{[\s\S]*?\n  \}/g) ?? [];
  assert.equal(responsiveBlocks.length, 1, 'Launch CSS must contain one responsive block at 900px');
  const launchProofRules = responsiveBlocks[0].match(/\.slide--launch-proof \{[^}]*\}/g) ?? [];
  assert.equal(launchProofRules.length, 1, 'Launch responsive block must contain one slide overflow rule');
  assert.match(launchProofRules[0], /overflow-x: hidden;/);
  assert.match(launchProofRules[0], /overflow-y: auto;/);
});

test('Paid Ads Launch shows three proof cards above its four-step flow', () => {
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  const proofIndex = paid.indexOf('class="launch-proof-grid');
  const flowIndex = paid.indexOf('<ol class="upsell-flow rv d4">');
  assert.ok(proofIndex >= 0 && proofIndex < flowIndex, 'Paid Ads proof must appear above the flow');
  assert.match(paid, /<ul class="launch-proof-grid rv d3" role="list">/);
  assert.equal((paid.match(/<li class="launch-proof-card">/g) ?? []).length, 3);
  assert.match(paid, /cf012831e12dd92855000b85e12a60db/);
  assert.match(paid, /src="leanne-landing\.jpg"/);
  assert.match(paid, /src="pipeline-activation-email\.png"/);
  assertInOrder(paid, ['Ad Creative', 'Funnel', 'Pipeline Activation'], 'Paid Ads proof cards');
  assert.match(deck, /:root\s*\{[^}]*--al-600:\s*[^;]+;/s);
  assert.match(deck, /\.launch-proof-card__body \{[^}]*color: var\(--al-600\);[^}]*font-size: 9\.5px;[^}]*line-height: 1\.3;/);
});

test('merged Authority and Paid Ads flows keep accessible ordered-list semantics', () => {
  const authority = section('<!-- Phase 2, Authority Branding Overview -->', '<!-- Phase 2, Paid Ads Launch Flow -->');
  const paid = section('<!-- Phase 2, Paid Ads Launch Flow -->', '<!-- Offer Stack, Simple Phase Recap -->');
  [authority, paid].forEach((flow) => {
    const orderedFlowOpening = '<ol class="upsell-flow rv d4">';
    const orderedFlowStart = flow.indexOf(orderedFlowOpening);
    const orderedFlowEnd = flow.indexOf('</ol>', orderedFlowStart) + '</ol>'.length;
    const orderedFlow = flow.slice(orderedFlowStart, orderedFlowEnd);

    assertOneVisibleSlide(flow, 'launch detail slide');
    assert.match(flow, /<ol class="upsell-flow rv d4">/);
    assert.equal((orderedFlow.match(/<li class="upsell-step(?: upsell-final)?">/g) ?? []).length, 4);
    assert.equal((orderedFlow.match(/<li class="upsell-arrow" aria-hidden="true">→<\/li>/g) ?? []).length, 3);
    assert.match(orderedFlow, /<\/ol>/);
  });
});

test('obsolete marketing and Monetize slides are removed', () => {
  ['Done-For-You Pipeline Activation', 'Phase 3 · Ascension', 'Back-End Ecosystem', 'How the AI upsells every lead']
    .forEach((copy) => assert.doesNotMatch(deck, new RegExp(copy, 'i')));
});

test('closing uses a captioned 5 plus 4 logo stack and removes internal business numbers', () => {
  const closing = section('<!-- S11, Your Knowledge Becomes An Asset', '<!-- S10b, Payment Plans');
  assert.match(closing, /<figure class="closing-logo-stack">/);
  assert.match(closing, /<figcaption class="closing-logo-stack__caption">We've built AI products used and loved by people at:<\/figcaption>/);
  assert.deepEqual(
    [...closing.matchAll(/<div class="closing-logo-stack__row closing-logo-stack__row--(five|four)"><\/div>/g)]
      .map((match) => match[1]),
    ['five', 'four'],
  );
  assert.doesNotMatch(closing, /closing-logo-stack__slot/);
  assert.doesNotMatch(closing, /Organizations using AI products built by Kodara clients/);
  assert.doesNotMatch(closing, />\s*34\s*</);
  ['\\$612K\\+', 'APRIL – JUNE 2026', 'out of 1,000 leads with this exact same system']
    .forEach((copy) => assert.doesNotMatch(closing, new RegExp(copy, 'i')));
});

test('closing clones the nine real slide 3 logos in approved order before the 5 plus 4 split', () => {
  const runtime = section('const approvedClosingLogoOrder = [', '// Build thumbnail panel');
  const approvedOrder = [
    'Mayo Clinic', 'ClickFunnels', 'Johns Hopkins', 'HighLevel', 'Fidelity Investments',
    'ServiceTitan', 'Tony Robbins', 'H&R Block', 'Ramsey Solutions',
  ];
  assertInOrder(runtime, approvedOrder.map((name) => `'${name}'`), 'closing runtime logo order');
  assert.match(runtime, /approvedClosingLogoOrder\.map/);
  assert.match(runtime, /sourceLogoElements\.find/);
  assert.match(runtime, /logo\.cloneNode\(true\)/);
  assert.match(runtime, /item\.appendChild\(logo\)/);
  assert.match(runtime, /approvedClosingLogos\.slice\(0, 5\)/);
  assert.match(runtime, /approvedClosingLogos\.slice\(5\)/);
});

test('closing logo rows use closing-specific fluid fit rules without horizontal overflow', () => {
  assert.match(deck, /\.closing-logo-stack \{[^}]*overflow: hidden;[^}]*\}/);
  assert.match(deck, /\.closing-logo-stack__row \{[^}]*grid-template-columns: repeat\(var\(--closing-logo-count\), minmax\(0, 1fr\)\);[^}]*gap: clamp\([^;]+\);[^}]*\}/);
  assert.match(deck, /\.closing-logo-stack__row--five \{ --closing-logo-count: 5; \}/);
  assert.match(deck, /\.closing-logo-stack__row--four \{ --closing-logo-count: 4; \}/);
  assert.match(deck, /\.closing-logo-stack__item \{[^}]*min-width: 0;[^}]*\}/);
  assert.match(deck, /\.closing-logo-stack__item > \.client-logo-strip__logo \{[^}]*order: initial;[^}]*max-width: 100%;[^}]*height: auto;[^}]*\}/);
  assert.match(deck, /@media \(max-width: 520px\) \{[^}]*\.closing-logo-stack \{[^}]*padding-inline: 10px;[^}]*\}/s);
});

test('investment deliverables match the approved Build and Launch offer', () => {
  [
    'Lucas Onboarding Call', 'Done-For-You AI Build', 'Your AI Avatar', 'AI Sales Team',
    'Personal Branded Website', 'Done-For-You Posting', 'ManyChat Automation',
    'Done-For-You Funnel', 'Paid Ads Setup',
  ].forEach((copy) => assert.match(deck, new RegExp(copy, 'i')));
  assert.match(deck, /Requires at least \$5,000 in ad spend/);
  assert.match(deck, /\$6,800<span style="font-size: 14px; color: var\(--al-500\); font-weight: 400;"> ×3<\/span>/);
});

test('deck contains the approved 19 visible slides in order', () => {
  const visibleSlideStarts = [...deck.matchAll(/<div class="slide(?: [^"]*)?"(?![^>]*\shidden)[^>]*>/g)];
  assert.equal(visibleSlideStarts.length, 19);
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
