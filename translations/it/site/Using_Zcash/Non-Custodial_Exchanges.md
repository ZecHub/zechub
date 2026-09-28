<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Exchange non-custodial

[Zcash Exchange non-custodial](/dex)

Nel mondo in continua evoluzione del trading di criptovalute, gli exchange non-custodial, noti anche come exchange decentralizzati o DEX, consentono agli utenti di negoziare senza affidare i propri fondi a un conto dell'exchange. Mantieni le tue chiavi, ma ciò non significa che nessun altro sia coinvolto. A seconda del percorso, uno swap può passare attraverso un sito web o un'app wallet, un servizio di instradamento, smart contract, solver e bridge.

Gli exchange elencati sopra ti consentono di ottenere e negoziare Zcash dal tuo wallet. Il grado di privacy di uno swap dipende dal servizio, dalla rete da cui effettui il pagamento e dal fatto che il tuo ZEC finisca in un indirizzo schermato. Le sezioni seguenti spiegano la differenza.

### **Comprendere gli exchange non-custodial**

Gli exchange non-custodial, noti anche come exchange decentralizzati (DEX), sono piattaforme che facilitano il trading di criptovalute senza richiedere agli utenti di depositare i propri fondi nell'exchange stesso. Al contrario, gli utenti mantengono il controllo delle proprie chiavi private e negoziano dai propri wallet. Gli swap cross-chain dipendono comunque da altre parti per quotare, instradare e regolare lo scambio (vedi sotto).

Ciò può migliorare la sicurezza, poiché gli utenti non si affidano all'exchange per custodire i propri asset, riducendo il rischio di hack o cattiva gestione. Non rende però uno swap privato di per sé. Le transazioni sugli exchange non-custodial utilizzano spesso smart contract, che sono pubblici, e il servizio usato può comunque vedere i tuoi indirizzi e i dettagli della connessione.

Un vantaggio fondamentale degli exchange di criptovalute non-custodial risiede nel maggiore controllo che forniscono agli utenti sui propri asset. Poiché questi exchange non trattengono gli asset, gli utenti godono della piena proprietà e autorità sulle proprie valute digitali.

### **Exchange non-custodial vs exchange custodial**

**#1 Sicurezza**: Gli exchange non-custodial eliminano la necessità di mantenere fondi in un conto centrale dell'exchange. Gli utenti conservano il controllo delle proprie chiavi private, riducendo il rischio di hack, attacchi interni e fallimenti della piattaforma che gli exchange custodial possono subire. Gli swap cross-chain possono comunque trattenere i fondi per breve tempo in un indirizzo di deposito o in un bridge mentre lo scambio viene regolato.

**#2 Privacy**: Gli swap non-custodial di solito non richiedono un conto dell'exchange, quindi spesso non è necessario registrarsi con un'email o un documento d'identità. Questo non equivale all'anonimato. Il deposito che invii sulla rete di origine (ad esempio Solana o Ethereum) è pubblico su quella chain e il servizio può comunque vedere i tuoi indirizzi wallet, l'indirizzo IP e i dettagli dello swap. La privacy sul lato Zcash dipende da dove finisce il tuo ZEC (vedi sotto).

**#3 Decentralizzazione**: Gli exchange non-custodial sono più allineati all'etica decentralizzata delle criptovalute. Gli utenti hanno maggiore autonomia e controllo sulle proprie attività di trading, in linea con i principi più ampi della tecnologia blockchain.

Per quanto riguarda gli exchange custodial, il livello di decentralizzazione è spesso piuttosto minimo nella maggior parte degli exchange centralizzati, che comportano la gestione dei dati o delle informazioni degli utenti da parte del team o dei responsabili dell'exchange.

**#4 Adattabilità alle normative in evoluzione**: Gli exchange non-custodial sono spesso più adattabili ai cambiamenti del contesto normativo. Poiché non detengono i fondi degli utenti, potrebbero avere meno difficoltà di conformità rispetto agli exchange custodial.

**#5 Innovazione e sperimentazione**: Gli exchange non-custodial promuovono frequentemente l'innovazione nello spazio crypto. Incoraggiano lo sviluppo di tecnologie decentralizzate, come gli automated market maker (AMM) e le applicazioni di finanza decentralizzata (DeFi).

**#6 Accessibilità globale**: Gli exchange non-custodial spesso offrono accesso alle criptovalute a utenti di tutto il mondo, comprese le regioni in cui ostacoli normativi potrebbero limitare la disponibilità di servizi di exchange custodial.

**#7 Nessun requisito KYC**: Molti exchange non-custodial non richiedono subito documenti d'identità. La maggior parte controlla comunque gli indirizzi wallet rispetto a database di conformità e uno swap può essere ritardato, bloccato o rifiutato se qualcosa viene segnalato. Verifica i termini del servizio prima di farvi affidamento.

### **Cosa protegge Zcash e cosa non protegge**

La privacy di Zcash deriva dagli indirizzi schermati. Quando ZEC si sposta tra indirizzi schermati, mittente, destinatario, importo e memo vengono crittografati sulla chain di Zcash. Consulta [Pool schermati](/using-zcash/shielded-pools) per sapere come funziona.

Uno swap ha componenti che Zcash non può nascondere:

- **La rete di origine.** I fondi che invii da Solana, Ethereum o un'altra chain pubblica sono visibili su quella chain, inclusi il tuo indirizzo e l'importo.
- **L'indirizzo di ricezione.** Alcuni percorsi di swap consegnano ZEC a un indirizzo trasparente. Ad esempio, Near Intents indica ZEC come supportato solo per [indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support). ZEC inviato a un indirizzo trasparente (t1 o t3) è pubblico, proprio come Bitcoin. Schermarlo in seguito protegge ciò che fai dopo, ma il trasferimento in entrata e la transazione di schermatura restano visibili.
- **Il servizio.** L'app e qualsiasi servizio di instradamento vedono gli indirizzi e gli importi che fornisci loro, oltre ai dati di connessione quali il tuo indirizzo IP.

Invia il ZEC a un wallet che controlli e schermalo prima di spenderlo. [Usare ZEC in modo privato](/guides/using-zec-privately) illustra i passaggi successivi.

### **Chi è coinvolto in uno swap**

Prendi come esempio uno swap instradato attraverso il servizio 1Click di Near Intents. I suoi [termini dell'API](https://docs.near-intents.org/security-compliance/terms-of-service) considerano queste componenti separate:

- **L'interfaccia**: il sito web o il wallet che utilizzi. Può essere gestito da Intents Technology o da terze parti con termini propri.
- **1Click**: un servizio di instradamento e regolamento gestito da Intents Technology Limited. Invi fondi a un indirizzo di deposito creato per la tua quotazione. La documentazione afferma che 1Click non assume la custodia, ma i termini specificano che gli asset possono essere detenuti o bloccati nell'infrastruttura bridge mentre un trasferimento è in corso.
- **Il protocollo**: gli smart contract di Near Intents.
- **I solver**: terze parti indipendenti che eseguono la quotazione.
- **I bridge**: ZEC nativo si sposta attraverso il PoA Bridge, gestito da Intents Technology.

Near Intents inoltre [sottopone a controlli i flussi di quotazione integrati](https://docs.near-intents.org/security-compliance/risk-and-compliance) rispetto a diversi database AML e afferma che la copertura varia in base al flusso e all'integrazione. In base ai suoi termini, uno swap segnalato può essere ritardato, bloccato, congelato o rifiutato.

### **Cosa condividi durante uno swap**

- L'indirizzo ZEC che riceve lo swap e un indirizzo di rimborso sulla rete di origine.
- L'asset e l'importo, nonché la transazione di deposito che invii, pubblica sulla chain di origine.
- Dati di connessione. I termini di 1Click affermano che Intents Technology può raccogliere metadati delle richieste, indirizzi IP e indirizzi wallet, mentre l'informativa sulla privacy su near.com elenca indirizzo IP, posizione, browser e informazioni sul dispositivo.
- Qualsiasi elemento aggiunto dall'app, come altri indirizzi wallet connessi. Le app possono inoltre sottoporre il tuo wallet ai propri controlli di conformità.

### **Dove controllare termini e assistenza**

I termini cambiano, quindi leggi le versioni correnti prima di effettuare uno swap di grande importo.

- **Inizia dall'app che usi.** È il tuo principale punto di contatto. I termini dell'API 1Click affermano che Intents Technology non ha un rapporto diretto con gli utenti delle app costruite su di essa.
- **Near Intents:** i termini e l'informativa sulla privacy su near.com/terms e near.com/privacy, oltre ai [termini dell'API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e a [rischio e conformità](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Tracciamento e assistenza:** cerca uno swap su [Near Intents Explorer](https://explorer.near-intents.org) o chiedi nel [Near Intents Telegram](https://t.me/near_intents).
- **Rimborsi:** uno swap non riuscito può essere rinviato all'indirizzo di rimborso fornito, ma i termini di near.com affermano che un rimborso non è garantito. I termini di 1Click affermano inoltre che le richieste di recupero per errori dell'utente inferiori a USD 300 non vengono prese in considerazione.

Ora esploriamo alcuni degli exchange non-custodial accessibili che facilitano il trading di Zcash. L'utilizzo di queste piattaforme ti fornirà un modo pratico per acquisire più monete Zcash.

### **Riepilogo**

Gli exchange non-custodial, o DEX, ti consentono di negoziare dal tuo wallet mantenendo il controllo delle tue chiavi private. Ciò favorisce la sicurezza, ma la privacy dipende dal percorso: la chain di origine è pubblica, il servizio vede i tuoi indirizzi e i dati di connessione e il tuo ZEC è privato solo quando si trova in un indirizzo schermato.

Sebbene gli exchange non-custodial offrano vantaggi interessanti, è importante riconoscere che potrebbero presentare svantaggi, come potenziali problemi di liquidità e una curva di apprendimento più ripida per gli utenti meno esperti.

Come per qualsiasi decisione finanziaria, i trader dovrebbero valutare attentamente le proprie priorità, la tolleranza al rischio e la familiarità con la tecnologia prima di scegliere tra opzioni di exchange non-custodial e custodial.
