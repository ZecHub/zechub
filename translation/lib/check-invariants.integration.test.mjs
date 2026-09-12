// Integration tests for check-invariants.mjs, run against REAL git repositories.
//
// Why these exist, and why here. The unit tests next door cover the predicates.
// They do not cover the wiring, and the wiring is where the defects have been:
// a review demonstrated that severing the call site — passing a constant instead
// of the real value — restored a laundering bypass with every unit test still
// green. Two earlier regressions in this file lived in the same layer.
//
// They sit in translation/lib/ because the repo's CI runs
// `node --test translation/lib/*.test.mjs`; a test elsewhere would not run at
// all, which is the failure mode this is meant to prevent.
//
// Each case builds a throwaway repo, commits a base, commits a change on top,
// and asserts the checker's EXIT CODE. Exit code is the whole contract: a gate
// that returns 0 has admitted whatever it was shown.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, cpSync, readFileSync, chmodSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hashPage } from "./normalize-hash.mjs";

/** violations print as "  - msg"; notices print as "  note: msg". A test that
 *  merely greps the output cannot tell them apart, and one that did let a
 *  fail()->note() mutation pass unnoticed. */
const violations = (out) => out.split("\n").filter((l) => /^ {2}- /.test(l));
const hasViolation = (out, re) => violations(out).some((l) => re.test(l));

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..");
const CHECKER = join("translation", "check-invariants.mjs");

const EN_PAGE = "guides/Demo.md";
const EN_BODY = "# Demo\n\nSee [explorers](https://zechub.wiki/guides/blockchain-explorers).\n";
const TR_BODY = "# Demo\n\nVedi [explorers](https://zechub.wiki/guides/blockchain-explorers).\n";
const LOC = "it";

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" });
}

/** A minimal but REAL repo the checker can run against. */
function makeRepo() {
  const dir = mkdtempSync(join(tmpdir(), "inv-"));
  git(dir, "init", "-q", "-b", "main");
  git(dir, "config", "user.email", "t@t");
  git(dir, "config", "user.name", "t");
  const write = (rel, text) => {
    mkdirSync(join(dir, dirname(rel)), { recursive: true });
    writeFileSync(join(dir, rel), text);
  };
  // the checker and the libs it imports, copied from the repo under test
  mkdirSync(join(dir, "translation", "lib"), { recursive: true });
  cpSync(join(REPO, CHECKER), join(dir, CHECKER));
  for (const lib of ["normalize-hash.mjs", "verified-noops.mjs", "extract-title.mjs", "frontmatter.mjs", "term-forms.mjs"]) {
    try { cpSync(join(REPO, "translation", "lib", lib), join(dir, "translation", "lib", lib)); } catch { /* optional */ }
  }
  write(`site/${EN_PAGE}`, EN_BODY);
  write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY);
  write("translation/curated-pages.txt", `${EN_PAGE}\n`);
  const entry = {
    src: hashPage(EN_BODY), src_commit: "0".repeat(40), engine: "llm",
    mode: "diff", tool: "t", edited: false,
  };
  write("translation/sync-state.json", JSON.stringify({ [LOC]: { [EN_PAGE]: entry } }, null, 2) + "\n");
  git(dir, "add", "-A");
  git(dir, "commit", "-qm", "base");
  return {
    dir, write,
    base: git(dir, "rev-parse", "HEAD").trim(),
    manifest: () => JSON.parse(readFileSync(join(dir, "translation/sync-state.json"), "utf8")),
    setManifest: (m) => write("translation/sync-state.json", JSON.stringify(m, null, 2) + "\n"),
    commit: (msg) => { git(dir, "add", "-A"); git(dir, "commit", "-qm", msg); },
    /** the checker's exit code against the base */
    run(base) {
      return this.runOut(base).code;
    },
    /** exit code AND stdout — notices are part of the contract, not just the code */
    runOut(base, env) {
      try {
        // process.execPath, not "node": these runs may strip PATH on purpose.
        const out = execFileSync(process.execPath, [CHECKER, "--base", base || this.base], {
          cwd: dir, encoding: "utf8", stdio: "pipe",
          env: { ...process.env, ...(env || {}) },
        });
        return { code: 0, out };
      } catch (e) { return { code: e.status ?? 1, out: `${e.stdout || ""}${e.stderr || ""}` }; }
    },
    /** run with the named git subcommands failing and the rest of git working */
    runWithBrokenGit(subcommands, base) {
      const shim = mkdtempSync(join(tmpdir(), "shim-"));
      const real = execFileSync("sh", ["-c", "command -v git"], { encoding: "utf8" }).trim();
      const cases = subcommands.map((s) => `"${s}"`).join("|");
      writeFileSync(join(shim, "git"),
        `#!/bin/sh\nfor a in "$@"; do\n  case "$a" in\n    ${cases}) echo "fatal: simulated $a failure" >&2; exit 128;;\n  esac\ndone\nexec ${real} "$@"\n`);
      chmodSync(join(shim, "git"), 0o755);
      try {
        return this.runOut(base || this.base, { PATH: `${shim}:${process.env.PATH}` });
      } finally { rmSync(shim, { recursive: true, force: true }); }
    },
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}

const EN_HASH = hashPage(EN_BODY);
const TR_HASH = hashPage(TR_BODY);
const NEW_EN = EN_BODY.replace("blockchain-explorers", "block-explorers");

function bumpSrcTo(r, hash) {
  const m = r.manifest();
  m[LOC][EN_PAGE].src = hash;
  r.setManifest(m);
}

test("a clean repo passes", () => {
  const r = makeRepo();
  try { assert.equal(r.run(), 0); } finally { r.cleanup(); }
});

test("a bare source bump with no translation change is REFUSED", () => {
  // The invariant this gate exists for.
  const r = makeRepo();
  try {
    r.write(`site/${EN_PAGE}`, NEW_EN);
    bumpSrcTo(r, hashPage(NEW_EN));
    r.commit("bump only");
    assert.equal(r.run(), 1);
  } finally { r.cleanup(); }
});

test("a listed page whose English and translation both still match is ALLOWED", () => {
  const r = makeRepo();
  try {
    r.write(`site/${EN_PAGE}`, NEW_EN);
    bumpSrcTo(r, hashPage(NEW_EN));
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(NEW_EN)}  ${TR_HASH}\n`);
    r.commit("bump + authorisation");
    assert.equal(r.run(), 0);
  } finally { r.cleanup(); }
});

test("APPROVE-FIRST: an authorisation landed before the bump still applies", () => {
  // The natural order when the pipeline opens its own pull requests: a person
  // grants the exception, and the automation's NEXT run advances the record. An
  // earlier design required the line to be new in the same change, which made
  // this permanently impossible while telling the operator to add a line that
  // was already in the file.
  const r = makeRepo();
  try {
    // step 1 — the human: new English, and the authorisation. No bump yet.
    r.write(`site/${EN_PAGE}`, NEW_EN);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(NEW_EN)}  ${TR_HASH}\n`);
    r.commit("human approves ahead of time");
    const approved = git(r.dir, "rev-parse", "HEAD").trim();

    // step 2 — the automation: advance the record, touching nothing else.
    bumpSrcTo(r, hashPage(NEW_EN));
    r.commit("automation settles the page");

    assert.equal(r.run(approved), 0);
  } finally { r.cleanup(); }
});

test("REPLAY: a line stops applying once the translation has moved on", () => {
  const r = makeRepo();
  try {
    const TR2 = TR_BODY + "\nnuova riga\n";
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR2);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(NEW_EN)}  ${TR_HASH}\n`);
    const m = r.manifest(); m[LOC][EN_PAGE].tool = "t+edit"; r.setManifest(m);
    r.commit("translation moves on; stale line left behind");
    const mid = git(r.dir, "rev-parse", "HEAD").trim();
    r.write(`site/${EN_PAGE}`, NEW_EN);
    bumpSrcTo(r, hashPage(NEW_EN));
    r.commit("try to use the stale line");
    assert.equal(r.run(mid), 1);
  } finally { r.cleanup(); }
});

test("a listed English hash that is not the file on disk is REFUSED", () => {
  const r = makeRepo();
  try {
    const ghost = "sha256:" + "e".repeat(64);
    bumpSrcTo(r, ghost);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${ghost}  ${TR_HASH}\n`);
    r.commit("bless a source that never existed");
    assert.equal(r.run(), 1);
  } finally { r.cleanup(); }
});

test("an edited:true page cannot be settled by an authorisation", () => {
  const r = makeRepo();
  try {
    const m0 = r.manifest(); m0[LOC][EN_PAGE].edited = true; r.setManifest(m0);
    r.commit("hold the page");
    const held = git(r.dir, "rev-parse", "HEAD").trim();
    r.write(`site/${EN_PAGE}`, NEW_EN);
    const m = r.manifest(); m[LOC][EN_PAGE].edited = false; m[LOC][EN_PAGE].src = hashPage(NEW_EN); r.setManifest(m);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(NEW_EN)}  ${TR_HASH}\n`);
    r.commit("unhold and settle in one change");
    assert.equal(r.run(held), 1);
  } finally { r.cleanup(); }
});

test("a mode-only change does NOT count as a translation edit", () => {
  // chmod +x leaves the bytes identical. Counting it as a change satisfied both
  // directions at once and settled a stale page with no authorisation at all.
  const r = makeRepo();
  try {
    r.write(`site/${EN_PAGE}`, NEW_EN);
    bumpSrcTo(r, hashPage(NEW_EN));
    chmodSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), 0o755);
    r.commit("mode-only + bump");
    assert.equal(r.run(), 1);
  } finally { r.cleanup(); }
});

test("a real translation edit with recorded provenance passes", () => {
  const r = makeRepo();
  try {
    r.write(`site/${EN_PAGE}`, NEW_EN);
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("blockchain-explorers", "block-explorers"));
    const m = r.manifest(); m[LOC][EN_PAGE].src = hashPage(NEW_EN); m[LOC][EN_PAGE].tool = "t+pass"; r.setManifest(m);
    r.commit("real re-translation");
    assert.equal(r.run(), 0);
  } finally { r.cleanup(); }
});

test("an inert line naming a page that is not curated does not fail the build", () => {
  // Retiring a page must not be blocked by a leftover authorisation.
  const r = makeRepo();
  try {
    r.write("translation/verified-noops.txt", `${LOC}/guides/Gone.md  ${EN_HASH}  ${TR_HASH}\n`);
    r.commit("leftover line for a page that no longer exists");
    const { code, out } = r.runOut();
    assert.equal(code, 0, "retiring a page must not be blocked by a leftover line");
    assert.match(out, /names a page that is not curated/,
      "and the leftover must still be pointed at, or it is invisible rather than inert");
  } finally { r.cleanup(); }
});

// ---------------------------------------------------------------------------
// Regressions found in round-3 review. Each of these passed the whole suite
// before it was written, which is the reason it is written.

test("a mode-only change on a `-diff` path does NOT count as a translation edit", () => {
  // `--numstat` prints "-\t-" for a path marked `-diff` even when the blob is
  // untouched, so a line-count reading called an untouched file "changed" and
  // let a bare source bump through. Blob identity is what actually settles it.
  const r = makeRepo();
  try {
    r.write(".gitattributes", `translations/${LOC}/site/${EN_PAGE} -diff\n`);
    r.commit("mark the translation path -diff");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const EN2 = EN_BODY.replace("explorers", "block explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    chmodSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), 0o755);
    const m = r.manifest();
    m[LOC][EN_PAGE].src = hashPage(EN2);
    r.setManifest(m);
    r.commit("bump src, chmod the translation, change nothing inside it");

    assert.equal(r.run(base), 1, "a chmod on a -diff path must not satisfy Direction 2");
  } finally { r.cleanup(); }
});

test("an expired line actually PRINTS its notice (English moved on)", () => {
  // The notice loop was dead for its whole life: it called translationHash()
  // above that cache's `const`, and the ReferenceError was swallowed by the
  // try/catch meant to stop housekeeping ending the run. Exit code alone could
  // never see it, so this asserts on the output.
  const r = makeRepo();
  try {
    const stale = "sha256:" + "0".repeat(64);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${stale}  ${hashPage(TR_BODY)}\n`);
    r.commit("list a page against an English that is not on disk");
    const { code, out } = r.runOut(git(r.dir, "rev-parse", "HEAD").trim());
    assert.equal(code, 0, "an expired line is housekeeping, never a failure");
    assert.match(out, /no longer applies — the English it names has changed/);
  } finally { r.cleanup(); }
});

test("an expired line actually PRINTS its notice (translation moved on)", () => {
  const r = makeRepo();
  try {
    const stale = "sha256:" + "1".repeat(64);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(EN_BODY)}  ${stale}\n`);
    r.commit("list a page against a translation that is not on disk");
    const { code, out } = r.runOut(git(r.dir, "rev-parse", "HEAD").trim());
    assert.equal(code, 0);
    assert.match(out, /no longer applies — the translation it names has changed/);
  } finally { r.cleanup(); }
});

test("a renamed-and-edited translation is still seen as changed", () => {
  // `--numstat -z` reports a rename as "added\tdeleted\t\0old\0new\0" — the
  // path field is EMPTY and two more fields follow — so a record-per-line
  // reading dropped the record entirely. `--no-renames` keeps one path per
  // record: the rename arrives as a delete plus an add.
  const r = makeRepo();
  try {
    const NEW = "guides/Renamed.md";
    r.write("translation/curated-pages.txt", `${NEW}\n`);
    git(r.dir, "mv", `site/${EN_PAGE}`, `site/${NEW}`);
    git(r.dir, "mv", `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${NEW}`);
    r.write(`translations/${LOC}/site/${NEW}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][NEW] = m[LOC][EN_PAGE];
    delete m[LOC][EN_PAGE];
    r.setManifest(m);
    r.commit("move the page and edit the translation in the same commit");

    // A moved page keeps the record it always had, so this still passes — but it
    // passes because the src did not advance, NOT because a new key is exempt.
    // That exemption was a way to settle a stale page and is gone.
    assert.equal(r.run(), 0);
  } finally { r.cleanup(); }
});

// ---------------------------------------------------------------------------
// Round-3, second pass. The first four came from reviewers; these come from the
// one finding that outranked them all, plus the mutations that still survived.

/** A repo whose translation is GENUINELY stale: it still carries the old link. */
function staleRepo() {
  const r = makeRepo();
  const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
  return {
    ...r,
    /** advance the English and the manifest, leaving the translation stale */
    advance(mutateTranslation) {
      r.write(`site/${EN_PAGE}`, EN2);
      if (mutateTranslation) mutateTranslation(r.write);
      const m = r.manifest();
      m[LOC][EN_PAGE].src = hashPage(EN2);
      m[LOC][EN_PAGE].tool = "t+pass2";   // satisfies Direction 1
      r.setManifest(m);
      r.commit("advance the English, record a pass, leave the translation stale");
    },
  };
}

test("a stale translation cannot be settled by appending blank lines", () => {
  // THE hole this round found. hashPage ignores trailing blank lines, so this is
  // an edit the pipeline itself calls "no edit" — but it moves the git blob. When
  // Direction 2 asked git "did the blob change" instead of "did the page change",
  // a translation still carrying the old link was marked current with no
  // exception and no human anywhere near it.
  const r = staleRepo();
  try {
    r.advance((write) => write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY + "\n\n"));
    assert.equal(r.run(), 1, "trailing blank lines are not a translation edit");
  } finally { r.cleanup(); }
});

test("a stale translation cannot be settled by switching to CRLF", () => {
  const r = staleRepo();
  try {
    r.advance((write) => write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace(/\n/g, "\r\n")));
    assert.equal(r.run(), 1, "line endings are not a translation edit");
  } finally { r.cleanup(); }
});

test("a real translation edit is still accepted (control for the two above)", () => {
  const r = staleRepo();
  try {
    r.advance((write) => write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("blockchain-explorers", "block-explorers")));
    assert.equal(r.run(), 0, "a genuine retranslation must still pass");
  } finally { r.cleanup(); }
});

test("a failed git listing is reported as a failed listing", () => {
  // When `git ls-files` threw, the catch returned an empty Set. That does NOT go
  // vacuously green — `locales` comes from the manifest, so every declared locale
  // then reports "no translations directory" and the build is red either way.
  // What it costs is the diagnosis: one accurate line becomes an avalanche of
  // violations blaming the corpus for a broken listing. So the contract worth
  // pinning is the MESSAGE, which an exit code alone cannot see.
  const r = makeRepo();
  try {
    const { code, out } = r.runWithBrokenGit(["ls-files"]);
    assert.equal(code, 1, "an unreadable listing must never pass");
    assert.match(out, /could not list translations\//,
      "the run must say the listing failed, not blame the corpus for being absent");
  } finally { r.cleanup(); }
});

test("a malformed allowlist line fails the build", () => {
  const r = makeRepo();
  try {
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(EN_BODY)}\n`); // one hash short
    r.commit("half a line");
    assert.equal(r.run(), 1, "an unparseable authorisation must not be shrugged off as a notice");
  } finally { r.cleanup(); }
});

test("a duplicate allowlist key fails the build", () => {
  const r = makeRepo();
  try {
    const line = `${LOC}/${EN_PAGE}  ${hashPage(EN_BODY)}  ${hashPage(TR_BODY)}`;
    r.write("translation/verified-noops.txt", `${line}\n${line}\n`);
    r.commit("the same page authorised twice");
    assert.equal(r.run(), 1);
  } finally { r.cleanup(); }
});

test("a base entry with no `edited` field is refused, not admitted", () => {
  // The predicate is fail-closed on both sides (`!== false`). Pin that, because
  // the looser reading (`!== true`) passes every other test in this suite.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    delete m0[LOC][EN_PAGE].edited;          // base entry lacks the flag entirely
    r.setManifest(m0);
    r.commit("base entry without an edited flag");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    r.write("translation/verified-noops.txt", `${LOC}/${EN_PAGE}  ${hashPage(EN2)}  ${hashPage(TR_BODY)}\n`);
    const m = r.manifest();
    m[LOC][EN_PAGE].src = hashPage(EN2);
    m[LOC][EN_PAGE].edited = false;
    r.setManifest(m);
    r.commit("authorise and bump");

    assert.equal(r.run(base), 1, "an unknown base `edited` state must not be treated as false");
  } finally { r.cleanup(); }
});

test("DIRECTION 1: an edited translation with no recorded provenance is REFUSED", () => {
  // The whole first invariant had no negative case: every test that edited a
  // translation also recorded the pass, so deleting the Direction 1 enforcement
  // outright passed the entire suite. This is the case that makes it real —
  // somebody changes a translated page and the manifest says nothing happened.
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda bene"));
    r.commit("edit a translation and record nothing");
    assert.equal(r.run(), 1, "an unexplained translation edit must not pass");
  } finally { r.cleanup(); }
});

test("DIRECTION 1: `edited:true` already at base is not a standing licence", () => {
  // Flipping the flag is a reason; having flipped it once is not. Otherwise one
  // hand-edit buys permanent freedom to change the file with no manifest trace.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    m0[LOC][EN_PAGE].edited = true;
    r.setManifest(m0);
    r.commit("mark the page hand-edited");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda bene"));
    r.commit("edit it again, recording nothing");
    assert.equal(r.run(base), 1, "edited:true at base must not license further silent edits");
  } finally { r.cleanup(); }
});

test("DIRECTION 1: flipping edited:true in THIS change is an accepted reason", () => {
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda bene"));
    const m = r.manifest();
    m[LOC][EN_PAGE].edited = true;
    r.setManifest(m);
    r.commit("a human fix, declared as one");
    assert.equal(r.run(), 0, "declaring a hand-edit must remain a valid reason");
  } finally { r.cleanup(); }
});

// Front matter is where "changed" gets subtle: some keys are churn the pipeline
// deliberately ignores, the rest are real content. The wiring must honour that
// distinction, and a mutation that flattened it passed every test before these.

const FM = (date, title) => `---\ntitle: ${title}\ndate: ${date}\n---\n`;
const EN_FM = FM("2026-01-01", "Demo") + EN_BODY;
const TR_FM = FM("2026-01-01", "Demo") + TR_BODY;

/** base repo whose pages carry front matter, then advance the English */
function fmRepo() {
  const r = makeRepo();
  r.write(`site/${EN_PAGE}`, EN_FM);
  r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_FM);
  const m0 = r.manifest();
  m0[LOC][EN_PAGE].src = hashPage(EN_FM);
  r.setManifest(m0);
  r.commit("give the pages front matter");
  const base = git(r.dir, "rev-parse", "HEAD").trim();
  const EN2 = FM("2026-01-01", "Demo") + EN_BODY.replace("blockchain-explorers", "block-explorers");
  return {
    ...r, base,
    advance(newTranslation) {
      r.write(`site/${EN_PAGE}`, EN2);
      r.write(`translations/${LOC}/site/${EN_PAGE}`, newTranslation);
      const m = r.manifest();
      m[LOC][EN_PAGE].src = hashPage(EN2);
      m[LOC][EN_PAGE].tool = "t+pass2";
      r.setManifest(m);
      r.commit("advance");
      return r.run(base);
    },
  };
}

test("bumping only a volatile front-matter key does NOT settle a stale page", () => {
  // `date:` is churn by design — the pipeline hashes as though it were not there.
  // So touching only that is not a translation edit, however much the blob moved.
  const r = fmRepo();
  try {
    assert.equal(r.advance(FM("2026-09-11", "Demo") + TR_BODY), 1);
  } finally { r.cleanup(); }
});

test("changing a NON-volatile front-matter key is a real translation change", () => {
  // The title is content: a translated title that changed really did change, and
  // treating it as churn would refuse honest work.
  const r = fmRepo();
  try {
    assert.equal(r.advance(FM("2026-01-01", "Dimostrazione") + TR_BODY), 0);
  } finally { r.cleanup(); }
});

test("a translation must be an ordinary file, not a symlink", () => {
  // A symlink's blob holds its TARGET PATH, so pointing a page at an identical
  // copy moves the blob while the text a reader sees never changes — the diff
  // said "changed" and readFileSync said "same", and a stale page settled.
  const r = makeRepo();
  try {
    r.write("attic/copy.md", TR_BODY);          // identical stale content, tracked
    r.commit("add a copy elsewhere in the tree");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    rmSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`));
    symlinkSync("../../../../attic/copy.md", join(r.dir, `translations/${LOC}/site/${EN_PAGE}`));
    const m = r.manifest();
    m[LOC][EN_PAGE].src = hashPage(EN2);
    m[LOC][EN_PAGE].tool = "t+pass2";
    r.setManifest(m);
    r.commit("swap the translation for a symlink");

    assert.equal(r.run(base), 1, "a symlinked translation must be refused outright");
  } finally { r.cleanup(); }
});

test("DIRECTION 1: a tool-only provenance change is a valid reason", () => {
  // `tool` alone is exactly what the refusal message tells people to write, and
  // it is the shape commit 9dcac0e4 used on 72 entries. Nothing tested it, so
  // dropping `tool` from the provenance comparison passed the whole suite.
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][EN_PAGE].tool = "t+linkrepair";      // ONLY tool moves
    r.setManifest(m);
    r.commit("repair a link in the translation and say so in `tool`");
    assert.equal(r.run(), 0, "recording the pass in `tool` must be accepted");
  } finally { r.cleanup(); }
});

test("DIRECTION 1: a mode-only provenance change is a valid reason", () => {
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][EN_PAGE].mode = "full";              // ONLY mode moves
    r.setManifest(m);
    r.commit("retranslate the whole page rather than diffing it");
    assert.equal(r.run(), 0, "recording the pass in `mode` must be accepted");
  } finally { r.cleanup(); }
});

test("an unreadable blob cannot satisfy Direction 2", () => {
  // The run is red anyway because reading the blob fails. What this pins is the
  // CLASSIFICATION: an unreadable object must not be counted as "the translation
  // changed", or it would be arguing the source bump is fine. Softening the
  // `fail()` to a notice used to admit a stale page; now the decision itself
  // refuses.
  const r = staleRepo();
  try {
    const base = r.base;
    // remember the base blob of the translation, then advance leaving it stale
    const oid = git(r.dir, "rev-parse", `${base}:translations/${LOC}/site/${EN_PAGE}`).trim();
    r.advance((write) => write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY + "\nuna riga in piu\n"));
    // make that object unreadable: loose objects live at .git/objects/ab/cdef...
    const loose = join(r.dir, ".git", "objects", oid.slice(0, 2), oid.slice(2));
    rmSync(loose, { force: true });
    assert.equal(r.run(base), 1, "an unreadable blob must never license a source bump");
  } finally { r.cleanup(); }
});

test("`--no-renames` is load-bearing: a PURE rename stays parseable", () => {
  // The earlier rename test renamed AND edited a tiny file, so git reported a
  // delete plus an add and no rename record was ever produced — it pinned
  // nothing. A pure rename is what actually makes git emit `R`, whose -z record
  // carries TWO path fields and breaks a one-path-per-record reading.
  const r = makeRepo();
  try {
    const NEW = "guides/Renamed.md";
    r.write("translation/curated-pages.txt", `${NEW}\n`);
    git(r.dir, "mv", `site/${EN_PAGE}`, `site/${NEW}`);
    git(r.dir, "mv", `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${NEW}`);
    const m = r.manifest();
    m[LOC][NEW] = m[LOC][EN_PAGE];
    delete m[LOC][EN_PAGE];
    r.setManifest(m);
    r.commit("move the page, touching not one byte of it");

    // git with rename detection on would report R100 here; the checker must not
    // trip over it. Force detection on to be sure we are exercising that shape.
    git(r.dir, "config", "diff.renames", "true");
    const { code, out } = r.runOut();
    assert.equal(code, 0, out);
    assert.doesNotMatch(out, /could not parse git raw diff record/,
      "a rename record must never reach the parser");
  } finally { r.cleanup(); }
});

test("a dirty working tree is called out, because CI asks about the commit", () => {
  // The whole check reads disk, so a dirty tree gets a coherent answer — about
  // disk. That is not the question CI asks, and "invariants hold" must not be
  // read as a promise about what is being pushed.
  const r = makeRepo();
  try {
    writeFileSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), TR_BODY + "\nnon commesso\n");
    const { out } = r.runOut();
    assert.match(out, /uncommitted change\(s\) under site\/, translations\/ or translation\//);
    assert.match(out, /describes your WORKING TREE/);
  } finally { r.cleanup(); }
});

test("a symlink that was ALREADY there is refused, not just a new one", () => {
  // The change detector only sees shapes that appear in a diff, so a link that
  // predates the base never reached it. Direction 2 happened to refuse such a
  // page anyway, but for the wrong reason — "nothing changed" rather than "this
  // is not a page". The rule is now stated over the whole tree.
  const r = makeRepo();
  try {
    r.write("attic/copy.md", TR_BODY);
    rmSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`));
    symlinkSync("../../../../attic/copy.md", join(r.dir, `translations/${LOC}/site/${EN_PAGE}`));
    r.commit("a translation that is a link, from the start");
    // Compare against THIS commit, so the link appears in no diff record at all.
    // Otherwise the changed-record check fires with the same wording and the
    // tree-wide rule is never the thing under test.
    const base = git(r.dir, "rev-parse", "HEAD").trim();
    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /is not a regular file \(mode 120000\)/),
      `expected a VIOLATION about the symlink, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("DIRECTION 1: an engine-only provenance change is a valid reason", () => {
  // Switching engine for a locale (NLLB -> Google, say) is a recorded pass. It
  // was missing from the comparison, so such a change was refused with advice to
  // record the thing that had just been recorded.
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][EN_PAGE].engine = "nllb";             // ONLY engine moves
    r.setManifest(m);
    r.commit("retranslate this locale with a different engine");
    assert.equal(r.run(), 0, "recording the pass in `engine` must be accepted");
  } finally { r.cleanup(); }
});

test("the refusal does not offer a line that cannot work", () => {
  // A line pins the manifest's src to the English on disk. If the manifest
  // records some other hash, no line satisfies that — and printing one sends the
  // operator round a loop: they add exactly what was asked and get the same
  // refusal back.
  const r = makeRepo();
  try {
    const base = r.base;
    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    const m = r.manifest();
    m[LOC][EN_PAGE].src = "sha256:" + "7".repeat(64);   // neither base nor disk
    r.setManifest(m);
    r.commit("bump src to something that is not the English on disk");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /no exception can bridge that/),
      `expected the refusal to explain the src mismatch, got:\n${out}`);
    assert.ok(!hasViolation(out, /a human can record that in/),
      "it must not offer a line that cannot satisfy the check");
  } finally { r.cleanup(); }
});

test("a RENAME cannot settle a stale translation", () => {
  // The fifth laundering route, and the most plausible: move the English, move
  // its stale translation verbatim, move the manifest key, set src to the new
  // English. The key is new, so Direction 2 used to skip it entirely — and the
  // gate's own advice about a moved page tells contributors to do exactly this.
  const r = makeRepo();
  try {
    const NEW = "guides/Demo_v2.md";
    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write("translation/curated-pages.txt", `${NEW}\n`);
    git(r.dir, "mv", `site/${EN_PAGE}`, `site/${NEW}`);
    r.write(`site/${NEW}`, EN2);                                   // English moves on
    git(r.dir, "mv", `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${NEW}`);
    const m = r.manifest();                                        // translation moves VERBATIM — still stale
    m[LOC][NEW] = { ...m[LOC][EN_PAGE], src: hashPage(EN2) };
    delete m[LOC][EN_PAGE];
    r.setManifest(m);
    r.commit("move the page to a new route and bump its source");

    assert.equal(r.run(), 1, "a rename must not launder a stale translation fresh");
  } finally { r.cleanup(); }
});

test("a PURE rename with no source bump still passes", () => {
  // The control that keeps the fix honest: moving a page is ordinary
  // housekeeping and must not start failing.
  const r = makeRepo();
  try {
    const NEW = "guides/Demo_v2.md";
    r.write("translation/curated-pages.txt", `${NEW}\n`);
    git(r.dir, "mv", `site/${EN_PAGE}`, `site/${NEW}`);
    git(r.dir, "mv", `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${NEW}`);
    const m = r.manifest();
    m[LOC][NEW] = m[LOC][EN_PAGE];
    delete m[LOC][EN_PAGE];
    r.setManifest(m);
    r.commit("move the page, changing nothing about it");
    assert.equal(r.run(), 0, "an honest move must stay green");
  } finally { r.cleanup(); }
});

test("a genuinely new page with a new translation still passes", () => {
  // The other control: a page that really is new has no ancestor to inherit
  // from, and must not be caught by the rename rule.
  const r = makeRepo();
  try {
    const NEW = "guides/Brand_New.md";
    const EN_NEW = "# Brand New\n\nSomething else entirely.\n";
    r.write(`site/${NEW}`, EN_NEW);
    r.write(`translations/${LOC}/site/${NEW}`, "# Brand New\n\nQualcosa di completamente diverso.\n");
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${NEW}\n`);
    const m = r.manifest();
    m[LOC][NEW] = { src: hashPage(EN_NEW), src_commit: "0".repeat(40), engine: "llm", mode: "seed", tool: "t", edited: false };
    r.setManifest(m);
    r.commit("curate and translate a brand new page");
    assert.equal(r.run(), 0, "a genuinely new page must still be accepted");
  } finally { r.cleanup(); }
});

test("an UNCOMMITTED translation edit is seen, and must record why", () => {
  // The working-tree switch exists so the check reads what is on disk. Nothing
  // asserted that: substituting the base text for the disk text passed the whole
  // suite, which means the mechanism could be removed without a test noticing.
  // Direction 1 must fire on an edit that exists only on disk.
  const r = makeRepo();
  try {
    writeFileSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`),
      TR_BODY.replace("Vedi", "Guarda bene"));      // edited, NOT committed
    const { code, out } = r.runOut();
    assert.equal(code, 1, "an unrecorded edit on disk must be refused");
    assert.ok(hasViolation(out, /translation changed but manifest provenance did not/),
      `expected Direction 1 to fire on the disk edit, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("an edited:true page is not offered an exception it cannot use", () => {
  // noopAllowed refuses on `edited` before it ever looks at a line, so printing
  // one sends the operator round the same loop: add exactly what was printed,
  // get the identical refusal back.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    m0[LOC][EN_PAGE].edited = true;
    r.setManifest(m0);
    r.commit("hold this page as hand-edited");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    const m = r.manifest();
    m[LOC][EN_PAGE].src = hashPage(EN2);
    r.setManifest(m);
    r.commit("advance the English and the record");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /held as hand-edited/), `expected the edited explanation, got:\n${out}`);
    assert.ok(!hasViolation(out, /a human can record that in/),
      "it must not offer a line that `edited` will refuse anyway");
  } finally { r.cleanup(); }
});

// root can read a 0o000 file, so this cannot be expressed as a test there.
const ROOT = typeof process.getuid === "function" && process.getuid() === 0;

test("an unreadable page is a finding, not a crash", { skip: ROOT && "running as root" }, () => {
  // currentHash/translationHash guarded existence but not readability, so an I/O
  // error threw out of module evaluation and every violation already collected
  // was discarded — a stack trace instead of the report.
  const r = makeRepo();
  try {
    chmodSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), 0o000);
    const { code, out } = r.runOut();
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /cannot be read|could not read/),
      `expected a read finding, got:\n${out}`);
    assert.doesNotMatch(out, /at ModuleJob\.run/, "must not surface a stack trace");
  } finally {
    try { chmodSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), 0o644); } catch {}
    r.cleanup();
  }
});

test("a directory where a translation should be is not a translation", () => {
  // A directory at a page's path reads to git as a deletion, and a deletion counts
  // as "changed" — the classification that satisfies Direction 2.
  const r = staleRepo();
  try {
    r.advance(() => {});
    rmSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), { force: true });
    mkdirSync(join(r.dir, `translations/${LOC}/site/${EN_PAGE}`), { recursive: true });
    const { code, out } = r.runOut(r.base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /no translated file there|manifest entry for missing file/),
      `expected the directory to be refused, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("an unreadable ENGLISH page is a finding, not a crash", { skip: ROOT && "running as root" }, () => {
  // The change-tracking reader has its own guard, so an unreadable TRANSLATION is
  // caught there. The English side is only ever read by currentHash, which is the
  // path that used to throw out of module evaluation and discard the report.
  const r = makeRepo();
  try {
    chmodSync(join(r.dir, `site/${EN_PAGE}`), 0o000);
    const { code, out } = r.runOut();
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /cannot be read/), `expected a read finding, got:\n${out}`);
    assert.doesNotMatch(out, /at ModuleJob\.run/, "must not surface a stack trace");
  } finally {
    try { chmodSync(join(r.dir, `site/${EN_PAGE}`), 0o644); } catch {}
    r.cleanup();
  }
});

test("an AMBIGUOUS move is refused rather than guessed", () => {
  // Two pages can hold identical translations, and then content cannot say which
  // one a moved file came from. That only matters when the two records DISAGREE
  // about the source they were translated against — then the page's verdict
  // depends on a guess, so the gate refuses instead of guessing. (The companion
  // test below pins the other half: candidates that agree are not ambiguous in
  // any way this check can act on, and refusing there would block honest work.)
  const r = makeRepo();
  try {
    const TWIN = "guides/Twin.md";
    r.write(`site/${TWIN}`, EN_BODY);
    r.write(`translations/${LOC}/site/${TWIN}`, TR_BODY);   // IDENTICAL translation
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${TWIN}\n`);
    const m0 = r.manifest();
    // ...but a DIFFERENT recorded source. Identical text, two stories about it.
    m0[LOC][TWIN] = { ...m0[LOC][EN_PAGE], src: hashPage("# Other\n\nsomething else entirely\n") };
    r.setManifest(m0);
    r.commit("two curated pages whose translations are identical");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    // both pages collapse into one new route
    const MERGED = "guides/Merged.md";
    r.write("translation/curated-pages.txt", `${MERGED}\n`);
    git(r.dir, "rm", "-q", `site/${EN_PAGE}`, `site/${TWIN}`,
      `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${TWIN}`);
    r.write(`site/${MERGED}`, EN_BODY);
    r.write(`translations/${LOC}/site/${MERGED}`, TR_BODY);
    const m = r.manifest();
    m[LOC][MERGED] = { ...m[LOC][EN_PAGE] };
    delete m[LOC][EN_PAGE];
    delete m[LOC][TWIN];
    r.setManifest(m);
    r.commit("collapse both pages into one route");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /identical to 2 entries at the base/),
      `expected an ambiguity refusal, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("a diff that failed is a finding, and does not become one per pair", () => {
  // The only thing that says which paths stand still is the diff. Without it no
  // base hash comes free, and a predecessor index over every base entry would ask
  // git once per pair — on the real corpus 3762 reads, most of which would fail
  // the same way the diff just did and each of which would print. One fault, one
  // finding. This branch had no test at all; deleting the guard must be visible.
  const r = makeRepo();
  try {
    // cat-file breaks with it: a repo that cannot answer one git read usually
    // cannot answer the others either, and that is the case where an index over
    // every base entry turns one fault into one finding per pair.
    const { code, out } = r.runWithBrokenGit(["diff", "cat-file"]);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /git diff against base .* failed/), `expected the diff failure to be reported, got:\n${out}`);
    assert.equal(violations(out).length, 1, `one fault must produce one finding, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("an unreadable base file is reported once, not once per reader", () => {
  // Two readers ask for the same base hash — the predecessor index and the
  // per-entry comparison. Only paths the diff listed are read from git, so this
  // needs a translation that actually changed; then the read fails and must
  // still produce a single finding.
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][EN_PAGE].tool = "t+repair";
    r.setManifest(m);
    r.commit("retranslate");
    const { code, out } = r.runWithBrokenGit(["cat-file"]);
    assert.equal(code, 1);
    const reads = violations(out).filter((l) => /could not read .* at base/.test(l));
    assert.equal(reads.length, 1, `one unreadable file must produce one finding, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("predecessors that disagree about `edited` are ambiguous too", () => {
  // `edited` is read from the predecessor as well as `src`: noopAllowed refuses
  // outright when the base record was held as hand-edited. Two candidates that
  // agree on the source but not on that flag decide the page's verdict between
  // them, so picking whichever came first would be a guess with an exception
  // line riding on it.
  const r = makeRepo();
  try {
    const TWIN = "guides/Twin.md";
    r.write(`site/${TWIN}`, EN_BODY);
    r.write(`translations/${LOC}/site/${TWIN}`, TR_BODY);      // identical translation
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${TWIN}\n`);
    const m0 = r.manifest();
    m0[LOC][TWIN] = { ...m0[LOC][EN_PAGE], edited: true };     // same src, held by hand
    r.setManifest(m0);
    r.commit("two pages, one translation, one of them held");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const MERGED = "guides/Merged.md";
    r.write("translation/curated-pages.txt", `${MERGED}\n`);
    git(r.dir, "rm", "-q", `site/${EN_PAGE}`, `site/${TWIN}`,
      `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${TWIN}`);
    r.write(`site/${MERGED}`, NEW_EN);
    r.write(`translations/${LOC}/site/${MERGED}`, TR_BODY);
    const m = r.manifest();
    m[LOC][MERGED] = { ...m[LOC][EN_PAGE], src: hashPage(NEW_EN) };
    delete m[LOC][EN_PAGE];
    delete m[LOC][TWIN];
    r.setManifest(m);
    r.commit("collapse both into one route");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /identical to 2 entries at the base/),
      `expected an ambiguity refusal, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("predecessors that agree are not ambiguous — seeding a locale is not blocked", () => {
  // The corpus this runs on carries one page's translation across 17 locales
  // untranslated (English passed through), and two more across 5 and 2. Every
  // such group agrees on the source it was translated against. Refusing on the
  // COUNT of candidates rather than on their disagreement would make seeding any
  // new locale red on those pages, with a remedy ("give them distinct
  // translations") the operator cannot apply to a passthrough. A gate that blocks
  // honest work gets switched off.
  const r = makeRepo();
  try {
    const SHARED = "guides/Shared.md";
    const PASS = "# Shared\n\nIdentical in every locale.\n";
    r.write(`site/${SHARED}`, PASS);
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${SHARED}\n`);
    const m0 = r.manifest();
    const shared = { src: hashPage(PASS), src_commit: "0".repeat(40), engine: "gt", mode: "seed", tool: "t", edited: false };
    for (const loc of [LOC, "es", "de"]) {
      r.write(`translations/${loc}/site/${SHARED}`, PASS);
      m0[loc] = { ...(m0[loc] || {}), [SHARED]: { ...shared } };
    }
    r.setManifest(m0);
    r.commit("three locales sharing one passthrough translation");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    // seed a fourth locale: same text, same recorded source, nothing stale
    r.write(`translations/sw/site/${SHARED}`, PASS);
    const m = r.manifest();
    m.sw = { [SHARED]: { ...shared } };
    r.setManifest(m);
    r.commit("seed sw");

    const { code, out } = r.runOut(base);
    assert.equal(code, 0, `seeding a locale must not be refused, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("a COPY that claims a source its translation was never made against is refused", () => {
  // Q5. A page move split across two pull requests: the first copies the page to
  // its new key and leaves the old one in place, the second retires the old key.
  // Each is checked on its own, and in the copying half the new key's record is
  // whatever it says it is — unless a page that still exists can also be a
  // predecessor. This is the half that carries the lie, so this is the half that
  // has to refuse; the retiring half is an ordinary deletion.
  const r = makeRepo();
  try {
    const NEW = "guides/Moved.md";
    const NEW_BODY = "# Moved\n\nA different English page about transparent addresses.\n";
    r.write(`site/${NEW}`, NEW_BODY);
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${NEW}\n`);
    r.write(`translations/${LOC}/site/${NEW}`, TR_BODY);     // the COPY, unchanged text
    const m = r.manifest();
    m[LOC][NEW] = { ...m[LOC][EN_PAGE], src: hashPage(NEW_BODY) };  // claims the new English
    r.setManifest(m);
    r.commit("PR1: copy the page to its new key, keep the old one");

    const { code, out } = r.runOut();
    assert.equal(code, 1, `the copying half must refuse, got:\n${out}`);
    assert.ok(hasViolation(out, new RegExp(`${LOC}/${NEW}: manifest src changed but the translation file did not`)),
      `expected Direction 2 to fire on the copy, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("a whole-locale COPY cannot re-date a stale locale under a new code", () => {
  // The same split move at locale scale: copy translations/it to translations/xx,
  // keep it, and let the new block record today's English for text translated
  // against something older. 18 locales' worth of stale pages marked current in
  // one pull request, with the second half — deleting `it` — entirely innocent.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    m0[LOC][EN_PAGE].src = hashPage("# Demo\n\nan older English\n");   // `it` is stale
    r.setManifest(m0);
    r.commit("it falls behind");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    r.write(`translations/it-IT/site/${EN_PAGE}`, TR_BODY);            // byte-for-byte copy
    const m = r.manifest();
    m["it-IT"] = { [EN_PAGE]: { ...m0[LOC][EN_PAGE], src: EN_HASH } }; // but claims today's
    r.setManifest(m);
    r.commit("PR1: copy the locale under its new code");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1, `the copying half must refuse, got:\n${out}`);
    assert.ok(hasViolation(out, /it-IT\/guides\/Demo\.md: manifest src changed but the translation file did not/),
      `expected Direction 2 to fire on the copied locale, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("KNOWN LIMIT: a rename that also edits escapes rule 1", () => {
  // Not a bug report — a boundary, pinned so it cannot drift unnoticed.
  //
  // A move is identified by its content, so when the translation changes too there
  // is nothing to match and the page reads as new. Rule 1 asks whether provenance
  // moved SINCE the base record, and a page with no base record has nothing to
  // compare, so it passes. The same edit without the rename is refused.
  //
  // Accepted deliberately: nothing stale is being marked current — the file really
  // did change — so the failure this gate exists to prevent still cannot happen.
  // What is lost is the record of WHY it changed. Closing it needs the predecessor
  // identified some other way (matching the English side, or git's rename
  // detection), which is a second matcher; the cost was judged higher than the gap.
  const r = makeRepo();
  try {
    const NEW = "guides/Demo_v2.md";
    r.write("translation/curated-pages.txt", `${NEW}\n`);
    git(r.dir, "mv", `site/${EN_PAGE}`, `site/${NEW}`);
    git(r.dir, "mv", `translations/${LOC}/site/${EN_PAGE}`, `translations/${LOC}/site/${NEW}`);
    r.write(`translations/${LOC}/site/${NEW}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][NEW] = { ...m[LOC][EN_PAGE] };       // provenance copied verbatim
    delete m[LOC][EN_PAGE];
    r.setManifest(m);
    r.commit("move the page and edit its translation, recording nothing");
    assert.equal(r.run(), 0, "documented limit: a renamed+edited page reads as new");
  } finally { r.cleanup(); }
});

test("...but the same edit WITHOUT a rename is refused", () => {
  // The control that gives the limit above its exact shape.
  const r = makeRepo();
  try {
    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    r.commit("edit the translation, recording nothing");
    assert.equal(r.run(), 1);
  } finally { r.cleanup(); }
});

test("a LOCALE rename cannot settle stale translations", () => {
  // The page-rename route one level up: move translations/it to translations/it-IT,
  // rename the manifest's locale key, bump src, touch no translation. Searching for
  // a predecessor only inside the same locale made every page look brand new, so
  // Direction 2 skipped all of them — a locale-code migration marking the whole
  // locale current in one commit.
  const r = staleRepo();
  try {
    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    git(r.dir, "mv", `translations/${LOC}`, "translations/it-IT");
    const m = r.manifest();
    m["it-IT"] = { [EN_PAGE]: { ...m[LOC][EN_PAGE], src: hashPage(EN2) } };
    delete m[LOC];
    r.setManifest(m);
    r.commit("migrate the locale code, leaving the translations untouched");
    assert.equal(r.run(), 1, "a locale rename must not launder stale translations");
  } finally { r.cleanup(); }
});

test("a .gitattributes filter cannot make every page look changed", () => {
  // The base side was read with `git show`, which hands back the RAW BLOB, while
  // the other side reads the working tree. Declaring an encoding makes those two
  // different representations of the same page: the blob is re-canonicalised, the
  // working tree is not. Every listed path then compares unequal forever — and
  // "changed" is the answer that skips Direction 2, so a stale page settles with
  // no authorisation. Both sides must be read in the form a reader sees.
  const r = makeRepo();
  try {
    // UTF-16LE needs an even byte count, and a single trailing space is stripped
    // by hashPage, so padding to even length changes nothing the gate can see.
    const even = (t) => (Buffer.byteLength(t) % 2 ? t.replace(/\n$/, " \n") : t);
    r.write(`translations/${LOC}/site/${EN_PAGE}`, even(TR_BODY));
    r.write(".gitattributes", "translations/** working-tree-encoding=UTF-16LE\n");
    git(r.dir, "add", "-A");
    git(r.dir, "add", "--renormalize", "-A");    // re-canonicalises the blobs
    git(r.dir, "commit", "-qm", "declare an encoding for translated pages");
    const v1 = git(r.dir, "rev-parse", "HEAD").trim();

    // English moves on; the translation is touched only cosmetically (trailing
    // blank lines, which hashPage normalises away) so the path is a candidate
    // without the page having changed.
    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    r.write(`translations/${LOC}/site/${EN_PAGE}`, even(TR_BODY) + "\n\n");
    const m = r.manifest();
    m[LOC][EN_PAGE].src = hashPage(EN2);
    m[LOC][EN_PAGE].tool = "cosmetic";
    r.setManifest(m);
    r.commit("advance the English and the record, touching the translation cosmetically");

    assert.equal(r.run(v1), 1, "an encoding attribute must not settle a stale page");
  } finally { r.cleanup(); }
});
test("a malformed locale block is reported, not a stack trace", () => {
  // Object.keys(null) discards every violation collected so far.
  const r = makeRepo();
  try {
    const m = r.manifest();
    m.fr = null;
    r.setManifest(m);
    r.commit("a locale block that is not an object");
    const { code, out } = r.runOut();
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /locale "fr" is not an object/), `got:\n${out}`);
    assert.doesNotMatch(out, /at ModuleJob\.run/, "must not surface a stack trace");
  } finally { r.cleanup(); }
});

test("deleting a locale's manifest block while its files stay is refused", () => {
  // The only thing catching this is two lines of locale-universe bijection, and
  // nothing tested them: deleting both lines passed the whole suite. Without it a
  // locale silently vanishes from sync selection while its pages sit on disk —
  // the same permanent, invisible staleness as a single page, at locale scale.
  const r = makeRepo();
  try {
    const m = r.manifest();
    delete m[LOC];                      // block gone, files kept
    r.setManifest(m);
    r.commit("drop the locale from the manifest, leave its files");
    const { code, out } = r.runOut();
    assert.equal(code, 1);
    assert.ok(hasViolation(out, /locale "it" has translations but no manifest block/),
      `expected a locale-universe violation, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("a page held at BASE is not offered an exception either", () => {
  // heldByHand has two clauses. Every existing test leaves edited:true set on both
  // sides, so the first clause alone satisfied them and the base clause was never
  // exercised — dropping it passed the suite while restoring the R7 loop, because
  // noopAllowed refuses on the BASE entry's edited flag too.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    m0[LOC][EN_PAGE].edited = true;
    r.setManifest(m0);
    r.commit("hold the page as hand-edited");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const EN2 = EN_BODY.replace("blockchain-explorers", "block-explorers");
    r.write(`site/${EN_PAGE}`, EN2);
    const m = r.manifest();
    m[LOC][EN_PAGE].edited = false;     // cleared HERE; still held at base
    m[LOC][EN_PAGE].src = hashPage(EN2);
    r.setManifest(m);
    r.commit("clear the flag and advance the record");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1);
    assert.ok(!hasViolation(out, /a human can record that in/),
      `must not offer a line noopAllowed will refuse on the base entry:\n${out}`);
    assert.ok(hasViolation(out, /held as hand-edited at the base/),
      `and must say which side holds it:\n${out}`);
  } finally { r.cleanup(); }
});

test("a manifest that is not an object is reported, not a stack trace", () => {
  // Parsing as JSON does not make it a manifest: null, a list and a string all
  // parse. Object.keys(null) throws, and a throw here discards the report.
  for (const bad of ["null", "[]", '"x"']) {
    const r = makeRepo();
    try {
      writeFileSync(join(r.dir, "translation/sync-state.json"), `${bad}\n`);
      const { code, out } = r.runOut();
      assert.equal(code, 1, `${bad} must be refused`);
      assert.ok(hasViolation(out, /is not a JSON object/), `${bad} got:\n${out}`);
      assert.doesNotMatch(out, /at ModuleJob\.run/, `${bad} must not surface a stack trace`);
    } finally { r.cleanup(); }
  }
});

test("predecessors whose `edited` differs only by TYPE are ambiguous", () => {
  // false and "false" print identically. noopAllowed admits one and refuses the
  // other, so a disagreement key built by string interpolation called them
  // equivalent — and the gate then picked whichever came first, deciding the
  // page's verdict by array order.
  const r = makeRepo();
  try {
    const TWIN = "guides/Twin.md";
    r.write(`site/${TWIN}`, EN_BODY);
    r.write(`translations/${LOC}/site/${TWIN}`, TR_BODY);     // identical text
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${TWIN}\n`);
    const m0 = r.manifest();
    m0[LOC][EN_PAGE].edited = false;
    m0[LOC][TWIN] = { ...m0[LOC][EN_PAGE], edited: "false" };  // same text, other TYPE
    r.setManifest(m0);
    r.commit("two pages with identical translations, edited differing by type");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    const NEW = "guides/Copy.md";
    r.write(`site/${NEW}`, EN_BODY);
    r.write(`translations/${LOC}/site/${NEW}`, TR_BODY);       // continues... which one?
    r.write("translation/curated-pages.txt", `${EN_PAGE}\n${TWIN}\n${NEW}\n`);
    const m = r.manifest();
    m[LOC][NEW] = { ...m[LOC][EN_PAGE] };
    r.setManifest(m);
    r.commit("add a page whose translation matches both");

    const { code, out } = r.runOut(base);
    assert.equal(code, 1, "candidates that decide the page differently must be refused");
    assert.ok(hasViolation(out, /do not agree/), `expected an ambiguity refusal, got:\n${out}`);
  } finally { r.cleanup(); }
});

test("a malformed base entry cannot be a predecessor", () => {
  // Reading .src off a null entry is a TypeError, and a throw here discards the
  // report along with every finding in it.
  const r = makeRepo();
  try {
    const m0 = r.manifest();
    m0[LOC]["guides/Ghost.md"] = null;
    r.setManifest(m0);
    r.commit("a base entry that is not a record");
    const base = git(r.dir, "rev-parse", "HEAD").trim();

    r.write(`translations/${LOC}/site/${EN_PAGE}`, TR_BODY.replace("Vedi", "Guarda"));
    const m = r.manifest();
    m[LOC][EN_PAGE].tool = "t+pass2";
    r.setManifest(m);
    r.commit("edit a translation and record it");

    const { code, out } = r.runOut(base);
    assert.doesNotMatch(out, /at ModuleJob\.run/, "must not surface a stack trace");
    assert.equal(typeof code, "number");
  } finally { r.cleanup(); }
});
