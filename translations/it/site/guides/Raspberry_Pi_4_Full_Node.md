# Eseguire un nodo completo su un Raspberry Pi 4 (Zebra + Zallet)

*Migrato dalla guida originale basata su zcashd. zcashd ha raggiunto il suo arresto automatico di Fine del Supporto il 18 luglio 2026, quindi questa guida ora utilizza **Zebra** (l'attuale nodo completo, mantenuto dalla Zcash Foundation) e **Zallet** (il wallet creato per sostituire il wallet integrato di zcashd).*

## Cosa imparerai
- Come scrivere e configurare Ubuntu Server 22.04+ (64-bit) su un Raspberry Pi 4 per un utilizzo headless
- Come installare ed eseguire Zebra, tramite Docker oppure con un binario precompilato
- Come installare, configurare e inizializzare Zallet, inclusa la configurazione della cifratura del wallet
- Come migrare facoltativamente una configurazione/un wallet zcashd esistente in Zallet

## Cosa è cambiato rispetto alla vecchia guida
La versione precedente di questa guida mostrava come compilare **zcashd** nativamente su un Pi 4 — una compilazione single-thread che richiedeva 3–4 ore perché il Pi 4 non ha memoria sufficiente per una build parallela (`-j$(nproc)`). Sia Zebra sia Zallet ora distribuiscono **binari ARM64 precompilati ufficiali e immagini Docker**, quindi nella maggior parte dei casi non è più necessario compilare nulla dai sorgenti direttamente sul Pi.

## Prerequisiti
- Un Raspberry Pi 4 (consigliati 4 GB di RAM o più)
- Una scheda microSD (32 GB+) per il sistema operativo
- Un SSD/HDD esterno con supporto USB 3.0 — **Zebra richiede circa 300 GB per i dati Mainnet in cache**, con crescita nel tempo, quindi non provare a farlo funzionare usando soltanto la scheda microSD
- Un computer con uno slot per schede microSD (per scrivere l'immagine del sistema operativo)
- Una connessione Ethernet cablata o Wi-Fi
- Familiarità di base con la riga di comando via SSH

## Passo 1: Scrivere Ubuntu Server 22.04+ (64-bit)
I binari precompilati e le immagini Docker di Zebra e Zallet richiedono **glibc 2.34+**, il che significa **Ubuntu Server 22.04 o più recente (64-bit/aarch64)**.

1. Installa Raspberry Pi Imager sul tuo computer principale.
2. Inserisci la scheda microSD.
3. Scegli **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (o una versione più recente).
4. Usa le opzioni avanzate dell'Imager (icona a ingranaggio) per preconfigurare hostname, abilitare SSH e impostare le credenziali Wi-Fi se necessario, per un primo avvio headless.
5. Scrivi l'immagine, inserisci la scheda e accendi il Pi.
6. Collegati via SSH: `ssh <username>@<pi-hostname-or-ip>`

## Passo 2: Collegare e montare lo storage esterno
1. Collega il tuo SSD/HDD esterno tramite USB 3.0.
2. Identifica il dispositivo: `lsblk`
3. Formattalo (se nuovo) e montalo, ad esempio in `/mnt/zcash-data`, con una configurazione standard `mkfs`/`fstab` in modo che venga montato automaticamente al riavvio.

## Passo 3: Aggiornare il sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Passo 4: Installare ed eseguire Zebra
### Opzione A — Docker (consigliata)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Controlla l'avanzamento: `docker logs -f zebra`

### Opzione B — Binario precompilato tramite cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Questo installa un binario `aarch64` precompilato — non è richiesta alcuna compilazione.

**Sui tempi di sincronizzazione:** aspettati che richieda un po' di tempo — i tempi di prima sincronizzazione comunemente citati (circa 2 ore) provengono da hardware di riferimento più potente della CPU di un Pi 4, quindi il tempo di sincronizzazione reale su un vero Pi 4 sarà probabilmente maggiore.

## Passo 5: Installare Zallet
Zallet è attualmente in **alpha** — aspettati modifiche incompatibili, e non considerarlo ancora pronto per custodire in produzione fondi significativi.

### Opzione A — Docker (consigliata)
```bash
docker pull zodlinc/zallet:latest
```
Questa immagine supporta ARM64 (tramite una build basata su Nix) e viene eseguita da un filesystem minimale senza shell — passa esplicitamente configurazione e percorsi dati tramite `--datadir` e mount di volumi (vedi Passo 6).

### Opzione B — Compilazione dai sorgenti
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
I crate di Zallet non sono ancora pubblicati su crates.io durante la fase alpha, quindi l'installazione diretta dal repository git è il metodo supportato non-Docker.

## Passo 6: Configurare Zallet
Crea `zallet.toml` nella directory dati scelta (ad esempio `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Modifica `validator_address` se Zebra è in esecuzione su un host/porta diversi, e configura `validator_cookie_auth`/`validator_user`/`validator_password` sotto `[indexer]` in modo che corrispondano alla configurazione di autenticazione RPC di Zebra.

**Migrazione da zcashd?** Se hai ancora un vecchio `zcash.conf`:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Passo 7: Impostare la cifratura del wallet
Zallet cifra tutto il materiale delle chiavi usando `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Questo stampa una chiave pubblica e una passphrase generata automaticamente — **salva la passphrase; non potrai recuperare il file identity senza di essa.**

## Passo 8: Inizializzare e avviare il wallet
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Esegui `generate-mnemonic` una sola volta** a meno che tu non voglia deliberatamente più radici di spesa indipendenti.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Passo 9: Migrare un wallet zcashd esistente (facoltativo)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Questo richiede l'utilità `db_dump` (compilata contro Berkeley DB 6.2.23) — da un'installazione di sistema oppure da una compilazione locale dai sorgenti di zcashd. Se non hai più zcashd installato, questo è l'unico passaggio di migrazione che non è ancora completamente autonomo in Zallet.

## Passo 10: Verificare che tutto funzioni
```bash
zallet -d /mnt/zcash-data/zallet help
```
Conferma che il wallet risponda e, una volta che Zebra ha completato la sincronizzazione, che saldi/indirizzi corrispondano alle aspettative.

## Risoluzione dei problemi
- **Problemi di build/runtime di Zebra su ARM:** se compili dai sorgenti, installa la toolchain Rust per ARM — eseguire strumenti di build x86_64 su hardware ARM sarà sensibilmente più lento, come indicato anche nella documentazione di Zebra.
- **Spazio di archiviazione che si esaurisce:** l'ingombro di ~300 GB di Zebra continua a crescere — pianifica spazio extra.
- **Errori di permessi Docker:** esci e rientra dopo aver aggiunto il tuo utente al gruppo `docker`, oppure nel frattempo usa `sudo`.
- **Il container Zallet non ha una shell:** l'immagine ufficiale `zodlinc/zallet` è volutamente from-scratch — passa sempre `--datadir` in modo esplicito e monta la tua directory dati come volume.

## Note hardware rispetto alla vecchia guida zcashd
Zebra e Zallet sono generalmente più leggeri sulla CPU durante la configurazione rispetto alla compilazione di zcashd, dato che esegui binari/container precompilati. 4 GB di RAM sono un punto di partenza ragionevole; monitora con `htop` e considera la variante Pi 4 da 8 GB se noti un uso intenso dello swap.

## Risorse aggiuntive
- [Libro di Zebra](https://zebra.zfnd.org) — documentazione ufficiale di Zebra
- [Libro di Zallet](https://zcash.github.io/wallet) — documentazione ufficiale di Zallet
- [Avviso di Fine del Supporto di zcashd](https://z.cash/support/zcashd-deprecation)

---

*Se hai trovato utile questa guida, considera di supportare ZecHub: [inserisci l'attuale indirizzo shielded per le donazioni di ZecHub da zechub.wiki/donation — non incluso qui perché non ho potuto verificare che sia ancora attuale].*
