# CoQui — Claude Code Context

Primary context for AI-assisted development on CoQui. Read this first, then `PROJECT_CONTEXT.md` and `SESSION.md`.

---

## What CoQui Is

A collaborative assessment authoring and review tool for instructional designers and subject-matter experts. It addresses the SME review bottleneck.

It is also the first real-world test of whether [Armature](../../armature) can serve as infrastructure for an actual application.

**Both purposes are real. Neither is a pretext for the other.**

---

## The rule that governs everything here

> **CoQui is designed from the collaboration problem outward, never from Armature's schema inward.**

A thin wrapper over the schema is an *unfalsifiable* test of Armature. If CoQui's screens are shaped by the schema, the schema fits by construction, and the experiment returns no information regardless of outcome.

So the design work runs in two deliberately separated tracks:

**Track A — design the tool.** User-centred. Armature is *out of scope* while doing Track A work — bracketed, not ignored, so the design isn't unconsciously pre-constrained. **A Track A document that mentions `ModuleObjective` has already failed.**

**Track B — test the infrastructure.** Takes Track A output as a *fixed input* and asks what Armature would have to do. Produces a fit analysis, not a redesign of Track A. **A Track B document that proposes changing the user experience to suit the schema has confused its job.**

See ADR-0001 and `docs/design/design-premise.md`.


## The four roles **[ADR-0006]**

CoQui models four **roles**, not four people. One identity may hold several on the same item,
and **the app does not gatekeep role assignment** — who holds which role is a project decision.

| Role | Acts | Expertise presumed |
|---|---|---|
| **Author** | Writes the item; **declares** distractor purposes and intended cognitive level | Instructional design |
| **Craft reviewer** | **Judges the declarations** — comprehensibility, distractor design purpose, cognitive level, cueing | Assessment design |
| **Content reviewer** | **Judges truth** — stem facts, key, distractor wrongness, ambiguity, the empirical half of a diagnostic purpose | The domain |
| **Stakeholder** | **Approves or withholds.** Judges nothing | **None** |

Every recurring error the design made was a **role error** — cueing asked of a domain expert,
Bloom's levels asked of someone who has never used the taxonomy. Sorting by who can judge is
what produced this model.

"SME" still names the person and the problem. The role is *content reviewer*.

**Review and approval are different acts (ADR-0007).** The stakeholder is always the approver,
even when the same person also reviews. Approval — not review — is what is terminal.

**Order is unconstrained; "done" is a predicate (ADR-0008).** Craft and content review run in
any order or concurrently. An item is eligible for approval when every grid cell that must be
filled is filled by someone holding the right role, and no blocking thread is open. Blocking
threads gate *approval*, never a phase transition — which is what keeps craft review a peer act
rather than a gate.

---

## Architecture

```
CoQui  →  Armature API  →  TerminusDB
```

- **CoQui never touches TerminusDB directly.** All graph access goes through the Armature API
- **CoQui maintains its own store.** Role assignments, assignments, threads, attestations, staleness, in-flight suggestions, approval eligibility and the approval record, queue state. This is not a thin client — see ADR-0002 and `docs/architecture.md`
- **Only outcomes cross to Armature.** A twelve-item review might produce eighty attestations and fifteen threads, and push three `DesignNote` records and one `DesignFinding`. That ratio is correct

**Governing principle: prompt generously, store conservatively.** Prompting is cheap and reversible; storing in the shared schema is close to permanent and propagates to every tool on the platform.

---

## Repository structure

```
docs/
  design/                    Track A
    design-premise.md          Why the tracks are separate
    process-model.md           Roles, three lifecycles, the eligibility predicate
    review-experience.md       The three surfaces: content, craft, approval
    rationale-capture.md       Granularity and prompted rationale
    content-accuracy-validation-plan.md  How content review gets tested
    parts-and-claims.md        The coverage grid — the specification of "done"
    coverage-grid.svg          The grid and its valid traversals, drawn
  fit-analysis/              Track B
    01-review-loop.md          First pass; produced Armature ADRs 0016-0021
    what-the-graph-should-remember.md
  adr/                       CoQui's own decisions
  architecture.md            State division with Armature
  armature-orientation.md    Reference notes on the dependency
  toolkit-candidates.md      What might generalise to other plugins
.claude/
  CLAUDE.md · PROJECT_CONTEXT.md · SESSION.md · prompts/
```

---

## Development Principles

### 1. The two tracks stay separate
Restated because it is the one thing most easily lost. When designing a feature, design it for the people using it. Check the fit afterwards.

### 2. Iterate in slices
Design one user-facing capability fully in Track A, run Track B against it, then move on. Designing all of CoQui in a vacuum and running one integration check produces an unactionable fit report that arrives too late.

### 3. Friction is the signal, not the failure
Every place a good CoQui design does not map cleanly onto Armature is a finding. That is the deliverable of the second purpose.

### 4. Triage every finding — and default against the hub
Three outcomes: **Armature gap** · **plugin concern** · **CoQui adapts**.

> An "Armature gap" must cite either an **Armature-internal symptom** or a **user-stated requirement**. "CoQui needs it" makes it a plugin concern until proven otherwise.

Fit Analysis 01 first reported nine Armature gaps. Three survived. Every survivor met that bar; every withdrawal failed it. This is the most easily violated rule in the project.

### 5. The decline path is load-bearing
When an ID refuses an SME's suggested change and records why, that reasoning becomes durable design rationale. It is the single highest-value interaction in the tool and the strongest validation of Armature's thesis. Do not make refusal feel like failure.

### 6. Preserve rationale as data
Armature's thesis is that design decisions should be captured as structured artifacts. This project holds itself to that standard: fit findings, triage decisions, and their reasoning are recorded, not reconstructed later from conversation.

---

## Workflow

**Session startup** — read `SESSION.md`, check `git log`, read files relevant to today's work.

**Session end** — say "update session" and follow `.claude/prompts/update-session.md`.

**Commits** — follow `.claude/prompts/commit-message-guide.md`. Show the message for approval before committing.

**Schema changes** — CoQui does not own the schema. A needed change goes through a fit-analysis finding, then an ADR in the *Armature* repo. Never assume a schema change; propose one.

---

## What Not To Do

- **Don't** design a screen by looking at the schema
- **Don't** ask a role for a judgment its expertise doesn't cover. This is the error the design made three times
- **Don't** gatekeep role assignment, or require roles to be held by distinct people
- **Don't** file an "Armature gap" whose only support is that CoQui needs it
- **Don't** put CoQui's review vocabulary (review types, roles, severity, assignment states) into the Armature schema — another tool will bring different dimensions
- **Don't** talk to TerminusDB directly
- **Don't** push review exhaust — threads, attestations, drafts — into the graph
- **Don't** treat a Track A document as negotiable because the schema makes something awkward
