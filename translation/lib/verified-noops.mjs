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
// nothing. 9dcac0e4 did exactly that to 36 entries on two pages; 20 of them are
// still stuck.
//
// WHY A SEPARATE FILE, AND NOT A FIELD IN THE MANIFEST.
// The pipeline writes the manifest. If the same pipeline could also write "I
// checked, this one is fine", it would be marking its own homework: one bug
// writes both halves and the check waves it through. The point of an exception
// is that somebody else agrees. So the exception lives here, in a file a human
// edits by hand, and Direction 2 requires the manifest and this file to agree.
// A pipeline defect cannot add itself to this list.
//
// Each line names the EXACT English version it is about, so it expires on its
// own: when that page's English changes again the hash no longer matches, the
// line stops applying, and the page returns to normal handling. It can never
// become a standing "ignore this page".
//
//     # comments and blank lines are allowed
//     it/guides/Akash_Network_Zcashd.md  sha256:<64 hex>
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
    if (parts.length !== 2) {
      errors.push(`line ${i + 1}: expected "<locale>/<page> <sha256:...>", got "${line}"`);
      continue;
    }
    const [key, sha] = parts;
    if (!SHA.test(sha)) {
      errors.push(`line ${i + 1}: "${sha}" is not a sha256:<64 hex> hash`);
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
    entries.set(key, sha);
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
 *   - the line is NEW in this change, so each authorisation is used once,
 *   - and the page is open to automated sync now AND at base, so nothing that
 *     was being deliberately held can be settled by the same change.
 */
export function noopAllowed({ entry, baseEntry, listed, listedInBase, currentSourceHash }) {
  if (!entry || !listed) return false;
  // SINGLE USE. The authorisation is consumed by the pull request that introduces
  // it. A line already present in the base has done its work and must never
  // authorise a second, different transition — otherwise a leftover line is a
  // standing permit: let the source move away and later return to the listed
  // value (a revert is enough, no hash collision required) and the old line would
  // bless a translation made for something else.
  if (listedInBase === listed) return false;
  // `edited:true` holds a page out of automated sync, so nothing ever re-ran on
  // it. Required BOTH now and at base: otherwise one change can flip the flag to
  // false, bump the source and take the exception in the same breath, settling a
  // page that was deliberately being held.
  if (entry.edited !== false) return false;
  if (baseEntry && baseEntry.edited !== false) return false;
  if (typeof entry.src !== "string") return false;
  return listed === entry.src && entry.src === currentSourceHash;
}
