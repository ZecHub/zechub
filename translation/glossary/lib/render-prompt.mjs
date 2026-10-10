// Prompt heads generated from the glossary.
//
// A prompt head is the instruction text that goes in front of every page or
// block sent to a language model. It used to be one hand-written file per
// locale in the private runner (prompt_head_<loc>.txt) plus a register table
// (prompt_register.json). It is now built from three public pieces:
//
//   translation/glossary/prompt-template.md   the rules every locale shares
//   translation/glossary/<loc>.json           meta, style, terms, phrases
//   translation/glossary/terms.en.json        the English forms to look for
//
// This module is pure, like lib/glossary.mjs: callers read the files and the
// page text and pass them in. render-prompt.mjs is the CLI around it.
//
// Template syntax, deliberately small:
//   <!-- ... -->               comments, removed (may span lines)
//   {{LANGUAGE}} {{VARIETY}}   replaced inline
//   {{REGISTER}} {{STYLE}} {{TERMS}}
//                              on a line of their own: replaced by zero or
//                              more lines; the line disappears when empty
//   {{#TERMS}} ... {{/TERMS}}  kept only when at least one term line renders

import { englishFormsOf, englishHas, entries, registerFor, termsById } from "./glossary.mjs";

export const PLACEHOLDERS = ["LANGUAGE", "VARIETY", "REGISTER", "STYLE", "TERMS"];

// ---- style ------------------------------------------------------------------

const BRACKETS_TEXT = {
  never: "When a term is kept in English, write it as is. NEVER add the English original in brackets after a translated word.",
  "first-use": "Add the English original in brackets after a translated term at its first use on the page only.",
  always: "Add the English original in brackets after each translated term.",
};

const LOANWORDS_TEXT = {
  "keep-english": "Crypto loanwords such as blockchain, token, smart contract → keep in English.",
  translate: "Translate crypto loanwords with the established {{LANGUAGE}} term where one exists.",
};

const CAPITALISE_TEXT =
  "Start every sentence with a capital letter, including when the first word is a term kept in English. Lowercase English terms in the terminology list are lowercase only in the middle of a sentence.";

/**
 * The style rules of a locale as prompt lines (without the "- " bullet), in a
 * fixed order. Each line is tagged with the style field it comes from, so the
 * legacy-coverage check can name it.
 */
export function styleLines(glossary) {
  const s = glossary?.style ?? {};
  const lang = glossary?.meta?.language_name ?? "";
  const out = [];
  const ex = s.examples ?? {};
  const add = (field, text) => {
    let t = text.replaceAll("{{LANGUAGE}}", lang);
    if (ex[field]) t = `${t.replace(/\.$/, "")} (e.g. ${ex[field]}).`;
    out.push({ field, text: t });
  };
  if (s.loanwords_text) add("loanwords_text", s.loanwords_text);
  else if (LOANWORDS_TEXT[s.loanwords]) add("loanwords", LOANWORDS_TEXT[s.loanwords]);
  if (BRACKETS_TEXT[s.english_in_brackets]) add("english_in_brackets", BRACKETS_TEXT[s.english_in_brackets]);
  if (s.capitalise_kept_english_at_sentence_start === true) add("capitalise_kept_english_at_sentence_start", CAPITALISE_TEXT);
  if (s.numerals === "western") add("numerals", "Write numbers with Western digits (0-9).");
  else if (s.numerals === "native-allowed") add("numerals", `Native ${lang} digits are allowed; use one kind of digit consistently within a page.`);
  else if (s.numerals) add("numerals", `Numerals: ${s.numerals}.`);
  if (s.decimal_separator) add("decimal_separator", `Use "${s.decimal_separator}" as the decimal separator.`);
  if (s.quotes) add("quotes", `Use ${s.quotes} for quotation marks.`);
  return out;
}

/** The register instruction for a page (or the UI), or null. */
export function registerText(glossary, relPath, { ui = false } = {}) {
  const reg = registerFor(glossary, relPath, { ui });
  if (reg == null) return null;
  const text = glossary.style.register.text?.[reg];
  if (typeof text !== "string") throw new Error(`register "${reg}" has no text in style.register.text`);
  return { register: reg, text };
}

// ---- terms ------------------------------------------------------------------

const q = (s) => `"${s}"`;

function distinctForms(entry) {
  const seen = new Set();
  const out = [];
  for (const f of [entry.target, ...(entry.forms ?? [])]) {
    const k = f.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(f);
  }
  return out;
}

function rejectedText(rej) {
  const unless = rej.unless_english_has ?? [];
  return unless.length ? `${q(rej.text)} (fine where the English says ${unless.map(q).join(" or ")})` : q(rej.text);
}

const sentence = (s) => {
  const t = s.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
};

/**
 * One prompt line for an entry, in the style of the legacy Indonesian head:
 *   shielded → terlindungi (e.g. "alamat terlindungi"). Never "terproteksi".
 */
export function termLine(item, byId) {
  const e = item.entry;
  const head = item.kind === "phrase" ? q(item.key) : byId.get(item.key)?.english ?? item.key;
  let line;
  if (e.keep_english) {
    line = `${head} → ${item.kind === "phrase" ? q(e.target) : e.target} (keep the English word)`;
  } else {
    const forms = item.kind === "phrase" ? [q(e.target)] : distinctForms(e);
    line = `${head} → ${forms.join(" / ")}`;
  }
  if (e.examples?.length) line += ` (e.g. ${e.examples.map(q).join(", ")})`;
  let tail = "";
  if (e.inflection) tail += ` ${sentence(e.inflection)}`;
  if (e.context) tail += ` Context: ${sentence(e.context)}`;
  if (e.rejected?.length) tail += ` Never ${e.rejected.map(rejectedText).join(", ")}.`;
  return tail ? `${sentence(line)}${tail}` : line;
}

// The prompt filter errs towards including a term: a term the page has but the
// prompt leaves out costs translation quality, an extra line costs nothing.
// So it ignores case ("Viewing Keys", "MINER") and treats a hyphen and a space
// as the same ("full-node", "light client"). The strict englishHas() stays the
// matcher for the checks, and for phrases (exact titles and labels).
const looseCache = new Map();
export function looseHas(form, text) {
  let re = looseCache.get(form);
  if (!re) {
    const body = form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[- ]/g, "[- ]");
    re = new RegExp(`(?<![A-Za-z0-9])${body}(?![A-Za-z0-9])`, "i");
    looseCache.set(form, re);
  }
  return re.test(text);
}

/**
 * The approved entries that apply to this call, in file order (terms, then
 * phrases). `text` is the English the prompt is for (the page, or one block);
 * an entry is kept only when one of its English forms occurs in it. text ===
 * null keeps every applicable entry (used to compare with a legacy head).
 */
export function applicableEntries(glossary, termsEn, { text = null, ui = false } = {}) {
  const byId = termsById(termsEn);
  const where = ui ? ["ui", "both"] : ["pages", "both"];
  return entries(glossary).filter((item) => {
    const e = item.entry;
    // Drafts and disputed entries never reach a prompt: a draft must not be
    // presented to the model as a confirmed rendering.
    if (e?.status !== "approved") return false;
    if (!where.includes(e.applies_to)) return false;
    if (text == null) return true;
    // Phrases are titles and labels: they match exactly, as written.
    const has = item.kind === "phrase" ? englishHas : looseHas;
    return englishFormsOf(item, byId).some((f) => has(f, text));
  });
}

// ---- template ---------------------------------------------------------------

export function stripComments(template) {
  return template.replace(/<!--[\s\S]*?-->\n?/g, "");
}

/**
 * Fill the template. Returns the prompt text plus the structured parts, so
 * tests and the runner can assert on term ids rather than on wording.
 *
 * @param {object} o
 * @param {string} o.template   prompt-template.md
 * @param {object} o.glossary   <loc>.json
 * @param {object} o.termsEn    terms.en.json
 * @param {string} o.relPath    page path under site/ (drives the register)
 * @param {string|null} o.text  English to filter terms by; null = no filter
 * @param {boolean} [o.ui]      UI strings: register.ui, ui/both entries
 */
export function renderPrompt({ template, glossary, termsEn, relPath, text, ui = false }) {
  if (text === undefined) throw new TypeError("renderPrompt: pass text (or null to list every term on purpose)");
  const meta = glossary?.meta ?? {};
  if (!meta.language_name) throw new Error(`${glossary?.locale ?? "?"}.json: meta.language_name is required`);
  const byId = termsById(termsEn);
  const register = registerText(glossary, relPath, { ui });
  const style = styleLines(glossary);
  const terms = applicableEntries(glossary, termsEn, { text, ui }).map((item) => ({
    kind: item.kind,
    key: item.key,
    line: termLine(item, byId),
  }));
  const blocks = {
    REGISTER: register ? [`- ${register.text}`] : [],
    STYLE: style.map((s) => `- ${s.text}`),
    TERMS: terms.map((t) => `- ${t.line}`),
  };
  const inline = {
    LANGUAGE: meta.language_name,
    VARIETY: glossary.style?.variety ?? `natural, fluent ${meta.language_name}`,
  };

  const out = [];
  let skipping = false;
  for (const raw of stripComments(template).split("\n")) {
    const t = raw.trim();
    const sec = /^\{\{([#/])([A-Z]+)\}\}$/.exec(t);
    if (sec) {
      if (!(sec[2] in blocks)) throw new Error(`prompt template: unknown section {{${sec[1]}${sec[2]}}}`);
      skipping = sec[1] === "#" ? blocks[sec[2]].length === 0 : false;
      continue;
    }
    if (skipping) continue;
    const whole = /^\{\{([A-Z]+)\}\}$/.exec(t);
    if (whole && whole[1] in blocks) {
      out.push(...blocks[whole[1]]);
      continue;
    }
    const line = raw.replace(/\{\{([A-Z]+)\}\}/g, (m, name) => {
      if (name in inline) return inline[name];
      throw new Error(`prompt template: ${m} must be on a line of its own, or is unknown`);
    });
    out.push(line);
  }
  const textOut = `${out.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
  return { text: textOut, register: register?.register ?? null, style, terms };
}

// ---- legacy heads -----------------------------------------------------------
//
// The transition guard (design 3.1): before a hand-written prompt_head_<loc>.txt
// is retired, every rule in it must be carried by the template, a style field
// or a glossary entry, so nothing confirmed is lost in the switch. Written as a
// pure function so the runner's offline test can call it on the real files.

const ARROW = "→";

// Split on a separator outside parentheses and quotes.
function splitTop(s, sep) {
  const parts = [];
  let depth = 0;
  let quote = false;
  let cur = "";
  for (const ch of s) {
    if (ch === '"') quote = !quote;
    else if (!quote && ch === "(") depth++;
    else if (!quote && ch === ")") depth = Math.max(0, depth - 1);
    if (ch === sep && depth === 0 && !quote) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  return parts;
}

const stripParens = (s) => s.replace(/\([^)]*\)/g, " ");

/** Entries (as {kind,key}) whose English occurs in a piece of legacy text. */
function entriesNamedIn(fragment, glossary, byId) {
  const hits = [];
  for (const item of entries(glossary)) {
    if (item.entry?.status !== "approved") continue;
    const forms = englishFormsOf(item, byId);
    // Headwords in legacy heads are written in lowercase ("seed phrase",
    // "network upgrade"), so compare case-insensitively.
    const lower = fragment.toLowerCase();
    if (forms.some((f) => englishHas(f.toLowerCase(), lower))) hits.push(item);
  }
  return hits;
}

const formsOf = (entry) => [entry.target, ...(entry.forms ?? [])].map((f) => f.toLowerCase());

/**
 * Map one legacy term line to glossary entries. Returns the entries, or null
 * when some part of the line names nothing the glossary carries, or when the
 * glossary renders the term differently from the line.
 */
export function mapTermLine(line, glossary, termsEn) {
  const byId = termsById(termsEn);
  const body = line.replace(/^-\s*/, "");
  let segments;
  const always = /^ALWAYS translate (.+?) with /i.exec(body);
  if (always) {
    const quoted = [...always[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]).join(" ");
    segments = [{ left: quoted, right: body.slice(always[0].length) }];
  } else if (body.includes(ARROW)) {
    segments = splitTop(body, ";").map((seg) => {
      const i = seg.indexOf(ARROW);
      return i < 0 ? { left: "", right: seg } : { left: seg.slice(0, i), right: seg.slice(i + 1) };
    });
  } else return null;

  const found = new Map();
  const perSegment = segments.map((s) => {
    const items = entriesNamedIn(stripParens(s.left), glossary, byId);
    for (const it of items) found.set(`${it.kind}:${it.key}`, it);
    return items;
  });
  if (found.size === 0) return null;
  // A segment without an English headword ("to mine → menambang (verb)") is
  // covered when its rendering is a declared form of an entry on the line.
  for (let i = 0; i < segments.length; i++) {
    if (perSegment[i].length) continue;
    const right = segments[i].right.toLowerCase();
    const ok = [...found.values()].some((it) => formsOf(it.entry).some((f) => right.includes(f)));
    if (!ok) return null;
  }
  // The glossary must render the term as the line does.
  const lower = body.toLowerCase();
  for (const it of found.values()) {
    if (!lower.includes(it.entry.target.toLowerCase())) return null;
  }
  return [...found.values()].map((it) => ({ kind: it.kind, key: it.key }));
}

/** Quoted renderings a legacy line forbids ('Never "a", "b" or "c"', 'not "x"'). */
export function legacyRejections(line) {
  const out = [];
  for (const m of line.matchAll(/\b(?:never|not)\b([^.;)]*)/gi)) {
    for (const r of m[1].matchAll(/"([^"]+)"/g)) out.push(r[1]);
  }
  return out;
}

const STYLE_KEYWORDS = [
  [/bracket/i, ["english_in_brackets"]],
  [/capital letter/i, ["capitalise_kept_english_at_sentence_start"]],
  [/loanword/i, ["loanwords_text", "loanwords"]],
];

/**
 * Classify every line of a legacy prompt head.
 *
 * @returns {{line: string, kind: "template"|"style"|"register"|"term"|"unmapped", refs: string[]}[]}
 *   refs: "template", "style.<field>", "style.register", "terms.<id>",
 *   "phrases.<key>".
 */
export function legacyCoverage(legacyText, { template, glossary, termsEn }) {
  const full = renderPrompt({ template, glossary, termsEn, relPath: "", text: null });
  const rendered = new Set(full.text.split("\n").map((l) => l.trim()).filter(Boolean));
  const styleByLine = new Map(full.style.map((s) => [`- ${s.text}`, s.field]));
  const style = glossary?.style ?? {};
  const out = [];
  for (const raw of legacyText.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const rec = (kind, refs) => out.push({ line, kind, refs });
    // Term lines first, so a term line that happens to render word for word
    // ("- wallet → dompet") is still tied to its entry id.
    const termish = line.startsWith("- ") && (line.includes(ARROW) || /^- ALWAYS translate /i.test(line));
    const mapped = termish ? mapTermLine(line, glossary, termsEn) : null;
    if (mapped) {
      rec("term", mapped.map((m) => (m.kind === "term" ? `terms.${m.key}` : `phrases.${m.key}`)));
      continue;
    }
    if (styleByLine.has(line)) {
      rec("style", [`style.${styleByLine.get(line)}`]);
      continue;
    }
    if (rendered.has(line)) {
      rec("template", ["template"]);
      continue;
    }
    if (!line.startsWith("- ")) {
      // Headings of the hand-written heads. The intro sentence may differ in
      // how the language is named ("Indonesian (Bahasa Indonesia)").
      if (/^You are a professional translator\b/.test(line) && line.includes(glossary.meta.language_name)) rec("template", ["template"]);
      else if (/^Rules:$/.test(line) || /^Terminology\b/.test(line)) rec("template", ["template"]);
      else rec("unmapped", []);
      continue;
    }
    if (line === "- {{REGISTER}}") {
      if (style.register) rec("register", ["style.register"]);
      else rec("unmapped", []);
      continue;
    }
    // "ALWAYS translate X with ..." is a term rule even when it mentions
    // loanwords; without its glossary entry it has no home.
    if (/^- ALWAYS translate /i.test(line)) {
      rec("unmapped", []);
      continue;
    }
    const kw = STYLE_KEYWORDS.find(([re]) => re.test(line));
    const field = kw?.[1].find((f) => style[f] !== undefined && style[f] !== false);
    if (field) rec("style", [`style.${field}`]);
    else rec("unmapped", []);
  }
  return out;
}
