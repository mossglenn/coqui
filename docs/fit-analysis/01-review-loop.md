# Fit Analysis 01 — The Review Loop

> ## ⚠ Revised five times. Read this first.
>
> Following Armature's ADR convention, this document is not rewritten to hide its errors — original reasoning is preserved with inline amendment notes. **The correction pattern is itself a result.**
>
> **Rev 1** — F4, F5 and a proposed claims layer imported CoQui's *operational* needs into the hub (attestation grids, thread state, per-part staleness).
>
> **Rev 2** — A hub-side `Verification` type withdrawn entirely; it originated in the Track A alignment lens, not in any stated requirement.
>
> **Rev 3** — F3 **withdrawn**, F2 **dissolved**. Both rested on evidence removed by revisions 1 and 2. Armature ADR-0003 was correct, and correct for the reasons it gave.
>
> **Rev 4** — F6 **reshaped and upgraded**: not a missing field but a spurious key. F16 added.
>
> **Rev 5** — Six Armature ADRs drafted (0016–0021). F16 **deferred by decision**, recorded in Armature ADR-0010.
>
> Each correction came from direct challenge, not self-review.

Takes the Track A design as a fixed input and asks what Armature would have to do to support it. Assessed against Armature at commit `fb61af8`.

---

## Where it stands now

| # | Finding | Status |
|---|---|---|
| F1 | Review state lives on the placement, not the artifact | **Armature ADR-0018 drafted** |
| F6 | `Response` carries a spurious Hash key; option text has no home | **Armature ADR-0016 drafted** |
| F7 | Coverage semantics ignore item readiness | **Armature ADR-0019 drafted** |
| — | Design notes cannot reach six of seven relationship types | **Armature ADR-0017 drafted** |
| — | No way to record that an artifact may be *wrong* | **Armature ADR-0020 drafted** |
| — | Attributed activity data enables practitioner surveillance | **Armature ADR-0021 accepted** |
| F9 | API is create-and-read only, unfiltered, and leaks store IDs | **Open — no ADR; the API spec needs its own revision** |
| F8 | Identity designed but unimplemented | Open — real, cheap, not blocking |
| F16 | Eight item formats declared; four representable | **Deferred by decision — Armature ADR-0010** |
| F2 | Part addressability | Dissolved — rev 3 |
| F3 | Objective mapping as a bare Set | Withdrawn — rev 3 |
| F4 | No per-part versioning | Withdrawn — rev 1 |
| F5 | No representation of review discourse | Narrowed — rev 1 |
| F10–F12 | Envelope, lens modes, in-flight state | Plugin concern |
| F13–F15 | Item reuse, cross-item threads, parked items | CoQui adapts |

**Two open items remain.** Everything else is drafted, deferred by decision, or withdrawn.

**What the surviving findings share:** every one is a finding about something **Armature itself specified**. None depends on the Track A design being right. Every withdrawn finding was the reverse.

---

## Headline finding — amended

> **Original:** *Armature has no model of claims made about artifacts by people over time* — with every blocking finding downstream of that absence.
>
> **AMENDED.** True as an observation; the conclusion did not follow, and the findings it supposedly explained were withdrawn. Armature needs two things from a review process — **rationale** and **findings** — and substantially had the machinery for both.
>
> **The real headline, in hindsight:** the durable findings are not about what Armature lacks conceptually. They are places where **Armature's own specifications disagree with each other** — review status modelled where delivery config lives, a key built from mutable content, an API document contradicting its own boundary claim, an annotation channel gated on whether a type happens to have a name.

---

## Open

### F9 — API is create-and-read only, and leaks store identifiers

The API spec lists 16 endpoints, GET and POST only — no PATCH, PUT or DELETE. CoQui is fundamentally an **editing** tool. Its GET factory returns all documents of a type, unfiltered and unpaginated.

Separately, the document states that store internals "are not exposed to the frontend" — while its examples return **and accept** `"Course/intro-ai-for-ids"` in both directions.

Per ADR-0016's investigation that format is a convention of the seed script, not schema-derived — so the leak is cheap to close, but there is currently no convention to close it *toward*.

The API spec carries four separate problems and needs a revision pass before CoQui builds against it: no updates, the ID leak, no option text in the item response, and coverage semantics superseded by ADR-0019.

### F8 — Identity designed but unimplemented

Armature's user type and authorship model are designed; auth is unimplemented. A design note or finding with no author is much weaker evidence — and ADR-0020's dismissal-requires-a-reason constraint is hollow without knowing who dismissed it.

---

## Deferred by decision

### F16 — Eight item formats declared; four representable

Matching, Ordering and FillInTheBlank cannot be represented; Essay has no home for a rubric.

**Deferred deliberately.** The first tool targets multiple choice, and formats beyond it are not needed to validate the graph infrastructure. Recorded in Armature ADR-0010 with the likely approaches and the constraint carried forward from ADR-0016.

**Worth noting as a pattern:** a known limitation with a stated reason and a sketched path is not an open gap. It is a decision. This was filed as a gap because the fit-analysis template generates gaps.

---

## Withdrawn findings

### F3 — ~~Objective mapping as a bare Set contradicts ADR-0003's own rule~~ **WITHDRAWN**

> This was called "the cleanest result of the whole pass." That was precisely backwards.

The argument was **not** that ADR-0003 overlooked objective mapping — it names it explicitly. It was that the **stated premise was false**, which would flip ADR-0003's own closing rule to the opposite conclusion. Legitimate in form; only as good as its evidence:

| Claimed the link carries | Outcome |
|---|---|
| Review threads specific to the alignment | Withdrawn rev 1 — CoQui's exhaust |
| A verification of the alignment | Withdrawn rev 2 — originated in the Track A alignment lens |
| A confirmed or disputed cognitive level | Relocated — a dispute is a design finding |

Nothing remains that the *link itself* must carry. **ADR-0003's premise stands unfalsified.**

**Armature had already answered the cognitive-level case.** Its Bloom's-level enum is documented as *"used on both LearningObjective and AssessmentItem — sharing this enum enables alignment queries between the two types."* Derivable by comparison, by deliberate design, for exactly this purpose. The finding was filed against a decision that had already handled the question.

**Residual limitation to watch:** an item assessing three objectives has one Bloom's level and cannot align to them at differing levels. Unusual; a case to watch, not evidence to act on.

### F2 — ~~Two of four part types have no addressable identity~~ **DISSOLVED**

Attestations and threads are both withdrawn. What remains:

| Needs an anchor | Resolution |
|---|---|
| A note about a distractor | Already a document |
| A note about the stem | Item-level; acceptable once options are separately anchorable |
| A finding disputing an alignment | Two anchors on the finding |
| A finding about an objective | Works today |

Follows the principle in `../design/rationale-capture.md`: **reify relationships, not components — unless plural and data-bearing.**

### F4 — ~~No per-part versioning~~ **WITHDRAWN** (rev 1)

Staleness is CoQui's computation. With `Verification` also withdrawn, even the residual state reference disappears.

### F5 — ~~No representation of review discourse~~ **NARROWED** (rev 1)

The observation stands — no comment, thread, reply, resolution or severity concept exists. But Armature needs review *outcomes*, not *discourse*. What survives is the design-finding type plus a "prompted by" extension to design notes.

---

## Plugin concerns

**F10** — Assignment envelope. Pure workflow.
**F11** — Lens modes, keyboard interaction, time estimates, queue, diffs, resumability, notifications. Entirely CoQui's UX.
**F12** — In-flight suggestion state. Only the accepted result becomes a durable edit.

## CoQui adapts

**F13** — Item reuse via references. Armature's model beats duplicating items per assessment.
**F14** — Cross-item threads. A note's subject field is already a set.
**F15** — Parked items. Closer to a design finding than to a design note.

---

## Where Armature fits, and where it wins

### V1 — The decline path is a rationale-generation engine

The strongest positive result; it survived every revision. Armature theorised that rationale should be captured but had no answer to **why a designer would bother writing it down**. CoQui found the moment: defending a decision to an expert who challenged it, with the interface requiring a reason before the decline proceeds. Three existing note categories already fit.

### V2 — References-not-ownership enables the item bank cleanly.

### V3 — The note-subject set is a working generic anchoring mechanism.

### V4 — `EvidenceMethod` already contains `ExpertReview`

Anticipated as an evidence-gathering method but scoped to needs analysis. The descriptive-evidence type, confidence levels, and the need/evidence-link shape all exist — which is why ADR-0020 introduces one type rather than a subsystem.

### V5 — ADR-0003 was right, and the shared Bloom's enum shows foresight

The `Set` decision survived a direct challenge backed by a real application's review workflow.

### V6 — The junction Hash keys are a quiet piece of good design

Keying each junction on both endpoints makes relationship uniqueness a schema-level guarantee. Given ADR-0006's theme that such constraints fall to the API, it is notable that this class *is* enforced by the store. It was never written down; ADR-0016 records it.

---

## Method notes

**On the two-track discipline.** It worked, but not as this document originally claimed. The value was not that CoQui revealed hidden flaws — most of the flaws it "revealed" were imported from CoQui's own design. The value is that **subjecting the schema to a real application's demands, then subjecting those demands to scrutiny, separated genuine gaps from projected ones.** Both halves were necessary. A wrapper app would have found nothing; an unchallenged fit analysis found nine gaps where three stood.

**On the failure mode.** Three times a hub requirement was proposed that originated in CoQui's design rather than a stated need. Each was caught by challenge, none by self-review. A fourth error was self-caught late: a bespoke rationale field on a junction was repeatedly cited as evidence of a workaround when the relevant ADR documents it as a deliberate inline field. Armature ADR-0017 carries a "what this ADR does not claim" section so the error is not inherited.

**The rule this implies:** an "Armature gap" must cite either an **Armature-internal symptom** or a **user-stated requirement**.

**On where the value actually came from.** The most productive thread began as a trivial documentation question — where does option text live? — and became a key-strategy defect, an ADR, and a further finding. The template surfaced the question; sustained interrogation of the oddest answer produced the value. Worth carrying into Fit Analysis 02.
