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
//         του [ καλύπτει» — the "](" has no "[" before it, so the reader sees
//         the raw bracket and URL;
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
// "Zcash钱包"), so the rule would be noise. A Latin-script locale is absent
// too: Akan writes Greek-looking ε/ͻ inside Latin words, which is its
// orthography, not damage.
// To add a locale, check its clitics first: Arabic attaches some to a Latin
// word (PROCLITIC/SUFFIX below), Persian writes a ZWNJ plural ("Zcash‌ها"),
// Hebrew prefixes ו/ב/ל. Each needs its own allowance and a sweep of the
// locale's pages before it goes in.
export const SPACED_SCRIPT = Object.freeze({
  el: "Greek",
  ru: "Cyrillic", uk: "Cyrillic", bg: "Cyrillic", be: "Cyrillic", mk: "Cyrillic", sr: "Cyrillic", kk: "Cyrillic",
  ar: "Arabic",
  hi: "Devanagari",
});

// Arabic attaches proclitics to the next word, a Latin one included:
// "وZcash" (and Zcash), "بـZebra" (with Zebra), "لـFROST", "الـfinalizers",
// "بالartifact", "للZcash" — conjunction و/ف, preposition ب/ل/ك, article ال
// (ل + ال contracts to لل), optionally with a tatweel. It also writes a plural
// ending onto a Latin loanword ("proxyات", "digestين"). Those are the
// language's own orthography, so they are allowed. A whole Arabic WORD glued
// to a name ("Zebraعقدة", "القيمZcash") is still damage.
const PROCLITIC = { Arabic: /^[وف]?(?:لل|[بلك]?(?:ال)?)ـ?$/u };
const SUFFIX = { Arabic: /^(?:ات|ين|ون)$/u };

const LATIN = /\p{Script=Latin}/u;
const scriptLetter = (s) => new RegExp(`(?=\\p{L})\\p{Script=${s}}`, "u");

// Same-length blanking, so a column found on the masked line is the column in
// the page. Fenced blocks, inline code and HTML comments are shown verbatim or
// hidden, never prose.
const blank = (s) => s.replace(/[^\n]/g, " ");
export function maskCode(lines) {
  let fence = null, comment = false;
  return lines.map((l) => {
    if (comment) {
      const e = l.indexOf("-->");
      if (e < 0) return blank(l);
      comment = false;
      l = blank(l.slice(0, e + 3)) + l.slice(e + 3);
    }
    const f = l.match(/^\s*(?:>\s*)*(?:[-*+]\s+|\d+[.)]\s+)?(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      return blank(l);
    }
    if (fence !== null) return blank(l);
    l = l.replace(/(`+)[^`]*?\1/g, blank).replace(/<!--.*?-->/g, blank);
    const open = l.indexOf("<!--");
    if (open >= 0) { comment = true; l = l.slice(0, open) + blank(l.slice(open)); }
    return l;
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

// Walk (code-masked) lines the way a reader's eye pairs brackets: every "["
// opens (an image "![" included), a "]" closes the nearest open one, and a
// "](" with nothing open is a closer whose opener went missing. Link targets
// are skipped whole, so a bracket inside a URL never counts.
//
// Line by line, on purpose. CommonMark lets a label wrap inside a paragraph,
// but no English page and no translation on main does it (0 of 4,581
// translated pages on 2026-10-29), while carrying an opener to the next line
// let a relocated "[" absorb the closer below it and hide the damage
// ("plain [bracket\ntranslated label](url)"). A label wrapped in the English
// still passes: its closer is an orphan in the English too, and the English
// allowance (per target URL) covers it. A translation that wraps a label the
// English keeps on one line is reported; keep the label on one line.
export function scanLinksIn(lines) {
  const links = [], orphans = [];
  lines.forEach((line, ln) => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "\\") { i++; continue; }
      if (c === "[") { stack.push(i); continue; }
      if (c !== "]") continue;
      const opener = stack.length ? stack.pop() : null;
      if (line[i + 1] !== "(") continue;
      const end = targetEnd(line, i + 1);
      const target = end < 0 ? line.slice(i + 2) : line.slice(i + 2, end);
      if (opener === null) orphans.push({ ln, col: i, target });
      else links.push({ ln, openLn: ln, open: opener, close: i, label: line.slice(opener + 1, i), image: line[opener - 1] === "!", target });
      if (end >= 0) i = end;
    }
  });
  return { links, orphans };
}

// One line on its own (kept for callers and tests).
export function scanLinks(line) {
  return scanLinksIn([line]);
}

// Blank link targets, bare URLs and HTML tags for the glue rule.
function maskAddresses(lines) {
  const out = [...lines];
  const { links, orphans } = scanLinksIn(lines);
  for (const { ln, close, col, target } of [...links, ...orphans]) {
    const at = (close ?? col) + 2;
    out[ln] = out[ln].slice(0, at) + blank(target) + out[ln].slice(at + target.length);
  }
  return out.map((l) => l.replace(/<?https?:\/\/[^\s)>\]]+>?/g, blank).replace(/<[a-z][^>]*>/gi, blank));
}

// A letter (or a combining mark riding on one) of a word.
const WORD = /[\p{L}\p{M}\u200c\u200d]+/gu;

// Junctions inside one word where a Latin letter touches a letter of `script`.
// Marks and Common/Inherited characters (tatweel, ZWNJ) are neutral: they
// neither start nor break a junction.
function junctions(word, script) {
  const S = scriptLetter(script);
  const out = [];
  let prev = null, off = 0;
  for (const ch of word) {
    const kind = LATIN.test(ch) ? "L" : S.test(ch) ? "S" : null;
    if (kind) {
      if (prev && prev !== kind) out.push({ at: off, from: prev });
      prev = kind;
    }
    off += ch.length;
  }
  return out;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Protected names whose first or last character is not a Latin letter
// ("NU5", "Zingo!", "Web3", "1inch") never form a junction inside one WORD —
// the digit or "!" splits it — so the letter rule cannot see «NU5αναβάθμιση».
// They are matched as whole names instead, with the same boundaries the
// masker uses (not preceded/followed by an ASCII letter or digit).
function edgeNamePattern(terms, script) {
  const tail = terms.filter((t) => /[^A-Za-z]$/.test(t)), head = terms.filter((t) => /^[^A-Za-z]/.test(t));
  const alt = (ts) => [...new Set(ts)].sort((a, b) => b.length - a.length).map(escapeRe).join("|");
  const parts = [];
  if (tail.length) parts.push(`(?<![A-Za-z0-9])(?<tail>${alt(tail)})(?=(?=\\p{L})\\p{Script=${script}})`);
  if (head.length) parts.push(`(?<=(?=\\p{L})\\p{Script=${script}})(?<head>${alt(head)})(?![A-Za-z0-9])`);
  return parts.length ? new RegExp(parts.join("|"), "gu") : null;
}

// Findings for one translated page. `enText` is the English page; a finding
// whose (rule, key) the English has as well is dropped, as a multiset. `terms`
// is translation/protected-terms.json's preserveVerbatim list (optional: it
// only adds names that end or start in a digit or punctuation).
export function findReorderDamage(text, loc, enText = "", terms = []) {
  const found = scan(text, loc, terms);
  if (!enText) return found;
  const allow = new Map();
  for (const f of scan(enText, loc, terms)) allow.set(`${f.rule}\0${f.key}`, (allow.get(`${f.rule}\0${f.key}`) ?? 0) + 1);
  return found.filter((f) => {
    const k = `${f.rule}\0${f.key}`;
    const n = allow.get(k) ?? 0;
    if (n > 0) { allow.set(k, n - 1); return false; }
    return true;
  });
}

// Raw HTML tags are markup, not text: a "[" or "](" inside an attribute
// (<span title="[">, <a href="](/x)">) must neither open nor close a link.
const maskHtml = (l) => l.replace(/<\/?[A-Za-z][^<>]*>/g, blank);

function scan(text, loc, terms = []) {
  const script = SPACED_SCRIPT[loc] ?? null;
  const raw = text.split("\n");
  const lines = maskCode(raw).map(maskHtml);
  const out = [];
  const { links, orphans } = scanLinksIn(lines);
  for (const o of orphans)
    out.push({ rule: "orphan-link-close", line: o.ln + 1, col: o.col + 1, key: o.target, text: raw[o.ln] });
  for (const l of links) {
    if (l.image) continue;
    // Keyed by target alone: the English may pad a label itself
    // ("[ 😎 #ZookoEnZcast ... ](url)"), and its translation is a different
    // string pointing at the same URL. The allowance is a multiset, so it
    // covers as many padded links to that URL as the English has, no more.
    if (/^[ \t]+\S/.test(l.label))
      out.push({ rule: "label-leading-space", line: l.openLn + 1, col: l.open + 1, key: l.target, text: raw[l.openLn] });
  }
  if (script) {
    const prose = maskAddresses(lines);
    const edge = edgeNamePattern(terms, script);
    prose.forEach((line, i) => {
      const glued = [];
      for (const m of line.matchAll(WORD)) {
        // One finding per word, carrying every junction in it: "Межсетeвая"
        // (a Latin "e" inside a Cyrillic word) is one defect, not two.
        const ats = [];
        for (const j of junctions(m[0], script)) {
          if (j.from === "S" && PROCLITIC[script] && PROCLITIC[script].test(m[0].slice(0, j.at))) continue;
          if (j.from === "L" && SUFFIX[script] && SUFFIX[script].test(m[0].slice(j.at))) continue;
          ats.push(m.index + j.at);
        }
        if (ats.length) glued.push({ start: m.index, end: m.index + m[0].length, ats });
      }
      for (const m of edge ? line.matchAll(edge) : []) {
        const name = m.groups.tail ?? m.groups.head;
        const at = m.groups.tail ? m.index + name.length : m.index;
        // The word on the far side of the junction, for the key and the
        // Arabic clitic tests.
        const left = line.slice(0, at).match(/[\p{L}\p{M}\u200c\u200d]*$/u)[0];
        const right = line.slice(at).match(/^[\p{L}\p{M}\u200c\u200d]*/u)[0];
        if (m.groups.head && PROCLITIC[script]?.test(left)) continue;
        if (m.groups.tail && SUFFIX[script]?.test(right)) continue;
        const start = m.groups.tail ? m.index : at - left.length;
        const end = m.groups.tail ? at + right.length : m.index + name.length;
        if (!glued.some((g) => g.ats.includes(at))) glued.push({ start, end, ats: [at] });
      }
      for (const g of glued.sort((a, b) => a.start - b.start))
        out.push({ rule: "glued-name", line: i + 1, col: g.ats[0] + 1, key: raw[i].slice(g.start, g.end), text: raw[i], ats: g.ats });
    });
  }
  return out.sort((a, b) => a.line - b.line || a.col - b.col);
}

// Insert the missing space where a glued word is a PROTECTED NAME touching a
// word of the locale's script: "[ZcashΠορτοφόλια" -> "[Zcash Πορτοφόλια",
// "NU5αναβάθμιση" -> "NU5 αναβάθμιση". Only names are repaired. Any other
// mixed-script word ("Межсетeвая" with a Latin "e" inside a Cyrillic word) is
// a different defect and a space would make it worse, so it is left for the
// gate to report.
// Returns { text, repaired } where repaired lists { line, word } per fix.
export function repairGluedNames(text, loc, terms) {
  const script = SPACED_SCRIPT[loc];
  if (!script) return { text, repaired: [] };
  const S = scriptLetter(script);
  const names = [...new Set(terms)].filter((t) => t && t === t.trim()).sort((a, b) => b.length - a.length);
  const raw = text.split("\n");
  const byLine = new Map();
  for (const h of scan(text, loc, terms).filter((f) => f.rule === "glued-name")) {
    if (!byLine.has(h.line)) byLine.set(h.line, []);
    byLine.get(h.line).push(...h.ats);
  }
  const repaired = [];
  for (const [ln, ats] of [...byLine].sort((a, b) => a[0] - b[0])) {
    let s = raw[ln - 1];
    const fixed = [];
    for (const at of [...new Set(ats)].sort((a, b) => b - a)) {   // right to left: offsets stay valid
      const before = s.slice(0, at), after = s.slice(at);
      const prev = [...before].pop() ?? "", next = [...after][0] ?? "";
      const endsWithName = S.test(next) && names.find((t) => before.endsWith(t) && !/[A-Za-z0-9]/.test(before[before.length - t.length - 1] ?? ""));
      const startsWithName = S.test(prev) && names.find((t) => after.startsWith(t) && !/[A-Za-z0-9]/.test(after[t.length] ?? ""));
      const word = endsWithName || startsWithName;
      if (word) { s = `${before} ${after}`; fixed.push({ line: ln, word }); }
    }
    raw[ln - 1] = s;
    repaired.push(...fixed.reverse());                      // reading order within the line
  }
  return { text: raw.join("\n"), repaired };
}

// Findings in `head` that `base` did not have. Identity is the rule, the key
// AND the line's text: removing a broken link on one line and adding the same
// broken link on another is new damage, not the old one. A line that was
// rewritten is judged again, so damage a regenerated block reproduces is new.
export function splitInherited(head, base) {
  const id = (f) => `${f.rule}\0${f.key}\0${(f.text ?? "").trim()}`;
  const before = new Map();
  for (const f of base) before.set(id(f), (before.get(id(f)) ?? 0) + 1);
  const fresh = [], inherited = [];
  for (const f of head) {
    const n = before.get(id(f)) ?? 0;
    if (n > 0) { before.set(id(f), n - 1); inherited.push(f); } else fresh.push(f);
  }
  return { fresh, inherited };
}

export const RULE_HELP = {
  "glued-name": "a Latin word is glued to a word of this language with no space between them. The model moved a placeholder (a protected name such as Zcash) when it reordered the sentence and the space was lost. Put the space back, and the name where the language puts it",
  "orphan-link-close": "this link has no opening \"[\" before its \"](\", so the reader sees a raw bracket and the URL. The model moved the \"[\" when it reordered the sentence. Put \"[\" back at the start of the link text",
  "label-leading-space": "this link text starts with a space, a sign that its \"[\" moved in front of the wrong words when the sentence was reordered. Wrap the words that translate the English link text",
};
