# Rationale Capture — Granularity and Prompting

**Boundary artifact.** This one deliberately spans both tracks: it concerns CoQui's authoring interface *and* Armature's structure, because the central finding is that the two are coupled.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## Part 1 — Granularity

### The question, framed correctly

Armature preserves *"design rationale **in** the relationships."* Relationships are the carrier; rationale is the cargo. So granularity is not set by what relationships are structurally possible — it is set by **where design decisions actually get made.**

### Where decisions live in an assessment item

| Site | Decision | Rationale density |
|---|---|---|
| Item ↔ objective | Is this the right way to measure this, at this level? | High |
| Stem | Scenario vs. abstract, reading level, novelty of context | High |
| Individual distractor | *Why does this option exist?* | **Highest** |
| Option set as a whole | Why four? Why this spread? | Moderate |

The distractor is densest because its purpose is invisible from its text. A distractor written to catch a documented misconception looks identical to a lazy one — which makes it the artifact most likely to be "fixed" by someone who doesn't know why it's there.

### One note or several? Neither — as many as the reasoning covers

The case against mechanical splitting:

> *"I framed the stem as a clinical scenario and made option B the common charting error, so a student who memorised the protocol without understanding it picks B."*

That is **one decision spanning stem and distractor.** Split it and each half is incomprehensible. Some rationale is inherently about a *configuration*, not a component.

So the rule is: a note attaches to every part its reasoning covers. Armature's note-subject field is already a set, which supports exactly this.

**The gap was addressability, not cardinality** — of the four decision sites, only the distractor was a document that could be pointed at. Armature ADR-0017 addresses the general case.

### Principle: reify relationships, not components

> Reify relationships. Do not reify components — **unless they are plural and data-bearing.**

This explains why an answer option is already a document (many per item, carries correctness and feedback) and why a stem document would be awkward (singular, just text).

**Consequence:** once options are separately anchorable, an item-level note is unambiguously "about the item, including its stem."

---

## Part 2 — Why have a schema at all?

If Armature should be flexible enough to capture any relationship anyone wants, why create schema structure at all? Four answers:

**1. A schema is a claim about what matters.** It asserts that *these* distinctions are worth making. That is editorial, and it is Armature's actual intellectual contribution. A free-triple store says "model whatever you like" — making no claim and teaching nothing.

**2. Guarantees enable tools.** Plugins can only be built against invariants. The hub-plugin architecture depends entirely on plugins relying on structure they did not define.

**3. Queryability requires commitment.** *"Find items whose Bloom's level does not match their objective's"* is answerable only because the schema commits to those fields on those types.

**4. Absence becomes meaningful.** The strongest argument. *"This objective has no assessment coverage"* is a well-formed finding only because the schema defines what coverage would look like. **You can only detect a gap in a structure you have defined.**

**So the question is not flexibility vs. structure — it is what earns a place in the schema.** Structure is earned by evidence, not anticipated.

---

## Part 3 — Corpus vs. dataset

### Design notes are maintenance infrastructure, not research infrastructure

Why free-text notes resist research:

- **No denominator.** Forty notes about Bloom's level means nothing without knowing whether that is out of 50 items or 5,000
- **Selection bias.** Absence of a note ≠ absence of a decision. You can only conclude "designers rarely *wrote about* X"
- **Coding cost.** Qualitative analysis means the researcher does the work and imports their own frame

**Design notes are a corpus, not a dataset.** A category field gives filtering, not measurement.

### A flaw in progressive formalization as applied to free-text notes

Armature's stance assumes patterns in the graph will reveal what structure is warranted. But if notes are written sporadically, **the observable pattern is a pattern in note-writing behaviour, not in design behaviour.** Formalizing on that signal would encode the habits of people who bothered to write things down.

This does not apply to structured types — every alignment has a record whether or not anyone felt chatty.

### The inversion

| Consumer | Uses | Because |
|---|---|---|
| Researchers | the **structure** | Complete, comparable, denominated |
| Future designers | the **notes** | They have a specific question and need a specific answer in prose |

Not a demotion. Course revision is constant real activity; design-process research is aspirational. Maintenance is arguably the more valuable job today.

**And it settles granularity, because retrieval is contextual.** A note about distractor C must surface when someone touches distractor C. An item-level note is a wall of prose they will skim past.

**Corollary:** anchoring is what makes rationale stale-detectable. A note anchored to distractor C becomes suspect when C is rewritten; an item-level note on an item edited forty times over five years is unfalsifiable sludge. **Rationale that cannot go stale cannot be trusted** — free-floating notes rot silently, anchored notes rot visibly.

---

## Part 4 — Prompted formalization

### The central finding

**Progressive formalization works when the note is prompted, and fails when it is unprompted.**

An open text box produces a corpus with no denominator. A prompt — *"what does this distractor diagnose?"* — produces a denominator, because you know how many distractors were considered and how many got an answer. Absence becomes meaningful again.

**Therefore: Armature's ability to evolve depends on CoQui's interface design.** The hub cannot formalize from unprompted notes; it can formalize from prompted ones. And prompting is entirely a plugin concern.

This is not visible from inside the framework. Armature assumes usage patterns will appear in the graph, but usage only forms patterns if a tool shaped it enough to have any.

### There is no single prompt

**Diagnostic — selection means something about the learner** (proto-relational; these would become edges):

| Type | Meaning |
|---|---|
| Common misconception | A documented wrong mental model |
| Prerequisite gap | An earlier objective was not mastered |
| Procedural error | Sign flip, wrong order, wrong formula. Concept understood, execution failed |
| Partial understanding | Right principle, stopped early or missed the edge case |
| Surface-plausible | Matches keywords or textbook phrasing; catches pattern-matching |
| Outdated knowledge | Correct under the old protocol, policy, or version |

**Structural — nothing to do with the learner** (proto-attributive; these would become an enum):

| Type | Meaning |
|---|---|
| Difficulty tuning | Exists to spread scores. Psychometric, honest, rarely admitted |
| Filler | Needed a fourth option |
| Domain sampling | A related concept, to check the learner can distinguish them |

The two families predict where structure will eventually be earned, and they want different structures.

### Prompt design

**One question with a typed answer** — an optional open vocabulary alongside free text. This is precisely the migration path Armature describes for formalizing a text field, run inside the plugin so the hub can watch it happen before committing.

**A truthful null is mandatory.** The vocabulary must include an explicit *"no diagnostic purpose."* If every available answer is a virtuous one, every designer picks a virtuous one and the corpus is poisoned.

**The friction you want is cognitive, not mechanical.** Thirty-six choices per assignment is ~70 seconds with a keyboard dropdown. If choosing a type is instant, nobody is thinking. Make the mechanics fast; the thinking time is what you are buying.

**[proposed] Required at approval, not at authoring.** Draft freely; nothing enters the bank without a deliberate statement on every distractor. Complete denominator over approved items, fast authoring, and the reflection lands when the designer is already defending choices.

### Review interaction **[settled]**

**The reviewer sees the stated intent before judging.** The authoring vocabulary and the review
surface share terms, so review becomes a direct test of the stated claim.

Self-report is weak evidence; **contested self-report is strong.**

### The two families route to two different reviewers **[settled — ADR-0009]**

A declared purpose makes up to two separable claims, and they need different expertise:

| Claim | Kind | Reviewed by |
|---|---|---|
| "This text would catch someone reasoning this way" | Design | **Craft review** |
| "Learners actually reason this way" | Empirical, about the domain | **Content review** |

Which purposes have a content half at all is already predicted by the split above:
**diagnostic** types all make empirical claims about learners, so a domain expert can contest
them; **structural** types make none, so there is nothing for a domain expert to contest.

That the two families predicted their own routing rule is evidence they were carved correctly.
It also keeps the cost down — most items will not carry four diagnostic distractors.

**Refined blind-review principle:** hide what the reviewer can supply themselves; show what they would only be guessing at. Hiding the key works because a learner-like reading is what you want from any competent reader. Hiding a distractor's purpose would ask the SME to reverse-engineer assessment design intent, which is not their expertise.

---

## The reusable pattern

The same problem recurs at every decision site — *why this stem framing? why this item for this objective? why this Bloom's level?*

> **Prompted rationale: declared by the author, typed with an open vocabulary, anchored to a
> part, and contested during review by whoever has standing to contest that claim.**

Instantiated with a different vocabulary per site. The routing clause is not decoration — a
prompt contested by someone without the standing to contest it produces confident noise, which
is worse for the corpus than silence. This belongs in the **Armature Toolkit**, not in CoQui —
it is the mechanism by which any plugin feeds the hub's progressive formalization. See
`../toolkit-candidates.md`.

---

## Open items

- **Required at approval** is proposed, not settled
- What recurrence rate justifies promoting a vocabulary term to real schema structure? "Evidence first" is agreed; the trigger is not defined
- The "no diagnostic purpose" answer may need its own honesty check — a filler rate above some threshold is itself an item-quality signal
- Does the option-set-as-a-whole decision site need an anchor, or is item-level sufficient?
