# CoQui — Session State

Updated at the end of every session using the workflow in `prompts/update-session.md`.

---

## Current Phase

**Design → validation.** Review loop designed → Fit analysis run against Armature → Six Armature ADRs drafted → Repo initialised → Validation plan written → Phase 0 complete → **Role model replaced the lens model; four new CoQui ADRs; all Track A documentation rewritten** → **Next: Phases 1–3 of the validation plan**

No application code yet, and none until the Phase 7 gate clears.

---

## What's Done

### Track A — the collaboration tool

- **Design premise** — the two-track method, and why a wrapper app would be an unfalsifiable test of Armature
- **Role model** — four roles (author, craft reviewer, content reviewer, stakeholder), assigned by people and not enforced by the app. Replaced the two-actor model after every recurring design error turned out to be a role error
- **Process model** — three lifecycles; unordered reviews converging on an eligibility predicate; the author's four moves including the load-bearing decline path; upstream flagging
- **Review experience** — three surfaces. Content review as a two-stage flow (blind answer with confidence, three-way mismatch branch, part attestation, holistic close); craft review as a form; approval as the grid's audience
- **Coverage grid** — twelve claims across eleven occupied cells on a four-option item. The atom is the claim, not the cell. The specification of "done"
- **Rationale capture** — prompted rationale, typed with an open vocabulary and a truthful null; the diagnostic/structural families route the distractor-purpose review to two different reviewers
- **Content-review validation plan** — seven phases from parts inventory to a pre-registered decision gate

### Track B — testing Armature

- **Fit Analysis 01** — five revisions. Reported nine Armature gaps; three survived scrutiny. Preserves its own errors
- **What the graph should remember** — three kinds of data; the membership test; process data vs. craft data

### Produced for Armature

Six ADRs drafted in the Armature repo, all `Proposed` except 0021 — 0016 key strategy, 0017 `DesignRecord`, 0018 item readiness, 0019 coverage, 0020 `DesignFinding`, 0021 no practitioner performance data. Plus an amendment to Armature ADR-0010.

### CoQui ADRs

| ADR | Subject | Status |
|---|---|---|
| 0001 | Two-track design method | Accepted |
| 0002 | CoQui owns its own persistence layer | Accepted |
| 0003 | Assignment envelope single-pass, not a unit of approval | Accepted; decision 5 superseded by 0008 |
| 0004 | Attestation per part and per lens | Accepted; decision 2 superseded by 0009 |
| 0005 | Scope: items only, multiple choice first | Accepted |
| 0006 | Four roles, assigned by people and not enforced by the app | Accepted |
| 0007 | Review and approval are separate acts | Accepted |
| 0008 | Approval eligibility is a predicate, not a pipeline position | Accepted |
| 0009 | Attestation is per part and per review type | Accepted |

---

## What's Next

**Immediate — Phases 1 through 3 of the validation plan**

1. **Recruit the content reviewer, then source the corpus.** The role under test is *someone with deep domain knowledge who does not think about assessment design* — a much larger population than "credentialed SME in a named field." Find the person first; source twelve real items in their domain second
2. **Manufacture ground truth — content defects only.** Craft failures are no longer a content reviewer's job and should not reach them. If one can be constructed, include an item the reviewer will be *wrong about*, since diagnosing that is the mismatch branch's entire purpose
3. **Phase 2 — resolve the sequential/survey fork.** Two or three low-fidelity variants. The confirm-rest-of-item escape is the survey model in disguise and needs a designed constraint
4. **Phase 3 — keystroke grammar** before any visual design

**Deferred until the Phase 7 gate clears**

Stack, CoQui's store, identifier convention. The validation plan needs no stack, no store, and no Armature write path.

---

## Active Decisions

- Two-track design method (ADR-0001) — the rule most easily violated
- CoQui owns its own persistence layer (ADR-0002)
- Assignment envelope is single-pass and is not a unit of approval (ADR-0003)
- Scope: items only, multiple choice first (ADR-0005)
- **Four roles, not four people.** One identity may hold several; CoQui records role assignment and never validates it. Warrant is a claim the assignment makes, not a property the app verifies (ADR-0006)
- **Review and approval are separate acts.** The stakeholder is always the approver, assumed to have no qualifications — only the power to approve or not. Approval is terminal; review is not (ADR-0007)
- **Order is unconstrained; "done" is a predicate.** Blocking threads gate approval, never a phase transition (ADR-0008)
- **The grid's atom is the claim**, not the (part × review type) cell — one cell can hold two independent claims. Some claims are filled behaviourally rather than by gesture (ADR-0009)
- Cueing is a craft judgment at item level — no reviewer role can detect it by introspection
- A wrong answer means reviewer and key disagree, not that the item is broken. Three-way mismatch branch
- The 15-second budget is withdrawn; ~35s target, and interaction-overhead ratio is the real metric
- Prompt generously, store conservatively
- Author remains author of record; reviewers comment and suggest

---

## Blockers

**None blocking the validation plan.** Phases 0–7 require no stack, store, or Armature write path.

Blocking implementation, whenever it begins:

- **Auth is now blocking the core of the model, not just attribution.** With four roles assigned to identities, an attestation's meaning depends on the capacity it was made in. No identity → no roles → no coverage predicate → nothing to approve. Armature's user type is designed and unimplemented
- **Armature has no write path for any of CoQui's outputs.** Checked at Armature `46858fc`: nine GET routes, POST on courses and modules only, no PUT or PATCH anywhere. ADRs 0016–0020 remain `Proposed`; `DesignFinding` and item readiness are not in the schema
- **No settled identifier convention** — Armature ADR-0016 decision 5

---

## Notes for Next Session

The role model came out of a single observation worth keeping in front of you: **every recurring error in the design was a role error, never a category error.** Cueing asked of a domain expert. Bloom's levels asked of someone who has never used the taxonomy. A distractor purpose contested by whoever happened to be reviewing. Each surfaced as awkwardness three documents downstream rather than as a contradiction at the point of assignment — because a two-actor model had no way to state them.

The test to apply to any new judgment: **which role has standing to make this claim?** If the answer is "whoever is reviewing," the judgment has not been analysed yet.

The second thing to carry forward is that the grid and the flow are different artifacts doing different jobs. The grid is the specification of done and the flow is one valid traversal of it. When they disagree, the grid is right — a step filling no cell is ceremony, and a cell no step fills is a gap.

**Two corrections were made to this session's own output, and both are worth remembering as a
pattern.** The grid was called "sparse" after the model changed from four lenses to two review
types — true of the old shape, false of the new one, and carried across without rechecking the
arithmetic. Cueing was called "machine-detectable" to make its removal from the reviewer surface
feel resolved, when what had actually been established was only that it wasn't the reviewer's
job. Both errors have the same shape: **a claim that was true under the previous model, restated
under the new one without being re-derived.** Worth checking for after any structural change.

Documentation is consistent with the conversation as of session end. `docs/design/coverage-grid.svg`
carries the grid and its traversals; the earlier three-phase pipeline diagram was invalidated by
ADR-0008 and not committed.

**The repo is uncommitted.** A commit message was drafted and shown for approval but not applied;
`.git/index.lock` needs clearing first (`rm .git/index.lock`). Nineteen files: four new ADRs, two
new design docs, one SVG, and twelve rewritten or amended.

---

## Recent Sessions

### 2026-08-26

- Reviewed the repo and the Armature dependency at `46858fc`; found Armature can receive none of CoQui's writes
- Wrote the content-review validation plan — seven phases with a pre-registered decision gate
- Ran Phase 0: found the seven-judgments list mixed four kinds of expertise under one heading; built the coverage grid; withdrew the 15-second budget after deriving a ~35s floor from reading rate
- Caught and corrected a carried-over error: the grid was called "sparse" after the model changed from four lenses to two review types. It is not — eleven of twelve cells are occupied, and the role split routes judgments rather than reducing them
- Replaced the lens model with a **four-role model** over the course of the design conversation: split ID into author and craft reviewer, split review from approval, unordered the review phases, and made eligibility a predicate
- Wrote CoQui ADRs 0006–0009; marked partial supersession on 0003 and 0004
- Rewrote `process-model.md`, `review-experience.md` and the coverage grid; updated `rationale-capture.md`, `architecture.md`, the validation plan, `CLAUDE.md` and the README
- Corrected an overstatement about automated cueing detection: two syntactic checks are worth shipping, the rest is noise, and none of it justified the design move it was used to support
- Drew `docs/design/coverage-grid.svg` — the grid and its three valid traversals, replacing a pipeline diagram ADR-0008 invalidated
- Synced the claude.ai project docs to the current repo state; added `coqui-roles-and-approval.md` as a digest of ADRs 0006–0009, since the project has no ADR mirror
- Drafted a commit message covering all nineteen changed files; not committed — awaiting approval and a stale `.git/index.lock`

### 2026-08-25

- Read and mapped the Armature repo
- Established the two-track design premise
- Designed the review process model and review experience (Track A)
- Ran Fit Analysis 01; revised it five times under challenge, withdrawing six of nine reported gaps
- Drafted six Armature ADRs and amended ADR-0010
- Initialised this repository and wrote all design documentation and CoQui ADRs 0001–0005
