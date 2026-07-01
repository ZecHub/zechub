# Boletines protegidos


## Configuración

 * Nodo Zebrad en ejecución y completamente sincronizado, con los RPC activados y configurado para usar cookies
 * Zainod completamente sincronizado
 * Zallet configurado para ejecutar RPC


### Iniciar Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

con un archivo zallet.toml configurado

ejemplo de toml:

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

modifica el puerto RPC correcto de zebrad (8232) e incluye el nombre de usuario y la contraseña de la cookie de zebrad


`__cookie__:yourpasswordhere`


### Probar RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Debería mostrar

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
Nota: asegúrate de tener una copia del ejecutable de zallet en la carpeta donde ejecutas el script

### Ejecutar scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Actualiza daoAddress.md con las UA que quieras usar

Abre txBuilderFromFile.sh y actualiza la variable "from" con la UA con fondos que está en tu billetera Zallet

Luego,

`./shieldNewsletter.sh yourNewsletterHere.md`
