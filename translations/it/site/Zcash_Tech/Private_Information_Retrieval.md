# Recupero privato delle informazioni

## TL;DR

- Il recupero privato delle informazioni, o PIR, consente a un dispositivo di recuperare un elemento dal database di un server senza che il server scopra quale elemento è stato richiesto
- Zcash ne ha bisogno perché un wallet privato non può chiedere a un server quali transazioni sono le proprie senza compromettersi
- Oggi i wallet scaricano e analizzano molti più dati del necessario, ed è una delle ragioni principali per cui la sincronizzazione è lenta
- Il PIR permetterebbe a un wallet di recuperare privatamente solo i propri dati, eliminando quel collo di bottiglia e mantenendo intatta la privacy
- È un'area di ricerca attiva per Zcash, potente in teoria, e in fase di adattamento pratico per wallet reali

<br/>

## A chi è rivolto

- Chiunque si sia chiesto come un wallet privato trovi le proprie monete senza rivelare quali siano
- I nuovi arrivati che continuano a vedere il PIR menzionato accanto al lavoro di scalabilità di Zcash
- I lettori che vogliono prima il concetto e solo dopo la crittografia che lo sostiene

<br/>

## Il problema che il PIR risolve per Zcash

Zcash nasconde chi è il destinatario di una transazione. Questa privacy crea una domanda scomoda: se la rete non può vedere quali transazioni appartengono a te, come fa il tuo wallet a trovarle?

Oggi la risposta è brutale. Un wallet non può chiedere a un server quali transazioni sono le mie, perché quella domanda rivelerebbe esattamente ciò che Zcash cerca di nascondere. Quindi, invece, il wallet scarica una grande quantità di dati e verifica localmente ogni elemento per capire cosa gli appartiene. Funziona, e preserva la privacy, ma è lento e pesante. Questa scansione è uno dei motivi principali per cui la sincronizzazione del wallet può sembrare macchinosa.

L'ideale sarebbe un modo per permettere a un wallet di chiedere a un server esattamente i propri dati, riceverli, senza che il server scopra mai cosa è stato richiesto. Questo è esattamente ciò che offre il recupero privato delle informazioni.

<br/>

## Che cos'è il PIR

Il recupero privato delle informazioni è un metodo crittografico che consente a un client di leggere una voce dal database di un server senza rivelare al server quale voce abbia letto.

Immagina una biblioteca in cui puoi ricevere esattamente il libro che vuoi, ma il bibliotecario non scopre mai quale libro ti ha consegnato. Tu ottieni il tuo elemento e il tuo interesse resta privato. Il PIR è la versione matematica di questa idea, applicata a qualsiasi database.

Il concetto è studiato in crittografia da decenni. Fu introdotto per la prima volta nel 1995 da Chor, Goldreich, Kushilevitz e Sudan, che descrissero l'approccio a server multipli, e la prima versione a server singolo arrivò nel 1997 con Kushilevitz e Ostrovsky. Non è qualcosa che Zcash ha inventato, è un campo consolidato che Zcash sta ora applicando a un problema reale e ostinato.

<br/>

## Come funziona il PIR, a un primo livello

Esistono due modi generali per costruire il PIR, e la differenza conta.

Il primo usa più server. Il client invia a ciascuno di vari server una parte della query e combina localmente le loro risposte. Nessun singolo server vede abbastanza da capire cosa è stato richiesto. Questo è efficiente, ma dipende dal fatto che i server non colludano tra loro, cosa difficile da garantire nel mondo reale.

Il secondo usa un server singolo e una crittografia ingegnosa invece di più parti. Qui il client si affida a uno strumento speciale chiamato crittografia omomorfica, ed è questa la direzione più utile per implementazioni reali, perché non richiede più server che non colludano.

<br/>

## Il meccanismo: crittografia omomorfica

La crittografia omomorfica è un tipo di crittografia che permette a un server di eseguire calcoli sui dati mentre restano cifrati. Il server produce una risposta cifrata corretta senza mai vedere i valori sottostanti.

Ecco l'idea alla base del PIR a server singolo costruito in questo modo. Il client vuole l'elemento numero tre da un elenco. Costruisce una query che è, in pratica, un sì cifrato per la posizione tre e un no cifrato per ogni altra posizione. Per il server, questa query è solo rumore privo di significato, non può capire quale posizione contenga il sì.

Il server poi combina il suo database con questa query cifrata usando le proprietà speciali della crittografia omomorfica, moltiplicando ogni elemento memorizzato per il corrispondente sì o no cifrato e sommando insieme i risultati. Ciò che ne esce è un singolo pacchetto cifrato che contiene esattamente l'elemento che il client voleva, e nulla rivela quale fosse. Il client decifra quel pacchetto e legge il proprio elemento. Il server ha risposto alla domanda senza mai conoscere la domanda.

Una versione più forte, chiamata PIR simmetrico, aggiunge una seconda garanzia: il client apprende solo l'elemento che ha richiesto e nulla su qualsiasi altra voce del database. Questo protegge il database oltre al client.

<br/>

## Uno sguardo più ravvicinato per i lettori tecnici

I moderni schemi a server singolo si basano sulla crittografia a reticoli, più comunemente sull'assunzione learning with errors. La query del client è un vettore di ciphertext, una cifratura di uno all'indice di destinazione e zero altrove, e la cifratura è omomorfica additiva, quindi il server può sommare ciphertext e moltiplicarli per voci del database in chiaro senza decifrare.

Il server tratta il database come una matrice, applica il vettore di selezione cifrato e restituisce un singolo ciphertext che, una volta decifrato, produce la riga desiderata. Poiché la query è indistinguibile da rumore casuale, il server non ottiene alcuna informazione sull'indice.

L'ostacolo storico è sempre stato il costo. In modo ingenuo, il server deve toccare ogni voce del database per ogni query, il che è costoso in termini di calcolo, e i ciphertext sono grandi, il che è costoso in termini di larghezza di banda. La ricerca recente affronta questo problema con il pre-processing; schemi come SimplePIR e FrodoPIR consentono al server di preparare il database in anticipo e fornire a ogni client un piccolo suggerimento, spostando gran parte del lavoro in una fase offline in modo che le query in tempo reale diventino rapide. Un utile beneficio collaterale è che le costruzioni basate su reticoli sono considerate anche resistenti agli attacchi quantistici, cosa che si allinea con il più ampio movimento di Zcash verso una privacy post-quantistica.

<br/>

## PIR in Zcash

Il PIR fa parte dello sforzo per rendere Zcash sia privato sia veloce su larga scala.

L'obiettivo è il collo di bottiglia della scansione del wallet descritto in precedenza. Il lavoro del Valar Group sta sviluppando tecniche di recupero privato delle informazioni affinché un wallet possa recuperare i propri dati da un server senza che il server scopra quali voci sono state richieste. Un'applicazione concreta è il controllo privato dei nullifier. Un nullifier è un marcatore univoco pubblicato quando una nota viene spesa, che impedisce che gli stessi fondi vengano spesi due volte. Un wallet deve spesso verificare se un determinato nullifier sia già apparso, in altre parole se una nota sia ancora non spesa, e farlo tramite un server oggi può rivelare su quale nota si stia chiedendo. Il recupero privato delle informazioni permette al wallet di porre questa domanda senza rivelare quale nullifier gli interessi. Questo si affianca ad altri lavori di scalabilità, tra cui Project Tachyon e nuovo software per nodi, mirati a rimuovere i limiti di prestazione che oggi frenano i wallet privati.

È importante essere onesti riguardo alla fase in cui ci troviamo. Si tratta di ricerca e ingegneria attive, non di una funzionalità finita e già distribuita. Il concetto è ben consolidato e la direzione è definita, ma rendere il PIR abbastanza efficiente per i wallet di tutti i giorni su dispositivi comuni è esattamente la parte difficile su cui si sta lavorando ora.

<br/>

## Equivoci comuni

- Il PIR nasconde quale elemento hai richiesto, ma non necessariamente il fatto che tu abbia contattato il server; i metadati a livello di rete sono una questione separata
- Il PIR non è unico di Zcash, è uno strumento crittografico generale che Zcash sta applicando alla privacy dei wallet
- Una sincronizzazione più rapida grazie al PIR è un obiettivo ancora in corso, non una funzionalità già presente nei wallet
- Scaricare tutto e analizzare localmente, l'approccio attuale, preserva la privacy ma è lento; il PIR punta a mantenere la privacy eliminando la lentezza

<br/>

## Pagine correlate

- [Sincronizzazione dei Wallet Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - perché oggi la sincronizzazione funziona in questo modo
- [Nodi Lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - il modello light client che il PIR migliorerebbe
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - l'altro principale strumento crittografico alla base della privacy di Zcash
- [Sicurezza Post-Quantistica](https://zechub.wiki/zcash-tech/post-quantum-security) - perché i metodi basati su reticoli sono importanti per il futuro
