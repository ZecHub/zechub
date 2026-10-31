# Il Devtool Zcash

[Che cos'è zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Il Devtool Zcash è una piattaforma per sperimentare su Zcash. È realizzato da sviluppatori, per sviluppatori, per il test e lo sviluppo di nuove funzionalità di Zcash; e non deve essere considerato pronto per la produzione. L'API a riga di comando esposta da questo strumento può cambiare in qualsiasi momento e senza preavviso. NON affidare fondi significativi alla gestione del portafoglio incorporato di zcash-devtool.

### Tutorial video del Devtool Zcash:
Kris Nuttycombe (@nuttycom) ha presentato questo strumento durante ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: il multitool di sviluppo di Zcash con Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Per una guida passo passo su come iniziare a usare questi strumenti, consulta [questa guida](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Documenta una procedura completa per configurare e usare gli strumenti del devtool zcash. È pensata come guida per la configurazione e per aggiungere le tue funzionalità allo strumento.

## Avvio rapido

I comandi seguenti sono stati verificati con zcash-devtool `main` (commit `5a26ee8`, agosto 2026). Lo strumento cambia senza preavviso, quindi esegui `--help` su qualsiasi comando se qualcosa qui non corrisponde più.

### Installazione

Non esistono binari precompilati. Installa [Rust](https://rustup.rs), quindi compila dal codice sorgente:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Gli esempi seguenti chiamano il binario compilato, `target/release/zcash-devtool`. `cargo run --release -- ...` funziona allo stesso modo.

### Crea un portafoglio testnet

Inizia su testnet. Le monete testnet (TAZ) non hanno valore.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` è la directory del portafoglio. Va dopo `wallet` e prima del sottocomando.
- `-i` è un file di identità [age](https://age-encryption.org). La frase mnemonica del portafoglio viene crittografata con esso e il file viene creato se non esiste. Conservalo: `send`, `shield` e altri comandi di spesa ne hanno bisogno per decrittografare il seed.
- `-n` è la rete: `test` o `main`.
- `-s` seleziona il server del portafoglio leggero. Il valore predefinito, `zecrocks`, si connette al server zec.rocks per la rete scelta.
- Per ripristinare un portafoglio esistente, usa `restore-mnemonic` al posto di `init`. Ti verrà richiesta la frase.

`balance` elenca ogni pool separatamente, inclusa Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Esegui `zcash-devtool wallet -w ./my-wallet list-addresses` per vedere l'indirizzo unificato del portafoglio e inviagli fondi testnet da un [faucet](https://zechub.wiki/using-zcash/faucets).

Per mainnet, passa `-n main` a `init`. Usa solo importi che puoi permetterti di perdere.

### Invia e scherma

Gli importi sono in zatoshi (1 ZEC = 100.000.000 zatoshi).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` mostra la transazione che `send` creerebbe, senza inviarla. `list-tx` e `list-unspent` mostrano la cronologia e le note del portafoglio.

Qualsiasi comando che comunica con un server accetta anche `--connection tor`, che instrada la connessione attraverso il client Tor integrato.

### Ispeziona indirizzi, chiavi e transazioni

`inspect` decodifica dati di Zcash offline: indirizzi, chiavi e transazioni grezze. Aggiungi `--lookup` per recuperare ulteriori informazioni dalla chain, come una transazione tramite il suo ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Le note Ironwood vengono inviate allo stesso ricevitore Orchard in un indirizzo unificato, quindi gli indirizzi non sono cambiati con NU6.3.

### Crea transazioni in passaggi con PCZT

Una PCZT (transazione di Zcash parzialmente creata) suddivide la creazione di una transazione in passaggi separati: creazione, prova, firma e invio. Ogni passaggio può essere eseguito su una macchina diversa, ad esempio con un firmatario hardware come Keystone. Ogni comando `pczt` legge la PCZT da un file o da stdin e la scrive in un file (`--output`) o su stdout, quindi i passaggi possono essere concatenati:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` elenca gli altri passaggi, inclusi `inspect`, `redact`, `combine`, `extract` e `shield`.

### Sposta fondi da Orchard a Ironwood

A partire da NU6.3, i fondi Orchard possono essere spostati solo verso gli indirizzi del portafoglio stesso. I comandi `migration` li spostano in Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` visualizza in anteprima le suddivisioni delle note e la pianificazione del trasferimento, senza modificare nulla.
- `commit` crea e pre-firma le prime transazioni di preparazione. Aggiungi `--external` per lasciarle non firmate per un firmatario esterno come Keystone.
- `status` mostra l'avanzamento della migrazione e il passaggio successivo.
- `advance` dimostra la transazione successiva il cui anchor è pronto.

I comandi di migrazione sono ancora in fase di sviluppo. `advance` si ferma alla prima transazione pronta per essere trasmessa, perché la trasmissione non è ancora implementata nello strumento. Per l'uso quotidiano, sposta i fondi con un portafoglio che supporti Ironwood. Consulta [Pool schermate](https://zechub.wiki/using-zcash/shielded-pools).


**Avvertenze di sicurezza:**
NON USARE IN PRODUZIONE!!!
L'app non è stata scritta pensando alla sicurezza. Dispone tuttavia di funzionalità come la crittografia delle frasi mnemoniche seed che dovrebbero renderla adatta a sperimentazioni su piccola scala, a tuo rischio.

### Avanzato (tutorial librustzcash)


[guarda il video qui](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
