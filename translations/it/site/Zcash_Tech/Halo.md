<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Cos'è Halo?

Halo è un sistema di prova a conoscenza zero (ZKP) senza trusted setup e ricorsivo, scoperto da Sean Bowe presso Electric Coin Co. Elimina la necessità di un trusted setup e consente una maggiore scalabilità della blockchain Zcash. Halo è stato il primo sistema di prova a conoscenza zero a essere al contempo efficiente e ricorsivo, ed è ampiamente considerato una svolta scientifica.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componenti**

Schema di Impegno Polinomiale Succinto: consente a chi si impegna (committer) di vincolarsi a un polinomio tramite una stringa breve, che un verificatore può usare per confermare le valutazioni dichiarate del polinomio impegnato.

Prova Interattiva Oracolo Polinomiale: il verificatore chiede al prover (algoritmo) di aprire tutti gli impegni in vari punti di sua scelta, utilizzando lo schema di impegno polinomiale, e verifica che l'identità sia soddisfatta tra di essi.


### Nessun Trusted Setup

Gli ZK-SNARKs si basano su una stringa di riferimento comune (CRS) come parametro pubblico per la generazione e la verifica delle prove. Questa CRS deve essere generata in anticipo da una parte fidata. Fino a poco tempo fa, elaborate computazioni sicure multi-parte (MPC) — come quelle eseguite dalla rete Aztec e da Zcash — erano necessarie per mitigare i rischi connessi a questa [cerimonia di trusted setup](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

In precedenza, i pool Shielded Sprout e Sapling di Zcash utilizzavano i sistemi di prova zk BCTV14 e Groth 16. Sebbene sicuri, presentavano delle limitazioni: non erano scalabili poiché legati a una singola applicazione, i "rifiuti tossici" (residui del materiale crittografico generato durante la cerimonia genesi) potevano persistere, e gli utenti dovevano accordare un certo grado di fiducia (seppur minimo) alla cerimonia.

Collassando ripetutamente molteplici istanze di problemi difficili l'una sull'altra attraverso cicli di curve ellittiche — in modo che le prove computazionali possano ragionare su sé stesse in modo efficiente (ammortizzazione annidata) — viene eliminata la necessità di un trusted setup. Ciò significa inoltre che la stringa di riferimento strutturata (output della cerimonia) è aggiornabile, abilitando applicazioni come gli smart contract.

Halo offre agli utenti due importanti garanzie riguardo alla sicurezza del sistema di prove a conoscenza zero su larga scala. In primo luogo, consente agli utenti di dimostrare che nessuno dei partecipanti alla cerimonia genesi ha creato una backdoor segreta per eseguire transazioni fraudolente. In secondo luogo, permette agli utenti di dimostrare che il sistema è rimasto sicuro nel tempo, anche in seguito ad aggiornamenti e modifiche.

[Spiegazione di Sean Bowe su Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)



### Prove Ricorsive

La composizione ricorsiva delle prove consente a una singola prova di attestare la correttezza di un numero praticamente illimitato di altre prove, permettendo di comprimere una grande quantità di calcoli (e informazioni). Questo è un componente essenziale per la scalabilità, non da ultimo perché consente di scalare orizzontalmente la rete consentendo al contempo a sottoinsiemi di partecipanti di fidarsi dell'integrità del resto della rete.

Prima di Halo, ottenere la composizione ricorsiva delle prove richiedeva un elevato costo computazionale e un trusted setup. Una delle scoperte principali è stata una tecnica chiamata **ammortizzazione annidata**. Questa tecnica consente la composizione ricorsiva utilizzando lo schema di impegno polinomiale basato sull'argomento del prodotto interno, migliorando enormemente le prestazioni ed evitando il trusted setup.

Nel [paper di Halo](https://eprint.iacr.org/2019/1021.pdf), questo schema di impegno polinomiale è stato descritto integralmente, e vi è stata scoperta una nuova tecnica di aggregazione. Tale tecnica consente di verificare un gran numero di prove create indipendentemente quasi con la stessa velocità con cui si verifica una singola prova. Questo da solo offrirebbe un'alternativa migliore ai precedenti ZK-SNARKs utilizzati in Zcash.


### Halo 2

Halo 2 è un'implementazione zk-SNARK ad alte prestazioni scritta in Rust, che elimina la necessità di un trusted setup aprendo la strada alla scalabilità di Zcash.

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Include una generalizzazione del nostro approccio chiamata **schema di accumulazione**. Questa nuova formalizzazione spiega come funziona la nostra tecnica di ammortizzazione annidata: aggiungendo prove a un oggetto chiamato **accumulatore**, in cui le prove ragionano sullo stato precedente dell'accumulatore stesso, è possibile verificare che tutte le prove precedenti siano corrette (per induzione) semplicemente controllando lo stato attuale dell'accumulatore.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



In parallelo, molti altri team stavano scoprendo nuovi IOP Polinomiali più efficienti di Sonic (usato in Halo 1), come Marlin.

Il più efficiente di questi nuovi protocolli è PLONK, che offre enorme flessibilità nella progettazione di implementazioni efficienti in base alle esigenze specifiche dell'applicazione, con un tempo del prover 5 volte migliore rispetto a Sonic.

[Panoramica di PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Quali benefici porta a Zcash?

Il pool Shielded Orchard è stato attivato con NU5 ed è l'implementazione di questo nuovo sistema di prove sulla rete Zcash. Protetto dallo stesso design a tornello utilizzato tra Sprout e Sapling, con l'intento di ritirare gradualmente i pool Shielded più vecchi. Questo incentiva la migrazione verso un sistema di prove completamente privo di fiducia, rafforzando la fiducia nella solidità della base monetaria e riducendo la complessità implementativa e la superficie di attacco di Zcash nel complesso. A seguito dell'attivazione di NU5 a metà 2022, l'integrazione di prove ricorsive è diventata possibile (sebbene non ancora completata). Sono stati apportati anche diversi miglioramenti alla privacy in modo collaterale. L'introduzione delle "Actions" in sostituzione degli input/output ha contribuito a ridurre la quantità di metadati delle transazioni.

I trusted setup sono generalmente difficili da coordinare e rappresentano un rischio sistemico. Sarebbe necessario ripeterli ad ogni aggiornamento importante del protocollo. La loro rimozione costituisce un miglioramento sostanziale per l'implementazione sicura dei nuovi aggiornamenti del protocollo.

La composizione ricorsiva delle prove ha il potenziale di comprimere quantità illimitate di calcolo, creare sistemi distribuiti verificabili e rendere Zcash altamente capace, in particolare con il passaggio al Proof of Stake. Questo è utile anche per estensioni come Zcash Shielded Assets e per migliorare la capacità del Layer 1 nell'utilizzo più intenso dei nodi completi nei prossimi anni per Zcash.


## Halo nell'ecosistema più ampio

Electric Coin Company ha stipulato un accordo con Protocol Labs, la Filecoin Foundation e la Ethereum Foundation per esplorare la R&D su Halo, incluso come la tecnologia potrebbe essere utilizzata nelle rispettive reti. L'accordo mira a migliorare scalabilità, interoperabilità e privacy tra gli ecosistemi e per il Web 3.0.

Inoltre, Halo 2 è rilasciato sotto le [licenze open-source MIT e Apache 2.0](https://github.com/zcash/halo2#readme), il che significa che chiunque nell'ecosistema può sviluppare con questo sistema di prove.

### Filecoin

Dal suo deployment, la libreria halo2 è stata adottata in progetti come lo zkEVM; esiste una potenziale integrazione di Halo 2 nel sistema di prove per la Filecoin Virtual Machine. Filecoin richiede numerose e costose prove di spazio-tempo / prove di replica. Halo2 sarà fondamentale per comprimere l'utilizzo dello spazio e migliorare la scalabilità della rete.

[Video della Filecoin Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Sarebbe inoltre molto vantaggioso per entrambi gli ecosistemi Filecoin e Zcash se i pagamenti per lo storage su Filecoin potessero essere effettuati in ZEC, garantendo lo stesso livello di privacy per gli acquisti di storage che esiste nei trasferimenti Shielded di Zcash. Questo supporto consentirebbe di cifrare i file nell'archiviazione Filecoin e di aggiungere supporto ai client mobile affinché possano **allegare** media o file a un Memo cifrato di Zcash.

[Post del blog ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

È in corso l'implementazione di una prova Halo 2 per l'efficiente Verifiable Delay Function (VDF) in fase di sviluppo. Una VDF è una primitiva crittografica con molti potenziali casi d'uso.

Può essere usata come fonte di casualità per scopi generali, incluso l'utilizzo in applicazioni di smart contract, nonché per la selezione del leader nel Proof of Stake su Ethereum e altri protocolli.

ECC, la Filecoin Foundation, Protocol Labs e la Ethereum Foundation collaboreranno anche con [SupraNational](https://www.supranational.net/), un fornitore specializzato in crittografia accelerata via hardware, per il potenziale design e sviluppo di GPU e ASIC per la VDF.

Il [gruppo Privacy and Scaling Exploration](https://appliedzkp.org/) sta inoltre ricercando diversi modi in cui le prove Halo 2 possono migliorare la privacy e la scalabilità per l'ecosistema Ethereum. Questo gruppo fa capo alla Ethereum Foundation e ha un ampio focus sulle prove a conoscenza zero e sulle primitive crittografiche.

## Altri progetti che utilizzano Halo

+ [Anoma, un protocollo di atomic swap multi-chain con preservazione della privacy](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un L2 zkRollup su Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, una blockchain L1 privata zkEVM](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un L2 zkRollup su Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Approfondimenti**:

[Introduzione a zkp e halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 con Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blog tecnico di approfondimento](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentazione**

[Risorse Halo 2](https://github.com/adria0/awesome-halo2)

[Documentazione Halo 2](https://zcash.github.io/halo2/)

[Halo 2 su GitHub](https://github.com/zcash/halo2)
