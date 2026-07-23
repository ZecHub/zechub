---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Nodi completi

Un Full Node è un software che esegue una copia completa della blockchain di una criptovaluta, fornendo accesso alle funzionalità del protocollo.

Conserva una registrazione completa di ogni transazione avvenuta sin dal genesis e pertanto è in grado di verificare la validità delle nuove transazioni e dei blocchi aggiunti alla blockchain.

## Zcashd

> **Nota:** zcashd è in fase di dismissione. Electric Coin Company ha [annunciato formalmente](https://z.cash/support/zcashd-deprecation/) che zcashd viene ritirato, con il suo ruolo di full node sostituito da [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) e il suo ruolo di wallet da [Zallet](https://github.com/zcash/zallet). Per nuove installazioni, usa Zebra (vedi sotto). Se stai già eseguendo un nodo zcashd, segui la [Guida alla migrazione: da zcashd a Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd era l'implementazione originale di Full Node per Zcash, sviluppata e mantenuta da Electric Coin Company. Le istruzioni di build qui sotto sono mantenute come riferimento e per gli operatori che stanno migrando da zcashd.

Zcashd espone un insieme di API tramite la sua interfaccia RPC. Queste API forniscono funzioni che consentono alle applicazioni esterne di interagire con il nodo.

[Lightwalletd](https://github.com/zcash/lightwalletd) è un esempio di applicazione che utilizza un full node per consentire agli sviluppatori di creare e mantenere wallet leggeri shielded adatti ai dispositivi mobili senza dover interagire direttamente con Zcashd.

[Elenco completo dei comandi RPC supportati](https://zcash.github.io/rpc/)

[Il libro di Zcashd](https://zcash.github.io/zcash/)


### Avviare un nodo (Linux)

- Installa le dipendenze 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clona l'ultima release, fai checkout, configura e compila:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizza la blockchain (potrebbero essere necessarie diverse ore)

    Per avviare il nodo esegui:

      ./src/zcashd

- Le chiavi private sono conservate in ~/.zcash/wallet.dat

[Guida a Zcashd su Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra è un'implementazione indipendente di full node del protocollo Zcash, pronta per la produzione, creata da Zcash Foundation e scritta in Rust. Con il ritiro di zcashd, Zebra (`zebrad`) è il full node consigliato per le nuove installazioni.

Zebra valida blocchi e transazioni, partecipa alla rete peer-to-peer ed espone un'interfaccia RPC per le applicazioni. Il wallet ora è un componente separato: [Zallet](https://github.com/zcash/zallet) funziona insieme a un nodo Zebra e gestisce chiavi e saldi. Questo sostituisce zcashd, che raggruppava nodo e wallet in un unico processo.

Per servire wallet leggeri shielded, il nodo viene eseguito insieme a un indicizzatore, o il consolidato [lightwalletd](https://github.com/zcash/lightwalletd) oppure il più recente [Zaino](https://zechub.wiki/zaino).

Assicurati di leggere il libro di Zebra per le istruzioni di configurazione e di unirti al server Discord R&D per ricevere supporto. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Il libro di Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## La rete

Eseguendo un full node contribuisci a rafforzare la rete Zcash sostenendone la decentralizzazione. 

Questo aiuta a prevenire il controllo ostile e a mantenere la rete resiliente ad alcune forme di interruzione.

I DNS seeder espongono un elenco di altri nodi affidabili tramite un server integrato. Questo consente alle transazioni di propagarsi in tutta la rete. 

### Statistiche della rete

Queste sono piattaforme di esempio che consentono l'accesso ai dati della rete Zcash:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Puoi anche contribuire allo sviluppo della rete eseguendo test oppure proponendo nuovi miglioramenti e fornendo metriche. 



### Mining

I miner necessitano di full node per accedere a tutte le RPC relative al mining, come getblocktemplate e getmininginfo. 

Zcashd consente anche il mining verso coinbase shielded. I miner e i mining pool hanno la possibilità di minare direttamente per accumulare ZEC shielded in uno z-address per impostazione predefinita. 

Leggi la [Guida al mining](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) oppure unisciti alla pagina del forum della community per i [Miner di Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacy 

Eseguire un full node ti consente di verificare in modo indipendente tutte le transazioni e tutti i blocchi sulla rete Zcash.

Eseguire un full node evita alcuni rischi per la privacy associati all'uso di servizi di terze parti per verificare le transazioni per tuo conto.

Usare il tuo nodo consente anche di connettersi alla rete tramite [Tor](https://zcash.github.io/zcash/user/tor.html).
Questo offre l'ulteriore vantaggio di permettere ad altri utenti di connettersi privatamente all'indirizzo .onion del tuo nodo.


**Hai bisogno di aiuto?**

Leggi la [Documentazione di supporto](https://zcash.readthedocs.io/en/latest/)

Unisciti al nostro [server Discord](https://discord.gg/zcash) oppure contattaci su [twitter](https://twitter.com/ZecHub)
