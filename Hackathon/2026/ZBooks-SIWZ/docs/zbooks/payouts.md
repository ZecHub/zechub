# ZBooks payouts: pay your contributors, non-custodially

ZBooks started as read-only accounting: paste a viewing key, get a P&L. Payouts
close the other half of the loop, paying the contributors you already track,
without ZBooks ever holding a spending key.

The model in one line: ZBooks initiates and reconciles payments, it never
custodies or sends them. The treasurer signs in their own wallet.

This closes a useful loop for a small ZEC-paid team. It is not a full
finance suite (see Limits below).

## Importing from ZecBounties

ZBooks pulls completed-and-approved-but-unpaid bounties straight from
[ZecHub Bounties](https://bounties.zechub.wiki) (`zec-bounties`, last year's
ZecHub Hackathon winner) via its public API at `https://zechub.zone/api/bounties`.

On `/payouts`, treasurers and admins see an "Import from ZecBounties" button.
It opens `/payouts/sources/zec-bounties`, which mirrors how zec-bounties is
actually used (four UI tabs: TO_DO, IN_PROGRESS, IN_REVIEW, DONE) and treats
`status` as the primary signal:

| zec-bounties status | ZBooks treats as | Reason |
|---|---|---|
| `TO_DO` | Not payable | Bounty is unapproved / draft |
| `IN_PROGRESS` | **Payable** | Approved bounty being worked; treasurer can schedule the payment in advance |
| `IN_REVIEW` | **Payable** | Approved bounty awaiting reviewer sign-off; queue the payment now |
| `DONE` | Not payable | ZecHub already handled (or is handling) the payment upstream |
| `CANCELLED` | Not payable | Bounty abandoned |

Plus the safety checks: `isApproved: true`, `isPaid: false`, non-empty
assignee `z_address`, `bountyAmount > 0`, and address network matches this
ZBooks deployment's `SIWZ_NETWORK`.

Each payable bounty becomes one payout line item with the assignee's
`z_address`, the `bountyAmount`, and a memo of the form `zec-bounty: <title>`.
Bounties that don't qualify still show up in an "Other bounties" section
grouped by reason ("Already paid upstream", "Wrong network", "TO_DO", etc.),
so the operator always sees what's there.

Three guardrails:

- **Network detection.** Each bounty's `z_address` is matched against this
  ZBooks deployment's `SIWZ_NETWORK`. Bounties on a different network
  (e.g. a `utest1…` testnet UA when ZBooks runs on mainnet) appear in an
  "Off-network" section below, greyed out, with a "cannot pay, address is on
  testnet" explanation. The API filter for the active selection only lets
  on-network bounties through to a payout run.
- **Dedup via `external_ref`.** Every imported line item carries
  `external_ref = "zec-bounties:<bounty-id>"`. Re-imports skip bounties whose
  ref already exists anywhere in `payout_items`. The same bounty can't be paid
  twice through ZBooks even if the upstream `isPaid` flag is out of date.
- **Treasurer-only.** Viewers can browse the import preview but the
  `POST /api/payouts/import-zec-bounties` endpoint requires `admin` or
  `treasurer`.

After import, the new run lands in the standard payouts workflow: pre-flight,
batch QR, treasurer signs, reconcile. ZBooks doesn't push the `isPaid` flag back
to zec-bounties; that's manual on their side today (a PR to add a
`PATCH /api/bounties/:id/mark-paid` endpoint would let ZBooks close the loop).

For point-in-time imports (e.g. once a week), point a scheduled job at
`POST /api/payouts/import-zec-bounties` with the appropriate target shape.

## Why not just let ZBooks send the money?

A viewing key (UFVK) is read-only. It can see the treasury and propose a spend,
but it cannot authorize one. That is the whole non-custodial promise, so we keep
it. Three ways to "pay from ZBooks" exist; we picked the safest that ships today:

| Approach | One-click? | Custody | Status |
|---|---|---|---|
| **A. ZBooks holds the spending key** | yes | ZBooks custodies the treasury | rejected: breaks the thesis, and it is money-transmission territory |
| **B. ZBooks builds a PCZT, treasurer signs** | yes | none (ZBooks builds, wallet signs) | roadmap: needs `webzjs-wallet` WASM or snap `signPczt` |
| **C. ZBooks emits a ZIP 321 payment request** | scan | none | shipped: works with every wallet, no WASM |

We ship **C** now and keep **B** on the roadmap. When the snap's `signPczt` (or a
published in-browser wallet lib) lands, ZBooks builds the transaction itself and
the treasurer just approves, which also removes the wallet caveat below.

## The batch is the point

A naive payout pays contributors one at a time. On Zcash that hurts: every
shielded send returns its change as a new note that is not spendable until it
confirms (a few blocks, roughly minutes). Pay 10 people sequentially and each
send waits on the previous one's change note. That is the multi-minute stall you
feel testing repeated sends.

A batch is a single transaction with many outputs. It selects inputs once, pays
everyone, and produces one change note, so there is one confirmation wait. For a
weekly payout run you pay once and move on. ZBooks encodes the whole run as one
multi-recipient ZIP 321 URI ([`buildZip321Multi`](../../packages/siwz-core/src/zip321.ts)):

```
zcash:?address=<a0>&amount=<v0>&memo=<m0>&address.1=<a1>&amount.1=<v1>&...
```

Shielded outputs do not leak who got what to outside observers, so batching costs
no privacy. Each recipient only ever sees their own note.

## Wallet requirement

ZIP 321 the spec supports multiple payments, but whether a wallet executes a
multi-payment URI as one multi-output transaction is wallet-dependent:

- **YWallet**: multi-recipient send. Works.
- **ZODL**: multi-recipient send. Works.
- **Zingo** (mobile and `zingo-cli send`): single-recipient ZIP 321 today. A
  batch URI degrades to paying only the first line, which reintroduces the
  sequential-send stall.
- **Cake, Brave**: single-recipient. Same caveat as Zingo.

Pay the treasury from a multi-recipient wallet (YWallet or ZODL). For
single-recipient wallets, copy the URI and pay each recipient in turn. The Pay
dialog says this inline. Roadmap option B (PCZT) removes the constraint
entirely by building and broadcasting from ZBooks instead of relying on the
wallet's batch support.

## The flow

1. **Payees**: save a contributor once (name and Zcash address). Use a unified or
   Sapling address to carry a memo with the payment.
2. **Run**: create a payout run; pick the treasury key it pays from (the UFVK
   ZBooks watches to reconcile).
3. **Line items**: add `(payee, amount, memo)`. Each has a *work status*
   (`in_progress` or `completed`) and a *pay status* (`unpaid` or `paid`). Only
   completed, unpaid items enter the batch; in-progress work is left out.
4. **Pre-flight**: before generating the QR, ZBooks checks the treasury's
   spendable balance against `total + estimated ZIP 317 fee`. It refuses to
   present a batch the treasury cannot cover. The same check runs again at the
   moment of clicking Pay (via `POST /api/payouts/[id]/preflight`), so a sudden
   balance drop between page load and click is caught before the QR opens.
5. **Pay**: scan the single QR (or copy the URI, or open in wallet), approve in
   the wallet.
6. **Reconcile**: ZBooks re-syncs the treasury, finds the outgoing tx, matches
   each output (address and amount) back to its line item, and flips it `paid`
   with the txid. Unmatched lines stay pending. Treasurers can also paste a txid
   to settle a line by hand.

   Match strictness: when two completed-unpaid lines share an identical
   (address, amount, memo) tuple, auto-reconcile skips both rather than risk
   mis-crediting; the treasurer marks those manually. Memo comparison is strict
   equality, not substring, so a longer wallet-memo never accidentally satisfies
   a shorter line memo. See `reconcileRun` in
   [`db.ts`](../../apps/demo/src/lib/db.ts) and
   [security.md](./security.md#reconcile-match-strictness).
7. **Accounting**: a reconciled payout auto-tags as a `contractor` expense and
   labels the counterparty from the payee, so the run posts straight into the P&L.

Documented, initiated, paid, reconciled, in one tool.

## Treasury balance

Reconciliation and pre-flight both need the treasury's balance. The
[`lightwallet-rpc` wrapper](../../apps/lightwallet-rpc/src/server.mjs) exposes
`POST /balance` (alongside `/memos` and `/transactions`); it shells out to
`zingo-cli balance` and returns total plus spendable (spendable excludes
unconfirmed change, per the [ZIP 315](https://zips.z.cash/zip-0315) UX
convention). In `SIWZ_DEMO=1` the mock explorer returns a synthetic balance so
the pre-flight panel has something to show.

A full viewing key sees both incoming and outgoing notes, so the treasury shows
up in ZBooks as a fully-audited account (grants in, payouts out, running balance)
with no spending key anywhere near the server.

## M-of-N approval gate

For DAOs that need more than one person to greenlight a payout, ZBooks ships a
process-level approval gate. Set a threshold on `/settings/approvals` and pick
the approver addresses (any team admin/treasurer). Each new draft run snapshots
the threshold at creation and refuses to expose the ZIP 321 URI (and the QR,
and the Pay button) until that many distinct SIWZ identities click Approve.

What it does:

- Each approval is a row signed with `HMAC-SHA256(NEXTAUTH_SECRET, run_id +
  approver_address + payload_hash)`. The signature binds the row to a specific
  run AND a specific payload, so the integrity check fails if an admin tries to
  move an approval to a different run.
- `payload_hash` is `SHA-256` over the canonical ordered list of payable items
  (address, zatoshi, memo). Editing or adding any line item changes the hash,
  which invalidates all older approvals and forces re-approval. Stale rows are
  kept and shown in the panel for audit purposes; they don't count.
- Optional `DISCORD_WEBHOOK_URL`. When set, ZBooks posts to Discord when a run
  needs approvals, on each approval, and when the threshold clears.

What it does NOT do:

- It is not on-chain multisig. The treasurer still signs the final ZIP 321 in
  their own wallet, alone. ZBooks gates the URL reveal, not the signature.
- It is not FROST. The data model is shaped to absorb FROST once wallet PCZT +
  FROST support matures (each approver's "approve" click becomes a signature
  share on the same payload hash) but today this is process gating, not
  cryptographic threshold.

## Limits

What this does not do yet, so the home copy does not oversell it:

- **On-chain multisig.** The approval gate above is application-layer. The
  final transaction is still one signature from one treasurer. True 2-of-3 or
  FROST on the spend path needs PCZT-capable wallets and is on the roadmap.
- **Fiat valuation, cost basis, capital gains.** The P&L is ZEC-denominated.
  Tax-ready fiat books need per-tx valuation and gain/loss lots.
- **Recurring automation.** A run is created by hand each cycle. No schedules,
  withholding, invoices, or contributor self-service.

## Surface area

- UI: [`/payouts`](../../apps/demo/src/app/payouts/page.tsx) (runs and payees) and
  [`/payouts/[id]`](../../apps/demo/src/app/payouts/[id]/PayoutRunDetail.tsx) (run detail, batch QR, reconcile).
  Admin and treasurer only; viewers are redirected and the nav link is hidden, since payouts expose the
  payee address book and amounts.
- Lib: [`payouts.ts`](../../apps/demo/src/lib/payouts.ts) (URI build, ZIP 317 fee, pre-flight, approval state); reconciliation and approval HMAC helpers in [`db.ts`](../../apps/demo/src/lib/db.ts).
- API: `POST/GET /api/payees`, `/api/payouts`, `/api/payouts/[id]/items`, `/api/payouts/[id]/qr`, `/api/payouts/[id]/reconcile`, `/api/payouts/[id]/approve`, `/api/settings/approvals`.
- Regression test: `node scripts/e2e-payouts.mjs` against a `SIWZ_DEMO=1` server.

## Roadmap

- **PCZT + FROST.** Today the M-of-N gate is process-level. When wallet PCZT
  support and FROST signing libraries are usable in production, each "Approve"
  click in the ApprovalsPanel becomes a FROST share signature on the same
  payload hash. The data model is already shaped for it (approvals are HMAC'd
  to `(run, address, payload_hash)`); swap HMAC for FROST share and the UI
  stays the same.
- **PCZT one-click (option B).** Build the transaction in ZBooks from the viewing
  key, hand the unsigned PCZT to the treasurer's wallet (snap `signPczt`, or an
  in-browser wallet lib) to sign and broadcast. Removes the multi-recipient
  wallet requirement.
- **Per-row "Pay this one" QR.** A single-recipient fallback for treasurers stuck
  on a single-recipient wallet.
- **Dework / CSV import.** Pull completed tasks straight into a run.
