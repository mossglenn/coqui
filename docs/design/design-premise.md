# CoQui — Design Premise and Working Method

Foundational context for all CoQui work. Read this before `../armature-orientation.md`, not after — orientation is reference material, this is the frame that decides how it gets used.

Formalised as ADR-0001.

---

## The premise

CoQui is **primarily a collaborative authoring and review tool for instructional designers and SMEs.** It is secondarily — and consequentially — the first real-world test of whether Armature can serve as infrastructure for an actual application.

Both roles are real. Neither is a pretext for the other.

## Why the ordering matters

Armature was designed in isolation, as an idea. Its schema, ADRs, and API spec are internally coherent, but internal coherence is not evidence of fitness. **A framework designed without an application is a hypothesis, not infrastructure.**

The way to test that hypothesis is to build an application that has its own reasons to exist and see where the framework strains. This only works if the application is designed honestly:

- **A thin wrapper over Armature is an unfalsifiable test.** If CoQui's screens are shaped by the schema, of course the schema fits. The experiment returns a positive result no matter what, which means it returns no information.
- **Friction is the signal, not the failure.** Every place a good CoQui design does not map cleanly onto Armature is a finding. That is the deliverable of the second role.
- **If a genuinely good app can't run on Armature, Armature is what changes.** The app is not bent to fit the infrastructure. That is the whole point.

## Two tracks, deliberately separated

### Track A — design the tool (primary)

User-centred. Driven by the real collaboration problem: the SME review bottleneck, and the broader question of how designers and subject-matter experts co-develop assessment content.

Governing questions are about **people and work**, not data:

- Who are the users, and what does the handoff between them actually look like today?
- Where does review break down — ambiguity about what changed, no shared vocabulary, unclear authority to decide, reviews arriving as untracked email?
- What does a good review cycle feel like when it works?
- What does the tool need to make visible at the moment someone is deciding something?

During Track A work, **Armature is out of scope.** Not ignored out of purity — bracketed, so the design isn't unconsciously pre-constrained. Schema shapes, junction documents, and TerminusDB affordances do not appear in Track A artifacts.

### Track B — test the infrastructure (consequential)

Takes Track A output as a fixed input and asks what Armature would have to do to support it. Produces a **fit analysis**, not a redesign of Track A.

Every point of friction gets triaged:

| Outcome | Meaning | Action |
|---|---|---|
| **Armature gap** | The graph genuinely can't represent or serve something a real app needs | ADR + schema/API change in Armature |
| **Plugin concern** | This is CoQui's UX, workflow, or storage — it never belonged in the hub | Build it in CoQui; note why the boundary falls there |
| **CoQui adapts** | Armature's model is defensible and CoQui's assumption was the weaker one | Change the CoQui design; record the reasoning |

The third row is load-bearing. Without it, every friction point becomes an Armature feature request and the schema bloats with one application's idiosyncrasies — which violates Armature's own framework/plugin boundary principle.

### The triage rule, learned the hard way

> An **Armature gap** must cite either an **Armature-internal symptom** or a **user-stated requirement**. "CoQui needs it" makes it a plugin concern until proven otherwise.

Fit Analysis 01 initially reported nine Armature gaps. Three survived scrutiny. Three times a hub requirement was proposed that originated in CoQui's own design rather than any stated need — and each was caught by external challenge, never by self-review.

The findings that survived were grounded in Armature's *internal* evidence: places where its own specifications disagreed with each other. That is the reliable signal.

## Working method

**Iterate in slices, not one big reveal.** Designing all of CoQui in a vacuum and then running a single integration check produces one enormous, unactionable fit report. Instead: take one user-facing capability at a time, design it fully in Track A, then run Track B against it, then move to the next.

**Keep the tracks visibly separate in artifacts.** A Track A document that mentions `ModuleObjective` has already failed. A Track B document that proposes changing the user experience to suit the schema has confused its job.

**Preserve the rationale as data.** Armature's thesis is that design decisions should be captured as structured, inspectable artifacts rather than living in someone's memory. This project holds itself to that standard: fit findings, triage decisions, and their reasoning get recorded — not reconstructed later from conversation.

## Known weakness in the evidence base

The author is an ID practitioner and can speak credibly for that side of the collaboration. He is not an SME, and the SME experience is the half of the workflow the tool is nominally built to fix. Unless real input is gathered from that side, the SME-facing design rests on inference.

This does not block Track A, but it should be named in any claim about the tool's user-centredness rather than quietly assumed away.

## What this rules out

- Starting from the schema and asking what UI it implies
- Starting from Armature's API spec and building screens for its endpoints
- Treating Armature's open questions as CoQui's starting agenda — those are Track B outputs
- Justifying a design choice with "the graph works this way"
