#!/usr/bin/env node
// Regression for missing/--root-is-a-file.
// Origin: openkoder, https://github.com/ZecHub/zechub/pull/2045
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const script = new URL("./check-links.mjs", import.meta.url).pathname;

function run(root) {
  return spawnSync(process.execPath, [script, "--offline", "--root", root], {
    encoding: "utf8",
  });
}

{
  const missing = join(tmpdir(), `zechub-missing-root-${Date.now()}`);
  const r = run(missing);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /does not exist/i);
}

{
  const dir = mkdtempSync(join(tmpdir(), "zechub-file-root-"));
  const file = join(dir, "not-a-dir.txt");
  writeFileSync(file, "x");
  try {
    const r = run(file);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /not a directory/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log("missing-root cases correct");
