import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "@/components/EmptyState";
import { formatZec } from "@/lib/zcash";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

export function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={ArrowDownLeft}
        title="No transactions yet"
        description="Sends and receives for this vault will show up here."
      />
    );
  }

  return (
    <div className="divide-y divide-border rounded-md border border-border">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              tx.type === "receive" ? "bg-signal/10 text-signal" : "bg-secondary text-foreground",
            )}
          >
            {tx.type === "receive" ? (
              <ArrowDownLeft className="h-4 w-4" />
            ) : (
              <ArrowUpRight className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{tx.counterparty}</p>
            <p className="truncate font-mono text-xs text-muted-foreground">{tx.txid_placeholder}</p>
          </div>
          <div className="text-right">
            <p className={cn("text-sm font-medium", tx.type === "receive" ? "text-signal" : "text-foreground")}>
              {tx.type === "receive" ? "+" : "-"}
              {formatZec(tx.amount)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
