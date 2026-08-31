# ADR-0011: Option Order Is a Property of the Presentation, Not of the Item

## Status
Accepted, 2026-08-31. Realises the blind-review principle in `design/review-experience.md`; scopes
what `derivation: "verbatim"` claims.

## Context

The Phase 6 session corpus was assembled from two published item banks, verbatim. Building it
surfaced a property no single item shows:

> **The key never falls in option position 4** across the session's nine MultipleChoice items.

It is not a sampling accident. Across both banks, **ten of ten** MultipleChoice items key to one of
the first three slots — the publishers themselves never put the key last. So no substitution of
items could remove it: the pool holds no position-4 item to substitute in.

A reviewer who notices narrows every item without reading it. That inflates blind-stage accuracy
and suppresses the *correct-but-unsure* signal — the founding signal of the item-ambiguity cell,
and the thing one of the four planted defects exists to elicit. The blind stage would still produce
numbers; they would measure the corpus rather than the design.

The apparent fix — reorder the options in the corpus — was read as blocked, because it would cost
`derivation: "verbatim"`, the property that makes every marking traceable to a published key. That
framing was wrong, and identifying why is the substance of this decision.

## Decision

**1. The item is verbatim. The presentation is not.** No item record is edited. `derivation`
remains a claim about the item as recorded, and it is untouched. What varies is how the item is
*shown*, which was never something `derivation` spoke to.

**2. Options are permuted at build time, not at render time.** One permutation per item per
session, drawn from a declared seed, written into the corpus as `optionPermutation`, and shared by
every surface and every review-motion variant.

Render-time randomisation was rejected on two grounds. Phase 2 compares variants A, B and D on the
same items; a fresh shuffle per render shows each variant a different screen and puts a confound
inside the comparison the fork exists to settle. And a think-aloud transcript would refer to
options nobody could reconstruct afterwards.

**3. The permutation runs under declared constraints, not free chance.** Every option slot holds
the key at least once; no slot holds it more than half the time. The aim is not to simulate
randomness — it is to remove a cue a reviewer could detect within twelve items. *Never last* is
detectable; *slot 3 slightly more often* is not.

**4. Option identity is the source label; the display letter is presentation.** Each presented
option carries `sourceLabel` — the publisher's label, withheld from the reviewer by the blind
projection — and `label`, the display letter A–E. **Every ground-truth rule names a source label.**
A rule naming a display letter or a slot number is wrong by construction.

**5. An item whose option order carries information is exempt**, declared as
`optionOrder: "meaningful"` with a written argument. Permuting a sequence, a chronology, a numeric
range or an above-style option manufactures a craft defect its author did not commit — and a craft
reviewer flagging it would be right about a screen the builder invented.

**6. The contract is stated as data.** `presentationContract` in the session corpus carries both
clauses — which fields may be shown, and in what order — so a fixture asserts against it rather
than reimplementing it. `design/review-experience.md` owns the rule; the file states it.

## Consequences

**Three of the four defect records had to be rewritten.** They named options positionally — *"the
distractor claim on option 3"*, *"B marked correct"*. Under permutation each named a different
option in the session than in the answer key. This was the real cost of the decision, and it is
worth stating plainly: **the pre-registered ground truth was written against the presentation, and
nobody noticed until the presentation moved.** `defect.optionRefs` now carries the referenced
options as data, and the verifier rejects a reference the item cannot satisfy.

**The blind projection earns its shape.** `sourceLabel` and `optionPermutation` were added to the
corpus after the whitelist was written, and both are withheld without anyone touching the
whitelist. That is the argument for a whitelist over an exclusion list, demonstrated rather than
asserted.

**A renderer can now get this wrong in a new way.** Re-sorting options — alphabetically, by length,
by any tidy default — silently restores a cue or invents one. The fixture loader assertion the
corpus README already asks for now has two things to check, not one.

**What this does not fix.** The published skew is a *craft* defect in the source banks, recorded in
`publishedKeyPositionCounts` rather than corrected. CoQui has no opinion yet on whether key
position is a craft claim a reviewer should be asked to judge; `claims.md`'s open question on
MultipleSelect option ordering is the nearest thing and it is still open.

## Alternatives considered

**Substitute items keying to position 4.** Impossible — the pool contains none.

**Reorder two hand-picked items in the corpus.** Rejected. It costs `verbatim` on those items for a
fix that generalises to nothing, and it needs a per-item argument about which items are safe to
touch — an argument this decision avoids entirely.

**Leave it and instrument it.** Ask in the post-session interview whether the reviewer noticed, and
treat blind-stage accuracy as an upper bound. Rejected because the contamination is unrecoverable:
after the fact there is no way to tell which items a reviewer narrowed.
