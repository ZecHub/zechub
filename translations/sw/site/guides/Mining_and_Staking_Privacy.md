<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri ukurasa"/>
</a>

# Faragha ya uchimbaji na kuweka sarafu

Malipo yako ya mchimbaji [miner] na kithibitishaji chako cha mwisho [finalizer] si kitu kimoja. Mnyororo [chain] hauviunganishi kamwe.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Mchimbaji</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Malipo ya uwazi [Transparent payout]</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase hulipa anwani ya uwazi [transparent] ya Zcash. Historia ya anwani ya t ni ya umma.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Kithibitishaji cha mwisho</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Ufunguo wa zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ufunguo wa ed25519. Hutia saini kura. Si anwani ya Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Dhamana</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Uwekezaji wa faragha [Shielded stake]</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Huwepo katika bwawa la kuweka sarafu [staking pool]. Hutaja kithibitishaji cha mwisho lengwa.</p>
  </div>
</div>

## Mpangilio muhimu

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Chimba</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Kinga</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Dhamana</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Ruka hatua ya kulinda na hatua ya faragha haitafanyika kamwe. Dhamana haifuti coinbase ya uwazi.</p>
</div>

## Kilicho wazi kwa umma

| Kitu | Cha umma? | Kwa nini |
|---|---|---|
| Anwani ya t ya mchimbaji na historia ya coinbase | Ndiyo | Matokeo ya kawaida ya uwazi |
| Ufunguo wa kithibitishaji cha mwisho na zfinv1 | Ndiyo, mara tu inapokuwa kwenye orodha | Lazima iwe hivyo ili kuthibitisha kura |
| Nguvu ya kupiga kura na hazina ya zawadi | Ndiyo | Huchapishwa dhidi ya ufunguo wa kithibitishaji cha mwisho ili mgawanyo wa uwekezaji uweze kukaguliwa |
| Anwani gani ya uwazi ilifadhili dhamana | Hapana, baada ya kulinda | Dhamana hutumia madokezo ya faragha [shielded notes] |
| Kiungo kutoka kwa mchimbaji wako hadi kithibitishaji chako cha mwisho | Si on-chain | Hakuna chochote katika itifaki kinachokiandika |

Kiasi kilichowekwa kinafichuliwa kwa makusudi. Muundo unahitaji jumla iliyowekwa na mgawanyo kati ya vithibitishaji vya mwisho uweze kukaguliwa hadharani. Ukadiriaji kwa viwango (nguvu za 10) na vipindi maalumu vya kuweka sarafu hupunguza kiasi cha taarifa binafsi za muda au muundo zinazovuja huku zikiruhusu ukaguzi huo. Salio la Orchard ambalo halijawekwa hubaki la faragha; kuweka sarafu ni ufichuzi wa kukusudia.

## Weka dhamana kwako mwenyewe, au kwa mtu mwingine

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Weka dhamana kwa kithibitishaji chako mwenyewe cha mwisho</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Rahisi zaidi. Unabaki na jukumu la mwendeshaji na dhamana. Mtazamaji bado hawezi kuthibitisha kwamba anwani ya t na zfinv1 ni za mtu mmoja kwa data ya mnyororo pekee.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Weka dhamana kwa mwanachama mwingine</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Nguvu ya kupiga kura huonekana chini ya ufunguo wao. Wanapata kamisheni ya 10% ya kithibitishaji cha mwisho kinachotumika. Unabaki na 90% inayoongezeka kwenye dhamana. Hii huvunja dhana ya wazi kwamba mchimbaji anayepokea malipo ya uwazi ndiye mtu yuleyule anayeendesha kithibitishaji cha mwisho.</p>
  </div>
</div>

Kikundi kinaweza kuchimba kwenye anwani tofauti za malipo, kulinda, na kuweka dhamana kati ya wanachama. Hilo hufanya dai la “mchimbaji huyu ni kithibitishaji hiki cha mwisho” kuwa gumu zaidi kuthibitisha kwa data ya mnyororo. Hilo halifichi vithibitishaji vya mwisho ni nani, wala halifichi uchimbaji.

## Kile ambacho hii haifanyi

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Havijafichwa</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Vithibitishaji vya mwisho ni nani</li>
    <li>Kila kimoja kina nguvu kiasi gani ya kupiga kura</li>
    <li>Historia yako ya uchimbaji wa uwazi</li>
    <li>Kiungo unachounda off-chain: IP moja, muundo mmoja wa malipo, mwendeshaji mmoja</li>
  </ul>
</div>

zfinv1 lengwa iko ndani ya kitendo cha kuweka sarafu. Faragha hapa inahusu chanzo cha fedha, si kuficha ufunguo lengwa.

## Toleo fupi

Chimba. Linda. Kisha weka dhamana. Anwani ya mchimbaji na ufunguo wa kithibitishaji cha mwisho hubaki bila uhusiano isipokuwa wewe mwenyewe uziunganishe.
