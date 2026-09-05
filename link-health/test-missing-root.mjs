#!/usr/bin/env node
// Regression test for: link checker reports a clean scan when the content directory
// does not exist. See https://bounties.zechub.wiki/cmtocv24j000icvvkhlv7sici
//
// The fix: check-links.mjs must exit with a non-zero status and emit a clear
// error on stderr when --root points at a directory that does not exist.

import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SCRIPT = new URL("./check-links.mjs", import.meta.url).pathname;

let failed = 0;

function run(label, args, expectExit, expectStderrMatch) {
  const r = spawnSync("node", [SCRIPT, ...args], {
    encoding: "utf8",
    timeout: 60000,
  });
  const ok = r.status === expectExit && (!expectStderrMatch || expectStderrMatch.test(r.stderr));
  if (ok) {
    console.log(`ok - ${label}`);
  } else {
    failed++;
    console.error(`FAIL - ${label}`);
    console.error(`  exit:     expected ${expectExit}, got ${r.status}`);
    console.error(`  stderr:   ${r.stderr.slice(0, 400)}`);
    console.error(`  stdout:   ${r.stdout.slice(0, 400)}`);
  }
}

// 1. Missing --root directory must fail with a non-zero exit and a clear error
//    pointing at the missing path.
const missingDir = join(tmpdir(), `zechub-missing-${Date.now()}`);
if (existsSync(missingDir)) rmSync(missingDir, { recursive: true, force: true });

run(
  "missing --root exits non-zero with a clear error",
  ["--offline", "--root", missingDir],
  1,
  /content root does not exist/i,
);

// 2. With a temporary but empty content directory the run should still succeed
//    and report 0 files scanned. This proves the error path above is only
//    triggered when the directory is absent, not merely when it is empty.
const emptyDir = mkdtempSync(join(tmpdir(), "zechub-empty-"));
try {
  run(
    "empty but existing --root succeeds and reports 0 files",
    ["--offline", "--root", emptyDir, "--json", join(emptyDir, "out.json")],
    0,
    null,
  );
} finally {
  rmSync(emptyDir, { recursive: true, force: true });
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll regression tests passed");
