import { cn } from "@/lib/utils"
import type { JobStatus } from "@/types/job"

interface StatusPillProps {
  status: JobStatus
  className?: string
}

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  running: {
    label: "Running",
    className: "bg-[var(--color-accent-mint)]/20 text-[var(--color-accent-mint)] border-[var(--color-accent-mint)]/30",
  },
  completed: {
    label: "Completed",
    className: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  failed: {
    label: "Failed",
    className: "bg-red-500/20 text-red-300 border-red-500/30",
  },
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-smooth",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
