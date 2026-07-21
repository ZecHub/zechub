"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThresholdSelector } from "@/components/ThresholdSelector";
import { CeremonyRail } from "@/components/CeremonyRail";
import { StepLabel } from "@/components/StepLabel";
import { createVault } from "@/lib/api/vaults";
import { pollCeremony } from "@/lib/api/ceremonies";
import { useLocalIdentity } from "@/lib/useLocalIdentity";
import type { ParticipantRole } from "@/types";

const DKG_STAGES = [
  { key: "awaiting_round1", label: "Round 1 · Commit" },
  { key: "awaiting_round2", label: "Round 2 · Share" },
  { key: "finalizing", label: "Finalize" },
];

export default function CreateVaultPage() {
  const router = useRouter();
  const { name: identity } = useLocalIdentity();
  const [vaultName, setVaultName] = useState("");
  const [preset, setPreset] = useState({ threshold: 2, total: 3 });
  const [names, setNames] = useState<string[]>(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updatePreset(next: { threshold: number; total: number }) {
    setPreset(next);
    setNames((prev) => {
      const copy = [...prev];
      copy.length = next.total;
      for (let i = 0; i < next.total; i++) if (!copy[i]) copy[i] = "";
      return copy;
    });
  }

  function updateName(i: number, value: string) {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vaultName.trim() || names.some((n) => !n.trim())) {
      toast.error("Fill in a vault name and every participant name.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setPhase("awaiting_round1");

    try {
      const participants = names.map((name, i) => ({
        name: name.trim(),
        role: (i === 0 ? "owner" : "recovery") as ParticipantRole,
      }));

      const vault = await createVault({
        name: vaultName.trim(),
        threshold: preset.threshold,
        participants,
      });

      const finalCeremony = await pollCeremony(vault.dkg_ceremony_id, (c) => setPhase(c.phase));

      if (finalCeremony.phase === "failed") {
        throw new Error(finalCeremony.error ?? "DKG ceremony failed");
      }

      toast.success("Vault ready — real FROST key shares generated.");
      router.push(`/vault/${vault.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold [.demo-mode_&]:text-4xl">Create a vault</h1>
        <p className="mt-1 text-sm text-muted-foreground [.demo-mode_&]:text-base">
          Runs a real, distributed FROST key generation ceremony — no party, including this app,
          ever holds the full private key.
        </p>
      </div>

      {!submitting ? (
        <form onSubmit={handleSubmit} className="space-y-6 [.demo-mode_&]:space-y-8">
          <div className="space-y-2">
            <StepLabel number={1} title="Vault name" />
            <Input
              id="vault-name"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
              placeholder="Family Trust"
              className="[.demo-mode_&]:h-11 [.demo-mode_&]:text-base"
            />
          </div>

          <div className="space-y-2">
            <StepLabel number={2} title="Threshold" />
            <ThresholdSelector value={preset} onChange={updatePreset} />
          </div>

          <div className="space-y-2">
            <StepLabel number={3} title="Participants" />
            <div className="space-y-2">
              {names.map((name, i) => (
                <Input
                  key={i}
                  value={name}
                  onChange={(e) => updateName(i, e.target.value)}
                  placeholder={
                    i === 0 ? (identity ? identity : "Owner name") : `Recovery contact ${i}`
                  }
                  className="[.demo-mode_&]:h-11 [.demo-mode_&]:text-base"
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full [.demo-mode_&]:h-12 [.demo-mode_&]:text-base">
            Generate real FROST key shares
          </Button>
        </form>
      ) : (
        <Card>
          <CardContent className="space-y-6 py-8">
            <p className="text-center text-sm text-muted-foreground">
              Running distributed key generation over reddsa::frost::redpallas…
            </p>
            <CeremonyRail stages={DKG_STAGES} currentPhase={phase ?? "awaiting_round1"} failed={!!error} />
            {error && <p className="text-center text-sm text-destructive">{error}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
