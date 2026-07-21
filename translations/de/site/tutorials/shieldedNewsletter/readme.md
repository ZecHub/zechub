# Geschützte Newsletter


## Einrichtung

 * zebrad-Node läuft und ist vollständig synchronisiert, mit aktivierten RPCs und so konfiguriert, dass Cookies verwendet werden
 * Zainod vollständig synchronisiert
 * Zallet so eingerichtet, dass RPCs ausgeführt werden


### Zallet starten

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

mit einer konfigurierten zallet.toml-Datei

Beispiel-TOML:

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

den korrekten Zebrad-RPC-Port (8232) anpassen und Benutzername sowie Passwort aus dem Zebrad-Cookie einfügen


`__cookie__:yourpasswordhere`


### RPC testen

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Sollte Folgendes ausgeben

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
Hinweis: Stelle sicher, dass du eine Kopie der zallet-Executable in dem Ordner hast, in dem du das Skript ausführst

### Skripte ausführen

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Aktualisiere daoAddress.md mit den UAs, die du verwenden möchtest

Öffne txBuilderFromFile.sh und aktualisiere die Variable „from“ auf die finanzierte UA, die sich in deiner Zallet-Wallet befindet

Dann

`./shieldNewsletter.sh yourNewsletterHere.md`
