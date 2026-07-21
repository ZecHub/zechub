# Newsletters Blindadas


## Configuração

 * Nó Zebrad em execução e totalmente sincronizado, com RPCs ativados e configurado para usar cookies
 * Zainod totalmente sincronizado
 * Zallet configurado para executar RPCs


### Iniciar o Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

com um arquivo zallet.toml configurado

exemplo de toml:

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

modifique a porta correta do RPC do zebrad (8232) e inclua o nome de usuário e a senha do cookie do zebrad


`__cookie__:yourpasswordhere`


### Testar RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Deve retornar

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
Observação: certifique-se de ter uma cópia do executável do zallet na pasta onde você executa o script

### Executar scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Atualize daoAddress.md com os UAs que você deseja usar

Abra txBuilderFromFile.sh e atualize a variável "from" para o UA com fundos que está na sua carteira zallet

Depois,

`./shieldNewsletter.sh yourNewsletterHere.md`
