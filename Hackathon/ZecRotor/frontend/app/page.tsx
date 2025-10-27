/**
 * Main page with hero, create rotation, and status tracking
 */

"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CreateRotationForm } from "@/components/rotation/create-rotation-form"
import { DepositDetails } from "@/components/rotation/deposit-details"
import { JobSearch } from "@/components/rotation/job-search"
import { JobStatusPanel } from "@/components/rotation/job-status-panel"
import { StatusTracker } from "@/components/rotation/status-tracker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useJobsApi } from "@/hooks/use-jobs-api"
import { usePolling } from "@/hooks/use-polling"
import type { Job } from "@/types/job"
import { ArrowRight, RefreshCw, Shield } from "lucide-react"

export default function HomePage() {
  const searchParams = useSearchParams()
  const { getJob } = useJobsApi()

  const [createdJob, setCreatedJob] = React.useState<Job | null>(null)
  const [searchedJobId, setSearchedJobId] = React.useState<string | null>(null)
  const [searchedJob, setSearchedJob] = React.useState<Job | null>(null)
  const [searchError, setSearchError] = React.useState<string | null>(null)

  // Auto-load job from URL parameter
  React.useEffect(() => {
    const jobId = searchParams.get("jobId")
    if (jobId) {
      setSearchedJobId(jobId)
      handleJobSearch(jobId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleJobSearch = async (jobId: string) => {
    setSearchError(null)
    setSearchedJobId(jobId)
    try {
      const response = await getJob(jobId) // backend returns the job object directly
      const job = normalizeJob(response)
      setSearchedJob(job)
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : "Failed to load job")
      setSearchedJob(null)
    }
  }


  const handleTrackStatus = (jobId: string) => {
    const statusSection = document.getElementById("status-section")
    statusSection?.scrollIntoView({ behavior: "smooth" })
    handleJobSearch(jobId)
  }

  function normalizeJob(j: any): Job {
    return {
      id: j.job_id,
      senderAddress: j.sender_address,
      sourceAsset: j.sending_token,
      destinationAddress: j.destination_address,
      destinationAsset: j.destination_token,
      executeAtEpoch: j.execute_at_epoch,
      depositAddress: j.deposit_address,
      status: String(j.status).toUpperCase(),
      events: j.events,
      createdAtEpoch: j.created_at_epoch,
      updatedAtEpoch: j.updated_at_epoch,
    } as unknown as Job;
  }

  // Poll while job is not terminal
  const shouldPoll =
    searchedJob && !["COMPLETED", "FAILED"].includes(searchedJob.status);

  const { refresh: refreshJob, isPolling } = usePolling({
    enabled: !!shouldPoll,
    interval: 10000,
    fn: async () => {
      if (searchedJobId) {
        const response = await getJob(searchedJobId) // direct job object
        const job = normalizeJob(response)
        setSearchedJob(job)
        return job
      }
      return null
    },
  })


  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Co-brand pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-muted)]/50 px-4 py-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-zcash-gold)]" />
              <span className="text-[var(--color-foreground)] font-medium">Zcash</span>
            </span>
            <span className="text-[var(--color-muted-foreground)]">×</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-mint)]" />
              <span className="text-[var(--color-foreground)] font-medium">NEAR Shade Agents</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-[var(--color-snow)] sm:text-5xl md:text-6xl">
            Private, scheduled rotations via{" "}
            <span className="text-[var(--color-zcash-gold)]">Zcash</span>{" "}
            with <span className="text-[var(--color-accent-mint)]">NEAR Shade Agents</span>
          </h1>

          <p className="text-pretty text-lg text-[var(--color-muted-foreground)] sm:text-xl">
            Shield in Zcash’s private pool; orchestrate timing and delivery via NEAR Shade Agents.
            Swap in, shield, schedule, unshield, and deliver — together, on time, on-chain.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => {
                const createSection = document.getElementById("create-section")
                createSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Create Rotation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const statusSection = document.getElementById("status-section")
                statusSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Track Status
            </Button>
          </div>

          {/* Optional micro-note under hero */}
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Engineered with Zcash privacy primitives and NEAR’s Shade Agents for automated, verifiable execution.
          </p>
        </div>
      </motion.section>


      {/* Main Content */}
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        {/* Left Column - Create Rotation */}
        <section id="create-section" className="space-y-6">
          {createdJob ? (
            <DepositDetails job={createdJob} onTrackStatus={handleTrackStatus} />
          ) : (
            <CreateRotationForm onSuccess={setCreatedJob} />
          )}
          {createdJob && (
            <Button
              variant="outline"
              onClick={() => setCreatedJob(null)}
              className="w-full"
            >
              Create Another Rotation
            </Button>
          )}
        </section>

        {/* Right Column - Check Status */}
        <section id="status-section" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Check Status</CardTitle>
              <CardDescription>Track your rotation progress by Job ID</CardDescription>
            </CardHeader>
            <CardContent>
              <JobSearch
                onSearch={handleJobSearch}
                initialJobId={searchedJobId || ""}
              />
            </CardContent>
          </Card>

          {searchError && (
            <div
              className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
              role="alert"
            >
              {searchError}
            </div>
          )}

          {searchedJob && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Job Details
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refreshJob()}
                  disabled={isPolling}
                  aria-label="Refresh job status"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isPolling ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              <JobStatusPanel job={searchedJob} />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusTracker job={searchedJob} />
                </CardContent>
              </Card>

              {isPolling && (
                <p
                  className="text-center text-xs text-[var(--color-muted-foreground)]"
                  aria-live="polite"
                >
                  Auto-refreshing every 10 seconds…
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
