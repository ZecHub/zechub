"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HexBlock } from "@/components/HexBlock";
import { StepLabel } from "@/components/StepLabel";
import { SigningProgress } from "@/components/SigningProgress";
import { BroadcastStep } from "@/components/BroadcastStep";
import { startSend } from "@/lib/api/ceremonies";
import {
  isZcashName,
  resolveZcashName,
  REAL_ZNS_EXAMPLES,
  type ResolveResult,
} from "@/lib/zcashnames";
import { validateSendAmount } from "@/lib/zcash";
import type { Ceremony, Participant } from "@/types";

export function SendModal({
  open,
  onOpenChange,
  vaultId,
  participants,
  balance,
  onSent,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaultId: string;
  participants: Participant[];
  balance: number;
  onSent: () => void;
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState<ResolveResult | null>(null);
  const [ceremonyId, setCeremonyId] = useState<string | null>(null);
  const [ceremony, setCeremony] = useState<Ceremony | null>(null);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setRecipient("");
    setAmount("");
    setResolved(null);
    setCeremonyId(null);
    setCeremony(null);
    setError(null);
  }

  async function handleRecipientBlur() {
    const trimmed = recipient.trim();
    if (!isZcashName(trimmed) || resolving) return;
    setResolving(true);
    setError(null);
    const result = await resolveZcashName(trimmed);
    setResolving(false);
    setResolved(result);
    if (!result.success) setError(result.error ?? "Could not resolve name");
  }

  async function handleSend() {
    setError(null);
    const amountCheck = validateSendAmount(amount, balance);
    if (!amountCheck.valid) {
      setError(amountCheck.error ?? "Invalid amount");
      return;
    }

    const trimmed = recipient.trim();
    let finalRecipient = trimmed;

    if (isZcashName(trimmed)) {
      let result = resolved;
      if (!result) {
        setResolving(true);
        result = await resolveZcashName(trimmed);
        setResolving(false);
        setResolved(result);
      }
      if (!result.success || !result.address) {
        setError(result.error ?? "Could not resolve name");
        return;
      }
      finalRecipient = result.address;
    }

    try {
      const id = await startSend(vaultId, finalRecipient, amount);
      setCeremonyId(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start signing ceremony");
    }
  }

  function handleComplete(c: Ceremony) {
    setCeremony(c);
    if (c.phase === "failed") {
      toast.error(c.error ?? "Signing ceremony failed");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send shielded ZEC</DialogTitle>
          <DialogDescription>
            Authorized by a real threshold signature from this vault&apos;s participants.
          </DialogDescription>
        </DialogHeader>

        {!ceremonyId ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <StepLabel number={1} title="Recipient" />
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setResolved(null);
                }}
                onBlur={handleRecipientBlur}
                placeholder="testclaim.zcash or zs1…"
                className="[.demo-mode_&]:h-11 [.demo-mode_&]:text-base"
              />
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                Try {REAL_ZNS_EXAMPLES.join(" or ")} — real names registered on ZNS testnet.
              </p>
              {resolving && <p className="text-xs text-pending">Resolving on ZNS testnet…</p>}
              {resolved?.success && resolved.address && (
                <div className="space-y-1">
                  <p
                    className={
                      "flex items-center gap-1 text-xs " +
                      (resolved.source === "zns-testnet" ? "text-signal" : "text-muted-foreground")
                    }
                  >
                    <BadgeCheck className="h-3 w-3" />
                    {resolved.source === "zns-testnet"
                      ? "Resolved on real ZNS testnet"
                      : "Resolved via demo fallback list (not a real ZNS lookup)"}
                  </p>
                  <HexBlock value={resolved.address} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <StepLabel number={2} title="Amount (ZEC)" />
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                inputMode="decimal"
                className="[.demo-mode_&]:h-11 [.demo-mode_&]:text-base"
              />
              <p className="text-xs text-muted-foreground [.demo-mode_&]:text-sm">Balance: {balance.toFixed(4)} ZEC</p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div>
              <StepLabel number={3} title="Sign & send" />
              <Button onClick={handleSend} disabled={resolving} className="w-full [.demo-mode_&]:h-12 [.demo-mode_&]:text-base">
                {resolving ? "Resolving name…" : "Sign and send"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <SigningProgress ceremonyId={ceremonyId} participants={participants} onComplete={handleComplete} />
            {ceremony?.phase === "complete" && ceremony.verified && (
              <BroadcastStep
                vaultId={vaultId}
                ceremonyId={ceremonyId}
                onDone={() => {
                  toast.success(`Sent ${amount} ZEC — real threshold signature verified.`);
                  onSent();
                }}
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
