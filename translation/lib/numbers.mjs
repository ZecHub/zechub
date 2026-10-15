// Numbers and digit tokens in a translated page, compared with its English.
//
// Machine engines garble numbers in ways no other gate sees, because the page
// keeps its structure, its links and its protected names:
//
//   - a digit run fused with letters the English never had: "ZIP 2emma",
//     "November 202kan", "ZIP 3alli 326" (local Gemma, Indonesian);
//   - a block height or an amount with one digit changed;
//   - a date or a time rewritten as words, and wrongly: Google Translate gave
//     Yoruba "ọjọ́ kẹrìndínlógún oṣù kẹjọ ... ní agogo mọ́kàndínlógún òwúrọ̀"
//     (16 August, 19 o'clock in the morning) for "August 24, 2026, 19:00 UTC".
//
// Three comparisons, all on PROSE only (code, URLs, link targets, HTML tags and
// attributes, image paths and protected names are masked first, keeping line
// numbers):
//
//   digitTokens   tokens mixing a digit with 3+ ASCII letters that occur in the
//                 translation but nowhere in the English;
//   numberDelta   the multiset of numbers: English numbers that disappeared and
//                 numbers the translation added, after clock times on both
//                 sides are paired by their time of day (cancelTimes);
//   versionDelta  version strings ("1.2.3", "v0.15.2"), compared whole.
//
// Normalisation is the same on both sides, so a choice that is merely a
// convention cancels out: thousands separators in any of the "," "." space,
// no-break space, thin space, apostrophe or Indian lakh conventions; "," vs
// "." as the decimal mark; leading zeros ("08" == "8"); Arabic-Indic,
// Devanagari and full-width digits. Dates and times are just their numbers, so
// "August 24, 2026" == "24/08/2026" == "2026年8月24日" once the month
// allowance below is applied.
//
// Allowances (an ADDED number that is not a defect):
//   - a month number where the English names that month ("August" -> 8),
//     because most locales write a month as its number;
//   - a number the English spells as a word ("two" -> 2, "first" -> 1).
// Nothing excuses a MISSING number: that is the Yoruba defect.

const MONTHS = [
  "january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december",
];
const MONTH_ABBR = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, twenty: 20, thirty: 30, forty: 40, fifty: 50, hundred: 100,
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8,
  ninth: 9, tenth: 10, once: 1, twice: 2, single: 1, double: 2, triple: 3,
  dozen: 12, thousand: 1000, million: 1000000, billion: 1000000000,
  quarter: 25, half: 50,   // "a quarter of the volume" -> "25%"
  monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7,
};

// Native digits -> ASCII. Arabic ٫ is the decimal mark and ٬ the thousands mark.
export function asciiDigits(s) {
  return s
    .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06f0))
    .replace(/[\u0966-\u096F]/g, (c) => String(c.charCodeAt(0) - 0x0966))
    .replace(/[\uFF10-\uFF19]/g, (c) => String(c.charCodeAt(0) - 0xff10))
    .replace(/\u066B/g, ".")
    .replace(/\u066C/g, ",");
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Blank a span, keeping its length so columns and line numbers stay honest.
const blank = (s) => s.replace(/[^\n]/g, " ");

// Replace each balanced "](target)" with spaces, keeping the link text.
function maskLinkTargets(line) {
  let out = "", i = 0;
  for (;;) {
    const j = line.indexOf("](", i);
    if (j < 0) break;
    let k = j + 2, depth = 1;
    while (k < line.length && depth) {
      if (line[k] === "(") depth++;
      else if (line[k] === ")") depth--;
      k++;
    }
    out += line.slice(i, j + 1) + blank(line.slice(j + 1, k));
    i = k;
    if (depth) break;                          // unterminated: masked to end
  }
  return out + line.slice(i);
}

// Prose lines of a markdown page: same line count, everything that is not
// translatable prose turned into spaces. `protectedTerms` are masked too,
// since "NU6.1" or "Zcon3" is a name, not a number the engine wrote.
export function proseLines(text, protectedTerms = [], { keepInlineCode = false } = {}) {
  const lines = asciiDigits(text.replace(/\r/g, "")).split("\n");
  const out = [];
  let fence = null, inComment = false, inTag = false, inFront = false;
  const termRes = [...protectedTerms]
    .filter((t) => /\d/.test(t))
    .sort((a, b) => b.length - a.length)
    .map((t) => new RegExp(`(?<![A-Za-z0-9])${escapeRe(t)}(?![A-Za-z0-9])`, "g"));
  lines.forEach((raw, idx) => {
    let l = raw;
    if (idx === 0 && /^---\s*$/.test(l)) { inFront = true; out.push(""); return; }
    if (inFront) { if (/^(---|\.\.\.)\s*$/.test(l)) inFront = false; out.push(""); return; }
    const f = l.match(/^\s*(?:>\s*)*(?:[-*+]\s+|\d+[.)]\s+)?(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      out.push(""); return;
    }
    if (fence !== null) { out.push(""); return; }

    // HTML comments and tags, possibly spanning lines.
    let res = "";
    for (let i = 0; i < l.length; ) {
      if (inComment) {
        const e = l.indexOf("-->", i);
        if (e < 0) { res += blank(l.slice(i)); i = l.length; } else { res += blank(l.slice(i, e + 3)); i = e + 3; inComment = false; }
      } else if (inTag) {
        const e = l.indexOf(">", i);
        if (e < 0) { res += blank(l.slice(i)); i = l.length; } else { res += blank(l.slice(i, e + 1)); i = e + 1; inTag = false; }
      } else if (l.startsWith("<!--", i)) {
        inComment = true; res += "    "; i += 4;
      } else if (l[i] === "<" && /^<\/?[A-Za-z]/.test(l.slice(i, i + 3))) {
        inTag = true; res += " "; i += 1;
      } else { res += l[i]; i += 1; }
    }
    l = res;

    // Inline code: masked for the token scan, kept for numbers, where it
    // costs nothing (code is copied, so both sides agree) and stops a quoted
    // "u1" that the translation set as `u1` from reading as a lost number.
    l = l.replace(/(`+)([^`]*?)\1/g, (m, q, body) => keepInlineCode ? " ".repeat(q.length) + body + " ".repeat(q.length) : blank(m));
    l = l.replace(/^\s*\[[^\]]+\]:\s*\S.*$/, blank);              // reference definition
    l = l.replace(/!\[[^\]]*\]/g, blank);                        // image alt text
    l = maskLinkTargets(l);
    l = l.replace(/\]\[[^\]]*\]/g, (m) => "]" + blank(m.slice(1))); // [text][ref]
    // No \b: "__http://127.0.0.1__" puts a word character before the scheme.
    l = l.replace(/(?<![A-Za-z0-9])(?:https?|ftp):\/\/[^\s)\]>"'`]+/gi, blank);
    l = l.replace(/(?<![A-Za-z0-9])www\.[^\s)\]>"'`]+/gi, blank);
    l = l.replace(/\bdata:[a-z]+\/[^\s)]+/gi, blank);
    l = l.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, blank);             // e-mail
    l = l.replace(/&#(?:\d+|[xX][0-9a-fA-F]+);/g, blank);         // &#8211; &#x2013;
    l = l.replace(/[\w./-]+\.(?:png|jpe?g|gif|svg|webp|pdf|mdx?|html?|json|ya?ml|zip|tar|gz)\b/gi, blank);
    l = l.replace(/^(\s*(?:>\s*)*)\d+[.)](?=\s)/, (m, p) => p + blank(m.slice(p.length))); // list marker
    for (const re of termRes) l = l.replace(re, blank);
    out.push(l);
  });
  return out;
}

// ---- digit tokens ----------------------------------------------------------

// Latin-script runs only: a Japanese or Korean sentence glues ASCII words to
// CJK text and particles ("Groth16証明", "Zcon4의"), which is not a defect.
const TOKEN = /[\p{Script=Latin}\p{M}\p{N}_]+/gu;
const MIXED = /\d[A-Za-z]{3,}|[A-Za-z]{3,}\d/;
const LETTER_RUNS = /\p{L}+/gu;
// A hash, transaction id or address: long and full of digits. Copied, never
// translated, so any difference from the English is damage.
const IDENT = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{20,}$/;

// Legitimate ordinal and case suffixes on a numeral, per locale. Only shapes
// with 3+ ASCII letters matter here; "1er", "2.º", "1ª" never trip MIXED.
const SUFFIX_OK = {
  tr: /^\d+(?:inci|nci|uncu|ncu|ıncı|ncı|üncü|ncü|de|da|te|ta|den|dan|ten|tan|deki|daki|teki|taki|lik|lık|luk|lük|ler|lar)$/i,
};

export function digitTokens(lines) {
  const out = [];
  lines.forEach((l, i) => {
    for (const m of l.matchAll(TOKEN)) if (MIXED.test(m[0]) || IDENT.test(m[0])) out.push({ token: m[0], line: i + 1, col: m.index });
  });
  return out;
}

// Mixed tokens in the translation that the English never contains. Not
// reported:
//   - a token whose every letter run is an English word on the page, so only a
//     space went missing ("ZIP227" for "ZIP 227", "100Mbps", Japanese
//     "Ironwood1ZEC" where the language writes no spaces);
//   - a lowercase word carrying a footnote number the English also glues to a
//     lowercase word ("integrity2" -> "wahren2").
// A hash or address must match an English token exactly.
export function newDigitTokens(enLines, trLines, locale = "") {
  const en = new Set(), runs = new Set(), footnotes = new Set();
  for (const l of enLines) for (const m of l.matchAll(TOKEN)) {
    const t = m[0].toLowerCase();
    en.add(t);
    for (const r of t.matchAll(LETTER_RUNS)) runs.add(r[0]);
    const fn = m[0].match(/^\p{Ll}{3,}(\d{1,2})$/u);
    if (fn) footnotes.add(fn[1]);
  }
  const ok = SUFFIX_OK[locale];
  return digitTokens(trLines).filter(({ token }) => {
    const t = token.toLowerCase();
    if (en.has(t)) return false;
    if (IDENT.test(token)) return true;
    if (ok && ok.test(token)) return false;
    const fn = token.match(/^\p{Ll}{3,}(\d{1,2})$/u);
    if (fn && footnotes.has(fn[1])) return false;
    return ![...t.matchAll(LETTER_RUNS)].every((r) => runs.has(r[0]));
  });
}

// ---- numbers -----------------------------------------------------------------

// A digit run with interior separators. Space-like separators only between
// digits, so "24, 2026" stays two numbers.
const NUM = /\d+(?:(?:[.,'\u00A0\u202F\u2009 ])\d+)*/g;

const strip0 = (s) => s.replace(/^0+(?=\d)/, "");

// One raw match -> normalised numbers. Grouping is accepted only in its real
// shapes (1,234,567 / 12,34,567 / 1 234 567), each with a single separator
// character; a lone separator with a non-3-digit tail is a decimal mark;
// anything else ("24.08.2026", "5.4.0", "1, 2") splits into its parts.
export function normaliseNumber(raw) {
  const seps = raw.match(/[^\d]/g) || [];
  if (!seps.length) return [strip0(raw)];
  const groups = raw.split(/[^\d]/);
  const uniq = [...new Set(seps)];
  if (uniq.length === 1) {
    const s = uniq[0];
    const western = /^\d{1,3}$/.test(groups[0]) && groups.slice(1).every((g) => g.length === 3);
    const lakh = groups.length >= 3 && /^\d{1,2}$/.test(groups[0]) &&
      groups.slice(1, -1).every((g) => g.length === 2) && groups.at(-1).length === 3;
    if (western || lakh) return [strip0(groups.join(""))];
    if (groups.length === 2 && (s === "." || s === ",")) return [`${strip0(groups[0])}.${groups[1]}`];
  } else if (uniq.length === 2 && (uniq.includes(".") || uniq.includes(","))) {
    // 1,234.5 / 1.234,5 / 1 234,5: the LAST separator is the decimal mark.
    const dec = seps.at(-1);
    const head = groups.slice(0, -1), tail = groups.at(-1);
    const grp = seps.slice(0, -1);
    if ((dec === "." || dec === ",") && grp.every((c) => c === grp[0] && c !== dec) &&
        /^\d{1,3}$/.test(head[0]) && head.slice(1).every((g) => g.length === 3)) {
      return [`${strip0(head.join(""))}.${tail}`];
    }
  }
  return groups.filter(Boolean).map(strip0);
}

// A magnitude word right after a number. English says "21 million" and "$5M";
// Chinese, Japanese and Korean count in myriads ("2100万", "3億", "5만"), and
// Hindi in lakh and crore. Each number therefore carries a second, scaled
// value, used only to pair up what the plain comparison left over.
const SCALE = [
  [/^\s?(?:trillion)\b/i, 1e12], [/^\s?(?:billion|bn)\b/i, 1e9], [/^\s?(?:million|mln)\b/i, 1e6],
  [/^\s?(?:millions?|millionth)\b/i, 1e6], [/^\s?(?:billions|billionth)\b/i, 1e9],
  [/^\s?(?:thousands?|thousandth)\b/i, 1e3], [/^\s?[Bb](?![A-Za-z])/, 1e9], [/^\s?M(?![A-Za-z])/, 1e6], [/^\s?[kK](?![A-Za-z])/, 1e3],
  [/^\s?(?:千万|千萬|천만)/, 1e7], [/^\s?(?:万|萬|만)/, 1e4], [/^\s?(?:億|亿|억)/, 1e8], [/^\s?(?:兆|조)/, 1e12],
  [/^\s?लाख/, 1e5], [/^\s?करोड़/, 1e7],
];
const canon = (x) => String(Number(x.toPrecision(12)));

// Numbers per line: [{ value, line, scaled }]. Space-like separators are only
// grouping when the match is a valid group shape; otherwise the match is
// re-split on spaces first so "2026 19" stays two numbers.
// "3億4000万" is 340 000 000 and "1만 3,500" is 13 500: fold a myriad compound
// into one plain number before matching, padding to keep columns.
function foldMyriads(l) {
  const fold = (m, v) => { const s = String(v); return s + " ".repeat(Math.max(0, m.length - s.length)); };
  return l
    // Korean and Chinese thousands inside a myriad: "4천만" = 4000만
    .replace(/(\d+)\s?[천千]\s?(?=[万萬만])/g, (m, a) => fold(m, Number(a) * 1000))
    .replace(/(\d+)\s?[億亿억]\s?(\d+)\s?[万萬만](?:\s?(\d[\d,]{0,4})(?![\d万萬만]))?/g,
      (m, a, b, c) => fold(m, Number(a) * 1e8 + Number(b) * 1e4 + Number((c ?? "0").replace(/,/g, ""))))
    .replace(/(\d+)\s?[億亿억]\s?(\d[\d,]{0,8})(?![\d,万萬만億亿억])/g,
      (m, a, c) => fold(m, Number(a) * 1e8 + Number(c.replace(/,/g, ""))))
    .replace(/(\d+)\s?[万萬만]\s?(\d[\d,]{0,4})(?![\d,万萬만億亿억])/g,
      (m, a, c) => fold(m, Number(a) * 1e4 + Number(c.replace(/,/g, ""))));
}

export function numbers(lines) {
  const out = [];
  lines.map(foldMyriads).forEach((l, i) => {
    for (const m of l.matchAll(NUM)) {
      let parts = [m[0]];
      if (/[ \u00A0\u202F\u2009']/.test(m[0]) && normaliseNumber(m[0]).length > 1)
        parts = m[0].split(/[ \u00A0\u202F\u2009']/);
      const vals = parts.flatMap((p) => normaliseNumber(p));
      const after = l.slice(m.index + m[0].length);
      const sc = SCALE.find(([re]) => re.test(after));
      vals.forEach((v, j) => out.push({
        value: v, line: i + 1,
        scaled: j === vals.length - 1 && sc ? canon(Number(v) * sc[1]) : v,
      }));
    }
  });
  return out;
}

// English number words, "five hundred" and "twenty five million" included.
const UNITS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90, a: 1,
};
const MULT = { hundred: 100, thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12 };
function wordNumbers(line) {
  const out = [];
  let total = 0, cur = 0, seen = false, real = false;
  const flush = () => { if (real) out.push(total + cur); total = cur = 0; seen = real = false; };
  for (const m of line.toLowerCase().matchAll(/[a-z]+/g)) {
    const w = m[0];
    if (Object.hasOwn(UNITS, w) && !(w === "a" && seen)) { if (w !== "a") real = true; cur += UNITS[w]; seen = true; }
    else if (Object.hasOwn(MULT, w) && seen) {
      real = true;
      if (MULT[w] === 100) cur = (cur || 1) * 100;
      else { total += (cur || 1) * MULT[w]; cur = 0; }
    } else if (w === "and" && seen) continue;
    else flush();
  }
  flush();
  return out;
}

// Numbers an English page lets a translation ADD: month numbers for named
// months, the values of spelled-out number words, and a few conventions.
export function allowances(enLines, enRaw = "") {
  const allow = new Map();
  const add = (v) => allow.set(String(v), (allow.get(String(v)) ?? 0) + 1);
  // A year that only the English LINK carries ("...report-for-q4-2023/"),
  // which a translator may surface in the text.
  for (const m of enRaw.matchAll(/\]\([^)\s]*?(?<!\d)((?:19|20)\d{2})(?!\d)/g)) allow.set(m[1], Infinity);
  for (const l of enLines) {
    for (const m of l.matchAll(/[A-Za-z]+/g)) {
      const w = m[0].toLowerCase();
      let mi = w === "may" && m[0] !== "May" ? -1 : MONTHS.indexOf(w);   // "may" the verb
      if (mi < 0 && /^[A-Z][a-z]{2}$/.test(m[0])) mi = MONTH_ABBR.indexOf(w);
      if (mi < 0 && w === "sept") mi = 8;
      if (mi >= 0) add(mi + 1);
      if (Object.hasOwn(WORDS, w)) add(WORDS[w]);
      if (w === "hex" || w === "hexadecimal") add(16);   // Japanese 16進
    }
    for (const v of wordNumbers(l)) if (!WORDS[v]) add(canon(v));
    if (/24\/7/.test(l)) add(365);                        // "24時間365日"
    for (const m of l.matchAll(/['’](\d{2})(?![\d])/g)) add(`20${m[1]}`);   // Q4 '23 -> 2023
    // A 12-hour clock: "11:59 PM" is written "23:59" in most locales.
    for (const m of l.matchAll(/\b(\d{1,2})(?::\d{2})?\s*(?:([AaPp])\.?[Mm]\.?)(?![A-Za-z])/g)) {
      const h = Number(m[1]), pm = /p/i.test(m[2]);
      if (pm && h < 12) add(h + 12);
      if (!pm && h === 12) add(0);
    }
  }
  return allow;
}

// English numbers a translation may DROP: an ordinal ("3rd party", "the 21st
// century") is routinely spelled out or folded into a word ("Drittanbieter").
export function ordinals(enLines) {
  const ok = new Map();
  const add = (v) => ok.set(v, (ok.get(v) ?? 0) + 1);
  for (const l of enLines) {
    for (const m of l.matchAll(/(?<![\d.,])(\d+)(?:st|nd|rd|th)\b/gi)) add(strip0(m[1]));
    for (const m of l.matchAll(/['’](\d{2})(?![\d])/g)) add(strip0(m[1]));   // Q4 '23 -> 2023
    // ...and the 12-hour figure of a converted time ("11:59 PM" -> "23:59").
    for (const m of l.matchAll(/\b(\d{1,2})(?::\d{2})?\s*(?:([AaPp])\.?[Mm]\.?)(?![A-Za-z])/g)) {
      const h = Number(m[1]), pm = /p/i.test(m[2]);
      if ((pm && h < 12) || (!pm && h === 12)) add(String(h));
    }
  }
  return ok;
}

// ---- times ---------------------------------------------------------------------
//
// A clock time is compared as time since midnight before any number is, so a
// valid localisation in either direction ("19:00 UTC" <-> "7 PM UTC", "午後7時",
// "오후 7시", "19 h 00", "pukul 19.00") is not two different numbers. A time
// on one side that no time on the other side equals is left in the text, so the
// number comparison still sees it: "19:00" written "9 PM" loses its 19.

const PM_PRE = "午後|下午|晚上|傍晚|오후|저녁|शाम|रात|दोपहर";
const AM_PRE = "午前|上午|早上|凌晨|오전|아침|새벽|सुबह";
const NOON_PRE = "中午|正午";
const TZ = "UTC|GMT|Uhr|WIB|WITA|WIT|CES?T|E[SD]T|P[SD]T|h(?![\\p{L}\\d])";
const TIME_RES = [
  // marker before the hour: 午後7時30分, 下午7点半, 오후 7시, शाम 7 बजे, 오후 7:00
  [new RegExp(`(${PM_PRE}|${AM_PRE}|${NOON_PRE})\\s?(\\d{1,2})(?:\\s?[:：]\\s?(\\d{2}))?(?:\\s?[時时点點시](?:\\s?(\\d{1,2})\\s?[分분]|(半))?|\\s?बजे)?(?![\\d])`, "gu"),
    (m) => ({ h: +m[2], min: +(m[3] ?? m[4] ?? (m[5] ? 30 : 0)), half: new RegExp(`^(?:${PM_PRE})`, "u").test(m[1]) ? "pm" : new RegExp(`^(?:${AM_PRE})`, "u").test(m[1]) ? "am" : "noon" })],
  // marker after: 7 PM, 7:30 p.m., 7 p. m., ٧ مساءً
  [/(?<![\d:.,])(\d{1,2})(?:[:.](\d{2}))?\s?(?:([AaPp])\.?\s?[Mm]\.?(?![A-Za-z])|(مساءً|مساءا|مساء|م|صباحًا|صباحا|صباح|ص)(?![\u0600-\u06FF]))/gu,
    (m) => ({ h: +m[1], min: +(m[2] ?? 0), half: (m[3] ? /p/i.test(m[3]) : /^م/.test(m[4])) ? "pm" : "am" })],
  // 24-hour HH:MM(:SS)
  [/(?<![\d:.,/])(\d{1,2})[:：](\d{2})(?::(\d{2}))?(?![\d:])/gu, (m) => ({ h: +m[1], min: +m[2], sec: +(m[3] ?? 0) })],
  // HH.MM only where it is clearly a time: "pukul 19.00", "19.00 Uhr"
  [new RegExp(`(?<=(?:pukul|jam|saat|um|alle|ore|às|klo|kello)\\s)(\\d{1,2})\\.(\\d{2})(?![\\d.,])|(?<![\\d.,])(\\d{1,2})\\.(\\d{2})(?=\\s?(?:${TZ}))`, "gu"),
    (m) => ({ h: +(m[1] ?? m[3]), min: +(m[2] ?? m[4]) })],
  // hour units: 19時, 19时30分, 19시 (not 時間/시간 "hours")
  [/(?<![\d.,])(\d{1,2})\s?[時时点點시](?![間间간])(?:\s?(\d{1,2})\s?[分분]|(半))?/gu,
    (m) => ({ h: +m[1], min: +(m[2] ?? (m[3] ? 30 : 0)) })],
  // 19h00, 19 h 00, 19h, 19 Uhr
  [/(?<![\p{L}\d.,])(\d{1,2})\s?(?:h(?:\s?(\d{2}))?(?![\p{L}\d])|Uhr(?![\p{L}]))/gu,
    (m) => ({ h: +m[1], min: +(m[2] ?? 0) })],
  // Hindi "7 बजे" with no marker: either half of the day
  [/(?<![\d.,])(\d{1,2})(?::(\d{2}))?\s?बजे/gu, (m) => ({ h: +m[1], min: +(m[2] ?? 0), half: "either" })],
];

// [{ start, end, vals }] for one line; `vals` are the seconds since midnight
// the expression can mean (two for an unmarked 12-hour clock). Seconds count,
// so video timestamps "1:04:17" and "1:04:40" stay different.
export function timeSpans(line) {
  const spans = [];
  for (const [re, parse] of TIME_RES) {
    for (const m of line.matchAll(re)) {
      const start = m.index, end = m.index + m[0].length;
      if (spans.some((s) => start < s.end && s.start < end)) continue;
      const { h, min, sec = 0, half } = parse(m);
      if (min > 59 || sec > 59 || h > 24) continue;
      let hs;
      if (half === "pm") hs = h >= 1 && h <= 12 ? [(h % 12) + 12] : [];
      else if (half === "am") hs = h >= 1 && h <= 12 ? [h % 12] : [];
      else if (half === "noon") hs = [h];
      else if (half === "either") hs = h <= 12 ? [h % 12, (h % 12) + 12] : [h];
      else hs = [h];
      if (!hs.length) continue;
      spans.push({ start, end, vals: hs.map((x) => (x * 3600 + min * 60 + sec) % 86400) });
    }
  }
  return spans.sort((a, b) => a.start - b.start);
}

// Blank every English time that a translation time equals, and that partner.
export function cancelTimes(enLines, trLines) {
  const collect = (lines) => lines.flatMap((l, i) => timeSpans(l).map((s) => ({ ...s, line: i })));
  const en = collect(enLines), tr = collect(trLines);
  const hit = new Set(), enHit = [];
  // An exact (single-valued) partner first, so an ambiguous one is not wasted.
  for (const e of en) {
    let k = -1;
    for (const exact of [true, false]) {
      k = tr.findIndex((t, j) => !hit.has(j) && (t.vals.length === 1) === exact && e.vals.some((v) => t.vals.includes(v)));
      if (k >= 0) break;
    }
    if (k >= 0) { hit.add(k); enHit.push(e); }
  }
  const wipe = (lines, spans) => {
    const out = [...lines];
    for (const s of spans) out[s.line] = out[s.line].slice(0, s.start) + " ".repeat(s.end - s.start) + out[s.line].slice(s.end);
    return out;
  };
  return [wipe(enLines, enHit), wipe(trLines, tr.filter((_, j) => hit.has(j)))];
}

// ---- occurrence contexts ----------------------------------------------------------

// The text around one finding, for telling an inherited occurrence from a new
// one of the same value (see introduced()). Not a line number: lines shift.
export const context = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

// Per-line surplus of `value` on side a over side b, as one context (the
// translation line) per surplus unit. Only meaningful when the two pages keep
// the same line structure; null otherwise.
function lineContexts(aOcc, bOcc, value, trLines, aligned) {
  if (!aligned) return null;
  const out = [];
  for (const [line, n] of surplus(aOcc, bOcc, value)) for (let k = 0; k < n; k++) out.push(context(trLines[line - 1] ?? ""));
  return out;
}

// Map line -> how many more times `value` occurs on that line on side a
// than on side b.
function surplus(aOcc, bOcc, value) {
  const per = (occ) => {
    const m = new Map();
    for (const o of occ) if (o.value === value) m.set(o.line, (m.get(o.line) ?? 0) + 1);
    return m;
  };
  const a = per(aOcc), b = per(bOcc), out = new Map();
  for (const [line, n] of a) if (n > (b.get(line) ?? 0)) out.set(line, n - (b.get(line) ?? 0));
  return out;
}

const countBy = (items) => {
  const c = new Map();
  for (const { value, line, scaled } of items) {
    const e = c.get(value) ?? { n: 0, lines: [], scaled: [] };
    e.n++; e.lines.push(line); e.scaled.push(scaled);
    c.set(value, e);
  }
  return c;
};

const take = (m, k, n = 1) => m.set(k, m.get(k) - n);

// Cancel an unmatched decimal "a.b" on one side against unmatched integers a
// and b on the other: "6-25" written as German "25.6.", "1.5" as "1, 5".
function reconcileDecimals(a, b) {
  for (const [x, y] of [[a, b], [b, a]]) {
    for (const v of x.keys()) {
      const m = v.match(/^(\d+)\.(\d+)$/);
      if (!m) continue;
      const p = m[1], q = strip0(m[2]);
      while (x.get(v) > 0 && (y.get(p) ?? 0) > 0 && (y.get(q) ?? 0) > (p === q ? 1 : 0)) {
        take(x, v); take(y, p); take(y, q);
      }
    }
  }
}

// { missing: [{value, count, lines, absent}], extra: [...] }. `lines` are
// English lines for a missing number, translation lines for an added one.
export function numberDelta(enLines, trLines, enRaw = "") {
  const aligned = enLines.length === trLines.length;
  // Times are paired first; `absent` below still looks at the whole page, so
  // a value that a paired time also carries stays a count difference, as it
  // was before times were paired.
  const allEn = new Set(numbers(enLines).map((n) => n.value));
  const allTr = new Set(numbers(trLines).map((n) => n.value));
  [enLines, trLines] = cancelTimes(enLines, trLines);
  const enOcc = numbers(enLines), trOcc = numbers(trLines);
  const en = countBy(enOcc), tr = countBy(trOcc);
  const allow = allowances(enLines, enRaw);
  const ords = ordinals(enLines);
  // Pair magnitudes first: "$50,000 and $5M" against "5万ドルと500万ドル" must
  // pair 50000 with 5万 and 5M with 500万, not the two bare 5s.
  const used = new Set();
  const enLeft = [];
  for (const e of enOcc) {
    const j = e.scaled !== e.value || trOcc.some((t) => t.scaled !== t.value)
      ? trOcc.findIndex((t, k) => !used.has(k) && t.scaled === e.scaled && (t.scaled !== t.value || e.scaled !== e.value))
      : -1;
    if (j >= 0) used.add(j); else enLeft.push(e);
  }
  const trLeft = trOcc.filter((_, k) => !used.has(k));
  const enC = new Map(), trC = new Map();
  for (const e of enLeft) enC.set(e.value, (enC.get(e.value) ?? 0) + 1);
  for (const t of trLeft) trC.set(t.value, (trC.get(t.value) ?? 0) + 1);
  const miss = new Map(), add = new Map();
  for (const [v, n] of enC) {
    const d = n - (trC.get(v) ?? 0) - (ords.get(v) ?? 0);
    if (d > 0) miss.set(v, d);
  }
  for (const [v, n] of trC) {
    const d = n - (enC.get(v) ?? 0);
    if (d > 0) add.set(v, d);
  }
  reconcileDecimals(miss, add);
  // An added number whose scaled value the English states anyway is a restated
  // magnitude, not a new number ("4.8 million" twice, once as "480万").
  const enScaled = new Set([...en.values()].flatMap((e) => e.scaled));
  for (const [w, d] of add) if (d > 0 && tr.get(w).scaled.some((x) => x !== w && enScaled.has(x))) add.set(w, 0);
  // Allowances last, so a month or a spelled-out number never absorbs a value
  // that a real pairing above could have explained. Matched on the plain or
  // the scaled value ("five hundred" -> 500, "twenty five million" -> 2500万).
  for (const [v, d] of add) {
    let left = d;
    for (const key of new Set([v, ...tr.get(v).scaled])) {
      const a = Math.min(left, allow.get(key) ?? 0);
      left -= a; allow.set(key, (allow.get(key) ?? 0) - a);
    }
    add.set(v, left);
  }
  // `absent`: the value is gone from (or new to) the page altogether, rather
  // than occurring a different number of times.
  // A magnitude counts as present in either spelling ("300 million" and "3억").
  const trScaled = new Set([...tr.values()].flatMap((t) => t.scaled));
  const missing = [], extra = [];
  for (const [v, d] of miss) if (d > 0) missing.push({ value: v, count: d, lines: en.get(v).lines,
    absent: !tr.has(v) && !allTr.has(v) && !en.get(v).scaled.some((x) => trScaled.has(x)),
    contexts: lineContexts(enOcc, trOcc, v, trLines, aligned) });
  for (const [v, d] of add) if (d > 0) extra.push({ value: v, count: d, lines: tr.get(v).lines,
    absent: !en.has(v) && !allEn.has(v) && !tr.get(v).scaled.some((x) => enScaled.has(x)),
    contexts: lineContexts(trOcc, enOcc, v, trLines, aligned) });
  // A changed digit: a value the translation lost and one it gained, both on
  // the same line of a page that keeps the English line structure ("In 2024
  // again" -> "In 2025 again" where both years occur elsewhere on the page).
  // Recorded on both findings; numberSeverity() decides what blocks.
  if (aligned) {
    const lost = new Map(missing.map((m) => [m.value, surplus(enOcc, trOcc, m.value)]));
    const won = new Map(extra.map((x) => [x.value, surplus(trOcc, enOcc, x.value)]));
    for (const m of missing) for (const x of extra) {
      if ([...lost.get(m.value).keys()].some((l) => won.get(x.value).has(l))) {
        (m.changed ??= []).push(x.value);
        (x.changed ??= []).push(m.value);
      }
    }
  }
  return { missing, extra };
}

// ---- versions ---------------------------------------------------------------------
//
// A version is one unit, compared as a whole string: "1.2.3" -> "1.2.4" only
// changes small numbers, which the number rule treats as advisory. What is a
// version (English side): a token with a leading "v" ("v5", "v0.15.2"), an
// acronym with a dotted number ("NU6.1" when it is not a protected name), a
// number with 2-3 dots ("5.4.0") that is not a "1.000.000" grouping, or a
// dotted number right after "version"/"release". Every one of those must occur
// in the translation verbatim (a leading "v" may come or go). On the
// translation side only the unambiguous shapes count as an ADDED version, and
// a dotted date ("24.08.2026", "2026.08.24") is a date, not a version.

const VERSION = /(?<![A-Za-z0-9_.,'’])(v|V|[A-Z]{2,4})?(\d+(?:\.\d+){0,3})(?![\d]|[.,]\d)/g;
const GROUPED = (s) => /^\d{1,3}(?:\.\d{3})+$/.test(s);
const DATED = (s, { shortYear = true } = {}) => {
  const g = s.split(".").map(Number), len = s.split(".").map((x) => x.length);
  if (g.length !== 3) return false;
  if (len[0] === 4) return g[1] >= 1 && g[1] <= 12 && g[2] >= 1 && g[2] <= 31;
  return (len[2] === 4 || (shortYear && len[2] === 2)) && g[0] >= 1 && g[0] <= 31 && g[1] >= 1 && g[1] <= 12;
};
const VERSION_WORD = /\b(?:version|versions|release|releases|ver\.)\s*$/i;

// [{ value, line }] of version tokens. `english` admits the context-only
// shapes (one dot after "version").
export function versions(lines, { english = false } = {}) {
  const out = [];
  lines.forEach((l, i) => {
    for (const m of l.matchAll(VERSION)) {
      const pre = m[1] ?? "", num = m[2], dots = (num.match(/\./g) || []).length;
      let value = null;
      if (pre === "v" || pre === "V") value = num;
      else if (pre) { if (dots >= 1) value = pre + num; }
      else if (dots >= 2 && !GROUPED(num) && !DATED(num, { shortYear: !english })) value = num;
      else if (english && dots === 1 && VERSION_WORD.test(l.slice(0, m.index))) value = num;
      if (value !== null) out.push({ value, line: i + 1 });
    }
  });
  return out;
}

// Occurrences of an English version in a translation: the token itself with a
// leading "v" optional, bounded so "1.2.3" does not match inside "11.2.3".
function versionCount(lines, value) {
  const body = /^[A-Z]/.test(value) ? escapeRe(value) : `[vV]?${escapeRe(value)}`;
  const re = new RegExp(`(?<![A-Za-z0-9_.,])${body}(?![\\d]|[.,]\\d)`, "g");
  const per = new Map();
  lines.forEach((l, i) => { const n = (l.match(re) || []).length; if (n) per.set(i + 1, n); });
  return per;
}

// { missing, extra } like numberDelta, by whole version string.
export function versionDelta(enLines, trLines) {
  const aligned = enLines.length === trLines.length;
  const enV = versions(enLines, { english: true });
  const byValue = new Map();
  for (const v of enV) byValue.set(v.value, [...(byValue.get(v.value) ?? []), v.line]);
  const missing = [], extra = [];
  for (const [value, lines] of byValue) {
    const per = versionCount(trLines, value);
    const n = [...per.values()].reduce((a, b) => a + b, 0);
    if (n >= lines.length) continue;
    let contexts = null;
    if (aligned) {
      contexts = [];
      const enPer = new Map();
      for (const l of lines) enPer.set(l, (enPer.get(l) ?? 0) + 1);
      for (const [l, k] of enPer) for (let j = per.get(l) ?? 0; j < k; j++) contexts.push(context(trLines[l - 1] ?? ""));
    }
    missing.push({ value, count: lines.length - n, lines, absent: n === 0, contexts });
  }
  const enText = enLines.join("\n");
  const added = new Map();
  for (const t of versions(trLines)) {
    if (byValue.has(t.value) || versionCount([enText], t.value).size) continue;
    added.set(t.value, [...(added.get(t.value) ?? []), t.line]);
  }
  for (const [value, lines] of added)
    extra.push({ value, count: lines.length, lines, absent: true,
      contexts: aligned ? lines.map((l) => context(trLines[l - 1] ?? "")) : null });
  return { missing, extra };
}

// A small whole number (0-10) is often a word in good prose ("4-round" ->
// "vier Runden", "X5" -> "fünfmal"), so a change in one is advisory. A larger
// number, a decimal, a year, a height or an amount is not.
export const isSmall = (v) => /^\d+$/.test(v) && Number(v) <= 10;

// Blocking: a number that is not small and that vanished from the page or
// appeared from nowhere. A count difference alone ("24/7" -> "24 h/24 et
// 7 j/7", a year repeated in a rephrased sentence) is advisory: good
// translations restate numbers. A changed digit can hide as a count
// difference, though, when both values occur elsewhere on the page; on an
// aligned page that shows as a lost and a gained value on the same line
// (`changed`, see numberDelta), which blocks when neither value is small.
export const numberSeverity = (f) =>
  !isSmall(f.value) && (f.absent || f.changed?.some((v) => !isSmall(v))) ? "error" : "warning";

// Everything the gate reports for one page pair, as keyed findings so a base
// pair can be subtracted. Each finding: { kind, value, count, lines, severity }
// with severity "error" or "warning".
export function compare(enText, trText, { locale = "", protectedTerms = [] } = {}) {
  const enCode = proseLines(enText, protectedTerms, { keepInlineCode: true });
  const trProse = proseLines(trText, protectedTerms);
  const trCode = proseLines(trText, protectedTerms, { keepInlineCode: true });
  const findings = [];
  const tok = new Map();
  for (const t of newDigitTokens(enCode, trProse, locale)) {
    const e = tok.get(t.token) ?? { kind: "digit-token", value: t.token, count: 0, lines: [], contexts: [], severity: "error" };
    e.count++; e.lines.push(t.line);
    // A token has a position: its context is the two words either side of
    // it, so an edit elsewhere in the paragraph keeps an inherited token
    // inherited, while the same token in another sentence is new.
    const words = [...trProse[t.line - 1].matchAll(/\S+/g)];
    const w = words.findIndex((x) => x.index + x[0].length > t.col);
    e.contexts.push(context(words.slice(Math.max(0, w - 2), w + 3).map((x) => x[0]).join(" ")));
    tok.set(t.token, e);
  }
  findings.push(...tok.values());
  const { missing, extra } = numberDelta(enCode, trCode, enText);
  for (const m of missing) findings.push({ kind: "number-missing", ...m, severity: numberSeverity(m) });
  for (const x of extra) findings.push({ kind: "number-added", ...x, severity: numberSeverity(x) });
  const ver = versionDelta(enCode, trCode);
  for (const m of ver.missing) findings.push({ kind: "version-missing", ...m, severity: m.absent ? "error" : "warning" });
  for (const x of ver.extra) findings.push({ kind: "version-added", ...x, severity: "error" });
  return findings;
}

// Findings at head minus findings at base, per kind+value.
//
// A digit token or a hash is subtracted only where its context (see
// context()) existed at the base too, so fixing a bad token in one paragraph
// and writing it into another is new damage. A finding without contexts (the
// page and its English differ in line structure) falls back to subtracting by
// count.
//
// A number finding is subtracted by count alone: a translation choice such as
// "filiale à 100 %" for "wholly owned subsidiary" stays where it is when a
// resync rewords the sentence, and matching it by its line would block it
// again on every resync. It stays new when it got worse: more of it than at
// the base, or blocking now where the base only warned (a changed digit).
//
// When part of a finding is subtracted, its `lines` must name only the
// occurrences left over, or a report points at the inherited one. A token's
// contexts run parallel to its lines, so the unmatched contexts give the new
// lines. Otherwise the base lines are subtracted from the head lines by line
// number; when that does not leave exactly `count` lines, the new occurrences
// cannot be told apart: `lines` is emptied and `lineUnknown` set.
export function introduced(head, base) {
  const prev = new Map(base.map((f) => [`${f.kind}\0${f.value}`, f]));
  const out = [];
  for (const f of head) {
    const b = prev.get(`${f.kind}\0${f.value}`);
    let inherited = b?.count ?? 0;
    let residual = null;
    if (b && f.kind.startsWith("number-")) {
      if (f.severity === "error" && b.severity !== "error") inherited = 0;
    } else if (b && f.contexts && b.contexts) {
      const pool = new Map();
      for (const c of b.contexts) pool.set(c, (pool.get(c) ?? 0) + 1);
      let same = 0;
      const unmatched = [];
      f.contexts.forEach((c, k) => {
        if (pool.get(c) > 0) { pool.set(c, pool.get(c) - 1); same++; } else unmatched.push(k);
      });
      inherited = Math.min(inherited, same);
      if (Array.isArray(f.lines) && f.lines.length === f.contexts.length && inherited === same)
        residual = unmatched.map((k) => f.lines[k]);
    }
    const left = f.count - inherited;
    if (left <= 0) continue;
    if (inherited === 0 || !Array.isArray(f.lines)) { out.push({ ...f, count: left }); continue; }
    if (!residual) {
      const pool = new Map();
      for (const l of b.lines ?? []) pool.set(l, (pool.get(l) ?? 0) + 1);
      residual = [];
      for (const l of f.lines) if (pool.get(l) > 0) pool.set(l, pool.get(l) - 1); else residual.push(l);
    }
    out.push(residual.length === left
      ? { ...f, count: left, lines: residual }
      : { ...f, count: left, lines: [], lineUnknown: true });
  }
  return out;
}
