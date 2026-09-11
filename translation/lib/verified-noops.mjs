// The human-authored exception list for Direction 2 of the invariant check.
//
// Direction 2 refuses to let a translation's recorded source advance while the
// translation file stands still, because that is how a stale translation gets
// marked current. It is the right default and it must stay.
//
// But it also traps a real, legitimate case: a translation that is ALREADY
// correct for the new English. It arises when one commit edits the English and
// its translations together and records the pass only in `tool`, leaving `src`
// behind — Direction 1 is satisfied, so nothing complains, but every entry is
// now out of date against a change its own translation already contains. A later
// run re-translates, finds nothing to alter, and the record can never be
// settled, so the page is offered again in every window, forever, producing
// nothing. 9dcac0e4 did exactly that to 72 entries across four pages. Two pages
// later drifted into a run that produced some other difference, which settled
// them; of the 36 on the two Akash pages, 16 settled the same way and the
// remaining 20 had nothing left to differ. Those 20 are the lines in
// translation/verified-noops.txt.
//
// WHY A SEPARATE FILE, AND NOT A FIELD IN THE MANIFEST.
// The pipeline writes the manifest. If the same pipeline could also write "I
// checked, this one is fine", it would be marking its own homework: one bug
// writes both halves and the check waves it through. The point of an exception
// is that somebody else agrees. So the exception lives here, in a file a human
// edits by hand, and Direction 2 requires the manifest and this file to agree.
//
// Be exact about the strength of that: no sync pass has any reason to touch this
// file, so a pipeline defect does not add itself to the list by accident. It is
// not PREVENTED from doing so — that would take a CODEOWNERS rule, which does not
// exist yet. This buys a deliberate, reviewable statement, not enforcement.
//
// Each line names the EXACT English version it is about, so it expires on its
// own: when that page's English changes again the hash no longer matches, the
// line stops applying, and the page returns to normal handling. It can never
// become a standing "ignore this page".
//
//     # comments and blank lines are allowed
//     it/guides/Akash_Network_Zcashd.md  sha256:<english>  sha256:<translation>
//
// A line names BOTH sides of what was checked: the English it was verified
// against, and the translation that was found already correct for it. That is
// what makes the statement self-contained — and it is what lets a person approve
// a page BEFORE the automation gets to it, which is the natural order when the
// pipeline opens its own pull requests. The authorisation holds exactly while the
// state it describes holds: change either side and it stops applying, because it
// no longer describes anything that exists.
//
// Absent file, or empty, means no exceptions — exactly today's behaviour.

const SHA = /^sha256:[0-9a-f]{64}$/;

/**
 * Parse the allowlist. Returns { entries: Map<"loc/page", sha>, errors: [...] }.
 * Errors are formatting problems a human should fix; the caller decides how loud
 * to be about them. Parsing never throws on bad input.
 */
export function parseVerifiedNoops(text) {
  const entries = new Map();
  const errors = [];
  const lines = String(text ?? "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    if (parts.length !== 3) {
      errors.push(`line ${i + 1}: expected "<locale>/<page> <english sha256> <translation sha256>", got "${line}"`);
      continue;
    }
    const [key, sha, trans] = parts;
    if (!SHA.test(sha)) {
      errors.push(`line ${i + 1}: english hash "${sha}" is not a sha256:<64 hex> hash`);
      continue;
    }
    if (!SHA.test(trans)) {
      errors.push(`line ${i + 1}: translation hash "${trans}" is not a sha256:<64 hex> hash`);
      continue;
    }
    if (!key.includes("/") || key.startsWith("/") || key.endsWith("/")) {
      errors.push(`line ${i + 1}: "${key}" is not a <locale>/<page> key`);
      continue;
    }
    if (entries.has(key)) {
      // Two lines for one page cannot both be current, and silently keeping the
      // last would make the file's meaning depend on its order.
      errors.push(`line ${i + 1}: duplicate entry for "${key}"`);
      continue;
    }
    entries.set(key, { src: sha, translation: trans });
  }
  return { entries, errors };
}

/**
 * May this entry's source advance without its translation changing?
 *
 * Every condition must hold at once:
 *   - a human listed this exact page,
 *   - against this exact source hash,
 *   - which is genuinely the English on disk right now (not a hash of nothing),
 *   - the translation is still exactly the one that was looked at,
 *   - and the page is open to automated sync now AND at base, so nothing that
 *     was being deliberately held can be settled by the same change.
 */
export function noopAllowed({ entry, baseEntry, listed, currentSourceHash, currentTranslationHash }) {
  if (!entry || !listed) return false;
  // `edited:true` holds a page out of automated sync, so nothing ever re-ran on
  // it. Required BOTH now and at base: otherwise one change can flip the flag to
  // false, bump the source and take the exception in the same breath, settling a
  // page that was deliberately being held.
  if (entry.edited !== false) return false;
  if (baseEntry && baseEntry.edited !== false) return false;
  if (typeof entry.src !== "string") return false;
  // Both sides of the statement must still be true. Pinning the TRANSLATION is
  // what makes a stale line harmless without needing to know whether it is new:
  // if the translation has moved on since a person looked at it, the line stops
  // describing anything real — while still letting an approval be granted ahead
  // of time.
  //
  // Be exact about what that does and does not rule out. A line grants whenever
  // the tree matches BOTH hashes again, whenever that happens. If the English
  // wanders away and comes back, and the translation is also back to the text
  // that was approved for it, the line applies again — and it should, because the
  // statement a person made ("this translation is right for that English") is
  // true of exactly those bytes. What is excluded is the source returning to a
  // listed value while the translation has moved on, which is the replay that
  // mattered.
  if (listed.src !== entry.src) return false;
  if (entry.src !== currentSourceHash) return false;
  return listed.translation === currentTranslationHash;
}
