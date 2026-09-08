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
  'Take what you know and put it online.',
  'High-ticket coaching',
  'That advice starts with a real opportunity.',
  'You added a second one.',
  'How To Build The “AI Version Of You” That Can Sell Itself To Clients & Patients Online',
  'So you have two problems to solve.',
  'Most experts start with the wrong question.',
  'The AI is not the starting point.',
  'A topic shows what you know. A search shows what they want.',
  'The same topic can hide five different levels of intent.',
  'The words in the search tell you what matters next.',
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
  'So what does an AI version of you actually mean?',
  'Here is what you should see before you trust the system.',
  'Kodara is built for experts who already know how to solve a real problem.',
  'Credible client proof lets you see exactly what changed.',
  'A guarantee is only real when every term is in writing.',
  'You should see every cost and ownership term before you decide.',
  'These are the questions that matter before you apply.',
  'Complete the fit assessment',
  'not a revenue or paying-customer guarantee',
]) {
  assert.ok(visibleText.includes(requiredCopy), `missing required webinar copy: ${requiredCopy}`);
}

for (const [earlier, later] of [
  ['id="webinar-title"', 'id="opening"'],
  ['id="opening"', 'id="online-models"'],
  ['id="online-models"', 'id="online-premise"'],
  ['id="online-premise"', 'id="online-reality"'],
  ['id="online-reality"', 'id="two-problems"'],
  ['id="two-problems"', 'id="positioning-shift"'],
  ['id="positioning-shift"', 'id="search-first"'],
  ['id="search-first"', 'id="topic-vs-search"'],
  ['id="topic-vs-search"', 'id="intent-ladder"'],
  ['id="intent-ladder"', 'id="search-signals"'],
  ['id="search-signals"', 'id="demand-not-angle"'],
  ['id="demand-not-angle"', 'id="angle-fit"'],
  ['id="angle-fit"', 'id="angle-filters"'],
  ['id="angle-filters"', 'id="research-process"'],
  ['id="research-process"', 'id="angle-scorecard"'],
  ['id="angle-scorecard"', 'id="angle-example"'],
  ['id="angle-example"', 'id="positioning-output"'],
  ['id="positioning-output"', 'id="angle-controls-build"'],
  ['id="angle-controls-build"', 'id="implementation-bridge"'],
  ['id="implementation-bridge"', 'id="calendar-bottleneck"'],
  ['id="michelle-story"', 'id="definition"'],
  ['id="definition"', 'id="mechanism-bridge"'],
]) {
  assert.ok(html.indexOf(earlier) < html.indexOf(later), `${earlier} should appear before ${later}`);
}

assert.ok(html.includes('lucas-photo.jpg'));
assert.ok(html.includes('site-leanne.jpg'));
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
assert.doesNotMatch(html, /(?:28%|260 million|\$50 million|350 health)/i);
assert.doesNotMatch(html, /(?:toxic poop|overnight weight loss|government pays|buyer pyramid)/i);
assert.doesNotMatch(
  visibleText,
  /(?:before this slide goes live|presenter checklist|add Leanne's approved words|HOLD until|current VSL says|the live demo should show|start with a question a real prospective|define the original delivery model|show the change with approved records|keep the boundary visible)/i,
  'audience slides should not expose internal production notes',
);

console.log('kodara webinar: 16:9 stage, teaching sequence, controls, and claim guardrails verified');
