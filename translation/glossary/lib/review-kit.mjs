// Review kits: glossary -> Markdown tables for a native speaker, and back.
//
// Reviewers already know one format: the Markdown tables the Indonesian
// reviewer filled in (translation/glossary/test-fixtures/). `exportKit` writes
// that format from a glossary, with two additions that make the way back
// reliable: a stable ID column and an evidence column. `importKit` reads a
// filled kit, including the two real kits that predate the ID column, and
// produces the next glossary plus a report.
//
// The importer never guesses. A cell it cannot read as exactly one decision
// (two renderings, a verb/noun split, a free-text style answer, a label that
// would clash with another approved entry) goes to the "needs maintainer"
// list with a JSON stub, and the glossary is left as it was for that row.
// Same principle as equivalentForms in translation/lib/term-forms.mjs:
// declared, never inferred.
//
// Pure like lib/glossary.mjs: callers read files and the corpus and pass them
// in. Output is deterministic (no dates, stable ordering), so a kit can be
// committed as the fixed scope of a review.

import {
  canonical,
  englishFormsOf,
  entries,
  entryForms,
  countEnglish,
  countLocal,
  findRejected,
  META_FIELDS,
  renderingClashes,
  STYLE_FIELDS,
  termsById,
  validateLocale,
} from "./glossary.mjs";

export const UI_SECTIONS = ["navigation", "menuLabels", "exploreMenu", "sideMenu"];

const UI_SECTION_TITLES = {
  navigation: "Top menu (header) and its submenus",
  menuLabels: "Submenu entries (page names in the menus)",
  exploreMenu: "Yellow coin menu (bottom right)",
  sideMenu: "Side menu on article pages",
  phrases: "Other approved phrases",
};

// ---- small helpers ---------------------------------------------------------

const cellEscape = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const row = (cells) => `| ${cells.map(cellEscape).join(" | ")} |`;
const isOk = (s) => /^ok\.?$/i.test(s.trim());
const ci = (a, b) => a.toLowerCase() === b.toLowerCase();
const unquote = (s) => s.trim().replace(/^["\u201c\u201d']+|["\u201c\u201d']+$/g, "").trim();
const isOptionsList = (s) => /\s\/\s/.test(s);
const fmt = (n) => n.toLocaleString("en-US");

function splitRow(line) {
  // "| a | b \| c |" -> ["a", "b | c"]. Escaped pipes stay inside the cell.
  const body = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = [];
  let cur = "";
  for (let i = 0; i < body.length; i++) {
    if (body[i] === "\\" && body[i + 1] === "|") {
      cur += "|";
      i++;
    } else if (body[i] === "|") {
      cells.push(cur.trim());
      cur = "";
    } else {
      cur += body[i];
    }
  }
  cells.push(cur.trim());
  return cells;
}

/** A UI label made only of protected names: listed as a name, not reviewed. */
export function isNameOnly(label, names) {
  let rest = label;
  for (const n of [...names].sort((a, b) => b.length - a.length)) {
    const esc = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    rest = rest.replace(new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, "giu"), " ");
  }
  return !/\p{L}/u.test(rest);
}

// ---- parsing a filled kit --------------------------------------------------

/**
 * Find every review table (one with a ✅ column) in a kit.
 * @returns {{kind: "pages"|"ui"|"style", section: string, rows: object[]}[]}
 */
export function parseKit(md) {
  const lines = md.split(/\r?\n/);
  const tables = [];
  let marker = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) marker = null;
    const m = line.match(/^\(`([A-Za-z]+)`/);
    if (m) marker = m[1];
    if (!line.trim().startsWith("|") || !/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) continue;
    const header = splitRow(line);
    const confirm = header.findIndex((h) => h.includes("\u2705"));
    if (confirm < 0) {
      i += 1;
      continue;
    }
    const col = (re) => header.findIndex((h) => re.test(h));
    const idx = {
      num: col(/^#$/),
      id: col(/^ID$/),
      english: col(/^(English|Question)$/),
      notes: col(/^Notes$/i),
      confirm,
      proposed: confirm - 1,
    };
    const kind = col(/^Question$/) >= 0 ? "style" : marker && marker !== "terms" ? "ui" : "pages";
    const section = kind === "style" ? "style" : marker ?? "terms";
    const rows = [];
    let j = i + 2;
    for (; j < lines.length && lines[j].trim().startsWith("|"); j++) {
      const c = splitRow(lines[j]);
      rows.push({
        line: j + 1,
        num: idx.num >= 0 ? c[idx.num] : String(rows.length + 1),
        id: idx.id >= 0 ? c[idx.id] : "",
        english: c[idx.english] ?? "",
        proposed: idx.proposed > idx.english ? (c[idx.proposed] ?? "") : "",
        confirmed: c[idx.confirm] ?? "",
        notes: idx.notes >= 0 ? (c[idx.notes] ?? "") : "",
      });
    }
    tables.push({ kind, section, rows });
    i = j - 1;
  }
  return tables;
}

/**
 * Read one ✅ cell. Returns {decision} where decision.kind is
 * "empty" | "ok" | "keep" | "render" | "maintainer".
 */
export function readCell({ confirmed, proposed, notes }) {
  const c = confirmed.trim();
  if (!c) return { kind: "empty" };
  if (isOk(c)) {
    if (!proposed.trim()) return { kind: "maintainer", reason: "OK, but the kit proposed nothing" };
    if (isOptionsList(proposed)) return { kind: "maintainer", reason: `OK on a list of options ("${proposed}")` };
    return { kind: "ok", target: unquote(proposed) };
  }
  const keep = c.match(/^keep\s+(?:english|in english)\b\.?$/i) || c.match(/^keep\s+["\u201c](.+?)["\u201d]\s*$/i);
  if (keep) return { kind: "keep", target: keep[1] ? keep[1].trim() : null };
  if (isOptionsList(c) || c.includes(";")) return { kind: "maintainer", reason: `more than one rendering ("${c}")` };
  if (/\b(verb|noun)\b/i.test(notes)) return { kind: "maintainer", reason: `rendering depends on part of speech ("${notes}")` };
  return { kind: "render", target: unquote(c) };
}

// ---- import ----------------------------------------------------------------

function resolveTerm(rowData, termsEn, byId) {
  if (rowData.id) return byId.has(rowData.id) ? rowData.id : null;
  // Kits from before the ID column: "shielded (address, transaction, pool)",
  // "custody / custodial". Strip the gloss, try each alternative against the
  // headword and the declared English forms.
  const head = rowData.english.replace(/\(.*?\)/g, "").replace(/\*/g, "").trim();
  for (const part of head.split(/\s\/\s/).map((s) => s.trim()).filter(Boolean)) {
    const t = termsEn.terms.find((x) => ci(x.english, part)) ?? termsEn.terms.find((x) => x.match.some((m) => ci(m, part)));
    if (t) return t.id;
  }
  return null;
}

const STYLE_BY_QUESTION = [
  [/address|register|\bkamu\b|\banda\b/i, "register"],
  [/bracket/i, "english_in_brackets"],
  [/loanword/i, "loanwords"],
  [/capitali[sz]/i, "capitalise_kept_english_at_sentence_start"],
  [/abbreviation/i, "abbreviations_with_full_stop"],
  [/decimal/i, "decimal_separator"],
  [/numeral|digit/i, "numerals"],
  [/quot/i, "quotes"],
];

function styleField(r) {
  if (r.id) return r.id;
  return STYLE_BY_QUESTION.find(([re]) => re.test(r.english))?.[1] ?? null;
}

function readStyle(field, answer) {
  const a = answer.trim();
  if (field === "english_in_brackets") {
    if (/^never\b/i.test(a)) return { value: "never" };
    if (/^always\b/i.test(a)) return { value: "always" };
    if (/^(first|yes,? first)/i.test(a)) return { value: "first-use" };
  }
  if (field === "loanwords") {
    if (/^keep\s+english\b/i.test(a)) return { value: "keep-english" };
    if (/^translate\b/i.test(a)) return { value: "translate" };
  }
  if (field === "capitalise_kept_english_at_sentence_start") {
    if (/^(yes|true)\b/i.test(a)) return { value: true };
    if (/^(no|false)\b/i.test(a)) return { value: false };
  }
  return null;
}

/**
 * Apply a filled kit to a glossary.
 *
 * @param {object} args
 * @param {object} args.glossary  current <loc>.json (not modified)
 * @param {object} args.termsEn
 * @param {string} args.md  the filled kit
 * @param {string} args.reviewer
 * @param {string} args.date  YYYY-MM-DD
 * @param {string} args.sourceName  file name recorded in `source`
 * @param {string[]} [args.preserveVerbatim]
 * @param {string[]} [args.brands]  extra names (the website's MENU_BRANDS)
 * @param {string[]|null} [args.siteDirs]  for rule 8, as in validateLocale
 * @returns {{glossary: object, report: object}}
 */
export function importKit({ glossary, termsEn, md, reviewer, date, sourceName, preserveVerbatim = [], brands = [], siteDirs = null }) {
  const byId = termsById(termsEn);
  const pv = new Set(preserveVerbatim);
  const names = [...new Set([...preserveVerbatim, ...brands])];
  const next = structuredClone(glossary);
  next.terms ??= {};
  next.phrases ??= {};
  const report = { new: [], changed: [], unchanged: [], notReviewed: [], needsMaintainer: [], skippedNames: [], errors: [], style: [] };
  const tables = parseKit(md);
  if (!tables.length) report.errors.push("no table with a \u2705 column found");

  // Pass 1: one decision per row, grouped by the entry it targets, so rows
  // that name the same label in two menus are reconciled before anything is
  // written.
  const groups = new Map(); // "term:id" | "phrase:English" -> {kind, key, rows: []}
  let styleChanged = false;
  for (const table of tables) {
    for (const r of table.rows) {
      const where = `${table.section} #${r.num}`;
      const src = `${sourceName}#${table.section}-${r.num}`;
      if (table.kind === "style") {
        const field = styleField(r);
        const c = r.confirmed.trim();
        if (!c) { report.notReviewed.push(`${where} (style)`); continue; }
        if (isOk(c)) { report.unchanged.push(`style.${field ?? r.english}`); continue; }
        const parsed = field ? readStyle(field, c) : null;
        next.style ??= {};
        if (parsed) {
          if (canonical(next.style[field]) !== canonical(parsed.value)) {
            next.style[field] = parsed.value;
            styleChanged = true;
            report.style.push(`style.${field} = ${JSON.stringify(parsed.value)} (${where})`);
          } else {
            report.unchanged.push(`style.${field}`);
          }
          continue;
        }
        // Free text ("maybe kamu for tutorials and guides"): kept verbatim in
        // style.notes, and turning it into rules is a maintainer decision.
        const note = `Reviewer (${field ?? r.english}): ${c}`;
        if (!(next.style.notes ?? "").includes(note)) {
          next.style.notes = next.style.notes ? `${next.style.notes}\n${note}` : note;
          styleChanged = true;
        }
        report.needsMaintainer.push({ where, english: r.english, reason: "free-text style answer, copied to style.notes", cell: c, stub: field ? { [`style.${field}`]: "?" } : null });
        continue;
      }

      let kind;
      let key;
      if (table.kind === "pages") {
        key = resolveTerm(r, termsEn, byId);
        if (!key) {
          report.errors.push(`${where}: "${r.id || r.english}" is not a term in terms.en.json`);
          continue;
        }
        kind = "term";
      } else {
        key = r.english.trim();
        kind = "phrase";
        if (!key) continue;
      }
      const d = readCell(r);
      if (d.kind === "empty") { report.notReviewed.push(`${where} ${key}`); continue; }
      const gk = `${kind}:${key}`;
      if (!groups.has(gk)) groups.set(gk, { kind, key, rows: [] });
      groups.get(gk).rows.push({ ...r, where, src, d });
    }
  }

  // Pass 2: reconcile and apply.
  const touched = new Map(); // gk -> previous entry (undefined if new)
  for (const [gk, g] of groups) {
    const term = g.kind === "term" ? byId.get(g.key) : null;
    const englishForms = g.kind === "term" ? [term.english, ...term.match] : [g.key];
    const maint = g.rows.find((x) => x.d.kind === "maintainer");
    if (maint) {
      report.needsMaintainer.push({ where: maint.where, english: g.key, reason: maint.d.reason, cell: maint.confirmed, notes: maint.notes, stub: stubFor(g, maint) });
      continue;
    }
    const decided = g.rows.map((x) => {
      const keep = x.d.kind === "keep" || (x.d.target && englishForms.some((f) => ci(f, x.d.target)));
      const target = x.d.kind === "keep" ? (x.d.target ?? (g.kind === "term" ? term.english : g.key)) : x.d.target;
      return { ...x, keep, target };
    });
    const targets = [...new Set(decided.map((x) => x.target))];
    if (targets.length > 1) {
      report.needsMaintainer.push({
        where: decided.map((x) => x.where).join(", "),
        english: g.key,
        reason: `rows disagree: ${targets.map((t) => `"${t}"`).join(" vs ")}`,
        stub: { [g.kind === "term" ? `terms.${g.key}` : `phrases["${g.key}"]`]: { target: "?", applies_to: g.kind === "term" ? term.applies_to : "ui" } },
      });
      continue;
    }
    const target = targets[0];
    const keep = decided.some((x) => x.keep);

    if (g.kind === "phrase") {
      if (keep && (pv.has(g.key) || isNameOnly(g.key, names))) {
        report.skippedNames.push(g.key);
        continue;
      }
      if (pv.has(g.key)) {
        report.needsMaintainer.push({ where: decided[0].where, english: g.key, reason: `a protected name, but the kit renders it "${target}"`, stub: null });
        continue;
      }
    }

    const bag = g.kind === "term" ? next.terms : next.phrases;
    const prev = bag[g.key];
    if (prev && prev.status === "approved" && prev.target === target && Boolean(prev.keep_english) === keep) {
      report.unchanged.push(g.key);
      continue;
    }
    const entry = prev ? structuredClone(prev) : { applies_to: g.kind === "term" ? term.applies_to : "ui" };
    const targetChanged = !prev || prev.target !== target;
    entry.target = target;
    if (keep) entry.keep_english = true;
    else delete entry.keep_english;
    if (targetChanged) {
      if (g.kind === "term") {
        entry.forms = keep ? [...new Set([target, ...term.match])] : [target];
      } else {
        delete entry.forms;
      }
    }
    // The old proposal goes to rejected when the reviewer replaced it, so a
    // checker learns that "Isi Ulang Pulsa" is wrong. A list of options is
    // not a proposal: "catatan" being offered for "memo" does not make it
    // wrong elsewhere, so unchosen options are reported, never rejected.
    const rejected = [...(entry.rejected ?? [])];
    const addRejected = (text) => {
      if (!text || ci(text, target) || isOptionsList(text) || /^keep\b/i.test(text)) return;
      if (rejected.some((x) => x.text === text)) return;
      rejected.push({ text });
    };
    for (const x of decided) if (x.d.kind !== "ok") addRejected(unquote(x.proposed));
    if (prev && prev.status === "approved" && targetChanged) addRejected(prev.target);
    const forms = entryForms(entry).map((f) => f.toLowerCase());
    entry.rejected = rejected.filter((x) => !forms.some((f) => f.includes(x.text.toLowerCase())));
    if (!entry.rejected.length) delete entry.rejected;
    entry.status = "approved";
    delete entry.dispute;
    entry.reviewed_by = [reviewer];
    entry.reviewed_at = date;
    entry.source = decided[0].src;
    const notes = [...new Set(decided.map((x) => x.notes.trim()).filter(Boolean))];
    if (notes.length) entry.notes = notes.join(" ");
    const options = decided.map((x) => x.proposed).filter(isOptionsList);
    if (options.length) report.style.push(`${g.key}: unchosen options not recorded as rejected (${options.join("; ")})`);
    touched.set(gk, prev);
    bag[g.key] = entry;
    (prev ? report.changed : report.new).push(g.key);
  }

  // Pass 3: validate, and hand anything that breaks a rule back to a person
  // instead of writing it. Typical case: a label kept in English that holds
  // a translated word ("Shielded Labs" next to shielded -> terlindungi).
  for (let round = 0; round < 50; round++) {
    const errors = validateLocale({ ...next, version: Math.max(1, next.version ?? 1) }, { termsEn, preserveVerbatim, siteDirs });
    const blamed = new Set();
    // Every imported entry an error names is handed back, not just the
    // first: both sides of a clash need the same human decision.
    for (const e of errors) {
      for (const hit of (e.refs ?? []).map((it) => `${it.kind}:${it.key}`)) {
        if (!touched.has(hit) || blamed.has(hit)) continue;
        blamed.add(hit);
        const [kind, ...rest] = hit.split(":");
        const key = rest.join(":");
        const bag = kind === "term" ? next.terms : next.phrases;
        const attempted = bag[key];
        if (touched.get(hit) === undefined) delete bag[key];
        else bag[key] = touched.get(hit);
        touched.delete(hit);
        for (const list of [report.new, report.changed]) {
          const i = list.indexOf(key);
          if (i >= 0) list.splice(i, 1);
        }
        report.needsMaintainer.push({ where: attempted.source, english: key, reason: `would break [rule ${e.rule}]: ${e.message}`, stub: { [kind === "term" ? `terms.${key}` : `phrases["${key}"]`]: attempted } });
      }
    }
    if (!blamed.size) {
      report.errors.push(...errors.map((e) => `[rule ${e.rule}] ${e.where}: ${e.message}`));
      break;
    }
  }

  const changedTerms = [...touched.keys()].filter((k) => k.startsWith("term:")).map((k) => k.slice(5)).sort();
  const changedPhrases = [...touched.keys()].filter((k) => k.startsWith("phrase:")).map((k) => k.slice(7)).sort();
  report.changedTerms = changedTerms;
  report.changedPhrases = changedPhrases;
  if (changedTerms.length || changedPhrases.length || styleChanged) {
    next.version = (glossary.version ?? 0) + 1;
    next.meta = { ...(next.meta ?? {}), last_review: date };
    next.changelog = [...(next.changelog ?? []), {
      version: next.version,
      date,
      terms: changedTerms,
      phrases: changedPhrases,
      summary: `Imported ${sourceName} (reviewed by ${reviewer})${styleChanged ? ", style answers" : ""}`,
    }];
  } else {
    next.version = glossary.version;
  }
  for (const f of ["terms", "phrases"]) if (!Object.keys(next[f]).length && glossary[f] === undefined) delete next[f];
  return { glossary: next, report };
}

function stubFor(g, row) {
  const key = g.kind === "term" ? `terms.${g.key}` : `phrases["${g.key}"]`;
  return { [key]: { target: "?", forms: ["?"], inflection: row.notes || undefined, applies_to: g.kind === "term" ? "both" : "ui", status: "approved" } };
}

/** Human-readable import report. */
export function renderReport(report) {
  const out = [];
  const list = (title, items) => {
    out.push(`## ${title} (${items.length})`, "");
    for (const i of items) out.push(`- ${i}`);
    out.push("");
  };
  list("New", report.new);
  list("Changed", report.changed);
  list("Unchanged", report.unchanged);
  list("Not reviewed", report.notReviewed);
  list("Skipped: names kept in English", report.skippedNames);
  list("Style and notes", report.style);
  out.push(`## Needs maintainer (${report.needsMaintainer.length})`, "");
  for (const m of report.needsMaintainer) {
    out.push(`- **${m.english}** (${m.where}): ${m.reason}${m.cell ? `. Cell: "${m.cell}"` : ""}${m.notes ? `. Notes: "${m.notes}"` : ""}`);
    if (m.stub) out.push("", "  ```json", ...JSON.stringify(m.stub, null, 2).split("\n").map((l) => `  ${l}`), "  ```");
  }
  out.push("");
  list("Errors", report.errors);
  return out.join("\n");
}

// ---- serialising -----------------------------------------------------------

const TOP_ORDER = ["locale", "version", "meta", "style", "terms", "phrases", "gates", "changelog"];
const ENTRY_ORDER = ["target", "keep_english", "forms", "stem", "examples", "rejected", "inflection", "pos", "context", "applies_to", "status", "dispute", "notes", "reviewed_by", "reviewed_at", "source"];

function ordered(obj, order) {
  const out = {};
  for (const k of order) if (obj[k] !== undefined) out[k] = obj[k];
  for (const k of Object.keys(obj).sort()) if (!(k in out)) out[k] = obj[k];
  return out;
}

/**
 * Stable JSON for a locale glossary: terms in terms.en.json order, phrases
 * sorted by English, entry fields in a fixed order. Re-importing an unchanged
 * kit therefore rewrites the file byte for byte.
 */
export function serializeGlossary(glossary, termsEn) {
  const g = ordered(glossary, TOP_ORDER);
  if (g.meta) g.meta = ordered(g.meta, META_FIELDS);
  if (g.style) g.style = ordered(g.style, STYLE_FIELDS);
  const rank = new Map((termsEn?.terms ?? []).map((t, i) => [t.id, i]));
  if (g.terms) {
    const keys = Object.keys(g.terms).sort((a, b) => (rank.get(a) ?? 1e9) - (rank.get(b) ?? 1e9) || (a < b ? -1 : a > b ? 1 : 0));
    g.terms = Object.fromEntries(keys.map((k) => [k, ordered(g.terms[k], ENTRY_ORDER)]));
  }
  if (g.phrases) {
    const keys = Object.keys(g.phrases).sort((a, b) => {
      const x = a.toLowerCase();
      const y = b.toLowerCase();
      return x < y ? -1 : x > y ? 1 : a < b ? -1 : a > b ? 1 : 0;
    });
    g.phrases = Object.fromEntries(keys.map((k) => [k, ordered(g.phrases[k], ENTRY_ORDER)]));
  }
  return `${JSON.stringify(g, null, 2)}\n`;
}

// ---- evidence ---------------------------------------------------------------

/**
 * Occurrences of each term in the English pages, and what the locale's pages
 * contain for it today. Counts are computed, never stored: they go stale.
 *
 * @param {object} termsEn
 * @param {object} glossary
 * @param {{en: string, tr: string|null}[]} pairs  curated pages
 * @returns {Map<string, {occurrences: number, seen: string}>}
 */
export function computeEvidence(termsEn, glossary, pairs) {
  const out = new Map();
  for (const t of termsEn.terms) {
    let occurrences = 0;
    const counts = new Map();
    const bump = (label, n) => { if (n) counts.set(label, (counts.get(label) ?? 0) + n); };
    const entry = glossary?.terms?.[t.id];
    for (const { en, tr } of pairs) {
      const n = t.match.reduce((s, m) => s + countEnglish(m, en), 0);
      occurrences += n;
      if (!tr || !n) continue;
      if (entry) {
        for (const f of new Set(entryForms(entry).map((x) => x.toLowerCase()))) bump(f, countLocal(f, tr, { word: true, ci: true }));
        for (const h of findRejected(entry, tr, en)) bump(`${h.text} (rejected)`, 1);
      }
      if (!entry?.keep_english) {
        for (const m of new Set(t.match.map((x) => x.toLowerCase()))) bump(`${m} (English)`, countLocal(m, tr, { word: true, ci: true }));
      }
    }
    const seen = [...counts].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).map(([k, v]) => `${k} \u00d7${fmt(v)}`).join(", ");
    out.set(t.id, { occurrences, seen });
  }
  return out;
}

// ---- export -----------------------------------------------------------------

function leaves(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj ?? {})) {
    if (typeof v === "string") out.push({ path: [...prefix, k], value: v });
    else if (v && typeof v === "object") out.push(...leaves(v, [...prefix, k]));
  }
  return out;
}

const get = (obj, path) => path.reduce((o, k) => (o == null ? undefined : o[k]), obj);

function styleRows(glossary) {
  const s = glossary.style ?? {};
  const reg = s.register;
  const regText = reg
    ? `default ${reg.default}; ${(reg.rules ?? []).map((r) => `${r.register} for ${r.prefixes.join(", ")}`).join("; ")}${reg.ui ? `; menus and buttons ${reg.ui}` : ""}`
    : "";
  return [
    ["A", "register", "How to address the reader (formal or informal 'you'), and does it differ between tutorials and technical pages?", regText],
    ["B", "english_in_brackets", "When an English term is kept, add the English in brackets: never / first-use / always?", s.english_in_brackets ?? ""],
    ["C", "loanwords", "Crypto loanwords (blockchain, token, smart contract): keep English / translate?", s.loanwords ?? ""],
    ["D", "capitalise_kept_english_at_sentence_start", "Capitalise a kept English term at the start of a sentence (yes / no)?", s.capitalise_kept_english_at_sentence_start === undefined ? "" : s.capitalise_kept_english_at_sentence_start ? "yes" : "no"],
    ["E", "numerals", "Digits: western (0-9) only, or native digits allowed?", s.numerals ?? ""],
    ["F", "decimal_separator", "Decimal separator (0.5 or 0,5)?", s.decimal_separator ?? ""],
    ["G", "quotes", "Quotation marks?", s.quotes ?? ""],
    ["H", "abbreviations_with_full_stop", "Abbreviations written with a full stop that do not end a sentence?", (s.abbreviations_with_full_stop ?? []).join(", ")],
  ];
}

function conflictLines(glossary, termsEn) {
  const out = [];
  for (const { kind, key, entry } of entries(glossary)) {
    if (entry.status === "disputed") out.push(row(["disputed", kind === "term" ? key : `"${key}"`, entry.dispute ?? "", ""]));
  }
  for (const c of renderingClashes(glossary, termsEn)) {
    const [a, b] = c.refs;
    const both = [a, b].every((x) => (x.entry.context ?? "").trim());
    out.push(row([
      both ? "split (with context)" : "clash",
      `${a.kind === "term" ? a.key : `"${a.key}"`} / ${b.kind === "term" ? b.key : `"${b.key}"`}`,
      c.message,
      both ? `${a.entry.context} / ${b.entry.context}` : "",
    ]));
  }
  if (!out.length) return ["No conflicts.", ""];
  return [row(["Kind", "Entries", "Detail", "Context"]), "|---|---|---|---|", ...out, ""];
}

/**
 * Write a review kit.
 *
 * @param {object} args
 * @param {object} args.glossary
 * @param {object} args.termsEn
 * @param {"pages"|"ui"|"all"} args.kit
 * @param {string[]} [args.termIds]  restrict the pages kit
 * @param {Map} [args.evidence]  from computeEvidence; omitted = blank columns
 * @param {object} [args.dict]  website dictionaries/<loc>.json (UI kit)
 * @param {object} [args.enDict]  website dictionaries/en.json (UI kit)
 * @param {string[]} [args.preserveVerbatim]
 * @param {string[]} [args.brands]
 */
export function exportKit({ glossary, termsEn, kit, termIds = null, evidence = null, dict = null, enDict = null, preserveVerbatim = [], brands = [] }) {
  const loc = glossary.locale;
  const lang = glossary.meta?.language_name ?? loc;
  const byId = termsById(termsEn);
  const out = [];
  out.push(`# ZecHub glossary review: ${lang} (\`${loc}\`)`, "");
  out.push(`Glossary version ${glossary.version}. Kit: ${kit}.`, "");
  out.push(
    "**How to fill in:** in the **\u2705** column write `OK` if the proposed rendering is right, `keep English` to use the English word, or the rendering you would use. Write one rendering per cell; if it depends on the context (verb or noun, menu or page), say so in Notes and a maintainer will record it. Leave a cell empty if you are not sure. Do not edit the ID column.",
    "",
    "Names that stay in English in every language (brands, products, programmes) are not in these tables.",
    "",
    "## Conflicts to decide first",
    "",
    ...conflictLines(glossary, termsEn),
  );

  if (kit === "pages" || kit === "all") {
    let terms = termsEn.terms.filter((t) => t.applies_to !== "ui");
    if (termIds) terms = terms.filter((t) => termIds.includes(t.id));
    if (evidence) {
      const order = new Map(termsEn.terms.map((t, i) => [t.id, i]));
      terms = [...terms].sort((a, b) => (evidence.get(b.id)?.occurrences ?? 0) - (evidence.get(a.id)?.occurrences ?? 0) || order.get(a.id) - order.get(b.id));
    }
    out.push("## Terms in wiki pages", `(\`terms\`: ${terms.length} rows)`, "");
    out.push(row(["#", "ID", "English", "Meaning", "Occurrences", `Seen today in \`${loc}\` pages`, "Proposed", "\u2705 Confirmed", "Notes"]));
    out.push("|---|---|---|---|---:|---|---|---|---|");
    terms.forEach((t, i) => {
      const e = glossary.terms?.[t.id];
      let meaning = t.definition;
      if (t.not_to_be_confused_with) meaning += ` Not: ${t.not_to_be_confused_with}`;
      if (e?.context) meaning += ` Context: ${e.context}`;
      if (e?.inflection) meaning += ` Forms: ${e.inflection}`;
      if (e?.status === "disputed") meaning += ` Disputed: ${e.dispute ?? "see conflicts"}`;
      if (!e && t.default_policy === "keep-english") meaning += " Suggestion: keep English.";
      const ev = evidence?.get(t.id);
      out.push(row([i + 1, t.id, t.english, meaning, ev ? fmt(ev.occurrences) : "", ev?.seen ?? "", e && e.status !== "disputed" ? e.target : "", "", ""]));
    });
    out.push("");
    out.push("## General style questions", "(`style`: 8 questions)", "");
    out.push(row(["#", "ID", "Question", "Current", "\u2705 Answer", "Notes"]));
    out.push("|---|---|---|---|---|---|");
    for (const [n, id, q, cur] of styleRows(glossary)) out.push(row([n, id, q, cur, "", ""]));
    out.push("");
  }

  if (kit === "ui" || kit === "all") {
    if (!dict || !enDict) throw new Error("the UI kit needs the website dictionaries (--dict and --en-dict)");
    const names = [...new Set([...preserveVerbatim, ...brands])];
    const kept = new Set();
    const seenLabels = new Set();
    const proposeFor = (english, current) => {
      const p = glossary.phrases?.[english];
      if (p) return p.status === "disputed" ? "" : p.target;
      const t = entries(glossary).find((it) => it.kind === "term" && it.entry.applies_to !== "pages" && it.entry.status !== "disputed" && englishFormsOf(it, byId).includes(english));
      if (t) return t.entry.target;
      return current ?? "";
    };
    for (const section of UI_SECTIONS) {
      const items = leaves(enDict[section], [section]);
      const rows = [];
      for (const { path, value } of items) {
        const english = value.trim();
        seenLabels.add(english);
        if (preserveVerbatim.includes(english) || isNameOnly(english, names)) {
          kept.add(english);
          continue;
        }
        rows.push([path.join("."), english, proposeFor(english, get(dict, path))]);
      }
      out.push(`## ${UI_SECTION_TITLES[section]}`, `(\`${section}\`: ${rows.length} labels)`, "");
      out.push(row(["#", "ID", "English", lang, "\u2705 Confirmed", "Notes"]));
      out.push("|---:|---|---|---|---|---|");
      rows.forEach(([id, en, prop], i) => out.push(row([i + 1, id, en, prop, "", ""])));
      out.push("");
    }
    const others = Object.entries(glossary.phrases ?? {})
      .filter(([k, e]) => e.applies_to !== "pages" && !seenLabels.has(k))
      .map(([k]) => k)
      .sort();
    if (others.length) {
      out.push(`## ${UI_SECTION_TITLES.phrases}`, `(\`phrases\`: ${others.length} labels)`, "");
      out.push(row(["#", "ID", "English", lang, "\u2705 Confirmed", "Notes"]));
      out.push("|---:|---|---|---|---|---|");
      others.forEach((k, i) => out.push(row([i + 1, "phrase", k, proposeFor(k, ""), "", ""])));
      out.push("");
    }
    out.push("## Names kept in English (no need to check)", "", [...kept].sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1)).join(", "), "");
  }
  return out.join("\n");
}

/** Fill every empty ✅ cell with OK (the round-trip test and a quick re-confirm). */
export function markAllOk(md) {
  const lines = md.split("\n");
  let confirm = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.startsWith("|")) { confirm = -1; continue; }
    if (/^\|[\s:|-]+\|$/.test(l)) continue;
    const cells = splitRow(l);
    if (cells.some((c) => c.includes("\u2705"))) { confirm = cells.findIndex((c) => c.includes("\u2705")); continue; }
    if (confirm < 0) continue;
    cells[confirm] = cells[confirm] || "OK";
    lines[i] = row(cells);
  }
  return lines.join("\n");
}
