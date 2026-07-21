'use client';

import { PriceChart } from '@/components/apps/PriceChart';
import { ShieldedChart } from '@/components/apps/ShieldedChart';
import { PoolsChart } from '@/components/apps/PoolsChart';
import { SupplyChart } from '@/components/apps/SupplyUsdChart';

export function ChartsDashboard() {
  return (
    <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
      {/* Top Left - Price Chart */}
      <div className="rounded overflow-hidden" style={{ background: 'var(--bg-inset)' }}>
        <div className="h-full p-2">
          <h3
            className="text-[var(--accent-gold)] mb-1 text-center"
            style={{ fontSize: 'var(--font-size-muted)' }}
          >
            Price
          </h3>
          <div className="h-[calc(100%-20px)]">
            <PriceChart />
          </div>
        </div>
      </div>

      {/* Top Right - Shielded Chart */}
      <div className="rounded overflow-hidden" style={{ background: 'var(--bg-inset)' }}>
        <div className="h-full p-2">
          <h3
            className="text-[var(--accent-green)] mb-1 text-center"
            style={{ fontSize: 'var(--font-size-muted)' }}
          >
            Shielded
          </h3>
          <div className="h-[calc(100%-20px)]">
            <ShieldedChart />
          </div>
        </div>
      </div>

      {/* Bottom Left - Pools Chart */}
      <div className="rounded overflow-hidden" style={{ background: 'var(--bg-inset)' }}>
        <div className="h-full p-2">
          <h3
            className="text-[var(--accent-purple)] mb-1 text-center"
            style={{ fontSize: 'var(--font-size-muted)' }}
          >
            Pools
          </h3>
          <div className="h-[calc(100%-20px)]">
            <PoolsChart />
          </div>
        </div>
      </div>

      {/* Bottom Right - Supply Chart */}
      <div className="rounded overflow-hidden" style={{ background: 'var(--bg-inset)' }}>
        <div className="h-full p-2">
          <h3
            className="text-[var(--text-amber)] mb-1 text-center"
            style={{ fontSize: 'var(--font-size-muted)' }}
          >
            Supply
          </h3>
          <div className="h-[calc(100%-20px)]">
            <SupplyChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartsDashboard;
