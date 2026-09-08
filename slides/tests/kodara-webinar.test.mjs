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

assert.equal(slides.length, 46, 'webinar should contain the complete 46-slide story');
assert.equal((html.match(/aria-roledescription="slide"/g) || []).length, 46);
assert.equal((html.match(/data-act="[1-5]"/g) || []).length, 46);

for (const requiredCopy of [
  'Take what you know and put it online.',
  'High-ticket coaching',
  'The idea behind that advice is right.',
  'an entirely new business',
  'How To Build The “AI Version Of You” That Can Sell Itself To Clients & Patients Online',
  'There are two different problems hiding inside that goal.',
  'Most experts start with the wrong question.',
  'The best AI version of you does not start with AI.',
  'A topic tells us what you know. A search tells us what they want.',
  'People can search the same topic with completely different intent.',
  'The words they use tell us three things.',
  'A strong angle has to pass four tests.',
  'Here is how raw search data becomes one angle.',
  'The research should end in one sentence.',
  'Once the angle is clear, every downstream decision gets easier.',
  'But the right angle can still create the wrong business.',
  'Your expertise should work beyond your calendar.',
  'The audience is already online.',
  'The calendar is the bottleneck.',
  'You supply the expertise and approval.',
  'Common questions',
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
  ['id="search-signals"', 'id="angle-fit"'],
  ['id="angle-fit"', 'id="research-process"'],
  ['id="research-process"', 'id="positioning-output"'],
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
assert.ok(html.includes('class="panel collapsed"'));
assert.ok(html.includes('aria-hidden="true" inert'));
assert.ok(html.includes('aria-expanded="false"'));
assert.ok(html.includes('panel.inert = collapsed'));
assert.ok(html.includes('function goTo(index)'));
assert.ok(html.includes("event.key === 'Home'"));
assert.ok(html.includes("event.key === 'End'"));
assert.ok(html.includes('@media (prefers-reduced-motion: reduce)'));
assert.ok(html.includes('--deck-width: 1920px'));
assert.ok(html.includes('--deck-height: 1080px'));
assert.ok(html.includes('transform: translate(-50%, -50%) scale(var(--deck-scale))'));
assert.ok(html.includes('function updateDeckScale()'));

assert.doesNotMatch(html, /\[INSERT|PLACEHOLDER|TODO/i);
assert.doesNotMatch(html, /[—–]/);
assert.doesNotMatch(html, /(?:28%|260 million|\$50 million|350 health)/i);

console.log('kodara webinar: 16:9 stage, teaching sequence, controls, and claim guardrails verified');
