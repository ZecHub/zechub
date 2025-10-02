/**
 * Form for creating a new rotation request with stepper UX
 */

"use client"

import * as React from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useJobsApi } from "@/hooks/use-jobs-api"
import { toIsoLocal } from "@/lib/time"
import type { Job } from "@/types/job"
import { Loader2, Info } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ASSETS, CHAINS } from "@/config/chains"

interface CreateRotationFormProps {
  onSuccess: (job: Job) => void
}

const schema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  destinationAddress: z.string().min(3, "Enter a valid address"),
  releaseAt: z.string().refine(
    (date) => new Date(date).getTime() > Date.now(),
    "Release time must be in the future"
  ),
})

export function CreateRotationForm({ onSuccess }: CreateRotationFormProps) {
  const { createJob, getJob } = useJobsApi()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [error, setError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({})

  const [formData, setFormData] = React.useState({
    sourceChain: "NEAR",
    sourceAsset: "NEAR",
    amount: "",
    senderAddress: "",
    destinationChain: "ZCASH",
    destinationAsset: "ZEC",
    destinationAddress: "",
    releaseAt: toIsoLocal(new Date(Date.now() + 3600000)), // 1 hour from now
    notes: "",
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    const parsed = schema.safeParse({
      amount: Number(formData.amount),
      destinationAddress: formData.destinationAddress,
      releaseAt: formData.releaseAt,
    })

    if (!parsed.success) {
      const errs: Record<string, string> = {}
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message
      })
      setFieldErrors(errs)
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        sourceChain: formData.sourceChain,
        sourceAsset: formData.sourceAsset,
        amount: Number(formData.amount),
        senderAddress: formData.senderAddress,
        destinationChain: formData.destinationChain,
        destinationAsset: formData.destinationAsset,
        destinationAddress: formData.destinationAddress,
        releaseAt: new Date(formData.releaseAt).toISOString(),
        // ADD: epoch seconds for backend's execute_at_epoch
        execute_at_epoch: Math.floor(new Date(formData.releaseAt).getTime() / 1000),
        notes: formData.notes || undefined,
      }

      const response = await createJob(payload) // expects { job_id, deposit_address, execute_at_epoch, status }
      const fullJob = await getJob(response.job_id) // fetch full job object

      toast({ title: "Job Created", description: "Save your Job ID to track the rotation." })
      onSuccess(fullJob)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create rotation")
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Rotation</CardTitle>
        <CardDescription>Schedule a private asset rotation through Zcash's shielded pool</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 rounded-lg border p-4">
              <h4 className="text-sm font-semibold">Step 1: Source</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sourceChain">Chain</Label>
                  <Select value={formData.sourceChain} onValueChange={(val) => updateField("sourceChain", val)}>
                    <SelectTrigger id="sourceChain">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CHAINS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceAsset">Asset</Label>
                  <Select value={formData.sourceAsset} onValueChange={(val) => updateField("sourceAsset", val)}>
                    <SelectTrigger id="sourceAsset">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSETS[formData.sourceChain].map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.0001"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                  aria-invalid={!!fieldErrors.amount}
                />
                {fieldErrors.amount && <p className="text-sm text-red-400">{fieldErrors.amount}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderAddress">Sender Address</Label>
                <Input
                  id="senderAddress"
                  placeholder="Your wallet address"
                  value={formData.senderAddress || ""}
                  onChange={(e) => updateField("senderAddress", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 rounded-lg border p-4">
              <h4 className="text-sm font-semibold">Step 2: Destination</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="destinationChain">Chain</Label>
                  <Select value={formData.destinationChain} onValueChange={(val) => updateField("destinationChain", val)}>
                    <SelectTrigger id="destinationChain">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CHAINS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationAsset">Asset</Label>
                  <Select
                    value={formData.destinationAsset}
                    onValueChange={(val) => updateField("destinationAsset", val)}
                  >
                    <SelectTrigger id="destinationAsset">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSETS[formData.destinationChain].map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationAddress">
                  Address{" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="inline h-3 w-3 text-[var(--color-zcash-gold)]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter a valid address for the destination chain (e.g. 0x… or account.near).
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="destinationAddress"
                  placeholder="0x... or account.near"
                  value={formData.destinationAddress}
                  onChange={(e) => updateField("destinationAddress", e.target.value)}
                  aria-invalid={!!fieldErrors.destinationAddress}
                />
                {fieldErrors.destinationAddress && <p className="text-sm text-red-400">{fieldErrors.destinationAddress}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 rounded-lg border p-4">
              <h4 className="text-sm font-semibold">Step 3: Schedule</h4>
              <div className="space-y-2">
                <Label htmlFor="releaseAt">Release At</Label>
                <Input
                  id="releaseAt"
                  type="datetime-local"
                  value={formData.releaseAt}
                  onChange={(e) => updateField("releaseAt", e.target.value)}
                  aria-invalid={!!fieldErrors.releaseAt}
                />
                {fieldErrors.releaseAt && <p className="text-sm text-red-400">{fieldErrors.releaseAt}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes..."
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {error && <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}

          <div className="flex items-center justify-between">
            {step > 1 && (
              <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            )}
            {step === 3 && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Rotation"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
