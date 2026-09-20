<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zallet

Zallet è un wallet Zcash full-node scritto in Rust. Sostituisce il wallet che in precedenza era incorporato in `zcashd`. Dopo che `zcashd` ha raggiunto l'interruzione del supporto il 18 luglio 2026 all'altezza del blocco 3417100, i compiti di consenso e wallet sono stati separati: **Zebra** o **Zakura** convalidano la catena, mentre **Zallet** conserva le chiavi, scansiona le note ed espone il JSON-RPC del wallet.

Zallet è attualmente in versione **beta**. Non è stato sottoposto a una revisione completa. Modifiche incompatibili potrebbero richiedere l'eliminazione e la ricreazione del wallet. Non considerarlo una soluzione di custodia in produzione per grandi quantità di ZEC senza aver letto gli avvisi di sicurezza nel [The Zallet Book](https://zcash.github.io/zallet/).

---

## In breve

- Zallet è un **wallet RPC full-node**, non un light wallet mobile né un nodo di consenso.
- Sostituisce la componente wallet di `zcashd`. La componente nodo è [Zebra](Zebra_Full_Node.md) oppure [Zakura](Zakura_Node.md).
- Scritto in **Rust**, con doppia licenza MIT / Apache-2.0, mantenuto in [zcash/zallet](https://github.com/zcash/zallet).
- Ultima release pubblicata alla fine di agosto 2026: **v0.1.0-beta.3**.
- Comunica con i dati della catena attraverso uno di due backend: **zebra-state** (`ReadStateService` diretto contro un `zebrad` locale) oppure **Zaino**.
- Espone un sottoinsieme JSON-RPC compatibile con **zcashd**. Alcuni metodi sono cambiati; altri sono stati volutamente omessi.
- Il materiale delle chiavi è sempre crittografato con **age**. Cronologia delle transazioni, indirizzi e chiavi di visualizzazione rimangono in chiaro in `wallet.db`.
- Include tre binari in un unico archivio firmato: `zallet` (launcher), `zallet-zebra` e `zallet-zaino`.
- Documentazione ufficiale: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Perché esiste Zallet

`zcashd` raggruppava un nodo di consenso derivato da Bitcoin Core e un wallet in un unico processo. Quel progetto non esiste più.

| Ruolo | Stack precedente | Stack attuale |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) oppure Zakura |
| Wallet / chiavi / saldi | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indicizzatore light client | `lightwalletd` | Zaino oppure `lightwalletd` |

Separare il wallet dal nodo significa:

- Il software del nodo può essere sostituito (Zebra rispetto a Zakura) senza spostare le chiavi.
- La scansione del wallet e l'autorità di spesa risiedono in un processo che può essere protetto separatamente.
- La semantica RPC può evolvere verso gli account ZIP 32, gli Unified Addresses e i PCZT anziché rimanere bloccata sulle peculiarità di `zcashd`.

Zallet è il wallet destinato agli operatori che in precedenza utilizzavano `zcashd` come hot wallet, backend per exchange, faucet o wallet per pagamenti di mining.

---

## Stato

Zallet è in versione **beta**.

Cosa significa in pratica:

- Modifiche incompatibili possono arrivare in qualsiasi beta. Potrebbe essere necessario eliminare la directory dei dati e ricominciare.
- Non tutti gli RPC del wallet `zcashd` sono stati portati.
- La semantica di alcuni metodi portati differisce da `zcashd`. Le integrazioni devono leggere la pagina [semantica modificata](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- I crate sono in fase di sviluppo e non sono stati sottoposti a una revisione completa.
- Zallet **non** è una libreria Rust. Non esistono garanzie se vi si dipende come tale.

I feedback vanno alle [issue GitHub](https://github.com/zcash/zallet/issues/new) o al canale `#wallet-dev` sul [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

È prevista una successiva fase stabile una volta disponibile la superficie RPC prevista. In tal caso, i chiamanti dovranno migrare ai metodi di Zallet, comprese le differenze semantiche documentate.

---

## Architettura

Zallet è suddiviso in tre workspace Cargo affinché i due backend della catena possano seguire grafi di dipendenze differenti.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Tutti e tre i binari aprono lo **stesso** `wallet.db`. Il launcher sceglie un backend in fase di esecuzione; non occorre ricompilare per cambiarlo.

Distribuzione tipica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet è un **wallet full-node**: richiede un nodo validante locale. Non è un light client. Per i light wallet e i server di blocchi compatti, vedi [Zaino](Zaino.md) e [Nodi Lightwallet](Lightwallet_Nodes.md).

Lo stack compose Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) esegue insieme Zebra + Zallet, con Zaino autonomo opzionale per light client esterni.

---

## Account, indirizzi e chiavi

Zallet è basato sugli account ZIP 32, non sull'unico account implicito di `zcashd`.

- Un wallet può contenere **più mnemonic BIP 39**. Ogni mnemonic è una radice di spesa indipendente, identificata da una **seed fingerprint** (`zip32seedfp1…`).
- Gli **account** sono derivati da un seed con un indice account ZIP 32. All'interno di una singola istanza di Zallet, possiedono anche un **UUID** locale. L'identità portabile di un account è `(seedfp, account index)`.
- Gli indirizzi sono **Unified Addresses ZIP 316**, prodotti con `z_getaddressforaccount`. Un account può avere molti indirizzi diversificati; i receiver shielded non sono collegabili on-chain.
- Le chiavi di spesa importate (`z_importkey`) e gli indirizzi watch-only (`z_importaddress`) diventano account UUID non coperti da alcun mnemonic.
- Le chiavi di visualizzazione possono essere esportate e importate (`z_exportviewingkey`, `z_importviewingkey`), comprese le unified full viewing keys e le incoming viewing keys.

`getnewaddress` non è implementato. Usa `z_getnewaccount` e `z_getaddressforaccount`.

Se `keystore.require_backup` è attivo (la forma migrata di `zcashd` di `walletrequirebackup`), Zallet rifiuta di derivare nuova autorità di spesa da un mnemonic il cui backup non è stato confermato.

---

## Crittografia e backup

Il materiale delle chiavi è **sempre** crittografato. Non esiste una modalità non crittografata né un RPC `encryptwallet`: quel metodo di `zcashd` non è mai stato pienamente supportato.

- La configurazione crea un'identità **age**, con percorso predefinito `{datadir}/encryption-identity.txt`.
- I mnemonic e le chiavi di spesa importate sono archiviati come testi cifrati age in `wallet.db`.
- Il resto del database **non** è crittografato. Cronologia, indirizzi e chiavi di visualizzazione sono leggibili se qualcuno ottiene il file.
- L'identità può essere protetta da passphrase (`generate-encryption-identity -p`). Sblocca con l'RPC `walletpassphrase`; blocca con `walletlock`.
- Perdere il file dell'identità o la relativa passphrase rende irrecuperabili le chiavi di spesa. Esegui il backup dell'identità, di ogni mnemonic e, separatamente e crittografata, di ogni copia `wallet.db` che conservi.

Copiare `wallet.db` mentre Zallet è in esecuzione non è un backup sicuro. SQLite può danneggiarsi. Preferisci un processo arrestato, oppure attendi un comando ufficiale di backup online.

---

## JSON-RPC

Zallet implementa un sottoinsieme degli RPC wallet di `zcashd` su HTTP con autenticazione Basic. Effettua il bind su loopback. L'uso remoto dovrebbe passare attraverso un tunnel crittografato. `rpc.allow_insecure_remote_bind` esiste ed è insicuro.

Differenze rilevanti rispetto a `zcashd`:

- I campi dei saldi in `getwalletinfo` sono vuoti. Usa `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Le commissioni seguono **ZIP 317**. Non esiste `settxfee`.
- La costruzione delle spese si sta spostando sui **PCZT** (transazioni Zcash create parzialmente, ZIP 374). Gli RPC PCZT sono arrivati nella serie beta.
- Un **blocco di sincronizzazione** globale blocca gli RPC di saldo e spesa mentre il wallet recupera il ritardo o si riprende da una riorganizzazione (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

I metodi volutamente omessi includono `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` e `encryptwallet`. Le alternative sono elencate nel [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Per iniziare

I percorsi di installazione ufficiali (pacchetti Debian, Docker, binari di release) sono nella [guida all'installazione](https://zcash.github.io/zallet/guide/installation/index.html). Gli archivi di release sono denominati `zallet-<version>-<arch>.tar.gz` e contengono tutti e tre i binari.

Flusso minimo per un nuovo wallet:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Indirizza `[indexer]` a un endpoint JSON-RPC `zebrad` locale. Il backend zebra richiede anche `[indexer.read_state_service]` e un `zebrad` compilato con la funzionalità indexer affinché Zallet possa leggere direttamente lo stato della catena.

Le immagini riproducibili possono essere compilate con [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, image store containerd, GNU Make).

---

## Migrazione da zcashd

Conserva la vecchia datadir di `zcashd` finché non avrai confermato i saldi e testato un ripristino.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` è disponibile solo nelle build con la funzionalità `zcashd-import`. Per leggere `wallet.dat` occorre `db_dump` di **Berkeley DB 6.2**, la versione utilizzata da `zcashd`.

Note operative passo per passo: [Guida alla migrazione: da zcashd a Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Come Zallet si relaziona ad altri software

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Cos'è | Wallet RPC full-node | Server wallet incentrato sullo shielded | Wallet per utenti finali | Nodo di consenso | Indicizzatore / sostituto di lightwalletd |
| Sostituisce | Wallet `zcashd` | Non è un clone `zcashd` drop-in | App mobile/desktop | Nodo `zcashd` | `lightwalletd` |
| Richiede un nodo locale | Sì | Sì (Zebra per impostazione predefinita) | No (light client) | È il nodo | Sì |
| Compatibilità RPC zcashd | Progettato come percorso di compatibilità | Solo un piccolo sottoinsieme selezionato | N/D | Modalità di compatibilità parziale / Zakura | API diversa |
| Modello di custodia | L'operatore conserva le chiavi in `wallet.db` | Server recuperabile tramite seed | Chiavi sul dispositivo dell'utente | Nessun wallet | Nessuna chiave |

Zallet e **zecd** possono entrambi essere posti davanti a Zebra. Scegli Zallet quando ti serve la superficie wallet di `z_*` e un percorso di migrazione da `wallet.dat`. Scegli zecd quando desideri un server incentrato sullo shielded che esplicitamente *non* è un clone di `zcashd`.

Esiste un prodotto consumer separato su [zallet.io](https://www.zallet.io/) che riutilizza il nome. Quell'app non è questo progetto.

---

## Pagine correlate

- [Nodi completi](Full_Nodes.md) — Zebra, Zakura e il nodo `zcashd` ritirato
- [Nodo completo Zebra](Zebra_Full_Node.md) — il nodo letto dal backend predefinito di Zallet
- [Nodo Zakura](Zakura_Node.md) — nodo validante alternativo
- [Zaino](Zaino.md) — backend indicizzatore e server light client
- [ZECD](ZECD.md) — un altro progetto di server wallet su librustzcash
- [Sincronizzazione dei wallet Zcash](Zcash_Wallet_Syncing.md) — come i wallet shielded scansionano la catena
- [Chiavi di visualizzazione](Viewing_Keys.md)

## Risorse

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet su GitHub](https://github.com/zcash/zallet)
- [Release](https://github.com/zcash/zallet/releases)
- [Semantica JSON-RPC modificata](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guida alla migrazione di ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guida Raspberry Pi di ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (stack compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
