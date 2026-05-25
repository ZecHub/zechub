export const CHAINS = ["ETH", "NEAR", "ZCASH"] as const

export type Chain = (typeof CHAINS)[number]

export const ASSETS: Record<Chain, string[]> = {
  NEAR: ["NEAR"],
  ZCASH: ["ZEC"],
  ETH: []
}

// Optional: Explorer base URLs if you want to add “View in Explorer” links
export const EXPLORERS: Record<Chain, string> = {
  ETH: "https://etherscan.io/tx/",
  NEAR: "https://explorer.near.org/transactions/",
  ZCASH: "https://zcashblockexplorer.com/tx/",
}
