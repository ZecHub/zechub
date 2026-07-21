"use client";

import { LiveDot, Pill } from "@/components/ui/Pill";
import { useChainStatus } from "@/lib/useChainStatus";

export function LiveBadge() {
  const state = useChainStatus();

  const message =
    state.status === "live"
      ? state.chain.phase === "postActivation"
        ? "Ironwood is live — Orchard is closed to new deposits"
        : state.chain.phase === "activationWindow"
          ? "Activation window — Ironwood is arriving now"
          : `Ironwood activation in ${Math.ceil(state.chain.secondsRemaining / 86_400)} days`
      : state.status === "loading"
        ? "Reading the chain tip…"
        : "Chain tip unreachable";

  return (
    <Pill className="mb-8">
      <LiveDot />
      <span className="font-mono text-xs text-muted">{message}</span>
    </Pill>
  );
}
