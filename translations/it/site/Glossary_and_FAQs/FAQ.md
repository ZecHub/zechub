# Domande Frequenti

Un elenco delle domande più comuni su Zcash. Per la risoluzione dei problemi del client Zcash, consulta la [guida ufficiale alla risoluzione dei problemi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigazione Rapida
[Cos'è Zcash?](#what-is-zcash) | [Come acquisire Zcash?](#acquire) | [Differenza dalle altre criptovalute?](#difference) | [Governance del protocollo?](#governance) | [Dov'è la mia transazione?](#transaction) | [Zcash è davvero privato?](#privacy) | [Idee sbagliate comuni](#misconceptions)

---

## Cos'è Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash è una valuta digitale con transazioni veloci, confidenziali e commissioni basse. La privacy è la caratteristica centrale di Zcash. Ha aperto la strada all'uso delle prove a conoscenza zero per cifrare tutte le transazioni.  

Diversi portafogli sono disponibili per pagamenti istantanei, mobili, sicuri e privati: [Portafogli Mobili](https://z.cash/wallets/)
</div>

## Come posso acquisire Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Puoi acquistare ZEC su [exchange](https://z.cash/exchanges) di criptovalute.  
Puoi anche acquistare Zcash peer-to-peer o ottenerlo tramite mining.
</div>

## Qual è la differenza tra Zcash e altre criptovalute?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash è fondamentalmente più privato di Bitcoin o Ethereum. Offre tempi di blocco rapidi (75 secondi), commissioni basse e aggiornamenti regolari.  

Gli utenti possono scegliere tra transazioni **Transparent** o **Shielded**. Per maggiori informazioni, consulta [Un Ecosistema Shielded](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Come è governato il protocollo Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Il protocollo è governato dal processo **Zcash Improvement Proposal (ZIP)**. Chiunque può presentare una bozza di ZIP. Le bozze vengono discusse dalla comunità e accettate o respinte dagli editor ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Le decisioni vengono scritte nella specifica e ratificate on-chain quando la rete le adotta.
</div>

## Dov'è la mia Transazione?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Prima leggi [la nostra guida agli esploratori di blocchi](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Poi controlla [Zcash Block Explorer](https://zcashblockexplorer.com).  

Le transazioni scadono dopo circa 25 minuti (20 blocchi) e i fondi vengono restituiti automaticamente.  

**Motivi comuni per cui una transazione potrebbe non apparire:**
- Perdita di connettività
- Commissione di transazione troppo bassa
- Sovraccarico della rete
- Troppi input Transparent (dimensione eccessiva)

**Suggerimenti per riuscire:**
- Usa una connessione stabile
- Paga la commissione standard (o più alta per priorità)
- Aspetta e riprova più tardi
- Usa meno input per mantenere la transazione piccola
</div>

## Zcash è davvero Privato?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Sì.** Zcash cifra i dati del mittente, l'importo e il destinatario per le transazioni Shielded.  

Zcash **non**:
- Cifra le transazioni multifirma (integrazione FROST in sospeso)
- Protegge dalle correlazioni con le transazioni Transparent
- Nasconde gli indirizzi IP

Approfondimento: [Un Ecosistema Shielded](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Alcune idee sbagliate comuni

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Idee sbagliate</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Risposta corretta</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash è una moneta centralizzata?</td>
        <td className="py-5 px-6 text-foreground">No. Un accordo sul marchio impedisce alla Zcash Foundation o all'ECC di agire contro il consenso della comunità. La governance è dimostrata decentralizzata (vedi <a href="https://messari.io/report/decentralizing-zcash">rapporto Messari</a>). Sondaggi della comunità, ZecHub e Zcash Foundation A/V Club consentono tutti una vasta partecipazione.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash ha una backdoor?</td>
        <td className="py-5 px-6 text-foreground">No. Né Zcash né alcun software crittografico che abbiamo costruito contiene una backdoor, e mai lo farà.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash è controllato da una società?</td>
        <td className="py-5 px-6 text-foreground">Errato. Sebbene collaboriamo con aziende per la ricerca, Zcash rimane impegnato nella decentralizzazione. Diverse organizzazioni autonome lavorano insieme verso l'autocustodia e i diritti alla privacy.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash ha una privacy limitata rispetto ad altre monete per la privacy</td>
        <td className="py-5 px-6 text-foreground">No. La privacy in stile Monero/Grin si basa su esche (che possono essere battute). Zcash cifra tutti i dati delle transazioni Shielded, quindi ogni transazione nel pool è indistinguibile. Vedi <a href="https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/">Not Private Enough?</a>.</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Ultimo aggiornamento:** Marzo 2026  
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
