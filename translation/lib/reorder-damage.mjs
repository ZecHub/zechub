// Damage a model leaves when it REORDERS a sentence around masked spans.
//
// The translation runner hides protected names, link openers "[" and link
// closers "](url)" behind placeholder tokens (⟦Q0⟧, ⟦Q1⟧, ...) before the
// model sees a block, and puts the original text back afterwards. The tokens
// are opaque to the model, so when the target language needs a different word
// order it moves them around as units. Two kinds of damage reached main that
// way with every other gate green (ZecHub/zechub#2427, Greek review):
//
//   * glued-name — the token is restored with no space next to a word of a
//     space-separated non-Latin script: «[ZcashΠορτοφόλια του οικοσυστήματος]»,
//     «[ZebraΠλήρης κόμβος]», «[Zakuraузел]», «[Zalletالمرجع السريع]».
//     The English "[Zcash Ecosystem Wallets]" is masked as "⟦Q0⟧⟦Q1⟧ Ecosystem
//     Wallets⟦Q2⟧", and the space between a token and the next word is the
//     one thing the model is free to drop.
//   * a link opener "[" moved away from its closer "](url)":
//       - orphan-link-close: «Ο οδηγός ZecHubΠώς να ... Phantom](/using-zcash/solswap)
//         του [ καλύπτει» — the "]( " has no "[" before it on the line, so the
//         reader sees the raw bracket and URL;
//       - label-leading-space: «διαδικασία διακυβέρνησης[ του ](…)» — the
//         brackets still pair up, so every count-based check passes, but the
//         opener landed in front of the space before a function word.
//
// Bracket COUNTS stay equal in both link cases, which is why check-invariants
// and the runner's markup gate passed them. These rules look at ORDER.
//
// Every rule is compared with the English page (a defect shape the English
// has itself is not a translation error) and, in CI, with the page at the
// merge base (damage already on main is a notice, not a failure).

// Locales written in a script that separates words with spaces and is not
// Latin. A Latin letter directly against a letter of that script is never
// correct there. CJK (ja, ko, zh) and Thai are deliberately absent: their
// text runs into Latin names without a space as a matter of course ("Zcashを",
// "Zcash 지갑" and "Zcash钱包" are all normal), so the rule would be noise.
// A Latin-script locale is absent too: Akan writes Greek-looking ε/ͻ inside
// Latin words, which is its orthography, not damage.
// Add a new locale here when it is written in one of these scripts.
export const SPACED_SCRIPT = Object.freeze({
  el: "Greek",
  ru: "Cyrillic", uk: "Cyrillic", bg: "Cyrillic", be: "Cyrillic", mk: "Cyrillic", sr: "Cyrillic", kk: "Cyrillic",
  ar: "Arabic", fa: "Arabic", ur: "Arabic",
  hi: "Devanagari", mr: "Devanagari", ne: "Devanagari",
});

// Arabic attaches proclitics to the next word, a Latin one included:
// "وZcash" (and Zcash), "بـZebra" (with Zebra), "لـFROST", "الـfinalizers",
// "بالartifact" — conjunction و/ف, preposition ب/ل/ك, article ال, optionally
// with a tatweel. It also writes a plural ending onto a Latin loanword
// ("proxyات", "digestين"). Those are the language's own orthography, so they
// are allowed. A whole Arabic WORD glued to a name ("Zebraعقدة",
// "القيمZcash") is still damage.
const PROCLITIC = { Arabic: /^(?:[وف]?[بلك]?(?:ال)?)ـ?$/u };
const SUFFIX = { Arabic: /^(?:ات|ين|ون)$/u };

const LATIN = /\p{Script=Latin}/u;
const scriptRe = (s) => new RegExp(`\\p{Script=${s}}`, "u");

// Same-length blanking, so a column found on the masked line is the column in
// the page. Fenced blocks and inline code are SHOWN, not prose; link targets
// and bare URLs are addresses (a Cyrillic Wikipedia URL is not a glued word).
const blank = (s) => " ".repeat(s.length);
export function maskCode(lines) {
  let fence = null;
  return lines.map((l) => {
    const f = l.match(/^\s*(?:>\s*)*(?:[-*+]\s+|\d+[.)]\s+)?(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      return blank(l);
    }
    if (fence !== null) return blank(l);
    return l.replace(/(`+)[^`]*?\1/g, blank).replace(/<!--.*?-->/g, blank);
  });
}

// The balanced end of a link target that opens at `open` (the index of "(").
function targetEnd(line, open) {
  let depth = 0;
  for (let k = open; k < line.length; k++) {
    if (line[k] === "\\") { k++; continue; }
    if (line[k] === "(") depth++;
    else if (line[k] === ")" && --depth === 0) return k;
  }
  return -1;
}

// Walk one (code-masked) line the way a reader's eye pairs brackets: every
// "[" opens (an image "![" included), a "]" closes the nearest open one, and a
// "](" with nothing open is a closer whose opener went missing. Link targets
// are skipped whole, so a bracket inside a URL never counts.
export function scanLinks(line) {
  const stack = [], links = [], orphans = [];
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "\\") { i++; continue; }
    if (c === "[") { stack.push(i); continue; }
    if (c !== "]") continue;
    const opener = stack.length ? stack.pop() : null;
    if (line[i + 1] !== "(") continue;
    const end = targetEnd(line, i + 1);
    const target = end < 0 ? line.slice(i + 2) : line.slice(i + 2, end);
    if (opener === null) orphans.push({ col: i, target });
    else links.push({ open: opener, close: i, label: line.slice(opener + 1, i), image: line[opener - 1] === "!", target });
    if (end >= 0) i = end;
  }
  return { links, orphans };
}

// Blank link targets and bare URLs for the glue rule.
function maskAddresses(line) {
  let out = line;
  const { links, orphans } = scanLinks(line);
  for (const { close, target } of links) out = out.slice(0, close + 2) + blank(target) + out.slice(close + 2 + target.length);
  for (const { col, target } of orphans) out = out.slice(0, col + 2) + blank(target) + out.slice(col + 2 + target.length);
  return out.replace(/<?https?:\/\/[^\s)>\]]+>?/g, blank).replace(/<[a-z][^>]*>/gi, blank);
}

// A letter (or a combining mark riding on one) of a word.
const WORD = /[\p{L}\p{M}\u200c\u200d]+/gu;

// Junctions inside one word where a Latin letter touches a letter of `script`.
// Marks and Common/Inherited characters (tatweel, ZWNJ) are neutral: they
// neither start nor break a junction.
function junctions(word, script) {
  const S = scriptRe(script);
  const out = [];
  let prev = null, prevIdx = -1;
  const chars = [...word];
  let off = 0;
  for (const ch of chars) {
    const kind = LATIN.test(ch) ? "L" : S.test(ch) && /\p{L}/u.test(ch) ? "S" : null;
    if (kind) {
      if (prev && prev !== kind) out.push({ at: off, from: prev, to: kind, prevIdx });
      prev = kind;
      prevIdx = off;
    }
    off += ch.length;
  }
  return out;
}

// Findings for one translated page. `enText` is the English page; a finding
// whose key the English has as well (multiset) is dropped.
export function findReorderDamage(text, loc, enText = "") {
  const found = scan(text, loc);
  if (!enText) return found;
  const allow = new Map();
  for (const f of scan(enText, loc)) allow.set(`${f.rule}\0${f.key}`, (allow.get(`${f.rule}\0${f.key}`) ?? 0) + 1);
  return found.filter((f) => {
    const k = `${f.rule}\0${f.key}`;
    const n = allow.get(k) ?? 0;
    if (n > 0) { allow.set(k, n - 1); return false; }
    return true;
  });
}

function scan(text, loc) {
  const script = SPACED_SCRIPT[loc] ?? null;
  const raw = text.split("\n");
  const lines = maskCode(raw);
  const out = [];
  lines.forEach((line, i) => {
    const { links, orphans } = scanLinks(line);
    for (const o of orphans)
      out.push({ rule: "orphan-link-close", line: i + 1, col: o.col + 1, key: o.target, text: raw[i] });
    for (const l of links) {
      if (l.image) continue;
      if (/^[ \t]+\S/.test(l.label))
        // Keyed by target alone: the English may pad a label itself
        // ("[ 😎 #ZookoEnZcast ... ](url)"), and its translation is a
        // different string pointing at the same URL.
        out.push({ rule: "label-leading-space", line: i + 1, col: l.open + 1, key: l.target, text: raw[i] });
    }
    if (!script) return;
    const prose = maskAddresses(line);
    for (const m of prose.matchAll(WORD)) {
      // One finding per word, carrying every junction in it: "Межсетeвая"
      // (a Latin "e" inside a Cyrillic word) is one defect, not two.
      const ats = [];
      for (const j of junctions(m[0], script)) {
        if (j.from === "S" && PROCLITIC[script]) {
          const head = m[0].slice(0, j.at);
          if (head && PROCLITIC[script].test(head)) continue;
        }
        if (j.from === "L" && SUFFIX[script]) {
          const tail = m[0].slice(j.at);
          if (SUFFIX[script].test(tail)) continue;
        }
        ats.push(m.index + j.at);
      }
      if (ats.length) out.push({ rule: "glued-name", line: i + 1, col: ats[0] + 1, key: m[0], text: raw[i], ats });
    }
  });
  return out;
}

// Insert the missing space where a glued word is a PROTECTED NAME touching a
// word of the locale's script: "[ZcashΠορτοφόλια" -> "[Zcash Πορτοφόλια".
// Only names are repaired. Any other mixed-script word ("Межсетeвая" with a
// Latin "e" inside a Cyrillic word) is a different defect and a space would
// make it worse, so it is left for the gate to report.
// Returns { text, repaired } where repaired lists { line, word } per fix.
export function repairGluedNames(text, loc, terms) {
  if (!SPACED_SCRIPT[loc]) return { text, repaired: [] };
  const names = [...new Set(terms)].filter((t) => /^[\x21-\x7e](?:.*[\x21-\x7e])?$/.test(t)).sort((a, b) => b.length - a.length);
  const raw = text.split("\n");
  const hits = scan(text, loc).filter((f) => f.rule === "glued-name");
  const byLine = new Map();
  for (const h of hits) {
    if (!byLine.has(h.line)) byLine.set(h.line, []);
    byLine.get(h.line).push(...h.ats);
  }
  const repaired = [];
  for (const [ln, ats] of [...byLine].sort((a, b) => a[0] - b[0])) {
    let s = raw[ln - 1];
    const fixed = [];
    for (const at of ats.sort((a, b) => b - a)) {           // right to left: offsets stay valid
      const before = s.slice(0, at), after = s.slice(at);
      const endsWithName = names.find((t) => before.endsWith(t) && !/[A-Za-z0-9]/.test(before[before.length - t.length - 1] ?? ""));
      const startsWithName = names.find((t) => after.startsWith(t) && !/[A-Za-z0-9]/.test(after[t.length] ?? ""));
      if (endsWithName && LATIN.test(before[before.length - 1])) { s = `${before} ${after}`; fixed.push({ line: ln, word: endsWithName }); }
      else if (startsWithName && LATIN.test(after[0])) { s = `${before} ${after}`; fixed.push({ line: ln, word: startsWithName }); }
    }
    raw[ln - 1] = s;
    repaired.push(...fixed.reverse());                      // reading order within the line
  }
  return { text: raw.join("\n"), repaired };
}

// Findings in `head` that `base` did not have, by (rule, key) multiset.
// Damage that was already there is returned separately as `inherited`.
export function splitInherited(head, base) {
  const before = new Map();
  for (const f of base) before.set(`${f.rule}\0${f.key}`, (before.get(`${f.rule}\0${f.key}`) ?? 0) + 1);
  const fresh = [], inherited = [];
  for (const f of head) {
    const k = `${f.rule}\0${f.key}`;
    const n = before.get(k) ?? 0;
    if (n > 0) { before.set(k, n - 1); inherited.push(f); } else fresh.push(f);
  }
  return { fresh, inherited };
}

export const RULE_HELP = {
  "glued-name": "a Latin word is glued to a word of this language with no space between them. The model moved a placeholder (a protected name such as Zcash) when it reordered the sentence and the space was lost. Put the space back, and the name where the language puts it",
  "orphan-link-close": "this link has no opening \"[\" before its \"](\" on the line, so the reader sees a raw bracket and the URL. The model moved the \"[\" when it reordered the sentence. Put \"[\" back at the start of the link text",
  "label-leading-space": "this link text starts with a space, a sign that its \"[\" moved in front of the wrong words when the sentence was reordered. Wrap the words that translate the English link text",
};
