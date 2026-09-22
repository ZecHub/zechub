# Domande frequenti

Un elenco delle domande più comuni su Zcash. Per la risoluzione dei problemi del client Zcash, consulta la [guida ufficiale alla risoluzione dei problemi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigazione rapida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Cos'è Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Come posso acquistare Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Differenza rispetto ad altre criptovalute?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governance del protocollo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Dov'è la mia transazione?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash è davvero privato?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Idee sbagliate comuni</a>
</div>

---

## Cos'è Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è una valuta digitale con transazioni rapide, riservate e commissioni basse. La privacy è la caratteristica centrale di Zcash. Ha introdotto per primo l'uso delle prove a conoscenza zero per crittografare tutte le transazioni.

Sono disponibili diversi wallet per pagamenti istantanei, mobili, sicuri e privati: [Wallet](/using-zcash/wallets)

</div>

## Come posso acquistare Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Puoi acquistare ZEC su [exchange custodial](/using-zcash/custodial-exchanges), [DEX](/dex) o [piattaforme di swap centralizzate](/using-zcash/centralizedswaps).

Puoi inoltre acquistare Zcash peer-to-peer o ottenerlo tramite il mining.

</div>

## Qual è la differenza tra Zcash e le altre criptovalute?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash è fondamentalmente più privato di Bitcoin o Ethereum. Offre tempi di blocco rapidi (75 secondi), commissioni basse e aggiornamenti regolari.

Gli utenti possono scegliere tra transazioni **Trasparenti** o **Schermate**. Per ulteriori informazioni, consulta [Un ecosistema schermato](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Come viene governato il protocollo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Il protocollo è governato dal processo di **Zcash Improvement Proposal (ZIP)**. Chiunque può presentare una bozza di ZIP. Le bozze vengono discusse dalla comunità e accettate o respinte dai redattori di ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Le decisioni vengono inserite nella specifica e ratificate on-chain quando la rete le adotta.

</div>

## Dov'è la mia transazione?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Leggi innanzitutto [la nostra guida agli esploratori di blocchi](/guides/blockchain-explorers). Poi controlla [Zcash Block Explorer](https://zcashblockexplorer.com).

Le transazioni scadono dopo circa 25 minuti (20 blocchi) e i fondi vengono restituiti automaticamente.

**Motivi comuni per cui una transazione potrebbe non apparire:**

- Perdita di connettività
- Commissione di transazione troppo bassa
- Sovraccarico della rete
- Troppi input trasparenti (dimensione eccessiva)

**Suggerimenti per riuscirci:**

- Usa una connessione stabile
- Paga la commissione standard (o una più alta per la priorità)
- Attendi e riprova più tardi
- Usa meno input per mantenere piccola la transazione

</div>

## Zcash è davvero privato?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sì.** Zcash crittografa i dati del mittente, dell'importo e del destinatario per le transazioni schermate.

Zcash **non**:

- Crittografa le transazioni multifirma (integrazione con FROST in attesa)
- Protegge dalle correlazioni con le transazioni trasparenti
- Nasconde gli indirizzi IP

Per approfondire: [Un ecosistema schermato](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

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
      <td className="py-4 px-5 text-foreground">No. Un accordo sul marchio impedisce a Zcash Foundation o a ECC di agire contro il consenso della comunità. La governance è comprovabilmente decentralizzata (vedi il [report di Messari](https://messari.io/report/decentralizing-zcash)). I sondaggi della comunità, ZecHub e l'A/V Club di Zcash Foundation consentono tutti un'ampia partecipazione.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ha una backdoor?</td>
      <td className="py-4 px-5 text-foreground">No. Né Zcash né alcun software crittografico che abbiamo sviluppato contiene una backdoor, né mai la conterrà.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash è controllato da una società?</td>
      <td className="py-4 px-5 text-foreground">Falso. Sebbene collaboriamo con aziende per la ricerca, Zcash rimane impegnato nella decentralizzazione. Diverse organizzazioni autonome lavorano insieme per l'autocustodia e i diritti alla privacy.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash offre una privacy limitata rispetto ad altre monete orientate alla privacy</td>
      <td className="py-4 px-5 text-foreground">No. La privacy in stile Monero/Grin si basa su esche (che possono essere aggirate). Zcash crittografa tutti i dati delle transazioni schermate, quindi ogni transazione nel pool è indistinguibile. Vedi [Non abbastanza privato?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Ultimo aggiornamento:** marzo 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
