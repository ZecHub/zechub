/**
 * API request/response types
 */

import type { Chain, Asset, Job } from "./job"

export interface CreateJobBody {
  sourceChain: Chain
  sourceAsset: Asset
  amount: number
  senderAddress: string
  destinationChain: Chain
  destinationAsset: Asset
  destinationAddress: string
  releaseAt: string
  notes?: string
}

export interface CreateJobResponse {
  job: Job
}

export interface GetJobResponse {
  job: Job
}
