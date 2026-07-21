import { useCallback, useEffect, useState } from "react";
import type { ChainTx, DashboardSummary } from "../lib/pdv";
import { ChainStatusBar } from "./ChainStatusBar";

function short(txid: string): string {
  return `${txid.slice(0, 8)}…${txid.slice(-6)}`;
}

// formata valor ZEC com até 8 casas, sem zeros à direita desnecessários,
// mas sempre mostrando pelo menos as casas significativas
function fmtZec(v: string | undefined): string {
  if (v === undefined) return "—";
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  if (n === 0) return "0.00000000";
  return n.toFixed(8).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

function fmtUsd(v: number | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);
}

function confBadge(conf: number) {
  if (conf <= 0)
    return { label: "unconfirmed", cls: "bg-neutral-500/20 text-neutral-400" };
  if (conf < 3)
    return { label: `${conf} conf`, cls: "bg-zcash/20 text-zcash" };
  return { label: "confirmed", cls: "bg-zcash/20 text-zcash" };
}

export default function Dashboard({
  onNewCharge,
  refreshKey,
  showUsd,
}: {
  onNewCharge: () => void;
  refreshKey: number;
  showUsd: boolean;
}) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [txs, setTxs] = useState<ChainTx[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [s, list] = await Promise.all([
      window.pdv.dashboardSummary().catch(() => null),
      window.pdv.chainTransactions().catch(() => [] as ChainTx[]),
    ]);
    setSummary(s);
    setTxs(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const iv = setInterval(load, 8000);
    return () => clearInterval(iv);
  }, [load, refreshKey]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <SummaryCard
          label="Balance"
          value={fmtZec(summary?.balanceZec)}
          unit="ZEC"
          sub={showUsd ? fmtUsd(summary?.balanceUsd) : null}
        />
        <SummaryCard
          label="Today"
          value={fmtZec(summary?.receivedTodayZec)}
          unit="ZEC"
          sub={showUsd ? fmtUsd(summary?.receivedTodayUsd) : null}
        />
        <SummaryCard
          label="Payments"
          value={summary ? String(summary.paymentsToday) : "—"}
          sub={
            showUsd && summary?.zecUsd != null
              ? `ZEC ${fmtUsd(summary.zecUsd)}`
              : null
          }
        />
      </div>

      <ChainStatusBar />

      <button
        onClick={onNewCharge}
        className="rounded-2xl bg-white/10 py-3.5 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15"
      >
        New charge
      </button>

      <div className="flex-1 overflow-y-auto">
        <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
          On-chain transactions
        </p>

        {loading ? (
          <p className="mt-6 text-center text-sm text-neutral-500">Loading…</p>
        ) : txs.length === 0 ? (
          <p className="mt-6 text-center text-sm text-neutral-500">
            No transactions yet. They appear here once confirmed on-chain.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {txs.map((tx) => {
              const badge = confBadge(tx.confirmations);
              const underpaid =
                tx.expectedZec !== null &&
                Number(tx.receivedZec) < Number(tx.expectedZec);
              return (
                <li
                  key={tx.txid}
                  className="rounded-2xl bg-black/20 px-4 py-3 ring-1 ring-white/5 transition hover:ring-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm">
                        {fmtZec(tx.receivedZec)} <span className="text-neutral-500">ZEC</span>
                      </span>
                      {showUsd && fmtUsd(tx.receivedUsd) && (
                        <span className="ml-2 font-mono text-xs text-neutral-500">
                          ≈ {fmtUsd(tx.receivedUsd)}
                        </span>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                    <button
                      onClick={() =>
                        window.pdv.openExternal(
                          `https://mainnet.zcashexplorer.app/transactions/${tx.txid}`,
                        )
                      }
                      className="font-mono transition hover:text-neutral-300 hover:underline"
                      title={`Open ${tx.txid} in explorer`}
                    >
                      {short(tx.txid)}
                    </button>
                    <span>block {tx.height}</span>
                  </div>

                  {tx.isPdvCharge && (
                    <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-neutral-400">
                        PDV charge
                      </span>
                      {underpaid && (
                        <span className="text-amber-400">
                          underpaid — expected {tx.expectedZec}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  unit,
  sub,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string | null;
}) {
  return (
    <div className="rounded-2xl bg-black/20 px-3 py-3 ring-1 ring-white/5">
      <p className="text-[10px] uppercase tracking-wider text-neutral-500">{label}</p>
      <p className="mt-0.5 truncate font-mono text-sm text-neutral-100">
        {value}
        {unit && <span className="ml-1 text-[10px] text-neutral-500">{unit}</span>}
      </p>
      {sub && (
        <p className="mt-0.5 truncate font-mono text-[10px] text-zcash/80">{sub}</p>
      )}
    </div>
  );
}