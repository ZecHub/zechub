// Print the translation prompt head for one page (or one block) of one locale.
//
// Usage:
//   node translation/glossary/render-prompt.mjs <loc> <rel-path-under-site> [--text-file <file>] [--ui]
//
//   <rel-path-under-site>  e.g. guides/Raspberry_Pi_4_Full_Node.md. Chooses the
//                          register (Indonesian kamu / Anda) and, unless
//                          --text-file is given, the English text the terms
//                          are filtered by (site/<rel>).
//   --text-file <file>     filter terms by this English text instead (one
//                          block of a page, or a batch of UI strings)
//   --ui                   UI strings: the UI register and ui/both entries
//
// Reads translation/glossary/prompt-template.md, <loc>.json and terms.en.json;
// logic in lib/render-prompt.mjs. Exits 1, printing nothing to stdout, when
// the locale has no glossary or the text cannot be read, so a caller never
// sends a model a half-built prompt.
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { renderPrompt } from "./lib/render-prompt.mjs";

const root = new URL("../../", import.meta.url).pathname;
const dir = join(root, "translation/glossary");

function die(message) {
  console.error(`render-prompt: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const pos = [];
  let textFile = null;
  let ui = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--ui") ui = true;
    else if (a === "--text-file") {
      textFile = argv[++i];
      if (!textFile) die("--text-file needs a file");
    } else if (a.startsWith("--")) die(`unknown option ${a}`);
    else pos.push(a);
  }
  if (pos.length !== 2) die("usage: render-prompt.mjs <loc> <rel-path-under-site> [--text-file file] [--ui]");
  return { loc: pos[0], rel: pos[1].replace(/^\/+/, "").replace(/^site\//, ""), textFile, ui };
}

function read(path, what) {
  try {
    return readFileSync(path, "utf8");
  } catch (e) {
    die(`cannot read ${what} (${path}): ${e.code ?? e.message}`);
  }
}

const isMain = process.argv[1] && new URL(import.meta.url).pathname === process.argv[1];
if (isMain) {
  const { loc, rel, textFile, ui } = parseArgs(process.argv.slice(2));
  if (!/^[a-z]{2,3}(-[A-Za-z0-9]+)*$/.test(loc)) die(`bad locale "${loc}"`);
  const glossary = JSON.parse(read(join(dir, `${loc}.json`), `the ${loc} glossary`));
  const termsEn = JSON.parse(read(join(dir, "terms.en.json"), "terms.en.json"));
  const template = read(join(dir, "prompt-template.md"), "prompt-template.md");
  const text = textFile ? read(textFile, "--text-file") : read(join(root, "site", rel), "the English page");
  process.stdout.write(renderPrompt({ template, glossary, termsEn, relPath: rel, text, ui }).text);
}
