# ADR-0005: Scope — Items Only, Multiple Choice First

## Status
Accepted

## Context

CoQui could reasonably extend in several directions: upstream into objective authoring and assessment blueprints, or sideways into the full range of item formats Armature's schema declares.

Both temptations are real. Reviewing items written against a flawed objective is expensive — the flaw is discovered forty items late. And Armature's item-type enum names eight formats, so supporting only some looks like an omission.

But the first version has a job beyond being useful: it is the first real test of Armature as infrastructure, and that test is served better by one complete workflow than by broad shallow coverage.

There is also a schema constraint. Armature's answer-option type offers no structural variation — content, a correctness flag, feedback, and a back-reference. That is sufficient for multiple choice, multiple select and true/false; approximately sufficient for short answer; and insufficient for matching (needs pairs), ordering (needs sequence), and fill-in-the-blank (needs to indicate which blank). Essay has no answer set at all.

## Decision

**1. Scope is item authoring through approval.** Learning objectives are **read-only context** — displayed alongside items so alignment can be judged, never edited in CoQui. Assessment blueprints and objective authoring are out of scope.

**2. Multiple choice first.** MultipleChoice, MultipleSelect and TrueFalse. Other formats are deferred until the review loop is proven.

**3. Upstream problems get a flag, not an edit.** When review reveals that an objective is ambiguous or wrong, CoQui raises an evidence-grounded finding against it. It does not modify it.

This is what makes the scope boundary tenable rather than merely restrictive: a reviewer who challenges an objective gets a graceful path instead of a wall, and the designer who owns that objective receives the concern with its evidence attached.

**4. The format limitation is Armature's to resolve, and is deliberately deferred there.** Recorded in Armature ADR-0010 with the likely approaches. CoQui does not work around it.

## Consequences

**Positive**

- One workflow can be built completely rather than several partially
- The review experience can be designed against a single item shape, so the lens modes are concrete rather than generic
- Cross-layer feedback is possible without cross-layer write access — a plugin scoped to items can raise concerns about objectives safely
- The schema limitation surfaces as a recorded decision rather than as a mysterious gap

**Negative**

- Designers whose objectives need revision must work in another tool, and the round trip is unspecified
- Item banks in practice contain formats CoQui cannot author, so it is not yet a complete replacement for anything
- The upstream-flagging channel is untested. It may prove too slow to be used, in which case designers will edit objectives elsewhere and CoQui will not learn of it

**Neutral**

- Nothing here forecloses expansion. Objective authoring and additional formats are both deferrals, not rejections

## Related

- `../design/process-model.md` — stage 9, flag upstream
- Armature ADR-0010 — the deferral of complex item-type support
