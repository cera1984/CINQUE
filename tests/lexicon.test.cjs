'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'data', 'lexicon-v3.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sandbox = {window:{}};
vm.runInNewContext(js, sandbox, {timeout:2000});
const vocab = sandbox.window.CINQUE_WORDS;
const own = xs => Array.from(xs);

test('dictionary is loaded in the expected page order', () => {
  assert.match(html, /src="\.\/data\/lexicon-v3\.js"/);
  assert.ok(html.indexOf('src="./data/lexicon-v3.js"') < html.indexOf('const WORDS = window.CINQUE_WORDS;'));
});
test('the alphabet and length are canonical', () => {
  assert.ok(vocab.allowed.every(w=>/^[a-z]{5}$/.test(w)));
  assert.ok(vocab.answers.every(w=>/^[a-z]{5}$/.test(w)));
});
test('zero duplicates and tier partition of the allowed words', () => {
  const levels = ['easy','medium','advanced'];
  const all = levels.flatMap(level => own(vocab.tiers[level]));
  assert.equal(all.length, new Set(all).size);
  assert.equal(all.length, vocab.allowed.length);
  assert.equal(new Set(vocab.answers).size, vocab.answers.length);
  assert.equal(vocab.answers.length, vocab.tiers.easy.length + vocab.tiers.medium.length);
  assert.ok(vocab.answers.every(w => vocab.allowed.includes(w)));
});
test('minimum catalog coverage and future difficulty tiers', () => {
  assert.ok(vocab.allowed.length >= 10690);
  assert.ok(vocab.answers.length > 3800);
  assert.ok(vocab.tiers.advanced.length > 6500);
});
test('masculine/feminine and singular/plural forms are recognized', () => {
  const allowed = new Set(vocab.allowed);
  for (const w of ['gatto','gatta','gatti','gatte','crepa','crepe','merda','merde','cazzo','cazzi','acqua','acque','zebra','zebre']) {
    assert.ok(allowed.has(w), w+' missing');
  }
});
test('no player statistic reset after migration', () => {
  assert.match(html, /cinque-infinite-v1/);
  assert.match(html, /loaded\.dictionaryRevision === dictionaryRevision/);
  assert.match(html, /state\.dictionaryRevision = dictionaryRevision/);
});

test('Wordlist v3: slang, morphology and lexical exclusions', () => {
  const words = new Set(vocab.allowed);
  for (const w of ['email', 'jella', 'yuppi', 'vibes', 'gnoma', 'merda', 'merde', 'botta', 'botte', 'troia', 'troie']) {
    assert.ok(words.has(w), w + ' missing');
  }
  for (const r of ['cccii', 'xcvii', 'xxiii', 'xxxvi']) {
    assert.ok(!words.has(r), r + ' must not be treated as an Italian word');
  }
  assert.equal(vocab.version, '2026-10-22-v3-morphit');
  assert.equal(vocab.answers.length, 4001);
});
