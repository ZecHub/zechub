import type { Verdict } from "@/lib/types";

interface VerdictCopy {
  label: string;
  headline: string;
  detail: string;
  tone: "exposed" | "partial" | "ready" | "undetermined";
}

export const VERDICT_COPY: Record<Verdict, VerdictCopy> = {
  exposed: {
    label: "Action needed",
    headline: "You hold ZEC in the Orchard pool",
    detail:
      "Your funds are not frozen and cannot be lost. After the activation height Orchard accepts nothing new, and value leaves only by being spent out. Move it while your wallet still makes that a single tap.",
    tone: "exposed",
  },
  partial: {
    label: "Nothing to do",
    headline: "Your funds sit outside Orchard",
    detail:
      "Your ZEC is in the transparent or Sapling pools, which the activation does not touch. Worth knowing what changes, but there is no action for you here.",
    tone: "partial",
  },
  ready: {
    label: "Ready",
    headline: "This wallet holds no ZEC",
    detail:
      "Turnstile found no funds in any pool. If you expected a balance, check the birthday height — a birthday set after your first transaction will miss it.",
    tone: "ready",
  },
  undetermined: {
    label: "Cannot determine",
    headline: "This key cannot see the Orchard pool",
    detail:
      "Your viewing key carries no Orchard viewing capability, so Turnstile cannot tell you whether you hold Orchard funds. That is a limit of the key, not a verdict — re-run with a unified full viewing key that includes an Orchard key.",
    tone: "undetermined",
  },
};

export const POOL_LABELS = {
  transparent: "Transparent",
  sapling: "Sapling",
  orchard: "Orchard",
} as const;
