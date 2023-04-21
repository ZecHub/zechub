# Halo


## Cos'è Halo?

Halo è una prova ricorsiva a conoscenza zero (ZKP) senza fiducia scoperta da Sean Bowe presso Electric Coin Co. Elimina la configurazione di fiducia (Trusted setup) e consente una maggiore scalabilità della blockchain di Zcash. Halo è stato il primo sistema di dimostrazione a conoscenza zero efficiente e ricorsivo, ampiamente considerato una svolta scientifica.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componenti**

Succinct Polynomial Commitment Scheme: consente a un committente di impegnarsi in un polinomio con una breve stringa che può essere utilizzata da un verificatore (verifier) per confermare le valutazioni reclamate del polinomio impegnato.

Polynomial Interactive Oracle Proof: Il verifier chiede al prover (algoritmo) di aprire tutti i commitments in vari punti a loro scelta utilizzando lo schema di commitment polinomiale e verifica che l'identità sia vera tra di essi.


### Nessuna configurazione di fiducia

Gli zkSNARK si basano su una stringa di riferimento comune (CRS) come parametro pubblico per la dimostrazione e la verifica. Questa CRS deve essere generata in anticipo da una parte fidata. Fino a poco tempo fa, elaborare calcoli multi-party sicuri (MPC) come quelli eseguiti da Aztec network & Zcash erano necessari per mitigare il rischio durante questa [cerimonia di configurazione di fiducia](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) (trusted setup ceremony). 

In precedenza, i pool schermati Sprout e Sapling di Zcash utilizzavano i sistemi di prova zk BCTV14 e Groth 16. Sebbene fossero sicuri, avevano limitazioni. Non erano scalabili poiché erano legati a una singola applicazione, il "rifiuto tossico" (resti di materiale crittografico generato durante la cerimonia di genesi) poteva persistere, e c'era un elemento di fiducia (seppur minimo) che gli utenti dovevano avere per considerare accettabile la cerimonia.

Comprimendo ripetutamente più istanze di problemi complessi insieme durante cicli di curve ellittiche in modo che le dimostrazioni computazionali possano essere utilizzate per ragionare efficacemente su di esse (ammortizzazione nidificata), la necessità di una configurazione di fiducia viene eliminata. Ciò significa anche che la stringa di riferimento strutturata (output dalla cerimonia) è aggiornabile, consentendo applicazioni come i contratti intelligenti.

Halo consente a un utente sia di dimostrare che nessuno coinvolto nell'istituzione iniziale del sistema di prova a conoscenza zero su larga scala ha creato una backdoor segreta con cui eseguire transazioni fraudolente e che lo stato sicuro è esistito nel corso di aggiornamenti e modifiche al sistema.

[Sean Bowes spiegazione su Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Dimostrazioni ricorsive

La composizione delle dimostrazioni ricorsive consente a una singola dimostrazione di attestare la correttezza di praticamente un numero illimitato di altre dimostrazioni, consentendo di comprimere una grande quantità di calcolo (e informazioni). Questo è un componente essenziale per la scalabilità, non ultimo perché ci consente di scalare in modo orizzontale la rete, consentendo comunque a gruppi di partecipanti di fidarsi dell'integrità del resto della rete.

Prima di Halo, la composizione di dimostrazioni ricorsive richiedeva un grande costo computazionale e un setup di fiducia. Una delle principali scoperte è stata una tecnica chiamata "amortizzazione nidificata". Questa tecnica consente la composizione ricorsiva utilizzando lo schema di impegno polinomiale (polynomial commitment scheme) basato su un argomento di prodotto interno, migliorando notevolmente le prestazioni ed evitando il setup di fiducia.

Nel [paper di Halo](https://eprint.iacr.org/2019/1021.pdf), abbiamo descritto completamente questo schema di impegno polinomiale e scoperto che esisteva una nuova tecnica di aggregazione al suo interno. La tecnica consente di verificare un gran numero di dimostrazioni create indipendentemente quasi alla stessa velocità di una singola dimostrazione. Questo da solo offrirebbe un'alternativa migliore alle precedenti zk-SNARK utilizzate in Zcash.


### Halo 2

Halo 2 è una implementazione ad alte prestazioni di zk-SNARK scritta in Rust che elimina la necessità di un setup di fiducia, ponendo le basi per la scalabilità in Zcash.

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

Include una generalizzazione del nostro approccio chiamata "schema di accumulazione". Questa nuova formalizzazione mostra come funziona effettivamente la nostra tecnica di ammortizzazione nidificata; aggiungendo dimostrazioni a un oggetto chiamato "accumulatore", dove le prove riguardano lo stato precedente dell'accumulatore, possiamo verificare che tutte le prove precedenti fossero corrette (per induzione) semplicemente controllando lo stato corrente dell'accumulatore.

![Accumulatorimage](https://i.imgur.com/l4HrYgE.png "accumulator")

In parallelo, molti altri team stavano scoprendo nuovi IOP polinomiali che erano più efficienti di Sonic (usato in Halo 1), come Marlin. 

Il più efficiente di questi nuovi protocolli è PLONK, che garantisce un'enorme flessibilità nella progettazione di implementazioni efficienti basate sulle esigenze specifiche dell'applicazione e fornisce un tempo di prova 5 volte migliore rispetto a Sonic.

[Panoramica di PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Quali sono i vantaggi per Zcash?

L'Orchard Shielded pool attivato con NU5 è l'implementazione di questo nuovo sistema di prova sulla rete Zcash. Protetto dallo stesso design a turnstile usato tra Sprout e Sapling con l'intento di ritirare gradualmente i vecchi pool schermati. Ciò incoraggia la migrazione verso un sistema di prova completamente trustless, rafforzando la fiducia nella solidità della base monetaria e riducendo la complessità di implementazione e la superficie di attacco di Zcash nel complesso. Dopo l'attivazione di NU5 a metà del 2022, è diventata possibile l'integrazione di prove ricorsive (anche se non è ancora completa). Sono stati fatti anche diversi miglioramenti per la privacy in modo tangenziale. L'introduzione di "azioni" per sostituire input/outputs ha contribuito a ridurre la quantità di metadati delle transazioni.

I trusted setup sono generalmente difficili da coordinare e rappresentano un rischio sistemico. Sarebbe necessario ripeterli per ogni aggiornamento importante del protocollo. La loro rimozione rappresenta un miglioramento sostanziale per l'implementazione sicura di nuovi aggiornamenti del protocollo. 

La composizione di prove ricorsive offre il potenziale per comprimere quantità illimitate di calcolo, creando sistemi distribuiti auditabili, rendendo Zcash altamente capace, in particolare con il passaggio a Proof of Stake. Questo è anche utile per estensioni come Zcash Shielded Assets e per migliorare la capacità del Layer 1 nel futuro, quando l'utilizzo dei nodi completi raggiungerà livelli più elevati nei prossimi anni in Zcash.


## Halo in un ecosistema più ampio

L'Electric Coin Company ha stipulato un accordo con Protocol Labs, la Filecoin Foundation e l'Ethereum Foundation per esplorare la ricerca e lo sviluppo di Halo, incluso come la tecnologia potrebbe essere utilizzata nelle rispettive reti. L'accordo mira a fornire una migliore scalabilità, interoperabilità e privacy tra gli ecosistemi e per il Web 3.0.

Inoltre, Halo 2 è sotto le [licenze open source MIT e Apache 2.0](https://github.com/zcash/halo2#readme), il che significa che chiunque nell'ecosistema può costruire con il sistema di prova.

### Filecoin

Da quando è stato rilasciato, la libreria halo2 è stata adottata in progetti come il zkEVM, c'è la potenziale integrazione di Halo 2 nel sistema di prova per la Virtual Machine di Filecoin. Filecoin richiede numerosi costosi prove di spazio/tempo e prove di replica. Halo2 sarà fondamentale nella compressione dell'utilizzo dello spazio, migliorando la scalabilità della rete.

[Video della Filecoin Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Inoltre, sarebbe altamente vantaggioso per entrambi gli ecosistemi di Filecoin e Zcash se i pagamenti per lo storage di Filecoin potessero essere effettuati in ZEC, offrendo lo stesso livello di privacy per gli acquisti di storage che esiste nei trasferimenti schermati di Zcash. Questo supporto aggiungerebbe la capacità di crittografare i file nello storage di Filecoin e aggiungerebbe il supporto ai client mobili in modo che potrebbero "allegare" media o file a un memo crittografato di Zcash.

[ECC x Filecoin Blog Post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementazione di una prova Halo 2 per l'efficiente Verifiable Delay Function (VDF) in fase di sviluppo. Un VDF è una primitiva crittografica che ha molteplici potenziali casi d'uso.

Può essere utilizzato come fonte di casualità a uso generale, compreso l'uso in applicazioni di smart contract, nonché l'elezione del leader in Proof of Stake su Ethereum e su altri protocolli.

L'ECC, la Filecoin Foundation, Protocol Labs e la Ethereum Foundation lavoreranno anche con [SupraNational](https://www.supranational.net/), un fornitore specializzato in crittografia accelerata dall'hardware, per la potenziale progettazione di GPU e ASIC e lo sviluppo del VDF.

Il [Privacy and Scaling Exploration group](https://appliedzkp.org/) sta anche cercando diverse modalità in cui le prove di Halo 2 possono migliorare la privacy e la scalabilità per l'ecosistema di Ethereum. Questo gruppo dipende dalla Ethereum Fundation e ha un ampio focus sulle prove a conoscenza zero e sulle primitive crittografiche.

## Altri progetti che utilizzano Halo

+ [Anoma, un protocollo di atomic swap multichain con preservazione della privacy](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un L2 zkRollup su Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, una blockchain privata L1 zkEVM](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un L2 zkRollup su Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Per ulteriori informazioni**:

[Introduzione a zkp e halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 con Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Spiegazione tecnica del blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentazione**

[Risorse di Halo 2](https://github.com/adria0/awesome-halo2)

[Documentazione di Halo 2](https://zcash.github.io/halo2/)

[Halo 2 su github](https://github.com/zcash/halo2)
