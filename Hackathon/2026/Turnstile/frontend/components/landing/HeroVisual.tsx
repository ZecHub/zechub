import Image from "next/image";

import { Icon, Notification01Icon } from "@/components/icons/Icon";
import { ScannerStrip } from "@/components/landing/ScannerStrip";
import { LiveDot } from "@/components/ui/Pill";
import { formatHeight } from "@/lib/format";

const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02] backdrop-blur-md";

export interface PoolTotals {
  orchard: number;
  sapling: number;
  sprout: number;
}

export function HeroVisual({ pools }: { pools: PoolTotals | null }) {
  const total = pools ? pools.orchard + pools.sapling + pools.sprout : 0;
  const pct = (v: number) => (total > 0 ? `${((v / total) * 100).toFixed(1)}%` : "0%");

  return (
    <div className="group relative h-full min-h-[460px] w-full lg:min-h-[560px]">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="scale-105 object-cover grayscale contrast-[1.15] brightness-[0.85] transition-transform duration-[2s] ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 via-accent/10 to-transparent mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/45 to-canvas/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(52,211,153,0.18),transparent_70%)]" />

        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${GLASS}`}>
              <LiveDot />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
                Live mainnet
              </span>
            </div>

            <button
              type="button"
              aria-label="Get activation alerts"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20 ${GLASS}`}
            >
              <Icon icon={Notification01Icon} size={18} />
            </button>
          </div>

          <div className={`w-full max-w-[280px] self-end rounded-2xl p-4 ${GLASS}`}>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                In the closing pool
              </span>
              <span className="font-mono text-[10px] text-accent">ORCHARD</span>
            </div>

            <div className="mb-3 font-mono text-2xl font-bold tabular-nums text-white">
              {pools ? `${formatHeight(Math.round(pools.orchard))} ZEC` : "—"}
            </div>

            {pools ? (
              <>
                <div className="mb-3 flex h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div style={{ width: pct(pools.sprout) }} className="bg-white/25" />
                  <div style={{ width: pct(pools.sapling) }} className="bg-white/45" />
                  <div
                    style={{ width: pct(pools.orchard) }}
                    className="bg-accent shadow-[0_0_14px_rgba(52,211,153,0.7)]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {(
                    [
                      ["Sprout", "bg-white/25"],
                      ["Sapling", "bg-white/45"],
                      ["Orchard", "bg-accent"],
                    ] as const
                  ).map(([label, dot]) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/50"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      {label}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-white/40">
                    of shielded ZEC
                  </span>
                </div>
              </>
            ) : (
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                pool data unreachable
              </span>
            )}
          </div>

          <div className="mt-6">
            <ScannerStrip />
          </div>
        </div>
      </div>
    </div>
  );
}
