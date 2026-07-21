import type { PoolSeries } from "@/components/pools/PoolsChart";

const SOURCE_BASE =
  "https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/data/zcash";
const POOLS = ["orchard", "sapling", "sprout"] as const;

type Row = { supply: number; close: string };

function toWeekly(raw: Row[]): [number, number][] {
  const daily = raw
    .map(r => {
      const [m, d, y] = r.close.split("/").map(Number);
      return [Date.UTC(y, m - 1, d), r.supply] as [number, number];
    })
    .filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]))
    .sort((a, b) => a[0] - b[0]);

  const weekly = daily.filter((_, i) => i % 7 === 0);
  if (daily.length && weekly[weekly.length - 1][0] !== daily[daily.length - 1][0]) {
    weekly.push(daily[daily.length - 1]);
  }
  return weekly;
}

export async function loadPools() {
  const rows = await Promise.all(
    POOLS.map(async pool => {
      const res = await fetch(`${SOURCE_BASE}/${pool}_supply.json`, {
        next: { revalidate: 600 },
      });
      if (!res.ok) throw new Error(`${pool}: ${res.status}`);
      return toWeekly((await res.json()) as Row[]);
    }),
  );

  const series = { orchard: rows[0], sapling: rows[1], sprout: rows[2] } satisfies PoolSeries;
  const current = Object.fromEntries(
    POOLS.map((p, i) => [p, rows[i][rows[i].length - 1]?.[1] ?? 0]),
  ) as Record<(typeof POOLS)[number], number>;
  const asOf = new Date(Math.max(...rows.map(r => r[r.length - 1]?.[0] ?? 0)))
    .toISOString()
    .slice(0, 10);

  return { series, current, asOf };
}
