<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Sincronizzazione dei wallet Zcash

## TL;DR

* Poiché le transazioni schermate Zcash nascondono i loro dettagli, un server non può semplicemente cercare il saldo di un wallet come può fare per monete trasparenti come Bitcoin o Ethereum.
* I light wallet scaricano piccoli “blocchi compatti” da un server specializzato (lightwalletd) e decrittano autonomamente i dati rilevanti con le proprie chiavi private.
* Decrittare ed elaborare questi blocchi richiede tempo, quindi i wallet usano metodi di sincronizzazione più rapidi per consentirti di utilizzare prima i tuoi fondi.
* Approcci notevoli: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e il proposto DAGSync.
* Questi metodi generalmente scambiano memoria o potenza di elaborazione aggiuntive con una sincronizzazione più rapida.

## Spiegazione di base

### Come funziona la sincronizzazione di Zcash

Zcash usa prove a conoscenza zero per schermare i dettagli delle transazioni da parti non autorizzate. Questa privacy rende la sincronizzazione più difficile per i light wallet, perché non memorizzano localmente l'intera blockchain e si affidano invece a un server per le informazioni necessarie. Con Bitcoin o Ethereum, i server possono indicizzare la blockchain e restituire rapidamente i dati dell'account. Ma con Zcash, il server non può vedere i dettagli delle transazioni. Quindi, come può un light wallet sincronizzare il proprio saldo e la cronologia senza scaricare e decrittare autonomamente l'intera blockchain?

Zcash risolve questo problema combinando più approcci. Dispone di un server specializzato, lightwalletd, che filtra i dati da un nodo completo e conserva solo ciò che è necessario per l'identificazione delle transazioni. Questi dati sono chiamati blocchi compatti e sono molto più piccoli dei blocchi originali. I light wallet prima scaricano questi blocchi compatti dal server lightwalletd e poi li decrittano con le proprie chiavi private.

Anche decrittare ed elaborare questi blocchi compatti può richiedere molto tempo, specialmente quando ci sono molte transazioni per blocco. Per questo i wallet usano metodi diversi per accelerare la sincronizzazione e permetterti di usare i tuoi fondi il prima possibile.

## Visuale / Analogia

Immagina la blockchain come un'enorme sala postale piena di scatole chiuse a chiave. Con una moneta trasparente, l'addetto della sala postale può leggere le etichette e dirti istantaneamente quali scatole sono tue. Con Zcash, le etichette sono nascoste — quindi il tuo wallet deve prendere le sue chiavi e controllare silenziosamente le scatole per trovare quelle che può aprire. I metodi di sincronizzazione qui sotto sono strategie diverse per controllare quelle scatole più velocemente.

## Approfondimento

### Warp Sync

Warp sync è una funzionalità di YWallet che salta i passaggi intermedi di decrittazione ed elaborazione di ciascun blocco compatto, arrivando direttamente al risultato finale.

Per farlo, utilizza matematica e crittografia per calcolare il risultato finale senza passare attraverso ogni passaggio.

Warp sync può elaborare migliaia di blocchi al secondo, molto più velocemente del metodo di sincronizzazione abituale. Questo significa che gli utenti di YWallet possono godere di prestazioni rapide e fluide, anche con centinaia di migliaia di transazioni e note ricevute nei loro account.

Oltre a questa tecnica che salta i passaggi, YWallet può elaborare più blocchi simultaneamente, distribuendo il carico sull'hardware disponibile per rendere il processo ancora più rapido.

Leggi di più su [Warp Sync](https://ywallet.app/warp/)

> Warp sync è descritto qui come una tecnica di sincronizzazione. Ywallet stesso non è più mantenuto e non verrà aggiornato per Ironwood, quindi non è un wallet da installare oggi.

### Spend-before-sync

Spend-before-sync è una nuova funzionalità di Zcash Mobile Wallet SDK V2 che consente agli utenti di spendere immediatamente i fondi all'apertura del wallet, senza attendere la sincronizzazione completa del wallet. Questa funzionalità accelera l'individuazione del saldo spendibile del wallet e migliora l'esperienza utente.

Spend-before-sync funziona utilizzando un algoritmo di sincronizzazione dei blocchi compatti che elabora i blocchi dal server lightwalletd in un ordine non lineare. Ciò significa che, invece di attendere che un blocco sia completamente elaborato prima di passare al successivo, i wallet possono usare un po' più di memoria e potenza di elaborazione per analizzare diverse sezioni della blockchain. Di solito, analizza intervalli diversi, cercando transazioni più recenti mentre i blocchi più vecchi vengono scaricati ed elaborati. Se viene scoperta una nota recente e non spesa, sarà resa disponibile immediatamente.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Sviluppato dal team di Zecwallet, Blaze sync è un algoritmo di sincronizzazione per light wallet che analizza la blockchain a ritroso, iniziando dal blocco più alto e recente e procedendo all'indietro.

Ciò consente al wallet di trovare le note spese prima di quelle ricevute, rendendo al contempo disponibili le note precedentemente non spese senza attendere il completamento dell'intero processo di sincronizzazione.

Inoltre, utilizza Out-of-Order Sync separando tra loro i componenti della sincronizzazione — scaricare i blocchi, effettuare decrittazioni di prova e aggiornare i witness — ed elaborandoli in parallelo. Questo richiede più memoria e risorse CPU, ma aumenta la velocità di sincronizzazione di X5.

### DAGSync

DAGSync è un algoritmo di sincronizzazione proposto che mira a migliorare l'esperienza utente dei wallet schermati Zcash accelerando la sincronizzazione.

Utilizza un [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) per rappresentare le dipendenze tra note, witness e nullifier in un wallet Zcash.

Un DAG è una struttura dati composta da nodi e archi, in cui ogni arco ha una direzione che indica una relazione tra due nodi. Un DAG non ha cicli, il che significa che non esiste alcun modo per partire da un nodo e seguire gli archi fino a tornare allo stesso nodo.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicazioni pratiche

È interessante notare che tutti questi meccanismi mirano ad affrontare le questioni sollevate da Zcash Security nel suo post su [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e sulla sua relazione con i sistemi di pagamento privati. Alcuni si spingono persino oltre, scaricando dai server tutti i dati dei memo, eccetto i dati esclusivi di un indirizzo, aumentando la privacy al costo di alcune risorse aggiuntive.

Inoltre, Zcash Foundation sta esaminando altre alternative per migliorare le prestazioni dei light wallet. È il caso di [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), una costruzione che la fondazione ha studiato “per determinare se offra una potenziale soluzione ai recenti problemi di prestazioni che hanno interessato gli utenti dei wallet Zcash.”

## Errori comuni

**Presumere che il server lightwalletd conosca il tuo saldo.** Il server fornisce soltanto blocchi compatti; il tuo wallet li decritta e interpreta localmente con le tue chiavi.

**Interrompere la sincronizzazione troppo presto.** Alcuni metodi rendono disponibili fondi recenti e spendibili prima del completamento di una sincronizzazione completa, ma la cronologia e le note più vecchie potrebbero essere ancora in elaborazione.

**Confrontare direttamente la sincronizzazione di Zcash con quella di una chain trasparente.** Un percorso più lento può essere il costo della preservazione della privacy, non un difetto — il wallet svolge un lavoro che altrimenti un server di una moneta pubblica farebbe leggendo apertamente il tuo account.


## Pagine correlate

- [Nodi lightwallet](/zcash-tech/lightwallet-nodes) — l'infrastruttura lightwalletd su cui si basano i light wallet.
- [Chiavi di visualizzazione](/zcash-tech/viewing-keys) — le chiavi che i wallet usano per rilevare e decrittare le proprie note.
- [Pepper Sync](/zcash-tech/pepper-sync) — un altro approccio alla sincronizzazione dei wallet Zcash.
- [FROST](/zcash-tech/frost) — autorità di firma distribuita per ZEC schermati.
