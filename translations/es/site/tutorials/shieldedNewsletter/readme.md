# Boletines blindados [Shielded Newsletters]


## Configuración

 * Nodo [node] Zebrad en ejecución y completamente sincronizado con las RPC activadas y configurado para usar cookies
 * zainod completamente sincronizado
 * Zallet configurado para ejecutar RPC


### Iniciar Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

Con un archivo zallet.toml configurado

Ejemplo de toml:

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

Modifica el puerto RPC (8232) correcto de zebrad e incluye el nombre de usuario y la contraseña de la cookie de zebrad


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
Nota [Note]: asegúrate de tener una copia del ejecutable zallet en la carpeta donde ejecutas el script

### Ejecutar scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Actualiza daoAddress.md con las UA que deseas usar

Abre txBuilderFromFile.sh y actualiza la variable «from» con la UA financiada que está en tu billetera zallet

Luego,

`./shieldNewsletter.sh yourNewsletterHere.md`
