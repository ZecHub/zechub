"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThresholdDial } from "@/components/ThresholdDial";

const STEPS = [
  {
    dial: { total: 3, filled: 0 },
    title: "1. Key generation",
    body: "Every participant runs a real distributed key generation ceremony. No single device — not even this app's backend — ever computes or holds the full private key. Each person ends up with a distinct share; the group's public key is derived from commitments, never by combining shares.",
  },
  {
    dial: { total: 3, filled: 2, pending: false },
    title: "2. Threshold signing",
    body: "To authorize a send, any threshold-many participants — not a specific one — each produce a partial signature over the transaction. It doesn't matter which subset shows up, as long as there are enough of them.",
  },
  {
    dial: { total: 3, filled: 3 },
    title: "3. One real signature",
    body: "The partial signatures aggregate into a single Schnorr signature over Zcash's RedPallas curve — the exact scheme used for real Orchard spend authorization. Anyone can verify it; it's indistinguishable from a signature made by one key.",
  },
];

export function HowFrostWorksModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-muted-foreground"
        onClick={() => {
          setStep(0);
          setOpen(true);
        }}
      >
        <HelpCircle className="h-3.5 w-3.5" />
        How FROST works
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How threshold signatures work</DialogTitle>
            <DialogDescription>What this app actually runs, in three steps.</DialogDescription>
          </DialogHeader>

          <div
            key={step}
            className="flex flex-col items-center gap-4 py-2 text-center animate-in fade-in slide-in-from-right-3 duration-300"
          >
            <ThresholdDial {...STEPS[step].dial} size={88} />
            <div className="space-y-2">
              <p className="font-heading text-sm font-medium">{STEPS[step].title}</p>
              <p className="text-sm text-muted-foreground">{STEPS[step].body}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setStep(i)}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === step ? "bg-signal" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <Button size="sm" variant="outline" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button size="sm" onClick={() => setOpen(false)}>
                  Done
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
