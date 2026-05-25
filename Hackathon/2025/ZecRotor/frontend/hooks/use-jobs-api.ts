/**
 * Custom hook for jobs API interactions
 */

"use client"

import { fetchJson } from "@/lib/api"
import type { CreateJobBody, CreateJobResponse, GetJobResponse } from "@/types/api"

export function useJobsApi() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000"

  const createJob = async (payload: CreateJobBody): Promise<CreateJobResponse> => {
    return fetchJson<CreateJobResponse>(`${apiBase}/api/jobs`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  const getJob = async (id: string): Promise<GetJobResponse> => {
    return fetchJson<GetJobResponse>(`${apiBase}/api/jobs/${id}`)
  }

  return { createJob, getJob }
}
