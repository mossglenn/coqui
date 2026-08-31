# CoQui documentation

**Start here.** This page is a map, not a summary — it tells you which file answers which
question, so you don't have to guess from filenames.

New to the project? Read [`design/design-premise.md`](design/design-premise.md) first. It decides
how everything else gets used.

---

## If you want to know…

| Question | Read |
|---|---|
| Why is CoQui built this way? What are the rules of the exercise? | [`design/design-premise.md`](design/design-premise.md) |
| Who does what, in what order? What must be true before approval? | [`design/process-model.md`](design/process-model.md) |
| What does a reviewer actually see and do, screen by screen? | [`design/review-experience.md`](design/review-experience.md) |
| **Exactly what claim does each reviewer judge, for each item type?** | [`design/claims.md`](design/claims.md) |
| What does one item's review cost, in gestures? | [`design/claims.md`](design/claims.md) — §Interaction cost |
| Does focus walk part to part, or is the whole item surveyed? | [`design/review-motion-fork.md`](design/review-motion-fork.md) |
| What can a reviewer raise that isn't a claim? | [`design/claims.md`](design/claims.md) — §Affirmable claims and objections |
| Where does durable design rationale come from? | [`design/rationale-capture.md`](design/rationale-capture.md) |
| Which state is CoQui's, which is Armature's, and what crosses? | [`architecture.md`](architecture.md) |
| When does data cross to Armature, and what triggers it? | [`architecture.md`](architecture.md) — §Mapping to Armature |
| How does the first surface get built and tested? | [`design/content-accuracy-validation-plan.md`](design/content-accuracy-validation-plan.md) |
| What would tell us the model is wrong? | [`design/content-accuracy-validation-plan.md`](design/content-accuracy-validation-plan.md) — Phase 7 |
| What's still undecided, anywhere? | [`open-questions.md`](open-questions.md) |
| Why was *this* decided? | [`adr/`](adr/) — and [`adr/README.md`](adr/README.md) for the index |
| Why does the design say X rather than Y? | [`journal/`](journal/) |
| What would a second Armature plugin reuse? | [`toolkit-candidates.md`](toolkit-candidates.md) |
| What is Armature, and what does it already provide? | [`armature-orientation.md`](armature-orientation.md) |
| Where does a real app strain the infrastructure? | [`fit-analysis/`](fit-analysis/) |

---

## The four kinds of document here

Knowing which kind you are reading is most of knowing how much to trust it.

| | What it is | Tense | Changes when |
|---|---|---|---|
| **Frame** — `design/design-premise.md` | Why the project works the way it does | Present | Almost never |
| **Spec** — `design/*`, `architecture.md` | What the thing is | **Present only** | A decision changes it |
| **Decisions** — `adr/` | A choice, at the moment it was taken | Past | Never. Superseded by a later ADR |
| **Journal** — `journal/`, `fit-analysis/` | How we got here, and what we stopped believing | Past | Append only |

**Specs carry current truth. The journal carries superseded reasoning.** If a spec and a journal
entry disagree, the spec is right — that is what the journal is *for*. If a spec and an ADR
disagree, the spec is right and the ADR is history; see [`adr/README.md`](adr/README.md).

**Read the journal when you are about to change something**, not when you are trying to find out
what it currently is.

---

## Canonical sources

Several facts appear in more than one document. Exactly one is the owner; the rest link to it.
**Change the owner, then propagate** — and record the propagation in the journal.

| Fact | Owned by |
|---|---|
| The coverage grid, and every claim sentence | `design/claims.md` |
| The gesture inventory | `design/claims.md` |
| The affirmable/objection distinction | `design/claims.md` (decision: ADR-0010) |
| The eligibility predicate | `design/process-model.md` (decision: ADR-0008) |
| Roles and their expertise | `design/process-model.md` (decision: ADR-0006) |
| What crosses to Armature, and when | `architecture.md` |
| The blind-review principle | `design/review-experience.md` |
| The review-motion variants, and what each costs | `design/review-motion-fork.md` |

`design/coverage-grid.svg` is a **rendering** of the grid, not a second source. It has to be
regenerated when the grid changes.

---

## Status markers

**[settled]** — decided; change it through the propagation path above.
**[proposed]** — a recommendation, still open.
**[deferred]** — deliberately unanswered, usually pending a measurement.

Every one of them is aggregated in [`open-questions.md`](open-questions.md), which is generated —
run `python3 scripts/generate-open-questions.py` from the repo root rather than editing it.

---

## Layout

```
docs/
  README.md              this map
  open-questions.md      everything still open (generated)
  architecture.md        the CoQui / Armature boundary
  armature-orientation.md   reference notes on the dependency
  toolkit-candidates.md  what might generalise to a second plugin
  design/                the specifications
  adr/                   decisions, immutable
  fit-analysis/          Track B — where the app strains the infrastructure
  journal/               working records and superseded reasoning
```
