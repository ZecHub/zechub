# Firma a freddo schermata

> **Idea chiave:** Il portafoglio companion vede tutto ciò che serve per creare e monitorare una transazione schermata. Solo il portafoglio hardware detiene l'autorità per autorizzare una spesa. Questa separazione è l'intero scopo della firma a freddo schermata.

La schermatura in Zcash comporta lo spostamento di fondi da un indirizzo pubblico e trasparente a uno privato e schermato, nascondendo i dettagli della transazione mediante le funzionalità di privacy di Zcash.

### Cosa cambia quando schermate ZEC?

Con una transazione di Zcash trasparente, informazioni quali:

- indirizzo del mittente
- indirizzo del destinatario
- importo trasferito

sono osservabili sulla blockchain.

Quando schermate ZEC, i tuoi fondi entrano in una pool privata, come Ironwood. La blockchain può verificare che una transazione sia valida senza rivelarne i dettagli privati. Dall'aggiornamento NU6.3 del 28 luglio 2026, i fondi appena schermati entrano nella pool Ironwood, poiché la vecchia pool Orchard non accetta più nuovi depositi, ma consente ancora i prelievi.

### Componenti di una transazione schermata

### 1. La nota (il registro del saldo schermato)

Una nota è un registro crittografico privato che rappresenta un importo non speso di ZEC posseduto da un utente.

A differenza di una blockchain pubblica, dove i saldi sono elencati in chiaro, una nota schermata cifra il valore e i dettagli di proprietà affinché gli osservatori on-chain non possano vedere chi possiede i fondi.

Quando avvii una transazione, il portafoglio companion analizza il registro, identifica le note non spese dell'utente e seleziona quali note spendere.

### 2. Il nullifier (il meccanismo di rilevamento della doppia spesa)

Poiché i dettagli di una nota sono nascosti dal registro pubblico, la rete necessita di un meccanismo per rilevare la doppia spesa senza rivelare quale nota venga spesa.

Un nullifier è un contrassegno crittografico univoco derivato da una nota specifica. Quando una nota viene spesa, il suo nullifier viene pubblicato sulla blockchain.

La rete verifica che il nullifier non sia stato registrato in precedenza. Se non lo è stato, la spesa può essere accettata. Fondamentalmente, un osservatore esterno non può usare il nullifier per determinare da quale nota specifica provenga.

Il portafoglio companion deriva e costruisce il nullifier appropriato durante l'assemblaggio dei dati della transazione.

## Chiavi

Le chiavi sono informazioni crittografiche che controllano l'accesso ai tuoi fondi e permettono al tuo portafoglio di eseguire operazioni quali ricevere, visualizzare e spendere ZEC.

Un portafoglio contiene diverse chiavi, ciascuna con uno scopo differente, proprio come un singolo account potrebbe avere credenziali separate per l'accesso in lettura e per quello in scrittura.

Le chiavi sono centrali nella relazione tra il portafoglio companion e il portafoglio hardware, perché chiavi diverse svolgono scopi diversi e soltanto una deve rimanere custodita.

È importante sapere che ogni pool schermata costruisce le proprie chiavi come un albero di derivazione, nel quale le frecce puntano da un componente a qualunque elemento possa esserne derivato. Gli utenti che desiderano ricevere pagamenti schermati devono avere un indirizzo di pagamento schermato, generato da una chiave di spesa.

### La gerarchia delle chiavi

**1. Chiave di spesa**

Questa è la chiave più sensibile dal punto di vista della sicurezza. Fornisce la capacità crittografica di autorizzare la spesa di ZEC.

Questa è la chiave cui si fa riferimento ogni volta che in questo rapporto si afferma che "il portafoglio hardware detiene la chiave".

In un'architettura di firma a freddo, la chiave di spesa è conservata all'interno del portafoglio hardware e non viene mai esposta al portafoglio companion. Il portafoglio companion non dovrebbe dover possedere affatto questa chiave.

Sia in Sapling sia in Orchard, le gerarchie delle chiavi derivano l'autorità di spesa e le capacità di visualizzazione come due rami distinti da una chiave di spesa radice:

- **Sapling:** Una chiave di spesa espansa (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva chiavi di autorizzazione alla prova (𝑎𝑘,𝑛𝑠𝑘) e Full Viewing Key (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), che a loro volta generano Incoming Viewing Key (𝑖𝑣𝑘) e indirizzi diversificati.
- **Orchard:** Una chiave di spesa radice (𝑠𝑘) si dirama direttamente in una chiave di autorizzazione alla spesa (𝑎𝑠𝑘) e una Full Viewing Key (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Questa separazione strutturale fornisce il fondamento crittografico formale per l'isolamento delle chiavi hardware: il portafoglio esporta il ramo di visualizzazione (UFVK) al computer host per la sincronizzazione del saldo e la creazione delle transazioni, mantenendo permanentemente bloccato sul dispositivo il ramo di autorizzazione alla spesa.

La derivazione delle chiavi è rigorosamente unidirezionale. Ciò significa che le chiavi di visualizzazione non possono essere invertite per ricostruire l'autorità di spesa. L'irreversibilità crittografica rende sicura l'esportazione di una Unified Full Viewing Key (UFVK), perché concede visibilità completa sul portafoglio senza esporre i segreti di spesa presenti sul dispositivo.

**2. Chiavi di visualizzazione**

Zcash separa la capacità di vedere l'attività schermata dalla capacità di spenderla. Una chiave di visualizzazione consente a un portafoglio o a un'altra parte autorizzata di visualizzare informazioni sulle transazioni schermate senza concedere autorità di spesa.

- **Full Viewing Key (FVK), racchiusa come Unified Full Viewing Key (UFVK):** derivata intenzionalmente dalla chiave di spesa, consente al software di rilevare e decifrare l'attività schermata del portafoglio, identificando così le transazioni. Consente inoltre di calcolare i saldi senza poter autorizzare una spesa. È meglio descriverla come un derivato meno privato della chiave di spesa, non come una copia più debole del seed.

La Full Viewing Key (FVK) fornisce visibilità completa in sola lettura mantenendo una rigorosa separazione della sicurezza. Decifrando sia i testi cifrati delle note in entrata sia quelli delle note in uscita, tramite il componente outgoing-viewing-key, un portafoglio companion con la sola FVK può mostrare una cronologia completa e etichettata delle transazioni anziché soltanto un saldo progressivo.

Più indirizzi di pagamento diversificati e non collegabili condividono la stessa FVK e Incoming Viewing Key (IVK), permettendo la generazione illimitata di indirizzi senza aumentare il sovraccarico di scansione della blockchain.

Questa separazione funzionale costituisce il fondamento dei flussi di firma a freddo. Tutta la scansione continua della chain, il monitoraggio della cronologia e la gestione degli indirizzi sono delegati al software host, mentre l'autorità di spesa rimane isolata sul dispositivo hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### La distinzione fondamentale: UFVK e chiave di spesa

> **La UFVK può essere condivisa. La chiave di spesa deve rimanere sul portafoglio hardware.**
>
> Il portafoglio companion usa la chiave di visualizzazione per monitorare il portafoglio, rilevare i fondi in entrata, identificare le note e aiutare a preparare le transazioni. Non possiede la chiave privata necessaria per autorizzare la spesa.

Come affermato in precedenza, la separazione delle chiavi è il fondamento dell'architettura di firma a freddo.

Il portafoglio companion può svolgere gran parte del lavoro necessario per preparare una transazione senza mai controllare i fondi. Il portafoglio hardware deve soltanto ricevere la transazione preparata ed eseguire l'operazione di firma finale.

I produttori di portafogli hardware non devono inventare questa separazione autonomamente. La progettazione delle chiavi di Zcash separa già le capacità di visualizzazione dall'autorità di spesa a livello di protocollo, e i produttori costruiscono semplicemente le proprie funzioni di firma ed esportazione su questa struttura esistente. Il protocollo permette di derivare informazioni quali un indirizzo schermato o una chiave di visualizzazione completa da una chiave di spesa, mentre la chiave di spesa stessa resta privata. Ciò consente a portafogli hardware come Ledger, Keystone e Hito di fornire al software companion le informazioni di visualizzazione necessarie senza mai esporre la chiave privata che può spendere i fondi.

### Cosa fa effettivamente il portafoglio companion con le informazioni delle chiavi

Usando il materiale delle chiavi di visualizzazione, il portafoglio companion può:

- identificare i tuoi fondi e le tue note
- determinare quali note possono essere spese
- derivare o identificare indirizzi pertinenti
- costruire la transazione
- generare o coordinare le prove richieste
- preparare la transazione per la firma

È importante sapere che dover costruire una transazione non equivale ad avere bisogno della chiave privata di spesa. Questo disaccoppiamento è una delle idee centrali di sicurezza dietro l'integrazione dei portafogli hardware.

## Costruzione e autorizzazione delle transazioni schermate

Questi sono i processi coinvolti nella creazione e nell'autorizzazione della transazione. In termini semplici, sono ciò che il portafoglio fa effettivamente con quei dati per inviare denaro:

### Costruzione della transazione (assemblaggio della transazione schermata)

La costruzione della transazione è il processo di assemblaggio delle informazioni richieste per creare una transazione di Zcash valida a partire dal pagamento previsto dall'utente.

Il processo combina le note selezionate, i destinatari, gli importi, le commissioni, i nullifier e gli altri dati richiesti in una struttura di transazione. Per le transazioni schermate prepara anche le informazioni richieste per generare le necessarie prove a conoscenza zero e firme.

Il portafoglio companion svolge generalmente questa fase. Esso:

- seleziona le note da spendere
- determina gli input e gli output della transazione
- calcola i valori necessari
- prepara i dati della transazione che saranno successivamente sottoposti a prova e firmati.

In una configurazione di firma a freddo, i dati della transazione risultanti possono essere confezionati in un PCZT e passati al portafoglio hardware per la fase di firma critica per la sicurezza.

### Produzione delle prove (dimostrazione della validità del protocollo)

La produzione delle prove si riferisce alla generazione di prove a conoscenza zero, come Halo 2 o Groth16, che dimostrano che una transazione segue le regole del protocollo Zcash.

La prova aiuta la rete a garantire che:

- L'utente che spende sia autorizzato a spendere le note
- Le note esistano realmente
- I nullifier corrispondenti siano univoci
- Il totale degli input sia uguale al totale degli output più le commissioni.

Fa tutto questo senza rivelare alcun dettaglio privato sottostante.

La generazione delle prove richiede un'intensa capacità di calcolo. Delegare questa responsabilità al dispositivo companion evita che il portafoglio hardware si blocchi o esaurisca la memoria.

### Firma (autorizzazione della spesa)

La firma è fondamentalmente distinta dalla produzione delle prove. Una firma digitale agisce come un esplicito timbro di autorizzazione prodotto dal titolare della chiave privata.

Mentre una prova a conoscenza zero verifica la validità della transazione, una firma digitale dimostra l'autorità di spesa. La firma certifica che il vero proprietario approva i parametri specifici del trasferimento.

La firma richiede una potenza di calcolo minima, rendendola ideale per un portafoglio hardware.

### Cos'è la firma a freddo schermata?

La firma a freddo schermata è un metodo per autorizzare una transazione schermata di Zcash mantenendo le chiavi private di spesa isolate dal portafoglio companion connesso a Internet. La transazione può essere costruita e preparata su un computer online, mentre un portafoglio hardware separato, mantenuto offline o altrimenti isolato, usa le proprie chiavi protette per autorizzare la transazione.

Il processo può essere semplificato come segue:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Il portafoglio companion invia i parametri strutturati della transazione al dispositivo hardware, che firma internamente il payload senza mai rilasciare la chiave privata di spesa alla macchina host.

## Portafogli companion e hardware

Le transazioni schermate possono coinvolgere sia un portafoglio companion sia un portafoglio hardware, ognuno con una funzione distinta.

### Portafoglio companion

Cos'è un portafoglio companion?

Il portafoglio companion viene eseguito su un computer o dispositivo mobile e svolge la maggior parte dei compiti coinvolti nella creazione della transazione, quali:

- selezionare le note da spendere
- costruire la transazione
- calcolare i dati necessari della transazione
- coordinare la generazione delle prove a conoscenza zero richieste.

### Perché un portafoglio companion è utile?

Il portafoglio companion gestisce il processo di creazione della transazione, ma se il computer viene infettato da malware, un aggressore potrebbe:

- vedere cosa stai facendo,
- modificare una transazione non firmata,
- cercare di indurti ad approvare qualcosa.

Il portafoglio companion non deve avere accesso alla chiave privata conservata sul portafoglio hardware; può quindi gestire la costruzione delle transazioni e altri compiti computazionali, mentre il portafoglio hardware fornisce il confine di sicurezza per la chiave privata.

### Portafoglio hardware

Un portafoglio hardware è un dispositivo fisico offline che isola le tue chiavi private da telefoni o computer connessi, agendo come una cassaforte sicura per le tue risorse crypto.

### Perché un portafoglio hardware è utile?

Se il tuo computer viene infettato da malware, un aggressore potrebbe:

- vedere cosa stai facendo,
- modificare una transazione non firmata,
- cercare di indurti ad approvare qualcosa.

La chiave privata non può essere semplicemente estratta dal portafoglio hardware, quindi il dispositivo può agire come confine di sicurezza.

Immagine delle capacità del companion rispetto all'hardware

La separazione tra questi due portafogli è particolarmente importante per le transazioni schermate perché sono più complesse delle transazioni trasparenti e coinvolgono componenti quali note schermate, nullifier, commitment, prove a conoscenza zero e firme di transazione.

Sarebbe impraticabile per il portafoglio hardware svolgere ogni operazione computazionale. Il portafoglio companion prepara invece la transazione e fornisce al portafoglio hardware le informazioni necessarie per la firma, mentre la chiave privata di spesa rimane isolata nel dispositivo hardware.

## Isolamento delle chiavi

> L'isolamento delle chiavi significa che le chiavi private in grado di autorizzare una spesa non lasciano mai il portafoglio hardware. Il companion può preparare la transazione; non può firmarla.

L'isolamento delle chiavi si riferisce al mantenimento separato delle chiavi private richieste per autorizzare una transazione dal portafoglio companion e dal dispositivo sul quale viene eseguito. In una configurazione di firma a freddo schermata, il portafoglio companion può costruire la transazione e coordinare le prove richieste, mentre il portafoglio hardware mantiene isolate le chiavi private di spesa sensibili.

Se il computer o il telefono companion viene compromesso, un aggressore può essere in grado di interagire con la transazione prima della firma, ma idealmente non può estrarre la chiave privata dal portafoglio hardware. La chiave resta quindi entro il confine di sicurezza del dispositivo hardware.

Questa separazione permette al portafoglio companion di eseguire la costruzione della transazione e compiti computazionali senza dargli accesso diretto al materiale delle chiavi richiesto per autorizzare la transazione.

![Key isolation](/content-images/key-isolation.webp)

La distinzione fondamentale è che "chiave di visualizzazione" non significa che l'app riceva una versione più debole del seed.

In Zcash, una Full Viewing Key (FVK/UFVK) viene derivata intenzionalmente dalla chiave di spesa e conferisce al titolare la capacità di rilevare e decifrare l'attività schermata pertinente, ma non di autorizzare spese. La FVK è un derivato meno segreto della chiave di spesa.

**Un'importante avvertenza sulla privacy:**

Dovresti quindi sapere che l'app non può rubare i fondi con la sola UFVK, ma può vedere l'attività privata schermata del portafoglio.

Per questo è più accurato descrivere l'applicazione companion come dotata di *autorità di visualizzazione*, anziché dire semplicemente che ha "informazioni pubbliche".

Il modo più semplice per esprimere l'intera idea è che il portafoglio companion riceve sufficiente materiale di chiave per sapere cosa accade al portafoglio, ma non sufficiente materiale di chiave per autorizzare ciò che accade ai fondi del portafoglio. Il portafoglio hardware, invece, mantiene isolata l'autorità di spesa e la usa solo quando l'utente approva una transazione.

Questo è il modello fondamentale di isolamento delle chiavi alla base di questi progetti di portafogli hardware schermati di Zcash ed è lo stesso modello che ricorre, implementazione dopo implementazione, in Ledger, Keystone e Hito, che saranno trattati a breve.

## PCZT

PCZT significa Partially Created Zcash Transaction. È il pacchetto che trasporta una transazione di Zcash e le informazioni necessarie per completarla da una fase all'altra.

È un formato standardizzato per una transazione di Zcash mentre è ancora in costruzione. Permette a diversi partecipanti o dispositivi di svolgere parti differenti del processo di creazione della transazione e di passarsi tra loro la transazione parzialmente completata.

Costruire una transazione è significativamente più complesso che firmare un semplice trasferimento pubblico nei protocolli di criptovaluta a conoscenza zero come Zcash. Le transazioni schermate richiedono prove a conoscenza zero computazionalmente intensive, come quelle generate usando Halo 2 o Groth16. Di conseguenza, dispositivi a bassa potenza come i portafogli hardware possono non disporre della memoria e della capacità di elaborazione necessarie per gestire l'intero flusso della transazione.

L'introduzione di PCZT affronta diverse sfide fondamentali dell'architettura crypto schermata. PCZT è un formato standardizzato di dati intermedi che suddivide la creazione delle transazioni in ruoli modulari e indipendenti. Permette a un potente computer companion di gestire l'assemblaggio della transazione e la generazione delle prove, limitando un portafoglio hardware offline strettamente all'autorizzazione e alla firma.

### Limitazioni dell'hardware e della conservazione a freddo

Sebbene i portafogli hardware forniscano un ambiente sicuro per proteggere le chiavi private di spesa, dispongono generalmente di RAM, potenza di calcolo e capacità di trasferimento dati limitate rispetto ai computer companion. Questi limiti rendono impraticabile per loro eseguire la generazione computazionalmente intensa di prove a conoscenza zero o mantenere lo stato completo della transazione richiesto durante il processo di costruzione.

Di conseguenza, il portafoglio companion può gestire i compiti computazionalmente impegnativi, mentre il portafoglio hardware resta concentrato sull'operazione critica per la sicurezza di autorizzare la transazione con le proprie chiavi di spesa protette.

Viene da chiedersi: se il dispositivo è così vincolato, come riesce comunque a svolgere *abbastanza* verifiche da essere affidabile?

In parole semplici, un portafoglio hardware non può accettare un valore arbitrario da un computer companion e firmarlo. Necessita di informazioni sufficienti per stabilire che il valore firmato corrisponda alla transazione che l'utente intende autorizzare. Questo crea un equilibrio difficile, poiché il dispositivo deve eseguire analisi e verifiche sufficienti per proteggere il processo di firma, operando al contempo entro limiti rigorosi di memoria, calcolo, dimensione del firmware e complessità dell'implementazione.

La gestione di Ledger Orchard PCZT è un esempio di questa sfida: suggerisce che un parsing specializzato dipendente dal circuito può rendere l'implementazione più gestibile sui dispositivi vincolati, ma può anche richiedere modifiche al firmware quando si evolvono le strutture di transazione o i circuiti supportati.

Due sforzi in corso illustrano risposte differenti a questo stesso vincolo.

Una proposta di ricerca su una pipeline di produzione delle prove completamente a tempo costante, adatta ad architetture di portafogli hardware open source e computer comuni, è stata avanzata nel Grant #423. L'obiettivo era indagare un'infrastruttura crittografica implementabile in sicurezza in ambienti quali C o Rust, riducendo al contempo la complessità e l'onere di manutenzione del supporto per Zcash schermato.

Un approccio alternativo è rappresentato dalla proposta **Zcash SeedSigner**, un firmatario open source air-gapped costruito con componenti economici e facilmente reperibili. Il flusso proposto mantiene il computer companion separato dal dispositivo di firma, passando un PCZT attraverso un air gap per la verifica e la firma sul dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Insieme, questi approcci illustrano la più ampia sfida ingegneristica dei portafogli hardware schermati: la costruzione della transazione e la produzione delle prove possono avvenire fuori dal dispositivo critico per la sicurezza, ma il firmatario deve comunque disporre di informazioni e capacità di verifica sufficienti per autorizzare in sicurezza la transazione risultante.

### PCZT abilita l'architettura separata

Lo standard Partially Created Zcash Transaction (PCZT) è la struttura formale di dati che collega il portafoglio companion e il portafoglio hardware.

Un portafoglio companion può gestire da solo la selezione delle note, calcolare i nullifier e generare la prova a conoscenza zero. Ciò è possibile perché le informazioni necessarie per questi passaggi, inclusa la chiave usata per derivare i nullifier, provengono dalla chiave di visualizzazione anziché da qualsiasi elemento legato all'autorità di spesa. Il portafoglio companion poi inserisce questi elementi in un contenitore PCZT.

Il PCZT viene consegnato al portafoglio hardware, che legge il contesto della transazione, come importi e indirizzi dei destinatari, applica la firma con le proprie chiavi di spesa protette e restituisce il PCZT aggiornato al dispositivo companion.

Questo progetto stabilisce un rigoroso confine di sicurezza: un potente hardware host può eseguire complessa matematica a conoscenza zero senza necessitare dell'accesso alle chiavi di spesa, mentre dispositivi di conservazione a freddo a bassa potenza possono applicare la sicurezza finanziaria senza dover calcolare crittografia pesante.

### Compromessi sulla privacy del prover

Sebbene delegare la generazione delle prove a conoscenza zero al portafoglio companion o a un altro prover mantenga isolate le chiavi di spesa, richiede comunque che il prover acceda a informazioni sensibili della transazione, quali valori delle note, indirizzi dei destinatari e commitment.

Il PCZT mantiene la separazione architetturale assicurando che tali informazioni possano essere fornite per la produzione delle prove senza trasferire le chiavi private di spesa richieste per l'autorizzazione.

Ciò garantisce che l'autorità di produzione delle prove sia separata dall'autorità di spesa. Il prover può eseguire la generazione computazionalmente intensa delle prove senza ottenere l'autorità crittografica per spendere i fondi dell'utente.

### Interoperabilità PCZT

Man mano che PCZT diventa una parte importante dei flussi di portafogli hardware, multisignature e firma air-gapped di Zcash, l'interoperabilità tra implementazioni indipendenti diventa sempre più importante.

Una proposta del giugno 2026 di AngryDavee osservava che esistevano già implementazioni PCZT in progetti che includevano Ledger, Keystone, Hito, OneKey e l'implementazione di riferimento in librustzcash. Tuttavia, la proposta identificava la mancanza di test condivisi per confermare che queste implementazioni interpretassero PCZT in modo coerente.

La soluzione proposta era una suite di test di interoperabilità open source contenente vettori di test canonici PCZT e test tra implementazioni che coprissero il flusso completo crea → firma → finalizza. Proponeva inoltre di testare i confini dei ruoli come il Combiner, nel quale informazioni parzialmente firmate da diversi firmatari possono essere combinate prima che una transazione sia finalizzata.

Questo è particolarmente rilevante per i portafogli hardware perché PCZT consente di separare la costruzione della transazione dalla firma: un portafoglio companion può costruire una transazione e preparare un PCZT, mentre un dispositivo hardware riceve le informazioni di firma richieste ed esegue l'operazione di firma critica per la sicurezza.

La proposta non è stata implementata perché Zcash Community Grants ha deciso di non procedere con il finanziamento dopo aver esaminato la proposta e considerato i feedback della comunità. Di conseguenza, la suite di test tra implementazioni proposta non è stata sviluppata tramite questo finanziamento. È quindi una risposta proposta a una sfida identificata di interoperabilità PCZT, non uno standard attualmente esistente in Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Il ciclo di vita di un PCZT

| # | Fase | Descrizione |
|---|---|---|
| 1 | Creator | Inizializza il PCZT con metadati globali della transazione, incluse versioni della transazione, ID del ramo di consenso e flag delle pool. |
| 2 | Constructor | Popola la transazione con gli input e gli output previsti nelle pool trasparente, Sapling, Orchard o Ironwood. |
| 3 | IO Finalizer | Dichiara completo l'insieme di input e output, calcola le chiavi della firma di binding e firma le spese fittizie dove richiesto. |
| 4 | Updater | Allega i dati di contesto necessari per i partecipanti successivi, quali Full Viewing Key, anchor e testimoni Merkle. |
| 5 | Prover e Signer | Esegue la generazione delle prove a conoscenza zero e la firma crittografica. Nelle moderne versioni di PCZT, questi due compiti sono completamente indipendenti e possono avvenire in sequenza o in parallelo. |
| 6 | Combiner | Unisce deterministicamente più istanze PCZT se dispositivi diversi lavorano simultaneamente su aspetti della stessa transazione. Le regole di unione richiedono una rigorosa risoluzione dei conflitti per evitare perdite accidentali di dati. |
| 7 | Spend Finalizer & Extractor | Convalida tutti gli elementi crittografici richiesti, rimuove i metadati di contesto intermedi e produce la transazione di Zcash finalizzata pronta per la trasmissione in rete. |

## Implementazioni reali di portafogli hardware

### A colpo d'occhio

| Dispositivo   | Cosa riceve il companion              | Cosa rimane sul dispositivo          | Trasporto      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, indirizzi            | Autorità di spesa                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / chiavi di spesa              | QR (air-gapped)|
| Hito     | UFVK, Unified Address, impronta del seed  | Seed e chiavi private di spesa    | QR / locale     |

Diverse implementazioni di portafogli hardware sono state sviluppate per esplorare come supportare transazioni schermate di Zcash mantenendo isolate dal portafoglio companion le chiavi di spesa sensibili. Ledger, Keystone e Hito rappresentano approcci differenti all'integrazione della protezione delle chiavi basata su hardware con il flusso di transazione di Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Per comprendere come proteggano i fondi schermati, è importante distinguere tra chiavi di spesa e chiavi di visualizzazione. In tutti e tre i casi, la separazione segue la stessa struttura:

| Dispositivo | Cosa può ricevere l'app companion | Cosa resta protetto sul dispositivo |
|---|---|---|
| Ledger | UFVK / Orchard FVK, indirizzi e informazioni pubbliche | Autorità di spesa / materiale delle chiavi private |
| Keystone | UFVK + Unified Address | Seed / chiavi di spesa |
| Hito | UFVK, Unified Address, impronta del seed e informazioni di rete | Seed e chiavi private di spesa |

### Ledger come ambiente hardware di firma

Ledger è un'azienda di portafogli hardware. I suoi dispositivi sono costruiti attorno a un Secure Element, un chip dedicato progettato per conservare materiale di chiavi private e mantenerlo fisicamente isolato dal resto del dispositivo e da qualunque cosa vi sia connessa. Quel Secure Element è l'intera ragione per cui un dispositivo Ledger è affidabile per la conservazione a freddo. Ciò significa che, anche se il computer o telefono collegato viene compromesso, le chiavi nel Secure Element non possono essere estratte.

Da solo, però, un dispositivo Ledger è vuoto rispetto a una specifica criptovaluta. Necessita di un'applicazione installata che sappia gestire la crittografia specifica di quella valuta.

Un dispositivo Ledger è vuoto rispetto a qualsiasi criptovaluta specifica, quindi necessita di un'applicazione che conosca la crittografia di quella valuta. Per Zcash ci sono state due generazioni:

- L'app originale “Zcash Shielded” realizzata da Zondax, usata con portafogli companion quali Zkool e ritirata il 5 novembre 2026 e,
- La più recente app Zcash di Ledger (3.9.4+), usata nativamente da Ledger Wallet Desktop 4.21+ per Ironwood schermato ZEC.

Il modello di isolamento delle chiavi qui sotto si applica a entrambe.

Zkool è il portafoglio companion sul tuo telefono o computer che comunica con quell'app. Costruisce la transazione, la invia a Ledger, l'app Zondax sul dispositivo la firma e restituisce la firma.

Quindi Zondax è il software eseguito sull'hardware, Zkool è il software eseguito esternamente che usa l'app di Zondax per comunicare con il dispositivo.

### Cosa esce da Ledger?

Il software Zcash di Ledger include una funzione specifica per esportare la chiave di visualizzazione del portafoglio, ovvero la chiave che permette al software di vedere saldi e transazioni senza poter spendere nulla.

Questa funzione può restituire una di due cose:

- Una Unified Full Viewing Key (UFVK), ovvero la chiave di visualizzazione completa che copre contemporaneamente tutte le pool schermate di Zcash, oppure
- Una Orchard Full Viewing Key (FVK)

In entrambi i casi, ciò che esce è sempre e solo una chiave di visualizzazione. Indipendentemente dalla versione richiesta, questa funzione non può restituire l'unica informazione che permetterebbe effettivamente a qualcuno di spostare fondi: la chiave di spesa.

Questo è lo scopo della sua progettazione: è stata concepita affinché l'unica cosa che possa esportare sia qualcosa di sicuro da consegnare a un'app companion.

La gerarchia delle chiavi di Zcash è strutturata in modo che per ogni pool schermata, la chiave di spesa derivi due elementi separati:

- Una chiave di autorizzazione alla spesa, e
- Una chiave di visualizzazione completa

La FVK può poi derivare ulteriori capacità relative alla visualizzazione, ma in nessun momento questo percorso di derivazione porta di nuovo all'autorità di spesa. Una volta che una chiave si è diramata nel lato di visualizzazione della gerarchia, resta lì e non può essere usata per ricostruire la chiave di autorità di spesa dalla quale proviene.

Ironwood segue lo stesso schema, poiché riusa la costruzione sottostante di chiavi e note di Orchard. Tuttavia, è una pool distinta a livello di consenso, con il proprio albero di commitment e insieme di nullifier. Ciò significa che una UFVK è realmente un insieme di chiavi di visualizzazione per pool, trasparente, Sapling, Orchard e ora Ironwood, non una singola chiave piatta.

Una UFVK esportata prima dell'attivazione di Ironwood non includerà una chiave di visualizzazione Ironwood, perché quella pool non esisteva ancora. Questo è esattamente il motivo per cui i portafogli hanno dovuto aggiornarsi per riconoscere e derivare UFVK compatibili con Ironwood dopo l'aggiornamento NU6.3.

### Cosa resta su Ledger?

L'autorità di spesa resta sul dispositivo.

Il Signer Ledger riceve una transazione/PCZT dall'host e genera la firma di autorizzazione alla spesa in base alla pool da cui la transazione spende, la pool Ironwood poiché l'integrazione attuale di Ledger supporta soltanto Ironwood. La firma viene quindi prodotta sul dispositivo e l'host riceve soltanto la firma, non la chiave privata di spesa.

Ciò è coerente anche con il modello generale di sicurezza di Ledger. Il suo Secure Element isola il materiale delle chiavi private e i requisiti di sicurezza delle applicazioni di Ledger proibiscono specificamente alle applicazioni di esporre quei segreti all'host.

Il firmatario di Ledger può esportare la FVK/UFVK mentre esegue in modo indipendente la firma delle transazioni. Le due capacità sono fornite attraverso funzioni separate, non riunite in una sola.

### Cosa significa nella pratica?

Supponi che il tuo Ledger contenga 10 ZEC.

Il portafoglio companion può possedere la UFVK e quindi determinare: "Questo portafoglio ha ricevuto 10 ZEC." Può analizzare e mostrare transazioni e saldi.

Ma se qualcuno compromette il portafoglio companion, la sola UFVK non gli permette di creare la firma di autorizzazione alla spesa.

Lo scopo della firma di autorizzazione alla spesa separata è permettere a dispositivi vincolati come i portafogli hardware di autorizzare spese schermate senza dover produrre essi stessi l'intera prova zk-SNARK.

### Applicazione Zondax Ledger; il lato del portafoglio hardware

#### Cos'è Zondax?

Zondax è una società di sviluppo terza che ha realizzato l'app Ledger Zcash. È l'applicazione firmware effettiva eseguita sull'hardware Ledger e conferisce al dispositivo la capacità di comprendere ed elaborare fin dall'inizio le transazioni di Zcash.

Zondax è uno sviluppatore esterno. L'hardware Ledger non ha una capacità innata di elaborare transazioni di Zcash, e tale capacità proviene interamente dal software di Zondax.

### Implementazione originale Zcash Ledger

Il repository dell'app Ledger Zcash di Zondax è il software eseguito su un dispositivo Ledger. L'app era inizialmente incentrata sulle transazioni schermate Sapling, prima che Orchard esistesse come pool schermata primaria di Zcash, quindi il supporto Sapling era l'estensione di ciò che un dispositivo Ledger poteva fare con ZEC schermato.

La sua architettura illustra la separazione: il lato host/companion prepara le informazioni della transazione, mentre Ledger gestisce le operazioni sensibili sulle chiavi e la firma.

Anche in questa primissima versione del supporto ai portafogli hardware di Zcash, i principi fondamentali, ovvero costruzione e produzione delle prove sull'host e firma isolata sul dispositivo, erano già alla base del progetto.

### Evoluzione verso Orchard

Il lavoro di Ledger si è spostato verso Orchard + PCZT. Questa è stata una transizione significativa anziché un aggiornamento minore, dato che Orchard usa un sistema di produzione delle prove diverso, Halo 2 rispetto a Groth16 di Sapling, e una costruzione diversa di note e chiavi. Estendere il firmware soltanto Sapling per gestire la firma Orchard richiedeva quindi nuove basi crittografiche sul lato del dispositivo, non una semplice patch del firmware.

Tuttavia, mentre Zcash si avvicinava a Ironwood, Zondax e Ledger hanno spostato il proprio sviluppo verso il supporto diretto di Ironwood, anziché completare un'implementazione Orchard soltanto per riprogettarla successivamente per Ironwood. Ciò rappresenta una fase ulteriore nell'evoluzione dell'implementazione Ledger, poiché Ironwood si basa sull'architettura crittografica Orchard introducendo al contempo una pool schermata separata e ulteriori modifiche al protocollo.

### Cosa accade all'interno di questa app Ledger

Il flusso risultante è descritto come segue:

1. L'host costruisce un PCZT.
2. L'host invia le informazioni pertinenti della transazione al dispositivo Ledger.
3. Il dispositivo produce le firme di autorizzazione alla spesa Orchard.
4. L'host gestisce tutto ciò che segue, inclusa la firma di binding e l'assemblaggio finale della transazione.

L'app eseguita all'interno di Ledger non vede né produce altro oltre alla firma di autorizzazione alla spesa stessa, e tutto il lavoro pesante sul piano computazionale o esigente in termini di dati, prove, binding e assemblaggio, resta sull'host, che non deve essere considerato affidabile per il materiale delle chiavi.

### L'integrazione schermata nativa di Ledger; Ledger Wallet Desktop

L'ultima integrazione Zcash di Ledger fornisce un esempio concreto di come la costruzione delle transazioni schermate e la firma critica per la sicurezza possano essere separate tra software companion e portafoglio hardware.

Con Ledger Wallet Desktop 4.21+ e l'app Zcash del dispositivo 3.9.4+, gli utenti possono inviare e ricevere Ironwood schermato ZEC direttamente tramite Ledger Wallet Desktop. L'integrazione supporta trasferimenti da privato a privato, schermatura dalla pool trasparente, deschermatura verso la pool trasparente, indirizzi di ricezione privati e memo. Le transazioni vengono verificate e firmate sul dispositivo Ledger anziché basarsi esclusivamente sulle informazioni presentate dal computer.

Una parte fondamentale di questa architettura è la separazione tra capacità di visualizzazione e di spesa. Durante la sincronizzazione del saldo privato, Ledger esporta una Unified Full Viewing Key (UFVK), conservata localmente sul computer. La UFVK permette a Ledger Wallet Desktop di rilevare le transazioni schermate pertinenti e determinare il saldo del portafoglio, ma non conferisce l'autorità di spendere i fondi. L'autorità di spesa critica per la sicurezza resta sul dispositivo Ledger, che esegue l'operazione di firma finale. Ciò crea un confine chiaro tra il computer, che gestisce lo stato del portafoglio e costruisce le transazioni, e il dispositivo hardware, che protegge la capacità richiesta per autorizzare le spese.

Tuttavia, l'integrazione attuale è specificamente limitata a Ironwood. Non mostra né gestisce fondi Orchard o Sapling tramite Ledger Wallet Desktop. Questo è storicamente significativo perché il precedente sviluppo Zcash di Ledger era associato al supporto schermato Orchard prima che l'implementazione evolvesse verso il protocollo Ironwood.

La transizione evidenzia anche l'importanza della compatibilità tra chiavi e account. Ledger dispone di una vecchia applicazione “Zcash Shielded” sviluppata da Zondax e usata da integrazioni come YWallet e zkool, che ora viene ritirata. Poiché quell'applicazione più vecchia usava uno schema di derivazione differente per gli account schermati, i suoi account Sapling non possono essere semplicemente riprodotti dalla nuova applicazione Ledger.

L'integrazione illustra quindi sia i progressi sia le limitazioni rimanenti del supporto dei portafogli hardware schermati. Ledger può ora offrire un'esperienza Ironwood completa, nella quale il software companion gestisce la sincronizzazione del portafoglio e la preparazione delle transazioni mentre il dispositivo hardware resta il confine di sicurezza per la spesa.

Al tempo stesso, la compatibilità storica degli account, il supporto per sole pool schermate specifiche, i limiti di dimensione delle transazioni hardware, le restrizioni della piattaforma e i vincoli computazionali e firmware coinvolti nell'analisi e nella verifica delle transazioni schermate mostrano che il supporto dei portafogli hardware per Zcash dipende non soltanto dalle capacità del protocollo, ma anche dal progetto e dalle risorse di ogni singola implementazione.

### Zkool + Ledger — uso dell'app ufficiale Zondax

Come successore di Ywallet, Zkool ha ereditato l'obiettivo della firma a freddo schermata, ma ha adottato un percorso diverso per raggiungerlo, modellato direttamente dal fatto che la crittografia da sola non rende utilizzabile un'integrazione se l'app di firma non può essere distribuita in sicurezza.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso dell'applicazione Zondax da parte di Zkool

Zkool si è orientato verso l'uso dell'app ufficiale Ledger Zcash sviluppata da Zondax, anziché dell'applicazione proprietaria Ledger abbandonata da Ywallet. Anziché mantenere un'app personalizzata che lo store di Ledger non avrebbe accettato, Zkool ha costruito sull'app già accettata e distribuita tramite l'ecosistema di Ledger.

Questo cambiamento ha significato che gli utenti non dovevano più fare affidamento sull'installazione di un'applicazione Ledger personalizzata non firmata per usare questa integrazione, poiché l'app di Zondax era distribuita ufficialmente attraverso l'ecosistema di Ledger.

Tuttavia, questa integrazione affronta un cambiamento importante il 5 novembre 2026, quando il supporto dell'app Shielded Zcash legacy dovrebbe terminare mentre Ledger la dismette gradualmente. Poiché l'integrazione Ledger di Zkool si basa su questa applicazione, il cambiamento solleva interrogativi sulla futura disponibilità della connessione esistente. L'impatto preciso su Zkool dipende dal fatto che possa continuare a usare l'app legacy fuori da Ledger Wallet o passare a un'alternativa compatibile.

### Pool schermate supportate

Secondo lo sviluppatore di Ywallet, l'integrazione Ledger di Zkool usava l'applicazione ufficiale Ledger sviluppata da Zondax e supportava sia Zcash trasparente sia schermato. Tuttavia, il supporto schermato era limitato a Sapling e non supportava Orchard, oltre ad altre limitazioni dell'integrazione come un massimo di cinque input e output di ciascun tipo e l'assenza di compatibilità con Ledger Live.

Questa limitazione rifletteva l'ambito dell'implementazione sottostante Zondax Ledger dell'epoca. Il precedente lavoro Ledger di Zondax forniva supporto Sapling e la successiva pubblicazione nel 2024 dell'app Zcash Shielded Ledger escludeva inizialmente Orchard e Unified Address. Un'integrazione costruita attorno a quell'applicazione ha quindi ereditato le capacità e le limitazioni dell'implementazione di portafoglio hardware dalla quale dipendeva.

La situazione si è successivamente evoluta con il rilascio dell'app dedicata Zcash Shielded Ledger nel novembre 2024. Zondax ha dichiarato che l'applicazione era stata rilasciata ufficialmente tramite Ledger Live e ha poi pubblicato indicazioni di integrazione e pacchetti Rust e JavaScript per permettere ad altri portafogli di integrarsi con essa. Al lancio, tuttavia, l'applicazione comunicava esclusivamente con Zecwallet Lite Desktop, mentre integrazioni più ampie con i portafogli erano ancora in sviluppo.

La fase successiva è stata lo sviluppo della nuova applicazione Rust basata su Ledger di Zcash. Entro giugno 2026, Ledger riferiva che la condivisione UFVK e la generazione Orchard Unified Address erano state implementate, mentre la firma delle transazioni Orchard e ClearSign erano ancora in sviluppo. Ledger ha inoltre affermato che il lavoro sarebbe proseguito nel percorso Ironwood con il cambiamento del protocollo.

Ironwood ha successivamente richiesto aggiornamenti nell'intero ecosistema di portafogli di Zcash. Zkool ha rilasciato il supporto per la migrazione da Orchard a Ironwood a partire dalla versione 6.24.0 e ha continuato a perfezionare la migrazione e la pipeline delle transazioni nelle versioni successive. Ledger, separatamente, ha unito la firma PCZT v2 nella propria nuova applicazione il 27 luglio, sebbene l'implementazione non avesse ancora completato la revisione di Ledger e il rilascio Ledger Live entro il 20 agosto; una tappa da allora consegnata, con Ledger Wallet Desktop 4.21+ che ora offre direttamente supporto nativo Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

L'evoluzione è quindi meglio intesa non come un singolo aggiornamento da Zondax a Ironwood, ma come diversi sviluppi correlati: l'implementazione originale Sapling-incentrata di Zondax, l'app Zcash Shielded Ledger del 2024, la più recente applicazione Ledger Rust con supporto Orchard e PCZT, l'integrazione nativa di Ledger in Ledger Wallet Desktop e gli aggiornamenti paralleli di portafogli come Zkool durante la transizione dell'ecosistema a Ironwood.

### Supporto attuale dei dispositivi e delle piattaforme Ledger per Zcash

Il supporto per Zcash su Ledger dipende da:

- Il modello del dispositivo
- L'applicazione installata
- La piattaforma usata per gestirlo e,
- Se la transazione è trasparente o schermata.

Al 21 luglio 2026, ultimo aggiornamento di Ledger, l'app Zcash Shielded è supportata su Nano S Plus, Stax e Flex, ma non ancora su Nano X o Nano Gen5.

Nano X e gli altri modelli, eccetto Nano S originale, possono ancora usare la versione classica dell'app Zcash, che supporta le transazioni trasparenti e la spesa di fondi schermati verso indirizzi trasparenti, deschermatura, ma non la firma da schermato a schermato. Nano S originale non supporta nessuna delle due app, perché Ledger sta dismettendo il supporto per il dispositivo e la sua app Zcash più recente non è disponibile su di esso. I dispositivi si collegano a Ledger Wallet, precedentemente Ledger Live, l'applicazione companion di Ledger, disponibile su desktop per Windows, macOS e Linux e su mobile per iOS e Android.

Ledger ha aggiunto Zcash schermato nativo a Ledger Wallet Desktop, basato sulla pool Ironwood, eliminando la necessità di un portafoglio companion separato. ZEC schermato non è ancora supportato sull'app mobile di Ledger per iOS e Android, sebbene il supporto mobile sia pianificato per una futura versione.

Al di fuori del software di Ledger, l'uso schermato dipende da un portafoglio companion compatibile e dalle piattaforme da esso supportate. Man mano che Ledger continua ad ampliare il supporto Ironwood, la compatibilità dipende dal modello del dispositivo, dal firmware, dalla versione dell'app e dal sistema operativo, quindi il supporto generale Zcash non garantisce necessariamente la compatibilità.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Firma a freddo YWallet; un approccio precedente

Ywallet è un portafoglio companion, separato sia da Ledger sia da Zondax, che ha perseguito il proprio percorso verso la firma a freddo schermata.

Ywallet è importante storicamente perché ha esplorato la firma a freddo per Zcash, il che significava che il dispositivo di firma poteva essere mantenuto separato dal portafoglio online.

Per realizzare questa architettura sull'hardware Ledger, Ywallet ha costruito la propria applicazione Ledger, un'app proprietaria distinta dall'app Zondax trattata nella sezione precedente. Ciò significava che Ywallet non si affidava all'implementazione Sapling esistente di Zondax: aveva il proprio firmware che eseguiva il lato di firma della relazione.

### Perché l'integrazione era importante

Avere la crittografia e il codice di firma non è sufficiente. L'integrazione di un portafoglio hardware non è un problema puramente crittografico, ma anche inevitabilmente un problema di distribuzione e piattaforma. Come minimo, coinvolge:

- Approvazione/distribuzione dell'applicazione — se l'app store ufficiale del produttore hardware accetterà e distribuirà l'app
- Sicurezza di firmware/applicazione — se l'app soddisfa i requisiti di sicurezza del produttore per la gestione del materiale delle chiavi
- Protocolli di comunicazione — come il portafoglio companion e il dispositivo scambiano effettivamente i dati della transazione
- Compatibilità con il portafoglio — se i formati dei dati e il flusso dell'app di firma corrispondono a quanto il portafoglio companion si aspetta
- Pool schermate supportate — per quali tra Sapling, Orchard e ora Ironwood l'app possa effettivamente firmare

L'app proprietaria Ledger di Ywallet soddisfaceva i requisiti crittografici e architetturali: poteva firmare transazioni schermate di Zcash, ma non era stata accettata nell'app store ufficiale di Ledger.

### Transizione lontano dall'app proprietaria Ledger

Poiché l'app non era stata accettata ufficialmente, Ywallet avrebbe dovuto chiedere agli utenti di installare firmware non firmato per usarla. Questo è un reale compromesso di sicurezza per gli utenti e Ywallet ha scelto di non chiederlo loro. Ywallet ha quindi infine abbandonato quella particolare integrazione anziché seguire quel percorso.

Anziché rilanciare un'app proprietaria, lo sviluppo successivo, tramite Zkool, il successore di Ywallet, si è spostato verso l'app Ledger ufficiale realizzata da Zondax, sostituendo un'implementazione personalizzata respinta con una standardizzata già accettata nell'ecosistema di distribuzione di Ledger. Questo cambiamento ha infine reso di nuovo possibile un'integrazione funzionante Ledger.

### L'eredità di Ywallet

Anche dopo che Ywallet stesso ha ridotto lo sviluppo attivo, il suo creatore, Hanh, che è anche membro di ZCG, è rimasto una voce rilevante nell'ecosistema, in particolare quando la migrazione di Ironwood ha evidenziato problemi segnalati relativi a fondi che sembravano scomparsi.

**ZODL: un utente reale ha riscontrato fondi mancanti dopo la migrazione Orchard → Ironwood**

Un utente, Jmo0615, ha segnalato che fondi precedentemente visibili nel proprio portafoglio ZODL non apparivano più dopo la migrazione da Orchard a Ironwood. Ha dichiarato di aver ripristinato il seed originale, reimpostato e recuperato il portafoglio e consentito alla versione 3.14.1 (1) di ZODL di sincronizzarsi completamente. Ha anche confermato che non era coinvolto alcun portafoglio hardware Keystone.

Non è stato stabilito che i fondi siano stati effettivamente persi. Si sospetta piuttosto un problema relativo al rilevamento del portafoglio o alla migrazione, nel quale fondi precedentemente visibili non venivano più mostrati dopo la transizione a Ironwood. I fondi che non vengono rilevati o mostrati non dovrebbero essere automaticamente descritti come fondi persi permanentemente, e questa distinzione è importante per comprendere i problemi di migrazione.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: le "note bloccate" possono spiegare fondi apparentemente non disponibili**

Un altro aspetto importante dei portafogli schermati è come lo stato del portafoglio possa influire sui fondi che un utente può effettivamente spendere. Hanh ha spiegato che un utente può bloccare accidentalmente una nota tramite il coin control, una funzionalità che consente agli utenti di scegliere manualmente quali note siano usate per la spesa. In questa situazione, una nota può ancora esistere nel portafoglio ma essere contrassegnata come non disponibile per la spesa.

Questo evidenzia un'importante distinzione nell'indagare problemi del portafoglio. L'importo di ZEC esistente in un portafoglio non è sempre uguale all'importo attualmente disponibile da spendere. Fattori quali selezione delle note, sincronizzazione, stato della migrazione, recupero del portafoglio e impostazioni di coin control possono influire sul saldo mostrato o spendibile. Pertanto, le segnalazioni di “fondi mancanti” dovrebbero distinguere attentamente tra fondi non rilevati o mostrati, fondi rilevati ma non disponibili per la spesa e fondi effettivamente persi.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Cos'è Keystone?**

Keystone è un portafoglio hardware air-gapped. Durante il processo di firma, il suo dispositivo di firma non ha alcuna connessione cablata o wireless diretta con l'app companion e comunica invece tramite codici QR. Qui è abbinato a Zashi, ora rinominato Zodl, il portafoglio companion nativo di Zcash, e questo abbinamento rende il principio di isolamento delle chiavi particolarmente esplicito e facile da tracciare.

**Il flusso Keystone/Zashi**

L'integrazione Zcash di Keystone con Zashi rende questa separazione particolarmente esplicita. Quando colleghi Keystone a Zashi, la Unified Full Viewing Key viene trasferita da Keystone a Zashi.

Quindi il flusso è:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Cosa può fare Zashi con la UFVK?**

Zashi può usarla per:

- identificare le transazioni schermate in entrata
- determinare i saldi
- ottenere informazioni sull'attività schermata

Ma non può spendere i fondi semplicemente perché possiede la UFVK.

La UFVK è una "capacità di visualizzazione" che permette di conoscere saldi e transazioni, ma non permette di spendere.

### Cosa resta dentro Keystone?

L'autorità del seed/della spesa resta su Keystone. Zashi non riceve il seed, la chiave di spesa o la chiave privata di autorizzazione alla spesa. Riceve la UFVK, informazioni sugli indirizzi e le informazioni necessarie per il funzionamento di sola visualizzazione.

Insieme, queste due metà completano il quadro. Ciò che esce dal dispositivo, come UFVK, indirizzi e informazioni watch only, è sufficiente a Zashi per monitorare l'account, ma nulla che lasci il dispositivo è sufficiente per spostare i fondi fuori da esso.

Questo è il motivo per cui l'integrazione Zashi e Keystone può fornire conservazione a freddo schermata. L'applicazione portafoglio può monitorare l'account senza possedere l'autorità richiesta per spendere da esso. L'integrazione è stata lanciata specificamente per consentire la conservazione a freddo di ZEC schermato.

Quando desideri spendere:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito segue un modello di isolamento delle chiavi molto simile a Keystone, ma la sua implementazione è più recente. Anziché abbinarsi a un portafoglio companion esistente come Zashi, Hito viene fornito con il proprio portafoglio Android, e il processo di onboarding tra il dispositivo hardware e quell'app Android è documentato nei traguardi di sviluppo di Hito.

**Onboarding: cosa riceve l'app Hito**

Il portafoglio Android usa:

- la Unified Full Viewing Key (UFVK)
- Unified Address
- impronta del seed ZIP-32
- informazioni di rete

durante l'onboarding dell'account hardware.

Nota che l'applicazione Android non riceve mai il seed o le chiavi private di spesa del portafoglio hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Cosa riceve l'app Hito?**

Le informazioni di onboarding documentate includono:

- UFVK
- Unified Address
- impronta del seed ZIP-32
- rete

La UFVK fornisce al portafoglio Android le informazioni necessarie per operare sull'account come portafoglio con capacità di visualizzazione senza ricevere il seed. L'impronta del seed è un identificatore a lunghezza fissa derivato dal seed, usato per riconoscere gli account; non è il seed stesso e non conferisce capacità di spesa, motivo per cui la sua presenza non contraddice l'affermazione precedente che il seed non venga mai ricevuto.

**Cosa resta su Hito?**

Il seed effettivo, le chiavi private di spesa e l'autorità di firma restano sul dispositivo hardware. Hito esegue poi la firma offline.

L'attuale traguardo Hito afferma che l'intero flusso di creazione, esportazione, firma offline e importazione è operativo, con trasporto BLE ed esportazione QR BBQr del PCZT firmato.

Vale la pena nominare esplicitamente questo flusso, poiché è l'istanza concreta del ciclo completo trattato in precedenza in questo rapporto: il portafoglio Android crea il PCZT non firmato, lo esporta a Hito, Hito firma offline con il proprio materiale di chiavi isolato e il PCZT firmato viene reimportato nel portafoglio Android.

In nessun momento il seed o la chiave di spesa attraversano quel confine in una delle due direzioni.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Da Orchard a Ironwood: l'evoluzione del supporto dei portafogli hardware

Orchard è una pool schermata nel protocollo Zcash che permette agli utenti di conservare e trasferire ZEC con privacy migliorata. Introdotta nel Network Upgrade 5 (NU5), Orchard usa il sistema di produzione delle prove Halo 2 e un'architettura crittografica riprogettata per supportare transazioni schermate senza rivelare informazioni sensibili, come mittente, destinatario o importo.

Ironwood è una pool schermata introdotta nell'aggiornamento di rete NU6.3 di Zcash come successore della pool Orchard. Usa il protocollo crittografico Orchard introducendo al contempo modifiche progettate per migliorare la sicurezza a lungo termine dei fondi schermati, inclusa la recuperabilità quantistica e garanzie più solide sull'integrità dell'offerta.

All'inizio, è essenziale chiarire che Ironwood non ha sostituito il protocollo Orchard con un sistema crittografico interamente nuovo. Ironwood è stato introdotto come nuova pool schermata costruita dal protocollo Orchard esistente. Ciò significa che hanno la stessa struttura Action, lo stesso sistema di produzione delle prove Halo 2, le stesse costruzioni di note e chiavi.

Ironwood dispone del proprio albero di commitment delle note, insieme di nullifier, anchor e pool di valore, quindi a livello di consenso è una pool realmente separata. Ma crittograficamente è un'estensione di Orchard anziché una ricostruzione.

È stata progettata in questo modo per:

1. **Integrità dell'offerta.** Il 29 maggio 2026, il ricercatore di sicurezza Taylor Hornby ha divulgato privatamente un difetto critico di solidità nel sistema di prove a conoscenza zero di Orchard, che avrebbe potuto consentire la creazione di ZEC contraffatti senza lasciare traccia on-chain. Poiché i dati delle transazioni di Orchard sono privati, nessuno può verificare indipendentemente che non siano stati creati ZEC contraffatti prima della correzione. Sigillare la vecchia pool e avviarne una nuova da zero risolve il problema in un modo che correggere Orchard sul posto non avrebbe potuto fare.
2. **Garantire la recuperabilità quantistica.** Ironwood è stato progettato affinché i suoi fondi possano partecipare a un futuro meccanismo di recupero se le assunzioni sottostanti sul logaritmo discreto venissero mai violate.
3. **Ridurre al minimo le modifiche all'implementazione.** Anziché progettare un protocollo schermato interamente nuovo, è stata riusata l'architettura collaudata di Orchard. Ciò ha significato che molto meno nuovo codice per transazioni, prove, portafogli e portafogli hardware ha dovuto essere scritto da zero.

### La cronologia pubblica

- 29 maggio: viene divulgata la vulnerabilità Orchard.
- Giugno: le transazioni Orchard vengono temporaneamente limitate mentre una correzione iniziale viene distribuita tramite NU6.2. Il 12 giugno, uno sviluppatore core indica il 21 luglio come obiettivo per l'aggiornamento completo; successivamente slitta di una settimana. Viene sollevata una preoccupazione della comunità secondo cui i proprietari di Keystone sarebbero stati gli ultimi a migrare; uno sviluppatore core risponde poi che Keystone avrebbe supportato Ironwood dal primo giorno, con firmware previsto per il 3 luglio, in attesa delle costanti di firma finalizzate e delle modifiche API Orchard dal core di Zcash.
- Inizio luglio: NU6.3 raggiunge la testnet; Zebra 6.0.0 viene pubblicato il 10 luglio.
- 27–28 luglio: il lavoro di firma Ironwood PCZT v2 di Ledger viene unito in un ramo di integrazione. Ironwood (NU6.3) si attiva il 28 luglio al blocco 3.428.143, sigillando la pool Orchard originale dietro un turnstile (tornello) che limita la quantità di ZEC che può uscire da Orchard all'importo legittimamente depositato e introduce un nuovo formato di transazione.

Zebra diventa il nodo richiesto, poiché zcashd non supporta le nuove regole di consenso. Gli indirizzi non cambiano perché Ironwood riusa la struttura receiver di Orchard, quindi i portafogli instradano automaticamente gli indirizzi esistenti nella nuova pool. I portafogli necessitano però di funzionalità di migrazione, poiché i fondi Orchard devono infine essere spostati in Ironwood dai rispettivi proprietari, e i nuovi output che ricevono Orchard sono ora interamente bloccati dal consenso.

### Cosa è cambiato tecnicamente

I formati delle transazioni sono passati dalla versione 5 alla versione 6, quindi una singola transazione può includere un componente Ironwood insieme ai componenti esistenti Sapling/Orchard/trasparenti. PCZT è stato esteso in modo graduale:

- La codifica è passata da PCZT v1 a v2.
- Un bundle Ironwood separato ora si trova accanto a quelli Sapling e Orchard.
- Sono supportate le transazioni v6 e un nuovo sighash v6.
- I plaintext delle note hanno ottenuto una nuova versione, V3.

La modifica al sighash è ciò che conta maggiormente per i portafogli hardware. Nella v6, gli anchor Orchard e Ironwood sono esclusi dall'hash della firma e confluiscono soltanto nel digest dei dati di autorizzazione. Si tratta di una vera modifica del firmware, non soltanto di un incremento della versione. Un dispositivo deve implementare correttamente il nuovo sighash e ricalcolarlo autonomamente anziché fidarsi di ciò che l'app companion afferma che stia approvando.

Il contratto di isolamento non è cambiato: il dispositivo restituisce ancora soltanto la firma di autorizzazione alla spesa, mai `alpha`, e non produce mai la firma di binding; l'host continua inoltre a gestire la produzione delle prove e tutto il resto.

Con la v6 è cambiata però una regola del firmatario: le spese fittizie di padding vengono firmate dall'IO Finalizer anziché dal dispositivo, poiché il dispositivo non ha modo di verificarle rispetto a dati di note reali. Il ruolo Signer del dispositivo le salta anziché essere invitato a firmare qualcosa che non può controllare. Le commissioni mostrate ora sommano anche entrambi i saldi di valore Orchard e Ironwood, poiché una transazione v6 può spendere da entrambe le pool nella stessa transazione.

Calcolare correttamente la contabilità delle pool è importante nella pratica, non soltanto in teoria. Un bug recente nel portafoglio Zcash di Brave è un'illustrazione utile: il calcolo delle commissioni presumeva che tutti gli input schermati appartenessero alla pool legacy Orchard, causando Action duplicate e stime delle commissioni errate quando una transazione coinvolgeva effettivamente Ironwood. Questa è esattamente la classe di errore che il principio "ricalcolalo autonomamente, non fidarti dell'host" alla base della firma dei portafogli hardware mira a rilevare. Un portafoglio companion ha calcolato male la contabilità della pool e soltanto un dispositivo che controlli autonomamente la propria matematica potrebbe segnalarlo prima di firmare.

### Situazione di ciascun firmatario

**Ledger ha appena cambiato l'intero quadro.** Il 23 settembre 2026, Ledger ha distribuito supporto nativo a Zcash schermato direttamente in Ledger Wallet Desktop, senza più bisogno di un'app companion separata. La tua chiave di spesa resta sul dispositivo, il computer esegue la matematica della transazione e tu approvi tutto sullo schermo prima che venga firmato. Supporta soltanto Ironwood, non le vecchie pool Orchard o Sapling. Lo svantaggio è che la vecchia app "Zcash Shielded" realizzata da Zondax, che richiedeva un portafoglio companion come Zkool per funzionare, sta per essere dismessa. Ledger ritira quell'app precedente dalla disponibilità il 5 novembre, quindi chiunque la usi ancora deve spostare i propri fondi prima di allora.

**Keystone è in buone condizioni.** Il firmware 3.0.2 ha aggiunto il supporto completo a Ironwood a luglio e questo resta il requisito stabile attuale. Tuttavia, quella versione o una più recente è necessaria per firmare qualsiasi cosa.

**Hito è andato oltre il traguardo iniziale della testnet.** Ha firmato e inviato con successo la prima vera transazione Orchard-a-Ironwood su hardware fisico, inizialmente sulla testnet. Gli aggiornamenti successivi hanno confermato flussi mainnet, Ironwood→Ironwood, Ironwood→Trasparente e altri, su hardware di produzione. Il firmware stabile e un rilascio più ampio sono ancora in corso.

Zondax e Zkool sono attualmente in evoluzione. L'app di Zondax è quella che viene ritirata su Ledger. Zkool, che dipendeva da quell'app per comunicare con i dispositivi Ledger, non ha indicato cosa accadrà a quel ruolo quando la vecchia app scomparirà. Non è chiaro se resterà rilevante per gli utenti Ledger in futuro o se il suo futuro riguarderà principalmente altri dispositivi.

La migrazione stessa è l'effetto più grande. Poiché l'importo che attraversa le pool è pubblico, i portafogli distribuiscono i trasferimenti in tagli standard nel tempo invece di spostare un saldo in un unico blocco visibile. Ciò implica molte transazioni da firmare per ogni migrazione ed è esattamente il motivo per cui la firma batch PCZT è stata così importante per i portafogli hardware.

Il lavoro sul firmware di Ledger ha incontrato anche limiti hardware: la spesa di una nota reale poteva raggiungere decine di migliaia di syscall crittografiche in un singolo comando, attivando il watchdog del dispositivo. La correzione ha spostato l'aritmetica dei campi nel software e ha richiesto uno stato scratch condiviso per rientrare nei vincoli dello stack di Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### L'evoluzione in un'immagine

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
