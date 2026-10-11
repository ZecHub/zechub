<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Iwakusa ati fifi ikọkọ pamọ

Owó tí a ó san fún awakùsà àti ohun tí a ó fi parí iṣẹ́ náà kì í ṣe ohun kan náà. Ẹ̀wọ̀n náà kò so wọ́n pọ̀ rárá. Ó wúlò, ó sì rọrùn láti fi ṣòfò.

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

## Àṣẹ tó ṣe pàtàkì

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

## Kí ni gbogbo ènìyàn

| Ohun | Gbangba? | Kílódé? |
|---|---|---|
| Àdírẹ́sì T-Miner àti ìtàn coinbase | Bẹ́ẹ̀ni | Awọn abajade gbangba deede |
| Kọ́kọ́rọ́ ìparí àti zfinv1 | Bẹẹni, lẹẹkan ninu akojọ awọn eniyan | Ó gbọ́dọ̀ jẹ́ bẹ́ẹ̀, láti rí i dájú pé àwọn ìbò fìdí múlẹ̀ |
| Agbara idibo ati banki ere | Bẹ́ẹ̀ni | A tẹ̀jáde sí orí kọ́kọ́rọ́ ìparí |
| Àdírẹ́sì tí ó ṣe kedere wo ló fún owó ìdókòwò kan | Rárá, lẹ́yìn ààbò kan | Ìdánwò náà ń ná àwọn àkọsílẹ̀ ààbò |
| Ìjápọ̀ láti ọ̀dọ̀ awakùsà rẹ sí olùṣe ìparí rẹ | Kò sí lórí ẹ̀wọ̀n | Kò sí ohun tó kọ nínú ìlànà náà nínú rẹ̀ |

## Ṣe ìforígbárí fún ara rẹ, tàbí fún ẹlòmíràn

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

Ẹgbẹ́ kan lè wakọ̀ lórí àwọn àdírẹ́sì ìsanwó ọ̀tọ̀ọ̀tọ̀, ààbò, àti ìdènà láàárín àwọn ọmọ ẹgbẹ́. Èyí mú kí ó ṣòro láti sọ pé “awakọ̀ yìí ni olùṣe ìparí yìí”. Kò fi ẹni tí ó ṣe ìparí náà pamọ́, bẹ́ẹ̀ ni kò fi ìwakùsà náà pamọ́.

## Ohun tí èyí kò ṣe

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Not hidden</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

Zfinv1 tí a fẹ́ fojú sí wà nínú ìgbésẹ̀ ìgbésẹ̀ ìgbésẹ̀. Ìpamọ́ níbí yìí dá lórí orísun owó náà, kì í ṣe nípa fífi kọ́kọ́rọ́ ibi tí a fẹ́ dé pamọ́.

## Ẹ̀yà kúkúrú

Tèmi. Ààbò. Lẹ́yìn náà, so mọ́. Àdírẹ́sì awakùsà àti kọ́kọ́rọ́ ìparí kò ní ìbáṣepọ̀ àyàfi tí o bá so wọ́n pọ̀ fúnra rẹ.
