<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST e custodia a soglia per ZEC schermato

> Per i dettagli crittografici completi del protocollo FROST, vedi la [pagina tecnica di FROST](FROST.md).

La custodia a soglia con FROST continua a emergere nelle conversazioni su Zcash — è stato il tema principale dello ZecHub Hackathon 2026 — ma il concetto non viene sempre spiegato in modo semplice. Questa pagina spiega cosa significa, quando serve davvero, i compromessi e quali strumenti la supportano oggi.

---

## TL;DR

- **FROST** permette a un gruppo di detentori di chiavi di controllare collettivamente un indirizzo Zcash schermato senza che una singola persona possieda l'intera chiave privata.
- Una soglia **t-su-n** significa: t persone devono co-firmare per spendere; qualsiasi gruppo di t-1 persone o meno non può muovere i fondi da solo.
- Le transazioni appaiono come qualsiasi altra transazione schermata — non c'è alcuna traccia on-chain che riveli l'uso della firma a soglia.
- Questo è fondamentalmente diverso dal multisig trasparente (che è pubblico on-chain e che Zcash supporta da tempo) — FROST funziona all'interno del pool schermato.
- È utile per DAO, exchange, servizi di custodia, risparmi condivisi e tesorerie di team — ovunque un singolo punto di fallimento della chiave sia inaccettabile.

---

## Cos'è FROST in parole semplici?

Immagina che tre soci in affari detengano ciascuno una parte di una chiave. Per spendere dal loro wallet condiviso, due dei tre devono essere d'accordo e co-firmare. La transazione risultante appare identica a un normale invio individuale — nessun osservatore può capire dalla blockchain che sono state coinvolte più persone.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) è il protocollo crittografico che rende tutto questo possibile per Zcash schermato. È stato creato da Chelsea Komlo (University of Waterloo / Zcash Foundation) e Ian Goldberg.

Le proprietà principali:

- **A soglia**: devono partecipare solo firmatari t-su-n (es. 2-su-3, 3-su-5)
- **Schermato**: funziona all'interno del pool per la privacy Orchard — importi, mittente e destinatario restano privati
- **Indistinguibile**: la firma finale appare come qualsiasi altra transazione schermata di Zcash
- **Non-custodial**: nessuna singola parte possiede mai la chiave completa — nemmeno il coordinatore

---

## Quando dovresti usare la custodia a soglia?

La custodia a soglia ha senso quando **perdere una chiave o una persona non dovrebbe significare perdere i fondi**.

| Situazione | Perché la custodia a soglia aiuta |
|-----------|----------------------------|
| **Tesoreria DAO o di team** | Nessun singolo amministratore può svuotare i fondi unilateralmente; è richiesto consenso |
| **Exchange o custode** | Distribuisce il rischio della chiave tra diverse zone di sicurezza o dipendenti |
| **Cold storage personale (con familiari fidati)** | 2-su-3 tra te + due familiari — se muori o perdi l'accesso, i fondi non vanno persi |
| **Escrow** | Acquirente, venditore e arbitro detengono ciascuno una quota; i fondi vengono rilasciati quando due sono d'accordo |
| **Erogazione di grant di alto valore** | In stile ZCG: richiede più firmatari indipendenti prima di effettuare il pagamento |
| **Gestione delle chiavi per sviluppatori** | Previene la minaccia interna — nessun singolo ingegnere può svuotare un fondo di protocollo |

Probabilmente **non** hai bisogno della custodia a soglia per un wallet personale che controlli da solo, per piccoli importi o in situazioni in cui il maggiore overhead di coordinamento supera la riduzione del rischio.

---

## In cosa differisce dal multisig trasparente?

Zcash supporta da tempo il multisig trasparente — più chiavi richieste per spendere da un t-address. Ma il multisig trasparente comporta un costo significativo in termini di privacy: **la struttura multisig, tutte le chiavi pubbliche e tutti i firmatari sono visibili sulla blockchain**.

FROST risolve questo problema operando all'interno del pool schermato:

| | Multisig trasparente | Soglia FROST (schermata) |
|--|---------------------|--------------------------|
| Pool | Trasparente (pubblico) | Orchard (schermato) |
| Firmatari visibili on-chain | Sì — tutte le chiavi pubbliche esposte | No — indistinguibile da una spesa con un solo firmatario |
| Importi visibili | Sì | No |
| Coordinamento richiesto | Script on-chain | Round di comunicazione off-chain |
| Privacy | Nessuna | Privacy schermata completa |

---

## Compromessi e limitazioni

FROST è potente, ma comporta compromessi reali che dovresti comprendere prima di usarlo:

### Overhead di coordinamento
I firmatari devono essere online contemporaneamente (o quasi) per completare un round di firma. Se i tuoi t firmatari sono distribuiti in fusi orari diversi o hanno connessioni inaffidabili, spendere richiede un coordinamento che un wallet individuale non richiede.

### Nessuna firma se il quorum non è disponibile
Se un numero sufficiente di detentori di chiavi non è disponibile (malati, in viaggio, non rispondono), i fondi diventano temporaneamente non spendibili. Scegli con attenzione la tua soglia e il numero di quote — 2-su-3 è più resiliente di 2-su-2.

### Cerimonia di generazione delle chiavi
L'impostazione di FROST richiede una cerimonia DKG (distributed key generation) in cui tutti gli n partecipanti sono online insieme. È un evento una tantum, ma deve essere eseguito con attenzione — se i partecipanti vengono compromessi durante il DKG, la sicurezza viene indebolita.

### Gli strumenti stanno ancora maturando
FROST per Zcash schermato è relativamente nuovo. Lo standard IETF (draft-irtf-cfrg-frost) è maturo, ma le integrazioni nei wallet sono limitate. Aspettati qualche asperità rispetto a un normale wallet a chiave singola.

### Complessità del recupero
Perdere una quota non è la fine del mondo (questo è il punto della soglia), ma i piani di recupero devono essere documentati in anticipo. Chi detiene i backup? Cosa succede se due quote vengono perse contemporaneamente?

---

## Chi sta costruendo con FROST su Zcash?

### Zcash Foundation — frost.zfnd.org
La Zcash Foundation ha rilasciato un'implementazione funzionante di FROST e un sito demo. Questa è l'implementazione di riferimento usata per test e sviluppo.

### Demo FROST di YWallet
YWallet (un wallet Zcash ad alte prestazioni) ha una prima integrazione demo di FROST. Vedi la [guida alla demo FROST di YWallet](/guides/Ywallet_FROST_Demo) per istruzioni passo passo.

### ZecHub Hackathon 2026 — Progetti del track FROST

Il track FROST è stato il più competitivo allo ZecHub Hackathon 2026. Progetti degni di nota:

- **ZecVault** — escrow schermato 2-su-3 regolato su mainnet (soglia FROST)
- **Steward** — custodia a soglia per Zcash schermato con una UX focalizzata sul recupero

### Coinbase
Coinbase ha realizzato un'implementazione FROST in produzione per i suoi sistemi di firma a soglia (per Bitcoin), con modifiche che rimuovono la fase di preelaborazione e distribuiscono il ruolo di aggregatore tra tutti i partecipanti. La loro esperienza conferma il modello di sicurezza di FROST su scala produttiva.

---

## Come funziona una sessione di firma (semplificata)

1. **Impostazione (una volta):** Tutti gli n partecipanti eseguono una cerimonia DKG (distributed key generation). Ognuno riceve una quota privata; viene derivata una chiave pubblica condivisa. Nessuna parte conosce la chiave privata completa.

2. **Coordinare i firmatari:** Quando serve una spesa, un coordinatore (che può essere uno dei firmatari) raccoglie gli impegni da t partecipanti disposti a firmare.

3. **Round 1:** Ogni firmatario partecipante genera un nonce e trasmette un impegno (pubblico, non sensibile).

4. **Round 2:** Ogni firmatario partecipante calcola la propria firma parziale usando la propria quota privata e la trasmette.

5. **Aggregazione:** Il coordinatore combina le t firme parziali in un'unica firma Schnorr finale — indistinguibile on-chain da una firma di una singola parte.

6. **Trasmissione:** La transazione viene trasmessa alla rete Zcash come di consueto.

Se un firmatario invia una firma parziale non valida, il protocollo lo identifica e si interrompe (viene escluso dalle sessioni future). Il coordinamento avviene off-chain — la blockchain vede solo la transazione finale.

---

## Scegliere i parametri della soglia

| Setup | Resilienza | Rischio |
|-------|-----------|------|
| 1-su-1 | Nessuna resilienza — singolo punto di fallimento | Perdita della chiave = perdita permanente |
| 2-su-2 | Devono esserci entrambi i firmatari — nessuna tolleranza ai guasti | Uno non disponibile = fondi bloccati |
| 2-su-3 | Una quota può andare persa o non essere disponibile | Margine di sicurezza inferiore rispetto a 3-su-5 |
| 3-su-5 | Due quote possono andare perse; sicurezza elevata | Maggiore overhead di coordinamento |
| 3-su-7 | Livello istituzionale; tollera due guasti | Alto costo di coordinamento |

Un punto di partenza pratico per la maggior parte dei team: **2-su-3** (resiliente, coordinamento minimo) oppure **3-su-5** (istituzionale, sicurezza più elevata).

---

## Pagine correlate

- [FROST — Approfondimento tecnico](FROST.md) — dettagli crittografici del protocollo (DKG, round di firma, prove di sicurezza)
- [Guida alla demo FROST di YWallet](/guides/Ywallet_FROST_Demo) — demo pratica passo passo
- [Demo FROST (frostdemo)](/guides/ywallet-frost-demo) — panoramica della demo della Zcash Foundation
- [Viewing Keys](Viewing_Keys.md) — accesso in sola lettura agli indirizzi schermati (complementare alla custodia a soglia)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST è anche un'infrastruttura chiave per l'emissione di ZSA

## Risorse

- [Articolo di ricerca su FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Bozza di standard IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Implementazione FROST della Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — Cosa sono le firme a soglia? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Firme digitali a soglia](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
