# ZBooks guide: pages and roles

What every page does, what each role can do, and how to audit a wallet for
undocumented transactions.

## A note on "wallets"

ZBooks does not bind a wallet to a person. It watches **viewing keys (UFVKs)**
added on the Keys page. Whatever wallet's UFVK is added is visible to everyone
on the team, read-only, and ZBooks can never spend from it. So "the treasurer's
wallet" just means the UFVK that the treasurer added (typically the one set as a
payout run's source).

## Pages

| Page | What it does | What it shows | Who |
|---|---|---|---|
| `/` | Landing and sign-in | The three sign-in flows (paid memo, pasted signature, MetaMask snap) | Public |
| `/keys` | Manage viewing keys | Each watched UFVK with sync status, tx count, last sync, birthday, primary flag | All see; admin/treasurer add, remove, rename, sync, set primary |
| `/transactions` | The ledger | Every synced transaction across all wallets: date, direction, amount, memo/counterparty, which wallet (Key), category, notes. Filters: search, wallet, direction, category (including Untagged only) | All see; admin/treasurer tag and add notes inline |
| `/payouts` | Pay contributors | Payees and payout runs; create a run, add line items, pre-flight balance check, batch QR, reconcile. Includes an **Import from ZecBounties** button that pulls completed bounties from `bounties.zechub.wiki` directly into a draft run, with network detection so on-testnet bounties can't be scheduled on a mainnet deployment. | All see runs, line items, approval progress, and audit; only admin/treasurer create runs, edit lines, approve, or reveal the payment URI. |
| `/payouts/sources/zec-bounties` | Bounty import preview | Live list of `DONE`+`isApproved`+`unpaid` bounties from zec-bounties' public API. Selection, payable/off-network split, target = new run or append to existing draft | Admin and treasurer only |
| `/reports` | Accounting output | Monthly P&L (ZEC and USD), inflow/outflow/net KPIs, charts, top contractors, CSV export shaped for QuickBooks/Xero | All roles |
| `/counterparties` (Contacts) | Name addresses | Saved address labels and unlabelled addresses by activity; a label renders everywhere | All see; admin/treasurer edit |
| `/audit` | Tagging trail | Every categorisation action, newest first: when, who, counterparty, category, memo, amount | All roles (logs tagging only, not key or role changes) |
| `/team` | Members and roles | Each member's identity, role, when added | All see; admin changes roles and adds/removes members |
| `/settings/approvals` | M-of-N approval policy | Required approvals (M) and approver allowlist (N) for new payout runs | Admin only |

## Roles

| Capability | Viewer | Treasurer | Admin |
|---|---|---|---|
| View transactions, reports, contacts, audit, keys | yes | yes | yes |
| Tag transactions, edit contacts | no | yes | yes |
| Add / remove / rename / sync viewing keys | no | yes | yes |
| See payout runs, line items, approval status | yes (read-only) | yes | yes |
| Create runs, edit lines, approve, reveal payment URI | no | yes | yes |
| Approve a payout run | no | yes (if on allowlist) | yes (if on allowlist) |
| View approval policy on `/settings/approvals` | yes (read-only) | yes (read-only) | yes |
| Manage team, roles, approval policy | no | no | yes |

First sign-in becomes admin on a fresh instance. With `SIWZ_ADMIN_ADDRESSES`
set, only listed identities are admin and everyone else joins as viewer. Admins
promote members on the Team page.

### Key ownership

A treasurer can rename, sync, and remove the UFVKs they added themselves, but
not UFVKs added by other team members. Only admins can rename or remove someone
else's key. The `owner` field is set at add time to the signed-in identity, and
the policy is enforced in
[`apps/demo/src/app/api/keys/[id]/route.ts`](../../apps/demo/src/app/api/keys/[id]/route.ts).
Full details in [security.md](../security.md#key-ownership-on-mutation).

UFVKs are also encrypted at rest in Turso (AES-256-GCM, key derived from
`NEXTAUTH_SECRET`). A leaked Turso token alone no longer reveals the team's
viewing keys. See [security.md](../security.md#ufvk-encryption-at-rest) for the
storage format and key-rotation caveats.

### Using ZBooks as a viewer
You can read everything. Browse `/transactions`, filter and search, open `/reports`
for the P&L and download the CSV, and check `/audit` to see who categorised what.
On `/payouts` you can browse runs, line items, approval progress, and the audit
trail, but write actions (create a run, edit a line, approve, reveal the payment
URI) are hidden. On `/settings/approvals` the M-of-N policy is read-only.

### Using ZBooks as a treasurer
You run the books day to day. Add the treasury's viewing key on `/keys` and sync
it. Categorise transactions on `/transactions` (memos pre-fill as a first draft).
Label recurring addresses on `/counterparties`. When it is payday, build a run on
`/payouts`, pay the batch, and reconcile. Export the CSV from `/reports` at close.

If your team set an approval threshold above 1, your draft run will sit with an
"Approvals: 0 of N" banner until enough approvers click Approve on it; only then
does the Pay batch button unlock. Editing any line item after approvals are
collected invalidates the old approvals (they go stale and are kept for audit)
and you'll need to collect approvals again at the new payload.

### Using ZBooks as an admin
Everything a treasurer can do, plus the Team page (promote a new finance
contractor to treasurer, demote, or remove) and Settings (approval policy: how
many approvals each new payout run requires, and who is on the approver
allowlist). Set `SIWZ_ADMIN_ADDRESSES` at deploy time so a public demo does not
hand admin to the first visitor.

## Auditing a wallet for undocumented transactions

There is no separate per-person view; you audit through `/transactions`, which
already holds every transaction of every watched wallet.

1. Make sure the wallet's UFVK is on `/keys`. It is there already if it is a
   payout run's source. If not, add it so ZBooks can see its history.
2. Go to `/transactions` and set the **Wallet** filter to that wallet, the
   **Direction** filter to **Outgoing**, and the **Category** filter to
   **Untagged only**.
3. What remains is the undocumented spend: outgoing transactions that were never
   categorised. Reconciled payouts auto-tag as **Contractor**, so anything still
   untagged is an outflow that was not part of a documented payout.
4. Cross-check against `/payouts` (which lines are marked paid) and `/audit` (who
   categorised what, and when).

As an admin you see the same shared ledger a treasurer does, so no special access
is needed. The data is team-wide, not per-role.
