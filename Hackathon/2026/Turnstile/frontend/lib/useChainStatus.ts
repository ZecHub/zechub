"use client";

import { useEffect, useState } from "react";

import type { ChainStatus } from "@/lib/types";

const POLL_MS = 60_000;

export type ChainState =
  | { status: "loading" }
  | { status: "live"; chain: ChainStatus }
  | { status: "unavailable" };

export function useChainStatus(): ChainState {
  const [state, setState] = useState<ChainState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const response = await fetch("/api/status");
        if (!response.ok) throw new Error("unavailable");

        const chain = (await response.json()) as ChainStatus;
        if (!cancelled) setState({ status: "live", chain });
      } catch {
        if (!cancelled) setState({ status: "unavailable" });
      }
    }

    poll();
    const timer = setInterval(poll, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return state;
}
