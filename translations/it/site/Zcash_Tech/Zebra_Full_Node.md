<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Introduzione a Zebra Node

Presentiamo Zebra: rivoluzionare l'infrastruttura dei nodi Zcash con Rust

Ecco Zebra, un risultato rivoluzionario come primo nodo Zcash realizzato interamente in Rust. Integrato perfettamente nella rete peer-to-peer di Zcash, Zebra serve come strumento fondamentale per rafforzare la resilienza della rete. Attraverso le sue funzioni principali di validazione e trasmissione delle transazioni, e mantenendo meticolosamente lo stato della blockchain Zcash, Zebra contribuisce a un'infrastruttura di rete più decentralizzata.

## Vantaggi rispetto all'implementazione del nodo Zcashd
A differenza del nodo Zcash originale, zcashd, che trae le sue origini dal codebase fondamentale di Bitcoin ed è sviluppato dall'Electric Coin Company, la nostra implementazione si presenta come un'entità autonoma. Sviluppato da zero con un focus su sicurezza ed efficienza, Zebra sfrutta la potenza del linguaggio Rust, che offre sicurezza della memoria.

Nonostante le loro origini distinte, sia zcashd che Zebra aderiscono allo stesso protocollo, facilitando una comunicazione e interoperabilità senza soluzione di continuità tra loro. Questa innovazione non solo espande l'ecosistema Zcash ma stabilisce anche un nuovo standard per lo sviluppo di nodi blockchain.

## Istruzioni per Zebra Launcher

Puoi eseguire Zebra usando la nostra immagine Docker o puoi compilarlo manualmente. Consulta la sezione Requisiti di sistema.

### Utilizzo con Docker:

Per eseguire senza sforzo la nostra ultima release e sincronizzarla fino alla punta, esegui il seguente comando:

```

docker run zfnd/zebra:latest

```

Per istruzioni più complete e approfondimenti dettagliati, consulta la nostra [documentazione Docker](https://zebra.zfnd.org/user/docker.html).

### Compilare Zebra:

Compilare Zebra richiede Rust, libclang e un compilatore C++.

- Assicurati di avere installata l'ultima versione stabile di Rust, poiché Zebra viene testato esclusivamente con essa.
- Le dipendenze di compilazione necessarie includono:
  - libclang (noto anche come libclang-dev o llvm-dev)
  - clang o un altro compilatore C++ (come g++ per tutte le piattaforme o Xcode per macOS)
  - protoc (compilatore Protocol Buffers) con il flag *--experimental_allow_proto3_optional*, introdotto in Protocol Buffers v3.12.0 (rilasciato il 16 maggio 2020).



### Dipendenze su Arch:

Dopo aver verificato che le dipendenze siano soddisfatte, procedi con la compilazione e l'installazione di Zebra usando il seguente comando:

```

cargo install --locked zebrad

```

Avvia Zebra eseguendo:

```
zebrad start

```


## Configurazioni e funzionalità opzionali:


### - Inizializzare il file di configurazione:

  - Genera un file di configurazione usando il comando:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Il file *zebrad.toml* generato verrà posizionato nella directory predefinita delle preferenze di Linux. Per le posizioni predefinite alternative in altri sistemi operativi, consulta la nostra documentazione.



### - Configurare le barre di avanzamento:

  - Configura *tracing.progress_bar* nel tuo *zebrad.toml* per visualizzare metriche cruciali nel terminale usando barre di avanzamento. Nota: è presente un problema noto per cui le stime delle barre di avanzamento possono diventare estremamente grandi.



### - Configurare il mining:

  - Zebra può essere adattato per il mining specificando un *MINER_ADDRESS* e una mappatura delle porte in Docker. Ulteriori dettagli sono disponibili nella nostra [documentazione sul supporto al mining](https://zebra.zfnd.org/user/mining-docker.html).


### - Funzionalità di compilazione personalizzate:

  - Estendi le funzionalità di Zebra con ulteriori caratteristiche Cargo come metriche Prometheus, monitoraggio Sentry, supporto sperimentale Elasticsearch e altro.

  - Combina più funzionalità elencandole come parametri del flag `--features` durante l'installazione.


### Nota: alcune funzionalità di debugging e monitoraggio sono disabilitate nelle build di release per ottimizzare le prestazioni.

Per un elenco completo delle funzionalità sperimentali e per sviluppatori, consulta la nostra [documentazione API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Requisiti di sistema e configurazione di rete per Zebra

Per garantire prestazioni e affidabilità ottimali, raccomandiamo i seguenti requisiti di sistema per compilare ed eseguire zebrad, il rivoluzionario nodo Zcash costruito interamente in Rust:

### Requisiti di sistema:
- CPU: 4 core CPU
- RAM: 16 GB
- Spazio su disco: 300 GB di spazio disponibile per compilare i binari e memorizzare lo stato della catena in cache
- Rete: connessione di rete a 100 Mbps con un minimo di 300 GB di upload e download al mese


Tieni presente che la suite di test di Zebra può richiedere più di un'ora per essere completata a seconda delle specifiche della tua macchina. Sistemi più lenti potrebbero essere in grado di compilare ed eseguire Zebra, ma non abbiamo ancora stabilito limiti di prestazione precisi attraverso i test.


### Requisiti di spazio su disco:
- Zebra utilizza circa 300 GB per i dati della Mainnet in cache e 10 GB per i dati della Testnet in cache. Si prevede che l'uso del disco aumenterà nel tempo.
- Il database viene regolarmente ripulito, specialmente durante gli arresti o i riavvii, garantendo l'integrità dei dati. Le modifiche incomplete dovute a terminazioni forzate o panici vengono annullate al riavvio di Zebra.


### Requisiti di rete e porte:
- Zebra utilizza le seguenti porte TCP per connessioni in entrata e in uscita:
  - 8233 per Mainnet
  - 18233 per Testnet
- Configurare Zebra con un listen_addr specifico consente di annunciare questo indirizzo per le connessioni in entrata. Mentre le connessioni in uscita sono essenziali per la sincronizzazione, quelle in entrata sono opzionali.
- L'accesso ai DNS seeders di Zcash è necessario tramite il resolver DNS del sistema operativo (in genere la porta 53).
- Sebbene Zebra possa stabilire connessioni in uscita su qualsiasi porta, zcashd preferisce peer sulle porte predefinite per mitigare attacchi DDoS su altre reti.


### Utilizzo tipico della rete Mainnet:
- Sincronizzazione iniziale: è necessario un download di 300 GB per la sincronizzazione iniziale, con una crescita prevista nei download successivi.
- Aggiornamenti continui: aspettati upload e download giornalieri che vanno da 10 MB a 10 GB, a seconda delle dimensioni delle transazioni degli utenti e delle richieste dei peer.
- Zebra avvia una sincronizzazione iniziale ad ogni cambiamento della versione interna del database, il che potrebbe richiedere il download completo della catena durante gli aggiornamenti di versione.
- Sono preferiti peer con una latenza di andata e ritorno di 2 secondi o meno. Se la latenza supera questa soglia, invia un ticket per assistenza.


Seguendo queste raccomandazioni e configurazioni, puoi massimizzare l'efficienza e l'efficacia di Zebra all'interno della rete Zcash. In caso di problemi o per ulteriore assistenza, il nostro team di supporto è prontamente disponibile per fornirti indicazioni.


Ecco il link alla guida all'installazione di Zebra Node:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
