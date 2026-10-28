<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# zecd — Server di portafogli con priorità alle transazioni schermate

zecd è un server di portafogli con priorità alle transazioni schermate per Zcash, costruito su [librustzcash](https://github.com/zcash/librustzcash) ed esposto tramite il dialetto JSON-RPC di Bitcoin Core. Offre a sviluppatori e integratori di pagamenti un'API familiare e compatibile con Bitcoin per interagire con Zcash, rendendo al tempo stesso Orchard (la pool più privata) l'opzione predefinita. Sviluppato da [zec.rocks](https://zec.rocks), zecd è progettato per sostituire la funzionalità di portafoglio di `zcashd` nelle moderne distribuzioni cloud-native.

**Versione attuale:** 0.5.0-rc3 (13 luglio 2026) — con supporto per Ironwood (NU6.3). Installa tramite `cargo install zecd` oppure usa l'immagine Docker ufficiale.

---

## TL;DR

- zecd è un **demone di portafoglio (server)** — non un full node (nodo completo). Gestisce chiavi, scansione, proving e RPC senza parlare il protocollo P2P di Zcash.
- Parla il **dialetto JSON-RPC di Bitcoin Core**: stessi nomi dei metodi, struttura dei campi, autenticazione e codici di errore — molti client RPC Bitcoin funzionano con Zcash fin da subito.
- Gli indirizzi **Orchard (schermati) sono predefiniti**; il supporto per gli indirizzi trasparenti (t-address) e Sapling richiede un opt-in esplicito per portafoglio.
- Si collega a un **full node (nodo completo) [Zebra](Zebra_Full_Node.md) autogestito** tramite JSON-RPC locale — non serve lightwalletd.
- **Stateless per progettazione**: l'intero portafoglio è recuperabile dalla sola frase mnemonica, rendendo la directory dei dati usa e getta.
- **Non è un sostituto drop-in di zcashd**: implementa solo un sottoinsieme dei metodi RPC di Zcash, con differenze intenzionali di design per privacy e sicurezza.
- Le commissioni seguono **ZIP-317** (calcolo deterministico delle fee); le fee specificate dall'utente vengono rifiutate.
- Supporta i **memo schermati (ZIP-302)** attraverso la familiare superficie RPC di Bitcoin.

---

## Quale problema risolve zecd?

`zcashd` era il nodo originale di Zcash e portafoglio insieme — derivato dalla base di codice C++ di Bitcoin nel 2016. Col tempo questo ha creato attrito: il codice è difficile da mantenere, il portafoglio è strettamente accoppiato al nodo e gli indirizzi trasparenti vengono presentati come opzioni di primo livello accanto a quelli schermati.

zecd separa la responsabilità del portafoglio dal consenso. È un **livello dedicato al portafoglio** che si colloca tra le applicazioni e un full node Zebra, offrendo:

- Un'implementazione Rust pulita e moderna costruita su librustzcash (la stessa libreria che alimenta Zodl e Zingo)
- Un design privacy-by-default (indirizzi Orchard salvo diversa configurazione)
- Un'interfaccia RPC compatibile con Bitcoin che elimina la necessità di imparare strumenti specifici di Zcash
- Un'architettura stateless, recuperabile da seed, adatta a deploy containerizzati e cloud

---

## Architettura

zecd opera in un modello a tre livelli:

```
La tua app / client Bitcoin RPC
        ↓  JSON-RPC
       zecd
   (chiavi, scansione, proving, RPC)
        ↓  JSON-RPC (solo locale)
       Zebra
   (nodo completo — consenso, mempool, dati della blockchain)
```

zecd comunica con Zebra **esclusivamente tramite JSON-RPC locale** — niente networking peer-to-peer, nessun indexer di terze parti, nessun lightwalletd. La connessione a Zebra è deliberatamente solo locale: zecd rifiuterà di inviare credenziali a un host instradabile globalmente a meno che non sia esplicitamente configurato per un tunnel sicuro fuori banda (ad es. WireGuard o SSH).

---

## Caratteristiche principali

### Schermato prima di tutto, Orchard predefinito

zecd usa gli indirizzi unificati Orchard come tipo di indirizzo predefinito. Le pool Sapling e trasparenti (t-address) richiedono una configurazione esplicita per portafoglio. Questo design riduce il rischio di invii trasparenti accidentali — un comune problema di privacy nei vecchi strumenti di Zcash.

La policy di privacy è configurabile per chiamata o globalmente in `[spend] privacy_policy`:

| Policy | Comportamento |
|--------|----------|
| `AllowRevealedRecipients` (predefinita) | Consente invii a destinatari trasparenti; rivela importo e destinatario on-chain |
| `AllowRevealedAmounts` | Consente invii cross-pool (Sapling↔Orchard) ma rifiuta destinatari trasparenti |
| `FullPrivacy` | Solo invii completamente schermati all'interno di una singola pool; rifiuta destinatari trasparenti e invii tra pool |
| `AllowFullyTransparent` | Consente anche invii t→t finanziati da UTXO trasparenti |

### Compatibilità RPC con Bitcoin Core

zecd implementa il dialetto JSON-RPC di Bitcoin Core con conformità su:

- Nomi dei metodi (ad es. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Nomi e tipi dei campi nelle risposte
- Struttura dell'envelope JSON-RPC 1.0
- Basic auth, voci `rpcauth` e autenticazione tramite file cookie
- Codici di errore e mappatura dello stato HTTP (HTTP 500 con body di errore, semantica 401)

Questo significa che molte librerie di pagamento Bitcoin esistenti, integrazioni con exchange e strumenti di monitoraggio possono interagire con Zcash tramite zecd con poche o nessuna modifica al codice.

La suite di conformità (140+ controlli) viene eseguita su ogni PR contro un demone regtest live ed è stata anche validata sulla testnet pubblica.

### Memo schermati (ZIP-302)

zecd espone la funzionalità dei memo schermati di Zcash tramite la familiare superficie RPC di Bitcoin — qualcosa di non disponibile negli strumenti Bitcoin standard:

- `sendtoaddress` accetta un memo hex opzionale come parametro aggiuntivo finale (fino a 512 byte; rifiutato per destinatari trasparenti)
- Le voci della cronologia transazioni da `listtransactions` e `gettransaction` includono i campi `memo` (hex) e `memoStr` (testo decodificato) quando un output ne contiene uno
- Sono supportati invii di importo zero a un destinatario schermato per casi d'uso basati solo sui memo (il pattern "memo-only-send" di `z_sendmany`)

Questo rende zecd adatto ad applicazioni che richiedono messaggistica privata on-chain insieme ai pagamenti.

### Stateless by design

zecd non persiste **nessuno stato off-chain che un ripristino basato solo sulla frase mnemonica non possa ricostruire**. Il database del portafoglio (`data.sqlite`) è interamente derivabile dalla frase mnemonica — i fondi schermati vengono recuperati incondizionatamente; i fondi trasparenti vengono recuperati fino al gap limit configurato.

Per ripristinare un portafoglio dalla frase mnemonica:

```sh
zecd init --restore --birthday <block-height>
```

Questo rende la directory dei dati **usa e getta**: un container senza volume persistente, ricostruito dal seed a ogni avvio, non perde nulla di critico. Gli operatori sono responsabili di tracciare gli indirizzi che distribuiscono — zecd ricorda gli indirizzi solo dopo che hanno ricevuto fondi on-chain.

Le etichette sono intenzionalmente assenti. Poiché le etichette non hanno una fonte on-chain e non possono essere ricostruite dal seed, zecd semplicemente non le supporta. Chiamare i metodi relativi alle etichette restituisce un errore `method-not-found` (`-32601`).

### Nessuna dipendenza da lightwalletd

zecd deriva compact block, stato dell'albero e visibilità della mempool direttamente dal JSON-RPC di Zebra. Non c'è alcun lightwalletd da gestire o mantenere — riducendo la complessità operativa delle distribuzioni self-hosted.

### Deploy cloud-native e containerizzati

L'architettura stateless di zecd è progettata per ambienti Docker e Kubernetes:

- Stack Docker Compose completo (`zebra → zecd`) disponibile nel repository
- Endpoint health sulla porta `9233` con readiness probe configurabili (`synced` o `connected`)
- Opzione di logging JSON strutturato per pipeline di aggregazione dei log
- Fee deterministiche ZIP-317 — nessun fee oracle o configurazione manuale delle fee
- `bootstrap_from_keys` (attivo di default): una directory dati vuota accanto a `keys.toml` ricostruisce automaticamente il portafoglio all'avvio — fai il deployment montando un Secret e avviando con un PVC vuoto

---

## Modelli di custodia

zecd supporta tre modelli di custodia delle chiavi, adatti a diversi requisiti di deploy e sicurezza:

### 1. Non cifrato (predefinito — auto-unlock)

Il seed mnemonic in `keys.toml` è wrappato in un **file di identità age** (`identity.txt`). Con l'impostazione predefinita `auto_unlock = true`, il seed viene decifrato in memoria all'avvio così che gli invii siano non presidiati e non sia necessaria alcuna chiamata `walletpassphrase`.

Ideale per: processori di pagamento automatizzati, hot portafogli di exchange, ambienti di sviluppo.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Conserva `identity.txt` **fuori** dalla directory dei dati in mainnet — chiunque possa leggere entrambi i file ha autorità di spesa.

### 2. Cifrato (protetto da passphrase)

La frase mnemonica è protetta da una passphrase (age scrypt) invece che da un file di identità. Il portafoglio si avvia bloccato; `walletpassphrase "<pass>" <timeout>` lo sblocca per la durata specificata e lo riblocca automaticamente allo scadere — in linea con il comportamento del portafoglio cifrato di Bitcoin Core.

Ideale per: hot portafogli dove non è richiesta autorità di spesa non presidiata; flussi di lavoro interattivi dell'operatore.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-only (UFVK — nessuna spend key)

Inizializzato con una Unified Full Viewing Key (UFVK) esportata da un altro portafoglio. Può ricevere, scansionare e segnalare i saldi — ma non può firmare transazioni. Ideale per il monitoraggio, la fatturazione o nodi di audit separati dal portafoglio di firma.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup e ripristino

I fondi sono recuperabili **dal solo mnemonic**. Tutto il resto è una cache.

| Artifact | Location | Cosa protegge | Da salvare? |
|----------|----------|-----------------|----------|
| **Mnemonic di 24 parole** | Mostrato una sola volta con `zecd init` | I fondi — perdita = perdita permanente | **Sì — offline (paper/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Seed cifrato + birthday + rete | **Sì — come Secret** |
| `identity.txt` | `[keys] age_identity` | Decifra `keys.toml` (autorità di spesa) | **Sì — separatamente da `keys.toml`** |
| Altezza birthday | Dentro `keys.toml` | Rende il ripristino veloce (qualsiasi altezza prima della prima tx) | Registrala con il mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache del portafoglio — ricostruita dalla frase mnemonica al ripristino | No — usa e getta |
| `blocks/` | `<wallet dir>/blocks/` | Cache dei compact block | No — non distribuirla mai; può crescere molto |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC effimero | No — rigenerato all'avvio |

> **La directory dei dati deve essere locale all'host.** Il blocco a istanza singola di zecd (`<datadir>/.lock`) è un blocco consultivo del sistema operativo — non si estende tra host diversi. Non condividere mai una directory dati in lettura-scrittura tra macchine (NFS, Kubernetes `ReadWriteMany`) — due istanze zecd corromperebbero il database del portafoglio. Usa volumi `ReadWriteOnce` in Kubernetes.

---

## Safelist dei metodi RPC

Per distribuzioni in cui una fuga di credenziali sarebbe catastrofica, zecd supporta la limitazione della superficie RPC a un sottoinsieme scelto di metodi:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Qualsiasi metodo non presente nell'elenco restituisce `-32601` (HTTP 404) — indistinguibile da un metodo che non esiste, quindi un server blindato non rivela nulla su ciò che ha disabilitato. Un sistema di fatturazione solo-ricezione può disabilitare `sendtoaddress`, `sendmany` e `stop` per ridurre al minimo il raggio d'azione di un client compromesso.

---

## Differenze chiave rispetto all'RPC di Bitcoin Core

Gli sviluppatori che migrano da Bitcoin o dagli strumenti di zcashd dovrebbero essere consapevoli di queste divergenze intenzionali:

| Behavior | Bitcoin Core | zecd |
|----------|-------------|------|
| Formato indirizzo | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — non interpretabile come indirizzo Bitcoin dai client che fanno parsing della stringa |
| Etichette | Archivio etichette completo | Non implementato — `setlabel`, `listlabels`, ecc. restituiscono `-32601` |
| Fee | Impostabili dall'utente; fee market | Solo ZIP-317 deterministico; `settxfee`, `fee_rate`, `subtractfeefromamount` rifiutati con `-8` |
| Memo | Non supportati | `sendtoaddress` accetta memo hex; la cronologia ha i campi `memo` + `memoStr` |
| Conferme per spendere | 1 | 3 (resto proprio) / 10 (terze parti) — configurabile tramite `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` su reorg | Torna indietro fino al fork | Restituisce `-5` (Block not found) se il cursore viene rimosso da un reorg — reimposta la baseline con una chiamata senza parametri |
| Destinatari duplicati in `sendmany` | Errore | Il parser JSON collassa i duplicati (vince l'ultimo) prima che zecd li veda — non elencare lo stesso indirizzo due volte |
| Saldo durante la sync iniziale | Blocca o warm-up | Fornisce saldo parziale — fai dipendere l'automazione da `GET /readyz` (restituisce 503 finché non è completamente sincronizzato e l'arretrato di enhancement non è stato smaltito) |
| `minconf 0` in `getbalance` | Saldo 0-conf | Trattato come 1 — una nota schermata non è mai spendibile prima di essere inclusa in un blocco |

---

## Avvio rapido

**Prerequisiti:** Zebra in esecuzione localmente con `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Installa da crates.io (0.4.3+):

```sh
cargo install zecd
```

Oppure compila dai sorgenti:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Inizializza un wallet testnet (genera un mnemonic di 24 parole e un account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Avvia il demone (sincronizza in background, serve JSON-RPC sulla porta 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interagisci tramite curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interagisci tramite Python (usando una libreria Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # restituisce un Orchard Unified Address u1...
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Invia con un memo shielded
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # memo hex
```

**Ripristina dal seed:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# incolla il tuo mnemonic di 24 parole quando richiesto
```

---

## Porte predefinite

| Network | zecd RPC | Zebra RPC (backend) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd vs. zcashd vs. Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Ruolo | Full node + portafoglio | Indexer (sostituisce lightwalletd) | Solo server di portafoglio |
| Linguaggio | C++ | Rust | Rust |
| Stato | Deprecato | Attivo | Attivo (v0.5.0-rc3, lug 2026) |
| Pool predefinita | Trasparente | N/A | Orchard (schermata) |
| Dialetto RPC | Specifico di zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Richiede un full node | Sì (se stesso) | Zebra o zcashd | Zebra |
| Recupero stateless | No | N/A | Sì (solo seed) |
| Memo schermati | Sì (`z_sendmany`) | N/A | Sì (superficie RPC di Bitcoin) |
| Watch-only (UFVK) | Sì | Sì | Sì |
| Cloud-native | No | Parziale | Sì |
| Installazione | Build/binario | Build | `cargo install zecd` |

---

## Pagine correlate

- [Full node Zebra](Zebra_Full_Node.md) — il full node a cui zecd si collega
- [Indexer Zaino](Zaino.md) — approccio alternativo come indexer (sostituisce lightwalletd)
- [Nodo Zakura](Zakura_Node.md) — un'altra implementazione di full node (fork di Zebra)
- [Chiavi di visualizzazione](Viewing_Keys.md) — come zecd scansiona la chain usando le chiavi di visualizzazione degli account
- [Portafogli](/using-zcash/wallets) — panoramica dell'ecosistema dei portafogli

## Risorse

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook operativo zecd](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — libreria crittografica core di Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Memo schermati](https://zips.z.cash/zip-0302)
- [Portafoglio Zodl (compatibile con librustzcash)](https://github.com/zodl-inc/zodl-ios)
