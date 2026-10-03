/**
 * Safe Translation Pipeline Automation Wrapper
 * Orchestrates invariant checks and staleness detection safely for CI/CD automation.
 */
import { execSync } from 'child_process';

console.log("=== Starting Safe Translation Pipeline Run ===");

try {
    console.log("Step 1: Running invariant checks...");
    execSync("node translation/check-invariants.mjs", { stdio: 'inherit' });

    console.log("Step 2: Detecting translation staleness...");
    execSync("node translation/detect-staleness.mjs", { stdio: 'inherit' });

    console.log("=== Translation Pipeline Verification Passed Successfully ===");
} catch (error) {
    console.error("=== Translation Pipeline Validation Failed ===");
    process.exit(1);
}
