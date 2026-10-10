<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## In breve

- **zk-SNARKs** = Argomenti di Conoscenza Succinti Non Interattivi a Conoscenza Zero
- Consentono a una parte di **dimostrare di sapere qualcosa** senza rivelare l'informazione stessa
- Zcash utilizza zk-SNARKs per dimostrare che una transazione è valida (importi corretti, input non spesi) **senza rivelare mittente, destinatario o importo**
- "Succinto" significa che la prova è piccola e veloce da verificare anche per affermazioni complesse
- Il pool Orchard utilizza Halo 2, un sistema zk-SNARK con **nessuna configurazione fidata richiesta**

---

## Cos'è una prova?

Le prove sono alla base di tutta la matematica. Una prova è un'affermazione o un teorema che si cerca di dimostrare e una sequenza di derivazioni che dichiara che il teorema è stato dimostrato. Ad esempio, il fatto che tutti gli angoli di un triangolo sommino 180° può essere verificato indipendentemente da chiunque (verificatore).

**Prove** 

Dimostratore ---> Formula un'affermazione ---> Il verificatore sceglie ---> Accetta/Rifiuta 

(Sia il dimostratore sia il verificatore sono algoritmi)

In informatica il termine per le prove verificabili in modo efficiente è prove NP. Queste brevi prove possono essere verificate in tempo polinomiale. L'idea generale è: "Esiste una soluzione a un teorema e viene passata al verificatore affinché la controlli"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


In un linguaggio NP devono valere due condizioni: 

Completezza: Le affermazioni vere saranno accettate dal verificatore (consente ai dimostratori onesti di raggiungere la verifica)

Correttezza: Le affermazioni false non avranno prove (per ogni strategia di un dimostratore disonesto, non sarà possibile dimostrare la correttezza di un'affermazione errata).


### Prove interattive e probabilistiche

**Interazione**: Anziché limitarsi a leggere la prova, il verificatore interagisce ripetutamente con un dimostratore attraverso diversi scambi di messaggi.

**Casualità**: Le richieste del verificatore al dimostratore sono casuali e il dimostratore deve essere in grado di rispondere correttamente a ciascuna di esse. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Utilizzando insieme interazione e casualità, è possibile dimostrare un'affermazione a un verificatore ignaro in Tempo Polinomiale Probabilistico (PPT). 

Le Prove Interattive possono verificare in modo efficiente più delle prove NP?

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

PSPACE  - Dimostrare un'alternanza di diverse affermazioni

### Cos'è la conoscenza zero?

Ciò che un verificatore può calcolare dopo un'interazione è identico a ciò che potrebbe dimostrare prima. L'interazione su più round tra il dimostratore e il verificatore non ha aumentato la potenza computazionale del verificatore.

**La simulazione Paradigm**

Questo esperimento è presente in tutta la crittografia. Presenta una "Vista Reale" e una "Vista Simulata". 

Vista Reale: Tutte le possibili cronologie delle interazioni tra Dimostratore e Verificatore (P,V)

Vista Simulata: Il verificatore simula tutte le possibili interazioni tra Dimostratore e Verificatore 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Un distinguitore in tempo polinomiale tenta di determinare se sta osservando la vista reale o quella simulata e richiede ripetutamente un campione da entrambe.

Le due viste sono dette "computazionalmente indistinguibili" se, per tutti gli algoritmi/strategie di distinzione, anche dopo aver ricevuto un numero polinomiale di campioni dalla vista reale o simulata, la probabilità è >1/2. 

**Argomenti di Conoscenza Zero**

Un protocollo interattivo (P,V) è a conoscenza zero se esiste un simulatore (algoritmo) tale che, per ogni verificatore probabilistico in tempo polinomiale (quando il teorema è corretto), le distribuzioni di probabilità che determinano la vista reale da quella simulata sono computazionalmente indistinguibili. 

I Protocolli Interattivi sono utili quando esiste un singolo verificatore. Un esempio sarebbe un revisore fiscale in un'applicazione di "prova delle imposte" a conoscenza zero.

## Cos'è uno SNARK?

**Argomento di Conoscenza Succinto Non Interattivo**

Definizione generale - Una prova succinta che un'affermazione è vera. La prova deve essere breve e veloce da verificare. Negli SNARKS viene inviato un singolo messaggio dal Dimostratore al Verificatore. Il verificatore può quindi scegliere se accettare o rifiutare. 

Esempio di affermazione: "Conosco un messaggio (m) tale che SHA256(m)=0"

In un zk-SNARK la prova non rivela nulla sul messaggio (m).

**Polinomi**: Somme di termini contenenti una costante (come 1,2,3), variabili (come x,y,z) ed esponenti delle variabili (come x², y³). 

Esempio: "3x² + 8x + 17"

**Circuito Aritmetico**: Un modello per calcolare polinomi. Più in generale, può essere definito come un Grafo Aciclico Diretto in cui a ogni nodo del grafo viene eseguita un'operazione aritmetica. Il circuito è composto da porte di addizione, porte di moltiplicazione e alcune porte costanti. Allo stesso modo in cui i circuiti booleani trasportano bit nei fili, i circuiti aritmetici trasportano interi.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

In questo esempio, il dimostratore vuole convincere il verificatore di conoscere una soluzione al circuito aritmetico.  

**Impegni**: Per farlo, il dimostratore inserirà tutti i valori (privati e pubblici) associati al circuito in un impegno. Gli impegni nascondono i propri input utilizzando una funzione il cui output è irreversibile.

Sha256 è un esempio di funzione hash che può essere utilizzata in uno schema di impegno.

Dopo che il dimostratore si impegna sui valori, gli impegni vengono inviati al verificatore (con la certezza che non sia in grado di scoprire alcuno dei valori originali). Il dimostratore è quindi in grado di mostrare al verificatore la conoscenza di ciascuno dei valori nei nodi del grafo. 

**Trasformazione Fiat-Shamir**

Per rendere il protocollo *non interattivo*, il dimostratore genera casualità (utilizzata per la sfida nascosta) per conto del verificatore usando una funzione hash crittografica. Questo è noto come oracolo casuale. Il dimostratore può quindi inviare un singolo messaggio al verificatore, che può poi controllarne la correttezza. 

Per formare uno SNARK utilizzabile per circuiti generali sono richiesti due elementi:

Schema di impegno funzionale: Consente a chi effettua l'impegno di impegnarsi su un polinomio con una breve stringa che può essere utilizzata da un verificatore per confermare le valutazioni dichiarate del polinomio impegnato.

Oracolo interattivo polinomiale: Il verificatore chiede al dimostratore (algoritmo) di aprire tutti gli impegni in vari punti di sua scelta utilizzando lo schema di impegno polinomiale e verifica che l'identità tra essi sia vera.

**Configurazione**

Le procedure di configurazione aiutano il verificatore riassumendo un circuito e producendo parametri pubblici. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Tipi di configurazione con pre-elaborazione**:

Configurazione Fidata per circuito - Viene eseguita una volta per ciascun circuito. È specifica per un circuito e la casualità segreta (Common Reference String) deve essere mantenuta segreta e distrutta. 

Una configurazione compromessa con questo metodo significa che un dimostratore disonesto può dimostrare affermazioni false. 

Configurazione Fidata ma Universale - È necessario eseguire la configurazione fidata una sola volta e poi è possibile pre-elaborare deterministicamente più circuiti. 

Configurazione Trasparente (Nessuna Configurazione Fidata)- L'algoritmo di pre-elaborazione non utilizza alcuna casualità segreta. 


**Tipi di costruzioni di prove SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): Richiede una Configurazione Fidata ma ha prove molto brevi che possono essere verificate rapidamente.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://eprint.iacr.org/2019/953): Configurazione Fidata Universale.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Nessuna Configurazione Fidata, ma producono prove leggermente più lunghe o potrebbero richiedere più tempo al dimostratore per l'esecuzione. 

Gli SNARKS sono utili quando sono necessari più verificatori, come in una blockchain quale Zcash o in uno zk-Rollup come [Aztec](https://docs.aztec.network), affinché più nodi di convalida non debbano interagire per diversi round con ciascuna prova. 

## Come vengono implementati gli zk-SNARK in Zcash?

In generale, le prove a conoscenza zero sono uno strumento per imporre un comportamento onesto nei protocolli senza rivelare alcuna informazione. 

Zcash è una blockchain pubblica che facilita le transazioni private. Gli zk-SNARK vengono utilizzati per dimostrare che una transazione privata è valida nell'ambito delle regole di consenso della rete, senza rivelare altri dettagli sulla transazione. 

[Spiegazione video](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In questa lezione Ariel Gabizon descrive l'albero degli impegni delle Note di Zcash, la valutazione polinomiale cieca e le sfide nascoste omomorficamente, e come vengono implementati sulla rete. 

Leggi il [libro Halo2](https://zcash.github.io/halo2/index.html) per ulteriori informazioni.

## Altre applicazioni della conoscenza zero 

Gli zk-SNARKs offrono diversi vantaggi in una varietà di applicazioni. Diamo un'occhiata ad alcuni esempi.

**Scalabilità**: Si ottiene tramite l'"esternalizzazione del calcolo". Non è strettamente necessario usare la conoscenza zero affinché una catena L1 verifichi il lavoro di un servizio off-chain. Le transazioni non sono necessariamente private su una zk-EVM.

Il vantaggio di un servizio Rollup basato su prove (zk-Rollup) è elaborare un lotto di centinaia/migliaia di transazioni e permettere alla L1 di verificare una prova succinta che tutte le transazioni siano state elaborate correttamente, aumentando il throughput delle transazioni della rete di un fattore 100 o 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interoperabilità**: Si ottiene su un zk-Bridge "bloccando" gli asset su una catena di origine e dimostrando alla catena di destinazione che gli asset sono stati bloccati (prova di consenso).

**Conformità**: Progetti come [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sono in grado di dimostrare che una transazione privata è conforme alle leggi bancarie locali senza rivelare i dettagli della transazione. 

**Combattere la disinformazione**: Tra vari esempi al di fuori di blockchain e criptovalute, vi è l'uso della generazione di prove su immagini elaborate da organi di informazione e media per consentire agli spettatori di verificare in modo indipendente l'origine di un'immagine e tutte le operazioni eseguite su di essa. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Per approfondire: 

[Bibliografia sulla conoscenza zero - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK con Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 e SNARK senza Configurazioni Fidate - Sean Bowe su Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Prove a conoscenza zero con Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Prove interattive a conoscenza zero - Articolo Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lezione 1: Introduzione e storia degli ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Spiegazione semplice dei circuiti aritmetici - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La scalabilità è noiosa, la privacy è morta: prove ZK, a cosa servono?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Pagine correlate

- [Pool schermati](/using-zcash/shielded-pools) — Come gli zk-SNARKs vengono utilizzati nei pool di valore Zcash
- [Halo](/zcash-tech/halo) — Il sistema Zcash di zk-SNARK che elimina le configurazioni fidate
- [Sicurezza post-quantistica in Zcash](/zcash-tech/post-quantum-security) - Come i futuri rischi quantistici si relazionano alla crittografia Zcash
- [Zcash Asset schermati](/zcash-tech/zcash-shielded-assets) — ZSA costruiti sulla tecnologia zk-SNARK
- [Cos'è ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Introduzione a Zcash e al suo modello di privacy
- [Chi può vedere il tuo pagamento Zcash?](/start-here/who-can-see-your-zcash-payment) — Cosa rimane pubblico e cosa nasconde la schermatura
