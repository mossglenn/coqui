# Armature Toolkit — Candidates and Discipline

> **Answers:** *What has CoQui produced that a second Armature plugin could reuse — and what is
> not ready to extract yet?* A running backlog, not a specification.

The Armature project names a toolkit as a co-equal goal: standardising functions and processes that make it easier to build other tools on Armature. This is CoQui's running view of what might qualify.

---

## What a toolkit is for

**Reducing the cost of building the second plugin.** That is the only test. Anything that does not measurably lower that cost is not toolkit material, however tidy.

This implies a sequencing discipline that is easy to violate:

> **One instance is not a pattern.** Extracting from CoQui alone produces a CoQui-shaped toolkit that fits nothing else — the plugin-specific idiosyncrasies get baked in as if they were general, and the second plugin has to fight them.

So the toolkit goal is served now by **building CoQui cleanly enough that extraction is possible later**, not by extracting early. Keep the seams visible; do not cut along them yet.

The exception is anything already proven general because it exists *inside Armature* and would be needed by any plugin.

---

## Ready now — general by construction

**Generated types.** `scripts/generate-types.js` derives TypeScript interfaces from `schema.json` — xsd primitives, Optional/Set/List handling, enum `VALID_*` arrays as runtime source of truth. Any TypeScript plugin needs exactly this. Today it lives in the Armature repo and emits into the demo app.

**Schema self-description.** Armature ADR-0017 moves the artifact/relationship taxonomy from `JUNCTION_IDS` — a hand-maintained constant in a build script — into `@metadata` on each class. Once the schema declares its own categories, any tool reads them instead of reconstructing the list. **The single highest-leverage toolkit change identified so far**, because it turns tacit knowledge into machine-readable declaration.

*Gated on verification:* if `@metadata` does not survive schema load and come back through the document API, this collapses.

**A typed API client.** Generated from the same `schema.json`, so hub and plugin cannot drift. Would also force the API boundary to be real — Armature's API spec currently claims store internals are not exposed while its own examples pass TerminusDB IDs in both directions.

**Junction read/write helpers.** Every plugin touching a relationship writes the same traversal: fetch junctions filtered by one endpoint, join the other side. The pattern is stable because ADR-0003 and ADR-0004 fix its shape.

**Error mapping.** Armature's `handleTerminusError` maps TerminusDB error types to HTTP responses. Store-specific, which is precisely why it belongs behind a boundary rather than in each plugin.

---

## Ready after a second plugin — patterns, not code

### Prompted rationale

> **Prompted rationale: declared by the author, typed with an open vocabulary, anchored to a
> part, and contested during review by whoever has standing to contest that claim.**

Instantiated per decision site with a different vocabulary — distractor purpose, stem framing, cognitive-level choice.

**The routing clause is not decoration.** A prompt contested by someone without the standing to
contest it produces confident noise, which is worse for the corpus than silence. Any plugin
instantiating this pattern has to decide *who* judges each declared claim — which makes a role
model, not just a vocabulary, part of what transfers.

**Refined by the `claims.md` review:** the routing clause has a third state. A claim may
be one that *nobody* has standing to confirm, only to contest — "learners hold this misconception"
is the worked example. Any instantiation needs to distinguish *confirmed by role X* from
*contestable by role X but never affirmed*, or it will manufacture attestations at exactly the
sites where the underlying knowledge is weakest.

### Affirmable claims and objections

> **A structured review surface holds only what a reviewer can be asked to affirm. Everything else
> belongs to an unbounded objection channel that blocks when raised and costs nothing when not.**

See ADR-0010. The general shape is a test any review tool can apply: *would a competent reviewer
confirm this, and is their confirming it evidence?* If the second half fails, the judgment is not a
cell.

Three properties travel with it: completeness is the channel's job rather than the grid's; an
unused channel must cost nothing, or objections migrate back into the grid as unexplained
non-confirmations; and an **unlocalised** objection — no category, no diagnosis — must be fileable,
because it is the signal expert reviewers most often have and current tools most reliably lose.

**Scaffolding without a checklist** comes with it. Prompts carry no state, are never presented as
exhaustive, and are role-scoped. Openness is not neutrality: a channel with no guidance
under-reports from exactly the reviewers with the most to say.

### Withhold the marking, then collect

> **Collect the reviewer's judgment before showing the author's marking.** Break it only when the
> claim cannot be written without naming the author's answer.

A mechanical check any review tool can run against its own claim wording: if a claim sentence says
*"as marked"* or *"correctly marked as,"* it is revealing an answer, and the judgment it collects is
worth less than it appears. The violation hides in copy, not in process design, which is why it
survives review of the process.

**The affordable form:** the blind judgment need not have the same shape as the claim it precedes.
Where collecting the claim itself blind would be too costly or too unreliable, a cheap *proxy*
judgment satisfies the default — a binary standing in for a six-way classification. Without this,
the principle is aspirational; with it, it is affordable almost everywhere.

### The presentation contract — a whitelist plus an ordering rule

> **What a reviewer may see, and in what order, is a property of the presentation — declared as
> data, asserted by the fixture, and never inferred from the item record.**

Two clauses, and the second is the one nobody writes until it bites. The whitelist is familiar: a
renderer may show these fields and no others, so a field added later is withheld by default rather
than leaking because nobody updated a list of exclusions. The ordering rule is the other half — a
renderer presents options in the order it is given them and does not re-sort or re-letter.

**What generalises is the failure it prevents.** A set of items cues in ways no item does. CoQui's
source banks never put the key last — ten of ten — and a reviewer who notices narrows every item
without reading it. Any tool that assembles a *set* of assessment items for judgment inherits this
class of problem, and the instinct to fix it by editing the items is the wrong one: it costs
provenance for a fix that generalises to nothing.

**Two pieces are reusable as shapes:**

- **Identity separated from display.** A `sourceLabel` that never reaches the screen and a display
  label that is a property of one build. Every ground-truth or grading rule names identity. CoQui
  learned this the expensive way — three of four pre-registered defect records named options
  positionally and had to be rewritten.
- **`optionOrder: meaningful | arbitrary`.** A per-item declaration that an option set carries a
  real order — a sequence, a chronology, a numeric range, an above-style option — and must not be
  permuted. Any item bank needs this the moment anything downstream reorders, and no published bank
  carries it. Cheap to declare, and the absence is silent.

**Not ready to extract.** One instance, one corpus, one review flow. What is worth carrying forward
now is the discipline: when a set-level property contaminates a measurement, change the
presentation, not the artifact.

### Gesture inventories over time budgets

> **No new required gesture without naming what it buys.**

Interaction cost counted as a gesture inventory — each gesture classed *recognition*, *production*
(scaling with the answer space) or *composition* — rather than in seconds. A gesture count is
derivable from a specification and goes stale visibly when the specification changes; a time
estimate is a property of a person nobody has watched and goes stale silently. CoQui found this the
hard way: a table marked **[settled]** was wrong in three of six rows inside one review pass.

The companion rule, for whatever timing data eventually arrives: **a measure can be useful for
comparison while being useless for adjudication.** Ranking does not need a scale; grading does.
Pre-register direction and comparison; never magnitude.

### Signals whose unit of capture differs from their unit of interpretation

Captured per item, meaningful only in aggregate, and deliberately suppressed in between. CoQui's
worked case is triviality: one reviewer calling an item trivial is mostly a fact about the
reviewer, while the rate across a bank is a fact about the bank. Any tool collecting expert
judgment will have signals of this shape, and rendering them at the wrong level is how a noisy
instance becomes a decision.

**Why this is the most transferable thing the project has produced:** it is the mechanism by which any plugin feeds Armature's progressive formalization. Armature assumes usage patterns will appear in the graph and reveal what structure is warranted — but usage only forms patterns if a tool shaped it enough to have any. An open text box yields a corpus with no denominator; a prompt with a truthful null yields a dataset.

**Which means the hub's ability to evolve depends on plugin interface design** — and that makes prompting a toolkit responsibility, not an application detail.

### The role model

Four roles — author, craft reviewer, content reviewer, stakeholder — with review and approval as
separate acts, and "done" as a predicate over a coverage grid rather than a position in a
pipeline. Arguably general to *any* tool where an artifact is made by one kind of expert and
validated by another.

**One instance is not a pattern**, and this one is a week old and untested. But the observation
that produced it — *every recurring design error was a role error* — is the sort of thing that
transfers even when the specific roles do not. Watch it against a second plugin before extracting
anything.

### The local/durable split

`architecture.md` divides state between plugin-local exhaust and hub-durable outcomes. Much of what is CoQui-local — assignments, threads, resolution states, attestations — is arguably general to *any* review tool.

Whether that split is a CoQui shape or a review-tool shape cannot be known from one instance. It is the clearest thing to watch when a second plugin appears.

### Triage discipline

Not code, but the most reusable output of the exercise:

> An **Armature gap** must cite either an **Armature-internal symptom** or a **user-stated requirement**. "My plugin needs it" makes it a plugin concern until proven otherwise.

Fit Analysis 01 found nine gaps where three stood. Any plugin author proposing schema changes should apply this before opening an ADR — it is the difference between a hub that accumulates one application's idiosyncrasies and one that stays infrastructure.

---

## Not toolkit material

- **CoQui's review model** — review types, severity, the assignment envelope. Another tool will bring different dimensions
- **UI components** — keyboard interaction, diff rendering, queue design. A design-system question, not an infrastructure one
- **Workflow states** beyond Armature's minimal vocabulary

---

## Open

- **Where does the toolkit live?** Separate repo, monorepo package, or inside Armature? Interacts with the unsettled question of whether the Armature API is a separate service
- **Does the toolkit assume TerminusDB?** Error mapping does; generated types mostly do not; the client need not. Worth keeping the layers separate so a store change costs one package rather than all of them
- **What triggers extraction?** "When a second plugin exists" is the principle, but nothing says how much duplication justifies moving a given piece
