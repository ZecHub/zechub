import type { IconSvgElement } from "@hugeicons/react";

import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  Icon,
  Shield01Icon,
  ViewOffIcon,
} from "@/components/icons/Icon";
import { IRONWOOD_ACTIVATION_HEIGHT, ORCHARD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight, formatPool } from "@/lib/format";
import type { PoolBalances, ScanResult, Verdict } from "@/lib/types";
import { POOL_LABELS, VERDICT_COPY } from "@/lib/verdict";

const TONES: Record<
  Verdict,
  { border: string; text: string; chip: string; glow: string; icon: IconSvgElement }
> = {
  exposed: {
    border: "border-exposed/40",
    text: "text-exposed",
    chip: "border-exposed/30 bg-exposed/10 text-exposed",
    glow: "bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(248,113,113,0.12),transparent_70%)]",
    icon: Alert02Icon,
  },
  partial: {
    border: "border-partial/40",
    text: "text-partial",
    chip: "border-partial/30 bg-partial/10 text-partial",
    glow: "bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(251,191,36,0.12),transparent_70%)]",
    icon: Shield01Icon,
  },
  ready: {
    border: "border-ready/40",
    text: "text-ready",
    chip: "border-ready/30 bg-ready/10 text-ready",
    glow: "bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(52,211,153,0.12),transparent_70%)]",
    icon: CheckmarkCircle02Icon,
  },
  undetermined: {
    border: "border-border-strong",
    text: "text-muted",
    chip: "border-border-strong bg-white/[0.04] text-muted",
    glow: "bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(161,161,170,0.10),transparent_70%)]",
    icon: ViewOffIcon,
  },
};

export function VerdictCard({ result }: { result: ScanResult }) {
  const copy = VERDICT_COPY[result.verdict];
  const tone = TONES[result.verdict];

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border bg-surface ${tone.border}`}
    >
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${tone.glow}`} />

      <div className="relative p-8 md:p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span
            className={`inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${tone.chip}`}
          >
            <Icon icon={tone.icon} size={13} />
            {copy.label}
          </span>

          <span className="cursor-default font-mono text-[10px] uppercase tracking-widest text-faint">
            Block {formatHeight(result.scannedToHeight)}
          </span>
        </div>

        <h2
          className={`mb-4 text-2xl font-medium tracking-tighter md:text-4xl ${tone.text}`}
        >
          {copy.headline}
        </h2>

        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted">{copy.detail}</p>

        <PoolTable balances={result.balances} />

        {result.verdict === "exposed" ? (
          <p className="mt-6 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-widest text-faint">
            Activation at block {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}
          </p>
        ) : null}

        {result.verdict !== "exposed" &&
        result.scannedFromHeight > ORCHARD_ACTIVATION_HEIGHT ? (
          <p className="mt-6 flex items-start gap-3 border-t border-border pt-5 text-xs leading-relaxed text-faint">
            <Icon icon={Alert02Icon} size={14} className="mt-0.5 text-partial" />
            <span>
              Scanned from block {formatHeight(result.scannedFromHeight)} onward. Orchard funds
              received before then are not counted — if that is possible, re-check with an earlier
              birthday, or leave the birthday blank for a full scan.
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}

function PoolTable({ balances }: { balances: PoolBalances }) {
  const rows = [
    { key: "transparent", value: balances.transparent },
    { key: "sapling", value: balances.sapling },
    { key: "orchard", value: balances.orchard },
  ] as const;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {rows.map((row) => {
        const invisible = row.value === null;
        const isOrchard = row.key === "orchard";

        return (
          <div
            key={row.key}
            className="flex cursor-default items-center justify-between gap-4 border-b border-border px-5 py-4 last:border-b-0"
          >
            <span
              className={`font-mono text-[11px] uppercase tracking-widest ${
                isOrchard && !invisible ? "text-foreground" : "text-faint"
              }`}
            >
              {POOL_LABELS[row.key]}
            </span>

            <span
              className={`font-mono text-sm ${
                invisible
                  ? "text-faint italic"
                  : isOrchard && row.value > 0
                    ? "text-exposed"
                    : "text-foreground"
              }`}
            >
              {formatPool(row.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
