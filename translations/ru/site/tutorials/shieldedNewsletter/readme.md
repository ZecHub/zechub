# Защищённые рассылки


## Настройка

 * Узел Zebrad запущен и полностью синхронизирован, RPC включены и настроены на использование cookies
 * Zainod полностью синхронизирован
 * Zallet настроен для запуска RPC


### Запуск Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

с настроенным файлом zallet.toml

пример toml:

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

измените на правильный порт RPC zebrad (8232) и добавьте имя пользователя и пароль из cookie zebrad


`__cookie__:yourpasswordhere`


### Проверка RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Должно вывести

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
Примечание: убедитесь, что у вас есть копия исполняемого файла zallet в папке, из которой вы запускаете скрипт

### Запуск скриптов

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Обновите daoAddress.md, указав UA, которые вы хотите использовать

Откройте txBuilderFromFile.sh и обновите переменную "from", указав пополненный UA, который находится в вашем кошельке zallet

Затем,

`./shieldNewsletter.sh yourNewsletterHere.md`
