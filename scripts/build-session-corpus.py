#!/usr/bin/env python3
"""Assemble the Phase 6 session corpus from the master corpus and the sealed defect patch.

    python3 scripts/build-session-corpus.py              # twelve items, 8 clean / 4 defective
    python3 scripts/build-session-corpus.py --variant fourteen

Writes two files to corpus/session/, both GENERATED - never hand-edited:

    items-blind.json   what the fixture renders. Stem, instruction and option text only.
    answer-key.json    sealed. Keys, defect records, and each defect's countsAsCaught.

The split is structural on purpose. corpus/README.md moved the blind-review guarantee out of the
master record and into whatever renders an item, and review-motion-fork.md records the risk that a
fixture reading `content` straight into a template destroys the blind-answer stage silently. A
fixture that can only load items-blind.json cannot make that mistake. This is not a return to the
retired presented/sealed split: nothing here is a second hand-maintained view of the item, it is a
strict projection, regenerated from the master record every time.

Refuses to run unless scripts/verify-corpus.py passes.
"""
import argparse, json, pathlib, random, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CLEAN = ROOT / "corpus" / "ethics-in-research.json"
DEFECTS = ROOT / "corpus" / "ethics-in-research-defects.json"
OUT = ROOT / "corpus" / "session"

# ------------------------------------------------------------------ selection [proposed]
EXCLUDED = {
    "eir-006": "Superlative stem; per-option marking is ill-posed under the MultipleSelect conversion.",
    "eir-007": "India-specific regulatory content; a reviewer outside Indian higher education cannot judge any option.",
    "eir-010": "A second pre-existing defensible-distractor defect, held in reserve as a swap for eir-011.",
    "eir-012": "Assertion-reason; no CoQui item type fits.",
}

# Phase 1 asks for 12 at 8 clean / 4 defective. The pool holds 14 at 10/4, so two clean
# MultipleSelect items are benched. Which two matters: eir-013 and eir-014 carry the known
# valence cueing, so benching one cued and one craft-clean item keeps both properties in the
# session. [proposed] - the alternative is running all fourteen at 10/4.
BENCHED = {
    "eir-003": "Clean MultipleSelect, craft-clean. Benched to hold Phase 1's 8/4.",
    "eir-013": "Clean MultipleSelect, carries known valence cueing. Benched as the cued half of the pair.",
}

# ------------------------------------------------------------------ ordering [proposed]
ORDER_SEED = 20260831
ORDER_CONSTRAINTS = {
    "first-item-clean":
        "A reviewer's first item calibrates them. Opening on a defect teaches the prior that "
        "items are broken, which is the opposite of what the confirming-is-cheap thesis needs.",
    "no-two-defects-adjacent":
        "Consecutive defects read as a corpus that is broken rather than as items that are.",
    "defect-in-each-half":
        "A session whose defects cluster in one half measures fatigue as much as detection.",
    "twins-not-adjacent":
        "eir-017 and eir-018 share three of four options. Adjacent, the second is a memory test; "
        "separated, the repetition is something a craft reviewer may or may not notice.",
    "no-two-multiselect-adjacent":
        "MultipleSelect costs n productions where MultipleChoice costs one. Clustering them "
        "front-loads the session's cost and confounds Phase 4's per-type comparison.",
}


def ordering_ok(seq, defective, shapes):
    if seq[0]["id"] in defective:
        return False
    pos = [i for i, it in enumerate(seq) if it["id"] in defective]
    if any(b - a == 1 for a, b in zip(pos, pos[1:])):
        return False
    half = len(seq) / 2
    if not (any(p < half for p in pos) and any(p >= half for p in pos)):
        return False
    ids = [it["id"] for it in seq]
    if "eir-017" in ids and "eir-018" in ids:
        if abs(ids.index("eir-017") - ids.index("eir-018")) == 1:
            return False
    ms = [i for i, it in enumerate(seq) if shapes[it["id"]] == "multiple_select"]
    if any(b - a == 1 for a, b in zip(ms, ms[1:])):
        return False
    return True


def project_blind(item):
    """The reviewer-facing view. Whitelist, never blacklist - a new field on the master
    record must be opted in here deliberately, not leak because nobody removed it."""
    c = item["content"]
    out = {
        "id": item["id"],
        "shape": item["shape"],
        "coquiType": item["coquiType"],
        "optionCount": item["optionCount"],
        "stem": c["stem"],
        "options": [{"label": o["label"], "text": o["text"]} for o in c["options"]],
    }
    if c.get("instruction"):
        out["instruction"] = c["instruction"]
    return out


FORBIDDEN = {"isCorrect", "incorrectFeedback", "correct", "correctLabels", "defect",
             "plantedDefect", "condition", "sourceRationale", "answer", "key"}


def assert_blind(node, path="root"):
    if isinstance(node, dict):
        for k, v in node.items():
            assert k not in FORBIDDEN, f"blind projection leaks '{k}' at {path}"
            assert_blind(v, f"{path}.{k}")
    elif isinstance(node, list):
        for i, v in enumerate(node):
            assert_blind(v, f"{path}[{i}]")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--variant", choices=["twelve", "fourteen"], default="twelve")
    args = ap.parse_args()

    rc = subprocess.run([sys.executable, str(ROOT / "scripts" / "verify-corpus.py")],
                        cwd=ROOT).returncode
    if rc != 0:
        print("\nrefusing to build: the corpus does not verify", file=sys.stderr)
        return rc

    clean = json.loads(CLEAN.read_text())
    defects = json.loads(DEFECTS.read_text())
    master = {i["id"]: i for i in clean["items"]}
    patch = {i["id"]: i for i in defects["items"]}

    benched = dict(BENCHED) if args.variant == "twelve" else {}
    pool = [i for i in clean["items"] if i["id"] not in EXCLUDED and i["id"] not in benched]

    # Substitute the defective content for its clean counterpart.
    session = []
    for it in pool:
        if it["id"] in patch:
            merged = dict(it)
            merged["content"] = patch[it["id"]]["content"]
            merged["condition"] = "defective"
            merged["defect"] = patch[it["id"]]["defect"]
            session.append(merged)
        else:
            session.append(dict(it))

    defective = {i["id"] for i in session if i.get("condition") == "defective"}
    shapes = {i["id"]: i["shape"] for i in session}
    craft = set(defects.get("knownCraftDefects", {}).get("items", []))

    n_clean = len(session) - len(defective)
    if args.variant == "twelve":
        assert (len(session), n_clean, len(defective)) == (12, 8, 4), \
            f"expected 12 at 8/4, got {len(session)} at {n_clean}/{len(defective)}"

    rng = random.Random(ORDER_SEED)
    for attempt in range(1, 200001):
        rng.shuffle(session)
        if ordering_ok(session, defective, shapes):
            break
    else:
        raise SystemExit("no ordering satisfies the declared constraints")

    blind = [dict(project_blind(it), position=n) for n, it in enumerate(session, 1)]
    assert_blind(blind)
    for b, it in zip(blind, session):
        assert [o["label"] for o in b["options"]] == [o["label"] for o in it["content"]["options"]]
        assert [o["text"] for o in b["options"]] == [o["text"] for o in it["content"]["options"]]

    # Session-level diagnostics: properties of the assembled set that no single item shows.
    # Computed, not asserted - they change with the selection and must not be written by hand.
    # MultipleChoice only: position can cue where exactly one option is the key. Under
    # MultipleSelect the reviewer marks every option, so key position carries no signal.
    mc = [i for i in session if i["shape"] == "multiple_choice"]
    key_positions = {}
    for it in mc:
        for slot, o in enumerate(it["content"]["options"], 1):
            if o["isCorrect"]:
                key_positions[slot] = key_positions.get(slot, 0) + 1
    widest = max((i["optionCount"] for i in mc), default=0)
    unused = [n for n in range(1, widest + 1) if n not in key_positions]
    shared = {}
    for i, a in enumerate(session):
        for bb in session[i + 1:]:
            common = {o["text"] for o in a["content"]["options"]} & \
                     {o["text"] for o in bb["content"]["options"]}
            if len(common) >= 3:
                shared[f"{a['id']}/{bb['id']}"] = sorted(common)

    diagnostics = {
        "what": "Properties of the assembled session that no single item shows. A reviewer sees "
                "the set, not the items, and the set can cue in ways none of its members do.",
        "scope": f"{len(mc)} MultipleChoice items; MultipleSelect excluded because marking "
                 "every option leaves key position without a signal.",
        "keyPositionCounts": dict(sorted(key_positions.items())),
        "unusedKeyPositions": unused,
        "positionCue": (
            f"The key never falls in option position {unused} in this session. A reviewer who "
            "notices can narrow every item without reading it, which would inflate blind-stage "
            "accuracy and suppress the correct-but-unsure signal the stage exists to collect. "
            "Inherited from the sources - option order is verbatim and this script does not "
            "reorder options."
        ) if unused else "Key positions cover every slot; no positional cue.",
        "sharedOptionSets": shared or "no pair shares three or more option texts",
    }

    stamp = {
        "generated": "scripts/build-session-corpus.py",
        "generatedFrom": ["corpus/ethics-in-research.json", "corpus/ethics-in-research-defects.json"],
        "variant": args.variant,
        "orderSeed": ORDER_SEED,
        "warning": "GENERATED FILE - never hand-edited. Change the master corpus or this script "
                   "and regenerate; an edit here is silently discarded on the next build.",
    }

    OUT.mkdir(exist_ok=True)
    (OUT / "items-blind.json").write_text(json.dumps({
        **stamp,
        "purpose": "The reviewer-facing projection for the Phase 6 content-review session. "
                   "Stem, instruction and option text only.",
        "guarantee": "This file contains no marking and no feedback. A fixture that loads only "
                     "this file cannot leak the author's answer, which is what claims.md's "
                     "blind-answer stage depends on. The answer key is a separate, sealed file.",
        "itemCount": len(blind),
        "items": blind,
    }, indent=2, ensure_ascii=False) + "\n")

    (OUT / "answer-key.json").write_text(json.dumps({
        **stamp,
        "sealed": "GROUND TRUTH. Phase 1 keeps this sealed until the session is over. Every "
                  "`countsAsCaught` is pre-registered - written before Phase 6 runs, so that what "
                  "counts as detection is not decided by looking at the result.",
        "composition": {
            "items": len(session), "clean": n_clean, "defective": len(defective),
            "byShape": {s: sum(1 for i in session if i["shape"] == s) for s in sorted(shapes.values())},
            "cleanMultipleChoice": sorted(i["id"] for i in session
                                          if i["shape"] == "multiple_choice"
                                          and i.get("condition") != "defective"),
        },
        "selection": {
            "excluded": EXCLUDED,
            "benched": benched or "none - running the full pool at 10/4",
            "status": "[proposed] - the bench holds Phase 1's 8/4; the alternative is fourteen at 10/4",
        },
        "ordering": {"seed": ORDER_SEED, "constraints": ORDER_CONSTRAINTS,
                     "status": "[proposed]", "sequence": [i["id"] for i in session]},
        "sessionDiagnostics": diagnostics,
        "gateAmendment": defects["gateAmendment"],
        "defectTypes": defects["defectTypes"],
        "knownCraftDefects": defects.get("knownCraftDefects"),
        "items": [{
            "position": n, "id": it["id"], "shape": it["shape"],
            "condition": it.get("condition", "clean"),
            "correctLabels": [o["label"] for o in it["content"]["options"] if o["isCorrect"]],
            "correctTexts": [o["text"] for o in it["content"]["options"] if o["isCorrect"]],
            "knownCraftDefect": it["id"] in craft,
            "defect": it.get("defect"),
            "content": it["content"],
        } for n, it in enumerate(session, 1)],
    }, indent=2, ensure_ascii=False) + "\n")

    print(f"\nbuilt {args.variant}: {len(session)} items, {n_clean} clean / {len(defective)} defective")
    print("order:", " ".join(("*" if i["id"] in defective else " ") + i["id"] for i in session))
    print("       (* = defective)")
    if unused:
        print(f"diagnostic: key never in option position {unused} - recorded in the answer key")
    for pair, common in (shared.items() if isinstance(shared, dict) else []):
        print(f"diagnostic: {pair} share {len(common)} option texts")
    print("wrote corpus/session/items-blind.json and corpus/session/answer-key.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
