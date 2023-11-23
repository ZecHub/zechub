# ZKP e ZK-SNARKS

## Cosa è una prova?

Le prove sono la base di tutta la matematica. Una prova è una dichiarazione o un teorema che si sta cercando di dimostrare e una sequenza di deduzioni fatte per dichiarare che il teorema è stato dimostrato. Ad esempio, che la somma degli angoli di un triangolo è 180° può essere verificata indipendentemente da chiunque (verifier).

**Prove** 

Prover (o dimostratore) ---> Fa una dichiarazione ---> Verifier (o verificatore) sceglie ---> Accetta/Rifiuta 

(Sia il prover che il verifier sono algoritmi)

In informatica il termine per dimostrazioni verificabili in modo efficiente è NP proofs. Queste brevi dimostrazioni possono essere verificate in tempo polinomiale. L'idea generale è "Esiste una soluzione per un teorema e viene passata al verifier per verificarla"

![NP proofs](https://cdn.discordapp.com/attachments/860525418008674327/1070395089559494716/NPlanguage.jpg  "Linguaggio NP")


In un linguaggio NP = devono valere due condizioni: 

Completezza: le affermazioni vere saranno accettate dal verifier (consente ai dimostratori onesti di raggiungere la verifica)

Solidità: le false affermazioni non avranno prove (per tutte le strategie di prova di imbroglio non saranno in grado di dimostrare la correttezza dell'affermazione errata).


### Prove interattive e probabalistiche

**Interazione**: invece di limitarsi a leggere la dimostrazione, il verifier interagisce con un prover avanti e indietro per diversi cicli di messaggi.

**Casualità**: le richieste del verifier di provare sono randomizzate e il prover deve essere in grado di rispondere correttamente a ciascuna.  

![IP proofs](https://cdn.discordapp.com/attachments/860525418008674327/1070395089194594345/IPmodel.jpg  "IP protocol")

Usando l'interazione e la casualità insieme è possibile dimostrare una rivendicazione a un verifier cieco in tempo polinomiale probabilistico (PPT). 

Le prove interattive possono verificare in modo più efficiente delle prove NP?

Prove NP vs prove IP:

|  Statement   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  yes      |  yes   |
|    CO-NP     |  no       |  yes   |
|    #P        |  no       |  yes   |
|    PSPACE    |  no       |  yes   |


NP - Esiste una soluzione per un'affermazione

CO-NP - Dimostrare che non ci sono soluzioni a un'affermazione

#P - Contare quante soluzioni esistono per un'affermazione

PSPACE - Dimostrazione di un'alternanza di affermazioni diverse

### Cos'è Zero Knowledge?

Ciò che un verifier può calcolare dopo un'interazione è identico a ciò che avrebbe potuto dimostrare precedentemente. L'interazione su più round tra il prover e il verifier non ha aumentato la potenza di calcolo del verifier.

**Il paradigma della simulazione**

Questo esperimento esiste in tutta la crittografia. Presenta una "Vista reale" e una "Vista simulata". 

Vista reale: tutte le possibili storie di interazioni tra Prover e Verifier (P,V)

Vista simulata: il verifier simula tutte le possibili interazioni tra Prover e Verifier 

![simulation paradigm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090259947520/simulation.jpg  "Simulation Paradigm")

Un distinguo polinomiale-temporale tenta di determinare se stanno guardando la vista reale o simulata e richiede ripetutamente un campione da entrambi.

Le due viste sono dette "computazionalmente indistinguibili" se per tutti gli algoritmi/strategie distintive, anche dopo aver ricevuto un numero polinomiale di campioni reali o simulati, la probabilità è >1/2. 

**Argomenti a conoscenza zero**

Un protocollo interattivo (P,V) è a conoscenza zero se esiste un simulatore (algoritmo) tale che per ogni verifier probabilistico polinomiale (quando il teorema è corretto), le distribuzioni di probabilità che determinano la vista reale da quella simulata sono computazionalmente indistinguibili.

I protocolli interattivi sono utili quando c'è un solo verifier. Un esempio potrebbe essere un revisore fiscale in un'applicazione di "prova delle imposte" a conoscenza zero.

## Cos'è un SNARK?

**|EN| Succinct Non-Interactive Argument of Knowledge - |IT! Argomento succinto non interattivo della conoscenza**

Definizione generale: Una prova succinta che una dichiarazione è vera. La prova deve essere breve e veloce da verificare. In un SNARK viene inviato un singolo messaggio dal Prover al Verifier. Il verifier può quindi scegliere di accettare o rifiutare.

Esempio di dichiarazione: "Conosco un messaggio (m) tale che SHA256(m)=0"

In un zk-SNARK la prova non rivela nulla sul messaggio (m).

**Polinomi**: Somme di termini contenenti una costante (come 1,2,3), variabili (come x,y,z) ed esponenti di variabili (come x², y³). 

Esempio: "3x² + 8x + 17"

**Circuito Aritmetico**: Un modello per il calcolo di polinomi. Più generalmente, può essere definito come un grafo aciclico diretto sul quale ad ogni nodo del grafo grafo viene eseguita un'operazione aritmetica. Il circuito è costituito da porte di addizione, porte di moltiplicazione e alcune porte costanti. Allo stesso modo in cui i circuiti booleani trasportano bit in fili, i circuiti aritmetici trasportano interi.

![circuit](https://cdn.discordapp.com/attachments/860525418008674327/1070405388048011305/circuit.jpg  "DAG")

In questo esempio, il Prover vuole convincere il Verifier che conosce una soluzione per il circuito aritmetico.

**Commitments**: Per fare ciò, il Prover metterà tutti i valori (privati e pubblici) associati al circuito in un commitment. I commitments nascondono i loro input utilizzando una funzione il cui output è irreversibile.

Sha256 è un esempio di una funzione di hash che può essere utilizzata in uno schema di commitment (commitment scheme).

Dopo che il Prover ha eseguito il commit dei valori, i commitments vengono inviati al verifier (essendo sicuro di non essere in grado di scoprire nessuno dei valori originali). Il prover è quindi in grado di dimostrare al verifier di conoscere ogni valore sui nodi del grafo.

**Trasformazione Fiat-Shamir**

Per rendere il protocollo *non-interattivo* il prover genera casualità (utilizzata per la sfida nascosta) per conto del verifier utilizzando una funzione hash crittografica. Questo è noto come l'oracolo casuale. Il prover può quindi inviare un singolo messaggio al verifier che può quindi verificarne la correttezza.

Per formare un SNARK che possa essere utilizzato per circuiti generali sono necessari due elementi:

Functional Commitment Scheme: Consente a un committer di eseguire il commit su un polinomio con una stringa breve che può essere utilizzata da un verifier per confermare le valutazioni dichiarate del polinomio commesso.

Polynomial Interactive Oracle: Il verifier chiede al prover (algoritmo) di aprire tutti i commitments in vari punti a loro scelta utilizzando lo schema di commitment polinomiale e verifica che l'identità sia vera tra di essi.

**Configurazione**

Le procedure di configurazione aiutano il verifier a riassumere un circuito e produrre parametri pubblici.

![Setup](https://cdn.discordapp.com/attachments/860525418008674327/1070395089899229245/setup.jpg  "Setup")

**Tipi di configurazione di preelaborazione**:

Configurazione fidata per circuito -  Viene eseguita una volta per circuito. È specifica per un circuito e la casualità segreta (Stringa di Riferimento Comune) deve essere mantenuta segreta + distrutta.

Una configurazione compromessa in questo metodo significa che un prover disonesto può dimostrare affermazioni false.

Configurazione fidata ma universale - Deve essere eseguita solo una volta l'installazione fidata ed è in grado di preelaborare in modo deterministico più circuiti.

Configurazione trasparente (nessuna configurazione fidata)- L'algoritmo di preelaborazione non utilizza alcuna casualità segreta.


**Tipi di costruzioni a prova di SNARK**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): richiede una configurazione attendibile ma ha prove molto brevi che possono essere verificate rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Configurazione fidata universale.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Nessuna configurazione fidata ma producono dimostrazioni leggermente più lunghe o possono richiedere più tempo per essere eseguiti dal prover.

Gli SNARK sono utili quando sono necessari più verifier come in una blockchain come Zcash o in un zk-Rollup come Aztec in modo che i nodi di convalida multipli non debbano interagire su più round con ogni dimostrazione.

## Come vengono implementati gli zk-SNARK in Zcash?

In generale, le prove a conoscenza zero sono uno strumento per garantire un comportamento onesto nei protocolli senza rivelare alcuna informazione. Zcash è una blockchain pubblica che facilita transazioni private. Le zk-SNARK vengono utilizzate per dimostrare che una transazione privata è valida secondo le regole di consenso della rete senza rivelare altri dettagli sulla transazione.

[Video esplicativo [EN]](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In questa lezione, Ariel Gabizon fornisce descrizioni del Zcash Note Commitment Tree, della Blind Polynomial Evaluation e delle Homomorphically Hidden Challenges e come sono implementati nella rete.

Per ulteriori informazioni, leggere il manuale di [Halo2](https://zcash.github.io/halo2/index.html).

## Altre applicazioni Zero-Knowledge

Le zk-SNARK offrono diversi vantaggi in una varietà di applicazioni diverse. Vediamo alcuni esempi.

**Scalabilità**: questo è ottenuto mediante l' "Outsourcing Computation" (esternalizzazione del calcolo). Non c'è alcuna necessità rigorosa di privacy per una catena L1 per verificare il lavoro di un servizio off-chain. Le transazioni non sono necessariamente private su una zk-EVM.

Il vantaggio di un servizio Rollup basato su proof (zk-Rollup) consiste nel processare un batch di centinaia o migliaia di transazioni, e L1 è in grado di verificare una prova succinta che tutte le transazioni sono state elaborate correttamente, aumentando la scalabilità della rete di fattore 100 o 1000 rispetto a quella senza zk-Rollup.

![zkvm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090612265000/zkvm.jpg  "ZKVM")

**Interoperabilità**: Questa è ottenuta su uno zk-Bridge 'bloccando' gli asset su una catena di origine e dimostrando alla catena di destinazione che gli asset sono stati bloccati (proof of consensus).

**Conformità**: Progetti come [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sono in grado di dimostrare che una transazione privata è conforme alle leggi bancarie locali senza rivelare i dettagli della transazione.

**Lotta alla disinformazione**: Tra diversi esempi al di fuori della blockchain e criptovalute, vi è l'uso della generazione di prove su immagini che sono state elaborate dai media per consentire agli utenti di verificare indipendentemente la fonte di un'immagine e tutte le operazioni eseguite su di essa. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Ulteriori apprendimenti:

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's con Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARKs senza Trusted Setups - Sean Bowe su Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs con Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Articolo di Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lecture 1: Introduzione e storia di ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Spiegazione semplice dei circuiti aritmetici - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La scalabilità è noiosa, la privacy è morta: ZK-Proofs, per cosa sono utili?](https://www.youtube.com/watch?v=AX7eAzfSB6w)