// Review kits: export a glossary as Markdown tables for a native speaker, and
// import the filled tables back.
//
//   node translation/glossary/review-kit.mjs export <loc> --kit pages|ui|all
//        [--terms id1,id2] [--out kit.md] [--no-evidence]
//        [--dict <website>/dictionaries/<loc>.json] [--en-dict <website>/dictionaries/en.json]
//        [--brands names.txt | <website>/scripts/lib/menu-source.mjs]
//
//   node translation/glossary/review-kit.mjs import <loc> filled.md --reviewer <name>
//        [--date YYYY-MM-DD] [--write] [--report needs-maintainer.md] [--brands ...]
//
// Export reads translation/glossary/<loc>.json and terms.en.json. The pages kit
// counts each term in the curated English pages and shows what the locale's
// pages contain today; it reads them from git (HEAD), not from the disk, so
// a sparse checkout gives the same numbers as a full one. The UI kit needs
// the website's dictionaries, which live in the other repository, so their
// paths are passed in. --brands adds the website's MENU_BRANDS (a .mjs that
// exports it, or a text file with one name per line) to preserveVerbatim when
// deciding which labels are names.
//
// Import prints the report and the changes. --write updates <loc>.json
// (version + 1, changelog entry) only when the result validates; anything the
// importer will not guess is listed under "Needs maintainer", and --report
// writes that list to a file. Logic lives in lib/review-kit.mjs.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

import { canonical, formatError, validateLocale } from "./lib/glossary.mjs";
import { computeEvidence, exportKit, importKit, renderReport, serializeGlossary } from "./lib/review-kit.mjs";
import { siteDirectories } from "./validate.mjs";

const root = new URL("../../", import.meta.url).pathname;
const dir = join(root, "translation/glossary");

function die(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function usage() {
  die("usage: review-kit.mjs export <loc> --kit pages|ui|all [options] | import <loc> filled.md --reviewer <name> [--date YYYY-MM-DD] [--write]");
}

const argv = process.argv.slice(2);
const flags = new Map();
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const boolean = ["--write", "--no-evidence"].includes(a);
    if (boolean) flags.set(a, true);
    else {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) die(`${a} needs a value`);
      flags.set(a, v);
      i++;
    }
  } else positional.push(a);
}
const [command, loc, kitFile] = positional;
if (!command || !loc || !/^[a-z]{2,3}(-[A-Za-z0-9]+)*$/.test(loc)) usage();

const readJson = (p) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    die(`${p}: ${e.message}`);
  }
};

const termsEn = readJson(join(dir, "terms.en.json"));
const { preserveVerbatim = [] } = readJson(join(root, "translation/protected-terms.json"));
const glossaryPath = join(dir, `${loc}.json`);
if (!existsSync(glossaryPath)) {
  die(`${glossaryPath} does not exist. Create it with locale, version 1, meta, style and an empty changelog first (see README.md).`);
}
const glossary = readJson(glossaryPath);

async function loadBrands() {
  const p = flags.get("--brands");
  if (!p) return [];
  const abs = resolve(p);
  if (/\.m?js$/.test(abs)) {
    // The website's scripts/lib/menu-source.mjs imports TypeScript, so it
    // cannot be loaded by plain Node; and running another repository's code
    // to read a list would be the wrong trust direction anyway. Read the
    // string literals of the MENU_BRANDS set as text instead.
    const src = readFileSync(abs, "utf8");
    const m = src.match(/MENU_BRANDS\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
    if (!m) die(`${p}: no "MENU_BRANDS = new Set([...])" found`);
    const body = m[1].replace(/\/\/.*$/gm, "");
    return [...body.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => JSON.parse(`"${x[1]}"`));
  }
  return readFileSync(abs, "utf8").split("\n").map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
}

// Read blobs from HEAD in one git process. Missing paths come back as null.
function readFromHead(paths) {
  if (!paths.length) return [];
  const input = paths.map((p) => `HEAD:${p}`).join("\n") + "\n";
  const buf = execFileSync("git", ["cat-file", "--batch"], { cwd: root, input, maxBuffer: 1 << 30 });
  const out = [];
  let pos = 0;
  for (let i = 0; i < paths.length; i++) {
    const nl = buf.indexOf(10, pos);
    const header = buf.subarray(pos, nl).toString("utf8");
    pos = nl + 1;
    if (header.endsWith(" missing")) {
      out.push(null);
      continue;
    }
    const size = Number(header.split(" ")[2]);
    out.push(buf.subarray(pos, pos + size).toString("utf8"));
    pos += size + 1;
  }
  return out;
}

function evidence() {
  if (flags.get("--no-evidence")) return null;
  const curated = readFromHead(["translation/curated-pages.txt"])[0] ?? "";
  const pages = curated.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const en = readFromHead(pages.map((p) => `site/${p}`));
  const tr = readFromHead(pages.map((p) => `translations/${loc}/site/${p}`));
  const pairs = pages.map((_, i) => ({ en: en[i] ?? "", tr: tr[i] })).filter((p) => p.en);
  return computeEvidence(termsEn, glossary, pairs);
}

const brands = await loadBrands();

if (command === "export") {
  const kit = flags.get("--kit");
  if (!["pages", "ui", "all"].includes(kit)) usage();
  let dict = null;
  let enDict = null;
  if (kit !== "pages") {
    const d = flags.get("--dict");
    if (!d) die("the UI kit needs --dict <website>/dictionaries/<loc>.json");
    dict = readJson(resolve(d));
    const e = flags.get("--en-dict") ?? join(dirname(resolve(d)), "en.json");
    if (!existsSync(e)) die(`English dictionary not found at ${e}; pass --en-dict`);
    enDict = readJson(e);
  }
  const termIds = flags.get("--terms")?.split(",").map((s) => s.trim()).filter(Boolean) ?? null;
  for (const id of termIds ?? []) {
    if (!termsEn.terms.some((t) => t.id === id)) die(`--terms: "${id}" is not in terms.en.json`);
  }
  const md = exportKit({ glossary, termsEn, kit, termIds, evidence: kit === "ui" ? null : evidence(), dict, enDict, preserveVerbatim, brands });
  const out = flags.get("--out");
  if (out) {
    writeFileSync(out, md);
    console.log(`wrote ${out}`);
  } else process.stdout.write(md);
} else if (command === "import") {
  if (!kitFile) usage();
  const reviewer = flags.get("--reviewer");
  if (!reviewer) die("--reviewer is required (a GitHub handle or the name the reviewer wants credited)");
  const date = flags.get("--date") ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) die("--date must be YYYY-MM-DD");
  const md = readFileSync(kitFile, "utf8");
  const siteDirs = siteDirectories();
  const { glossary: next, report } = importKit({ glossary, termsEn, md, reviewer, date, sourceName: basename(kitFile), preserveVerbatim, brands, siteDirs });
  const text = renderReport(report);
  console.log(text);
  if (flags.get("--report")) writeFileSync(flags.get("--report"), text);
  if (!flags.get("--write")) {
    for (const f of ["terms", "phrases"]) {
      for (const key of [...(f === "terms" ? report.changedTerms : report.changedPhrases)]) {
        const before = glossary[f]?.[key];
        const after = next[f]?.[key];
        if (canonical(before) === canonical(after)) continue;
        console.log(`--- ${f}.${key}\n${before ? JSON.stringify(before) : "(new)"}\n+++\n${JSON.stringify(after)}`);
      }
    }
  }
  const errors = validateLocale(next, { termsEn, preserveVerbatim, siteDirs, fileLocale: loc });
  if (report.errors.length || errors.length) {
    for (const e of errors) console.error(formatError(e));
    die("import does not validate; nothing written");
  }
  if (flags.get("--write")) {
    if (next.version === glossary.version) console.log(`${loc}.json unchanged`);
    else {
      writeFileSync(glossaryPath, serializeGlossary(next, termsEn));
      console.log(`wrote ${glossaryPath} (version ${next.version})`);
    }
  }
} else usage();
