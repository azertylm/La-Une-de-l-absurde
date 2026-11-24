import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ABSURDITY_LEVELS,
  DEMO_ANECDOTES,
  PRESS_STAMPS,
  buildSatiricalUne,
  formatFrenchEditionDate,
  generateRandomLoufoqueAnecdote,
  getStampOption,
  pickNextDemoAnecdote,
  splitArticleIntoColumns,
  truncateAtWordBoundary,
  validateAnecdote,
} from './newspaperGenerator';

test('validateAnecdote rejects empty and too-short inputs and accepts valid stories', () => {
  assert.equal(validateAnecdote('').valid, false);
  assert.equal(validateAnecdote('   ').valid, false);
  assert.equal(validateAnecdote('Salut').valid, false);

  const ok = validateAnecdote('Tonton Michel a raté le cochonnet de trois mètres.');
  assert.equal(ok.valid, true);
  assert.equal(ok.error, undefined);
});

test('pickNextDemoAnecdote avoids repeating the current anecdote', () => {
  for (const current of DEMO_ANECDOTES) {
    const next = pickNextDemoAnecdote(current, 0);
    assert.notEqual(next, current);
    assert.ok(DEMO_ANECDOTES.includes(next));
  }
});

test('generateRandomLoufoqueAnecdote creates valid multi-sentence quirky stories', () => {
  const storyA = generateRandomLoufoqueAnecdote(1);
  const storyB = generateRandomLoufoqueAnecdote(2);
  assert.equal(validateAnecdote(storyA).valid, true);
  assert.equal(validateAnecdote(storyB).valid, true);
  assert.notEqual(storyA, storyB);
});

test('buildSatiricalUne embeds the user anecdote, adapts tones, absurdity levels, stamps, and bonus boxes', () => {
  const input = 'Notre voisin a tondu sa pelouse en chaussons à carreaux';
  const level1 = buildSatiricalUne(input, {
    tone: 'scandale',
    absurdityLevel: 1,
    stamp: 'voisin',
    photoFilter: 'bw',
    variantSeed: 1,
  });
  const level5 = buildSatiricalUne(input, {
    tone: 'urgence',
    absurdityLevel: 5,
    stamp: 'apero',
    photoFilter: 'vintage',
    variantSeed: 1,
  });
  const terroir = buildSatiricalUne(input, {
    tone: 'champetre',
    absurdityLevel: 3,
    stamp: 'scoop',
    photoFilter: 'color',
    variantSeed: 1,
  });

  assert.ok(level1.article.includes(input));
  assert.ok(level1.headline.startsWith('CONFIDENTIEL'));
  assert.ok(level5.headline.startsWith('ALERTE PLANÉTAIRE'));
  assert.ok(level5.article.includes('satellites'));
  assert.notEqual(level1.headline, terroir.headline);

  assert.equal(level1.stamp, 'voisin');
  assert.equal(level1.photoFilter, 'bw');
  assert.ok(level5.eyewitness.quote.length > 10);
  assert.ok(level5.eyewitness.witness.length > 5);
  assert.ok(level5.classifiedAd.length > 15);
  assert.ok(level5.horoscope.length > 15);
});

test('truncateAtWordBoundary truncates long lead sentences cleanly without cutting a word in half', () => {
  const sample =
    'Notre chat a pris le contrôle absolu du canapé pendant 6 heures d’affilée et a refusé toute négociation diplomatique';
  const result = truncateAtWordBoundary(sample, 95);
  assert.ok(result.endsWith('…'));
  assert.ok(!result.includes('nég…'));
  assert.ok(result.includes('toute…'));
});

test('formatFrenchEditionDate returns readable French date text', () => {
  const formatted = formatFrenchEditionDate(new Date('2026-05-07T12:00:00Z'));
  assert.ok(formatted.toLowerCase().includes('mai'));
  assert.ok(formatted.includes('2026'));
});

test('splitArticleIntoColumns balances multi-word articles into two columns', () => {
  const [col1, col2] = splitArticleIntoColumns('un deux trois quatre cinq six');
  assert.equal(col1, 'un deux trois');
  assert.equal(col2, 'quatre cinq six');
});

test('stamps and absurdity metadata stay consistent', () => {
  assert.equal(ABSURDITY_LEVELS.length, 5);
  assert.ok(PRESS_STAMPS.length >= 5);
  assert.equal(getStampOption('scoop').stampText, 'SCOOP DU SIÈCLE');
});
