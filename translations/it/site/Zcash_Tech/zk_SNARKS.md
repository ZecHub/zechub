<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP e ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- Consentono a una parte di **dimostrare di conoscere qualcosa** senza rivelare l'informazione stessa
- Zcash usa zk-SNARKs per dimostrare che una transazione è valida (importi corretti, input non spesi) **senza rivelare mittente, destinatario o importo**
- "Succinct" significa che la prova è minuscola e veloce da verificare, anche per affermazioni complesse
- La pool Orchard usa Halo 2, un sistema zk-SNARK **senza bisogno di un trusted setup**

---

## Cos'è una prova?

Le prove sono la base di tutta la matematica. Una prova è un'affermazione o un teorema che si sta cercando di dimostrare e una sequenza di derivazioni effettuate per dichiarare che il teorema è stato dimostrato. Es.: che tutti gli angoli di un triangolo totalizzino 180° è qualcosa che chiunque (il verificatore) può verificare in autonomia.

**Prove** 

Dimostratore ---> Formula un'affermazione ---> Il verificatore sceglie ---> Accetta/Rifiuta 

(Sia il dimostratore che il verificatore sono algoritmi)

In informatica il termine per le prove verificabili in modo efficiente è quello di prove NP. Queste brevi prove possono essere verificate in tempo polinomiale. L'idea di fondo è: "esiste una soluzione a un teorema e questa viene passata al verificatore perché la controlli"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


In un linguaggio NP = devono valere due condizioni: 

Completezza: le affermazioni vere verranno accettate dal verificatore (consente ai dimostratori onesti di arrivare alla verifica)

Solidità: le affermazioni false non avranno prove (per qualunque strategia di dimostratore disonesto sarà impossibile dimostrare la correttezza di un'affermazione errata).


### Prove interattive e probabilistiche

**Interazione**: invece di limitarsi a leggere la prova, il verificatore interagisce con il dimostratore avanti e indietro per diversi round di messaggi.

**Casualità**: le richieste del verificatore al dimostratore sono randomizzate e il dimostratore deve poter rispondere correttamente a ciascuna. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Usando insieme interazione e casualità è possibile dimostrare un'affermazione a un verificatore cieco in tempo polinomiale probabilistico (PPT). 

Le prove interattive possono verificare in modo efficiente più delle prove NP?

Prove NP vs prove IP:

|  Affermazione   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  sì      |  sì   |
|    CO-NP     |  no       |  sì   |
|    #P        |  no       |  sì   |
|    PSPACE    |  no       |  sì   |


NP - Esiste una soluzione a un'affermazione

CO-NP - Dimostrare che non esistono soluzioni a un'affermazione

#P - Contare quante soluzioni esistono per un'affermazione

PSPACE  - Dimostrare un'alternanza di affermazioni diverse

### Cos'è la conoscenza zero?

Ciò che un verificatore può calcolare dopo un'interazione è identico a ciò che poteva dimostrare in precedenza. L'interazione su più round tra dimostratore e verificatore non ha aumentato la potenza di calcolo del verificatore.

**La simulazione Paradigm**

Questo esperimento ricorre in tutta la crittografia. Presenta una "Vista reale" e una "Vista simulata". 

Vista reale: tutte le possibili storie di interazioni tra Dimostratore e Verificatore (P,V)

Vista simulata: il verificatore simula tutte le possibili interazioni tra Dimostratore e Verificatore 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Un discriminatore in tempo polinomiale tenta di determinare se sta osservando la vista reale o quella simulata e richiede ripetutamente un campione da entrambe.

Le due viste si dicono "computazionalmente indistinguibili" se, per tutti gli algoritmi/le strategie di discriminazione, anche dopo aver ricevuto un numero polinomiale di campioni dalla vista reale o simulata, la probabilità è >1/2. 

**Argomenti di conoscenza a conoscenza zero**

Un protocollo interattivo (P,V) è a conoscenza zero se esiste un simulatore (algoritmo) tale che, per ogni verificatore probabilistico in tempo polinomiale (quando il teorema è corretto), le distribuzioni di probabilità che distinguono la vista reale dalla simulata sono computazionalmente indistinguibili. 

I protocolli interattivi sono utili quando c'è un unico verificatore. Un esempio sarebbe un revisore fiscale in un'applicazione a conoscenza zero di "prova delle tasse".

## Cos'è uno SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Definizione ampia - Una prova succinta del fatto che un'affermazione è vera. La prova deve essere breve e veloce da verificare. Negli SNARK un solo messaggio viene inviato dal dimostratore al verificatore. Il verificatore può quindi scegliere di accettare o rifiutare. 

Affermazione di esempio: "Conosco un messaggio (m) tale che SHA256(m)=0"

In uno zk-SNARK la prova non rivela nulla sul messaggio (m).

**Polinomi**: somme di termini contenenti una costante (come 1,2,3), variabili (come x,y,z) ed esponenti delle variabili (come x², y³). 

Esempio: "3x² + 8x + 17"

**Circuito aritmetico**: un modello per il calcolo di polinomi. Più in generale può essere definito come un grafo aciclico orientato su cui, in ogni nodo del grafo, viene eseguita un'operazione aritmetica. Il circuito è costituito da porte di addizione, porte di moltiplicazione e alcune porte costanti. Così come i circuiti booleani trasportano bit lungo i fili, i circuiti aritmetici trasportano numeri interi.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

In questo esempio, il dimostratore vuole convincere il verificatore di conoscere una soluzione del circuito aritmetico.  

**Commitment**: per farlo, il dimostratore inserirà tutti i valori (privati e pubblici) associati al circuito in un commitment. I commitment nascondono i loro input usando una funzione il cui output è irreversibile.

Sha256 è un esempio di funzione di hash utilizzabile in uno schema di commitment.

Dopo che il dimostratore ha effettuato il commitment sui valori, i commitment vengono inviati al verificatore (confidando che non sia in grado di risalire ad alcuno dei valori originali). Il dimostratore può quindi mostrare al verificatore la conoscenza di ciascuno dei valori sui nodi del grafo. 

**Trasformazione di Fiat-Shamir**

Per rendere il protocollo *non interattivo*, il dimostratore genera la casualità (usata per la sfida nascosta) per conto del verificatore usando una funzione di hash crittografica. Questo è noto come oracolo random. Il dimostratore può quindi inviare un singolo messaggio al verificatore, che può a sua volta controllare che sia corretto. 

Per formare uno SNARK utilizzabile per circuiti generali sono richiesti due elementi:

Schema di commitment funzionale: consente a chi effettua il commitment di impegnarsi su un polinomio con una stringa breve che un verificatore può usare per confermare le valutazioni dichiarate del polinomio oggetto di commitment.

Oracolo polinomiale interattivo: il verificatore chiede al dimostratore (algoritmo) di aprire tutti i commitment in vari punti a sua scelta usando uno schema di commitment polinomiale e controlla che tra loro valga l'identità.

**Setup**

Le procedure di setup aiutano il verificatore riassumendo un circuito e producendo in output i parametri pubblici. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Tipi di setup di pre-elaborazione**:

Trusted setup per circuito - Viene eseguito separatamente per ogni circuito. La common reference string (CRS) risultante contiene i parametri pubblici usati dai dimostratori e dai verificatori. È il materiale di setup intermedio segreto ("toxic waste"), e non la CRS, che deve restare segreto e venire distrutto. La [spiegazione dei parametri pubblici](https://zodl.com/snark-parameters/) di ECC distingue i due.

Se il materiale di setup segreto richiesto viene conservato o recuperato, un dimostratore disonesto potrebbe essere in grado di produrre prove di affermazioni false. In una cerimonia MPC, la sicurezza può dipendere dal fatto che almeno un partecipante segua il protocollo e distrugga il proprio contributo segreto.

Trusted setup universale - Un singolo trusted setup produce parametri che possono essere usati per derivare chiavi di proving e di verifica per più circuiti entro i limiti di dimensione supportati. Anche questo richiede l'assunzione che il segreto venga distrutto; universale non significa trasparente.

Setup trasparente (senza trusted setup) - I parametri pubblici possono essere generati senza una trapdoor di setup segreta che richiede di fidarsi di qualcuno perché la distrugga. Questo non significa che il proving non usi casualità o che il sistema non abbia parametri pubblici. Il [libro di Halo 2](https://zcash.github.io/halo2/background/pc-ipa.html#setup) dà un esempio di parametri di gruppo pubblici.


**Tipi di costruzioni di prove SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): richiede un trusted setup ma ha prove molto brevi che possono essere verificate rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): trusted setup universale.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): nessun trusted setup, ma producono prove leggermente più lunghe o il dimostratore potrebbe impiegare più tempo a eseguirle. 

Gli SNARK sono utili quando servono più verificatori, come nel caso di una blockchain come Zcash o di uno zk-Rollup come [Aztec](https://docs.aztec.network), così che più nodi di validazione non debbano interagire per più round per ogni prova. 

## Come vengono implementati gli zk-SNARK in Zcash?

In generale, le prove a conoscenza zero sono uno strumento per imporre un comportamento onesto nei protocolli senza rivelare alcuna informazione. 

Zcash è una blockchain pubblica che facilita le transazioni private. Gli zk-SNARK vengono usati per dimostrare che una transazione privata è valida entro le regole di consenso della rete, senza rivelare altri dettagli sulla transazione. 

[Video esplicativo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In questa lezione Ariel Gabizon fornisce descrizioni dell'albero di commitment delle note di Zcash, della valutazione polinomiale cieca e delle sfide nascoste omomorficamente e di come queste vengono implementate sulla rete. 

Leggi il [libro di Halo2](https://zcash.github.io/halo2/index.html) per maggiori informazioni.

## Altre applicazioni della conoscenza zero 

zk-SNARKs offrono diversi vantaggi in una varietà di applicazioni diverse. Diamo un'occhiata ad alcuni esempi.

**Scalabilità**: si ottiene tramite "Outsourcing del calcolo". Non c'è un bisogno rigoroso di conoscenza zero affinché una chain L1 verifichi il lavoro di un servizio off-chain. Le transazioni non sono necessariamente private su uno zk-EVM.

Il vantaggio di un servizio Rollup basato sulle prove (zk-Rollup) è quello di elaborare un batch di centinaia/migliaia di transazioni, e la L1 è in grado di verificare una prova succinta del fatto che tutte le transazioni sono state elaborate correttamente, scalando il throughput di transazioni della rete di un fattore 100 o 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interoperabilità**: si ottiene su uno zk-Bridge "bloccando" gli asset su una chain di origine e dimostrando alla chain di destinazione che gli asset sono stati bloccati (prova di consenso).

**Conformità**: progetti come [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sono in grado di dimostrare che una transazione privata è conforme alle leggi bancarie locali senza rivelare i dettagli della transazione. 

**Contrastare la disinformazione**: tra i vari esempi al di fuori della blockchain e delle criptovalute, c'è l'uso della generazione di prove su immagini che sono state elaborate da testate e organi di informazione, per consentire a chi guarda di verificare in autonomia la fonte di un'immagine e tutte le operazioni eseguite su di essa. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Per approfondire: 

[Bibliografia sulla conoscenza zero - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK con Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARK senza trusted setup - Sean Bowe su Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Prove a conoscenza zero con Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Prove interattive a conoscenza zero - articolo di Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lezione 1: introduzione e storia delle ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Spiegazione semplice dei circuiti aritmetici - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La scalabilità è noiosa, la privacy è morta: ZK-proof, a cosa servono?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Pagine correlate

- [Pool schermate](/using-zcash/shielded-pools) — Come vengono usati gli zk-SNARKs nelle value pool di Zcash
- [Halo](/zcash-tech/halo) — Il sistema zk-SNARK di Zcash che elimina i trusted setup
- [Sicurezza post-quantum in Zcash](/zcash-tech/post-quantum-security) - Come i futuri rischi quantistici si collegano alla crittografia di Zcash
- [Asset schermati di Zcash](/zcash-tech/zcash-shielded-assets) — ZSA costruiti sulla tecnologia di zk-SNARK
- [Cos'è ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Introduzione a Zcash e al suo modello di privacy
- [Chi può vedere il tuo pagamento Zcash?](/start-here/who-can-see-your-zcash-payment) — Cosa resta pubblico e cosa nasconde la schermatura
