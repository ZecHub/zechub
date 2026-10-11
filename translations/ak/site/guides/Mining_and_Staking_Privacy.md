<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mining ne staking kokoam nsɛm

Wo miner payout ne wo finalizer nyɛ ade koro. Nkɔnsɔnkɔnsɔn no ntumi nkyekyere wɔn da. Ɛno so wɔ mfaso, na ɛnyɛ den sɛ wɔbɛsɛe no.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Miner</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Transparent payout</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase pays a Zcash address. A t-address history is public.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 key</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">An ed25519 key. It signs votes. It is not a Zcash address.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Shielded stake</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Lives in the staking pool. Names a target finalizer.</p>
  </div>
</div>

## Nhyehyɛe a ɛho hia

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Mine</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Shield</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Skip the shield and the private step never happens. A bond does not erase a transparent coinbase.</p>
</div>

## Nea ɛyɛ baguam

| Adeɛ | Dwam? | Adɛn |
|---|---|---|
| Miner t-address ne coinbase abakɔsɛm | Aane | Normal transparent outputs |
| Finalizer safoa ne zfinv1 | Yiw, pɛnkoro wɔ roster no mu | Ɛsɛ sɛ ɛyɛ, na ama wɔagye abatow ahorow no atom |
| Abatow tumi ne akatua sikakorabea | Aane | Wotintimii tiaa finalizer safoa no |
| Address a ɛda adi pefee bɛn na ɛde sika ma bond | Dabi, wɔ kyɛm akyi | Bond no sɛe sika a wɔabɔ ho ban |
| Link fi wo miner no so kɔ wo finalizer so | Ɛnyɛ nkɔnsɔnkɔnsɔn so | Biribiara nni protocol no mu a ɛkyerɛw |

## Stake ma wo ho, anaa obi foforo

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond to your own finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Simplest. You keep the operator role and the bond. An observer still cannot prove the t-address and the zfinv1 are one person from chain data alone.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond to another member</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">The voting power shows under their key. They earn the 10% active-finalizer commission. You keep the 90% that accrues on the bond. This is the pattern that breaks the obvious guess.</p>
  </div>
</div>

Kuw bi betumi atu fagude wɔ address ahorow a wɔde tua ka, kyɛm, ne bond a ɛwɔ asɔremma nyinaa so. Ɛno ma ɛyɛ den kɛse sɛ wɔbɛka sɛ "saa miner yi ne finalizer yi". Ɛmfa wɔn a wɔyɛ awieɛ no nsie, na ɛnsie wɔn a wɔtu fagudeɛ no.

## Nea eyi nyɛ

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Not hidden</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

Botae zfinv1 no wɔ staking adeyɛ no mu. Kokoamsɛm a ɛwɔ ha no fa sika no fibea ho, na ɛnyɛ sɛ wode safe a wode bɛkɔ no besie.

## Nkyerɛase tiawa

Me deɛ. Bɔ ban. Afei bond. Miner address ne finalizer key no kɔ so yɛ nea enni abusuabɔ gye sɛ w’ankasa wode abɔ mu.
