# Domande frequenti

Un elenco delle domande più comuni su Zcash. Per risolvere i problemi del client Zcash, consulta la [guida ufficiale alla risoluzione dei problemi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigazione rapida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Che cos'è Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Come posso acquisire Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Differenza rispetto ad altre criptovalute?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governance del protocollo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Dov'è la mia transazione?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash è davvero privato?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Idee sbagliate comuni</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ha smesso di funzionare?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Spostare il mio portafoglio su Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Che cos'è Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Quale full node?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Cercare un termine?</a>
</div>

---

## Che cos'è Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è una valuta digitale con transazioni rapide, riservate e commissioni basse. La privacy è la caratteristica centrale di Zcash. Ha aperto la strada all'uso delle prove a conoscenza zero per crittografare tutte le transazioni.

Sono disponibili diversi portafogli per pagamenti istantanei, mobili, sicuri e privati: [Portafogli](/using-zcash/wallets)

</div>

## Come posso acquisire Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Puoi acquistare ZEC su [exchange custodial](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) o [piattaforme centralizzate di scambio](/using-zcash/centralized-swaps).

Puoi anche acquistare Zcash peer-to-peer oppure ottenerlo tramite il mining.

</div>

## Qual è la differenza tra Zcash e altre criptovalute?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è fondamentalmente più privato di Bitcoin o Ethereum. Offre tempi di blocco rapidi (75 secondi), commissioni basse e aggiornamenti regolari.

Gli utenti possono scegliere tra transazioni **Trasparenti** o **Schermate**. Per ulteriori informazioni, consulta [Un ecosistema schermato](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Come viene governato il protocollo di Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Il protocollo è governato dal processo di **Zcash Improvement Proposal (ZIP)**. Chiunque può presentare una bozza di ZIP. Le bozze vengono discusse dalla comunità e accettate o respinte dagli editor di ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Le decisioni vengono scritte nella specifica e ratificate on-chain quando la rete le adotta.

</div>

## Dov'è la mia transazione?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Leggi prima [la nostra guida ai block explorer](/guides/blockchain-explorers). Poi controlla [Zcash Block Explorer](https://zcashblockexplorer.com).

Le transazioni scadono dopo circa 25 minuti (20 blocchi) e i fondi vengono restituiti automaticamente.

**Motivi comuni per cui una transazione potrebbe non comparire:**

- Perdita di connettività
- Commissione di transazione troppo bassa
- Sovraccarico della rete
- Troppi input trasparenti (dimensione eccessiva)

**Suggerimenti per riuscire:**

- Usa una connessione stabile
- Paga la commissione standard (o una più alta per la priorità)
- Attendi e riprova più tardi
- Usa meno input per mantenere piccola la transazione

</div>

## Zcash è davvero privato?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sì.** Zcash crittografa i dati del mittente, dell'importo e del destinatario per le transazioni schermate.

Zcash **non**:

- Crittografa le transazioni multifirma (integrazione di FROST in attesa)
- Protegge dalle correlazioni con le transazioni trasparenti
- Nasconde gli indirizzi IP

Per approfondire: [Un ecosistema schermato](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ha smesso di funzionare, cosa devo eseguire ora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd è stato ritirato. La versione 6.20.0 si è arrestata al blocco 3417100 il 18 luglio 2026 e non ha mai supportato Ironwood (NU6.3), quindi non esiste una versione successiva a cui effettuare l'aggiornamento.

Esegui invece lo stack Z3. Tre programmi dividono il lavoro che zcashd svolgeva da solo:

- **[Zebra](/zcash-tech/zebra-full-node)** convalida la chain
- **[Zaino](/zcash-tech/zaino)** la indicizza e fornisce i dati del portafoglio
- **[Zallet](/zcash-tech/zallet)** conserva i tuoi fondi

[Zakura](/zcash-tech/zakura-node) è un full node alternativo. Esegue anche zcashd sopra di sé, il che aiuta se altro software si aspetta ancora la vecchia interfaccia.

Inizia con la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Come sposto il mio portafoglio zcashd su Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migra un `wallet.dat` esistente, quindi mantieni i tuoi fondi e indirizzi.

Prima esegui il backup di `wallet.dat`, poi segui la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet). Conserva il backup finché non avrai confermato il tuo saldo in Zallet.

Il riferimento rapido [Zallet](/using-zcash/zallet-quick-reference-guide) copre i comandi quotidiani una volta completata la migrazione.

</div>

## Che cos'è Ironwood e devo fare qualcosa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood è l'aggiornamento di rete NU6.3, attivo sulla mainnet dal blocco 3.428.143 il 28 luglio 2026. Aggiunge una pool schermata basata su un circuito corretto e sigilla la pool [Orchard](/using-zcash/shielded-pools) più vecchia, così chiunque può verificare che non sia stato forgiato alcun ZEC.

**Se possiedi fondi schermati, potrebbe essere necessario spostarli.** Il valore esce da Orchard soltanto attraverso [il turnstile (tornello)](/zcash-tech/the-turnstile) e i portafogli gestiscono lo spostamento in momenti e modi diversi. Chiedi al fornitore del tuo portafoglio prima di spostare manualmente qualsiasi cosa.

Leggi [Ironwood](/zcash-tech/ironwood) per sapere cosa è cambiato e perché.

</div>

## Quale full node dovrei eseguire?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** è il sostituto diretto di zcashd e il nodo presupposto dalla guida alla migrazione. Sceglilo, a meno che tu non abbia un motivo per non farlo.

**[Zakura](/zcash-tech/zakura-node)** è una seconda implementazione pensata per la scalabilità, con sincronizzazione più rapida e pruning nativo dei blocchi. Sceglilo se ti servono queste funzionalità o se dipendi da software che comunica ancora con zcashd.

Entrambi convalidano la stessa chain, quindi è una scelta operativa anziché di consenso.

</div>

## Dove posso cercare un termine in una nota di rilascio?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulta la [Zcash Library](/glossary-and-faqs/zcash-library). Copre il software per nodi e portafogli, le pool schermate e i numeri ZIP che compaiono più spesso.

</div>

## Alcune idee sbagliate comuni

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Idea sbagliata</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Risposta corretta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash è una moneta centralizzata?</td>
      <td className="py-4 px-5 text-foreground">No. Un accordo sul marchio impedisce a Zcash Foundation o ECC di agire contro il consenso della comunità. La governance è dimostrabilmente decentralizzata (consulta il [rapporto Messari](https://messari.io/report/decentralizing-zcash)). I sondaggi della comunità, ZecHub e l'A/V Club di Zcash Foundation consentono tutti un'ampia partecipazione.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ha una backdoor?</td>
      <td className="py-4 px-5 text-foreground">No. Né Zcash né alcun software crittografico che abbiamo creato contiene una backdoor, né la conterrà mai.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash è controllato da una società?</td>
      <td className="py-4 px-5 text-foreground">Falso. Sebbene collaboriamo con aziende per la ricerca, Zcash resta impegnato nella decentralizzazione. Diverse organizzazioni autonome lavorano insieme per l'autocustodia e i diritti alla privacy.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ha una privacy limitata rispetto ad altre privacy coin</td>
      <td className="py-4 px-5 text-foreground">No. La privacy in stile Monero/Grin si basa su esche (che possono essere sconfitte). Zcash crittografa tutti i dati delle transazioni schermate, quindi ogni transazione nella pool è indistinguibile. Consulta [Non abbastanza privato?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Ultimo aggiornamento:** ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
