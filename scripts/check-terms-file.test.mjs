// Regression suite for check-terms-file.mjs.
//
// Every rule is proved twice: a fixture that satisfies it must pass, and a
// fixture that breaks it must FAIL. A suite that only shows green says nothing
// about whether the gate would catch anything — which is the whole reason this
// gate exists, since the failure it guards against is one that exits 0.
//
// Run: node scripts/check-terms-file.test.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { checkTermsData, compareTerms, fixTermsData, serialize } from "./check-terms-file.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCRIPT = join(HERE, "check-terms-file.mjs");

let failed = 0;
let total = 0;
const fail = (name, want, got) => {
  failed++;
  console.log(`  FAIL ${name}\n       want ${want}\n       got  ${got}`);
};
const check = (name, got, want) => {
  total++;
  const g = JSON.stringify(got);
  const w = JSON.stringify(want);
  if (g !== w) fail(name, w, g);
};

/** A minimal well-formed file. */
const good = () => ({
  preserveVerbatim: ["a16z", "Argos", "Zcash", "Zingo!", "zingo-cli"],
  equivalentForms: [["zk-SNARK", "zk-SNARKs"]],
  glossaryOnly: ["chain", "token"],
});

// equivalentForms members must be protected, so the good fixture declares them.
const goodFull = () => {
  const d = good();
  d.preserveVerbatim = [...d.preserveVerbatim, "zk-SNARK", "zk-SNARKs"].sort(compareTerms);
  return d;
};

const problemsFor = (data) => checkTermsData(data, serialize(data));

// ── the comparator ──────────────────────────────────────────────────────────
// This is the one the file actually obeys. localeCompare disagrees here, and a
// check built on it would reject a clean file.
check("comparator: Zingo! sorts before zingo-cli", compareTerms("Zingo!", "zingo-cli") < 0, true);
check("comparator: case is ignored", compareTerms("argos", "Argos"), 0);
check("comparator: a16z before Arborist", compareTerms("a16z", "Arborist Calls") < 0, true);

// ── the happy path ──────────────────────────────────────────────────────────
check("a well-formed file has no problems", problemsFor(goodFull()), []);

// ── each rule, broken on purpose ────────────────────────────────────────────
const breaks = {
  "top level is an array": () => ["a16z"],
  "top level is a string": () => "nope",
  "top level is null": () => null,
  "preserveVerbatim missing": () => {
    const d = goodFull();
    delete d.preserveVerbatim;
    return d;
  },
  "preserveVerbatim is empty": () => ({ ...goodFull(), preserveVerbatim: [], equivalentForms: [] }),
  "preserveVerbatim is not an array": () => ({ ...goodFull(), preserveVerbatim: "a16z", equivalentForms: [] }),
  "a key is misspelled": () => {
    const d = goodFull();
    d.preserveverbatim = d.preserveVerbatim;
    delete d.preserveVerbatim;
    d.equivalentForms = [];
    return d;
  },
  "an unknown key is present": () => ({ ...goodFull(), extraSection: [] }),
  "a term is not a string": () => ({ ...goodFull(), glossaryOnly: [42] }),
  "a term is empty": () => ({ ...goodFull(), glossaryOnly: ["", "token"] }),
  "a term has trailing whitespace": () => ({ ...goodFull(), glossaryOnly: ["chain ", "token"] }),
  "a term contains a newline": () => ({ ...goodFull(), glossaryOnly: ["chain\ntoken"] }),
  "a term is duplicated": () => {
    const d = goodFull();
    return { ...d, glossaryOnly: ["chain", "chain", "token"] };
  },
  "a term is duplicated apart from case": () => ({ ...goodFull(), glossaryOnly: ["Chain", "chain"] }),
  "a list is out of order": () => ({ ...goodFull(), glossaryOnly: ["token", "chain"] }),
  "the sections contradict each other": () => {
    const d = goodFull();
    d.glossaryOnly = ["Zcash"];
    return d;
  },
  "equivalentForms is not an array": () => ({ ...goodFull(), equivalentForms: "zk-SNARK" }),
  "an equivalentForms member is unprotected": () => ({
    ...goodFull(),
    equivalentForms: [["zk-SNARK", "Not In The List"]],
  }),
  "an equivalentForms group repeats a member": () => ({
    ...goodFull(),
    equivalentForms: [["zk-SNARK", "zk-SNARK"]],
  }),
};

for (const [name, make] of Object.entries(breaks)) {
  total++;
  const got = problemsFor(make());
  if (got.length === 0) fail(`break: ${name}`, "at least one problem", "[]");
}

// ── --fix ───────────────────────────────────────────────────────────────────
check(
  "fix sorts a list without adding or removing terms",
  fixTermsData({ preserveVerbatim: ["Zcash", "a16z"] }).preserveVerbatim,
  ["a16z", "Zcash"],
);
check(
  "fix leaves a non-list section alone",
  fixTermsData({ preserveVerbatim: ["a16z"], equivalentForms: [["a", "b"]] }).equivalentForms,
  [["a", "b"]],
);
check(
  "fix keeps the file's key order",
  Object.keys(fixTermsData(goodFull())),
  Object.keys(goodFull()),
);
check("serialize ends with a newline", serialize({ a: 1 }).endsWith("\n"), true);

// ── the CLI, end to end ─────────────────────────────────────────────────────
const run = (dir, ...a) => {
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT, ...a], { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { code: 0, stdout };
  } catch (err) {
    return { code: err.status ?? 1, stdout: `${err.stdout ?? ""}${err.stderr ?? ""}` };
  }
};

const fixture = (data, asText) => {
  const dir = mkdtempSync(join(tmpdir(), "terms-"));
  mkdirSync(join(dir, "translation"), { recursive: true });
  writeFileSync(
    join(dir, "translation", "protected-terms.json"),
    asText ?? serialize(data),
  );
  return dir;
};

{
  const d = fixture(goodFull());
  check("cli: a good file exits 0", run(d).code, 0);
  rmSync(d, { recursive: true });
}
{
  const d = fixture({ ...goodFull(), glossaryOnly: ["token", "chain"] });
  check("cli: an unsorted file exits 1", run(d).code, 1);
  check("cli: --fix then repairs it", run(d, "--fix").code, 0);
  check("cli: and it passes afterwards", run(d).code, 0);
  check(
    "cli: --fix sorted the list",
    JSON.parse(readFileSync(join(d, "translation", "protected-terms.json"), "utf8")).glossaryOnly,
    ["chain", "token"],
  );
  rmSync(d, { recursive: true });
}
{
  // --fix must not pretend to repair a duplicate: silently dropping a term is
  // data loss dressed up as a fix.
  const d = fixture({ ...goodFull(), glossaryOnly: ["chain", "chain"] });
  check("cli: --fix exits 1 on a duplicate it cannot repair", run(d, "--fix").code, 1);
  check(
    "cli: --fix did not delete the duplicate",
    JSON.parse(readFileSync(join(d, "translation", "protected-terms.json"), "utf8")).glossaryOnly.length,
    2,
  );
  rmSync(d, { recursive: true });
}
{
  const d = fixture(null, "{ not json");
  const r = run(d);
  check("cli: invalid JSON exits 1", r.code, 1);
  total++;
  if (!/not valid JSON/.test(r.stdout)) fail("cli: invalid JSON says so", "a parse message", JSON.stringify(r.stdout.slice(0, 80)));
  rmSync(d, { recursive: true });
}
{
  const d = mkdtempSync(join(tmpdir(), "terms-"));
  check("cli: a missing file exits 1", run(d).code, 1);
  rmSync(d, { recursive: true });
}

// ── the real file ───────────────────────────────────────────────────────────
// The gate has to pass on the repository it guards, or it is noise.
{
  const repoRoot = join(HERE, "..");
  check("the repo's own protected-terms.json passes", run(repoRoot).code, 0);
}

console.log(failed ? `\n${failed}/${total} failing` : `\nall ${total} cases correct`);
process.exit(failed ? 1 : 0);
