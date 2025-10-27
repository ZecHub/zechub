/**
 * Search form for looking up jobs by ID
 */

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Clipboard, Loader2, History } from "lucide-react"

interface JobSearchProps {
  onSearch: (jobId: string) => Promise<void> | void
  initialJobId?: string
}

export function JobSearch({ onSearch, initialJobId = "" }: JobSearchProps) {
  const [jobId, setJobId] = React.useState(initialJobId)
  const [loading, setLoading] = React.useState(false)
  const [history, setHistory] = React.useState<string[]>([])

  // Load history from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("zecrotor:job-history")
    if (stored) setHistory(JSON.parse(stored))
  }, [])

  // Save history
  const saveHistory = (id: string) => {
    const next = [id, ...history.filter((h) => h !== id)].slice(0, 3)
    setHistory(next)
    localStorage.setItem("zecrotor:job-history", JSON.stringify(next))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobId.trim()) return
    setLoading(true)
    try {
      await onSearch(jobId.trim())
      saveHistory(jobId.trim())
    } finally {
      setLoading(false)
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setJobId(text.trim())
    } catch {
      // ignore if clipboard not available
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="jobId">Job ID</Label>
        <div className="flex gap-2">
          <Input
            id="jobId"
            placeholder="Enter your Job ID..."
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="flex-1 font-mono text-sm"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={pasteFromClipboard}
            aria-label="Paste from clipboard"
          >
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button type="submit" disabled={!jobId.trim() || loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">{loading ? "Searching..." : "Search"}</span>
          </Button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-3">
          <div className="mb-2 flex items-center gap-1 text-xs font-medium text-[var(--color-muted-foreground)]">
            <History className="h-3 w-3" /> Recent Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((id) => (
              <Button
                key={id}
                type="button"
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                onClick={() => {
                  setJobId(id)
                  onSearch(id)
                }}
              >
                {id.slice(0, 6)}...{id.slice(-4)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </form>
  )
}
