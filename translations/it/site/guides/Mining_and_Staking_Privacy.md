<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy del mining e dello staking

Il pagamento del tuo miner e il tuo finalizer non sono la stessa cosa. La chain non li collega mai. È utile, ed è facile sprecarlo.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Miner</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pagamento trasparente</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paga un indirizzo Zcash. La cronologia di un t-address è pubblica.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Chiave zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Una chiave ed25519. Firma i voti. Non è un indirizzo Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake schermato</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Si trova nella pool di staking. Indica un finalizer di destinazione.</p>
  </div>
</div>

## L'ordine che conta

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Mina</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Scherma</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Salta la schermatura e il passaggio privato non avviene mai. Un bond non cancella una coinbase trasparente.</p>
</div>

## Cosa è pubblico

| Elemento | Pubblico? | Perché |
|---|---|---|
| t-address del miner e cronologia coinbase | Sì | Output trasparenti normali |
| Chiave del finalizer e zfinv1 | Sì, una volta nel roster | Deve esserlo, per verificare i voti |
| Potere di voto e banca delle ricompense | Sì | Pubblicati rispetto alla chiave del finalizer |
| Quale indirizzo trasparente ha finanziato un bond | No, dopo una schermatura | Il bond spende note schermate |
| Collegamento dal tuo miner al tuo finalizer | Non sulla chain | Nulla nel protocollo lo scrive |

## Fai stake per te, o per qualcun altro

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond al tuo finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">La soluzione più semplice. Mantieni il ruolo di operatore e il bond. Un osservatore non può comunque dimostrare, solo dai dati della chain, che il t-address e lo zfinv1 appartengano alla stessa persona.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond a un altro membro</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Il potere di voto appare sotto la loro chiave. Guadagnano la commissione del 10% del finalizer attivo. Tu mantieni il 90% che matura sul bond. Questo è il modello che smentisce la supposizione più ovvia.</p>
  </div>
</div>

Un gruppo può minare su indirizzi di pagamento separati, schermare e creare bond tra i membri. Questo rende molto più difficile affermare che «questo miner è questo finalizer». Non nasconde chi siano i finalizer, né nasconde il mining.

## Cosa non fa

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Non nascosto</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Chi sono i finalizer</li>
    <li>Quanto potere di voto ha ciascuno</li>
    <li>La tua cronologia di mining trasparente</li>
    <li>Un collegamento che crei off-chain: un IP, uno schema di pagamento, un operatore</li>
  </ul>
</div>

Lo zfinv1 di destinazione è all'interno dell'azione di staking. Qui la privacy riguarda la fonte dei fondi, non il nascondere la chiave di destinazione.

## Versione breve

Mina. Scherma. Poi crea un bond. L'indirizzo del miner e la chiave del finalizer rimangono scollegati, a meno che tu non li colleghi personalmente.
