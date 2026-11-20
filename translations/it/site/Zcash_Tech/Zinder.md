# Indicizzatore Zinder

Zinder è un indicizzatore Zcash self-hosted scritto in Rust e pubblicato dal Zcash Foundation. Legge la chain una sola volta da un full node Zebra o Zakura, ne memorizza una visione coerente e serve quella visione a più portafogli, applicazioni ed explorer allo stesso tempo. I light wallet esistenti possono raggiungerlo attraverso un adattatore compatibile con lightwalletd.

> **Zinder è in versione alpha.** Il suo stesso README dice che l'API nativa, la superficie di compatibilità con lightwalletd, i layout di archiviazione e la topologia di deployment cambieranno, e che una release con tag non è una garanzia di stabilità. Fissa versioni esatte e preparati a upgrade che rompono la compatibilità.

## In sintesi

* **Zebra** oppure **Zakura** valida la chain. **Zinder** indicizza ciò che il nodo ha e lo serve ai client.
* Due modi per entrarci: l'API gRPC `WalletQuery` di Zinder stessa, e un adattatore separato che parla il protocollo `CompactTxStreamer` di lightwalletd, così i portafogli costruiti per lightwalletd possono puntarci senza modifiche al codice.
* Ogni lettura è ancorata a uno stato della chain (un'"epoch"), quindi un batch di sincronizzazione non mescola mai dati provenienti da due punte della chain in competizione. Le chiavi e la scansione schermata restano nel portafoglio.
* È costruito per un solo gestore che esegue un solo nodo e serve molti consumatori. Gli endpoint pubblici vanno dietro TLS, autenticazione e limiti di frequenza tuoi.
* Le release arrivano in fretta (da 0.7.0 a 0.12.0 tra il 10 e il 14 novembre 2026) e diverse di esse hanno rotto la compatibilità. Leggi il changelog prima di ogni upgrade.

## Dove si colloca Zinder

I light wallet non parlano mai direttamente con un full node. Chiedono a un indicizzatore blocchi compatti, stati degli alberi e dati delle transazioni (vedi [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). L'ecosistema di Zcash dispone ora di diversi indicizzatori capaci di farlo:

| Indicizzatore | Linguaggio | Maintainer | Si connette a | Note |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | comunità ECC / Zcash | Zebra o zcashd | Il light wallet server originale |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra o zcashd | Profilo indicizzatore opzionale nello stack Z3 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | nodo Zakura integrato | Vedi il benchmark [Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 o Zakura 1.8.6 (archive node) | Alpha. API nativa più un adattatore lightwalletd e letture dell'explorer opzionali |

La documentazione di Zinder è diretta su quando è la scelta giusta: è più forte quando l'accesso alla chain deve sopravvivere al processo di un singolo portafoglio, servire più consumatori indipendenti, o restare separato dal codice di ogni singolo portafoglio. Per un unico portafoglio strettamente accoppiato un indicizzatore integrato può essere più semplice, e un consumatore che ha bisogno solo dei dati che il nodo possiede già può usare direttamente l'RPC di Zebra.

## Come è costruito

Zinder divide il lavoro in processi separati, ognuno con un solo compito:

| Runtime | Ruolo |
|:--|:--|
| `zinder-ingest` | L'unico scrittore dell'archivio canonico della chain (RocksDB). Segue il nodo, gestisce le riorganizzazioni, mantiene lo stato live della mempool |
| `zinder-projector` | L'unico scrittore dell'archivio del portafoglio. Costruisce e segue la vista della chain modellata sul portafoglio |
| `zinder-query` | Serve l'API gRPC nativa `WalletQuery` |
| `zinder-compat-lightwalletd` | Serve l'API `CompactTxStreamer` di lightwalletd sopra gli stessi dati |

Un piano explorer opzionale (`zinder-explorer` con `ExplorerQuery`) serve riassunti dei blocchi, dettagli delle transazioni, viste della mempool e ricerche, e un adattatore opzionale serve l'API REST e WebSocket dell'explorer CipherScan. Nessuno dei due fa parte delle immagini di release.

Ogni runtime espone `/healthz`, `/readyz` e `/metrics`. I lettori riportano "ready" solo quando le loro copie dell'archivio della chain e dell'archivio del portafoglio puntano esattamente allo stesso stato della chain.

## Modi per connettersi

* I **light wallet esistenti** mantengono la loro integrazione lightwalletd e la puntano a `zinder-compat-lightwalletd`. La documentazione di Zinder separa la compatibilità di protocollo dal supporto: un portafoglio nominato conta come supportato solo dopo che la sua release corrente supera la certificazione end-to-end. La release 0.10.0 ha corretto il campo della versione di protocollo `GetLightdInfo` così che Zingo possa sincronizzarsi.
* I **client nativi** chiamano `zinder-query` per letture con pin, blocchi compatti, flussi di eventi della chain e della mempool, e risultati del broadcast con motivi di rifiuto tipizzati.
* Le **applicazioni Rust** usano la crate `zinder-client`, una SDK remot-first che si connette a `zinder-query` senza collegare lo stack di archiviazione.
* Gli **explorer e i backend** combinano le letture del portafoglio con il piano opzionale `ExplorerQuery`.

## Esecuzione

Il quickstart a monte avvia un nodo con lo [stack Z3](/zcash-tech/z3-stack) e poi Zinder con Docker Compose dal checkout Zinder:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

I file env per la Mainnet e per un nodo Zakura (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) stanno accanto ad esso. Dalla 0.11.0 il file Compose non assume più Z3: il file env deve nominare la rete del nodo, il volume dei cookie e l'indirizzo RPC.

Porte predefinite dell'host (la Testnet aggiunge 10000):

| Servizio | Mainnet | Testnet |
|:--|:--|:--|
| gRPC nativo `WalletQuery` | 9102 | 19102 |
| gRPC compatibile lightwalletd | 9067 | 19067 |
| Readiness: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Entrambe le porte del portafoglio si legano al loopback. Verificale con:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Altri modi di fare il deployment:

* **Immagini di release** su `ghcr.io/zcashfoundation/`: i quattro runtime, più `zinder-wallet-serving` (ingest, projector e query nativa in un solo contenitore per host che possono collegare un volume a un solo contenitore; senza adattatore lightwalletd) e `zinder-canonical-runtime` (solo ingest).
* **Binari Linux** per x86-64 (richiede una CPU x86-64-v3) e AArch64, con glibc 2.34 o più recente. Debian 12 è la base certificata. Ogni release include una SBOM e una provenienza SLSA firmata.

### Cosa deve fornire il nodo

* Un **archive node**. Dalla 0.11.0, `zinder-ingest` si rifiuta di avviarsi contro un nodo con pruning.
* Zebra **7.0.0** oppure Zakura **1.8.6**. Queste sono le due versioni del nodo che le lane di release certificano.
* Per l'immagine `zinder-wallet-serving`, l'**endpoint gRPC dell'indicizzatore** del nodo (`ZINDER_NODE__INDEXER_GRPC_ADDR`, il `indexer_listen_addr` di Zebra, porta 8155 sulla Mainnet). Un indicizzatore Zakura su un indirizzo non-loopback richiede TLS mutuo, che Zinder supporta dalla 0.11.0.

### Dimensionamento per la Mainnet

Dal runbook di servizio ai portafogli:

* Almeno **8 GB di memoria**. Picchi misurati: ingest circa 2,6 GiB, projector circa 2,7 GiB durante la costruzione, query fino a circa 1,4 GiB.
* Tieni circa **130 GB liberi** sul volume mentre l'archivio del portafoglio per la Mainnet viene costruito.
* Una build Mainnet misurata dalla genesis ha richiesto circa **quattro ore** per l'archivio della chain (staging vicino a 310 GB) e **più di due ore** per l'archivio del portafoglio. Le scadenze di costruzione incluse vanno bene solo per la Testnet: alzale ad almeno 24 h e 12 h per la Mainnet, o la build riparte e non finisce mai.

## Note di release da conoscere

| Versione | Data | Cosa cambia per i gestori |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Finestra di reorg predefinita alzata a 1000 blocchi, la profondità alla quale Zebra 7 e Zakura finalizzano i blocchi. Irréversibile: le release precedenti non possono aprire gli archivi così alzati |
| 0.9.0 | 2026-11-12 | Nuove immagini `zinder-wallet-serving` e `zinder-canonical-runtime` |
| 0.10.0 | 2026-11-13 | **Prima release che decodifica i blocchi NU7.** La 0.9.0 e precedenti si fermano al primo blocco NU7. Revisione 8 del protocollo nativo: aggiorna insieme ingest e query, e con loro i client nativi |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 certificato accanto a Zebra 7.0.0; TLS mutuo verso l'indicizzatore del nodo; nodi con pruning rifiutati. La 0.11.0 è stata pubblicata solo come crate, quindi fai il deployment della 0.11.1 |
| 0.12.0 | 2026-11-14 | Correzioni a readiness e shutdown; replay dell'explorer più veloce e in pausa quando il disco si sta riempiendo |

## Errori comuni

**Trattarlo come software di produzione.** Il progetto si dichiara alpha. Un deployment Compose locale tutto verde è, nelle sue stesse parole, "non di per sé una certificazione di produzione".

**Puntarlo a un nodo con pruning.** Ingest esce all'avvio. Usa un nodo archive Zebra o Zakura.

**Esporre direttamente le porte gRPC.** Entrambe le porte del portafoglio si legano al loopback per un motivo. Metti TLS, autenticazione, limiti di frequenza e quote in un proxy che controlli prima di aprirle a internet.

**Aggiornare un runtime alla volta.** Diverse release cambiano la revisione del protocollo nativo o il formato degli archivi. Aggiorna insieme i servizi Zinder, e aggiorna i client nativi nello stesso cutover.

**Dare per scontato che un portafoglio sia supportato perché il protocollo lo è.** L'adattatore lightwalletd parla il protocollo, ma Zinder rivendica il supporto per un portafoglio nominato solo dopo che la release corrente di quel portafoglio è stata certificata end-to-end.

## Pagine correlate

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — cosa fa un light wallet server e cosa può vedere
* [Zaino](/zcash-tech/zaino) — l'indicizzatore Rust di Zingo Labs
* [Benchmark degli indicizzatori: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Stack Z3](/zcash-tech/z3-stack) — Zebra + Zallet, la configurazione del nodo che il quickstart di Zinder usa
* [Zebra Full Node](/zcash-tech/zebra-full-node) e [Zakura Node](/zcash-tech/zakura-node) — i due nodi che Zinder certifica

## Dove posso saperne di più?

* [repository GitHub Zinder](https://github.com/ZcashFoundation/zinder)
* [release Zinder](https://github.com/ZcashFoundation/zinder/releases) e [changelog](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Cosa Zinder è e cosa non è](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* Runbook [Deploying on a VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) e [wallet-serving image](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)

**Ultimo aggiornamento:** novembre 2026
