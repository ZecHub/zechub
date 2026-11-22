<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchange non-custodial

## TL;DR

* Un exchange non-custodial (senza custodia di terzi) ti permette di scambiare monete dal tuo portafoglio. Le chiavi private restano in tuo possesso e nessun account dell'exchange custodisce i tuoi fondi.
* Conservare le tue chiavi ti protegge da hack e guasti degli exchange. La privacy è una questione a parte.
* Il deposito che invii da un'altra chain, come Solana o Ethereum, è pubblico su quella chain. Il servizio di scambio vede anche i tuoi indirizzi e i dati di connessione.
* Alcuni percorsi di scambio consegnano ZEC su un indirizzo trasparente, che è pubblico.
* Il tuo ZEC diventa privato una volta che si trova su un indirizzo schermato. Schermalo nel tuo portafoglio prima di spenderlo.

## Spiegazione di base

[Zcash Exchange non-custodial](/dex)

Nel mondo in continua evoluzione del trading di criptovalute, gli exchange non-custodial, noti anche come exchange decentralizzati o DEX, permettono agli utenti di fare trading senza consegnare i propri fondi a un account dell'exchange. Le chiavi restano tue, ma questo non significa che nessun altro sia coinvolto. A seconda del percorso, uno scambio può passare attraverso un sito web o un'app di portafoglio, un servizio di routing, smart contract, solver e bridge.

Gli exchange elencati sopra ti permettono di ottenere e scambiare Zcash dal tuo portafoglio. Quanto è privato uno scambio dipende dal servizio, dalla rete da cui paghi e da se il tuo ZEC finisce su un indirizzo schermato. Le sezioni seguenti spiegano la differenza.

### **Capire gli exchange non-custodial**

Gli exchange non-custodial, noti anche come exchange decentralizzati (DEX), sono piattaforme che facilitano il trading di criptovalute senza richiedere agli utenti di depositare i propri fondi sull'exchange stesso. Gli utenti mantengono invece il controllo delle proprie chiavi private e fanno trading dai propri portafogli. Gli scambi cross-chain si affidano comunque ad altre parti per quotare, instradare e regolare lo scambio (vedi sotto).

Questo può migliorare la sicurezza, perché gli utenti non si affidano all'exchange per custodire i propri asset, il che riduce il rischio di hack o cattiva gestione. Non rende però uno scambio privato di per sé. Le transazioni sugli exchange non-custodial usano spesso smart contract, che sono pubblici, e il servizio che usi può comunque vedere i tuoi indirizzi e i dettagli di connessione.

Un vantaggio chiave degli exchange di criptovalute non-custodial risiede nel maggiore controllo che offrono agli utenti sui propri asset. Poiché questi exchange non trattiengono gli asset, gli utenti godono di piena proprietà e autorità sulle proprie valute digitali.

### **Exchange non-custodial contro exchange custodial**

**#1 Sicurezza**: gli exchange non-custodial eliminano la necessità di tenere i fondi in un account centrale dell'exchange. Gli utenti mantengono il controllo delle proprie chiavi private, riducendo il rischio di hack, attacchi interni e guasti della piattaforma che gli exchange custodial (custodia di terzi) possono subire. Gli scambi cross-chain possono comunque trattenere fondi per breve tempo in un indirizzo di deposito o in un bridge mentre lo scambio si regola.

**#2 Privacy**: gli scambi non-custodial di solito non richiedono un account dell'exchange, quindi spesso eviti di registrarti con un indirizzo email o un documento d'identità. Questo non equivale all'anonimato. Il deposito che invii sulla rete di origine (per esempio, Solana o Ethereum) è pubblico su quella chain, e il servizio può comunque vedere gli indirizzi del tuo portafoglio, il tuo indirizzo IP e i dettagli dello scambio. La privacy sul lato Zcash dipende da dove finisce il tuo ZEC (vedi sotto).

**#3 Decentralizzazione**: gli exchange non-custodial sono più in linea con l'ethos decentralizzato delle criptovalute. Gli utenti hanno maggiore autonomia e controllo sulle proprie attività di trading, in coerenza con i principi più ampi della tecnologia blockchain.

Per quanto riguarda gli exchange custodial, il livello di decentralizzazione è spesso piuttosto minimo nella maggior parte degli exchange centralizzati, dove subentrano il team o i funzionari dell'exchange che gestiscono i dati o le informazioni degli utenti sull'exchange.

**#4 Adattabilità ai cambiamenti normativi**: gli exchange non-custodial sono spesso più adattabili ai cambiamenti del contesto normativo. Poiché non custodiscono i fondi degli utenti, potrebbero avere meno sfide di conformità rispetto agli exchange custodial.

**#5 Innovazione e sperimentazione**: gli exchange non-custodial guidano spesso l'innovazione nel mondo crypto. Incoraggiano lo sviluppo di tecnologie decentralizzate, come i market maker automatizzati (AMM) e le applicazioni di finanza decentralizzata (DeFi).

**#6 Accessibilità globale**: gli exchange non-custodial spesso danno accesso alle criptovalute a utenti di tutto il mondo, incluse regioni dove ostacoli normativi potrebbero limitare la disponibilità dei servizi di exchange custodial.

**#7 Nessun requisito KYC**: molti exchange non-custodial non chiedono documenti d'identità subito. La maggior parte verifica comunque gli indirizzi dei portafogli confrontandoli con database di conformità, e uno scambio può essere ritardato, bloccato o rifiutato se qualcosa viene segnalato. Consulta i termini del servizio prima di contarci.

### **Cosa protegge Zcash e cosa no**

La privacy di Zcash nasce dagli indirizzi schermati. Quando ZEC si muove tra indirizzi schermati, mittente, destinatario, importo e memo sono crittografati sulla chain di Zcash. Vedi [Pool schermate](/using-zcash/shielded-pools) per come funziona.

Uno scambio ha parti che Zcash non può nascondere:

- **La rete di origine.** I fondi che invii da Solana, Ethereum o un'altra chain pubblica sono visibili su quella chain, incluso il tuo indirizzo e l'importo.
- **L'indirizzo di ricezione.** Alcuni percorsi di scambio consegnano ZEC su un indirizzo trasparente. Per esempio, NEAR Intents indica ZEC come supportato per [solo indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support). ZEC inviato a un indirizzo trasparente (t1 o t3) è pubblico, molto simile a Bitcoin. Schermarlo in seguito protegge ciò che fai dopo, ma il trasferimento in entrata e la transazione di schermatura restano visibili.
- **Il servizio.** L'app ed eventuali servizi di routing vedono gli indirizzi e gli importi che fornisci, oltre a dati di connessione come il tuo indirizzo IP.

Invia lo ZEC a un portafoglio che controlli e schermalo prima di spenderlo. [Usare ZEC in modo privato](/guides/using-zec-privately) copre i passi successivi.

### **Chi è coinvolto in uno scambio**

Prendi come esempio uno scambio instradato attraverso il servizio 1Click di NEAR Intents. I suoi [termini delle API](https://docs.near-intents.org/security-compliance/terms-of-service) considerano queste come parti separate:

- **L'interfaccia**: il sito web o il portafoglio che usi. Può essere gestito da Intents Technology o da una terza parte con i propri termini.
- **1Click**: un servizio di routing e regolamento gestito da Intents Technology Limited. Invii i fondi a un indirizzo di deposito creato per la tua quotazione. Secondo la documentazione, 1Click non prende in custodia i fondi, ma i termini precisano che gli asset possono essere trattenuti o bloccati nell'infrastruttura del bridge mentre un trasferimento è in corso.
- **Il protocollo**: gli smart contract di NEAR Intents.
- **Solver**: terze parti indipendenti che soddisfano la quotazione.
- **Bridge**: lo ZEC nativo attraversa il PoA Bridge, gestito da Intents Technology.

NEAR Intents incrocia anche [i flussi di quotazione integrati](https://docs.near-intents.org/security-compliance/risk-and-compliance) con diversi database AML, e dichiara che la copertura varia a seconda del flusso e dell'integrazione. Secondo i suoi termini, uno scambio segnalato può essere ritardato, bloccato, congelato o rifiutato.

### **Cosa condividi durante uno scambio**

- L'indirizzo ZEC che riceve lo scambio, e un indirizzo di rimborso sulla rete di origine.
- L'asset e l'importo, e la transazione di deposito che invii, che è pubblica sulla chain di origine.
- Dati di connessione. I termini di 1Click dicono che Intents Technology può raccogliere metadati delle richieste, indirizzi IP e indirizzi dei portafogli, e l'informativa sulla privacy su near.com elenca indirizzo IP, posizione, browser e informazioni sul dispositivo.
- Tutto ciò che l'app aggiunge in più, come altri indirizzi di portafoglio collegati. Le app possono inoltre sottoporre il tuo portafoglio a controlli di conformità propri.

## Immagine / analogia

Un exchange custodial funziona come una banca. Apri un account, lasci i tuoi soldi nella sua cassaforte e chiedi alla banca di fare trading per te.

Uno scambio non-custodial funziona come lo sportello di un cambio valuta su una strada trafficata. Passi contanti attraverso lo sportello, ricevi una valuta diversa e non lasci mai soldi all'impiegato. Le persone sulla strada possono vederti avvicinarti e consegnare i tuoi contanti, così come chiunque può vedere il tuo deposito sulla chain di origine. L'impiegato vede il tuo viso e l'importo.

Quello che succede dopo lo sportello dipende da te. Metti le nuove monete in una busta sigillata, usa un indirizzo schermato, e nessuno può seguirle da lì.

## Implicazioni pratiche

### **Dove controllare termini e supporto**

I termini cambiano, quindi leggi le versioni aggiornate prima di uno scambio di grandi dimensioni.

- **Parti dall'app che usi.** È il tuo punto di contatto principale. I termini delle API di 1Click dicono che Intents Technology non ha una relazione diretta con gli utenti delle app costruite su di essa.
- **NEAR Intents:** i termini e l'informativa sulla privacy su near.com/terms e near.com/privacy, oltre ai [termini API di 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e al [rischio e conformità](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Tracciamento e supporto:** cerca uno scambio su [NEAR Intents Explorer](https://explorer.near-intents.org) oppure chiedi su [NEAR Intents Telegram](https://t.me/near_intents).
- **Rimborsi:** uno scambio fallito può essere rispedito all'indirizzo di rimborso che hai fornito, ma i termini di near.com precisano che un rimborso non è garantito. I termini di 1Click precisano inoltre che le richieste di recupero per errori dell'utente inferiori a 300 USD non vengono prese in considerazione.

Ora esploriamo alcuni degli exchange non-custodial accessibili che facilitano il trading di Zcash. Usare queste piattaforme ti offre un mezzo comodo per acquisire più Zcash.

### **Riepilogo**

Gli exchange non-custodial, o DEX, ti permettono di fare trading dal tuo portafoglio mantenendo il controllo delle tue chiavi private. Questo aiuta la sicurezza, ma la privacy dipende dal percorso: la chain di origine è pubblica, il servizio vede i tuoi indirizzi e i dati di connessione, e il tuo ZEC è privato solo quando si trova su un indirizzo schermato.

Sebbene gli exchange non-custodial offrano vantaggi notevoli, è importante riconoscere che possono presentare svantaggi, come potenziali problemi di liquidità e una curva di apprendimento più ripida per gli utenti meno esperti.

Come per qualsiasi decisione finanziaria, i trader dovrebbero valutare attentamente le proprie priorità, la tolleranza al rischio e la familiarità con la tecnologia prima di scegliere tra opzioni di exchange non-custodial e custodial.

## Errori comuni

- **Considerare "non-custodial" come "privato".** Mantenere le tue chiavi protegge i tuoi fondi da un fallimento dell'exchange. Il deposito sulla chain di origine è pubblico, e il servizio vede i tuoi indirizzi e il tuo indirizzo IP.
- **Lasciare ZEC scambiati su un indirizzo trasparente.** Se il percorso paga su un indirizzo t1 o t3, sposta lo ZEC su un indirizzo schermato nel tuo portafoglio prima di spenderlo.
- **Saltare il controllo dell'indirizzo di rimborso.** Uno scambio fallito può tornare all'indirizzo di rimborso che hai fornito, e i rimborsi non sono garantiti. Controlla quell'indirizzo prima di inviare.
- **Leggere "no KYC" come "nessun controllo".** La maggior parte dei servizi verifica gli indirizzi dei portafogli rispetto a database di conformità, quindi uno scambio segnalato può essere ritardato o bloccato.

## Pagine correlate

- [DEX](/using-zcash/dex): exchange non-custodial che supportano ZEC.
- [Scambi centralizzati](/using-zcash/centralized-swaps): servizi di scambio istantaneo che funzionano senza un account dell'exchange.
- [Exchange custodial](/using-zcash/custodial-exchanges): exchange che custodiscono i tuoi fondi in un account.
- [Pool schermate](/using-zcash/shielded-pools): dove il tuo ZEC diventa privato dopo uno scambio.
- [Indirizzi unificati](/using-zcash/unified-addresses): l'indirizzo `u1` che la maggior parte dei portafogli ti fornisce per ricevere ZEC.
- [Solana ZEC a schermato](/using-zcash/solana-zec-to-shielded): spostare ZEC da Solana a un indirizzo schermato.
- [Usare ZEC in modo privato](/guides/using-zec-privately): cosa fare con il tuo ZEC una volta che è arrivato.
- [Chi può vedere il tuo pagamento in Zcash](/start-here/who-can-see-your-zcash-payment): cosa resta visibile su ciascun lato di un pagamento.

**Ultimo aggiornamento:** ottobre 2026
