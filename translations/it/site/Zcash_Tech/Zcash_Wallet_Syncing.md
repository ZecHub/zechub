<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sincronizzazione del portafoglio Zcash

### Come funziona la sincronizzazione di Zcash

Per comprendere come funziona la sincronizzazione warp, ti spiego un po' di più su Zcash. È una criptovaluta orientata alla privacy che utilizza una tecnologia chiamata zero-knowledge proofs per nascondere i dettagli delle transazioni a chiunque non sia autorizzato a vederli. Ciò significa che le transazioni registrate sulla blockchain sono cifrate o nascoste, e solo il mittente e il destinatario possono decrittarle con le loro chiavi private.

Tuttavia, questo rappresenta una sfida per i portafogli leggeri, ovvero applicazioni che non memorizzano l'intera blockchain sul dispositivo, ma si affidano a un server per fornire le informazioni necessarie. Con le monete non privacy, come Bitcoin o Ethereum, il server può facilmente indicizzare la blockchain e mantenere un database di ogni account. Quando un portafoglio leggero richiede i dati del suo account specifico, il server può restituirli rapidamente.

Ma con Zcash, il server non può farlo, perché non può vedere i dettagli delle transazioni. Quindi, come può un portafoglio leggero sincronizzare il saldo del proprio account e lo storico delle transazioni senza scaricare e decrittare l'intera blockchain?

Zcash risolve questo problema adottando un approccio misto. Utilizza un server specializzato chiamato lightwalletd che filtra i dati da un nodo completo e conserva solo i dati necessari per l'identificazione delle transazioni. Questi dati sono chiamati blocchi compatti e sono molto più piccoli dei blocchi originali. I portafogli leggeri devono solo scaricare questi blocchi compatti dal server lightwalletd e poi decrittarli da soli con le proprie chiavi private.

Tuttavia, anche la decrittazione e l'elaborazione di questi blocchi compatti può richiedere molto tempo, specialmente se ci sono molte transazioni in ogni blocco. Perciò ogni portafoglio ha il proprio metodo alternativo per velocizzare il processo di sincronizzazione, così da poter usare i tuoi fondi il prima possibile.

### Warp Sync
Warp Sync è una funzionalità di YWallet che le permette di saltare i passaggi intermedi di decrittazione ed elaborazione di ogni blocco compatto, e di passare direttamente al risultato finale.

Per farlo, utilizza alcune astute tecniche matematiche e crittografiche per calcolare il risultato finale senza dover eseguire ogni passaggio.

Warp Sync può elaborare migliaia di blocchi al secondo, molto più velocemente del metodo di sincronizzazione abituale. Questo significa che gli utenti di YWallet possono godere di prestazioni veloci e fluide, anche con centinaia di migliaia di transazioni e note ricevute nei propri account.

Oltre a questa tecnica di **salto dei passaggi**, YWallet è anche in grado di elaborare più blocchi contemporaneamente, distribuendo il carico sull'hardware disponibile e rendendo il processo ancora più veloce.

Per saperne di più su [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync
Spend-before-sync è una nuova funzionalità implementata in Zcash Mobile Wallet SDK V2, che consente agli utenti di spendere istantaneamente i fondi all'apertura del portafoglio, senza dover attendere una sincronizzazione completa. Questa funzione accelera la scoperta del saldo spendibile del portafoglio e migliora l'esperienza utente.

Spend-before-sync funziona usando un algoritmo di sincronizzazione a blocchi compatti che elabora i blocchi dal server lightwalletd in ordine non lineare. Ciò significa che invece di aspettare che un blocco venga elaborato prima di passare al successivo, i portafogli possono ora usare un po' più di memoria e potenza di calcolo per scansionare diverse sezioni della blockchain. Di solito esegue la scansione in intervalli diversi, cercando transazioni più recenti mentre i blocchi più vecchi vengono scaricati ed elaborati. Se viene scoperta una nota recente e non spesa, questa viene resa immediatamente disponibile.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync
Sviluppato dal team Zecwallet, Blaze Sync è un algoritmo di sincronizzazione per portafogli leggeri che inizia la scansione della blockchain "all'indietro", partendo dal blocco più alto e più recente e procedendo da lì a ritroso.

Questo permette al portafoglio di trovare le note spese prima di quelle ricevute, rendendo disponibili quelle già non spese, senza aspettare il completamento dell'intero processo di sincronizzazione.

Inoltre, utilizza la sincronizzazione fuori ordine (Out of Order Sync), separando "i componenti della sincronizzazione l'uno dall'altro - Scaricamento dei blocchi, decrittazioni di prova, aggiornamento dei witness", ed elaborandoli in parallelo, utilizzando un po' più di memoria e risorse della CPU, ma aumentando la velocità di sincronizzazione di 5 volte.

### DAGSync

DAGSync è un algoritmo di sincronizzazione proposto che mira a migliorare l'esperienza utente dei portafogli schermati Zcash, rendendo la sincronizzazione più veloce.

Si basa sull'[idea di utilizzare un grafo aciclico diretto (Directed Acyclic Graph)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG) per rappresentare le dipendenze tra note, witness e nullifier in un portafoglio Zcash.

Un DAG è una struttura dati composta da nodi e archi, dove ogni arco ha una direzione che indica una relazione tra due nodi. Un DAG non ha cicli, il che significa che non esiste un percorso per partire da un nodo e seguire gli archi per tornare allo stesso nodo.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

---

È interessante notare che tutti questi meccanismi cercano di rispondere alle questioni sollevate da Zcash Security nel suo post sulla [Messaggistica privata scalabile](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e il suo rapporto con i sistemi di pagamento privati. Alcuni fanno addirittura il passo ulteriore di scaricare tutti i dati dei memo dai server, tranne quelli esclusivi di un indirizzo, aumentando la privacy a costo di un po' di risorse extra.

Inoltre, la Zcash Foundation sta valutando altre alternative per migliorare le prestazioni dei portafogli leggeri. È il caso del [Recupero dei messaggi oblivious (OMR](https://zfnd.org/oblivious-message-retrieval/)), una costruzione che la fondazione sta studiando "per determinare se offra una potenziale soluzione ai recenti problemi di prestazioni che hanno colpito gli utenti dei portafogli Zcash".
