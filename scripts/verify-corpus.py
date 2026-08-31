#!/usr/bin/env python3
"""Verify the ethics-in-research corpus against the invariants corpus/README.md claims for it.

Run from the repo root:   python3 scripts/verify-corpus.py

Exits non-zero on the first failed invariant, with the check name and the offending item.
Nothing here is advisory: every check below corresponds to a sentence in corpus/README.md or
in the corpus files' own `conventions` block. If a check is wrong, the rule it encodes is wrong.
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CLEAN = ROOT / "corpus" / "ethics-in-research.json"
DEFECTS = ROOT / "corpus" / "ethics-in-research-defects.json"

# ---------------------------------------------------------------- known exceptions
# Recorded rather than silenced. Each entry is a string the corpus carries that the
# invariant below would otherwise reject, with the reason it is tolerated.
KNOWN_UNTRACEABLE = {
    ("eir-007", "E"): (
        "Feedback does not appear in the item's sourceRationale, which never mentions "
        "collaboration. The item's extractionFlags say the source addressed option E "
        "individually, so the likeliest cause is a short rationale slice rather than an "
        "invented string - unconfirmable without the source PDF. eir-007 is excluded from "
        "the session pool, so nothing downstream depends on it. See "
        "docs/journal/2026-08-corpus-assembly.md."
    ),
}

# Which declaration key in defect.was/now licenses which changed content path.
DECLARATION_LICENSES = {
    "stem": lambda p: p == "stem",
    "instruction": lambda p: p == "instruction",
    "correct": lambda p: p.endswith(".isCorrect"),
    "options": lambda p: p.startswith("options["),
}

QUOTES = str.maketrans({"’": "'", "‘": "'", "“": '"', "”": '"',
                        "–": "-", "—": "-", " ": " "})

failures = []

def norm(s):
    return re.sub(r"\s+", " ", (s or "").translate(QUOTES)).strip()

def sentences(s):
    return [x.strip() for x in re.split(r"(?<=[.:?])\s+", norm(s)) if x.strip()]

def check(cond, name, detail=""):
    if not cond:
        failures.append(f"{name}: {detail}")
    return cond

def content_diff(a, b):
    """Changed paths between two `content` blocks, as dotted paths."""
    paths = []
    for k in ("stem", "instruction"):
        if a.get(k) != b.get(k):
            paths.append(k)
    ao, bo = a["options"], b["options"]
    if len(ao) != len(bo):
        paths.append("options[length]")
    for i, (x, y) in enumerate(zip(ao, bo)):
        for k in ("label", "text", "isCorrect", "incorrectFeedback"):
            if x.get(k) != y.get(k):
                paths.append(f"options[{i}].{k}")
    return paths


def main():
    raw = CLEAN.read_text()
    clean = json.loads(raw)
    defects = json.loads(DEFECTS.read_text())

    # 1. The file is canonically formatted, so a diff shows content changes and nothing else.
    check(json.dumps(clean, indent=2, ensure_ascii=False) + "\n" == raw,
          "canonical-formatting",
          "ethics-in-research.json is not json.dumps(indent=2, ensure_ascii=False)")

    items = clean["items"]
    by_id = {}

    # 2. Item identity and shape.
    for it in items:
        iid = it["id"]
        check(re.fullmatch(r"eir-\d{3}", iid), "id-format", iid)
        check(iid not in by_id, "id-unique", iid)
        by_id[iid] = it
        opts = it["content"]["options"]
        check(it["optionCount"] == len(opts), "option-count", iid)
        check(len({o["label"] for o in opts}) == len(opts), "label-unique", iid)
        check(len({o["text"] for o in opts}) == len(opts), "text-unique", iid)
        check(it.get("optionOrder", "arbitrary") in ("arbitrary", "meaningful"),
              "option-order-vocabulary", f"{iid} declares optionOrder={it.get('optionOrder')!r}")
        if it.get("optionOrder") == "meaningful":
            check(bool(it.get("optionOrderNote")), "option-order-argued",
                  f"{iid} is exempt from permutation with no optionOrderNote saying why")
        n_correct = sum(bool(o["isCorrect"]) for o in opts)
        if it["shape"] == "multiple_choice":
            check(n_correct == 1, "mc-one-key", f"{iid} has {n_correct}")
        else:
            check(n_correct >= 1, "has-a-key", iid)

    # 3. Feedback is lifted, never authored: every sentence traces to the item's own rationale.
    #    Traceability is per-sentence after whitespace and quote normalization - the rationales
    #    are line-wrapped, and feedback is assembled from several bullets under one heading.
    n_fb = 0
    for it in items:
        rationale = norm(it.get("sourceRationale"))
        for o in it["content"]["options"]:
            fb = o.get("incorrectFeedback")
            if fb is None:
                continue
            n_fb += 1
            traced = all(s.rstrip(".") in rationale for s in sentences(fb))
            key = (it["id"], o["label"])
            if key in KNOWN_UNTRACEABLE:
                check(not traced, "known-exception-stale",
                      f"{key} now traces - remove it from KNOWN_UNTRACEABLE")
            else:
                check(traced, "feedback-traceable", f"{it['id']} option {o['label']}")

    # 4. Declared shape counts match the items.
    counted = {}
    for it in items:
        counted[it["shape"]] = counted.get(it["shape"], 0) + 1
    check(clean["shapeCounts"] == counted, "shape-counts",
          f"declared {clean['shapeCounts']} vs actual {counted}")

    # 5. Every item names a source that exists.
    extra = {s["id"] for s in clean.get("additionalSources", [])}
    for it in items:
        src = it.get("sourceRef", {}).get("source")
        check(src is None or src in extra, "source-known", f"{it['id']} -> {src}")

    # 6. The defect patch. This is the deep-diff corpus/README.md promises: every difference
    #    between a defective item and its clean counterpart must be licensed by the defect
    #    record's own declaration. An undeclared edit is the failure this check exists for.
    seen_types = set()
    for it in defects["items"]:
        iid = it["id"]
        if not check(iid in by_id, "defect-item-exists", iid):
            continue
        d = it["defect"]
        seen_types.add(d["type"])
        check(d["type"] in defects["defectTypes"], "defect-type-known", f"{iid} {d['type']}")
        for field in ("why", "expectedSignal", "countsAsCaught", "origin"):
            check(bool(d.get(field)), "defect-record-complete", f"{iid} missing {field}")

        # Ground-truth rules name options by SOURCE label, because the session builder permutes
        # option order and re-letters for presentation. A rule naming a slot or a display letter
        # would name a different option in the session than it names here.
        source_labels = {o["label"] for o in by_id[iid]["content"]["options"]}
        for lab, why in (d.get("optionRefs") or {}).items():
            check(lab in source_labels, "option-ref-exists",
                  f"{iid} optionRefs '{lab}' is not a source label of that item")
            check(bool(why), "option-ref-explained", f"{iid} optionRefs '{lab}' has no reason")
        for side in ("was", "now"):
            for lab in (d.get(side) or {}).get("correct", []):
                check(lab in source_labels, "correct-set-source-label",
                      f"{iid} {side}.correct names '{lab}', not a source label of that item")

        changed = content_diff(by_id[iid]["content"], it["content"])
        declared = set((d.get("now") or {}).keys()) | set((d.get("was") or {}).keys())

        if d["origin"] == "pre-existing":
            check(not changed and not declared, "pre-existing-unmodified",
                  f"{iid} declares {sorted(declared)} and changes {changed}")
            continue

        check(bool(declared), "planted-declares-something", iid)
        for path in changed:
            licensed = any(k in DECLARATION_LICENSES and DECLARATION_LICENSES[k](path)
                           for k in declared)
            check(licensed, "undeclared-edit",
                  f"{iid} changed {path}, declared only {sorted(declared)}")
        for k in declared:
            check(k in DECLARATION_LICENSES, "declaration-vocabulary", f"{iid} declares '{k}'")
            if k in DECLARATION_LICENSES:
                check(any(DECLARATION_LICENSES[k](p) for p in changed), "declaration-unrealised",
                      f"{iid} declares '{k}' but nothing matching changed")

    # 7. One defect per type, all four types present.
    check(seen_types == set(defects["defectTypes"]), "defect-type-coverage",
          f"missing {set(defects['defectTypes']) - seen_types}")
    check(len(defects["items"]) == len(defects["defectTypes"]), "one-defect-per-type",
          f"{len(defects['items'])} items, {len(defects['defectTypes'])} types")

    # 8. Recorded craft defects point at items that exist.
    for iid in defects.get("knownCraftDefects", {}).get("items", []):
        check(iid in by_id, "craft-defect-item-exists", iid)

    n = len(items)
    if failures:
        print(f"FAIL — {len(failures)} of the invariants below do not hold\n")
        for f in failures:
            print("  ✗", f)
        return 1
    print(f"PASS — {n} items, {n_fb} feedback strings, "
          f"{len(defects['items'])} defect records, "
          f"{len(KNOWN_UNTRACEABLE)} recorded exception(s)")
    for (iid, lab) in KNOWN_UNTRACEABLE:
        print(f"       recorded exception: {iid} option {lab} (see KNOWN_UNTRACEABLE)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
