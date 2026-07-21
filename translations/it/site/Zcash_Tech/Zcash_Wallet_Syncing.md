<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Sincronizzazione dei wallet Zcash

## In breve

* Poiché le transazioni shielded di Zcash nascondono i loro dettagli, un server non può semplicemente cercare il saldo di un wallet come può fare per monete trasparenti come Bitcoin o Ethereum.
* I light wallet scaricano piccoli “compact block” da un server specializzato (lightwalletd) e decifrano da soli i dati rilevanti con le proprie chiavi private.
* Decifrare ed elaborare quei blocchi richiede tempo, quindi i wallet usano metodi di sincronizzazione più rapidi per permetterti di usare i tuoi fondi prima.
* Approcci degni di nota: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e il DAGSync proposto.
* Questi metodi in genere scambiano memoria aggiuntiva o potenza di elaborazione con una sincronizzazione più veloce.

## Spiegazione di base

### Come funziona la sincronizzazione di Zcash

Zcash usa prove a conoscenza zero per proteggere i dettagli delle transazioni da parti non autorizzate. Questa privacy rende la sincronizzazione più difficile per i light wallet perché non memorizzano l'intera blockchain localmente e si affidano invece a un server per ottenere le informazioni necessarie. Con Bitcoin o Ethereum, i server possono indicizzare la blockchain e restituire rapidamente i dati dell'account. Ma con Zcash, il server non può vedere i dettagli delle transazioni. Quindi, come può un light wallet sincronizzare il proprio saldo e la propria cronologia senza scaricare e decifrare da solo l'intera blockchain?

Zcash risolve questo problema combinando più approcci. Ha un server specializzato, lightwalletd, che filtra i dati da un full node e conserva solo ciò che serve per identificare le transazioni. Questi dati sono chiamati compact block e sono molto più piccoli dei blocchi originali. I light wallet scaricano prima questi compact block dal server lightwalletd e poi li decifrano con le proprie chiavi private.

Anche decifrare ed elaborare questi compact block può richiedere molto tempo, soprattutto quando ci sono molte transazioni per blocco. Per questo i wallet usano metodi diversi per accelerare la sincronizzazione e permetterti di usare i tuoi fondi il prima possibile.

## Visuale / Analogia

Immagina la blockchain come un enorme ufficio postale pieno di scatole chiuse a chiave. Con una moneta trasparente, l'impiegato dell'ufficio postale può leggere le etichette e dirti subito quali scatole sono tue. Con Zcash, le etichette sono nascoste — quindi il tuo wallet deve prendere le sue chiavi e controllare silenziosamente da solo le scatole per trovare quelle che può aprire. I metodi di sincronizzazione qui sotto sono strategie diverse per controllare quelle scatole più velocemente.

## Approfondimento

### Warp Sync

Warp sync è una funzionalità di YWallet che salta i passaggi intermedi di decifrazione ed elaborazione di ogni compact block, arrivando direttamente al risultato finale.

Per farlo, usa matematica e crittografia per calcolare il risultato finale senza passare attraverso ogni singolo passaggio.

Warp sync può elaborare migliaia di blocchi al secondo, molto più velocemente del normale metodo di sincronizzazione. Questo significa che gli utenti di YWallet possono godere di prestazioni rapide e fluide, anche con centinaia di migliaia di transazioni e note ricevute nei loro account.

Oltre a questa tecnica che salta i passaggi, YWallet può elaborare più blocchi contemporaneamente, distribuendo il carico sull'hardware disponibile per rendere il processo ancora più veloce.

Leggi di più su [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync è una nuova funzionalità dello Zcash Mobile Wallet SDK V2 che permette agli utenti di spendere istantaneamente i fondi all'apertura del wallet, senza aspettare la sincronizzazione completa del wallet. Questa funzionalità accelera l'individuazione del saldo spendibile del wallet e migliora l'esperienza utente.

Spend-before-sync funziona usando un algoritmo di sincronizzazione dei compact block che elabora i blocchi dal server lightwalletd in un ordine non lineare. Questo significa che, invece di aspettare che un blocco venga completamente elaborato prima di passare al successivo, i wallet possono usare un po' più di memoria e potenza di elaborazione per scansionare diverse sezioni della blockchain. Di solito, analizza intervalli diversi, cercando transazioni più recenti mentre i blocchi più vecchi vengono scaricati ed elaborati. Se viene individuata una nota recente e non spesa, sarà resa disponibile immediatamente.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Sviluppato dal team di Zecwallet, Blaze sync è un algoritmo di sincronizzazione per light wallet che scansiona la blockchain all'indietro, partendo dal blocco più alto e più recente e procedendo a ritroso.

Questo permette al wallet di trovare le note spese prima di quelle ricevute, rendendo al tempo stesso disponibili le note precedentemente non spese senza aspettare che l'intero processo di sincronizzazione finisca.

Inoltre, usa Out-of-Order Sync disaccoppiando tra loro i componenti della sincronizzazione — scaricamento dei blocchi, esecuzione delle trial decryption e aggiornamento dei witness — ed elaborandoli in parallelo. Questo richiede più memoria e risorse CPU ma aumenta la velocità di sincronizzazione di X5.
### DAGSync

DAGSync è un algoritmo di sincronizzazione proposto che mira a migliorare l'esperienza utente dei wallet shielded di Zcash accelerando la sincronizzazione.

Utilizza un [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) per rappresentare le dipendenze tra note, witness e nullifier in un wallet Zcash.

Un DAG è una struttura dati composta da nodi e archi, in cui ogni arco ha una direzione che indica una relazione tra due nodi. Un DAG non ha cicli, il che significa che non esiste un modo per partire da un nodo e seguire gli archi fino a tornare allo stesso nodo.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Implicazioni pratiche

È interessante notare che tutti questi meccanismi mirano ad affrontare le domande sollevate da Zcash Security nel suo articolo su [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e il suo rapporto con i sistemi di pagamento privati. Alcuni fanno persino un passo ulteriore scaricando dai server tutti i dati dei memo, eccetto i dati esclusivi di un indirizzo, aumentando la privacy al costo di un piccolo impiego aggiuntivo di risorse.

Inoltre, la Zcash Foundation ha esaminato anche altre alternative per migliorare le prestazioni dei light wallet. È il caso di [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), una costruzione che la foundation sta studiando “per determinare se offra una potenziale soluzione ai recenti problemi di prestazioni che hanno colpito gli utenti dei wallet Zcash”.

## Errori comuni

**Supporre che il server lightwalletd conosca il tuo saldo.** Il server fornisce solo compact blocks; il tuo wallet li decritta e li interpreta localmente con le tue chiavi.

**Interrompere la sincronizzazione troppo presto.** Alcuni metodi rendono disponibili i fondi spendibili recenti prima che una sincronizzazione completa sia terminata, ma la cronologia più vecchia e le note potrebbero essere ancora in elaborazione.

**Confrontare direttamente la sincronizzazione di Zcash con quella di una chain trasparente.** Un percorso più lento può essere il costo della tutela della privacy, non un difetto — il wallet sta svolgendo un lavoro che altrimenti un server di una moneta pubblica farebbe leggendo apertamente il tuo account.


## Pagine correlate

- [Nodi Lightwallet](/zcash-tech/lightwallet-nodes) — l'infrastruttura lightwalletd su cui si basano i light wallet.
- [Viewing Keys](/zcash-tech/viewing-keys) — le chiavi che i wallet usano per rilevare e decrittare le proprie note.
- [Pepper Sync](/zcash-tech/pepper-sync) — un altro approccio alla sincronizzazione dei wallet Zcash.
- [FROST](/zcash-tech/frost) — autorità di firma distribuita per ZEC shielded.
