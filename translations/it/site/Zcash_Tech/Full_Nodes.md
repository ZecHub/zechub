<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodi Completi

Un Nodo Completo è un software che esegue una copia completa della blockchain di qualsiasi criptovaluta, dando accesso alle funzionalità del protocollo.

Detiene una registrazione completa di ogni transazione avvenuta dalla genesi ed è quindi in grado di verificare la validità di nuove transazioni e blocchi che vengono aggiunti alla blockchain.

## Zcashd

Zcashd è attualmente la principale implementazione di Nodo Completo utilizzata da Zcash, sviluppata e mantenuta dalla Electric Coin Company.

Zcashd espone un insieme di API tramite la sua interfaccia RPC. Queste API forniscono funzioni che permettono alle applicazioni esterne di interagire con il nodo.

[Lightwalletd](https://github.com/zcash/lightwalletd) è un esempio di applicazione che utilizza un nodo completo per consentire agli sviluppatori di creare e mantenere wallet leggeri schermati adatti a dispositivi mobili, senza dover interagire direttamente con Zcashd.

[Elenco completo dei comandi RPC supportati](https://zcash.github.io/rpc/)

[Il Libro di Zcashd](https://zcash.github.io/zcash/)


### Avviare un Nodo (Linux)

- Installa le Dipendenze 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clona l'ultima release, posizionati nella directory, configura e compila:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizza la Blockchain (potrebbe richiedere diverse ore)

    Per avviare il nodo esegui:

      ./src/zcashd

- Le Chiavi Private sono memorizzate in ~/.zcash/wallet.dat

[Guida per Zcashd su Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra è un'implementazione indipendente di nodo completo per il Protocollo Zcash, creata dalla Zcash Foundation. 

Attualmente è in fase di test ed è ancora sperimentale.

Ci sono due componenti principali di Zebra. La componente client che è responsabile della scansione della blockchain e della decrittazione di prova delle transazioni. 

La seconda parte è lo strumento a riga di comando zebra. Questo strumento gestisce le chiavi di spesa, gli indirizzi e comunica con la componente Client in zebrad per fornire funzionalità di wallet di base.

Chiunque sia interessato a provare Zebra per minare blocchi è invitato a unirsi al server Discord R&D. Inoltre, assicurati di leggere il libro Zebra per le istruzioni di configurazione. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Il Libro Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## La Rete

Eseguendo un nodo completo contribuisci a rafforzare la rete Zcash supportandone la decentralizzazione. 

Questo aiuta a prevenire il controllo avversario e a mantenere la rete resiliente ad alcune forme di interruzione.

I DNS seeders espongono un elenco di altri nodi affidabili tramite un server integrato. Ciò consente alle transazioni di propagarsi attraverso la rete. 

### Statistiche di Rete

Questi sono esempi di piattaforme che permettono l'accesso ai dati della Rete Zcash:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Puoi anche contribuire allo sviluppo della rete eseguendo test o proponendo nuovi miglioramenti e fornendo metriche. 



### Mining

I miner richiedono nodi completi per accedere a tutti gli RPC relativi al mining, come getblocktemplate e getmininginfo. 

Zcashd abilita anche il mining verso coinbase schermati. I miner e i pool di mining hanno l'opzione di minare direttamente per accumulare ZEC schermato in un indirizzo z per impostazione predefinita. 

Leggi la [Guida al Mining](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) o unisciti alla pagina del Forum della Comunità per [I Miner di Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacy 

Eseguire un nodo completo ti permette di verificare in modo indipendente tutte le transazioni e i blocchi sulla rete Zcash.

Eseguire un nodo completo evita alcuni rischi per la privacy associati all'utilizzo di servizi di terze parti per verificare le transazioni per tuo conto.

Usare il tuo nodo permette anche di connettersi alla rete tramite [Tor](https://zcash.github.io/zcash/user/tor.html).
Questo ha il vantaggio aggiuntivo di consentire ad altri utenti di connettersi privatamente all'indirizzo .onion del tuo nodo.


**Hai bisogno di aiuto?**

Leggi la [Documentazione di Supporto](https://zcash.readthedocs.io/en/latest/)

Unisciti al nostro [Server Discord](https://discord.gg/zcash) o contattaci su [twitter](https://twitter.com/ZecHub)

---

**Protected terms (keep in English):** `Zaino` `Zallet`
