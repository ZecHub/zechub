<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter schermata

> Invia una nota Markdown a un elenco di indirizzi schermati come memo Zcash, usando Zallet. L'elenco dei destinatari e la nota restano fuori dagli indirizzi trasparenti.

Una newsletter schermata è una serie di transazioni schermate. Ogni output paga una piccola somma a un destinatario Unified Address e contiene la porzione successiva della nota nel campo memo. Zallet costruisce e invia queste transazioni. Zebra e Zaino forniscono soltanto dati della chain.

Gli script si trovano in [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Sono stati scritti per una prima versione di Zallet e non è sicuro eseguirli così come sono sulla release attuale. Questa pagina contiene la procedura aggiornata. Verificata con Zallet `v0.1.0-beta.3` e il libro di Zallet al 7 ottobre 2026.

## Cosa ti serve

- Zebra completamente sincronizzato, con RPC associato a localhost.
- Zaino sincronizzato con quel nodo Zebra.
- Zallet `v0.1.0-beta.3` o successivo, build wallet, con il relativo RPC associato a localhost. Il libro indica `z_sendmany` come implementato. Una commissione numerica viene rifiutata: se passi `fee`, deve essere `null`, perché Zallet usa sempre la commissione 317 di ZIP.
- Un account finanziato il cui Unified Address possa spendere fondi schermati.
- Unified Addresses dei destinatari. Un memo su un indirizzo trasparente è un errore.

Non inserire un indirizzo finanziato o un cookie nella wiki né in uno script sottoposto a commit. L'attuale `txBuilderFromFile.sh` ha un Unified Address hardcoded. Sostituiscilo localmente e non effettuare il commit.

## Configurare Zallet

Genera una configurazione con l'Zallet in esecuzione, quindi indirizzala a Zebra e Zaino. L'esempio nel vecchio tutorial usa `as_of_version = "0.0.0"` e un percorso home personale. Considera quel file come un'istantanea, non come un modello.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` deve elencare `z_sendmany`, `z_getoperationstatus` e `z_getoperationresult`. Associa RPC soltanto a `127.0.0.1`.

## Elenco dei destinatari

Un Unified Address per riga, senza virgolette né righe vuote. Lo script legge `daoAddresses.md`. Il vecchio readme indica `daoAddress.md`. Quel file non è nel repository e i nomi non corrispondono.

```text
u1...
u1...
```

## Inviare un memo

`z_sendmany` è asincrono. Restituisce un ID operazione. Interroga `z_getoperationstatus` finché lo stato non è `success` o non si verifica un errore. Un'attesa fissa di 5 secondi, che è ciò che fa lo script, perde il risultato quando la compilazione richiede più tempo. `z_getoperationresult` consuma l'operazione, quindi non chiamarlo finché lo stato non è terminale.

La commissione è omessa. Zallet calcola ZIP 317. Non passare un numero.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Il campo memo è esadecimale raw, con un massimo di 512 byte. `ascii2hex` codifica solo ASCII. Una nota con qualsiasi carattere non ASCII fallisce. `xxd` o `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` gestisce UTF-8.

Il criterio di privacy predefinito è `FullPrivacy`. È l'impostazione predefinita corretta per un destinatario schermato. Non passare `AllowFullyTransparent`.

## Difetti degli script

Questi sono presenti nell'albero all'8 ottobre 2026. Non eseguire `shieldNewsletter.sh` finché non vengono corretti.

- In `[[ bytesInFile -lt 512 ]]` manca `$`. Il ramo del memo singolo non viene mai eseguito.
- Il ciclo dei frammenti memorizza esadecimale, poi `hex2ascii` lo decodifica, quindi `txBuilderFromFile.sh` lo codifica nuovamente. L'ultimo frammento non viene scaricato, a meno che una riga successiva non superi 512. Una riga lunga non viene suddivisa. Viene inviata interamente e può superare il memo di 512 byte.
- `txBuilderFromFile.sh` chiama `./zallet rpc` senza un percorso di configurazione e si aspetta il binario nella directory corrente. Usa `zallet -c <config> rpc`.
- `toCurl.sh` comunica con Zebra sulla porta 8232 con un cookie e chiama `getinfo` e `sendmany`. Zallet non fornisce `sendmany`. Anche il ciclo di attesa per il mining usa `[[ chainHeight -gt temp ]]` senza `$`, quindi non attende.
- `z_gettotalbalance 0 true` viene passato come argomenti posizionali aggiuntivi. Controlla `rpc help z_gettotalbalance` sul binario in uso prima di utilizzare quella chiamata.
- Ogni frammento invia `0.0001` ZEC a ogni destinatario. La commissione 317 di ZIP si aggiunge a ciò. Una nota lunga destinata a molti indirizzi spende più degli importi dust.

## Dopo una correzione

Un esecutore corretto dovrebbe:

1. Leggere la nota come byte e dividerla ai confini di 512 byte, non sulle righe.
2. Codificare in esadecimale ogni frammento una sola volta.
3. Chiamare `zallet -c <config> rpc z_sendmany` con l'UA finanziato, l'array dei destinatari e nessun argomento per la commissione.
4. Interrogare `z_getoperationstatus` per quell'ID operazione.
5. Registrare il txid solo dopo `success`.

La vecchia pagina del tutorial rimane in [Script per Shielded Newsletter](/tutorials/shieldednewsletter/readme). Usa questa pagina per la procedura.
