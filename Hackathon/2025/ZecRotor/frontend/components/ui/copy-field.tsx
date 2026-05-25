/**
 * Read-only field with copy button
 */

"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface CopyFieldProps {
  label: string
  value: string
  className?: string
  monospace?: boolean
}

export function CopyField({ label, value, className, monospace = false }: CopyFieldProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={`copy-${label}`}>{label}</Label>
      <div className="flex gap-2">
        <Input id={`copy-${label}`} value={value} readOnly className={cn("flex-1", monospace && "font-mono text-xs")} />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
