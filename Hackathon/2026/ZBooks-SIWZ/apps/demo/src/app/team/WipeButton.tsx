"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/components/ConfirmDialog";
import { useToast } from "@/components/Toast";

// Demo-only "reset DB" button. The endpoint refuses unless SIWZ_DEMO=1
// AND the caller is admin, so it's safe to render unconditionally for admins.
export function WipeButton() {
  const router = useRouter();
  const { confirm } = useConfirm();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={async () => {
        const ok = await confirm({
          title: "Wipe all demo data?",
          body: "Clears every UFVK, transaction, team member, and counterparty label. Then you'll be signed out. Only available in SIWZ_DEMO=1 mode.",
          confirmLabel: "Wipe & sign out",
          tone: "danger",
        });
        if (!ok) return;
        startTransition(async () => {
          const res = await fetch("/api/admin/wipe", { method: "POST" });
          if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            toast({ message: `Wipe failed: ${j.error ?? res.status}`, tone: "error" });
            return;
          }
          try {
            localStorage.removeItem("siwz.zbooks.previous_anon_id");
            localStorage.removeItem("siwz.zbooks.reauth");
          } catch { /* private mode */ }
          window.location.href = "/api/auth/signout?callbackUrl=/";
        });
      }}
      className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-50"
    >
      {isPending ? "Wiping…" : "Wipe demo data"}
    </button>
  );
}
