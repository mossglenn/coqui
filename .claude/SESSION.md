# CoQui — Session State

Updated at the end of every session using the workflow in `prompts/update-session.md`.

---

## Current Phase

**Design** → Review loop designed (Track A) → Fit analysis run against Armature (Track B) → Six Armature ADRs drafted → Repo initialised → **Next: settle CoQui's stack and storage, then build the content-accuracy review mode as a vertical slice**

No application code yet.

---

## What's Done

### Track A — the collaboration tool

- **Design premise** — the two-track method, and why a wrapper app would be an unfalsifiable test of Armature
- **Process model** — three interacting lifecycles (assignment, item, thread); blocking vs. non-blocking severity as the loop terminator; the ID's four moves including the load-bearing decline path; upstream flagging as a settled stage
- **Review experience** — the seven-judgments claim; per-part × per-lens attestation; four lens modes as distinct surfaces; the clarity mode hiding the key and letting the SME answer the item; a 15-second-per-clean-item interaction budget
- **Rationale capture** — where design decisions actually live in an item; prompted rationale with a typed open vocabulary and a truthful null

### Track B — testing Armature

- **Fit Analysis 01** — five revisions. Reported nine Armature gaps; three survived scrutiny. Preserves its own errors rather than hiding them
- **What the graph should remember** — three kinds of data (exhaust, warrant, rationale); the membership test; process data vs. craft data

### Produced for Armature

Six ADRs drafted in the Armature repo, all `Proposed` except 0021:

| ADR | Subject |
|---|---|
| 0016 | Key strategy; no key may include a mutable field; `Response` key replaced |
| 0017 | `DesignRecord` abstract root; category as `@metadata` |
| 0018 | Item readiness on `AssessmentItem`, distinct from placement status |
| 0019 | Coverage accounts for item readiness |
| 0020 | `DesignFinding` — evidence-grounded concerns about artifacts |
| 0021 | Non-goal: Armature does not model practitioner performance (Accepted) |

Plus an amendment to Armature ADR-0010 recording complex item-type support as a deliberate deferral.

### This repo

- Structure, README, LICENSE (MIT, matching Armature), `.gitignore`, shared editor config
- `.claude/` context files; prompts copied from Armature
- Five CoQui ADRs (0001–0005)
- All design and fit-analysis documentation

---

## What's Next

**Immediate — decisions before code**

1. **Stack.** Next.js is the obvious default given Armature's demo app, but nothing is decided
2. **CoQui's store.** ADR-0002 establishes that one is needed; nothing specifies which
3. **Identifier convention.** Blocked on Armature ADR-0016 decision 5. Settle before storing the first anchor
4. **Auth.** Both stores reference the same people. Armature's `User` is designed but unimplemented — the cheapest blocker on either side

**Then — the first vertical slice**

Build **content-accuracy review** end to end: assignment → per-part attestation → threads → decline path → approval. It is the most demanding lens mode and the highest value. If per-part attestation survives contact with a real SME there, the other three modes are variations on a proven pattern.

**Test the interaction budget with a stopwatch before building all four modes.** The 15-second target is an assumption. If a real content-accuracy item takes 45 seconds, the model needs rethinking, not more modes.

---

## Active Decisions

- Two-track design method (ADR-0001) — the rule most easily violated
- CoQui owns its own persistence layer (ADR-0002)
- Assignment envelope is single-pass and is not a unit of approval (ADR-0003)
- Attestation is per (part × lens) and stays in CoQui (ADR-0004)
- Scope: items only, multiple choice first (ADR-0005)
- SME editing rights: comment + suggest, ID remains author of record
- The SME sees stated intent before judging it; hide only what the reviewer could supply themselves
- Prompt generously, store conservatively

---

## Blockers

None blocking design. Two blocking implementation: no auth (shared with Armature), no settled identifier convention.

---

## Notes for Next Session

The fit analysis and its revisions are worth reading before proposing anything to Armature. The failure mode they document — proposing hub requirements that originated in CoQui's own design — recurred three times and was never caught by self-review.

---

## Recent Sessions

### 2026-08-25

- Read and mapped the Armature repo
- Established the two-track design premise
- Designed the review process model and review experience (Track A)
- Ran Fit Analysis 01; revised it five times under challenge, withdrawing six of nine reported gaps
- Drafted six Armature ADRs and amended ADR-0010
- Initialised this repository and wrote all design documentation and CoQui ADRs 0001–0005
