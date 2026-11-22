# Recupero privato delle informazioni

## In breve

- Il recupero privato delle informazioni, o PIR, permette a un dispositivo di recuperare un elemento dal database di un server senza che il server sappia quale elemento è stato richiesto
- Zcash ne ha bisogno perché un portafoglio privato non può chiedere a un server quali transazioni gli appartengono senza rivelarsi
- Oggi i portafogli scaricano ed esaminano molti più dati del necessario, ed è uno dei motivi principali per cui la sincronizzazione è lenta
- Il PIR permetterebbe a un portafoglio di recuperare privatamente solo i propri dati, rimuovendo questo collo di bottiglia e preservando la privacy
- È un campo di ricerca attivo per Zcash, potente in teoria e in fase di sviluppo per renderlo pratico nei portafogli reali
- È già disponibile una dimostrazione funzionante: [ZecBlock Private](https://private.zecblock.com) è il primo block explorer Zcash completo basato su PIR (transazioni, blocchi e indirizzi)

## A chi è rivolto

- A chi si è chiesto come faccia un portafoglio privato a trovare i propri fondi senza rivelare quali siano
- A chi è alle prime armi e continua a vedere il PIR citato insieme al lavoro sulla scalabilità di Zcash
- A chi vuole prima capire il concetto e poi la crittografia che lo sostiene
- A chi è curioso di vedere un block explorer basato su PIR già funzionante

## Il problema che il PIR risolve per Zcash

Zcash nasconde a chi è destinata una transazione. Questa privacy crea una domanda scomoda: se la rete non può vedere quali transazioni ti appartengono, come fa il tuo portafoglio a trovarle?

Oggi la risposta è semplice: un portafoglio non può chiedere a un server quali transazioni sono mie, perché la domanda rivelerebbe proprio ciò che Zcash cerca di nascondere. Quindi il portafoglio scarica una grande quantità di dati e controlla ogni elemento localmente per vedere quali gli appartengono. Funziona e preserva la privacy, ma è lento e impegnativo. Questa scansione è uno dei motivi principali per cui la sincronizzazione del portafoglio può risultare lenta.

L'ideale sarebbe che un portafoglio potesse chiedere a un server i propri dati precisi e riceverli senza che il server scoprisse mai cosa è stato richiesto. È proprio ciò che consente il recupero privato delle informazioni.

## Che cos'è il PIR

Il recupero privato delle informazioni è un metodo crittografico che permette a un client di leggere una voce del database di un server senza rivelargli quale voce ha letto.

Immagina una biblioteca in cui puoi ricevere il libro esatto che vuoi, ma il bibliotecario non scopre mai quale libro ti ha consegnato. Ottieni ciò che cercavi e il tuo interesse resta privato. Il PIR è la versione matematica di questa idea, applicata a qualsiasi database.

Il concetto è studiato in crittografia da decenni. Fu introdotto per la prima volta nel 1995 da Chor, Goldreich, Kushilevitz e Sudan, che descrissero l'approccio con più server; nel 1997 Kushilevitz e Ostrovsky proposero la prima versione con un solo server. Non è un'invenzione di Zcash: è un campo consolidato che Zcash sta applicando a un problema concreto e persistente.

## Come funziona il PIR: una prima spiegazione

Esistono due approcci generali per realizzare il PIR, e la differenza è importante.

Il primo usa più server. Il client invia a ciascuno di diversi server una parte della richiesta e combina localmente le risposte. Nessun singolo server vede abbastanza da capire cosa è stato richiesto. È efficiente, ma dipende dal fatto che i server non colludano tra loro, cosa difficile da garantire nel mondo reale.

Il secondo usa un solo server e una crittografia ingegnosa al posto di più parti. In questo caso il client si affida a uno strumento speciale chiamato crittografia omomorfica. È l'approccio più utile per le implementazioni reali, perché non richiede più server che non colludano.

## Il meccanismo: crittografia omomorfica

La crittografia omomorfica permette a un server di elaborare dati mentre restano crittografati. Il server produce una risposta crittografata corretta senza vedere mai i valori sottostanti.

Ecco l'idea alla base del PIR con un solo server costruito in questo modo. Il client vuole il terzo elemento di un elenco. Crea una richiesta che, in pratica, contiene un sì crittografato per la posizione tre e un no crittografato per ogni altra posizione. Per il server, questa richiesta è solo rumore senza significato: non può capire quale posizione contenga il sì.

Il server combina quindi il proprio database con questa richiesta crittografata, usando le proprietà speciali della crittografia omomorfica: moltiplica ogni elemento memorizzato per il sì o il no crittografato corrispondente e somma i risultati. Ne esce un unico pacchetto crittografato che contiene esattamente l'elemento voluto dal client, senza rivelare quale sia. Il client decritta il pacchetto e legge l'elemento. Il server ha risposto senza sapere quale fosse la domanda.

Una versione più forte, chiamata PIR simmetrico, aggiunge una seconda garanzia: il client apprende solo l'elemento richiesto e non scopre nulla sulle altre voci del database. In questo modo protegge sia il database sia il client.

## Uno sguardo più approfondito per chi ha competenze tecniche

Gli schemi moderni con un solo server si basano sulla crittografia reticolare, più comunemente sull'assunzione di learning with errors. La richiesta del client è un vettore di testi cifrati: cifra uno nell'indice desiderato e zero altrove. La crittografia è omomorfa rispetto all'addizione, quindi il server può sommare i testi cifrati e moltiplicarli per le voci in chiaro del database senza decrittarli.

Il server tratta il database come una matrice, applica il vettore di selezione crittografato e restituisce un unico testo cifrato che, una volta decrittato, corrisponde alla riga desiderata. Poiché la richiesta non è distinguibile da rumore casuale, il server non ottiene informazioni sull'indice.

L'ostacolo storico è sempre stato il costo. In modo ingenuo, per ogni richiesta il server deve accedere a tutte le voci del database, un'operazione onerosa dal punto di vista computazionale; inoltre, i testi cifrati sono grandi e richiedono molta banda. La ricerca recente affronta questi problemi con la preelaborazione: schemi come SimplePIR e FrodoPIR permettono al server di preparare il database in anticipo e fornire a ogni client un piccolo suggerimento, spostando gran parte del lavoro in una fase offline e rendendo così rapide le richieste in tempo reale. Un vantaggio aggiuntivo è che le costruzioni basate su reticoli sono considerate resistenti agli attacchi quantistici, in linea con il più ampio passaggio di Zcash alla privacy post-quantistica.

## Il PIR in Zcash

Il PIR fa parte degli sforzi per rendere Zcash privato e veloce anche su larga scala.

Il suo obiettivo è risolvere il collo di bottiglia della scansione del portafoglio descritto sopra. Il lavoro di Valar Group sviluppa tecniche di recupero privato delle informazioni per consentire a un portafoglio di recuperare i propri dati da un server senza che il server sappia quali voci sono state richieste. Un'applicazione concreta è controllare privatamente i nullifier. Un nullifier è un marcatore univoco pubblicato quando si spende una nota e impedisce di spendere due volte gli stessi fondi. Spesso un portafoglio deve verificare se un determinato nullifier è già comparso, cioè se una nota non è ancora stata spesa. Oggi effettuare questo controllo tramite un server può rivelare quale nota interessa. Il recupero privato delle informazioni permette al portafoglio di porre la domanda senza rivelare quale nullifier gli interessa. Questo lavoro affianca altre iniziative sulla scalabilità, tra cui Project Tachyon e nuovo software per i nodi, con l'obiettivo di eliminare i limiti prestazionali che oggi frenano i portafogli privati.

È importante essere chiari sullo stato dei lavori. Si tratta di ricerca e sviluppo attivi, non di una funzionalità finita e già distribuita. Il concetto è consolidato e la direzione è definita, ma rendere il PIR abbastanza efficiente da funzionare sui portafogli di tutti i giorni e sui normali dispositivi è proprio la sfida su cui si sta lavorando.

## Esempio funzionante: ZecBlock Private

Nel novembre 2026 ZecBlock ha lanciato **ZecBlock Private** (private.zecblock.com), una versione del proprio explorer che usa il recupero privato delle informazioni per cercare transazioni, blocchi e indirizzi.

È il primo block explorer Zcash completo (che include transazioni, blocchi e indirizzi) basato su PIR. Le dimostrazioni precedenti di explorer basati su PIR erano limitate a ricerche più ristrette, come i saldi degli indirizzi.

### Come funzionano le ricerche private

- La richiesta (ID della transazione, altezza/hash del blocco o indirizzo) viene crittografata interamente nel browser prima di essere inviata.
- Il server elabora l'intero insieme di dati pubblicato senza scoprire quale record è stato richiesto.
- Il server restituisce un'unica risposta crittografata che solo il browser può decrittare.
- Una ricerca di un elemento esistente è indistinguibile da una ricerca di un elemento inesistente (stessa dimensione e struttura della richiesta).

Dopo ogni ricerca, il sito mostra un breve riepilogo di ciò che è stato inviato, così puoi verificare facilmente la proprietà di privacy.

### Verifica

Ogni pubblicazione dei dati è firmata. Prima di mostrare qualsiasi risultato, il browser ne verifica la firma: così un server malevolo o difettoso non può sostituire i dati con altri.

### Aggiornamento dei dati

I nuovi blocchi vengono pubblicati ogni pochi secondi. I dati sull'explorer privato in genere hanno un ritardo di circa 20 secondi rispetto al normale explorer di ZecBlock.

### Costi di banda

Il PIR è più costoso di una normale ricerca perché il server deve accedere all'intero insieme di dati:

- Ricerca di una transazione: circa 1,2 MB caricati
- Ricerca di un indirizzo: circa 0,4 MB caricati

Questo è il costo pratico per impedire al server di scoprire qualsiasi informazione sulla richiesta.

### Implementazione client

Il client nel browser è un wrapper da Rust a WebAssembly (attualmente nel repository ZecBlock sotto `prototype/pir-browser`). È basato sulle librerie PIR open source di Valar Group. Il wrapper non è ancora pubblicato come pacchetto npm autonomo, ma è previsto.

### Differenza rispetto al PIR per i portafogli

ZecBlock Private dimostra il PIR per i dati pubblici della chain (cercare una transazione, un blocco o un indirizzo già noti senza rivelare quale). Non risolve il problema più complesso dei portafogli: scoprire privatamente quali note appartengono a una chiave di visualizzazione o controllare privatamente i nullifier delle note non spese. Questi restano campi di ricerca attivi.

## Idee sbagliate comuni

- Il PIR nasconde quale elemento hai richiesto, ma non nasconde necessariamente il fatto che hai contattato il server: i metadati a livello di rete sono una questione distinta
- Il PIR non è una tecnologia esclusiva di Zcash: è uno strumento crittografico generale che Zcash sta applicando alla privacy dei portafogli
- La sincronizzazione più veloce grazie al PIR è un obiettivo in fase di realizzazione, non una funzionalità già presente nei portafogli
- Scaricare tutto e scansionarlo localmente, l'approccio attuale, preserva la privacy ma è lento; il PIR mira a mantenere la privacy eliminando la lentezza

## Pagine correlate

- [Zcash Sincronizzazione del portafoglio](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - perché oggi la sincronizzazione funziona così
- [Nodi lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - il modello di light client che il PIR migliorerebbe
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - l'altro importante strumento crittografico alla base della privacy di Zcash
- [Sicurezza post-quantistica](https://zechub.wiki/zcash-tech/post-quantum-security) - perché i metodi basati su reticoli sono importanti per il futuro
- [ZecBlock](https://zecblock.com) - il principale explorer pubblico
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - gli sviluppatori delle librerie PIR usate sia dal prototipo dell'explorer sia dalla ricerca sui portafogli
