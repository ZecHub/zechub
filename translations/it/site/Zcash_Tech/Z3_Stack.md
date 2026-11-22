<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Stack Z3

Lo **Stack Z3** è la piattaforma di nodi preconfezionata di Zcash Foundation: **Zebra** (full node (nodo completo)) + **Zallet** (portafoglio per full node), con un indicizzatore **Zaino** opzionale. È il sostituto previsto di un processo `zcashd` indipendente, che riuniva consenso e portafoglio in un unico binario e ha raggiunto la fine del ciclo di vita il 18 luglio 2026.

L'implementazione di riferimento è il progetto Docker Compose disponibile su [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Stato, 14 novembre 2026: i pin predefiniti sono precedenti a NU7.** L'ultima modifica a `docker-compose.yml` di Z3 risale al 10 agosto 2026. Usa ancora `zfnd/zebra:6.2.3` e `zodlinc/zallet:v0.1.0-beta.1` ed è nato come binario `zallet-zaino`. [NU7](NU7.md) è stato attivato sulla Mainnet al blocco 3,543,405 il 6 novembre 2026, e solo Zebra 7.0.0 o versioni successive lo seguono: un Zebra 6.x resta alle vecchie regole e si stacca dalla chain reale. Zallet v0.1.0-beta.4, la prima versione che segue NU7, non include più `zallet-zaino`. Controlla il repository per verificare se ci sono pin più recenti prima del deployment. Se sostituisci le immagini tu, tieni presente che il backend `zebra` rimanente di Zallet legge direttamente la directory di stato di Zebra, quindi Zallet deve essere eseguito sullo stesso host con accesso a quella directory ([Zallet](Zallet.md)).

---

## In breve

* Z3 **non è un nuovo client di consenso**. È il modo per eseguire insieme lo stack successivo a `zcashd`: Zebra valida la chain, Zallet custodisce le chiavi e fornisce wallet RPC, e Zaino (facoltativo) parla il protocollo gRPC di lightwalletd.
* `zcashd` è un nodo e portafoglio integrati. Z3 **separa questi ruoli**. Gli exchange, le pool di mining e gli altri operatori di portafogli basati su full node migrano a questa combinazione, anziché passare a Zebra da solo.
* Tre progetti Compose isolati possono essere eseguiti su un unico host: **mainnet**, **testnet** e **regtest**.
* La prima sincronizzazione della mainnet richiede circa **24–72 ore** e occupa circa **300 GB**. Il regtest è pronto in pochi secondi ed è il posto giusto per imparare a usare lo stack.
* Nell'immagine Z3 fissata, Zallet usa il backend `zallet-zaino` (le librerie di indicizzazione di Zaino) e comunica con Zebra tramite JSON-RPC. Zallet ha rimosso quel backend nella versione v0.1.0-beta.4; le versioni attuali di Zallet leggono direttamente lo stato di Zebra. Il servizio Zaino autonomo serve solo se vuoi un endpoint compatibile con lightwalletd per portafogli esterni.
* Zallet è in **beta**. Le modifiche incompatibili possono richiedere di eliminare e ricreare il portafoglio. Non considerarlo un software di custodia completo per grandi somme.

---

## Perché esiste Z3

Per gran parte della vita di Zcash, `zcashd` è stato sia il full node di riferimento sia l'unico portafoglio per full node di produzione. Questo design è quello con cui si sono integrati gli exchange, le pool e i custodi.

`zcashd` è ritirato. Il consenso è passato a [Zebra](/zcash-tech/zebra-full-node) (e ora anche a [Zakura](/zcash-tech/zakura-node)). Il portafoglio integrato è passato a [Zallet](https://github.com/zcash/zallet). Il servizio per portafogli light sta passando da [lightwalletd](/zcash-tech/lightwallet-nodes) a [Zaino](/zcash-tech/zaino).

Questi tre componenti sono repository separati, con cicli di rilascio e configurazioni separati. Z3 è il collante: immagini fissate, controlli di integrità che tengono il portafoglio inattivo finché il nodo non è sincronizzato, porte e volumi per rete e un percorso operativo documentato.

Il nome è un'abbreviazione informale nell'ecosistema — Zebra, Zaino, Zallet — anche se il file Compose predefinito avvia solo Zebra e Zallet. Zaino è un profilo Compose, non un terzo processo obbligatorio.

---

## Architettura

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Componente | Ruolo in Z3 | Obbligatorio? |
| --- | --- | --- |
| **Zebra** | Sincronizza e convalida la chain, gestisce il gossip, JSON-RPC e l'endpoint di stato | Sì |
| **Zallet** | Portafoglio per full node. L'immagine beta.1 fissata esegue il backend basato sulla libreria Zaino (`zallet-zaino`, rimosso nella beta.4 di Zallet) e si collega direttamente a JSON-RPC di Zebra. **Non** chiama il container Zaino autonomo | Sì |
| **Zaino** | Indicizzatore autonomo. gRPC compatibile con lightwalletd per i light client esterni, più un proxy JSON-RPC per Block Explorers e faucet | No — `--profile indexer` |

Z3 fissa le versioni delle immagini in `docker-compose.yml`. Sostituiscile con `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` o `Z3_ZALLET_IMAGE` se hai bisogno di un tag diverso.

---

## Differenze rispetto a zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Linguaggio | C++ (fork di Bitcoin) | Servizi Rust, orchestrati con Docker Compose |
| Modello di processo | Un binario: nodo + portafoglio | Container separati per nodo e portafoglio |
| Consenso | Ritirato (EOS 18 luglio 2026) | Zebra (o un altro nodo compatibile) |
| Wallet | `wallet.dat` integrato | Zallet, directory dei dati crittografata con age |
| Client leggeri | Solitamente un lightwalletd separato | Profilo Zaino opzionale |
| Configurazione | `zcash.conf` | File per rete in `config/<network>/` più file env Compose |
| Reti su un unico host | Conflitti di porte problematici | Supporto nativo: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Se possiedi ancora un portafoglio `zcashd`, usa la guida alla migrazione ZecHub [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) e il comando `migrate-zcashd-wallet` di Zallet anziché copiare `wallet.dat` nel volume Z3.

---

## Reti

Z3 consiste di tre progetti Compose indipendenti. Non condividono porte né volumi.

| Rete | Nome del progetto | Utilizzo | Prima sincronizzazione | Fondi reali |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Produzione | 24–72 ore | Sì |
| **testnet** | `z3-testnet` | Staging sulla rete di test pubblica | 2–12 ore | No (ZEC di test) |
| **regtest** | `z3-regtest` | Esercitazione locale: blocchi istantanei, nessun peer | Secondi | No |

I nuovi operatori dovrebbero iniziare su **regtest**, verificare i flussi RPC e del portafoglio, quindi passare a testnet o mainnet.

---

## Porte host predefinite

Tutte e tre le reti sono progettate per coesistere sulla stessa macchina. I valori riportati sotto sono le impostazioni predefinite pubblicate; ciascuno può essere sostituito tramite la variabile env `Z3_*` corrispondente. La matrice canonica è [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Servizio | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC di Zebra | 8232 | 18232 | 29232 |
| P2P di Zebra | 8233 | 18233 | (non pubblicato) |
| Integrità di Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC di Zaino (profilo indicizzatore) | 8137 | 18137 | 28137 |
| JSON-RPC di Zaino (profilo indicizzatore) | 8237 | 18237 | 28237 |
| RPC di Zallet | 28232 | 40232 | 50232 |

All'interno della rete Compose, i servizi vengono risolti per nome (`zebra`, `zaino`, `zallet`).

---

## Dati e backup

| Volume | Contenuto | Backup? |
| --- | --- | --- |
| `z3-<network>-chain` | Stato della chain di Zebra (~300 GB mainnet) | Facoltativo — risincronizzabile |
| `z3-<network>-zallet` | Database del portafoglio crittografato **e** identità age che lo sblocca | **Sì — questo è l'unico volume di cui è necessario eseguire il backup** |
| `z3-<network>-zaino` | Stato dell'indicizzatore (solo con il profilo indicizzatore) | Facoltativo — ricostruibile |
| `z3-<network>-cookie` | Cookie RPC di Zebra | No — rigenerato |

Per collocare lo stato della chain su un altro disco prima del primo avvio:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` arresta lo stack e conserva i volumi. L'aggiunta di `-v` li elimina e forza una risincronizzazione completa. Includi `--profile "*"` affinché i servizi gestiti dal profilo (indicizzatore, monitoraggio) vengano effettivamente arrestati.

---

## Per iniziare

Prerequisiti: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` è necessario solo per regtest.

### Regtest (il modo più rapido per vedere lo stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Consulta [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) per i comandi di test.

### Mainnet (avvio in due fasi)

Zebra deve terminare la sincronizzazione prima che Zallet sia utile. Avviare Zallet troppo presto lo farà entrare in un ciclo di riavvio finché `/ready` non sarà vero.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet segue lo stesso flusso con `.env.testnet` e `./scripts/check-zebra-readiness.sh 18080`.

Le modifiche in `config/<network>/` restano locali e sopravvivono a `git pull`.

### Profili opzionali

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Le porte Grafana predefinite sono 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Note per gli operatori

* **Immagini fissate.** Z3 non passa silenziosamente a `:latest`. Aggiorna una versione fissata con una modifica revisionata oppure imposta `Z3_<SERVICE>_IMAGE`. Le versioni fissate non cambiano da agosto 2026, quindi sono precedenti a NU7 (vedi la nota sullo stato in cima).
* **Container senza privilegi di root.** Le capability di Linux vengono rimosse. I controlli di integrità tengono fermo il portafoglio finché Zebra non è pronto. Il criterio di riavvio è attivo per impostazione predefinita.
* **Log.** Z3 non fissa un driver di logging. Imposta limiti di dimensione nella configurazione del daemon di Docker, altrimenti i log crescono senza limiti su un nodo attivo 24 ore su 24, 7 giorni su 7.
* **P2P.** Mainnet e testnet pubblicano la porta P2P di Zebra. Se sei dietro NAT, imposta `ZEBRA_NETWORK__EXTERNAL_ADDR` sull'indirizzo a cui i peer dovrebbero connettersi. Regtest non ha peer.
* **Zaino su ARM.** L'immagine upstream Zaino è solo `linux/amd64`. Sui dispositivi Apple Silicon viene eseguita tramite emulazione, a meno che tu non compili dal codice sorgente. Zebra e Zallet supportano più architetture.
* **Host condivisi.** Per impostazione predefinita non vengono impostati limiti per CPU o memoria. Aggiungi `deploy.resources.limits` in un file di override se il server non è dedicato al nodo.

Checklist orientata alla produzione e FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Chi dovrebbe eseguire Z3

**Adatto**

* Gli exchange, i custodi e le pool di mining che usavano `zcashd` come nodo più portafoglio
* Operatori che desiderano un RPC del portafoglio per full node supportato su uno Zebra sincronizzato
* Sviluppatori che necessitano di mainnet, testnet e regtest affiancati
* Chiunque configuri un endpoint privato compatibile con lightwalletd tramite il profilo Zaino

**Solitamente lo strumento sbagliato**

* Utenti finali che hanno solo bisogno di inviare e ricevere ZEC — usa un light client come ZODL / Zashi, Zingo o Zkool (il successore mantenuto di YWallet)
* Chi vuole solo convalidare la chain — esegui solo Zebra (o Zakura)
* Chi vuole solo fornire blocchi compatti — esegui Zebra + Zaino oppure Zebra + lightwalletd, senza Zallet

---

## Pagine correlate

* [Zebra full node](/zcash-tech/zebra-full-node) — nodo di consenso racchiuso da Z3
* [Zaino](/zcash-tech/zaino) — profilo indicizzatore opzionale
* [Full node](/zcash-tech/full-nodes) — Zebra, Zakura e il ritirato zcashd
* [Nodi lightwallet](/zcash-tech/lightwallet-nodes) — ciò con cui comunicano i client leggeri
* [Zakura full node](/zcash-tech/zakura-node) — full node alternativo; non è quello fornito oggi da Z3
* [Guida alla migrazione: zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Risorse per sviluppatori](/start-here/developer-resources)

---

## Risorse

* [Repository Z3](https://github.com/ZcashFoundation/z3)
* [Contratto Z3 (porte, volumi, nomi dei progetti)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Il libro di Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Il libro di Zallet](https://zcash.github.io/zallet/)
* [Zcash Forum della community — aggiornamenti Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — piano di controllo della community sullo stack Compose ufficiale (ZecHub Hackathon)
