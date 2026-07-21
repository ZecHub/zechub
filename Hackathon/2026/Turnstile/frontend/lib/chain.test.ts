import { describe, expect, it } from "vitest";

import { chainStatus, driftCorrectedBlockSeconds, phaseFor } from "@/lib/chain";
import { IRONWOOD_ACTIVATION_HEIGHT, TARGET_BLOCK_SECONDS } from "@/lib/constants";

describe("chainStatus", () => {
  it("counts the blocks left before activation", () => {
    const status = chainStatus(3_412_461);
    expect(status.blocksRemaining).toBe(IRONWOOD_ACTIVATION_HEIGHT - 3_412_461);
    expect(status.phase).toBe("preActivation");
  });

  it("never reports negative time once activation has passed", () => {
    const status = chainStatus(IRONWOOD_ACTIVATION_HEIGHT + 5_000);
    expect(status.blocksRemaining).toBe(0);
    expect(status.secondsRemaining).toBe(0);
  });

  it("derives the eta from the block target", () => {
    const status = chainStatus(IRONWOOD_ACTIVATION_HEIGHT - 100);
    expect(status.secondsRemaining).toBe(100 * TARGET_BLOCK_SECONDS);
  });
});

describe("phaseFor", () => {
  it("opens an activation window either side of the height", () => {
    expect(phaseFor(IRONWOOD_ACTIVATION_HEIGHT - 20)).toBe("activationWindow");
    expect(phaseFor(IRONWOOD_ACTIVATION_HEIGHT)).toBe("activationWindow");
    expect(phaseFor(IRONWOOD_ACTIVATION_HEIGHT + 20)).toBe("activationWindow");
  });

  it("is pre-activation before the window and post-activation after it", () => {
    expect(phaseFor(IRONWOOD_ACTIVATION_HEIGHT - 21)).toBe("preActivation");
    expect(phaseFor(IRONWOOD_ACTIVATION_HEIGHT + 21)).toBe("postActivation");
  });
});

describe("driftCorrectedBlockSeconds", () => {
  it("falls back to the target without enough samples", () => {
    expect(driftCorrectedBlockSeconds([])).toBe(TARGET_BLOCK_SECONDS);
    expect(driftCorrectedBlockSeconds([1000])).toBe(TARGET_BLOCK_SECONDS);
  });

  it("averages the observed intervals", () => {
    expect(driftCorrectedBlockSeconds([0, 90, 180, 270])).toBe(90);
  });

  it("clamps against absurd timestamps rather than trusting them", () => {
    expect(driftCorrectedBlockSeconds([0, 100_000])).toBe(TARGET_BLOCK_SECONDS * 2);
    expect(driftCorrectedBlockSeconds([0, 1])).toBe(TARGET_BLOCK_SECONDS / 2);
  });
});
