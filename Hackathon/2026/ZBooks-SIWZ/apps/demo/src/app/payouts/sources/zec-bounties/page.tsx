import { redirect } from "next/navigation";
import Link from "next/link";
import { canTag, currentUser } from "@/lib/session";
import { listKeys, listRuns } from "@/lib/db";
import { SIWZ_NETWORK } from "@/lib/auth";
import {
  buildImportCandidates,
  fetchAllBounties,
  type BountyImportCandidate,
} from "@/lib/zec-bounties";
import { ImportClient } from "./ImportClient";

export const dynamic = "force-dynamic";

export default async function ZecBountiesImportPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  if (!canTag(user.role)) redirect("/payouts");

  let candidates: BountyImportCandidate[] = [];
  let fetchError: string | null = null;
  try {
    const all = await fetchAllBounties();
    candidates = buildImportCandidates(all, SIWZ_NETWORK);
  } catch (err) {
    fetchError = (err as Error).message;
  }

  const payable = candidates.filter((c) => c.payable);
  const pickable = candidates.filter((c) => c.reason === "needs_assignee_pick");
  const blocked = candidates.filter((c) => !c.payable && c.reason !== "needs_assignee_pick");

  const runs = await listRuns();
  const draftRuns = runs.filter((r) => r.status === "draft");
  const keys = (await listKeys()).map((k) => ({ id: k.id, label: k.label }));

  return (
    <div className="flex flex-col gap-6">
      <nav className="text-xs text-neutral-500 flex items-center gap-1.5">
        <Link href="/payouts" className="hover:text-neutral-700 dark:hover:text-neutral-300">
          Payouts
        </Link>
        <span>/</span>
        <span>Import from ZecBounties</span>
      </nav>

      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Import from ZecBounties</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Pulls completed, approved, unpaid bounties from{" "}
          <a
            href="https://bounties.zechub.wiki"
            className="text-zcash-yellow hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            ZecHub Bounties
          </a>
          . Select the ones you want to pay, ZBooks creates a payout run with each as a line item.
          The same bounty can only be imported once across all runs.
        </p>
      </header>

      {fetchError ? (
        <div className="rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-sm">
          <div className="font-semibold mb-1">Couldn't reach zec-bounties</div>
          <div className="text-red-700 dark:text-red-300 break-all">{fetchError}</div>
        </div>
      ) : candidates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-sm text-neutral-500">
          The bounties endpoint returned no bounties at all. Check that
          {" "}<code className="font-mono text-xs">https://zechub.zone/api/bounties</code> is reachable.
        </div>
      ) : (
        <ImportClient
          payable={payable}
          pickable={pickable}
          blocked={blocked}
          zbooksNetwork={SIWZ_NETWORK}
          draftRuns={draftRuns.map((r) => ({ id: r.id, title: r.title }))}
          keys={keys}
        />
      )}
    </div>
  );
}
