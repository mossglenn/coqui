# Open Questions Register

Everything in `docs/` still marked **[proposed]**, **[deferred]** or **[open]**, plus every bullet
under an *Open questions* heading. Generated from the source documents — regenerate rather than
edit by hand with `python3 scripts/generate-open-questions.py` from the repo root.

The journal is excluded by design: it records what was settled, not what is still outstanding.


## `design/process-model.md`

**Marked open in place**

- *(proposed, L126)* probably the only honest first move. **[proposed]** Unresolved; see the open questions.
- *(proposed, L128)* The triviality rate

**Open questions**

- *(L272)* **Unresponsive reviewer** — no escalation, timeout, or reassignment. This is the actual bottleneck and the model still has no answer for it
- *(L273)* **Concurrent reviews colliding** — a craft reviewer rewrites a stem while a content reviewer is mid-attestation on it. Structural staleness handles the data; the reviewer's experience of it is unspeci…
- *(L274)* **Sequencing for a designer with no opinion about order.** With no pipeline, nothing suggests what to do first. A default is probably needed
- *(L275)* **May a stakeholder withhold on grounds nobody reviewed** — a policy or scheduling objection? "No qualification assumed" implies yes
- *(L276)* **Where role assignment lives** — project, assignment, or item level
- *(L277)* **Multiple reviewers of the same type on one item** — concurrent or sequential? What when two disagree with each other rather than with the author?
- *(L278)* **Notification model** — out of scope for the process, decisive for adoption
- *(L279)* **Who resolves an unlocalised objection?** It cannot be routed to a part or cleared by a targeted edit, and the reviewer who raised it may not be able to say what would satisfy them. The confirm-by-th…
- *(L280)* **What triviality rate should concern a stakeholder?** Deliberately unset. It will come from data or not at all
- *(L281)* **Evidence gap** — three of the four roles rest on inference, not research

## `design/review-experience.md`

**Marked open in place**

- *(proposed, L355)* Whether an opened-but-empty objection settles its row, or text is required. Built as
- *(proposed, L383)* Non-blocking feedback is still a category ADR-0010 does not have: a comment on a
- *(proposed, L545)* Prompts, not a checklist

**Open questions**

- *(L813)* **Does a self-corrected reviewer continue to part attestation?** The design says yes. Against: they just erred in this exact domain. For: they have just been calibrated, and those are separate claims
- *(L814)* **Does the confidence toggle cost more than it earns?** One click on every item, forever, to catch a signal that may be rare
- *(L815)* **What happens on the second mismatch in one assignment?** Systematic disagreement with the key is a finding about the objective or the reviewer, not about five separate items
- *(L816)* **A behaviourally-filled cell is not an attestation anyone made.** Whether *item — unambiguous* should be attributed, and to whom, is unresolved
- *(L817)* Attributed or anonymous attestation? Note the constraint from Armature ADR-0021 — attribution is provenance, never performance data
- *(L818)* Do attestations expire by time, not only by edit?
- *(L819)* **Does the cognitive-level cell survive its own ceremony test?** If the recall-binary mismatch rate proves near zero in use, the cell is ceremony and should be deleted. Same test applies to the constr…
- *(L820)* **Who resolves an unlocalised objection?** It cannot be routed to a part or cleared by a targeted edit, so the thread model may not fit it
- *(L821)* **Does MultipleSelect generate objections at several times MultipleChoice's rate?** Blind marking asks the reviewer to decide rather than agree on every option. If experts routinely differ on one opti…
- *(L822)* Three of the four roles rest on inference, not research

## `design/claims.md`

**Marked open in place**

- *(deferred, L247)* What rate should concern a stakeholder belongs in `process-model.md`. Naming a
- *(proposed, L485)* On automated checks — scope, honestly
- *(proposed, L514)* No LLM in this loop for now. It would catch more, and its failure mode is
- *(deferred, L635)* **Two rows are deliberately unrevised.** **[deferred]** TrueFalse and craft review both carry item
- *(proposed, L695)* Overhead is a Phase 4 instrument, not a present metric

**Open questions**

- *(L738)* **Is "not merely weaker than B" the right wording?** Real diagnostic load, and also the
- *(L740)* **A behaviourally-filled cell is not an attestation anyone made.** Whether *item — unambiguous*
- *(L742)* **MultipleSelect option ordering.** Under blind marking, reading the options as a set is the

## `design/rationale-capture.md`

**Open questions**

- *(L206)* **Required at approval** is proposed, not settled
- *(L207)* What recurrence rate justifies promoting a vocabulary term to real schema structure? "Evidence first" is agreed; the trigger is not defined
- *(L208)* The "no diagnostic purpose" answer may need its own honesty check — a filler rate above some threshold is itself an item-quality signal
- *(L209)* Does the option-set-as-a-whole decision site need an anchor, or is item-level sufficient?
- *(L210)* **Does the diagnostic-purpose vocabulary still earn its split?** The diagnostic/structural families no longer *route* a claim to a second reviewer — they mark which declarations are contestable. That …

## `design/content-accuracy-validation-plan.md`

**Marked open in place**

- *(proposed, L172)* asserted against it. **[proposed]** Run twelve at 8/4 by benching two clean MultipleSelect items
- *(proposed, L187)* a bulk-confirm rate is a rate rather than an anecdote. **[proposed]** Bench two clean MultipleSelect

**Open questions**

- *(L455)* **Who writes the claim sentences?** Phase 0 output is reviewer-facing copy, and its clarity
- *(L458)* **One reviewer or two?** Two gives variance and doubles the recruiting problem. One gives
- *(L460)* **Does the corrupted-item approach bias the result?** A planted defect is authored to be
- *(L462)* **What counts as detection?** *Answered by mechanism, 2026-08-28.* Every defect in the corpus
- *(L467)* **Is the think-aloud item wasted or leveraged?** It costs one of twelve data points and it is
- *(L469)* **The key never falls in option position 4.** *Answered by construction, 2026-08-31.* A
- *(L477)* **Session ordering is now declared rather than incidental** — five constraints and a fixed seed,

## `armature-orientation.md`

**Open questions**

- *(L80)* **API location.** PROJECT_CONTEXT says "separate API service, not Next.js routes" — the implementation is Next.js routes in `armature/app`. Unresolved
- *(L81)* **Coverage algorithm.** What makes a status `FullyAssessed` vs `PartiallyAssessed` is still undefined
- *(L82)* **Identifier convention.** Two coexist; ADR-0016 decision 5 proposes settling it
- *(L83)* **Auth.** Designed (ADR-0015), unimplemented. Blocks meaningful attribution on both sides
- *(L84)* **API surface.** GET and POST only, unfiltered and unpaginated. CoQui is an editing tool

## `adr/0007-review-and-approval-are-separate.md`

**Marked open in place**

- *(proposed, L26)* **5. The approver has two moves.** Approve, or withhold approval with a stated reason. **[proposed]** The reason is required — for the same reason a declined change requires one, and because it is whe…

## `design/review-motion-fork.md`

**Marked open in place**

- *(proposed, L70)* Bench two clean MultipleSelect items and run twelve at 8/4. Six clean MC plus two
- *(proposed, L357)* The marker is **invisible to the reviewer during Phase 6 and visible in the shipped

**Open questions**

- *(L377)* **Craft review chose survey and has never been measured.** Seven gestures on a MultipleChoice
- *(L382)* **Does the escape belong above the item?** *Confirm the rest of this assignment* is the same
- *(L385)* **Does D's option block need an ordering rule?** *Settled 2026-08-31 — flag first, then
- *(L392)* **Twelve at 8/4 with two MultipleSelect benched, or fourteen at 10/4?** See *What the corpus can
- *(L394)* **Is a bulk-confirm rate even readable from one reviewer?** Phase 7's *one reviewer or two?* is

## `fit-analysis/what-crosses-to-armature.md`

**Marked open in place**

- *(proposed, L62)* 1. Decision — a design note, extended slightly
- *(proposed, L95)* When it crosses
- *(open, L131)* The pull request is recorded, not adopted

---

**63 items across 9 documents.**
