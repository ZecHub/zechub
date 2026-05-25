/**
 * GET /api/jobs/:id - Get job by ID
 */

import { type NextRequest, NextResponse } from "next/server"
import type { GetJobResponse } from "@/types/api"
import type { Job } from "@/types/job"

// Mock job storage (in production, this would be a database)
const mockJobs = new Map<string, Job>()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Check mock storage first
    let job = mockJobs.get(id)

    // If not found, generate a mock job for demo purposes
    if (!job) {
      job = {
        id,
        status: "running",
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        sourceChain: "ETH",
        sourceAsset: "USDC",
        amount: 100,
        shielded: true,
        destinationChain: "NEAR",
        destinationAsset: "NEAR",
        destinationAddress: "example.near",
        releaseAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        depositAddress: `t1${Math.random().toString(36).substring(2, 35)}`,
        txs: {
          deposit: {
            hash: "0x" + Math.random().toString(16).substring(2, 66),
            explorerUrl: "https://etherscan.io/tx/0x123",
          },
          shield: {
            hash: Math.random().toString(16).substring(2, 66),
            explorerUrl: "https://blockchair.com/zcash/transaction/abc",
          },
        },
      }
      mockJobs.set(id, job)
    }

    const response: GetJobResponse = { job }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
