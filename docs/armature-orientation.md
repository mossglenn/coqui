# Armature — Orientation

Reference notes on CoQui's dependency, taken from the Armature repo at commit `fb61af8`. Written so Armature context does not have to be re-derived each session.

**This is reference material, not a design input.** Read `design/design-premise.md` first — it decides how this gets used.

---

## What Armature is

Graph-based infrastructure for learning engineering. An open schema and API that preserves **design rationale in the relationships** between instructional artifacts. Current ID tools capture *what was built* and *how learners performed*, never *why the design decisions were made*.

Stated analogy: Git under text editors — a relational layer that makes provenance visible.

**Topology:**

```
CoQui (plugin) → Armature API → TerminusDB
```

The API is the boundary. Plugins never touch TerminusDB directly. This is both an architectural rule and a demo-narrative requirement.

## Repo layout

```
schema/schema.json          single source of truth (12 enums, ~24 classes)
schema/docs/adr/            ADR-0001 … ADR-0021
docs/demo-api.md            16-endpoint API spec (status: planned)
docs/SCHEMA_APPENDIX.md     GENERATED from schema.json
app/                        Next.js — API routes + (future) demo UI
  lib/terminusdb.ts           WOQLClient singleton
  lib/routeHelpers.ts         createGetHandler + handleTerminusError
  lib/types.ts                GENERATED — VALID_* arrays + interfaces
  lib/validate.ts             hand-rolled field validators
scripts/generate-types.js   schema.json → app/lib/types.ts
scripts/seed_data.js        69-doc demo course
docker/                     TerminusDB only; Next.js runs on host
```

## Schema shape

- `ArmatureDocument` (abstract) → `label`, `description?`, `createdBy?` — inherited by 13 primary artifact types
- `LearningEvidence` (abstract) → `LearningMetric` | `DescriptiveEvidence`
- **Junction documents**, Hash-keyed on their endpoint references: `NeedEvidenceLink`, `PrerequisiteRecord`, `ItemInstance`, `ModuleObjective`, `ActivityGroupMember`, `ModuleActivityLink`, `ModuleActivityGroupLink`
- Core spine: `Course → Module → Assessment → ItemInstance → AssessmentItem → Response`, with `LearningObjective` as the central node

Enums: BloomsLevel, ObjectiveState, ItemType, ItemStatus, EvidenceMethod, ObjectiveRole, CoverageStatus, ActivityType, PrerequisiteType, ConfidenceLevel, NeedPriority, DesignNoteCategory.

## Rules that constrain CoQui

1. **References, never owned subdocuments** (ADR-0002) — this is what makes item reuse across assessments possible
2. **Back-references live on children**; parents hold no arrays (ADR-0004). Every "list the children of X" is a filter query
3. **If a relationship carries data, it becomes a junction document** (ADR-0003)
4. **`ModuleObjective` is programmatic** — created by the API, never authored in UI. Coverage is computed (ADR-0007)
5. **No key may include a mutable field** (ADR-0016)
6. **Progressive formalization** (ADR-0010) — free-text rationale fields are intentional placeholders. Do not propose structuring them without evidence from real usage
7. **Framework/plugin boundary** — graph infrastructure → Armature; editing workflow, import/export, UI patterns → CoQui

## Types are generated

`app/lib/types.ts` is generated from `schema/schema.json`. Never edit it directly. After any schema change: `npm run generate:types`, then `npm run check:types`, and commit both files together.

## ADRs produced by CoQui's fit analysis

Drafted in the Armature repo, all `Proposed` except 0021:

| ADR | Subject |
|---|---|
| 0016 | Key strategy; no key may include a mutable field |
| 0017 | `DesignRecord` abstract root; category as `@metadata` |
| 0018 | Item readiness on `AssessmentItem` |
| 0019 | Coverage accounts for item readiness |
| 0020 | `DesignFinding` |
| 0021 | Non-goal: no practitioner performance data (Accepted) |

Plus an amendment to ADR-0010 deferring complex item-type support.

## Open questions in Armature that affect CoQui

- **API location.** PROJECT_CONTEXT says "separate API service, not Next.js routes" — the implementation is Next.js routes in `armature/app`. Unresolved
- **Coverage algorithm.** What makes a status `FullyAssessed` vs `PartiallyAssessed` is still undefined
- **Identifier convention.** Two coexist; ADR-0016 decision 5 proposes settling it
- **Auth.** Designed (ADR-0015), unimplemented. Blocks meaningful attribution on both sides
- **API surface.** GET and POST only, unfiltered and unpaginated. CoQui is an editing tool
