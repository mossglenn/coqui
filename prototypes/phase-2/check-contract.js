// Phase 2 — presentation-contract check, headless.
//
//   node prototypes/phase-2/check-contract.js
//
// The same assertions run in the browser on every load, because loadSession()
// calls buildSession(). This runner exists so the contract can be checked
// without serving a page, and so the negative cases have somewhere to live.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildSession, ContractViolation } from './lib/corpus.js';
import { normalise, stage1Probes } from './lib/leak-probes.js';

const CORPUS = fileURLToPath(new URL('../../corpus/session-corpus.json', import.meta.url));
const raw = () => JSON.parse(readFileSync(CORPUS, 'utf8'));

let failures = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  ok    ${name}`);
  } catch (e) {
    failures += 1;
    console.log(`  FAIL  ${name}\n        ${e.message}`);
  }
}
function assert(cond, message) {
  if (!cond) throw new Error(message);
}
function throws(fn, message) {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(message);
}

const session = buildSession(raw());

console.log('\nProjection');

check('the session corpus builds', () => {
  assert(session.length === 12, `expected 12 items, got ${session.length}`);
});

check('ordering.sequence is the session order', () => {
  assert(session.at(0).id === 'eir-002', `first item is ${session.at(0).id}, expected eir-002`);
  assert(session.at(11).id === 'eir-005', `last item is ${session.at(11).id}, expected eir-005`);
});

check('no projected item carries a withheld field', () => {
  const withheld = ['condition', 'defect', 'knownCraftDefect', 'optionPermutation',
                    'optionOrder', 'sourceRef', 'content'];
  for (const item of session.items()) {
    for (const field of withheld) {
      assert(!(field in item), `${item.id} carries ${field}`);
    }
  }
});

check('no projected option carries a withheld field', () => {
  const withheld = ['isCorrect', 'incorrectFeedback', 'sourceLabel'];
  for (const item of session.items()) {
    for (const option of item.options) {
      for (const field of withheld) {
        assert(!(field in option), `${item.id} option ${option.label} carries ${field}`);
      }
    }
  }
});

check('nothing withheld survives serialisation', () => {
  // The blunt version of the two field checks above: whatever a renderer
  // reaches for, the strings are not there to reach. Feedback is probed by
  // what it says beyond the rendered surface — see lib/leak-probes.js on why
  // a plain substring search false-positives on eir-009.
  const serialised = normalise(JSON.stringify(session.items()));
  for (const item of raw().items) {
    for (const probe of stage1Probes(item)) {
      if (probe.kind !== 'feedback') continue;
      if (probe.runs.length === 0) continue; // reported separately, below
      for (const run of probe.runs) {
        assert(!serialised.includes(run),
          `${item.id} option ${probe.label}: feedback reached the projection — "${run}"`);
      }
    }
  }
  for (const token of ['isCorrect', 'sourceLabel', 'incorrectFeedback', 'countsAsCaught']) {
    assert(!JSON.stringify(session.items()).includes(token), `${token} reached the projection`);
  }
});

check('the whitelist withholds a field the contract does not name', () => {
  const mutated = raw();
  mutated.items[0].content.difficultyHint = 'hard';
  mutated.items[0].content.options[0].isDistractorOfRecord = true;
  const s = buildSession(mutated);
  const item = s.item(mutated.items[0].id);
  assert(!('difficultyHint' in item), 'a new item field leaked');
  assert(!('isDistractorOfRecord' in item.options[0]), 'a new option field leaked');
});

check('every feedback string has something distinctive to probe for', () => {
  // If a feedback string says nothing the screen does not already say, the
  // leak check above cannot fail on it. That is a property of the corpus, not
  // a pass — name the items so acceptance check 2 knows where it is blind.
  const blind = [];
  for (const item of raw().items) {
    for (const probe of stage1Probes(item)) {
      if (probe.kind === 'feedback' && probe.runs.length === 0) {
        blind.push(`${item.id}:${probe.label}`);
      }
    }
  }
  assert(blind.length === 0,
    `no distinctive run to probe for on ${blind.join(', ')} — ` +
    `these feedback strings restate the stem and the option text and nothing else`);
});

console.log('\nOrder');

check('acceptance check 3 — eir-011 renders A/B/C/D as the file gives it', () => {
  const item = session.item('eir-011');
  const rendered = item.options.map((o) => [o.label, o.text]);
  const expected = [['A', 'Right to live'], ['B', 'Patent'], ['C', 'IPR'], ['D', 'Copy rights']];
  assert(JSON.stringify(rendered) === JSON.stringify(expected),
    `got ${JSON.stringify(rendered)}`);
  assert(JSON.stringify(session.keyFor('eir-011')) === JSON.stringify(['B']),
    `key is ${JSON.stringify(session.keyFor('eir-011'))}, expected ["B"]`);
});

check('a re-sorted render is caught', () => {
  throws(
    () => session.assertRenderedOrder('eir-011', ['B', 'A', 'C', 'D']),
    'assertRenderedOrder accepted a re-sorted option list'
  );
  session.assertRenderedOrder('eir-011', ['A', 'B', 'C', 'D']);
});

check('a re-lettered render is caught', () => {
  throws(
    () => session.assertRenderedOrder('eir-011', ['1', '2', '3', '4']),
    'assertRenderedOrder accepted re-lettered options'
  );
});

console.log('\nThe key, and where it is kept');

check('the key is not on the item', () => {
  const item = session.item('eir-011');
  assert(!JSON.stringify(item).includes('"key"'), 'the item carries a key field');
  assert(Object.isFrozen(item), 'the projected item is not frozen');
});

check('MultipleSelect keys are sets', () => {
  const item = session.item('eir-002');
  assert(item.coquiType === 'MultipleSelect', `eir-002 is ${item.coquiType}`);
  assert(item.instruction === 'Select all that apply.', `instruction is ${item.instruction}`);
  assert(item.options.length === 5, `${item.options.length} options`);
  assert(session.keyFor('eir-002').length === 3,
    `key is ${JSON.stringify(session.keyFor('eir-002'))}`);
});

console.log('\nRefusals');

check('a corpus with no contract is refused', () => {
  const mutated = raw();
  delete mutated.presentationContract;
  throws(() => buildSession(mutated), 'built a session with no presentation contract');
});

check('a sequence naming a missing item is refused', () => {
  const mutated = raw();
  mutated.ordering.sequence = [...mutated.ordering.sequence, 'eir-999'];
  throws(() => buildSession(mutated), 'built a session whose sequence names a missing item');
});

check('an unknown item id is refused', () => {
  throws(() => session.item('eir-999'), 'returned an item that is not in the corpus');
  throws(() => session.keyFor('eir-999'), 'returned a key for an item that is not in the corpus');
});

check('ContractViolation is what gets thrown', () => {
  const mutated = raw();
  delete mutated.presentationContract;
  try {
    buildSession(mutated);
  } catch (e) {
    assert(e instanceof ContractViolation, `threw ${e.name}`);
    return;
  }
  throw new Error('nothing was thrown');
});

console.log(failures === 0
  ? `\nAll checks passed.\n`
  : `\n${failures} check${failures === 1 ? '' : 's'} failed.\n`);
process.exit(failures === 0 ? 0 : 1);
