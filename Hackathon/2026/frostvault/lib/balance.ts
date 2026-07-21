import type { Transaction } from "@/types";

export function computeBalance(transactions: Transaction[]): number {
  return transactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount) || 0;
    return tx.type === "receive" ? sum + amount : sum - amount;
  }, 0);
}
