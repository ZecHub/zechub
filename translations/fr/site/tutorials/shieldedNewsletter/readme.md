# Newsletters blindées


## Configuration

 * Nœud Zebrad en cours d’exécution et entièrement synchronisé avec les RPC activés et configurés pour utiliser des cookies
 * Zainod entièrement synchronisé
 * Zallet configuré pour exécuter les RPC


### Démarrer Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

avec un fichier zallet.toml configuré

exemple de toml :

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

modifiez le port RPC zebrad correct (8232) et incluez le nom d’utilisateur et le mot de passe du cookie zebrad


`__cookie__:yourpasswordhere`


### Tester le RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Devrait afficher

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
Remarque : assurez-vous d’avoir une copie de l’exécutable zallet dans le dossier où vous exécutez le script

### Exécuter les scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Mettez à jour daoAddress.md avec les UA que vous souhaitez utiliser

Ouvrez txBuilderFromFile.sh et mettez à jour la variable "from" avec l’UA approvisionnée qui se trouve dans votre portefeuille zallet

Ensuite,

`./shieldNewsletter.sh yourNewsletterHere.md`
