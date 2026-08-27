# CoQui

**Collaborative assessment authoring and SME review, built on [Armature](https://github.com/mossglenn/armature).**

CoQui is a tool for instructional designers and subject-matter experts to develop assessment items together. It addresses the SME review bottleneck: review that arrives as untracked email, feedback with no resolution record, and rework churn where an editor cannot see what changed.

## Two purposes

CoQui is **primarily a collaboration tool.** It is designed from the review problem outward, not from Armature's schema inward.

It is **secondarily the first real-world test of Armature** as infrastructure. Both purposes are real, and the ordering matters: a thin wrapper over the schema would be an unfalsifiable test, because a design shaped by the schema will always appear to fit it.

Where a good CoQui design does not map cleanly onto Armature, that is a finding — and Armature is what changes. See [`docs/design/design-premise.md`](docs/design/design-premise.md).

## What it does

- **Four roles, not two.** Author, craft reviewer, content reviewer, stakeholder — because asking a domain expert to spot a cueing defect, or a designer to verify a clinical fact, is how review surfaces go wrong. Roles are assigned by people, not enforced by the app
- **Scoped review requests.** A reviewer receives a specific ask — *these 12 items, content only, by Thursday* — sized to the attention they actually have
- **Review and approval are separate acts.** Often the same person, always two different hats. Approval is what is terminal, not review
- **The item answers back.** A content reviewer answers the item before the key is revealed. If they get it wrong, CoQui asks who was wrong rather than assuming the item was
- **A first-class decline path.** The designer can refuse a change and record why. That reasoning becomes durable design rationale in the graph
- **Upstream flagging.** When item review reveals that an *objective* is flawed, CoQui raises an evidence-grounded finding against it — without holding write access to objectives

## Status

Design phase. The role model, process model, review experience, coverage grid and boundary with
Armature are documented. A validation plan exists for the content-review surface, with a
pre-registered decision gate. No application code yet, and none until that gate clears.

## Repository structure

**[`docs/README.md`](docs/README.md) is the map** — it says which file answers which question.
Start there rather than from the tree below.

```
docs/
  README.md              the map — start here
  open-questions.md      everything still open, aggregated (generated)
  design/                the specifications — current truth
    design-premise.md      why the two tracks are kept separate
    process-model.md       roles, lifecycles, the eligibility predicate
    review-experience.md   the three surfaces and the objection channel
    claims.md              what each reviewer judges, and what it costs
    rationale-capture.md   granularity and prompted rationale
    content-accuracy-validation-plan.md   how content review gets tested
    coverage-grid.svg      the grid and its traversals, drawn
  adr/                   decisions, immutable
  fit-analysis/          Track B — where a real app strains the infrastructure
  journal/               working records and superseded reasoning
  architecture.md        what CoQui owns, what Armature owns
  armature-orientation.md   reference notes on the dependency
  toolkit-candidates.md     what might generalise to other plugins
```

## Relationship to Armature

Armature is the graph infrastructure: artifacts, relationships, and the design rationale attached to them. CoQui is a plugin. It reaches Armature only through the Armature API and never touches TerminusDB directly.

CoQui maintains its own store for review state — assignments, threads, attestations. That state is workflow exhaust and does not belong in shared infrastructure. Only outcomes cross. See [`docs/architecture.md`](docs/architecture.md).

## License

MIT
