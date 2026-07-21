import { redirect } from "next/navigation";
import { getWorkspaceSettings, listMembers } from "@/lib/db";
import { canManageTeam, currentUser } from "@/lib/session";
import { ApprovalsSettingsForm } from "./ApprovalsSettingsForm";

export const dynamic = "force-dynamic";

export default async function ApprovalsSettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  // Viewers see the policy in read-only mode; only admins can edit.
  const canEdit = canManageTeam(user.role);

  const [settings, team] = await Promise.all([getWorkspaceSettings(), listMembers()]);
  const candidates = team.filter((m) => m.role === "admin" || m.role === "treasurer");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Approvals</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 max-w-2xl">
        <p className="text-sm text-neutral-700 dark:text-neutral-200 font-medium mb-2">
          M-of-N approval before a payout batch can be paid.
        </p>
        <p className="text-xs text-neutral-500 leading-relaxed">
          When set to more than 1, each new draft run requires the threshold
          number of approvals before its ZIP 321 URI is revealed and the Pay
          batch button unlocks. Editing any line item invalidates older
          approvals and resets the count. Changes here only apply to runs
          created from now on, not to existing drafts.
        </p>
      </div>

      <ApprovalsSettingsForm
        current={{
          minApprovals: settings.min_approvals,
          approverAddresses: settings.approver_addresses,
        }}
        candidates={candidates.map((m) => ({ address: m.address, role: m.role }))}
        canEdit={canEdit}
      />
    </div>
  );
}
