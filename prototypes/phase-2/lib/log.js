// Phase 2 — the event log and the exported record.
//
// README.md §Instrumentation. Three facts are stored separately — `mode`,
// `bulkAtRow`, `flaggedBeforeBulk` — and everything is timestamped, because
// Phase 4 needs time-per-part and a millisecond stamp costs nothing now.
//
// No backend, no localStorage: a session that cannot be re-run from its own
// record is not instrumented.

export class EventLog {
  constructor(variant, meta) {
    this.variant = variant;
    this.meta = meta;
    this.startedAt = new Date().toISOString();
    this.t0 = performance.now();
    this.events = [];
    this.records = new Map();
  }

  // {"t": 18432, "item": "eir-004", "variant": "A", "type": "confirm",
  //  "part": "option:C", "mode": "perPart"}
  push(type, item, fields = {}) {
    const event = {
      t: Math.round(performance.now() - this.t0),
      item: item ?? null,
      variant: this.variant,
      type,
      ...fields
    };
    this.events.push(event);
    return event;
  }

  // One record per item in ordering.sequence — acceptance check 10.
  record(item) {
    if (!this.records.has(item.id)) {
      this.records.set(item.id, {
        id: item.id,
        position: item.position,
        coquiType: item.coquiType,
        variant: this.variant,
        blindAnswer: null,   // MultipleChoice: a label. MultipleSelect: the labels marked correct
        blindMarking: null,  // MultipleSelect only: every option's explicit correct/incorrect
        confidence: null,
        triviality: { marked: false, note: '' },
        mismatch: null,
        itemAnchor: { opened: false, text: '', blocking: true },
        // The three instrumentation facts, stored separately and always
        // present so a per-part session is distinguishable from a missing one.
        claimBlock: {
          mode: null,
          bulkAtRow: null,
          flaggedBeforeBulk: null,
          affirmed: [],
          flagged: [],
          feedback: {}
        },
        skippedAttestation: false,
        enteredAt: null,
        leftAt: null
      });
    }
    return this.records.get(item.id);
  }

  export(sequence) {
    return {
      phase: 2,
      variant: this.variant,
      corpus: this.meta,
      startedAt: this.startedAt,
      endedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - this.t0),
      records: sequence.map((id) => this.records.get(id) ?? { id, missing: true }),
      events: this.events
    };
  }

  filename() {
    return `phase2-${this.variant}-${this.startedAt.replace(/[:.]/g, '-')}.json`;
  }

  download(sequence) {
    const blob = new Blob([JSON.stringify(this.export(sequence), null, 2)],
      { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.filename();
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
