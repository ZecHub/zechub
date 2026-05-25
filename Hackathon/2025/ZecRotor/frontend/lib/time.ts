/**
 * Time formatting and manipulation utilities
 */

/**
 * Convert Date to ISO string for datetime-local input
 */
export function toIsoLocal(date: Date): string {
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60 * 1000)
  return localDate.toISOString().slice(0, 16)
}

/**
 * Parse ISO string to Date
 */
export function fromIso(isoString: string): Date {
  return new Date(isoString)
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Format relative time (e.g., "in 2 hours", "3 days ago")
 */
export function formatRelative(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  const diffSec = Math.abs(Math.floor(diffMs / 1000))
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  const isPast = diffMs < 0
  const prefix = isPast ? "" : "in "
  const suffix = isPast ? " ago" : ""

  if (diffSec < 60) return `${prefix}${diffSec}s${suffix}`
  if (diffMin < 60) return `${prefix}${diffMin}m${suffix}`
  if (diffHour < 24) return `${prefix}${diffHour}h${suffix}`
  return `${prefix}${diffDay}d${suffix}`
}
