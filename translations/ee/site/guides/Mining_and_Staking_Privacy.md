<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Tomenukuƒewo kple ame ŋutɔ ƒe nyawo tsɔtsɔ de afɔku me

Wò tomenukulawo ƒe fetu kple wò finalizer menye nu ɖeka o. Kɔsɔkɔsɔa metsɔa wo doa ka kple wo nɔewo gbeɖe o.

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

## Ðoɖo si le vevie

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

## Nusi le dutoƒo

| Nu | Amedome? | Nu ka ta |
|---|---|---|
| Miner t-adrɛs kple coinbase ŋutinya | Ɛ̃ | Nusiwo dona tso eme si me kɔ si sɔ |
| Nuwuwu ƒe safui kple zfinv1 | Ẽ, zi ɖeka le ŋkɔwo ƒe xexlẽdzesiwo me | Ele be wòanɔ nenema, be woaɖo kpe akɔdadawo dzi |
| Akɔdada ƒe ŋusẽ kple teƒeɖoɖo ƒe gadzraɖoƒe | Ɛ̃ | Wotae ɖe finalizer key ŋu ale be woate ŋu awɔ stake mama ƒe agbalẽdzikpɔkpɔ |
| Adrɛs si me kɔ si me wokpɔa ga le be woatsɔ axe fe ɖe gaxɔgbalẽvi aɖe ta | Ao, le akpoxɔnu aɖe megbe | Bond la zãa gagbalẽ siwo ŋu wokpɔ ta na |
| Kadodo tso wò tomenukulawo gbɔ va ɖo wò finalizer gbɔ | Menye ɖe kɔsɔkɔsɔ dzi o | Naneke mele ɖoɖowɔɖia me ŋlɔnɛ o |

Woɖoe koŋ ɖea ga home siwo wotsɔ de afɔku me fiana. Aɖaŋua hiã be woatsɔ nusiwo katã wotsɔ de afɔku me kple emama le finalizers dome be woate ŋu alé ŋku ɖe eŋu le dutoƒo. Agbɔsɔsɔme (ŋusẽ 10) kple fesre siwo woɖo ɖe ati ŋu la ɖoa seɖoƒe na ɣeyiɣi alo nɔnɔme ŋuti nyatakaka ɖekaɖekawo ƒe agbɔsɔsɔme si dona esime wogaɖea mɔ ɖe agbalẽdzikpɔkpɔ ma ŋu kokoko. Unstaked Orchard ga si susɔ la nɔa ame ŋutɔ si; staking nye nusi woɖo koŋ ɖee ɖe go.

## Tsɔe de ati ŋu na ɖokuiwò, alo na ame bubu

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

Ƒuƒoƒo aɖe ate ŋu aku tome le fexexe ƒe adrɛs vovovowo dzi, akpoxɔnu, kple kadodo le hameviwo dome. Ema na be "tomenukuƒe siae nye finalizer sia" sesẽna ŋutɔ be woagblɔ tso kɔsɔkɔsɔ ƒe nyatakakawo me. Meɣlaa amesiwo nye ame mamlɛawo o, eye meɣlaa tomenukuƒea hã o.

## Nusi esia mewɔna o

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Not hidden</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Who the finalizers are</li>
    <li>How much voting power each one has</li>
    <li>Your transparent mining history</li>
    <li>A link you create off-chain: one IP, one payout pattern, one operator</li>
  </ul>
</div>

Taɖodzinu zfinv1 le staking action la me. Ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla le afisia ku ɖe ga la tsoƒe ŋu, ke menye be woaɣla teƒe si woɖo tae ƒe safui o.

## Kpuie ko la

Tɔnye. Akpoxɔnu. Emegbe kadodo. Tomenukuƒea ƒe adrɛs kple finalizer key nɔa kadodo aɖeke me o negbe ɖe wò ŋutɔ nèdo ka kpli wo hafi.
