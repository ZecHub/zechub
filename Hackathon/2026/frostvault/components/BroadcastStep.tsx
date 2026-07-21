"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { HexBlock } from "@/components/HexBlock";
import { listTransactions } from "@/lib/api/vaults";
import type { Transaction } from "@/types";

// The signature that authorizes this send is real (see SigningProgress).
// Constructing and broadcasting an actual shielded transaction with it is
// out of scope -- no wallet has shipped that yet (see README). This step
// animates a believable "broadcast" and then reveals the real
// txid_placeholder already generated server-side for this ceremony,
// labeled clearly as simulated rather than presented as a real network
// confirmation.

export function BroadcastStep({
  vaultId,
  ceremonyId,
  onDone,
}: {
  vaultId: string;
  ceremonyId: string;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [tx, setTx] = useState<Transaction | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const durationMs = 1500;

    const tick = () => {
      if (cancelled) return;
      const pct = Math.min(100, ((Date.now() - start) / durationMs) * 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        listTransactions(vaultId).then((txs) => {
          if (cancelled) return;
          const match = txs.find((t) => t.ceremony_id === ceremonyId) ?? null;
          setTx(match);
          if (!firedRef.current) {
            firedRef.current = true;
            onDone();
          }
        });
      }
    };
    requestAnimationFrame(tick);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultId, ceremonyId]);

  return (
    <div className="space-y-3 rounded-md border border-border bg-card p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {progress < 100 ? "Broadcasting to Zcash network…" : "Broadcast complete"}
        </span>
        <span className="rounded-sm bg-pending/10 px-1.5 py-0.5 font-mono text-pending">demo mode</span>
      </div>
      <Progress value={progress} className="h-1.5" />
      {tx && (
        <div className="space-y-1.5 pt-1">
          <p className="flex items-center gap-1.5 text-sm text-signal">
            <CheckCircle2 className="h-4 w-4" />
            Confirmed (simulated)
          </p>
          <HexBlock value={tx.txid_placeholder} />
        </div>
      )}
    </div>
  );
}
