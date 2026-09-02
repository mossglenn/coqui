// Phase 2 — the acceptance walkthrough. Runs a full 12-item session in a real
// browser and checks it against README.md §Acceptance checks and shell.md's
// gesture ledger.
//
//   python3 -m http.server 8901          # from the repo root, in another shell
//   node prototypes/phase-2/acceptance/walkthrough.mjs [A|B|D]
//
// This is the ONE thing in Phase 2 with a dependency: `npm i -D playwright &&
// npx playwright install chromium`. It is deliberately not in
// prototypes/phase-2/package.json — the prototype a reviewer runs stays
// dependency-free, and a harness is not the prototype. Set PW_CHROMIUM to
// point at an existing binary if you have one.
//
// A count nobody can run is a claim. This is what makes the ledger a check —
// it is how the MultipleSelect marking control was caught. See
// ../../../docs/journal/2026-09-multiselect-marking.md.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { stage1Probes, normalise } from '../lib/leak-probes.js';

const BASE = process.env.PHASE2_BASE ?? 'http://127.0.0.1:8901';
const CORPUS = JSON.parse(readFileSync(
  fileURLToPath(new URL('../../../corpus/session-corpus.json', import.meta.url)), 'utf8'));
const RAW = Object.fromEntries(CORPUS.items.map((i) => [i.id, i]));
const SEQ = CORPUS.ordering.sequence;
const variant = (process.argv[2] ?? 'A').toUpperCase();

let fails = 0;
const check = (name, cond, detail = '') => {
  if (cond) console.log(`  ok    ${name}`);
  else { fails += 1; console.log(`  FAIL  ${name}\n        ${detail}`); }
};

const launch = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};
const browser = await chromium.launch(launch);
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() !== 'error') return;
  const url = m.location()?.url ?? '';
  if (url.includes('favicon')) return;           // the dev server has none
  errors.push(`${m.text()} ${url}`);
});

await page.goto(`${BASE}/prototypes/phase-2/index.html?variant=${variant}`);
await page.waitForSelector('.card');
console.log(`\nVariant ${variant}\n`);

check('the entry card carries no time estimate and no resume line',
  !/minute|hour|resume/i.test(await page.textContent('.card.entry')));

const gestures = {};
const gated = [];
const leaks = [];

async function where() {
  if (await page.$('.card.close')) return 'close';
  if (await page.$('.scaffold')) return 'stage-2-scaffold';
  if (await page.$('.claim-block')) return 'comparison';
  if (await page.$('.branches')) return 'mismatch';
  return 'stage-1';
}

async function gate(label) {
  gated.push([label, await page.$eval('.advance-row .advance', (b) => b.disabled)
    .catch(() => null)]);
}

// Nothing on a blind screen that the projection was not entitled to show, and
// no per-part anchor on a MultipleChoice blind screen — checks 2 and 7.
async function blindChecks(itemId) {
  const dom = normalise(await page.textContent('.card'));
  const raw = RAW[itemId];
  for (const probe of stage1Probes(raw)) {
    if (probe.kind !== 'feedback') continue;
    for (const run of probe.runs) {
      if (dom.includes(run)) leaks.push(`${itemId} ${probe.label}: "${run}"`);
    }
  }
  if (raw.coquiType === 'MultipleChoice') {
    const flags = await page.$$('.band.stage .flag, .item-block .flag');
    if (flags.length) leaks.push(`${itemId}: ${flags.length} per-part anchors on a blind screen`);
  }
  const anchors = await page.$$('.band.anchor .anchor-line');
  if (anchors.length !== 1) leaks.push(`${itemId}: ${anchors.length} item anchors, expected 1`);
}

await page.click('.card.entry .advance');

for (let step = 0; step < 60; step += 1) {
  const screen = await where();
  if (screen === 'close') break;
  const itemId = SEQ[await page.evaluate(() => window.phase2.index)];
  const raw = RAW[itemId];
  gestures[itemId] ??= 0;

  if (screen === 'stage-1') {
    await blindChecks(itemId);
    if (itemId === 'eir-011') {
      const rendered = await page.$$eval('.options > *', (rows) => rows.map((r) =>
        [r.querySelector('.label').textContent, r.querySelector('.text').textContent]));
      check('acceptance check 3 — eir-011 renders A/B/C/D in file order',
        JSON.stringify(rendered) === JSON.stringify(
          [['A', 'Right to live'], ['B', 'Patent'], ['C', 'IPR'], ['D', 'Copy rights']]),
        JSON.stringify(rendered));
    }
    if (raw.coquiType === 'MultipleSelect') {
      // Every option gets an explicit correct/incorrect — n gestures. On
      // eir-005 we disagree with the author throughout, so the per-option
      // mismatch branch fires on the corpus's wrong-answer-key defect.
      for (const option of raw.content.options) {
        const agree = itemId === 'eir-005' ? !option.isCorrect : option.isCorrect;
        await page.click(`.opt-marked:has(.label:text-is("${option.label}")) ` +
          `.mark-choice:has(span:text-is("${agree ? 'correct' : 'incorrect'}")) input`);
        gestures[itemId] += 1;
      }
    } else {
      const key = raw.content.options.find((o) => o.isCorrect).label;
      const pick = itemId === 'eir-001'   // answer against the key, to fire the branch
        ? raw.content.options.find((o) => o.label !== key).label : key;
      await page.click(`.opt:has(.label:text-is("${pick}")) input`);
      gestures[itemId] += 1;
    }
    await gate(`${itemId}/stage-1/before`);
    await page.click('.choice[data-value="sure"]');
    gestures[itemId] += 1;
    await gate(`${itemId}/stage-1/after`);
  } else if (screen === 'mismatch') {
    await gate(`${itemId}/mismatch/before`);
    const groups = await page.$$('.branches');
    for (const [i, group] of groups.entries()) {
      const options = await group.$$('label');
      check(`${itemId} — the branch offers a deferral, listed last`,
        (await options[options.length - 1].textContent()).includes('needs checking'),
        await options[options.length - 1].textContent());
      // take the deferral on the first contested part, a verdict on the rest,
      // so the record has to distinguish them
      const pick = i === 0 ? options[options.length - 1] : options[0];
      await (await pick.$('input')).click();
    }
    // the deferral opened a blocking channel where the question was asked
    const opened = await page.$$eval('.flag-body:not([hidden]), .anchor-body:not([hidden])',
      (nodes) => nodes.map((n) => n.querySelector('input[type=checkbox]')?.checked));
    check(`${itemId} — the deferral opened a blocking objection`,
      opened.length >= 1 && opened.every((b) => b === true), JSON.stringify(opened));
    await gate(`${itemId}/mismatch/after`);
  } else if (screen === 'comparison') {
    await gate(`${itemId}/comparison/before`);
    await page.click('.stem-row input[type=checkbox]');
    await gate(`${itemId}/comparison/after`);
    const flags = await page.$$('.claim-block .flag');
    if (flags.length !== raw.optionCount + 1) {
      leaks.push(`${itemId}: comparison shows ${flags.length} anchors, ` +
        `expected ${raw.optionCount + 1}`);
    }
  }

  await page.click(screen === 'stage-2-scaffold' ? '.scaffold .advance' : '.advance-row .advance');
  gestures[itemId] += 1;
}

console.log('');
check('acceptance check 9 — no screen advances on the gesture that completes its required set',
  gated.filter(([l]) => l.endsWith('/before')).every(([, d]) => d === true) &&
  gated.filter(([l]) => l.endsWith('/after')).every(([, d]) => d === false),
  JSON.stringify(gated.filter(([, d]) => d === null)));

check('acceptance checks 2 and 7 — nothing leaked; the anchors are where they should be',
  leaks.length === 0, leaks.join('\n        '));

check('the session reached its close', (await page.$('.card.close')) !== null);

const record = await page.evaluate(() =>
  window.phase2.log.export(window.phase2.session.sequence));

check('acceptance check 10 — one record per item, in ordering.sequence, valid JSON',
  record.records.length === 12 && record.records.every((r) => !r.missing) &&
  record.records.map((r) => r.id).join() === SEQ.join(),
  record.records.map((r) => r.id).join());

// The shell column of the ledger. The claim-block column belongs to the
// variants and is checked when each is built. eir-001 and eir-005 are excluded
// because their mismatch branches are conditional and outside the inventory.
const clean = Object.entries(gestures).filter(([id]) => !['eir-001', 'eir-005'].includes(id));
const mc = clean.filter(([id]) => RAW[id].coquiType === 'MultipleChoice').map(([, n]) => n);
const ms = clean.filter(([id]) => RAW[id].coquiType === 'MultipleSelect').map(([, n]) => n);
check('gesture ledger — MultipleChoice shell column is 4', mc.every((n) => n === 4),
  `got ${JSON.stringify(mc)}`);
check('gesture ledger — MultipleSelect-5 shell column is 8, which is n + 3',
  ms.every((n) => n === 8), `got ${JSON.stringify(ms)}`);

const deferrals = record.events.filter((e) => e.type === 'defer');
check('a deferral is recorded as its own event, scoped and blocking',
  deferrals.length === 2 && deferrals.every((e) => e.blocking === true) &&
  deferrals.some((e) => e.scope === 'item') && deferrals.some((e) => e.scope.startsWith('option:')),
  JSON.stringify(deferrals));

check('a deferral is never recorded as a self-correction',
  record.records.filter((r) => r.deferrals.length).every((r) => r.mismatch &&
    (r.mismatch.branch === 'defer' || Object.values(r.mismatch.branches ?? {}).includes('defer'))),
  JSON.stringify(record.records.filter((r) => r.deferrals.length).map((r) => [r.id, r.deferrals])));

const branches = record.events.filter((e) => e.type === 'mismatch-branch');
check('acceptance check 6 — the MultipleChoice mismatch branch fired on eir-001',
  branches.some((e) => e.item === 'eir-001'));
check('the MultipleSelect branch localised per option on eir-005',
  branches.filter((e) => e.item === 'eir-005').length >= 2,
  `${branches.filter((e) => e.item === 'eir-005').length} per-option branches`);

check('no page errors', errors.length === 0, errors.join('\n        '));

console.log(fails === 0 ? '\nAll walkthrough checks passed.\n' : `\n${fails} failed.\n`);
await browser.close();
process.exit(fails === 0 ? 0 : 1);
