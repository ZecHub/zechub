<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aŋlɔ axa"/>
</a>

# Nukuku [Mining] kple ga ƒuƒoƒo [staking] ƒe ɣaɣla [privacy]

Wò nukula [miner] ƒe fetu xɔxɔ kple wò nuwuwu dɔwɔla [finalizer] menye nu ma ke o. Ɖoɖonu [chain] la meɖea wo dome kpɔ o.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Nukula</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Nuwo ƒe ʋuʋuɖi [Transparent] fetu xɔxɔ</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase ƒoa fetu na Zcash gaɖoƒe ƒe dzesi [address]. T-gaɖoƒe ƒe dzesi ƒe ŋutinya le dukɔme.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Nuwuwu dɔwɔla</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 kɔkɔe</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">E nye ed25519 kɔkɔe. Etsɔa asi ɖe akɔmeɖeɖewo ŋu. Menye Zcash gaɖoƒe ƒe dzesi o.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Ga si wode ɖe asi</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Ɣaɣla [Shielded] ga ƒuƒoƒo</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Ele ga ƒuƒoƒo ƒe gaƒuƒoƒo [pool] me. Eɖoa dzesi nuwuwu dɔwɔla si woɖo taɖodzinu na.</p>
  </div>
</div>

## Ɖoɖo si le vevie

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Ɖe nukuku</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Ɖe ɣaɣla</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Ɖe ga ɖe asi</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Ne nèle ɣaɣla ƒe afɔ la tsoe la, dɔ si le ɣaɣla me va eme o. Ga si wode ɖe asi meɖea nuwo ƒe ʋuʋuɖi coinbase ɖa o.</p>
</div>

## Nu si le dukɔme

| Nu | Le dukɔme? | Nu ka ta |
|---|---|---|
| Nukula ƒe t-gaɖoƒe ƒe dzesi kple coinbase ƒe ŋutinya | Ẽ | Nuwo ƒe ʋuʋuɖi ƒe output wɔnɔa gbɔgbɔ |
| Nuwuwu dɔwɔla ƒe kɔkɔe kple zfinv1 | Ẽ, ne wotsɔe de xexlẽme ko | Ele be wòanɔ ale, be woate ŋu ada akɔmeɖeɖewo ƒe nyateƒe |
| Akɔmeɖeɖe ƒe ŋusẽ kple fetu ƒe bank | Ẽ | Woaɖe eƒe nyatakakawo fia le nuwuwu dɔwɔla ƒe kɔkɔe ŋu, be woate ŋu akpɔ ga ƒuƒoƒo ƒe mamã kpɔ |
| Nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi si tso ga si wode ɖe asi me | Ao, le ɣaɣla megbe | Ga si wode ɖe asi la zaa ɣaɣla didienuwo [notes] |
| Kadodo tso wò nukula gbɔ yi wò nuwuwu dɔwɔla gbɔ | Menye ɖoɖonu dzi o | Naneke mele protocol la me si ŋlɔa esia o |

Wofia ga si woƒu ƒo ɖe asi la ƒe agbɔsɔsɔ ta. Moɖoɖo la hiã be ame sia ame nate ŋu akpɔ ga si woƒu ƒo ɖe asi katã kple mamã si le nuwuwu dɔwɔlawo dome. Quantization (10 ƒe ŋusẽwo) kple ga ƒuƒoƒo ƒe ɣeyiɣi si woɖo ɖe anyi la dea alɔ ɖe alesi ame ƒe ɣeyiɣi alo nɔnɔme ƒe nyatakaka geɖe adzudzɔ le eme ŋu, ke hã wɔa be wòate ŋu awɔ kpɔkpɔ ma. Orchard ƒe balance si mewoƒu ƒo ɖe asi o la nɔa ɣaɣla me; ga ƒuƒoƒo nye nyatakaka fiafia si woɖo taɖodzinu na.

## Ɖe ga ɖe asi na ɖokuiwò, alo na ame bubu

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Ɖe ga ɖe asi na wò ŋutɔ ƒe nuwuwu dɔwɔla</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Eyae le bɔbɔe wu. Nèle dɔwɔla ƒe nɔƒe kple ga si wode ɖe asi la ɖe asi. Kpɔla aɖeke mate ŋu aɖe kpeɖeŋu be t-gaɖoƒe ƒe dzesi kple zfinv1 nye ame ɖeka tɔ tso ɖoɖonu ƒe nyatakakawo ko me o.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Ɖe ga ɖe asi na hata ƒe ame bubu</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Akɔmeɖeɖe ƒe ŋusẽ aɖe eɖokui fia le woƒe kɔkɔe te. Woxɔa 10% active-finalizer commission. Èle 90% si ƒoa nu le ga si wode ɖe asi la ŋu. Esia tsena ɖe ame ƒe susu ɖa be nukula si xɔa nuwo ƒe ʋuʋuɖi fetu la nye ame ma ke si wɔa nuwuwu dɔwɔla ƒe dɔ la.</p>
  </div>
</div>

Hata aɖe ate ŋu awɔ nukuku le fetu xɔxɔ ƒe gaɖoƒe ƒe dzesi vovovowo dzi, aɖe wo ɖe ɣaɣla me, eye wòaɖe ga ɖe asi le hata ƒe amewo dome. Esia wɔa be nya sia be "nukula sia nye nuwuwu dɔwɔla sia" nana wòsesẽ be ame aɖe aɖe kpeɖeŋu tso ɖoɖonu ƒe nyatakakawo me. Menye nuwuwu dɔwɔlawo ƒe ameame wɔa ɣaɣla o, eye menye nukuku hã wɔa ɣaɣla o.

## Nu si esia mewɔ o

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Mewoa ɣaɣla o</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Ame siwo nye nuwuwu dɔwɔlawo</li>
    <li>Akɔmeɖeɖe ƒe ŋusẽ si ame sia ame si le</li>
    <li>Wò nuwo ƒe ʋuʋuɖi nukuku ƒe ŋutinya</li>
    <li>Kadodo si nèwɔ le ɖoɖonu me o: IP ɖeka, fetu xɔxɔ ƒe nɔnɔme ɖeka, dɔwɔla ɖeka</li>
  </ul>
</div>

zfinv1 si woɖo taɖodzinu na la le ga ƒuƒoƒo ƒe nufiafia la me. Ɣaɣla le afisia nye gaawo ƒe tete gbɔ, menye be woaɣla taɖodzinu ƒe kɔkɔe o.

## Nya kpui aɖe

Wɔ nukuku. Ɖe ɣaɣla. Emegbe la, ɖe ga ɖe asi. Nukula ƒe gaɖoƒe ƒe dzesi kple nuwuwu dɔwɔla ƒe kɔkɔe manya wo nɔewo o, negbe wò ŋutɔ nàtsɔ wo akɔ ɖe nɔewo ŋu.
