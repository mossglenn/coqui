# CoQui

**Collaborative assessment authoring and SME review, built on [Armature](https://github.com/mossglenn/armature).**

CoQui is a tool for instructional designers and subject-matter experts to develop assessment items together. It addresses the SME review bottleneck: review that arrives as untracked email, feedback with no resolution record, and rework churn where an editor cannot see what changed.

## Two purposes

CoQui is **primarily a collaboration tool.** It is designed from the review problem outward, not from Armature's schema inward.

It is **secondarily the first real-world test of Armature** as infrastructure. Both purposes are real, and the ordering matters: a thin wrapper over the schema would be an unfalsifiable test, because a design shaped by the schema will always appear to fit it.

Where a good CoQui design does not map cleanly onto Armature, that is a finding — and Armature is what changes. See [`docs/design/design-premise.md`](docs/design/design-premise.md).

## What it does

- **Scoped review requests.** An SME receives a specific ask — *these 12 items, content accuracy only, by Thursday* — sized to the attention they actually have
- **Review lenses as modes.** Content accuracy, alignment, distractor quality, and clarity each get a purpose-built surface, because a single comment box asks for one judgment and a multiple-choice item requires seven
- **A first-class decline path.** The designer can refuse a change and record why. That reasoning becomes durable design rationale in the graph
- **Upstream flagging.** When item review reveals that an *objective* is flawed, CoQui raises an evidence-grounded finding against it — without holding write access to objectives

## Status

Design phase. The process model, review experience, and boundary with Armature are documented; no application code yet.

## Repository structure

```
docs/
  design/               Track A — the collaboration tool, designed on its own terms
    design-premise.md     Why the two tracks are kept separate
    process-model.md      Stages, lifecycles, actors
    review-experience.md  The reviewer's surface
    rationale-capture.md  Granularity and prompted rationale
  fit-analysis/         Track B — where a real app strains the infrastructure
  adr/                  Architecture Decision Records
  architecture.md       What CoQui owns, what Armature owns
  armature-orientation.md   Reference notes on the dependency
  toolkit-candidates.md     What might generalise to other plugins
```

## Relationship to Armature

Armature is the graph infrastructure: artifacts, relationships, and the design rationale attached to them. CoQui is a plugin. It reaches Armature only through the Armature API and never touches TerminusDB directly.

CoQui maintains its own store for review state — assignments, threads, attestations. That state is workflow exhaust and does not belong in shared infrastructure. Only outcomes cross. See [`docs/architecture.md`](docs/architecture.md).

## License

MIT
