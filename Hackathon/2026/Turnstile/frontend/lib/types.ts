export type ActivationPhase = "preActivation" | "activationWindow" | "postActivation";

export type Verdict = "exposed" | "partial" | "ready" | "undetermined";

export interface ChainStatus {
  height: number;
  activationHeight: number;
  blocksRemaining: number;
  secondsRemaining: number;
  phase: ActivationPhase;
}

export interface PoolBalances {
  transparent: number | null;
  sapling: number | null;
  orchard: number | null;
}

export interface ScanResult {
  balances: PoolBalances;
  verdict: Verdict;
  scannedFromHeight: number;
  scannedToHeight: number;
}

export interface PoolSnapshot {
  date: string;
  sprout: number;
  sapling: number;
  orchard: number;
}

export type ReadinessStatus = "ready" | "in-progress" | "at-risk" | "unknown";

export interface ReadinessEntry {
  name: string;
  kind: "wallet" | "exchange" | "service";
  status: ReadinessStatus;
  note: string;
  source: string | null;
  verifiedOn: string | null;
}
