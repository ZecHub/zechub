<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Esportare la cronologia delle transazioni da un Viewing Key

La maggior parte delle esportazioni dei wallet è limitata. L'esportazione fiscale di ZODL, ad esempio, fornisce date, importi e commissioni dell'anno solare precedente, ma nessun ID transazione, memo o indirizzo. Non è sufficiente per la contabilità, per verificare una migrazione del wallet o per capire cosa sia successo a un pagamento.

Non hai bisogno della seed phrase per avere il quadro completo. Una unified full viewing key (UFVK, che inizia con `uview1`) può vedere ogni transazione in entrata e in uscita in un account, e due strumenti possono trasformarle in un file da conservare: il server GraphQL di Zkool e zingo-cli. Questa guida raccoglie gli approcci da [questa discussione del forum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) e li aggiorna alle versioni correnti.

Testato a settembre 2026 con Zkool 6.30.0 e zingo-cli da zingolib 6.0.0.

## Prima di iniziare

Ti servono due cose:

1. **La UFVK** dell'account. [Viewing Keys](/zcash-tech/viewing-keys) spiega cosa rivela e come esportarne una.
2. **Un'altezza di nascita**, il blocco dal quale iniziare la scansione. Usa un'altezza precedente alla tua prima transazione. Se la imposti troppo alta, la cronologia più vecchia viene omessa senza avviso. Se la imposti troppo bassa, la scansione richiede soltanto più tempo. L'attivazione di Sapling (419200) è sempre sicura, ma la scansione può richiedere ore.

## Mantienila privata

Una viewing key non può spendere, ma mostra tutta la tua cronologia a chiunque la possieda.

- Non incollarla in un sito web o in un block explorer. Importala in software eseguito da te.
- Il server dal quale sincronizzi vede il tuo indirizzo IP e quali transazioni scarichi integralmente. Entrambi gli strumenti qui sotto recuperano ciascuna delle tue transazioni tramite ID per leggere memo e commissioni, e [ZIP 307](https://zips.z.cash/zip-0307) osserva che questo comunica al server quali transazioni sono tue. La sincronizzazione dal tuo nodo Zebra con Zaino o lightwalletd lo evita. Il tutorial [Zingolib e Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) illustra una configurazione.
- zingo-cli 6 invia i pagamenti tramite la mixnet Nym, ma la sua sincronizzazione si connette comunque direttamente al server, quindi anche per esso vale quanto sopra.
- Fornisci a questi strumenti una viewing key, mai una seed. Il server GraphQL di Zkool non ha login per impostazione predefinita, e la sua API restituisce la seed di qualsiasi account creato da una seed e può inviare fondi.
- Mantieni il server sul tuo computer. Il comando Docker qui sotto è in ascolto soltanto su `127.0.0.1`.
- Entrambi gli strumenti archiviano la chiave e la tua cronologia senza cifratura. Elimina i dati di lavoro quando hai finito e conserva l'esportazione in un luogo cifrato.

## Opzione 1: GraphQL di Zkool

`zkool_graphql` è il motore wallet di Zkool come server indipendente. È un programma separato dall'app Zkool. Il modo più semplice per eseguirlo è l'immagine Docker ufficiale (amd64 e arm64). C'è anche un binario Linux x86-64 nella pagina delle [Zkool release](https://github.com/hhanh00/zkool2/releases); richiede glibc 2.38 o una versione più recente, quindi Ubuntu 24.04 funziona, mentre Debian 12 no.

### 1. Avvia il server

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Si sincronizza da `https://zec.rocks`, a meno che tu non aggiunga `--lwd-url` con il tuo server. Al primo avvio scarica i parametri di Sapling (circa 50 MB). Se non riesce, `docker start zkool-export` riprova.

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
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
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

zingo-cli è il wallet da riga di comando di Zingo. Non ci sono download precompilati, quindi lo devi compilare con Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Ti serve `nym-proxy` anche solo per sincronizzare. zingo-cli 6 non si connette a nessun server senza di esso.

La prima esecuzione crea un wallet di sola visualizzazione, lo sincronizza e stampa la cronologia:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` deve essere un percorso assoluto.
- `--viewkey` e `--birthday` si applicano solo quando viene creato il wallet. Omettili in seguito.
- zingo-cli si avvia offline per impostazione predefinita. `--server` seleziona il server e vale anche come tuo consenso a collegarti online.
- La chiave finisce nella cronologia della shell, quindi cancellala in seguito.

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

- `transactions` e `value_transfers` stampano testo semplice che somiglia un po' a JSON, ma non lo è.
- Gli importi sono in zatoshi (100.000.000 per 1 ZEC) e sempre positivi. `kind` indica la direzione. Per gli invii, `value` è ciò che è andato ad altre persone, senza la commissione.
- La commissione appare come "not available" quando una transazione spende fondi trasparenti che non erano tuoi. Sono mostrati solo i memo testuali.
- Se la sincronizzazione fallisce, l'errore va nel terminale, non nel file, e zingo-cli termina comunque normalmente. Controlla il terminale prima di fidarti di `transactions.txt`.

Lo [zingoHelper](https://github.com/dismad/zingoHelper) di dismad contiene uno script `exportToJSON.sh` che converte `transactions` in JSON. È stato scritto prima di zingo-cli 6, è configurato per testnet, contrassegna alcuni Sapling in uscita e le voci trasparenti come segnaposto e richiede strumenti GNU, quindi non funziona su macOS standard. Considera il suo output un punto di partenza e verifica i totali.

## Cosa non può dirti una viewing key

- **Prezzi.** Nessuno dei due strumenti registra un prezzo ZEC al momento di ciascuna transazione. Aggiungi tu stesso i valori fiat.
- **Cronologia trasparente, se la chiave non la include.** La parte trasparente di una UFVK è opzionale secondo [ZIP 316](https://zips.z.cash/zip-0316). Con zingo-cli, `$Z --offline parse_viewkey uview1...` mostra quali pool copre una chiave.
- **Chi ti ha pagato.** I pagamenti schermati non includono l'indirizzo del mittente. A meno che il mittente non ne abbia inserito uno nel memo, non è disponibile da nessuna parte.
- **Alcuni dettagli in uscita.** Indirizzo di destinazione, importo e memo per gli invii schermati vengono recuperati decifrando con la chiave. Un wallet può costruire una transazione in modo che ciò non sia possibile, anche se la maggior parte non lo fa.

## Altri strumenti

| Strumento | Cosa ottieni |
|---|---|
| ZODL | CSV fiscale con date, importi, commissioni e un'etichetta. Solo anno solare precedente, ignora le transazioni di schermatura, senza txid, memo o indirizzo. |
| App Zkool | Esportazioni di tabelle grezze dal menu dell'account |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa una UFVK con `importvk`. `listreceived` tramite RPC restituisce le note ricevute con txid e memo, ma non gli invii né le commissioni. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` è dettagliato ma contrassegnato come sperimentale, e Zallet importa soltanto viewing key Sapling, non UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa una UFVK con `wallet init-fvk`, poi `wallet list-tx`. La sua modalità CSV non ha txid né indirizzo, e il progetto afferma di non usarla in produzione. |

## Correlati

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recuperare fondi](/using-zcash/recovering-funds)
- [Zingolib e Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Esportare la cronologia delle transazioni in JSON/CSV da UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool e GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README di zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
