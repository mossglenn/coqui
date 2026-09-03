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

const gestures = {};   // the shell column — Stage 1, the advances, the chrome
const block = {};      // band 3 — the column the fork is actually decided on
const gated = [];
const leaks = [];
const blockNotes = [];
let unbuilt = 0;       // Stage-2 screens still rendering the scaffold

async function where() {
  if (await page.$('.card.close')) return 'close';
  if (await page.$('.scaffold')) return 'stage-2-scaffold';
  if (await page.$('.branches')) return 'mismatch';
  // Both the MultipleChoice Stage 2 fork and the MultipleSelect comparison
  // step are claim blocks. They are told apart by the item's type, not by the
  // screen — the shell renders one band 3 and the type decides what is in it.
  if (await page.$('.claim-block')) return 'claim-block';
  return 'stage-1';
}

// The cheapest path through a clean item's claim block. It lives here and not
// in the prototype: a build that told the harness what to click could not
// disagree with it, and disagreeing with it is the whole point.
//
//   A  stem · key · A · C · D    5      the incumbent
//   D  stem · bulk               2
//   B  bulk                      1
//   MultipleSelect  stem         1      no fork; the marking was the answer
//
// README.md §Acceptance checks 4, and claims.md §The gesture inventory for why
// the feedback controls on these same rows are not in it.
function cleanPath(raw, optionParts) {
  if (raw.coquiType === 'MultipleSelect') return ['stem'];
  if (variant === 'B') return ['bulk'];
  if (variant === 'D') return ['stem', 'bulk'];
  return ['stem', ...optionParts];
}

// The journal's check, mechanised — 2026-09-manufactured-answers.md:
// what does this control record for a reviewer who has not decided?
//
// Runs on entry to every claim block, in every variant, on every item, with no
// path table and no per-variant knowledge. Two of the three findings so far
// were a control whose default supplied a substantive answer; this is the
// assertion that would have caught the MultipleSelect checkbox list at build
// time rather than at drawing time.
async function claimBlockEntry(itemId) {
  const controls = await page.$$eval('.claim-block [data-claim]', (nodes) => nodes.map((n) => [
    n.dataset.claim,
    n.type === 'checkbox' || n.type === 'radio' ? n.checked : n.classList.contains('on')
  ]));
  if (!controls.length) {
    blockNotes.push(`${itemId}: the claim block exposes no [data-claim] controls`);
    return [];
  }
  const preAffirmed = controls.filter(([, on]) => on).map(([part]) => part);
  if (preAffirmed.length) {
    blockNotes.push(`${itemId}: affirmed before the reviewer decided — ${preAffirmed.join(', ')}`);
  }
  return controls.map(([part]) => part);
}

// Walk the path, counting clicks, and check the gate at every prefix. A block
// that opens early costs fewer gestures than the table says and has answered
// something for the reviewer; a block that never opens has not been completed
// by its own required set.
async function driveClaimBlock(itemId, raw, parts) {
  const path = cleanPath(raw, parts.filter((p) => p.startsWith('option:')));
  for (const [i, part] of path.entries()) {
    const closed = await page.$eval('.advance-row .advance', (b) => b.disabled).catch(() => null);
    if (closed !== true) {
      blockNotes.push(`${itemId}: gate open after ${i} of ${path.length} — ${path.slice(0, i)}`);
    }
    const control = await page.$(`.claim-block [data-claim="${part}"]`);
    if (!control) { blockNotes.push(`${itemId}: no control for "${part}"`); continue; }
    await control.click();
    block[itemId] += 1;
  }
  const open = await page.$eval('.advance-row .advance', (b) => b.disabled).catch(() => null);
  if (open !== false) blockNotes.push(`${itemId}: gate still closed after the full path`);
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
  block[itemId] ??= 0;

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
  } else if (screen === 'claim-block') {
    await gate(`${itemId}/claim-block/before`);
    const parts = await claimBlockEntry(itemId);
    await driveClaimBlock(itemId, raw, parts);
    await gate(`${itemId}/claim-block/after`);
    if (raw.coquiType === 'MultipleSelect') {
      // Acceptance check 8 — a per-option anchor for every option, plus the
      // stem's, and only at the comparison step.
      const flags = await page.$$('.claim-block .flag');
      if (flags.length !== raw.optionCount + 1) {
        leaks.push(`${itemId}: comparison shows ${flags.length} anchors, ` +
          `expected ${raw.optionCount + 1}`);
      }
    }
  } else if (screen === 'stage-2-scaffold') {
    unbuilt += 1;
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

// The ledger, in two columns. eir-001 and eir-005 are excluded because their
// mismatch branches are conditional and outside the inventory.
//
//               shell   claim block   total
//   A             4          5          9
//   B             4          1          5
//   D             4          2          6
//   MultipleSelect-5   8     1          9      = n + 4, by arithmetic not structure
//
// The shell column is the same in all three by specification. The claim-block
// column is the one the fork is decided on and the one no shell decision can
// move — README.md §Acceptance checks 4.
const BLOCK = { A: 5, B: 1, D: 2 }[variant];
const clean = Object.keys(gestures).filter((id) => !['eir-001', 'eir-005'].includes(id));
const mcIds = clean.filter((id) => RAW[id].coquiType === 'MultipleChoice');
const msIds = clean.filter((id) => RAW[id].coquiType === 'MultipleSelect');
const mc = mcIds.map((id) => gestures[id]);
const ms = msIds.map((id) => gestures[id]);

check('gesture ledger — MultipleChoice shell column is 4', mc.every((n) => n === 4),
  `got ${JSON.stringify(mc)}`);
check('gesture ledger — MultipleSelect-5 shell column is 8, which is n + 3',
  ms.every((n) => n === 8), `got ${JSON.stringify(ms)}`);

check('gesture ledger — the MultipleSelect comparison step costs 1',
  msIds.every((id) => block[id] === 1),
  `got ${JSON.stringify(msIds.map((id) => [id, block[id]]))}`);
check('gesture ledger — MultipleSelect-5 totals 9, which is n + 4',
  msIds.every((id) => gestures[id] + block[id] === 9),
  `got ${JSON.stringify(msIds.map((id) => gestures[id] + block[id]))}`);

if (unbuilt) {
  console.log(`  skip  the claim-block column in ${variant} — ${unbuilt} Stage 2 screens are ` +
    'still the scaffold, build order step ' + ({ A: 3, D: 4, B: 5 })[variant]);
} else {
  check(`acceptance check 4 — the claim block costs ${BLOCK} in ${variant}`,
    mcIds.every((id) => block[id] === BLOCK),
    `got ${JSON.stringify(mcIds.map((id) => [id, block[id]]))}`);
  check(`gesture ledger — MultipleChoice-4 totals ${4 + BLOCK} in ${variant}`,
    mcIds.every((id) => gestures[id] + block[id] === 4 + BLOCK),
    `got ${JSON.stringify(mcIds.map((id) => gestures[id] + block[id]))}`);
}

// No path table, no variant knowledge: every claim block the session walked
// through, checked for a control that answered before the reviewer did and for
// a gate that opened before the required set was complete.
check('no claim-block control answers for a reviewer who has not decided',
  blockNotes.length === 0, blockNotes.join('\n        '));

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
