<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo è un sistema di prove a conoscenza zero (ZKP) trustless e ricorsivo scoperto da Sean Bowe presso Electric Coin Co. Elimina la necessità di un trusted setup e rende pratica la composizione ricorsiva di prove, che è il fondamento dell'attuale roadmap di scalabilità e sicurezza di Zcash.

- **Cos'è:** una costruzione zk-SNARK con ricorsione efficiente e nessuna cerimonia di trusted setup.
- **Perché è importante:** la pool schermata Orchard di Zcash, attivata con NU5 nel 2022, funziona su Halo 2 — l'implementazione in produzione di questa ricerca.
- **Proprietà chiave:** niente "rifiuti tossici" dalle cerimonie di setup, e prove che possono attestare un numero praticamente illimitato di altre prove.
- **Licenze:** Halo 2 è open source sotto [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), quindi chiunque nell'ecosistema può costruirvi sopra.

---

## Spiegazione di base

Halo è un sistema di prove a conoscenza zero trustless e ricorsivo scoperto da Sean Bowe presso Electric Coin Co. Elimina il trusted setup e consente una maggiore scalabilità della blockchain Zcash. Halo è stato il primo sistema di prove a conoscenza zero sia efficiente che ricorsivo — ampiamente considerato una svolta scientifica.

![halo](/content-images/_unavailable.svg "halo")

### I due componenti

- **Succinct Polynomial Commitment Scheme.** Permette a un committer di impegnare un polinomio con una stringa breve che un verificatore può usare per confermare le valutazioni rivendicate del polinomio oggetto del commitment.
- **Polynomial Interactive Oracle Proof.** Il verificatore chiede al prover (un algoritmo) di aprire tutti i commitment in punti a sua scelta, usando lo schema di commitment polinomiale, e controlla che l'identità sia verificata tra essi.

### Niente trusted setup

Alcune costruzioni zk-SNARK, come Groth16, richiedono un trusted setup per generare i propri parametri pubblici, spesso chiamato common reference string (CRS). Il CRS è condiviso con prover e verificatori; non è il segreto che deve essere distrutto. Il materiale intermedio segreto ("rifiuti tossici") prodotto da un tale setup deve essere scartato. Un calcolo multi-parte sicuro può distribuire quella fiducia: la cerimonia è sicura se almeno un partecipante segue il protocollo e distrugge il proprio contributo segreto. Vedi la [spiegazione dei parametri pubblici e dei rifiuti tossici](https://zodl.com/snark-parameters/) di ECC.

Le pool schermate precedenti di Zcash, Sprout e Sapling, usavano sistemi di prova con trusted setup, BCTV14 e Groth16 rispettivamente. I loro parametri pubblici restano disponibili per la generazione e la verifica delle prove. Il problema è se il materiale segreto del setup sia stato conservato, il che potrebbe consentire prove false; la pubblicazione del CRS stesso è attesa e non rivela quel materiale segreto.

Halo combina la composizione ricorsiva di prove con uno schema di commitment polinomiale basato su un inner product argument. I suoi parametri pubblici non richiedono una cerimonia di trusted setup né la distruzione di un trapdoor segreto di setup. Il [libro Halo 2](https://zcash.github.io/halo2/background/pc-ipa.html#setup) descrive questi parametri pubblici di gruppo. Questo è diverso dal rendere upgradeable uno structured reference string generato da una cerimonia.

Rimuovere questo requisito di setup evita di fare affidamento sulla distruzione del materiale segreto delle cerimonie per le prove Halo. Non dimostra che una cerimonia precedente Sprout o Sapling sia stata incontaminata, né certifica che tutti i successivi cambiamenti al protocollo siano sicuri. Le prove ricorsive attestano i calcoli codificati nei loro circuiti, alle condizioni delle ipotesi del sistema di prova. Circuiti e implementazioni corrette restano importanti; l'[Halo 2 deployment explainer](https://zodl.com/technical-explainer-halo-on-zcash/) di ECC nota esplicitamente il rischio di nuovi bug o difetti di design.

[l'explainer di Sean Bowe su Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visuale / Analogia

### La catena del notaio

Pensa a una normale zk-SNARK come a un documento autenticato: un timbro, una verifica, e fatto. Immagina ora di dover dimostrare che una pila di 10.000 documenti è autentica. Senza ricorsione, un verificatore dovrebbe controllare ogni timbro.

Halo trasforma ogni documento verificato in un timbro sul documento *successivo*, finché l'intera pila collassa in un unico documento con un unico timbro. Controllare l'ultimo documento basta per fidarsi dell'intera catena — e cosa cruciale, il notaio di Halo (il sistema di prova) fabbrica i propri timbri senza mai avere bisogno di un'autorità esterna che prepari il suo sigillo.

### Perché rimuovere il trusted setup è importante

Nei vecchi sistemi con trusted setup, il "sigillo" pubblico (il CRS) proveniva da una cerimonia. I partecipanti dovevano distruggere il loro materiale intermedio segreto mantenendo disponibili i parametri pubblici. Halo evita quella cerimonia e il suo trapdoor segreto di setup. Questo non elimina la necessità di proteggere le chiavi di spesa degli utenti né di controllare le ipotesi e l'implementazione del sistema di prova.

---

## Analisi approfondita

### Prove ricorsive

La composizione ricorsiva di prove permette a una singola prova di attestare la correttezza di un numero praticamente illimitato di altre prove, comprimendo una grande quantità di calcolo (e di informazioni). Questo è una componente essenziale per la scalabilità, perché permette alla rete di scalare orizzontalmente mentre sacche di partecipanti possono continuare a fidarsi dell'integrità del resto della rete.

Prima di Halo, ottenere la composizione ricorsiva di prove richiedeva un grande dispendio di calcolo e un trusted setup. Una delle principali scoperte è stata una tecnica chiamata **nested amortization**: composizione ricorsiva che usa uno schema di commitment polinomiale basato sull'inner product argument, migliorando enormemente le prestazioni evitando il trusted setup.

L'[articolo Halo](https://eprint.iacr.org/2019/1021.pdf) descrive pienamente questo schema di commitment polinomiale e ha scoperto che al suo interno esisteva una nuova tecnica di aggregazione. La tecnica permette di verificare un gran numero di prove create indipendentemente quasi tanto rapidamente quanto la verifica di una singola prova. Da sola, offriva già un'alternativa migliore al precedente zk-SNARKs usato in Zcash.

### Halo 2

Halo 2 è un'implementazione zk-SNARK ad alte prestazioni scritta in Rust che elimina la necessità di un trusted setup ponendo al contempo le basi per la scalabilità in Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Include una generalizzazione dell'approccio chiamata **schema di accumulazione**. Questa formalizzazione mostra come funziona realmente il nested amortization: aggiungendo prove a un oggetto chiamato **accumulatore**, dove ogni prova ragiona sullo stato precedente dell'accumulatore, tutte le prove precedenti possono essere controllate (per induzione) semplicemente controllando lo stato attuale dell'accumulatore.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

In parallelo, molti altri team stavano scoprendo IOP polinomiali più efficienti di Sonic (usato in Halo 1), come Marlin. Il più efficiente di questi protocolli è PLONK, che garantisce un'enorme flessibilità nella progettazione di implementazioni efficienti in base alle esigenze specifiche dell'applicazione e offre un tempo di prover 5× migliore rispetto a Sonic.

[Panoramica di PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo nell'ecosistema più ampio

Electric Coin Company ha stipulato un accordo con Protocol Labs, la Filecoin Foundation e l'Ethereum Foundation per esplorare la R&D su Halo, incluso come la tecnologia potrebbe essere usata nelle rispettive reti. L'accordo mira a offrire migliore scalabilità, interoperabilità e privacy tra gli ecosistemi e per il Web 3.0.

Inoltre, Halo 2 è sotto le [licenze open source MIT e Apache 2.0](https://github.com/zcash/halo2#readme), il che significa che chiunque nell'ecosistema può costruire con il sistema di prova.

**Filecoin.** Dal suo deployment, la libreria halo2 è stata adottata in progetti come lo zkEVM, e c'è una potenziale integrazione di Halo 2 nel sistema di prova per la Filecoin Virtual Machine. Filecoin richiede numerose e costose prove di spacetime e prove di replica; Halo 2 è fondamentale per comprimere l'uso di spazio e scalare meglio la rete. [il video della Filecoin Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Sarebbe un beneficio per entrambi gli ecosistemi se i pagamenti di archiviazione di Filecoin potessero essere effettuati in ZEC, garantendo la stessa privacy per gli acquisti di archiviazione che esiste nei trasferimenti schermati di Zcash — inclusa la crittografia dei file nell'archiviazione di Filecoin e il supporto a client mobili che allegano media a un memo crittografato di Zcash. [il post sul blog ECC × Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** È in sviluppo una prova Halo 2 per una Verifiable Delay Function (VDF) efficiente. Una VDF è una primitiva crittografica con molti potenziali casi d'uso, tra cui casualità per uso generale per gli smart contract e l'elezione del leader nel Proof of Stake. ECC, la Filecoin Foundation, Protocol Labs e l'Ethereum Foundation lavorano anche con [SupraNational](https://www.supranational.net/), un fornitore specializzato in crittografia con accelerazione hardware, per un potenziale sviluppo GPU e ASIC della VDF. Il [gruppo Privacy and Scaling Explorations](https://appliedzkp.org/) sta ricercando modi aggiuntivi in cui le prove Halo 2 possono migliorare privacy e scalabilità per Ethereum.

### Altri progetti che usano Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — un protocollo di scambio atomico multichain che preserva la privacy
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — uno zkRollup L2 su Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — una blockchain zkEVM L1 privata
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — uno zkRollup L2 su Ethereum

---

## Implicazioni pratiche

**Per Zcash stessa**

- La pool schermata Orchard, attivata con NU5, è l'implementazione di questo nuovo sistema di prova sulla rete di Zcash. È sorvegliata dal medesimo design a turnstile (tornello) usato tra Sprout e Sapling, con l'intenzione di ritirare gradualmente le pool schermate più vecchie.
- Dopo NU5 (metà 2022), è diventata possibile l'integrazione delle prove ricorsive, e con essa sono arrivate diverse migliorie alla privacy — in particolare l'introduzione delle "Actions" al posto degli input/output, che riduce la quantità di metadati delle transazioni.
- Eliminare i trusted setup rimuove un rischio sistemico che altrimenti andrebbe ripetuto per ogni importante upgrade del protocollo.

**Per possessori e operatori**

- La composizione ricorsiva di prove ha il potenziale per comprimere quantità illimitate di calcolo, creare sistemi distribuiti verificabili e migliorare la capacità del Layer 1 per gli operatori di full node (nodo completo) — rilevante per estensioni come Zcash Shielded Assets e i design di lungo termine di Zcash.

---

## Errori comuni

| Credenza comune | Come stanno realmente le cose |
| --- | --- |
| "Halo è un upgrade futuro che Zcash sta aspettando." | Orchard, attivo sul mainnet da NU5 (2022), funziona già su Halo 2. |
| "Niente trusted setup significa niente parametri affatto." | Halo usa ancora parametri pubblici. Non richiedono una cerimonia in cui i partecipanti devono essere considerati affidabili per distruggere il materiale segreto di setup. |
| "Halo 2 e l'articolo Halo sono la stessa cosa." | L'[articolo](https://eprint.iacr.org/2019/1021.pdf) descrive lo schema di commitment polinomiale e il nested amortization; Halo 2 è l'implementazione Rust in produzione con uno schema di accumulazione e aritmetizzazione PLONKish. |
| "La ricorsione serve solo per scalare la verifica dei blocchi." | La ricorsione comprime anche il calcolo a livello di applicazione — vedi le prove di spacetime/replica di Filecoin e il lavoro sulla VDF per Ethereum. |

---

## Pagine correlate

- [zk-SNARKs](/zcash-tech/zk-snarks) — la categoria tecnologica generale a cui appartiene Halo
- [Halo (articolo di ricerca)](https://eprint.iacr.org/2019/1021.pdf) — la pubblicazione originale
- [Ironwood](/zcash-tech/ironwood) e [The Turnstile](/zcash-tech/the-turnstile) — come migrano le pool schermate mentre quelle più vecchie vanno in pensione
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — un'estensione che beneficia delle prove ricorsive
- [Zebra Full Node](/zcash-tech/zebra-full-node) — l'implementazione di nodo che valida le prove on chain

## Approfondimenti

- [Un'introduzione alle ZKP e a Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 con Daira e Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog di spiegazioni tecniche](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentazione**

- [risorse Halo 2](https://github.com/mhchia/awesome-halo2)
- [documentazione di Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
