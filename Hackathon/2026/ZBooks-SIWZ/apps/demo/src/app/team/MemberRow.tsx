"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Role, TeamMember } from "@/lib/types";
import { useConfirm } from "@/components/ConfirmDialog";

export function MemberRow({
  m,
  isSelf,
  canManage,
}: {
  m: TeamMember;
  isSelf: boolean;
  canManage: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { confirm } = useConfirm();

  return (
    <li className="rounded-lg border border-black/10 dark:border-white/10 p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm break-all">{m.address}</code>
          {isSelf && <span className="text-[10px] uppercase opacity-60">you</span>}
        </div>
        <div className="text-[11px] opacity-50">
          Added {new Date(m.added_at).toLocaleDateString()} by {m.added_by}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {canManage && !isSelf ? (
          <>
            <select
              className="text-xs rounded-md border border-black/15 dark:border-white/15 bg-transparent px-2 py-1"
              value={m.role}
              disabled={isPending}
              onChange={(e) => {
                const role = e.target.value as Role;
                startTransition(async () => {
                  await fetch(`/api/team/${encodeURIComponent(m.address)}/role`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ role }),
                  });
                  router.refresh();
                });
              }}
            >
              <option value="viewer">Viewer</option>
              <option value="treasurer">Treasurer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950/40"
              disabled={isPending}
              onClick={async () => {
                const ok = await confirm({
                  title: "Remove team member?",
                  body: `${m.address} will lose access on their next sign-in. They can re-join if any admin re-invites them.`,
                  confirmLabel: "Remove",
                  tone: "danger",
                });
                if (!ok) return;
                startTransition(async () => {
                  await fetch(`/api/team/${encodeURIComponent(m.address)}`, { method: "DELETE" });
                  router.refresh();
                });
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <span className="text-xs opacity-70 px-2 py-1">{m.role}</span>
        )}
      </div>
    </li>
  );
}
