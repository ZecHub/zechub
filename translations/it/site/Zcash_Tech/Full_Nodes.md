<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodi completi

## In breve

- Un nodo completo conserva una copia completa della blockchain di Zcash e verifica ogni nuovo blocco e transazione rispetto alle regole di consenso.
- Zebra (`zebrad`) è il nodo da installare oggi. Zakura è una seconda implementazione, fork di Zebra.
- zcashd è ritirato. L'arresto di fine supporto è stato raggiunto il 18 luglio 2026 all'altezza del blocco 3417100 e tali nodi non si avviano più.
- Il nodo e il wallet sono ora programmi separati. [Zallet](https://github.com/zcash/zallet) viene eseguito con un nodo e conserva le chiavi.
- Gestire il proprio nodo consente una verifica indipendente ed elimina la necessità di fidarsi del server di qualcun altro.

## Spiegazione principale

Un nodo completo è un software che esegue una copia completa della blockchain di una criptovaluta, fornendoti accesso alle funzionalità del protocollo.

Conserva un registro completo di ogni transazione avvenuta dal genesis ed è quindi in grado di verificare la validità delle nuove transazioni e dei blocchi aggiunti alla blockchain.

## Implementazioni di nodi

### Zebra

Zebra è un'implementazione indipendente e pronta per la produzione di un nodo completo del protocollo Zcash, creata dalla Zcash Foundation e scritta in Rust. Poiché zcashd è ritirato, Zebra (`zebrad`) è il nodo completo consigliato per le nuove installazioni.

Zebra convalida blocchi e transazioni, partecipa alla rete peer-to-peer ed espone un'interfaccia RPC per le applicazioni. Il wallet è ora un componente separato: [Zallet](https://github.com/zcash/zallet) viene eseguito con un nodo Zebra e gestisce chiavi e saldi. Questo sostituisce zcashd, che riuniva nodo e wallet in un unico processo.

Per servire i light wallet schermati, il nodo viene eseguito insieme a un indicizzatore, ovvero il consolidato [lightwalletd](https://github.com/zcash/lightwalletd) oppure il più recente [Zaino](https://zechub.wiki/zcash-tech/zaino).

Assicurati di leggere il libro di Zebra per le istruzioni di configurazione e unisciti al server R&D Discord per ricevere supporto.

[Github](https://github.com/ZcashFoundation/zebra/)

[Il libro di Zebra](https://zebra.zfnd.org)

Consulta [Zebra Nodo completo](/zcash-tech/zebra-full-node) per i passaggi di installazione, la configurazione e i requisiti hardware.

### Zakura

Zakura è un secondo nodo completo compatibile con il consenso, fork di Zebra e sviluppato da Valar Group insieme a Project Tachyon. Segue le stesse regole del protocollo e aggiunge sincronizzazione più rapida, pruning dei blocchi e un livello di compatibilità RPC zcashd. Consulta [Zakura Nodo](/zcash-tech/zakura-node).

### zcashd (ritirato)

> **Nota:** zcashd è stato ritirato. La Electric Coin Company [ha annunciato la deprecazione](https://z.cash/support/zcashd-deprecation/) e l'arresto automatico di fine supporto è stato raggiunto il 18 luglio 2026 all'altezza del blocco 3417100. Ogni nodo zcashd 6.20.0 non modificato si è arrestato a tale altezza e rifiuta di riavviarsi, e il software non supporta NU6.3. Usa Zebra. Se possiedi un zcashd `wallet.dat`, segui la [Guida alla migrazione: zcashd a Zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd era l'implementazione originale di nodo completo per Zcash, sviluppata e mantenuta dalla Electric Coin Company. Le istruzioni di compilazione riportate sotto sono conservate come riferimento e per gli operatori che migrano da zcashd.

Zcashd espone un insieme di API tramite la sua interfaccia RPC. Queste API forniscono funzioni che consentono alle applicazioni esterne di interagire con il nodo.

[Lightwalletd](https://github.com/zcash/lightwalletd) è un esempio di applicazione che utilizza un nodo completo per consentire agli sviluppatori di creare e mantenere light wallet schermati adatti ai dispositivi mobili senza dover interagire direttamente con Zcashd.

[Elenco completo dei comandi RPC supportati](https://zcash.github.io/rpc/)

[Il libro di Zcashd](https://zcash.github.io/zcash/)

#### Avviare un nodo (Linux)

- Installare le dipendenze

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clonare l'ultima release, effettuare il checkout, configurare e compilare:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizzare la blockchain (potrebbe richiedere diverse ore)

    Per avviare il nodo, esegui:

      ./src/zcashd

- Le chiavi private sono memorizzate in ~/.zcash/wallet.dat

[Guida a Zcashd su Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implicazioni pratiche

### La rete

Eseguendo un nodo completo, contribuisci a rafforzare la rete zcash sostenendone la decentralizzazione.

Ciò aiuta a prevenire il controllo ostile e a mantenere la rete resiliente ad alcune forme di interruzione.

I seed DNS espongono un elenco di altri nodi affidabili tramite un server integrato. Ciò consente alle transazioni di propagarsi nell'intera rete.

### Statistiche della rete

Queste sono piattaforme di esempio che consentono l'accesso ai dati della rete Zcash:

[Zcash Esploratore di blocchi](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Puoi anche contribuire allo sviluppo della rete eseguendo test o proponendo nuovi miglioramenti e fornendo metriche.

### Mining

I miner richiedono nodi completi per accedere a tutte le RPC relative al mining, come getblocktemplate e getmininginfo.

Zcashd abilita anche il mining verso coinbase schermati. I miner e i pool di mining hanno la possibilità di minare direttamente per accumulare ZEC schermati in un indirizzo z per impostazione predefinita.

Leggi [La guida al mining](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) oppure unisciti alla pagina del Community Forum per i [Zcash miner](https://forum.zcashcommunity.com/c/mining/13).

### Privacy

Eseguire un nodo completo ti consente di verificare in modo indipendente tutte le transazioni e i blocchi sulla rete Zcash.

Eseguire un nodo completo evita alcuni rischi per la privacy associati all'uso di servizi di terze parti per verificare le transazioni per tuo conto.

L'uso del proprio nodo consente inoltre di collegarsi alla rete tramite [Tor](https://zcash.github.io/zcash/user/tor.html).
Ciò offre l'ulteriore vantaggio di consentire ad altri utenti di collegarsi privatamente all'indirizzo .onion del tuo nodo.

## Errori comuni

- Compilare zcashd seguendo le istruzioni sopra e aspettarsi un nodo funzionante. Tali binari si arrestano all'altezza di deprecazione.
- Eseguire un nodo e presumere che il tuo wallet mobile ora lo utilizzi. Un light wallet continua a comunicare con qualunque server sia configurato finché non lo indirizzi al tuo. Consulta [Nodi Lightwallet](/zcash-tech/lightwallet-nodes).
- Eseguire solo `zebrad` e aspettarsi che i light wallet si connettano. Il nodo necessita di un indicizzatore accanto, lightwalletd oppure [Zaino](/zcash-tech/zaino).
- Cercare RPC del wallet sul nodo. Chiavi e saldi sono stati spostati in Zallet.

## Pagine correlate

- [Zebra Nodo completo](/zcash-tech/zebra-full-node) - installa, configura ed esegui il nodo consigliato
- [Zakura Nodo](/zcash-tech/zakura-node) - la seconda implementazione di nodo, fork di Zebra
- [Nodi Lightwallet](/zcash-tech/lightwallet-nodes) - i server interrogati dai light wallet
- [Zaino](/zcash-tech/zaino) - l'indicizzatore Rust che serve i light wallet
- [Zcash Sincronizzazione del wallet](/zcash-tech/zcash-wallet-syncing) - perché la sincronizzazione funziona in questo modo

## Per approfondire

Leggi [Documentazione di supporto](https://zcash.readthedocs.io/en/latest/)

Unisciti al nostro [Discord Server](https://discord.gg/zcash) oppure contattaci su [X](https://X.com/ZecHub)
