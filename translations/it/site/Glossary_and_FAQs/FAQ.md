# Domande frequenti

Una raccolta delle domande più comuni su Zcash. Per la risoluzione dei problemi del client Zcash, consulta la [guida ufficiale per la risoluzione dei problemi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigazione rapida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Che cos'è Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Come posso acquisire Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Differenze rispetto alle altre criptovalute?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governance del protocollo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Dov'è la mia transazione?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash è davvero privato?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Malintesi comuni</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ha smesso di funzionare?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Spostare il mio portafoglio su Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Che cos'è Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Quale full node (nodo completo)?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Dove cerco un termine?</a>
</div>

---

## Che cos'è Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è una valuta digitale con transazioni rapide e riservate e commissioni basse. La privacy è la caratteristica centrale di Zcash. Ha aperto la strada all'uso delle prove a conoscenza zero per crittografare tutte le transazioni.

Sono disponibili diversi portafogli per pagamenti istantanei, mobili, sicuri e privati: [Portafogli](/using-zcash/wallets)

</div>

## Come posso acquisire Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Puoi comprare ZEC su [exchange custodial (custodia di terzi)](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) o [piattaforme di scambio centralizzate](/using-zcash/centralized-swaps).

Puoi anche acquistare Zcash peer-to-peer o ottenerla tramite mining.

</div>

## Qual è la differenza tra Zcash e le altre criptovalute?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è fondamentalmente più privato di Bitcoin o Ethereum. Offre tempi di blocco rapidi (25 secondi dall'attivazione di NU7 a novembre 2026, in calo dai 75 secondi), commissioni basse e aggiornamenti regolari.

Gli utenti possono scegliere tra transazioni **trasparenti** o **schermate**. Per ulteriori informazioni consulta [Un ecosistema schermato](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Come è governato il protocollo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Il protocollo è governato dal processo **Zcash Improvement Proposal (ZIP)**. Chiunque può presentare una bozza di ZIP. Le bozze sono dibattute dalla community e accettate o respinte dai redattori di ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Le decisioni vengono scritte nella specifica e ratificate on-chain quando la rete le adotta.

</div>

## Dov'è la mia transazione?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Prima leggi la [nostra guida ai block explorer](/guides/blockchain-explorers). Poi controlla [Zcash Block Explorer](https://mainnet.zcashexplorer.app).

Non esiste una scadenza fissa di 25 minuti né un timer di rimborso automatico. Controlla l'altezza di scadenza registrata dal tuo portafoglio e se il pagamento originale è stato minato. Se è scaduto senza essere minato, non si è concluso on-chain; la scadenza non crea una transazione di rimborso. Lascia che il portafoglio si sincronizzi prima di seguire le sue indicazioni per riprovare. Vedi [la risoluzione dei problemi delle transazioni](/using-zcash/transactions#troubleshooting-stuck-transactions) e [ZIP 203](https://zips.z.cash/zip-0203).

**Motivi comuni per cui una transazione può non apparire:**

- Perdita di connettività
- Commissione della transazione troppo bassa
- Sovraccarico della rete
- Troppi input trasparenti (dimensione troppo grande)

**Consigli per riuscire:**

- Usa una connessione stabile
- Paga la commissione standard (o una più alta per avere priorità)
- Aspetta e riprova più tardi
- Usa meno input per tenere la transazione piccola

</div>

## Zcash è davvero privato?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sì.** Zcash crittografa i dati di mittente, importo e destinatario per le transazioni schermate.

Zcash **non**:

- Crittografa le transazioni multisignature (l'integrazione di FROST è in arrivo)
- Protegge dalle correlazioni con le transazioni trasparenti
- Nasconde gli indirizzi IP

Per approfondire: [Un ecosistema schermato](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ha smesso di funzionare, cosa eseguo ora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd è stato ritirato. La versione 6.20.0 si è spenta da sola al blocco 3417100 il 18 luglio 2026, e non ha mai supportato Ironwood (NU6.3), quindi non esiste una versione successiva a cui aggiornarsi.

Esegui invece lo stack Z3. Tre programmi si dividono il lavoro che zcashd faceva da solo:

- **[Zebra](/zcash-tech/zebra-full-node)** valida la chain
- **[Zaino](/zcash-tech/zaino)** la indicizza e fornisce i dati dei portafogli
- **[Zallet](/zcash-tech/zallet)** custodisce i tuoi fondi

[Zakura](/zcash-tech/zakura-node) è un full node alternativo. Esegue anche zcashd sopra di sé, il che aiuta se altro software si aspetta ancora la vecchia interfaccia.

Inizia con la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Come sposto il mio portafoglio zcashd su Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migra un `wallet.dat` esistente, così mantieni i tuoi fondi e i tuoi indirizzi.

Prima fai un backup di `wallet.dat`, poi segui la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet). Conserva quel backup finché non hai confermato il tuo saldo in Zallet.

Il [Zalletriferimento rapido](/using-zcash/zallet-quick-reference-guide) copre i comandi di uso quotidiano una volta che ci hai preso la mano.

</div>

## Che cos'è Ironwood, e devo fare qualcosa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood è l'aggiornamento di rete NU6.3, attivo sulla mainnet dal blocco 3.428.143 del 28 luglio 2026. Aggiunge una pool schermata costruita su un circuito corretto e sigilla la vecchia pool [Orchard](/using-zcash/shielded-pools), così chiunque può verificare che nessun ZEC sia stato falsificato.

**Se detieni fondi schermati, potrebbe essere necessario spostarli.** Il valore esce da Orchard solo attraverso [il turnstile (tornello)](/zcash-tech/the-turnstile), e i portafogli gestiscono lo spostamento in momenti e in modi diversi. Chiedi al fornitore del tuo portafoglio prima di spostare qualcosa a mano.

Leggi [Ironwood](/zcash-tech/ironwood) per scoprire cosa è cambiato e perché.

</div>

## Quale full node dovrei eseguire?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** è il sostituto diretto di zcashd ed è il nodo che la guida alla migrazione presuppone. Sceglilo a meno che tu non abbia un motivo per non farlo.

**[Zakura](/zcash-tech/zakura-node)** è una seconda implementazione pensata per la scala, con sincronizzazione più rapida e potatura dei blocchi nativa. Scegliolo se ti servono queste caratteristiche, o se dipendi da software che parla ancora con zcashd.

Entrambi validano la stessa chain, quindi è una scelta operativa più che di consenso.

</div>

## Dove cerco un termine di una nota di rilascio?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulta la [Libreria Zcash](/glossary-and-faqs/zcash-library). Copre il software per nodi e portafogli, le pool schermate e i numeri di ZIP che compaiono più spesso.

</div>

## Alcuni malintesi comuni

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Malinteso</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Risposta corretta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash è una valuta centralizzata?</td>
      <td className="py-4 px-5 text-foreground">No. Un accordo sul marchio impedisce a Zcash Foundation o a ECC di agire contro il consenso della community. La governance è dimostrabilmente decentralizzata (vedi [il report di Messari](https://messari.io/report/decentralizing-zcash)). I sondaggi della community, ZecHub e l'Zcash Foundation A/V Club consentono tutti una partecipazione ampia.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ha una backdoor?</td>
      <td className="py-4 px-5 text-foreground">No. Né Zcash né alcun software crittografico che abbiamo sviluppato contiene una backdoor, e non la conterrà mai.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash è controllato da una società?</td>
      <td className="py-4 px-5 text-foreground">Errato. Sebbene collaboriamo con aziende per la ricerca, Zcash resta impegnato nella decentralizzazione. Diverse organizzazioni autonome lavorano insieme verso l'autocustodia e i diritti alla privacy.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ha una privacy limitata rispetto alle altre privacy coin</td>
      <td className="py-4 px-5 text-foreground">No. La privacy in stile Monero/Grin si basa su esche (che possono essere eluse). Zcash crittografa tutti i dati delle transazioni schermate, così ogni transazione nella pool è indistinguibile. Vedi [Non abbastanza privato?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Ultimo aggiornamento:** ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
