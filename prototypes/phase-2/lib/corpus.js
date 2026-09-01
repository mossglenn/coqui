// Phase 2 — fixture loader and the presentation-contract assertion.
//
// Build order step 1 (prototypes/phase-2/README.md §Build order). Everything
// downstream renders through this module.
//
// Two jobs, and the second is why this file is ten lines longer than a fetch:
//
//   1. Project every item through `presentationContract.blindProjection` and
//      discard the rest. Ground truth never enters the render path.
//   2. Assert the projection. Left ON in the shipped prototype, not gated
//      behind a dev flag — README.md §Data contract, "The assertion, and why
//      it is not a comment".
//
// The whitelist is read from the corpus file, not hardcoded here. The contract
// is stated as data precisely so a fixture can assert against it; a second copy
// in JS is a second thing to forget to update.

const DEFAULT_CORPUS_URL = '../../corpus/session-corpus.json';

export class ContractViolation extends Error {
  constructor(message) {
    super(message);
    this.name = 'ContractViolation';
  }
}

// ---------------------------------------------------------------------------
// Projection
// ---------------------------------------------------------------------------

// `content` is a container in the file; the contract names its members
// (stem, instruction, options) at the item level. Flatten, then whitelist.
function flatten(rawItem) {
  const { content = {}, ...rest } = rawItem;
  return { ...rest, ...content };
}

// A whitelist, applied by construction: fields are copied IN, never deleted
// OUT. A field added to the corpus later is withheld because nobody has to
// remember to exclude it.
function pick(source, allowed) {
  const out = {};
  for (const field of allowed) {
    if (field in source) out[field] = source[field];
  }
  return out;
}

function projectItem(rawItem, contract) {
  const flat = flatten(rawItem);
  const item = pick(flat, contract.item);
  const rawOptions = Array.isArray(flat.options) ? flat.options : [];
  item.options = rawOptions.map((o) => Object.freeze(pick(o, contract.option)));
  Object.freeze(item.options);
  return Object.freeze(item);
}

// ---------------------------------------------------------------------------
// The assertion
// ---------------------------------------------------------------------------

// Throws if a projected object carries any field not on the whitelist.
function assertNoExtraFields(item, contract) {
  const itemAllowed = new Set([...contract.item, 'options']);
  for (const field of Object.keys(item)) {
    if (!itemAllowed.has(field)) {
      throw new ContractViolation(
        `${item.id}: projected item carries "${field}", which is not on blindProjection.item`
      );
    }
  }
  const optionAllowed = new Set(contract.option);
  for (const option of item.options) {
    for (const field of Object.keys(option)) {
      if (!optionAllowed.has(field)) {
        throw new ContractViolation(
          `${item.id}: projected option "${option.label}" carries "${field}", ` +
            `which is not on blindProjection.option`
        );
      }
    }
  }
}

// Throws if options.map(o => o.label) is not the sequence the file gave.
// No sort, no re-letter — README.md §Data contract, Order.
function assertLabelSequence(item, fileLabels) {
  const projected = item.options.map((o) => o.label);
  if (projected.length !== fileLabels.length ||
      projected.some((label, i) => label !== fileLabels[i])) {
    throw new ContractViolation(
      `${item.id}: option order is [${projected.join(', ')}], ` +
        `the file gives [${fileLabels.join(', ')}]`
    );
  }
}

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

export class Session {
  // `keys` and `order` are closure-held, not properties on the projected
  // items. A render path that spreads an item cannot reach them by accident.
  constructor({ items, order, keys, sequence, contract, meta }) {
    this.contract = Object.freeze(contract);
    this.meta = Object.freeze(meta);
    this.sequence = Object.freeze(sequence);
    Object.defineProperty(this, '_items', { value: items, enumerable: false });
    Object.defineProperty(this, '_order', { value: order, enumerable: false });
    Object.defineProperty(this, '_keys', { value: keys, enumerable: false });
  }

  get length() {
    return this.sequence.length;
  }

  // Blind projection. This is what a renderer gets.
  item(id) {
    const item = this._items.get(id);
    if (!item) throw new ContractViolation(`no item "${id}" in the session corpus`);
    return item;
  }

  // Session order, not file order — ordering.sequence.
  at(index) {
    return this.item(this.sequence[index]);
  }

  items() {
    return this.sequence.map((id) => this.item(id));
  }

  // Stage 2 reveals the key and ONLY the key — review-experience.md §Stage 2.
  // Returns display labels. Feedback is never revealed at any stage: on a
  // defective item it explains the published marking, so rendering it leaks
  // the answer and exposes the plant.
  keyFor(id) {
    if (!this._keys.has(id)) throw new ContractViolation(`no item "${id}" in the session corpus`);
    return this._keys.get(id);
  }

  // For acceptance check 3, and for any render path that wants to prove it
  // did not re-sort: hand back the labels as actually rendered.
  assertRenderedOrder(id, renderedLabels) {
    const expected = this._order.get(id);
    if (!expected) throw new ContractViolation(`no item "${id}" in the session corpus`);
    if (renderedLabels.length !== expected.length ||
        renderedLabels.some((label, i) => label !== expected[i])) {
      throw new ContractViolation(
        `${id}: rendered order [${renderedLabels.join(', ')}] ` +
          `does not match the file's [${expected.join(', ')}]`
      );
    }
    return true;
  }
}

export function buildSession(raw) {
  const contract = raw?.presentationContract?.blindProjection;
  if (!contract || !Array.isArray(contract.item) || !Array.isArray(contract.option)) {
    throw new ContractViolation(
      'corpus has no presentationContract.blindProjection — refusing to render without a contract'
    );
  }

  const sequence = raw?.ordering?.sequence;
  if (!Array.isArray(sequence) || sequence.length === 0) {
    throw new ContractViolation('corpus has no ordering.sequence');
  }

  const items = new Map();
  const order = new Map();
  const keys = new Map();

  for (const rawItem of raw.items) {
    const fileOptions = rawItem?.content?.options ?? [];
    const item = projectItem(rawItem, contract);

    assertNoExtraFields(item, contract);
    assertLabelSequence(item, fileOptions.map((o) => o.label));

    items.set(item.id, item);
    order.set(item.id, Object.freeze(fileOptions.map((o) => o.label)));
    keys.set(
      item.id,
      Object.freeze(fileOptions.filter((o) => o.isCorrect === true).map((o) => o.label))
    );
  }

  for (const id of sequence) {
    if (!items.has(id)) {
      throw new ContractViolation(`ordering.sequence names "${id}", which is not in items`);
    }
  }

  return new Session({
    items,
    order,
    keys,
    sequence,
    contract,
    meta: {
      corpus: raw.corpus,
      generated: raw.generated,
      variant: raw.variant,
      itemCount: raw.itemCount,
      orderSeed: raw.orderSeed
    }
  });
}

export async function loadSession(url = DEFAULT_CORPUS_URL) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new ContractViolation(`could not fetch ${url} — ${response.status} ${response.statusText}`);
  }
  // Everything not projected below goes out of scope here and is never held:
  // isCorrect (beyond the key labels), incorrectFeedback, sourceLabel,
  // optionPermutation, defect, condition, knownCraftDefect, sourceRef.
  return buildSession(await response.json());
}

// Session-level parameter — README.md §Settled for the build, Shape.
export function variantFromLocation(search = window.location.search) {
  const value = (new URLSearchParams(search).get('variant') || 'A').toUpperCase();
  if (!['A', 'B', 'D'].includes(value)) {
    throw new ContractViolation(`unknown variant "${value}" — expected A, B or D`);
  }
  return value;
}
