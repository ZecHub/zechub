/**
 * POST /api/jobs - Create a new rotation job
 */

import { type NextRequest, NextResponse } from "next/server"
import type { CreateJobBody, CreateJobResponse } from "@/types/api"
import type { Job } from "@/types/job"

export async function POST(request: NextRequest) {
  try {
    const body: CreateJobBody = await request.json()

    // Validate required fields
    if (!body.sourceChain || !body.sourceAsset || !body.amount) {
      return NextResponse.json({ message: "Missing required source fields" }, { status: 400 })
    }

    if (!body.destinationChain || !body.destinationAsset || !body.destinationAddress) {
      return NextResponse.json({ message: "Missing required destination fields" }, { status: 400 })
    }

    if (!body.releaseAt) {
      return NextResponse.json({ message: "Missing release time" }, { status: 400 })
    }

    // Generate mock job
    const job: Job = {
      id: `job_${Math.random().toString(36).substring(2, 15)}`,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      sourceChain: body.sourceChain,
      sourceAsset: body.sourceAsset,
      amount: body.amount,
      shielded: false,
      destinationChain: body.destinationChain,
      destinationAsset: body.destinationAsset,
      destinationAddress: body.destinationAddress,
      releaseAt: body.releaseAt,
      depositAddress: `t1${Math.random().toString(36).substring(2, 35)}`, // Mock Zcash transparent address
      txs: {},
    }

    const response: CreateJobResponse = { job }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
