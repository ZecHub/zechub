<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igwupụta ihe na ichekwa ihe nzuzo

Ụgwọ ọrụ gị maka igwu ala na ihe na-emechi ihe gị abụghị otu ihe. Agbụ ígwè ahụ anaghị ejikọta ha.

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

## Usoro dị mkpa

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

## Gịnị bụ ọha na eze

| Ihe | Ọha? | Gịnị kpatara ya |
|---|---|---|
| Adreesị T-onye na-egwuputa ihe na akụkọ ihe mere eme nke coinbase | Ee | Nkịtị ihe na-apụta ìhè |
| Igodo Finalizer na zfinv1 | Ee, otu mgbe ọ nọ na ndepụta ahụ | Ọ ghaghị ịbụ, iji nyochaa votu |
| Ike ntuli aka na ụlọ akụ ụgwọ ọrụ | Ee | Ebipụtara ya n'elu igodo mmechi ka e wee nyochaa nkesa òkè |
| Adreesị doro anya nke kwadoro ego mgbazinye ego | Mba, mgbe ọta gasịrị | Njikọ ahụ na-emefu ego echekwara |
| Njikọ site na igwe ihe ị na-egwupụta ihe na ihe na-eme ka ihe dị n'ime ala gị gaa na ihe na-eme ka ihe dị n'ime ya dị n | Abụghị na agbụ ígwè | Ọ dịghị ihe ọ bụla dị na protocol na-ede ya |

A na-ekpughe ego e tinyere n'ime ihe e ji mee ihe n'ebumnobi. Nhazi ahụ chọrọ ka mkpokọta ego e tinyere na nkesa ndị na-emecha ihe niile bụrụ nke a pụrụ ịlele n'ihu ọha. Ngụkọta (ike nke 10) na windo staking edobere na-ebelata oge ma ọ bụ ozi nhazi nke onye ọ bụla na-awụpụ ebe ọ ka na-ekwe ka nyocha ahụ mee. Ọnụ ego Orchard a na-anaghị etinye n'ihe ndị ọzọ na-anọ n'onwe ya; staking bụ mkpughe ebumnuche.

## Kpọọ onwe gị, ma ọ bụ onye ọzọ

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond to your own finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Simplest. You keep the operator role and the bond. An observer still cannot prove the t-address and the zfinv1 are one person from chain data alone.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond to another member</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">The voting power shows under their key. They earn the 10% active-finalizer commission. You keep the 90% that accrues on the bond. This breaks the obvious guess that the miner receiving the transparent payout is the same person operating the finalizer.</p>
  </div>
</div>

Otu nwere ike igwu ala na adreesị ịkwụ ụgwọ dị iche iche, ihe nchebe, na njikọ n'etiti ndị otu. Nke a na-eme ka "onye na-egwu ala a bụ onye na-egwu ala a" sie ike karịa ikwu site na data agbụ ígwè. Ọ naghị ezochi ndị bụ ndị na-egwu ala, ọ naghịkwa ezochi ndị na-egwu ala.

## Ihe a na-anaghị eme

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Not hidden</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

Zfinv1 bụ ihe a na-achọ ime n'ime ihe gbasara itinye ego. Nzuzo ebe a bụ maka isi iyi ego ahụ, ọ bụghị maka izochi igodo ebe a na-aga.

## Ụdị dị mkpirikpi

Nke m. Ihe nchekwa. Mgbe ahụ jikọọ. Adreesị onye na-egwuputa ihe na igodo njedebe anaghị enwe njikọ ọ gwụla ma ị jikọọ ha n'onwe gị.
