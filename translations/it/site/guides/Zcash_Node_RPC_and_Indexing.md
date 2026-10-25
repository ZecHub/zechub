<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guida pratica: RPC del nodo Zcash e indicizzazione della blockchain

Questa pagina è un ricettario per comunicare con un full node (nodo completo) Zcash in esecuzione tramite JSON-RPC e per collegare un indicizzatore interrogabile da portafogli leggeri ed explorer. **Non** è una seconda guida all'installazione.

Per sapere come avviare lo stack post-`zcashd` (Zebra + Zallet, Zaino facoltativo, porte, volumi, avvio in due fasi), consulta la pagina [Z3 Stack](/zcash-tech/z3-stack) e il [repository Z3](https://github.com/ZcashFoundation/z3). Per informazioni sui nodi di consenso, consulta [Full Nodes](/zcash-tech/full-nodes) e [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` ha raggiunto la fine del ciclo di vita il 18 luglio 2026. Il nuovo lavoro degli operatori dovrebbe puntare a Zebra (o [Zakura](/zcash-tech/zakura-node)) più un portafoglio/indicizzatore, non a `zcashd`.

---

## In breve

* **JSON-RPC** è il modo con cui operatori e portafogli chiedono a un nodo informazioni sulla punta della chain, sui peer e, nel caso di un processo portafoglio, sui saldi. Su Z3, Zebra serve l'RPC del nodo; Zallet serve l'RPC del portafoglio.
* **Regtest** è il posto giusto per imparare le chiamate. Il rpc-router di Z3 su `http://127.0.0.1:8181` accetta `zebra` / `zebra` e inoltra i metodi del nodo a Zebra e i metodi del portafoglio a Zallet.
* **Mainnet e testnet** usano l'autenticazione tramite cookie su Zebra. Non copiare il nome utente/la password di regtest su un nodo pubblico.
* **L'indicizzazione** è un compito separato dalla convalida. Zebra convalida. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) serve gRPC compatibile con lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) è un indicizzatore basato su Zakura; non è ciò che distribuisce Z3.
* JSON-RPC di Zaino e il gRPC facoltativo dell'indicizzatore di Zebra sono destinati al loopback o a una rete fidata. Non esporli senza autenticazione sulla rete Internet pubblica.

---

## Quale processo risponde a quale chiamata

| Cosa vuoi | Comunica con | Porta host mainnet di Z3 | Note |
| --- | --- | --- | --- |
| Punta della chain, peer, `getblockchaininfo` | JSON-RPC di Zebra | 8232 | Autenticazione tramite cookie |
| Saldo del portafoglio, indirizzi, invio | RPC di Zallet | 28232 | Processo separato; software beta |
| Blocchi compatti per portafogli leggeri | gRPC di Zaino | 8137 | Solo con `--profile indexer`; h2c in testo semplice |
| Proxy JSON-RPC per explorer / faucet | JSON-RPC di Zaino | 8237 | Solo rete fidata |
| Esercitati con tutto quanto sopra senza sincronizzazione | rpc-router regtest di Z3 | 8181 | Nome utente `zebra` / password `zebra` |

Matrice delle porte e nomi dei progetti Compose: [Z3 Stack](/zcash-tech/z3-stack) e [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Esercitati prima su regtest

Da un checkout di Z3, dopo `./scripts/regtest-init.sh` e `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Un risultato sano di `getblockchaininfo` include `"blocks"` e una mappa `"upgrades"`. Se curl resta in attesa, il router non è attivo; se ricevi `401`, stai raggiungendo direttamente Zebra anziché il router (il Zebra diretto su regtest è `29232` e continua ad aspettarsi le credenziali del router, a meno che tu non le abbia modificate).

Flusso di lavoro regtest completo, incluso il mining dei blocchi di attivazione: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (autenticazione tramite cookie)

Su mainnet e testnet, Zallet e il servizio facoltativo Zaino leggono un **volume cookie condiviso**. Il cookie viene rigenerato all'avvio; non è una destinazione di backup.

**Non** pubblicare JSON-RPC di Zebra sulla rete Internet pubblica. Chiamalo dalla rete Compose (`zebra:8232`) o dall'host solo se lo hai associato al loopback.

Controlli tipici dell'operatore dopo che Zebra è `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` sono RPC di mining. Le pool che continuavano ad aspettarsi un singolo processo `zcashd` necessitano di Zebra (o Zakura) per i template, oltre al portafoglio che usano per coinbase. Consulta [Zcash Mining Pools](/using-zcash/zcash-mining-pools) e la [guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Collega un indicizzatore

Convalida e indicizzazione sono compiti diversi.

### Zaino (ciò che distribuisce Z3)

Zaino legge Zebra e serve un'API gRPC compatibile con lightwalletd oltre a un proxy JSON-RPC. Zallet **non** richiede il container Zaino autonomo; incorpora librerie Zaino e comunica con Zebra tramite JSON-RPC. Avvia Zaino autonomo quando vuoi portafogli leggeri, explorer o faucet esterni:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Attendi che Zebra sia sincronizzato prima di indirizzare i client a Zaino. Un indicizzatore bulk in recupero con alta concorrenza di fetch può rallentare il verificatore di Zebra; mantieni `fetch_concurrency` sulle poche unità finché l'indicizzatore non ha completato il recupero.

gRPC regtest (testo semplice; porta `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Il gRPC di Zaino è h2c in testo semplice su tutte le reti. Termina TLS presso un reverse proxy se qualcosa al di fuori dell'host si connetterà. Dettagli: [Zaino](/zcash-tech/zaino) e [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Altri indicizzatori (non Z3)

* **lightwalletd** — il vecchio server di blocchi compatti. È ancora distribuito in natura; Zaino è il percorso successore per questo ruolo.
* **Ztreamer** — un indicizzatore basato su Zakura e un'implementazione di `CompactTxStreamer`. Non è un servizio Z3. Consulta il [Ztreamer repository](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — un listener gRPC facoltativo *all'interno* di Zebra. Z3 non lo richiede e non lo pubblica sull'host.

---

## Errori comuni

**Chiamare metodi del portafoglio su Zebra.** `getwalletinfo` e gli RPC di invio appartengono a Zallet (o a un altro portafoglio), non al nodo di consenso.

**Avviare Zallet prima che Zebra sia `/ready`.** Zallet entrerà in un ciclo di riavvii. Usa `scripts/check-zebra-readiness.sh` su mainnet/testnet.

**Copiare `zebra`/`zebra` di regtest su mainnet.** L'autenticazione tramite cookie è l'impostazione predefinita per mainnet/testnet per un motivo.

**Trattare Zaino come un full node.** Zebra (o Zakura) convalida. Zaino indicizza.

**Esporre pubblicamente JSON-RPC di Zaino o il gRPC dell'indicizzatore Zebra.** Questi endpoint sono destinati al loopback o a una rete privata fidata.

**Supporre che ogni portafoglio leggero parli già Zaino.** Verifica la release corrente del portafoglio rispetto al protocollo che implementa realmente.

---

## Pagine correlate

* [Z3 Stack](/zcash-tech/z3-stack) — installazione, porte, volumi, avvio in due fasi
* [Zaino](/zcash-tech/zaino) — ruolo dell'indicizzatore e note per gli operatori
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Guida alla migrazione: da zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib e tutorial Zaino](/guides/zingolib-and-zaino-tutorial)

## Risorse

* [repository Z3](https://github.com/ZcashFoundation/z3)
* [Ricettario regtest Z3 (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [FAQ Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Libro Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Ultimo aggiornamento:** settembre 2026
