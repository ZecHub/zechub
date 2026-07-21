import { redirect } from "next/navigation";
import { listKeys } from "@/lib/db";
import { canManageKeys, currentUser } from "@/lib/session";
import { AddKeyForm } from "./AddKeyForm";
import { KeyList } from "./KeyList";

export const dynamic = "force-dynamic";

export default async function KeysPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const keys = await listKeys();
  const canEdit = canManageKeys(user.role);

  const isEmpty = keys.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Viewing keys</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>

      {isEmpty && canEdit ? (
        <div className="rounded-xl border border-zcash-yellow/30 bg-zcash-yellow/5 dark:bg-zcash-yellow/10 p-5">
          <div className="font-semibold tracking-tight">Welcome to ZBooks.</div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed max-w-2xl">
            Paste a Unified Full Viewing Key below to import its
            transactions. The first sync can take a couple of minutes
            for an active treasury, then refreshes finish in seconds.
            Your spending keys never leave your wallet.
          </p>
        </div>
      ) : (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Paste a Unified Full Viewing Key (UFVK) to give ZBooks read-only
          access to its transactions. Spending keys are never required, so
          ZBooks cannot move funds.
        </p>
      )}

      {canEdit ? (
        <AddKeyForm autoFocus={isEmpty} />
      ) : (
        <div className="text-sm text-neutral-500">
          You can view keys, but only treasurers and admins can add or remove them.
        </div>
      )}

      <div className="flex flex-col gap-2">
        {keys.length > 0 && (
          <div className="text-sm text-neutral-500">
            {keys.length} {keys.length === 1 ? "key" : "keys"}
          </div>
        )}
        {keys.length === 0 ? null : <KeyList keys={keys} canEdit={canEdit} />}
      </div>
    </div>
  );
}
