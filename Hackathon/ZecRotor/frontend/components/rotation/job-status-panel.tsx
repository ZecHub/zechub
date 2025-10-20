/**
 * Display job metadata and current status
 */

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/ui/status-pill"
import { formatDate, formatRelative } from "@/lib/time"
import { formatChain, formatMoney } from "@/lib/format"
import type { Job, JobStatus } from "@/types/job"
import { ArrowRight, Calendar, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Helper to read either camelCase (UI) or snake_case (backend) shapes
function read<T = any>(obj: any, ...keys: string[]): T | undefined {
  for (const k of keys) if (obj?.[k] !== undefined) return obj[k]
  return undefined
}

// Map raw/backend status strings to the strict JobStatus union
function toJobStatus(value: any): JobStatus {
  const v = String(value ?? "").toLowerCase()
  if (v === "scheduled" || v === "pending" || v === "created" || v === "queued") return "scheduled"
  if (v === "running" || v === "processing" || v === "in_progress") return "running"
  if (v === "completed" || v === "success" || v === "succeeded" || v === "done") return "completed"
  if (v === "failed" || v === "error") return "failed"
  // default fallback
  return "scheduled"
}

interface JobStatusPanelProps {
  job: Job
}

export function JobStatusPanel({ job }: JobStatusPanelProps) {
  // Normalize fields so this component works with both UI-normalized jobs and raw backend jobs
  const uiStatus: JobStatus = toJobStatus(read(job, "status"))
  const jobId = read<string>(job, "id", "job_id") ?? ""

  const createdAtIso =
    read<string>(job, "createdAt") ??
    (typeof read<number>(job, "createdAtEpoch", "created_at_epoch") === "number"
      ? new Date(read<number>(job, "createdAtEpoch", "created_at_epoch")! * 1000).toISOString()
      : undefined)

  const releaseAtIso =
    read<string>(job, "releaseAt") ??
    (typeof read<number>(job, "executeAtEpoch", "execute_at_epoch") === "number"
      ? new Date(read<number>(job, "executeAtEpoch", "execute_at_epoch")! * 1000).toISOString()
      : undefined)

  const sourceChain = read<string>(job, "sourceChain") ?? "—"
  const sourceAsset = read<string>(job, "sourceAsset", "sending_token") ?? "—"
  const destinationChain = read<string>(job, "destinationChain") ?? "—"
  const destinationAsset = read<string>(job, "destinationAsset") ?? "—"

  const createdDisplay = createdAtIso ? formatDate(createdAtIso) : "—"
  const releaseDisplay = releaseAtIso
    ? `${formatDate(releaseAtIso)} (${formatRelative(releaseAtIso)})`
    : "—"

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {/* Status & Job ID */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-muted-foreground)]">Status</p>
            <div className="mt-1">
              <StatusPill status={uiStatus} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--color-muted-foreground)]">Job ID</p>
            <p className="mt-1 font-mono text-xs text-[var(--color-foreground)]">{jobId}</p>
          </div>
        </div>

        {/* Amount */}
        {((job as any).amount ?? null) !== null && (job as any).amount !== undefined && (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-4 text-center">
            <p className="text-sm text-[var(--color-muted-foreground)]">Amount</p>
            <p className="mt-1 text-xl font-semibold text-[var(--color-foreground)]">
              {formatMoney((job as any).amount, sourceAsset)}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-4">
          <TimelineRow
            icon={<Calendar className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
            label="Created"
            value={createdDisplay}
          />
          <TimelineRow
            icon={<Clock className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
            label="Release At"
            value={releaseDisplay}
          />
          {uiStatus === "completed" && (
            <TimelineRow
              icon={<Clock className="h-4 w-4 text-[var(--color-accent-mint)]" />}
              label="Completed"
              value={releaseAtIso ? formatDate(releaseAtIso) : "—"}
            />
          )}
          {uiStatus === "failed" && (
            <TimelineRow
              icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
              label="Failed"
              value="An error occurred during rotation"
            />
          )}
        </div>

        {/* Route Summary */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Route
          </p>
          <div className="flex items-center justify-center gap-3">
            <ChainBadge chain={sourceChain} asset={sourceAsset} />
            <ArrowRight className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="border-[var(--color-zcash-gold)] text-[var(--color-zcash-gold)]">
                Zcash
              </Badge>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Shielded</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            <ChainBadge chain={destinationChain} asset={destinationAsset} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* Timeline Row */
function TimelineRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--color-foreground)]">{label}</p>
        <p className="text-xs text-[var(--color-muted-foreground)]">{value}</p>
      </div>
    </div>
  )
}

/* Chain Badge */
function ChainBadge({ chain, asset }: { chain: string; asset: string }) {
  return (
    <div className="flex flex-col items-center">
      <Badge variant="secondary" className="text-[var(--color-foreground)]">
        {formatChain(chain)}
      </Badge>
      <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{asset}</p>
    </div>
  )
}
