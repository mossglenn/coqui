// OFFLINE ONLY. This module reads ground truth. It must never be imported by
// the prototype page — check-contract.js and the acceptance checks import it,
// nothing else. `corpus.js` does not, and must not.
//
// Why it exists, and why it is not a one-line `includes()`:
//
// Acceptance check 2 (README.md) says search a Stage 1 DOM for the key's text
// and for any `incorrectFeedback` substring, expecting zero hits. On eir-009
// that check fires on a correct render. Option A's feedback opens with the
// option's own text verbatim —
//
//   option A   "Problem - formulation and identifying the variables involved"
//   feedback   "Problem - formulation and identifying the variables involved
//               is least vulnerable in research."
//
// — and its tail restates the stem. A substring search finds the feedback in a
// projection that never carried it. The check has to look for what the
// feedback says BEYOND what the screen legitimately shows.

const WINDOW = 6; // words

export function normalise(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Everything a blind screen is entitled to show, as normalised word runs
// separated by a token no probe can straddle.
function renderedSurface(rawItem) {
  const parts = [rawItem.content.stem, rawItem.content.instruction || ''];
  for (const option of rawItem.content.options) parts.push(option.text);
  return parts.map(normalise).filter(Boolean).join(' ¶ ');
}

// The word runs in `text` that the rendered surface does not already contain.
// An empty result means the string says nothing the screen does not already
// say — there is no leak to test for, not that the test passed.
export function distinctiveRuns(text, surface, window = WINDOW) {
  const words = normalise(text).split(' ').filter(Boolean);
  const runs = [];
  for (let i = 0; i + window <= words.length; i += 1) {
    const run = words.slice(i, i + window).join(' ');
    if (!surface.includes(run)) runs.push(run);
  }
  return runs;
}

// Every string a Stage 1 render must not contain, per item.
// `kind` is "key" or "feedback"; `runs` is empty when the string is fully
// covered by the rendered surface, which the caller should report rather than
// silently count as a pass.
export function stage1Probes(rawItem) {
  const surface = renderedSurface(rawItem);
  const probes = [];

  for (const option of rawItem.content.options) {
    if (option.isCorrect === true) {
      // The key's *identity* is what leaks, and its text is on screen either
      // way. What must not appear is any marking of it — that is a DOM check
      // on attributes and classes, not a string search. Recorded here so the
      // acceptance check has the label to look for.
      probes.push({ kind: 'key', label: option.label, text: option.text, runs: [] });
    }
    if (option.incorrectFeedback) {
      probes.push({
        kind: 'feedback',
        label: option.label,
        text: option.incorrectFeedback,
        runs: distinctiveRuns(option.incorrectFeedback, surface)
      });
    }
  }

  return probes;
}
