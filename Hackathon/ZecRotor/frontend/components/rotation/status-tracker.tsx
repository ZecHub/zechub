/**
 * 3-step progress tracker with transaction links and timestamps
 */

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"
import { CheckCircle2, Circle, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/time"

interface StatusTrackerProps {
  job: Job
}

interface Step {
  id: "deposit" | "shield" | "release"
  label: string
  description: string
  txKey?: "deposit" | "shield" | "release"
}

const steps: Step[] = [
  {
    id: "deposit",
    label: "Deposit Received",
    description: "Waiting for deposit confirmation",
    txKey: "deposit",
  },
  {
    id: "shield",
    label: "Shielded on Zcash",
    description: "Funds moved into shielded pool",
    txKey: "shield",
  },
  {
    id: "release",
    label: "Released to Destination",
    description: "Funds sent to destination address",
    txKey: "release",
  },
]

export function StatusTracker({ job }: StatusTrackerProps) {
  const getStepStatus = (stepId: string): "complete" | "current" | "pending" => {
    if (job.status === "failed") return "pending"
    const hasDeposit = !!job.txs?.deposit?.hash
    const hasShield = !!job.txs?.shield?.hash
    const hasRelease = !!job.txs?.release?.hash

    if (stepId === "deposit") return hasDeposit ? "complete" : "current"
    if (stepId === "shield") {
      if (!hasDeposit) return "pending"
      return hasShield ? "complete" : "current"
    }
    if (stepId === "release") {
      if (!hasShield) return "pending"
      return hasRelease ? "complete" : "current"
    }
    return "pending"
  }

  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id)
        const tx = step.txKey ? job.txs?.[step.txKey] : null
        const isLast = index === steps.length - 1

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-4"
          >
            {/* Icon + connector */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-sm transition-colors",
                  status === "complete" &&
                    "border-[var(--color-accent-mint)] bg-[var(--color-accent-mint)]/20 text-[var(--color-accent-mint)]",
                  status === "current" &&
                    "border-[var(--color-zcash-gold)] bg-[var(--color-zcash-gold)]/20 text-[var(--color-zcash-gold)] ring-2 ring-[var(--color-zcash-gold)]/40",
                  status === "pending" &&
                    "border-[var(--color-border)] bg-transparent text-[var(--color-muted-foreground)]"
                )}
              >
                {status === "complete" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mt-1 h-12 w-0.5",
                    status === "complete"
                      ? "bg-[var(--color-accent-mint)]/40"
                      : "bg-[var(--color-border)]"
                  )}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      status === "complete" && "text-[var(--color-foreground)]",
                      status === "current" && "text-[var(--color-zcash-gold)]",
                      status === "pending" && "text-[var(--color-muted-foreground)]"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{step.description}</p>
                </div>

                {tx?.explorerUrl && (
                  <a
                    href={tx.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[var(--color-zcash-gold)] transition hover:text-[#E5A820]"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Tx hash & timestamp */}
              {tx?.hash && (
                <p className="mt-1 font-mono text-xs text-[var(--color-muted-foreground)]">
                  {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                </p>
              )}
              {tx?.hash && (
                <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                  {formatDate(job.createdAt)}
                </p>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
