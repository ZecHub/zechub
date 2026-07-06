import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';

const rootDir = process.cwd();

// Control the number of simultaneous distributions and avoid creating too many simultaneous tasks
const CONCURRENCY_LIMIT = 10;

// You need to skip the directories and avoid entering them for clean-up.
const SKIP_DIRS = new Set(['.DS_Store', '.git', '.idea', '.vscode']);

/**
 * Process a single file/ directory entry * @param {string} CurrentDir - Current directory path * @param {string} item - file/ directory name * @param {string[} towers - target list to delete * @param {number} _depth - Current regression depth * @returns {Promise<boolean} - Whether further recalibration is required
 */
async function processItem(currentDir, item, targets, _depth) {
  // Skip Special Directory
  if (SKIP_DIRS.has(item)) {
    return false;
  }

  try {
    const itemPath = normalize(join(currentDir, item));

    if (targets.includes(item)) {
      // Delete target directory or file directly when matching
      await fs.rm(itemPath, { force: true, recursive: true });
      console.log(`✅ Deleted: ${itemPath}`);
      return false; // Deleted without Recursive
    }

    // Use the readdir with FileTypes option to avoid extra lstat calls
    return true; // Recursions may be required, depending on the caller.
  } catch (error) {
    // More detailed error information
    if (error.code === 'ENOENT') {
      // The file does not exist and may have been deleted, which is normal.
      return false;
    } else if (error.code === 'EPERM' || error.code === 'EACCES') {
      console.error(`❌ Permission denied: ${item} in ${currentDir}`);
    } else {
      console.error(
        `❌ Error handling item ${item} in ${currentDir}: ${error.message}`,
      );
    }
    return false;
  }
}

/**
 * Recursively find and remove target directory (and send optimised version) * @param {string} currentDir - current path of directory overflow * @param {string[} towers - list of objects to delete * @param {number} depth - current depth avoids depth
 */
async function cleanTargetsRecursively(currentDir, targets, depth = 0) {
  // Limit Recursive Depth to Avoid Infinite Recursions
  if (depth > 10) {
    console.warn(`Max recursion depth reached at: ${currentDir}`);
    return;
  }

  let dirents;
  try {
    // Use the option with FileTypes to obtain file type information one time and avoid subsequent lstat calls
    dirents = await fs.readdir(currentDir, { withFileTypes: true });
  } catch (error) {
    // If a directory cannot be read, it may have been deleted or insufficient access
    console.warn(`Cannot read directory ${currentDir}: ${error.message}`);
    return;
  }

  // Batch processing, controlled mass distribution
  for (let i = 0; i < dirents.length; i += CONCURRENCY_LIMIT) {
    const batch = dirents.slice(i, i + CONCURRENCY_LIMIT);

    const tasks = batch.map(async (dirent) => {
      const item = dirent.name;
      const shouldRecurse = await processItem(currentDir, item, targets, depth);

      // Recursive treatment if directory is not deleted
      if (shouldRecurse && dirent.isDirectory()) {
        const itemPath = normalize(join(currentDir, item));
        return cleanTargetsRecursively(itemPath, targets, depth + 1);
      }

      return null;
    });

    const results = await Promise.allSettled(tasks);

    // Check for failed tasks (optional: debug)
    const failedTasks = results.filter(
      (result) => result.status === 'rejected',
    );
    if (failedTasks.length > 0) {
      console.warn(
        `${failedTasks.length} tasks failed in batch starting at index ${i} in directory: ${currentDir}`,
      );
    }
  }
}

(async function startCleanup() {
  // Directory and file name to delete
  const targets = ['node_modules', 'dist', '.turbo', 'dist.zip'];
  const deleteLockFile = process.argv.includes('--del-lock');
  const cleanupTargets = [...targets];

  if (deleteLockFile) {
    cleanupTargets.push('pnpm-lock.yaml');
  }

  console.log(
    `🚀 Starting cleanup of targets: ${cleanupTargets.join(', ')} from root: ${rootDir}`,
  );

  const startTime = Date.now();

  try {
    // Count the number of targets to be deleted first
    console.log('📊 Scanning for cleanup targets...');

    await cleanTargetsRecursively(rootDir, cleanupTargets);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(
      `✨ Cleanup process completed successfully in ${duration.toFixed(2)}s`,
    );
  } catch (error) {
    console.error(`💥 Unexpected error during cleanup: ${error.message}`);
    process.exit(1);
  }
})();
