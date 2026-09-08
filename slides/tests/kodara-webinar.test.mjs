import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = new URL('../kodara-webinar.html', import.meta.url);
const html = await readFile(file, 'utf8');
const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ');

const slides = html.match(/<section class="slide(?: |")/g) || [];

assert.equal(slides.length, 50, 'webinar should contain the complete 50-slide story');
assert.equal((html.match(/aria-roledescription="slide"/g) || []).length, 50);
assert.equal((html.match(/data-act="[1-5]"/g) || []).length, 50);

for (const requiredCopy of [
  'Health and wellness interest is already moving online.',
  'People are looking for answers, explanations, and next steps from their phones and computers.',
  'You have probably heard this before: take what you know and put it online.',
  'High-ticket coaching',
  'But most people on this webinar have not seen massive success with those models.',
  'The offer, content, funnel, sales, technology, support, and delivery become an entire second business.',
  'Here is what we are going to figure out together.',
  'Is taking your expertise online the right direction for you?',
  'How do you find an angle people are already searching for?',
  'How can that angle become an AI product without creating an entire second business?',
  'And at the end, I’ll show you how Kodara can build and launch the entire system for you.',
  'My name is Lucas Tyson. I’m the founder and CEO of Kodara.',
  '$50M+',
  'Online marketing agency built by age 25.',
  '100,000+',
  'Leads and appointments generated, including for health and wellness businesses.',
  'Michelle was diagnosed with Graves Disease.',
  'Then I saw what happened when the right expertise became easier to reach.',
  'The expertise already existed.',
  'The delivery model had to change.',
  'We have already helped experts turn what they know into something people can use online.',
  'Dr. Mike',
  'Power-Up Sports Psychology',
  'Dr. Mike AI launched its first product and moved into testing.',
  'Martyn Buffler',
  'CEO, The Cancer Battle Plan',
  'Five years of ideas and a book became a launched first prototype.',
  'Leanne Ellington',
  'Neuroscience educator',
  'Her virtual business reduced dependence on one-to-one delivery and created time for a passion project.',
  'These are individual client experiences. Results vary, and no specific outcome is guaranteed.',
  'First, decide whether this is even a direction you want to go.',
  'Then you can decide whether you want Kodara to build it for you.',
  'How To Build The “AI Version Of You” That Can Sell Itself To Clients & Patients Online',
  'So you have two problems to solve.',
  'Most experts start with the wrong question.',
  'The AI is not the starting point.',
  'A topic shows what you know. A search shows what they want.',
  'The same topic can hide five different levels of intent.',
  'Illustrative estimates for teaching only.',
  'A keyword can reveal demand without giving you an angle.',
  'Before you optimize the angle, the idea has to pass four responsibility gates.',
  'Then the five filters make the idea harder to ignore.',
  'Originality',
  'Leveraged authority',
  'Speed',
  'Ease',
  'Newness',
  'This is how search data becomes one angle worth building.',
  'Score every candidate from 1 to 3.',
  'Start with Originality, Leveraged authority, and Speed.',
  'The title of this webinar is an angle.',
  'Same expertise, but a different frame.',
  'The result should fit into one useful positioning sentence.',
  'Keyword research finds the problem. The angle frames the path. Kodara builds the system.',
  'But a strong angle can still build the wrong business.',
  'Your expertise should not stop working when your calendar fills.',
  'Your audience is already online.',
  'The calendar is the bottleneck.',
  'You supply the expertise and approval.',
  'Share what you know.',
  'Review what we build.',
  'Launch and onboard users.',
  'So what does an AI version of you actually mean?',
  'Here is what you should see before you trust the system.',
  'Kodara is built for experts who already know how to solve a real problem.',
  'A guarantee is only real when every term is in writing.',
  'You should see every cost and ownership term before you decide.',
  'These are the questions that matter before you apply.',
  'See If You Qualify',
  'not a revenue or paying-customer guarantee',
]) {
  assert.ok(visibleText.includes(requiredCopy), `missing required webinar copy: ${requiredCopy}`);
}

for (const [earlier, later] of [
  ['id="webinar-title"', 'id="search-signals"'],
  ['id="search-signals"', 'id="opening"'],
  ['id="opening"', 'id="online-models"'],
  ['id="online-models"', 'id="presenter"'],
  ['id="presenter"', 'id="michelle-story"'],
  ['id="michelle-story"', 'id="online-premise"'],
  ['id="online-premise"', 'id="leanne-proof"'],
  ['id="leanne-proof"', 'id="online-reality"'],
  ['id="online-reality"', 'id="two-problems"'],
  ['id="two-problems"', 'id="positioning-shift"'],
  ['id="positioning-shift"', 'id="search-first"'],
  ['id="search-first"', 'id="topic-vs-search"'],
  ['id="topic-vs-search"', 'id="intent-ladder"'],
  ['id="intent-ladder"', 'id="demand-not-angle"'],
  ['id="demand-not-angle"', 'id="angle-fit"'],
  ['id="angle-fit"', 'id="angle-filters"'],
  ['id="angle-filters"', 'id="research-process"'],
  ['id="research-process"', 'id="angle-scorecard"'],
  ['id="angle-scorecard"', 'id="angle-example"'],
  ['id="angle-example"', 'id="positioning-output"'],
  ['id="positioning-output"', 'id="angle-controls-build"'],
  ['id="angle-controls-build"', 'id="implementation-bridge"'],
  ['id="implementation-bridge"', 'id="calendar-bottleneck"'],
  ['id="definition"', 'id="mechanism-bridge"'],
]) {
  assert.ok(html.indexOf(earlier) < html.indexOf(later), `${earlier} should appear before ${later}`);
}

assert.ok(html.includes('health/assets/lucas-tyson-speaking.jpg'));
assert.ok((html.match(/health\/assets\/kodara-wordmark\.svg/g) || []).length >= 2);
assert.ok(html.includes('health/assets/dr-mike-poster.jpg'));
assert.ok(html.includes('health/assets/martyn-buffler.jpg'));
assert.ok(html.includes('health/assets/leanne.jpg'));
assert.ok(html.includes('https://kodarahealth.com/#kodara-triager'));
assert.ok(html.includes('id="leanne-proof"'), 'proof slide should retain its presenter-note key');
assert.equal((html.match(/class="proof-client"/g) || []).length, 3, 'opening proof should show three clients');
assert.equal((html.match(/id="leanne-proof"/g) || []).length, 1, 'client proof should appear only once');
assert.ok(html.includes("clone.querySelectorAll('[data-thumbnail-poster]')"));
assert.ok(html.includes('media.replaceWith(poster)'));
assert.ok(html.includes('id="previousSlide"'));
assert.ok(html.includes('id="nextSlide"'));
assert.ok(html.includes('aria-controls="panel"'));
assert.ok(html.includes('aria-label="Open slide panel"'));
assert.ok(html.includes('class="panel collapsed"'));
assert.ok(html.includes('aria-hidden="true" inert'));
assert.ok(html.includes('aria-expanded="false"'));
assert.ok(html.includes('panel.inert = collapsed'));
assert.ok(
  html.indexOf('id="panelToggle"') < html.indexOf('<main class="deck"'),
  'the slide panel control should stay outside the scaled deck',
);
assert.match(html, /\.panel-toggle\s*\{[^}]*position:\s*fixed;[^}]*z-index:\s*600;[^}]*width:\s*48px;[^}]*height:\s*48px;/s);
assert.ok(html.includes("panelToggle.setAttribute('aria-label', collapsed ? 'Open slide panel' : 'Close slide panel')"));
assert.ok(html.includes('thumbs[current].focus()'));
assert.ok(html.includes("if (event.key === 'Escape' && !panel.classList.contains('collapsed'))"));
assert.ok(html.includes('function goTo(index)'));
assert.ok(html.includes("event.key === 'Home'"));
assert.ok(html.includes("event.key === 'End'"));
assert.ok(html.includes("event.key.toLowerCase() === 'p'"), 'P should open presenter view');
assert.ok(html.includes("new BroadcastChannel('kodara-webinar')"));
assert.ok(html.includes("window.open(presenterUrl, 'kodara-webinar-presenter'"));
assert.ok(html.includes('presenterWindow && !presenterWindow.closed'), 'P should refocus an existing presenter window');
assert.ok(html.includes("message.type === 'go-to'"));
assert.ok(html.includes("document.documentElement.classList.add('preview-mode')"));
assert.ok(!html.includes('id="progress"'), 'audience view should not show a progress bar');
assert.ok(!html.includes('id="counter"'), 'audience view should not show a slide counter');
assert.ok(html.includes('@media (prefers-reduced-motion: reduce)'));
assert.ok(html.includes('--deck-width: 1920px'));
assert.ok(html.includes('--deck-height: 1080px'));
assert.ok(html.includes('transform: translate(-50%, -50%) scale(var(--deck-scale))'));
assert.ok(html.includes('function updateDeckScale()'));
assert.ok(html.includes('--panel-space: 0px'), 'collapsed selector should reserve no viewport width');
assert.ok(
  html.includes('left: calc(50% + var(--panel-space) / 2)'),
  'the slide should center within the space beside the selector',
);
assert.ok(html.includes('const availableWidth = window.innerWidth - panelWidth'));
assert.ok(html.includes("style.setProperty('--panel-space', panelWidth + 'px')"));

const thumbnailActivation = html.match(/const activate = \(\) => \{([\s\S]*?)\n\s*\};/);
assert.ok(thumbnailActivation, 'thumbnail activation should exist');
assert.ok(
  !thumbnailActivation[1].includes('setPanelCollapsed(true)'),
  'selecting a slide should keep the selector open',
);
assert.match(
  html,
  /if \(event\.key === 'Enter' \|\| event\.key === ' '\) \{[\s\S]*?event\.stopPropagation\(\);[\s\S]*?activate\(\);/,
  'keyboard thumbnail activation should not bubble into deck navigation',
);

const panelState = html.match(/function setPanelCollapsed\(collapsed\) \{([\s\S]*?)\n\s*\}/);
assert.ok(panelState, 'panel state handler should exist');
assert.ok(panelState[1].includes('updateDeckScale()'), 'panel changes should immediately resize the stage');

assert.doesNotMatch(html, /\[INSERT|PLACEHOLDER|TODO/i);
assert.doesNotMatch(html, /[—–]/);
assert.doesNotMatch(html, /(?:28%|260 million|350 health)/i);
assert.doesNotMatch(visibleText, /(?:350\+|105,000\+|30\+ health|\$500\s*-\s*\$2,000|Mayo Clinic|Johns Hopkins)/i);
assert.doesNotMatch(visibleText, /(?:make double what I made last year|three and six ROAS|Replace with sourced)/i);
assert.doesNotMatch(visibleText, /(?:story proves|better-fit calls|advertising work led by Lucas)/i);
assert.doesNotMatch(visibleText, /Sandra Parker|Just The Tonic|client-acquisition story/i);
assert.ok(!html.includes('health/assets/sandra-client-story.mp4'), 'late Sandra proof should not load');
assert.doesNotMatch(html, /fast\.wistia\./i, 'the deck should use the reviewed local testimonial excerpt');
assert.doesNotMatch(html, /(?:toxic poop|overnight weight loss|government pays|buyer pyramid)/i);
assert.doesNotMatch(
  visibleText,
  /(?:before this slide goes live|presenter checklist|add Leanne's approved words|HOLD until|current VSL says|the live demo should show|start with a question a real prospective|define the original delivery model|show the change with approved records|keep the boundary visible)/i,
  'audience slides should not expose internal production notes',
);

console.log('kodara webinar: 16:9 stage, teaching sequence, controls, and claim guardrails verified');
