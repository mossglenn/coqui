# 2026-08 — the claims review

Working log for the annotated-comment (`$$$`) review pass on `../design/claims.md`, then called
`../design/claims.md`. Twenty-three decisions across seven threads, plus an appendix covering a
second document.

Bare filenames below are relative to `../design/` unless a path is given.

**Status: complete.** All seven threads settled in `claims.md`, and D1–D23 propagated
across the documentation and the ADRs. The check table below is retained as the record of what was
changed and where.

---

## Settled

### D1 — The diagnostic-misconception row is deleted from the grid

No reviewer attests that learners hold a given misconception. The empirical claim is the
**author's**, made by declaring a diagnostic purpose. Review may contest it; it never confirms it.

*Knock-on:* this was the grid's only conditional cell. The grid's size is now fixed by item
shape (type × option count) and no longer varies with author declarations.

### D2 — Stem × Content is reframed from fact-checking to well-posedness

- Grid cell: **Well-posed in the domain**
- Reviewer-facing claim: **"This question is well-posed: nothing here is wrong, misleading, or ill-formed."**
- Shape: **yes/comment**, not yes/no. Accepted cost: this cell will draw more comment than a
  fact-check would.

Rationale: every fact in a stem can check out while the question is still broken — accidental
trick questions, absurd premises, a second defensible answer. Fact-checking is the smallest
thing a domain expert is for.

### D3 — The affirmable/objection split is adopted formally

The grid holds only claims a reviewer can be asked to **affirm**. Everything else is an
**objection**: unbounded, blocking when raised, free when not. Completeness is the objection
channel's job, not the grid's.

Constraints that fall out: an unused channel must cost nothing; objections are attributed and
persist until resolved, unlike attestations, which the next edit invalidates.

*Needs its own ADR — next free number is **ADR-0010**.*

### D4 — A cell holds one claim by default

Item × Craft is the documented exception (cognitive level · cueing), and that exception is the
price of cueing's relational nature. Cueing is **not** moved to Key × Craft: it is a property of
the stem against the option set, and anchoring it to the key would mislabel a relational
judgment as a key defect.

### D5 — Key × Content wording aligned to the grid

"B is a correct answer to this question" → **"B is incontrovertibly correct — not merely the
strongest of these four."** *(Applied from the L98 note. Confirm the second clause — it is
mine, not yours.)*

### D6 — "Trivial" becomes an objection raised at the blind-answer stage, not a third confidence option

- Affordance: **"A learner could get this without knowing the material."** + free text
- Offered beside the sure/unsure control, at the blind-answer moment (the signal is perishable)
- Optional; raising it blocks approval, skipping it costs nothing, content review proceeds either way

Rejected: putting it on the confidence control. Confidence reports the reviewer's state,
triviality appraises the item; combined, an item marked trivial loses its sure/unsure reading
and *sure* silently becomes "sure and not trivial," shifting the ambiguity denominator.

Rejected: making it an affirmable claim. "This item is not trivial" would confirm on ~95% of
items — the reflexive-confirmation failure the doc already uses to reject a content half of the
cognitive-level claim.

Label chosen over "too easy" because an expert finds most items in their field easy; naming the
learner forces a projection that partly counteracts the blind spot. One affordance, not two —
the three underlying defects (too easy for the audience / guessable / easy-to-this-expert) get
separated later from the free text, not argued about now.

### D7 — A signal's unit of capture can differ from its unit of interpretation

Triviality is captured per item, meaningful per bank, and deliberately suppressed in between:
one trivial objection goes to the **author** only; the **rate** goes to the stakeholder summary.
Expert-blind-spot noise is roughly constant across items, so it cancels in aggregate.

First instance of this shape in the model. Flagged as a toolkit candidate.

### D8 — Triviality is a weak one-way cueing signal

It partially patches the blind-answer stage's cueing blind spot, but an expert who answers
correctly still cannot tell knowing from having been cued. Weak evidence when raised; no
evidence when absent. Captured, not relied on. Thread 5 carries the real answer.

### D9 — The blind-answer stage's compound readings are named

Three facts are captured — correctness (system), confidence (reviewer), triviality (reviewer,
optional) — and read in combination:

| Answer | Signal | Reads as |
|---|---|---|
| Correct | sure, nothing raised | Clean |
| Correct | unsure | Ambiguity — the founding signal |
| Correct | trivial | May not test what it claims; weak per item, meaningful as a rate |
| Incorrect | unsure | Ambiguity, more loudly |
| Incorrect | sure | Key or distractor contestable |
| Incorrect | **trivial** | **Strongest reading the stage produces** — likely miskeying, or an option set that misleads domain experts specifically |

Rare by construction. Free to collect. Readings, not verdicts — any incorrect answer may be
reviewer error.

**Hard storage requirement:** the three facts must persist separately. Collapsing them to
pass/fail at capture destroys every compound.

### D10 — Withholding the author's marking is the default

> **Collect the reviewer's judgment before showing the author's marking.**

A strong default, not an inviolable rule. Test for breaking it: *the claim cannot be written
without naming the author's answer.* MultipleChoice passes that test — "A is wrong, not merely
weaker than B" needs B — so it reveals the key after its own blind-answer stage.

MultipleSelect and TrueFalse failed it for no reason. The violation lived in claim wording
("correctly marked as", "as marked"), not in process design, which is why it went unnoticed.
Generalises past this document; the check is mechanical for any future item type.

### D11 — TrueFalse is collected blind

Claim becomes *"Answer: true / false"*, compared afterwards to the marking. Same single gesture,
unprimed — the stage and the claim are one act for this type.

Stated honestly: the 50% floor confounds *correct-but-unsure* with a coin flip, so the founding
signal is weak for TrueFalse. *Incorrect* strengthens (an expert disagreeing with a binary
marking approaches a direct miskeying report), and triviality is the type's characteristic
failure — guessability is TrueFalse's dominant defect mode.

### D12 — MultipleSelect option markings are collected blind; no separate item stage

The set of markings *is* the blind answer. Set comparison localises the contested option, which
is better resolution than MultipleChoice's single wrong answer. Gesture count unchanged (*n*);
cognitive cost rises because the reviewer decides rather than agrees — the same trade accepted
in D2.

Confidence: **one item-level sure/unsure after the set**, not per option.

**Watch, do not solve:** if experts routinely differ on one option in five, MultipleSelect
generates objections at several times MultipleChoice's rate and may be structurally expensive to
review. An item-type policy question. Phase 4 measures it.

### D13 — The cognitive-level claim is collected in two steps

1. **Blind, required, one gesture** — *"Does this item require more than recall?"*
2. **Reveal** the author's declared level
3. **Confirm** — *This item measures at the declared cognitive level.*

Follows D10 rather than excepting it. Hiding the declaration through step 1 costs nothing and
stops the reviewer answering out of the author's answer.

**Rejected: blind Bloom's naming.** It converts recognition into production, and inter-rater
reliability on Bloom's is poor enough that a mismatch cannot be read — genuine defect and
taxonomy fuzz are indistinguishable. That is the alarm-fatigue failure the doc rejects for lint
checks, with a person inside it.

**Why the recall binary works:** the one cut people agree on; targets the endemic defect
(declared *Apply*, tests recall); asymmetric, so it does not flood; and its real job is
inoculating the confirmation that follows.

**Required, not optional** — an optional blind step is skipped exactly when acquiescence is
likeliest.

**Ceremony test recorded:** if the recall mismatch rate proves near zero in use, delete the
cell. Found from data, not argued.

*Also clarified in the doc:* "domain experts have never used the taxonomy" rejects reviewer-named
levels for **content** review only. The craft reviewer is an ID; the blocker there is
reliability, not fluency.

### D14 — D10 strengthened: the blind judgment need not match the shape of the claim

Where collecting a claim blind would be too costly or too unreliable, a cheaper **proxy**
judgment satisfies the withhold-the-marking default just as well. What matters is that the
reviewer commits to something before the marking appears. This is what makes D10 affordable
rather than aspirational — and it means MultipleChoice remains D10's only true exception.

### D15 — Cueing is a craft claim **and** a content objection

Two of the three original reasons were damaged:

- **Reason 3 conflated introspection with inspection.** That a reviewer cannot tell *from
  answering* whether they were cued bounds the **instrument**, not the **role**. An SME detects
  a taxonomic cue by reading the option set, not by introspecting
- **Reason 2's catalogue was incomplete in the one direction that matters.** Every listed form
  (grammar, length, absolutes, lexical echo, convergence) is visible without knowing the
  subject. Taxonomic cueing — "which widget…" where only one option is a widget — is invisible
  without it
- **Reason 1 survives and strengthens.** Every part-level claim is satisfiable while the item is
  broken: asked whether a non-widget is wrong, the reviewer correctly confirms. No cell in
  *either* column can hold a relation

**Resolution:** domain-visible cueing is an **objection**, not a content cell — nobody can
certify the absence of cueing. No new affordance: unlike triviality it is not perishable, so the
general channel carries it free. Second problem the channel has absorbed that would otherwise
have become a control.

**Craft claim narrowed** to *"Nothing in the item's construction cues the answer."* Ceremony risk
recorded, same mitigation and same data test as the cognitive-level cell.

### D16 — An open objection channel still needs scaffolding

Openness is not neutrality. No guidance produces under-reporting from the reviewers with the
most to say. Two recurring failures pull in opposite directions: the **inarticulate signal**
(feels wrong, can't name it) wants maximum openness; the **unconsidered angle** (never thought
to check whether the stem gives it away) wants guidance.

Three rules keep the second from consuming the first:

1. **The unlocalised objection is valid** — fileable, blocking, attached to nothing narrower
   than the item. Demanding a category or diagnosis discards the signal most worth having
2. **Prompts have no state** — nothing records that a reviewer saw one, nothing is completed by
   reading one. State turns prompts into a checklist of things nobody can affirm
3. **The list is never exhaustive and must not read as one** — otherwise "none of these" becomes
   "nothing wrong," closing the channel it was meant to open

Prompt content and placement deferred to `review-experience.md` (role-scoped, possibly
type-scoped).

### D17 — The time budget is withdrawn

Gone: the word-count x 200 wpm derivation, the six-row target/ceiling table, the 35 s median and
the "off by 2.3x" claim as targets.

**The principle:** a gesture count is derivable from the specification; a time is a property of a
person nobody has watched. One is checkable by reading the document, the other is not checkable
at all.

**The proof, from this review:** three of the six rows of a table marked **[settled]** were
costed against acts that no longer exist — TrueFalse and MultipleSelect priced as confirmations
before D11/D12 made them blind, craft priced at one gesture on a cell D13 gave two. Stale inside
one review pass, and invisibly.

**Kept, reframed:** the three-contradictory-figures finding, now read as evidence *against*
unanchored numbers rather than motivation for better ones. And one methodological point — *an
estimate too crude to set a target can still be sharp enough to falsify one*: the derivation
could not establish 35 s, but did establish that 15 s sits below the reading floor.

### D18 — Interaction cost is counted as a gesture inventory

Each gesture classed **recognition** (shown a proposition, agree/disagree — cheap),
**production** (generate the judgment with nothing shown — scales with answer-space size), or
**composition** (prose — expensive, unbounded). Not invented for the purpose: recognition vs
production is what D13's argument already ran on, and answer-space scaling is why the recall
binary is affordable where blind Bloom's naming is not.

| | Required gestures | Production | Composition |
|---|---|---|---|
| Content, MC-4 | 6 | 1 (4-space) | Expected on the stem claim, not required |
| Content, TrueFalse | 2 | 1 (2-space) | — |
| Content, MultipleSelect-*n* | *n* + 2 | *n* (2-space) | Expected on the stem claim |
| Craft, MC-4 | 7 | 1 (2-space) | — |

Optional gestures excluded by definition — an unused channel must cost nothing.

**Contradicts the withdrawn budget:** it claimed craft is cheaper than content (20 s vs 35 s). By
gesture count craft is *more*. Both can hold — content's gestures carry domain recall.

**Stated limitation:** gesture counts deliberately omit what dominates the cost. That is why they
suit this stage — they isolate what the design controls without pretending to measure the rest.

### D19 — No new required gesture without naming what it buys

Applied three times in this review before being stated: D13's blind step earned *required* by
arguing inoculation; D6's triviality affordance was made *optional* because it could not; D15
added nothing because the objection channel already carried it. The budget discipline is a
constraint on the design, not a number to argue with.

### D20 — Seconds are a Phase 4 output, not a Phase 0 input

No numeric target is set until Phase 4's baseline returns one. The withdrawn section's underlying
error was deriving by argument what only measurement settles.

### D21 — Overhead thresholds are withdrawn, and none should replace them

The 40 / 75 / 100 per cent bands had no derivation, and none was available.

> **A measure can be useful for comparison while being useless for adjudication.**
> Ranking does not need a scale. Grading does.

"Is 62% acceptable?" is a value judgment wearing a number and no amount of data settles it. "Is
this revision cheaper than the last?" needs two measurements and no boundary. Overhead is
compared against the baseline and against earlier revisions — never against a threshold.

### D22 — Overhead is demoted to a Phase 4 instrument

The formula and the baseline survive; the section no longer states a metric in force. The
**denominator is the honest part** — Phase 4's plain-text baseline is a measurement, the only
quantity near this budget not derived from something invented. The **numerator does not exist
yet**, since total time is a Phase 4 output.

**Robustness claim corrected.** "Robust to corpus difficulty" holds in one direction only: hard
items cannot make a good design look bad, but they readily make a bad one look good. 30 s of
overhead reads as 150% on 20 s items and 50% on 60 s items. Absolute overhead must be reported
beside the ratio.

### D23 — Two instruments, two questions

| Question | Instrument | Available |
|---|---|---|
| Did this design change add cost? | Gesture inventory diff | Now |
| Does the interface cost more than the thinking? | Overhead + absolute seconds | Phase 4 |

Also dropped: the "two thirds of that 35 seconds is reading and recall" figure, which came from
the withdrawn derivation. The qualitative claim stands without it. Kept untouched: the list of
what the design controls — navigation, gesture cost, re-reading forced by layout, mode confusion,
comment composition.

---

## Propagation — what changed, and where

All rows applied unless marked otherwise.

| Document | Changes |
|---|---|
| `review-experience.md` | Grid section (D1, D3, D4); triviality affordance and compound-reading table added to Stage 1 (D6, D7, D9); Stage 2 claim sketch reworded and the yes/comment shape stated (D2, D5); empirical-claim paragraph rewritten (D1); craft table plus the two-step cognitive level and its conflict with *everything-visible-at-once* (D13); cueing rewritten (D15); **new §The objection channel** with prompts and their three rules (D3, D16); interaction budget replaced by the gesture inventory (D17–D20); withhold-the-marking corollary added to the blind-review principle (D10, D14); entry-point time estimate **deferred** (D17, D20); three anti-patterns added; three open questions added |
| `process-model.md` | Role table rows for craft and content reviewer; out-of-type path named load-bearing (D15); **new §Objections are threads** and **§The triviality rate** (D3, D7, D16); eligibility predicate quantifies over claims (D4); stages 3 and 4 rewritten (D11, D12, D13); two open questions added |
| `rationale-capture.md` | The two-claim table now splits *craft confirms* / *author asserts* (D1); the empirical half removed from review; only the contesting half of the mechanism operates; withhold-the-marking corollary added (D10, D14); open item added questioning whether the diagnostic/structural split still earns itself now that it routes nothing |
| `content-accuracy-validation-plan.md` | Status note; Phase 0 outcome box amended (D17); outputs now a gesture inventory (D18); Phase 3 keystroke questions include unlocalised and out-of-type objections and stateless prompts (D16); baseline marked load-bearing and **§What Phase 4 must also measure** added — absolute overhead, recall-binary mismatch rate, cueing failure rate, triviality rate, MS-vs-MC objection rate, executed gesture counts (D9, D12, D13, D15, D22); **Phase 7 gate rebuilt** — pre-registers direction and comparison, not magnitude (D21) |
| `architecture.md` | Objections are threads, including unlocalised (D3, D16); attestation grid is per claim (D4); blind-stage facts and the craft recall judgment stored separately (D9, D13); two open questions added |
| `toolkit-candidates.md` | Prompted rationale refined with the third routing state (D1); **four new candidates** — affirmable claims and objections (D3, D16), withhold-the-marking with the proxy refinement (D10, D14), gesture inventories over time budgets (D17–D21), signals whose capture unit differs from their interpretation unit (D7) |
| `coverage-grid.svg` | Regenerated. Diagnostic row removed, stem content cell reworded, cueing narrowed, an **objections band** added below the grid, caption corrected, gate wording aligned to the per-claim predicate |
| ADR-0004 | Decision 5 **withdrawn**, not merely revised; the design requirements it carried survive; *no new required gesture without naming what it buys* recorded as what remains of its framing |
| ADR-0008 | Amendment note; predicate quantifies over claims; decision 3 references ADR-0010 and the now-fixed grid size; lens map corrected for the empirical distractor claim; decision 7's out-of-type path named load-bearing; a Negative consequence added — the predicate is satisfiable while an item is still defective |
| ADR-0009 | **Fully amended.** Decisions 1, 2, 4, 5 changed; decisions 6, 7, 8 added; correction block's second figures withdrawn; consequences rewritten; amendment log appended |
| **ADR-0010** | **New.** The grid holds affirmable claims; everything else is an objection. Carries D3 and D16 |
| `../adr/README.md` | Index updated for the 0009 amendment and 0010 |
| `../fit-analysis/01-review-loop.md` | **Not changed.** It is a dated audit trail of a past analysis, not a specification. Its content is historically accurate as written |
| `../fit-analysis/what-crosses-to-armature.md` | **Not changed.** Carries its own `$$$` comments and needs its own review pass |

## Still open, carried forward

- **Who resolves an unlocalised objection?** No anchor, no diff, nothing for the raiser to confirm against. `process-model.md`, ADR-0010
- **The prompt set is unwritten.** Rule-constrained but untested. `review-experience.md`
- **The entry-point card has no time estimate** until Phase 4 measures one
- **Two cells may be ceremony** — the cognitive-level claim and construction cueing. Both carry a data test; neither has been run
- **Does the diagnostic/structural vocabulary still earn its split** now that it routes nothing? `rationale-capture.md`
- **MultipleSelect may be structurally expensive to review.** An item-type policy question, measured in Phase 4

## Outstanding threads in `claims.md`

None. All seven threads settled; every `$$$` block removed.


---

# Appendix — `what-crosses-to-armature.md`

Same review session, different document. One `$$$` block, which had also commented out the whole
of §Capture at commit.

**The objection, upheld.** The document conflated *decisions about building CoQui* with *the
design record CoQui produces for its users*. The phrase carrying the equivocation was "a stricter
standard for CoQui's decisions than Armature applies to its own" — and the ADR analogy supporting
it reasoned from the first record to the second.

### G1 — The three records are named up front

CoQui's own design record (ADRs, never crosses) · the design record CoQui produces (notes and
findings, crosses) · the crossing itself. Named in a table at the top so the equivocation cannot
recur.

### G2 — The ADR analogy is deleted, its conclusion kept

*Typed outcomes carrying free-text rationale* is load-bearing — §What Armature receives delivers
exactly that — so it moved there as the opening premise. The precedent argument went.

### G3 — Prompted capture answers the "requires noticing" weakness

The section had listed a weakness the design already solves. `rationale-capture.md` prompts at
decision sites and leans on the decline path precisely so that capture does not depend on the
designer noticing. Stated rather than left implicit.

### G4 — New §When it crosses: the commit model

CoQui reduces its local working set to a **changeset** written at a defined moment, rather than
writing continuously — continuous writes would leak workflow state across a boundary built to
prevent exactly that.

**Approval triggers the commit for notes** (ADR-0007's terminal act; rationale is not final before
the item is). **Findings cross when raised** — they concern a different artifact, are useful
immediately, and would be lost entirely if the item is parked or retired instead of approved.

### G5 — The pull request is recorded, gated, not adopted

Its only support is CoQui's design, which the document's own triage rule refuses. Unlocked by an
Armature-internal symptom — two tools writing conflicting notes about one artifact, or an
established need to reject or revise a plugin's write — or a stated requirement from someone who
owns hub content.

## Propagation

| Document | Change |
|---|---|
| `architecture.md` | The ratio at the boundary named as a commit rather than a stream; the note/finding crossing table added; the pull-request question explicitly not assumed |
| `process-model.md` | §Flag upstream now states that a finding crosses when raised, not at approval, with the parked/retired case as the reason, and notes the opposite rule for design notes |
