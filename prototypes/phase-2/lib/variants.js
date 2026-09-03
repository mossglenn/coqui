// Phase 2 — the Stage-2 claim block, per variant.
//
// This is the ONLY thing the fork varies (review-motion-fork.md §Where the
// fork lives). The shell renders bands 1 and 2 and hands band 3 to the
// renderer registered here.
//
// Build order steps 3-5: A sequential, then D asymmetric, then B survey.
// Until each is written, `claimBlockFor` returns null and the shell renders a
// walkable scaffold that is labelled as one — so the shell can be exercised
// end to end without inventing a fourth motion.

import { sequentialClaimBlock } from './variant-a.js';

const RENDERERS = {
  A: sequentialClaimBlock, // sequential — built 2026-09-03
  D: null,                 // asymmetric — step 4
  B: null                  // survey     — step 5
};

export function claimBlockFor(variant) {
  return RENDERERS[variant] ?? null;
}

export function register(variant, renderer) {
  RENDERERS[variant] = renderer;
}
