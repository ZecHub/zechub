<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Nodo completo

## In breve

- Zebra (`zebrad`) è il nodo completo di Zcash scritto in Rust e gestito dalla Zcash Foundation.
- Convalida blocchi e transazioni, conserva lo stato della catena e comunica con altri nodi attraverso la rete peer-to-peer.
- Zebra e zcashd implementavano lo stesso protocollo e potevano interoperare. Dal ritiro di zcashd, Zebra ricopre il ruolo di consenso.
- Due modi per eseguirlo: l'immagine Docker di `zfnd/zebra` oppure una compilazione dai sorgenti.
- L'hardware consigliato è composto da 4 core CPU, 16 GB di RAM e 300 GB di disco. Il minimo è di 2 core e 4 GB di RAM, con gli stessi 300 GB di disco.

## Spiegazione principale

Zebra è il primo nodo Zcash scritto interamente in Rust. Opera sulla rete peer-to-peer di Zcash, dove convalida e trasmette transazioni e conserva lo stato della blockchain. Avere una seconda implementazione indipendente rende l'infrastruttura della rete meno dipendente da una singola codebase.

### Zebra e zcashd

Il nodo Zcash originale, zcashd, è stato sviluppato dalla Electric Coin Company a partire dalla codebase di Bitcoin. Zebra è stato scritto da zero in Rust, un linguaggio sicuro per la memoria, con particolare attenzione alla sicurezza e all'efficienza.

Entrambe le implementazioni seguono lo stesso protocollo, quindi potevano comunicare e interoperare. zcashd ha raggiunto l'arresto di fine supporto il 18 luglio 2026 e non si avvia più, lasciando Zebra e Zakura come implementazioni di nodo in uso. Per un quadro più ampio, consulta [Nodi completi](/zcash-tech/full-nodes).

## Eseguire Zebra

Puoi eseguire Zebra utilizzando l'immagine Docker oppure compilarlo manualmente. Consulta la sezione Requisiti di sistema.

### Utilizzo di Docker

Per eseguire l'ultima versione e sincronizzarla con la punta della catena, esegui il comando seguente:

```

docker run zfnd/zebra:latest

```

Per istruzioni complete, consulta la [documentazione Docker](https://zebra.zfnd.org/user/docker.html).

### Compilare Zebra

La compilazione di Zebra richiede Rust, libclang e un compilatore C++.

- Assicurati di avere installata l'ultima versione stabile di Rust, poiché Zebra viene testato esclusivamente con essa.
- Le dipendenze di compilazione necessarie includono:
  - libclang (noto anche come libclang-dev o llvm-dev)
  - clang o un altro compilatore C++ (come g++ per tutte le piattaforme oppure Xcode per macOS)
  - protoc (compilatore Protocol Buffers) con il flag *--experimental_allow_proto3_optional*, introdotto in Protocol Buffers v3.12.0 (rilasciato il 16 maggio 2020).

### Installare e avviare

Su Linux x86_64 o aarch64 con glibc 2.34 o successiva (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), puoi saltare le dipendenze di compilazione e installare un binario precompilato firmato:

```
cargo binstall zebrad
```

Gli stessi binari sono allegati a ogni release di GitHub come `zebrad-<version>-<target>.tar.gz`, ciascuno con checksum SHA-256, attestazione di provenienza della build Sigstore e firma Cosign. Sulle piattaforme più vecchie, utilizza l'immagine Docker o compila dai sorgenti.

Per compilare dai sorgenti, ottieni il codice e compila il binario di rilascio:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Avvia il nodo con:

```
target/release/zebrad start
```

Guida all'installazione: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Configurazioni e funzionalità opzionali

### Inizializzazione del file di configurazione

  - Genera un file di configurazione utilizzando il comando:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Il file *zebrad.toml* generato verrà collocato nella directory predefinita delle preferenze di Linux. Per le posizioni predefinite di altri sistemi operativi, consulta la documentazione.

### Configurazione delle barre di avanzamento

  - Configura *tracing.progress_bar* nel tuo *zebrad.toml* per visualizzare metriche chiave nel terminale tramite barre di avanzamento. Nota: esiste un problema noto per cui le stime delle barre di avanzamento possono diventare estremamente grandi.

### Configurazione del mining

  - Zebra può essere configurato per il mining specificando un *MINER_ADDRESS* e una mappatura delle porte in Docker. Ulteriori dettagli sono disponibili nella [documentazione sul supporto al mining](https://zebra.zfnd.org/user/mining-docker.html).

### Funzionalità di compilazione personalizzate

  - Estendi le funzionalità di Zebra con caratteristiche Cargo aggiuntive, quali metriche Prometheus, monitoraggio Sentry, supporto sperimentale per Elasticsearch e altro ancora.

  - Combina più caratteristiche elencandole come parametri del flag `--features` durante l'installazione.

  - Alcune funzionalità di debug e monitoraggio sono disabilitate nelle build di rilascio per ottimizzare le prestazioni. Per l'elenco completo delle funzionalità sperimentali e per sviluppatori, consulta la [documentazione API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Requisiti di sistema e configurazione della rete

### Requisiti consigliati

- CPU: 4 core CPU
- RAM: 16 GB
- Spazio su disco: 300 GB di spazio disponibile per compilare i binari e memorizzare lo stato della catena in cache
- Rete: connessione di rete da 100 Mbps con almeno 300 GB di upload e download al mese

### Requisiti minimi

- CPU: 2 core CPU
- RAM: 4 GB
- Spazio su disco: 300 GB di spazio disponibile su disco

La suite di test di Zebra può richiedere oltre un'ora per essere completata, a seconda delle specifiche della tua macchina. I sistemi più lenti possono compilare ed eseguire Zebra. I limiti precisi delle prestazioni non sono stati stabiliti mediante test.

### Requisiti di spazio su disco

- Zebra utilizza approssimativamente 300 GB per i dati Mainnet in cache e 10 GB per i dati Testnet in cache. Prevedi che l'utilizzo del disco aumenti nel tempo.
- Il database viene ripulito periodicamente, nonché all'arresto o al riavvio. Le modifiche vengono confermate utilizzando transazioni del database. Le modifiche incomplete causate da una terminazione forzata o da un panic vengono annullate al successivo avvio di Zebra.

### Requisiti di rete e porte

- Zebra utilizza le seguenti porte TCP per le connessioni in entrata e in uscita:
  - 8233 per Mainnet
  - 18233 per Testnet
- Configurare Zebra con uno specifico listen_addr pubblicizza questo indirizzo per le connessioni in entrata. Le connessioni in uscita sono necessarie per la sincronizzazione; quelle in entrata sono opzionali.
- È necessario accedere ai DNS seeder di Zcash tramite il resolver DNS del sistema operativo (in genere porta 53).
- Zebra può effettuare connessioni in uscita su qualsiasi porta. zcashd preferisce peer sulle porte predefinite per evitare di essere utilizzato per attacchi DDoS contro altre reti.

### Utilizzo tipico della rete Mainnet

- Sincronizzazione iniziale: per la sincronizzazione iniziale è necessario un download di 300 GB e si prevede che questa cifra cresca.
- Aggiornamenti continui: upload e download giornalieri compresi tra 10 MB e 10 GB, a seconda delle dimensioni delle transazioni degli utenti e delle richieste dei peer.
- Zebra avvia una sincronizzazione iniziale a ogni modifica della versione interna del database, il che può significare un download completo della catena durante gli aggiornamenti di versione.
- Sono preferiti peer con una latenza di andata e ritorno di 2 secondi o inferiore. Se la latenza supera questa soglia, apri un ticket nel repository Zebra.

## Errori comuni

- Dimensionare il disco in base alle esigenze di oggi. Lo stato Mainnet in cache è già vicino a 300 GB e continua a crescere.
- Aspettarsi RPC del wallet da `zebrad`. Chiavi e saldi risiedono in [Zallet](https://github.com/zcash/zallet), un programma separato.
- Eseguire solo `zebrad` e aspettarsi che i wallet leggeri si connettano. Questo percorso richiede un indicizzatore, lightwalletd oppure [Zaino](/zcash-tech/zaino).
- Considerare una risincronizzazione imprevista come un errore. Una modifica della versione del database ne attiva una per progettazione.

## Pagine correlate

- [Nodi completi](/zcash-tech/full-nodes) - cosa fa un nodo completo e quali implementazioni esistono
- [Zakura Nodo](/zcash-tech/zakura-node) - un nodo derivato da Zebra con sincronizzazione più rapida e pruning
- [Zaino](/zcash-tech/zaino) - l'indicizzatore Rust che serve i wallet leggeri
- [Nodi lightwallet](/zcash-tech/lightwallet-nodes) - i server interrogati dai wallet leggeri
- [Zcash Guida al mining](/using-zcash/zcash-mining-guide) - mining tramite il tuo nodo

## Per approfondire

- [Il libro di Zebra](https://zebra.zfnd.org)
- [Zebra su GitHub](https://github.com/ZcashFoundation/zebra/)
- [Requisiti di sistema](https://zebra.zfnd.org/user/requirements.html)
