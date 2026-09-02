// Phase 2 — the shell: everything A, B and D share.
//
// Drawn in shell.md; that document owns the pictures and the specs own the
// facts. Six screens and a three-band frame.
//
// The two rules this file exists to keep:
//
//   No screen advances on the gesture that completes its required set.
//     The completing gesture ENABLES the advance control; a separate gesture
//     takes it. Acceptance check 9.
//
//   No optional affordance sits below the completing gesture.
//     Triviality sits beside confidence; the item anchor sits above the stage
//     block. shell.md §The layout rule.

import { el, clear } from './dom.js';
import { claimBlockFor } from './variants.js';

const ANCHOR_LABEL = 'something is off about this item';

// claims.md §MultipleChoice — copy exactly. "Not merely weaker" is
// load-bearing copy; do not paraphrase it to fit a column.
export const CLAIM = {
  stem: 'This question is well-posed: nothing here is wrong, misleading, or ill-formed.',
  key: (label) => `${label} is incontrovertibly correct — not merely the strongest of these four.`,
  distractor: (label, key) => `${label} is wrong — not merely weaker than ${key}.`
};

const BRANCH_MC = (chosen, key) => [
  ['mistaken', `${key} is right — I was mistaken`],
  ['key-wrong', `${chosen} is right — the key is wrong`],
  ['both', 'Both are defensible']
];

const BRANCH_MS = [
  ['mistaken', 'The author is right — I was mistaken'],
  ['key-wrong', 'I am right — the key is wrong'],
  ['both', 'Both are defensible']
];

export function runSession({ root, session, variant, log }) {
  let index = 0;

  const surface = el('div', { class: 'surface' });
  clear(root).append(surface);

  const show = (node) => {
    clear(surface).append(node);
    const focusable = node.querySelector('[autofocus], button:not([disabled])');
    if (focusable) focusable.focus();
  };

  // -- band 1 ---------------------------------------------------------------

  // Progress chrome. A counter and a surface label, and nothing else: a strip
  // showing what has been confirmed or flagged would show a reviewer their own
  // flag rate mid-session. shell.md §The frame, [settled 2026-09-01].
  function chrome(item) {
    return el('header', { class: 'chrome' },
      el('span', { text: `item ${item.position} of ${session.length}` }),
      el('span', { class: 'surface-label', text: 'content' })
    );
  }

  // The item as a learner sees it. Identical in A, B and D by specification,
  // and identical at both stages except that Stage 2 marks the key.
  function itemBlock(item, { key = null, chosen = null, options = true } = {}) {
    const labels = [];
    const rows = item.options.map((option) => {
      labels.push(option.label);
      const isKey = key && key.includes(option.label);
      const isChosen = chosen && [].concat(chosen).includes(option.label);
      return el('div', { class: 'opt-static' },
        el('span', { class: 'mark', text: isKey ? '✓' : isChosen ? '•' : ' ' }),
        el('span', { class: 'label', text: option.label }),
        el('span', { class: 'text', text: option.text }),
        isKey ? el('span', { class: 'note', text: '← the key' }) : null,
        isChosen && !isKey ? el('span', { class: 'note', text: '← you' }) : null
      );
    });
    if (options) session.assertRenderedOrder(item.id, labels);
    return el('section', { class: 'band item-block' },
      el('p', { class: 'stem', text: item.stem }),
      item.instruction ? el('p', { class: 'instruction', text: item.instruction }) : null,
      options ? el('div', { class: 'options' }, rows) : null
    );
  }

  // -- band 2 ---------------------------------------------------------------

  // The item-scoped objection anchor. One collapsed line directly below the
  // item text, above the stage block, present at both stages, in all three
  // variants, on every item type. review-experience.md §Placement, and
  // acceptance check 7.
  //
  // Blocking by default here, and only here: an item-scoped objection has no
  // cell to gate on, so the switch is the only mechanism there is.
  function itemAnchor(item) {
    const record = log.record(item);
    const body = el('div', { class: 'anchor-body', hidden: true });
    const line = el('button', {
      class: 'anchor-line', type: 'button',
      onclick: () => {
        const opening = body.hidden;
        body.hidden = !opening;
        line.textContent = `${opening ? '⌃' : '⌄'} ${ANCHOR_LABEL}`;
        if (opening && !record.itemAnchor.opened) {
          record.itemAnchor.opened = true;
          log.push('anchor-open', item.id, { scope: 'item' });
        }
      }
    }, `⌄ ${ANCHOR_LABEL}`);

    const text = el('textarea', { rows: 3, placeholder: 'nothing narrower than the item',
      onchange: () => {
        record.itemAnchor.text = text.value;
        log.push('anchor-text', item.id, { scope: 'item', length: text.value.length });
      } });
    const blocking = el('input', { type: 'checkbox', checked: true,
      onchange: () => {
        record.itemAnchor.blocking = blocking.checked;
        log.push('anchor-blocking', item.id, { scope: 'item', blocking: blocking.checked });
      } });
    body.append(text, el('label', { class: 'switch' }, blocking, ' this should block approval'));
    return el('section', { class: 'band anchor' }, line, body);
  }

  // -- shared controls ------------------------------------------------------

  // The advance gesture. Enabled by the completing gesture, taken separately.
  function advance(label, onTake) {
    return el('button', { class: 'advance', type: 'button', disabled: true, onclick: onTake },
      `⏎  ${label}`);
  }

  // Confidence + triviality, side by side. Beside, not below: the triviality
  // signal survives about two seconds, and an affordance under the completing
  // gesture is reachable in principle and missed in practice.
  function confidenceRow(item, { onChange }) {
    const record = log.record(item);
    const buttons = ['sure', 'unsure'].map((value) =>
      el('button', { class: 'choice', type: 'button', 'data-value': value,
        onclick: () => {
          record.confidence = value;
          for (const b of buttons) b.classList.toggle('on', b.dataset.value === value);
          log.push('confidence', item.id, { value });
          onChange();
        } }, value));

    const note = el('input', { type: 'text', class: 'triviality-note',
      placeholder: 'why (optional)',
      onchange: () => {
        record.triviality.note = note.value;
        log.push('triviality-note', item.id, { length: note.value.length });
      } });
    const box = el('input', { type: 'checkbox',
      onchange: () => {
        record.triviality.marked = box.checked;
        log.push('triviality', item.id, { marked: box.checked });
      } });

    const row = el('div', { class: 'confidence-row' },
      el('div', { class: 'confidence' },
        el('p', { class: 'ask', text: 'How sure are you?' }),
        el('div', { class: 'choices' }, buttons)),
      // The label is long on purpose. "Too easy" invites the reviewer to
      // report their own expertise. Free text is offered, never gated.
      el('label', { class: 'triviality' }, box,
        el('span', { text: 'A learner could get this without knowing the material.' }), note));

    // Confidence is inert until an option is selected — otherwise the second
    // gesture can be taken without the first, and the production this stage
    // exists to collect is skippable. [settled 2026-09-01]
    row.setEnabled = (on) => {
      for (const b of buttons) b.disabled = !on;
      box.disabled = !on;
      note.disabled = !on;
      row.classList.toggle('inert', !on);
    };
    row.setEnabled(false);
    return row;
  }

  // -- screens --------------------------------------------------------------

  // No time estimate. Nothing goes on this card until Phase 4 measures one.
  // No resume line either: resume is out of scope for Phase 2, which leaves
  // the card's first-run state a state the spec never drew. `begin` is this
  // build deciding, not a spec reporting. shell.md §What the drawing found.
  function entryCard() {
    return el('article', { class: 'card entry' },
      el('p', { text: `Amos asked you to check ${session.length} items for content by Thursday.` }),
      el('button', { class: 'advance', type: 'button', autofocus: true,
        onclick: () => { log.push('session-start', null, {}); enterItem(0); } }, '⏎  begin'));
  }

  function stage1MultipleChoice(item) {
    const record = log.record(item);
    let chosen = null;

    const go = advance('continue', () => {
      log.push('advance', item.id, { from: 'stage-1' });
      const key = session.keyFor(item.id);
      if (key.includes(chosen)) stage2(item);
      else mismatchMultipleChoice(item, chosen, key);
    });

    const confidence = confidenceRow(item, { onChange: check });
    function check() { go.disabled = !(chosen && record.confidence); }

    const labels = [];
    const options = item.options.map((option) => {
      labels.push(option.label);
      const input = el('input', { type: 'radio', name: `blind-${item.id}`,
        onchange: () => {
          chosen = option.label;
          record.blindAnswer = chosen;
          log.push('blind-answer', item.id, { part: `option:${chosen}` });
          confidence.setEnabled(true);
          check();
        } });
      return el('label', { class: 'opt' }, input,
        el('span', { class: 'label', text: option.label }),
        el('span', { class: 'text', text: option.text }));
    });
    session.assertRenderedOrder(item.id, labels);

    return frame(item,
      el('section', { class: 'band item-block' },
        el('p', { class: 'stem', text: item.stem }),
        item.instruction ? el('p', { class: 'instruction', text: item.instruction }) : null,
        el('div', { class: 'options' }, options)),
      el('section', { class: 'band stage' }, confidence,
        el('div', { class: 'advance-row' }, go)));
  }

  // The markings ARE the blind answer: no separate blind stage precedes them
  // and no second pass surveys them, which is why this type has no fork.
  //
  // Each option is marked correct/incorrect EXPLICITLY — claims.md
  // §MultipleSelect: "Mark this option correct / incorrect", n markings. Not a
  // checkbox list, which shell.md's first drawing showed: on a checkbox an
  // untouched box silently asserts "not in the set", supplying an answer the
  // reviewer never gave on the one screen whose whole purpose is an unprimed
  // production — and making the cost marked-count + 4 rather than n + 4.
  // [settled — 2026-09-02]
  //
  // No per-option feedback anchors here — acceptance check 8.
  function stage1MultipleSelect(item) {
    const record = log.record(item);
    const marks = new Map(); // label -> true | false, no default

    const go = advance('continue', () => {
      log.push('advance', item.id, { from: 'marking' });
      const key = new Set(session.keyFor(item.id));
      const contested = item.options.map((o) => o.label)
        .filter((label) => marks.get(label) !== key.has(label));
      if (contested.length) mismatchMultipleSelect(item, contested, key);
      else comparisonMultipleSelect(item, key, {});
    });

    const confidence = confidenceRow(item, { onChange: check });
    const complete = () => marks.size === item.options.length;
    function check() { go.disabled = !(complete() && record.confidence); }

    const labels = [];
    const options = item.options.map((option) => {
      labels.push(option.label);
      const name = `mark-${item.id}-${option.label}`;
      const choice = (value, text) => el('label', { class: 'mark-choice' },
        el('input', { type: 'radio', name,
          onchange: () => {
            marks.set(option.label, value);
            record.blindMarking = Object.fromEntries(marks);
            record.blindAnswer = [...marks].filter(([, v]) => v).map(([l]) => l);
            log.push('blind-mark', item.id,
              { part: `option:${option.label}`, marked: value });
            // Confidence is collected once, after the SET is marked.
            confidence.setEnabled(complete());
            check();
          } }),
        el('span', { text }));
      return el('div', { class: 'opt-marked' },
        el('span', { class: 'label', text: option.label }),
        el('span', { class: 'text', text: option.text }),
        el('span', { class: 'mark-choices' }, choice(true, 'correct'), choice(false, 'incorrect')));
    });
    session.assertRenderedOrder(item.id, labels);

    return frame(item,
      el('section', { class: 'band item-block' },
        el('p', { class: 'stem', text: item.stem }),
        item.instruction ? el('p', { class: 'instruction', text: item.instruction }) : null,
        el('div', { class: 'options' }, options)),
      el('section', { class: 'band stage' }, confidence,
        el('div', { class: 'advance-row' }, go)));
  }

  // A wrong answer does not mean the item is broken; it means the reviewer and
  // the key disagree, and there are three causes. Branch one continues to
  // Stage 2; branches two and three skip part attestation entirely.
  //
  // Options keep their file order — the key and the answer are annotated in
  // place. Moving the two contested options together would re-letter the
  // screen against clause 2 of the presentation contract.
  function mismatchMultipleChoice(item, chosen, key) {
    const record = log.record(item);
    let branch = null;
    record.mismatch = { chosen, key: key[0], branch: null, note: '' };

    const go = advance('continue', () => {
      log.push('advance', item.id, { from: 'mismatch' });
      if (branch === 'mistaken') stage2(item);
      else { record.skippedAttestation = true; endItem(item); }
    });

    const choices = BRANCH_MC(chosen, key[0]).map(([value, text]) =>
      el('label', { class: 'branch' },
        el('input', { type: 'radio', name: `branch-${item.id}`,
          onchange: () => {
            branch = value;
            record.mismatch.branch = branch;
            log.push('mismatch-branch', item.id, { branch, part: `option:${chosen}` });
            go.disabled = false;
          } }),
        el('span', { text })));

    // Offered, never gated. An expensive objection migrates back into the
    // cells as an unexplained non-confirmation — ADR-0010's own rule.
    const note = el('textarea', { rows: 2, placeholder: '… anything you want to add',
      onchange: () => {
        record.mismatch.note = note.value;
        log.push('mismatch-note', item.id, { length: note.value.length });
      } });

    show(frame(item, itemBlock(item, { key, chosen }),
      el('section', { class: 'band stage' },
        el('p', { class: 'ask', text: `You chose ${chosen}. The key is ${key[0]}.` }),
        el('div', { class: 'branches' }, choices),
        note,
        el('div', { class: 'advance-row' }, go))));
  }

  // A set can disagree in more than one place. One branch screen, listing
  // every contested option, with the three-way question asked per option —
  // not one verdict over the whole set, which is the resolution this type was
  // chosen to improve on.
  function mismatchMultipleSelect(item, contested, key) {
    const record = log.record(item);
    const branches = {};
    const marked = new Set(record.blindAnswer ?? []);
    record.mismatch = { contested, branches, note: '' };

    const go = advance('continue', () => {
      log.push('advance', item.id, { from: 'mismatch' });
      comparisonMultipleSelect(item, key, branches);
    });
    const check = () => { go.disabled = contested.some((label) => !branches[label]); };

    const blocks = contested.map((label) => {
      const option = item.options.find((o) => o.label === label);
      const direction = marked.has(label)
        ? 'you marked it correct, the author did not'
        : 'you marked it incorrect, the author did';
      return el('div', { class: 'contested' },
        el('p', { class: 'ask', text: `${label} — ${direction}` }),
        el('p', { class: 'quiet', text: option.text }),
        el('div', { class: 'branches' }, BRANCH_MS.map(([value, text]) =>
          el('label', { class: 'branch' },
            el('input', { type: 'radio', name: `branch-${item.id}-${label}`,
              onchange: () => {
                branches[label] = value;
                log.push('mismatch-branch', item.id, { branch: value, part: `option:${label}` });
                check();
              } }),
            el('span', { text })))));
    });

    const note = el('textarea', { rows: 2, placeholder: '… anything you want to add',
      onchange: () => {
        record.mismatch.note = note.value;
        log.push('mismatch-note', item.id, { length: note.value.length });
      } });

    show(frame(item, itemBlock(item, { options: false }),
      el('section', { class: 'band stage' },
        el('p', { class: 'ask', text: contested.length === 1
          ? 'One option disagrees.' : `${contested.length} options disagree.` }),
        blocks, note, el('div', { class: 'advance-row' }, go))));
  }

  // The comparison step. The option rows carry NO affirmation control — the
  // blind marking already was the affirmation for this type. What appears here
  // is the comparison and the feedback axis, and nothing else. A checkbox on
  // these rows would ask the reviewer to affirm their own marking twice.
  //
  // The stem row is the one required gesture, and it scopes over nothing else
  // on this screen. That is exactly why the advance gesture exists: without it
  // this checkbox would end the item past five untouched anchors.
  function comparisonMultipleSelect(item, key, branches) {
    const record = log.record(item);
    const marked = new Set(record.blindAnswer ?? []);

    const go = advance('next item', () => {
      log.push('advance', item.id, { from: 'comparison' });
      endItem(item);
    });

    const stemBox = el('input', { type: 'checkbox',
      onchange: () => {
        setAffirmed(record, 'stem', stemBox.checked);
        log.push(stemBox.checked ? 'affirm' : 'unaffirm', item.id,
          { part: 'stem', mode: 'perPart' });
        record.claimBlock.mode = 'perPart';
        go.disabled = !stemBox.checked;
      } });

    const rows = item.options.map((option) =>
      el('div', { class: `cmp-row${branches[option.label] ? ' contested' : ''}` },
        el('span', { class: 'label', text: option.label }),
        el('span', { class: 'mark', text: marked.has(option.label) ? '✓' : '·' }),
        el('span', { class: 'mark', text: key.has(option.label) ? '✓' : '·' }),
        el('span', { class: 'text', text: option.text }),
        flagControl(item, `option:${option.label}`)));

    show(frame(item, itemBlock(item, { options: false }),
      el('section', { class: 'band stage claim-block' },
        el('div', { class: 'cmp-row stem-row' }, stemBox,
          el('span', { class: 'claim', text: CLAIM.stem }),
          flagControl(item, 'stem')),
        el('div', { class: 'cmp-head' },
          el('span', { class: 'label' }), el('span', { class: 'mark', text: 'you' }),
          el('span', { class: 'mark', text: 'author' }),
          el('span', {}), el('span', {})),
        rows,
        el('div', { class: 'advance-row' }, go))));
  }

  // The feedback axis: none · non-blocking · blocking. Non-blocking by default
  // on a row — an unaffirmed cell already gates approval, so the switch is not
  // what carries the gate and the row default can be cheap.
  //
  // OPEN: whether a flagged row can be un-flagged, and what the record shows
  // if it is. README.md §1 still lists it. Built as a toggle with both events
  // kept, so the record replays either way whichever answer wins.
  function flagControl(item, part) {
    const record = log.record(item);
    const body = el('div', { class: 'flag-body', hidden: true });
    const button = el('button', { class: 'flag', type: 'button', title: 'say something',
      onclick: () => {
        const opening = body.hidden;
        body.hidden = !opening;
        button.classList.toggle('on', opening);
        log.push(opening ? 'flag' : 'unflag', item.id, { part });
        const flagged = record.claimBlock.flagged;
        if (opening) { if (!flagged.includes(part)) flagged.push(part); }
        else record.claimBlock.flagged = flagged.filter((p) => p !== part);
      } }, '⚑');

    const feedback = () => (record.claimBlock.feedback[part] ??= { text: '', blocking: false });
    const text = el('textarea', { rows: 2, placeholder: 'what is wrong with it',
      onchange: () => {
        feedback().text = text.value;
        log.push('feedback-text', item.id, { part, length: text.value.length });
      } });
    const blocking = el('input', { type: 'checkbox',
      onchange: () => {
        feedback().blocking = blocking.checked;
        log.push('feedback-blocking', item.id, { part, blocking: blocking.checked });
      } });
    body.append(text, el('label', { class: 'switch' }, blocking, ' this should block approval'));
    return el('span', { class: 'flag-cell' }, button, body);
  }

  function setAffirmed(record, part, on) {
    const list = record.claimBlock.affirmed;
    if (on) { if (!list.includes(part)) list.push(part); }
    else record.claimBlock.affirmed = list.filter((p) => p !== part);
  }

  // Band 3 on a MultipleChoice Stage 2 screen is the fork, and the only thing
  // the fork varies. Build order steps 3-5 fill the registry in variants.js.
  function stage2(item) {
    const key = session.keyFor(item.id);
    const record = log.record(item);
    const renderer = claimBlockFor(variant);
    const band = renderer
      ? renderer({ item, key, record, session, log, variant, CLAIM,
                   flagControl, setAffirmed, advance, finish: () => endItem(item) })
      : scaffoldClaimBlock(item);
    show(frame(item, itemBlock(item, { key, chosen: record.blindAnswer }), band));
  }

  // Deliberate scaffolding, labelled as such, so the shell is walkable end to
  // end before the variants exist. It is not a fourth motion and must not
  // acquire behaviour — replace it, do not extend it.
  function scaffoldClaimBlock(item) {
    const step = { A: 3, D: 4, B: 5 }[variant];
    return el('section', { class: 'band stage scaffold' },
      el('p', { class: 'scaffold-note',
        text: `Claim block for variant ${variant} is not built — build order step ${step}. ` +
              'Shell scaffolding, not a fourth motion.' }),
      el('div', { class: 'advance-row' },
        el('button', { class: 'advance', type: 'button',
          onclick: () => {
            log.push('advance', item.id, { from: 'stage-2-scaffold' });
            endItem(item);
          } }, '⏎  next item')));
  }

  // One acknowledgement. Nothing is judged here and there is no recap — same
  // argument as the progress chrome. This is where the record is written out.
  function close() {
    log.push('session-end', null, {});
    show(el('article', { class: 'card close' },
      el('header', { class: 'chrome' },
        el('span', { text: `${session.length} of ${session.length}` }),
        el('span', { class: 'surface-label', text: 'content' })),
      el('p', { text: "That's the assignment. Thank you." }),
      el('button', { class: 'advance', type: 'button', autofocus: true,
        onclick: () => log.download(session.sequence) }, '⏎  download the record')));
  }

  // -- frame and flow -------------------------------------------------------

  // Three bands, in this order, on every item screen at every stage. Band 2's
  // position is the whole reason it is drawn in the shell rather than inside a
  // variant: the claim block is what differs, so anything anchored to it
  // inherits the variant's shape. The item block does not.
  function frame(item, itemBand, stageBand) {
    return el('article', { class: 'card item' },
      chrome(item), itemBand, itemAnchor(item), stageBand);
  }

  function enterItem(i) {
    index = i;
    const item = session.at(i);
    const record = log.record(item);
    record.enteredAt = Math.round(performance.now() - log.t0);
    log.push('item-start', item.id, { position: item.position, type: item.coquiType });
    show(item.coquiType === 'MultipleSelect'
      ? stage1MultipleSelect(item)
      : stage1MultipleChoice(item));
  }

  function endItem(item) {
    const record = log.record(item);
    record.leftAt = Math.round(performance.now() - log.t0);
    log.push('item-end', item.id, {});
    if (index + 1 < session.length) enterItem(index + 1);
    else close();
  }

  show(entryCard());

  // Exposed for the acceptance-check harness, not for the reviewer surface.
  return { get index() { return index; }, session, log };
}
