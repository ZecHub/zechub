# FROST 


## Cosa è una firma Schnorr?

Una firma digitale di Schnorr è un insieme di algoritmi: (KeyGen, Sign, Verify).

Le firme di Schnorr presentano diversi vantaggi. Uno dei principali è che quando vengono utilizzate più chiavi per firmare lo stesso messaggio, le firme risultanti possono essere combinate in una singola firma. Ciò può essere utilizzato per ridurre significativamente le dimensioni dei pagamenti multisig e di altre transazioni legate ai multisig.


## Cos'è FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Creato da Chelsea Komlo (Università di Waterloo, Zcash Foundation) e Ian Goldberg (Università di Waterloo).*

FROST è un protocollo di firma a soglia e un protocollo di generazione di chiavi distribuite che offre un numero minimo di round di comunicazione ed è sicuro da eseguire in parallelo. Il protocollo FROST è una versione a soglia dello schema di firma di Schnorr.

A differenza delle firme in un contesto monopartitico, le firme a soglia richiedono la cooperazione tra un numero limite di firmatari, ciascuno dei quali possiede una quota di una chiave privata comune.

[Cosa sono le firme a soglia? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Di conseguenza, la generazione di firme in un'impostazione a soglia impone un overhead dovuto ai giri di rete tra i firmatari, che si rivela costoso quando le quote segrete sono memorizzate su dispositivi a rete limitata o quando il coordinamento avviene su reti poco affidabili.

L'overhead di rete durante le operazioni di firma è ridotto grazie all'impiego di una nuova tecnica di protezione dagli attacchi di falsificazione applicabile ad altri schemi.

FROST migliora i protocolli di firma a soglia, in quanto è possibile eseguire un numero illimitato di operazioni di firma in parallelo (concurrency).

Può essere utilizzato sia come protocollo a 2 round, in cui i firmatari inviano e ricevono 2 messaggi in totale, sia ottimizzato per un protocollo di firma a singolo round con una fase di pre-elaborazione.

FROST ottiene i suoi miglioramenti di efficienza in parte consentendo al protocollo di interrompersi in presenza di un partecipante scorretto (che viene quindi identificato ed escluso dalle operazioni future).

[Qui](https://eprint.iacr.org/2020/852.pdf#page=16) sono fornite le prove di sicurezza che dimostrano che FROST è sicuro contro gli attacchi a messaggio scelto, assumendo che il problema del logaritmo discreto sia difficile e che l'avversario controlli meno partecipanti rispetto alla soglia.


## Come funziona FROST?

Il protocollo FROST contiene due componenti importanti:

In primo luogo, n partecipanti eseguono un *protocollo di generazione di chiavi distribuite (DKG)* per generare una chiave di verifica comune; alla fine, ogni partecipante ottiene una parte di chiave segreta privata e una parte di chiave pubblica di verifica.

Successivamente, qualsiasi gruppo di t partecipanti su n può eseguire un protocollo di firma soglia per generare collaborativamente una firma Schnorr valida. 

![Firma soglia](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Generazione di chiavi distribuite (DKG)**

Lo scopo di questa fase è generare parti di chiave segreta a lunga durata e una chiave di verifica congiunta. Questa fase è eseguita da n partecipanti.

FROST costruisce la sua fase di generazione di chiavi su [Pedersen’s DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) in cui utilizza sia lo schema Shamir di condivisione segreta che lo schema di condivisione segreta verificabile di Feldman come subroutine. Inoltre, ogni partecipante deve dimostrare di conoscere la propria parte di segreto inviando agli altri partecipanti una prova a conoscenza zero, che a sua volta è una firma Schnorr. Questa fase aggiuntiva protegge contro gli attacchi di rogue-key nel contesto in cui t ≥ n/2.

Alla fine del protocollo DKG, viene generata una chiave di verifica congiunta vk. Inoltre, ogni partecipante Pᵢ possiede un valore (i, skᵢ) che rappresenta la sua parte di segreto a lunga durata e una parte di chiave di verifica vkᵢ = skᵢ * G. La parte di chiave di verifica vkᵢ del partecipante Pᵢ è utilizzata dagli altri partecipanti per verificare la correttezza delle parti di firma di Pᵢ nella fase di firma, mentre la chiave di verifica vk è utilizzata da parti esterne per verificare le firme emesse dal gruppo.

**Firma soglia**

Questa fase si basa su tecniche note che impiegano la condivisione segreta additiva e la conversione di condivisioni in modo non interattivo per generare il nonce per ogni firma. Questa fase sfrutta anche tecniche di binding per evitare attacchi noti di falsificazione senza limitare la concorrenza.

Preprocessing: Nella fase di preprocessing, ogni partecipante prepara un numero fisso di coppie di punti di curva ellittica (EC) per un uso successivo, che viene eseguito una sola volta per più fasi di firma soglia.

![Preprocessing](https://i.ibb.co/nQD1c3n/preprocess.png "preprocess stage")

Fase di Firma 1: Ogni partecipante Pᵢ inizia generando una singola coppia di nonce privati (dᵢ, eᵢ) e la corrispondente coppia di punti EC (Dᵢ, Eᵢ) e diffonde questa coppia di punti a tutti gli altri partecipanti. Ogni partecipante memorizza queste coppie di punti EC ricevute per un uso successivo. Le fasi di firma 2 e 3 sono le effettive operazioni in cui t-dei-n partecipanti collaborano per creare una firma Schnorr valida.

Fase di Firma 2: Per creare una firma Schnorr valida, qualsiasi t partecipanti lavorano insieme per eseguire questa fase. La tecnica centrale di questa fase è la condivisione segreta additiva t-su-t.

Questo passaggio previene attacchi di falsificazione poiché gli aggressori non possono combinare le parti della firma attraverso diverse operazioni di firma o permutare l'insieme dei firmatari o i punti pubblicati per ogni firmatario.

![Signing protocol](https://i.ibb.co/b5rJbXx/sign.png "signing protocol")

Dopo aver calcolato la sfida c, ogni partecipante è in grado di calcolare la risposta zᵢ alla sfida utilizzando i nonce monouso e le condivisioni segrete a lungo termine, che sono condivisioni segrete di Shamir t-su-n (grado t-1) della chiave a lunga durata del gruppo. Alla fine della fase di firma 2, ogni partecipante diffonde zᵢ agli altri partecipanti.

[Leggi l'intero paper](https://eprint.iacr.org/2020/852.pdf)


## Ne beneficia Zcash?

Assolutamente sì. L'introduzione di FROST in Zcash permetterà a più parti, separate geograficamente, di controllare l'autorità di spesa di ZEC schermati. Un vantaggio è che le transazioni trasmesse utilizzando questo schema di firma saranno indistinguibili dalle altre transazioni sulla rete, mantenendo una forte resistenza al tracciamento dei pagamenti e limitando la quantità di dati blockchain disponibili per l'analisi.

In pratica, ciò consente di creare una serie di nuove applicazioni sulla rete, tra cui fornitori di escrow o altri servizi non-custodial.

FROST diventerà anche un componente essenziale nella emissione sicura e nella gestione degli asset schermati di Zcash (ZSA), consentendo una gestione più sicura dell'autorità di spesa all'interno di organizzazioni di sviluppo e di custodi di ZEC come gli exchange, distribuendo ulteriormente la fiducia e fornendo questa capacità agli utenti di Zcash.


## Uso di FROST in un ecosistema più ampio

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Al fine di migliorare l'efficienza dei sistemi di firma a soglia di Coinbase, è stata sviluppata una versione di FROST. L'implementazione di Coinbase apporta piccole modifiche alla bozza originale di FROST.

Hanno optato per non utilizzare il ruolo di aggregatore di firma. Invece, ogni partecipante è un aggregatore di firma. Questo design è più sicuro: tutti i partecipanti del protocollo verificano ciò che gli altri hanno calcolato per raggiungere un livello più elevato di sicurezza e ridurre il rischio. Inoltre, la fase di preprocessamento (una tantum) è stata rimossa per accelerare l'implementazione, introducendo un terzo round di firma al suo posto.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) di Blockstream**

Un miglioramento specifico dell'applicazione su FROST proposto per l'uso su [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) per Bitcoin.

"ROAST è un semplice wrapper intorno ai protocolli di firma a soglia come FROST. Garantisce che un quorum di firmatari onesti, ad esempio i funzionari di Liquid, possa sempre ottenere una firma valida anche in presenza di firmatari che disturbano, o quando le connessioni di rete hanno una latenza arbitrariamente elevata"

___

**FROST in IETF**

La Internet Engineering Task Force, fondata nel 1986, è la principale organizzazione di sviluppo di standard per Internet L'IETF crea standard volontari che sono spesso adottati dagli utenti di Internet, dagli operatori di rete e dai fornitori di apparecchiature, contribuendo così a delineare la traiettoria dello sviluppo di Internet.

La versione 11 di FROST (variante a due round) è stata [presentata all'IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

Questo è un passo importante per la valutazione completa di FROST come nuovo standard di firma di soglia per l'uso su Internet, in dispositivi hardware e per altri servizi nei prossimi anni.
___


Further Learning:

[Articolo di Coinbase - Firme digitali a soglia](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Spiegazione ed esempio](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video breve sulle firme digitali di Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___




