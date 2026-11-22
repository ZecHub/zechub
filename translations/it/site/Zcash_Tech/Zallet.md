<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zallet

Zallet è un portafoglio di Zcash full node (nodo completo) scritto in Rust. Sostituisce il portafoglio che in precedenza era incorporato in `zcashd`. Dopo che `zcashd` ha raggiunto l'interruzione del supporto il 18 luglio 2026 all'altezza del blocco 3417100, i compiti di consenso e del portafoglio sono stati separati: **Zebra** o **Zakura** convalidano la chain, mentre **Zallet** conserva le chiavi, scansiona le note ed espone il JSON-RPC del portafoglio.

Zallet è attualmente in versione **beta**. Non è stato sottoposto a una revisione completa. Modifiche incompatibili potrebbero richiedere l'eliminazione e la ricreazione del portafoglio. Non considerarlo una soluzione di custodia in produzione per grandi quantità di ZEC senza aver letto gli avvisi di sicurezza nel [The Zallet Book](https://zcash.github.io/zallet/).

---

## In breve

- Zallet è un **portafoglio RPC full node**, non un portafoglio light mobile né un nodo di consenso.
- Sostituisce la componente portafoglio di `zcashd`. La componente nodo è [Zebra](Zebra_Full_Node.md) oppure [Zakura](Zakura_Node.md).
- Scritto in **Rust**, con doppia licenza MIT / Apache-2.0, mantenuto in [zcash/zallet](https://github.com/zcash/zallet).
- Ultima release pubblicata: **v0.1.0-beta.4** (2 novembre 2026). Segue [NU7](NU7.md) e richiede `zebrad` **7.0.0 o successive**.
- Legge i dati della chain tramite un solo backend, **zebra**: `ReadStateService` sulla directory di stato di un `zebrad` sullo stesso host, oltre a JSON-RPC di Zebra. Il backend Zaino è stato rimosso in v0.1.0-beta.4.
- Espone un sottoinsieme JSON-RPC compatibile con **zcashd**. Alcuni metodi sono cambiati; altri sono stati volutamente omessi.
- Il materiale delle chiavi è sempre crittografato con **age**. Cronologia delle transazioni, indirizzi e chiavi di visualizzazione rimangono in chiaro in `wallet.db`.
- Include due binari in un unico archivio firmato: `zallet` (launcher) e `zallet-zebra`. Per ora la sincronizzazione del portafoglio è disponibile **solo su Linux**: su macOS e Windows non è ancora disponibile alcun backend della chain.
- `zallet backup` (novità della beta.4) crea un'istantanea coerente di un portafoglio in esecuzione o arrestato.
- Documentazione ufficiale: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Perché esiste Zallet

`zcashd` raggruppava un nodo di consenso derivato da Bitcoin Core e un portafoglio in un unico processo. Quel progetto non esiste più.

| Ruolo | Stack precedente | Stack attuale |
|------|-----------|---------------|
| Consenso / P2P | `zcashd` | Zebra (`zebrad`) oppure Zakura |
| Portafoglio / chiavi / saldi | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indicizzatore light client | `lightwalletd` | Zaino oppure `lightwalletd` |

Separare il portafoglio dal nodo significa:

- Il software del nodo può essere sostituito (Zebra rispetto a Zakura) senza spostare le chiavi.
- La scansione del portafoglio e l'autorità di spesa risiedono in un processo che può essere protetto separatamente.
- La semantica RPC può evolvere verso gli account ZIP 32, gli Unified Addresses e i PCZT anziché rimanere bloccata sulle peculiarità di `zcashd`.

Zallet è il portafoglio destinato agli operatori che in precedenza utilizzavano `zcashd` come portafoglio hot, backend per exchange, faucet o portafoglio per pagamenti di mining.

---

## Stato

Zallet è in versione **beta**.

Cosa significa in pratica:

- Modifiche incompatibili possono arrivare in qualsiasi beta. Potrebbe essere necessario eliminare la directory dei dati e ricominciare.
- Non tutti gli RPC del portafoglio `zcashd` sono stati portati.
- La semantica di alcuni metodi portati differisce da `zcashd`. Le integrazioni devono leggere la pagina [semantica modificata](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- I crate sono in fase di sviluppo e non sono stati sottoposti a una revisione completa.
- Zallet **non** è una libreria Rust. Non esistono garanzie se vi si dipende come tale.

I feedback vanno alle [issue GitHub](https://github.com/zcash/zallet/issues/new) o al canale `#wallet-dev` sul [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

È prevista una successiva fase stabile una volta disponibile la superficie RPC prevista. In tal caso, i chiamanti dovranno migrare ai metodi di Zallet, comprese le differenze semantiche documentate.

---

## Architettura

Zallet è suddiviso in workspace Cargo affinché ogni backend della chain possa seguire il proprio grafo di dipendenze. Dalla v0.1.0-beta.4 viene distribuito solo il backend zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Entrambi i binari aprono lo stesso `wallet.db`. Fino alla v0.1.0-beta.3 era disponibile anche un backend `zallet-zaino`. Se il tuo `zallet.toml` indica `backend = "zaino"`, modificalo in `backend = "zebra"`. Il database del portafoglio non richiede migrazioni e puoi eliminare la vecchia cartella `zaino` dalla directory dei dati.

Il backend zebra legge direttamente il database di stato di `zebrad`, quindi ha bisogno di un `zebrad` compilato con la funzionalità `indexer` e della relativa directory di stato **sullo stesso host**. Un Zallet in un container che comunica via rete con un `zebrad` in un altro container non dispone di una configurazione supportata finché non viene implementato un backend che funziona solo via rete ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Distribuzione tipica:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet è un **portafoglio full node**: richiede un nodo validante locale. Non è un light client. Per i portafogli light e i server di blocchi compatti, vedi [Zaino](Zaino.md) e [Nodi Lightwallet](Lightwallet_Nodes.md).

Lo stack compose di Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) esegue insieme Zebra + Zallet, con Zaino autonomo opzionale per i light client esterni. Le immagini fissate risalgono a prima di NU7 e della beta.4 di Zallet: consulta [Z3 Stack](Z3_Stack.md) prima di usarlo.

---

## Account, indirizzi e chiavi

Zallet è basato sugli account ZIP 32, non sull'unico account implicito di `zcashd`.

- Un portafoglio può contenere **più mnemonic BIP 39**. Ogni mnemonic è una radice di spesa indipendente, identificata da una **seed fingerprint** (`zip32seedfp1…`).
- Gli **account** sono derivati da un seed con un indice account ZIP 32. All'interno di una singola istanza di Zallet, possiedono anche un **UUID** locale. L'identità portabile di un account è `(seedfp, account index)`.
- Gli indirizzi sono **Unified Addresses ZIP 316**, prodotti con `z_getaddressforaccount`. Un account può avere molti indirizzi diversificati; i receiver schermati non sono collegabili on-chain.
- Le chiavi di spesa importate (`z_importkey`) e gli indirizzi watch-only (`z_importaddress`) diventano account UUID non coperti da alcun mnemonic.
- Le chiavi di visualizzazione possono essere esportate e importate (`z_exportviewingkey`, `z_importviewingkey`), comprese le chiavi di visualizzazione complete unificate e le chiavi di visualizzazione in entrata.

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

Copiare `wallet.db` a mano mentre Zallet è in esecuzione non è un backup sicuro: SQLite può corrompere i dati. Dalla v0.1.0-beta.4, usa il comando [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md).

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Scrive uno snapshot coerente con le transazioni e verificato per l'integrità di un portafoglio in esecuzione o arrestato. Se gli passi una directory, dà al file il nome `zallet-wallet-backup-<UTC time>.db` e non sovrascrive mai un file esistente. Dopo dieci minuti interrompe il tentativo con un errore esplicito se le continue scritture sul portafoglio (per esempio durante la sincronizzazione iniziale) continuano a riavviare la copia: riprova più tardi oppure arresta prima il portafoglio. Il backup **non** include il file dell'identità age. Esegui una volta il backup di quel file e conservalo separatamente dai backup del database, perché chiunque abbia entrambi può decifrare le chiavi.

---

## JSON-RPC

Zallet implementa un sottoinsieme degli RPC del portafoglio `zcashd` su HTTP con autenticazione Basic. Effettua il bind su loopback. L'uso remoto dovrebbe passare attraverso un tunnel crittografato. `rpc.allow_insecure_remote_bind` esiste ed è insicuro.

Differenze rilevanti rispetto a `zcashd`:

- I campi dei saldi in `getwalletinfo` sono vuoti. Usa `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Le commissioni seguono **ZIP 317**. Non esiste `settxfee`.
- La costruzione delle spese si sta spostando sui **PCZT** (transazioni di Zcash create parzialmente, ZIP 374). Gli RPC PCZT sono arrivati nella serie beta.
- Un **blocco di sincronizzazione** globale blocca gli RPC di saldo e spesa mentre il portafoglio recupera il ritardo o si riprende da una riorganizzazione (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

I metodi volutamente omessi includono `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` e `encryptwallet`. Le alternative sono elencate nel [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Per iniziare

I metodi di installazione ufficiali (pacchetti Debian, Docker, binari delle release) sono nella [guida all'installazione](https://zcash.github.io/zallet/guide/installation/index.html). Gli archivi delle release si chiamano `zallet-v<version>-linux-<amd64|arm64>.tar.gz` e contengono `zallet` e `zallet-zebra`. Le immagini Docker sono pubblicate come `zodlinc/zallet`.

Flusso minimo per un nuovo portafoglio:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Punta `[indexer]` all'endpoint JSON-RPC locale di `zebrad` con `validator_address`. È obbligatorio e non usa localhost come valore predefinito. Il backend zebra richiede anche `[indexer.read_state_service]` e un `zebrad` 7.0.0 o successivo, compilato con la funzionalità `indexer`, la cui directory di stato si trova sullo stesso host, così Zallet può leggere direttamente lo stato della chain. `indexer.db_path` configurava solo il backend Zaino, ora rimosso: viene ignorato e genera un avviso.

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

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Cos'è | Portafoglio RPC per full node | Server per portafogli con priorità agli indirizzi schermati | Portafogli per utenti finali | Nodo di consenso | Indicizzatore / sostituto di lightwalletd |
| Sostituisce | Portafoglio `zcashd` | Non è un clone compatibile `zcashd` | App per dispositivi mobili e desktop | Nodo `zcashd` | `lightwalletd` |
| Richiede un nodo locale | Sì | Sì (Zebra per impostazione predefinita) | No (light client) | È il nodo | Sì |
| Compatibilità RPC di zcashd | Progettato come percorso di compatibilità | Solo un sottoinsieme selezionato | N/D | Modalità di compatibilità parziale / Zakura | API diversa |
| Modello di custodia | L'operatore detiene le chiavi in `wallet.db` | Server recuperabile con il seed | Chiavi sul dispositivo dell'utente | Nessun portafoglio | Nessuna chiave |

Zallet e **zecd** possono entrambi essere posti davanti a Zebra. Scegli Zallet quando ti serve la superficie del portafoglio `z_*` e un percorso di migrazione da `wallet.dat`. Scegli zecd quando desideri un server incentrato sullo schermato che esplicitamente *non* è un clone di `zcashd`.

Esiste un prodotto consumer separato su [zallet.io](https://www.zallet.io/) che riutilizza il nome. Quell'app non è questo progetto.

---

## Pagine correlate

- [Nodi completi](Full_Nodes.md) — Zebra, Zakura e il nodo `zcashd` non più attivo
- [Zebra Full Node](Zebra_Full_Node.md) — il backend predefinito del nodo Zallet legge
- [Zakura Nodo](Zakura_Node.md) — nodo validatore alternativo
- [Zaino](Zaino.md) — indicizzatore e server per light client (dalla beta.4 non è più un backend di Zallet)
- [Z3 Stack](Z3_Stack.md) — stack composto da Zebra + Zallet
- [zecd](ZECD.md) — un altro design di wallet server basato su librustzcash
- [Zcash Sincronizzazione dei portafogli](Zcash_Wallet_Syncing.md) — come i portafogli schermati scansionano la chain
- [Chiavi di visualizzazione](Viewing_Keys.md)

## Risorse

- [Il Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet su GitHub](https://github.com/zcash/zallet)
- [Rilasci](https://github.com/zcash/zallet/releases) · [changelog di v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [semantica modificata di JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub guida per Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + stack composeZallet)](https://github.com/ZcashFoundation/z3)
- [Zcash ricerca e sviluppo Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
