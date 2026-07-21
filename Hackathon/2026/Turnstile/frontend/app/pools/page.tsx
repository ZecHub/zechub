import type { Metadata } from "next";

import { ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PoolsChart } from "@/components/pools/PoolsChart";
import { Eyebrow } from "@/components/ui/Section";
import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight } from "@/lib/format";
import { loadPools } from "@/lib/pools";

export const metadata: Metadata = {
  title: "Shielded pools — Turnstile",
  description:
    "Live value of the Sprout, Sapling and Orchard shielded pools. On July 28 this becomes the turnstile tracker — watch Orchard drain.",
};

export const revalidate = 600;

const zec = (v: number) => `${Math.round(v).toLocaleString("en-US")} ZEC`;

export default async function PoolsPage() {
  let data: Awaited<ReturnType<typeof loadPools>> | null = null;
  try {
    data = await loadPools();
  } catch {}

  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 w-full">
        <Eyebrow index="F5" label="Shielded pools" />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          Watch the turnstile
        </h1>

        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted">
          The value held in each shielded pool, over the protocol&apos;s whole life. After block{" "}
          {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)} nothing new enters Orchard — from that day,
          this chart is where the ecosystem watches it drain, one spend at a time.
        </p>

        {data ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              <Tile
                label="Orchard"
                value={zec(data.current.orchard)}
                note={`Closes at block ${formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}`}
                accent
              />
              <Tile label="Sapling" value={zec(data.current.sapling)} note="Unaffected by Ironwood" />
              <Tile label="Sprout" value={zec(data.current.sprout)} note="Closed the same way — nearly drained" />
            </div>

            <PoolsChart series={data.series} />

            <p className="mt-6 flex flex-wrap items-center gap-2 text-xs leading-relaxed text-faint">
              Data:{" "}
              <a
                href="https://github.com/ZecHub/zechub-wiki/tree/main/public/data/zcash"
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-1 text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                ZecHub Shielded Metrics
                <Icon icon={ArrowUpRight01Icon} size={12} />
              </a>
              — open-source, community-maintained, as of {data.asOf}. Sprout already lived this
              story: closed to deposits, then drained. Orchard is next, and your funds are not
              frozen either way.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-surface px-8 py-14 text-center">
            <p className="font-mono text-sm text-faint">
              Pool data is unreachable right now. Turnstile does not guess numbers — try again in a
              minute.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </AppFrame>
  );
}

function Tile({
  label,
  value,
  note,
  accent,
}: {
  label: string;
  value: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div className="cursor-default bg-surface p-6">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-faint">{label}</div>
      <div
        className={`font-mono text-2xl font-bold tabular-nums tracking-tight md:text-3xl ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className={`mt-2 text-xs ${accent ? "text-partial" : "text-faint"}`}>{note}</div>
    </div>
  );
}
