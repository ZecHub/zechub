// Equivalent forms of a protected term.
//
// Some protected terms are the same word in two shapes — a singular and its
// plural. Whether an English loanword takes an -s is a decision each language
// makes for itself, not one English makes for it: Italian writes "gli Unified
// Address" because Italian does not pluralize borrowed nouns, and Japanese,
// Korean and Chinese do not inflect plurals at all. Demanding one exact shape
// therefore forces English grammar into 18 languages that do not share it, to
// assert a term the other shape already carries.
//
// So a translation may satisfy a protected term with any form declared
// equivalent to it. The pairing is DECLARED, never inferred from spelling.
// Deriving it by stripping a trailing "s" would make `Argos` interchangeable
// with `Argo` and `zec.rocks` with `zec.rock` — different things that merely
// look related — and would silently miss irregular plurals such as
// `Technologies` / `Technology`. A maintainer states which forms are the same
// word; the checker never guesses.
//
// Shape in translation/protected-terms.json (the key is optional):
//
//   "equivalentForms": [
//     ["ZK-SNARK", "ZK-SNARKs"]
//   ]
//
// Membership is symmetric by construction: the group says "these are one
// term", so any member asserts it. This module is pure — no filesystem, no
// process, no clock — so it can be unit tested directly.

export class TermFormsError extends Error {}

/**
 * Build a lookup of term -> Set of forms that satisfy it.
 *
 * Every group is validated against the protected list, and every failure is
 * loud. A malformed group that was quietly ignored would weaken the gate in
 * exactly the way nobody would notice.
 *
 * @param {string[]} terms  the preserveVerbatim list
 * @param {string[][]} groups  the equivalentForms list (may be undefined)
 * @returns {Map<string, Set<string>>}
 */
export function buildEquivalence(terms, groups) {
  const protectedSet = new Set(terms);
  const map = new Map();
  if (groups === undefined) return map;

  if (!Array.isArray(groups)) {
    throw new TermFormsError("equivalentForms must be an array of groups");
  }

  const seen = new Map(); // term -> index of the group that already claimed it
  groups.forEach((group, i) => {
    if (!Array.isArray(group) || group.length < 2) {
      throw new TermFormsError(
        `equivalentForms[${i}]: a group needs at least two terms`,
      );
    }
    if (new Set(group).size !== group.length) {
      throw new TermFormsError(`equivalentForms[${i}]: contains a duplicate`);
    }
    for (const term of group) {
      // Reject anything that is not a clean, non-blank string. A blank or
      // padded entry is the one shape that could do real damage: paired with a
      // junk entry in preserveVerbatim, a term of " " matches nearly every
      // page and would silently satisfy whatever it was grouped with.
      if (typeof term !== "string" || !term.trim() || term.trim() !== term) {
        throw new TermFormsError(
          `equivalentForms[${i}]: entries must be non-empty strings without surrounding whitespace`,
        );
      }
      if (!protectedSet.has(term)) {
        // Otherwise a typo would create a group that silently relaxes nothing,
        // or worse, relaxes a term nobody protects.
        throw new TermFormsError(
          `equivalentForms[${i}]: "${term}" is not in preserveVerbatim`,
        );
      }
      if (seen.has(term)) {
        throw new TermFormsError(
          `equivalentForms[${i}]: "${term}" is already in group ${seen.get(term)}`,
        );
      }
      seen.set(term, i);
    }
    const forms = new Set(group);
    for (const term of group) map.set(term, forms);
  });

  return map;
}

/**
 * The forms that satisfy `term`, always including the term itself first so the
 * common case costs a single test.
 *
 * @param {string} term
 * @param {Map<string, Set<string>>} equivalence
 * @returns {string[]}
 */
export function formsFor(term, equivalence) {
  const group = equivalence.get(term);
  if (!group) return [term];
  return [term, ...[...group].filter((f) => f !== term)];
}
