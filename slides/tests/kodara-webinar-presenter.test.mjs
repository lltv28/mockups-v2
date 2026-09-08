import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = new URL('../kodara-webinar-presenter.html', import.meta.url);
const html = await readFile(file, 'utf8');
const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

for (const requiredText of [
  'Presenter View',
  'Current slide',
  'Next slide',
  'Private notes',
  'Previous',
  'Next',
  'Waiting for the audience deck',
]) {
  assert.ok(visibleText.includes(requiredText), `missing presenter interface text: ${requiredText}`);
}

assert.equal((html.match(/<iframe/g) || []).length, 2, 'presenter view should show current and next slide previews');
assert.ok(html.includes('id="notes"'));
assert.ok(html.includes('id="elapsed"'));
assert.ok(html.includes('id="previousSlide"'));
assert.ok(html.includes('id="nextSlide"'));
assert.ok(html.includes("new BroadcastChannel('kodara-webinar')"));
assert.ok(html.includes("localStorage.setItem(notesKey(currentSlide.id), notes.value)"));
assert.ok(html.includes("message.type !== 'state'"));
assert.ok(html.includes("preview', '1'"));
assert.ok(html.includes('setInterval(requestState, 1000)'), 'presenter should retry state requests until connected');
assert.ok(html.includes('clearInterval(stateRequestTimer)'));
assert.ok(html.includes("event.key === 'ArrowRight'"));
assert.ok(html.includes("event.key === 'ArrowLeft'"));

assert.doesNotMatch(html, /[—–]/);

console.log('kodara webinar presenter: previews, private notes, timing, and synchronized controls verified');
