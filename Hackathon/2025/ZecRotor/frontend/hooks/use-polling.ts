/**
 * Custom hook for polling data at intervals
 */

"use client"

import * as React from "react"

interface UsePollingOptions<T> {
  enabled: boolean
  interval: number
  fn: () => Promise<T>
}

interface UsePollingResult<T> {
  data: T | null
  error: Error | null
  isPolling: boolean
  refresh: () => Promise<void>
}

export function usePolling<T>({ enabled, interval, fn }: UsePollingOptions<T>): UsePollingResult<T> {
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState<Error | null>(null)
  const [isPolling, setIsPolling] = React.useState(false)

  const refresh = React.useCallback(async () => {
    try {
      setError(null)
      const result = await fn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
    }
  }, [fn])

  React.useEffect(() => {
    if (!enabled) {
      setIsPolling(false)
      return
    }

    setIsPolling(true)
    refresh()

    const intervalId = setInterval(refresh, interval)

    return () => {
      clearInterval(intervalId)
      setIsPolling(false)
    }
  }, [enabled, interval, refresh])

  return { data, error, isPolling, refresh }
}
