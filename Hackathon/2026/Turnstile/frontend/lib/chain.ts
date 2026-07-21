import {
  ACTIVATION_WINDOW_BLOCKS,
  IRONWOOD_ACTIVATION_HEIGHT,
  TARGET_BLOCK_SECONDS,
} from "@/lib/constants";
import type { ActivationPhase, ChainStatus } from "@/lib/types";

export function phaseFor(height: number): ActivationPhase {
  const distance = Math.abs(height - IRONWOOD_ACTIVATION_HEIGHT);

  if (distance <= ACTIVATION_WINDOW_BLOCKS) return "activationWindow";
  if (height < IRONWOOD_ACTIVATION_HEIGHT) return "preActivation";
  return "postActivation";
}

export function chainStatus(
  height: number,
  blockSeconds: number = TARGET_BLOCK_SECONDS,
): ChainStatus {
  const blocksRemaining = Math.max(0, IRONWOOD_ACTIVATION_HEIGHT - height);

  return {
    height,
    activationHeight: IRONWOOD_ACTIVATION_HEIGHT,
    blocksRemaining,
    secondsRemaining: blocksRemaining * blockSeconds,
    phase: phaseFor(height),
  };
}

export function driftCorrectedBlockSeconds(recentTimestamps: number[]): number {
  if (recentTimestamps.length < 2) return TARGET_BLOCK_SECONDS;

  const ordered = [...recentTimestamps].sort((a, b) => a - b);
  const span = ordered[ordered.length - 1] - ordered[0];
  const observed = Math.round(span / (ordered.length - 1));

  return Math.min(
    Math.max(observed, TARGET_BLOCK_SECONDS / 2),
    TARGET_BLOCK_SECONDS * 2,
  );
}
