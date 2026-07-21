"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, ShieldQuestion } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ThresholdDial } from "@/components/ThresholdDial";
import { HexBlock } from "@/components/HexBlock";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SendModal } from "@/components/SendModal";
import { ReceiveModal } from "@/components/ReceiveModal";
import { getVault, listTransactions } from "@/lib/api/vaults";
import { computeBalance } from "@/lib/balance";
import { formatZec } from "@/lib/zcash";
import type { Transaction, Vault } from "@/types";

export default function VaultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [vault, setVault] = useState<Vault | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [v, txs] = await Promise.all([getVault(id), listTransactions(id)]);
      setVault(v);
      setTransactions(txs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load vault");
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!vault) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-64 rounded-md" />
      </div>
    );
  }

  const balance = computeBalance(transactions);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <ThresholdDial total={vault.total_participants} filled={vault.threshold} size={56} />
          <div>
            <h1 className="font-heading text-2xl font-semibold">{vault.name}</h1>
            <p className="text-sm text-muted-foreground">
              threshold {vault.threshold}-of-{vault.total_participants}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setReceiveOpen(true)}>
            <ArrowDownLeft className="h-4 w-4" />
            Receive
          </Button>
          <Button onClick={() => setSendOpen(true)} disabled={vault.status !== "ready"}>
            <ArrowUpRight className="h-4 w-4" />
            Send
          </Button>
          {vault.status === "ready" ? (
            <Link href={`/vault/${vault.id}/recovery`} className={buttonVariants({ variant: "outline" })}>
              <ShieldQuestion className="h-4 w-4" />
              Recovery
            </Link>
          ) : (
            <Button variant="outline" disabled>
              <ShieldQuestion className="h-4 w-4" />
              Recovery
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">balance</p>
          <p className="font-heading text-2xl font-semibold">{formatZec(balance)} ZEC</p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="mb-1 text-xs text-muted-foreground">group public key (real)</p>
          {vault.group_public_key_hex ? (
            <HexBlock value={vault.group_public_key_hex} />
          ) : (
            <Badge variant="outline" className="border-pending/40 text-pending">
              generating…
            </Badge>
          )}
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="mb-2 text-xs text-muted-foreground">participants</p>
          <div className="flex flex-wrap gap-2">
            {vault.participants.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[9px]">{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-heading text-lg font-medium">Transaction history</h2>
        <TransactionHistory transactions={transactions} />
      </div>

      <SendModal
        open={sendOpen}
        onOpenChange={setSendOpen}
        vaultId={vault.id}
        participants={vault.participants}
        balance={balance}
        onSent={() => {
          refresh();
          setTimeout(() => setSendOpen(false), 1500);
        }}
      />
      <ReceiveModal
        open={receiveOpen}
        onOpenChange={setReceiveOpen}
        vaultId={vault.id}
        onReceived={refresh}
      />
    </div>
  );
}
