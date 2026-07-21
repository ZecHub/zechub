<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) è un protocollo di firma a soglia e di generazione distribuita delle chiavi: più firmatari detengono ciascuno una quota di una chiave privata comune, e un numero soglia di essi deve cooperare per produrre una firma.
* Poiché il risultato è una singola firma Schnorr, una transazione realizzata in questo modo appare sulla rete come una normale transazione.
* Richiede un numero minimo di round di comunicazione, può essere eseguito in parallelo e può identificare ed escludere un partecipante che si comporta in modo scorretto.
* Per Zcash, questo significa che FROST consente a più parti geograficamente separate di controllare l'autorità di spesa di ZEC shielded — utile per custodia, escrow, servizi non-custodial e Zcash Shielded Assets (ZSA).
* È stato creato da Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).

## Spiegazione di base

### Che cos'è una firma Schnorr?

Una firma digitale Schnorr è un insieme di algoritmi: (KeyGen, Sign, Verify).

Le firme Schnorr hanno diversi vantaggi. Un vantaggio fondamentale è che quando più chiavi vengono utilizzate per firmare lo stesso messaggio, le firme risultanti possono essere combinate in un'unica firma. Questo può ridurre significativamente la dimensione dei pagamenti multisig e di altre transazioni correlate al multisig.

### Che cos'è FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Creato da Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

FROST è un protocollo di firma a soglia e di generazione distribuita delle chiavi che richiede un numero minimo di round di comunicazione e può essere eseguito in parallelo. Il protocollo FROST è una versione a soglia dello schema di firma Schnorr.

A differenza delle firme in un contesto a singola parte, le firme a soglia richiedono la cooperazione di un numero soglia di firmatari, ciascuno in possesso di una quota di una chiave privata comune.

[Cosa sono le firme a soglia? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Di conseguenza, la generazione di firme in un contesto a soglia comporta un overhead dovuto ai round di rete tra i firmatari, rendendola costosa quando le quote segrete sono conservate su dispositivi con limitazioni di rete o quando il coordinamento avviene su reti inaffidabili.

L'overhead di rete durante le operazioni di firma viene ridotto impiegando una tecnica innovativa che protegge dagli attacchi di falsificazione ed è applicabile anche ad altri schemi.

FROST migliora i protocolli di firma a soglia consentendo di eseguire in sicurezza in parallelo un numero illimitato di operazioni di firma (concorrenza).

Può essere utilizzato sia come protocollo a 2 round, in cui i firmatari inviano e ricevono in totale 2 messaggi, sia come protocollo di firma ottimizzato a round singolo con una fase di preelaborazione.

FROST ottiene i suoi miglioramenti di efficienza in parte consentendo al protocollo di interrompersi in presenza di un partecipante che si comporta in modo scorretto, che viene poi identificato ed escluso dalle operazioni future.

Le prove di sicurezza che dimostrano che FROST è sicuro contro attacchi a messaggio scelto, assumendo che il problema del logaritmo discreto sia difficile e che l'avversario controlli meno partecipanti della soglia, sono fornite [qui](https://eprint.iacr.org/2020/852.pdf#page=16).

### Come funziona FROST?

Il protocollo FROST contiene due componenti importanti:

Per prima cosa, n partecipanti eseguono un protocollo di generazione distribuita delle chiavi (DKG) per generare una chiave di verifica comune. Alla fine, ogni partecipante ottiene una quota di chiave segreta privata e una quota di chiave di verifica pubblica.

Successivamente, un qualsiasi insieme di t partecipanti su n può eseguire un protocollo di firma a soglia per generare collaborativamente una firma Schnorr valida.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visuale / Analogia

Pensa a FROST come a una cassetta di sicurezza che si apre solo quando più detentori autorizzati girano insieme le loro chiavi — ma non è necessario che siano presenti tutti i detentori delle chiavi; ne basta solo un numero prestabilito (per esempio, 3 su 5). Una volta aperta la cassetta, un osservatore esterno non può capire quali detentori delle chiavi si siano presentati, né se fosse coinvolta più di una persona. Allo stesso modo, un gruppo può autorizzare congiuntamente una transazione Zcash mentre la rete vede solo una firma dall'aspetto ordinario.

## Approfondimento

**Generazione distribuita delle chiavi (DKG)**

L'obiettivo di questa fase è generare quote di chiavi segrete a lunga durata e una chiave di verifica congiunta. Questa fase viene eseguita da n partecipanti.

FROST costruisce la propria fase di generazione delle chiavi sul DKG di Pedersen (GJKR03), che utilizza sia lo schema di condivisione del segreto di Shamir sia gli schemi di condivisione verificabile del segreto di Feldman come sottoprocedure. Inoltre, ogni partecipante deve dimostrare la conoscenza del proprio segreto inviando agli altri partecipanti una prova a conoscenza zero, che è essa stessa una firma Schnorr. Questo passaggio aggiuntivo protegge dagli attacchi rogue-key quando t ≥ n/2.

Alla fine del protocollo DKG, viene generata una chiave di verifica congiunta vk. Ogni partecipante Pᵢ detiene un valore (i, skᵢ ) che rappresenta la sua quota segreta a lunga durata e una quota di chiave di verifica vkᵢ = skᵢ *G. La quota di chiave di verifica vkᵢ del partecipante Pᵢ viene utilizzata dagli altri partecipanti per verificare la correttezza delle quote di firma di Pᵢ durante la fase di firma, mentre la chiave di verifica vk viene utilizzata da parti esterne per verificare le firme emesse dal gruppo.

**Firma a soglia**

Questa fase si basa su tecniche note che impiegano la condivisione additiva del segreto e la conversione delle quote per generare in modo non interattivo il nonce per ogni firma. Sfrutta inoltre tecniche di binding per evitare noti attacchi di falsificazione senza limitare la concorrenza.

Nella fase di preelaborazione, ogni partecipante prepara un numero fisso di coppie di punti della Curva Ellittica (EC) da utilizzare successivamente. Questa fase viene eseguita una volta sola attraverso più fasi di firma a soglia.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Round di firma 1: ogni partecipante Pᵢ inizia generando una singola coppia di nonce privati (dᵢ, eᵢ) e la corrispondente coppia di punti EC (Dᵢ, Eᵢ), quindi trasmette questa coppia di punti a tutti gli altri partecipanti. Ogni partecipante memorizza queste coppie di punti EC per un uso successivo. I round di firma 2 e 3 sono le operazioni effettive in cui t partecipanti su n cooperano per creare una firma Schnorr valida.

Round di firma 2: i partecipanti lavorano insieme per creare una firma Schnorr valida. La tecnica fondamentale alla base di questo round è la condivisione additiva del segreto t-su-t.

Questo passaggio previene gli attacchi di falsificazione perché gli attaccanti non possono combinare quote di firma provenienti da operazioni di firma distinte né permutare l'insieme dei firmatari o i punti pubblicati per ciascun firmatario.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Dopo aver calcolato la challenge c, ogni partecipante può calcolare la risposta zᵢ utilizzando i nonce monouso e le quote segrete a lungo termine, che sono quote segrete di Shamir t-su-n (di grado t-1) della chiave a lunga durata del gruppo. Alla fine del round di firma 2, ogni partecipante trasmette zᵢ agli altri partecipanti.

[Leggi l'articolo completo](https://eprint.iacr.org/2020/852.pdf)
### Uso di FROST nell'ecosistema più ampio

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Per migliorare l'efficienza dei sistemi di firma a soglia di Coinbase, hanno sviluppato una versione di FROST. Questa implementazione di Coinbase apporta lievi modifiche rispetto alla bozza originale di FROST.

Hanno scelto di non usare il ruolo di aggregatore delle firme. Invece, ogni partecipante è un aggregatore delle firme. Questo design è più sicuro: tutti i partecipanti del protocollo verificano i calcoli degli altri, ottenendo così un livello di sicurezza più elevato e riducendo il rischio. Anche la fase di pre-elaborazione una tantum è stata rimossa per velocizzare l'implementazione, utilizzando invece un terzo round di firma.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) di Blockstream**

Viene proposto un miglioramento specifico per l'applicazione di FROST da usare su [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) per Bitcoin.

“ROAST è un semplice wrapper attorno a schemi di firma a soglia come FROST. Garantisce che un quorum di firmatari onesti, ad esempio i functionary di Liquid, possa sempre ottenere una firma valida anche in presenza di firmatari che causano interruzioni, quando le connessioni di rete hanno una latenza arbitrariamente elevata.”

---

**FROST nell'IETF**

L'Internet Engineering Task Force, fondata nel 1986, è la principale organizzazione di sviluppo degli standard per Internet. L'IETF sviluppa standard volontari che vengono spesso adottati dagli utenti di Internet, dagli operatori di rete e dai fornitori di apparecchiature, contribuendo a plasmare l'evoluzione di Internet.

La versione 11 di FROST (variante a due round) è stata [presentata a IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Questo è un passo importante verso la valutazione completa di FROST come nuovo standard di schema di firma a soglia da utilizzare su Internet, nei dispositivi hardware e per altri servizi negli anni a venire.


## Implicazioni pratiche

Assolutamente sì. L'introduzione di FROST in Zcash consentirà a più parti, geograficamente separate, di controllare l'autorità di spesa di ZEC shielded. Le transazioni trasmesse usando questo schema di firma saranno indistinguibili dalle altre transazioni sulla rete, mantenendo una forte resistenza al tracciamento dei pagamenti e limitando la quantità di dati sulla blockchain disponibili per l'analisi.

In pratica, questo consente di costruire sulla rete un'ampia gamma di nuove applicazioni, che vanno dai fornitori di escrow ad altri servizi non-custodial.

FROST diventerà anche un componente essenziale nell'emissione e nella gestione sicura degli Zcash Shielded Assets (ZSA), consentendo una gestione più sicura dell'autorità di spesa all'interno delle organizzazioni di sviluppo e dei custodi di ZEC come gli exchange, fornendo al contempo questa capacità anche agli utenti di Zcash.

## Errori comuni

**Confondere FROST con il multisig tradizionale on-chain**. Il multisig tradizionale può rivelare più firmatari o più firme on-chain. FROST produce un'unica firma Schnorr aggregata, quindi una transazione è indistinguibile da una transazione con firma singola.

**Presumere che meno della soglia possano firmare**. Solo un numero soglia (t-su-n) di partecipanti che agiscono insieme può produrre una firma valida; qualsiasi gruppo più piccolo non può farlo.

**Presumere che FROST nasconda tutto off-chain**. FROST protegge la firma on-chain, ma il coordinamento tra i firmatari avviene comunque off-chain e richiede propri controlli di privacy e sicurezza.


## Pagine correlate

- [Halo](/zcash-tech/halo) — il sistema di prove trustless e ricorsivo usato nel pool Orchard di Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — divulgazione selettiva per le transazioni shielded.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — dove FROST aiuta a gestire l'autorità di spesa/emissione.
- [Sincronizzazione dei wallet Zcash](/zcash-tech/zcash-wallet-syncing) — un altro elemento fondamentale dell'infrastruttura per la privacy di Zcash.


## Per approfondire

[Articolo di Coinbase - Firme a soglia](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Spiegazione ed esempio](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Breve video sulle firme digitali Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
