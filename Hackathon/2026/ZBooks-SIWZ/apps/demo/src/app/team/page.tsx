import { redirect } from "next/navigation";
import { listMembers } from "@/lib/db";
import { canManageTeam, currentUser } from "@/lib/session";
import { AddMemberForm } from "./AddMemberForm";
import { MemberRow } from "./MemberRow";
import { WipeButton } from "./WipeButton";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const team = await listMembers();
  const canManage = canManageTeam(user.role);
  const demoMode = process.env.SIWZ_DEMO === "1";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 max-w-2xl">
        <p className="text-sm text-neutral-700 dark:text-neutral-200 font-medium mb-3">
          Roles control what each address can do.
        </p>
        <dl className="grid sm:grid-cols-3 gap-3 text-sm">
          <RoleCard
            name="Admin"
            scope="Manage team, manage keys, tag transactions, view reports."
          />
          <RoleCard
            name="Treasurer"
            scope="Manage keys, tag transactions, view reports."
          />
          <RoleCard
            name="Viewer"
            scope="View reports only."
          />
        </dl>
        <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
          The first address to sign in becomes admin automatically. New
          sign-ins join as viewers and can be promoted from this page.
        </p>
      </div>

      {canManage ? <AddMemberForm /> : null}

      <ul className="flex flex-col gap-2">
        {team.map((m) => (
          <MemberRow
            key={m.address}
            m={m}
            isSelf={m.address === user.address}
            canManage={canManage}
          />
        ))}
      </ul>

      {demoMode && canManage && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-4 max-w-2xl flex items-center justify-between gap-3">
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong className="font-semibold">Demo mode.</strong> SIWZ_DEMO=1 is
            set. The button below wipes every key, transaction, team
            member, and label so you can record a fresh walkthrough.
          </div>
          <WipeButton />
        </div>
      )}
    </div>
  );
}

function RoleCard({ name, scope }: { name: string; scope: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
      <dt className="font-semibold text-sm tracking-tight">{name}</dt>
      <dd className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">{scope}</dd>
    </div>
  );
}
