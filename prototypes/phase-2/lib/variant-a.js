// Phase 2 — Variant A, the sequential claim block. Build order step 3.
//
// review-motion-fork.md §A — Sequential: "One claim in focus; confirming
// advances to the next. No way to spend fewer than five gestures on a clean
// item." The five rows are claims.md §MultipleChoice's table, in its order:
// stem, key, then the distractors as the file gives them.
//
// THE REQUIRED SET — every row affirmed OR flagged — is owned by
// review-experience.md §The required set is every row, each affirmed or
// flagged, and is shared by all three variants. The argument for it, and the
// reading of it that was refused, are there and in
// docs/journal/2026-09-required-set.md. Do not restate either here: two files
// saying the same thing in their own words is how the MultipleSelect checkbox
// list survived its own correction by a day.
//
// What belongs here is only what is true of A:
//
//   - Confirming advances focus to the next unsettled row. Flagging does not —
//     the reviewer is about to type into the body that just opened.
//   - Focus is navigation, not a gate. Clicking a row or tabbing to it moves
//     it anywhere. Arrow keys are Phase 3's keystroke grammar.
//   - What an unfocused row collapses is the CLAIM SENTENCE. That, and not the
//     controls, is the whole difference between this and variant B; the row
//     grammar fixes the controls across all three.

import { el } from './dom.js';

export function sequentialClaimBlock(ctx) {
  const { item, key, record, log, CLAIM, flagControl, setAffirmed, advance, finish } = ctx;
  const keyLabel = key[0];

  // claims.md §MultipleChoice, rows 1-5. The key row is second by
  // specification; a build that ordered these by file position would put the
  // key wherever the permutation left it.
  const rows = [
    { part: 'stem', label: 'stem', claim: CLAIM.stem },
    { part: `option:${keyLabel}`, label: `key — ${keyLabel}`, claim: CLAIM.key(keyLabel) },
    ...item.options
      .filter((option) => option.label !== keyLabel)
      .map((option) => ({
        part: `option:${option.label}`,
        label: option.label,
        claim: CLAIM.distractor(option.label, keyLabel)
      }))
  ];

  const settled = new Set();
  let focus = 0;

  const go = advance('next item', () => {
    log.push('advance', item.id, { from: 'stage-2' });
    finish();
  });

  const built = rows.map((row, index) => buildRow(row, index));

  function settle(index, on) {
    const row = built[index];
    const isSettled = row.box.checked || row.flagged;
    if (isSettled) settled.add(index); else settled.delete(index);
    record.claimBlock.mode = 'perPart';
    go.disabled = settled.size < rows.length;
    paint();
    // Confirming advances; flagging does not — the reviewer is about to type
    // into the body that just opened.
    if (on === 'affirm' && row.box.checked) advanceFocus(index);
  }

  function advanceFocus(from) {
    for (let i = from + 1; i < rows.length; i += 1) {
      if (!settled.has(i)) return moveFocus(i);
    }
    for (let i = 0; i < rows.length; i += 1) {
      if (!settled.has(i)) return moveFocus(i);
    }
    return moveFocus(from);   // everything is settled; stay put
  }

  function moveFocus(index) {
    if (index === focus) return paint();
    focus = index;
    log.push('focus', item.id, { part: rows[index].part });
    paint();
    built[index].el.focus();
  }

  function paint() {
    for (const [i, row] of built.entries()) {
      row.el.classList.toggle('focused', i === focus);
      row.el.setAttribute('aria-current', i === focus ? 'true' : 'false');
      const mark = row.box.checked ? '✓' : row.flagged ? '⚑' : '·';
      row.state.textContent = mark;
      row.state.className = `row-state${row.flagged && !row.box.checked ? ' flagged' : ''}`;
      row.marker.textContent = i === focus ? '▸' : ' ';
    }
  }

  function buildRow(row, index) {
    const box = el('input', { type: 'checkbox', 'data-claim': row.part,
      onchange: () => {
        setAffirmed(record, row.part, box.checked);
        log.push(box.checked ? 'affirm' : 'unaffirm', item.id,
          { part: row.part, mode: 'perPart' });
        settle(index, 'affirm');
      } });

    const node = {
      box,
      flagged: false,
      state: el('span', { class: 'row-state', text: '·' }),
      marker: el('span', { class: 'row-marker', text: ' ' })
    };

    const flag = flagControl(item, row.part, {
      onToggle: (open) => { node.flagged = open; settle(index, 'flag'); }
    });

    node.el = el('div', { class: 'claim-row', 'data-part': row.part, tabindex: '0',
      onfocus: () => moveFocus(index),
      onclick: (event) => { if (!event.target.closest('.row-controls')) moveFocus(index); } },
      el('div', { class: 'row-head' },
        node.marker,
        el('span', { class: 'row-label', text: row.label }),
        el('span', { class: 'row-count', text: `${index + 1} of ${rows.length}` }),
        node.state),
      el('p', { class: 'claim', text: row.claim }),
      el('div', { class: 'row-controls' },
        el('label', { class: 'affirm' }, box, ' confirm'),
        flag));

    return node;
  }

  const block = el('section', { class: 'band stage claim-block sequential' },
    built.map((row) => row.el),
    el('div', { class: 'advance-row' }, go));

  paint();
  return block;
}
