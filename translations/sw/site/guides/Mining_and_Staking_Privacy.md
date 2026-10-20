<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Uchimbaji madini na faragha ya kuweka akiba

Malipo yako ya wachimbaji madini na mkamilishaji wako si kitu kimoja. Mnyororo hauwaunganishi kamwe.

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

## Mpangilio muhimu

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

## Umma ni nini

| Kitu | Umma? | Kwa nini |
|---|---|---|
| Anwani ya t ya Miner na historia ya coinbase | Ndiyo | Matokeo ya kawaida ya uwazi |
| Kitufe cha mwisho na zfinv1 | Ndiyo, mara tu nilipoingia kwenye orodha ya wachezaji | Lazima iwe hivyo, ili kuthibitisha kura |
| Uwezo wa kupiga kura na benki ya zawadi | Ndiyo | Imechapishwa dhidi ya ufunguo wa mwisho ili usambazaji wa hisa uweze kukaguliwa |
| Ni anwani gani ya uwazi iliyofadhili dhamana | Hapana, baada ya ngao | Dhamana hutumia noti zilizolindwa |
| Kiungo kutoka kwa mchimbaji wako hadi kwa mmaliziaji wako | Sio kwenye mnyororo | Hakuna chochote katika itifaki kinachoandika |

Kiasi kilichowekwa kwenye dau hufichuliwa kwa makusudi. Muundo unahitaji jumla ya dau na usambazaji katika wakamilishaji ili uweze kukaguliwa hadharani. Upimaji (nguvu za 10) na madirisha ya kuweka dau yasiyobadilika hupunguza ni kiasi gani cha taarifa za muda au muundo wa mtu binafsi huvuja huku bado ikiruhusu ukaguzi huo. Mizani Orchard Isiyowekwa kwenye dau hubaki kuwa ya faragha; kuweka dau ni ufichuzi wa makusudi.

## Jiwekee dau mwenyewe, au kwa mtu mwingine

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

Kundi linaweza kuchimba madini kwa kutumia anwani tofauti za malipo, ngao, na dhamana kwa wanachama wote. Hilo hufanya "mchimbaji huyu ndiye mkamilishaji huyu" kuwa vigumu zaidi kudai kutoka kwa data ya mnyororo. Haifichi wakamilishaji ni akina nani, na haifichi uchimbaji madini.

## Kile ambacho hii haifanyi

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Not hidden</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

Zfinv1 inayolengwa iko ndani ya hatua ya kuweka dau. Faragha hapa inahusu chanzo cha fedha, si kuhusu kuficha ufunguo wa mwisho.

## Toleo fupi

Yangu. Ngao. Kisha funga. Anwani ya mchimbaji na ufunguo wa mwisho hubaki bila uhusiano isipokuwa uviunganishe mwenyewe.
