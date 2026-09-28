<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchange non-custodial

[Zcash Exchange non-custodial](/dex)

Nel mondo in continua evoluzione del trading di criptovalute, gli exchange non-custodial, noti anche come exchange decentralizzati o DEX, consentono agli utenti di fare trading senza affidare i propri fondi a un conto di exchange. Mantieni le tue chiavi, ma questo non significa che nessun altro sia coinvolto. A seconda del percorso, uno swap può passare attraverso un sito web o un'app wallet, un servizio di routing, smart contract, solver e bridge.

Gli exchange elencati sopra ti consentono di ottenere e scambiare Zcash dal tuo wallet. Il grado di privacy di uno swap dipende dal servizio, dalla rete da cui effettui il pagamento e dal fatto che il tuo ZEC finisca in un indirizzo schermato. Le sezioni seguenti spiegano la differenza.

### **Comprendere gli exchange non-custodial**

Gli exchange non-custodial, noti anche come exchange decentralizzati (DEX), sono piattaforme che facilitano il trading di criptovalute senza richiedere agli utenti di depositare i propri fondi nell'exchange stesso. Gli utenti mantengono invece il controllo delle proprie chiavi private e fanno trading dai propri wallet. Gli swap cross-chain si affidano comunque ad altre parti per quotare, instradare e regolare lo scambio (vedi sotto).

Ciò può migliorare la sicurezza, poiché gli utenti non si affidano all'exchange per custodire i propri asset, riducendo il rischio di hack o cattiva gestione. Tuttavia, non rende di per sé privato uno swap. Le transazioni sugli exchange non-custodial spesso utilizzano smart contract, che sono pubblici, e il servizio utilizzato può comunque vedere i tuoi indirizzi e i dettagli della connessione.

Un vantaggio fondamentale degli exchange di criptovalute non-custodial risiede nel maggiore controllo che offrono agli utenti sui propri asset. Poiché questi exchange non trattengono gli asset, gli utenti godono della piena proprietà e autorità sulle proprie valute digitali.

### **Exchange non-custodial vs exchange custodial**

**#1 Sicurezza**: gli exchange non-custodial eliminano la necessità di conservare fondi in un conto di exchange centrale. Gli utenti mantengono il controllo delle proprie chiavi private, riducendo il rischio di hack, attacchi interni e fallimenti della piattaforma che gli exchange custodial possono subire. Gli swap cross-chain possono comunque trattenere fondi per breve tempo in un indirizzo di deposito o in un bridge durante la regolazione dello scambio.

**#2 Privacy**: gli swap non-custodial di solito non richiedono un conto di exchange, quindi spesso non è necessario registrarsi con un'email o un documento d'identità. Questo non equivale all'anonimato. Il deposito inviato sulla rete di origine (ad esempio Solana o Ethereum) è pubblico su quella chain, e il servizio può comunque vedere gli indirizzi del wallet, l'indirizzo IP e i dettagli dello swap. La privacy sul lato Zcash dipende da dove finisce il tuo ZEC (vedi sotto).

**#3 Decentralizzazione**: gli exchange non-custodial sono più in linea con l'etica decentralizzata delle criptovalute. Gli utenti hanno maggiore autonomia e controllo sulle proprie attività di trading, in linea con i principi più ampi della tecnologia blockchain.

Quando si tratta di exchange custodial, il livello di decentralizzazione è spesso piuttosto minimo nella maggior parte degli exchange centralizzati, che portano il team o i responsabili dell'exchange a gestire i dati o le informazioni degli utenti sull'exchange.

**#4 Adattabilità alle normative in evoluzione**: gli exchange non-custodial sono spesso più adattabili ai contesti normativi in evoluzione. Poiché non detengono i fondi degli utenti, potrebbero avere minori difficoltà di conformità rispetto agli exchange custodial.

**#5 Innovazione e sperimentazione**: gli exchange non-custodial spesso guidano l'innovazione nel settore crypto. Incoraggiano lo sviluppo di tecnologie decentralizzate, come gli automated market maker (AMM) e le applicazioni di finanza decentralizzata (DeFi).

**#6 Accessibilità globale**: gli exchange non-custodial spesso forniscono accesso alle criptovalute a utenti di tutto il mondo, incluse regioni in cui gli ostacoli normativi potrebbero limitare la disponibilità dei servizi degli exchange custodial.

**#7 Nessun requisito KYC**: molti exchange non-custodial non richiedono documenti di identità in anticipo. La maggior parte controlla comunque gli indirizzi dei wallet rispetto a database di conformità e uno swap può essere ritardato, bloccato o rifiutato se viene segnalato qualcosa. Verifica i termini del servizio prima di farvi affidamento.

### **Cosa protegge Zcash e cosa non protegge**

La privacy di Zcash deriva dagli indirizzi schermati. Quando ZEC si sposta tra indirizzi schermati, mittente, destinatario, importo e memo sono crittografati sulla chain Zcash. Consulta [Pool schermati](/using-zcash/shielded-pools) per capire come funziona.

Uno swap ha parti che Zcash non può nascondere:

- **La rete di origine.** I fondi inviati da Solana, Ethereum o un'altra chain pubblica sono visibili su quella chain, inclusi il tuo indirizzo e l'importo.
- **L'indirizzo di ricezione.** Alcuni percorsi di swap inviano ZEC a un indirizzo trasparente. Ad esempio, Near Intents elenca ZEC come supportato solo per [indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support). ZEC inviato a un indirizzo trasparente (t1 o t3) è pubblico, proprio come Bitcoin. Schermarlo in seguito protegge ciò che fai dopo, ma il trasferimento in entrata e la transazione di schermatura restano visibili.
- **Il servizio.** L'app e qualsiasi servizio di routing vedono gli indirizzi e gli importi che fornisci, oltre ai dati di connessione come il tuo indirizzo IP.

Invia ZEC a un wallet che controlli e schermalo prima di spenderlo. [Utilizzare ZEC privatamente](/guides/using-zec-privately) illustra i passaggi successivi.

### **Chi è coinvolto in uno swap**

Prendiamo come esempio uno swap instradato attraverso il servizio 1Click di Near Intents. I suoi [termini API](https://docs.near-intents.org/security-compliance/terms-of-service) considerano queste parti separate:

- **L'interfaccia**: il sito web o il wallet che utilizzi. Può essere gestito da Intents Technology o da una terza parte con i propri termini.
- **1Click**: un servizio di routing e regolamento gestito da Intents Technology Limited. Invii fondi a un indirizzo di deposito creato per il tuo preventivo. La documentazione afferma che 1Click non assume la custodia, ma i termini rilevano che gli asset possono essere detenuti o bloccati nell'infrastruttura bridge mentre è in corso un trasferimento.
- **Il protocollo**: gli smart contract Near Intents.
- **Solver**: terze parti indipendenti che eseguono il preventivo.
- **Bridge**: gli spostamenti nativi di ZEC avvengono tramite il PoA Bridge, gestito da Intents Technology.

Near Intents inoltre [sottopone a controlli i flussi di preventivo integrati](https://docs.near-intents.org/security-compliance/risk-and-compliance) rispetto a diversi database AML, e afferma che la copertura varia in base al flusso e all'integrazione. Secondo i suoi termini, uno swap segnalato può essere ritardato, bloccato, congelato o rifiutato.

### **Cosa condividi durante uno swap**

- L'indirizzo ZEC che riceve lo swap e un indirizzo di rimborso sulla rete di origine.
- L'asset e l'importo, nonché la transazione di deposito che invii, che è pubblica sulla chain di origine.
- Dati di connessione. I termini di 1Click affermano che Intents Technology può raccogliere metadati delle richieste, indirizzi IP e indirizzi dei wallet, mentre l'informativa sulla privacy di near.com elenca indirizzo IP, posizione, browser e informazioni sul dispositivo.
- Qualsiasi elemento aggiunto dall'app, come altri indirizzi di wallet connessi. Le app possono inoltre sottoporre il tuo wallet ai propri controlli di conformità.

### **Dove verificare termini e assistenza**

I termini cambiano, quindi leggi le versioni attuali prima di uno swap di importo elevato.

- **Inizia dall'app che utilizzi.** È il tuo principale punto di contatto. I termini API di 1Click affermano che Intents Technology non ha alcun rapporto diretto con gli utenti delle app realizzate su di esso.
- **Near Intents:** i termini e l'informativa sulla privacy su near.com/terms e near.com/privacy, oltre ai [termini API di 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a [rischio e conformità](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Tracciamento e assistenza:** cerca uno swap su [Near Intents Explorer](https://explorer.near-intents.org) o chiedi nel [Near Intents Telegram](https://t.me/near_intents).
- **Rimborsi:** uno swap non riuscito può essere rinviato all'indirizzo di rimborso fornito, ma i termini di near.com affermano che un rimborso non è garantito. I termini di 1Click affermano inoltre che le richieste di recupero per errori dell'utente inferiori a USD 300 non vengono prese in considerazione.

Ora esploriamo alcuni degli exchange non-custodial accessibili che facilitano il trading di Zcash. L'utilizzo di queste piattaforme ti fornirà un modo pratico per acquisire più monete Zcash.

### **Riepilogo**

Gli exchange non-custodial, o DEX, ti consentono di fare trading dal tuo wallet mantenendo il controllo delle chiavi private. Ciò migliora la sicurezza, ma la privacy dipende dal percorso: la chain di origine è pubblica, il servizio vede i tuoi indirizzi e dati di connessione, e il tuo ZEC è privato solo quando si trova in un indirizzo schermato.

Sebbene gli exchange non-custodial offrano vantaggi interessanti, è importante riconoscere che possono presentare svantaggi, quali potenziali problemi di liquidità e una curva di apprendimento più ripida per gli utenti meno esperti.

Come per qualsiasi decisione finanziaria, i trader dovrebbero valutare attentamente le proprie priorità, la tolleranza al rischio e la familiarità con la tecnologia prima di scegliere tra opzioni di exchange non-custodial e custodial.
