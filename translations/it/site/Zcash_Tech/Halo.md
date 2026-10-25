<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo è un sistema trustless di prove ricorsive a conoscenza zero (ZKP) scoperto da Sean Bowe presso Electric Coin Co. Elimina la necessità di un trusted setup e rende pratica la composizione ricorsiva delle prove, che è alla base dell'attuale roadmap di scalabilità e sicurezza di Zcash.

- **Cos'è:** una costruzione zk-SNARK con ricorsione efficiente e senza una cerimonia di trusted setup.
- **Perché è importante:** la pool schermata Orchard di Zcash, attivata con NU5 nel 2022, funziona su Halo 2, l'implementazione in produzione di questa ricerca.
- **Proprietà chiave:** nessun "rifiuto tossico" dalle cerimonie di configurazione e prove che possono attestare un numero praticamente illimitato di altre prove.
- **Licenze:** Halo 2 è open source con licenza [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), quindi chiunque nell'ecosistema può basarsi su di essa.

---

## Spiegazione di base

Halo è un sistema trustless di prove ricorsive a conoscenza zero scoperto da Sean Bowe presso Electric Coin Co. Elimina il trusted setup e consente una maggiore scalabilità della blockchain di Zcash. Halo è stato il primo sistema di prove a conoscenza zero a essere sia efficiente sia ricorsivo, ampiamente considerato una svolta scientifica.

![halo](/content-images/_unavailable.svg "halo")

### I due componenti

- **Schema di commitment polinomiale succinto.** Consente a chi effettua un commitment di impegnarsi su un polinomio con una stringa breve che un verificatore può usare per confermare le valutazioni dichiarate del polinomio oggetto del commitment.
- **Prova oracolare interattiva polinomiale.** Il verificatore chiede al prover, un algoritmo, di aprire tutti i commitment in punti scelti da lui usando lo schema di commitment polinomiale, e verifica che l'identità tra essi sia valida.

### Nessun trusted setup

zk-SNARKs si basa su una stringa di riferimento comune (CRS) come parametro pubblico per la generazione e la verifica delle prove. Questa CRS deve essere generata in anticipo da una parte fidata. Fino a poco tempo fa, elaborate computazioni sicure multi-parte (MPC), come quelle effettuate dalla rete Aztec e da Zcash, erano necessarie per mitigare il rischio durante questa [cerimonia di trusted setup](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Le precedenti pool schermate Sprout e Sapling di Zcash utilizzavano i sistemi zk-proving BCTV14 e Groth16. Pur essendo sicuri, presentavano limitazioni: non erano scalabili perché legati a una singola applicazione, il "rifiuto tossico" (residui di materiale crittografico generati durante la cerimonia di genesi) poteva persistere e occorreva un elemento di fiducia, seppur minimo, per ritenere accettabile la cerimonia.

Halo elimina il trusted setup comprimendo ripetutamente più istanze di problemi complessi attraverso cicli di curve ellittiche, così che le prove computazionali possano ragionare efficientemente su sé stesse (ammortizzazione annidata). Un effetto collaterale è che la stringa di riferimento strutturata, ovvero l'output di una cerimonia, diventa aggiornabile, consentendo applicazioni come gli smart contract.

Halo offre agli utenti due importanti garanzie sulla sicurezza di un sistema di prove a conoscenza zero su larga scala. Innanzitutto, consente agli utenti di dimostrare che nessuna persona coinvolta nella cerimonia di genesi ha creato una backdoor segreta per eseguire transazioni fraudolente. In secondo luogo, consente agli utenti di dimostrare che il sistema è rimasto sicuro nel tempo, anche durante aggiornamenti e modifiche.

[La spiegazione di Sean Bowe presso Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visualizzazione / analogia

### La catena dei notai

Pensa a una normale zk-SNARK come a un documento autenticato dal notaio: un timbro, una verifica, fatto. Ora immagina di dover dimostrare che una pila di diecimila documenti è autentica. Senza ricorsione, un verificatore dovrebbe controllare ogni timbro.

Halo trasforma ogni documento verificato in un timbro sul documento *successivo*, finché l'intera pila non si riduce a un singolo documento con un solo timbro. Controllare l'ultimo documento basta per fidarsi dell'intera catena e, cosa fondamentale, il notaio di Halo, ovvero il sistema di generazione delle prove, produce i propri timbri senza mai richiedere a un'autorità esterna di predisporre il suo sigillo.

### Perché è importante eliminare il trusted setup

Nei sistemi più vecchi, il "sigillo" (la CRS) proveniva da una cerimonia. I partecipanti dovevano distruggere il materiale intermedio e tutti dovevano fidarsi del fatto che lo avessero fatto. Il sigillo di Halo è prodotto solo dalla matematica: non c'è nulla da distruggere, nulla da divulgare e nessuna cerimonia di cui fidarsi.

---

## Approfondimento

### Prove ricorsive

La composizione ricorsiva delle prove consente a una singola prova di attestare la correttezza di un numero praticamente illimitato di altre prove, comprimendo una grande quantità di computazione e informazioni. È un componente essenziale per la scalabilità, perché consente alla rete di scalare orizzontalmente mantenendo la capacità di gruppi di partecipanti di fidarsi dell'integrità del resto della rete.

Prima di Halo, ottenere la composizione ricorsiva delle prove richiedeva un elevato costo computazionale e un trusted setup. Una delle principali scoperte è stata una tecnica chiamata **ammortizzazione annidata**: composizione ricorsiva mediante uno schema di commitment polinomiale basato sull'argomento del prodotto interno, che migliora enormemente le prestazioni evitando al tempo stesso il trusted setup.

Il documento [Halo](https://eprint.iacr.org/2019/1021.pdf) descrive integralmente questo schema di commitment polinomiale e ha scoperto che al suo interno esisteva una nuova tecnica di aggregazione. La tecnica consente di verificare un gran numero di prove create indipendentemente quasi con la stessa rapidità necessaria per verificare una singola prova. Già da sola offriva un'alternativa migliore al precedente zk-SNARKs usato in Zcash.

### Halo 2

Halo 2 è un'implementazione zk-SNARK ad alte prestazioni scritta in Rust che elimina la necessità di un trusted setup, preparando al contempo il terreno per la scalabilità in Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Include una generalizzazione dell'approccio chiamata **schema di accumulazione**. Questa formalizzazione mostra come funziona realmente l'ammortizzazione annidata: aggiungendo prove a un oggetto chiamato **accumulatore**, in cui ogni prova ragiona sullo stato precedente dell'accumulatore, tutte le prove precedenti possono essere controllate, per induzione, semplicemente verificando lo stato corrente dell'accumulatore.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Parallelamente, molti altri team stavano scoprendo Polynomial IOP più efficienti di Sonic, usato in Halo 1, come Marlin. Il più efficiente di questi protocolli è PLONK, che offre enorme flessibilità nella progettazione di implementazioni efficienti basate sulle esigenze specifiche dell'applicazione e garantisce un tempo del prover 5× migliore rispetto a Sonic.

[Panoramica di PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo nell'ecosistema più ampio

Electric Coin Company ha stipulato un accordo con Protocol Labs, la Filecoin Foundation e la Ethereum Foundation per esplorare la R&S di Halo, incluso il modo in cui la tecnologia potrebbe essere utilizzata nelle rispettive reti. L'accordo mira a fornire maggiore scalabilità, interoperabilità e privacy tra gli ecosistemi e per il Web 3.0.

Inoltre, Halo 2 è distribuito con le licenze open source [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), il che significa che chiunque nell'ecosistema può sviluppare con il sistema di generazione delle prove.

**Filecoin.** Dalla sua implementazione, la libreria halo2 è stata adottata in progetti come zkEVM, ed esiste la possibilità di integrare Halo 2 nel sistema di prove della macchina virtuale Filecoin. Filecoin richiede numerose costose prove di spazio-tempo e prove di replicazione; Halo 2 è fondamentale per comprimere l'uso dello spazio e migliorare la scalabilità della rete. [Filecoin Video della Foundation con Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Entrambi gli ecosistemi trarrebbero inoltre beneficio se i pagamenti per lo storage di Filecoin potessero essere effettuati in ZEC, offrendo la stessa privacy per gli acquisti di storage che esiste nei trasferimenti schermati di Zcash — inclusa la crittografia dei file nello storage di Filecoin e il supporto per client mobili che allegano contenuti multimediali a un memo crittografato di Zcash. [ECC × Filecoin Post del blog](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** È in fase di sviluppo una prova Halo 2 per un'efficiente Verifiable Delay Function (VDF). Una VDF è una primitiva crittografica con molti potenziali casi d'uso, inclusi la casualità di uso generale per gli smart contract e l'elezione dei leader in Proof of Stake. ECC, la Foundation Filecoin, Protocol Labs e la Ethereum Foundation stanno inoltre collaborando con [SupraNational](https://www.supranational.net/), un fornitore specializzato in crittografia accelerata dall'hardware, per il potenziale sviluppo GPU e ASIC della VDF. Il gruppo [Privacy and Scaling Explorations](https://appliedzkp.org/) sta studiando ulteriori modi in cui le prove Halo 2 possono migliorare privacy e scalabilità per Ethereum.

### Altri progetti che usano Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — un protocollo di scambio atomico multichain che preserva la privacy
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — un zkRollup L2 su Cardano
- [Darkfi](https://dark.fi/book/arch/arch.html) — una blockchain zkEVM L1 privata
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — un zkRollup L2 su Ethereum

---

## Implicazioni pratiche

**Per Zcash stesso**

- La pool schermata Orchard, attivata con NU5, è l'implementazione di questo nuovo sistema di prove nella rete di Zcash. È protetta dallo stesso design turnstile usato tra Sprout e Sapling, con l'intento di ritirare gradualmente le pool schermate più vecchie.
- Dopo NU5, a metà del 2022, l'integrazione delle prove ricorsive è diventata possibile e con essa sono arrivati diversi miglioramenti della privacy, soprattutto l'introduzione delle "Actions" in sostituzione di input/output, che riduce la quantità di metadati delle transazioni.
- L'eliminazione dei trusted setup rimuove un rischio sistemico che altrimenti dovrebbe essere ripetuto per ogni importante aggiornamento del protocollo.

**Per detentori e operatori**

- La composizione ricorsiva delle prove può comprimere quantità illimitate di computazione, creare sistemi distribuiti verificabili e migliorare la capacità Layer 1 per gli operatori di full node, risultando rilevante per estensioni quali Zcash Shielded Assets e i progetti a più lungo termine di Zcash.

---

## Errori comuni

| Credenza comune | Cosa accade realmente |
| --- | --- |
| "Halo è un futuro aggiornamento che Zcash sta aspettando." | Orchard, attivo su mainnet dal NU5 (2022), funziona già su Halo 2. |
| "Nessun trusted setup significa nessun parametro." | Halo usa ancora parametri strutturati; la differenza è che non contengono rifiuti tossici e possono essere generati e aggiornati senza una cerimonia di cui i partecipanti debbano fidarsi. |
| "Halo 2 e il documento Halo sono la stessa cosa." | Il [documento](https://eprint.iacr.org/2019/1021.pdf) descrive lo schema di commitment polinomiale e l'ammortizzazione annidata; Halo 2 è l'implementazione Rust in produzione con uno schema di accumulazione e un'aritmetizzazione PLONKish. |
| "La ricorsione aiuta solo a scalare la verifica dei blocchi." | La ricorsione comprime anche la computazione a livello applicativo: vedi le prove di spazio-tempo/replica di Filecoin e il lavoro sulla VDF per Ethereum. |

---

## Pagine correlate

- [zk-SNARKs](/zcash-tech/zk-snarks) — la categoria tecnologica generale a cui appartiene Halo
- [Halo (documento di ricerca)](https://eprint.iacr.org/2019/1021.pdf) — la pubblicazione originale
- [Ironwood](/zcash-tech/ironwood) e [Il turnstile](/zcash-tech/the-turnstile) — come migrano le pool schermate mentre quelle più vecchie vengono ritirate
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — un'estensione che beneficia delle prove ricorsive
- [Zebra Full node](/zcash-tech/zebra-full-node) — l'implementazione del nodo che convalida le prove on-chain

## Per approfondire

- [Introduzione alle ZKP e a Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 con Daira e Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Articolo del blog con spiegazione tecnica](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentazione**

- [Risorse di Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentazione di Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
