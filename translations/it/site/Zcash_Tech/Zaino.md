# Zaino Indexer

Zaino è un indexer Rust per la blockchain Zcash. Legge i dati della catena da un nodo completo Zebra e fornisce i dati necessari a wallet, explorer, faucet e altri servizi, senza rendere Zebra stesso responsabile di ogni indice rivolto ai client.

## In breve

* **Zebra** convalida la catena Zcash.
* **Zaino** indicizza i dati della catena di Zebra ed espone API rivolte ai client.
* **Zallet** è il componente wallet nello stack Z3. Nella configurazione predefinita di Z3, Zallet comunica direttamente con Zebra e non richiede il servizio autonomo Zaino.
* Il servizio autonomo Zaino è utile quando gli operatori necessitano di un endpoint gRPC compatibile con lightwalletd, di un proxy JSON-RPC o di infrastruttura per wallet leggeri, explorer, faucet e servizi simili.
* Zaino è un'infrastruttura attiva, ma gli operatori dovrebbero consultare la documentazione ufficiale di Zaino e Z3 per i dettagli di deployment aggiornati prima di eseguirlo in produzione.

## Cosa fa Zaino

Zaino si colloca tra Zebra e il software client. Zebra è il nodo di consenso: scarica, verifica e segue la blockchain Zcash. Zaino usa Zebra come fonte dei dati della catena, quindi prepara viste indicizzate che le applicazioni client possono interrogare in modo efficiente.

Questa separazione mantiene chiari i ruoli:

| Componente | Ruolo |
|:--|:--|
| Zebra | Nodo completo e validatore |
| Zaino | Indexer e servizio API rivolto ai client |
| Zallet | Servizio wallet |
| lightwalletd | Server wallet leggero meno recente che Zaino è progettato per sostituire o integrare |

Zaino fornisce funzionalità per client leggeri, client completi o wallet e block explorer. Offre accesso alla catena finalizzata, alla migliore catena non finalizzata e ai dati del mempool detenuti da Zebra.

## Come si integra nell'attuale stack Zcash

L'attuale stack Z3 è costruito attorno a Zebra, Zallet e all'opzionale Zaino.

Nel deployment predefinito di Z3, Zebra e Zallet vengono eseguiti insieme. Zallet raggiunge direttamente Zebra, quindi un operatore che esegue solo uno stack wallet locale non deve avviare il servizio autonomo Zaino.

Zaino viene aggiunto quando l'operatore vuole servire client esterni. In Z3, viene eseguito dietro il profilo Compose `indexer` e aggiunge:

* un endpoint gRPC compatibile con lightwalletd per client wallet leggeri
* un proxy JSON-RPC per explorer, faucet e backend di servizi
* un database indexer separato dallo stato della catena di Zebra

Questo rende Zaino particolarmente rilevante per backend wallet, operatori di infrastrutture pubbliche, explorer, faucet e sviluppatori che testano servizi che necessitano di dati indicizzati della catena Zcash.

## Zaino e lightwalletd

lightwalletd è il server wallet leggero originale. Zaino è il percorso successore basato su Rust per questo ruolo. Il suo obiettivo è fornire API compatibili dove possibile, affinché wallet e servizi possano migrare senza dover essere riscritti completamente in una sola volta.

Ciò non significa che ogni deployment lightwalletd sia già passato a Zaino. Gli operatori dovrebbero considerare Zaino come parte dell'attuale stack basato su Zebra e consultare la documentazione più recente del progetto, le release e le dashboard dei servizi prima di scegliere cosa eseguire.

## Note per gli operatori

Il percorso di deployment autorevole più semplice è il repository Z3. Z3 include Zaino come servizio opzionale:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Eseguite prima la normale configurazione Z3 e attendete che Zebra si sincronizzi prima di avviare servizi dipendenti su mainnet o testnet.

Zaino espone due tipi di servizio di rete. Il servizio gRPC è l'API rivolta ai wallet leggeri. Il servizio JSON-RPC è destinato al loopback o a reti private attendibili, a meno che un livello esterno non fornisca protezione. Non esponete a internet un endpoint JSON-RPC non autenticato o non cifrato.

## Alcuni diagrammi che mostrano come funziona Zaino

### Architettura interna di Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architettura del servizio live di Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Architettura di sistema di Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Errori comuni

**Considerare Zaino come un nodo completo.** Zaino non è il validatore. Zebra convalida la catena; Zaino indicizza i dati da Zebra.

**Supporre che ogni deployment Z3 necessiti di Zaino autonomo.** Zallet può raggiungere direttamente Zebra nello stack Z3 predefinito. Avviate Zaino quando avete bisogno del servizio indexer autonomo per client esterni.

**Presentare funzionalità pianificate come già implementate.** Zaino è in sviluppo attivo, quindi consultate le note di rilascio e la documentazione correnti prima di descrivere una funzionalità come disponibile.

**Esporre JSON-RPC con leggerezza.** L'interfaccia JSON-RPC di Zaino è destinata al loopback o a reti private attendibili, salvo protezione da parte di un altro livello.

## Dove posso saperne di più?

* [Repository GitHub di Zaino](https://github.com/zingolabs/zaino)
* [Release di Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentazione generata di Zaino](https://zingolabs.github.io/zaino/)
* [Repository di deployment Z3](https://github.com/ZcashFoundation/z3)
* [Documentazione di Zebra](https://zebra.zfnd.org/)
* [Discussione sulla sovvenzione e sul progetto Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Ultimo aggiornamento:** agosto 2026
