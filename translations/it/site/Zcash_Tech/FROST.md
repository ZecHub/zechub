<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST 


## Cos'è una firma di Schnorr?

Una firma digitale di Schnorr è un insieme di algoritmi: (KeyGen, Sign, Verify).

Le firme di Schnorr presentano diversi vantaggi. Un vantaggio fondamentale è che quando più chiavi vengono utilizzate per firmare lo stesso messaggio, le firme risultanti possono essere combinate in un'unica firma. Questo può essere utilizzato per ridurre significativamente le dimensioni dei pagamenti multisig e di altre transazioni multisig correlate.


## Cos'è FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Creato da Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

FROST è un protocollo per firme a soglia e generazione distribuita di chiavi che offre un numero minimo di round di comunicazione ed è sicuro da eseguire in parallelo. Il protocollo FROST è una versione a soglia dello schema di firma di Schnorr.

A differenza delle firme in un contesto a singola parte, le firme a soglia richiedono la cooperazione di un numero minimo di firmatari, ciascuno dei quali detiene una quota di una chiave privata comune.

[What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Di conseguenza, la generazione di firme in un contesto a soglia introduce un overhead dovuto ai round di rete tra i firmatari, risultando costosa quando le quote segrete sono memorizzate su dispositivi con connettività di rete limitata o quando il coordinamento avviene su reti inaffidabili.

L'overhead di rete durante le operazioni di firma è ridotto grazie all'impiego di una tecnica innovativa per proteggersi dagli attacchi di contraffazione applicabili ad altri schemi.

FROST migliora rispetto ai protocolli di firma a soglia in quanto un numero illimitato di operazioni di firma può essere eseguito in sicurezza in parallelo (concorrenza).

Può essere utilizzato sia come protocollo a 2 round, in cui i firmatari inviano e ricevono 2 messaggi in totale, sia ottimizzato in un protocollo di firma a singolo round con una fase di pre-elaborazione.

FROST raggiunge i propri miglioramenti di efficienza in parte consentendo al protocollo di interrompersi in presenza di un partecipante che si comporta in modo scorretto (che viene quindi identificato ed escluso dalle operazioni future).

Le prove di sicurezza che dimostrano che FROST è sicuro contro gli attacchi a messaggio scelto, assumendo che il problema del logaritmo discreto sia difficile e che l'avversario controlli un numero di partecipanti inferiore alla soglia, sono disponibili [qui](https://eprint.iacr.org/2020/852.pdf#page=16).


## Come funziona FROST?

Il protocollo FROST contiene due componenti importanti:

In primo luogo, n partecipanti eseguono un *protocollo di generazione distribuita delle chiavi (DKG)* per generare una chiave di verifica comune; al termine, ciascun partecipante ottiene una quota di chiave privata segreta e una quota di chiave di verifica pubblica.

Successivamente, qualsiasi sottoinsieme di t partecipanti su n può eseguire un *protocollo di firma a soglia* per generare in modo collaborativo una firma di Schnorr valida.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

**Generazione distribuita delle chiavi (DKG)**

L'obiettivo di questa fase è generare quote di chiave segreta a lungo termine e una chiave di verifica congiunta. Questa fase viene eseguita da n partecipanti.

FROST costruisce la propria fase di generazione delle chiavi sulla base del [DKG di Pedersen (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/), in cui utilizza sia la condivisione segreta di Shamir sia gli schemi di condivisione segreta verificabile di Feldman come subroutine. Inoltre, a ciascun partecipante è richiesto di dimostrare la conoscenza del proprio segreto inviando agli altri partecipanti una prova a conoscenza zero, che è essa stessa una firma di Schnorr. Questo passaggio aggiuntivo protegge dagli attacchi rogue-key nel contesto in cui t ≥ n/2.

Al termine del protocollo DKG, viene generata una chiave di verifica congiunta vk. Inoltre, ciascun partecipante Pᵢ detiene un valore (i, skᵢ) che rappresenta la propria quota di chiave segreta a lungo termine e una quota di chiave di verifica vkᵢ = skᵢ *G. La quota di chiave di verifica vkᵢ del partecipante Pᵢ viene utilizzata dagli altri partecipanti per verificare la correttezza delle quote di firma di Pᵢ nella fase di firma, mentre la chiave di verifica vk viene utilizzata dalle parti esterne per verificare le firme emesse dal gruppo.

**Firma a soglia**

Questa fase si basa su tecniche note che impiegano la condivisione segreta additiva e la conversione delle quote per generare in modo non interattivo il nonce per ciascuna firma. Questa fase sfrutta anche tecniche di binding per evitare noti attacchi di contraffazione senza limitare la concorrenza.

Pre-elaborazione: nella fase di pre-elaborazione, ciascun partecipante prepara un numero fisso di coppie di punti di Curva Ellittica (EC) per utilizzi successivi; questa fase viene eseguita una sola volta per più fasi di firma a soglia.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Round di firma 1: ciascun partecipante Pᵢ inizia generando una singola coppia di nonce privati (dᵢ, eᵢ) e la corrispondente coppia di punti EC (Dᵢ, Eᵢ) e trasmette questa coppia di punti a tutti gli altri partecipanti. Ciascun partecipante memorizza queste coppie di punti EC ricevute per un uso successivo. I round di firma 2 e 3 sono le operazioni effettive in cui t partecipanti su n cooperano per creare una firma di Schnorr valida.

Round di firma 2: per creare una firma di Schnorr valida, qualsiasi t partecipanti lavorano insieme per eseguire questo round. La tecnica fondamentale alla base di questo round è la condivisione segreta additiva t-su-t.

Questo passaggio previene gli attacchi di contraffazione perché gli attaccanti non possono combinare quote di firma tra operazioni di firma distinte, né permutare l'insieme dei firmatari o i punti pubblicati per ciascun firmatario.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Dopo aver calcolato la sfida c, ciascun partecipante è in grado di calcolare la risposta zᵢ alla sfida utilizzando i nonce monouso e le quote di chiave segreta a lungo termine, che sono quote segrete di Shamir t-su-n (di grado t-1) della chiave a lungo termine del gruppo. Al termine del round di firma 2, ciascun partecipante trasmette zᵢ agli altri partecipanti.

[Leggi il paper completo](https://eprint.iacr.org/2020/852.pdf)


## Porta benefici a Zcash?

Assolutamente sì. L'introduzione di FROST in Zcash consentirà a più parti, geograficamente separate, di controllare l'autorizzazione alla spesa di ZEC Shielded. Un vantaggio è che le transazioni trasmesse utilizzando questo schema di firma saranno indistinguibili dalle altre transazioni sulla rete, mantenendo una forte resistenza al tracciamento dei pagamenti e limitando la quantità di dati blockchain disponibili per l'analisi.

In pratica, ciò consente di costruire sulla rete un'ampia gamma di nuove applicazioni, dai fornitori di servizi di deposito a garanzia ad altri servizi non custodiali.

FROST diventerà inoltre una componente essenziale nell'emissione sicura e nella gestione degli Zcash Shielded Assets (ZSA), consentendo una gestione più sicura dell'autorizzazione alla spesa all'interno delle organizzazioni di sviluppo e dei custodi di ZEC come gli exchange, distribuendo ulteriormente la fiducia e offrendo questa capacità anche agli utenti Zcash.


## FROST nell'ecosistema più ampio

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Al fine di migliorare l'efficienza dei propri sistemi di firma a soglia, Coinbase ha sviluppato una versione di FROST. L'implementazione di Coinbase apporta lievi modifiche alla bozza originale di FROST.

Hanno scelto di non utilizzare il ruolo di aggregatore delle firme. Invece, ogni partecipante è un aggregatore di firme. Questo design è più sicuro: tutti i partecipanti al protocollo verificano ciò che gli altri hanno calcolato per raggiungere un livello di sicurezza più elevato e ridurre il rischio. La fase di pre-elaborazione (una tantum) è stata inoltre rimossa per velocizzare l'implementazione, introducendo un terzo round di firma.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) di Blockstream** 

Un miglioramento specifico per applicazione di FROST proposto per l'uso sulla [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) per Bitcoin.

"ROAST è un semplice wrapper attorno a schemi di firma a soglia come FROST. Garantisce che un quorum di firmatari onesti, ad esempio i funzionari Liquid, possa ottenere sempre una firma valida anche in presenza di firmatari che si comportano in modo scorretto, quando le connessioni di rete presentano una latenza arbitrariamente elevata."

___

**FROST nell'IETF**

L'Internet Engineering Task Force, fondata nel 1986, è la principale organizzazione per lo sviluppo di standard per Internet. L'IETF produce standard volontari che vengono spesso adottati dagli utenti di Internet, dagli operatori di rete e dai produttori di apparecchiature, contribuendo così a orientare la traiettoria dello sviluppo di Internet.

La versione 11 di FROST (variante a due round) è stata [sottoposta all'IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/).

Si tratta di un passo importante per la valutazione completa di FROST come nuovo standard per le firme a soglia, destinato all'uso su Internet, nei dispositivi hardware e in altri servizi negli anni a venire.
___


Approfondimenti:

[Articolo Coinbase - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Spiegazione ed esempio](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Breve video sulle firme digitali di Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
