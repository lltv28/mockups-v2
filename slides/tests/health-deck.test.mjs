import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = new URL('../health/', import.meta.url);
const deck = readFileSync(new URL('../health-draft.html', root), 'utf8');
const demos = readFileSync(new URL('demos.html', root), 'utf8');

test('presentation IDs are unique and every labelled control resolves', () => {
  const ids = [...deck.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate IDs can break navigation');
  for (const [, target] of deck.matchAll(/aria-(?:labelledby|controls)="([^"]+)"/g)) {
    assert.ok(ids.includes(target), `missing accessible target: ${target}`);
  }
  assert.equal([...deck.matchAll(/<section class="slide\b/g)].length, 10);
  for (const [, selector] of deck.matchAll(/querySelector\('#([^']+)'\)/g)) {
    assert.ok(ids.includes(selector), `unresolved script selector: ${selector}`);
  }
});

test('all four existing demo routes, both videos, and local assets remain available', () => {
  const routes = [...deck.matchAll(/data-src="health\/demos.html\?slide=(\d)&amp;embed=1"/g)].map(m => Number(m[1]));
  assert.deepEqual(routes, [1, 2, 3, 4]);
  for (const id of ['dda7d6b54baa18b5487b73233648182b', 'efec3e7459738b6bdddbbb49f3f9b0b8']) {
    assert.ok(demos.includes(id), `missing existing video ${id}`);
  }
  for (const [, asset] of demos.matchAll(/(?:src="|url\(')(assets\/[^"')]+)/g)) {
    assert.ok(existsSync(fileURLToPath(new URL(asset, root))), `missing asset ${asset}`);
  }
});

test('both static pages contain valid JavaScript', () => {
  for (const html of [deck, demos]) {
    for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(script);
  }
});
