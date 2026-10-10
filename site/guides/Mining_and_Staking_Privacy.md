<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mining and staking privacy

Your miner payout and your finalizer are not the same thing. The chain never links them. That is useful, and it is easy to waste.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Miner</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950">Transparent payout</div>
    <p className="mt-1 text-sm text-emerald-800">Coinbase pays a Zcash address. A t-address history is public.</p>
  </div>
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950">zfinv1 key</div>
    <p className="mt-1 text-sm text-blue-800">An ed25519 key. It signs votes. It is not a Zcash address.</p>
  </div>
  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950">Shielded stake</div>
    <p className="mt-1 text-sm text-amber-800">Lives in the staking pool. Names a target finalizer.</p>
  </div>
</div>

## The order that matters

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-teal-700 px-3 py-1 text-sm text-white">1 Mine</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-700 px-3 py-1 text-sm text-white">2 Shield</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-700 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0">Skip the shield and the private step never happens. A bond does not erase a transparent coinbase.</p>
</div>

## What is public

| Thing | Public? | Why |
|---|---|---|
| Miner t-address and coinbase history | Yes | Normal transparent outputs |
| Finalizer key and zfinv1 | Yes, once on the roster | It has to be, to verify votes |
| Voting power and reward bank | Yes | Published against the finalizer key |
| Which transparent address funded a bond | No, after a shield | The bond spends shielded notes |
| Link from your miner to your finalizer | Not on chain | Nothing in the protocol writes it |

## Stake to yourself, or to someone else

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-200 p-4">
    <div className="font-semibold">Bond to your own finalizer</div>
    <p className="mt-2 mb-0 text-sm">Simplest. You keep the operator role and the bond. An observer still cannot prove the t-address and the zfinv1 are one person from chain data alone.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
    <div className="font-semibold">Bond to another member</div>
    <p className="mt-2 mb-0 text-sm">The voting power shows under their key. They earn the 10% active-finalizer commission. You keep the 90% that accrues on the bond. This is the pattern that breaks the obvious guess.</p>
  </div>
</div>

A group can mine on separate payout addresses, shield, and bond across members. That makes "this miner is this finalizer" much harder to claim. It does not hide who the finalizers are, and it does not hide the mining.

## What this does not do

<div className="my-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
  <div className="font-semibold text-rose-700">Not hidden</div>
  <ul className="mt-2 mb-0">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

The target zfinv1 is inside the staking action. Privacy here is about the source of the funds, not about hiding the destination key.

## Short version

Mine. Shield. Then bond. The miner address and the finalizer key stay unrelated unless you connect them yourself.
