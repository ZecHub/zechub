# FROST & Viewing Keys: breve di ricerca sull'interoperabilità Zcash/Dash

*Preparato per ZecHub · Rivisto il 27 settembre 2026 · Tutte le affermazioni riportano fonti nel testo*

## Sintesi esecutiva

ZecHub ha posto questa domanda dopo aver aggiunto DASH schermato come opzione per le donazioni al wiki: le viewing keys in stile Zcash, o le firme a soglia FROST, potrebbero essere adattate a Dash?

La ricerca ha riformulato la questione. Le viewing keys non sono una questione aperta — Dash ha integrato il pool schermato [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) nella propria chain Evolution, e la gerarchia delle chiavi di Orchard include le viewing keys per costruzione. La [roadmap](https://www.dash.org/roadmap/) di Dash le presenta per la divulgazione agli auditor e la conformità alla Travel Rule. Questa metà è implementata, non ipotetica.

**FROST è il punto in cui si trova il vero divario.** Dash esegue già firme BLS a soglia tramite i [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), ma questi servono il consenso a livello di rete — ChainLocks e InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) punta a qualcosa di diverso: autorizzazione di spesa a soglia su un singolo account schermato detenuto da un piccolo gruppo di singoli detentori di chiavi. Le due cose non sono intercambiabili. E poiché ZIP 312 rimane **Draft**, non esiste alcuna implementazione di riferimento su nessuna delle due chain da portare, quindi sarebbe un lavoro nuovo indipendentemente da quale parte lo sviluppasse.

---

## Cronologia: perché questo confronto è insolito proprio ora

Due eventi relativi a pool schermati si sono verificati a poche settimane di distanza, a metà del 2026.

**Zcash ha abbandonato Orchard.** Il ricercatore Taylor Hornby ha divulgato una vulnerabilità del circuito in Orchard che avrebbe potuto essere sfruttata per gonfiare l'offerta senza che ciò fosse rilevabile. Zcash ha risposto attivando **Ironwood (NU6.3)** il **28 luglio 2026**, introducendo un nuovo pool schermato con un meccanismo di migrazione turnstile.

**Dash ha adottato Orchard.** Dash ha annunciato il piano il [19 febbraio 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Prevediamo di poter lanciare presto i trasferimenti schermati, naturalmente in attesa degli audit di sicurezza e di ulteriore revisione del codice."* La [roadmap](https://www.dash.org/roadmap/) di Dash registra i saldi schermati come **completati a luglio 2026** con Dash Platform **v4.0**, e Dash ha pubblicato [*"Le transazioni schermate sono attive sulla mainnet Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) il **4 agosto 2026**.

> **Una nota sull'ordine.** Alcune fonti hanno collocato l'attivazione della mainnet Dash al 17 luglio 2026, il che la porrebbe prima di Ironwood. Tale data sembra derivare dalla stampa che riportava l'annuncio, piuttosto che da un'attivazione. Nelle fonti di Dash, la funzionalità è stata completata a luglio ed è stata annunciata attiva il 4 agosto — dopo Ironwood. Le due chain si sono incrociate nell'arco di poche settimane; l'ordine esatto dipende da quale traguardo si conteggia, e questo documento non ne rivendica uno.

Fondamentalmente, Dash non ha ereditato il bug. Il suo annuncio è esplicito: *"abbiamo implementato la versione di Orchard senza un noto bug di inflazione. La versione precedente conteneva un bug che poteva essere sfruttato per gonfiare in modo non rilevabile l'offerta di Zcash."*

Dash esegue quindi ora un fork corretto della crittografia che Zcash stessa ha abbandonato a livello di base, mentre il pool di nuova generazione di Zcash (Ironwood) e il suo schema di autorizzazione alla spesa di nuova generazione (FROST) sono rispettivamente appena attivi e ancora Draft.

---

## Viewing keys: implementate, non una lacuna di ricerca

Il pool schermato di Dash è [Orchard](https://zips.z.cash/zip-0224), basato su Halo 2 zk-SNARKs senza richiedere alcun trusted setup. La gerarchia delle chiavi di Orchard ha sempre incluso Full Viewing Keys e Incoming Viewing Keys come parte della propria progettazione anziché come aggiunta successiva — quindi la capacità è arrivata con il codice, non come un porting che una delle due chain abbia dovuto negoziare.

La roadmap di Dash espone direttamente l'intento:

> *"A differenza dei sistemi a privacy obbligatoria che hanno affrontato delisting dagli exchange e attriti normativi, i saldi schermati supportano la divulgazione selettiva tramite view keys — consentendo a utenti e aziende di condividere i dettagli delle transazioni con gli auditor o di conformarsi ai requisiti della Travel Rule quando necessario, senza compromettere la privacy nell'uso quotidiano."*

Due osservazioni degne di nota:

**Dash sta posizionando le viewing keys attorno a un caso d'uso produttivo più concreto di quanto gli strumenti di Zcash stessa abbiano raggiunto.** Gli strumenti di divulgazione dei pagamenti di Zcash sono rimasti in gran parte sperimentali e opt-in tra i wallet. Dash distribuisce view keys come funzionalità di conformità con casi d'uso nominati, su una chain che offre anche un regolamento deterministico di circa un secondo e una sincronizzazione del wallet di circa venti secondi secondo il proprio annuncio.

**L'elemento aperto è la deriva della compatibilità, non la capacità.** Vale la pena monitorare se l'implementazione delle viewing keys di Dash rimanga compatibile a livello di wire format con il formato delle viewing keys Zcash di Orchard, mentre le due chain evolvono indipendentemente. È una questione di monitoraggio piuttosto che un progetto di ricerca.

---

## Derivazione delle chiavi: Zcash e Dash a confronto

Questa sezione risponde direttamente alla domanda del revisore. La risposta breve è che gli alberi delle chiavi *schermate* sono quasi identici perché il codice è condiviso — le differenze significative riguardano il modo in cui ciascuna chain **radica** quell'albero nel proprio spazio di chiavi del wallet e ciò che altro occupa quello spazio.

### Zcash

Zcash usa [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), con stato **Final**. Invece di collocare le chiavi schermate in un singolo albero BIP 32, ZIP 32 assegna a ogni pool schermato la propria chiave master e il proprio percorso:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` è fissato a `32'` (0x80000020) secondo BIP 43, e `coin_type` segue SLIP 44, con tutte le testnet che condividono l'indice `1`.

All'interno di un account Orchard, la gerarchia è strettamente unidirezionale — ogni livello può derivare tutto ciò che sta sotto di esso e nulla che stia sopra:

| Chiave | Può fare | Deriva |
|---|---|---|
| Spending key | Spendere note | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizzare spese | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Vedere pagamenti in entrata **e** in uscita | IVK, OVK |
| Incoming Viewing Key | Vedere solo i pagamenti in entrata | Indirizzi diversificati |
| Outgoing Viewing Key | Recuperare i dettagli dei pagamenti in uscita | — |
| Diversified address | Ricevere | — |

Orchard ha semplificato questo rispetto a Sapling: secondo il [Orchard Book](https://zcash.github.io/orchard/design/keys.html), la chiave privata del nullifier `nsk` è stata rimossa, `nk` è diventato un elemento di campo anziché un punto della curva e `ovk` deriva ora dalla full viewing key anziché essere detenuta separatamente.

Al di sopra si trova [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revisione 0 Active, Revisione 1 Withdrawn, Revisione 2 Draft — che raggruppa le chiavi per pool in una **Unified Full Viewing Key** ("combines multiple Full Viewing Key… Items") e in una **Unified Incoming Viewing Key**. La distinzione che uno sviluppatore di wallet deve rispettare: una UFVK rivela sia l'attività in entrata sia quella in uscita, una UIVK soltanto quella in entrata.

### Dash

Dash radica tutto in un albero BIP 32 convenzionale, con coin type SLIP 44 `5'`, e aggiunge due proprie estensioni di derivazione.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) inserisce un livello di **funzionalità** che suddivide lo spazio delle chiavi in base alla funzione specifica della moneta:

```
m / purpose' / coin_type' / feature' / *
```

con `purpose` fissato a `9'` (0x80000009) e `coin_type` a `5'` (0x80000005). La motivazione dichiarata dal DIP è l'isolamento — *"può essere desiderabile mantenere i fondi misti in un percorso isolato dai fondi non misti."*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) va oltre, superando il limite di indice a 31 bit di BIP 32 affinché i componenti del percorso possano trasportare valori completi a 256 bit. Questo consente percorsi derivati dall'identità quali:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

dove gli ultimi due componenti sono hash delle identità degli utenti. Zcash non ha un equivalente: ZIP 32 non contempla la derivazione di un percorso di chiavi dall'identità di un'altra parte.

### Dove le due differiscono realmente

**Il sottoalbero schermato è lo stesso.** Le chiavi schermate di Dash sono chiavi Orchard, perché il pool schermato di Dash è Orchard. Uno sviluppatore di wallet che passa dall'una all'altra lavora con la stessa struttura dalla chiave di spesa alla viewing key.

**Il radicamento differisce.** Zcash isola ciascun pool schermato sotto la propria chiave master con purpose `32'`. Dash aggancia la funzionalità schermata a un unico albero unificato sotto purpose `9'`, accanto a ogni altra funzionalità. La separazione di Zcash è per pool crittografico; quella di Dash è per funzionalità del prodotto.

**Lo spazio di chiavi di Dash contiene qualcosa che quello di Zcash non ha: un dominio BLS separato.** Le chiavi degli operatori masternode, le chiavi di voto e le chiavi di quorum usate dagli LLMQ sono chiavi BLS, non chiavi della famiglia Schnorr, e risiedono interamente al di fuori dell'albero BIP 32 descritto sopra. È precisamente qui che risiede l'attuale firma a soglia di Dash — e precisamente perché non si compone con l'autorizzazione alla spesa Orchard, come illustra la sezione successiva.

**La derivazione collegata all'identità è esclusiva di Dash.** I percorsi a 256 bit di DIP-0014 esistono per derivare chiavi dalle relazioni tra identità. È un concetto di Dash Platform senza equivalente in Zcash, ed è il caso più chiaro in cui i due schemi di derivazione siano divergenti intenzionalmente anziché per caso.

*Vedere la Figura 1 per i due schemi di radicamento che convergono su un sottoalbero Orchard condiviso.*

---

## FROST: la questione realmente aperta

Dash dispone di un sistema maturo di firme a soglia in **LLMQ basati su BLS** (Long-Living Masternode Quorums), usati per ChainLocks, InstantSend e il consenso dei validatori Dash Platform.

[ZIP 312, *FROST per multisignature di autorizzazione alla spesa*](https://zips.z.cash/zip-0312), con stato **Draft**, fa qualcosa di diverso. Rende a soglia le firme di autorizzazione alla spesa basate su Schnorr già definite da Sapling e Orchard — rispettivamente **RedJubjub** e **RedPallas** — affinché, nella formulazione della stessa ZIP, *"utenti e servizi di terze parti che condividono la custodia di un wallet, o un gruppo di persone che gestisce fondi condivisi"* possano richiedere un'approvazione a soglia, come 2-su-3, prima di una spesa. È classificato come un ZIP **Wallet**: produce firme compatibili con l'attuale autorizzazione alla spesa anziché modificare il consenso. Mantiene un ruolo di Coordinator, che ZIP rifiuta esplicitamente di eliminare, e tratta sia la generazione di chiavi con trusted dealer sia la generazione distribuita di chiavi.

La distinzione importante, e il motivo per cui non si tratta di sostituti:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Schema di firma | BLS | Schnorr — RedJubjub / RedPallas |
| Chi firma | Un quorum di masternode | Un piccolo gruppo di singoli detentori di chiavi |
| Cosa viene autorizzato | Un fatto di rete: un block lock, un transaction lock | Una spesa da un account schermato |
| Livello | Consenso | Wallet |
| Spazio delle chiavi | Dominio BLS separato | La chiave di autorizzazione alla spesa Orchard/Sapling |
| Stato | Implementato | Draft, nessuna implementazione di riferimento |

Il fatto che Dash disponga di firme BLS a soglia **non** significa che abbia, o necessiti di, FROST. Significa però che gli ingegneri di Dash hanno familiarità interna con la firma a soglia, la generazione distribuita di chiavi e il coordinamento dei quorum — esperienza realmente trasferibile se scegliessero di svilupparla.

*Vedere la Figura 2 per ciò su cui firma effettivamente ciascuno schema.*

### Cosa richiederebbe FROST sul fork Orchard di Dash, a una prima valutazione

1. **Una cerimonia DKG e di firma FROST su RedPallas**, lo schema di autorizzazione alla spesa di Orchard — una variante Schnorr sulla curva Pallas. Questo è separato dalla DKG BLS esistente di Dash per gli LLMQ e non riducibile a essa.
2. **Supporto del wallet e UX per la firma multi-parte di un singolo account schermato**, che costituisce un modello di interazione diverso dagli strumenti per quorum masternode e richiede un equivalente del Coordinator.
3. **Una decisione sul livello.** Molto probabilmente soltanto a livello di wallet, poiché ZIP 312 è circoscritto come schema wallet sulle primitive esistenti anziché come modifica del consenso — ma questo deve essere confermato specificamente rispetto al fork Orchard di Dash, non assunto dalla delimitazione di Zcash.

---

## Raccomandazione

**Viewing keys — documentarle, non ricercarle.** La capacità è distribuita su entrambe le chain. Una breve nota wiki che registri che il pool schermato di Dash include view keys e rimandi alla roadmap di Dash evita che il pubblico di ZecHub presuma che sia ancora ipotetico. Monitorare la compatibilità del wire format man mano che le due chain evolvono.

**FROST — opportunità reale, bloccata a monte.** Dipende dal raggiungimento di un'implementazione di riferimento da parte di ZIP 312, oppure dalla scelta di Dash di sviluppare in parallelo. ZecHub non può accelerarla direttamente.

**Il prossimo passo di maggior valore è una conversazione, non altra ricerca a tavolino.** Le persone che costruirebbero questa soluzione sono raggiungibili. Shielded Labs sta guidando ZIP 312; il team di ingegneria Dash ha già reagito positivamente alla formulazione "preso in prestito da Zcash" relativa all'integrazione Orchard. Una discussione cross-community che colleghi le due parti farebbe emergere più informazioni di un altro ciclo di lettura, e questo documento ha raggiunto il limite di ciò che le fonti pubbliche possono chiarire.

---

## Figure

**Figura 1 — Radicamento della derivazione delle chiavi: Zcash ZIP 32 e Dash DIP-0009/0014, convergenti su un sottoalbero Orchard condiviso.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — Su cosa firma ciascuno schema a soglia: un quorum di masternode che attesta un fatto di rete, contrapposto a un gruppo di detentori di chiavi che autorizza una singola spesa schermata.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fonti

**Zcash — protocollo**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — stato Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST per multisignature di autorizzazione alla spesa](https://zips.z.cash/zip-0312) — stato Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Chiavi e indirizzi](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — componenti delle chiavi, §5.6.4

**Dash — protocollo e annunci**
- [Le transazioni schermate sono attive sulla mainnet Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 agosto 2026
- [Dash sta aggiungendo transazioni schermate a Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 febbraio 2026
- [Roadmap Dash](https://www.dash.org/roadmap/) — saldi schermati, completati a luglio 2026, Platform v4.0; aggiornata il 12 settembre 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentazione Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [repository dashpay/dips](https://github.com/dashpay/dips)

**Resoconti contemporanei**
- [Dash lancia la tecnologia Zcash di Orchard in un aggiornamento della privacy](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash porta la privacy Zcash di Orchard nella chain Evolution per transazioni schermate](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fonti verificate il 27 settembre 2026. Dash Platform e ZIP 312 sono entrambi in evoluzione; figure e stati dovrebbero essere verificati nuovamente prima della ripubblicazione.*
