/**
 * Core job and blockchain types for ZecRotor
 */

export type JobStatus = "scheduled" | "running" | "completed" | "failed"
export type Chain = "ETH" | "NEAR" | "ZCASH" | string
export type Asset = "USDC" | "NEAR" | "ZEC" | string

export interface JobTxRef {
  hash: string | null
  explorerUrl: string | null
}

export interface Job {
  id: string
  status: JobStatus
  createdAt: string // ISO
  sourceChain: Chain
  sourceAsset: Asset
  amount?: number
  shielded?: boolean
  destinationChain: Chain
  destinationAsset: Asset
  destinationAddress: string
  releaseAt: string // ISO
  depositAddress?: string
  txs?: {
    deposit?: JobTxRef
    shield?: JobTxRef
    release?: JobTxRef
  }
}
