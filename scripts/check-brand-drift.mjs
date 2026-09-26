// Find brand names the engines translated, WITHOUT consulting the list.
//
// The defect this exists to stop: every other terminology gate reads FROM
// translation/protected-terms.json. check-protected-terms enforces it;
// check-brand-spelling checks the casing of terms already on it. Neither can
// propose a new entry, so the list only ever grew when a human happened to
// notice damage by eye — which is how "LetsExchange" survived as
// "Ẹ jẹ́ kí a pààrọ̀" until someone read a Yoruba page, and how Maya Protocol,
// Near Intents, Trezor, Exodus, RAILGUN and sixty others were still
// unprotected months later.
//
// So this one works from EVIDENCE instead. A candidate is any brand-shaped
// token that appears in an English page and is ABSENT from that page's
// translation — which is what a translated brand looks like. That test sees
// links, headings, table cells and plain prose alike.
//
// Two signals, neither of which needs the list to already know the name:
//   1. link text that matches its own URL   [Least Authority](leastauthority.com)
//   2. a bare token matching a domain the wiki links to   Ywallet / ywallet.app
//
// Run:  node scripts/check-brand-drift.mjs            # fail on NEW candidates
//       node scripts/check-brand-drift.mjs --update   # accept current findings
//
// Scope is deliberately the WHOLE corpus, not a PR's changed files. The other
// gates are scoped so an unrelated PR does not go red, and that scoping is
// exactly why this damage accumulated unseen. Run it on a schedule, not per PR.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const TERMS = "translation/protected-terms.json";
const MANIFEST = "translation/menu-titles/en.json";
const BASELINE = "translation/brand-drift-baseline.txt";
const TRANSLATIONS = "translations";
const update = process.argv.includes("--update");

const { preserveVerbatim = [] } = JSON.parse(readFileSync(TERMS, "utf8"));
const protectedSet = new Set(preserveVerbatim);
const protectedLower = new Set(preserveVerbatim.map((t) => t.toLowerCase()));
const pages = Object.keys(JSON.parse(readFileSync(MANIFEST, "utf8")));

// Locales are discovered, not hardcoded, so adding one cannot silently skip it.
const locales = JSON.parse(readFileSync("translation/sync-state.json", "utf8"));
const localeNames = Object.keys(locales).sort();

// Ordinary English words that are Title-Case throughout this corpus. A term
// here is never a brand candidate; the list is deliberately generous, because
// a missed brand shows up next run while a false positive costs a human.
const STOP = new Set(
  `the a an and or but if then this that these those with without for from into over
   under about above below between during before after here there when where how why
   what which who whom whose you your we our they their them it its is are was were be
   been being have has had do does did can could should would may might must shall will
   not no yes all any both each few more most other some such only own same so than too
   very just now new old first last next read learn guide guides docs doc documentation
   website site page pages blog post posts note notes see view click link links full
   list official example examples zcash zec shielded transparent wallet wallets address
   addresses network protocol privacy transaction transactions block blocks chain node
   nodes mining miner pool community ecosystem foundation grants fund development team
   project projects tool tools resource resources security audit report update updates
   news video step steps install download run start stop create add remove edit open
   close file files folder image images source code repo repository branch commit issue
   issues pull request`
    .split(/\s+/)
    .filter(Boolean),
);

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Reduce a candidate to the brand itself. "Free2Z's" and "CryptoNote-based"
// are not separate brands: the name is present and only the possessive or
// compound suffix differs — the same shape as the German genitive "Krakens".
// Testing the inflected form reports damage where there is none.
function baseForm(raw) {
  let t = raw.trim().replace(/^[*_\s]+|[*_\s]+$/g, "");
  t = t.replace(/^[("']+|[)"'.,:;!?]+$/g, "");
  t = t.replace(/[’']s$/, "");
  const compound = /^([A-Za-z0-9]+(?:[A-Z][A-Za-z0-9]*)*)-[a-z]/.exec(t);
  if (compound) t = compound[1];
  return t.replace(/^[-\s]+|[-\s]+$/g, "");
}

// A hex blob or a token with no pronounceable run is an id, not a brand.
function looksRandom(t) {
  const core = t.replace(/[^A-Za-z0-9]/g, "");
  if (/^[0-9a-f]{6,}$/i.test(core)) return true;
  return !/[A-Za-z]{3,}/.test(core);
}

function brandish(raw) {
  const t = baseForm(raw);
  if (t.length < 4 || t.length > 40) return false;
  if (STOP.has(t.toLowerCase()) || looksRandom(t)) return false;
  if (!/^[A-Za-z0-9][A-Za-z0-9 .&'’+-]*$/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length > 3) return false;
  if (words.length === 1 && STOP.has(words[0].toLowerCase())) return false;
  // brand-shaped: an internal capital, a digit beside a letter, or Title Case
  return (
    /[a-z][A-Z]/.test(t) ||
    /[A-Za-z]\d|\d[A-Za-z]/.test(t) ||
    words.every((w) => /^[A-Z0-9]/.test(w))
  );
}

// Code fences, inline code, HTML and URLs carry identifiers that look like
// brands (hashMerkleRoot, nodePort, img8) and are not. Strip before scanning.
const stripNoise = (md) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/https?:\/\/[^\s)\]]+/g, " ");

const domainStem = (host) =>
  host
    .toLowerCase()
    .replace(/^(www|app|docs|blog|support|status|api|mobile|explorer)\./, "")
    .replace(/\.[a-z]+$/, "")
    .replace(/[.-]/g, "");

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const present = (term, text) =>
  new RegExp(`(?<![A-Za-z0-9])${escapeRe(term)}(?![A-Za-z0-9])`).test(text);

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

const LINK = /\[([^\]]{1,80})\]\((https?:\/\/[^)\s]+)\)/g;
const TOKEN = /(?<![A-Za-z0-9])([A-Za-z][A-Za-z0-9'’-]{3,24})(?![A-Za-z0-9])/g;

const findings = new Map(); // term -> { locales:Set, page, how }

for (const key of pages) {
  const raw = read(join("site", key));
  if (raw === null) continue;
  const prose = stripNoise(raw);
  const stems = new Set(
    [...raw.matchAll(/https?:\/\/([^/)\s]+)/g)].map((m) => domainStem(m[1])),
  );

  const cands = new Map();
  for (const m of raw.matchAll(LINK)) {
    const t = baseForm(m[1]);
    if (!brandish(t)) continue;
    // The link text must name its own destination. Without this, every
    // descriptive label qualifies ("Audit Report", "Research Paper",
    // "August 2026") and the real brands drown in them — those labels SHOULD
    // be translated, so reporting them as drift is worse than useless.
    const stem = domainStem(new URL(m[2]).host);
    const t2 = norm(t);
    if (t2 === stem || (stem.includes(t2) && t2.length >= stem.length - 3)) {
      cands.set(t, "link-text");
    }
  }
  for (const m of prose.matchAll(TOKEN)) {
    const t = baseForm(m[1]);
    if (!brandish(t)) continue;
    if (stems.has(norm(t))) cands.set(t, cands.get(t) ?? "domain");
  }
  for (const t of [...cands.keys()]) {
    if (protectedSet.has(t) || protectedLower.has(t.toLowerCase())) cands.delete(t);
  }
  if (cands.size === 0) continue;

  for (const loc of localeNames) {
    const tr = read(join(TRANSLATIONS, loc, "site", key));
    if (tr === null) continue;
    for (const [t, how] of cands) {
      if (present(t, raw) && !present(t, tr)) {
        const f = findings.get(t) ?? { locales: new Set(), page: key, how };
        f.locales.add(loc);
        findings.set(t, f);
      }
    }
  }
}

const current = [...findings.keys()].sort((a, b) => a.localeCompare(b));

if (update) {
  writeFileSync(
    BASELINE,
    "# Brand names found translated but not yet in preserveVerbatim.\n" +
      "# Regenerate with: node scripts/check-brand-drift.mjs --update\n" +
      "# A name leaves this file by being protected (and repaired), not by being deleted.\n" +
      current.map((t) => `${t}\n`).join(""),
  );
  console.log(`check-brand-drift: baseline updated — ${current.length} known candidate(s)`);
  process.exit(0);
}

const baseline = new Set(
  (read(BASELINE) ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#")),
);

const fresh = current.filter((t) => !baseline.has(t));
for (const t of fresh) {
  const f = findings.get(t);
  console.log(
    `  NEW  "${t}" — translated in ${f.locales.size} locale(s) ` +
      `(${[...f.locales].sort().join(",")}), first seen on ${f.page}`,
  );
}

if (fresh.length) {
  console.log(
    `\ncheck-brand-drift FAILED: ${fresh.length} brand name(s) are being translated and are not protected.\n` +
      `Add each to preserveVerbatim in ${TERMS} (checking the vendor's own spelling first —\n` +
      `protecting a misspelling freezes it), repair the damage, then re-run.\n` +
      `If a name is genuinely a common word that SHOULD translate, record that decision by\n` +
      `running --update so the next run does not re-report it.`,
  );
  process.exit(1);
}

console.log(
  `check-brand-drift OK — ${pages.length} English pages × ${localeNames.length} locales, ` +
    `${current.length} known candidate(s), no new drift`,
);
