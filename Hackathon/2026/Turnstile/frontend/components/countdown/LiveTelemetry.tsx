"use client";

import { formatHeight } from "@/lib/format";
import { useChainStatus } from "@/lib/useChainStatus";

export function LiveTelemetry() {
  const state = useChainStatus();

  const height =
    state.status === "live" ? formatHeight(state.chain.height) : placeholder(state.status);
  const remaining =
    state.status === "live"
      ? formatHeight(state.chain.blocksRemaining)
      : placeholder(state.status);
  const network =
    state.status === "live" ? "NOMINAL" : state.status === "loading" ? "…" : "OFFLINE";

  return (
    <div className="mt-auto grid grid-cols-3 gap-6 border-t border-border pt-8 font-mono">
      <Stat label="CURRENT_BLOCK" value={height} />
      <Stat label="BLOCKS_REMAINING" value={remaining} />
      <Stat
        label="NETWORK_STATUS"
        value={network}
        tone={state.status === "unavailable" ? "exposed" : "accent"}
      />
    </div>
  );
}

function placeholder(status: "loading" | "unavailable") {
  return status === "loading" ? "…" : "—";
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "accent" | "exposed";
}) {
  const colour =
    tone === "accent" ? "text-accent" : tone === "exposed" ? "text-exposed" : "text-foreground";

  return (
    <div className="cursor-default">
      <div className="text-[10px] uppercase tracking-widest text-faint">{label}</div>
      <div className={`text-lg font-bold tabular-nums ${colour}`}>{value}</div>
    </div>
  );
}
