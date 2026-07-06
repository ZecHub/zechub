import type { CAC } from 'cac';

import { extname } from 'node:path';

import { getStagedFiles } from '@vben/node-utils';

import { circularDepsDetect } from 'circular-dependency-scanner';

// Default Configuration
const DEFAULT_CONFIG = {
  allowedExtensions: ['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  ignoreDirs: [
    'dist',
    '.turbo',
    'output',
    '.cache',
    'scripts',
    'internal',
    'packages/effects/request/src/',
    'packages/@core/ui-kit/menu-ui/src/',
    'packages/@core/ui-kit/popup-ui/src/',
  ],
  threshold: 0, // Thresholds on which the cycle depends
} as const;

// Type definition
type CircularDependencyResult = string[];

interface CheckCircularConfig {
  allowedExtensions?: string[];
  ignoreDirs?: string[];
  threshold?: number;
}

interface CommandOptions {
  config?: CheckCircularConfig;
  staged: boolean;
  verbose: boolean;
}

// Cache mechanism
const cache = new Map<string, CircularDependencyResult[]>();

/**
 * Formatting Reliance Output * @param circle - Cycle Reliance Result
 */
function formatCircles(circles: CircularDependencyResult[]): void {
  if (circles.length === 0) {
    console.log('✅ No circular dependencies found');
    return;
  }

  console.log('⚠️ Circular dependencies found:');
  circles.forEach((circle, index) => {
    console.log(`\nCircular dependency #${index + 1}:`);
    circle.forEach((file) => console.log(`  → ${file}`));
  });
}

/**
 * Check loop dependency * @param options - Check options * @param options. stopd - Check only the suspense file * @param options. verbose - Show details * @param options.config - custom configuration * @returnsPromise<void>
 */
async function checkCircular({
  config = {},
  staged,
  verbose,
}: CommandOptions): Promise<void> {
  try {
    // Merge Configuration
    const finalConfig = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    // Generate Ignore Mode
    const ignorePattern = `**/{${finalConfig.ignoreDirs.join(',')}}/**`;

    // Check Cache
    const cacheKey = `${staged}-${process.cwd()}-${ignorePattern}`;
    if (cache.has(cacheKey)) {
      const cachedResults = cache.get(cacheKey);
      if (cachedResults) {
        verbose && formatCircles(cachedResults);
      }
      return;
    }

    // Detection loop dependency
    const results = await circularDepsDetect({
      absolute: staged,
      cwd: process.cwd(),
      ignore: [ignorePattern],
    });

    if (staged) {
      let files = await getStagedFiles();
      const allowedExtensions = new Set(finalConfig.allowedExtensions);

      // Filter File List
      files = files.filter((file) => allowedExtensions.has(extname(file)));

      const circularFiles: CircularDependencyResult[] = [];

      for (const file of files) {
        for (const result of results) {
          const resultFiles = result.flat();
          if (resultFiles.includes(file)) {
            circularFiles.push(result);
          }
        }
      }

      // Update Cache
      cache.set(cacheKey, circularFiles);
      verbose && formatCircles(circularFiles);
    } else {
      // Update Cache
      cache.set(cacheKey, results);
      verbose && formatCircles(results);
    }

    // If cycle dependency is found, only warning messages are exported
    if (results.length > 0) {
      console.log(
        '\n⚠️ Warning: Circular dependencies found, please check and fix',
      );
    }
  } catch (error) {
    console.error(
      '❌ Error checking circular dependencies:',
      error instanceof Error ? error.message : error,
    );
  }
}

/**
 * Define Command to Check Cycle Reliance * @param cac - CAC Example
 */
function defineCheckCircularCommand(cac: CAC): void {
  cac
    .command('check-circular')
    .option('--staged', 'Only check staged files')
    .option('--verbose', 'Show detailed information')
    .option('--threshold <number>', 'Threshold for circular dependencies', {
      default: 0,
    })
    .option('--ignore-dirs <dirs>', 'Directories to ignore, comma separated')
    .usage('Analyze project circular dependencies')
    .action(async ({ ignoreDirs, staged, threshold, verbose }) => {
      const config: CheckCircularConfig = {
        threshold: Number(threshold),
        ...(ignoreDirs && { ignoreDirs: ignoreDirs.split(',') }),
      };

      await checkCircular({
        config,
        staged,
        verbose: verbose ?? true,
      });
    });
}

export { type CheckCircularConfig, defineCheckCircularCommand };