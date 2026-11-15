<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacy del mining e dello staking

Il pagamento del tuo miner e il tuo finalizer non sono la stessa cosa. La chain non li collega mai.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Miner</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pagamento trasparente</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paga verso un indirizzo Zcash. La cronologia di un t-address è pubblica.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">chiave zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Una chiave ed25519. Firma i voti. Non è un indirizzo Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Vincolo</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake schermato</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Vive nella pool di staking. Indica un finalizer di destinazione.</p>
  </div>
</div>

## L'ordine che conta

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Mina</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Scherma</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Vincola</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Salta la schermatura e il passo privato non avviene mai. Un vincolo non cancella una coinbase trasparente.</p>
</div>

## Cosa è pubblico

| Cosa | Pubblico? | Perché |
|---|---|---|
| t-address del miner e cronologia della coinbase | Sì | Output trasparenti normali |
| Chiave del finalizer e zfinv1 | Sì, una volta nel roster | Deve esserlo, per verificare i voti |
| Potere di voto e banca delle ricompense | Sì | Pubblicati insieme alla chiave del finalizer, così che la distribuzione dello stake possa essere verificata |
| Quale indirizzo trasparente ha finanziato un vincolo | No, dopo una schermatura | Il vincolo spende note schermate |
| Collegamento dal tuo miner al tuo finalizer | Non on-chain | Nulla nel protocollo lo registra |

Gli importi in stake sono rivelati di proposito. Il design richiede che il totale in stake e la distribuzione tra i finalizer siano verificabili pubblicamente. La quantizzazione (potenze di 10) e le finestre di staking fisse limitano quante informazioni individuali su tempi e schemi si rivelano, pur consentendo quell'audit. I saldi Orchard non in stake restano privati; lo staking è la divulgazione intenzionale.

## Fai stake a te stesso o a qualcun altro

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Vincola verso il tuo stesso finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">La soluzione più semplice. Mantieni il ruolo di operatore e il vincolo. Un osservatore non può comunque dimostrare, dai soli dati on-chain, che il t-address e la zfinv1 appartengano alla stessa persona.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Vincola verso un altro membro</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Il potere di voto appare sotto la loro chiave. Loro incassano la commissione del 10% da finalizer attivo. Tu mantieni il 90% che matura sul vincolo. Questo spezza l'ipotesi ovvia che il miner che riceve il pagamento trasparente sia la stessa persona che gestisce il finalizer.</p>
  </div>
</div>

Un gruppo può minare su indirizzi di pagamento separati, schermare e vincolare tra i membri. Questo rende molto più difficile affermare dai dati on-chain che "questo miner è questo finalizer". Non nasconde chi sono i finalizer e non nasconde il mining.

## Cosa questo non fa

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Non nascosto</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Chi sono i finalizer</li>
    <li>Quanto potere di voto ha ognuno</li>
    <li>La tua cronologia di mining trasparente</li>
    <li>Un collegamento che crei off-chain: un IP, uno schema di pagamento, un operatore</li>
  </ul>
</div>

La zfinv1 di destinazione si trova dentro l'azione di staking. La privacy qui riguarda l'origine dei fondi, non il nascondere la chiave di destinazione.

## Versione breve

Mina. Scherma. Poi vincola. L'indirizzo del miner e la chiave del finalizer restano senza alcun collegamento, a meno che tu non li colleghi tu stesso.
