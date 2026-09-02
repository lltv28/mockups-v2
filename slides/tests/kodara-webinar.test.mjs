import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = new URL('../kodara-webinar.html', import.meta.url);
const html = await readFile(file, 'utf8');
const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

const slides = html.match(/<section class="slide(?: |")/g) || [];

assert.equal(slides.length, 36, 'webinar should contain the complete 36-slide story');
assert.equal((html.match(/aria-roledescription="slide"/g) || []).length, 36);
assert.equal((html.match(/data-act="[1-5]"/g) || []).length, 36);

for (const requiredCopy of [
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

assert.ok(html.includes('lucas-photo.jpg'));
assert.ok(html.includes('site-leanne.jpg'));
assert.ok(html.includes('id="previousSlide"'));
assert.ok(html.includes('id="nextSlide"'));
assert.ok(html.includes('aria-controls="panel"'));
assert.ok(html.includes('aria-expanded="true"'));
assert.ok(html.includes('panel.inert = collapsed'));
assert.ok(html.includes('function goTo(index)'));
assert.ok(html.includes("event.key === 'Home'"));
assert.ok(html.includes("event.key === 'End'"));
assert.ok(html.includes('@media (prefers-reduced-motion: reduce)'));

assert.doesNotMatch(html, /\[INSERT|PLACEHOLDER|TODO/i);
assert.doesNotMatch(html, /[—–]/);
assert.doesNotMatch(html, /(?:28%|260 million|\$50 million|350 health)/i);

console.log('kodara webinar: structure, narrative, controls, and claim guardrails verified');
