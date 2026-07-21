"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SigningProgress } from "@/components/SigningProgress";
import { HexBlock } from "@/components/HexBlock";
import { StepLabel } from "@/components/StepLabel";
import { getVault } from "@/lib/api/vaults";
import { startRecovery } from "@/lib/api/ceremonies";
import { cn } from "@/lib/utils";
import type { Ceremony, Vault } from "@/types";

export default function RecoveryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [vault, setVault] = useState<Vault | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [ceremonyId, setCeremonyId] = useState<string | null>(null);
  const [completedCeremony, setCompletedCeremony] = useState<Ceremony | null>(null);
  const [error, setError] = useState<string | null>(null);
  const celebratedRef = useRef(false);

  useEffect(() => {
    getVault(id)
      .then(setVault)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!vault) return <Skeleton className="h-64 rounded-md" />;

  function toggle(pid: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(pid)) next.delete(pid);
      else next.add(pid);
      return next;
    });
  }

  async function handleStart() {
    if (!vault) return;
    try {
      const cid = await startRecovery(vault.id, Array.from(selected));
      setCeremonyId(cid);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start recovery ceremony");
    }
  }

  function handleComplete(ceremony: Ceremony) {
    if (ceremony.phase !== "complete") return;
    setCompletedCeremony(ceremony);
    if (ceremony.verified && !celebratedRef.current) {
      celebratedRef.current = true;
      const colors = ["#22c58b", "#e8b34a"];
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors, disableForReducedMotion: true });
      confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors, disableForReducedMotion: true });
      confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors, disableForReducedMotion: true });
      setTimeout(
        () => confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 }, colors, disableForReducedMotion: true }),
        250,
      );
    }
  }

  const enough = selected.size >= vault.threshold;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <Link href={`/vault/${id}`} className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to vault
        </Link>
        <h1 className="font-heading text-2xl font-semibold [.demo-mode_&]:text-4xl">Social recovery</h1>
        <p className="mt-1 text-sm text-muted-foreground [.demo-mode_&]:text-base">
          Any {vault.threshold} of this vault&apos;s {vault.total_participants} participants can
          prove the vault is still operable — you don&apos;t need a specific lost share back, just
          any threshold-many. This runs the same real FROST signing ceremony as a send.
        </p>
      </div>

      {!ceremonyId ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <StepLabel number={1} title="Select participants" />
            {vault.participants.map((p) => {
              const isSelected = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggle(p.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors",
                    isSelected ? "border-signal bg-signal/5" : "border-border hover:border-muted-foreground/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      isSelected ? "border-signal bg-signal text-signal-foreground" : "border-border",
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground [.demo-mode_&]:text-sm">
            {selected.size} selected — need at least {vault.threshold}
          </p>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <StepLabel number={2} title="Prove recovery" />
            <Button onClick={handleStart} disabled={!enough} className="w-full [.demo-mode_&]:h-12 [.demo-mode_&]:text-base">
              Prove vault is recoverable
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SigningProgress ceremonyId={ceremonyId} participants={vault.participants} onComplete={handleComplete} />
          {completedCeremony?.verified && (
            <div className="space-y-3 rounded-md border border-signal/40 bg-signal/5 p-5 text-center ring-2 ring-signal shadow-[0_0_40px_-8px_var(--signal)]">
              <ShieldCheck className="mx-auto h-8 w-8 text-signal" />
              <p className="font-heading text-lg font-semibold text-signal [.demo-mode_&]:text-2xl">Access restored</p>
              <p className="text-sm text-muted-foreground [.demo-mode_&]:text-base">
                A different threshold subset than usual just produced a fully valid signature — the
                vault never depended on any one participant.
              </p>
              {completedCeremony.verifying_key_hex && (
                <div className="text-left">
                  <p className="mb-1 text-xs text-muted-foreground">verified against group key</p>
                  <HexBlock value={completedCeremony.verifying_key_hex} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
