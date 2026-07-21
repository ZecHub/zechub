"use client";

import { Countdown } from "@/components/countdown/Countdown";
import { LiveDot } from "@/components/ui/Pill";
import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight } from "@/lib/format";
import { useChainStatus } from "@/lib/useChainStatus";

export function EmbedCountdown() {
  const state = useChainStatus();

  return (
    <div className="w-full max-w-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex cursor-default items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint">
          <LiveDot />
          Orchard closes at block {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}
        </span>
        <span className="cursor-default font-mono text-[10px] tabular-nums uppercase tracking-widest text-faint">
          {state.status === "live"
            ? `${formatHeight(state.chain.blocksRemaining)} blocks`
            : state.status === "loading"
              ? "…"
              : "tip unreachable"}
        </span>
      </div>

      {state.status === "live" ? (
        <Countdown secondsRemaining={state.chain.secondsRemaining} />
      ) : (
        <div className="rounded-2xl border border-border bg-surface px-6 py-10 text-center font-mono text-xs text-faint">
          {state.status === "loading" ? "Reading the chain tip…" : "Chain tip unreachable — no number is better than a made-up one."}
        </div>
      )}

      <a
        href="https://turnstile-xi.vercel.app/check"
        target="_blank"
        rel="noreferrer"
        className="mt-4 block cursor-pointer text-center font-mono text-[10px] uppercase tracking-widest text-faint transition-colors duration-200 hover:text-accent"
      >
        Is your ZEC ready? Check with a viewing key → turnstile
      </a>
    </div>
  );
}
