# I Full Node

Un Full Node (Nodo completo) è un software che esegue una copia completa della blockchain di qualsiasi criptovaluta dando accesso alle funzionalità dei protocolli.

Tiene un registro completo di ogni transazione avvenuta dalla genesi ed è quindi in grado di verificare la validità di nuove transazioni e blocchi che vengono aggiunti alla blockchain.

## Zcashd

Attualmente, Zcashd è l'implementazione principale del Full Node utilizzata da Zcash, sviluppata e mantenuta dalla Electric Coin Company.

Zcashd espone un insieme di API attraverso la sua interfaccia RPC. Queste API forniscono funzioni che consentono ad applicazioni esterne di interagire con il nodo.

Lightwalletd è un esempio di applicazione che utilizza un full node per consentire agli sviluppatori di creare e mantenere portafogli leggeri shielded friendly per dispositivi mobili, senza dover interagire direttamente con Zcashd.

[Lista completa](https://zcash.github.io/rpc/)

[Il manuale di Zcashd](https://zcash.github.io/zcash/)


### Avvia un Nodo (Linux)

- Installa le dipendenze 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clona l'ultima versione rilasciata, esegui il checkout, il setup e la build:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizza la Blockchain (può durare diverse ore)

    Per avviare il nodo esegui:

      ./src/zcashd

- Le chiavi private sono memorizzate in ~/.zcash/wallet.dat

[Guida per Zcashd su Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra è un'implementazione indipendente del full node per il Protocollo Zcash creata dalla Zcash Foundation.

Attualmente è in fase di test ed è ancora sperimentale.

Ci sono due componenti principali di Zebra. Il componente client, responsabile della scansione della blockchain e della decodifica di prova delle transazioni.

La seconda parte è lo strumento a riga di comando di Zebra. Questo strumento gestisce le chiavi di spesa, gli indirizzi e comunica con il componente Client in zebrad per fornire funzionalità di portafoglio di base.

Chiunque sia interessato a provare Zebra per il mining di blocchi è invitato a unirsi al server Discord R&D. Assicurati anche di leggere il manuale di Zebra per le istruzioni di configurazione.

[Github](https://github.com/ZcashFoundation/zebra/)

[Il manuale di Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Il Network

Utilizzando un full node, stai contribuendo a rafforzare la rete Zcash supportando la sua decentralizzazione.

Ciò aiuta a prevenire il controllo da parte di un attaccante e a mantenere la rete resiliente ad alcune forme di interruzione.

I seeder DNS espongono un elenco di altri nodi affidabili tramite un server integrato. Ciò consente alle transazioni di propagarsi in tutta la rete. 

### Statistiche del Network

Questi sono gli esempi di piattaforme che consentono l'accesso ai dati del Network di Zcash:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

È possibile contribuire anche allo sviluppo della rete eseguendo test o proponendo nuovi miglioramenti e fornendo metriche. 



### Mining

Ai miners è richiesto un full node per accedere a tutte le rpc (Remote Procedure Call) relative al mining, come getblocktemplate e getmininginfo.

Zcashd consente anche il mining per il coinbase shielded. I minatori e i pool di mining hanno l'opzione di effettuare il mining direttamente per accumulare ZEC shermato in un indirizzo z di default.

Leggi [Guida al Mining](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) od entra nel forum della comunità per i [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Privacy 

Eseguire un full node ti consente di verificare in modo indipendente tutte le transazioni e i blocchi sulla rete Zcash.

Eseguire un full node evita alcuni rischi per la privacy associati all'uso di servizi di terze parti per verificare le transazioni per tuo conto.

L'utilizzo del proprio nodo consente inoltre di connettersi alla rete tramite [Tor](https://zcash.github.io/zcash/user/tor.html).
Ciò ha un vantaggio aggiuntivo che consente ad altri utenti di connettersi in modo privato all'indirizzo .onion del tuo nodo.

**Hai bisogno di aiuto?**

Leggi [Documentazione di supporto](https://zcash.readthedocs.io/en/latest/)

Entra nel nostro [Sever Discord](https://discord.gg/zcash) o seguici su [twitter](https://twitter.com/ZecHub)