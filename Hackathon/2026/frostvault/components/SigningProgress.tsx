"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { ThresholdDial } from "@/components/ThresholdDial";
import { CeremonyRail } from "@/components/CeremonyRail";
import { HexBlock } from "@/components/HexBlock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { pollCeremony } from "@/lib/api/ceremonies";
import { cn } from "@/lib/utils";
import type { Ceremony, Participant } from "@/types";

const SIGNING_STAGES = [
  { key: "awaiting_round1", label: "Round 1 · Commit" },
  { key: "awaiting_round2", label: "Round 2 · Sign" },
  { key: "aggregating", label: "Aggregate" },
];

export function SigningProgress({
  ceremonyId,
  participants,
  onComplete,
}: {
  ceremonyId: string;
  participants: Participant[];
  onComplete?: (ceremony: Ceremony) => void;
}) {
  const [ceremony, setCeremony] = useState<Ceremony | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    pollCeremony(ceremonyId, setCeremony).then((final) => {
      if (!firedRef.current) {
        firedRef.current = true;
        onComplete?.(final);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ceremonyId]);

  const phase = ceremony?.phase ?? "awaiting_round1";
  const signerIds = ceremony?.signer_participant_ids ?? [];
  const signers = participants.filter((p) => signerIds.includes(p.id));
  const roundOneDone = phase !== "awaiting_round1";
  const failed = phase === "failed";
  const complete = phase === "complete";

  return (
    <div className="space-y-6">
      <CeremonyRail stages={SIGNING_STAGES} currentPhase={phase} failed={failed} />

      <div className="flex items-center gap-4 rounded-md border border-border bg-card p-4">
        <ThresholdDial
          total={signers.length || 1}
          filled={complete ? signers.length : roundOneDone ? signers.length : 0}
          pending={!complete && !failed}
          size={44}
        />
        <div className="flex-1 space-y-1.5">
          {signers.map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[9px]">{s.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate">{s.name}</span>
              <span
                className={cn(
                  "shrink-0 font-mono text-xs",
                  complete ? "text-signal" : failed ? "text-destructive" : roundOneDone ? "text-signal" : "text-pending",
                )}
              >
                {complete ? "signed" : failed ? "failed" : roundOneDone ? "committed" : "awaiting…"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {complete && ceremony?.signature_hex && (
        <div
          className={cn(
            "space-y-3 rounded-md border p-4 transition-shadow",
            ceremony.verified
              ? "border-signal/30 bg-signal/5 ring-2 ring-signal shadow-[0_0_40px_-8px_var(--signal)]"
              : "border-destructive/30 bg-destructive/5",
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-signal [.demo-mode_&]:text-base">
            {ceremony.verified ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
            {ceremony.verified ? "Signature verified against RedPallas group key" : "Verification failed"}
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">signature</p>
            <HexBlock value={ceremony.signature_hex} />
          </div>
          {ceremony.verifying_key_hex && (
            <div>
              <p className="mb-1 text-xs text-muted-foreground">rerandomized verifying key</p>
              <HexBlock value={ceremony.verifying_key_hex} />
            </div>
          )}
        </div>
      )}

      {failed && (
        <p className="text-sm text-destructive">{ceremony?.error ?? "Ceremony failed"}</p>
      )}
    </div>
  );
}
