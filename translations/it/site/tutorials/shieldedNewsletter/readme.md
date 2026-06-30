# Newsletter schermate


## Configurazione

 * Nodo Zebrad in esecuzione e completamente sincronizzato, con gli RPC attivi e configurati per usare i cookie
 * Zainod completamente sincronizzato
 * Zallet configurato per eseguire gli RPC


### Avviare Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

con un file zallet.toml configurato

esempio di toml:

```markdown
[builder]

trusted_confirmations = 1

untrusted_confirmations = 1

[builder.limits]

[consensus]

network = "main"

[database]

[external]

[features]

as_of_version = "0.0.0"

[features.deprecated]

[features.experimental]

#
[indexer]


validator_address = "127.0.0.1:8232"

# Enable validator RPC cookie authentication.
validator_cookie_auth = true

# Path to the validator cookie file.
validator_cookie_path = "/home/zktails/.cache/zebra/.cookie"


db_path = "/home/zktails/.cache/zaino"

[keystore]

require_backup = false

[note_management]

[rpc]

bind = ["127.0.0.1:8237"]
```


### toCurl.sh

`chmod +x toCurl.sh`

modifica la porta RPC corretta di zebrad (8232) e includi username e password dal cookie di zebrad


`__cookie__:yourpasswordhere`


### Testare gli RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Dovrebbe produrre

```bash
getrawtransaction
getwalletinfo
help
listaddresses
rpc.discover
stop
walletlock
walletpassphrase
z_getaddressforaccount
z_getnewaccount
z_getnotescount
z_getoperationresult
z_getoperationstatus
z_gettotalbalance
z_listaccounts
z_listoperationids
z_listunifiedreceivers
z_listunspent
z_recoveraccounts
z_sendmany
z_viewtransaction
```
Nota: assicurati di avere una copia dell'eseguibile zallet nella cartella in cui esegui lo script

### Eseguire gli script

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Aggiorna daoAddress.md con gli UA che vuoi usare

Apri txBuilderFromFile.sh e aggiorna la variabile "from" con l'UA finanziato presente nel tuo wallet zallet

Poi,

`./shieldNewsletter.sh yourNewsletterHere.md`





