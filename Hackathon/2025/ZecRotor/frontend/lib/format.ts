/**
 * Formatting utilities for money, addresses, and links
 */

import type { Chain } from "@/types/job"

/**
 * Format amount as currency with symbol
 */
export function formatMoney(amount: number, asset: string): string {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })} ${asset}`
}

/**
 * Shorten address for display
 */
export function shortAddress(address: string, startChars = 6, endChars = 4): string {
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerUrl(chain: Chain, txHash: string): string {
  const explorers: Record<string, string> = {
    ETH: `https://etherscan.io/tx/${txHash}`,
    NEAR: `https://nearblocks.io/txns/${txHash}`,
    ZCASH: `https://blockchair.com/zcash/transaction/${txHash}`,
  }
  return explorers[chain] || "#"
}

/**
 * Format chain name for display
 */
export function formatChain(chain: Chain): string {
  const names: Record<string, string> = {
    ETH: "Ethereum",
    NEAR: "NEAR Protocol",
    ZCASH: "Zcash",
  }
  return names[chain] || chain
}
