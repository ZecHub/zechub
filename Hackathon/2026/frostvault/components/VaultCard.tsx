"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThresholdDial } from "@/components/ThresholdDial";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { listTransactions } from "@/lib/api/vaults";
import { computeBalance } from "@/lib/balance";
import { formatZec } from "@/lib/zcash";
import type { Vault } from "@/types";

export function VaultCard({ vault }: { vault: Vault }) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (vault.status !== "ready") return;
    let cancelled = false;
    listTransactions(vault.id)
      .then((txs) => {
        if (!cancelled) setBalance(computeBalance(txs));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [vault.id, vault.status]);

  return (
    <Link
      href={`/vault/${vault.id}`}
      className="block rounded-md border border-border bg-card p-5 transition-colors hover:border-signal/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ThresholdDial total={vault.total_participants} filled={vault.threshold} size={44} />
          <div>
            <p className="font-heading text-base font-medium">{vault.name}</p>
            <p className="text-xs text-muted-foreground">
              threshold {vault.threshold}-of-{vault.total_participants}
            </p>
          </div>
        </div>
        {vault.status !== "ready" && (
          <Badge
            variant="outline"
            className={
              vault.status === "generating"
                ? "border-pending/40 text-pending"
                : "border-destructive/40 text-destructive"
            }
          >
            {vault.status === "generating" ? "generating keys" : "failed"}
          </Badge>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground">balance</p>
        <p className="font-heading text-2xl font-semibold">
          {balance === null ? "—" : formatZec(balance)} <span className="text-sm font-normal text-muted-foreground">ZEC</span>
        </p>
      </div>

      <div className="mt-4 flex -space-x-2">
        {vault.participants.map((p) => (
          <Avatar key={p.id} className="h-7 w-7 border-2 border-card">
            <AvatarFallback className="bg-secondary text-[10px]">
              {p.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Link>
  );
}
