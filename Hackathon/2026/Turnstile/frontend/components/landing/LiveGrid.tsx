import Link from "next/link";

import { ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { formatHeight } from "@/lib/format";

export interface LiveGridData {
  orchard: number | null;
  orchardSpark: number[] | null;
  readiness: { declaredReady: number; unknown: number; total: number };
}

export function LiveGrid({ data }: { data: LiveGridData }) {
  return (
    <Section id="features">
      <Eyebrow index="02" label="The instrument" />

      <SectionHeading
        className="mb-10"
        title={
          <>
            Live, or it says so <Accented>— never a guess</Accented>
          </>
        }
        body="Every number below is read from the chain or carries the source it was read from."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        <Tile
          href="/check"
          label="Readiness check"
          headline={<span className="text-exposed">EXPOSED</span>}
          sub="last real mainnet verdict — 0.0117 ZEC found in Orchard from a viewing key alone"
          foot="~25s per scan · keys never stored"
        />

        <Tile
          href="/pools"
          label="In the closing pool"
          headline={
            data.orchard !== null ? (
              <span className="text-accent">{formatHeight(Math.round(data.orchard))} ZEC</span>
            ) : (
              "—"
            )
          }
          sub={<Spark points={data.orchardSpark} />}
          foot="Orchard · data: ZecHub Shielded Metrics"
        />

        <Tile
          href="/readiness"
          label="Declared Ironwood-ready"
          headline={
            <>
              <span className="text-exposed">{data.readiness.declaredReady}</span>
              <span className="text-faint"> / {data.readiness.total}</span>
            </>
          }
          sub={`wallets & exchanges with a public statement — ${data.readiness.unknown} have said nothing at all`}
          foot="every row carries its source"
        />

        <Tile
          href="/alerts"
          label="Alerts, no account"
          headline={<span className="text-foreground">TURNSTILE:SUB</span>}
          sub="a shielded memo is the signup form — last subscription confirmed at block 3,412,465"
          foot="watcher holds a viewing key · cannot spend"
        />
      </div>
    </Section>
  );
}

function Tile({
  href,
  label,
  headline,
  sub,
  foot,
}: {
  href: string;
  label: string;
  headline: React.ReactNode;
  sub: React.ReactNode;
  foot: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[240px] cursor-pointer flex-col justify-between gap-6 bg-surface p-7 transition-colors duration-200 hover:bg-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          {label}
        </span>
        <span className="text-border-strong transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
          <Icon icon={ArrowUpRight01Icon} size={16} />
        </span>
      </div>

      <div>
        <div className="mb-2 font-mono text-2xl font-bold tabular-nums tracking-tight">
          {headline}
        </div>
        <div className="text-xs leading-relaxed text-muted">{sub}</div>
      </div>

      <div className="border-t border-border pt-3 font-mono text-[9px] uppercase tracking-widest text-faint">
        {foot}
      </div>
    </Link>
  );
}

function Spark({ points }: { points: number[] | null }) {
  if (!points || points.length < 2) {
    return <span className="text-xs text-faint">six-month trend unavailable</span>;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const W = 180;
  const H = 36;
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((v - min) / (max - min || 1)) * (H - 4) - 2;
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join("");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-9 w-full max-w-[180px]"
      role="img"
      aria-label="Orchard pool value, last six months"
    >
      <path d={d} fill="none" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
