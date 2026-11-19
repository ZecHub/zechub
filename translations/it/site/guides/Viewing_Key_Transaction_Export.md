<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Esportare la cronologia delle transazioni da una Viewing Key

La maggior parte delle esportazioni dei portafogli è limitata. L'esportazione fiscale di ZODL, ad esempio, fornisce date, importi e commissioni dell'anno solare precedente, ma nessun ID transazione, memo o indirizzo. Non è sufficiente per la contabilità, per verificare una migrazione del portafoglio o per capire cosa sia successo a un pagamento.

Non hai bisogno della frase mnemonica per avere il quadro completo. Una chiave di visualizzazione completa unificata (UFVK, che inizia con `uview1`) può vedere ogni transazione in entrata e in uscita in un account, e due strumenti possono trasformare tutto in un file da conservare: il server GraphQL di Zkool e zingo-cli. Questa guida raccoglie gli approcci da [questa discussione del forum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) e li aggiorna alle versioni correnti.

Testato a settembre 2026 con Zkool 6.30.0 e zingo-cli dalla versione zingolib 6.0.0. Entrambe le versioni precedono NU7, quindi a novembre 2026 i passaggi sono stati aggiornati alle versioni Zkool 6.37.0 e zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) è la prima release di Zkool compilata con l'altezza di attivazione di Mainnet di NU7, e zingolib 8.0.0 è la release che aggiunge il supporto per Mainnet di NU7.

## Prima di iniziare

Ti servono due cose:

1. **La UFVK** dell'account. [Chiavi di visualizzazione](/zcash-tech/viewing-keys) spiega cosa rivela e come esportarne una.
2. **Un'altezza di nascita**, il blocco dal quale iniziare la scansione. Usa un'altezza precedente alla tua prima transazione. Se la imposti troppo alta, la cronologia più vecchia viene omessa senza avviso. Se la imposti troppo bassa, la scansione richiede soltanto più tempo. L'attivazione di Sapling (419200) è sempre sicura, ma la scansione può richiedere ore.

## Mantienila privata

Una chiave di visualizzazione non può spendere, ma mostra tutta la tua cronologia a chiunque la possieda.

- Non incollarla in un sito web o in un block explorer. Importala in un software che esegui tu.
- Il server dal quale sincronizzi vede il tuo indirizzo IP e quali transazioni scarichi integralmente. Entrambi gli strumenti qui sotto recuperano ciascuna delle tue transazioni tramite ID per leggere i memo e le commissioni, e [ZIP 307](https://zips.z.cash/zip-0307) osserva che questo comunica al server quali transazioni sono tue. Sincronizzare dal tuo Zebra nodo con Zaino o lightwalletd evita che accada. Il tutorial [Zingolib e Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) illustra una configurazione.
- zingo-cli invia pagamenti tramite la mixnet Nym, ma la sincronizzazione si connette comunque direttamente al server, quindi anche per esso vale quanto detto sopra.
- Fornisci a questi strumenti una chiave di visualizzazione, mai una frase mnemonica. Il comando Docker qui sotto avvia il server Zkool GraphQL con `--allow-unauthenticated`, quindi senza login: la sua API restituisce la frase mnemonica di qualsiasi account creato a partire da una frase mnemonica e può inviare fondi.
- Mantieni il server sul tuo computer. Il comando Docker qui sotto resta in ascolto solo su `127.0.0.1` del tuo computer. All'interno del container, il server deve restare in ascolto su tutte le interfacce (`--bind-address 0.0.0.0`), altrimenti Docker non può raggiungerlo; è la mappatura `-p 127.0.0.1:8000:8000` a mantenerlo locale.
- Entrambi gli strumenti archiviano la chiave e la tua cronologia senza cifratura. Zkool può cifrare il suo database (`--db-password-file`), ma il comando qui sotto semplifica usando `--allow-unencrypted-database`. Elimina i dati di lavoro quando hai finito e conserva l'esportazione in un luogo cifrato.

## Opzione 1: GraphQL di Zkool

`zkool_graphql` è il motore di portafoglio di Zkool come server indipendente. È un programma separato dall'app Zkool. Il modo più semplice per eseguirlo è l'immagine Docker ufficiale (amd64 e arm64). C'è anche un binario Linux x86-64 nella pagina delle [versioni di Zkool](https://github.com/hhanh00/zkool2/releases); richiede glibc 2.38 o una versione più recente, quindi Ubuntu 24.04 funziona, mentre Debian 12 no.

### 1. Avvia il server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Dalla versione 6.32.0, il server non si avvia finché non specifichi due scelte: come accedono i client (una chiave JWT oppure `--allow-unauthenticated`) e se il database è crittografato (una password oppure `--allow-unencrypted-database`). Ora ascolta anche solo su `127.0.0.1` per impostazione predefinita: in un container questo significa che dall'esterno non è raggiungibile, da qui `--bind-address 0.0.0.0`. Se il container si arresta subito, `docker logs zkool-export` mostra quale opzione manca.

Si sincronizza da `https://zec.rocks`, a meno che tu non aggiunga `--lwd-url` con il tuo server. L'immagine include già i parametri Sapling, quindi non devi scaricare altro.

Apri `http://127.0.0.1:8000/graphiql` in un browser. Puoi incollare lì ciascuno dei passaggi successivi ed eseguirlo.

### 2. Importa la chiave

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Restituisce l'ID del nuovo account, che è 1 su un server appena configurato.

- Imposta sempre `birth`. Senza di esso, Zkool parte dal blocco corrente e non trova nulla.
- `useInternal: true` fa sì che Zkool controlli anche gli indirizzi di resto trasparenti. Lascialo attivo per le chiavi da ZODL: è la stessa impostazione che [Recuperare fondi](/using-zcash/recovering-funds) usa per le seed ZODL.

### 3. Sincronizza

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Questo viene eseguito fino al termine della sincronizzazione. Non aggiungere `fast: true`. Salta il download delle transazioni complete, da cui provengono memo, commissioni e output.

Il numero restituito è l'altezza che stava cercando di raggiungere, non la prova che l'abbia raggiunta. Un errore di rete può terminare la sincronizzazione in anticipo senza segnalare nulla, quindi verifica:

```graphql
{ currentHeight accounts { id name height } }
```

Se `height` dell'account è indietro rispetto a `currentHeight`, esegui nuovamente la sincronizzazione. Riprenderà da dove si è interrotta.

### 4. Esporta

Salva questo come `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Ometti l'argomento `height` a meno che non sia davvero ciò che intendi. Imposta un minimo, quindi `height: 3000000` dell'esempio del forum esclude tutto ciò che precede quel blocco.

Recuperalo come JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Ogni transazione dovrebbe mostrare una commissione superiore a 0, a parte le ricompense di mining. Se una mostra `"fee": "0"` e nessun memo, i suoi dettagli non sono stati scaricati. Zkool recupera le transazioni complete una alla volta dopo la scansione, e un errore interrompe silenziosamente le restanti. Per elencare quelle interessate:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Se appare qualcosa, sincronizza nuovamente alcuni minuti dopo ed esporta di nuovo.

Poi appiattiscilo in CSV, una riga per transazione:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. ![Schermata di verifica in 2 passaggi] null and . ![Schermata di verifica in 2 passaggi] "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Leggere l'output

| Campo | Significato |
|---|---|
| `value` | Variazione netta dell'account in ZEC, commissione inclusa. Negativa per gli invii. |
| `fee` | Commissione in ZEC. Nei pagamenti ricevuti, l'ha pagata il mittente e non è inclusa in `value`. |
| `time` | Ora del blocco in UTC, senza indicatore di fuso orario |
| `notes` | Ciò che l'account ha ricevuto in questa transazione, incluso il resto. I memo inviati a te sono qui. Le voci trasparenti non hanno indirizzo. |
| `spends` | Le note dell'account che questa transazione ha utilizzato |
| `outputs` | Ciò che la transazione ha inviato: ogni output trasparente, più i pagamenti schermati ad altri indirizzi con i relativi memo |
| `pool` | 0 trasparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 esterno (un pagamento in entrata), 1 interno (resto) |

L'app Zkool dispone anche di Esporta transazioni, Memo e Note nel menu dell'account, ma si tratta di dump di tabelle grezze: importi in zatoshi, timestamp Unix e memo in un file separato.

## Opzione 2: zingo-cli

zingo-cli è il portafoglio da riga di comando di Zingo. Non ci sono download precompilati, quindi lo compili con Rust. Usa la versione 8.0.0 o successiva di zingolib: è la prima versione che conosce l’altezza di attivazione di Mainnet di NU7 (3.543.405), secondo le [note di rilascio](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Le build dai tag precedenti, come 6.0.0, non la conoscono.

La build usa [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). Su Ubuntu serve anche `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Questo compila `./target/release/zingo-cli` e lo colloca accanto a `nym-proxy`. Ti serve `nym-proxy` anche solo per sincronizzare: zingo-cli non si collega senza. Dalla versione 8.0.0, `zingo-netutils` fa parte dello workspace principale, quindi la vecchia procedura che copiava `nym-proxy` da `zingo-netutils/target/release/` non funziona più.

Se sposti `zingo-cli` altrove, sposta anche `nym-proxy` oppure indica a zingo-cli dove si trova con `--nym-proxy /path/to/nym-proxy` o con la variabile d'ambiente `ZINGO_NYM_PROXY`. Senza queste indicazioni, lo cerca accanto al proprio binario e poi nel tuo `PATH`. Se non riesce ad avviare il proxy, non si collegherà affatto.

Solo i pagamenti (e la consultazione del prezzo di ZEC) passano attraverso Nym. Sync si connette direttamente al server.

La prima esecuzione crea un portafoglio di sola visualizzazione, lo sincronizza e stampa la cronologia:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` deve essere un percorso assoluto.
- `--viewkey` e `--birthday` si applicano solo quando crei il portafoglio. In seguito, omettili.
- Un nuovo zingo-cli è offline per impostazione predefinita e ha bisogno del tuo consenso per connettersi. `--server` seleziona il server e vale anche come consenso. Le altre opzioni sono `--online` (solo per questa sessione) e `--remember-online`, che salva anche la scelta accanto al portafoglio, così le esecuzioni successive si connettono senza un flag (`--forget-online` annulla la scelta).
- La chiave finisce nella cronologia della shell, quindi cancellala dopo.

Esecuzioni successive:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` legge ciò che è già sincronizzato senza accedere alla rete.

- `transactions` fornisce una voce per transazione: txid, ora (UTC), altezza, tipo (`received`, `sent`, `shield` o `send-to-self`), valore, commissione e note coinvolte.
- `value_transfers` fornisce una voce per pagamento, quindi un invio a due persone produce due voci, ciascuna con l'indirizzo del destinatario e i memo.
- `messages` elenca i memo come JSON.

Alcune cose da sapere sull'output:

- `transactions` e `value_transfers` stampano testo semplice che assomiglia un po' a JSON, ma non lo è.
- Gli importi sono espressi in zatoshi (da 100.000.000 a 1 ZEC) e sono sempre positivi. `kind` ti indica la direzione. Per gli invii, `value` è l'importo ricevuto dagli altri, al netto della commissione.
- La commissione viene indicata come "non disponibile" quando una transazione spende fondi trasparenti che non erano tuoi. Vengono mostrati solo i memo testuali.
- Se la sincronizzazione non riesce, l'errore viene visualizzato nel terminale, non nel file. A partire da zingolib 8.0.0 (zingo-cli 0.5.0), anche un comando non riuscito termina con un codice diverso da zero, ma controlla il terminale prima di fidarti di `transactions.txt`.

Lo [zingoHelper](https://github.com/dismad/zingoHelper) di dismad contiene uno script `exportToJSON.sh` che converte `transactions` in JSON. È stato scritto prima di zingo-cli 6, è configurato per testnet, contrassegna alcuni Sapling in uscita e le voci trasparenti come segnaposto e richiede strumenti GNU, quindi non funziona su macOS standard. Considera il suo output un punto di partenza e verifica i totali.

## Cosa non può dirti una chiave di visualizzazione

- **Prezzi.** Nessuno dei due strumenti registra un prezzo ZEC al momento di ciascuna transazione. Aggiungi tu stesso i valori fiat.
- **Cronologia trasparente, se la chiave non la include.** La parte trasparente di una UFVK è opzionale secondo [ZIP 316](https://zips.z.cash/zip-0316). Con zingo-cli, `$Z --offline parse_viewkey uview1...` mostra quali pool copre una chiave.
- **Chi ti ha pagato.** I pagamenti schermati non includono l'indirizzo del mittente. A meno che il mittente non ne abbia inserito uno nel memo, non è disponibile da nessuna parte.
- **Alcuni dettagli in uscita.** Indirizzo di destinazione, importo e memo per gli invii schermati vengono recuperati decifrando con la chiave. Un portafoglio può costruire una transazione in modo che ciò non sia possibile, anche se la maggior parte non lo fa.

## Altri strumenti

| Strumento | Cosa ottieni |
|---|---|
| ZODL | CSV fiscale con date, importi, commissioni e un'etichetta. Solo anno solare precedente, ignora le transazioni di schermatura, senza txid, memo o indirizzo. |
| App Zkool | Esportazioni di tabelle grezze dal menu dell'account |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa una UFVK con `importvk`. `listreceived` tramite RPC restituisce le note ricevute con txid e memo, ma non gli invii né le commissioni. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` è dettagliato ma contrassegnato come sperimentale, e Zallet importa soltanto chiavi di visualizzazione Sapling, non UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa una UFVK con `wallet init-fvk`, poi `wallet list-tx`. La sua modalità CSV non ha txid né indirizzo, e il progetto afferma di non usarla in produzione. |

## Correlati

- [Chiavi di visualizzazione](/zcash-tech/viewing-keys)
- [Recuperare i fondi](/using-zcash/recovering-funds)
- [Zingolib e tutorial di Zaino](/guides/zingolib-and-zaino-tutorial)
- [Forum: Esportare la cronologia delle transazioni in JSON/CSV da UFVK/frase mnemonica](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool e GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
