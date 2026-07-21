"use client";

import { formatHeight } from "@/lib/format";
import { useChainStatus } from "@/lib/useChainStatus";

export function ScannerStrip() {
  const state = useChainStatus();

  const online = state.status === "live";

  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 backdrop-blur-md ${
        online || state.status === "loading"
          ? "border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02]"
          : "border-exposed/30 bg-exposed/10"
      }`}
    >
      <span className="font-mono text-[11px] text-white/70">
        {online
          ? `[✓] SCANNER ONLINE · TIP ${formatHeight(state.chain.height)}`
          : state.status === "loading"
            ? "[…] REACHING MAINNET"
            : "[!] CHAIN TIP UNREACHABLE"}
      </span>
      <span
        className={`font-mono text-[10px] uppercase tracking-widest ${
          online ? "text-accent" : state.status === "loading" ? "text-faint" : "text-exposed"
        }`}
      >
        {online ? "Live" : state.status === "loading" ? "…" : "Offline"}
      </span>
    </div>
  );
}
