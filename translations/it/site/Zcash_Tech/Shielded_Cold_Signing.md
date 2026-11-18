# Firma offline schermata

> **Idea chiave:** Il portafoglio companion vede tutto ciò che serve per creare e monitorare una transazione schermata. Solo il portafoglio hardware detiene l'autorità per autorizzare una spesa. Questa separazione è il punto centrale della firma offline schermata.

La schermatura in Zcash comporta il trasferimento di fondi da un indirizzo pubblico e trasparente a uno privato e schermato, nascondendo i dettagli delle transazioni grazie alle funzionalità di privacy di Zcash.

### Cosa cambia quando schermi ZEC?

Con una transazione Zcash trasparente, informazioni come:

- indirizzo del mittente
- indirizzo del destinatario
- importo trasferito

sono visibili sulla blockchain.

Quando schermi ZEC, i tuoi fondi passano in una pool privata (come Ironwood). La blockchain può verificare che una transazione sia valida senza rivelare i dettagli privati della transazione. Dall'aggiornamento NU6.3 del 28 luglio 2026, i fondi appena schermati confluiscono nella pool Ironwood, perché la pool Orchard, ormai più vecchia, non accetta più nuovi depositi, ma consente ancora i prelievi.

### Componenti di una transazione schermata

### 1. La nota (il registro del saldo schermato)

Una nota è un registro crittografico privato che rappresenta un importo non speso di ZEC appartenente a un utente.

A differenza di una blockchain pubblica, in cui i saldi sono elencati in chiaro, una nota schermata cifra il valore e i dettagli relativi alla proprietà, così che chi osserva le transazioni on-chain non possa vedere chi possiede i fondi.

Quando avvia una transazione, il portafoglio companion esegue la scansione del registro, individua le note non spese dell'utente e seleziona quelle da spendere.

### 2. Il nullifier (il meccanismo di rilevamento della doppia spesa)

Poiché i dettagli di una nota sono nascosti nel registro pubblico, la rete ha bisogno di un meccanismo per rilevare le doppie spese senza rivelare quale nota viene spesa.

Un nullifier è un marcatore crittografico univoco derivato da una nota specifica. Quando una nota viene spesa, il suo nullifier viene pubblicato sulla blockchain.

La rete verifica che il nullifier non sia già stato registrato. Se non lo è, la spesa può essere accettata. È fondamentale che un osservatore esterno non possa usare il nullifier per determinare da quale nota specifica proviene.

Il portafoglio companion deriva e costruisce il nullifier appropriato mentre assembla i dati della transazione.

## Chiavi

Le chiavi sono informazioni crittografiche che controllano l'accesso ai tuoi fondi e permettono al tuo portafoglio di eseguire operazioni come ricevere, visualizzare e spendere ZEC.

Un portafoglio contiene diverse chiavi, ognuna con uno scopo diverso, proprio come un singolo account può avere credenziali distinte per l'accesso in lettura e quello in scrittura.

Le chiavi sono al centro del rapporto tra il portafoglio companion e quello hardware, perché hanno funzioni diverse e solo una deve rimanere custodita al sicuro.

È importante sapere che ogni pool schermata organizza le proprie chiavi in un albero di derivazione, in cui le frecce partono da un componente e indicano ciò che se ne può derivare. Gli utenti che vogliono ricevere pagamenti schermati devono disporre di un indirizzo di pagamento schermato, generato da una chiave di spesa.

### La gerarchia delle chiavi

**1. Chiave di spesa**

Questa è la chiave più sensibile dal punto di vista della sicurezza. Fornisce la capacità crittografica di autorizzare la spesa di ZEC.

È la chiave a cui si fa riferimento ogni volta che, più avanti in questo rapporto, si dice che "il portafoglio hardware custodisce la chiave".

In un'architettura di firma offline, la chiave di spesa resta nel portafoglio hardware e non viene mai esposta al portafoglio companion. Il portafoglio companion non dovrebbe aver bisogno di possedere questa chiave.

Sia in Sapling sia in Orchard, le gerarchie delle chiavi derivano l'autorità di spesa e le capacità di visualizzazione da una chiave di spesa radice, seguendo due rami distinti:

- **Sapling:** Una chiave di spesa espansa (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) deriva le chiavi che autorizzano le prove (𝑎𝑘,𝑛𝑠𝑘) e le chiavi di visualizzazione complete (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), da cui derivano a loro volta le chiavi di visualizzazione in entrata (𝑖𝑣𝑘) e gli indirizzi diversificati.
- **Orchard:** Una chiave di spesa radice (𝑠𝑘) si divide direttamente in una chiave che autorizza la spesa (𝑎𝑠𝑘) e una chiave di visualizzazione completa (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Questa separazione strutturale fornisce il fondamento crittografico formale per l'isolamento delle chiavi hardware: il portafoglio esporta il ramo di visualizzazione (UFVK) al computer host per sincronizzare i saldi e creare le transazioni, mentre il ramo che autorizza la spesa resta bloccato in modo permanente sul dispositivo.

La derivazione delle chiavi è strettamente unidirezionale. Ciò significa che dalle chiavi di visualizzazione non si può risalire all'autorità di spesa. Questa irreversibilità crittografica rende sicura l'esportazione di una Full Viewing Key unificata (UFVK), perché offre visibilità completa sul portafoglio senza esporre i segreti di spesa custoditi sul dispositivo.

**2. Chiavi di visualizzazione**

Zcash separa la possibilità di vedere l'attività schermata da quella di spenderne i fondi. Una chiave di visualizzazione permette a un portafoglio o a un'altra parte autorizzata di vedere informazioni sulle transazioni schermate senza conferire l'autorità di spesa.

- **Full Viewing Key (FVK), racchiusa in una Full Viewing Key unificata (UFVK):** derivata intenzionalmente dalla chiave di spesa, permette al software di rilevare e decifrare l'attività schermata del portafoglio, individuando così le transazioni. Consente anche di calcolare i saldi senza poter autorizzare una spesa. È meglio descriverla come una derivazione meno privata della chiave di spesa, non come una copia più debole del seed.

La Full Viewing Key (FVK) fornisce visibilità completa in sola lettura, mantenendo una rigida separazione di sicurezza. Decifrando i testi cifrati delle note in entrata e in uscita (tramite il componente della chiave di visualizzazione in uscita), un portafoglio companion che dispone solo di una FVK può mostrare una cronologia completa delle transazioni con le relative etichette, anziché solo un saldo progressivo.

Più indirizzi di pagamento diversificati e non collegabili condividono la stessa FVK e la stessa chiave di visualizzazione in entrata (IVK), consentendo di generare un numero illimitato di indirizzi senza aumentare il carico di scansione della blockchain.

Questa separazione funzionale è alla base dei flussi di lavoro per la firma offline. Tutte le operazioni continue di scansione della chain, monitoraggio della cronologia e gestione degli indirizzi sono affidate al software host, mentre l'autorità di spesa resta isolata sul dispositivo hardware.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### La distinzione fondamentale: UFVK e chiave di spesa

> **La UFVK si può condividere. La chiave di spesa deve restare nel portafoglio hardware.**
>
> Il portafoglio companion usa la chiave di visualizzazione per monitorare il portafoglio, rilevare i fondi in entrata, individuare le note e contribuire alla preparazione delle transazioni. Non possiede la chiave privata necessaria per autorizzare le spese.

Come spiegato in precedenza, la separazione delle chiavi è alla base dell'architettura di firma offline.

Il portafoglio companion può svolgere la maggior parte del lavoro necessario per preparare una transazione senza mai avere il controllo dei fondi. Il portafoglio hardware deve solo ricevere la transazione preparata ed eseguire la firma finale.

I produttori di portafogli hardware non devono inventare da zero questa separazione. Il design delle chiavi di Zcash separa già a livello di protocollo le capacità di visualizzazione dall'autorità di spesa, e i produttori costruiscono semplicemente le proprie funzioni di firma ed esportazione su questa struttura esistente. Il protocollo consente di derivare da una chiave di spesa informazioni come un indirizzo schermato o una chiave di visualizzazione completa, mentre la chiave di spesa stessa resta privata. In questo modo, portafogli hardware come Ledger, Keystone e Hito possono fornire al software companion le informazioni di visualizzazione necessarie senza mai esporre la chiave privata che permette di spendere i fondi.

### Cosa fa concretamente il portafoglio companion con le informazioni sulle chiavi

Usando i dati delle chiavi di visualizzazione, il portafoglio companion può:

- individuare i tuoi fondi e le tue note
- determinare quali note si possono spendere
- derivare o individuare gli indirizzi pertinenti
- creare la transazione
- generare o coordinare le prove necessarie
- preparare la transazione per la firma

È importante sapere che dover creare una transazione non significa dover disporre della chiave privata di spesa. Questa separazione è una delle idee di sicurezza fondamentali alla base dell'integrazione dei portafogli hardware.

## Creazione e autorizzazione delle transazioni schermate

Questi sono i processi che intervengono nella creazione e nell'autorizzazione della transazione. In parole semplici, descrivono ciò che il portafoglio fa davvero con quei dati per inviare denaro:

### Creazione della transazione (assemblaggio della transazione schermata)

La creazione della transazione è il processo che assembla le informazioni necessarie per creare una transazione Zcash valida a partire dal pagamento desiderato dall'utente.

Il processo combina le note selezionate, i destinatari, gli importi, le commissioni, i nullifier e gli altri dati necessari in una struttura di transazione. Per le transazioni schermate, prepara anche le informazioni necessarie a generare le prove a conoscenza zero e le firme richieste.

Questa fase viene svolta generalmente dal portafoglio companion. Esso:

- seleziona le note da spendere
- determina gli input e gli output della transazione
- calcola i valori necessari
- prepara i dati della transazione, che in seguito saranno oggetto di prove e firme.

In una configurazione di firma offline, i dati della transazione risultanti possono essere raccolti in un PCZT e passati al portafoglio hardware per la fase di firma, fondamentale per la sicurezza.

### Generazione delle prove (dimostrazione della validità del protocollo)

La generazione delle prove consiste nel produrre prove a conoscenza zero (come Halo 2 o Groth16) che dimostrano la conformità della transazione alle regole del protocollo Zcash.

La prova aiuta la rete a garantire che:

- l'utente che spende è autorizzato a spendere le note
- le note esistono davvero
- i nullifier corrispondenti sono univoci
- il totale degli input equivale al totale degli output più le commissioni.

Tutto questo avviene senza rivelare alcun dettaglio privato sottostante.

Generare le prove richiede un'intensa attività di calcolo. Affidare questo compito al dispositivo companion evita che il portafoglio hardware si blocchi o esaurisca la memoria.

### Firma (autorizzazione della spesa)

La firma è fondamentalmente diversa dalla generazione delle prove. Una firma digitale funge da attestazione esplicita di autorizzazione, prodotta dal titolare della chiave privata.

Mentre una prova a conoscenza zero verifica la validità della transazione, una firma digitale dimostra l'autorità di spesa. La firma certifica che il vero proprietario approva i parametri specifici del trasferimento.

La firma richiede una potenza di calcolo minima, quindi è ideale per un portafoglio hardware.

### Cos'è la firma offline schermata?

La firma offline schermata è un metodo per autorizzare una transazione schermata Zcash mantenendo le chiavi private di spesa isolate dal portafoglio companion connesso a Internet. La transazione può essere creata e preparata su un computer connesso, mentre un portafoglio hardware separato, mantenuto offline o altrimenti isolato, usa le sue chiavi protette per autorizzarla.

Il processo si può semplificare così:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Il portafoglio companion invia i parametri strutturati della transazione al dispositivo hardware, che firma il payload al suo interno senza mai trasmettere la chiave privata di spesa al computer host.

## Portafogli companion e hardware

Le transazioni schermate possono coinvolgere sia un portafoglio companion sia un portafoglio hardware, ognuno con una funzione distinta.

### Portafoglio companion

Cos'è un portafoglio companion?

Il portafoglio companion viene eseguito su un computer o un dispositivo mobile e svolge la maggior parte delle operazioni necessarie a creare la transazione, come:

- selezionare le note da spendere
- creare la transazione
- calcolare i dati necessari della transazione
- coordinare la generazione delle prove a conoscenza zero richieste.

### Perché è utile un portafoglio companion?

Il portafoglio companion gestisce la creazione della transazione, ma se il computer viene infettato da un malware, un aggressore potrebbe:

- vedere cosa stai facendo,
- modificare una transazione non firmata,
- cercare di indurti ad approvare qualcosa.

Il portafoglio companion non deve poter accedere alla chiave privata custodita nel portafoglio hardware e può quindi gestire la creazione delle transazioni e altre operazioni di calcolo, mentre il portafoglio hardware costituisce il perimetro di sicurezza della chiave privata.

### Portafoglio hardware

Un portafoglio hardware è un dispositivo fisico offline che isola le tue chiavi private dai telefoni o dai computer connessi e funge da cassaforte sicura per i tuoi asset crypto.

### Perché è utile un portafoglio hardware?

Se il tuo computer viene infettato da un malware, un aggressore potrebbe:

- vedere cosa stai facendo,
- modificare una transazione non firmata,
- cercare di indurti ad approvare qualcosa.

La chiave privata non si può semplicemente estrarre dal portafoglio hardware, quindi il dispositivo può fungere da perimetro di sicurezza.

Immagine delle capacità del portafoglio companion rispetto a quelle del portafoglio hardware

La separazione tra questi due portafogli è particolarmente importante per le transazioni schermate, perché sono più complesse di quelle trasparenti e coinvolgono componenti come note schermate, nullifier, commitment, prove a conoscenza zero e firme delle transazioni.

Sarebbe poco pratico affidare al portafoglio hardware tutte le operazioni di calcolo. Il portafoglio companion prepara invece la transazione e fornisce al portafoglio hardware le informazioni necessarie per firmarla, mentre la chiave privata di spesa resta isolata nel dispositivo hardware.

## Isolamento delle chiavi

> L’isolamento delle chiavi significa che le chiavi private che possono autorizzare una spesa non lasciano mai il portafoglio hardware. L’app complementare può preparare la transazione, ma non può firmarla.

L’isolamento delle chiavi consiste nel tenere separate dal portafoglio complementare e dal dispositivo su cui viene eseguito le chiavi private necessarie ad autorizzare una transazione. In una configurazione di firma cold schermata, il portafoglio complementare può costruire la transazione e coordinare le prove necessarie, mentre il portafoglio hardware mantiene isolate le chiavi private di spesa sensibili.

Se il computer o il telefono complementare viene compromesso, un aggressore potrebbe interagire con la transazione prima che venga firmata, ma idealmente non può estrarre la chiave privata dal portafoglio hardware. La chiave rimane quindi entro il perimetro di sicurezza del dispositivo hardware.

Questa separazione consente al portafoglio complementare di occuparsi della costruzione della transazione e delle attività computazionali senza dargli accesso diretto al materiale crittografico necessario ad autorizzarla.

![Key isolation](/content-images/key-isolation.webp)

La distinzione fondamentale è che "chiavi di visualizzazione" non significa che l’app riceva una versione meno sicura del seed.

In Zcash, una Full Viewing Key (FVK/UFVK) viene derivata intenzionalmente dalla chiave di spesa e consente a chi la possiede di rilevare e decifrare le attività schermate pertinenti, ma non di autorizzare spese. La FVK è una derivata meno segreta della chiave di spesa.

**Un’importante precisazione sulla privacy:**

Quindi è bene sapere che l’app non può sottrarre i fondi con la sola UFVK, ma può vedere le attività schermate private del portafoglio.

Per questo è più corretto dire che l’applicazione complementare dispone di un’*autorità di visualizzazione*, invece di dire semplicemente che ha "informazioni pubbliche".

Il modo più semplice per riassumere il concetto è dire che il portafoglio complementare riceve materiale crittografico sufficiente per sapere cosa succede al portafoglio, ma non abbastanza per autorizzare ciò che accade ai suoi fondi. Il portafoglio hardware, invece, mantiene isolata l’autorità di spesa e la usa solo quando l’utente approva una transazione.

Questo è il modello fondamentale di isolamento delle chiavi alla base di questi progetti di portafogli hardware schermati Zcash ed è lo stesso modello che si ritrova, con implementazioni diverse, in Ledger, Keystone e Hito, di cui parleremo tra poco.

## PCZT

PCZT sta per Partially Created Zcash Transaction. È il pacchetto che trasporta una transazione Zcash e le informazioni necessarie per completarla passando da una fase all’altra.

È un formato standard per una transazione Zcash mentre è ancora in fase di costruzione. Consente a partecipanti o dispositivi diversi di svolgere parti diverse del processo di creazione della transazione e di passarsi la transazione parzialmente completata.

Costruire una transazione è molto più complesso che firmare un semplice trasferimento pubblico nei protocolli di criptovalute a conoscenza zero come Zcash. Le transazioni schermate richiedono prove a conoscenza zero ad alta intensità computazionale, come quelle generate usando Halo 2 o Groth16. Di conseguenza, i dispositivi a basso consumo, come i portafogli hardware, potrebbero non avere la memoria e la capacità di elaborazione necessarie per gestire l’intero flusso di lavoro della transazione.

L’introduzione di PCZT affronta diverse sfide fondamentali nell’architettura delle criptovalute schermate. PCZT è un formato intermedio standard che suddivide la creazione della transazione in ruoli modulari e indipendenti. Consente a un computer complementare potente di occuparsi dell’assemblaggio della transazione e della generazione delle prove, limitando al contempo il portafoglio hardware offline esclusivamente all’autorizzazione e alla firma.

### Limiti dell’hardware e della conservazione cold

I portafogli hardware offrono un ambiente sicuro per proteggere le chiavi private di spesa, ma in genere hanno RAM, potenza di calcolo e capacità di trasferimento dati limitate rispetto ai computer complementari. Questi vincoli rendono poco pratico usarli per generare prove a conoscenza zero ad alta intensità computazionale o mantenere l’intero stato della transazione richiesto durante la sua costruzione.

Di conseguenza, il portafoglio complementare può occuparsi delle attività computazionalmente impegnative, mentre il portafoglio hardware si concentra sull’operazione critica per la sicurezza: autorizzare la transazione con le proprie chiavi di spesa protette.

Ti chiedi come faccia il dispositivo a eseguire comunque una verifica *sufficiente* per essere affidabile, se ha vincoli così stringenti.

In parole semplici, un portafoglio hardware non può accettare un valore arbitrario da un computer complementare e firmarlo. Deve disporre di informazioni sufficienti per stabilire che il valore da firmare corrisponda alla transazione che l’utente intende autorizzare. Questo crea un difficile equilibrio: il dispositivo deve eseguire parsing e verifiche sufficienti a proteggere il processo di firma, pur operando entro limiti rigorosi di memoria, calcolo, dimensioni del firmware e complessità di implementazione.

La gestione di Orchard PCZT di Ledger è un esempio di questa sfida: suggerisce che un parsing specializzato e dipendente dai circuiti può semplificare l’implementazione sui dispositivi con risorse limitate, ma può anche richiedere modifiche al firmware quando cambiano le strutture di transazione o i circuiti supportati.

Due iniziative in corso illustrano risposte diverse a questo stesso vincolo.

La Grant #423 ha proposto una ricerca su una pipeline di generazione delle prove a tempo costante, adatta alle architetture di portafogli hardware open source e ai computer comuni. L’obiettivo era studiare un’infrastruttura crittografica implementabile in sicurezza in ambienti come C o Rust, riducendo al contempo la complessità e l’onere di manutenzione del supporto per Zcash schermato.

Un approccio alternativo è rappresentato dal proposto **Zcash SeedSigner**, un signer open source air-gapped realizzato con componenti economici e facilmente reperibili. Il flusso di lavoro proposto mantiene separati il computer complementare e il dispositivo di firma, trasferendo un PCZT attraverso un air gap per la verifica e la firma sul dispositivo.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Nel complesso, questi approcci illustrano la sfida ingegneristica più ampia alla base dei portafogli hardware schermati: la costruzione delle transazioni e la generazione delle prove possono avvenire al di fuori del dispositivo critico per la sicurezza, ma il signer deve comunque disporre di informazioni e capacità di verifica sufficienti per autorizzare in sicurezza la transazione risultante.

### PCZT abilita l’architettura suddivisa

Lo standard Partially Created Zcash Transaction (PCZT) è la struttura formale dei dati che collega il portafoglio complementare e il portafoglio hardware.

Un portafoglio complementare può occuparsi della selezione delle note, calcolare i nullifier e generare autonomamente la prova a conoscenza zero. Questo è possibile perché le informazioni necessarie per questi passaggi, inclusa la chiave usata per derivare i nullifier, provengono dalle chiavi di visualizzazione e non da elementi legati all’autorità di spesa. Il portafoglio complementare raggruppa quindi questi elementi in un contenitore PCZT.

Il pacchetto PCZT viene consegnato al portafoglio hardware, che legge il contesto della transazione, come gli importi e gli indirizzi dei destinatari, applica la firma usando le proprie chiavi di spesa protette e restituisce al dispositivo complementare il pacchetto PCZT aggiornato.

Questo design stabilisce un rigido perimetro di sicurezza: un computer host potente può eseguire calcoli complessi a conoscenza zero senza accedere alle chiavi di spesa, mentre i dispositivi di conservazione cold a basso consumo possono garantire la sicurezza finanziaria senza dover calcolare crittografia complessa.

### Compromessi sulla privacy del prover

Delegare la generazione delle prove a conoscenza zero al portafoglio complementare o a un altro prover mantiene isolate le chiavi di spesa, ma richiede comunque che il prover acceda a informazioni sensibili sulla transazione, come i valori delle note, gli indirizzi dei destinatari e i commitment.

PCZT mantiene la separazione architetturale, consentendo di fornire queste informazioni per generare le prove senza trasferire le chiavi private di spesa necessarie all’autorizzazione.

Questo garantisce la separazione tra l’autorità di generare prove e l’autorità di spesa. Il prover può generare prove ad alta intensità computazionale senza acquisire l’autorità crittografica per spendere i fondi dell’utente.

### Interoperabilità di PCZT

Man mano che PCZT diventa una parte importante dei flussi di lavoro di Zcash per portafogli hardware, firme multiple e firme air-gapped, l’interoperabilità tra implementazioni indipendenti diventa sempre più importante.

Una proposta del giugno 2026 di AngryDavee osservava che esistevano già implementazioni di PCZT nei progetti Ledger, Keystone, Hito e OneKey, oltre che nell’implementazione di riferimento in librustzcash. La proposta individuava però l’assenza di test condivisi per verificare che queste implementazioni interpretassero i PCZT in modo coerente.

La soluzione proposta era una suite di test di interoperabilità open source contenente vettori di test canonici PCZT e test incrociati tra implementazioni, in grado di coprire l’intero flusso di lavoro create → sign → finalize. Proponeva inoltre di testare i confini dei ruoli, come il Combiner, che può unire informazioni firmate parzialmente da signer diversi prima che una transazione venga finalizzata.

Questo è particolarmente rilevante per i portafogli hardware, perché PCZT consente di separare la costruzione della transazione dalla firma: un portafoglio complementare può costruire una transazione e preparare un PCZT, mentre il dispositivo hardware riceve le informazioni di firma necessarie ed esegue l’operazione di firma critica per la sicurezza.

La proposta non è stata realizzata perché Zcash Community Grants ha deciso di non procedere con il finanziamento dopo aver esaminato la proposta e considerato il feedback della comunità. Di conseguenza, il finanziamento non ha portato allo sviluppo della suite di test proposta per le implementazioni incrociate. Si tratta quindi di una risposta proposta a una sfida di interoperabilità PCZT individuata, non di uno standard attualmente esistente in tutto Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Il ciclo di vita di un PCZT

| # | Fase | Descrizione |
|---|---|---|
| 1 | Creatore | Inizializza il PCZT con i metadati globali della transazione, incluse le versioni della transazione, gli ID del ramo di consenso e i flag delle pool. |
| 2 | Costruttore | Popola la transazione con gli input e gli output previsti nelle pool trasparenti, Sapling, Orchard o Ironwood. |
| 3 | Finalizzatore di input e output | Dichiara completo l’insieme degli input e degli output, calcola le chiavi delle firme di binding e firma le spese fittizie quando necessario. |
| 4 | Aggiornatore | Aggiunge i dati di contesto necessari ai partecipanti successivi, come le chiavi di visualizzazione complete, gli anchor e le witness Merkle. |
| 5 | Prover e signer | Esegue la generazione delle prove a conoscenza zero e la firma crittografica. Nelle versioni moderne di PCZT, queste due attività sono del tutto indipendenti e possono essere svolte in sequenza o in parallelo. |
| 6 | Combiner | Unisce in modo deterministico più istanze di PCZT se dispositivi diversi lavorano contemporaneamente su aspetti della stessa transazione. Le regole di unione richiedono una rigorosa risoluzione dei conflitti per prevenire perdite accidentali di dati. |
| 7 | Finalizzatore della spesa ed estrattore | Convalida tutti gli elementi crittografici richiesti, rimuove i metadati di contesto intermedi e produce la transazione Zcash finalizzata, pronta per la diffusione sulla rete. |

## Implementazioni reali di portafogli hardware

### In breve

| Dispositivo   | Cosa riceve l’app complementare              | Cosa rimane sul dispositivo          | Trasporto      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / FVK Orchard, indirizzi            | Autorità di spesa                | USB / BLE      |
| Keystone | UFVK + indirizzo Unified                   | Seed / chiavi di spesa              | QR (air-gapped)|
| Hito     | UFVK, indirizzo Unified, impronta digitale del seed  | Seed e chiavi private di spesa    | QR / locale     |


Sono state sviluppate diverse implementazioni per portafogli hardware per esplorare come supportare le transazioni schermate Zcash mantenendo le chiavi di spesa sensibili isolate dal portafoglio complementare. Ledger, Keystone e Hito rappresentano approcci diversi per integrare la protezione delle chiavi basata su hardware con il flusso di lavoro delle transazioni Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Per capire come proteggono i fondi schermati, è importante distinguere tra chiavi di spesa e chiavi di visualizzazione. In tutti e tre i casi, la separazione segue lo stesso schema:

| Dispositivo | Cosa può ricevere l’app complementare | Cosa resta protetto sul dispositivo |
|---|---|---|
| Ledger | UFVK / FVK Orchard, indirizzi e informazioni pubbliche | Autorità di spesa / materiale delle chiavi private |
| Keystone | UFVK + indirizzo Unified | Seed / chiavi di spesa |
| Hito | UFVK, indirizzo Unified, impronta digitale del seed e informazioni sulla rete | Seed e chiavi private di spesa |

### Ledger come ambiente di firma hardware

Ledger è un’azienda produttrice di portafogli hardware. I suoi dispositivi sono basati su un Secure Element, un chip dedicato progettato per custodire il materiale delle chiavi private e mantenerlo fisicamente isolato dal resto del dispositivo e da tutto ciò che è collegato. Il Secure Element è il motivo per cui un dispositivo Ledger è affidabile per la conservazione cold. Significa che, anche se il computer o il telefono collegato viene compromesso, le chiavi contenute nel Secure Element non possono essere estratte.

Da solo, però, un dispositivo Ledger non è configurato per una criptovaluta specifica. Richiede l’installazione di un’applicazione che sappia gestire la crittografia specifica di quella valuta.

Un dispositivo Ledger non è configurato per una criptovaluta specifica, quindi richiede un’applicazione che ne conosca la crittografia. Per Zcash ci sono state due generazioni:

- L’app originale “Zcash Shielded”, realizzata da Zondax, usata con portafogli complementari come Zkool e in fase di ritiro dal 5 novembre 2026; e
- La nuova app Zcash di Ledger (3.9.4+), usata in modo nativo da Ledger Wallet Desktop 4.21+ per Ironwood schermato ZEC.

Il modello di isolamento delle chiavi descritto sotto si applica a entrambe.

Zkool è il portafoglio complementare sul telefono o sul computer che comunica con l’app. Costruisce la transazione e la invia a Ledger; l’app Zondax sul dispositivo la firma e restituisce la firma.

Quindi Zondax è il software in esecuzione sull’hardware, mentre Zkool è il software eseguito all’esterno che usa l’app di Zondax per comunicare con il dispositivo.

### Cosa esce da Ledger?

Il software Zcash di Ledger include una funzione specifica per esportare le chiavi di visualizzazione del portafoglio, che consentono al software di vedere saldi e transazioni senza poter spendere fondi.

Questa funzione può restituire uno di due elementi:

- Un Full Viewing Key Unified (UFVK), cioè la chiave di visualizzazione completa che copre tutte le pool schermate di Zcash contemporaneamente; oppure
- Un Orchard Full Viewing Key (FVK)

In entrambi i casi, ciò che viene esportato è sempre e solo una chiave di visualizzazione. Qualunque versione tu richieda, questa funzione non può restituire l’unica informazione che permetterebbe davvero a qualcuno di spostare i fondi: la chiave di spesa.

È proprio questo il principio su cui si basa: è progettata in modo che l’unico elemento esportabile sia sicuro da consegnare a un’app complementare.

La gerarchia delle chiavi di Zcash è strutturata in modo che, per ogni pool schermata, la chiave di spesa generi due elementi distinti:

- Una chiave che autorizza la spesa; e
- Una chiave di visualizzazione completa

La FVK può poi generare ulteriori funzionalità legate alla visualizzazione, ma il percorso di derivazione non conduce mai all’autorità di spesa. Una volta che una chiave si è diramata verso il ramo di visualizzazione della gerarchia, vi rimane e non può essere usata per ricostruire la chiave di autorità di spesa da cui deriva.

Ironwood segue lo stesso schema, perché riutilizza le strutture sottostanti di chiavi e note di Orchard. A livello di consenso, però, è una pool distinta, con un proprio albero dei commitment e un proprio insieme di nullifier. Questo significa che una UFVK è in realtà un insieme di chiavi di visualizzazione specifiche per ciascuna pool (trasparente, Sapling, Orchard e ora Ironwood), non una singola chiave piatta.

Una UFVK esportata prima dell’attivazione di Ironwood non includerà una chiave di visualizzazione Ironwood, perché quella pool non esisteva ancora. È proprio per questo che, dopo l’aggiornamento NU6.3, i portafogli hanno dovuto aggiornarsi per riconoscere e derivare UFVK compatibili con Ironwood.

### Cosa rimane su Ledger?

L’autorità di spesa rimane sul dispositivo.

Il signer Ledger riceve una transazione/PCZT dall’host e genera la firma di autorizzazione della spesa in base alla pool da cui provengono i fondi della transazione (la pool Ironwood, perché l’attuale integrazione di Ledger supporta solo Ironwood). La firma viene prodotta sul dispositivo e l’host riceve solo la firma, non la chiave privata di spesa.

Questo è coerente anche con il modello generale di sicurezza di Ledger. Il suo Secure Element isola il materiale delle chiavi private e i requisiti di sicurezza delle applicazioni di Ledger vietano espressamente alle applicazioni di esporre quei segreti all’host.

Il signer di Ledger può esportare la FVK/UFVK e, separatamente, firmare transazioni. Le due funzionalità sono fornite da funzioni distinte, non raggruppate in una sola.

### Cosa significa in pratica?

Supponi che il tuo Ledger contenga 10 ZEC.

Il portafoglio complementare può avere la UFVK e quindi determinare: "Questo portafoglio ha ricevuto 10 ZEC." Può scansionare e mostrare transazioni e saldi.

Ma se qualcuno compromette il portafoglio complementare, la sola UFVK non gli permette di creare la firma di autorizzazione della spesa.

Lo scopo della firma di autorizzazione della spesa separata è consentire a dispositivi con risorse limitate, come i portafogli hardware, di autorizzare spese schermate senza dover generare da soli l’intera prova zk-SNARK.

### Applicazione Zondax Ledger; il lato del portafoglio hardware

#### Cos’è Zondax?

Zondax è un’azienda di sviluppo di terze parti che ha realizzato l’app Ledger Zcash. È il firmware vero e proprio che viene eseguito sull’hardware Ledger e consente al dispositivo di comprendere ed elaborare le transazioni Zcash.

Zondax è uno sviluppatore esterno. L’hardware Ledger non è in grado di elaborare autonomamente le transazioni Zcash: questa capacità dipende interamente dal software di Zondax.

### Implementazione originale di Zcash Ledger

Il repository dell’app Ledger Zcash di Zondax contiene il software eseguito su un dispositivo Ledger. Inizialmente l’app era dedicata alle transazioni schermate Sapling, prima che Orchard diventasse la pool schermata principale di Zcash. Perciò, il supporto per Sapling era tutto ciò che un dispositivo Ledger poteva offrire per ZEC schermato.

La sua architettura illustra la separazione: il lato host/complementare prepara le informazioni della transazione, mentre Ledger gestisce le operazioni sensibili sulle chiavi e la firma.

Già in questa primissima versione del supporto per portafogli hardware Zcash erano presenti i principi fondamentali: costruzione e generazione delle prove sull’host, poi firma isolata sul dispositivo.

### Evoluzione verso Orchard

Il lavoro di Ledger si è orientato verso Orchard + PCZT. È stata una transizione significativa, non un semplice aggiornamento: Orchard usa un sistema di generazione delle prove diverso (Halo 2, rispetto a Groth16 di Sapling) e strutture diverse per note e chiavi. Estendere il firmware dedicato soltanto a Sapling per gestire la firma di Orchard ha quindi richiesto nuove basi crittografiche sul dispositivo, non solo una modifica al firmware.

Tuttavia, mentre Zcash si orientava verso Ironwood, Zondax e Ledger hanno spostato il proprio lavoro sul supporto diretto di Ironwood, invece di completare un’implementazione Orchard per poi riprogettarla per Ironwood. Questa è un’ulteriore fase dell’evoluzione dell’implementazione Ledger: Ironwood si basa sull’architettura crittografica di Orchard, introducendo al contempo una pool schermata distinta e ulteriori modifiche al protocollo.

### Cosa succede dentro questa app Ledger

Il flusso risultante è descritto così:

1. L’host costruisce un PCZT.
2. L’host invia le informazioni pertinenti sulla transazione al dispositivo Ledger.
3. Il dispositivo produce le firme che autorizzano la spesa Orchard.
4. L’host gestisce tutto ciò che segue, inclusi la firma di binding e l’assemblaggio finale della transazione.

L’app in esecuzione all’interno di Ledger non vede né produce nulla oltre alla firma di autorizzazione della spesa vera e propria. Tutte le attività più pesanti dal punto di vista computazionale o dei dati (generazione delle prove, binding e assemblaggio) rimangono sull’host, a cui non è necessario affidare il materiale delle chiavi.

### Integrazione schermata nativa di Ledger; Ledger Wallet Desktop

L’integrazione più recente di Zcash di Ledger offre un esempio concreto di come separare la costruzione delle transazioni schermate dalla firma critica per la sicurezza, affidandole rispettivamente al software complementare e a un portafoglio hardware.

Con Ledger Wallet Desktop 4.21+ e l’app per dispositivi Zcash 3.9.4+, gli utenti possono inviare e ricevere direttamente transazioni ZEC schermate Ironwood tramite Ledger Wallet Desktop. L’integrazione supporta trasferimenti da indirizzo privato a indirizzo privato, schermatura dalla pool trasparente, rimozione della schermatura verso la pool trasparente, indirizzi privati di ricezione e memo. Le transazioni vengono verificate e firmate sul dispositivo Ledger, invece di basarsi esclusivamente sulle informazioni mostrate dal computer.

Un elemento fondamentale di questa architettura è la separazione tra le funzionalità di visualizzazione e quelle di spesa. Durante la sincronizzazione del saldo privato, Ledger esporta un Full Viewing Key Unified (UFVK), che viene salvato in locale sul computer. La UFVK consente a Ledger Wallet Desktop di rilevare le transazioni schermate pertinenti e determinare il saldo del portafoglio, ma non autorizza a spendere i fondi. L’autorità di spesa, critica per la sicurezza, rimane sul dispositivo Ledger, che esegue l’operazione finale di firma. Si crea così un chiaro confine tra il computer, che gestisce lo stato del portafoglio e costruisce le transazioni, e il dispositivo hardware, che protegge la capacità necessaria ad autorizzare le spese.

L’integrazione attuale è però specifica per Ironwood. Ledger Wallet Desktop non mostra né gestisce fondi Orchard o Sapling. Questo è rilevante dal punto di vista storico perché il precedente sviluppo Zcash di Ledger era associato al supporto schermato Orchard, prima che l’implementazione si orientasse verso il protocollo Ironwood.

La transizione evidenzia anche l’importanza della compatibilità tra chiavi e account. Ledger dispone di una vecchia applicazione “Zcash Shielded”, sviluppata da Zondax e utilizzata da integrazioni come YWallet e zkool, che ora viene ritirata. Poiché quella vecchia applicazione usava uno schema di derivazione diverso per gli account schermati, gli account Sapling non possono essere riprodotti semplicemente con la nuova applicazione Ledger.

L’integrazione mostra quindi sia i progressi sia i limiti ancora presenti nel supporto dei portafogli hardware schermati. Ledger può ora offrire un’esperienza completa con Ironwood, in cui il software complementare gestisce la sincronizzazione del portafoglio e la preparazione delle transazioni, mentre il dispositivo hardware rimane il perimetro di sicurezza per le spese.

Al contempo, la compatibilità con gli account storici, il supporto per pool schermate specifiche, i limiti alle dimensioni delle transazioni hardware, le restrizioni delle piattaforme e i vincoli computazionali e del firmware legati al parsing e alla verifica delle transazioni schermate mostrano che il supporto dei portafogli hardware per Zcash dipende non solo dalle capacità del protocollo, ma anche dal design e dalle risorse di ciascuna implementazione.

### Zkool + Ledger — usare l’app ufficiale di Zondax

In quanto successore di Ywallet, Zkool ne ha ereditato l’obiettivo della firma cold schermata, ma ha seguito una strada diversa per raggiungerlo. Questa scelta è stata determinata dal fatto che la sola crittografia non basta a rendere utilizzabile un’integrazione se l’app di firma non può essere distribuita in sicurezza.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Uso dell’applicazione Zondax da parte di Zkool

Zkool si è orientato verso l’uso dell’app ufficiale Ledger Zcash, sviluppata da Zondax, invece che dell’applicazione proprietaria Ledger abbandonata da Ywallet. Invece di mantenere un’app personalizzata che il negozio di Ledger non avrebbe accettato, Zkool ha costruito sull’app già approvata e distribuita nell’ecosistema di Ledger.

Con questo cambiamento, gli utenti non hanno più dovuto affidarsi all’installazione di un’applicazione Ledger personalizzata e non firmata per usare l’integrazione, perché l’app di Zondax era distribuita ufficialmente nell’ecosistema di Ledger.

Ledger ha fissato al 5 novembre 2026 la fine del supporto per la vecchia app Zcash Shielded, avviandone il ritiro. Zkool si è preparato: [version 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0), del 12 settembre 2026, ha aggiunto il supporto per la nuova app ufficiale Zcash di Ledger, oltre a quella Zondax. Quando crei un account Ledger, Zkool ora ti chiede quale app esegue il dispositivo (Official o Zondax). Un account con l’app Official copre le pool trasparente e Ironwood: Zkool può importare la UFVK dal dispositivo e firmare le transazioni v6 con l’app Official. Un account con l’app Zondax mantiene la vecchia configurazione trasparente + Sapling ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Pool schermate supportate

Secondo lo sviluppatore Ywallet, l'integrazione Ledger di Zkool utilizzava l'applicazione ufficiale Ledger sviluppata da Zondax e supportava sia le Zcash trasparenti sia quelle schermate. Tuttavia, il supporto per le transazioni schermate era limitato a Sapling e non supportava Orchard, oltre ad altri limiti dell'integrazione, come un massimo di cinque input e output per ciascun tipo e l'assenza della compatibilità con Ledger Live.

Questo limite rifletteva la portata dell'implementazione sottostante di Zondax Ledger dell'epoca. Il precedente lavoro di Zondax su Ledger forniva il supporto Sapling e, con il successivo rilascio nel 2024 dell'app Zcash Shielded Ledger, inizialmente escludeva Orchard e gli Unified Address. Di conseguenza, un'integrazione basata su quell'applicazione ereditava le capacità e i limiti dell'implementazione del portafoglio hardware da cui dipendeva.

La situazione è poi evoluta con il rilascio dell'app dedicata Zcash Shielded Ledger nel novembre 2024. Zondax ha dichiarato che l'applicazione era stata rilasciata ufficialmente tramite Ledger Live e in seguito ha pubblicato indicazioni per l'integrazione e i pacchetti Rust e JavaScript, così da consentire ad altri portafogli di integrarla. Al lancio, tuttavia, l'applicazione comunicava esclusivamente con Zecwallet Lite Desktop, mentre erano ancora in fase di sviluppo integrazioni più ampie con altri portafogli.

La fase successiva è stata lo sviluppo della nuova applicazione di Ledger basata su Rust Zcash. A giugno 2026, Ledger ha riferito che la condivisione di UFVK e la generazione di Unified Address Orchard erano state implementate, mentre la firma delle transazioni Orchard e ClearSign erano ancora in fase di sviluppo. Ledger ha inoltre dichiarato che il lavoro sarebbe proseguito nel percorso Ironwood con il cambiamento del protocollo.

In seguito, Ironwood ha richiesto aggiornamenti nell'intero ecosistema dei portafogli Zcash. Zkool ha introdotto il supporto alla migrazione da Orchard a Ironwood a partire dalla versione 6.24.0 e ha continuato a perfezionare la migrazione e la pipeline delle transazioni nelle versioni successive. Separatamente, Ledger ha integrato la firma v2 di PCZT nella sua nuova applicazione il 27 luglio, anche se al 20 agosto l'implementazione non aveva ancora completato la revisione di Ledger e il rilascio tramite Ledger Live. Da allora, questa tappa è stata raggiunta: Wallet Desktop 4.21+ di Ledger ora offre direttamente il supporto nativo a Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Perciò, l'evoluzione si comprende meglio come una serie di sviluppi correlati, non come un unico aggiornamento da Zondax a Ironwood: l'implementazione Zondax incentrata su Sapling, l'app Zcash Shielded Ledger del 2024, la nuova applicazione Rust Ledger con il supporto a Orchard e PCZT, l'integrazione nativa di Ledger in Wallet Desktop Ledger e gli aggiornamenti paralleli di portafogli come Zkool durante la transizione dell'ecosistema a Ironwood.

### Supporto attuale dei dispositivi e delle piattaforme Ledger per Zcash

Il supporto di Zcash su Ledger dipende da

- il modello del dispositivo
- l'applicazione installata
- la piattaforma usata per gestirlo e
- se la transazione è trasparente o schermata.

Al 21 luglio 2026 (ultimo aggiornamento di Ledger), l'app Shielded Zcash è supportata su Nano S Plus, Stax e Flex, ma non ancora su Nano X o Nano Gen5.

Nano X e gli altri modelli, tranne l'originale Nano S, possono ancora usare l'app classica Zcash, che supporta le transazioni trasparenti e la spesa di fondi schermati verso indirizzi trasparenti (deshielding), ma non la firma da schermato a schermato. L'originale Nano S non supporta nessuna delle due app, perché Ledger sta ritirando gradualmente il supporto per il dispositivo e l'ultima app Zcash non è disponibile su di esso. I dispositivi si connettono a Ledger Wallet (in precedenza Ledger Live), l'applicazione complementare di Ledger, disponibile su desktop per Windows, macOS e Linux e su dispositivi mobili per iOS e Android.

Ledger ha aggiunto il supporto nativo per Zcash schermate a Ledger Wallet Desktop, basato sulla pool Ironwood, eliminando la necessità di un portafoglio complementare separato. ZEC schermate non sono ancora supportate nell'app mobile di Ledger per iOS e Android, ma il supporto per dispositivi mobili è previsto in una versione futura.

Al di fuori del software di Ledger, l'uso delle transazioni schermate dipende da un portafoglio complementare compatibile e dalle piattaforme supportate. Man mano che Ledger amplia il supporto a Ironwood, la compatibilità dipende dal modello del dispositivo, dal firmware, dalla versione dell'app e dal sistema operativo; il supporto generale a Zcash, quindi, non garantisce necessariamente la compatibilità.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### YWallet: firma a freddo, un approccio precedente

Ywallet è un portafoglio complementare, separato sia da Ledger sia da Zondax, che ha seguito un proprio percorso verso la firma a freddo di transazioni schermate.

Ywallet è importante dal punto di vista storico perché ha esplorato la firma a freddo per Zcash, consentendo di tenere il dispositivo di firma separato dal portafoglio online.

Per realizzare questa architettura sull'hardware Ledger, Ywallet ha creato una propria applicazione Ledger, proprietaria e distinta dall'app Zondax descritta nella sezione precedente. Questo significava che Ywallet non si affidava all'implementazione Sapling esistente di Zondax: aveva un proprio firmware che gestiva il lato della firma.

### Perché l'integrazione era importante

Avere il codice crittografico e quello per la firma non basta. L'integrazione con un portafoglio hardware non è solo un problema crittografico, ma anche un inevitabile problema di distribuzione e di piattaforma. Come minimo, coinvolge:

- Approvazione e distribuzione dell'applicazione — se l'app store ufficiale del produttore dell'hardware accetterà e distribuirà l'app
- Sicurezza del firmware e dell'applicazione — se l'app soddisfa i requisiti di sicurezza del produttore per la gestione del materiale delle chiavi
- Protocolli di comunicazione — come il portafoglio complementare e il dispositivo si scambiano effettivamente i dati delle transazioni
- Compatibilità con il portafoglio — se i formati dei dati e il flusso dell'app di firma corrispondono a ciò che si aspetta il portafoglio complementare
- Pool schermate supportate — quali tra Sapling, Orchard e (ora) Ironwood l'app può effettivamente firmare

L'app proprietaria Ledger di Ywallet soddisfaceva i requisiti crittografici e architetturali: poteva firmare transazioni schermate Zcash, ma non era stata accettata nell'app store ufficiale di Ledger.

### Abbandono dell'app Ledger proprietaria

Dato che l'app non era stata accettata ufficialmente, Ywallet avrebbe dovuto chiedere agli utenti di installare un firmware non firmato per usarla. Sarebbe stato un vero compromesso in termini di sicurezza per gli utenti e Ywallet ha scelto di non chiederglielo. Perciò, alla fine Ywallet ha abbandonato quella specifica integrazione, invece di seguire quella strada.

Invece di riprendere lo sviluppo di un'app proprietaria, gli sviluppi successivi (tramite Zkool, il successore di Ywallet) si sono orientati verso l'app Ledger basata su Zondax, scambiando un'implementazione personalizzata e rifiutata con una standardizzata, già accettata nell'ecosistema di distribuzione di Ledger. Questo cambiamento ha infine reso nuovamente possibile un'integrazione funzionante con Ledger.

### L'eredità di Ywallet

Anche dopo che Ywallet stesso ha interrotto lo sviluppo attivo, il suo creatore Hanh, che è anche membro di ZCG, è rimasto una voce rilevante nell'ecosistema, in particolare quando la migrazione di Ironwood ha fatto emergere segnalazioni di problemi riguardanti fondi che sembravano scomparsi.

**ZODL: un utente ha effettivamente riscontrato fondi mancanti dopo la migrazione da Orchard a Ironwood**

Un utente, Jmo0615, ha segnalato che i fondi prima visibili nel proprio portafoglio ZODL non apparivano più dopo la migrazione da Orchard a Ironwood. Ha dichiarato di aver ripristinato il seed originale, reimpostato e recuperato il portafoglio e atteso la sincronizzazione completa della versione 3.14.1 (1) di ZODL. Ha inoltre confermato di non aver usato alcun portafoglio hardware Keystone.

Non è stato accertato che i fondi siano effettivamente andati persi. Si sospetta piuttosto un problema di rilevamento o di migrazione del portafoglio, per cui fondi prima visibili non sono più stati mostrati dopo la transizione a Ironwood. I fondi non rilevati o non visualizzati non dovrebbero essere descritti automaticamente come fondi persi in modo permanente: è importante mantenere questa distinzione quando si analizzano i problemi di migrazione.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: le "note bloccate" possono spiegare perché alcuni fondi sembrano non disponibili**

Un altro aspetto importante dei portafogli schermati è il modo in cui lo stato del portafoglio può influire sui fondi che un utente può effettivamente spendere. Hanh ha spiegato che un utente può bloccare accidentalmente una nota tramite il controllo delle monete, una funzione che consente di scegliere manualmente quali note usare per le spese. In questo caso, la nota può ancora esistere nel portafoglio, ma essere contrassegnata come non disponibile per la spesa.

Questo evidenzia una distinzione importante nell'analisi dei problemi dei portafogli. La quantità di ZEC presente in un portafoglio non corrisponde sempre a quella attualmente disponibile per la spesa. Fattori come la selezione delle note, la sincronizzazione, lo stato della migrazione, il recupero del portafoglio e le impostazioni del controllo delle monete possono influire sul saldo visualizzato o spendibile. Perciò, quando si segnalano "fondi mancanti", occorre distinguere con attenzione tra fondi non rilevati o non visualizzati, fondi rilevati ma non disponibili per la spesa e fondi effettivamente persi.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Che cos'è Keystone?**

Keystone è un portafoglio hardware isolato dalla rete. Durante il processo di firma, il dispositivo di firma non ha alcun collegamento cablato o wireless diretto con l'app complementare: comunica invece tramite codici QR. Qui è associato a Zashi (ora rinominato Zodl), il portafoglio complementare nativo di Zcash; questa associazione rende il principio dell'isolamento delle chiavi particolarmente chiaro e facile da verificare.

**Il flusso Keystone/Zashi**

L’integrazione di Keystone con Zashi tramite Zcash rende questa separazione particolarmente esplicita. Quando colleghi Keystone a Zashi, il Full Viewing Key unificato viene trasferito da Keystone a Zashi.

Il flusso è quindi:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Che cosa può fare Zashi con la UFVK?**

Zashi può usarla per:

- identificare le transazioni schermate in entrata
- determinare i saldi
- ottenere informazioni sull'attività schermata

Ma non può spendere i fondi solo perché possiede la UFVK.

La UFVK è una "capacità di visualizzazione": consente di conoscere saldi e transazioni, ma non di spendere.

### Che cosa rimane in Keystone?

Il seed e l'autorità di spesa rimangono su Keystone. Zashi non riceve il seed, la chiave di spesa né la chiave privata di autorizzazione alla spesa. Riceve la UFVK, le informazioni sugli indirizzi e quelle necessarie alla sola visualizzazione.

Insieme, queste due parti completano il quadro. Ciò che esce dal dispositivo, come la UFVK, gli indirizzi e le informazioni per la sola visualizzazione, basta a Zashi per monitorare l'account, ma nessuna delle informazioni che lascia il dispositivo basta a trasferire fondi dall'account.

È per questo che l'integrazione tra Zashi e Keystone può offrire una conservazione a freddo di fondi schermati. L'applicazione del portafoglio può monitorare l'account senza possedere l'autorità necessaria per spenderne i fondi. L'integrazione è stata lanciata appositamente per consentire la conservazione a freddo di ZEC schermati.

Quando vuoi spendere:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito segue un modello di isolamento delle chiavi molto simile a quello di Keystone, ma la sua implementazione è più recente. Invece di associarsi a un portafoglio complementare esistente come Zashi, Hito include un proprio portafoglio Android, e la procedura di configurazione iniziale tra il dispositivo hardware e quell'app Android è documentata nelle tappe di sviluppo di Hito.

**Configurazione iniziale: che cosa riceve l'app Hito**

Il portafoglio Android usa:

- lo Unified Full Viewing Key (UFVK)
- Unified Address
- l'impronta digitale del seed ZIP-32
- le informazioni sulla rete

durante la configurazione dell'account hardware.

Nota che l'applicazione Android non riceve mai il seed o le chiavi private di spesa del portafoglio hardware.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Che cosa riceve l'app Hito?**

Le informazioni documentate per la configurazione iniziale includono:

- UFVK
- Unified Address
- impronta digitale del seed ZIP-32
- rete

La UFVK fornisce al portafoglio Android le informazioni necessarie per gestire l'account come portafoglio con capacità di visualizzazione, senza ricevere il seed. L'impronta digitale del seed è un identificativo di lunghezza fissa derivato dal seed, usato per riconoscere i diversi account. Non è il seed stesso e non conferisce alcuna capacità di spesa; per questo la sua presenza non contraddice l'affermazione precedente secondo cui l'app "non riceve mai il seed".

**Che cosa rimane su Hito?**

Il seed vero e proprio, le chiavi private di spesa e l'autorità di firma rimangono sul dispositivo hardware. Hito esegue poi la firma offline.

La tappa attuale Hito afferma che l'intero flusso di creazione, esportazione, firma offline e importazione è operativo e include il trasporto BLE e l'esportazione tramite codici QR BBQr della PCZT firmata.

Vale la pena descrivere esplicitamente questo flusso, perché rappresenta un ciclo completo concreto come quello trattato in precedenza nel rapporto: il portafoglio Android crea la PCZT non firmata, la esporta in Hito, Hito firma offline con il materiale delle chiavi isolato e la PCZT firmata viene importata di nuovo nel portafoglio Android.

Il seed e la chiave di spesa non attraversano mai il confine in nessuna delle due direzioni.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard a Ironwood: l’evoluzione del supporto ai portafogli hardware

Orchard è una pool schermata nel protocollo Zcash che consente agli utenti di conservare e trasferire ZEC con maggiore privacy. Introdotta nell’aggiornamento di rete 5 (NU5), Orchard usa il sistema di prove Halo 2 e un’architettura crittografica riprogettata per supportare le transazioni schermate senza rivelare informazioni sensibili, come il mittente, il destinatario o l’importo.

Ironwood è una pool schermata introdotta con l’aggiornamento di rete NU6.3 di Zcash, come successore della pool Orchard. Usa il protocollo crittografico Orchard e introduce modifiche pensate per migliorare la sicurezza a lungo termine dei fondi schermati, tra cui la possibilità di recuperarli in caso di minaccia quantistica e garanzie più solide sull’integrità dell’offerta.

Per cominciare, è essenziale chiarire che Ironwood non ha sostituito il protocollo Orchard con un sistema crittografico completamente nuovo. Ironwood è stata introdotta come nuova pool schermata basata sul protocollo Orchard esistente. Ciò significa che condivide la stessa struttura delle Action, lo stesso sistema di prove Halo 2 e le stesse costruzioni di note e chiavi.

Ironwood ha il proprio albero di commitment delle note, insieme di nullifier, anchor e pool di valore, quindi a livello di consenso è una pool davvero separata. Dal punto di vista crittografico, però, è un’estensione di Orchard, non una ricostruzione.

È stata progettata così per:

1. **Garantire l’integrità dell’offerta.** Il 29 maggio 2026, il ricercatore di sicurezza Taylor Hornby ha comunicato in privato una grave falla di soundness nel sistema di prove a conoscenza zero di Orchard, che avrebbe potuto consentire la creazione di ZEC contraffatti senza lasciare tracce on-chain. Poiché i dati delle transazioni di Orchard sono privati, nessuno può verificare in modo indipendente che prima della correzione non sia stato creato ZEC contraffatto. Sigillare la vecchia pool e avviarne una nuova con saldo zero risolve il problema in un modo che non sarebbe stato possibile correggendo Orchard senza sostituirla.
2. **Garantire la possibilità di recupero in caso di minaccia quantistica.** Ironwood è stata progettata in modo che i suoi fondi possano partecipare a un futuro meccanismo di recupero, qualora venissero mai violate le ipotesi sottostanti sul logaritmo discreto.
3. **Ridurre al minimo le modifiche all’implementazione.** Invece di progettare un protocollo schermato completamente nuovo, è stata riutilizzata l’architettura collaudata di Orchard. Questo ha ridotto notevolmente la quantità di nuovo codice per transazioni, prove, portafogli e portafogli hardware da scrivere da zero.

### La cronologia pubblica

- 29 maggio: viene divulgata la vulnerabilità di Orchard.
- Giugno: le transazioni Orchard vengono temporaneamente limitate mentre la correzione iniziale viene distribuita tramite NU6.2. Il 12 giugno, uno sviluppatore principale indica il 21 luglio come data dell’aggiornamento completo; in seguito, la data slitta di una settimana. La community esprime il timore che i titolari di Keystone siano gli ultimi a migrare; uno sviluppatore principale risponde che Keystone supporterà Ironwood fin dal primo giorno, con il firmware previsto per il 3 luglio, in attesa dei parametri di firma definitivi e delle modifiche all’API di Orchard dal core di Zcash.
- Inizio luglio: NU6.3 arriva sulla testnet; Zebra 6.0.0 viene rilasciato il 10 luglio.
- 27–28 luglio: le modifiche alla firma della v2 di Ironwood PCZT di Ledger vengono integrate in un branch di integrazione. Ironwood (NU6.3) si attiva il 28 luglio al blocco 3,428,143, sigillando la pool Orchard originale dietro un turnstile (tornello) che limita la quantità di ZEC che può uscire da Orchard al totale legittimamente depositato nella pool e introduce un nuovo formato di transazione.

Zebra diventa il nodo richiesto, poiché zcashd non supporta le nuove regole di consenso. Gli indirizzi non cambiano perché Ironwood riutilizza la struttura dei receiver di Orchard, quindi i portafogli instradano automaticamente gli indirizzi esistenti nella nuova pool. Ai portafogli serve invece una funzione di migrazione, perché i proprietari dovranno trasferire i fondi Orchard in Ironwood e il consenso ora impedisce del tutto i nuovi output che ricevono Orchard.

### Cosa è cambiato dal punto di vista tecnico

I formati delle transazioni sono passati dalla versione 5 alla versione 6, così una singola transazione può contenere un componente Ironwood insieme ai componenti Sapling/Orchard/trasparenti esistenti. Anche PCZT è stato esteso:

- La codifica è passata da PCZT v1 a v2.
- Ora un bundle Ironwood separato affianca quelli Sapling e Orchard.
- Sono supportate le transazioni v6 e un nuovo sighash v6.
- Le note in testo in chiaro hanno acquisito una nuova versione (V3).

La modifica al sighash è particolarmente importante per i portafogli hardware. Nella v6, gli anchor Orchard e Ironwood sono esclusi dall’hash della firma e contribuiscono solo al digest dei dati di autorizzazione. È una vera modifica del firmware, non un semplice aumento di versione. Il dispositivo deve implementare correttamente il nuovo sighash e ricalcolarlo da sé, invece di fidarsi di ciò che l’applicazione associata afferma di approvare.

Il contratto di isolamento non è cambiato: il dispositivo restituisce ancora solo la firma di autorizzazione alla spesa, mai `alpha`, e non genera mai la firma di binding; inoltre, l’host continua a occuparsi delle prove e di tutto il resto.

Con la v6 è cambiata una regola per i firmatari: le spese fittizie di riempimento vengono firmate dall’IO Finalizer anziché dal dispositivo, perché il dispositivo non può verificarle usando dati reali delle note. Il ruolo di Signer del dispositivo le ignora, anziché chiedergli di firmare qualcosa che non può verificare. Anche le commissioni mostrate ora sommano i saldi di valore di Orchard e Ironwood, perché una transazione v6 può spendere dalla stessa transazione usando entrambe le pool.

Tenere correttamente la contabilità delle pool è importante nella pratica, non solo in teoria. Un bug recente nel portafoglio Zcash di Brave lo dimostra bene: il calcolo delle commissioni presumeva che tutti gli input schermati appartenessero alla pool Orchard legacy, causando azioni duplicate e stime errate delle commissioni ogni volta che una transazione coinvolgeva davvero Ironwood. È proprio il tipo di errore che il principio alla base della firma con portafoglio hardware, "ricalcola da te, non fidarti dell’host", serve a individuare. Un portafoglio associato ha gestito male la contabilità delle pool e solo un dispositivo che controlla i propri calcoli in modo indipendente avrebbe potuto segnalare l’errore prima di autorizzare la firma.

### Situazione dei singoli firmatari

**Ledger ha cambiato completamente la situazione.** Il 23 settembre 2026, Ledger ha introdotto il supporto nativo per Zcash schermato direttamente in Ledger Wallet Desktop: non serve più un’applicazione associata separata. La chiave di spesa resta sul dispositivo, il computer esegue i calcoli della transazione e tu approvi tutto sullo schermo prima della firma. Supporta solo Ironwood, non le vecchie pool Orchard o Sapling. Lo svantaggio è che l’app "Zcash Shielded", sviluppata da Zondax e utilizzabile con un portafoglio associato come Zkool, verrà dismessa. Ledger ha fissato al 5 novembre 2026 la data in cui ritirerà quell’app meno recente; i fondi che si trovano ancora al suo interno andrebbero quindi trasferiti su un account della nuova app.

**Keystone è in buona forma.** Il firmware 3.0.2 ha aggiunto il supporto completo per Ironwood a luglio, mentre il firmware 3.2.2 (11 novembre 2026) ha aggiunto il supporto per NU7 alle edizioni Web3 e Cypherpunk ([note di rilascio](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). Con NU7 attiva su Mainnet, aggiorna alla versione 3.2.2 o successiva prima di firmare.

**Hito ha superato la fase iniziale di testnet.** Ha firmato e inviato con successo la sua prima transazione reale da Orchard a Ironwood usando un dispositivo fisico, inizialmente sulla testnet. Gli aggiornamenti successivi hanno confermato i flussi su Mainnet (Ironwood→Ironwood, Ironwood→Trasparente e altri) su dispositivi fisici di produzione. Il firmware stabile e il rilascio più ampio sono ancora in corso.

**Zkool funziona con entrambe le app Ledger.** L’app di Zondax è quella che verrà ritirata su Ledger. Zkool, che dipendeva da quell’app per comunicare con i dispositivi Ledger, si è adeguata prima della scadenza: dalla versione [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 settembre 2026) funziona anche con la nuova app ufficiale Zcash di Ledger, importando dal dispositivo la UFVK e firmando le transazioni v6 (Ironwood); continua inoltre a supportare gli account dell’app Zondax. Le versioni successive hanno mantenuto il supporto per il percorso Ledger: la versione 6.32.0 importa gli account Ledger tramite l’API GraphQL di Zkool, mentre la versione 6.36.0 ha corretto un crash causato da risposte Ledger brevi. Perciò Zkool resta un’opzione per gli utenti Ledger che preferiscono un portafoglio associato a Ledger Wallet Desktop.

La migrazione è l’effetto più rilevante. Poiché l’importo trasferito tra le pool è pubblico, nel tempo i portafogli suddividono i trasferimenti tra tagli standard invece di spostare tutto il saldo in un’unica quantità visibile. Questo significa che per ogni migrazione bisogna firmare molte transazioni, ed è proprio per questo che la firma batch di PCZT è stata così importante per i portafogli hardware.

Anche il lavoro sul firmware di Ledger si è scontrato con i limiti dell’hardware: una spesa reale di una nota poteva richiedere decine di migliaia di chiamate di sistema crittografiche in un singolo comando, facendo scattare il watchdog del dispositivo. La correzione ha spostato in software l’aritmetica dei campi e ha richiesto uno stato scratch condiviso che rientrasse nei limiti dello stack di Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### L’evoluzione in un’unica immagine

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
