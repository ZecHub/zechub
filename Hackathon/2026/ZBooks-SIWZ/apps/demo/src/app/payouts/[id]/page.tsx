import { notFound, redirect } from "next/navigation";
import { getRun, listKeys, listPayees, reconcileRun } from "@/lib/db";
import {
  canManagePayouts,
  canRevealPayoutURI,
  currentUser,
} from "@/lib/session";
import { runPreflight } from "@/lib/payouts";
import { PayoutRunDetail } from "./PayoutRunDetail";

export const dynamic = "force-dynamic";

export default async function PayoutRunPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) redirect("/");
  // Viewers can browse runs and approvals; write actions gated in the client.

  if (!(await getRun(params.id))) notFound();
  // Auto-match against already-synced treasury txs so payments show as paid
  // without any manual step. Idempotent; no network (use the button to sync).
  try {
    await reconcileRun(params.id);
  } catch {
    // best-effort
  }
  const run = await getRun(params.id);
  if (!run) notFound();

  const rawPreflight = await runPreflight(run);
  // Belt-and-suspenders: strip the URI from viewer props even though the QR
  // endpoint and Pay modal are already gated. Viewers should never receive
  // the raw ZIP 321 URI in server-rendered HTML.
  const preflight = canRevealPayoutURI(user.role)
    ? rawPreflight
    : { ...rawPreflight, uri: null };
  const payees = (await listPayees()).map((p) => ({ id: p.id, label: p.label, address: p.address }));
  const allKeys = await listKeys();
  const keys = allKeys.map((k) => ({ id: k.id, label: k.label, primary: k.primary }));
  const sourceKey = run.source_ufvk_id
    ? allKeys.find((k) => k.id === run.source_ufvk_id)
    : undefined;
  const sourceKeySync = sourceKey
    ? {
        syncStatus: sourceKey.sync_status,
        lastSyncedAt: sourceKey.last_synced_at,
        lastSyncError: sourceKey.last_sync_error,
      }
    : null;

  return (
    <PayoutRunDetail
      run={run}
      preflight={preflight}
      payees={payees}
      keys={keys}
      canEdit={canManagePayouts(user.role)}
      currentUserAddress={user.address}
      sourceKeySync={sourceKeySync}
    />
  );
}
