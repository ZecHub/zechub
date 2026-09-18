#!/usr/bin/env node
import { test } from "node:test";
import assert from "node:assert";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const execAsync = promisify(exec);

test("exits with nonzero code and clear error when --root does not exist", async () => {
  // Create a unique name for a deliberately non-existent directory
  const nonexistentDir = join(tmpdir(), `zechub-missing-content-${Date.now()}`);
  
  try {
    await execAsync(`node link-health/check-links.mjs --offline --root ${nonexistentDir}`);
    // If we reach this line, the process exited with code 0, which is an error
    assert.fail("Expected the command to throw an error and exit with nonzero code");
  } catch (err) {
    // Verify that the exit code is not 0
    assert.notEqual(err.code, 0, `Expected nonzero exit code, but got ${err.code}`);
    
    // Verify that the error message contains a clear description of the problem
    assert.match(
      err.stderr, 
      /does not exist or cannot be accessed/i, 
      "Expected clear error message in stderr"
    );
  }
});

test("exits with nonzero code when --root is a file, not a directory", async () => {
  // Create a temporary file to test the reaction to a file path instead of a directory
  const tempDir = await mkdtemp(join(tmpdir(), "zechub-test-"));
  const tempFile = join(tempDir, "fake-root.txt");
  await writeFile(tempFile, "test");

  try {
    await execAsync(`node link-health/check-links.mjs --offline --root ${tempFile}`);
    assert.fail("Expected the command to throw an error for a file path");
  } catch (err) {
    assert.notEqual(err.code, 0, "Expected nonzero exit code for file path");
    assert.match(err.stderr, /is a file, not a directory/i, "Expected 'not a directory' error message");
  } finally {
    // Clean up temporary files
    await rm(tempDir, { recursive: true, force: true });
  }
});