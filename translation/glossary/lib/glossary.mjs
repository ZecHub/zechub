// Community-reviewed glossaries: loader, validator and matcher.
//
// One shared English list (translation/glossary/terms.en.json) says WHICH
// words need a decision and what they mean. One file per locale
// (translation/glossary/<loc>.json) records what a native speaker decided:
// the approved rendering, the forms a checker should accept, and the known
// wrong renderings. See translation/glossary/README.md for the format and
// translation/glossary/schema.json for the field list.
//
// This module is pure: no filesystem, no process, no clock. Callers read the
// JSON and the list of folders under site/ themselves and pass them in, the
// same way translation/lib/term-forms.mjs is given the protected list. That
// keeps every rule unit-testable with inline fixtures, and lets the runner,
// the review-kit CLI and CI share one implementation.
//
// Validation is loud. A malformed glossary that was quietly accepted would
// enforce nothing, in exactly the way nobody notices: a typo in a term id
// would point a rule at a word no page contains, and a rejected rendering
// that also matches an approved form would flag every correct page. So the
// validator reports every problem it finds, each tagged with the rule number
// from the design (section 1.3), and assertValid() throws them together.

export class GlossaryError extends Error {
  /** @param {{rule: string|number, where: string, message: string}[]} errors */
  constructor(errors) {
    super(errors.map(formatError).join("\n"));
    this.errors = errors;
  }
}

export function formatError(e) {
  return `[rule ${e.rule}] ${e.where}: ${e.message}`;
}

// ---- vocabulary ------------------------------------------------------------

export const CATEGORIES = ["concept", "protocol", "ui", "style-word"];
export const DEFAULT_POLICIES = ["translate", "keep-english"];
export const APPLIES_TO = ["pages", "ui", "both"];
export const STATUSES = ["draft", "approved", "disputed"];
export const REGISTERS_BRACKETS = ["never", "first-use", "always"];
export const LOANWORDS = ["keep-english", "translate"];

// Field lists are explicit so an unknown key fails validation. A misspelt
// field ("rejcted") would otherwise be ignored, and the rejection it was
// meant to carry would silently never fire. lib/glossary.test.mjs checks that
// schema.json documents exactly these fields.
export const TERM_EN_FIELDS = [
  "id", "english", "pos", "definition", "not_to_be_confused_with", "match",
  "examples", "category", "default_policy", "applies_to",
];
export const ENTRY_FIELDS = [
  "target", "keep_english", "forms", "stem", "examples", "rejected",
  "inflection", "pos", "context", "applies_to", "status", "dispute", "notes",
  "reviewed_by", "reviewed_at", "source",
];
export const REJECTED_FIELDS = [
  "text", "word", "ci", "only_when_english_has", "unless_english_has",
  "safe_replace",
];
export const LOCALE_FIELDS = [
  "locale", "version", "meta", "style", "terms", "phrases", "gates", "changelog",
];
export const META_FIELDS = [
  "language_name", "native_name", "engine", "script", "dir", "language_lead",
  "last_review", "enforce",
];
export const STYLE_FIELDS = [
  "variety", "register", "english_in_brackets", "loanwords",
  "capitalise_kept_english_at_sentence_start", "numerals", "decimal_separator",
  "quotes", "abbreviations_with_full_stop", "notes",
];
export const GATES_FIELDS = [
  "sentence_boundary_extra_abbrev", "script_regex", "min_script_share",
  "passthrough_allow",
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TERM_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ---- matching --------------------------------------------------------------

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// English surface forms use the boundary rule of check_terms.py,
// lib/term-repair.mjs and scripts/check-protected-terms.mjs, so "mining" does
// not match "deter*mining*". Case-sensitive: the forms are declared, and
// "Proof" at a sentence start is listed when it matters.
const enCache = new Map();
export function englishRegExp(form) {
  let re = enCache.get(form);
  if (!re) {
    re = new RegExp(`(?<![A-Za-z0-9])${escapeRe(form)}(?![A-Za-z0-9])`, "g");
    enCache.set(form, re);
  }
  re.lastIndex = 0;
  return re;
}

export function countEnglish(form, text) {
  return (text.match(englishRegExp(form)) || []).length;
}

/** Does an English form occur in `text` (word-bounded, case-sensitive)? */
export function englishHas(form, text) {
  return englishRegExp(form).test(text);
}

// Locale-side matching. Translations are not ASCII, so the word boundary is
// any Unicode letter or digit: Indonesian "terlindung" must not match inside
// "terlindungi", and the same holds for accented Latin and other scripts.
const locCache = new Map();
export function localRegExp(text, { word = false, ci = false } = {}) {
  const key = `${word ? "w" : "-"}${ci ? "i" : "-"}${text}`;
  let re = locCache.get(key);
  if (!re) {
    const body = escapeRe(text);
    const src = word ? `(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])` : body;
    re = new RegExp(src, `gu${ci ? "i" : ""}`);
    locCache.set(key, re);
  }
  re.lastIndex = 0;
  return re;
}

export function countLocal(needle, text, opts) {
  return (text.match(localRegExp(needle, opts)) || []).length;
}

// The English condition on a rejection is deliberately loose: case-insensitive
// substring. "encrypt" must cover "encrypted", "encryption" and "Encrypting";
// "shielded" must cover "unshielded" and "Shielded". A stricter rule would
// make a scoped rejection fire where the author meant it not to.
function englishMentions(english, needle) {
  return english.toLowerCase().includes(needle.toLowerCase());
}

/**
 * Whether a rejection is in force for a block (or page) whose English is
 * `english`. Without English context (null), a rejection that depends on the
 * English is not applied: a scoped rule must never fire unscoped.
 */
export function rejectionApplies(rej, english) {
  const only = rej.only_when_english_has ?? [];
  const unless = rej.unless_english_has ?? [];
  if (english == null) return only.length === 0 && unless.length === 0;
  if (only.length && !only.some((w) => englishMentions(english, w))) return false;
  if (unless.some((w) => englishMentions(english, w))) return false;
  return true;
}

/**
 * Rejected renderings of one entry found in a translated text.
 * @returns {{text: string, match: string, index: number}[]}
 */
export function findRejected(entry, translated, english = null) {
  const hits = [];
  for (const rej of entry.rejected ?? []) {
    if (!rejectionApplies(rej, english)) continue;
    for (const m of translated.matchAll(localRegExp(rej.text, rej))) {
      hits.push({ text: rej.text, match: m[0], index: m.index });
    }
  }
  return hits;
}

/** The surface forms a checker accepts for an entry; `target` when unset. */
export function entryForms(entry) {
  return Array.isArray(entry.forms) && entry.forms.length ? entry.forms : [entry.target];
}

/** Does a translated text contain any accepted form of the entry? */
export function hasApprovedForm(entry, translated) {
  if (entryForms(entry).some((f) => localRegExp(f, { ci: true }).test(translated))) return true;
  if (entry.stem) {
    const { stem } = entry.stem;
    return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(stem)}\\p{L}*`, "iu").test(translated);
  }
  return false;
}

// ---- reading helpers -------------------------------------------------------

export function termsById(termsEn) {
  return new Map((termsEn?.terms ?? []).map((t) => [t.id, t]));
}

/**
 * Every entry of a locale glossary as {kind, key, entry}, terms first, each
 * group in file order. `kind` is "term" or "phrase".
 */
export function entries(glossary) {
  const out = [];
  for (const [key, entry] of Object.entries(glossary?.terms ?? {})) out.push({ kind: "term", key, entry });
  for (const [key, entry] of Object.entries(glossary?.phrases ?? {})) out.push({ kind: "phrase", key, entry });
  return out;
}

/** The English surface forms an entry renders: a term's match list, a phrase's key. */
export function englishFormsOf(item, byId) {
  if (item.kind === "phrase") return [item.key];
  return byId.get(item.key)?.match ?? [];
}

/**
 * The register for a page, by path under site/. First matching rule wins,
 * else the default; UI strings use `register.ui`. Same logic as the runner's
 * prompt_head.py register_for() and promptHeadFor(), which this replaces.
 */
export function registerFor(glossary, relPath, { ui = false } = {}) {
  const reg = glossary?.style?.register;
  if (!reg) return null;
  if (ui) return reg.ui ?? reg.default ?? null;
  for (const rule of reg.rules ?? []) {
    if ((rule.prefixes ?? []).some((p) => relPath.startsWith(p))) return rule.register;
  }
  return reg.default ?? null;
}

// ---- validation: terms.en.json ---------------------------------------------

const isStr = (v) => typeof v === "string" && v.trim() !== "" && v.trim() === v;
const isStrArray = (v) => Array.isArray(v) && v.every(isStr);

function unknownKeys(obj, allowed, where, errors, rule = "structure") {
  for (const k of Object.keys(obj)) {
    if (!allowed.includes(k)) errors.push({ rule, where, message: `unknown field "${k}"` });
  }
}

/**
 * Validate the shared English list. Ids are the join key every locale file
 * relies on, so duplicates and malformed ids are fatal; a match form that is a
 * protected name would make the glossary and preserveVerbatim overlap.
 */
export function validateTermsEn(termsEn, { preserveVerbatim = [] } = {}) {
  const errors = [];
  const pv = new Set(preserveVerbatim);
  if (!termsEn || typeof termsEn !== "object") {
    return [{ rule: "structure", where: "terms.en.json", message: "not an object" }];
  }
  if (!Number.isInteger(termsEn.version) || termsEn.version < 1) {
    errors.push({ rule: "structure", where: "terms.en.json", message: "version must be a positive integer" });
  }
  if (!Array.isArray(termsEn.terms)) {
    errors.push({ rule: "structure", where: "terms.en.json", message: "terms must be an array" });
    return errors;
  }
  const seen = new Set();
  termsEn.terms.forEach((t, i) => {
    const where = `terms.en.json terms[${i}]${t?.id ? ` (${t.id})` : ""}`;
    if (!t || typeof t !== "object") {
      errors.push({ rule: "structure", where, message: "not an object" });
      return;
    }
    unknownKeys(t, TERM_EN_FIELDS, where, errors);
    if (!isStr(t.id) || !TERM_ID_RE.test(t.id)) {
      errors.push({ rule: "structure", where, message: "id must be lowercase words joined by hyphens" });
    } else if (seen.has(t.id)) {
      errors.push({ rule: "structure", where, message: `duplicate id "${t.id}"` });
    }
    seen.add(t.id);
    for (const f of ["english", "pos", "definition"]) {
      if (!isStr(t[f])) errors.push({ rule: "structure", where, message: `${f} must be a non-empty string` });
    }
    if (!isStrArray(t.match) || t.match.length === 0) {
      errors.push({ rule: "structure", where, message: "match must be a non-empty list of strings" });
    } else {
      if (new Set(t.match).size !== t.match.length) {
        errors.push({ rule: "structure", where, message: "match contains a duplicate" });
      }
      for (const m of t.match) {
        if (pv.has(m)) {
          errors.push({ rule: 6, where, message: `match form "${m}" is in preserveVerbatim (a name is protected, not glossed)` });
        }
      }
    }
    if (t.examples !== undefined && !isStrArray(t.examples)) {
      errors.push({ rule: "structure", where, message: "examples must be a list of strings" });
    }
    if (t.not_to_be_confused_with !== undefined && !isStr(t.not_to_be_confused_with)) {
      errors.push({ rule: "structure", where, message: "not_to_be_confused_with must be a string" });
    }
    if (!CATEGORIES.includes(t.category)) {
      errors.push({ rule: "structure", where, message: `category must be one of ${CATEGORIES.join(", ")}` });
    }
    if (!DEFAULT_POLICIES.includes(t.default_policy)) {
      errors.push({ rule: "structure", where, message: `default_policy must be one of ${DEFAULT_POLICIES.join(", ")}` });
    }
    if (!APPLIES_TO.includes(t.applies_to)) {
      errors.push({ rule: "structure", where, message: `applies_to must be one of ${APPLIES_TO.join(", ")}` });
    }
  });
  return errors;
}

// ---- validation: <loc>.json -------------------------------------------------

function validateEntryShape(item, where, errors) {
  const e = item.entry;
  if (!e || typeof e !== "object" || Array.isArray(e)) {
    errors.push({ rule: "structure", where, message: "entry must be an object" });
    return false;
  }
  unknownKeys(e, ENTRY_FIELDS, where, errors);
  if (!isStr(e.target)) errors.push({ rule: "structure", where, message: "target must be a non-empty string" });
  if (e.forms !== undefined && (!isStrArray(e.forms) || e.forms.length === 0)) {
    errors.push({ rule: "structure", where, message: "forms must be a non-empty list of strings" });
  }
  if (e.keep_english !== undefined && typeof e.keep_english !== "boolean") {
    errors.push({ rule: "structure", where, message: "keep_english must be true or false" });
  }
  if (e.stem !== undefined && (typeof e.stem !== "object" || !isStr(e.stem.stem))) {
    errors.push({ rule: "structure", where, message: 'stem must be {"stem": "...", "suffixes": "any-letters"}' });
  }
  for (const f of ["examples", "reviewed_by"]) {
    if (e[f] !== undefined && !Array.isArray(e[f])) {
      errors.push({ rule: "structure", where, message: `${f} must be a list` });
    } else if (e[f] !== undefined && !isStrArray(e[f])) {
      errors.push({ rule: "structure", where, message: `${f} entries must be non-empty strings` });
    }
  }
  for (const f of ["inflection", "pos", "context", "dispute", "notes", "source"]) {
    if (e[f] !== undefined && typeof e[f] !== "string") {
      errors.push({ rule: "structure", where, message: `${f} must be a string` });
    }
  }
  if (!APPLIES_TO.includes(e.applies_to)) {
    errors.push({ rule: "structure", where, message: `applies_to must be one of ${APPLIES_TO.join(", ")}` });
  }
  if (!STATUSES.includes(e.status)) {
    errors.push({ rule: "structure", where, message: `status must be one of ${STATUSES.join(", ")}` });
  }
  if (!Array.isArray(e.reviewed_by)) {
    errors.push({ rule: "structure", where, message: "reviewed_by must be a list (empty when not reviewed)" });
  }
  if (e.reviewed_at !== undefined && e.reviewed_at !== null && !(typeof e.reviewed_at === "string" && DATE_RE.test(e.reviewed_at))) {
    errors.push({ rule: "structure", where, message: "reviewed_at must be YYYY-MM-DD or null" });
  }
  if (e.rejected !== undefined) {
    if (!Array.isArray(e.rejected)) {
      errors.push({ rule: "structure", where, message: "rejected must be a list" });
    } else {
      e.rejected.forEach((r, j) => {
        const w = `${where} rejected[${j}]`;
        if (!r || typeof r !== "object") {
          errors.push({ rule: "structure", where: w, message: "must be an object" });
          return;
        }
        unknownKeys(r, REJECTED_FIELDS, w, errors);
        if (!isStr(r.text)) errors.push({ rule: "structure", where: w, message: "text must be a non-empty string" });
        for (const f of ["word", "ci", "safe_replace"]) {
          if (r[f] !== undefined && typeof r[f] !== "boolean") {
            errors.push({ rule: "structure", where: w, message: `${f} must be true or false` });
          }
        }
        for (const f of ["only_when_english_has", "unless_english_has"]) {
          if (r[f] !== undefined && (!isStrArray(r[f]) || r[f].length === 0)) {
            errors.push({ rule: "structure", where: w, message: `${f} must be a non-empty list of strings` });
          }
        }
      });
    }
  }
  return true;
}

// Two entries "mean the same" when they are the same entry, or when one is a
// phrase whose English is a declared match form of the other (the menu label
// "Wallets" and the term "wallet"). Two different term ids never do.
function sameMeaning(a, b, byId) {
  if (a.kind === b.kind && a.key === b.key) return true;
  const [t, p] = a.kind === "term" ? [a, b] : [b, a];
  if (t.kind !== "term" || p.kind !== "phrase") return false;
  const k = p.key.toLowerCase();
  return englishFormsOf(t, byId).some((m) => m.toLowerCase() === k);
}

function overlaps(a, b) {
  const x = a.entry.applies_to;
  const y = b.entry.applies_to;
  return x === "both" || y === "both" || x === y;
}

const label = (item) => (item.kind === "term" ? `terms.${item.key}` : `phrases["${item.key}"]`);

// Rule 3, two shapes of the same problem: one English word, two approved
// renderings that disagree.
//
// (a) The literal one: two entries with different meanings accept the same
//     surface form, so a checker cannot tell which one a page used. Checked
//     when at least one side is a term; two UI phrases may legitimately share
//     a label ("Donate" and "Donations" are both "Donasi" in a menu).
// (b) The one that motivated the rule: the English of entry A occurs inside
//     the English of entry B, but B's rendering contains none of A's forms.
//     "Tools" -> "Alat" next to "Privacy Tools" -> "Tools Privasi" is exactly
//     this. It may be deliberate, so both entries pass once each says when it
//     applies (a non-empty `context`); until then the clash is an error, so
//     it reaches a human instead of the prompt.
function clashErrors(approved, byId) {
  const errors = [];
  const hasContext = (it) => isStr(it.entry.context ?? "");
  const reported = new Set();
  const report = (a, b, message) => {
    const id = [label(a), label(b)].sort().join("|");
    if (reported.has(id)) return;
    reported.add(id);
    errors.push({ rule: 3, where: `${label(a)} / ${label(b)}`, message, refs: [a, b] });
  };
  for (let i = 0; i < approved.length; i++) {
    for (let j = 0; j < approved.length; j++) {
      if (i === j) continue;
      const a = approved[i];
      const b = approved[j];
      if (!overlaps(a, b) || sameMeaning(a, b, byId)) continue;
      if (hasContext(a) && hasContext(b)) continue;
      if (i < j && (a.kind === "term" || b.kind === "term")) {
        const fb = new Set(entryForms(b.entry).map((f) => f.toLowerCase()));
        const shared = entryForms(a.entry).find((f) => fb.has(f.toLowerCase()));
        if (shared) {
          report(a, b, `both accept the form "${shared}" for different English; give both a context or pick one`);
          continue;
        }
      }
      const aForms = entryForms(a.entry).map((f) => f.toLowerCase());
      const bTarget = b.entry.target.toLowerCase();
      for (const m of englishFormsOf(a, byId)) {
        const inB = englishFormsOf(b, byId).find((e) => e !== m && englishHas(m, e));
        if (!inB) continue;
        if (aForms.some((f) => bTarget.includes(f))) continue;
        report(a, b, `"${m}" is rendered "${a.entry.target}", but inside "${inB}" it is rendered "${b.entry.target}"; give both a context if the split is deliberate`);
        break;
      }
    }
  }
  return errors;
}

/**
 * Validate one locale glossary. Returns a list of errors (empty = valid).
 *
 * @param {object} glossary  the parsed <loc>.json
 * @param {object} ctx
 * @param {object} ctx.termsEn  the parsed terms.en.json
 * @param {string[]} ctx.preserveVerbatim  from translation/protected-terms.json
 * @param {string[]|null} ctx.siteDirs  every directory under site/, relative
 *   to site/ ("guides", "guides/sub"). Required for rule 8; pass null only to
 *   skip that rule on purpose (a caller with no checkout).
 * @param {string} [ctx.fileLocale]  locale implied by the file name
 */
export function validateLocale(glossary, { termsEn, preserveVerbatim = [], siteDirs, fileLocale } = {}) {
  const errors = [];
  const where0 = `${fileLocale ?? glossary?.locale ?? "?"}.json`;
  if (!glossary || typeof glossary !== "object" || Array.isArray(glossary)) {
    return [{ rule: "structure", where: where0, message: "not an object" }];
  }
  if (siteDirs === undefined) {
    throw new TypeError("validateLocale: pass siteDirs (or null to skip rule 8 deliberately)");
  }
  unknownKeys(glossary, LOCALE_FIELDS, where0, errors);
  if (!isStr(glossary.locale) || !/^[a-z]{2,3}(-[A-Za-z0-9]+)*$/.test(glossary.locale)) {
    errors.push({ rule: "structure", where: where0, message: "locale must be a BCP 47 code such as id or pt-BR" });
  } else if (fileLocale && glossary.locale !== fileLocale) {
    errors.push({ rule: "structure", where: where0, message: `locale "${glossary.locale}" does not match the file name` });
  }
  if (!Number.isInteger(glossary.version) || glossary.version < 1) {
    errors.push({ rule: "structure", where: where0, message: "version must be a positive integer" });
  }

  // meta
  const meta = glossary.meta;
  if (!meta || typeof meta !== "object") {
    errors.push({ rule: "structure", where: `${where0} meta`, message: "meta is required" });
  } else {
    unknownKeys(meta, META_FIELDS, `${where0} meta`, errors);
    for (const f of ["language_name", "native_name", "engine", "script", "dir"]) {
      if (!isStr(meta[f])) errors.push({ rule: "structure", where: `${where0} meta`, message: `${f} must be a non-empty string` });
    }
    if (meta.dir !== undefined && !["ltr", "rtl"].includes(meta.dir)) {
      errors.push({ rule: "structure", where: `${where0} meta`, message: "dir must be ltr or rtl" });
    }
    if (meta.script !== undefined && !/^[A-Z][a-z]{3}$/.test(meta.script)) {
      errors.push({ rule: "structure", where: `${where0} meta`, message: "script must be an ISO 15924 code such as Latn" });
    }
    if (meta.language_lead !== undefined && !isStrArray(meta.language_lead)) {
      errors.push({ rule: "structure", where: `${where0} meta`, message: "language_lead must be a list of strings" });
    }
    if (meta.last_review !== undefined && meta.last_review !== null && !DATE_RE.test(meta.last_review)) {
      errors.push({ rule: "structure", where: `${where0} meta`, message: "last_review must be YYYY-MM-DD or null" });
    }
  }

  // style
  const style = glossary.style;
  if (!style || typeof style !== "object") {
    errors.push({ rule: "structure", where: `${where0} style`, message: "style is required" });
  } else {
    unknownKeys(style, STYLE_FIELDS, `${where0} style`, errors);
    if (style.english_in_brackets !== undefined && !REGISTERS_BRACKETS.includes(style.english_in_brackets)) {
      errors.push({ rule: "structure", where: `${where0} style`, message: `english_in_brackets must be one of ${REGISTERS_BRACKETS.join(", ")}` });
    }
    if (style.loanwords !== undefined && !LOANWORDS.includes(style.loanwords)) {
      errors.push({ rule: "structure", where: `${where0} style`, message: `loanwords must be one of ${LOANWORDS.join(", ")}` });
    }
    if (style.abbreviations_with_full_stop !== undefined && !isStrArray(style.abbreviations_with_full_stop)) {
      errors.push({ rule: "structure", where: `${where0} style`, message: "abbreviations_with_full_stop must be a list of strings" });
    }
    const reg = style.register;
    if (reg !== undefined) {
      const w = `${where0} style.register`;
      const texts = reg.text ?? {};
      const known = Object.keys(texts);
      for (const f of ["default", "ui"]) {
        if (reg[f] !== undefined && !known.includes(reg[f])) {
          errors.push({ rule: "structure", where: w, message: `${f} "${reg[f]}" has no entry in register.text` });
        }
      }
      (reg.rules ?? []).forEach((rule, i) => {
        if (!known.includes(rule.register)) {
          errors.push({ rule: "structure", where: `${w}.rules[${i}]`, message: `register "${rule.register}" has no entry in register.text` });
        }
        if (!isStrArray(rule.prefixes) || rule.prefixes.length === 0) {
          errors.push({ rule: "structure", where: `${w}.rules[${i}]`, message: "prefixes must be a non-empty list" });
          return;
        }
        // Rule 8: a renamed folder would leave a prefix that matches no page,
        // and every page in the new folder would silently get the default.
        if (siteDirs !== null) {
          for (const p of rule.prefixes) {
            if (!siteDirs.some((d) => `${d}/`.startsWith(p))) {
              errors.push({ rule: 8, where: `${w}.rules[${i}]`, message: `prefix "${p}" matches no directory under site/` });
            }
          }
        }
      });
      for (const [r, words] of Object.entries(reg.forbidden_by_register ?? {})) {
        if (!known.includes(r)) errors.push({ rule: "structure", where: w, message: `forbidden_by_register.${r} names an unknown register` });
        if (!isStrArray(words)) errors.push({ rule: "structure", where: w, message: `forbidden_by_register.${r} must be a list of strings` });
      }
    }
  }

  if (glossary.gates !== undefined) {
    unknownKeys(glossary.gates, GATES_FIELDS, `${where0} gates`, errors);
    if (glossary.gates.passthrough_allow !== undefined && !isStrArray(glossary.gates.passthrough_allow)) {
      errors.push({ rule: "structure", where: `${where0} gates`, message: "passthrough_allow must be a list of strings" });
    }
  }

  if (!Array.isArray(glossary.changelog)) {
    errors.push({ rule: "structure", where: where0, message: "changelog must be a list" });
  } else {
    glossary.changelog.forEach((c, i) => {
      const w = `${where0} changelog[${i}]`;
      if (!Number.isInteger(c?.version)) errors.push({ rule: "structure", where: w, message: "version must be an integer" });
      if (!(typeof c?.date === "string" && DATE_RE.test(c.date))) errors.push({ rule: "structure", where: w, message: "date must be YYYY-MM-DD" });
      for (const f of ["terms", "phrases"]) {
        if (c?.[f] !== undefined && !Array.isArray(c[f])) errors.push({ rule: "structure", where: w, message: `${f} must be a list` });
      }
    });
  }

  for (const f of ["terms", "phrases"]) {
    const v = glossary[f];
    if (v === undefined) continue;
    if (!v || typeof v !== "object" || Array.isArray(v)) {
      errors.push({ rule: "structure", where: `${where0} ${f}`, message: "must be an object keyed by id (terms) or English (phrases)" });
    }
  }

  const byId = termsById(termsEn);
  const pv = new Set(preserveVerbatim);
  const items = entries(glossary);
  for (const item of items) {
    const where = `${where0} ${label(item)}`;
    if (!validateEntryShape(item, where, errors)) continue;
    const e = item.entry;

    // Rule 1: a term id must exist in the shared list. A typo would otherwise
    // enforce nothing and nobody would see it.
    if (item.kind === "term" && !byId.has(item.key)) {
      errors.push({ rule: 1, where, message: `"${item.key}" is not an id in terms.en.json`, refs: [item] });
    }
    if (item.kind === "phrase" && (!isStr(item.key))) {
      errors.push({ rule: "structure", where, message: "phrase key must be the English text, trimmed" });
    }

    // Rule 2: the target is an accepted form, and no rejection would fire on
    // an accepted form (that rejection would flag every correct page).
    if (isStr(e.target)) {
      if (e.forms !== undefined && Array.isArray(e.forms) && !e.forms.includes(e.target)) {
        errors.push({ rule: 2, where, message: `target "${e.target}" is not listed in forms`, refs: [item] });
      }
      for (const rej of Array.isArray(e.rejected) ? e.rejected : []) {
        if (!isStr(rej?.text)) continue;
        const bad = entryForms(e).find((f) => localRegExp(rej.text, rej).test(f));
        if (bad !== undefined) {
          errors.push({ rule: 2, where, message: `rejected "${rej.text}" matches the accepted form "${bad}"`, refs: [item] });
        }
      }
    }

    // Rule 4: keep_english means the rendering IS the English word.
    if (e.keep_english === true && isStr(e.target)) {
      const english = englishFormsOf(item, byId).map((m) => m.toLowerCase());
      if (!english.includes(e.target.toLowerCase())) {
        errors.push({ rule: 4, where, message: `keep_english is true but target "${e.target}" is not an English form (${englishFormsOf(item, byId).join(", ") || "none"})`, refs: [item] });
      }
    }

    // Rule 5: an approved entry names who approved it and when.
    if (e.status === "approved") {
      if (!Array.isArray(e.reviewed_by) || e.reviewed_by.length === 0) {
        errors.push({ rule: 5, where, message: "approved entries need a non-empty reviewed_by", refs: [item] });
      }
      if (!(typeof e.reviewed_at === "string" && DATE_RE.test(e.reviewed_at))) {
        errors.push({ rule: 5, where, message: "approved entries need reviewed_at (YYYY-MM-DD)", refs: [item] });
      }
    }

    // Rule 6: a protected name is verbatim everywhere; glossing it as well
    // would give two lists authority over one string.
    if (item.kind === "phrase" && pv.has(item.key)) {
      errors.push({ rule: 6, where, message: `"${item.key}" is in preserveVerbatim (a name is protected, not glossed)`, refs: [item] });
    }
    if (item.kind === "term") {
      const t = byId.get(item.key);
      if (t && pv.has(t.english)) {
        errors.push({ rule: 6, where, message: `"${t.english}" is in preserveVerbatim`, refs: [item] });
      }
    }
  }

  const approved = items.filter((it) => it.entry && it.entry.status === "approved" && isStr(it.entry.target) && APPLIES_TO.includes(it.entry.applies_to));
  errors.push(...clashErrors(approved, byId));
  return errors;
}

/** Throw a GlossaryError carrying every problem, or return the glossary. */
export function assertValid(glossary, ctx) {
  const errors = validateLocale(glossary, ctx);
  if (errors.length) throw new GlossaryError(errors);
  return glossary;
}

// ---- rule 7: version discipline against the base ---------------------------

// Stable JSON for comparison: key order in the file must not count as a change.
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

/**
 * Ids (terms) and English keys (phrases) whose approved state differs
 * between base and head: added, removed, edited, or moved in or out of
 * `approved`. Draft and disputed edits are free, they enforce nothing.
 */
export function changedApproved(base, head) {
  const out = { terms: [], phrases: [] };
  for (const f of ["terms", "phrases"]) {
    const a = base?.[f] ?? {};
    const b = head?.[f] ?? {};
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const x = a[key];
      const y = b[key];
      const wasApproved = x?.status === "approved";
      const isApproved = y?.status === "approved";
      if (!wasApproved && !isApproved) continue;
      if (canonical(x) !== canonical(y)) out[f].push(key);
    }
    out[f].sort();
  }
  return out;
}

/**
 * Rule 7: when an approved entry changes, `version` goes up by exactly one
 * and the changelog entry for the new version names every changed id. The
 * changelog is what a retrofit reads to find pages that need a second look,
 * so an unnamed change would never be retrofitted.
 *
 * @param {object|null} base  the glossary at the base ref, null if new there
 * @param {object} head
 */
export function checkVersionBump(base, head) {
  const where = `${head?.locale ?? "?"}.json`;
  if (!base) return [];
  const errors = [];
  const changed = changedApproved(base, head);
  const any = changed.terms.length + changed.phrases.length > 0;
  if (head.version < base.version) {
    errors.push({ rule: 7, where, message: `version went down (${base.version} -> ${head.version})` });
    return errors;
  }
  if (!any) {
    if (head.version > base.version + 1) {
      errors.push({ rule: 7, where, message: `version jumped by more than one (${base.version} -> ${head.version})` });
    }
    return errors;
  }
  if (head.version !== base.version + 1) {
    errors.push({ rule: 7, where, message: `approved entries changed (${[...changed.terms, ...changed.phrases].join(", ")}): version must be ${base.version + 1}, is ${head.version}` });
  }
  const log = (head.changelog ?? []).find((c) => c.version === head.version);
  if (!log) {
    errors.push({ rule: 7, where, message: `no changelog entry for version ${head.version}` });
    return errors;
  }
  for (const f of ["terms", "phrases"]) {
    const named = new Set(log[f] ?? []);
    const missing = changed[f].filter((k) => !named.has(k));
    if (missing.length) {
      errors.push({ rule: 7, where, message: `changelog for version ${head.version} does not name changed ${f}: ${missing.join(", ")}` });
    }
  }
  return errors;
}
